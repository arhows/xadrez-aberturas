import { describe, expect, it } from 'vitest'
import { MAXIMO_DE_ITENS, montarFila } from '../src/lib/revisaoRapida'

describe('fila da revisão rápida', () => {
  it('alterna aberturas e exercícios, uma linha de cada capítulo por vez', () => {
    const fila = montarFila(
      [
        { capitulo: 'italiana', pendentes: 2 },
        { capitulo: 'petrov', pendentes: 1 },
      ],
      [
        { conjunto: 'mate-1', n: 4, proxima: '2026-11-01' },
        { conjunto: 'mate-2', n: 9, proxima: '2026-11-02' },
      ],
    )
    expect(fila).toEqual([
      { tipo: 'abertura', capitulo: 'italiana' },
      { tipo: 'exercicio', conjunto: 'mate-1', n: 4 },
      { tipo: 'abertura', capitulo: 'petrov' },
      { tipo: 'exercicio', conjunto: 'mate-2', n: 9 },
      { tipo: 'abertura', capitulo: 'italiana' },
    ])
  })

  it('para no máximo de itens', () => {
    const exercicios = Array.from({ length: 40 }, (_, n) => ({ conjunto: 'm', n, proxima: '2026-11-01' }))
    expect(montarFila([{ capitulo: 'x', pendentes: 40 }], exercicios)).toHaveLength(MAXIMO_DE_ITENS)
  })

  it('sem nada vencido, a fila fica vazia', () => {
    expect(montarFila([], [])).toEqual([])
  })
})
