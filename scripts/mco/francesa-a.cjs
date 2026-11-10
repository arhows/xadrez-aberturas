// Transcrição do MCO 15ª ed. — Defesa Francesa, Variante do Avanço (pp. 203–205), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs francesa-a
// Formato: ver gambito-do-rei.cjs. Dicas em francesa-a-dicas.cjs.

const A5 = '1 e4 e6 2 d4 d5 3 e5 c5 4 c3 Nc6 5 Nf3'

const colunas = {
  c01: [`${A5} Qb6 6 Be2 cxd4 7 cxd4 Nh6 8 Nc3 Nf5 9 Na4 Bb4+ 10 Bd2 Qa5 11 Bc3 b5 12 a3 Bxc3+`, 'qb6', '5...Qb6 6.Be2', '=',
    'Defesa Francesa: com 1...e6 e 2...d5 as pretas disputam o centro e aceitam um jogo um pouco apertado, com manobras e rupturas de peões. Na Variante do Avanço (3.e5) a cadeia de peões branca aponta para o flanco do rei e a preta para o flanco da dama; com 3...c5 as pretas atacam a base da cadeia, d4.'],
  c02: [`${A5} Qb6 6 a3 c4 7 Nbd2 Na5 8 Be2 Bd7 9 O-O O-O-O 10 Rb1 Nb3 11 Nxb3 Ba4 12 Be3 Bxb3`, 'qb6', '5...Qb6 6.a3 c4', '=',
    'Com 6.a3 as brancas preparam b4; com 6...c4 as pretas fecham o flanco da dama e o jogo vira uma luta de manobras numa posição fechada.'],
  c03: [`${A5} Qb6 6 a3 Bd7 7 b4 cxd4 8 cxd4 Rc8 9 Bb2 Na5 10 Nbd2 Nc4 11 Nxc4 dxc4 12 Rc1 a5`, 'qb6', '5...Qb6 6.a3 Bd7', '⩲',
    'Com 6...Bd7 as pretas pressionam a coluna c; as brancas ganham espaço no flanco da dama com b4 e ficam um pouco melhor.'],
  c04: [`${A5} Bd7 6 Be2 Nge7 7 O-O cxd4 8 cxd4 Nf5 9 Nc3 Rc8 10 a3 a6 11 Be3 Be7 12 Bd3 Nxe3`, 'outras5', '5...Bd7', '=',
    'Com 5...Bd7 as pretas adiam ...Qb6 e trocam o bispo de e3 com o cavalo de f5: igual.'],
  c05: [`${A5} Nge7 6 Na3 cxd4 7 cxd4 Nf5 8 Nc2 Qb6 9 Bd3 Bb4+ 10 Kf1 Be7 11 h4 Bd7 12 g4 Nh6`, 'outras5', '5...Nge7', '⩲',
    'Com 5...Nge7 o cavalo vai para f5 pressionar d4; as brancas o expulsam com h4 e g4 e ficam com vantagem de espaço.'],
  c06: [`1 e4 e6 2 d4 d5 3 e5 c5 4 Nf3 cxd4 5 Bd3 Nc6 6 O-O Nge7 7 Bf4 Ng6 8 Bg3 Be7 9 Nbd2 f5 10 exf6 gxf6 11 Nh4 f5 12 Nxg6 hxg6`, 'nf3', '4.Nf3 cxd4 5.Bd3', '∓',
    'Com 4.Nf3 e 5.Bd3 as brancas entregam o peão de d4 para desenvolver rápido, mas não têm compensação suficiente.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '3... b6 4 c3 Qd7 5 a4 a5 6 f4 Ne7 7 Nd2 h5 8 Ndf3 Ba6 9 Bxa6 Nxa6 10 Be3 Nf5 11 Bf2 Be7 12 Ne2', { a: '±', r: 'Kupreichik–Korchnoi, Sochi 1970', c: '3...c5 ataca a base da cadeia de peões. As alternativas são fracas.' }],
  ['c01', 'b', 'b', '(b)', '4... Qb6 5 Nf3 Bd7 6 Be2 cxd4 7 cxd4 Bb5 8 O-O Bxe2 9 Qxe2 Ne7 10 Nc3 Nec6 11 Be3 Nd7 12 Ne1 Be7 13 Nd3', { a: '⩲', r: 'Movsesian–Berkes, Budapeste 2003', c: 'Uma tentativa interessante é 4...Qb6 com ...Bb5, trocando o bispo ruim.' }],
  ['c01-b', '1', 'b', '(b) 6...Bb5', '6... Bb5 7 c4', { a: '⩲', c: 'Se 6...Bb5 de imediato, 7.c4!.' }],
  ['c01', 'c-A', 'c', '(c) A', '6... Nh6 7 Bd3 cxd4 8 cxd4 Nf5 9 Bxf5 exf5 10 Nc3 Be6 11 Ne2 h6 12 h4 O-O-O', { a: '=', r: 'Benjamin–Shaked, Kona 1998', c: 'Com 6...Nh6 e 7.Bd3 fica igual.' }],
  ['c01', 'c-B', 'c', '(c) B', '6... Nh6 7 Bxh6 gxh6 8 Qd2 Bg7 9 O-O O-O 10 Na3 cxd4 11 cxd4 f6 12 exf6 Rxf6 13 Nc2 Bd7 14 b4', { a: '⩲', r: 'McShane–Gdanski, Istambul 2003', c: 'Ou 7.Bxh6, e as brancas ficam um pouco melhor.' }],
  ['c01-c-B', '1', 'c', '(c) 7...Qxb2?', '7... Qxb2 8 Be3 Qxa1 9 Qc2 cxd4 10 Nxd4', { c: '7...Qxb2? 8.Be3 Qxa1 9.Qc2 deixa a dama preta em perigo.' }],
  ['c01', 'd', 'd', '(d)', '7... Nge7 8 Na3 Nf5 9 Nc2 Bb4+ 10 Kf1 Be7 11 h4', { a: '⩲', r: 'Benjamin–Bareev, Munique 1994', c: 'Com 7...Nge7 as brancas ficam um pouco melhor.' }],
  ['c01', 'e-A', 'e', '(e) A', '8 Bxh6 Qxb2 9 Nbd2 gxh6 10 O-O Nxd4 11 Qa4+ Nc6', { a: '∓', r: 'F. Jackson–Abela, Olimpíada de Calvià 2004', c: '8.Bxh6?! deixa as brancas sem compensação suficiente pelos peões.' }],
  ['c01', 'e-B', 'e', '(e) B', '8 b3 Nf5 9 Bb2 Bb4+ 10 Kf1 Be7 11 Nc3 Qd8 12 g3 f6 13 Kg2 fxe5 14 dxe5 O-O', { a: '=', r: 'Sveshnikov–Portisch, Biel 1993', c: 'Com 8.b3 fica igual.' }],
  ['c01', 'f', 'f', '(f)', '13 Nxc3 b4 14 axb4 Qxb4 15 Bb5 Bd7 16 Bxc6 Bxc6 17 Qd2 Bb5 18 Nxb5 Qxb5', { a: '=', r: 'Nunn–Schmittdiel, Dortmund 1991', c: 'Depois de 13.Nxc3 fica igual.' }],
  // Coluna 2
  ['c02', 'g', 'g', '(g)', '6 Bd3 cxd4 7 cxd4 Bd7 8 O-O Nxd4 9 Nxd4 Qxd4 10 Nc3', { c: 'As brancas têm um gambito duvidoso com 6.Bd3.' }],
  ['c02-g', '1', 'g', '(g) 10...Qxe5', '10... Qxe5 11 Re1 Qb8 12 Nxd5 Bd6', { a: '⩱', c: 'Tanto 10...Qxe5 11.Re1 Qb8! quanto 10...a6 deixam as pretas com chances um pouco melhores.' }],
  ['c02-g', '2', 'g', '(g) 10...a6', '10... a6 11 Qe2 Ne7 12 Kh1 Nc6 13 f4 Nb4', { a: '⩱', c: 'Ou 10...a6, também um pouco melhor para as pretas.' }],
  ['c02', 'h', 'h', '(h)', '7... f6 8 Be2 fxe5 9 Nxe5 Nxe5 10 dxe5 Bc5 11 O-O Ne7 12 b4 cxb3 13 Nxb3 O-O', { a: '=', r: 'Conquest–Pelletier, Liga Francesa 2002', c: 'Com 7...f6 também fica igual.' }],
  ['c02', 'i', 'i', '(i)', '8 g3 Bd7 9 Bh3 Ne7 10 O-O h6 11 Ne1 O-O-O 12 Ng2 Kb8 13 Rb1 Ka8 14 Kh1 Nec6 15 f4 g6', { a: '=', r: 'Lobron–Hjartarson, Interzonal de Manila 1990', c: 'Com 8.g3 também fica igual.' }],
  ['c02', 'j', 'j', '(j)', '9... Ne7 10 Re1 h6 11 Rb1 Nc8 12 Nf1 Qb3 13 Qxb3 Nxb3 14 Bf4 Ba4 15 Ng3', { a: '⩲', r: 'Sveshnikov–Lutz, Berlim 1989', c: 'Com 9...Ne7 as brancas ficam com perspectivas melhores.' }],
  ['c02', 'k', 'k', '(k)', '13 Qc1 a5 14 Nd2 a4 15 f4 Ne7', { a: '=', r: 'Mamedyarov–El Gindy, Dubai 2003', c: 'Nesta posição fechada os dois lados precisam de manobras pouco comuns.' }],
  // Coluna 3
  ['c03', 'l', 'l', '(l)', '6... Nh6 7 b4 cxd4 8 cxd4 Nf5 9 Bb2 Be7 10 Bd3 a5 11 Qa4 O-O 12 b5 Nh4 13 Nxh4 Bxh4', { a: '=', r: 'Klik–Korchnoi, Rilton Cup 2003', c: 'Uma tentativa interessante é 6...Nh6.' }],
  ['c03', 'm', 'm', '(m)', '11 Bxc4 dxc4 12 Rc1 c3 13 Bxc3 Ne7 14 O-O Nd5 15 Ne4 Be7 16 Bd2 O-O', { a: '∞', r: 'Sax–Nogueiras, Lucerna 1989', c: 'Com 11.Bxc4 as pretas entregam um peão e têm compensação.' }],
  ['c03', 'n', 'n', '(n)', '13 Nd2 axb4 14 Nxc4 Qd8 15 a4 Bc6 16 a5 Be7 17 Nb6', { a: '⩲', r: 'Fressinet–Socko, Bundesliga 2002', c: 'Depois de 13.Nd2 as brancas ficam um pouco melhor.' }],
  // Coluna 4
  ['c04', 'o', 'o', '(o)', '6 a3 f6 7 Bd3 Qc7 8 O-O O-O-O 9 Bf4 c4 10 Bc2 h6', { a: '=', r: 'Adams–Epishin, Ter Apel 1992', c: 'Com 6.a3 também fica igual; 6.a3 é mais promissor quando a dama preta está em b6.' }],
  ['c04', 'p-A', 'p', '(p) A', '6... f6 7 O-O fxe5 8 Nxe5 Nxe5 9 dxe5 Qc7 10 c4 d4 11 Bf4 O-O-O 12 Nd2 Bc6 13 Bd3 g5', { a: '=', r: 'Della Morte–Prates, Argentina 2005', c: 'Com 6...f6 e 13...g5! fica igual.' }],
  ['c04', 'p-B', 'p', '(p) B', '6... Nh6 7 Bxh6 gxh6 8 O-O Qb6 9 Qd2 Bg7 10 Na3 O-O 11 Nc2', { a: '⩲', r: 'Topalov–Bareev, Novgorod 1997', c: 'Com 6...Nh6 as brancas ficam um pouco melhor.' }],
  ['c04', 'q', 'q', '(q)', '7 Na3 cxd4 8 cxd4 Nf5 9 Nc2 Nb4 10 O-O Nxc2 11 Qxc2 Qb6 12 Qd3 Rc8 13 Rd1 h6', { a: '=', r: 'Campora–Dreev, Biel 1995', c: 'Com 7.Na3 também fica igual.' }],
  ['c04', 'r-A', 'r', '(r) A', '7... Ng6 8 Be3 cxd4 9 cxd4 Be7 10 Nc3 O-O 11 Rc1', { a: '⩲', r: 'Benjamin–Sharavdorj, US Open 2005', c: 'Com 7...Ng6 as brancas ficam um pouco melhor.' }],
  ['c04', 'r-B', 'r', '(r) B', '7... Nf5 8 Bd3 cxd4 9 Bxf5 exf5 10 Nxd4', { a: '⩲', c: 'Com 7...Nf5 também.' }],
  ['c04', 'r-C', 'r', '(r) C', '7... Rc8 8 dxc5 Ng6 9 b4 Be7 10 Be3 Ncxe5 11 Nxe5 Nxe5 12 Nd2 O-O 13 f4 Ng6 14 Nb3 Qe8 15 Bd4', { a: '⩲', r: 'Peng–Yusupov, Olimpíada de Elista 1998', c: 'Com 7...Rc8 também.' }],
  // O livro escreve 12...Nxd3, mas o cavalo de f5 não alcança d3; o lance é 12...Nxe3 (a nota segue 13 fxe3).
  ['c04', 's', 's', '(s)', '13 fxe3 O-O 14 Rc1 f5 15 exf6 Bxf6', { a: '=', r: 'Webb–McDonald, Hastings 2003', c: 'Depois de 13.fxe3 fica igual. (O livro escreve 12...Nxd3 na coluna, mas o cavalo de f5 não alcança d3: o lance é 12...Nxe3.)' }],
  // Coluna 5
  ['c05', 't', 't', '(t)', '5... Nh6 6 Bd3 cxd4 7 cxd4 Nf5 8 Bxf5 exf5 9 Nc3 Be6 10 Ne2 h6 11 h4 Qa5+ 12 Kf1 Be7 13 Kg1', { a: '⩲', r: 'Adams–Lputian, Pula 1997', c: 'Com 5...Nh6?! a estrutura de peões dá às brancas perspectivas mais ativas.' }],
  ['c05', 'u', 'u', '(u)', '6 a3 Bd7 7 b4 cxd4 8 cxd4 Nf5 9 Bb2 a5 10 b5 Na7 11 a4 Bb4+ 12 Nbd2', { a: '⩲', r: 'Baklan–Glek, Bad Zwesten 1999', c: 'Com 6.a3 as brancas também ficam um pouco melhor.' }],
  ['c05', 'v', 'v', '(v)', '8... Qa5+ 9 Bd2 Qb6 10 Bc3 Be7 11 Bd3 a5 12 a3 Bd7 13 O-O O-O 14 g4 Nh4 15 Nxh4 Bxh4 16 f4 f6 17 g5 fxg5 18 Qh5', { a: '±', r: 'Hodgson–B. Lalić, Ilha de Man 1995', c: 'Com 8...Qa5+ as brancas atacam no flanco do rei.' }],
  ['c05', 'w', 'w', '(w)', '13 Rg1 Ng8 14 Rb1 a5 15 Qe2 Nb4 16 Nxb4 axb4 17 a3', { a: '⩲', r: 'Rohde–Spraggett, Nova York 1986', c: 'As brancas ficam com vantagem de espaço.' }],
  // Coluna 6
  ['c06', 'x-A', 'x', '(x) A', '4 dxc5 Nc6 5 Nf3 Bxc5 6 Bd3 f6 7 Qe2 fxe5 8 Nxe5 Nf6', { a: '=', c: 'Com 4.dxc5 as pretas igualam.' }],
  ['c06', 'x-B', 'x', '(x) B', '4 Qg4 cxd4 5 Nf3 Nc6 6 Bd3 Nge7 7 O-O Ng6 8 Re1 Be7 9 a3 O-O 10 Nbd2 f5', { a: '∓', r: 'Gershkovich–Petrosian, Tbilisi 1945', c: 'Com 4.Qg4 as pretas ficam melhor depois de 10...f5!.' }],
  ['c06', 'y', 'y', '(y)', '6... f6 7 Qe2 fxe5 8 Nxe5 Nxe5 9 Qxe5 Nf6 10 Bf4 Qb6 11 Nd2 Be7 12 Nb3 O-O', { a: '=', r: 'van Wijgerden–van der Sterren, Leeuwarden 1977', c: 'Também é jogável 6...f6.' }],
  ['c06', 'z', 'z', '(z)', '13 Nf3 Bf6 14 Bb5 Bd7 15 Bxc6 bxc6', { a: '∓', r: 'Hartman–Bekefi, Toronto 1994', c: 'Depois de 13.Nf3 as pretas ficam melhor.' }],
]

const capitulo = {
  id: 'francesa-a',
  arquivo: 'francesa-a',
  nome: 'Francesa — Variante do Avanço',
  fonte: 'Modern Chess Openings — French Defense (pp. 203–205), colunas 1–6',
  base: '1. e4 e6 2. d4 d5 3. e5',
  corPadrao: 'b',
  ordem: 197,
  grupos: [
    { id: 'qb6', nome: '4.c3 Nc6 5.Nf3 Qb6', colunas: [1, 2, 3] },
    { id: 'outras5', nome: '5...Bd7 e 5...Nge7', colunas: [4, 5] },
    { id: 'nf3', nome: '4.Nf3', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
