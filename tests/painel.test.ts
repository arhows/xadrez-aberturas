import { describe, expect, it } from 'vitest'
import { carregarCapitulos } from '../src/lib/capitulos'
import {
  atividadePorDia,
  calendario,
  linhasDificeis,
  melhorSequencia,
  previsaoDeRevisoes,
  resumoDosCapitulos,
  sequenciaDeDias,
  somarAtividade,
  somarEstagios,
} from '../src/lib/painel'
import { normalizarProgresso, type Atividade } from '../src/lib/progresso'
import { juntarProgresso, paraNuvem } from '../src/lib/sincronizacao'
import type { Cartao } from '../src/lib/srs'

const capitulos = await carregarCapitulos()

const cartao = (dados: Partial<Cartao>): Cartao => ({
  repeticoes: 1,
  intervalo: 1,
  facilidade: 2.5,
  proxima: '2026-11-12',
  criado: '2026-11-11',
  ...dados,
})
const dias = (lista: Record<string, number>) =>
  new Map<string, Atividade>(Object.entries(lista).map(([dia, linhas]) => [dia, { linhas, exercicios: 0 }]))

describe('atividade do dia', () => {
  it('soma treinos e exercícios no dia certo', () => {
    const registro: Record<string, Atividade> = {}
    somarAtividade(registro, 'linhas', '2026-11-11')
    somarAtividade(registro, 'linhas', '2026-11-11')
    somarAtividade(registro, 'exercicios', '2026-11-11')
    expect(registro).toEqual({ '2026-11-11': { linhas: 2, exercicios: 1 } })
  })

  it('estima os dias antigos pelos cartões e fica com o maior valor', () => {
    const cartoes = {
      a: cartao({ criado: '2026-11-01', proxima: '2026-11-08', intervalo: 3 }), // criado 01, revisado 05
      b: cartao({ criado: '2026-11-05', proxima: '2026-11-06', intervalo: 1 }), // criado e revisado 05
    }
    const resultado = atividadePorDia({ '2026-11-05': { linhas: 7, exercicios: 0 } }, cartoes, {})
    expect(resultado.get('2026-11-01')).toEqual({ linhas: 1, exercicios: 0 })
    expect(resultado.get('2026-11-05')).toEqual({ linhas: 7, exercicios: 0 })
  })

  it('sincroniza ficando com o maior de cada dia, sem somar duas vezes', () => {
    const vazio = () => paraNuvem(normalizarProgresso({ cartoes: {} })!)
    const celular = vazio()
    celular.atividade = { '2026-11-10': { linhas: 3, exercicios: 0 }, '2026-11-11': { linhas: 1, exercicios: 5 } }
    const computador = vazio()
    computador.atividade = { '2026-11-11': { linhas: 4, exercicios: 2 } }
    const junto = juntarProgresso(celular, computador)
    expect(junto.atividade).toEqual({
      '2026-11-10': { linhas: 3, exercicios: 0 },
      '2026-11-11': { linhas: 4, exercicios: 5 },
    })
    expect(juntarProgresso(junto, computador)).toEqual(junto)
  })

  it('progresso antigo, sem atividade, carrega vazio', () => {
    expect(normalizarProgresso({ cartoes: {} })!.atividade).toEqual({})
  })
})

describe('sequência de dias', () => {
  it('conta até hoje, ou até ontem se hoje ainda não teve estudo', () => {
    expect(sequenciaDeDias(dias({ '2026-11-09': 1, '2026-11-10': 2, '2026-11-11': 1 }), '2026-11-11')).toBe(3)
    expect(sequenciaDeDias(dias({ '2026-11-09': 1, '2026-11-10': 2 }), '2026-11-11')).toBe(2)
    expect(sequenciaDeDias(dias({ '2026-11-09': 1 }), '2026-11-11')).toBe(0)
  })

  it('recorde atravessa a virada do mês', () => {
    expect(melhorSequencia(dias({ '2026-10-30': 1, '2026-10-31': 1, '2026-11-01': 1, '2026-11-05': 1 }))).toBe(3)
  })
})

describe('calendário', () => {
  it('semanas de domingo a sábado terminando na semana de hoje', () => {
    const grade = calendario(dias({ '2026-11-11': 4, '2026-11-10': 1 }), 2, '2026-11-11') // quarta-feira
    expect(grade).toHaveLength(2)
    expect(grade[1][0].data).toBe('2026-11-08') // domingo
    expect(grade[1][3]).toMatchObject({ data: '2026-11-11', nivel: 4 })
    expect(grade[1][2].nivel).toBe(1)
    expect(grade[1][4].futuro).toBe(true)
  })
})

