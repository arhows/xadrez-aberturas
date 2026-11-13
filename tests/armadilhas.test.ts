import { readFileSync } from 'node:fs'
import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import {
  conferirDefesa,
  grupoDaArmadilha,
  juntarArmadilhas,
  lanceDoErro,
  linhaDaPunicao,
  noRepertorio,
  posicoesDaArmadilha,
  type Armadilha,
} from '../src/lib/armadilhas'

const { armadilhas }: { armadilhas: Armadilha[] } = JSON.parse(readFileSync('data/armadilhas/armadilhas.json', 'utf-8'))

describe('armadilhas', () => {
  it('cada armadilha é legal, com punição, defesas e textos', () => {
    expect(armadilhas.length).toBeGreaterThanOrEqual(25)
    expect(new Set(armadilhas.map((a) => a.id)).size).toBe(armadilhas.length)
    for (const a of armadilhas) {
      const posicoes = posicoesDaArmadilha(a)
      expect(a.erro).toBeGreaterThanOrEqual(1)
      expect(a.erro).toBeLessThan(posicoes.length - 1)
      // Quem erra é o adversário de quem arma.
      expect(new Chess(posicoes[a.erro - 1].fen).turn()).not.toBe(a.lado)
      const punicao = linhaDaPunicao(a)
      expect(punicao.length % 2).toBe(1)
      expect(new Chess(posicoes[a.erro].fen).turn()).toBe(a.lado)
      expect(a.defesas.length).toBeGreaterThan(0)
      expect(a.defesas).not.toContain(lanceDoErro(a))
      for (const d of a.defesas) expect(() => new Chess(posicoes[a.erro - 1].fen).move(d)).not.toThrow()
      expect(a.texto).toBeTruthy()
    }
  })

  it('confere a defesa: segura, cai na armadilha ou fraca', () => {
    const pastor = armadilhas.find((a) => a.id === 'pastor')!
    expect(conferirDefesa(pastor, 'g6')).toBe('defendeu')
    expect(conferirDefesa(pastor, 'Nf6')).toBe('caiu')
    expect(conferirDefesa(pastor, 'a6')).toBe('fraco')
  })

  it('grupos e repertório', () => {
    const a = { lances: 'd4 d5 c4', capitulos: ['gambito-dama'] } as Armadilha
    expect(grupoDaArmadilha(a)).toBe('1.d4')
    expect(grupoDaArmadilha({ lances: 'e4 e5 Nf3' } as Armadilha)).toBe('1.e4 e5')
    expect(grupoDaArmadilha({ lances: 'e4 c5' } as Armadilha)).toBe('Defesas contra 1.e4')
    expect(noRepertorio(a, [])).toBe(true)
    expect(noRepertorio(a, ['petrov'])).toBe(false)
    expect(noRepertorio(a, ['gambito-dama'])).toBe(true)
  })

  it('junta o progresso guardando a data mais antiga', () => {
    expect(juntarArmadilhas({ 'x/armar': '2026-02-01' }, { 'x/armar': '2026-01-01', 'x/defender': '2026-03-01' })).toEqual({
      'x/armar': '2026-01-01',
      'x/defender': '2026-03-01',
    })
  })
})
