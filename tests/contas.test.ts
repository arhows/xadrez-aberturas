import { beforeEach, describe, expect, it } from 'vitest'

// localStorage de mentira (os testes rodam no Node).
const dados = new Map<string, string>()
globalThis.localStorage = {
  getItem: (k: string) => dados.get(k) ?? null,
  setItem: (k: string, v: string) => void dados.set(k, v),
  removeItem: (k: string) => void dados.delete(k),
  clear: () => dados.clear(),
  key: () => null,
  length: 0,
} as Storage

const { abrirProgressoDaConta, apagarProgressoSemConta, fecharProgresso, progresso, progressoSemConta } = await import(
  '../src/lib/progresso'
)
const { nextTick } = await import('vue')

const cartao = { repeticoes: 1, intervalo: 1, facilidade: 2.5, proxima: '2026-11-09', criado: '2026-11-08' }

describe('progresso por conta', () => {
  beforeEach(() => dados.clear())

  it('cada conta vê só o próprio progresso no mesmo aparelho', async () => {
    abrirProgressoDaConta('filho')
    progresso.cartoes['italian/c01|w'] = cartao
    await nextTick()

    abrirProgressoDaConta('pai')
    expect(progresso.cartoes).toEqual({})
    progresso.notasConferidas.push('n1')
    await nextTick()

    abrirProgressoDaConta('filho')
    expect(Object.keys(progresso.cartoes)).toEqual(['italian/c01|w'])
    expect(progresso.notasConferidas).toEqual([])
  })

  it('ao sair, a tela fica vazia e nada é gravado sem conta', async () => {
    abrirProgressoDaConta('filho')
    progresso.cartoes.x = cartao
    await nextTick()
    fecharProgresso()
    expect(progresso.cartoes).toEqual({})
    progresso.cartoes.y = cartao
    await nextTick()
    abrirProgressoDaConta('filho')
    expect(Object.keys(progresso.cartoes)).toEqual(['x'])
  })

  it('o progresso de antes do login só é oferecido se tiver estudo', () => {
    dados.set('aberturas.progresso.v1', JSON.stringify({ cartoes: {}, config: { tema: 'escuro' } }))
    expect(progressoSemConta()).toBeNull()
    dados.set('aberturas.progresso.v1', JSON.stringify({ cartoes: { a: cartao } }))
    expect(progressoSemConta()?.cartoes.a).toEqual(cartao)
    apagarProgressoSemConta()
    expect(progressoSemConta()).toBeNull()
  })
})
