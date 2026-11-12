import { Chess } from 'chess.js'

/** Regras de fim de partida e PGN da tela Jogar. */

export interface Situacao {
  fim: boolean
  /** "1-0", "0-1", "1/2-1/2" ou "*" (em andamento). */
  resultado: string
  texto: string
}

export function situacaoDoJogo(jogo: Chess): Situacao {
  const vez = jogo.turn() === 'w' ? 'brancas' : 'pretas'
  if (jogo.isCheckmate()) {
    const vencedor = jogo.turn() === 'w' ? 'pretas' : 'brancas'
    return { fim: true, resultado: vencedor === 'brancas' ? '1-0' : '0-1', texto: `Xeque-mate: as ${vencedor} venceram.` }
  }
  if (jogo.isStalemate()) return { fim: true, resultado: '1/2-1/2', texto: `Afogamento: as ${vez} não têm lance. Empate.` }
  if (jogo.isInsufficientMaterial()) return { fim: true, resultado: '1/2-1/2', texto: 'Material insuficiente para dar mate. Empate.' }
  if (jogo.isThreefoldRepetition()) return { fim: true, resultado: '1/2-1/2', texto: 'Mesma posição três vezes. Empate.' }
  if (jogo.isDraw()) return { fim: true, resultado: '1/2-1/2', texto: 'Regra dos 50 lances. Empate.' }
  return { fim: false, resultado: '*', texto: jogo.inCheck() ? `Xeque! Vez das ${vez}.` : `Vez das ${vez}.` }
}

export const FEN_INICIAL = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

/**
 * Meios-lances "antes" de uma posição pelo FEN (número do lance e vez), para numerar os lances
 * de uma partida que começa no meio: pretas no lance 12 = 23.
 */
export function lancesAntesDoFen(fen?: string): number {
  if (!fen) return 0
  const [, vez, , , , numero] = fen.split(' ')
  return ((Number(numero) || 1) - 1) * 2 + (vez === 'b' ? 1 : 0)
}

/** Reconstrói a partida a partir da posição inicial (ou de `fen`) e dos lances em SAN. */
export function jogoDosLances(sans: string[], fen?: string): Chess {
  const jogo = fen ? new Chess(fen) : new Chess()
  for (const san of sans) jogo.move(san)
  return jogo
}

export function pgnDoJogo(
  sans: string[],
  cabecalhos: { brancas: string; pretas: string; resultado: string; data: string },
  fen?: string,
): string {
  const jogo = jogoDosLances(sans, fen)
  jogo.setHeader('Event', 'Partida no Treinador de Xadrez')
  jogo.setHeader('Date', cabecalhos.data.replace(/-/g, '.'))
  jogo.setHeader('White', cabecalhos.brancas)
  jogo.setHeader('Black', cabecalhos.pretas)
  jogo.setHeader('Result', cabecalhos.resultado)
  return jogo.pgn()
}
