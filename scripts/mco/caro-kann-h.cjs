// Transcrição do MCO 15ª ed. — Caro-Kann, linhas sem 2.d4 (exceto Dois Cavalos) (pp. 195–196), colunas 61–66.
// Gerar: node scripts/mco/gerar.cjs caro-kann-h
// Formato: ver gambito-do-rei.cjs. Dicas em caro-kann-h-dicas.cjs.
// O cabeçalho do livro numera as colunas "61 61 63"; a segunda é a 62.

const C4 = '1 e4 c6 2 c4 d5 3 exd5 cxd5 4 cxd5'
const D3 = '1 e4 c6 2 d3 d5 3 Nd2'

const colunas = {
  c61: [`${C4} Nf6 5 Bb5+ Nbd7 6 Nc3 a6 7 Qa4 Rb8 8 Bxd7+ Qxd7 9 Qxd7+ Bxd7 10 Nge2 Rd8`, 'c4', '2.c4 … 5.Bb5+', '=',
    'Sem 2.d4 as brancas evitam as linhas principais da Caro-Kann. Com 2.c4 elas atacam d5 de imediato; depois de 5.Bb5+ as damas saem cedo e as pretas recuperam o peão: igual.'],
  c62: [`${C4} Nf6 5 Nc3 Nxd5 6 Nf3 Nxc3 7 bxc3 g6 8 d4 Bg7 9 Bd3 Nc6 10 O-O O-O`, 'c4', '2.c4 … 5.Nc3', '=',
    'Com 5.Nc3 Nxd5 6.Nf3 Nxc3 as brancas ficam com o centro de peões em c3 e d4; as pretas pressionam com o fianqueto e igualam.'],
  c63: [`${C4} Qxd5 5 Nc3 Qd6 6 d4 Nf6 7 Nge2 e6 8 g3 Be7 9 Bg2 O-O 10 O-O Rd8`, 'c4', '2.c4 … 4...Qxd5', '=',
    'Com 4...Qxd5 as pretas retomam com a dama; as brancas ganham tempo, mas a posição fica igual.'],
  c64: [`${D3} e5 4 Ngf3 Bd6 5 g3 Nf6 6 Bg2 O-O 7 O-O Re8 8 Re1 a5 9 h3 Na6 10 Nf1 dxe4`, 'd3', '2.d3 d5 3.Nd2 e5', '=',
    'Com 2.d3 e 3.Nd2 as brancas jogam um Ataque Índio do Rei. As pretas ocupam o centro com ...e5 e igualam. A coluna é Norberg–Lobron, Rilton Cup 2002.'],
  c65: [`${D3} g6 4 Ngf3 Bg7 5 Be2 e5 6 O-O Ne7 7 b4 a5 8 Bb2 Qc7 9 a3 O-O 10 h3 Nd7`, 'd3', '2.d3 d5 3.Nd2 g6', '=',
    'Com 3...g6 as pretas fazem o fianqueto; com 5.Be2 as brancas mantêm o bispo na diagonal f1–a6, mas as pretas igualam.'],
  c66: [`1 e4 c6 2 Nc3 d5 3 Qf3 dxe4 4 Nxe4 Nd7 5 d4 Ndf6 6 c3 Nxe4 7 Qxe4 Nf6 8 Qc2 Bg4 9 Ne2 e6 10 Ng3 Qd5`, 'nc3', '2.Nc3 d5 3.Qf3', '=',
    'Com 3.Qf3 as brancas sustentam e4 com a dama; as pretas trocam os cavalos e igualam. A coluna é Lutikov–Petrosian, Campeonato da URSS 1960.'],
}

