import { describe, expect, it } from 'vitest'
import { jogarLances } from '../src/lib/lances'
import { materialDaPosicao } from '../src/lib/material'

const depois = (lances: string) => jogarLances(lances).lances.at(-1)!.fenDepois

describe('material', () => {
  it('posição inicial: nada capturado e saldo zero', () => {
    const m = materialDaPosicao('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    expect(m).toEqual({ capturadas: { w: [], b: [] }, saldo: 0 })
  })

  it('conta as capturas de cada lado e o saldo', () => {
    // Coluna 1 dos Dois Cavalos até 7...bxc6: as brancas ganharam um peão a mais.
    const m = materialDaPosicao(
      depois('1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6'),
    )
    expect(m.capturadas).toEqual({ w: ['p', 'p'], b: ['p'] })
    expect(m.saldo).toBe(1)
  })

  it('ordena da peça mais valiosa para a menos valiosa', () => {
    // Fried Liver: as pretas capturaram o cavalo de f7 e as brancas, o peão de d5 e o de f7.
    const m = materialDaPosicao(
      depois('1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7'),
    )
    expect(m.capturadas.b).toEqual(['n', 'p'])
    expect(m.capturadas.w).toEqual(['p', 'p'])
    expect(m.saldo).toBe(-2)
  })
})