describe('repertório e revisões', () => {
  const petrov = capitulos.find((c) => c.capitulo.id === 'petrov')!

  it('classifica cada coluna nas cores escolhidas', () => {
    const [l1, l2] = petrov.capitulo.linhas
    const cartoes = {
      [`petrov/${l1.id}|b`]: cartao({ repeticoes: 3 }),
      [`petrov/${l2.id}|b`]: cartao({ repeticoes: 0, proxima: '2026-11-10' }),
    }
    const [resumo] = resumoDosCapitulos([petrov], cartoes, { petrov: 'b' }, '2026-11-11')
    expect(resumo.estagios.dominadas).toBe(1)
    expect(resumo.estagios.aprendendo).toBe(1)
    expect(resumo.estagios.novas).toBe(resumo.total - 2)
    expect(resumo.pendentes).toBe(1)
    expect(somarEstagios([resumo, resumo]).dominadas).toBe(2)
  })

  it('previsão põe as atrasadas em hoje e ignora as de depois do período', () => {
    const cartoes = {
      a: cartao({ proxima: '2026-11-01' }),
      b: cartao({ proxima: '2026-11-11' }),
      c: cartao({ proxima: '2026-11-13' }),
      d: cartao({ proxima: '2026-12-30' }),
    }
    const previsao = previsaoDeRevisoes(cartoes, 7, '2026-11-11')
    expect(previsao.map((dia) => dia.total)).toEqual([2, 0, 1, 0, 0, 0, 0])
  })

  it('linhas difíceis: menor facilidade primeiro, só as que já custaram algo', () => {
    const cartoes = {
      'petrov/c01|w': cartao({ facilidade: 2.5 }),
      'petrov/c02|b': cartao({ facilidade: 1.6 }),
      'siciliana-najdorf-a/c03|w': cartao({ facilidade: 2.1 }),
    }
    expect(linhasDificeis(cartoes, 5).map((l) => `${l.capitulo}/${l.linha}|${l.cor}`)).toEqual([
      'petrov/c02|b',
      'siciliana-najdorf-a/c03|w',
    ])
  })
})

describe('repertório na sincronização', () => {
  it('vale a escolha mudada por último, mesmo que tire aberturas', () => {
    const vazio = () => paraNuvem(normalizarProgresso({ cartoes: {} })!)
    const celular = vazio()
    celular.repertorio = { capitulos: ['petrov'], atualizado: '2026-11-11T10:00:00.000Z' }
    const computador = vazio()
    computador.repertorio = { capitulos: ['petrov', 'italian'], atualizado: '2026-11-10T10:00:00.000Z' }
    expect(juntarProgresso(celular, computador).repertorio.capitulos).toEqual(['petrov'])
    expect(juntarProgresso(computador, celular).repertorio.capitulos).toEqual(['petrov'])
  })

  it('progresso antigo carrega sem repertório (todas as aberturas contam)', () => {
    expect(normalizarProgresso({ cartoes: {} })!.repertorio).toEqual({ capitulos: [], atualizado: '' })
  })
})

describe('evolução por semana', () => {
  it('as semanas começam no domingo e terminam na atual', async () => {
    const { semanas } = await import('../src/lib/painel')
    expect(semanas(3, '2026-11-13')).toEqual(['2026-10-25', '2026-11-01', '2026-11-08'])
  })

  it('soma a atividade de cada semana', async () => {
    const { atividadePorSemana } = await import('../src/lib/painel')
    const dias = new Map([
      ['2026-11-09', { linhas: 2, exercicios: 3 }],
      ['2026-11-13', { linhas: 1, exercicios: 0 }],
      ['2026-11-02', { linhas: 0, exercicios: 4 }],
    ])
    expect(atividadePorSemana(dias, 2, '2026-11-13').map((p) => p.valor)).toEqual([4, 6])
  })

  it('acumula as linhas começadas até o fim de cada semana', async () => {
    const { linhasComecadasAteCadaSemana } = await import('../src/lib/painel')
    const cartao = (criado: string) => ({ repeticoes: 1, intervalo: 1, facilidade: 2.5, proxima: criado, criado })
    const cartoes = { a: cartao('2026-10-30'), b: cartao('2026-11-03'), c: cartao('2026-11-10') }
    expect(linhasComecadasAteCadaSemana(cartoes, 3, '2026-11-13').map((p) => p.valor)).toEqual([1, 2, 3])
  })

  it('% de primeira nos exercícios do dia; semana sem exercícios fica sem valor', async () => {
    const { acertoDePrimeiraPorSemana } = await import('../src/lib/painel')
    const diario = { '2026-11-10': { '0': 'primeira', '1': 'ajuda', '2': 'primeira', '3': 'primeira' } }
    expect(acertoDePrimeiraPorSemana(diario, 2, '2026-11-13').map((p) => p.valor)).toEqual([null, 75])
  })
})
