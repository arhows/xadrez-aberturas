/**
 * Maia (CSSLab, Universidade de Toronto): rede neural treinada com partidas humanas do lichess para
 * jogar o lance que uma pessoa daquele rating jogaria, e não o melhor lance. Usamos a Maia 1 (níveis
 * 1100 a 1900), convertida para ONNX, rodando no próprio aparelho com o onnxruntime-web.
 *
 * Este arquivo tem a parte pura: a posição vira as 112 camadas 8×8 da entrada da lc0, e a saída
 * (1858 notas, uma por lance do vocabulário da lc0) vira o lance escolhido. A execução do modelo
 * fica em maiaMotor.ts.
 *
 * Licença: os pesos da Maia são GPL-3.0 (github.com/CSSLab/maia-chess), como o Stockfish.
 */
import { Chess } from 'chess.js'
import VOCABULARIO from './maiaLances.json'
import type { LanceUci } from './adversario'

export const NIVEIS_MAIA = [1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900] as const
export type NivelMaia = (typeof NIVEIS_MAIA)[number]

/** Posições anteriores que a rede enxerga (a atual + 7). */
const HISTORICO = 8
const CAMADAS_POR_POSICAO = 13
const BASE_AUX = HISTORICO * CAMADAS_POR_POSICAO // 104
export const CAMADAS = BASE_AUX + 8 // 112

const ORDEM_PECAS = ['p', 'n', 'b', 'r', 'q', 'k'] as const

const INDICE = new Map<string, number>((VOCABULARIO as string[]).map((uci, i) => [uci, i]))

/** Peças, vez, roques e en passant: o que define a "mesma posição" para a repetição. */
const chaveDaPosicao = (fen: string) => fen.split(' ').slice(0, 4).join(' ')

/** Linha (0–7) da casa vista por quem joga: as pretas enxergam o tabuleiro de cabeça para baixo. */
const linhaVista = (rank: number, pretas: boolean) => (pretas ? 7 - rank : rank)

/**
 * As 112 camadas de entrada (formato "classical" da lc0) para a posição atual, que é a última de
 * `fens`. Para cada uma das 8 posições mais recentes: 6 camadas com as peças de quem joga agora,
 * 6 com as do adversário e 1 de repetição; depois roques, vez, regra dos 50 lances e uma camada de 1.
 * Tudo do ponto de vista de quem tem a vez (para as pretas, o tabuleiro é espelhado).
 */
export function codificarPosicoes(fens: string[]): Float32Array {
  const entrada = new Float32Array(CAMADAS * 64)
  const atual = fens.at(-1)!
  const [, vez, roques, , meioLances] = atual.split(' ')
  const pretas = vez === 'b'
  const nos = pretas ? 'b' : 'w'

  const vistas = new Map<string, number>()
  for (const fen of fens) vistas.set(chaveDaPosicao(fen), (vistas.get(chaveDaPosicao(fen)) ?? 0) + 1)

  for (let i = 0; i < HISTORICO; i++) {
    const fen = fens[fens.length - 1 - i]
    if (!fen) break
    const base = i * CAMADAS_POR_POSICAO
    const linhas = fen.split(' ')[0].split('/')
    // linhas[0] é a 8ª fileira.
    for (let r = 0; r < 8; r++) {
      const rank = 7 - r
      let file = 0
      for (const c of linhas[r]) {
        if (c >= '1' && c <= '8') {
          file += Number(c)
          continue
        }
        const cor = c === c.toUpperCase() ? 'w' : 'b'
        const tipo = ORDEM_PECAS.indexOf(c.toLowerCase() as (typeof ORDEM_PECAS)[number])
        const camada = base + (cor === nos ? 0 : 6) + tipo
        entrada[camada * 64 + linhaVista(rank, pretas) * 8 + file] = 1
        file++
      }
    }
    // Repetição: a posição já tinha aparecido antes nesta partida.
    if ((vistas.get(chaveDaPosicao(fen)) ?? 0) > 1) entrada.fill(1, (base + 12) * 64, (base + 13) * 64)
  }

  const preencher = (camada: number, valor: number) => entrada.fill(valor, camada * 64, (camada + 1) * 64)
  const [nossoLongo, nossoCurto, delesLongo, delesCurto] = pretas ? ['q', 'k', 'Q', 'K'] : ['Q', 'K', 'q', 'k']
  if (roques.includes(nossoLongo)) preencher(BASE_AUX + 0, 1)
  if (roques.includes(nossoCurto)) preencher(BASE_AUX + 1, 1)
  if (roques.includes(delesLongo)) preencher(BASE_AUX + 2, 1)
  if (roques.includes(delesCurto)) preencher(BASE_AUX + 3, 1)
  if (pretas) preencher(BASE_AUX + 4, 1)
  preencher(BASE_AUX + 5, Number(meioLances) || 0)
  // BASE_AUX + 6 fica em zero (era a contagem de lances).
  preencher(BASE_AUX + 7, 1)
  return entrada
}

