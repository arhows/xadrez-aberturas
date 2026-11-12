import { describe, expect, it } from 'vitest'
import { carregarCapitulos } from '../src/lib/capitulos'
import type { Estatisticas, LanceExplorador } from '../src/lib/explorador'
import {
  capitulosDaSequencia,
  escolherSugestao,
  maisJogados,
  montarLanceAdversario,
  planoDeEstudo,
  pontosDoLado,
  type Resposta,
} from '../src/lib/preparacao'

const capitulos = await carregarCapitulos()
const lance = (san: string, total: number, brancas = total / 2, pretas = total / 4): LanceExplorador => ({
  san,
  total,
  brancas,
  pretas,
  empates: total - brancas - pretas,
  mediaRating: 1500,
})
const stats = (...lances: LanceExplorador[]): Estatisticas => ({ total: lances.reduce((s, l) => s + l.total, 0), lances })
const semDominio = () => 0
const nada = () => false

describe('preparação', () => {
  it('top 3 com a fração das partidas', () => {
    const top = maisJogados(stats(lance('e4', 60), lance('d4', 30), lance('Nf3', 6), lance('c4', 4)))
    expect(top.map((l) => l.san)).toEqual(['e4', 'd4', 'Nf3'])
    expect(top[0].parte).toBeCloseTo(0.6)
  })

  it('pontos do lado contam empate como meio', () => {
    expect(pontosDoLado(lance('e5', 100, 40, 40), 'b')).toBe(50)
    expect(pontosDoLado(lance('e5', 100, 40, 40), 'w')).toBe(50)
    expect(pontosDoLado(lance('e5', 100, 50, 30), 'w')).toBe(60)
  })

  it('acha os capítulos do livro para uma defesa', () => {
    const { capitulos: caps, parcial } = capitulosDaSequencia(capitulos, ['e4', 'c6'], semDominio, nada)
    expect(parcial).toBe(false)
    expect(caps.some((c) => c.id.startsWith('caro-kann'))).toBe(true)
  })

  it('sugere a resposta do repertório antes da mais jogada', () => {
    const r = (san: string, rep: boolean, caps = 1): Resposta => ({
      san,
      parte: 0.3,
      pontos: 50,
      total: 10,
      parcial: false,
      capitulos: Array.from({ length: caps }, (_, i) => ({ id: `${san}${i}`, nome: san, noRepertorio: rep, dominio: 0 })),
    })
    expect(escolherSugestao([r('e5', false), r('c5', true)])?.san).toBe('c5')
    expect(escolherSugestao([r('a6', false, 0), r('e5', false)])?.san).toBe('e5')
  })

  it('monta o lance do adversário e o plano pela urgência', () => {
    const e4 = montarLanceAdversario(
      { ...lance('e4', 60), parte: 0.6 },
      stats(lance('e5', 30), lance('c5', 20), lance('e6', 10)),
      [],
      'b',
      capitulos,
      semDominio,
      nada,
    )
    expect(e4.respostas.map((r) => r.san)).toEqual(['e5', 'c5', 'e6'])
    expect(e4.sugestao?.capitulos.length).toBeGreaterThan(0)
    const d4 = { ...e4, san: 'd4', parte: 0.3, sugestao: { ...e4.sugestao!, capitulos: [{ id: 'x', nome: 'x', noRepertorio: true, dominio: 0 }] } }
    const estudada = { ...e4, san: 'Nf3', parte: 0.6, sugestao: { ...e4.sugestao!, capitulos: [{ id: 'y', nome: 'y', noRepertorio: true, dominio: 100 }] } }
    expect(planoDeEstudo([estudada, d4, e4]).map((i) => i.contra)).toEqual(['e4', 'd4', 'Nf3'])
  })
})
