// Transcrição do MCO 15ª ed. — Gambito Letão (pp. 144–146).
// Gerar: node scripts/mco/gerar.cjs letao
// Formato: ver gambito-do-rei.cjs. Dicas em letao-dicas.cjs.

const LG = '1 e4 e5 2 Nf3 f5'

const colunas = {
  c01: [`${LG} 3 Bc4 fxe4 4 Nxe5 Qg5 5 d4 Qxg2 6 Qh5+ g6 7 Bf7+ Kd8 8 Bxg6 Qxh1+ 9 Ke2 c6 10 Nc3 Nf6`, 'bc4', '3.Bc4 fxe4 4.Nxe5 Qg5', '∞',
    'Gambito Letão: as pretas contra-atacam com 2...f5, em estilo bem tático. Com 3.Bc4 as brancas exploram a diagonal a2–g8; depois de 3...fxe4 4.Nxe5 Qg5 surge uma posição de arrepiar, analisada e jogada por Paul Keres.'],
  c02: [`${LG} 3 Bc4 fxe4 4 Nxe5 d5 5 Qh5+ g6 6 Nxg6 hxg6 7 Qxg6+ Kd7 8 Bxd5 Nf6 9 Nc3 Qe7 10 d3 exd3+`, 'bc4', '3.Bc4 fxe4 4.Nxe5 d5 (Variante Svedenborg)', '∓',
    'A Variante Svedenborg, 4...d5, é igualmente aguda e de duplo gume.'],
  c03: [`${LG} 3 exf5 e4 4 Ne5 Nf6 5 Be2 d6 6 Bh5+ Ke7 7 Nf7 Qe8 8 Nxh8 Qxh5 9 Qxh5 Nxh5 10 g4 Nf6`, 'outras', '3.exf5', '⩲',
    'Com 3.exf5, menos jogado, a posição também fica confusa.'],
  c04: [`${LG} 3 d4 fxe4 4 Nxe5 Nf6 5 Bg5 d6 6 Nc3 dxe5 7 dxe5 Qxd1+ 8 Rxd1 h6 9 Bxf6 gxf6 10 Nd5 Kd7`, 'outras', '3.d4', '⩱',
    'Com 3.d4, outra alternativa pouco jogada, o jogo fica embaralhado e vai para um final.'],
  c05: [`${LG} 3 Nxe5 Qf6 4 d4 d6 5 Nc4 fxe4 6 Nc3 Qg6 7 f3 exf3 8 Qxf3 Nc6 9 Bd3 Qg4 10 Qe3+ Be7`, 'nxe5', '3.Nxe5 Qf6 … 6.Nc3', '⩲',
    'O sensato 3.Nxe5 é o mais popular hoje, e as pretas costumam responder 3...Qf6. Com 6.Nc3 as brancas parecem garantir uma pequena vantagem.'],
  c06: [`${LG} 3 Nxe5 Qf6 4 d4 d6 5 Nc4 fxe4 6 Be2 Nc6 7 d5 Ne5 8 O-O Nxc4 9 Bxc4 Qg6 10 Bb5+ Kd8`, 'nxe5', '3.Nxe5 Qf6 … 6.Be2', '⩲',
    'Com 6.Be2 as brancas também ficam com uma pequena vantagem.'],
}

