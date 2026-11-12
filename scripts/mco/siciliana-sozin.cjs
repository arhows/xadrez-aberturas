// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Sozin (pp. 333–335), colunas 31–36.
// Gerar: node scripts/mco/gerar.cjs siciliana-sozin
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-sozin-dicas.cjs.
//
// A tabela traz avaliação só no fim da coluna 32; nas outras a avaliação vem da nota que continua a coluna.
// Nota (l): o livro escreve "16 Nxe4 Bxe4", mas não há peça em e4; o cavalo vai a e4 (16.Ne4), como na sublinha 15.gxh4.
// Nota (s) A: o livro escreve "13 Nxd5! exd5", mas nessa linha as pretas não jogaram ...e6; quem captura é o peão c6 (13...cxd5).

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 d6 6 Bc4'

const colunas = {
  c31: [`${B} e6 7 Bb3 Be7 8 Be3 O-O 9 O-O a6 10 f4 Nxd4 11 Bxd4 b5 12 e5 dxe5 13 fxe5 Nd7`, 'e6', '7.Bb3 Be7 9.O-O a6', '=',
    'No Ataque Sozin o bispo vai para c4 e b3, mirando e6. Com o roque pequeno e 10.f4 as brancas preparam f5 ou e5. As pretas trocam em d4 e contra-atacam com ...b5; depois de 12.e5 dxe5 13.fxe5 Nd7 o jogo fica igual.'],
  c32: [`${B} e6 7 Bb3 Be7 8 Be3 O-O 9 O-O Bd7 10 f4 Rc8 11 Qf3 Qa5 12 Nde2 Rfd8 13 Kh1 Qa6`, 'e6', '9...Bd7', '=',
    'Com 9...Bd7 e 10...Rc8 as pretas jogam pela coluna c. A dama vai para a5 e a6, e o jogo fica igual.'],
  c33: [`${B} e6 7 Bb3 a6 8 Be3 Be7 9 f4 O-O 10 Qf3 Nxd4 11 Bxd4 b5 12 Bxf6 Bxf6 13 e5 Bh4+`, 'e6', '7...a6 9.f4 10.Qf3', '=',
    'Com 9.f4 e 10.Qf3 as brancas mantêm o rei no centro e apontam a dama para a8. As pretas respondem com 11...b5!; depois de 13.e5 Bh4+ o jogo fica igual.'],
  c34: [`${B} e6 7 Bb3 a6 8 Be3 Qc7 9 O-O Na5 10 f4 b5 11 f5 e5 12 Nde2 Bb7 13 Nd5 Nxd5`, 'e6', '8...Qc7', '=',
    'Com 8...Qc7 e 9...Na5 as pretas vão trocar o bispo de b3. Depois de 11.f5 e5 o centro se fecha, o cavalo branco vai para d5 e o jogo fica igual.'],
  c35: [`${B} Qb6 7 Ndb5 a6 8 Be3 Qa5 9 Nd4 Ne5 10 Nb3 Qc7 11 Bd3 e6 12 f4 Nc4 13 Bxc4 Qxc4`, 'qb6', '6...Qb6 7.Ndb5', '⩲',
    'Com 6...Qb6 as pretas atacam o cavalo de d4 e expulsam o bispo de c4. Com 7.Ndb5 a6 8.Be3 as brancas ganham tempo atacando a dama; as pretas trocam o bispo branco, mas as brancas ficam com uma pequena vantagem.'],
  c36: [`${B} Qb6 7 Nb3 e6 8 O-O Be7 9 Be3 Qc7 10 f4 O-O 11 Qe2 a6 12 a4 Nb4 13 Bd3 Bd7`, 'qb6', '7.Nb3', '=',
    'Com 7.Nb3 o cavalo recua e as brancas jogam como no Sozin normal. As pretas levam o cavalo para b4, e o jogo fica igual.'],
}

