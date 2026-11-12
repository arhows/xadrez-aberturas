import type { CapituloCarregado } from './capitulos'
import { FAMILIAS, familiaDaAbertura } from './familias'

/** Aberturas na ordem da tela Aberturas: por família, e dentro dela na ordem do livro. */
export function ordemDasAberturas(capitulos: CapituloCarregado[]): CapituloCarregado[] {
  return FAMILIAS.flatMap((f) => capitulos.filter((c) => familiaDaAbertura(c.capitulo.base).id === f.id))
}

/**
 * Abertura anterior e seguinte, para passar de uma à outra no fim do treino. Se a atual está no
 * repertório, anda só entre as do repertório; senão, entre todas.
 */
export function aberturasVizinhas(
  capitulos: CapituloCarregado[],
  id: string,
  repertorio: string[],
): { anterior?: CapituloCarregado; proxima?: CapituloCarregado } {
  const ordem = ordemDasAberturas(capitulos)
  const lista = repertorio.includes(id) ? ordem.filter((c) => repertorio.includes(c.capitulo.id)) : ordem
  const i = lista.findIndex((c) => c.capitulo.id === id)
  if (i < 0) return {}
  return { anterior: lista[i - 1], proxima: lista[i + 1] }
}
