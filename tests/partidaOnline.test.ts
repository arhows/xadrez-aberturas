import { describe, expect, it } from 'vitest'
import {
  abandonar,
  aplicarResultado,
  entrar,
  jogadorNovo,
  jogar,
  novaPartida,
  novoRating,
  oferecerEmpate,
  problemaParaEntrar,
  responderEmpate,
  tempoAgora,
  verificarTempo,
  type PartidaOnline,
} from '../src/lib/partidaOnline'

const T0 = 1_000_000
const comecar = (tempo = '3+2'): PartidaOnline => {
  const p = novaPartida('ana', 'Ana', 'w', tempo, true, null, T0)
  return { ...p, ...entrar(p, 'bia', 'Bia', T0 + 5000) }
}
const lance = (p: PartidaOnline, uid: string, from: string, to: string, agora: number): PartidaOnline => ({ ...p, ...jogar(p, uid, { from, to }, agora) })

describe('partida on-line', () => {
  it('cria com a cor escolhida ou sorteada e o amigo entra na outra', () => {
    const p = novaPartida('ana', 'Ana', 'sorteio', 'livre', true, null, T0, () => 0.9)
    expect(p.pretas).toBe('ana')
    const junto = { ...p, ...entrar(p, 'bia', 'Bia', T0) }
    expect(junto).toMatchObject({ brancas: 'bia', pretas: 'ana', estado: 'jogando', jogadores: ['ana', 'bia'] })
  })

  it('desafio direto só aceita o convidado', () => {
    const p = novaPartida('ana', 'Ana', 'w', 'livre', true, { uid: 'bia', nome: 'Bia' }, T0)
    expect(problemaParaEntrar(p, 'caio')).toMatch(/outra pessoa/)
    expect(problemaParaEntrar(p, 'bia')).toBeNull()
  })

  it('só joga quem tem a vez, e o relógio começa no 1º lance', () => {
    let p = comecar()
    expect(() => jogar(p, 'bia', { from: 'e7', to: 'e5' }, T0 + 6000)).toThrow(/sua vez/)
    p = lance(p, 'ana', 'e2', 'e4', T0 + 60_000)
    expect(p.restante.w).toBe(180_000) // o 1º lance não gasta tempo
    p = lance(p, 'bia', 'e7', 'e5', T0 + 70_000)
    expect(p.restante.b).toBe(180_000 - 10_000 + 2000)
    expect(tempoAgora(p, 'w', T0 + 75_000)).toBe(175_000)
  })

  it('tempo esgotado encerra a partida', () => {
    let p = comecar()
    p = lance(p, 'ana', 'e2', 'e4', T0 + 6000)
    expect(verificarTempo(p, T0 + 6000 + 179_000)).toBeNull()
    expect(verificarTempo(p, T0 + 6000 + 181_000)).toMatchObject({ estado: 'fim', resultado: '1-0' })
    // Lance depois do tempo acabado não vale: perde por tempo.
    expect(jogar(p, 'bia', { from: 'e7', to: 'e5' }, T0 + 6000 + 200_000)).toMatchObject({ resultado: '1-0' })
  })

  it('xeque-mate encerra', () => {
    let p = comecar('livre')
    p = lance(p, 'ana', 'f2', 'f3', T0 + 1)
    p = lance(p, 'bia', 'e7', 'e5', T0 + 2)
    p = lance(p, 'ana', 'g2', 'g4', T0 + 3)
    p = lance(p, 'bia', 'd8', 'h4', T0 + 4)
    expect(p).toMatchObject({ estado: 'fim', resultado: '0-1' })
  })

  it('empate combinado e abandono', () => {
    const p = comecar()
    const oferta = { ...p, ...oferecerEmpate(p, 'ana') }
    expect(() => responderEmpate(oferta, 'ana', true)).toThrow()
    expect(responderEmpate(oferta, 'bia', true)).toMatchObject({ resultado: '1/2-1/2', estado: 'fim' })
    expect(abandonar(p, 'bia')).toMatchObject({ resultado: '1-0' })
  })
})

describe('ranking', () => {
  it('Elo: vencer quem tem o mesmo rating dá +20 no começo', () => {
    expect(novoRating(1200, 1200, 1, 0)).toBe(1220)
    expect(novoRating(1200, 1200, 0.5, 0)).toBe(1200)
    expect(novoRating(1200, 1200, 1, 30)).toBe(1210)
    expect(novoRating(1200, 1600, 1, 30)).toBeGreaterThan(1215)
  })
  it('conta vitórias, empates e derrotas', () => {
    const ana = aplicarResultado(jogadorNovo('Ana'), jogadorNovo('Bia'), 1)
    expect(ana).toMatchObject({ rating: 1220, partidas: 1, vitorias: 1 })
  })
})
