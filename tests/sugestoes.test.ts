import { describe, expect, it } from 'vitest'
import type { PartidaAnalisada } from '../src/lib/partidas'
import { sugestoesDasPartidas, type ContextoDoRepertorio } from '../src/lib/sugestoes'

let n = 0
function partida(capitulo: string | null, cor: 'w' | 'b', resultado = '1-0', desvio?: PartidaAnalisada['desvio']): PartidaAnalisada {
  return { id: String(n++), site: 'lichess', url: '', data: '2026-11-01', adversario: 'X', cor, resultado, capitulo, noLivro: 6, desvio: desvio ?? null }
}
const desvioEm = (jogado: string): PartidaAnalisada['desvio'] => ({
  quem: 'voce',
  jogado,
  livro: ['c3'],
  caminho: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5'],
  aresta: { id: 'a1', san: 'c3', linhas: ['c01', 'c01-a'] },
})

const contexto = (repertorio: string[], cores: Record<string, 'w' | 'b' | 'ambas'> = {}): ContextoDoRepertorio => ({
  repertorioEscolhido: repertorio.length > 0,
  noRepertorio: (id) => repertorio.includes(id),
  corTreinada: (id) => cores[id] ?? 'ambas',
})

describe('sugestões das partidas', () => {
  it('sugere adicionar a abertura jogada 3+ vezes fora do repertório, com a cor predominante', () => {
    const lista = [partida('petrov', 'b'), partida('petrov', 'b', '0-1'), partida('petrov', 'b', '½-½'), partida('italiana', 'w')]
    const s = sugestoesDasPartidas(lista, contexto(['italiana']))
    expect(s).toEqual([expect.objectContaining({ tipo: 'adicionar', capitulo: 'petrov', partidas: 3, cor: 'b' })])
  })

  it('não sugere abertura com menos de 3 partidas', () => {
    expect(sugestoesDasPartidas([partida('petrov', 'b'), partida('petrov', 'b')], contexto(['italiana']))).toEqual([])
  })

  it('sugere treinar a cor que você joga e não treina', () => {
    const lista = [partida('italiana', 'b'), partida('italiana', 'b'), partida('italiana', 'b'), partida('italiana', 'w')]
    const s = sugestoesDasPartidas(lista, contexto(['italiana'], { italiana: 'w' }))
    expect(s).toEqual([expect.objectContaining({ tipo: 'cor', capitulo: 'italiana', cor: 'b', partidas: 3 })])
  })

  it('sugere treinar a posição onde você saiu do livro duas vezes ou mais', () => {
    const lista = [partida('italiana', 'w', '0-1', desvioEm('d3')), partida('italiana', 'w', '1-0', desvioEm('d3')), partida('italiana', 'w', '1-0', desvioEm('O-O'))]
    const s = sugestoesDasPartidas(lista, contexto(['italiana']))
    expect(s).toEqual([expect.objectContaining({ tipo: 'treinar', capitulo: 'italiana', vezes: 2, jogado: 'd3', livro: 'c3', linhas: ['c01', 'c01-a'] })])
  })

  it('sem repertório escolhido: sugere começar pelas aberturas que você mais joga', () => {
    const lista = [partida('petrov', 'b'), partida('petrov', 'b'), partida('petrov', 'b')]
    expect(sugestoesDasPartidas(lista, contexto([]))).toEqual([expect.objectContaining({ tipo: 'adicionar', capitulo: 'petrov' })])
  })
})
