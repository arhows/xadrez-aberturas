/**
 * Chance de vitória a partir da avaliação do Stockfish, com a curva que o lichess usa
 * (ajustada em milhões de partidas): 50 + 50 · (2 / (1 + e^(−0,00368208 · cp)) − 1).
 * Mate conta como 100% para quem dá o mate.
 */
const MATE = 15000

export function chanceDasBrancas(cp: number): number {
  if (cp >= MATE) return 100
  if (cp <= -MATE) return 0
  return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1)
}
