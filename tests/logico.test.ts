import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import dados from '../data/logico/partidas.json'
import capablanca from '../data/logico/capablanca.json'
import {
  chaveDoLogico,
  corDoVencedorLogico,
  ehPergunta,
  NOME_PRINCIPIO,
  notasPorPly,
  partidaPronta,
  principiosDaPartida,
  rotuloDoPly,
  veredictoDoPalpite,
  type PartidaLogica,
} from '../src/lib/logico'

const partidas = dados.partidas as unknown as PartidaLogica[]

describe('Lance a lance: dados', () => {
  it('tem as 33 partidas do livro, em ordem, com lances legais', () => {
    expect(partidas.map((p) => p.n)).toEqual(Array.from({ length: 33 }, (_, i) => i + 1))
    for (const p of partidas) {
      const jogo = new Chess()
      for (const san of p.lances.split(' ')) expect(() => jogo.move(san), `partida ${p.n}: ${san}`).not.toThrow()
      expect(['1-0', '0-1']).toContain(p.resultado)
    }
  })

  it('nas partidas prontas, toda nota é de um lance que existe e todo lance do vencedor tem nota', () => {
    for (const p of partidas.filter(partidaPronta)) {
      const sans = p.lances.split(' ')
      const rotulos = new Set(sans.map((san, ply) => rotuloDoPly(ply, san)))
      for (const chave of Object.keys(p.notas!)) expect(rotulos.has(chave), `partida ${p.n}: nota "${chave}" não bate com a partida`).toBe(true)
      const notas = notasPorPly(p)
      const vencedor = corDoVencedorLogico(p)
      sans.forEach((san, ply) => {
        if ((ply % 2 === 0 ? 'w' : 'b') === vencedor) expect(notas[ply]?.texto, `partida ${p.n}: falta a nota de ${rotuloDoPly(ply, san)}`).toBeTruthy()
      })
      for (const nota of Object.values(p.notas!)) for (const pr of nota.principios ?? []) expect(NOME_PRINCIPIO[pr], pr).toBeTruthy()
      expect(p.introducao && p.conclusao && p.tema, `partida ${p.n}: intro, tema e conclusão`).toBeTruthy()
    }
  })

  it('a partida 1 é a das pretas e conta os princípios do vencedor', () => {
    const p = partidas[0]
    expect(corDoVencedorLogico(p)).toBe('b')
    const principios = principiosDaPartida(p)
    expect(principios[0].vezes).toBeGreaterThanOrEqual(principios.at(-1)!.vezes)
    expect(principios.some((x) => x.principio === 'ataque')).toBe(true)
  })
})

const partidasCapablanca = capablanca.partidas as unknown as PartidaLogica[]

describe('Lance a lance: Capablanca: Move by Move', () => {
  it('lances legais, numeração do livro e resultado com vitória', () => {
    expect(partidasCapablanca.length).toBeGreaterThan(0)
    for (const p of partidasCapablanca) {
      expect(p.n).toBeGreaterThanOrEqual(1)
      expect(p.n).toBeLessThanOrEqual(59)
      const jogo = new Chess()
      for (const san of p.lances.split(' ')) expect(() => jogo.move(san), `partida ${p.n}: ${san}`).not.toThrow()
      expect(['1-0', '0-1']).toContain(p.resultado)
      expect([p.brancas, p.pretas]).toContain('Capablanca')
      expect(p.resultado === '1-0' ? p.brancas : p.pretas, `partida ${p.n}: Capablanca é quem vence`).toBe('Capablanca')
    }
  })

  it('nas prontas, toda nota bate com um lance e todo lance de Capablanca tem nota', () => {
    for (const p of partidasCapablanca.filter(partidaPronta)) {
      const sans = p.lances.split(' ')
      const rotulos = new Set(sans.map((san, ply) => rotuloDoPly(ply, san)))
      for (const chave of Object.keys(p.notas!)) expect(rotulos.has(chave), `partida ${p.n}: nota "${chave}" não bate com a partida`).toBe(true)
      sans.forEach((san, ply) => {
        if (ehPergunta(p, 'capablanca', ply)) expect(p.notas![rotuloDoPly(ply, san)]?.texto, `partida ${p.n}: falta a nota de ${rotuloDoPly(ply, san)}`).toBeTruthy()
      })
      for (const nota of Object.values(p.notas!)) for (const pr of nota.principios ?? []) expect(NOME_PRINCIPIO[pr], pr).toBeTruthy()
      expect(p.introducao && p.conclusao && p.tema, `partida ${p.n}: intro, tema e conclusão`).toBeTruthy()
    }
  })

  it('chaves de progresso separadas por livro (as do primeiro livro continuam logico/N)', () => {
    expect(chaveDoLogico(3)).toBe('logico/3')
    expect(chaveDoLogico(3, 'capablanca')).toBe('capablanca/3')
  })
})

describe('veredictoDoPalpite', () => {
  it('compara pela chance de vitória de quem jogou', () => {
    expect(veredictoDoPalpite(30, 30, 'w')).toBe('bom')
    expect(veredictoDoPalpite(150, 30, 'w')).toBe('melhor')
    expect(veredictoDoPalpite(-300, 30, 'w')).toBe('erro')
    // Para as pretas, cp menor é melhor.
    expect(veredictoDoPalpite(-150, -30, 'b')).toBe('melhor')
    expect(veredictoDoPalpite(40, -30, 'b')).toBe('quase')
  })
})
