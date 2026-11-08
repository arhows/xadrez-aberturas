import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import { buscarConjunto, casasDaSolucao, ehPromocao, obterConjuntos, verificarLance } from '../src/lib/exercicios'

describe('exercícios', () => {
  it('carrega o Mate em 1 do Polgar com os 306 problemas, sem números repetidos', () => {
    const conjunto = buscarConjunto('polgar-mate-1')!
    const numeros = conjunto.problemas.map((p) => p.n)
    expect(numeros).toEqual(Array.from({ length: 306 }, (_, i) => i + 1))
  })

  describe.each(obterConjuntos().map((c) => [c.id, c] as const))('%s', (_id, conjunto) => {
    it('toda solução é legal e dá mate', () => {
      const problemas: string[] = []
      for (const problema of conjunto.problemas) {
        expect(problema.solucoes.length).toBeGreaterThan(0)
        for (const san of problema.solucoes) {
          const jogo = new Chess(problema.fen)
          try {
            jogo.move(san)
            if (!jogo.isCheckmate()) problemas.push(`${problema.n}: ${san} não é mate`)
          } catch {
            problemas.push(`${problema.n}: ${san} é ilegal`)
          }
        }
      }
      expect(problemas).toEqual([])
    })
  })

  it('aceita qualquer mate, inclusive roque, en passant e subpromoção', () => {
    const conjunto = buscarConjunto('polgar-mate-1')!
    const problema = (n: number) => conjunto.problemas.find((p) => p.n === n)!
    expect(verificarLance(problema(305).fen, 'e1', 'g1')?.mate).toBe(true)
    expect(verificarLance(problema(306).fen, 'a5', 'b6')?.san).toBe('axb6#')
    const p19 = problema(19)
    const { from, to } = casasDaSolucao(p19)
    expect(ehPromocao(p19.fen, from, to)).toBe(true)
    expect(verificarLance(p19.fen, from, to, 'q')?.mate).toBe(false)
    expect(verificarLance(p19.fen, from, to, 'n')?.mate).toBe(true)
  })
})
