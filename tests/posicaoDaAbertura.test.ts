import { describe, expect, it } from 'vitest'
import { obterArmadilhas, carregarArmadilhas } from '../src/lib/armadilhas'
import { carregarCapitulos } from '../src/lib/capitulos'
import { jogarLances, separarLances } from '../src/lib/lances'
import { fenDaAbertura } from '../src/lib/posicaoDaAbertura'
import { DESENHOS } from '../src/lib/icones'
import { APRENDER, EU, JOGAR, PRATICAR } from '../src/lib/secoes'

const capitulos = await carregarCapitulos()
await carregarArmadilhas()

describe('miniaturas', () => {
  it('a linha base de toda abertura se joga até o fim', () => {
    for (const c of capitulos) {
      expect(jogarLances(c.capitulo.base).erro, c.capitulo.id).toBeNull()
      expect(jogarLances(c.capitulo.base).lances.length, c.capitulo.id).toBe(separarLances(c.capitulo.base).length)
    }
  })

  it('a posição da Siciliana tem o peão em c5', () => {
    const siciliana = capitulos.find((c) => c.capitulo.base.replace(/\s/g, '') === '1.e4c5')
    if (siciliana) expect(fenDaAbertura(siciliana).split(' ')[0]).toBe('rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR')
  })

  it('toda armadilha se joga até o fim', () => {
    for (const a of obterArmadilhas()) expect(jogarLances(a.lances).erro, a.id).toBeNull()
  })

  it('todo atalho tem um ícone desenhado', () => {
    for (const secao of [APRENDER, PRATICAR, JOGAR, EU])
      for (const g of secao.grupos) for (const a of g.atalhos) expect(DESENHOS[a.icone], a.id).toBeTruthy()
  })
})

describe('miniaturas da estratégia', () => {
  it('toda partida-modelo chega ao lance da miniatura sem lance ilegal', async () => {
    const { carregarEstrategia, PLY_DA_MINIATURA } = await import('../src/lib/estrategia')
    const livro = await carregarEstrategia()
    for (const e of livro.estruturas)
      for (const p of e.partidas) {
        const parte = p.lances.split(' ').slice(0, PLY_DA_MINIATURA).join(' ')
        expect(jogarLances(parte).erro, `${e.id}/${p.n}`).toBeNull()
      }
  })
})
