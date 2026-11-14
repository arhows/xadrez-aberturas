import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import dados from '../data/logico/partidas.json'
import instrutivas from '../data/logico/instrutivas.json'
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

const partidasInstrutivas = instrutivas.partidas as unknown as PartidaLogica[]

describe('Lance a lance: The Most Instructive Games', () => {
  it('tem as 62 partidas, em ordem, com lances legais', () => {
    expect(partidasInstrutivas.map((p) => p.n)).toEqual(Array.from({ length: 62 }, (_, i) => i + 1))
    for (const p of partidasInstrutivas) {
      const jogo = new Chess()
      for (const san of p.lances.split(' ')) expect(() => jogo.move(san), `partida ${p.n}: ${san}`).not.toThrow()
      expect(['1-0', '0-1']).toContain(p.resultado)
    }
  })

  it('nas prontas: notas batem com os lances, perguntas só do vencedor e pelo menos 8 momentos-chave', () => {
    for (const p of partidasInstrutivas.filter(partidaPronta)) {
      const sans = p.lances.split(' ')
      const rotulos = new Set(sans.map((san, ply) => rotuloDoPly(ply, san)))
      for (const chave of Object.keys(p.notas!)) expect(rotulos.has(chave), `partida ${p.n}: nota "${chave}" não bate com a partida`).toBe(true)
      const vencedor = corDoVencedorLogico(p)
      const perguntas = sans.filter((_, ply) => ehPergunta(p, 'instrutivas', ply)).length
      expect(perguntas, `partida ${p.n}: momentos-chave`).toBeGreaterThanOrEqual(8)
      sans.forEach((san, ply) => {
        const nota = p.notas![rotuloDoPly(ply, san)]
        if (nota?.pergunta) expect((ply % 2 === 0 ? 'w' : 'b') === vencedor, `partida ${p.n}: ${rotuloDoPly(ply, san)} é pergunta mas não é do vencedor`).toBe(true)
        if (nota) expect(nota.texto.length, `partida ${p.n}: ${rotuloDoPly(ply, san)}`).toBeGreaterThan(20)
      })
      for (const nota of Object.values(p.notas!)) for (const pr of nota.principios ?? []) expect(NOME_PRINCIPIO[pr], pr).toBeTruthy()
      expect(p.introducao && p.conclusao && p.tema, `partida ${p.n}: intro, tema e conclusão`).toBeTruthy()
    }
  })

  it('partidas omitidas (fonte incerta) nunca ficam prontas', () => {
    const omitidas = partidasInstrutivas.filter((p) => p.omitida)
    expect(omitidas.map((p) => p.n)).toContain(27)
    for (const p of omitidas) expect(partidaPronta(p)).toBe(false)
  })

  it('no livro de todos os lances, todo lance do vencedor é pergunta; chaves separadas por livro', () => {
    const p = partidas[0]
    const vencedor = corDoVencedorLogico(p)
    p.lances.split(' ').forEach((_, ply) => expect(ehPergunta(p, 'logico', ply)).toBe((ply % 2 === 0 ? 'w' : 'b') === vencedor))
    expect(chaveDoLogico(3)).toBe('logico/3')
    expect(chaveDoLogico(3, 'instrutivas')).toBe('instrutivas/3')
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
