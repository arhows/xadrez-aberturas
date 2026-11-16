import { describe, expect, it } from 'vitest'
import { Chess } from 'chess.js'
import { somDoLance } from '../src/lib/somDoLance'

function depois(fen: string, san: string): string {
  const jogo = new Chess(fen)
  jogo.move(san)
  return jogo.fen()
}
const INICIO = new Chess().fen()

describe('somDoLance', () => {
  it('lance comum', () => {
    expect(somDoLance(INICIO, depois(INICIO, 'e4'))).toBe('lance')
  })
  it('captura', () => {
    const fen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2'
    expect(somDoLance(fen, depois(fen, 'exd5'))).toBe('captura')
  })
  it('xeque', () => {
    const fen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2'
    expect(somDoLance(fen, depois(fen, 'Bb5+'))).toBe('xeque')
  })
  it('xeque-mate', () => {
    const fen = 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2'
    expect(somDoLance(fen, depois(fen, 'Qh4#'))).toBe('mate')
  })
  it('roque', () => {
    const fen = 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4'
    expect(somDoLance(fen, depois(fen, 'O-O'))).toBe('lance')
  })
  it('lance desfeito também toca', () => {
    const fen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2'
    expect(somDoLance(depois(fen, 'exd5'), fen)).toBe('lance')
  })
  it('mesma posição ou salto grande fica em silêncio', () => {
    expect(somDoLance(INICIO, INICIO)).toBeNull()
    const longe = depois(depois(depois(INICIO, 'e4'), 'e5'), 'Nf3')
    expect(somDoLance(INICIO, longe)).toBeNull()
  })
  it('posição sem reis (Fundamentos) usa a contagem', () => {
    expect(somDoLance('8/8/8/8/8/8/8/R7 w - - 0 1', '8/8/8/8/8/8/8/3R4 w - - 0 1')).toBe('lance')
    expect(somDoLance('8/8/8/8/8/8/8/R2p4 w - - 0 1', '8/8/8/8/8/8/8/3R4 w - - 0 1')).toBe('captura')
  })
})
