import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import {
  conferirLance,
  destinosDaPeca,
  juntarFundamentos,
  lancesCertos,
  lerPecas,
  melhorCaminho,
  moverNoPercurso,
  percursoCompleto,
  type ExercicioLance,
  type ExercicioPercurso,
} from '../src/lib/fundamentos'
import { LICOES } from '../src/lib/licoes'

const exercicios = LICOES.flatMap((l) => l.exercicios)
const ex = <T>(id: string) => exercicios.find((e) => e.id === id) as T
const CASA = /^[a-h][1-8]$/

describe('conteúdo das lições', () => {
  it('ids únicos', () => {
    const ids = exercicios.map((e) => e.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(LICOES.map((l) => l.id)).size).toBe(LICOES.length)
  })

  for (const e of exercicios) {
    it(`${e.id} tem solução`, () => {
      if (e.tipo === 'casa') {
        if (e.fen) new Chess(e.fen)
        for (const p of e.perguntas) {
          expect(p.casas.length).toBeGreaterThan(0)
          for (const c of p.casas) expect(c).toMatch(CASA)
        }
      } else if (e.tipo === 'percurso') {
        const pecas = lerPecas(e.pecas)
        expect(percursoCompleto(e, pecas, new Set())).toBe(false)
        for (const s of e.estrelas) expect(pecas.has(s)).toBe(false)
        expect(melhorCaminho(e, pecas, new Set())).not.toBeNull()
      } else {
        const jogo = new Chess(e.fen)
        const certos = lancesCertos(e)
        expect(certos.length).toBeGreaterThan(0)
        if (e.objetivo !== 'qualquer') expect(certos.length).toBeLessThan(jogo.moves().length)
        for (const san of e.aceitos ?? []) expect(certos.map((c) => c.san.replace(/[+#]/g, ''))).toContain(san)
        if (e.objetivo === 'salvar') expect(jogo.get(e.casa as never)).toBeTruthy()
      }
    })
  }
})

describe('percurso', () => {
  it('torre não atravessa peças e captura as pretas', () => {
    const pecas = lerPecas(['Ra1', 'Pa3', 'pc1'])
    expect(destinosDaPeca(pecas, 'a1').sort()).toEqual(['a2', 'b1', 'c1'])
  })
  it('peão: duas casas no início, captura na diagonal, bloqueado à frente', () => {
    expect(destinosDaPeca(lerPecas(['Pe2']), 'e2').sort()).toEqual(['e3', 'e4'])
    expect(destinosDaPeca(lerPecas(['Pe4', 'pe5', 'pf5']), 'e4')).toEqual(['f5'])
  })
  it('peão vira dama na 8ª fileira', () => {
    expect(moverNoPercurso(lerPecas(['Pb7']), 'b7', 'b8').get('b8')).toBe('Q')
  })
  it('caminhos mínimos', () => {
    const tamanho = (id: string) => {
      const e = ex<ExercicioPercurso>(id)
      return melhorCaminho(e, lerPecas(e.pecas), new Set())!.length
    }
    expect(tamanho('tor-4')).toBe(3)
    expect(tamanho('cav-2')).toBe(2)
    expect(tamanho('cav-5')).toBe(6)
    expect(tamanho('pro-1')).toBe(3)
  })
})

describe('lance', () => {
  it('salvar: capturar o atacante ou fugir para casa segura', () => {
    const e = ex<ExercicioLance>('def-3')
    expect(conferirLance(e, 'b2', 'c3')?.certo).toBe(true)
    expect(conferirLance(e, 'd1', 'd5')?.certo).toBe(false)
    expect(conferirLance(e, 'd1', 'h5')?.certo).toBe(true)
  })
  it('proteger com peão salva o bispo da torre', () => {
    expect(conferirLance(ex<ExercicioLance>('def-2'), 'b2', 'b3')?.certo).toBe(true)
  })
  it('proteger não salva o cavalo atacado por peão', () => {
    expect(conferirLance(ex<ExercicioLance>('def-1'), 'e1', 'e2')?.certo).toBe(false)
  })
  it('afogamento tem mensagem própria', () => {
    const r = conferirLance(ex<ExercicioLance>('emp-1'), 'b1', 'b6')
    expect(r?.certo).toBe(false)
    expect(r && !r.certo && r.motivo).toMatch(/Afogado/)
  })
  it('roque impedido por casa atacada', () => {
    expect(lancesCertos(ex<ExercicioLance>('roq-3')).map((c) => c.san)).toEqual(['O-O-O'])
  })
  it('en passant', () => {
    expect(conferirLance(ex<ExercicioLance>('enp-1'), 'e5', 'd6')?.certo).toBe(true)
  })
})

describe('sincronização', () => {
  it('fica a primeira data de cada exercício', () => {
    expect(juntarFundamentos({ a: '2026-11-02', b: '2026-11-05' }, { a: '2026-11-01', c: '2026-11-03' })).toEqual({
      a: '2026-11-01',
      b: '2026-11-05',
      c: '2026-11-03',
    })
  })
})
