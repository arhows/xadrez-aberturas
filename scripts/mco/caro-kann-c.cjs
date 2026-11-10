// Transcrição do MCO 15ª ed. — Caro-Kann, 4...Nf6 5.Nxf6+ (pp. 183–184), colunas 25–30.
// Gerar: node scripts/mco/gerar.cjs caro-kann-c
// Formato: ver gambito-do-rei.cjs. Dicas em caro-kann-c-dicas.cjs.

const B5 = '1 e4 c6 2 d4 d5 3 Nc3 dxe4 4 Nxe4 Nf6 5 Nxf6+'

const colunas = {
  c25: [`${B5} gxf6 6 c3 Bf5 7 Nf3 Qc7 8 g3 Nd7 9 Bg2 O-O-O 10 O-O e6 11 Re1 Bg4 12 b4 h5`, 'gxf6', '5...gxf6 6.c3', '⩲',
    'Com 4...Nf6 as pretas aceitam peões dobrados depois de 5.Nxf6+. Com 5...gxf6 (Bronstein–Larsen) abrem a coluna g e jogam pelo ataque, mas a estrutura fica frágil.'],
  c26: [`${B5} gxf6 6 Nf3 Bg4 7 Be2 Qc7 8 O-O Nd7 9 Nh4 Bxe2 10 Qxe2 e6 11 c4 O-O-O 12 g3 Re8`, 'gxf6', '5...gxf6 6.Nf3', '⩲',
    'Com 6.Nf3 e 9.Nh4 as brancas trocam o bispo de g4 e ficam um pouco melhor.'],
  c27: [`${B5} gxf6 6 Ne2 h5 7 Qd3 Qa5+ 8 Bd2 Qf5 9 Qb3 Bh6 10 O-O-O Bxd2+ 11 Rxd2 Qxf2 12 Ng3 Qe1+`, 'gxf6', '5...gxf6 6.Ne2', '∞',
    'Com 6.Ne2 as brancas entregam um peão por iniciativa: posição pouco explorada e com chances para os dois lados.'],
  c28: [`${B5} exf6 6 c3 Bd6 7 Bd3 O-O 8 Qc2 Re8+ 9 Ne2 g6 10 h4 Be6 11 h5 f5 12 hxg6 fxg6`, 'exf6', '5...exf6 6.c3', '=',
    'Com 5...exf6 as pretas desenvolvem-se depressa e ficam com o rei seguro; em troca, a maioria de peões das brancas no flanco da dama vale um final melhor.'],
  c29: [`${B5} exf6 6 Bc4 Bd6 7 Ne2 O-O 8 O-O Qc7 9 Ng3 Re8 10 Qf3 Be6 11 Bb3 Nd7 12 Be3 Nb6`, 'exf6', '5...exf6 6.Bc4', '=',
    'Com 6.Bc4 as brancas desenvolvem-se rápido, mas as pretas igualam.'],
  c30: [`${B5} exf6 6 Nf3 Bd6 7 Be2 O-O 8 O-O Re8 9 Be3 Nd7 10 Qd2 Qc7 11 c4 Nf8 12 Rfe1 Bf5`, 'exf6', '5...exf6 6.Nf3', '=',
    'Com 6.Nf3 e 11.c4 as brancas ganham espaço, mas as pretas igualam.'],
}

