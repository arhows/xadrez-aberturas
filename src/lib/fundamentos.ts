import { Chess, type Square } from 'chess.js'

/**
 * Motor das lições de Fundamentos do xadrez (aprender do zero). Três tipos de exercício:
 *
 * - `casa`: tocar na casa pedida (nomes das casas, onde ficam as peças, casas proibidas);
 * - `percurso`: mover as peças brancas para pegar as estrelas ou capturar as peças pretas,
 *   que não se mexem (sem reis; vale só o movimento de cada peça);
 * - `lance`: uma posição de verdade, com as regras completas, e um objetivo (dar mate, dar
 *   xeque, salvar uma peça ou achar um lance certo).
 */

export interface PerguntaCasa {
  texto: string
  /** Qualquer uma destas casas responde certo. */
  casas: string[]
}

interface ExercicioBase {
  id: string
  enunciado: string
  /** Texto mostrado depois de acertar. */
  explicacao?: string
}

export interface ExercicioCasa extends ExercicioBase {
  tipo: 'casa'
  /** Posição mostrada; sem ela, o tabuleiro vazio. */
  fen?: string
  orientacao?: 'white' | 'black'
  perguntas: PerguntaCasa[]
}

export interface ExercicioPercurso extends ExercicioBase {
  tipo: 'percurso'
  /** Peças como "Ra1" (brancas em maiúscula, pretas em minúscula; P/p = peão). */
  pecas: string[]
  /** Casas com estrela para pegar (parar em cima). */
  estrelas: string[]
  /** Também é preciso capturar todas as peças pretas. */
  capturarTudo?: boolean
}

export interface ExercicioLance extends ExercicioBase {
  tipo: 'lance'
  fen: string
  orientacao?: 'white' | 'black'
  /** Lance anterior, para destacar no tabuleiro (en passant). */
  ultimo?: [string, string]
  /**
   * mate: o lance dá xeque-mate; xeque: dá xeque; salvar: a peça em `casa` não fica perdida;
   * lances: o lance está em `aceitos` (SAN sem + e #); qualquer: todo lance legal serve.
   */
  objetivo: 'mate' | 'xeque' | 'salvar' | 'lances' | 'qualquer'
  aceitos?: string[]
  casa?: string
  /** Mensagem para um lance legal que não cumpre o objetivo. */
  errado?: string
}

export type ExercicioFundamentos = ExercicioCasa | ExercicioPercurso | ExercicioLance

export interface Licao {
  id: string
  titulo: string
  /** Uma linha para a lista de lições. */
  resumo: string
  /** Explicação, em parágrafos. */
  texto: string[]
  exercicios: ExercicioFundamentos[]
}

// ---------- Percurso ----------

export type Pecas = Map<string, string>

export const COLUNAS = 'abcdefgh'

export function lerPecas(lista: string[]): Pecas {
  return new Map(lista.map((p) => [p.slice(1), p[0]]))
}

const casa = (c: number, f: number) => (c >= 0 && c < 8 && f >= 1 && f <= 8 ? `${COLUNAS[c]}${f}` : null)
const ehBranca = (p: string) => p === p.toUpperCase()

/** FEN só com as peças (brancas sempre na vez), para desenhar o tabuleiro. */
export function fenDasPecas(pecas: Pecas): string {
  const fileiras: string[] = []
  for (let f = 8; f >= 1; f--) {
    let linha = ''
    let vazias = 0
    for (let c = 0; c < 8; c++) {
      const p = pecas.get(`${COLUNAS[c]}${f}`)
      if (!p) {
        vazias++
        continue
      }
      if (vazias) linha += vazias
      vazias = 0
      linha += p
    }
    fileiras.push(linha + (vazias || ''))
  }
  return `${fileiras.join('/')} w - - 0 1`
}

const RETAS: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]]
const DIAGONAIS: [number, number][] = [[1, 1], [1, -1], [-1, 1], [-1, -1]]
const SALTOS: [number, number][] = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]]

