import { describe, expect, it } from 'vitest'
import { buscarCapitulo, carregarCapitulos } from '../src/lib/capitulos'
import type { ErroAresta } from '../src/lib/progresso'
import { juntarProgresso, paraNuvem } from '../src/lib/sincronizacao'
import { normalizarProgresso } from '../src/lib/progresso'
import { perguntasDeErro, registrarAcerto, registrarFalha } from '../src/lib/treinoErros'

await carregarCapitulos()

const erro = (caminho: string[], erros: number, extra: Partial<ErroAresta> = {}): ErroAresta => ({
  capitulo: 'petrov',
  erros,
  caminho,
  linhas: ['c01'],
  ...extra,
})

describe('treinar meus erros', () => {
  it('monta as perguntas do mais errado ao menos, só com erros abertos e lances que existem', () => {
    const perguntas = perguntasDeErro(
      {
        a: erro(['e4', 'e5', 'Nf3', 'Nf6', 'Nxe5'], 1),
        b: erro(['e4', 'e5', 'Nf3', 'Nf6', 'Nxe5', 'd6', 'Nf3'], 3),
        resolvido: erro(['e4', 'e5', 'Nf3'], 0),
        sumiu: erro(['e4', 'e5', 'Qh5'], 5),
      },
      buscarCapitulo,
    )
    expect(perguntas.map((p) => p.chave)).toEqual(['b', 'a'])
    expect(perguntas[0].certo.san).toBe('Nf3')
    expect(perguntas[0].antes.map((a) => a.san)).toEqual(['e4', 'e5', 'Nf3', 'Nf6', 'Nxe5', 'd6'])
  })

  it('dois acertos seguidos tiram da lista; um erro no meio zera a sequência', () => {
    const e = erro(['e4'], 3)
    expect(registrarAcerto(e)).toBe(false)
    registrarFalha(e)
    expect(e).toMatchObject({ erros: 4, seguidos: 0 })
    expect(registrarAcerto(e)).toBe(false)
    expect(registrarAcerto(e)).toBe(true)
    expect(e.erros).toBe(0)
  })

  it('na sincronização, um erro resolvido não volta por causa do aparelho desatualizado', () => {
    const vazio = () => paraNuvem(normalizarProgresso({ cartoes: {} })!)
    const celular = vazio()
    celular.errosPorAresta = { x: erro(['e4'], 0, { seguidos: 2, atualizado: '2026-11-11T12:00:00.000Z' }) }
    const computador = vazio()
    computador.errosPorAresta = { x: erro(['e4'], 3, { atualizado: '2026-11-10T12:00:00.000Z' }) }
    expect(juntarProgresso(celular, computador).errosPorAresta.x.erros).toBe(0)
    expect(juntarProgresso(computador, celular).errosPorAresta.x.erros).toBe(0)
  })
})
