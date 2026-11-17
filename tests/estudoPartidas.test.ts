import { describe, expect, it } from 'vitest'
import {
  corDoLance,
  estudosVisiveis,
  juntarEstudos,
  lerPgnDoEstudo,
  perguntasDoEstudo,
  posicoesDoEstudo,
  registrarAcertoNoEstudo,
  registrarErroNoEstudo,
  revisoesDeEstudo,
  type EstudoPartida,
} from '../src/lib/estudoPartidas'
import type { Cartao } from '../src/lib/srs'

const estudo = (extra: Partial<EstudoPartida> = {}): EstudoPartida => ({
  id: 'a',
  nome: 'Capablanca × Marshall',
  lances: 'e4 e5 Nf3 Nc6 Bb5',
  lado: 'w',
  criado: '2026-11-17T10:00:00Z',
  atualizado: '2026-11-17T10:00:00Z',
  ...extra,
})

describe('estudo de partidas', () => {
  it('posições e cor de cada lance', () => {
    const e = estudo()
    expect(posicoesDoEstudo(e)).toHaveLength(6)
    expect(corDoLance(e, 0)).toBe('w')
    expect(corDoLance(e, 1)).toBe('b')
    // Posição do editor com as pretas a jogar.
    expect(corDoLance({ fen: '4k3/8/8/8/8/8/8/4K3 b - - 0 1' }, 0)).toBe('b')
  })

  it('perguntas pelo lado e a partir de um lance', () => {
    const e = estudo()
    expect(perguntasDoEstudo(e, 'w')).toEqual([0, 2, 4])
    expect(perguntasDoEstudo(e, 'b')).toEqual([1, 3])
    expect(perguntasDoEstudo(e, 'ambos', 3)).toEqual([3, 4])
  })

  it('lê PGN com cabeçalhos', () => {
    const lido = lerPgnDoEstudo('[White "Capablanca"]\n[Black "Marshall"]\n[Date "1918.10.23"]\n\n1. e4 e5 2. Nf3 Nc6 *')
    expect(lido).toMatchObject({ lances: 'e4 e5 Nf3 Nc6', brancas: 'Capablanca', pretas: 'Marshall', data: '1918.10.23' })
    expect(lerPgnDoEstudo('1. e4 e5 2. Ke3 Qh8')).toBeNull()
  })

  it('erros viram revisões; acerto adia', () => {
    const cartoes: Record<string, Cartao> = {}
    registrarErroNoEstudo(cartoes, 'a', 2, '2026-11-17')
    expect(Object.keys(cartoes)).toEqual(['a/2'])
    const estudos = { a: estudo() }
    expect(revisoesDeEstudo(cartoes, estudos, '2026-11-17')).toEqual([])
    const amanha = revisoesDeEstudo(cartoes, estudos, '2026-11-18')
    expect(amanha).toEqual([{ id: 'a', i: 2, proxima: '2026-11-18' }])
    registrarAcertoNoEstudo(cartoes, 'a', 2, '2026-11-18')
    expect(cartoes['a/2'].proxima > '2026-11-18').toBe(true)
    // Acerto num lance que nunca foi errado não cria cartão.
    registrarAcertoNoEstudo(cartoes, 'a', 4, '2026-11-18')
    expect(cartoes['a/4']).toBeUndefined()
  })

  it('revisões de partidas apagadas somem', () => {
    const cartoes: Record<string, Cartao> = {}
    registrarErroNoEstudo(cartoes, 'a', 0, '2026-11-17')
    expect(revisoesDeEstudo(cartoes, { a: estudo({ apagada: true }) }, '2026-11-20')).toEqual([])
    expect(revisoesDeEstudo(cartoes, {}, '2026-11-20')).toEqual([])
  })

  it('sincronização: apagada vence, senão a mais recente', () => {
    const velho = estudo({ nome: 'velho' })
    const novo = estudo({ nome: 'novo', atualizado: '2026-11-18T00:00:00Z' })
    expect(juntarEstudos({ a: velho }, { a: novo }).a.nome).toBe('novo')
    expect(juntarEstudos({ a: novo }, { a: velho }).a.nome).toBe('novo')
    expect(juntarEstudos({ a: estudo({ apagada: true }) }, { a: novo }).a.apagada).toBe(true)
    expect(estudosVisiveis(juntarEstudos({ a: estudo({ apagada: true }) }, { b: estudo({ id: 'b' }) })).map((e) => e.id)).toEqual(['b'])
  })
})
