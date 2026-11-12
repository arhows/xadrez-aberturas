import type { MarcaLivro } from './qualidade'

/**
 * Sinal de avaliação no canto da casa de destino do lance (como nos apps de análise):
 * a marca do MCO tem prioridade; sem ela, um lance ainda no livro leva o ícone de livro
 * (é a teoria estudada); fora do livro, vale a classe do Stockfish.
 */

export type TomSelo = 'brilhante' | 'bom' | 'interessante' | 'melhor' | 'excelente' | 'livro' | 'imprecisao' | 'erro' | 'grave'

export interface SeloCasa {
  casa: string
  simbolo: string
  tom: TomSelo
  nome: string
}

const DA_MARCA: Record<MarcaLivro, { tom: TomSelo; nome: string }> = {
  '!!': { tom: 'brilhante', nome: 'Brilhante' },
  '!': { tom: 'bom', nome: 'Bom lance' },
  '!?': { tom: 'interessante', nome: 'Interessante' },
  '?!': { tom: 'imprecisao', nome: 'Duvidoso' },
  '?': { tom: 'erro', nome: 'Erro' },
  '??': { tom: 'grave', nome: 'Erro grave' },
}

const DO_MOTOR = {
  melhor: { simbolo: '★', tom: 'melhor', nome: 'Melhor lance' },
  bom: { simbolo: '✓', tom: 'excelente', nome: 'Bom' },
  imprecisao: { simbolo: '?!', tom: 'imprecisao', nome: 'Imprecisão' },
  erro: { simbolo: '?', tom: 'erro', nome: 'Erro' },
  grave: { simbolo: '??', tom: 'grave', nome: 'Erro grave' },
} as const

export function seloDoLance(
  casa: string,
  dados: { marca?: MarcaLivro | null; classe?: keyof typeof DO_MOTOR | null; noLivro?: boolean },
): SeloCasa | null {
  if (dados.marca) return { casa, simbolo: dados.marca, ...DA_MARCA[dados.marca] }
  if (dados.noLivro) return { casa, simbolo: 'livro', tom: 'livro', nome: 'Lance do livro' }
  if (dados.classe) return { casa, ...DO_MOTOR[dados.classe] }
  return null
}

/** Posição do canto superior direito da casa, em % do tabuleiro, conforme a orientação. */
export function cantoDaCasa(casa: string, orientacao: 'white' | 'black'): { esquerda: number; topo: number } {
  const coluna = casa.charCodeAt(0) - 97
  const fileira = Number(casa[1])
  const x = orientacao === 'white' ? coluna : 7 - coluna
  const y = orientacao === 'white' ? 8 - fileira : fileira - 1
  return { esquerda: (x + 1) * 12.5, topo: y * 12.5 }
}
