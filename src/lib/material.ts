import type { Cor } from './lances'

const INICIAL: Record<string, number> = { q: 1, r: 2, b: 2, n: 2, p: 8 }
export const VALOR: Record<string, number> = { q: 9, r: 5, b: 3, n: 3, p: 1 }
const ORDEM = ['q', 'r', 'b', 'n', 'p']

export interface Material {
  /** Peças que cada lado capturou, da mais valiosa para a menos (letras minúsculas). */
  capturadas: Record<Cor, string[]>
  /** Pontos das brancas menos pontos das pretas (dama 9, torre 5, bispo e cavalo 3, peão 1). */
  saldo: number
}

/** Conta o material pelo FEN; uma promoção pode esconder uma captura, mas nas aberturas isso não ocorre. */
export function materialDaPosicao(fen: string): Material {
  const tabuleiro = fen.split(' ')[0]
  const contar = (letra: string) => [...tabuleiro].filter((c) => c === letra).length
  const faltando = (cor: Cor) =>
    ORDEM.flatMap((peca) => {
      const letra = cor === 'w' ? peca.toUpperCase() : peca
      return Array(Math.max(0, INICIAL[peca] - contar(letra))).fill(peca)
    })
  const pontos = (cor: Cor) =>
    ORDEM.reduce((total, peca) => total + VALOR[peca] * contar(cor === 'w' ? peca.toUpperCase() : peca), 0)
  return {
    // As brancas capturaram as peças pretas que faltam, e vice-versa.
    capturadas: { w: faltando('b'), b: faltando('w') },
    saldo: pontos('w') - pontos('b'),
  }
}
