import { describe, expect, it } from 'vitest'
import { chanceDasBrancas } from '../src/lib/probabilidade'

describe('chance de vitória pela avaliação', () => {
  it('segue a curva do lichess', () => {
    expect(chanceDasBrancas(0)).toBe(50)
    expect(chanceDasBrancas(100)).toBeCloseTo(59.1, 1)
    expect(chanceDasBrancas(-300)).toBeCloseTo(24.9, 1)
    expect(chanceDasBrancas(100) + chanceDasBrancas(-100)).toBeCloseTo(100, 6)
  })

  it('mate é 100% para quem dá o mate', () => {
    expect(chanceDasBrancas(19990)).toBe(100)
    expect(chanceDasBrancas(-19995)).toBe(0)
  })
})
