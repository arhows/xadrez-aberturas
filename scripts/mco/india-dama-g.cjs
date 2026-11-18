// Transcrição do MCO 15ª ed. — Defesa Índia da Dama, quartos lances alternativos das brancas: 4.e3, 4.Nc3 e 4.Bf4
// (pp. 580–581), colunas 37–42.
// Gerar: node scripts/mco/gerar.cjs india-dama-g
// Formato: ver gambito-do-rei.cjs. Dicas em india-dama-g-dicas.cjs.
//
// Só a coluna 42 traz avaliação (=); as outras usam a da nota que as continua.
// Avaliações tiradas do texto: (e) "mais ou menos igual" ficou =; (j) B "com ameaças" ficou ±.
// Sinais conferidos com zoom: (b) ⩱; (d) 15...Qd7 ±; (j) A ⩲.
// Notas só com comentário: (g), (l).
// Notação: (e) 11...Nbd7 virou 11...Nd7 (o outro cavalo está em e4).
// A partida da coluna 42 é Djurić–Ornstein, Pamplona 1981 (citada na nota (r)); foi para o resumo da coluna.

const colunas = {
  c37: ['1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 e3 Bb7 5 Bd3 Be7 6 Nc3 d5 7 O-O O-O 8 b3 c5 9 Bb2 Nc6 10 Rc1 cxd4 11 exd4 Rc8', 'e3', '4.e3 Bb7 5.Bd3 Be7', '=',
    'Com 4.e3 as brancas escolhem um desenvolvimento tranquilo, sem disputar a grande diagonal. Depois de 4...Bb7 5.Bd3 Be7 6.Nc3 d5 7.O-O O-O 8.b3 c5 9.Bb2 Nc6 10.Rc1 cxd4 11.exd4 Rc8 o jogo é igual.'],
  c38: ['1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 e3 Bb7 5 Bd3 d5 6 O-O Bd6 7 Nc3 O-O 8 Qe2 Nbd7 9 e4 dxe4 10 Nxe4 Nxe4 11 Bxe4 Bxe4', 'e3', '5...d5', '=',
    'Com 5...d5 6.O-O Bd6 as pretas montam uma posição simétrica. Depois de 7.Nc3 O-O 8.Qe2 Nbd7 9.e4 dxe4 10.Nxe4 Nxe4 11.Bxe4 Bxe4 o jogo é igual.'],
  c39: ['1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 e3 c5 5 Nc3 d6 6 Be2 a6 7 O-O Nbd7 8 Re1 Be7 9 Bf1 O-O 10 d5 e5 11 Nd2 Ne8', 'e3', '4...c5', '=',
    'Com 4...c5 as pretas atacam d4 antes de definir o bispo. Depois de 5.Nc3 d6 6.Be2 a6 7.O-O Nbd7 8.Re1 Be7 9.Bf1 O-O 10.d5 e5 11.Nd2 Ne8 o jogo é igual.'],
  c40: ['1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 Nc3 Bb7 5 Bg5 h6 6 Bh4 Be7 7 e3 Ne4 8 Bxe7 Qxe7 9 Nxe4 Bxe4 10 Be2 O-O 11 O-O d6', 'nc3', '4.Nc3 Bb7 5.Bg5 h6', '=',
    'Com 4.Nc3 as brancas deixam a cravada ...Bb4, que leva à Nimzo-Índia. Depois de 4...Bb7 5.Bg5 h6 6.Bh4 Be7 7.e3 Ne4 8.Bxe7 Qxe7 9.Nxe4 Bxe4 10.Be2 O-O 11.O-O d6 o jogo é igual.'],
  c41: ['1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 Nc3 Bb7 5 Bg5 Be7 6 Qc2 d5 7 Bxf6 Bxf6 8 cxd5 exd5 9 g3 O-O 10 Bg2 c5 11 Rd1 Nc6', 'nc3', '5...Be7', '∞',
    'Com 5...Be7 6.Qc2 d5 7.Bxf6 Bxf6 8.cxd5 exd5 as pretas ficam com o par de bispos. Depois de 9.g3 O-O 10.Bg2 c5 11.Rd1 Nc6 há chances para os dois lados.'],
  c42: ['1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 Bf4 Bb7 5 e3 Be7 6 h3 c5 7 Nc3 cxd4 8 Nxd4 O-O 9 Ndb5 Ne8 10 Nd6 Nxd6 11 Bxd6 Na6', 'bf4', '4.Bf4', '=',
    'Com 4.Bf4 as brancas desenvolvem o bispo antes de e3. Na partida Djurić–Ornstein, Pamplona 1981, seguiu-se 4...Bb7 5.e3 Be7 6.h3 c5 7.Nc3 cxd4 8.Nxd4 O-O 9.Ndb5 Ne8 10.Nd6 Nxd6 11.Bxd6 Na6, e as pretas não têm problemas.'],
}

