import { readFileSync } from 'node:fs'
import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import { corDoVencedor, juntarEstrategia, marcasDaPartida, perguntasDoQuiz, type LivroDeEstrategia } from '../src/lib/estrategia'

const livro: LivroDeEstrategia = JSON.parse(readFileSync('data/estrategia/estruturas.json', 'utf-8'))

describe('estratégia por estruturas', () => {
  it('cada estrutura tem família, planos dos dois lados e partidas', () => {
    const familias = new Set(livro.familias.map((f) => f.id))
    for (const e of livro.estruturas) {
      expect(familias.has(e.familia)).toBe(true)
      expect(e.brancas.length).toBeGreaterThan(0)
      expect(e.pretas.length).toBeGreaterThan(0)
      expect(e.partidas.length).toBeGreaterThan(0)
    }
  })

  it('todas as partidas são legais e têm objetivo', () => {
    for (const e of livro.estruturas) {
      for (const p of e.partidas) {
        const jogo = new Chess()
        for (const san of p.lances.split(' ')) jogo.move(san)
        expect(p.objetivo, `${e.id} ${p.brancas}`).toBeTruthy()
        for (const i of marcasDaPartida(p).keys()) expect(i).toBeLessThan(p.lances.split(' ').length)
      }
    }
  })

  it('quiz pergunta só os lances da cor escolhida, depois da abertura', () => {
    const p = livro.estruturas[0].partidas[0]
    const brancas = perguntasDoQuiz(p, 'w')
    expect(brancas.every((i) => i % 2 === 0 && i >= 18)).toBe(true)
    expect(perguntasDoQuiz(p, 'b').every((i) => i % 2 === 1)).toBe(true)
    expect(corDoVencedor({ ...p, resultado: '0–1' })).toBe('b')
  })

  it('sincronização fica com o melhor aproveitamento', () => {
    const a = { x: { acertos: 5, total: 10, data: '2026-11-01' } }
    const b = { x: { acertos: 8, total: 10, data: '2026-10-01' }, y: { acertos: 1, total: 2, data: '2026-11-02' } }
    expect(juntarEstrategia(a, b)).toEqual(b)
  })
})
