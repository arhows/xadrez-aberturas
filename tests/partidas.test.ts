import { describe, expect, it } from 'vitest'
import { obterCapitulos } from '../src/lib/capitulos'
import { jogarLances } from '../src/lib/lances'
import { analisarPartida, corDoUsuario, detectarCor, lancesDoPgn, lerPgns, separarPgns, type PartidaBaixada } from '../src/lib/partidas'

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

const analisar = (p: PartidaBaixada, usuario: string, c: typeof capitulos) => analisarPartida(p, corDoUsuario(p, usuario), c)

describe('análise das partidas importadas', () => {
  it('fica fora do repertório quem não chega à base de nenhum capítulo', () => {
    const r = analisar(partida(['d4', 'd5', 'c4']), 'Arhows', capitulos)
    expect(r.capitulo).toBeNull()
  })

  it('acha o desvio do usuário e o lance do livro', () => {
    // O usuário (brancas) joga um lance de peão de h no lugar do 9.º meio-lance do livro.
    const desvio = linha.slice(0, 8)
    const r = analisar(partida([...desvio, 'h3', 'h6']), 'Arhows', capitulos)
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
    const r = analisar(partida([...linha.slice(0, 7), 'h6'], 'Arhows'), 'arhows', capitulos)
    expect(r.desvio?.quem).toBe('adversario')
    expect(r.desvio?.aresta).toBeUndefined()
  })

  it('reconhece a cor pelo nome, sem diferenciar maiúsculas', () => {
    const r = analisar(partida(linha.slice(0, 6), 'rival', 'ARHOWS'), 'Arhows', capitulos)
    expect(r.cor).toBe('b')
    expect(r.adversario).toBe('rival')
  })

  it('escolhe o capítulo seguido por mais lances (Dois Cavalos depois de 3...Nf6)', () => {
    const r = analisar(partida(['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5', 'd5']), 'Arhows', capitulos)
    expect(r.capitulo).toBe('two-knights')
  })

  it('lê PGN do chess.com com relógio nos comentários', () => {
    const pgn = '[Event "Live Chess"]\n[White "Arhows"]\n[Black "rival"]\n\n1. e4 {[%clk 0:09:58]} 1... e5 {[%clk 0:09:57]} 2. Nf3 Nc6 1-0'
    expect(lancesDoPgn(pgn)).toEqual(['e4', 'e5', 'Nf3', 'Nc6'])
  })
})

const PGN_MAIA = `[Event " Classical game"]
[Site "https://lichess.org/game/ocg_d8ac1f97"]
[Date "2026.11.08"]
[Variant "Standard"]
[Round "?"]
[White "Maia"]
[Black "Anonymous"]
[Result "1-0"]
[WhiteElo "?"]
[BlackElo "?"]

1. g3 g6 2. Bg2 Bg7 3. Nf3 Nf6 4. Nc3 Nc6 5. O-O O-O 6. d3 d6 7. e4 e5 8. Bg5 Bg4 9. Nd5 Nd4 10. h3 Bxf3 11. Bxf3 Nxf3+ 12. Qxf3 c6 13. Nxf6+ Bxf6 14. Bxf6 Qd7 15. g4 d5 16. exd5 cxd5 17. Bxe5 Qe6 18. Rfe1 Rae8 19. Qf6 Qxf6 20. Bxf6 Rxe1+ 21. Rxe1 h6 22. Re7 Kh7 23. Rxb7 g5 24. Rxa7 Kg6 25. Bd4 h5 26. gxh5+ Kxh5 27. Kg2 Re8 28. Rxf7 Re1 29. Rh7+ Kg6 30. Rg7+ Kh6 31. Be3 Kxg7 32. Bxg5 Kg6 33. Bd2 Rd1 34. Be3 Kh5 35. Kg3 Rg1+ 36. Kh2 Rf1 37. Kg2 Rc1 38. c3 Ra1 39. a3 Rb1 40. b4 Rb2 41. a4 Kh4 42. a5 Rb3 43. a6 Ra3 44. a7 d4 45. Bxd4 Kg5 46. Kg3 Ra1 47. b5 Rg1+ 48. Kh2 Rd1 49. a8=Q Rxd3 50. b6 Kh4 51. b7 Rxh3+ 52. Kg2 Kg4 53. b8=Q Rf3 54. Qg8+ Kf4 55. Qaf8+ Ke4 56. Qxf3# 1-0`

describe('importar PGN', () => {
  it('lê a partida offline do app do lichess contra a Maia', () => {
    const { partidas, erros } = lerPgns(PGN_MAIA, [])
    expect(erros).toEqual([])
    expect(partidas).toHaveLength(1)
    const { partida, cor } = partidas[0]
    expect(cor).toBe('b') // "Anonymous" é o usuário; Maia é o computador
    expect(partida.id).toBe('pgn:ocg_d8ac1f97')
    expect(partida.url).toBe('') // não existe no site do lichess
    expect(partida.data).toBe('2026-11-08')
    expect(partida.resultado).toBe('1-0')
    expect(partida.sans).toHaveLength(111)
    expect(partida.sans.at(-1)).toBe('Qxf3#')
  })

  it('separa várias partidas coladas juntas', () => {
    const outra = '[White "eu"]\n[Black "rival"]\n[Result "0-1"]\n\n1. e4 e5 2. Nf3 Nc6 0-1'
    expect(separarPgns(`${PGN_MAIA}\n\n${outra}\n`)).toHaveLength(2)
    const { partidas } = lerPgns(`${PGN_MAIA}\n\n${outra}`, ['Eu'])
    expect(partidas.map((p) => p.cor)).toEqual(['b', 'w'])
  })

  it('aceita só os lances, sem cabeçalhos', () => {
    const { partidas } = lerPgns('1. e4 e5 2. Nf3 Nc6 3. Bc4', [])
    expect(partidas[0].partida.sans).toEqual(['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'])
    expect(partidas[0].cor).toBeNull()
    expect(partidas[0].partida.id).toMatch(/^pgn:/)
  })

  it('aponta partidas que não dá para ler', () => {
    const { partidas, erros } = lerPgns('1. e4 e5 2. Ke3 Ke6 3. Qh8', [])
    expect(partidas).toHaveLength(0)
    expect(erros).toHaveLength(1)
  })

  it('detecta a cor pelo nome do usuário, pelo computador ou pelo lado anônimo', () => {
    expect(detectarCor('Arhows', 'rival', ['arhows'])).toBe('w')
    expect(detectarCor('Stockfish level 3', 'Fulano', [])).toBe('b')
    expect(detectarCor('Anonymous', 'Maia', [])).toBe('w')
    expect(detectarCor('Fulano', 'Ciclano', [])).toBeNull()
  })
})
