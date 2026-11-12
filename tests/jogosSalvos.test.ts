import { describe, expect, it } from 'vitest'
import { jogosVisiveis, juntarJogos, salvarJogo, textoDoResultado, type JogoSalvo } from '../src/lib/jogosSalvos'

const jogo = (id: string, data: string, extra: Partial<JogoSalvo> = {}): JogoSalvo => ({
  id,
  data,
  lances: 'e4 e5',
  inicio: 0,
  adversario: 'motor',
  nivel: 3,
  cor: 'w',
  tempo: '5+3',
  resultado: '1-0',
  motivo: 'Xeque-mate.',
  ...extra,
})

describe('partidas salvas do Jogar', () => {
  it('guarda só as 100 mais recentes', () => {
    let jogos: Record<string, JogoSalvo> = {}
    for (let i = 0; i < 105; i++) jogos = salvarJogo(jogos, jogo(`j${i}`, `2026-11-12T10:${String(i % 60).padStart(2, '0')}:${String(Math.floor(i / 60)).padStart(2, '0')}Z`))
    expect(jogosVisiveis(jogos)).toHaveLength(100)
  })

  it('apagada em um aparelho some nos dois', () => {
    const celular = { a: jogo('a', '2026-11-12T10:00:00Z', { apagada: true }) }
    const computador = { a: jogo('a', '2026-11-12T10:00:00Z'), b: jogo('b', '2026-11-12T11:00:00Z') }
    const junto = juntarJogos(computador, celular)
    expect(jogosVisiveis(junto).map((j) => j.id)).toEqual(['b'])
    expect(jogosVisiveis(juntarJogos(celular, computador)).map((j) => j.id)).toEqual(['b'])
  })

  it('resultado do ponto de vista da pessoa', () => {
    expect(textoDoResultado(jogo('a', 'x'))).toBe('Vitória')
    expect(textoDoResultado(jogo('a', 'x', { cor: 'b' }))).toBe('Derrota')
    expect(textoDoResultado(jogo('a', 'x', { resultado: '1/2-1/2' }))).toBe('Empate')
    expect(textoDoResultado(jogo('a', 'x', { adversario: 'amigo', cor: undefined, resultado: '0-1' }))).toBe('0-1')
  })
})
