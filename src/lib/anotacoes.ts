import { progresso } from './progresso'

/** Notas pessoais presas a um lance do livro. */

export const chaveDaNota = (capitulo: string, arestaId: string) => `${capitulo}|${arestaId}`

export function lerNota(chave: string | null): string {
  return (chave && progresso.anotacoes[chave]?.texto) || ''
}

/** Grava (ou apaga, com texto vazio) a nota do lance. */
export function gravarNota(chave: string, texto: string, agora = new Date()): void {
  const limpo = texto.trim()
  if (limpo === lerNota(chave)) return
  progresso.anotacoes[chave] = { texto: limpo, atualizado: agora.toISOString() }
}
