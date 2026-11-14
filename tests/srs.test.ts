import { describe, expect, it } from 'vitest'
import {
  aplicarResultado,
  estaDominado,
  filaDoDia,
  idCartao,
  notaDaPartida,
  revisar,
  somarDias,
  type Cartao,
  type UnidadeRevisao,
} from '../src/lib/srs'

const HOJE = '2026-11-07'

function cartao(parcial: Partial<Cartao> = {}): Cartao {
  return {
    repeticoes: 1,
    intervalo: 1,
    facilidade: 2.5,
    proxima: HOJE,
    criado: '2026-11-01',
    ...parcial,
  }
}

const unidade = (linha: string): UnidadeRevisao => ({ capitulo: 'x', linha, cor: 'b' })

describe('SM-2 simplificado', () => {
  it('nota 5 sem erros/pistas, 3 com pistas, 1 com erro', () => {
    expect(notaDaPartida(0, 0)).toBe(5)
    expect(notaDaPartida(0, 2)).toBe(3)
    expect(notaDaPartida(1, 2)).toBe(1)
  })

  it('segue os intervalos 1d → 3d → 7d → intervalo × facilidade', () => {
    let atual = revisar(undefined, 5, HOJE)
    expect(atual.intervalo).toBe(1)
    atual = revisar(atual, 5, HOJE)
    expect(atual.intervalo).toBe(3)
    atual = revisar(atual, 5, HOJE)
    expect(atual.intervalo).toBe(7)
    const facilidade = atual.facilidade
    atual = revisar(atual, 5, HOJE)
    expect(atual.intervalo).toBe(Math.round(7 * (facilidade + 0.1)))
    expect(atual.proxima).toBe(somarDias(HOJE, atual.intervalo))
  })

  it('erro zera as repetições e nunca deixa a facilidade abaixo de 1,3', () => {
    let atual = cartao({ repeticoes: 5, intervalo: 30 })
    for (let i = 0; i < 10; i++) atual = revisar(atual, 1, HOJE)
    expect(atual.repeticoes).toBe(0)
    expect(atual.intervalo).toBe(1)
    expect(atual.facilidade).toBe(1.3)
  })

  it('soma dias atravessando o mês', () => {
    expect(somarDias('2026-11-30', 1)).toBe('2026-12-01')
  })

  it('domina a partir do intervalo de 7 dias', () => {
    expect(estaDominado(undefined)).toBe(false)
    expect(estaDominado(cartao({ repeticoes: 2 }))).toBe(false)
    expect(estaDominado(cartao({ repeticoes: 3 }))).toBe(true)
  })
})

describe('treino fora do prazo', () => {
  const futuro = cartao({ proxima: '2026-11-20', repeticoes: 3, intervalo: 7 })

  it('acertar não adianta a agenda', () => {
    expect(aplicarResultado(futuro, 5, HOJE)).toBe(futuro)
    expect(aplicarResultado(futuro, 3, HOJE)).toBe(futuro)
  })

  it('errar traz a linha de volta', () => {
    expect(aplicarResultado(futuro, 1, HOJE).proxima).toBe(somarDias(HOJE, 1))
  })

  it('cartão vencido é revisado normalmente', () => {
    expect(aplicarResultado(cartao(), 5, HOJE).repeticoes).toBe(2)
  })
})

describe('fila do dia', () => {
  const unidades = ['a', 'b', 'c', 'd'].map(unidade)
  const id = (linha: string) => idCartao(unidade(linha))

  it('ordena as pendentes pela mais atrasada e ignora as futuras', () => {
    const fila = filaDoDia(
      unidades,
      {
        [id('a')]: cartao({ proxima: HOJE }),
        [id('b')]: cartao({ proxima: '2026-11-01' }),
        [id('c')]: cartao({ proxima: '2026-11-08' }),
        [id('d')]: cartao({ proxima: '2026-11-03' }),
      },
      HOJE,
      5,
    )
    expect(fila.pendentes.map((u) => u.linha)).toEqual(['b', 'd', 'a'])
    expect(fila.novas).toEqual([])
  })

  it('limita as novas descontando as criadas hoje', () => {
    const cheia = filaDoDia(unidades, {}, HOJE, 3)
    expect(cheia.novas.map((u) => u.linha)).toEqual(['a', 'b', 'c'])

    const parcial = filaDoDia(
      unidades,
      { [id('a')]: cartao({ criado: HOJE, proxima: '2026-11-08' }) },
      HOJE,
      2,
    )
    expect(parcial.novas.map((u) => u.linha)).toEqual(['b'])

    const esgotada = filaDoDia(
      unidades,
      { outro: cartao({ criado: HOJE, proxima: '2026-11-08' }) },
      HOJE,
      1,
    )
    expect(esgotada.novas).toEqual([])
  })
})

describe('já sei esta linha', () => {
  it('conta como dominada e volta só daqui a 30 dias', async () => {
    const { marcarComoSabida, estaDominado, estaPendente } = await import('../src/lib/srs')
    const nova = marcarComoSabida(undefined, '2026-11-13')
    expect(estaDominado(nova)).toBe(true)
    expect(nova.proxima).toBe('2026-12-13')
    expect(estaPendente(nova, '2026-12-12')).toBe(false)
  })

  it('não encurta um intervalo que já era maior', async () => {
    const { marcarComoSabida } = await import('../src/lib/srs')
    const longa = { repeticoes: 6, intervalo: 60, facilidade: 2.6, proxima: '2026-11-13', criado: '2026-01-01' }
    expect(marcarComoSabida(longa, '2026-11-13')).toMatchObject({ repeticoes: 6, intervalo: 60, proxima: '2027-01-12' })
  })
})