/** Casas para onde a peça branca em `de` pode ir (as pretas só bloqueiam ou são capturadas). */
export function destinosDaPeca(pecas: Pecas, de: string): string[] {
  const peca = pecas.get(de)
  if (!peca || !ehBranca(peca)) return []
  const c = COLUNAS.indexOf(de[0])
  const f = Number(de[1])
  const livre = (q: string | null) => q !== null && !pecas.has(q)
  const preta = (q: string | null) => q !== null && pecas.has(q) && !ehBranca(pecas.get(q)!)
  const destinos: string[] = []
  const deslizar = (direcoes: [number, number][], longe: boolean) => {
    for (const [dc, df] of direcoes) {
      for (let passo = 1; passo <= (longe ? 7 : 1); passo++) {
        const q = casa(c + dc * passo, f + df * passo)
        if (q === null) break
        if (livre(q)) destinos.push(q)
        else {
          if (preta(q)) destinos.push(q)
          break
        }
      }
    }
  }
  switch (peca) {
    case 'R':
      deslizar(RETAS, true)
      break
    case 'B':
      deslizar(DIAGONAIS, true)
      break
    case 'Q':
      deslizar([...RETAS, ...DIAGONAIS], true)
      break
    case 'K':
      deslizar([...RETAS, ...DIAGONAIS], false)
      break
    case 'N':
      for (const [dc, df] of SALTOS) {
        const q = casa(c + dc, f + df)
        if (q !== null && (livre(q) || preta(q))) destinos.push(q)
      }
      break
    case 'P': {
      const frente = casa(c, f + 1)
      if (livre(frente)) {
        destinos.push(frente!)
        const duas = casa(c, f + 2)
        if (f === 2 && livre(duas)) destinos.push(duas!)
      }
      for (const dc of [-1, 1]) {
        const q = casa(c + dc, f + 1)
        if (preta(q)) destinos.push(q!)
      }
      break
    }
  }
  return destinos
}

export function destinosDoPercurso(pecas: Pecas): Map<string, string[]> {
  const mapa = new Map<string, string[]>()
  for (const [de, peca] of pecas) {
    if (!ehBranca(peca)) continue
    const lista = destinosDaPeca(pecas, de)
    if (lista.length) mapa.set(de, lista)
  }
  return mapa
}

/** Move a peça; o peão que chega à 8ª fileira vira dama. */
export function moverNoPercurso(pecas: Pecas, de: string, para: string): Pecas {
  const nova = new Map(pecas)
  let peca = nova.get(de)!
  nova.delete(de)
  if (peca === 'P' && para[1] === '8') peca = 'Q'
  nova.set(para, peca)
  return nova
}

export const pretasRestantes = (pecas: Pecas) => [...pecas.values()].filter((p) => !ehBranca(p)).length

export function percursoCompleto(ex: ExercicioPercurso, pecas: Pecas, pegas: Set<string>): boolean {
  return ex.estrelas.every((e) => pegas.has(e)) && (!ex.capturarTudo || pretasRestantes(pecas) === 0)
}

/**
 * Caminho mais curto até completar o percurso (busca em largura), para a dica e para os
 * testes. Devolve os lances [de, para] ou null se não houver solução dentro do limite.
 */
export function melhorCaminho(
  ex: ExercicioPercurso,
  pecas: Pecas,
  pegas: Set<string>,
  limite = 60000,
): [string, string][] | null {
  const chave = (p: Pecas, g: Set<string>) =>
    [...p.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([q, x]) => x + q).join() + '|' + [...g].sort().join()
  interface No {
    pecas: Pecas
    pegas: Set<string>
    caminho: [string, string][]
  }
  const fila: No[] = [{ pecas, pegas, caminho: [] }]
  const vistos = new Set([chave(pecas, pegas)])
  for (let i = 0; i < fila.length && i < limite; i++) {
    const no = fila[i]
    if (percursoCompleto(ex, no.pecas, no.pegas)) return no.caminho
    for (const [de, destinos] of destinosDoPercurso(no.pecas)) {
      for (const para of destinos) {
        const novas = moverNoPercurso(no.pecas, de, para)
        const novasPegas = ex.estrelas.includes(para) ? new Set([...no.pegas, para]) : no.pegas
        const k = chave(novas, novasPegas)
        if (vistos.has(k)) continue
        vistos.add(k)
        fila.push({ pecas: novas, pegas: novasPegas, caminho: [...no.caminho, [de, para]] })
      }
    }
  }
  return null
}

