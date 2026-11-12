import { describe, expect, it } from 'vitest'
import { chaveDaNota, gravarNota, lerNota } from '../src/lib/anotacoes'
import { normalizarProgresso, progresso } from '../src/lib/progresso'
import { juntarProgresso, paraNuvem } from '../src/lib/sincronizacao'

describe('notas pessoais', () => {
  it('grava, lê e apaga (texto vazio) a nota de um lance', () => {
    const chave = chaveDaNota('petrov', 'fen|Nf3')
    gravarNota(chave, '  lembrar do Be2  ', new Date('2026-11-11T10:00:00Z'))
    expect(lerNota(chave)).toBe('lembrar do Be2')
    gravarNota(chave, '', new Date('2026-11-11T11:00:00Z'))
    expect(lerNota(chave)).toBe('')
    expect(progresso.anotacoes[chave].atualizado).toBe('2026-11-11T11:00:00.000Z')
    expect(lerNota(null)).toBe('')
  })

  it('na sincronização vale a editada por último, inclusive a apagada', () => {
    const vazio = () => paraNuvem(normalizarProgresso({ cartoes: {} })!)
    const celular = vazio()
    celular.anotacoes = { x: { texto: '', atualizado: '2026-11-11T12:00:00.000Z' } }
    const computador = vazio()
    computador.anotacoes = { x: { texto: 'antiga', atualizado: '2026-11-10T12:00:00.000Z' }, y: { texto: 'só aqui', atualizado: '2026-11-09T00:00:00.000Z' } }
    const junto = juntarProgresso(celular, computador)
    expect(junto.anotacoes.x.texto).toBe('')
    expect(junto.anotacoes.y.texto).toBe('só aqui')
  })
})
