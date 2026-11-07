/** Análise do Stockfish feita antes, por scripts/motor.cjs; o app não roda o motor. */
export interface AnaliseMotor {
  /** Melhor lance em SAN. */
  lance: string
  /** Avaliação em centipeões, do ponto de vista das brancas; mates viram ±(20000 − lances). */
  cp: number
  /** Veio de uma análise longa, feita à parte para posições contestadas. */
  profundo?: boolean
}

export interface DadosMotor {
  motor: string
  nos: number
  /** Chave = FEN sem contadores, a mesma dos nós da árvore. */
  posicoes: Record<string, AnaliseMotor>
}

const arquivos = import.meta.glob<DadosMotor>('../../data/engine/*.json', { import: 'default' })
const cache = new Map<string, Promise<DadosMotor | null>>()

/** Carrega a análise de um capítulo só quando ela é necessária; null se não houver. */
export function carregarMotor(idCapitulo: string): Promise<DadosMotor | null> {
  let promessa = cache.get(idCapitulo)
  if (!promessa) {
    const carregar = arquivos[`../../data/engine/${idCapitulo}.json`]
    promessa = carregar ? carregar() : Promise.resolve(null)
    cache.set(idCapitulo, promessa)
  }
  return promessa
}

const MATE = 15000

/** "+0,4", "−1,2", "0,0" ou "mate", sempre do ponto de vista das brancas. */
export function formatarAvaliacao(cp: number): string {
  if (Math.abs(cp) >= MATE) return cp > 0 ? 'mate para as brancas' : 'mate para as pretas'
  const valor = Math.abs(cp / 100).toFixed(1).replace('.', ',')
  if (valor === '0,0') return '0,0'
  return `${cp > 0 ? '+' : '−'}${valor}`
}