const notas = [
  ['c01', 'a', 'a', '(a)', '3... b5 4 Bxb5 fxe4 5 Nxe5 Qg5 6 d4 Qxg2 7 Rf1 Nf6', { a: '⩱', r: 'Strelis–Eglitis, correspondência 1977', c: '3...b5 merece atenção: prepara um abrigo para o rei preto numa linha crítica. As pretas ficaram pelo menos iguais. (O livro escreve 5...Qg4, casa a que a dama de d8 não chega; o lance é 5...Qg5.)' }],
  ['c01-a', '1', 'a', '(a) 4.Bb3', '4 Bb3 fxe4 5 d4 exd4 6 Nxd4 Nf6 7 Nxb5', { a: '⩲', r: 'Kosten', c: 'Com 4.Bb3 as brancas ficam um pouco melhor.' }],
  ['c01-a-1', '1', 'a', '(a) 5.Nc3', '5 Nc3', { c: 'O sacrifício de peça 5.Nc3 é arriscado, mas possível.' }],
  ['c01-a', '2', 'a', '(a) 4.Bxg8', '4 Bxg8 Rxg8', { a: '=', c: '4.Bxg8 acalma bastante o jogo; as chances ficam mais ou menos iguais.' }],
  ['c01', 'b', 'b', '(b)', '4... Nf6 5 Nf7 Qe7 6 Nxh8 d5 7 Be2 Nc6', { a: '∞', c: 'A 4...Nf6 de Blackburne é interessante: as pretas têm alguma compensação pelo material.' }],
  ['c01-b', '1', 'b', '(b) 7.Bxd5', '7 Bxd5 Bg4 8 f3 exf3+ 9 Kf2 Qc5+', { a: '∓', r: 'Woll–Amilibir, correspondência 1994', c: 'Com 7.Bxd5 as pretas ficam melhor.' }],
  ['c01-b', '2', 'b', '(b) 5.Bf7+', '5 Bf7+ Ke7 6 Bb3 d5', { a: '⩲', c: '5.Bf7+ provavelmente deixa as brancas um pouco melhor.' }],
  ['c01', 'c', 'c', '(c)', '7... Ke7 8 Bg5+ Nf6 9 Qh4 Qxh1+ 10 Kd2 e3+ 11 Ke2 Bg7 12 Nc3 Qg2 13 Ne4 Kf8 14 Bxf6 g5 15 Qh5 Qxe4 16 Bxg7+ Kxg7 17 Qxg5+', { a: '+-', r: 'Kozlov–Svendsen, correspondência 1991', c: 'Com 7...Ke7 as brancas vencem.' }],
  ['c01', 'd', 'd', '(d)', '9... Qxc1 10 Nf7+ Ke8', { a: '∞', r: 'Kosten', c: 'Com 9...Qxc1 tanto 11.Nxh8 como 11.Nd2 são promissores para as brancas, mas não totalmente claros. (O livro escreve 10...Ke7, que perde para 11.Qe5#; o rei vai para e8.)' }],
  ['c01-d', '1', 'd', '(d) 11.Nxh8+', '11 Nxh8+', { c: '11.Nxh8+.' }],
  ['c01-d', '2', 'd', '(d) 11.Nd2', '11 Nd2', { c: '11.Nd2.' }],
  ['c01', 'e-A', 'e', '(e) A', '11 Nf7+ Kc7 12 Qa5+ b6 13 Nb5+ cxb5 14 Bf4+ d6 15 Qc3+ Nc6 16 Rxh1 Rg8', { a: '=', c: 'Com 11.Nf7+ o jogo fica mais ou menos igual.' }],
  ['c01', 'e-B', 'e', '(e) B', '11 Bg5 Qxa1 12 Bxf6+ Kc7 13 Nf7 Bb4', { a: '⩱', r: 'Durant–Godfrey, Nova Jersey 2003', c: '11.Bg5?! é impreciso: a partida acabou empatada, mas aqui as pretas têm vantagem.' }],
  ['c02', 'f', 'f', '(f)', '6... Nf6 7 Qe5+ Be7 8 Bb5+ c6 9 Nxe7 Qxe7 10 Qxe7+ Kxe7 11 Be2 Rg8 12 g3', { a: '⩲', c: 'Com 6...Nf6 as brancas ficam um pouco melhor: as pretas não podem usar c6 para o cavalo.' }],
  ['c02-f', '1', 'f', '(f) 8.Nxh8', '8 Nxh8 dxc4 9 b3 Nc6 10 Qb5 Be6', { a: '∞', c: 'Com 8.Nxh8 as pretas têm compensação pelo material.' }],
  ['c02-f', '2', 'f', '(f) 8.Qxe7+', '8 Qxe7+ Qxe7 9 Nxe7 Kxe7 10 Be2 Rg8', { a: '⩱', r: 'Nymann–Kozlov, correspondência 1991', c: 'Com 8.Qxe7+ as pretas tiveram bom jogo.' }],
  ['c02', 'g', 'g', '(g)', '7 Qxh8 Kf7 8 Qd4 Be6 9 Be2 Nc6', { a: '∞', r: 'Zaqcco–Donato, Itália 2004', c: 'Com 7.Qxh8 as pretas têm jogo pelo material.' }],
  ['c02', 'h-A', 'h', '(h) A', '10 O-O Nc6 11 Bxe4 Ne5 12 Qg3 Rg8', { a: '∓', r: 'Drucke–Kranze, correspondência 1991', c: 'Com 10.O-O as pretas ficam melhor.' }],
  ['c02', 'h-B', 'h', '(h) B', '10 b3 c6 11 Bxe4 Rg8 12 Qf5+ Kd8 13 Qf3 Bg4 14 Qe3 Nbd7 15 d3 Qg7', { a: '⩱', r: 'Heap–Kranze, correspondência 1993', c: 'Com 10.b3 as pretas ficam pelo menos iguais.' }],
  ['c02', 'i', 'i', '(i)', '11 Be3 c6 12 Bb3 Bh6 13 O-O-O Bxe3+ 14 fxe3 b6 15 Rxd3+ Kc7', { a: '∓', r: 'Melchor–Elburg, correspondência 1989', c: 'As pretas ficam melhor.' }],
  ['c03', 'j-A', 'j', '(j) A', '4 Qe2 Qe7 5 Nd4 Nc6 6 Qh5+ Kd8 7 Nxc6+ dxc6', { a: '=', r: 'Psomiddis–Hector, Katerini 1992', c: 'Com 4.Qe2 o jogo fica igual.' }],
  ['c03', 'j-B', 'j', '(j) B', '4 Ng1 Nf6 5 g4 h5 6 g5 Ng4 7 d4 e3 8 Bxe3 Nxe3 9 Qe2 Qxg5', { a: '=', r: 'Magee–Budovskis, correspondência 1991', c: 'Com 4.Ng1 surge algo como um Gambito Allgaier invertido; o jogo fica igual.' }],
  ['c03-j-B', '1', 'j', '(j) 5.d3', '5 d3 Qe7', { a: '=', c: '5.d3 Qe7 também está bem para as pretas.' }],
  ['c03', 'j-C', 'j', '(j) C', '4 Nd4 Qf6 5 c3 Nc6 6 Nb5 Qe5 7 Qe2 Kd8', { a: '=', r: 'Downey–Kranz, correspondência 1992', c: 'Com 4.Nd4 o jogo fica igual.' }],
  ['c03', 'k', 'k', '(k)', '8 Nc3 g6 9 fxg6 hxg6 10 Nxh8 gxh5', { a: '=', r: 'Stummer–Schlenker, correspondência 1991', c: 'Com 8.Nc3 o jogo fica igual.' }],
  ['c03-k', '1', 'k', '(k) 9.Nxh8', '9 Nxh8', { c: 'Talvez 9.Nxh8 imediato seja melhor.' }],
  ['c03', 'l-A', 'l', '(l) A', '11 Nc3', { a: '⩲', r: 'Kosten', c: 'Com 11.Nc3 as brancas ficam um pouco melhor.' }],
  ['c03-l-A', '1', 'l', '(l) 11...Nxg4', '11... Nxg4 12 Nd5+', { a: '⩲', c: 'Depois de 11...Nxg4 12.Nd5+.' }],
  ['c03-l-A', '2', 'l', '(l) 11...c6', '11... c6 12 Rg1', { a: '⩲', c: 'Ou 11...c6 12.Rg1.' }],
  ['c03', 'l-B', 'l', '(l) B', '11 Rg1 Nc6 12 Rg3 Nd4 13 Kd1 g6', { a: '=', r: 'Elburg–Itcap, correspondência 1991', c: 'Com 11.Rg1 as pretas ficam bem.' }],
  ['c04', 'm', 'm', '(m)', '5 Bc4 d5 6 Bb3 Be6 7 Bg5 Be7', { a: '=', r: 'Estocolmo–Riga, correspondência 1934', c: 'Com 5.Bc4 o jogo fica igual.' }],
  ['c04', 'n', 'n', '(n)', '6 Nc4 Be7 7 Ne3 c6 8 Qd2 d5 9 c4 O-O 10 Be2 Be6', { a: '=', r: 'Kantinti–Mensina, Olimpíada de Istambul 2000', c: 'Com 6.Nc4 o jogo fica igual.' }],
  ['c04', 'o-A', 'o', '(o) A', '10... Kf7 11 Nxc7', { a: '⩲', c: '10...Kf7 é pior: as brancas ficam um pouco melhor.' }],
  ['c04', 'o-B', 'o', '(o) B', '11 Nb6+ Kc6 12 Nxa8 fxe5 13 Bc4 Bd6', { a: '⩱', r: 'Pietrusiak–Hector, Suécia 1984', c: 'Depois de 10...Kd7! as pretas ficam um pouco melhor.' }],
  ['c05', 'p', 'p', '(p)', '3... Nc6 4 Nxc6 dxc6 5 Nc3 Bc5 6 d3 Nf6', { a: '∞', r: 'Doncević–Hermann, Bundesliga 1988', c: '3...Nc6 é especulativo, mas interessante: as pretas têm algum jogo.' }],
  ['c05-p', '1', 'p', '(p) 4.Qh5+', '4 Qh5+ g6 5 Nxg6 Nf6 6 Qh3 hxg6 7 Qxh8 Qe7', { a: '∞', r: 'Jensen–Magee, correspondência 1991', c: 'Com 4.Qh5+ as pretas têm compensação.' }],
  ['c05', 'q', 'q', '(q)', '4 Nc4 fxe4 5 Nc3 Qf7 6 Ne3 c6 7 d3 exd3 8 Bxd3 d5', { a: '=', r: 'Diravieks–Downey, correspondência 1992', c: 'Com 4.Nc4 o jogo fica igual.' }],
  ['c05-q', '1', 'q', '(q) 7.Nxe4', '7 Nxe4 d5', { a: '=', c: '7.Nxe4 d5 está bem para as pretas.' }],
  ['c05', 'r', 'r', '(r)', '7 Bf4 Nf6 8 Qd2 Be7 9 O-O-O O-O 10 h3 Nbd7 11 Kb1 Nb6', { a: '=', r: 'Shabalov–Karklins, Denver 2003', c: 'Com 7.Bf4 o jogo fica igual.' }],
  ['c05', 's', 's', '(s)', '11 O-O Nf6 12 d5 Nb4 13 Rf4', { a: '⩲', r: 'Rublevsky–Maliutin, Rússia 1992', c: 'As brancas ficam um pouco melhor.' }],
  ['c05-s', '1', 's', '(s) 11...Qxd4', '11... Qxd4 12 Nb5 Qxe3+ 13 Nxe3 Kd8 14 Nd5', { a: '⩲', c: 'Com 11...Qxd4 também.' }],
  ['c06', 't', 't', '(t)', '6... Qd8 7 d5 Nf6 8 Nc3 Be7 9 Be3 O-O 10 Nd2 c5 11 Ndxe4 Qb6 12 Rb1', { a: '⩲', r: 'Kosten–Hector, Torcy 1988', c: 'Com 6...Qd8 as brancas ficam um pouco melhor.' }],
  ['c06', 'u', 'u', '(u)', '11 Bf4 h5 12 f3 Bf5 13 Nc3 exf3 14 Qxf3 Bxc2 15 Bg5+ Nf6 16 Rae1 c6 17 Bxf6+ Qxf6 18 Qe2 Qd4+ 19 Kh1 Bg6 20 Rxf8+', { a: '+-', r: 'Bronstein–Mikenas, Kostov 1941', c: '11...h5?! é ruim: as brancas venceram.' }],
  ['c06-u', '1', 'u', '(u) 16...Qxg5', '16... Qxg5 17 Qxf6+', { c: 'Se 16...Qxg5, 17.Qxf6+.' }],
  ['c06-u', '2', 'u', '(u) 11...Nf6', '11... Nf6 12 Nc3', { a: '⩲', c: '11...Nf6 é melhor, mas as brancas ficam melhor depois de 12.Nc3.' }],
]

const capitulo = {
  id: 'letao',
  arquivo: 'letao',
  nome: 'Gambito Letão',
  fonte: 'Modern Chess Openings — Latvian Gambit (pp. 144–146), colunas 1–6',
  base: '1. e4 e5 2. Nf3 f5',
  corPadrao: 'b',
  ordem: 144,
  grupos: [
    { id: 'bc4', nome: '3.Bc4', colunas: [1, 2] },
    { id: 'outras', nome: '3.exf5 e 3.d4', colunas: [3, 4] },
    { id: 'nxe5', nome: '3.Nxe5', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