/** Casa vista por quem joga (as pretas espelham as fileiras). */
function casaVista(casa: string, pretas: boolean): string {
  return pretas ? casa[0] + String(9 - Number(casa[1])) : casa
}

/**
 * Nomes do lance no vocabulário da lc0. O roque aparece como o rei "capturando" a torre (e1h1) e
 * também como rei para g1; a promoção a cavalo é o lance sem letra; dama, torre e bispo têm a letra.
 */
export function nomesNoVocabulario(lance: LanceUci, pretas: boolean, roque: 'curto' | 'longo' | null): string[] {
  const de = casaVista(lance.from, pretas)
  const para = casaVista(lance.to, pretas)
  if (roque) return [de + (roque === 'curto' ? 'h1' : 'a1'), de + para]
  if (lance.promotion && lance.promotion !== 'n') return [de + para + lance.promotion]
  return [de + para]
}

export interface Candidato {
  lance: LanceUci
  san: string
  probabilidade: number
}

/** Os lances legais com a probabilidade que a Maia dá a cada um (somam 1), do mais provável ao menos. */
export function candidatosDaMaia(fen: string, notas: ArrayLike<number>): Candidato[] {
  const jogo = new Chess(fen)
  const pretas = jogo.turn() === 'b'
  const legais = jogo.moves({ verbose: true }).map((m) => {
    const lance: LanceUci = { from: m.from, to: m.to, promotion: m.promotion }
    const roque = m.isKingsideCastle() ? 'curto' : m.isQueensideCastle() ? 'longo' : null
    const indices = nomesNoVocabulario(lance, pretas, roque)
      .map((nome) => INDICE.get(nome))
      .filter((i): i is number => i !== undefined)
    const nota = indices.length ? Math.max(...indices.map((i) => notas[i])) : -Infinity
    return { lance, san: m.san, nota }
  })
  const maior = Math.max(...legais.map((l) => l.nota))
  const pesos = legais.map((l) => Math.exp(l.nota - maior))
  const soma = pesos.reduce((a, b) => a + b, 0)
  return legais
    .map((l, i) => ({ lance: l.lance, san: l.san, probabilidade: pesos[i] / soma }))
    .sort((a, b) => b.probabilidade - a.probabilidade)
}

/**
 * O lance da Maia. Na abertura (primeiros `variarAte` meios-lances) sorteia entre os lances que ela
 * acha quase tão prováveis quanto o melhor, para as partidas não serem sempre iguais; depois joga o
 * mais provável, que é como a Maia foi medida no artigo.
 */
export function escolherLanceDaMaia(
  candidatos: Candidato[],
  meioLance: number,
  aleatorio: () => number = Math.random,
  variarAte = 12,
): Candidato | null {
  if (!candidatos.length) return null
  if (meioLance >= variarAte) return candidatos[0]
  const proximos = candidatos.filter((c) => c.probabilidade >= candidatos[0].probabilidade * 0.4)
  const soma = proximos.reduce((a, c) => a + c.probabilidade, 0)
  let sorteio = aleatorio() * soma
  for (const c of proximos) {
    sorteio -= c.probabilidade
    if (sorteio <= 0) return c
  }
  return proximos.at(-1)!
}

/** As FENs da partida até agora (da posição inicial à atual), para o histórico da rede. */
export function fensDaPartida(fenInicial: string | undefined, sans: string[]): string[] {
  const jogo = fenInicial ? new Chess(fenInicial) : new Chess()
  const fens = [jogo.fen()]
  for (const san of sans) {
    jogo.move(san)
    fens.push(jogo.fen())
  }
  return fens
}

