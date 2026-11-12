import { describe, expect, it } from 'vitest'
import { analisarLances, classificar, contarClasses, posicoesDaPartida } from '../src/lib/analisePartida'
import { lerPontuacao } from '../src/lib/avaliador'

describe('análise de partida', () => {
  it('lê a pontuação do Stockfish do ponto de vista das brancas', () => {
    expect(lerPontuacao('info depth 10 score cp 35 nodes 1 pv e2e4', true)).toBe(35)
    expect(lerPontuacao('info depth 10 score cp 35 nodes 1 pv e7e5', false)).toBe(-35)
    expect(lerPontuacao('info depth 5 score mate 2 pv d8h4', false)).toBe(-19998)
    expect(lerPontuacao('info string olá', true)).toBeNull()
  })

  it('posições: uma a mais que os lances, com mate já resolvido', () => {
    const posicoes = posicoesDaPartida(['f3', 'e5', 'g4', 'Qh4#'])
    expect(posicoes).toHaveLength(5)
    expect(posicoes[4].valorFixo).toBe(-20000)
    expect(posicoes[0].valorFixo).toBeUndefined()
  })

  it('classifica pela chance perdida por quem jogou', () => {
    expect(classificar(9.9)).toBeNull()
    expect(classificar(10)).toBe('imprecisao')
    expect(classificar(25)).toBe('erro')
    expect(classificar(45)).toBe('grave')
    // 1.e4 (+30) e5 (+30) 2.Qh5 (−500: as brancas perdem uns 39 pontos de chance, erro grave) Nc6 (igual).
    const { lances } = analisarLances(['e4', 'e5', 'Qh5', 'Nc6'], [20, 30, 30, -500, -500])
    expect(lances.map((l) => l.classe)).toEqual([null, null, 'grave', null])
    expect(lances[3].perda).toBe(0)
    expect(contarClasses(lances, 'w')).toEqual({ imprecisao: 0, erro: 0, grave: 1 })
  })

  it('posição sem avaliação não marca o lance', () => {
    const { lances, chances } = analisarLances(['e4'], [20, null])
    expect(chances[1]).toBeNull()
    expect(lances[0].classe).toBeNull()
  })
})
