import { Chess } from 'chess.js'
import type { Cor } from './lances'
import { aplicarResultado, dataLocal, type Cartao } from './srs'

/**
 * Estudo de partidas: partidas que a pessoa reproduziu no tabuleiro de análise (ou colou em PGN)
 * para rever e adivinhar os lances depois. Os lances errados no "Adivinhar" viram cartões de
 * revisão espaçada (chave "id/meio-lance"), com o mesmo SM-2 dos exercícios.
 * Apagar deixa só a marca `apagada`, para a sincronização não trazer a partida de volta.
 */

export type LadoDoEstudo = Cor | 'ambos'

export interface EstudoPartida {
  id: string
  nome: string
  /** Lances em SAN separados por espaço, desde a posição inicial ou desde `fen`. */
  lances: string
  /** Posição de partida montada no editor; sem ela, a posição inicial. */
  fen?: string
  /** Lado cujos lances a pessoa adivinha. */
  lado: LadoDoEstudo
  /** Link do vídeo ou da página de onde a partida veio. */
  video?: string
  criado: string
  /** Última mudança (ISO): na sincronização vale a mais recente. */
  atualizado: string
  /** Melhor resultado no Adivinhar. */
  melhor?: { acertos: number; total: number; data: string }
  apagada?: boolean
}

export function novoIdDeEstudo(agora = new Date(), aleatorio = Math.random): string {
  return `${agora.getTime().toString(36)}-${Math.floor(aleatorio() * 1e6).toString(36)}`
}

export function estudosVisiveis(estudos: Record<string, EstudoPartida>): EstudoPartida[] {
  return Object.values(estudos)
    .filter((e) => !e.apagada)
    .sort((a, b) => b.criado.localeCompare(a.criado))
}

/** Apagada vence; senão, fica a editada por último. */
export function juntarEstudos(a: Record<string, EstudoPartida>, b: Record<string, EstudoPartida>): Record<string, EstudoPartida> {
  const junto: Record<string, EstudoPartida> = { ...a }
  for (const [id, estudo] of Object.entries(b)) {
    const atual = junto[id]
    if (!atual) junto[id] = estudo
    else if (atual.apagada || estudo.apagada) junto[id] = { ...(atual.atualizado >= estudo.atualizado ? atual : estudo), apagada: true }
    else junto[id] = estudo.atualizado > atual.atualizado ? estudo : atual
  }
  return junto
}

export interface PosicaoDoEstudo {
  fen: string
  ultimo: [string, string] | null
}

/** Posições depois de cada meio-lance (0 = a posição de partida). */
export function posicoesDoEstudo(estudo: Pick<EstudoPartida, 'lances' | 'fen'>): PosicaoDoEstudo[] {
  const jogo = new Chess(estudo.fen)
  const lista: PosicaoDoEstudo[] = [{ fen: jogo.fen(), ultimo: null }]
  for (const san of separar(estudo.lances)) {
    const m = jogo.move(san)
    lista.push({ fen: jogo.fen(), ultimo: [m.from, m.to] })
  }
  return lista
}

export const separar = (lances: string) => lances.split(/\s+/).filter(Boolean)

/** Cor de quem joga o meio-lance `i` (0 = primeiro lance da partida). */
export function corDoLance(estudo: Pick<EstudoPartida, 'fen'>, i: number): Cor {
  const primeira: Cor = estudo.fen?.split(' ')[1] === 'b' ? 'b' : 'w'
  return i % 2 === 0 ? primeira : primeira === 'w' ? 'b' : 'w'
}

/** Meios-lances que a pessoa adivinha, a partir de `desde`. */
export function perguntasDoEstudo(estudo: Pick<EstudoPartida, 'lances' | 'fen'>, lado: LadoDoEstudo, desde = 0): number[] {
  return separar(estudo.lances)
    .map((_, i) => i)
    .filter((i) => i >= desde && (lado === 'ambos' || corDoLance(estudo, i) === lado))
}

/** Lê um PGN (uma partida) para o estudo. null quando os lances não puderem ser lidos. */
export function lerPgnDoEstudo(pgn: string): { lances: string; fen?: string; brancas?: string; pretas?: string; evento?: string; data?: string } | null {
  const jogo = new Chess()
  try {
    jogo.loadPgn(pgn.trim())
  } catch {
    return null
  }
  const sans = jogo.history()
  if (!sans.length) return null
  const c = jogo.getHeaders()
  const limpo = (v?: string | null) => (v && v.trim() && v.trim() !== '?' ? v.trim() : undefined)
  return {
    lances: sans.join(' '),
    fen: c.SetUp === '1' && c.FEN ? c.FEN : undefined,
    brancas: limpo(c.White),
    pretas: limpo(c.Black),
    evento: limpo(c.Event),
    data: limpo(c.Date)?.replace(/\.\?\?/g, ''),
  }
}

// ---------- Revisão espaçada dos lances errados ----------

export const chaveDoLanceEstudado = (id: string, i: number) => `${id}/${i}`

/** Errou no Adivinhar ou na revisão: o lance entra (ou volta) para a revisão. */
export function registrarErroNoEstudo(cartoes: Record<string, Cartao>, id: string, i: number, hoje = dataLocal()): void {
  const chave = chaveDoLanceEstudado(id, i)
  cartoes[chave] = aplicarResultado(cartoes[chave], 1, hoje)
}

/** Acertou na revisão: o intervalo cresce. */
export function registrarAcertoNoEstudo(cartoes: Record<string, Cartao>, id: string, i: number, hoje = dataLocal()): void {
  const chave = chaveDoLanceEstudado(id, i)
  if (cartoes[chave]) cartoes[chave] = aplicarResultado(cartoes[chave], 5, hoje)
}

export interface RevisaoDeEstudo {
  id: string
  i: number
  proxima: string
}

/** Lances vencidos de partidas que ainda existem, dos mais atrasados aos mais recentes. */
export function revisoesDeEstudo(
  cartoes: Record<string, Cartao>,
  estudos: Record<string, EstudoPartida>,
  hoje = dataLocal(),
): RevisaoDeEstudo[] {
  return Object.entries(cartoes)
    .flatMap(([chave, cartao]) => {
      const separador = chave.lastIndexOf('/')
      const id = chave.slice(0, separador)
      const i = Number(chave.slice(separador + 1))
      const estudo = estudos[id]
      if (!estudo || estudo.apagada || cartao.proxima > hoje || !(i < separar(estudo.lances).length)) return []
      return [{ id, i, proxima: cartao.proxima }]
    })
    .sort((a, b) => a.proxima.localeCompare(b.proxima) || a.id.localeCompare(b.id) || a.i - b.i)
}