const notas = [
  // Coluna 61
  ['c61', 'a', 'a', '(a)', '2... e5 3 d4 Bb4+ 4 Bd2 Bxd2+ 5 Qxd2 d6 6 Nc3 Qf6 7 Nge2 Ne7 8 O-O-O O-O 9 f4 Bg4 10 f5 Nc8 11 d5', { a: '⩲', r: 'Sax–Miles, Lugano 1989', c: 'Com 2...e5 as brancas ficam um pouco melhor.' }],
  ['c61', 'b', 'b', '(b)', '4 d4', { c: '4.d4 transpõe para o Ataque Panov-Botvinnik.' }],
  ['c61', 'c', 'c', '(c)', '5... Bd7 6 Bc4 b5 7 Bb3 Na6 8 Nf3 Nb4 9 Ne5 Nbxd5 10 Nc3 e6 11 O-O', { a: '⩲', r: 'Stohl–Blatny, Viena 1993', c: 'Com 5...Bd7 as brancas ficam um pouco melhor.' }],
  ['c61', 'd', 'd', '(d)', '6... g6 7 Nf3 Bg7 8 O-O O-O 9 d6 exd6 10 d4', { a: '⩲', r: 'Alekhine–Feigin, Kemeri 1937', c: 'Com 6...g6 as brancas ficam com uma vantagem mínima.' }],
  ['c61', 'e', 'e', '(e)', '11 d4 Bf5 12 Nf4 g5 13 Nfe2 Rg8 14 h4 gxh4 15 Nf4 Bh6 16 Rxh4 Bg5 17 Rh2 Bxf4', { a: '=', r: 'Rogers–Abein, Liga Holandesa 2007', c: 'Depois de 11.d4 fica igual.' }],
  // Coluna 62
  ['c62', 'f', 'f', '(f)', '5 Qa4+ Nbd7 6 Nc3 g6 7 Nf3 Bg7 8 Qb3 O-O 9 Bc4 a6 10 a4 Qa5 11 Ra3 Nb6 12 O-O Nxc4 13 Qxc4 Bf5', { a: '=', r: 'Albergei–Brunner, Meurthe-et-Moselle 2007', c: 'Com 5.Qa4+ também fica igual.' }],
  ['c62', 'g', 'g', '(g)', '6... Nc6 7 d4', { c: '6...Nc6 7.d4 transpõe para o Ataque Panov-Botvinnik.' }],
  ['c62', 'h', 'h', '(h)', '8 h4 Bg7 9 h5 Nc6 10 Rb1 Qc7 11 Ba3 Bf5 12 Rb5 a6 13 Rc5 Qd7 14 Qb3 O-O', { a: '∓', r: 'A. Sokolov–Karpov, match 1987', c: '8.h4 é original, mas duvidoso.' }],
  ['c62', 'i', 'i', '(i)', '11 Re1 Bg4 12 h3 Bxf3 13 Qxf3 Qa5 14 Bb2 Rac8 15 a4 Rfd8', { a: '=', r: 'Ehlvest–Lobron, Groningen 1993', c: 'Ou 11.Re1, igual.' }],
  // Coluna 63
  ['c63', 'j', 'j', '(j)', '7 Bc4 e6 8 Nf3 Nc6 9 O-O Be7 10 Nb5 Qd8 11 Bf4 O-O', { a: '=', r: 'Makarichev–Seirawan, Hastings 1979/80', c: 'Com 7.Bc4 também fica igual.' }],
  ['c63', 'k', 'k', '(k)', '11 Qc2 Qa6 12 Be3 Nc6 13 a3 Bf8 14 Rfd1 Ne7 15 Bg5 Nfd5 16 Nxd5 exd5', { a: '=', r: 'Nunn–Miles, Biel 1986', c: 'Ou 11.Qc2; a partida terminou empatada.' }],
  // Coluna 64
  ['c64', 'l', 'l', '(l)', '5 d4 exd4 6 exd5 cxd5 7 Nxd4 Nc6 8 N2f3 Nf6 9 Be2 O-O 10 O-O Re8 11 Re1 Qb6 12 c3 Bg4', { a: '=', r: 'Adams–Morović, Nova York 1995', c: 'Com 5.d4 o centro se abre e fica igual.' }],
  // Coluna 65
  ['c65', 'm', 'm', '(m)', '3... Nd7 4 Ngf3 Qc7 5 exd5 cxd5 6 d4 g6 7 Bd3 Bg7 8 O-O e6 9 Re1 Ne7 10 Nf1', { a: '⩲', r: 'Fischer–Marović, Zagreb 1970', c: 'Com 3...Nd7 vem 5.exd5!, e as brancas ficam um pouco melhor.' }],
  ['c65', 'n', 'n', '(n)', '5 g3 e5 6 Bg2 Ne7 7 O-O', { c: 'As brancas podem seguir no estilo do Ataque Índio do Rei com 5.g3, mas manter o bispo na diagonal f1–a6 é mais ativo.' }],
  ['c65', 'o', 'o', '(o)', '11 Re1 b6 12 Bf1 d4 13 c3 c5', { a: '=', r: 'Morrison–Arduman, Istambul 2003', c: 'Depois de 11.Re1 b6 12.Bf1 d4! fica igual.' }],
  // Coluna 66
  ['c66', 'p', 'p', '(p)', '3... d4 4 Bc4 Nf6 5 e5 dxc3 6 exf6 exf6 7 bxc3 Bd6 8 d4 O-O', { a: '=', r: 'Harvath–Borsi, Campeonato Húngaro 1991', c: 'As pretas podem escolher o mais complicado 3...d4, também igual.' }],
]

const capitulo = {
  id: 'caro-kann-h',
  arquivo: 'caro-kann-h',
  nome: 'Caro-Kann — Linhas sem 2.d4',
  fonte: 'Modern Chess Openings — Caro-Kann Defense (pp. 195–196), colunas 61–66',
  base: '1. e4 c6',
  corPadrao: 'b',
  ordem: 195,
  grupos: [
    { id: 'c4', nome: '2.c4', colunas: [61, 62, 63] },
    { id: 'd3', nome: '2.d3', colunas: [64, 65] },
    { id: 'nc3', nome: '2.Nc3 d5 3.Qf3', colunas: [66] },
  ],
}

module.exports = { capitulo, colunas, notas }
