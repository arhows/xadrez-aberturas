import { Chess } from 'chess.js'
import { beforeAll, describe, expect, it } from 'vitest'
import {
  buscarConjunto,
  carregarConjuntos,
  casasDoLance,
  chaveDoMate,
  ehPromocao,
  responder,
  verificarLance,
  type ConjuntoExercicios,
} from '../src/lib/exercicios'

let conjuntos: ConjuntoExercicios[] = []
beforeAll(async () => {
  conjuntos = await carregarConjuntos()
})

const problema = (id: string, n: number) => buscarConjunto(id)!.problemas.find((p) => p.n === n)!

describe('exercícios', () => {
  it('carrega o Mate em 1 com os 306 problemas, o Mate em 2 e o Mate em 3', () => {
    expect(conjuntos.map((c) => c.id)).toEqual(['polgar-mate-1', 'polgar-mate-2', 'polgar-mate-3'])
    expect(buscarConjunto('polgar-mate-1')!.problemas.map((p) => p.n)).toEqual(
      Array.from({ length: 306 }, (_, i) => i + 1),
    )
    expect(buscarConjunto('polgar-mate-2')!.problemas.length).toBeGreaterThan(3300)
  })

  it('não repete números e mantém a ordem do livro', () => {
    for (const conjunto of conjuntos) {
      const numeros = conjunto.problemas.map((p) => p.n)
      expect(numeros).toEqual([...numeros].sort((a, b) => a - b))
      expect(new Set(numeros).size).toBe(numeros.length)
    }
  })

  it('toda solução do Mate em 1 é legal e dá mate', () => {
    const erros: string[] = []
    for (const p of buscarConjunto('polgar-mate-1')!.problemas) {
      for (const san of p.solucoes) {
        const jogo = new Chess(p.fen)
        try {
          jogo.move(san)
          if (!jogo.isCheckmate()) erros.push(`${p.n}: ${san} não é mate`)
        } catch {
          erros.push(`${p.n}: ${san} é ilegal`)
        }
      }
    }
    expect(erros).toEqual([])
  })

  it('no Mate em 2, a chave força o mate contra qualquer defesa (amostra)', () => {
    const lista = buscarConjunto('polgar-mate-2')!.problemas
    const erros: string[] = []
    // Uma amostra espalhada pelo capítulo; o gerador confere todos.
    for (let i = 0; i < lista.length; i += 97) {
      const p = lista[i]
      const jogo = new Chess(p.fen)
      expect(jogo.moves().some((san) => san.endsWith('#'))).toBe(false)
      for (const san of p.solucoes) {
        const lance = jogo.move(san)
        const resposta = responder(jogo.fen())
        if (resposta.tipo !== 'defesa') erros.push(`${p.n}: ${lance.san} não força mate`)
        jogo.undo()
      }
    }
    expect(erros).toEqual([])
  })

  it('aceita qualquer mate, inclusive roque, en passant e subpromoção', () => {
    expect(verificarLance(problema('polgar-mate-1', 305).fen, 'e1', 'g1')?.mate).toBe(true)
    expect(verificarLance(problema('polgar-mate-1', 306).fen, 'a5', 'b6')?.san).toBe('axb6#')
    const p19 = problema('polgar-mate-1', 19)
    const { from, to } = casasDoLance(p19.fen, p19.solucoes[0])
    expect(ehPromocao(p19.fen, from, to)).toBe(true)
    expect(verificarLance(p19.fen, from, to, 'q')?.mate).toBe(false)
    expect(verificarLance(p19.fen, from, to, 'n')?.mate).toBe(true)
  })

  it('no Mate em 3, a defesa gravada é legal e ainda permite o mate em 2 (amostra)', () => {
    const lista = buscarConjunto('polgar-mate-3')!.problemas
    expect(lista.length).toBeGreaterThan(700)
    for (let i = 0; i < lista.length; i += 61) {
      const p = lista[i]
      const jogo = new Chess(p.fen)
      jogo.move(p.solucoes[0])
      const depois = jogo.fen()
      jogo.move(p.defesa!)
      expect(chaveDoMate(jogo.fen(), 2), `n.º ${p.n}`).toBeTruthy()
      // E a chave resiste a qualquer defesa no mate em 2 que sobra.
      expect(responder(depois, 2).tipo, `n.º ${p.n}`).toBe('defesa')
    }
  })

  it('o defensor refuta um lance que não força o mate', () => {
    const p = problema('polgar-mate-2', 307)
    const jogo = new Chess(p.fen)
    const errado = jogo.moves().find((san) => !p.solucoes.includes(san) && !san.endsWith('#'))!
    jogo.move(errado)
    expect(responder(jogo.fen()).tipo).toBe('refutacao')
  })
})