const notas = [
  // Coluna 37
  ['c37', 'a', 'a', '(a)', '6 O-O O-O 7 b3 d5 8 Nbd2 c5 9 Bb2 Nc6 10 Rc1 Rc8 11 Qe2 cxd4 12 exd4 Re8 13 Rfd1 Bf8 14 h3 g6', { a: '=', r: 'Eingorn–Lutz, Ostende 1992', c: '6.O-O O-O 7.b3 d5 8.Nbd2 c5 9.Bb2 Nc6 10.Rc1 Rc8 11.Qe2 cxd4 12.exd4 Re8 13.Rfd1 Bf8 14.h3 g6 leva à igualdade.' }],
  ['c37', 'b', 'b', '(b)', '8 Qe2 c5 9 dxc5 bxc5 10 e4 d4 11 Nb1 Nbd7 12 e5 Bxf3 13 gxf3 Ne8', { a: '⩱', r: 'Osterdam–Karpov, Liubliana 1975', c: '8.Qe2 c5 9.dxc5 bxc5 é igual; depois de 10.e4?! d4 11.Nb1 Nbd7 12.e5 Bxf3 13.gxf3 Ne8 as pretas ficam um pouco melhor.' }],
  ['c37', 'c', 'c', '(c)', '8... a6 9 Bb2 Nbd7 10 Qe2 Ne4 11 Rfd1 Bb4 12 Rac1 Qe7', { a: '=', r: 'Ibragimov–Chernin, França 1993', c: 'Também é razoável 8...a6 9.Bb2 Nbd7 10.Qe2 Ne4 11.Rfd1 Bb4 12.Rac1 Qe7, com igualdade.' }],
  ['c37', 'd', 'd', '(d)', '12 Re1 Re8 13 cxd5 Nxd5 14 Nxd5 Qxd5 15 Be4 Qh5 16 Ne5 Qxd1 17 Rexd1 Nxe5 18 Bxb7 Rxc1 19 Bxc1 Rd8', { a: '=', r: 'Petrosian–Peters, Lone Pine 1978', c: '12.Re1 Re8 13.cxd5 Nxd5 14.Nxd5 Qxd5 15.Be4 Qh5! 16.Ne5 Qxd1 17.Rexd1 Nxe5 18.Bxb7 Rxc1 19.Bxc1 Rd8 leva à igualdade.' }],
  ['c37-d', '1', 'd', '(d) 15...Qd7', '15... Qd7 16 Rxc6', { a: '±', c: '15...Qd7? 16.Rxc6! e 17.Ne5 é melhor para as brancas.' }],
  // Coluna 38
  ['c38', 'e', 'e', '(e)', '5... Bb4+ 6 Nbd2 O-O 7 O-O c5 8 a3 Bxd2 9 Bxd2 Ne4 10 Be1 d6 11 b4 Nd7', { a: '=', r: 'Dreev–Izeta, Espanha 1992', c: '5...Bb4+ 6.Nbd2 O-O 7.O-O c5 8.a3 Bxd2 9.Bxd2 Ne4 10.Be1 d6 11.b4 Nd7 é mais ou menos igual.' }],
  ['c38', 'f', 'f', '(f)', '8 b3 Nbd7 9 Bb2 a6 10 Rc1 Qe7 11 Na4 dxc4 12 bxc4 c5 13 Ne5 Rab8 14 Qe2 Rfd8', { a: '=', r: 'Hjartarson–Gulko, Filadélfia 1997', c: '8.b3 Nbd7 9.Bb2 a6 10.Rc1 Qe7 11.Na4 dxc4 12.bxc4 c5 13.Ne5 Rab8 14.Qe2 Rfd8 leva à igualdade.' }],
  ['c38', 'g', 'g', '(g)', '8... Ne4', { c: 'Uma boa alternativa é 8...Ne4, que impede a ruptura central.' }],
  ['c38', 'h', 'h', '(h)', '12 Qxe4 c5 13 Rd1 Nf6 14 Qe2 Qc7 15 Bg5 Be7 16 Rd3 Rfd8', { a: '=', r: 'Giorgadze–Smirnov, São Vicente 2005', c: '12.Qxe4 c5 13.Rd1 Nf6 14.Qe2 Qc7 15.Bg5 Be7 16.Rd3 Rfd8 leva à igualdade.' }],
  // Coluna 39
  ['c39', 'i', 'i', '(i)', '5 Bd3 d6 6 O-O Nbd7 7 b3 Be7 8 Bb2 O-O 9 Nc3 g6 10 Qe2 a6 11 Rad1 Bb7', { a: '=', r: 'Ivkov–Romanishin, Moscou 1985', c: '5.Bd3 d6 6.O-O Nbd7 7.b3 Be7 8.Bb2 O-O 9.Nc3 g6 10.Qe2 a6 11.Rad1 Bb7 leva à igualdade.' }],
  ['c39', 'j-A', 'j', '(j) A', '5... Bb7 6 d5 d6 7 e4 Be7 8 g3 exd5 9 exd5 O-O 10 Bg2 a6 11 a4 Bc8 12 O-O', { a: '⩲', r: 'Balashov–Borisenko, Novgorod 1995', c: '5...Bb7 6.d5 d6 7.e4 Be7 8.g3 exd5 9.exd5 O-O 10.Bg2 a6 11.a4 Bc8 12.O-O é um pouco melhor para as brancas.' }],
  ['c39', 'j-B', 'j', '(j) B', '5... cxd4 6 exd4 Bb7 7 Bd3 d5 8 cxd5 Nxd5 9 Ne5', { a: '±', r: 'Kallai–Pinter, Hungria 1995', c: '5...cxd4 6.exd4 Bb7 7.Bd3 d5 8.cxd5 Nxd5 9.Ne5! deixa as brancas com ameaças.' }],
  ['c39', 'k', 'k', '(k)', '12 f4 f5 13 g3 g6 14 Nf3 Bf6', { a: '=', r: 'Alburt–Ermenkov, Nova York 1980', c: '12.f4 f5 13.g3 g6 14.Nf3 Bf6 leva à igualdade.' }],
  // Coluna 40
  ['c40', 'l', 'l', '(l)', '4... Bb4', { c: '4...Bb4, agora ou nos dois lances seguintes, transpõe para a Nimzo-Índia (4.Nf3 b6).' }],
  ['c40', 'm', 'm', '(m)', '6... g5 7 Bg3 Nh5 8 e3 Nxg3 9 fxg3 Bg7 10 Bd3 Nc6 11 O-O Qe7 12 a3 O-O-O 13 Rc1 h5', { a: '=', r: 'Korchnoi–J. Polgár, Budapeste 2003', c: 'Também é bom 6...g5 7.Bg3 Nh5 8.e3 Nxg3 9.fxg3 Bg7 10.Bd3 Nc6 11.O-O Qe7 12.a3 O-O-O 13.Rc1 h5, com igualdade.' }],
  ['c40-m', '1', 'm', '(m) 9.hxg3', '9 hxg3 Bg7', { a: '=', c: '9.hxg3 Bg7 leva à igualdade.' }],
  ['c40', 'n', 'n', '(n)', '8 Nxe4 Bxe4 9 Bg3 O-O 10 Nd2 Bb7 11 Bd3 c5', { a: '=', r: 'Uhlmann–Simagin 1965', c: '8.Nxe4 Bxe4 9.Bg3 O-O 10.Nd2 Bb7 11.Bd3 c5 leva à igualdade.' }],
  ['c40', 'o', 'o', '(o)', '12 Nd2 Bb7 13 Bf3 c5 14 Bxb7 Qxb7 15 Nf3 Nd7', { a: '=', r: 'Spassky–Salov, Linares 1990', c: '12.Nd2 Bb7 13.Bf3 c5 14.Bxb7 Qxb7 15.Nf3 Nd7 leva à igualdade.' }],
  // Coluna 41
  ['c41', 'p', 'p', '(p)', '6 e3 c5 7 Bd3 O-O 8 O-O cxd4 9 exd4 d5 10 Qe2 dxc4 11 Bxc4 Nc6', { a: '=', r: 'Kamsky–Korchnoi, Mônaco 1994', c: '6.e3 c5 7.Bd3 O-O 8.O-O cxd4 9.exd4 d5 10.Qe2 dxc4 11.Bxc4 Nc6 leva à igualdade.' }],
  ['c41', 'q', 'q', '(q)', '12 dxc5 d4', { a: '∞', r: 'Seirawan–Christiansen, Santa Mônica 1985', c: '12.dxc5 d4! dá chances para os dois lados.' }],
  // Coluna 42
  ['c42', 'r', 'r', '(r)', '5... Bb4+ 6 Nfd2 O-O 7 a3 Be7 8 Nc3 d5 9 cxd5 Nxd5 10 Nxd5 Bxd5 11 Rc1 c5 12 dxc5 Bxc5 13 Bc4 Bb7', { a: '=', r: 'Miles–Hübner, Inglaterra x Alemanha 1979', c: '5...Bb4+ 6.Nfd2 O-O 7.a3 Be7 8.Nc3 d5 9.cxd5 Nxd5 10.Nxd5 Bxd5 11.Rc1 c5 12.dxc5 Bxc5 13.Bc4 Bb7 leva à igualdade.' }],
]

const capitulo = {
  id: 'india-dama-g',
  arquivo: 'india-dama-g',
  nome: 'Índia da Dama — 4.e3, 4.Nc3 e 4.Bf4',
  fonte: 'Modern Chess Openings — Queen\'s Indian Defense (pp. 580–581), colunas 37–42',
  base: '1. d4 Nf6 2. c4 e6 3. Nf3 b6',
  corPadrao: 'b',
  ordem: 580,
  grupos: [
    { id: 'e3', nome: '4.e3', colunas: [37, 38, 39] },
    { id: 'nc3', nome: '4.Nc3', colunas: [40, 41] },
    { id: 'bf4', nome: '4.Bf4', colunas: [42] },
  ],
}

module.exports = { capitulo, colunas, notas }
