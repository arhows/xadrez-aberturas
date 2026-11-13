import { readdirSync, readFileSync } from 'node:fs'
import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import {
  chaveDoItem,
  diasSeguidos,
  ehMate,
  itensMisturados,
  juntarDiario,
  proximoDaSequencia,
  ratingDaSequencia,
  serieDoDia,
  TAMANHO_DA_SERIE,
} from '../src/lib/diario'
import type { ConjuntoExercicios } from '../src/lib/exercicios'

const ler = (pasta: string) =>
  readdirSync(pasta).map((f) => JSON.parse(readFileSync(`${pasta}/${f}`, 'utf-8')) as ConjuntoExercicios)
const conjuntos = [...ler('data/taticas'), ...ler('data/exercicios')]
const itens = itensMisturados(conjuntos)

describe('exercícios do dia', () => {
  it('mistura táticas e mates, sem os exercícios de livro', () => {
    expect(itens.some((i) => i.conjunto.id.startsWith('grooten') || i.conjunto.id.startsWith('koblenz'))).toBe(false)
    expect(itens.some(ehMate)).toBe(true)
    expect(itens.some((i) => !ehMate(i))).toBe(true)
  })

  it('a série do dia é fixa pela data, com 6 táticas de temas diferentes e um mate de cada tamanho', () => {
    const serie = serieDoDia(conjuntos, '2026-11-13')
    expect(serie).toHaveLength(TAMANHO_DA_SERIE)
    expect(serieDoDia(conjuntos, '2026-11-13').map(chaveDoItem)).toEqual(serie.map(chaveDoItem))
    expect(serieDoDia(conjuntos, '2026-11-14').map(chaveDoItem)).not.toEqual(serie.map(chaveDoItem))
    const taticas = serie.filter((i) => !ehMate(i))
    expect(taticas).toHaveLength(6)
    expect(new Set(taticas.map((i) => i.conjunto.id)).size).toBe(6)
    expect(serie.filter(ehMate).map((i) => i.conjunto.lances).sort()).toEqual([1, 2, 3, 4])
    for (const item of serie) expect(() => new Chess(item.problema.fen)).not.toThrow()
  })

  it('conta os dias seguidos com a série completa; hoje incompleto não quebra', () => {
    const completo = Object.fromEntries(Array.from({ length: TAMANHO_DA_SERIE }, (_, i) => [String(i), 'primeira' as const]))
    const diario = { '2026-11-11': completo, '2026-11-12': completo, '2026-11-13': { 0: 'ajuda' as const } }
    expect(diasSeguidos(diario, '2026-11-13')).toBe(2)
    expect(diasSeguidos({ ...diario, '2026-11-13': completo }, '2026-11-13')).toBe(3)
    expect(diasSeguidos(diario, '2026-11-15')).toBe(0)
  })

  it('junta o diário de dois aparelhos', () => {
    expect(juntarDiario({ d: { 0: 'ajuda', 1: 'primeira' } }, { d: { 0: 'primeira', 2: 'ajuda' }, e: { 0: 'ajuda' } })).toEqual({
      d: { 0: 'primeira', 1: 'primeira', 2: 'ajuda' },
      e: { 0: 'ajuda' },
    })
  })
})

describe('sequência', () => {
  it('fica mais difícil a cada acerto e não repete', () => {
    expect(ratingDaSequencia(0)).toBeLessThan(ratingDaSequencia(20))
    const vistos = new Set<string>()
    let anterior: ReturnType<typeof proximoDaSequencia> | undefined
    const ratings: number[] = []
    for (let n = 0; n < 40; n++) {
      const item = proximoDaSequencia(itens, n, vistos, Math.random, anterior ?? undefined)!
      expect(vistos.has(chaveDoItem(item))).toBe(false)
      vistos.add(chaveDoItem(item))
      ratings.push(item.rating)
      anterior = item
    }
    const media = (lista: number[]) => lista.reduce((a, b) => a + b, 0) / lista.length
    expect(media(ratings.slice(30))).toBeGreaterThan(media(ratings.slice(0, 10)) + 800)
  })
})

describe('semana do diário', () => {
  it('mostra a semana de domingo a sábado com o estado de cada série', async () => {
    const { semanaDoDiario, TAMANHO_DA_SERIE } = await import('../src/lib/diario')
    const completa = Object.fromEntries(Array.from({ length: TAMANHO_DA_SERIE }, (_, i) => [String(i), 'primeira' as const]))
    // 13/11/2026 é uma sexta-feira.
    const semana = semanaDoDiario({ '2026-11-13': completa, '2026-11-12': { '0': 'ajuda' } }, '2026-11-13')
    expect(semana.map((d) => d.data)).toEqual(['2026-11-08', '2026-11-09', '2026-11-10', '2026-11-11', '2026-11-12', '2026-11-13', '2026-11-14'])
    expect(semana.map((d) => d.letra).join('')).toBe('DSTQQSS')
    expect(semana[5]).toMatchObject({ estado: 'completa', hoje: true })
    expect(semana[4].estado).toBe('comecada')
    expect(semana[0].estado).toBe('vazia')
    expect(semana[6].estado).toBe('futuro')
  })

  it('no domingo, a semana começa hoje', async () => {
    const { semanaDoDiario } = await import('../src/lib/diario')
    const semana = semanaDoDiario({}, '2026-11-15')
    expect(semana[0]).toMatchObject({ data: '2026-11-15', hoje: true })
    expect(semana.slice(1).every((d) => d.estado === 'futuro')).toBe(true)
  })
})
