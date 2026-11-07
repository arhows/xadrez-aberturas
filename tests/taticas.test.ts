import { describe, expect, it } from 'vitest'
import { jogarLances } from '../src/lib/lances'
import { taticasDaPosicao } from '../src/lib/taticas'

const depois = (lances: string) => jogarLances(lances).lances.at(-1)!.fenDepois
const tipos = (fen: string) => taticasDaPosicao(fen).map((t) => t.tipo)

describe('táticas no tabuleiro', () => {
  it('posição inicial e 1.e4 e5 não têm nada', () => {
    expect(taticasDaPosicao('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')).toEqual([])
    expect(taticasDaPosicao(depois('1. e4 e5'))).toEqual([])
  })

  it('2.Nf3 deixa o peão de e5 atacado e sem defesa', () => {
    const [t] = taticasDaPosicao(depois('1. e4 e5 2. Nf3'))
    expect(t).toMatchObject({ tipo: 'sem-defesa', favorece: 'w', de: 'f3', alvos: ['e5'] })
    expect(t.texto).toBe('Sem defesa: o peão preto de e5 está atacado e não tem defensor.')
  })

  it('cravada absoluta: Bb5 contra o cavalo de c6 e o rei', () => {
    const fen = depois(
      '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Bd2 Bxd2+ 8. Nbxd2 d5 9. exd5 Nxd5 10. Qb3 Na5 11. Qa4+ Nc6 12. Bb5',
    )
    const cravada = taticasDaPosicao(fen).find((t) => t.tipo === 'cravada-absoluta')!
    expect(cravada).toMatchObject({ de: 'b5', alvos: ['c6', 'e8'], favorece: 'w' })
    expect(cravada.texto).toBe('Cravada absoluta: o bispo branco de b5 crava o cavalo de c6 contra o rei; ele não pode sair.')
  })

  it('cravada relativa: Bg5 contra o cavalo de f6 e a dama', () => {
    const fen = depois('1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d3 O-O 6. b4 Bb6 7. a4 a6 8. O-O d6 9. Bg5')
    const cravada = taticasDaPosicao(fen).find((t) => t.tipo === 'cravada')!
    expect(cravada).toMatchObject({ de: 'g5', alvos: ['f6', 'd8'] })
    expect(cravada.texto).toBe('Cravada: o bispo branco de g5 crava o cavalo de f6 contra a dama; se ele sair, a dama fica exposta.')
  })

  it('ataque duplo: cavalo em c7 contra o rei e a torre', () => {
    const [t] = taticasDaPosicao('r3k3/2N5/8/8/8/8/8/4K3 b - - 0 1')
    expect(t).toMatchObject({ tipo: 'ataque-duplo', de: 'c7', favorece: 'w' })
    expect(t.alvos.sort()).toEqual(['a8', 'e8'])
  })

  it('espeto: torre ataca o rei com a torre atrás', () => {
    expect(tipos('4r3/8/8/8/4k3/8/8/4R1K1 b - - 0 1')).toContain('espeto')
  })

  it('peça defendida e atacada por igual não gera aviso', () => {
    // Cavalo de c6 defendido pelo peão de b7, atacado pelo cavalo de e5: troca equilibrada.
    expect(tipos('r1bqkb1r/pppp1ppp/2n2n2/4N3/8/8/PPPP1PPP/RNBQKB1R b KQkq - 0 1')).not.toContain('atacada')
  })

  it('peça atacada por uma de menor valor é avisada', () => {
    // Peão de d5 atacando o cavalo de c6, que tem defesa.
    const fen = 'r1bqkb1r/pppp1ppp/2n2n2/3P4/8/8/PPP2PPP/RNBQKBNR b KQkq - 0 1'
    const atacada = taticasDaPosicao(fen).find((t) => t.tipo === 'atacada')!
    expect(atacada.texto).toBe('Atacado por peça menor: o cavalo preto de c6 está na mira do peão de d5.')
  })

  it('não aponta cravada relativa de peão, só absoluta', () => {
    // Bispo preto em f6 na diagonal até a torre de a1, com o peão de b2 no meio.
    expect(tipos('r1bqk2r/pppp1ppp/2n2b2/8/8/8/PP3PPP/RNBQKBNR w KQkq - 0 1')).not.toContain('cravada')
  })

  it('mostra no máximo 5 avisos, os mais importantes primeiro', () => {
    const t = taticasDaPosicao('r3k2r/2N5/8/3q4/8/8/1B6/R3K2R w KQkq - 0 1')
    expect(t.length).toBeLessThanOrEqual(5)
    expect(t[0].tipo).toBe('ataque-duplo')
  })
})