const notas = [
  // Coluna 31
  ['c31', 'a-A', 'a', '(a) A', '8 f4 Qa5 9 O-O d5 10 Nxc6 bxc6', { a: '=', r: 'Zaichik–Christiansen, Filadélfia 1990', c: '8.f4 Qa5 9.O-O d5! 10.Nxc6 bxc6 iguala logo.' }],
  ['c31', 'a-B', 'a', '(a) B', '8 O-O O-O 9 Be3', { c: '8.O-O O-O 9.Be3 é só uma inversão de lances.' }],
  ['c31', 'b-A', 'b', '(b) A', '9 Qe2 a6 10 O-O-O Qc7', { c: '9.Qe2 a6 10.O-O-O Qc7 é o Ataque Velimirović (colunas 25–27).' }],
  ['c31', 'b-B', 'b', '(b) B', '9 f4 a6 10 Qf3', { c: '9.f4 a6 10.Qf3 é a coluna 33.' }],
  ['c31-b-B', '1', 'b', '(b) B 9...Nxd4', '9... Nxd4 10 Bxd4 b5', { a: '=', c: 'Depois de 9.f4 as pretas também podem jogar 9...Nxd4 10.Bxd4 b5!, com igualdade.' }],
  ['c31-b-B-1', '1', 'b', '(b) B 10.Qxd4', '10 Qxd4 Ng4', { a: '∞', c: '10.Qxd4 Ng4 leva a um jogo com chances para os dois lados.' }],
  ['c31', 'c', 'c', '(c)', '10... Bd7 11 f5 Qc8 12 fxe6 Bxe6 13 Nxe6 fxe6 14 Na4', { a: '±', r: 'Fischer–Larsen, match 1971', c: '10...Bd7 11.f5! Qc8?! 12.fxe6 deixa as brancas melhor.' }],
  ['c31-c', '1', 'c', '(c) 11...Nxd4', '11... Nxd4', { a: '⩲', c: '11...Nxd4 dá uma pequena vantagem às brancas.' }],
  ['c31', 'd', 'd', '(d)', '12 a3 Bb7 13 Qd3 a5 14 e5 dxe5 15 fxe5 Nd7 16 Nxb5 Nc5 17 Bxc5 Bxc5+ 18 Kh1 Qg5', { a: '∞', r: 'Fischer–Spassky, Campeonato Mundial 1972', c: 'Com 12.a3 Bb7 13.Qd3 a5! as pretas sacrificam um peão e ganham uma iniciativa forte.' }],
  ['c31', 'e', 'e', '(e)', '14 Ne4 Bb7 15 Nd6 Bxd6 16 exd6 Qg5 17 Qe2 a5 18 a4 b4 19 Bc4 Rac8 20 Bb5 Bc6 21 c3 e5 22 Be3 Qg6', { a: '=', r: 'Friedel–Finegold, Campeonato dos EUA 2004', c: 'Com 14.Ne4 Bb7 15.Nd6 o jogo fica igual.' }],
  // Coluna 32
  ['c32', 'f-A', 'f', '(f) A', '9... Nxd4 10 Bxd4 b5 11 Nxb5 Ba6 12 a4 Nxe4 13 c4 Qd7 14 Bc2', { a: '±', r: 'Carstens–Marian, Alemanha 1984', c: '9...Nxd4 10.Bxd4 b5 11.Nxb5 deixa as brancas melhor.' }],
  ['c32', 'f-B', 'f', '(f) B', '9... Na5 10 f4 b6 11 e5 Ne8 12 Qg4', { a: '±', c: '9...Na5 10.f4 b6 11.e5 também deixa as brancas melhor.' }],
  ['c32', 'g', 'g', '(g)', '10 Qe2 Nxd4 11 Bxd4 Bc6 12 e5 dxe5 13 Bxe5 Nd7', { a: '=', r: 'Predescu–Charbonneau, Campeonato Canadense 2006', c: 'Com 10.Qe2 Nxd4 11.Bxd4 Bc6 o jogo fica igual.' }],
  ['c32-g', '1', 'g', '(g) 12.Rad1', '12 Rad1', { c: '12.Rad1 provavelmente é melhor que 12.e5.' }],
  ['c32', 'h', 'h', '(h)', '12 Rad1 Nxd4 13 Rxd4 Bc6 14 Qg3', { a: '⩲', c: 'O natural seria 12.Rad1 Nxd4 13.Rxd4 Bc6 14.Qg3, com alguma iniciativa. A coluna é Kindermann–Lobron, Munique 1991.' }],
  // Coluna 33
  ['c33', 'i-A', 'i', '(i) A', '10 O-O', { c: '10.O-O transpõe para a coluna 31.' }],
  ['c33', 'i-B', 'i', '(i) B', '10 Qe2 Nxd4 11 Bxd4 b5 12 O-O-O Bb7', { a: '=', c: '10.Qe2 Nxd4 11.Bxd4 b5 12.O-O-O Bb7 é igual.' }],
  ['c33-i-B', '1', 'i', '(i) B 10...Bd7', '10... Bd7 11 O-O-O Na5 12 g4', { a: '±', r: 'A. Ivanov–Ashley, Bermudas 1995', c: 'Mas não 10...Bd7?! 11.O-O-O Na5 12.g4, e as brancas ficam melhor.' }],
  ['c33', 'j', 'j', '(j)', '10... Qc7 11 O-O-O b5 12 e5 Nxd4 13 Qxa8 dxe5 14 fxe5 Nxb3+ 15 axb3 Bb7 16 Qa7 Ng4', { a: '∞', r: 'Yakovich–Ionov, São Petersburgo 1993', c: '10...Qc7 11.O-O-O b5 12.e5 leva ao sacrifício da qualidade; a sugestão de Ionov 15...Bb7 16.Qa7 Ng4 pode dar compensação suficiente.' }],
  ['c33-j', '1', 'j', '(j) 12.g4', '12 g4 Nxd4 13 Rxd4 b4', { c: '12.g4 Nxd4 13.Rxd4 b4! é bom para as pretas.' }],
  ['c33', 'k', 'k', '(k)', '12 e5 dxe5 13 fxe5 Qxd4 14 exf6 Bc5', { a: '∓', r: 'Kherlin–Shamkovich, URSS 1972', c: '12.e5?! dxe5 13.fxe5?! Qxd4 14.exf6 Bc5! deixa as pretas melhor.' }],
  ['c33-k', '1', 'k', '(k) 15.Qxa8', '15 Qxa8 Qf2+ 16 Kd1 Be3', { a: '−+', c: 'Se 15.Qxa8, então 15...Qf2+ 16.Kd1 Be3 ganha.' }],
  ['c33', 'l', 'l', '(l)', '14 g3 Rb8 15 O-O-O Bb7 16 Ne4 Bxe4 17 Qxe4 d5', { a: '=', r: 'Reinderman–van Wely, Leeuwarden 2002', c: 'Com 14.g3 Rb8 15.O-O-O Bb7 o jogo fica igual.' }],
  ['c33-l', '1', 'l', '(l) 15.gxh4', '15 gxh4 Bb7 16 Ne4 Qxh4+ 17 Qg3 Qxg3+ 18 Nxg3 Bxh1', { a: '∓', c: '15.gxh4 Bb7 16.Ne4 Qxh4+ deixa as pretas um pouco melhor.' }],
  // Coluna 34
  ['c34', 'm', 'm', '(m)', '8... Na5 9 f4 b5 10 e5 dxe5 11 fxe5 Nxb3 12 axb3 Nd5 13 Qf3 Bb7 14 O-O Qc7 15 Nxd5 Bxd5 16 Qf2', { a: '±', r: 'A. Sokolov–Timoshenko, Moscou 1990', c: '8...Na5 9.f4 b5 10.e5 deixa as brancas melhor.' }],
  ['c34-m', '1', 'm', '(m) 13...Nxe3', '13... Nxe3 14 Qxa8 Nxg2+ 15 Kf1', { a: '±', c: '13...Nxe3 14.Qxa8 Nxg2+ 15.Kf1! também deixa as brancas melhor.' }],
  ['c34-m', '2', 'm', '(m) 16...Qb7', '16... Qb7 17 Nxb5', { a: '+−', c: '16...Qb7? 17.Nxb5! ganha.' }],
  ['c34', 'n', 'n', '(n)', '9... Be7 10 f4 Nxd4 11 Bxd4 b5 12 a3 O-O 13 Qf3 Bb7 14 Rae1 Rac8 15 Qg3 Kh8 16 Kh1 Qc6 17 Rf3 a5 18 Qg5 b4 19 axb4 axb4 20 Nd1 h6 21 Rh3', { a: '±', r: 'Ljubojević–Anand, Buenos Aires 1994', c: '9...Be7 10.f4 leva a uma posição que surge de várias ordens de lances; as brancas ganham ataque.' }],
  ['c34', 'o', 'o', '(o)', '14 Bxd5 Nc4 15 Qc1 Bxd5 16 exd5 Rc8 17 Nc3 Nxe3', { a: '=', r: 'G. Ginsburg–Pelletier, Bundesliga 2003', c: 'Com 14.Bxd5 Nc4 15.Qc1 o jogo fica igual.' }],
  ['c34-o', '1', 'o', '(o) 15.Bc1', '15 Bc1', { c: '15.Bc1! é melhor que 15.Qc1.' }],
  // Coluna 35
  ['c35', 'p-A', 'p', '(p) A', '6... g6 7 Nxc6 bxc6 8 e5 Ng4 9 Bf4', { a: '±', c: '6...g6?! 7.Nxc6 bxc6 8.e5 Ng4 9.Bf4! deixa as brancas melhor (Sosonko).' }],
  ['c35-p-A', '1', 'p', '(p) A 8...dxe5', '8... dxe5 9 Bxf7+', { a: '+−', c: '8...dxe5? 9.Bxf7+ ganha a dama.' }],
  ['c35', 'p-B', 'p', '(p) B', '6... Bd7 7 O-O g6 8 Nxc6 Bxc6 9 Nd5 Bg7 10 Bg5 Bxd5 11 exd5', { a: '±', c: '6...Bd7 7.O-O g6 8.Nxc6 Bxc6 9.Nd5! deixa as brancas melhor.' }],
  ['c35', 'p-C', 'p', '(p) C', '6... e5 7 Nde2 Be6 8 Bb3 Be7 9 O-O O-O 10 Kh1 Na5 11 f4', { a: '⩲', r: 'Sax–Markland, Wijk aan Zee 1973', c: '6...e5 7.Nde2 Be6 8.Bb3 dá uma pequena vantagem às brancas.' }],
  ['c35', 'q', 'q', '(q)', '7... Bg4 8 f3 Bd7 9 Qe2 a6 10 Be3 Qa5 11 Nd4 b5 12 Bb3 e6 13 O-O-O b4 14 Nb1 Be7 15 g4 Nxd4 16 Rxd4 e5 17 Rdd1 Be6 18 Nd2 Bxb3 19 cxb3', { a: '±', r: 'Topalov–Kramnik, Dos Hermanas 1996', c: '7...Bg4 8.f3 Bd7 9.Qe2 deixa as brancas melhor.' }],
  ['c35', 'r', 'r', '(r)', '8... Qd8 9 Nd4 e6', { c: 'Depois de 8...Qd8 9.Nd4 e6 o jogo transpõe para a coluna 33 com 10.Bb3, ou para o Velimirović (coluna 30) com 10.Qe2.' }],
  ['c35', 's-A', 's', '(s) A', '9... Nxe4 10 Qf3 f5 11 Nxc6 bxc6 12 O-O-O d5 13 Nxd5 cxd5 14 Bxd5 Rb8 15 Bc6+ Kf7 16 Bxe4', { a: '+−', c: 'O peão e4 está envenenado: 9...Nxe4? 10.Qf3 f5 11.Nxc6 bxc6 12.O-O-O d5 13.Nxd5! ganha.' }],
  ['c35', 's-B', 's', '(s) B', '9... Ng4 10 Nxc6 bxc6 11 Bd2 g6 12 Qe2 Bg7 13 f4 O-O 14 O-O-O', { a: '⩲', r: 'de Firmian–Dranov, Nova York 1993', c: '9...Ng4 10.Nxc6 bxc6 11.Bd2 dá uma pequena vantagem às brancas.' }],
  ['c35', 's-C', 's', '(s) C', '9... e6 10 O-O Be7 11 Bb3 O-O 12 f4 Bd7 13 f5 Nxd4 14 Bxd4 exf5 15 exf5 Bc6 16 Qd3 Rae8 17 Rad1 Bd8 18 Kh1 Nd7 19 Qg3 Bf6 20 Bd5', { a: '±', r: 'de Firmian–Kramnik, Olimpíada de Yerevan 1996', c: 'A alternativa mais importante é 9...e6; depois de 13.f5 e 17...Bd8?! as brancas ficam melhor.' }],
  ['c35-s-C', '1', 's', '(s) C 17...Nd7', '17... Nd7', { a: '⩲', c: '17...Nd7 resiste mais, mas as brancas mantêm uma pequena vantagem.' }],
  ['c35', 't', 't', '(t)', '10 Bd3 Neg4 11 Bc1 g6 12 Nb3 Qb6 13 Qe2 Bg7 14 f4 Nh5', { a: '∞', r: 'Topalov–Kramnik, Belgrado 1995', c: 'Com 10.Bd3 Neg4 11.Bc1 g6 as pretas têm contrajogo depois de 14...Nh5!.' }],
  ['c35-t', '1', 't', '(t) 11.Bd2', '11 Bd2 Qb6', { c: '11.Bd2? Qb6 é bom para as pretas.' }],
  ['c35', 'u', 'u', '(u)', '14 Qd3 Qc7 15 a4 Be7 16 a5', { a: '⩲', r: 'Hector–Zhang Zhong, Wijk aan Zee 2003', c: 'Com 14.Qd3 Qc7 15.a4 as brancas ficam com uma pequena vantagem.' }],
  // Coluna 36
  ['c36', 'v-A', 'v', '(v) A', '7 Nxc6 bxc6 8 O-O g6 9 e5 dxe5 10 Qe2 Qd4 11 Be3 Qd6 12 Rad1 Qc7 13 f4 Bg4 14 Qf2 e4 15 Rde1 Bf5 16 h3 h5 17 Bd4 Bg7', { a: '=', r: 'Topalov–Kramnik, Novgorod 1997', c: '7.Nxc6 bxc6 8.O-O g6 9.e5!? leva a um jogo igual.' }],
  ['c36-v-A', '1', 'v', '(v) A 14...Bxd1', '14... Bxd1 15 fxe5 Qxe5 16 Bd4', { c: '14...Bxd1 15.fxe5 Qxe5 16.Bd4 dá ataque às brancas.' }],
  ['c36', 'v-B', 'v', '(v) B', '7 Nde2 e6 8 O-O Be7 9 Bb3 O-O 10 Bg5 Na5 11 Qd3 h6', { a: '=', r: 'Hector–J. Polgár, San Sebastián 1991', c: '7.Nde2 e6 8.O-O Be7 também leva à igualdade.' }],
  ['c36', 'w', 'w', '(w)', '8 Bg5 a6 9 O-O Be7 10 Bxf6 gxf6 11 a4 Na5 12 Nxa5 Qxa5', { a: '=', r: 'de Firmian–Smirin, Nova York 1995', c: 'Com 8.Bg5 a6 9.O-O Be7 10.Bxf6 gxf6 o jogo fica igual.' }],
  ['c36', 'x', 'x', '(x)', '14 a5 Nxd3 15 cxd3 Rac8 16 Bb6 Qb8', { a: '=', r: 'Bon–Rau, Campeonato da OTAN 2005', c: 'Com 14.a5 Nxd3 15.cxd3 Rac8 o jogo fica igual.' }],
]

const capitulo = {
  id: 'siciliana-sozin',
  arquivo: 'siciliana-sozin',
  nome: 'Siciliana — Variante Sozin',
  fonte: 'Modern Chess Openings — Sicilian Defense, Sozin Variation (pp. 333–335), colunas 31–36',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Bc4',
  corPadrao: 'b',
  ordem: 333,
  grupos: [
    { id: 'e6', nome: '6...e6 7.Bb3', colunas: [31, 32, 33, 34] },
    { id: 'qb6', nome: '6...Qb6', colunas: [35, 36] },
  ],
}

module.exports = { capitulo, colunas, notas }
