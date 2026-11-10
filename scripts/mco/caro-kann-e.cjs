// Transcrição do MCO 15ª ed. — Caro-Kann, Variante do Avanço (pp. 189–190), colunas 43–48.
// Gerar: node scripts/mco/gerar.cjs caro-kann-e
// Formato: ver gambito-do-rei.cjs. Dicas em caro-kann-e-dicas.cjs.

const A3 = '1 e4 c6 2 d4 d5 3 e5'

const colunas = {
  c43: [`${A3} Bf5 4 Nf3 e6 5 Be2 Ne7 6 O-O Nd7 7 Nh4 Bg6 8 Nd2 c5 9 c3 Nc6 10 Nxg6 hxg6 11 Nf3 cxd4 12 cxd4 Be7`, 'nf3', '3...Bf5 4.Nf3 e6 5.Be2 Ne7', '⩲',
    'Variante do Avanço: com 3.e5 as brancas ganham espaço e fecham o centro. As pretas tiram o bispo com 3...Bf5 antes de ...e6 e atacam a cadeia de peões com ...c5. Na linha tranquila com 4.Nf3 e 5.Be2 as brancas ganham o par de bispos e ficam um pouco melhor.'],
  c44: [`${A3} Bf5 4 Nf3 e6 5 Be2 c5 6 O-O Nc6 7 c3 Bg4 8 Nbd2 cxd4 9 cxd4 Nge7 10 a3 Nf5 11 b4 Be7 12 h3 Bxf3`, 'nf3', '3...Bf5 4.Nf3 e6 5.Be2 c5', '⩲',
    'Com 5...c5 as pretas atacam o centro de imediato. A linha foi usada por Karpov contra Anand e Short; as brancas mantêm uma pequena vantagem.'],
  c45: [`${A3} Bf5 4 Nc3 e6 5 g4 Bg6 6 Nge2 c5 7 h4 h6 8 Be3 Qb6 9 f4 Nc6 10 f5 Bh7 11 Qd2 O-O-O 12 O-O-O c4`, 'nc3', '3...Bf5 4.Nc3 e6 5.g4', '=',
    'Com 4.Nc3 e 5.g4 as brancas caçam o bispo de f5 com os peões. A posição fica selvagem, com chances mais ou menos iguais.'],
  c46: [`${A3} Bf5 4 Nc3 Qb6 5 g4 Bd7 6 Na4 Qc7 7 Nc5 e6 8 Nxd7 Nxd7 9 f4 c5 10 c3 Ne7 11 Nf3 h5 12 gxh5 Nf5`, 'nc3', '3...Bf5 4.Nc3 Qb6', '=',
    'Com 4...Qb6 as pretas pressionam b2 e d4; as brancas trocam o bispo, mas as pretas igualam.'],
  c47: [`${A3} Bf5 4 h4 h5 5 c4 e6 6 Nc3 dxc4 7 Bxc4 Nd7 8 Bg5 Be7 9 Qd2 Qa5 10 Nge2 O-O-O 11 Qe3 Bxg5 12 hxg5 Nb6`, 'outras', '3...Bf5 4.h4', '=',
    'Com 4.h4 as brancas ameaçam g4 e h5; as pretas respondem com 4...h5 e igualam.'],
  c48: [`${A3} c5 4 dxc5 Nc6 5 Bb5 e6 6 Be3 Ne7 7 c3 Nf5 8 Bd4 Bd7 9 Bxc6 Bxc6 10 Nf3 Nxd4 11 Qxd4 a5 12 b4 axb4`, 'outras', '3...c5', '⩲',
    'Com 3...c5 as pretas atacam o centro como na Francesa, mas perdem um tempo; as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 43
  ['c43', 'a', 'a', '(a)', '5 a3 h6 6 Be2 Ne7 7 O-O Nd7 8 Nbd2 Bh7 9 b4 a5 10 Nb3 axb4 11 axb4 Rxa1 12 Nxa1 Nc8', { a: '=', r: 'Hamdouchi–Karpov, Bordeaux 2005', c: 'Com 5.a3 as pretas igualam.' }],
  ['c43', 'b-A', 'b', '(b) A', '6... Bg6 7 Nbd2 Nf5 8 g4 Ne7 9 Nh4', { a: '⩲', r: 'Bologan–Dizdarević, Bósnia 2005', c: 'Com 6...Bg6 as brancas ficam um pouco melhor.' }],
  ['c43', 'b-B', 'b', '(b) B', '6... c5 7 c4 Nbc6 8 Na3 dxc4 9 Nxc4 Nd5 10 Bg5 Qd7 11 Rc1 h6 12 Be3', { a: '⩲', r: 'Bologan–Erenburg, Istambul 2003', c: 'Com 6...c5 também.' }],
  ['c43', 'c', 'c', '(c)', '7 c3 c5 8 dxc5 Nxc5 9 Nd4 a6 10 Bg5 Bg6 11 Na3 h6 12 Bh4 Qb6', { a: '=', r: 'Baklan–Iordachescu, Romênia 2006', c: 'Com 7.c3 as pretas igualam.' }],
  ['c43', 'd', 'd', '(d)', '7... Qb6 8 c3 c5 9 Nxf5 Nxf5 10 Bd3 g6 11 Re1 Nb8 12 Bxf5 gxf5 13 c4 dxc4 14 d5', { a: '±', r: 'Nunn–Adams, Bruxelas 1992', c: 'Com 7...Qb6 as brancas ganham o bispo e ficam melhor.' }],
  ['c43', 'e', 'e', '(e)', '9... Qb6 10 Nxg6 hxg6 11 Nf3 Nf5 12 c4 dxc4 13 d5 O-O-O 14 Bxc4', { a: '±', r: 'Z. Almasi–Bareev, Úbeda 1997', c: 'Com 9...Qb6 vem 12.c4!.' }],
  ['c43', 'f', 'f', '(f)', '13 Be3 Rc8 14 g3 Qb6 15 Rb1', { a: '⩲', r: 'Baklan–Burmakin, Neckar Open 2004', c: 'Ou 13.Be3, e as brancas ficam um pouco melhor.' }],
  // Coluna 44
  ['c44', 'g', 'g', '(g)', '5... Nd7 6 O-O h6 7 b3 Ne7 8 c4 Ng6 9 Na3 Be7 10 cxd5 cxd5 11 Nc2', { a: '⩲', r: 'Z. Almasi–Kallai, Hungria 1997', c: 'Com 5...Nd7 6.O-O h6 (o normal é 6...Ne7, transpondo para a coluna anterior) as brancas ficam um pouco melhor.' }],
  ['c44', 'h', 'h', '(h)', '6 Be3 cxd4 7 Nxd4 Ne7 8 c4 Nbc6 9 Qa4 a6 10 Nc3 dxc4 11 O-O-O Bd3 12 Bxd3 cxd3 13 Rxd3 Qa5', { a: '=', r: 'Inarkiev–Ivanchuk, Campeonato Europeu 2006', c: 'Com 6.Be3 as pretas igualam.' }],
  ['c44', 'i', 'i', '(i)', '7... cxd4 8 Nxd4 Nge7 9 Nxf5 Nxf5 10 Bd3 Be7 11 Re1 d4 12 a3 dxc3 13 Nxc3', { a: '⩲', r: 'Ivanchuk–Anand, Linares 1999', c: 'Com 7...cxd4 as brancas ficam um pouco melhor. Também 8.cxd4 dá chances de vantagem.' }],
  ['c44', 'j', 'j', '(j)', '10 h3 Bxf3 11 Nxf3 Nf5 12 Rb1 Qb6 13 Be3 Be7 14 b4 O-O 15 Bd3 Nxe3 16 fxe3 Rac8 17 Kh1 Qd8 18 Qe1 g6', { a: '=', r: 'Anand–Karpov, Reggio Emilia 1991', c: 'Com 10.h3: a sugestão de Seirawan, 18...g6, iguala as chances.' }],
  ['c44', 'k', 'k', '(k)', '13 Nxf3 O-O 14 Bb2 a6 15 Bd3', { a: '⩲', r: 'Short–Karpov, match 1992', c: 'As chances das brancas no flanco do rei valem só uma pequena vantagem.' }],
  // Coluna 45
  ['c45', 'l-A', 'l', '(l) A', '6... Ne7 7 Nf4 c5 8 dxc5 Nec6 9 h4 Qc7 10 h5 Qxe5+ 11 Nfe2 Be4', { a: '=', r: 'Grischuk–Dreev, Aeroflot Open 2002', c: 'Com 6...Ne7 as pretas igualam.' }],
  ['c45', 'l-B', 'l', '(l) B', '6... f6 7 h4 fxe5 8 h5 Bf7 9 dxe5 Nd7 10 f4 Qb6 11 Nd4 Bc5 12 Na4 Qa5+ 13 c3 Bxd4 14 Qxd4 c5 15 Qd1', { a: '±', r: 'Sax–Lauber, Hungria 1997', c: 'Com 6...f6 as brancas ficam melhor; 11...Bc5?! piora.' }],
  ['c45', 'm', 'm', '(m)', '7 Be3 Nc6 8 dxc5 Nxe5 9 Nd4 Nd7 10 b4 Be7 11 h4 h6 12 Bg2 Ne5 13 Bf4 Nc6', { a: '=', r: 'C. van Osterom–Peralta, Andorra 2004', c: 'Com 7.Be3 também fica igual.' }],
  ['c45', 'n', 'n', '(n)', '7... cxd4 8 Nxd4 h5 9 f4 hxg4 10 Bb5+ Nd7 11 f5 Rxh4 12 Rf1 Rh5 13 Qxg4 Rxf5 14 Nxf5 Bxf5', { a: '=', r: 'Živković–Lečić, Belgrado 2005', c: 'Com 7...cxd4 também fica igual.' }],
  ['c45', 'o', 'o', '(o)', '13 Nf4 Qa6 14 fxe6 Nb4 15 exf7 Ne7 16 a3 Nxc2', { a: '=', r: 'Prasad–Ravi, Índia 1991', c: 'Nesta posição selvagem as chances são mais ou menos iguais. As pretas ameaçam 17...Na1 e 18...Nb3 mate.' }],
  ['c45-o', '1', 'o', '(o) 17.Qf2', '17 Qf2 b5 18 Bg2 b4', { c: 'Uma variante razoável é 17.Qf2 b5 18.Bg2 b4!?.' }],
  ['c45-o-1', '1', 'o', '(o) 17...Na1', '17... Na1 18 Re1', { c: 'Se 17...Na1, 18.Re1.' }],
  // Coluna 46
  ['c46', 'p', 'p', '(p)', '5 Bd3 Bxd3 6 Qxd3 e6 7 Nge2 Qa6 8 Qh3 Nd7 9 O-O Ne7 10 a4 Rc8 11 Be3 Qb6 12 a5 Qd8 13 a6 b5', { a: '=', r: 'Nataf–Bagheri, Liga Francesa 2006', c: 'Com 5.Bd3 os bispos se trocam e fica igual.' }],
  ['c46', 'q', 'q', '(q)', '12 f5 hxg4 13 fxe6 gxf3 14 exd7+ Qxd7 15 Qxf3 cxd4 16 cxd4 Nc6', { a: '∓', r: 'Velimirović–Kasparov, Moscou 1982', c: '12.f5?! deixa as pretas melhor.' }],
  // Coluna 47
  ['c47', 'r', 'r', '(r)', '4 Bd3 Bxd3 5 Qxd3 e6 6 Nc3 Ne7 7 Nge2 Nd7 8 O-O a6 9 Nd1 c5 10 c3 Rc8 11 Ne3 h5 12 Bd2 g6', { a: '=', r: 'Hellers–Ivanchuk, Biel 1989', c: 'Com 4.Bd3 os bispos se trocam e fica igual.' }],
  ['c47', 's', 's', '(s)', '4... h6 5 g4 Bd7 6 h5 c5 7 c3 e6 8 f4 Qb6 9 Nf3', { a: '±', r: 'Tal–Pachman, Bled 1961', c: 'Com 4...h6 as brancas dominam o flanco do rei.' }],
  ['c47', 't', 't', '(t)', '6... Nd7 7 cxd5 cxd5 8 Qb3 Qb6 9 Bb5 Ne7 10 Na4 Qc7 11 Bd2 Nc6 12 Rc1 a6 13 Bxc6 bxc6 14 Nf3', { a: '=', r: 'Hjartarson–Khalifman, Tilburg 1994', c: 'Igualmente bom é 6...Nd7; a partida terminou empatada.' }],
  ['c47', 'u', 'u', '(u)', '13 Bb3 Ne7 14 O-O h4 15 Nf4 Rd7', { a: '=', r: 'Förster–Polák, Berna 1994', c: 'Ou 13.Bb3, igual.' }],
  // Coluna 48
  ['c48', 'v', 'v', '(v)', '4... e6 5 Be3 Nd7 6 Bb5 Qc7 7 Nf3 Bxc5 8 Bxc5 Qxc5 9 Nc3 Ne7 10 O-O O-O 11 Re1', { a: '⩲', r: 'Lutz–Campora, Biel 1996', c: 'Com 4...e6 as brancas ficam um pouco melhor.' }],
  ['c48', 'w', 'w', '(w)', '5 Nf3 Bg4 6 Bb5 Qa5+ 7 Nc3 e6 8 Be3 Ne7 9 Bd2 Qc7 10 Be2 a6', { a: '=', r: 'Spassky–Kotov, Moscou 1955', c: 'Com 5.Nf3 as pretas igualam.' }],
  ['c48', 'x', 'x', '(x)', '6 b4 a5 7 c3 Bd7 8 Bxc6 Bxc6 9 Nf3 axb4 10 cxb4 b6', { a: '=', r: 'San Segundo–Khenkin, Saragoça 1995', c: 'Com 6.b4 também fica igual.' }],
  ['c48', 'y', 'y', '(y)', '13 cxb4 b6 14 cxb6 Ra4 15 a3 Qa8 16 O-O Bxb4 17 axb4 Rxa1 18 Qc5', { a: '⩲', r: 'Areschenko–Khenkin, Bundesliga 2006', c: 'Depois de 13.cxb4 as brancas ficam um pouco melhor.' }],
]

const capitulo = {
  id: 'caro-kann-e',
  arquivo: 'caro-kann-e',
  nome: 'Caro-Kann — Variante do Avanço',
  fonte: 'Modern Chess Openings — Caro-Kann Defense (pp. 189–190), colunas 43–48',
  base: '1. e4 c6 2. d4 d5 3. e5',
  corPadrao: 'b',
  ordem: 189,
  grupos: [
    { id: 'nf3', nome: '3...Bf5 4.Nf3', colunas: [43, 44] },
    { id: 'nc3', nome: '3...Bf5 4.Nc3', colunas: [45, 46] },
    { id: 'outras', nome: '4.h4 e 3...c5', colunas: [47, 48] },
  ],
}

module.exports = { capitulo, colunas, notas }
