import { describe, expect, it } from 'vitest'
import { colocarPeca, fenColado, fenDaPosicao, FEN_INICIAL, FEN_VAZIO, lerPosicao, problemaDaPosicao } from '../src/lib/editor'
import { lancesAntesDoFen, jogoDosLances } from '../src/lib/jogo'
import { analisarLances, posicoesDaPartida } from '../src/lib/analisePartida'

describe('editor de posição', () => {
  it('lê e escreve o FEN', () => {
    expect(fenDaPosicao(lerPosicao(FEN_INICIAL))).toBe(FEN_INICIAL)
    expect(fenDaPosicao(lerPosicao(FEN_VAZIO))).toBe(FEN_VAZIO)
  })
  it('tira roques impossíveis', () => {
    const p = lerPosicao(FEN_INICIAL)
    p.pecas = colocarPeca(p.pecas, 'h1', null)
    expect(fenDaPosicao(p)).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBN1 w Qkq - 0 1')
  })
  it('mesma peça de novo tira; outra substitui', () => {
    const vazio = new Map<string, string>()
    const um = colocarPeca(vazio, 'e4', 'N')
    expect(um.get('e4')).toBe('N')
    expect(colocarPeca(um, 'e4', 'N').has('e4')).toBe(false)
    expect(colocarPeca(um, 'e4', 'q').get('e4')).toBe('q')
  })
  it('aponta os problemas da posição', () => {
    expect(problemaDaPosicao(FEN_INICIAL)).toBeNull()
    expect(problemaDaPosicao(FEN_VAZIO)).toMatch(/Falta o rei branco/)
    expect(problemaDaPosicao('4k3/8/8/8/8/8/8/4K2K w - - 0 1')).toMatch(/mais de um rei branco/)
    expect(problemaDaPosicao('P3k3/8/8/8/8/8/8/4K3 w - - 0 1')).toMatch(/Peão em a8/)
    // Rei preto em xeque com a vez das brancas.
    expect(problemaDaPosicao('4k3/8/8/8/8/8/8/4RK2 w - - 0 1')).toMatch(/rei preto está em xeque/)
    expect(problemaDaPosicao('4k3/8/8/8/8/8/8/4RK2 b - - 0 1')).toBeNull()
  })
  it('aceita FEN colado incompleto', () => {
    expect(fenColado('4k3/8/8/8/8/8/8/4K3')).toBe('4k3/8/8/8/8/8/8/4K3 w - - 0 1')
    expect(fenColado('4k3/8/8/8/8/8/8/4K3 b - - 3 40')).toBe('4k3/8/8/8/8/8/8/4K3 b - - 3 40')
    expect(fenColado('lixo')).toBeNull()
  })
})

describe('partida a partir de uma posição', () => {
  const fen = '4k3/8/8/8/8/8/4P3/4K3 b - - 0 12'
  it('numera a partir do lance do FEN', () => {
    expect(lancesAntesDoFen(fen)).toBe(23)
    expect(lancesAntesDoFen(undefined)).toBe(0)
  })
  it('joga e analisa os lances a partir do FEN, com as pretas primeiro', () => {
    expect(jogoDosLances(['Kd7', 'e4'], fen).fen()).toBe('8/3k4/8/8/4P3/8/8/4K3 b - - 0 13')
    expect(posicoesDaPartida(['Kd7'], fen)[0].fen).toBe(fen)
    const { lances } = analisarLances(['Kd7', 'e4'], [0, 0, 0], [], fen)
    expect(lances.map((l) => l.cor)).toEqual(['b', 'w'])
  })
})
