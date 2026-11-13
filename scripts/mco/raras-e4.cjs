// Transcrição do MCO 15ª ed. — Defesas raras de 1.e4: Owen (1...b6), 1...a6 e Basman (1...g5) (pp. 385–386), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs raras-e4
// Formato: ver gambito-do-rei.cjs. Dicas em raras-e4-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.

const B = '1 e4'

const colunas = {
  c01: [`${B} b6 2 d4 Bb7 3 Bd3 e6 4 Nf3 c5 5 c3 Nf6 6 Nbd2 Nc6 7 a3 d5 8 e5 Nd7`, 'owen', 'Owen: 3.Bd3 e6 4.Nf3 c5', '±',
    'Na Defesa Owen (1...b6) as pretas pressionam a grande diagonal branca e seguem com ...e6 e ...c5. O melhor para as brancas é defender e4 com 3.Bd3, para que c3 possa defender d4 depois; com 7.a3! e 8.e5 elas ficam com clara vantagem.'],
  c02: [`${B} b6 2 d4 Bb7 3 Nc3 e6 4 Nf3 Bb4 5 Bd3 Nf6 6 Bg5 h6 7 Bxf6 Bxc3+ 8 bxc3 Qxf6`, 'owen', 'Owen: 3.Nc3 e6', '⩲',
    'Com 3.Nc3 as brancas também conseguem uma pequena vantagem. As pretas cravam o cavalo com 4...Bb4 e trocam as peças menores, mas as brancas ficam com o centro.'],
  c03: [`${B} a6 2 d4 b5 3 Bd3 Bb7 4 Nf3 Nf6 5 Nbd2 e6 6 O-O c5 7 dxc5 Bxc5 8 e5 Nd5`, 'a6', '1...a6 2.d4 b5 3.Bd3', '⩲',
    'Com 1...a6 e 2...b5 as pretas também levam o bispo à grande diagonal branca e ainda se expandem na ala da dama. Com jogo preciso as brancas ficam melhor; com menos precisão as pretas conseguem o jogo confuso que procuram.'],
  c04: [`${B} a6 2 d4 b5 3 c4 e6 4 cxb5 axb5 5 Bxb5 Bb7 6 Nc3 Bb4 7 f3 Qh4+ 8 g3 Qh5`, 'a6', '3.c4 e6!?', '∞',
    'Com 3.c4 as brancas atacam o peão de b5. As pretas o entregam com 3...e6!? e, depois de 5.Bxb5 Bb7, pressionam e4 e o cavalo de c3; a dama preta sai com xeque e o jogo fica indefinido.'],
  c05: [`${B} g5 2 d4 h6 3 Bd3 d6 4 Ne2 c5 5 c3 Nf6 6 O-O Nc6 7 Nd2 Bd7 8 Nc4 Bg7`, 'basman', 'Basman: 2...h6 3.Bd3', '⩲',
    'A Defesa Basman (1...g5) é um Ataque Grob invertido. A primeira reação é achar que deve ser muito ruim, mas as pretas ficam só um pouco piores; com 2...h6 elas defendem o peão e montam uma posição fechada.'],
  c06: [`${B} g5 2 d4 Bg7 3 Bxg5 c5 4 Nf3 Nc6 5 Nbd2 cxd4 6 Nb3 Qb6 7 a4 a6 8 a5 Qa7`, 'basman', '2...Bg7 3.Bxg5 c5', '⩲',
    'Com 2...Bg7 as pretas entregam o peão de g5 em troca de pressão sobre d4. Depois de 3.Bxg5 c5 4.Nf3! as brancas defendem o centro e ficam com o peão a mais e uma pequena vantagem.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '3... f5 4 exf5 Bxg2 5 Qh5+ g6 6 fxg6 Bg7 7 Qf5 Nf6 8 Bh6 Bxh6 9 gxh7 Bxh1 10 Qg6+ Kf8 11 Qxh6+ Kf7 12 Nh3', { a: '+−', r: 'Brüder–Vegener, por correspondência 1982', c: 'Ambicioso demais é 3...f5? 4.exf5 Bxg2 5.Qh5+ g6 6.fxg6, e 12.Nh3 dá às brancas um ataque vencedor.' }],
  ['c01', 'b', 'b', '(b)', '5... cxd4 6 cxd4 Bb4+ 7 Nc3 Nf6 8 Qe2 d5 9 e5 Ne4 10 O-O Bxc3 11 bxc3 Nxc3 12 Qe3 Nc6 13 Bb2 Ne4 14 Ba3', { a: '±', r: 'Adams–van der Waerden, Olimpíada de Moscou 1994', c: '5...cxd4 6.cxd4 Bb4+ 7.Nc3 favorece as brancas, mesmo depois do sacrifício de peão 10.O-O!?.' }],
  ['c01', 'c', 'c', '(c)', '6 Qe2 Be7 7 O-O Nc6 8 a3 Na5 9 Nbd2 c4 10 Bc2 Qc7 11 Ne5 b5 12 f4', { a: '±', r: 'Kir. Georgiev–Miles, Biel 1992', c: '6.Qe2 Be7 7.O-O também favorece as brancas.' }],
  ['c01', 'd', 'd', '(d)', '9 b4 Be7 10 O-O O-O 11 Re1', { a: '±', c: '9.b4 Be7 10.O-O O-O 11.Re1 deixa as brancas com clara vantagem.' }],
  // Coluna 2
  ['c02', 'e', 'e', '(e)', '4 a3 Nf6 5 Bd3 c5 6 Nf3 cxd4 7 Nxd4 Nc6 8 Nxc6 Bxc6 9 e5 Nd5 10 Ne4', { a: '⩲', r: 'Prada–Scaramuao, por correspondência 1989', c: '4.a3 Nf6 5.Bd3 c5 dá pequena vantagem às brancas.' }],
  ['c02', 'f', 'f', '(f)', '9 O-O d6 10 Nd2 e5 11 f4 Qe7 12 Qg4', { a: '⩲', r: 'David–Bauer, França 2005', c: '9.O-O d6 10.Nd2 e5 11.f4 dá pequena vantagem às brancas.' }],
  // Coluna 3
  ['c03', 'g-A', 'g', '(g) A', '5 e5 Nd5 6 a4 b4 7 Ng5 e6 8 Qh5 g6 9 Qh3 Be7 10 Ne4 Nc6 11 Be3 d6', { a: '∞', r: 'Sjöberg–Windleboe, Aarhus 1994', c: '5.e5 Nd5 6.a4 b4 leva ao tipo de posição confusa que as pretas procuram.' }],
  ['c03', 'g-B', 'g', '(g) B', '5 Qe2 e6 6 a4 c5 7 dxc5 Bxc5 8 Nbd2 b4 9 e5 Nd5 10 Ne4 Be7', { a: '∞', r: 'Karpov–Miles, Skara 1980', c: 'A partida mais famosa com 1...a6 foi Karpov–Miles: 5.Qe2 e6 6.a4 c5 levou a um jogo indefinido, e Miles ganhou.' }],
  ['c03', 'h', 'h', '(h)', '7 c3', { c: 'Simples e forte é 7.c3, que mantém o centro e completa o desenvolvimento antes de atacar.' }],
  ['c03', 'i', 'i', '(i)', '9 Ne4 Be7 10 Bg5 O-O 11 Nd6 Bc6 12 Bxe7 Qxe7 13 a4 f6 14 Ne4', { a: '⩲', r: 'Tischbierek–Reefschläger, Alemanha 1994', c: '9.Ne4 Be7 10.Bg5 dá pequena vantagem às brancas.' }],
  // Coluna 4
  ['c04', 'j', 'j', '(j)', '3... Bb7 4 f3 bxc4 5 Bxc4 e6 6 Nc3', { a: '±', r: 'Ratna Sulistya–Botsari, Buenos Aires 1992', c: '3...Bb7 4.f3 bxc4 5.Bxc4 favorece as brancas. O gambito do peão da ala da coluna é mais promissor.' }],
  ['c04', 'k', 'k', '(k)', '9 Qd3 Ne7 10 Ne2 f5 11 Nf4 Qf7', { a: '∞', r: 'Bronstein–Beck, Budapeste 1989', c: '9.Qd3 Ne7 10.Ne2 f5 dá chances aos dois lados.' }],
  // Coluna 5
  ['c05', 'l', 'l', '(l)', '3 h4 g4 4 Nc3 d6 5 Be3 c6 6 Qd2 b5 7 Bd3 Nd7 8 Nge2 Ngf6 9 Ng3 Bb7 10 O-O-O Qa5 11 Kb1 O-O-O', { a: '=', r: 'Barlov–Basman, 1988', c: '3.h4 g4 4.Nc3 d6 leva à igualdade.' }],
  ['c05', 'm', 'm', '(m)', '7... Qc7 8 b4 b6 9 bxc5 bxc5 10 Rb1 Bd7 11 Nc4', { a: '±', r: 'Nunn–Basman, Londres 1980', c: '7...Qc7 8.b4! b6 favorece as brancas.' }],
  ['c05-m', '1', 'm', '(m) 8...cxb4', '8... cxb4 9 cxb4 Nxb4 10 Qa4+ Nc6 11 d5', { a: '±', c: '8...cxb4 9.cxb4 Nxb4 10.Qa4+ Nc6 11.d5 também é bom para as brancas. (O Stockfish mostra que 11.d5 ganha o cavalo cravado em c6.)' }],
  ['c05', 'n', 'n', '(n)', '9 d5 Ne5 10 Nxe5 dxe5 11 Ng3 Qc7 12 Qe2 a6 13 b4', { a: '⩲', r: 'Wulf–Herrnkind, Alemanha 1992', c: '9.d5 Ne5 10.Nxe5 dxe5 dá pequena vantagem às brancas.' }],
  // Coluna 6
  ['c06', 'o', 'o', '(o)', '3 c3 h6', { c: 'Mais seguro é 3.c3 h6, como na coluna anterior.' }],
  ['c06', 'p', 'p', '(p)', '4... Qb6 5 Nc3 Qxb2 6 Nb5 Na6 7 Bd3 cxd4 8 O-O Qb4 9 Re1 e5 10 Rb1 Qc5 11 Qd2 Ne7 12 Bh6', { a: '∞', r: 'Roscher–Bettermann, por correspondência 1989', c: '4...Qb6 5.Nc3 Qxb2 dá às brancas bom jogo pelo peão. (O Stockfish vai além: depois de 12.Bh6 as brancas têm clara vantagem.)' }],
  ['c06', 'q', 'q', '(q)', '9 Bd3 d6 10 Nfd2 Nf6 11 Nc4 Be6 12 Nb6', { a: '⩲', r: 'Jongman–Wind, por correspondência 1981', c: '9.Bd3 d6 10.Nfd2 dá pequena vantagem às brancas.' }],
]

const capitulo = {
  id: 'raras-e4',
  arquivo: 'raras-e4',
  nome: 'Defesas raras de 1.e4 (Owen, 1...a6, Basman)',
  fonte: 'Modern Chess Openings — Unusual King\'s Pawn Defenses (pp. 385–386), colunas 1–6',
  base: '1. e4',
  corPadrao: 'b',
  ordem: 385,
  grupos: [
    { id: 'owen', nome: 'Defesa Owen (1...b6)', colunas: [1, 2] },
    { id: 'a6', nome: '1...a6', colunas: [3, 4] },
    { id: 'basman', nome: 'Defesa Basman (1...g5)', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
