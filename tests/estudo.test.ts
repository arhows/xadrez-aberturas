import { describe, expect, it } from 'vitest'
import { deveResponder } from '../src/lib/estudo'

const INICIO = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const DEPOIS_E4 = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'

describe('Estudo: o outro lado responde sozinho', () => {
  it('de brancas, responde depois do lance das brancas', () => {
    expect(deveResponder(DEPOIS_E4, 'w', true, 5)).toBe(true)
    expect(deveResponder(INICIO, 'w', true, 5)).toBe(false)
  })
  it('de pretas, o primeiro lance das brancas sai sozinho', () => {
    expect(deveResponder(INICIO, 'b', true, 5)).toBe(true)
    expect(deveResponder(DEPOIS_E4, 'b', true, 5)).toBe(false)
  })
  it('não responde desligado nem no fim da linha', () => {
    expect(deveResponder(DEPOIS_E4, 'w', false, 5)).toBe(false)
    expect(deveResponder(DEPOIS_E4, 'w', true, 0)).toBe(false)
  })
})
