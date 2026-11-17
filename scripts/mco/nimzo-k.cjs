// Transcrição do MCO 15ª ed. — Defesa Nimzo-Índia, 4.Nf3, 4.Qb3 e 4.g3 (pp. 561–562), colunas 61–66.
// Gerar: node scripts/mco/gerar.cjs nimzo-k
// Formato: ver gambito-do-rei.cjs. Dicas em nimzo-k-dicas.cjs.
//
// Só a coluna 63 traz avaliação no fim (=); as outras usam a da nota que as continua.
// Avaliações tiradas do texto: (d) "chances iguais" ficou =; (g) "pelo menos chances iguais para as pretas" ficou =;
// (k) "o cavalo preto fica mal colocado em a5" ficou ⩲; (m) "vantagem muito pequena das brancas" ficou ⩲;
// (p) e (s) 12.Bxb7 "boa compensação/bom jogo pelo peão" ficaram =; (r) "recupera o peão com bom jogo" ficou =;
// (s) e (t) "mais ou menos igual"/"não conseguem vantagem" ficaram =; (v) "pequena vantagem das pretas" ficou ⩱.
// Notas só com comentário: (a) 5.e3 e 5.g3, (b) A, (g) 13...Bxg2, (u) 8...Be7, (v) A.
// Erratas:
//   (d) B: o livro dá 16.Be1, mas as brancas não têm bispo que chegue a e1; ficou 16.Re1 (a torre de a1).
//   (j): o livro dá "8 e3 ... 8...O-O 9 e3", com e3 duas vezes; a linha foi cortada em 8...O-O.
//   (q): o livro dá 13.Qe3 e depois 15.Qe3 de novo; a linha foi cortada em 14...d4.
//   (v): "Gausal" no livro; o adversário de Gulko é Gausel.

const F = '1 d4 Nf6 2 c4 e6 3 Nc3 Bb4'

const colunas = {
  c61: [`${F} 4 Nf3 b6 5 Bg5 h6 6 Bh4 Bb7 7 e3 g5 8 Bg3 Ne4 9 Qc2 Bxc3+ 10 bxc3 d6 11 Bd3 Nxg3`, 'nf3', '4.Nf3 b6 5.Bg5 h6 7.e3 g5', '=',
    'Com 4.Nf3 as brancas ficam flexíveis; a resposta mais comum é 4...b6. Depois de 5.Bg5 h6 6.Bh4 Bb7 7.e3 g5 8.Bg3 Ne4 9.Qc2 Bxc3+ 10.bxc3 d6 11.Bd3 Nxg3 as pretas tiram o par de bispos das brancas, e as chances são iguais.'],
  c62: [`${F} 4 Nf3 b6 5 Bg5 h6 6 Bh4 Bb7 7 e3 Bxc3+ 8 bxc3 d6 9 Nd2 g5 10 Bg3 Qe7 11 h4 Rg8`, 'nf3', '7...Bxc3+', '=',
    'Com 7...Bxc3+ 8.bxc3 d6 as pretas dobram os peões brancos logo. Depois de 9.Nd2 g5 10.Bg3 Qe7 11.h4 Rg8 as pretas ficam com pelo menos chances iguais.'],
  c63: [`${F} 4 Nf3 b6 5 Qb3 c5 6 Bg5 Bb7 7 a3 Ba5 8 O-O-O Bxc3 9 Qxc3 Ne4 10 Bxd8 Nxc3 11 bxc3 Kxd8`, 'nf3', '5.Qb3', '=',
    'Com 5.Qb3 a dama defende c3. Depois de 5...c5 6.Bg5 Bb7 7.a3 Ba5 8.O-O-O Bxc3 9.Qxc3 Ne4 10.Bxd8 Nxc3 11.bxc3 Kxd8 as damas saem e o jogo é igual. A coluna é Grétarsson–Hjartarson, Leeuwarden 1995.'],
  c64: [`${F} 4 Qb3 c5 5 dxc5 Nc6 6 Nf3 Ne4 7 Bd2 Nxd2 8 Nxd2 Bxc5 9 Nde4 Be7 10 O-O-O Qc7 11 e3 a6`, 'qb3', '4.Qb3', '=',
    'A Variante Spielmann, 4.Qb3, defende c3 mas tira a dama do jogo. Depois de 4...c5 5.dxc5 Nc6 6.Nf3 Ne4 7.Bd2 Nxd2 8.Nxd2 Bxc5 9.Nde4 Be7 10.O-O-O Qc7 11.e3 a6 as pretas igualam com facilidade.'],
  c65: [`${F} 4 g3 c5 5 Nf3 cxd4 6 Nxd4 O-O 7 Bg2 d5 8 cxd5 Nxd5 9 Bd2 Nxc3 10 bxc3 Be7 11 Rb1 Nd7`, 'g3', '4.g3 c5', '=',
    'Com 4.g3 as brancas jogam em estilo catalão. Depois de 4...c5 5.Nf3 cxd4 6.Nxd4 O-O 7.Bg2 d5 8.cxd5 Nxd5 9.Bd2 Nxc3 10.bxc3 Be7 11.Rb1 Nd7 as brancas têm pressão na coluna b, mas o jogo é mais ou menos igual.'],
  c66: [`${F} 4 g3 d5 5 Nf3 dxc4 6 Bg2 O-O 7 O-O Nc6 8 Re1 Nd5 9 Qc2 Be7 10 Ne4 Ndb4 11 Qc3`, 'g3', '4...d5', '⩱',
    'Com 4...d5 5.Nf3 dxc4 as pretas tomam o peão como na Catalã Aberta. Depois de 6.Bg2 O-O 7.O-O Nc6 8.Re1 Nd5 9.Qc2 Be7 10.Ne4 Ndb4! 11.Qc3 as pretas ficam com uma pequena vantagem.'],
}

