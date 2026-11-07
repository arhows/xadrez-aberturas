import { Chess } from 'chess.js'
import { describe, expect, it } from 'vitest'
import { carregarCapitulos } from '../src/lib/capitulos'
import { exportarPgn } from '../src/lib/pgn'

const dois = carregarCapitulos().find((c) => c.capitulo.id === 'two-knights')!
const pgn = exportarPgn(dois)
const jogos = pgn.split(/\n(?=\[Event)/)

/** Replaya um jogo com variantes, confirmando a legalidade e devolvendo cada linha completa. */
function linhasDoJogo(jogo: string): string[] {
  const corpo = jogo.split('\n\n').slice(1).join(' ')
  const tokens = corpo.match(/\{[^}]*\}|\(|\)|[^\s(){}]+/g) ?? []
  const linhas: string[] = []
  type Quadro = { fen: string; fenAnterior: string; sans: string[]; sansAnteriores: string[] }
  const inicio = new Chess().fen()
  const pilha: Quadro[] = [{ fen: inicio, fenAnterior: inicio, sans: [], sansAnteriores: [] }]

  for (const token of tokens) {
    const topo = pilha[pilha.length - 1]
    if (token.startsWith('{') || /^\d+\.+$/.test(token) || token === '*') continue
    if (token === '(') {
      // A variante substitui o último lance jogado.
      pilha.push({
        fen: topo.fenAnterior,
        fenAnterior: topo.fenAnterior,
        sans: topo.sansAnteriores,
        sansAnteriores: topo.sansAnteriores,
      })
    } else if (token === ')') {
      linhas.push(topo.sans.join(' '))
      pilha.pop()
    } else {
      const chess = new Chess(topo.fen)
      const lance = chess.move(token)
      topo.fenAnterior = topo.fen
      topo.sansAnteriores = topo.sans
      topo.fen = chess.fen()
      topo.sans = [...topo.sans, lance.san]
    }
  }
  expect(pilha).toHaveLength(1)
  linhas.push(pilha[0].sans.join(' '))
  return linhas
}

describe('exportação em PGN', () => {
  it('gera um jogo por linha, incluindo o bônus', () => {
    expect(jogos).toHaveLength(25)
    expect(jogos[0]).toContain('[Event "Dois Cavalos — Coluna 01"]')
    expect(jogos[24]).toContain('[Event "Dois Cavalos — Bônus"]')
  })

  it('todas as variantes são legais e toda linha e nota aparece inteira', () => {
    const exportadas = new Set(jogos.flatMap(linhasDoJogo))
    const prefixoDeAlguma = (sans: string) =>
      exportadas.has(sans) || [...exportadas].some((linha) => linha.startsWith(`${sans} `))
    for (const unidade of dois.unidades) {
      const sans = unidade.lances.map((lance) => lance.san).join(' ')
      expect(prefixoDeAlguma(sans), unidade.id).toBe(true)
    }
  })

  it('leva dicas e comentários das notas', () => {
    expect(jogos[0]).toContain('Captura en passant!')
    expect(jogos[0]).toContain('Nota (e) — ± — Radjabov–Naiditsch, Varsóvia 2005')
    expect(jogos[0]).toContain('Fim da coluna 1 — ±')
  })

  it('preserva os sinais do livro nos lances', () => {
    expect(jogos[0]).toContain('c5?!')
    expect(jogos[0]).toContain('Nf4!')
  })

  it('numera as pretas depois de comentário ou variante', () => {
    expect(jogos[0]).toMatch(/^1\. e4 \{[^}]*\} 1\.\.\. e5 /m)
    expect(jogos[0]).toContain('17. O-O Rad8')
  })

  it('não deixa chave solta nos comentários', () => {
    for (const comentario of pgn.match(/\{[^}]*\}/g) ?? []) {
      expect(comentario.slice(1)).not.toContain('{')
    }
  })
})
