import { describe, expect, it } from 'vitest'
import { cantoDaCasa, seloDoLance } from '../src/lib/seloNoTabuleiro'

describe('selo no canto da casa', () => {
  it('prioridade: marca do MCO, depois o livro, depois o motor', () => {
    expect(seloDoLance('e4', { marca: '!?', classe: 'melhor', noLivro: true })).toMatchObject({ simbolo: '!?', tom: 'interessante' })
    expect(seloDoLance('e4', { classe: 'grave', noLivro: true })).toMatchObject({ tom: 'livro' })
    expect(seloDoLance('e4', { classe: 'grave' })).toMatchObject({ simbolo: '??', tom: 'grave' })
    expect(seloDoLance('e4', { noLivro: true })).toMatchObject({ tom: 'livro' })
    expect(seloDoLance('e4', {})).toBeNull()
  })

  it('canto superior direito da casa nas duas orientações', () => {
    expect(cantoDaCasa('a8', 'white')).toEqual({ esquerda: 12.5, topo: 0 })
    expect(cantoDaCasa('h1', 'white')).toEqual({ esquerda: 100, topo: 87.5 })
    expect(cantoDaCasa('h1', 'black')).toEqual({ esquerda: 12.5, topo: 0 })
    expect(cantoDaCasa('e4', 'black')).toEqual({ esquerda: 50, topo: 37.5 })
  })
})
