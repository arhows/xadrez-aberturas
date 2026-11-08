import { describe, expect, it } from 'vitest'
import { lerInfo } from '../src/lib/stockfishAoVivo'

const INICIAL = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

describe('leitura das linhas do Stockfish (UCI)', () => {
  it('converte o pv para SAN e mantém a nota das brancas', () => {
    const r = lerInfo('info depth 14 seldepth 18 multipv 2 score cp 31 nodes 1 nps 1 pv e2e4 e7e5 g1f3', INICIAL)
    expect(r).toEqual({ profundidade: 14, multipv: 2, linha: { cp: 31, sans: ['e4', 'e5', 'Nf3'] } })
  })

  it('inverte a nota quando as pretas jogam (o UCI dá a nota de quem joga)', () => {
    const fen = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
    expect(lerInfo('info depth 10 multipv 1 score cp 25 pv e7e5', fen)?.linha.cp).toBe(-25)
  })

  it('lê mate e promoção', () => {
    const fen = '7k/4P3/6K1/8/8/8/8/8 w - - 0 1'
    const r = lerInfo('info depth 5 multipv 1 score mate 1 pv e7e8q', fen)
    expect(r?.linha).toEqual({ mate: 1, sans: ['e8=Q#'] })
  })

  it('ignora linhas sem nota ou com lance inválido', () => {
    expect(lerInfo('info string NNUE evaluation using nn.nnue', INICIAL)).toBeNull()
    expect(lerInfo('info depth 3 score cp 0 pv a1a8', INICIAL)).toBeNull()
  })
})
