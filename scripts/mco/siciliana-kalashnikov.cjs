// Transcrição do MCO 15ª ed. — Siciliana com 2...Nc6: linhas abertas com 4...e5 ou 4...Qb6 (pp. 344–345), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-kalashnikov
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-kalashnikov-dicas.cjs.
//
// A tabela traz avaliação só no fim da coluna 6; nas outras a avaliação vem da nota que continua a coluna.
// Nota (s): o livro dá "9 Kh1 ... 13 Kh1 Bb7 14 Qh3"; o rei não pode ir duas vezes a h1, então a nota para em 12...b5.
// Nota (f): o livro escreve "10 Nab1"; como o cavalo de c3 está cravado pela dama em a5, o lance se escreve 10.Nb1.

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4'

const colunas = {
  c01: [`${B} e5 5 Nb5 d6 6 c4 Be7 7 N1c3 a6 8 Na3 Be6 9 Bd3 Bg5 10 O-O Bxc1 11 Rxc1 Nf6 12 Nc2 O-O`, 'kalashnikov', '6.c4 Be7 8...Be6', '±',
    'Na Variante Kalashnikov as pretas jogam 4...e5 e 5...d6 sem ...Nf6, o que permite 6.c4: o peão fecha a casa d5 com uma estrutura tipo Maróczy. As pretas trocam o bispo de casas escuras por ...Bg5, mas as brancas ficam melhor.'],
  c02: [`${B} e5 5 Nb5 d6 6 c4 Be7 7 N1c3 a6 8 Na3 h6 9 Be2 Be6 10 O-O Bg5 11 Nc2 Nge7 12 b3 Bxc1`, 'kalashnikov', '8...h6', '⩲',
    'Com 8...h6 as pretas preparam ...Bg5 sem permitir Bxg5. Elas trocam o bispo de casas escuras, mas as brancas mantêm uma pequena vantagem.'],
  c03: [`${B} e5 5 Nb5 d6 6 N1c3 a6 7 Na3 b5 8 Nd5 Nge7 9 c4 Nd4 10 cxb5 Nxd5 11 exd5 Qh4 12 Be3 Nf5`, 'kalashnikov', '6.N1c3', '=',
    'Com 6.N1c3 as brancas levam o cavalo para d5, como na Sveshnikov. As pretas jogam ...b5 e ...Nge7 e, depois de 11...Qh4 12.Be3 Nf5, o jogo fica igual.'],
  c04: [`${B} e5 5 Nb5 a6 6 Nd6+ Bxd6 7 Qxd6 Qf6 8 Qd1 Qg6 9 Nc3 d5 10 Nxd5 Qxe4+ 11 Be3 Nd4 12 Nc7+ Ke7`, 'lowenthal', '5...a6 8.Qd1', '±',
    'Na Variante Löwenthal as pretas entregam o par de bispos com 5...a6 6.Nd6+ Bxd6 7.Qxd6 Qf6, em troca de desenvolvimento rápido. Com 8.Qd1 Qg6 9.Nc3 d5 o jogo fica agudo, mas as brancas ficam melhor.'],
  c05: [`${B} e5 5 Nb5 a6 6 Nd6+ Bxd6 7 Qxd6 Qf6 8 Qxf6 Nxf6 9 Nc3 Nb4 10 Kd2 d6 11 a3 Nc6 12 Bd3 Be6`, 'lowenthal', '8.Qxf6', '⩲',
    'Com 8.Qxf6 Nxf6 as brancas vão para o final com o par de bispos. O rei branco fica bem em d2, e as brancas mantêm uma pequena vantagem.'],
  c06: [`${B} Qb6 5 Nb5 a6 6 Be3 Qd8 7 N5c3 e6 8 Na4 b5 9 Nb6 Rb8 10 Nxc8 Qxc8 11 Bf4 e5 12 Be3 Nf6`, 'qb6', '4...Qb6', '=',
    'Com 4...Qb6 a dama ataca o cavalo de d4. Depois de 5.Nb5 a6 6.Be3 Qd8! as brancas ganham o bispo de c8 com Na4 e Nb6, mas as pretas ficam bem desenvolvidas e o jogo fica igual.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '5 Nxc6 bxc6 6 Bc4 Nf6 7 O-O Bc5', { a: '=', r: 'Morphy–Löwenthal, Londres 1858', c: '5.Nxc6 bxc6 6.Bc4 Nf6 7.O-O Bc5 é igual.' }],
  ['c01', 'b', 'b', '(b)', '6... f5 7 N1c3 a6 8 Bg5 Qd7 9 Nd5 axb5 10 cxb5', { a: '±', r: 'Pinski–Dobrotka, Bojnice 1994', c: '6...f5 7.N1c3 a6 8.Bg5! dá às brancas o melhor das complicações.' }],
  ['c01', 'c', 'c', '(c)', '7 b3 Nf6 8 Bd3 O-O 9 O-O Nd7 10 N1c3 a6 11 Na3 Bg5 12 Bb2', { a: '±', r: 'Khalifman–Sherbakov, Campeonato Russo 1995', c: '7.b3!? Nf6 8.Bd3 deixa as brancas melhor, porque elas conservam o bispo de casas escuras.' }],
  ['c01-c', '1', 'c', '(c) 7...a6', '7... a6 8 N5c3 f5 9 Bd3 f4 10 Nd5', { a: '±', r: 'Z. Almasi–Ivanović, Iugoslávia 1997', c: '7...a6?! 8.N5c3 f5 9.Bd3 f4 10.Nd5 também deixa as brancas melhor.' }],
  ['c01', 'd-A', 'd', '(d) A', '9 Nd5 Rc8 10 Be3 Bg5 11 Bb6 Qd7 12 Bd3 Bd8', { a: '=', r: 'McDonald–Kinsman, Capelle-la-Grande 1991', c: '9.Nd5 Rc8 10.Be3 Bg5 leva à igualdade.' }],
  ['c01', 'd-B', 'd', '(d) B', '9 Be2 Bg5 10 O-O Bxc1 11 Rxc1 Nf6 12 Nc2 O-O 13 Qd2 Qb6 14 b3 Rfd8', { a: '=', r: 'Z. Almasi–Fauland, Áustria 1995', c: '9.Be2 Bg5 10.O-O Bxc1 também leva à igualdade.' }],
  ['c01-d-B', '1', 'd', '(d) B 10.Bxg5', '10 Bxg5 Qxg5 11 O-O Rd8 12 Nd5 Nf6 13 Nc7+ Kf8', { a: '=', r: 'Anand–van der Wiel, Wijk aan Zee 1989', c: '10.Bxg5 Qxg5 11.O-O Rd8 também é igual.' }],
  ['c01', 'e', 'e', '(e)', '13 Qd2 Rc8 14 b3 Qb6 15 Kh1 Qa7 16 Nd5 Nd7 17 Nce3 Kh8 18 Bb1 Nd4 19 f4', { a: '±', r: 'Asirian–Moiseenko, Campeonato Europeu Individual 2005', c: 'Com 13.Qd2 e 19.f4 as brancas ficam melhor.' }],
  // Coluna 2
  ['c02', 'f', 'f', '(f)', '9 b3 Qa5 10 Nb1 Nf6 11 Bd3 O-O 12 O-O Bg4 13 f3 Be6', { a: '∞', r: 'Aseev–Kalinichev, Berlim 1992', c: '9.b3 Qa5 10.Nb1 leva a um jogo com chances para os dois lados.' }],
  ['c02', 'g', 'g', '(g)', '9... Bg5 10 Nc2 Nf6 11 Bxg5 hxg5 12 Qd2 Rh6 13 Qxg5 Rg6 14 Qe3 Rxg2 15 O-O-O', { a: '±', r: 'Hjartarson–Spraggett, Interzonal de Manila 1990', c: '9...Bg5 10.Nc2 Nf6?! 11.Bxg5 deixa as brancas melhor.' }],
  ['c02', 'h', 'h', '(h)', '13 Rxc1 Ng6 14 Bg4 O-O 15 Ne3 Nd4 16 Ne2', { a: '⩲', r: 'Kuzmin–Sveshnikov, URSS 1987', c: 'Com 13.Rxc1 Ng6 14.Bg4 as brancas ficam com uma pequena vantagem.' }],
  // Coluna 3
  ['c03', 'i-A', 'i', '(i) A', '8... Nf6 9 Bg5', { c: '8...Nf6 9.Bg5 transpõe para a Variante Sveshnikov.' }],
  ['c03', 'i-B', 'i', '(i) B', '8... Nce7 9 Bg5 h6 10 Bxb5+ axb5 11 Nxb5 Ra6 12 Ndc7+ Kd7 13 Qd2 hxg5 14 Nxa6 Nc6 15 Nac7 Nd4 16 O-O-O', { a: '±', r: 'Edelman–Benjamin, Nova York 1993', c: '8...Nce7 permite o sacrifício promissor 9.Bg5 h6 10.Bxb5+!.' }],
  ['c03-i-B', '1', 'i', '(i) B 11...Ra7', '11... Ra7 12 Nxa7 Qa5+ 13 Qd2 Qxa7 14 Be3', { a: '±', r: 'Feigin–I. Ivanov, Kharkov 1997', c: '11...Ra7 12.Nxa7 Qa5+ 13.Qd2 Qxa7 14.Be3 também deixa as brancas melhor.' }],
  ['c03-i-B', '2', 'i', '(i) B 9.c4', '9 c4 Nxd5 10 exd5 bxc4 11 Nxc4 Nf6 12 Be3 Rb8 13 Be2 Be7 14 a4 O-O 15 O-O Bb7 16 Nb6 Nd7 17 a5', { a: '⩲', r: 'Karjakin–Kosteniuk, match 2003', c: 'Mais seguro para as brancas é 9.c4 Nxd5 10.exd5, com uma pequena vantagem.' }],
  ['c03', 'j', 'j', '(j)', '9... Nxd5 10 cxd5 Ne7 11 Nc2 Bd7 12 Bd3 g6 13 O-O', { a: '⩲', r: 'Kasparov–Lautier, Moscou (rápidas) 2002', c: '9...Nxd5 10.cxd5 Ne7 dá uma pequena vantagem às brancas.' }],
  ['c03', 'k', 'k', '(k)', '11... Be7 12 Be3 Nf5 13 Bd2 e4 14 bxa6 O-O 15 Be2 Bf6', { a: '=', r: 'Carlsen–Radjabov, Wijk aan Zee 2007', c: '11...Be7 12.Be3 Nf5 também leva à igualdade.' }],
  ['c03', 'l', 'l', '(l)', '13 Nc2 Be7 14 Bd3 Nxe3 15 Nxe3 O-O 16 O-O f5', { a: '=', r: 'Diermer–Sarre, Graz 2006', c: 'Com 13.Nc2 Be7 14.Bd3 Nxe3 o jogo fica igual.' }],
  // Coluna 4
  ['c04', 'm', 'm', '(m)', '9... Nge7 10 h4 h5 11 Bg5 d5 12 exd5 Nb4 13 Bxe7 Kxe7 14 Bd3 Nxd3+ 15 Qxd3 Qxd3 16 cxd3 Bf5 17 O-O-O', { a: '±', r: 'Klundt–Meister, Linz 1995', c: 'Contra o mais lento 9...Nge7 as brancas jogam 10.h4! e chegam a um final claramente melhor.' }],
  ['c04', 'n', 'n', '(n)', '13 Rc1 Bg4 14 Qd3 Qxd3 15 Bxd3 Rd8 16 h3 Bh5 17 f4 f6 18 Kf2 Nh6 19 c4', { a: '⩲', r: 'Starrer–Radulski, Bulgária 1991', c: '13.Rc1 é melhor que o antigo 13.Qd3; depois de 13...Bg4 14.Qd3 as brancas ficam com uma pequena vantagem.' }],
  ['c04-n', '1', 'n', '(n) 13.Qd3', '13 Qd3 Nxc2+ 14 Kd2 Qxd3+ 15 Bxd3 Nxe3 16 Nxa8 Nd5 17 Rac1 Ngf6 18 Nc7 Nb6', { a: '∞', c: 'O antigo 13.Qd3 Nxc2+ leva a um jogo pouco claro, porque o cavalo em c7 fica preso.' }],
  // Coluna 5
  ['c05', 'o', 'o', '(o)', '8 Qa3 Nge7 9 Nc3 Rb8 10 Be3 b5 11 Nd5 Nxd5 12 exd5 b4 13 Qa4', { a: '⩲', r: 'Freitag–Neulinger, Áustria 1995', c: '8.Qa3 Nge7 9.Nc3 dá uma pequena vantagem às brancas.' }],
  ['c05', 'p', 'p', '(p)', '10... d5 11 a3 d4 12 axb4 dxc3+ 13 Ke3', { a: '±', r: 'Velimirović–Ristić, Iugoslávia 1979', c: '10...d5 11.a3 d4 12.axb4 dxc3+ 13.Ke3! deixa as brancas melhor.' }],
  ['c05', 'q', 'q', '(q)', '13 f3 O-O 14 Ke2', { a: '⩲', c: 'Com 13.f3 O-O 14.Ke2 as brancas ficam com uma pequena vantagem, porque têm o par de bispos no final.' }],
  // Coluna 6
  ['c06', 'r-A', 'r', '(r) A', '4... Nxd4 5 Qxd4', { c: '4...Nxd4?! 5.Qxd4 só centraliza a dama branca.' }],
  ['c06', 'r-B', 'r', '(r) B', '4... Qc7 5 c4 e6 6 Nc3 Nf6 7 Be3 b6 8 Qd2', { a: '±', r: 'Ivanchuk–Kamsky, Dortmund 1992', c: '4...Qc7 5.c4 e6 6.Nc3 deixa as brancas melhor.' }],
  ['c06-r-B', '1', 'r', '(r) B 5...Qe5', '5... Qe5 6 Be3 Qxe4 7 Nc3', { a: '±', c: '5...Qe5 6.Be3 Qxe4 7.Nc3 dá às brancas uma grande vantagem de desenvolvimento.' }],
  ['c06', 'r-C', 'r', '(r) C', '4... g6', { c: '4...g6 é o Dragão Acelerado.' }],
  ['c06', 's', 's', '(s)', '5 Nb3 Nf6 6 Nc3 e6 7 Bd3 Be7 8 O-O a6 9 Kh1 Qc7 10 f4 d6 11 Qf3 O-O 12 Bd2 b5', { a: '⩲', r: 'Lobron–Grünfeld, Dortmund 1983', c: 'Mais cauteloso é 5.Nb3, com chances de ataque para as brancas.' }],
  ['c06', 't', 't', '(t)', '6... Qa5+ 7 N5c3 e6 8 Nd2 b5 9 a4 b4 10 Nc4 Qc7 11 Nd5 exd5 12 exd5 Nb8 13 Qe2 d6 14 Bb6+ Qe7 15 Nxd6+ Kd7 16 Ne4', { a: '+−', r: 'Ehlvest–Smirin, Moscou 1992', c: '6...Qa5+ 7.N5c3 e6 8.Nd2 b5 dá às brancas um ataque tremendo: depois de 16.Ne4 elas ameaçam 17.Qb5+ com mate.' }],
  ['c06', 'u', 'u', '(u)', '7 Nd4 Nf6 8 Nc3 e5 9 Nf5 d5 10 exd5 Nb4', { a: '=', r: 'Czebe–Knežević, Budapeste 1996', c: '7.Nd4 Nf6 8.Nc3 e5 leva à igualdade. A coluna é Kaidanov–Yermolinsky, Asheville 1992.' }],
]

const capitulo = {
  id: 'siciliana-kalashnikov',
  arquivo: 'siciliana-kalashnikov',
  nome: 'Siciliana — Kalashnikov, Löwenthal e 4...Qb6',
  fonte: 'Modern Chess Openings — Sicilian Defense, Open Lines with 2...Nc6 and 4...e5 or 4...Qb6 (pp. 344–345), colunas 1–6',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4',
  corPadrao: 'b',
  ordem: 344,
  grupos: [
    { id: 'kalashnikov', nome: '4...e5 5.Nb5 d6 (Kalashnikov)', colunas: [1, 2, 3] },
    { id: 'lowenthal', nome: '5...a6 (Löwenthal)', colunas: [4, 5] },
    { id: 'qb6', nome: '4...Qb6', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
