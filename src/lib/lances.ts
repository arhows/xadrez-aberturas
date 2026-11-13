import { Chess } from 'chess.js'
import { aplicarUci, type JogoPrecalculado } from './jogoPrecalculado'

export type Cor = 'w' | 'b'

export interface LanceJogado {
  /** 1 = 1.e4 */
  ply: number
  numero: number
  cor: Cor
  san: string
  from: string
  to: string
  promotion?: string
  fenAntes: string
  fenDepois: string
}

export interface LanceIlegal {
  ply: number
  /** O lance como está escrito no arquivo, ex.: "11... exd3". */
  lance: string
  fen: string
}

export interface ResultadoJogada {
  lances: LanceJogado[]
  erro: LanceIlegal | null
}

/** Separa um PGN simples em lances, descartando números de lance e resultado. */
export function separarLances(texto: string): string[] {
  return texto
    .split(/\s+/)
    .map((token) => token.replace(/^\d+\.+/, ''))
    .filter((token) => token !== '' && !/^(\*|1-0|0-1|1\/2-1\/2)$/.test(token))
}

export function numeroDoPly(ply: number): number {
  return Math.ceil(ply / 2)
}

export function corDoPly(ply: number): Cor {
  return ply % 2 === 1 ? 'w' : 'b'
}

/** Rótulo no formato das chaves de `dicas`: "4. Ng5" ou "11... exd3". */
export function chaveDoLance(ply: number, san: string): string {
  return `${numeroDoPly(ply)}${corDoPly(ply) === 'w' ? '.' : '...'} ${san}`
}

/** Identidade da posição: FEN sem os contadores de lance (SPEC 3.3). */
export function chaveDaPosicao(fen: string): string {
  return fen.split(' ').slice(0, 4).join(' ')
}

export function corDaPosicao(fen: string): Cor {
  return fen.split(' ')[1] === 'b' ? 'b' : 'w'
}

/** Lances legais por casa de origem, no formato que o tabuleiro espera. */
export function destinosLegais(fen: string): Map<string, string[]> {
  const destinos = new Map<string, string[]>()
  for (const lance of new Chess(fen).moves({ verbose: true })) {
    destinos.set(lance.from, [...(destinos.get(lance.from) ?? []), lance.to])
  }
  return destinos
}

export function estaEmXeque(fen: string): boolean {
  return new Chess(fen).inCheck()
}

/** Casas de origem e destino de um lance em SAN, ou null se ele for ilegal. */
export function casasDoLance(fen: string, san: string): { from: string; to: string } | null {
  try {
    const lance = new Chess(fen).move(san)
    return { from: lance.from, to: lance.to }
  } catch {
    return null
  }
}

/**
 * Confere um lance como se o lado que acabou de jogar pudesse jogar de novo.
 * Devolve null se o lance for ilegal ou se o outro lado estiver em xeque, caso em
 * que passar a vez não é uma posição válida.
 */
export function lanceDaAmeaca(
  fenDepois: string,
  san: string,
): { san: string; from: string; to: string } | null {
  try {
    if (new Chess(fenDepois).inCheck()) return null
    const partes = fenDepois.split(' ')
    partes[1] = partes[1] === 'w' ? 'b' : 'w'
    partes[3] = '-'
    const lance = new Chess(partes.join(' '), { skipValidation: true }).move(san)
    return { san: lance.san, from: lance.from, to: lance.to }
  } catch {
    return null
  }
}

/** Resultado de um lance a partir de uma posição ("fen lance" → lance jogado), compartilhado entre as linhas. */
type LanceMemorizado = Pick<LanceJogado, 'san' | 'from' | 'to' | 'promotion' | 'fenDepois'>
const memoria = new Map<string, LanceMemorizado | null>()
const FEN_INICIAL = new Chess().fen()

/**
 * Joga os lances a partir da posição inicial e para no primeiro lance ilegal.
 * As linhas de um capítulo repetem longos começos (as notas repetem a coluna), e conferir um
 * lance no chess.js é caro; por isso cada lance já conferido numa posição fica memorizado.
 */
export function jogarLances(texto: string, pre?: JogoPrecalculado): ResultadoJogada {
  if (pre) return jogarPrecalculado(texto, pre)
  let chess: Chess | null = null
  let fen = FEN_INICIAL
  const lances: LanceJogado[] = []

  for (const [indice, token] of separarLances(texto).entries()) {
    const ply = indice + 1
    const fenAntes = fen
    const chave = `${fenAntes} ${token}`
    let feito = memoria.get(chave)
    if (feito === undefined) {
      // O tabuleiro só é montado (ou reposicionado) quando o lance ainda não foi visto.
      if (!chess) chess = new Chess(fenAntes)
      else if (chess.fen() !== fenAntes) chess.load(fenAntes)
      try {
        const lance = chess.move(token)
        feito = { san: lance.san, from: lance.from, to: lance.to, promotion: lance.promotion, fenDepois: chess.fen() }
      } catch {
        feito = null
      }
      memoria.set(chave, feito)
    }
    if (!feito) return { lances, erro: { ply, lance: chaveDoLance(ply, token), fen: fenAntes } }
    lances.push({ ply, numero: numeroDoPly(ply), cor: corDoPly(ply), ...feito, fenAntes })
    fen = feito.fenDepois
  }

  return { lances, erro: null }
}

/** Posição depois de cada lance pré-calculado ("fen uci" → fen): as linhas repetem os começos. */
const posicoesPrecalculadas = new Map<string, string>()

/** Reproduz lances já conferidos no build: só aplica cada um ao tabuleiro. */
function jogarPrecalculado(texto: string, pre: JogoPrecalculado): ResultadoJogada {
  const tokens = separarLances(texto)
  const sans = pre.s ? pre.s.split(' ') : tokens
  const lances: LanceJogado[] = []
  let fen = FEN_INICIAL
  for (const [i, uci] of (pre.u ? pre.u.split(' ') : []).entries()) {
    const ply = i + 1
    const chave = `${fen} ${uci}`
    let fenDepois = posicoesPrecalculadas.get(chave)
    if (fenDepois === undefined) posicoesPrecalculadas.set(chave, (fenDepois = aplicarUci(fen, uci)))
    lances.push({
      ply,
      numero: numeroDoPly(ply),
      cor: corDoPly(ply),
      san: sans[i],
      from: uci.slice(0, 2),
      to: uci.slice(2, 4),
      promotion: uci[4],
      fenAntes: fen,
      fenDepois,
    })
    fen = fenDepois
  }
  if (pre.e) return { lances, erro: { ply: pre.e, lance: chaveDoLance(pre.e, tokens[pre.e - 1]), fen } }
  return { lances, erro: null }
}
