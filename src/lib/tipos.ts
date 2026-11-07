import type { EscolhaCor } from './escopo'

/** Formato dos arquivos em data/openings/*.json (SPEC 3.1 e 3.4). */

export interface Grupo {
  id: string
  nome: string
  colunas: number[]
}

/** O que o lado que acabou de jogar faria se pudesse jogar de novo. */
export interface Ameaca {
  lance: string
  texto: string
}

/** Sequência do livro em que um lance natural é punido. O texto é comentário do app. */
export interface Armadilha {
  id: string
  titulo: string
  /** PGN desde o 1º lance; precisa ser o início de uma linha ou nota do capítulo. */
  lances: string
  /** Ply (1 = 1.e4) do lance natural que cai na armadilha. */
  erroNoLance: number
  texto: string
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
  /** Chave no formato de `dicas`: a ameaça criada por aquele lance. */
  ameacas?: Record<string, Ameaca>
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
  /** Cor sugerida no Treino; sem ela, o capítulo treina as duas cores. */
  corPadrao?: EscolhaCor
  grupos: Grupo[]
  linhas: Linha[]
  notas?: Nota[]
  armadilhas?: Armadilha[]
  notasPendentes?: string
}