const notas = [
  // Coluna 61
  ['c61', 'a', 'a', '(a)', '4... c5 5 d5 Ne4 6 Qc2 Qf6', { a: '=', r: 'Spassky–A. Sokolov, Clermont-Ferrand 1989', c: '4...c5 5.d5 Ne4 6.Qc2 Qf6 leva à igualdade.' }],
  ['c61-a', '1', 'a', '(a) 5.e3', '5 e3', { c: '5.e3 volta à Variante Rubinstein.' }],
  ['c61-a', '2', 'a', '(a) 5.g3', '5 g3', { c: '5.g3 é a coluna 65.' }],
  ['c61', 'b-A', 'b', '(b) A', '7 Nd2 Bxc3 8 bxc3 g5 9 Bg3 d6 10 e3 Qe7 11 h4 Rg8', { c: '7.Nd2 Bxc3 8.bxc3 g5 9.Bg3 d6 10.e3 Qe7 11.h4 Rg8 transpõe para a coluna seguinte.' }],
  ['c61', 'b-B', 'b', '(b) B', '7 Qc2 g5 8 Bg3 Ne4 9 Be5 f6 10 d5 exd5 11 cxd5 Bxc3+ 12 Bxc3 Bxd5 13 O-O-O Nxc3 14 Qxc3 Be6 15 h4 g4 16 Nd4 Qe7', { a: '=', c: '7.Qc2 g5 8.Bg3 Ne4 9.Be5 f6 10.d5 exd5 11.cxd5 Bxc3+ 12.Bxc3 Bxd5 13.O-O-O Nxc3 14.Qxc3 Be6 15.h4 g4 16.Nd4 Qe7 leva à igualdade.' }],
  ['c61', 'c', 'c', '(c)', '9 Nd2 Nxc3 10 bxc3 Bxc3 11 Rc1 Bb4 12 h4 gxh4 13 Rxh4 Be7', { a: '=', r: 'Gelfand–Vallejo Pons, Armênia–Resto do Mundo 2004', c: '9.Nd2 Nxc3 10.bxc3 Bxc3 11.Rc1 Bb4 12.h4 gxh4 13.Rxh4 Be7 é mais ou menos igual.' }],
  ['c61', 'd-A', 'd', '(d) A', '11... f5 12 d5 Nd7 13 Nd4 Ndc5 14 dxe6 Rf8 15 Be2 Qf6 16 Bh5+ Ke7 17 Bf7 Rxf7 18 exf7 Qxf7 19 O-O', { a: '⩲', r: 'Kamsky–Salov, Moscou 1992', c: '11...Nxg3 é melhor que 11...f5 12.d5 Nd7 13.Nd4 Ndc5 14.dxe6 Rf8 15.Be2 Qf6 16.Bh5+ Ke7 17.Bf7 Rxf7 18.exf7 Qxf7 19.O-O, um pouco melhor para as brancas.' }],
  ['c61', 'd-B', 'd', '(d) B', '12 fxg3 Nd7 13 O-O Qe7 14 Rf2 O-O-O 15 Be4 Rhf8 16 Re1 Bxe4 17 Qxe4 Kb8 18 Qh7 Rh8 19 Qc2 h5 20 e4 h4', { a: '=', r: 'Zvjagintsev–Timman, Biel 1995', c: 'Depois de 11...Nxg3 12.fxg3!? Nd7 13.O-O Qe7 14.Rf2 O-O-O 15.Be4 Rhf8! 16.Re1 Bxe4 17.Qxe4 Kb8 18.Qh7 Rh8 19.Qc2 h5 20.e4 h4 as chances são iguais.' }],
  ['c61', 'd-C', 'd', '(d) C', '12 hxg3 Nd7 13 a4 a5 14 Be4 Bxe4 15 Qxe4 Ke7', { a: '=', r: 'Bacrot–Berkes, Aberto do Aeroflot 2005', c: 'Também 12.hxg3 Nd7 13.a4 a5 14.Be4 Bxe4 15.Qxe4 Ke7 leva à igualdade.' }],
  // Coluna 62
  ['c62', 'e', 'e', '(e)', '9 Bd3 Nbd7 10 O-O g5 11 Bg3 Ne4 12 Nd2 Ndf6', { a: '=', r: 'Adianto–Panno, Buenos Aires 1997', c: '9.Bd3 Nbd7 10.O-O g5 11.Bg3 Ne4 12.Nd2 Ndf6 leva à igualdade.' }],
  ['c62', 'f', 'f', '(f)', '9... Nbd7 10 f3 Qe7 11 e4 e5 12 Qa4 O-O 13 Bd3 c5 14 O-O', { a: '⩲', r: 'Kamsky–Timman, Linares 1993', c: '9...Nbd7 10.f3 Qe7 11.e4 e5 12.Qa4 O-O 13.Bd3 c5 14.O-O é um pouco melhor para as brancas.' }],
  ['c62', 'g', 'g', '(g)', '12 hxg5 hxg5 13 Be2 Nc6 14 Qa4 Qd7 15 Rh6 Ne5 16 Qd1 Ng6 17 Bf3 Bxf3 18 Qxf3 Ke7', { a: '=', r: 'Piket–Lobron, Dortmund 1995', c: '12.hxg5 hxg5 13.Be2 Nc6! 14.Qa4 Qd7 15.Rh6 Ne5 16.Qd1 Ng6 17.Bf3 Bxf3 18.Qxf3 Ke7 deixa as pretas com pelo menos chances iguais.' }],
  ['c62-g', '1', 'g', '(g) 13...Bxg2', '13... Bxg2 14 Rh6', { c: '13...Bxg2 14.Rh6 dá jogo às brancas.' }],
  // Coluna 63
  ['c63', 'h', 'h', '(h)', '5 Qc2 Bb7 6 a3 Bxc3+ 7 Qxc3 Ne4', { a: '=', c: '5.Qc2 Bb7 6.a3 Bxc3+ 7.Qxc3 Ne4 é uma linha igual da Variante Clássica (4.Qc2).' }],
  ['c63', 'i', 'i', '(i)', '5... a5 6 g3 Bb7 7 Bg2 O-O 8 O-O Bxc3 9 Qxc3 d6 10 b3 Nbd7 11 Bb2 Ne4 12 Qe3', { a: '⩲', r: 'Dreev–Kiselev, Podolsk 1992', c: '5...a5 6.g3 Bb7 7.Bg2 O-O 8.O-O Bxc3 9.Qxc3 d6 10.b3 Nbd7 11.Bb2 Ne4 12.Qe3 é um pouco melhor para as brancas.' }],
  ['c63', 'j', 'j', '(j)', '6 a3 Ba5 7 Bf4 Bb7 8 e3 O-O', { a: '=', r: 'Portisch–Polugaevsky, Linares 1985', c: '6.a3 Ba5 7.Bf4 Bb7! 8.e3 O-O leva à igualdade. (O livro continua com "9 e3 cxd4 10 Nxd4 Ne4", mas e3 já foi jogado; a linha foi cortada.)' }],
  ['c63-j', '1', 'j', '(j) 8.dxc5', '8 dxc5 Ne4 9 cxb6 Qxb6 10 Qxb6 Bxc3+', { a: '∓', c: '8.dxc5 Ne4 9.cxb6 Qxb6 10.Qxb6 Bxc3+ é melhor para as pretas.' }],
  ['c63', 'k', 'k', '(k)', '6... Nc6 7 d5 Na5 8 Qc2 h6 9 Bh4 d6 10 e4 e5 11 Nd2', { a: '⩲', r: 'van Wely–Tiviakov, Groningen 1994', c: '6...Nc6?! 7.d5 Na5 8.Qc2 h6 9.Bh4 d6 10.e4 e5 11.Nd2 deixa o cavalo preto mal colocado em a5.' }],
  ['c63-k', '1', 'k', '(k) 9...Nxc4', '9... Nxc4 10 e4 Nxb2 11 Nd2', { a: '⩲', c: '9...Nxc4 10.e4 Nxb2 11.Nd2! é um pouco melhor para as brancas.' }],
  ['c63', 'l-A', 'l', '(l) A', '8 dxc5 Na6 9 cxb6 Nc5 10 Qc2 Be4 11 Qd1 Bxc3+ 12 bxc3 Qxb6', { a: '∓', r: 'van Wely–Seirawan, Wijk aan Zee 1995', c: '8.dxc5 Na6! 9.cxb6 Nc5 10.Qc2 Be4 11.Qd1 Bxc3+ 12.bxc3 Qxb6 é melhor para as pretas.' }],
  ['c63', 'l-B', 'l', '(l) B', '8 e3 cxd4 9 Nxd4 O-O 10 Qc2 Bxc3+ 11 Qxc3 d5 12 cxd5 Qxd5 13 Bxf6 Rc8 14 Qd2 gxf6 15 f3 Nc6', { a: '=', r: 'Seirawan–Adams, Bermudas 1999', c: '8.e3 cxd4! 9.Nxd4 O-O 10.Qc2 Bxc3+ 11.Qxc3 d5 12.cxd5 Qxd5 13.Bxf6 Rc8! 14.Qd2 gxf6 15.f3 Nc6 leva à igualdade.' }],
  // Coluna 64
  ['c64', 'm', 'm', '(m)', '4... Nc6 5 Nf3 d5 6 Bg5 h6 7 Bxf6 Qxf6 8 e3 dxc4 9 Bxc4 O-O 10 O-O Bd6 11 Bb5 Bd7 12 Rfd1', { a: '⩲', r: 'Akopian–Serper, Olimpíada de Manila 1992', c: '4...Nc6 5.Nf3 d5 6.Bg5 h6 7.Bxf6 Qxf6 8.e3 dxc4 9.Bxc4 O-O 10.O-O Bd6 11.Bb5 Bd7 12.Rfd1 dá às brancas uma vantagem muito pequena.' }],
  ['c64', 'n', 'n', '(n)', '7... Nxc5 8 Qc2 O-O 9 a3 Bxc3 10 Bxc3 a5 11 g3 f5 12 Bg2 Qc7 13 O-O a4', { a: '=', r: 'Euwe–Evans, Hastings 1949/50', c: 'Também é bom 7...Nxc5 8.Qc2 O-O 9.a3 Bxc3 10.Bxc3 a5 11.g3 f5 12.Bg2 Qc7 13.O-O a4, com igualdade.' }],
  ['c64', 'o', 'o', '(o)', '12 c5 O-O', { a: '=', r: 'Riedel–Palo, Salzburgo 2002', c: '12.c5 O-O leva à igualdade.' }],
  // Coluna 65
  ['c65', 'p', 'p', '(p)', '5... Ne4 6 Qd3 Qa5 7 Qxe4 Bxc3+ 8 Bd2 Bxd2+ 9 Nxd2 Nc6 10 d5 Nd4 11 Bg2 Nb3 12 Rd1 Qxa2 13 Qe5 O-O 14 Qc3', { a: '=', r: 'Romanishin', c: '5...Ne4 6.Qd3 Qa5 7.Qxe4 Bxc3+ 8.Bd2 Bxd2+ 9.Nxd2 Nc6 10.d5 Nd4 11.Bg2 Nb3 12.Rd1 Qxa2 13.Qe5 O-O 14.Qc3 dá às brancas boa compensação pelo peão.' }],
  ['c65', 'q', 'q', '(q)', '6... Ne4 7 Qd3 Qa5 8 Nb3 Nxc3 9 Bd2 Ne4 10 Qxe4 Bxd2+ 11 Nxd2 O-O 12 Bg2 Nc6 13 Qe3 d5 14 O-O d4', { a: '=', r: 'Piket–Tiviakov, Groningen 1998', c: '6...Ne4 7.Qd3 Qa5 8.Nb3 Nxc3! 9.Bd2 Ne4 10.Qxe4 Bxd2+ 11.Nxd2 O-O 12.Bg2 Nc6 13.Qe3 d5 14.O-O d4 leva à igualdade. (O livro continua com "15 Qe3 e5", mas a dama já está em e3; a linha foi cortada.)' }],
  ['c65', 'r', 'r', '(r)', '8 O-O dxc4 9 Qa4 Na6 10 Ndb5 Nd5 11 Rd1 Qe8 12 Nxd5 exd5 13 Bxd5 Bd7 14 Bxc4 Bc6', { a: '=', r: 'Moiseenko–Naiditsch, Espanha 2005', c: '8.O-O dxc4 9.Qa4 Na6 10.Ndb5 Nd5 11.Rd1 Qe8 12.Nxd5 exd5 13.Bxd5 Bd7 14.Bxc4 Bc6, e a cravada recupera o peão com bom jogo para as pretas.' }],
  ['c65', 's', 's', '(s)', '12 O-O Nb6 13 Bf4 Nd5 14 Qb3 Nxf4 15 gxf4 Bd6 16 e3 e5', { a: '=', r: 'Kasparov–Salov, Linares 1990', c: '12.O-O Nb6 13.Bf4 Nd5 14.Qb3 Nxf4 15.gxf4 foi a partida; agora 15...Bd6 16.e3 e5 é mais ou menos igual.' }],
  ['c65-s', '1', 's', '(s) 12.Bxb7', '12 Bxb7 Bxb7 13 Rxb7 Qc8 14 Rb1 Nb6', { a: '=', c: '12.Bxb7 Bxb7 13.Rxb7 Qc8! 14.Rb1 Nb6 dá às pretas bom jogo pelo peão.' }],
  // Coluna 66
  ['c66', 't', 't', '(t)', '5 cxd5 exd5', { a: '=', c: 'Depois de 5.cxd5 exd5 as brancas não se preocupam mais com o peão c, mas liberam o jogo das pretas e não conseguem vantagem.' }],
  ['c66', 'u', 'u', '(u)', '8 a3 Bxc3 9 bxc3 Rb8 10 Bg5 b5 11 e4 h6 12 Bh4 e5 13 Nxe5 Nxe5 14 dxe5 Qxd1 15 Rfxd1 Nd7 16 f4 Nxe5', { a: '=', r: 'Carlsen–Adams, Olimpíada de Turim 2006', c: '8.a3 Bxc3 9.bxc3 Rb8 10.Bg5 b5 11.e4 h6 12.Bh4! e5 13.Nxe5 Nxe5 14.dxe5 Qxd1 15.Rfxd1 Nd7 16.f4 foi a partida; agora 16...Nxe5 deve ser igual.' }],
  ['c66-u', '1', 'u', '(u) 8...Be7', '8... Be7', { c: '8...Be7! é mais seguro.' }],
  ['c66', 'v-A', 'v', '(v) A', '11 Qxc4 Qd5', { c: '11.Qxc4? Qd5! cria um problema para as brancas por causa do garfo de cavalo em c2.' }],
  ['c66', 'v-B', 'v', '(v) B', '11... b5 12 a3 Nd5 13 Qc2 Bb7 14 Bg5 Bxg5 15 Nexg5 Nf6', { a: '⩱', r: 'Gulko–Gausel, Reykjavik 1996', c: 'Depois de 11.Qc3 b5 12.a3 Nd5 13.Qc2 Bb7 14.Bg5 Bxg5 15.Nexg5 Nf6 as pretas ficam com uma pequena vantagem.' }],
]

const capitulo = {
  id: 'nimzo-k',
  arquivo: 'nimzo-k',
  nome: 'Nimzo-Índia — 4.Nf3, 4.Qb3 e 4.g3',
  fonte: 'Modern Chess Openings — Nimzo-Indian Defense (pp. 561–562), colunas 61–66',
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 561,
  grupos: [
    { id: 'nf3', nome: '4.Nf3', colunas: [61, 62, 63] },
    { id: 'qb3', nome: '4.Qb3', colunas: [64] },
    { id: 'g3', nome: '4.g3', colunas: [65, 66] },
  ],
}

module.exports = { capitulo, colunas, notas }
