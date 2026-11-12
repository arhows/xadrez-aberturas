// Transcrição do MCO 15ª ed. — Siciliana, 2.c3 (pp. 352–354), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-2c3
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-2c3-dicas.cjs.
//
// Colunas 1, 2, 4, 5 e 6 terminam sem avaliação na tabela; a avaliação vem da nota que continua cada coluna.
// Omitido: em (d) A, a ideia 7...d5 8.cxd4 Bg4 e 9...e6; em (r) A, a sublinha 11...b6 12.Ne4 (ganha um peão).

const B = '1 e4 c5 2 c3'

const colunas = {
  c01: [`${B} Nf6 3 e5 Nd5 4 d4 cxd4 5 Nf3 Nc6 6 Bc4 Nb6 7 Bb3 d5 8 exd6 Qxd6 9 O-O Be6 10 Na3 dxc3 11 Qe2 Bxb3`, 'nf6', '2...Nf6 5...Nc6 6.Bc4', '=',
    'Contra 2...Nf6 as brancas avançam 3.e5 e o cavalo vai para d5. Na linha principal com 6.Bc4 Nb6 7.Bb3 d5 as pretas abrem o centro, trocam o bispo branco e igualam.'],
  c02: [`${B} Nf6 3 e5 Nd5 4 d4 cxd4 5 Nf3 e6 6 cxd4 b6 7 Nc3 Nxc3 8 bxc3 Qc7 9 Bd2 Bb7 10 Bd3 d6 11 O-O Nd7`, 'nf6', '5...e6 6.cxd4 b6', '=',
    'Com 5...e6 e 6...b6 as pretas trocam em c3 e pressionam o centro branco com Qc7, Bb7 e ...d6. O jogo é igual, mas agudo.'],
  c03: [`${B} Nf6 3 e5 Nd5 4 d4 cxd4 5 Qxd4 e6 6 Nf3 Nc6 7 Qe4 d6 8 Nbd2 dxe5 9 Nxe5 Nxe5 10 Qxe5 Qd6 11 Bb5+ Bd7`, 'nf6', '5.Qxd4', '=',
    'Com 5.Qxd4 as brancas recapturam com a dama para manter o peão e5. As pretas o atacam com ...Nc6 e ...d6, trocam no centro e igualam.'],
  c04: [`${B} d5 3 exd5 Qxd5 4 d4 Nf6 5 Nf3 e6 6 Bd3 Be7 7 O-O O-O 8 Be3 cxd4 9 cxd4 Nc6 10 Nc3 Qd6 11 a3 b6`, 'd5', '2...d5 5...e6', '∞',
    'Com 2...d5 as pretas aproveitam que c3 tirou do cavalo a casa c3: a dama fica bem centralizada em d5. Com 5...e6 surge uma estrutura de peão isolado em d4, com chances para os dois lados.'],
  c05: [`${B} d5 3 exd5 Qxd5 4 d4 Nf6 5 Nf3 Bg4 6 Be2 e6 7 h3 Bh5 8 O-O Nc6 9 Be3 cxd4 10 cxd4 Bb4 11 a3 Ba5`, 'd5', '5...Bg4', '=',
    'Com 5...Bg4 as pretas pressionam d4 pelo cravo em f3. O bispo recua para h5, e a linha leva à igualdade se as pretas acertarem na nota da partida Deep Blue–Kasparov.'],
  c06: [`${B} e6 3 d4 d5 4 exd5 exd5 5 Nf3 Nc6 6 Bb5 Bd6 7 dxc5 Bxc5 8 O-O Ne7 9 Nbd2 O-O 10 Nb3 Bb6 11 Re1 Nf5`, 'e6', '2...e6 3.d4 d5', '=',
    'Com 2...e6 e 3...d5 as pretas aceitam um peão isolado em d5 depois de 4.exd5 exd5. Com peças ativas e ...Nf5 elas igualam.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a-A', 'a', '(a) A', '4 Nf3 Nc6 5 Bc4 Nb6 6 Bb3 c4 7 Bc2 Qc7 8 Qe2 g5 9 h3 Bg7 10 O-O Nxe5 11 Nxg5 d5', { a: '=', r: 'Rozentalis–van Wely, Olimpíada de Bled 2002', c: '4.Nf3 Nc6 5.Bc4 Nb6 6.Bb3 c4 7.Bc2 Qc7 8.Qe2 g5! leva à igualdade.' }],
  ['c01', 'a-B', 'a', '(a) B', '4 g3 d6 5 exd6 Qxd6 6 Bg2 Nc6 7 Ne2 Bf5 8 d4 e6 9 Na3 Qd7', { a: '∞', r: 'Hoffman–de Firmian, Buenos Aires 1995', c: 'Para quem quer fugir da teoria, recomenda-se 4.g3: o jogo fica com chances para os dois lados.' }],
  ['c01', 'b', 'b', '(b)', '6 cxd4 d6 7 Bc4 Nb6 8 Bb3 dxe5 9 d5 Na5 10 Nc3 Nxb3 11 Qxb3 e6 12 Nxe5 Nxd5 13 Qb5+ Bd7 14 Qxb7 Bb4 15 Bd2 Bxc3 16 bxc3 Qc8', { a: '=', r: 'Fressinet–van der Wiel, Wijk aan Zee B 2004', c: 'Com o lance natural 6.cxd4 d6 as pretas igualam.' }],
  ['c01-b', '1', 'b', '(b) 8.Bb5', '8 Bb5 dxe5 9 Nxe5 Bd7', { a: '=', c: '8.Bb5 dxe5 9.Nxe5 Bd7 também é igual.' }],
  ['c01-b', '2', 'b', '(b) 15.Nxd7', '15 Nxd7 Qc8', { a: '=', c: '15.Nxd7 Qc8! leva à igualdade.' }],
  ['c01-b', '3', 'b', '(b) 7.Nc3', '7 Nc3 dxe5 8 dxe5 Nxc3 9 Qxd8+ Nxd8 10 bxc3 g6', { a: '=', r: 'Sveshnikov–Kozul, Nova Gorica 1996', c: '7.Nc3 dxe5 8.dxe5 Nxc3 9.Qxd8+ também não traz problemas para as pretas.' }],
  ['c01', 'c', 'c', '(c)', '6... e6 7 cxd4 d6 8 O-O Be7 9 Qe2 O-O 10 Nc3 Nxc3 11 bxc3 b6 12 Bd3', { a: '⩲', c: 'A defesa antiga 6...e6 dá às brancas chances de ataque.' }],
  ['c01', 'd-A', 'd', '(d) A', '7... d6 8 exd6', { c: '7...d6 8.exd6 chega à mesma posição da coluna.' }],
  ['c01', 'd-B', 'd', '(d) B', '7... dxc3 8 Nxc3 e6 9 Ne4 Bb4+ 10 Bd2 O-O 11 Bc3 Bxc3+ 12 bxc3 f6 13 exf6 gxf6 14 Nd6', { a: '±', r: 'Vilinen–Innala, 1993', c: '7...dxc3?! é ganancioso demais: o cavalo branco chega a d6.' }],
  ['c01', 'e', 'e', '(e)', '9 Na3 dxc3 10 Qe2 Bf5 11 Nb5 Qd7 12 Ne5 Nxe5 13 Qxe5 Rc8', { a: '∓', r: 'Marković–Vučković, Kopaonik 2005', c: '9.Na3 dxc3 10.Qe2 Bf5 deixa as pretas um pouco melhor.' }],
  ['c01', 'f-A', 'f', '(f) A', '9... Bf5 10 Nxd4 Nxd4 11 cxd4 e6 12 Nc3 Be7 13 Qf3', { a: '±', r: 'Lautier–J. Polgar, Hilversum 1993', c: 'Um erro comum é 9...Bf5?!: depois de 13.Qf3! as pretas ficam em dificuldades.' }],
  ['c01-f-A', '1', 'f', '(f) A 13...Qxd4', '13... Qxd4 14 Qxb7', { a: '±', c: '13...Qxd4 14.Qxb7 é ruim para as pretas.' }],
  ['c01-f-A', '2', 'f', '(f) A 13...Qd7', '13... Qd7 14 d5', { a: '±', c: '13...Qd7 14.d5 também deixa as pretas em dificuldades.' }],
  ['c01', 'f-B', 'f', '(f) B', '9... e6 10 cxd4 Be7 11 Nc3', { a: '±', c: '9...e6 10.cxd4 Be7 11.Nc3 dá vantagem às brancas.' }],
  ['c01', 'g', 'g', '(g)', '10 Bxe6 Qxe6 11 Nxd4 Nxd4 12 Qxd4 Rd8 13 Qh4 Qe2 14 Be3 Qxb2 15 Nd2 Rxd2 16 Rab1 Qxa2', { a: '∓', c: '10.Bxe6 Qxe6 11.Nxd4 permite às pretas bom contrajogo com 13...Qe2!.' }],
  ['c01', 'h', 'h', '(h)', '10... Bxb3 11 Qxb3 Qd5 12 Nb5 Rc8 13 Nfxd4 Nxd4 14 Nxd4 e6 15 Rd1 Bc5 16 Qb5+ Ke7 17 Qe2 Rhd8 18 Be3 Qe5 19 Qg4', { a: '⩲', r: 'Benjamin–Browne, Campeonato dos EUA 1997', c: '10...Bxb3 11.Qxb3 Qd5 dá uma pequena vantagem às brancas.' }],
  ['c01-h', '1', 'h', '(h) 11...e6', '11... e6 12 Nb5', { a: '⩲', c: '11...e6 12.Nb5 também favorece as brancas.' }],
  ['c01', 'i', 'i', '(i)', '11 Nb5 Qxd1 12 Rxd1 Rc8 13 Bxe6 fxe6 14 bxc3 Nc4', { a: '∓', c: '11.Nb5 Qxd1 12.Rxd1 leva a um final um pouco melhor para as pretas.' }],
  ['c01', 'j', 'j', '(j)', '12 Nb5 Qb8 13 axb3 e5 14 Nbd4 f6 15 bxc3 Be7 16 Nf5 O-O 17 N3h4 Rf7', { a: '=', r: 'Howell–Wells, 4NCL 2005', c: 'Com 12.Nb5 Qb8 13.axb3 o jogo fica igual.' }],
  // Coluna 2
  ['c02', 'k', 'k', '(k)', '5... d6 6 Bc4 Nb6 7 Bb5+ Nc6 8 cxd4 dxe5', { c: 'Pouco jogado, mas razoável, é 5...d6: com 7.Bb5+ Nc6 8.cxd4 dxe5 transpõe para a nota (b).' }],
  ['c02-k', '1', 'k', '(k) 7.Bb3', '7 Bb3 dxe5 8 Nxe5 e6 9 O-O Nc6', { a: '=', r: 'Kharlov–Yudasin, Kemerovo 1995', c: '7.Bb3 dxe5 8.Nxe5 e6 é igual.' }],
  ['c02', 'l', 'l', '(l)', '7 Bd3 Bb4+ 8 Bd2 Bxd2+ 9 Qxd2 Ba6 10 Be4 Nc6 11 Bxd5 exd5 12 Nc3 d6', { a: '=', r: 'White–Truman, Torquay 2002', c: '7.Bd3 Bb4+ 8.Bd2 Bxd2+ leva à igualdade.' }],
  ['c02', 'm', 'm', '(m)', '12 Ng5 dxe5 13 Qh5 g6 14 Qh3 Be7 15 Rae1 Qd8', { a: '=', r: 'Hutchinson–Jackson, Masters 2007', c: '12.Ng5!? dxe5 13.Qh5 deixa o jogo igual, mas agudo.' }],
  ['c02-m', '1', 'm', '(m) 12.Re1', '12 Re1', { a: '=', c: '12.Re1 também é igual.' }],
  // Coluna 3
  ['c03', 'n-A', 'n', '(n) A', '5 cxd4 e6 6 Nf3', { c: '5.cxd4 e6 6.Nf3 transpõe para a coluna 2.' }],
  ['c03', 'n-B', 'n', '(n) B', '5 cxd4 d6 6 Bc4 Nb6 7 Bb5+ Nc6 8 Nc3 dxe5 9 d5 a6 10 Ba4 Nxa4 11 Qxa4 b5 12 Nxb5 Bd7 13 Nc3 Nd4 14 Qd1 Bf5', { a: '∓', r: 'Rozentalis–Sadler, Hastings 1997/98', c: 'Contra 5.cxd4 também serve 5...d6: as pretas devolvem um peão e ficam um pouco melhor.' }],
  ['c03-n-B', '1', 'n', '(n) B 7...Bd7', '7... Bd7 8 e6 Bxb5 9 Qh5', { a: '⩲', c: '7...Bd7 8.e6! Bxb5 9.Qh5 favorece as brancas.' }],
  ['c03-n-B', '2', 'n', '(n) B 8.d5', '8 d5 a6', { c: '8.d5 a6 é a alternativa.' }],
  ['c03', 'o', 'o', '(o)', '6 Bc4 Nc6 7 Qe4 Nde7 8 f4 d5 9 exd6 Nf5 10 Bd3 Bxd6 11 Nf3 Qc7 12 O-O h5', { a: '=', r: 'Vavpetič–Kozul, Liubliana 1994', c: '6.Bc4 Nc6 7.Qe4 Nde7!? também leva à igualdade.' }],
  ['c03', 'p', 'p', '(p)', '8 Bb5 Bd7 9 c4 Nc7 10 exd6 Bxd6 11 O-O Nxb5 12 cxb5 Ne7', { a: '=', r: 'Stein–Plachetka, Copenhague 1990', c: '8.Bb5 Bd7 9.c4 Nc7 é igual. A coluna é Rogers–Yudasin, Olimpíada de Moscou 1994.' }],
  // Coluna 4
  ['c04', 'q-A', 'q', '(q) A', '4... cxd4 5 cxd4 Nc6 6 Nf3 e5 7 Nc3 Bb4 8 Bd2 Bxc3 9 Bxc3 e4 10 Ne5 Nxe5 11 dxe5 Ne7 12 Be2 O-O 13 O-O Qe6 14 Qd4 Qg6 15 Rfe1', { a: '⩲', r: 'Smagin–Yagupov, Moscou 1995', c: '4...cxd4 5.cxd4 Nc6 6.Nf3 e5 dá uma pequena vantagem às brancas.' }],
  ['c04-q-A', '1', 'q', '(q) A 5...e5', '5... e5 6 Nf3', { a: '⩲', c: '5...e5 6.Nf3 favorece as brancas.' }],
  ['c04-q-A', '2', 'q', '(q) A 6...Bg4', '6... Bg4 7 Nc3 Bxf3 8 gxf3 Qxd4 9 Qxd4 Nxd4 10 Nb5 Nc2+ 11 Kd1 Rc8 12 Nxa7 Rc5', { c: 'Uma linha antiga e aguda é 6...Bg4: depois de 12.Nxa7 Rc5 as pretas parecem resistir.' }],
  ['c04', 'q-B', 'q', '(q) B', '4... e5 5 dxe5 Qxd1+ 6 Kxd1 Nc6 7 f4 Bf5 8 Nf3 O-O-O+ 9 Ke1 f6 10 Bb5', { a: '⩲', r: 'Rozentalis–Ftáčnik, Alemanha 1994', c: '4...e5 5.dxe5 Qxd1+ leva a um final com pequena vantagem branca.' }],
  ['c04', 'r-A', 'r', '(r) A', '6 Be3 cxd4 7 cxd4 Nc6 8 Nc3 Qd6 9 a3 Be7 10 Bd3 b6 11 O-O Bb7 12 Qe2 O-O', { c: '6.Be3 cxd4 7.cxd4 Nc6 8.Nc3 Qd6 transpõe para a nota (u), no fim da coluna.' }],
  ['c04-r-A', '1', 'r', '(r) A 10...O-O', '10... O-O 11 Qc2', { a: '⩲', c: 'Menos preciso é 10...O-O 11.Qc2!, que obriga 11...Bd7, porque 11...b6 12.Ne4 ganha um peão.' }],
  ['c04', 'r-B', 'r', '(r) B', '6 Na3 Qd8 7 Bf4 Nc6 8 dxc5 Nd5 9 Bd6 Bxd6 10 cxd6 Qxd6 11 Nb5 Qe7 12 c4 a6 13 cxd5 exd5+', { a: '=', r: 'van der Werf–Hulak, Wijk aan Zee 1995', c: '6.Na3 Qd8 7.Bf4 leva à igualdade.' }],
  ['c04', 'r-C', 'r', '(r) C', '6 Be2 cxd4 7 Qxd4 Nc6 8 Qxd5 Nxd5', { a: '=', r: 'Sevillano–Matikozian, SCCF 2006', c: '6.Be2 cxd4 7.Qxd4 troca as damas e leva à igualdade.' }],
  ['c04', 's', 's', '(s)', '8 c4 Qh5 9 Be2 Rd8 10 Be3 cxd4 11 Nxd4 Qe5 12 Nc3 Bd7 13 Bf3 Nc6', { a: '=', r: 'Dvoretsky–Polugaevsky, Leningrado 1974', c: '8.c4 Qh5 9.Be2 Rd8 é igual.' }],
  ['c04-s', '1', 's', '(s) 9.dxc5', '9 dxc5 Rd8 10 Bf4 Qxc5', { a: '=', c: '9.dxc5 Rd8 10.Bf4 Qxc5 também é igual.' }],
  ['c04-s', '2', 's', '(s) 10.Ne5', '10 Ne5 Qh4 11 Nf3', { c: 'As brancas já jogaram 10.Ne5 Qh4 11.Nf3 para repetir a posição; se as pretas quiserem evitar o empate, devem jogar 7...cxd4.' }],
  ['c04', 't', 't', '(t)', '10... Qa5 11 a3 Nd5 12 Nxd5 Qxd5 13 Rc1 Rd8 14 Bc4 Qa5 15 Qe2', { a: '⩲', r: 'Sveshnikov–Mieses, Riga 2006', c: '10...Qa5 11.a3 Nd5 dá uma pequena vantagem às brancas.' }],
  ['c04', 'u', 'u', '(u)', '12 Qe2 Bb7 13 Rad1 h6 14 Rfe1 Rfd8 15 Bb1 Bf8', { a: '∞', r: 'V. Ivanov–Zagrebelny, Moscou 1995', c: '12.Qe2 Bb7 13.Rad1 leva a um jogo com chances para os dois lados.' }],
  // Coluna 5
  ['c05', 'v', 'v', '(v)', '5... Nc6 6 dxc5 Qxd1+ 7 Kxd1 e5 8 b4 Bf5 9 Bb5 O-O-O+ 10 Ke2 Be7 11 Be3 Nd5 12 Bxc6 bxc6 13 Nxe5 Rhe8', { a: '∞', r: 'Sermek–Wirthensohn, Copa Mitropa 1993', c: '5...Nc6 6.dxc5!? Qxd1+ leva a uma posição muito aguda e indefinida.' }],
  ['c05-v', '1', 'v', '(v) 6.Be3', '6 Be3 cxd4 7 cxd4 e6 8 Nc3 Qd6 9 Bd3 Be7 10 a3', { c: '6.Be3 cxd4 7.cxd4 e6 leva a uma posição parecida com a da coluna anterior.' }],
  ['c05-v', '2', 'v', '(v) 6...Qxc5', '6... Qxc5 7 Na3 Ng4 8 Qe2 Bf5 9 h3 Bd3 10 Qd2', { a: '⩲', c: '6...Qxc5 7.Na3 Ng4 dá uma pequena vantagem às brancas.' }],
  ['c05', 'w', 'w', '(w)', '6 Nbd2 Nc6 7 Bc4 Bxf3 8 gxf3 Qf5 9 Qb3 O-O-O 10 Bxf7 Nd5 11 Bxd5 Rxd5', { a: '∓', c: '6.Nbd2 Nc6 7.Bc4 Bxf3 8.gxf3 Qf5 deixa as pretas um pouco melhor (análise do Deep Blue).' }],
  ['c05-w', '1', 'w', '(w) 8.Qb3', '8 Qb3 Na5 9 Bxd5 Nxb3 10 Nxf3 Nxd5', { a: '=', r: 'Shirov–J. Polgar, Dos Hermanas 1997', c: '8.Qb3 Na5 9.Bxd5 Nxb3 leva à igualdade.' }],
  ['c05', 'x', 'x', '(x)', '12 Nc3 Qd6 13 Nb5 Qd5 14 Bc4 Bxf3', { a: '=', r: 'Deep Blue–Kasparov, match de 1996', c: 'Depois de 12.Nc3 Qd6 13.Nb5, o lance 13...Qd5 deixa o jogo igual, porque 14.Bc4 Bxf3! é bom para as pretas.' }],
  ['c05-x', '1', 'x', '(x) 13...Qe7', '13... Qe7 14 Ne5 Bxe2 15 Qxe2 O-O 16 Rac1 Rac8 17 Bg5', { a: '⩲', r: 'Deep Blue–Kasparov, match de 1996', c: 'Kasparov jogou 13...Qe7?! e, depois de 17.Bg5!, perdeu em 37 lances.' }],
  // Coluna 6
  ['c06', 'y-A', 'y', '(y) A', '2... d6 3 d4 Nf6 4 Bd3 Nc6 5 Nf3 Bg4 6 d5', { a: '⩲', c: 'Contra 2...d6 3.d4 Nf6 as brancas podem jogar simplesmente 4.Bd3, com pequena vantagem.' }],
  ['c06-y-A', '1', 'y', '(y) A 4.dxc5', '4 dxc5 Nc6 5 cxd6 Nxe4 6 dxe7 Qxd1+', { c: 'É o que as pretas querem: 4.dxc5 Nc6! 5.cxd6 Nxe4 6.dxe7 Qxd1+.' }],
  ['c06', 'y-B', 'y', '(y) B', '2... b6 3 d4 Bb7 4 Bd3 Nf6 5 Nd2', { a: '⩲', c: '2...b6 3.d4 Bb7 4.Bd3 dá uma pequena vantagem às brancas.' }],
  ['c06', 'y-C', 'y', '(y) C', '2... e5 3 Nf3 Nc6 4 Bc4', { a: '⩲', c: '2...e5 3.Nf3 Nc6 4.Bc4 também favorece as brancas.' }],
  ['c06', 'z', 'z', '(z)', '4 e5', { c: 'Muitos jogadores, como Benjamin, preferem 4.e5, que transpõe para a Variante do Avanço da Francesa.' }],
  ['c06', 'aa', 'aa', '(aa)', '5 Be3 cxd4 6 Bxd4 Nc6 7 Bb5 Ne7 8 Qe2 Be6 9 Nf3 Nf5 10 g4 Nd6 11 Bxc6+ bxc6 12 Ne5 Qc7', { a: '∞', r: 'Blatný–Züger, Praga 1996', c: '5.Be3 cxd4 6.Bxd4 Nc6 leva a um jogo com chances para os dois lados.' }],
  ['c06-aa', '1', 'aa', '(aa) 5...c4', '5... c4 6 b3 cxb3 7 axb3 Bd6 8 Bd3 Nc6 9 Qf3', { a: '⩲', c: '5...c4 6.b3 cxb3 7.axb3 dá alguma iniciativa às brancas.' }],
  ['c06', 'bb', 'bb', '(bb)', '12 Bd3 h6 13 Bc2 Qd6 14 Qd3 Rd8 15 Be3 Bxe3 16 fxe3 g6', { a: '=', r: 'Ivanchuk–Lobron, Dortmund 1995', c: '12.Bd3 h6 13.Bc2 Qd6 14.Qd3 Rd8! leva à igualdade.' }],
  ['c06-bb', '1', 'bb', '(bb) 15.g4', '15 g4 Qg6', { c: '15.g4 Qg6 é a alternativa.' }],
]

const capitulo = {
  id: 'siciliana-2c3',
  arquivo: 'siciliana-2c3',
  nome: 'Siciliana — 2.c3 (Alapin)',
  fonte: 'Modern Chess Openings — Sicilian Defense, 2 c3 (pp. 352–354), colunas 1–6',
  base: '1. e4 c5 2. c3',
  corPadrao: 'b',
  ordem: 352,
  grupos: [
    { id: 'nf6', nome: '2...Nf6', colunas: [1, 2, 3] },
    { id: 'd5', nome: '2...d5', colunas: [4, 5] },
    { id: 'e6', nome: '2...e6', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
