// Transcrição do MCO 15ª ed. — Defesa Siciliana, Dragão Acelerado (pp. 284–286), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-acelerado-a
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-acelerado-a-dicas.cjs.
//
// A tabela não traz avaliação no fim das colunas; a avaliação vem da última nota.
// Nota (y): o livro escreve "16...Nxc2†"; com o rei branco em g1 o lance não dá xeque (Nxc2).

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4 g6 5 Nc3 Bg7 6 Be3 Nf6'

const colunas = {
  c01: [`${B} 7 Nxc6 bxc6 8 e5 Ng8 9 f4 Nh6 10 Qd2 O-O 11 O-O-O d6 12 h3 Nf5 13 Bf2 c5 14 Bc4 Bb7`, 'nxc6', '7.Nxc6 bxc6 8.e5 Ng8', '=',
    'No Dragão Acelerado as pretas fazem o fianqueto antes de ...d6, guardando a opção de ...d5 em um só lance. Com 7.Nxc6 e 8.e5 as brancas expulsam o cavalo; depois de 8...Ng8 e 9...Nh6 o cavalo volta por f5, e o jogo fica mais ou menos igual.'],
  c02: [`${B} 7 Nxc6 bxc6 8 e5 Nd5 9 Nxd5 cxd5 10 Qxd5 Rb8 11 Bxa7 Rxb2 12 Bd4 Rxc2 13 Bd3 e6 14 Qa8 Rc6`, 'nxc6', '8...Nd5', '=',
    'Com 8...Nd5 as pretas entregam um peão para abrir a coluna b. As brancas pegam o peão de d5, mas as pretas recuperam material na ala da dama e ficam iguais.'],
  c03: [`${B} 7 Bc4 Qa5 8 O-O O-O 9 Bb3 d6 10 h3 Bd7 11 f4 Qh5 12 Nf3 b5 13 a3 a5 14 Qd3 b4`, 'qa5', '7.Bc4 Qa5 9.Bb3 d6', '=',
    'Com 7.Bc4 as brancas miram f7. O lance 7...Qa5 obriga o roque pequeno, porque ameaça ...Nxe4. Depois de 11...Qh5 e do avanço ...b5–b4 fica igual.'],
  c04: [`${B} 7 Bc4 Qa5 8 O-O O-O 9 Nb3 Qc7 10 f4 d6 11 Be2 b6 12 g4 Bb7 13 g5 Nd7 14 Nd5 Qd8`, 'qa5', '9.Nb3 Qc7', '∓',
    'Com 9.Nb3 as brancas expulsam a dama e avançam com f4 e g4–g5. As pretas mantêm a posição sólida e, segundo Silman, ficam um pouco melhor.'],
  c05: [`${B} 7 Bc4 O-O 8 Bb3 a5 9 f3 d5 10 exd5 Nb4 11 Nde2 a4 12 Nxa4 Nfxd5 13 Bf2 Bf5 14 O-O b5`, 'roque', '7...O-O 8.Bb3 a5 9.f3 d5 10.exd5', '=',
    'Com 7...O-O 8.Bb3 a5 as pretas ameaçam ...a4 contra o bispo. Depois de 9.f3 d5! elas sacrificam um peão por jogo ativo e ficam iguais.'],
  c06: [`${B} 7 Bc4 O-O 8 Bb3 a5 9 f3 d5 10 Bxd5 Nxd5 11 exd5 Nb4 12 Nde2 Bf5 13 Rc1 b5 14 O-O Rc8`, 'roque', '10.Bxd5', '⩲',
    'Com 10.Bxd5 as brancas ficam com o peão de d5, mas as pretas ganham atividade nas casas brancas com ...Bf5 e ...b5. Com o lance certo as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '9 Bd4 Qa5 10 Bc4 Bxe5 11 O-O Nf6 12 Re1 d6 13 Bxe5 dxe5 14 Qe2 Bf5', { a: '=', r: 'Golubev–Fiodorov, Memorial Geller 2005', c: 'Com 9.Bd4 Qa5 fica igual.' }],
  ['c01', 'b-A', 'b', '(b) A', '10 Bc5 O-O 11 Ne4 d6 12 exd6 exd6 13 Bxd6 Bg4 14 Be2 Re8 15 Ng3 Qb6 16 c4 Rad8', { a: '−+', r: 'C. Marino–Donaldson, Filadélfia 1997', c: 'As brancas escolheram o plano errado com 10.Bc5?! e 11.Ne4?; depois de 11...d6! as pretas ganharam.' }],
  ['c01', 'b-B', 'b', '(b) B', '10 Bd3 O-O 11 O-O d6 12 Be4 Ng4', { a: '∓', r: 'Hungaski–Wojtkiewicz, Los Angeles 2003', c: 'Com 10.Bd3 e 12.Be4?! Ng4 as pretas ficam um pouco melhor.' }],
  ['c01', 'c', 'c', '(c)', '11... Qa5 12 h3 Nf5 13 Bf2 d6 14 g4 dxe5 15 gxf5 Bxf5', { c: '11...Qa5?! 12.h3 Nf5 13.Bf2 d6 14.g4 deixa as pretas com pouca compensação pela peça.' }],
  ['c01', 'd', 'd', '(d)', '12 exd6 exd6 13 Qxd6 Qxd6 14 Rxd6 Nf5 15 Rd3 Ba6 16 Bc5 Bxd3 17 Bxf8 Bxf1 18 Bxg7 Bxg2 19 Rg1 Kxg7 20 Rxg2 Rb8', { a: '∓', r: 'Fritz 2–Kasparov, Alemanha 1993', c: 'Com 12.exd6 exd6 13.Qxd6 as damas se trocam, e as pretas ficam um pouco melhor.' }],
  ['c01-d', '1', 'd', '(d) 13.Bd4', '13 Bd4 Bxd4 14 Qxd4 Nf5 15 Qd2 d5', { a: '=', c: '13.Bd4 Bxd4 14.Qxd4 Nf5 15.Qd2 d5 é igual.' }],
  ['c01', 'e', 'e', '(e)', '14 g4 Nd4 15 Bg2 Rb8 16 Bxd4 cxd4 17 Qxd4 Qa5 18 Rhe1 Be6', { a: '∓', r: 'Dückstein–Waller, Áustria 1969', c: '14.g4?! Nd4 é bom para as pretas: a ameaça de ...Rb4 seguida de ...Rfb8 dá um ataque muito forte.' }],
  ['c01', 'f', 'f', '(f)', '15 Bd5 Bxd5 16 Nxd5 e6 17 Nf6+ Bxf6 18 exf6 Qxf6 19 g4 Nd4 20 Bxd4 cxd4 21 Qxd4 Qxd4 22 Rxd4 d5', { a: '=', c: 'Com 15.Bd5 Bxd5 16.Nxd5 e6 chega-se a um final mais ou menos igual.' }],
  ['c01-f', '1', 'f', '(f) 16.Qxd5', '16 Qxd5 Rb8 17 g4 Nd4 18 Bxd4 cxd4 19 Rxd4 dxe5 20 fxe5 Qb6', { a: '∓', r: 'Faulks–Donaldson, Bermudas 1995', c: '16.Qxd5? Rb8 deixa as pretas um pouco melhor.' }],
  // Coluna 2
  ['c02', 'g-A', 'g', '(g) A', '11 O-O-O Bb7 12 Qd4 O-O 13 f4 d6 14 Bc4 Qc7 15 Bb3 dxe5 16 fxe5 Bxg2', { a: '=', r: 'Stein–Nei, URSS 1960', c: 'Com 11.O-O-O Bb7 12.Qd4 fica igual.' }],
  ['c02-g-A', '1', 'g', '(g) A 12.Qd2', '12 Qd2 Bxe5 13 Bd4 Bxd4 14 Qxd4 O-O 15 Qxd7 Qa5 16 Bc4 Bxg2 17 Rhg1 Bf3 18 Rd3 Be4 19 Rc3 Qb6 20 b3 Qf6 21 Rgg3 Rfd8 22 Qxa7 Ra8 23 Qc7 Bxc2', { a: '∓', r: 'Radulov–Forintos, Hungria 1969', c: '12.Qd2?! Bxe5 deixa as pretas um pouco melhor.' }],
  ['c02', 'g-B', 'g', '(g) B', '11 Bc4 O-O 12 O-O-O d6 13 Bxa7 Be6 14 Qd3 Bxc4 15 Qxc4 Rc8 16 Qb3 Bxe5', { a: '=', r: 'Aschenbrenner–Krebs, Bundesliga 2006', c: 'Com 11.Bc4 O-O 12.O-O-O d6 fica igual.' }],
  ['c02-g-B', '1', 'g', '(g) B 12.f4', '12 f4 d6 13 Bb3 Bb7 14 Qd2 dxe5 15 O-O-O exf4', { a: '=', c: '12.f4 d6 também é igual.' }],
  ['c02-g-B', '2', 'g', '(g) B 12.O-O', '12 O-O Qc7 13 Bf4 Bb7 14 Qd4 d6 15 Rfe1 Rfd8 16 Qc3 Rbc8 17 Bb3 Qxc3 18 bxc3 dxe5 19 Bxe5 e6 20 Bxg7 Kxg7 21 Re3 Rc7', { a: '=', c: '12.O-O Qc7 também é igual.' }],
  ['c02', 'h', 'h', '(h)', '12... Rb8 13 Bc4 O-O 14 O-O Bb7 15 Qc5 d6 16 exd6 exd6 17 Qa7 Bxg2 18 Kxg2 Ra8 19 Qb6 Qd7', { a: '=', c: 'Com 12...Rb8 e 17...Bxg2! as pretas ameaçam ...Rfb8, e as brancas precisam permitir ...Qg4+ com xeque perpétuo.' }],
  ['c02', 'i', 'i', '(i)', '13... Rc6 14 O-O Ba6 15 Rfd1 e6 16 Qb3 Bxd3 17 Rxd3 O-O 18 Rad1 Qc7', { a: '=', r: 'Durão–Frois, Campo Grande 2001', c: '13...Rc6 também é igual.' }],
  ['c02', 'j-A', 'j', '(j) A', '15 Bb5 Ra6 16 Bxa6 Qa5+ 17 Kf1 O-O 18 Qa7 Bxa6+ 19 Kg1', { a: '=', r: 'Rachels–Petursson, Interzonal de Manila 1990', c: 'As brancas têm duas escolhas. Com 15.Bb5 Ra6 16.Bxa6 Qa5+ 17.Kf1 fica igual.' }],
  ['c02-j-A', '1', 'j', '(j) A 17.Ke2', '17 Ke2 O-O 18 Bb7 Qb5+ 19 Ke3 Bxb7', { r: 'Barcza–Pokojowczyk, Subotica 1981', c: '17.Ke2? O-O 18.Bb7 Qb5+ 19.Ke3 Bxb7 é ruim para as brancas.' }],
  ['c02', 'j-B', 'j', '(j) B', '15 O-O O-O 16 Bb5 Ba6 17 Qxd8 Rxd8 18 Bxc6 Bxf1 19 Kxf1 dxc6 20 Bc3 Rd3 21 Rc1 Rd5 22 Re1 Rc5 23 Re3 Rc4 24 Bb2 h5', { a: '=', r: 'Kupreichik–Petursson, Reykjavík 1980', c: 'Com 15.O-O O-O 16.Bb5 as peças se trocam e o final fica igual.' }],
  // Coluna 3
  ['c03', 'k-A', 'k', '(k) A', '8 Qd2 Nxe4 9 Nxc6 Qxc3', { a: '−+', c: '7...Qa5 obriga as brancas a rocar pequeno: 8.Qd2? Nxe4! 9.Nxc6 Qxc3 ganha.' }],
  ['c03', 'k-B', 'k', '(k) B', '8 Nb3 Qb4 9 Bd3 Nxe4', { c: 'Também 8.Nb3 Qb4 9.Bd3 Nxe4 ganha um peão.' }],
  ['c03', 'l', 'l', '(l)', '9 h3 Qb4 10 Bb3 Nxe4 11 Nd5 Qa5 12 Nxc6 dxc6 13 Nxe7+ Kh8 14 Re1 Nc5 15 Qd6 Nxb3 16 axb3 Qd8 17 Qxd8 Rxd8 18 Bb6', { a: '⩲', r: 'Hector–Andersson, Haninge 1990', c: 'Com 9.h3!? Qb4 10.Bb3 Nxe4 11.Nd5 as brancas ficam um pouco melhor no final.' }],
  ['c03-l', '1', 'l', '(l) 9...d6', '9... d6', { c: '9...d6 é mais seguro.' }],
  ['c03', 'm', 'm', '(m)', '11 Re1 Rac8 12 Nf3 Qh5 13 Qe2 h6 14 Rad1 g5 15 Nd5 b6 16 c3 Nxd5 17 Bxd5 Ne5', { a: '=', r: 'Wang Hao–Malakhov, Rússia 2005', c: 'Com 11.Re1 fica igual.' }],
  ['c03', 'n', 'n', '(n)', '11... Nxd4 12 Bxd4 Bc6 13 Qd3 Rad8 14 Rad1 Nd7 15 Bxg7 Kxg7 16 Kh1 Nc5 17 Qd4+ e5 18 Qe3 Nxb3 19 axb3 exf4 20 Rxf4 Qe5', { a: '=', c: 'Com 11...Nxd4 12.Bxd4 Bc6 13.Qd3 Rad8, planejando ...e5 e ...d5, fica igual.' }],
  ['c03-n', '1', 'n', '(n) 13.Nd5', '13 Nd5 Rfe8 14 Bxf6 exf6 15 f5 Rxe4 16 fxg6 hxg6 17 Nxf6+ Bxf6 18 Rxf6 Qc5+ 19 Kh1 d5 20 Qf3 Qe7', { a: '=', r: 'Hector–Donaldson, Malmö 1986', c: '13.Nd5 Rfe8 também leva a igualdade.' }],
  ['c03', 'o', 'o', '(o)', '12 Qd3 a5 13 Rae1 b5 14 a3 b4 15 Nxc6 Bxc6 16 axb4 axb4 17 Nd5 Nxd5 18 exd5 Ba4', { a: '∓', c: 'Com 12.Qd3 a5 e 18...Ba4! as pretas ficam um pouco melhor.' }],
  ['c03', 'p-A', 'p', '(p) A', '14... a4 15 Bd5 Nxd5 16 exd5', { a: '±', r: 'J. Polgar–Kamsky, Buenos Aires 1994', c: 'Pior é 14...a4 15.Bd5! Nxd5 16.exd5, com vantagem das brancas.' }],
  ['c03', 'p-B', 'p', '(p) B', '15 axb4 axb4 16 Rxa8 Rxa8 17 Ne2 Qa5', { a: '=', r: 'Hector–Minzer, La Coruña 1995', c: 'Depois de 14...b4! 15.axb4 axb4 16.Rxa8 Rxa8 17.Ne2 Qa5 fica igual.' }],
  ['c03', 'p-C', 'p', '(p) C', '15 Ne2 bxa3 16 Ng3 axb2 17 Nxh5 bxa1=Q 18 Rxa1 Nxh5', { a: '=', c: 'Crítico e complicado é 15.Ne2 bxa3!; depois de 16.Ng3 axb2 17.Nxh5 bxa1=Q 18.Rxa1 Nxh5 fica mais ou menos igual.' }],
  // Coluna 4
  ['c04', 'q', 'q', '(q)', '11... Rd8 12 Bf3 e5 13 Rf2 Be6 14 Nd5 Bxd5 15 exd5 exf4 16 Bxf4 Ne5 17 Rc1 Nfd7 18 c4 Nc5 19 Nxc5 Qxc5', { a: '=', r: 'Prandstetter–Znamenáček, Praga 1992', c: 'Com 11...Rd8 e 12...e5 fica igual.' }],
  ['c04', 'r', 'r', '(r)', '12 Bf3 Bb7 13 Rf2 Na5 14 Nxa5 bxa5 15 Bd4 Nd7 16 Nd5 Bxd5 17 exd5 Bxd4 18 Qxd4 Qc5 19 Rd1 Rfb8 20 c3 Rb7', { a: '∓', r: 'Hammie–Silman, EUA 1975', c: 'Com 12.Bf3 Bb7 13.Rf2 Na5! as pretas ficam um pouco melhor.' }],
  ['c04', 's', 's', '(s)', '15 Rb1 e6 16 Nc3 Bxc3 17 bxc3 Ne7', { a: '∓', r: 'Silman', c: 'Com 15.Rb1 e6! 16.Nc3 Bxc3 17.bxc3 Ne7! as pretas ficam um pouco melhor.' }],
  ['c04-s', '1', 's', '(s) 15.Nd4', '15 Nd4 e6 16 Nc3 Nxd4 17 Bxd4 e5 18 Be3 exf4 19 Bxf4 Bxc3 20 bxc3 Nc5', { a: '∓', r: 'Saveride–Silman, EUA 1974', c: '15.Nd4?! e6! também deixa as pretas um pouco melhor.' }],
  // Coluna 5
  ['c05', 't', 't', '(t)', '9 a4 Ng4 10 Qxg4 Nxd4 11 Qh4 Nxb3 12 cxb3 Ra6 13 O-O Re6 14 Rad1 b6 15 Bh6 Bxh6 16 Qxh6 Bb7', { a: '=', r: 'J. Shahade–Wojtkiewicz, Nova York (rápidas) 2004', c: 'A alternativa importante é 9.a4 Ng4 10.Qxg4 Nxd4; fica igual.' }],
  ['c05-t', '1', 't', '(t) 10.Nxc6', '10 Nxc6 Nxe3 11 Nxd8 Nxd1 12 Nd5 e6 13 Nc7 Rb8 14 Rxd1 Rxd8 15 Nb5 b6 16 f4 Ba6 17 e5 Bxb5 18 axb5 Bf8', { a: '=', c: '10.Nxc6 Nxe3 11.Nxd8 Nxd1 também leva a igualdade.' }],
  ['c05', 'u', 'u', '(u)', '13 Bd4 Bxd4 14 Qxd4 Bf5 15 Nac3 Nxc2+ 16 Bxc2 Nxc3 17 Qxd8 Rfxd8 18 Bxf5 Nxe2 19 Kxe2 gxf5 20 Rhe1 e5', { a: '=', r: 'Petrushin–Khasin, URSS 1976', c: 'Com 13.Bd4 as peças se trocam e fica igual.' }],
  ['c05', 'v', 'v', '(v)', '15 Nac3 Nxc3 16 Nxc3 Qxd1 17 Rfxd1 Bxc2 18 Bxc2 Nxc2 19 Rac1 Bxc3 20 Rxc2 Bf6 21 b3 h5', { a: '=', r: 'Kuzmin–Tukmakov, Kishinev 1975', c: 'Depois de 15.Nac3 as peças se trocam e o final fica igual.' }],
  // Coluna 6
  ['c06', 'w', 'w', '(w)', '11 Nxd5 f5 12 Nxc6 bxc6 13 Nb6 Rb8 14 Qxd8 Rxd8 15 Rd1 Rxd1+ 16 Kxd1 fxe4 17 fxe4 Bxb2 18 Nxc8 Rxc8 19 Ke2 Be5 20 Rb1 Bxh2 21 a4 Bc7 22 Rb7 Kf7', { a: '=', r: 'Ivanchuk–Zsu. Polgár, Mônaco 1994', c: 'Com 11.Nxd5 f5 12.Nxc6 bxc6 o final fica igual.' }],
  ['c06-w', '1', 'w', '(w) 12.c3', '12 c3 fxe4 13 fxe4 e6 14 Nf4 Nxd4 15 cxd4 Bxd4 16 Qxd4 Qxd4 17 Bxd4 Rxf4 18 O-O-O Bd7', { a: '=', c: '12.c3 fxe4 13.fxe4 e6!? também é igual.' }],
  ['c06', 'x', 'x', '(x)', '14 a3 Nxc2+ 15 Rxc2 Bxc2 16 Qxc2 b4 17 Na4 Qxd5 18 Nb6 Qe6 19 Kf2 Rab8 20 Nf4 Qa2 21 axb4 axb4 22 Qb1 b3 23 Qxa2 bxa2 24 Ra1 Rb7 25 Rxa2 Rfb8 26 Nc4 Rb4', { a: '=', r: 'Lanka–Priedniek, URSS 1980', c: 'Crítico é 14.a3: as brancas ficam com duas peças pela torre, mas as pretas ganham contrajogo ativo. Depois de 24.Ra1 Rb7 o final fica igual.' }],
  ['c06-x', '1', 'x', '(x) 19.Nxa8', '19 Nxa8 Qxe3 20 Nc7 Rc8 21 Nd5 Rxc2 22 Nxe3 Rxb2 23 axb4 Rb1+ 24 Nd1 a4 25 O-O a3 26 Ndc3 Rxb4 27 Rd1 h5 28 Rd8+ Kh7 29 Ra8 Rb3 30 Rc8 Rb2 31 Ra8', { a: '=', r: 'Bagirov', c: '19.Nxa8 Qxe3 também leva a igualdade.' }],
  ['c06', 'y', 'y', '(y)', '15 Nd4 Bxd4 16 Qxd4 Nxc2 17 Rxc2 Bxc2 18 Nxb5 Re8 19 Na7 Ra8 20 Nc6', { a: '⩲', r: 'Hector–Dvoirys, Skellefteå 2001', c: 'Com 15.Nd4 as brancas ficam um pouco melhor.' }],
]

const capitulo = {
  id: 'siciliana-acelerado-a',
  arquivo: 'siciliana-acelerado-a',
  nome: 'Siciliana Dragão Acelerado — 6.Be3 Nf6',
  fonte: 'Modern Chess Openings — Sicilian Defense, Accelerated Dragon (pp. 284–286), colunas 1–6',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nc3 Bg7 6. Be3 Nf6',
  corPadrao: 'b',
  ordem: 284,
  grupos: [
    { id: 'nxc6', nome: '7.Nxc6 bxc6 8.e5', colunas: [1, 2] },
    { id: 'qa5', nome: '7.Bc4 Qa5', colunas: [3, 4] },
    { id: 'roque', nome: '7.Bc4 O-O', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
