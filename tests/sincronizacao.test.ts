import { describe, expect, it } from 'vitest'
import { normalizarProgresso } from '../src/lib/progresso'
import { cartaoMaisRecente, juntarProgresso, paraNuvem } from '../src/lib/sincronizacao'
import type { Cartao } from '../src/lib/srs'

const vazio = () => paraNuvem(normalizarProgresso({ cartoes: {} })!)
const cartao = (proxima: string, intervalo: number, repeticoes = 1): Cartao => ({
  repeticoes,
  intervalo,
  facilidade: 2.5,
  proxima,
  criado: '2026-11-01',
})

describe('cartaoMaisRecente', () => {
  it('fica com o revisado por último, mesmo que o outro tenha próxima data maior', () => {
    const antigo = cartao('2026-11-20', 14, 4) // revisado em 06/11
    const novo = cartao('2026-11-09', 1, 0) // errou em 08/11
    expect(cartaoMaisRecente(antigo, novo)).toBe(novo)
    expect(cartaoMaisRecente(novo, antigo)).toBe(novo)
  })

  it('no empate de dia, fica o com mais repetições', () => {
    const a = cartao('2026-11-11', 3, 2)
    const b = cartao('2026-11-09', 1, 1)
    expect(cartaoMaisRecente(b, a)).toBe(a)
  })
})

describe('juntarProgresso', () => {
  it('não perde estudo de nenhum aparelho', () => {
    const celular = vazio()
    celular.cartoes['italian/c01|w'] = cartao('2026-11-11', 3, 2)
    celular.notasConferidas = ['n1']
    celular.exercicios = { 'polgar-mate-1': { '1': 'ajuda', '2': 'primeira' } }
    celular.errosPorAresta = { e: { capitulo: 'italian', erros: 1, caminho: ['e4'], linhas: ['c01'] } }

    const computador = vazio()
    computador.cartoes['two-knights/c05|b'] = cartao('2026-11-09', 1)
    computador.notasConferidas = ['n1', 'n2']
    computador.exercicios = { 'polgar-mate-1': { '1': 'primeira' }, 'cicero-mate-2': { '7': 'ajuda' } }
    computador.errosPorAresta = { e: { capitulo: 'italian', erros: 3, caminho: ['e4'], linhas: ['c02'] } }
    computador.partidas.lichess = 'fulano'

    const junto = juntarProgresso(celular, computador)
    expect(Object.keys(junto.cartoes).sort()).toEqual(['italian/c01|w', 'two-knights/c05|b'])
    expect(junto.notasConferidas.sort()).toEqual(['n1', 'n2'])
    expect(junto.exercicios).toEqual({
      'polgar-mate-1': { '1': 'primeira', '2': 'primeira' },
      'cicero-mate-2': { '7': 'ajuda' },
    })
    expect(junto.errosPorAresta.e.erros).toBe(3)
    expect(junto.errosPorAresta.e.linhas.sort()).toEqual(['c01', 'c02'])
    expect(junto.partidas.lichess).toBe('fulano')
  })

  it('juntar de novo não muda nada (a sincronização para de gravar)', () => {
    const a = vazio()
    a.cartoes.x = cartao('2026-11-11', 3)
    const b = vazio()
    b.cartoes.y = cartao('2026-11-12', 7)
    const junto = juntarProgresso(a, b)
    expect(JSON.stringify(juntarProgresso(junto, b))).toBe(JSON.stringify(junto))
  })

  it('as configurações não vão para a nuvem', () => {
    expect('config' in vazio()).toBe(false)
  })
})
