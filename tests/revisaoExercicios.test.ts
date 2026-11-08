import { beforeEach, describe, expect, it } from 'vitest'
import type { ConjuntoExercicios } from '../src/lib/exercicios'
import { normalizarProgresso, progresso, resetarProgresso } from '../src/lib/progresso'
import { notaDoExercicio, registrarResultado, revisoesPendentes } from '../src/lib/revisaoExercicios'

const conjunto = (id: string, numeros: number[]): ConjuntoExercicios => ({
  id,
  nome: id,
  fonte: id,
  lances: 1,
  problemas: numeros.map((n) => ({ n, fen: '8/8/8/8/8/8/8/K6k w - - 0 1', solucoes: [] })),
})
const conjuntos = [conjunto('polgar-mate-1', [1, 2, 3]), conjunto('cicero-mate-2', [301, 302])]

describe('revisão dos exercícios', () => {
  beforeEach(() => resetarProgresso())

  it('dá nota 5 de primeira, 3 com pista e 1 com erro', () => {
    expect(notaDoExercicio(0, false)).toBe(5)
    expect(notaDoExercicio(0, true)).toBe(3)
    expect(notaDoExercicio(2, true)).toBe(1)
  })

  it('só entra na revisão o problema errado ou feito com pista', () => {
    registrarResultado('polgar-mate-1', 1, 5, '2026-11-08')
    registrarResultado('polgar-mate-1', 2, 1, '2026-11-08')
    registrarResultado('polgar-mate-1', 3, 3, '2026-11-08')
    expect(Object.keys(progresso.cartoesExercicios).sort()).toEqual(['polgar-mate-1/2', 'polgar-mate-1/3'])
    expect(progresso.cartoesExercicios['polgar-mate-1/2'].proxima).toBe('2026-11-09')
  })

  it('volta no dia certo e acertar de primeira afasta a próxima revisão', () => {
    registrarResultado('cicero-mate-2', 301, 1, '2026-11-08')
    expect(revisoesPendentes(conjuntos, '2026-11-08')).toEqual([])
    expect(revisoesPendentes(conjuntos, '2026-11-09').map((r) => r.n)).toEqual([301])
    // Acertos seguidos afastam a revisão: 1 dia, depois 3, depois 7.
    registrarResultado('cicero-mate-2', 301, 5, '2026-11-09')
    expect(progresso.cartoesExercicios['cicero-mate-2/301'].proxima).toBe('2026-11-10')
    registrarResultado('cicero-mate-2', 301, 5, '2026-11-10')
    expect(progresso.cartoesExercicios['cicero-mate-2/301'].proxima).toBe('2026-11-13')
    expect(revisoesPendentes(conjuntos, '2026-11-12')).toEqual([])
    registrarResultado('cicero-mate-2', 301, 5, '2026-11-13')
    expect(progresso.cartoesExercicios['cicero-mate-2/301'].proxima).toBe('2026-11-20')
  })

  it('ordena pelas mais atrasadas e ignora problemas que não existem mais', () => {
    registrarResultado('cicero-mate-2', 302, 1, '2026-11-01')
    registrarResultado('polgar-mate-1', 1, 1, '2026-11-05')
    registrarResultado('polgar-mate-1', 99, 1, '2026-11-01')
    expect(revisoesPendentes(conjuntos, '2026-11-08').map((r) => `${r.conjunto}/${r.n}`)).toEqual([
      'cicero-mate-2/302',
      'polgar-mate-1/1',
    ])
  })

  it('o progresso antigo, sem cartões de exercícios, continua válido', () => {
    expect(normalizarProgresso({ cartoes: {} })!.cartoesExercicios).toEqual({})
  })
})
