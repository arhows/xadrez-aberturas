import { readFileSync, readdirSync } from 'node:fs'
import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import type { ConjuntoExercicios } from '../src/lib/exercicios'
import { ORDEM_DOS_TEMAS } from '../src/lib/exercicios'
import { conferirLanceTatico, EXPLICACOES } from '../src/lib/problemasTaticos'

const conjuntos: ConjuntoExercicios[] = readdirSync('data/taticas').map((f) => JSON.parse(readFileSync(`data/taticas/${f}`, 'utf-8')))

describe('problemas táticos', () => {
  it('um conjunto por tema, com explicação', () => {
    expect(conjuntos.map((c) => c.id.replace('tatica-', '')).sort()).toEqual([...ORDEM_DOS_TEMAS].sort())
    for (const c of conjuntos) expect(EXPLICACOES[c.tema!]).toBeTruthy()
  })

  it('todas as linhas são legais a partir do lance prévio', () => {
    for (const c of conjuntos) {
      for (const p of c.problemas) {
        const jogo = new Chess(p.fen)
        jogo.move(p.previo!)
        for (const san of p.linha!) jogo.move(san)
        expect(p.linha!.length % 2).toBe(1)
      }
    }
    // 4.800 problemas refeitos no chess.js: com a máquina carregada passa dos 5 s padrão.
  }, 60_000)

  it('confere o lance: o da linha, ou qualquer mate', () => {
    const p = { n: 1, fen: '', solucoes: ['Nf7+'], linha: ['Nf7+', 'Kg8', 'Nh6+'] }
    expect(conferirLanceTatico(p, 0, 'Nf7', false)).toBe('certo')
    expect(conferirLanceTatico(p, 0, 'Qd8', false)).toBe('errado')
    expect(conferirLanceTatico(p, 2, 'Nh6+', false)).toBe('fim')
    expect(conferirLanceTatico(p, 2, 'Qg8#', true)).toBe('fim')
  })
})