// ---------- Lance ----------

export const VALOR_DAS_PECAS: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 100 }

export type ResultadoLance = { certo: true; san: string } | { certo: false; san: string; motivo: string }

const semSinais = (san: string) => san.replace(/[+#]/g, '')

/** Peça em `alvo` (da cor `cor`) pode ser capturada com lucro? */
function pecaPerdida(jogo: Chess, alvo: string, cor: 'w' | 'b'): boolean {
  const peca = jogo.get(alvo as Square)
  if (!peca || peca.color !== cor) return false
  const inimigo = cor === 'w' ? 'b' : 'w'
  const atacantes = jogo.attackers(alvo as Square, inimigo)
  if (!atacantes.length) return false
  const defensores = jogo.attackers(alvo as Square, cor)
  if (!defensores.length) return true
  const menor = Math.min(...atacantes.map((q) => VALOR_DAS_PECAS[jogo.get(q)!.type]))
  return menor < VALOR_DAS_PECAS[peca.type]
}

export function conferirLance(
  ex: ExercicioLance,
  de: string,
  para: string,
  promocao?: 'q' | 'r' | 'b' | 'n',
): ResultadoLance | null {
  const jogo = new Chess(ex.fen)
  const cor = jogo.turn()
  let lance
  try {
    lance = jogo.move({ from: de, to: para, promotion: promocao ?? 'q' })
  } catch {
    return null
  }
  const san = lance.san
  if (jogo.isStalemate() && ex.objetivo !== 'qualquer') {
    return { certo: false, san, motivo: 'Afogado! O rei adversário não tem lances e não está em xeque: a partida acaba empatada.' }
  }
  let certo: boolean
  switch (ex.objetivo) {
    case 'mate':
      certo = jogo.isCheckmate()
      break
    case 'xeque':
      certo = jogo.inCheck()
      break
    case 'salvar': {
      const alvo = lance.from === ex.casa ? lance.to : ex.casa!
      certo = !pecaPerdida(jogo, alvo, cor)
      break
    }
    case 'lances':
      certo = (ex.aceitos ?? []).map(semSinais).includes(semSinais(san))
      break
    default:
      certo = true
  }
  if (certo) return { certo: true, san }
  const padrao: Record<ExercicioLance['objetivo'], string> = {
    mate: jogo.inCheck() ? 'É xeque, mas o rei ainda tem saída.' : 'Esse lance não dá xeque-mate.',
    xeque: 'Esse lance não ataca o rei.',
    salvar: 'A peça continua podendo ser capturada sem troca justa.',
    lances: 'Não é esse o lance.',
    qualquer: '',
  }
  return { certo: false, san, motivo: ex.errado ?? padrao[ex.objetivo] }
}

/** Lances que cumprem o objetivo (para a dica e para os testes). */
export function lancesCertos(ex: ExercicioLance): { de: string; para: string; san: string }[] {
  return new Chess(ex.fen)
    .moves({ verbose: true })
    .filter((m) => !m.promotion || m.promotion === 'q')
    .filter((m) => conferirLance(ex, m.from, m.to, m.promotion as 'q' | undefined)?.certo)
    .map((m) => ({ de: m.from, para: m.to, san: m.san }))
}

/** Peão chegando à última fileira: o tabuleiro precisa perguntar a peça. */
export function ehPromocaoNoLance(fen: string, de: string, para: string): boolean {
  const peca = new Chess(fen).get(de as Square)
  return peca?.type === 'p' && (para[1] === '8' || para[1] === '1')
}

// ---------- Progresso ----------

/** Junta o progresso de dois aparelhos: vale a primeira data em que cada exercício foi feito. */
export function juntarFundamentos(a: Record<string, string>, b: Record<string, string>): Record<string, string> {
  const junto = { ...a }
  for (const [id, data] of Object.entries(b)) if (!junto[id] || data < junto[id]) junto[id] = data
  return junto
}

export function feitosNaLicao(licao: Licao, feitos: Record<string, string>): number {
  return licao.exercicios.filter((e) => feitos[e.id]).length
}
