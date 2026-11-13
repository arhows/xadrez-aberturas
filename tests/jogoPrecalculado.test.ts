import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { aplicarUci, precalcularJogo } from '../src/lib/jogoPrecalculado'
import { jogarLances, separarLances } from '../src/lib/lances'
import type { Capitulo } from '../src/lib/tipos'

const capitulos: Capitulo[] = readdirSync('data/openings').map((f) => JSON.parse(readFileSync(`data/openings/${f}`, 'utf-8')))

describe('lances pré-calculados no build', () => {
  it('reproduzem exatamente o que o chess.js joga, em todas as aberturas', { timeout: 300_000 }, () => {
    let total = 0
    for (const capitulo of capitulos) {
      for (const item of [...capitulo.linhas, ...(capitulo.notas ?? []), ...(capitulo.armadilhas ?? [])]) {
        const conferido = jogarLances(item.lances)
        const rapido = jogarLances(item.lances, precalcularJogo(separarLances(item.lances)))
        expect(rapido, `${capitulo.id} / ${item.id}`).toEqual(conferido)
        total += conferido.lances.length
      }
    }
    expect(total).toBeGreaterThan(10_000)
  })

  it('casos especiais: roque, en passant, promoção e lance ilegal', () => {
    const texto = 'e4 d5 exd5 c5 dxc6 Nf6 cxb7 e5 bxa8=Q Bc5 Nf3 O-O Ke2 Qxd2+ Bxd2'
    expect(jogarLances(texto, precalcularJogo(separarLances(texto)))).toEqual(jogarLances(texto))
    const ilegal = 'e4 e5 Ke2 Nf6 Ke3 Nxe4 O-O'
    const pre = precalcularJogo(separarLances(ilegal))
    expect(pre.e).toBe(7)
    expect(jogarLances(ilegal, pre)).toEqual(jogarLances(ilegal))
    // Peão ao lado, mas a captura en passant deixaria o rei em xeque: o FEN não tem a casa.
    expect(aplicarUci('8/8/8/8/k2p3R/8/4P3/4K3 w - - 0 1', 'e2e4').split(' ')[3]).toBe('-')
    expect(aplicarUci('8/8/8/8/3p4/8/4P3/k3K3 w - - 0 1', 'e2e4').split(' ')[3]).toBe('e3')
  })
})
