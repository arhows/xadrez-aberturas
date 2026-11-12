import { describe, expect, it } from 'vitest'
import { comandosDoLance, lerUci, nivelPorNumero, NIVEIS } from '../src/lib/adversario'
import { jogoDosLances, pgnDoJogo, situacaoDoJogo } from '../src/lib/jogo'

describe('tela Jogar', () => {
  it('reconhece mate, afogamento e partida em andamento', () => {
    expect(situacaoDoJogo(jogoDosLances(['f3', 'e5', 'g4', 'Qh4#']))).toMatchObject({ fim: true, resultado: '0-1' })
    expect(situacaoDoJogo(jogoDosLances(['e4', 'e5']))).toMatchObject({ fim: false, resultado: '*' })
    const afogado = jogoDosLances([])
    afogado.load('7k/5Q2/6K1/8/8/8/8/8 b - - 0 1')
    expect(situacaoDoJogo(afogado)).toMatchObject({ fim: true, resultado: '1/2-1/2' })
  })

  it('gera o PGN com os jogadores e o resultado', () => {
    const pgn = pgnDoJogo(['e4', 'e5', 'Nf3'], { brancas: 'Você', pretas: 'Stockfish nível 3', resultado: '*', data: '2026-11-11' })
    expect(pgn).toContain('[White "Você"]')
    expect(pgn).toContain('[Date "2026.11.11"]')
    expect(pgn).toContain('1. e4 e5 2. Nf3')
  })

  it('lê o lance do Stockfish e monta os comandos do nível', () => {
    expect(lerUci('e7e8q')).toEqual({ from: 'e7', to: 'e8', promotion: 'q' })
    expect(lerUci('(none)')).toBeNull()
    expect(NIVEIS).toHaveLength(8)
    expect(comandosDoLance('fen x', nivelPorNumero(1))).toEqual([
      'setoption name Skill Level value 0',
      'position fen fen x',
      'go depth 1 movetime 100',
    ])
    expect(nivelPorNumero(99).nivel).toBe(3)
  })
})
