import { readFileSync } from 'node:fs'
import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import {
  acertouOLance,
  casasDoLance,
  lanceDaAlternativa,
  melhorResultado,
  posicoesDaPartida,
  totalDePerguntas,
  type LivroDeQuizzes,
  type PerguntaDeLance,
} from '../src/lib/quizzes'

const livro: LivroDeQuizzes = JSON.parse(readFileSync('data/estrategia/quizzes.json', 'utf-8'))

describe('quizzes de estratégia', () => {
  it('os três quizzes do Grooten, com perguntas', () => {
    expect(livro.quizzes.map((q) => q.cap)).toEqual([13, 18, 23])
    for (const q of livro.quizzes) expect(totalDePerguntas(q)).toBeGreaterThanOrEqual(8)
  })

  it('cada pergunta cai numa posição da partida, com resposta legal ou alternativa válida', () => {
    for (const quiz of livro.quizzes) {
      for (const partida of quiz.partidas) {
        const posicoes = posicoesDaPartida(partida)
        let anterior = -1
        for (const q of partida.perguntas) {
          expect(q.depois).toBeGreaterThan(anterior)
          expect(q.depois).toBeLessThan(posicoes.length)
          anterior = q.depois
          expect(q.pergunta && q.explicacao).toBeTruthy()
          const fen = posicoes[q.depois].fen
          if (q.tipo === 'lance') {
            for (const san of [q.resposta, ...(q.aceitas ?? [])]) expect(() => new Chess(fen).move(san)).not.toThrow()
          } else {
            expect(q.certa).toBeGreaterThanOrEqual(0)
            expect(q.certa).toBeLessThan(q.opcoes.length)
          }
        }
      }
    }
  })

  it('confere o lance ignorando xeque e marcas, e aceita alternativas aprovadas', () => {
    const q: PerguntaDeLance = { tipo: 'lance', depois: 0, pergunta: '?', resposta: 'Qe2+', aceitas: ['Qg4'], explicacao: '.' }
    expect(acertouOLance(q, 'Qe2')).toBe(true)
    expect(acertouOLance(q, 'Qg4')).toBe(true)
    expect(acertouOLance(q, 'Qh5')).toBe(false)
  })

  it('alternativa que é lance vira seta; texto livre não', () => {
    const inicial = new Chess().fen()
    expect(lanceDaAlternativa(inicial, '1.e4')).toEqual(['e2', 'e4'])
    expect(lanceDaAlternativa(inicial, 'Nf3')).toEqual(['g1', 'f3'])
    expect(lanceDaAlternativa(inicial, 'As brancas estão melhor')).toBeNull()
    expect(casasDoLance(inicial, 'e5')).toBeNull()
  })

  it('guarda o melhor aproveitamento', () => {
    const a = { acertos: 7, total: 10, data: '2026-01-01' }
    const b = { acertos: 5, total: 10, data: '2026-02-01' }
    expect(melhorResultado(a, b)).toBe(a)
    expect(melhorResultado(b, a)).toBe(a)
    expect(melhorResultado(undefined, b)).toBe(b)
  })
})
