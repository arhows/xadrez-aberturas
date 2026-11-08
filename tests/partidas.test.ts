import { describe, expect, it } from 'vitest'
import { obterCapitulos } from '../src/lib/capitulos'
import { jogarLances } from '../src/lib/lances'
import { analisarPartida, lancesDoPgn, type PartidaBaixada } from '../src/lib/partidas'

const capitulos = obterCapitulos()
const italiana = capitulos.find((c) => c.capitulo.id === 'italian')!
const linha = jogarLances(italiana.capitulo.linhas[0].lances).lances.map((l) => l.san)

const partida = (sans: string[], brancas = 'Arhows', pretas = 'rival'): PartidaBaixada => ({
  id: 'teste',
  site: 'chesscom',
  url: 'https://www.chess.com/game/live/1',
  data: '2026-11-08',
  brancas,
  pretas,
  resultado: '1-0',
  sans,
})

describe('análise das partidas importadas', () => {
  it('fica fora do repertório quem não chega à base de nenhum capítulo', () => {
    const r = analisarPartida(partida(['d4', 'd5', 'c4']), 'Arhows', capitulos)
    expect(r.capitulo).toBeNull()
  })

  it('acha o desvio do usuário e o lance do livro', () => {
    // O usuário (brancas) joga um lance de peão de h no lugar do 9.º meio-lance do livro.
    const desvio = linha.slice(0, 8)
    const r = analisarPartida(partida([...desvio, 'h3', 'h6']), 'Arhows', capitulos)
    expect(r.capitulo).toBe('italian')
    expect(r.cor).toBe('w')
    expect(r.noLivro).toBe(8)
    expect(r.desvio?.quem).toBe('voce')
    expect(r.desvio?.jogado).toBe('h3')
    expect(r.desvio?.livro).toContain(linha[8])
    expect(r.desvio?.caminho).toEqual(desvio)
    expect(r.desvio?.aresta?.linhas.length).toBeGreaterThan(0)
  })

  it('identifica quando foi o adversário que saiu do livro', () => {
    const r = analisarPartida(partida([...linha.slice(0, 7), 'h6'], 'Arhows'), 'arhows', capitulos)
    expect(r.desvio?.quem).toBe('adversario')
    expect(r.desvio?.aresta).toBeUndefined()
  })

  it('reconhece a cor pelo nome, sem diferenciar maiúsculas', () => {
    const r = analisarPartida(partida(linha.slice(0, 6), 'rival', 'ARHOWS'), 'Arhows', capitulos)
    expect(r.cor).toBe('b')
    expect(r.adversario).toBe('rival')
  })

  it('escolhe o capítulo seguido por mais lances (Dois Cavalos depois de 3...Nf6)', () => {
    const r = analisarPartida(partida(['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5', 'd5']), 'Arhows', capitulos)
    expect(r.capitulo).toBe('two-knights')
  })

  it('lê PGN do chess.com com relógio nos comentários', () => {
    const pgn = '[Event "Live Chess"]\n[White "Arhows"]\n[Black "rival"]\n\n1. e4 {[%clk 0:09:58]} 1... e5 {[%clk 0:09:57]} 2. Nf3 Nc6 1-0'
    expect(lancesDoPgn(pgn)).toEqual(['e4', 'e5', 'Nf3', 'Nc6'])
  })
})
