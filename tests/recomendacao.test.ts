import { describe, expect, it } from 'vitest'
import type { Aresta } from '../src/lib/arvore'
import { lanceInferior, melhoriaDoMotor, pontosDaAvaliacao } from '../src/lib/recomendacao'

const DE_PRETAS = 'posicao b - - 0 9'
const aresta = (san: string, linhas: string[], de = DE_PRETAS): Aresta =>
  ({ id: `${de} ${san}`, de, para: `${san}`, san, from: 'a1', to: 'a2', dica: null, linhas, selos: [], ameaca: null, armadilhas: [] }) as Aresta

const avaliacoes = new Map<string, string | null>([
  ['c03', '∓'],
  ['c04', 'brancas com compensação quase suficiente'],
  ['c03-k-A', '⩲'],
  ['n-igual', '='],
])
const contexto = { colunas: new Set(['c03', 'c04']), avaliacoes, marca: () => null }

describe('pontosDaAvaliacao', () => {
  it('lê os símbolos do MCO', () => {
    expect(pontosDaAvaliacao('∓')).toBe(-2)
    expect(pontosDaAvaliacao('+-')).toBe(3)
    expect(pontosDaAvaliacao('± (pretas com jogo pelo material)')).toBe(2)
    expect(pontosDaAvaliacao('∓ / caótico')).toBe(-2)
    expect(pontosDaAvaliacao('comp.')).toBeNull()
    expect(pontosDaAvaliacao(null)).toBeNull()
  })
})

describe('lanceInferior (Ataque Möller, lance 9 das pretas)', () => {
  const bf6 = aresta('Bf6', ['c03'])
  const ne5 = aresta('Ne5', ['c04'])
  const ne7 = aresta('Ne7', ['c03-k-A'])
  const opcoes = [bf6, ne5, ne7]

  it('a nota pior que a melhor continuação e favorável ao adversário é inferior', () => {
    const r = lanceInferior(ne7, opcoes, contexto)
    expect(r?.motivo).toBe('⩲')
    expect(r?.melhores.map((a) => a.san)).toEqual(['Bf6', 'Ne5'])
  })
  it('os lances das colunas valem', () => {
    expect(lanceInferior(bf6, opcoes, contexto)).toBeNull()
    expect(lanceInferior(ne5, opcoes, contexto)).toBeNull()
  })
  it('nota com avaliação igual vale', () => {
    const igual = aresta('d6', ['n-igual'])
    expect(lanceInferior(igual, [...opcoes, igual], contexto)).toBeNull()
  })
  it('marca ?! do MCO torna inferior até lance de coluna', () => {
    const r = lanceInferior(ne5, opcoes, { ...contexto, marca: (a: Aresta) => (a.san === 'Ne5' ? '?!' : null) })
    expect(r?.motivo).toBe('?!')
  })
  it('do lado das brancas a régua se inverte', () => {
    const DE_BRANCAS = 'posicao w - - 0 9'
    const boa = aresta('d5', ['c03-k-A'], DE_BRANCAS) // ⩲: bom para as brancas
    const ruim = aresta('h3', ['c03'], DE_BRANCAS)
    expect(lanceInferior(boa, [boa, ruim], { ...contexto, colunas: new Set() })).toBeNull()
    expect(lanceInferior(ruim, [boa, ruim], { ...contexto, colunas: new Set() })?.motivo).toBe('∓')
  })
  it('sem alternativa recomendada, não corrige', () => {
    expect(lanceInferior(ne7, [ne7], contexto)).toBeNull()
  })
})

describe('melhoriaDoMotor', () => {
  const dxe4 = aresta('dxe4', ['c11-n-A-2'])
  const outro = aresta('Re8', ['nota'])
  const perdas: Record<string, number | null> = { dxe4: 13, Re8: 25 }
  const perdaDe = (a: Aresta) => perdas[a.san] ?? null
  it('todos os lances do livro perdem e o Stockfish tem outro: melhoria', () => {
    const m = melhoriaDoMotor([dxe4, outro], 'Bh5', perdaDe)
    expect(m?.melhor).toBe('Bh5')
    expect(m?.livro.san).toBe('dxe4')
    expect(m?.perda).toBe(13)
  })
  it('o melhor lance é do livro: sem melhoria', () => {
    expect(melhoriaDoMotor([dxe4, outro], 'dxe4', perdaDe)).toBeNull()
  })
  it('algum lance do livro perde pouco: sem melhoria', () => {
    expect(melhoriaDoMotor([dxe4], 'Bh5', () => 4)).toBeNull()
  })
  it('sem análise: sem melhoria', () => {
    expect(melhoriaDoMotor([dxe4], 'Bh5', () => null)).toBeNull()
    expect(melhoriaDoMotor([dxe4], null, perdaDe)).toBeNull()
  })
})
