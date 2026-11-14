import { Chess } from 'chess.js'
import type { Cor } from './lances'
import { chanceDasBrancas } from './probabilidade'

/**
 * Lance a lance: as 33 partidas de "Logical Chess: Move by Move" (Chernev). Os lances são os
 * da partida; as explicações são nossas, em português (nada do texto do livro). Você joga com o
 * lado vencedor e tenta achar cada lance; depois lê o porquê.
 */

export type Principio =
  | 'centro'
  | 'desenvolvimento'
  | 'defesa'
  | 'profilaxia'
  | 'tempo'
  | 'ataque'
  | 'tatica'
  | 'roque'
  | 'peoes'
  | 'colunas'
  | 'troca'
  | 'material'

export const NOME_PRINCIPIO: Record<Principio, string> = {
  centro: 'Centro',
  desenvolvimento: 'Desenvolvimento',
  defesa: 'Defesa',
  profilaxia: 'Profilaxia',
  tempo: 'Ganho de tempo',
  ataque: 'Ataque ao rei',
  tatica: 'Tática',
  roque: 'Segurança do rei',
  peoes: 'Estrutura de peões',
  colunas: 'Colunas e diagonais',
  troca: 'Trocas',
  material: 'Material',
}

export interface NotaDoLance {
  texto: string
  principios?: Principio[]
}

export interface PartidaLogica {
  n: number
  brancas: string
  pretas: string
  local: string
  ano: number
  abertura: string
  resultado: string
  /** Lances em SAN, separados por espaço. */
  lances: string
  tema?: string
  introducao?: string
  conclusao?: string
  /** Por rótulo do lance ("1...e5", "4.c3"). Sem notas, a partida ainda não está pronta. */
  notas?: Record<string, NotaDoLance>
}

let carregando: Promise<PartidaLogica[]> | undefined
let carregado: PartidaLogica[] | null = null

/** O arquivo só é baixado quando a tela abre. */
export function carregarLogico(): Promise<PartidaLogica[]> {
  carregando ??= import('../../data/logico/partidas.json').then((m) => (carregado = m.default.partidas as PartidaLogica[]))
  return carregando
}

export const obterLogico = (): PartidaLogica[] => carregado ?? []
export const buscarPartidaLogica = (n: number) => carregado?.find((p) => p.n === n)
export const partidaPronta = (p: PartidaLogica) => !!p.notas && Object.keys(p.notas).length > 0
export const corDoVencedorLogico = (p: PartidaLogica): Cor => (p.resultado === '0-1' ? 'b' : 'w')
export const chaveDoLogico = (n: number) => `logico/${n}`
export const rotuloDoPly = (ply: number, san: string) => `${Math.floor(ply / 2) + 1}${ply % 2 ? '...' : '.'}${san}`

export interface PosicaoLogica {
  fen: string
  ultimo: [string, string] | null
}

/** Posições depois de cada meio-lance (0 = inicial). */
export function posicoesDaPartida(p: PartidaLogica): PosicaoLogica[] {
  const jogo = new Chess()
  const lista: PosicaoLogica[] = [{ fen: jogo.fen(), ultimo: null }]
  for (const san of p.lances.split(' ')) {
    const m = jogo.move(san)
    lista.push({ fen: jogo.fen(), ultimo: [m.from, m.to] })
  }
  return lista
}

/** A nota de cada meio-lance (undefined quando não há). */
export function notasPorPly(p: PartidaLogica): (NotaDoLance | undefined)[] {
  return p.lances.split(' ').map((san, ply) => p.notas?.[rotuloDoPly(ply, san)])
}

/** Os princípios que apareceram nos lances do vencedor, do mais frequente ao menos. */
export function principiosDaPartida(p: PartidaLogica): { principio: Principio; vezes: number }[] {
  const contagem = new Map<Principio, number>()
  const vencedor = corDoVencedorLogico(p)
  notasPorPly(p).forEach((nota, ply) => {
    if ((ply % 2 === 0 ? 'w' : 'b') !== vencedor) return
    for (const principio of nota?.principios ?? []) contagem.set(principio, (contagem.get(principio) ?? 0) + 1)
  })
  return [...contagem].map(([principio, vezes]) => ({ principio, vezes })).sort((a, b) => b.vezes - a.vezes)
}

export type VeredictoDoPalpite = 'melhor' | 'bom' | 'quase' | 'pior' | 'erro'

/**
 * Compara o seu palpite com o lance da partida pela avaliação do Stockfish depois de cada um
 * (centipeões do ponto de vista das brancas), em chance de vitória de quem jogou.
 */
export function veredictoDoPalpite(cpPalpite: number, cpPartida: number, quemJogou: Cor): VeredictoDoPalpite {
  const sinal = quemJogou === 'w' ? 1 : -1
  const pior = sinal * (chanceDasBrancas(cpPartida) - chanceDasBrancas(cpPalpite))
  if (pior <= -4) return 'melhor'
  if (pior < 4) return 'bom'
  if (pior < 10) return 'quase'
  if (pior < 25) return 'pior'
  return 'erro'
}

export const TEXTO_DO_VEREDICTO: Record<VeredictoDoPalpite, string> = {
  melhor: 'O Stockfish acha o seu lance ainda melhor que o da partida!',
  bom: 'Também é bom: para o Stockfish, vale o mesmo que o lance da partida.',
  quase: 'Um pouco pior que o lance da partida, mas jogável.',
  pior: 'Bem pior que o lance da partida.',
  erro: 'Um erro: o Stockfish mostra que esse lance perde muito.',
}