const notas = [
  // Coluna 25
  ['c25', 'a', 'a', '(a)', '5 Ng3 g6 6 Nf3 Bg7 7 Be2 O-O 8 O-O Qb6 9 b3 a5', { a: '=', r: 'Sax–Larsen, Tilburg 1979', c: 'Sem a troca de cavalos (5.Ng3) as pretas igualam com o fianqueto.' }],
  ['c25', 'b', 'b', '(b)', '7 Ne2 Nd7 8 Ng3 Bg6 9 h4 h5 10 Be2 Qa5 11 b4 Qc7 12 Nxh5 e5 13 Ng3 O-O-O 14 h5 Bh7 15 Bg4 Kb8', { a: '∞', r: 'Cazelais–Spraggett, Quebec 1989', c: 'Com 7.Ne2 as pretas entregam um peão, mas têm compensação pela posição espalhada das brancas.' }],
  ['c25', 'c', 'c', '(c)', '7... e6 8 g3 Qd5 9 Bg2 Qc4 10 Nh4 Bd3 11 Be3 Nd7 12 Qd2 Qa6 13 Rd1 Bg6 14 b3', { a: '⩲', r: 'De Armas–Santa Torres, Sagua La Grande 1989', c: 'Com 7...e6 as brancas ficam um pouco melhor.' }],
  ['c25', 'd-A', 'd', '(d) A', '10... e5 11 Re1 Bg7 12 b4', { a: '⩲', r: 'Sohl–Henzelmann, Bad Zwesten 2006', c: 'Com 10...e5 as brancas ficam um pouco melhor.' }],
  ['c25', 'd-B', 'd', '(d) B', '10... Be4 11 Qe2 f5 12 Bf4 Qb6 13 Ng5', { a: '±', r: 'Caseres–Jiménez, Espanha 2006', c: 'Com 10...Be4 as brancas ficam melhor.' }],
  ['c25', 'e', 'e', '(e)', '13 Qa4 Bxf3 14 Bxf3 Kb8 15 Bf4 Bd6 16 Bxd6 Qxd6 17 Rad1 h4 18 c4', { a: '⩲', r: 'de Firmian–Conquest, Londres 1986', c: 'O ataque das brancas é o mais perigoso.' }],
  // Coluna 26
  ['c26', 'f', 'f', '(f)', '6... Bf5 7 g3', { a: '⩲', c: 'Com 6...Bf5, 7.g3 é provavelmente o melhor.' }],
  ['c26-f', '1', 'f', '(f) 7.Bd3', '7 Bd3 Bg6 8 Qe2 Qc7 9 Bd2 Nd7 10 O-O-O O-O-O', { a: '=', r: 'Kelly–Howard, 4NCL 2001', c: 'Com 7.Bd3 as pretas igualam.' }],
  ['c26', 'g', 'g', '(g)', '7... e6 8 h3 Bh5 9 O-O Qc7 10 c4 Nd7 11 Be3 O-O-O 12 Qa4 Kb8 13 b4', { a: '⩲', r: 'Wolski–Stummer, Bad Wörishofen 1990', c: 'Com 7...e6 as brancas ficam um pouco melhor.' }],
  ['c26-g', '1', 'g', '(g) 8.O-O', '8 O-O Qc7 9 h3 h5', { c: 'Ou 8.O-O Qc7 9.h3 h5!?.' }],
  ['c26', 'h', 'h', '(h)', '8 h3 Bh5 9 O-O Nd7 10 d5 Rd8 11 c4 Nb6 12 Be3 Bxf3 13 Bxb6 axb6 14 Bxf3', { a: '⩲', r: 'Smyslov–Pachman, Amsterdã 1964', c: 'Também 8.h3 é bom.' }],
  ['c26-h', '1', 'h', '(h) 8...Bxf3', '8... Bxf3 9 Bxf3', { a: '⩲', c: 'Se 8...Bxf3, 9.Bxf3 e as brancas ficam com o par de bispos.' }],
  ['c26', 'i', 'i', '(i)', '13 d5 Qe5 14 Qf3', { a: '⩲', r: 'McDonald–Schmedders, Hastings 2000', c: 'Com 13.d5 as brancas ficam um pouco melhor.' }],
  // Coluna 27
  ['c27', 'j', 'j', '(j)', '6 Bc4 Bf5 7 Ne2 h5 8 Be3 e6 9 Nf4 h4 10 Qe2 Nd7 11 O-O-O Be7 12 Bb3 Qc7 13 g4 Bh7 14 h3 O-O-O', { a: '=', r: 'Fries Nielsen–Jelling, Dinamarca 1988', c: 'Com 6.Bc4 as pretas igualam.' }],
  ['c27', 'k', 'k', '(k)', '6... Bf5 7 Ng3 Bg6 8 h4 h6 9 h5 Bh7 10 c3 e6 11 Be3 Nd7 12 Qd2 Qa5 13 Be2 O-O-O 14 Bxh6 Bxh6 15 Qxh6 e5', { a: '∞', r: 'Mecking–Larsen, San Antonio 1972', c: 'Com 6...Bf5 os dois lados têm chances nesta posição pouco conhecida.' }],
  ['c27', 'l', 'l', '(l)', '13 Rd1 Qa5 14 Bc4 e6 15 Rhe1 Kf8 16 Kb1 Na6 17 Qf3', { a: '∞', r: 'Vogt–Ermenkov, Estocolmo 1969', c: 'As brancas têm chances de ataque pelo peão.' }],
  // Coluna 28
  ['c28', 'm', 'm', '(m)', '6... Bf5 7 Ne2 Bd6 8 Ng3 Bg6 9 Bc4 O-O 10 O-O Re8 11 f4 b5 12 Bb3 Be4 13 Qh5 Qd7 14 Nxe4 Rxe4 15 Bc2 g6 16 Qh4 Re8 17 f5', { a: '+-', r: 'Nunn–Arkell, Londres 1987', c: 'Com 6...Bf5 e 10...Re8?! as brancas já estão ganhando.' }],
  ['c28-m', '1', 'm', '(m) 10...Bxg3', '10... Bxg3 11 hxg3', { a: '±', c: 'Ou 10...Bxg3 11.hxg3, e as brancas ficam melhor.' }],
  ['c28', 'n', 'n', '(n)', '8 Ne2 Re8 9 O-O Qc7 10 Ng3 Nd7 11 Nf5 Bxh2+ 12 Kh1 Bd6 13 Nxg7 Kxg7 14 Qg4+ Kh8 15 Bh6 Rg8 16 Qh4 Rg6 17 Rae1 Qd8 18 Bxg6 fxg6 19 Re6', { a: '±', r: 'Loeffler–Dichev, Cannes 2000', c: 'Uma boa alternativa é 8.Ne2, numa linha bem complicada.' }],
  ['c28-n', '1', 'n', '(n) 10...g6', '10... g6 11 Ne4', { c: 'Se 10...g6, 11.Ne4!.' }],
  ['c28', 'o-A', 'o', '(o) A', '9... h6 10 Be3 Nd7 11 h3 Nb6 12 c4 c5 13 O-O', { a: '±', r: 'Hort–Antonio, Olimpíada de Novi Sad 1990', c: '9...h6 é passivo.' }],
  ['c28', 'o-B', 'o', '(o) B', '9... Kh8 10 O-O Qc7 11 Ng3 g6 12 Ne4 Be7 13 g3 Be6 14 Bf4 Qd8 15 Rfe1', { a: '⩲', r: 'McDonald–Okrajek, Bad Wörishofen 1993', c: 'Com 9...Kh8!? as brancas ficam um pouco melhor.' }],
  ['c28', 'p', 'p', '(p)', '10... f5 11 h5 Qf6 12 hxg6 fxg6 13 Qb3+ Kh8 14 Bg5 Qg7 15 O-O-O', { a: '±', r: 'Sznapik–Plachetka, Bratislava 1983', c: 'Com 10...f5 as brancas têm boas chances de ataque.' }],
  ['c28-p', '1', 'p', '(p) 14...Qxg5?', '14... Qxg5 15 Qf7', { a: '+-', c: '14...Qxg5? perde depois de 15.Qf7.' }],
  ['c28', 'q', 'q', '(q)', '13 Bh6 Nd7 14 g4 Bd5 15 O-O-O Bxh1 16 Rxh1 Bf8 17 Bd2 Nb6 18 gxf5 Qd5 19 Ng3 Qxa2', { a: '=', r: 'Kudrin–King, Inglaterra 1988', c: 'Com 17...Nb6 as chances ficam quase iguais.' }],
  ['c28-q', '1', 'q', '(q) 17...fxg4?', '17... fxg4 18 Qb3+ Kg7 19 Rxh7+ Kxh7 20 Qf7+ Kh8 21 Nf4', { a: '+-', c: 'Na partida as pretas jogaram 17...fxg4? e abandonaram depois de 21.Nf4.' }],
  // Coluna 29
  ['c29', 'r-A', 'r', '(r) A', '6... Qe7+ 7 Qe2 Be6 8 Bb3 Na6 9 c3 Nc7 10 Bf4 Bxb3 11 axb3 Nd5 12 Bg3 a6', { a: '⩲', r: 'Keres–Smyslov, Amsterdã 1971', c: 'Com 6...Qe7+ as brancas ficam com uma vantagem mínima.' }],
  ['c29', 'r-B', 'r', '(r) B', '6... Qb6 7 c3 Be6', { c: '6...Qb6 7.c3 Be6 é interessante.' }],
  ['c29', 's', 's', '(s)', '7 Qe2+ Qe7 8 Qxe7+ Kxe7 9 Ne2 Be6 10 Bd3 Nd7', { a: '=', r: 'I. Gurevich–Dlugy, Nova York (blitz) 1993', c: 'Os peões dobrados em f6 pesam pouco aqui.' }],
  ['c29', 't', 't', '(t)', '8... Be6 9 Bxe6 fxe6 10 Bf4 Re8 11 c3 Bxf4 12 Nxf4 Qd7 13 Qg4', { a: '⩲', r: 'Post–Tartakower, Mannheim 1914', c: 'Com 8...Be6 o peão de f6 vira uma pequena fraqueza.' }],
  ['c29', 'u', 'u', '(u)', '13 Rad1 Nd5 14 Bc1 b5 15 Kh1 Re7 16 Ne4 Rae8', { a: '=', r: 'Milos–U. Rodríguez, Oviedo 1993', c: 'Ou 13.Rad1, igual.' }],
  // Coluna 30
  ['c30', 'v', 'v', '(v)', '6 g3 c5 7 Nf3 Bd6 8 Be3 Qc7 9 dxc5 Bxc5 10 Bxc5 Qxc5 11 Qe2+ Kf8 12 Bg2 g6 13 O-O Kg7', { a: '⩲', r: 'Tal–Lechtynsky, Tallinn 1979', c: 'Com 6.g3!? as brancas ficam com uma vantagem mínima.' }],
  ['c30', 'w-A', 'w', '(w) A', '6... Bg4 7 Be2 Bd6 8 h3 Bh5 9 Nh4 Bg6 10 Be3 f5 11 g3', { a: '⩲', r: 'Kupreichik–Hort, Alemanha 1995', c: 'Com 6...Bg4 as brancas ficam um pouco melhor.' }],
  ['c30', 'w-B', 'w', '(w) B', '6... Na6 7 Be2 Bd6 8 O-O Nc7 9 c4 O-O 10 Re1 Re8 11 h3 Bf5 12 Be3', { a: '⩲', r: 'Unzicker–Backwinkel, Alemanha 1983', c: 'Com 6...Na6 as brancas ficam com uma vantagem mínima.' }],
  ['c30', 'x', 'x', '(x)', '13 c5 Be7 14 d5 cxd5 15 Qxd5 Be6 16 Qh5 Red8 17 b4 a5 18 a3 f5', { a: '=', r: 'Larsen–C. Hansen, Naestved 1988', c: 'Com 13.c5 também fica igual.' }],
]

const capitulo = {
  id: 'caro-kann-c',
  arquivo: 'caro-kann-c',
  nome: 'Caro-Kann — 4...Nf6 5.Nxf6+',
  fonte: 'Modern Chess Openings — Caro-Kann Defense (pp. 183–184), colunas 25–30',
  base: '1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nf6 5. Nxf6+',
  corPadrao: 'b',
  ordem: 183,
  grupos: [
    { id: 'gxf6', nome: '5...gxf6', colunas: [25, 26, 27] },
    { id: 'exf6', nome: '5...exf6', colunas: [28, 29, 30] },
  ],
}

module.exports = { capitulo, colunas, notas }
