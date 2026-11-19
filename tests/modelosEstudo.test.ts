import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import modelos from '../data/estudos/siciliana-pretas.json'

describe('partidas modelo da Siciliana', () => {
  it('são 10 partidas legais que começam com 1.e4 c5', () => {
    expect(modelos).toHaveLength(10)
    for (const m of modelos) {
      const jogo = new Chess()
      const lances = m.lances.split(' ')
      for (const san of lances) jogo.move(san)
      expect(lances.slice(0, 2)).toEqual(['e4', 'c5'])
    }
  })
  it('não repetem partida', () => {
    expect(new Set(modelos.map((m) => m.lances)).size).toBe(modelos.length)
  })
})
