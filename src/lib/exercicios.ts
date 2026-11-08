import { Chess } from 'chess.js'

export interface Problema {
  /** Número do problema no livro. */
  n: number
  fen: string
  /** Todos os lances que resolvem (SAN), conferidos pelo gerador. */
  solucoes: string[]
}

export interface ConjuntoExercicios {
  id: string
  nome: string
  fonte: string
  /** Mate em quantos lances. */
  lances: number
  problemas: Problema[]
}

export type PecaPromocao = 'q' | 'r' | 'b' | 'n'

export interface LanceVerificado {
  san: string
  from: string
  to: string
  fenDepois: string
  mate: boolean
}

const arquivos = import.meta.glob<ConjuntoExercicios>('../../data/exercicios/*.json', {
  eager: true,
  import: 'default',
})

export function obterConjuntos(): ConjuntoExercicios[] {
  return Object.values(arquivos)
}

export function buscarConjunto(id: string): ConjuntoExercicios | undefined {
  return obterConjuntos().find((conjunto) => conjunto.id === id)
}

/** O lance de peão chega à última fileira e precisa da escolha da peça. */
export function ehPromocao(fen: string, de: string, para: string): boolean {
  return new Chess(fen)
    .moves({ verbose: true })
    .some((lance) => lance.from === de && lance.to === para && !!lance.promotion)
}

/** Joga o lance e diz se ele dá mate; null se for ilegal. */
export function verificarLance(
  fen: string,
  de: string,
  para: string,
  promocao?: PecaPromocao,
): LanceVerificado | null {
  const jogo = new Chess(fen)
  try {
    const lance = jogo.move({ from: de, to: para, promotion: promocao })
    return { san: lance.san, from: lance.from, to: lance.to, fenDepois: jogo.fen(), mate: jogo.isCheckmate() }
  } catch {
    return null
  }
}

/** Casas de origem e destino da primeira solução, para a pista e a seta. */
export function casasDaSolucao(problema: Problema): { from: string; to: string } {
  const lance = new Chess(problema.fen).move(problema.solucoes[0])
  return { from: lance.from, to: lance.to }
}

export function vezDoProblema(problema: Problema): 'w' | 'b' {
  return problema.fen.split(' ')[1] === 'b' ? 'b' : 'w'
}
