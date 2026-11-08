import { describe, expect, it } from 'vitest'
import { obterCapitulos } from '../src/lib/capitulos'
import { familiaDaAbertura } from '../src/lib/familias'

describe('famílias de aberturas (divisão do MCO)', () => {
  it('classifica pelos dois primeiros lances da base', () => {
    expect(familiaDaAbertura('1. e4 e5 2. Nf3 Nc6').id).toBe('abertos')
    expect(familiaDaAbertura('1. e4 c5').id).toBe('semiabertos')
    expect(familiaDaAbertura('1. d4 d5 2. c4').id).toBe('fechados')
    expect(familiaDaAbertura('1. d4 Nf6 2. c4 g6').id).toBe('indianos')
    expect(familiaDaAbertura('1. c4 e5').id).toBe('flanco')
    expect(familiaDaAbertura('1. Nf3 d5').id).toBe('flanco')
  })

  it('Italiana e Dois Cavalos são jogos abertos', () => {
    for (const capitulo of obterCapitulos()) {
      expect(familiaDaAbertura(capitulo.capitulo.base).id, capitulo.capitulo.id).toBe('abertos')
    }
  })
})
