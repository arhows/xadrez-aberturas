/** Formato dos arquivos em data/openings/*.json (SPEC 3.1 e 3.4). */

export interface Grupo {
  id: string
  nome: string
  colunas: number[]
}

export interface Linha {
  id: string
  coluna: number | null
  grupo: string
  bonus?: boolean
  nome: string
  lances: string
  avaliacao: string | null
  resumo: string
  dicas: Record<string, string>
}

export interface Nota {
  id: string
  nota: string
  rotulo: string
  coluna: number | null
  linhaBase: string
  /** Ply (1 = 1.e4) em que a nota sai da linha base. */
  desvioNoLance: number
  lances: string
  avaliacao?: string | null
  referencia?: string
  comentario?: string
  /** Trecho cortado na foto: a nota precisa ser conferida antes de entrar no Treino. */
  conferir?: string
}

export interface Capitulo {
  id: string
  nome: string
  fonte?: string
  base: string
  grupos: Grupo[]
  linhas: Linha[]
  notas?: Nota[]
  notasPendentes?: string
}
