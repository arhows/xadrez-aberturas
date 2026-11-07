import { describe, expect, it } from 'vitest'
import { construirArvore } from '../src/lib/arvore'
import type { CapituloCarregado } from '../src/lib/capitulos'
import { corDoCapitulo, planoDeRevisao, type EstadoDaRevisao } from '../src/lib/escopo'
import { idCartao, repartirVagas, type Cartao } from '../src/lib/srs'
import type { Capitulo } from '../src/lib/tipos'
import { validarCapitulo } from '../src/lib/validacao'

const HOJE = '2026-11-07'

function capitulo(id: string, linhas: number, corPadrao?: Capitulo['corPadrao']): CapituloCarregado {
  const validado = validarCapitulo({
    id,
    nome: id,
    base: '',
    corPadrao,
    grupos: [{ id: 'g', nome: 'g', colunas: [] }],
    linhas: Array.from({ length: linhas }, (_, i) => ({
      id: `l${i}`,
      coluna: i + 1,
      grupo: 'g',
      nome: `l${i}`,
      lances: '1. e4 e5',
      avaliacao: null,
      resumo: '',
      dicas: {},
    })),
  })
  return { ...validado, arvore: construirArvore(validado) }
}

function cartao(parcial: Partial<Cartao>): Cartao {
  return {
    repeticoes: 1,
    intervalo: 1,
    facilidade: 2.5,
    proxima: '2026-11-20',
    criado: '2026-11-01',
    ...parcial,
  }
}

function estado(parcial: Partial<EstadoDaRevisao> = {}): EstadoDaRevisao {
  return {
    cartoes: {},
    notasConferidas: [],
    corPorCapitulo: {},
    profundidade: 'colunas',
    novasPorDia: 5,
    ...parcial,
  }
}

const tamanhos = (planos: ReturnType<typeof planoDeRevisao>) =>
  Object.fromEntries(planos.map((p) => [p.capitulo.capitulo.id, p.fila.length]))

describe('repartirVagas', () => {
  const candidato = (id: string, disponiveis = 10, iniciadas = 0, criadasHoje = 0) => ({
    id,
    disponiveis,
    iniciadas,
    criadasHoje,
  })

  it('divide em rodízio', () => {
    const parte = repartirVagas(['a', 'b', 'c', 'd'].map((id) => candidato(id)), 5)
    expect([...parte.values()]).toEqual([2, 1, 1, 1])
  })

  it('a sobra de quem tem poucas novas passa para os outros', () => {
    const parte = repartirVagas([candidato('a', 1), candidato('b', 10)], 5)
    expect(parte.get('a')).toBe(1)
    expect(parte.get('b')).toBe(4)
  })

  it('o capítulo menos iniciado recebe primeiro', () => {
    const parte = repartirVagas([candidato('a', 10, 8), candidato('b', 10, 0)], 1)
    expect(parte.get('a')).toBe(0)
    expect(parte.get('b')).toBe(1)
  })

  it('quem já usou vagas hoje fica para depois', () => {
    const parte = repartirVagas([candidato('a', 10, 3, 3), candidato('b', 10, 0, 0)], 2)
    expect(parte.get('a')).toBe(0)
    expect(parte.get('b')).toBe(2)
  })

  it('termina mesmo com mais vagas do que linhas novas', () => {
    const parte = repartirVagas([candidato('a', 1)], 5)
    expect(parte.get('a')).toBe(1)
  })
})

describe('plano de revisão com vários capítulos', () => {
  const a = capitulo('a', 10, 'w')
  const b = capitulo('b', 10, 'b')

  it('reparte o limite diário e nunca passa dele', () => {
    const planos = planoDeRevisao([a, b], estado(), HOJE)
    expect(tamanhos(planos)).toEqual({ a: 3, b: 2 })
  })

  it('desconta o que já foi criado hoje em qualquer capítulo', () => {
    const cartoes = {
      'a/l0|w': cartao({ criado: HOJE }),
      'a/l1|w': cartao({ criado: HOJE }),
      'a/l2|w': cartao({ criado: HOJE }),
    }
    const planos = planoDeRevisao([a, b], estado({ cartoes }), HOJE)
    expect(tamanhos(planos)).toEqual({ a: 0, b: 2 })
  })

  it('usa a cor padrão de cada capítulo nas linhas novas', () => {
    const [planoA, planoB] = planoDeRevisao([a, b], estado(), HOJE)
    expect(new Set(planoA.fila.map((u) => u.cor))).toEqual(new Set(['w']))
    expect(new Set(planoB.fila.map((u) => u.cor))).toEqual(new Set(['b']))
  })

  it('a escolha do usuário vale só para aquele capítulo', () => {
    const corPorCapitulo = { a: 'b' as const }
    expect(corDoCapitulo(a, corPorCapitulo)).toBe('b')
    expect(corDoCapitulo(capitulo('c', 1, 'w'), corPorCapitulo)).toBe('w')
  })

  it('sem cor padrão, o capítulo treina as duas cores', () => {
    expect(corDoCapitulo(capitulo('c', 1), {})).toBe('ambas')
  })

  it('revisão vencida entra em qualquer cor, mesmo sem vagas para novas', () => {
    const vencida = idCartao({ capitulo: 'a', linha: 'l0', cor: 'b' })
    const planos = planoDeRevisao(
      [a, b],
      estado({ cartoes: { [vencida]: cartao({ proxima: HOJE }) }, novasPorDia: 0 }),
      HOJE,
    )
    expect(planos[0].fila).toEqual([{ capitulo: 'a', linha: 'l0', cor: 'b' }])
    expect(planos[1].fila).toEqual([])
  })
})
