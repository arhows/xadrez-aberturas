// Transcrição do MCO 15ª ed. — Siciliana com 2...Nc6 e ...e5: Variante Sveshnikov (pp. 341–343), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs siciliana-sveshnikov-b
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-sveshnikov-b-dicas.cjs.
//
// A tabela traz avaliação só no fim da coluna 12; nas outras a avaliação vem da nota que continua a coluna.
// Nota (i): o livro escreve "14...Re8 15 Nxe7!", mas o rei preto ainda está em e8; o lance é 14...Rc8 (o cavalo em e7 ataca c8).

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 e5'

const colunas = {
  c07: [`${B} 6 Ndb5 d6 7 Bg5 a6 8 Na3 b5 9 Nd5 Be7 10 Bxf6 Bxf6 11 c3 O-O 12 Nc2 Bg5 13 a4 bxa4 14 Rxa4 a5`, 'na3', '9.Nd5 Be7 12.Nc2 Bg5', '=',
    'Com 9.Nd5 Be7 10.Bxf6 Bxf6 as brancas mantêm a estrutura preta intacta, mas ficam com o cavalo forte em d5. Elas trazem o cavalo de a3 por c2 e atacam a ala da dama com a4; depois de 14...a5 o jogo fica igual.'],
  c08: [`${B} 6 Ndb5 d6 7 Bg5 a6 8 Na3 b5 9 Nd5 Be7 10 Bxf6 Bxf6 11 c3 O-O 12 Nc2 Rb8 13 h4 Ne7 14 Nxf6+ gxf6`, 'na3', '12...Rb8 13.h4', '⩲',
    'Contra 12...Rb8 o lance de Kasparov 13.h4! impede ...Bg5 e restringe o bispo de casas escuras. As pretas trocam o cavalo de d5, mas ficam com peões dobrados; as brancas mantêm uma pequena vantagem.'],
  c09: [`${B} 6 Ndb5 d6 7 Bg5 a6 8 Na3 b5 9 Nd5 Qa5+ 10 Bd2 Qd8 11 Nxf6+ Qxf6 12 Bd3 Qg6 13 O-O Be7 14 c4 Bh3`, 'na3', '9...Qa5+', '=',
    'Com 9...Qa5+ 10.Bd2 Qd8 as pretas fazem o bispo recuar. Depois de 11.Nxf6+ Qxf6 a dama vai para g6 e ataca o roque; com 14...Bh3 o jogo fica igual.'],
  c10: [`${B} 6 Ndb5 d6 7 Bg5 a6 8 Na3 Be6 9 Nc4 Rc8 10 Bxf6 gxf6 11 Bd3 Ne7 12 Ne3 Bh6 13 O-O Bxe3 14 fxe3 Qb6`, 'na3', '8...Be6', '±',
    'Com 8...Be6 as pretas não jogam ...b5 e deixam o cavalo ir para c4. Depois de 10.Bxf6 gxf6 elas trocam o cavalo de e3, mas as brancas ficam melhor.'],
  c11: [`${B} 6 Ndb5 d6 7 Nd5 Nxd5 8 exd5 Nb8 9 c4 a6 10 Nc3 Be7 11 Be2 O-O 12 O-O f5 13 f4 Bf6 14 g3 Nd7`, 'outros', '7.Nd5', '=',
    'Com 7.Nd5 as brancas trocam os cavalos e ganham espaço com o peão em d5. O cavalo preto volta por b8 e d7, as pretas avançam ...f5 e o jogo fica igual.'],
  c12: [`${B} 6 Nf3 Bb4 7 Bc4 O-O 8 O-O Bxc3 9 bxc3 Nxe4 10 Ba3 d6 11 Re1 Ng5 12 Nxg5 Qxg5 13 Bxd6 Bg4 14 Qc1 Qxc1`, 'outros', '6.Nf3', '=',
    'Com 6.Nf3 as brancas evitam as complicações. As pretas cravam o cavalo com 6...Bb4, ganham o peão e4 e o devolvem; depois da troca das damas o jogo fica igual.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '8 Bxf6 gxf6 9 Na3 f5 10 Bd3 Rg8 11 g3 Nd4 12 Nd5 f4', { a: '=', r: 'Brownscombe–Shaked, EUA 1994', c: 'Trocar logo com 8.Bxf6 gxf6 9.Na3 dá às pretas contrajogo rápido.' }],
  ['c07', 'b', 'b', '(b)', '10 Nxe7 Nxe7 11 Bxf6 gxf6 12 Qf3 f5 13 exf5 Bxf5 14 Bd3 Be6 15 O-O O-O 16 c4 f5 17 Rae1 Ng6', { a: '∞', r: 'Russel–Paterson, Escócia 1994', c: 'Com 10.Nxe7 Nxe7! 11.Bxf6 gxf6 as pretas ganham jogo ativo.' }],
  ['c07-b', '1', 'b', '(b) 12.c4', '12 c4 Bb7', { c: '12.c4 Bb7! também é bom para as pretas.' }],
  ['c07', 'c-A', 'c', '(c) A', '11... Ne7 12 Nxf6+ gxf6 13 Bd3 d5 14 Qe2 Bb7 15 O-O-O Qc7 16 exd5 Nxd5 17 Be4', { a: '±', r: 'Wahls–Becerra Rivero, Cuba 1996', c: 'As pretas experimentaram alternativas. 11...Ne7 12.Nxf6+ gxf6 deixa as brancas melhor.' }],
  ['c07', 'c-B', 'c', '(c) B', '11... Bb7 12 Nc2 Nb8 13 a4 bxa4 14 Rxa4 Nd7 15 Rb4 Nc5 16 Rxb7 Nxb7 17 b4', { a: '±', r: 'Kasparov–Shirov, Horgen 1994', c: '11...Bb7 12.Nc2 Nb8 13.a4: com 15.Rb4! e 16.Rxb7! as peças brancas dominam as casas importantes e compensam a qualidade com sobra.' }],
  ['c07', 'c-C', 'c', '(c) C', '11... Bg5 12 Nc2 Rb8 13 a3 a5 14 Bd3 O-O 15 Qe2 Na7 16 h4 Bh6 17 g4 Bf4 18 Qf3', { a: '±', r: 'Nisipeanu–Rogozenko, Bucareste 1995', c: '11...Bg5 12.Nc2 Rb8 é sensato; talvez o melhor seja 13.a3 a5 14.Bd3, com vantagem das brancas.' }],
  ['c07-c-C', '1', 'c', '(c) C 13.a4', '13 a4 bxa4 14 Ncb4 Bd7', { a: '∞', c: '13.a4 bxa4 14.Ncb4 Bd7! seria agudo e pouco claro.' }],
  ['c07', 'd', 'd', '(d)', '13 Be2 Ne7 14 Ncb4 a5 15 Nxe7+ Qxe7 16 Nd5 Qb7 17 Qd3 b4', { a: '⩱', r: 'Kamsky–Lautier, Dos Hermanas 1995', c: '13.Be2 é lento demais: depois de 13...Ne7 as pretas ganham jogo ativo.' }],
  ['c07', 'e', 'e', '(e)', '15 Bc4 Rb8 16 b3 Kh8 17 O-O f5 18 exf5 Bxf5 19 Nce3 Bg6 20 Be2 Bf7 21 Nc4 e4 22 Kh1 Bg8', { a: '=', r: 'Leko–Gelfand, Polanica Zdrój 1998', c: 'Depois de 14...a5 15.Bc4 Rb8 16.b3 as chances ficam iguais.' }],
  ['c07-e', '1', 'e', '(e) 15.Bb5', '15 Bb5 Ne7 16 Ncb4 Bh3 17 Nxe7+ Qxe7 18 Nd5 Qb7 19 Bc4 Bd7 20 Ra2 Kh8 21 O-O f5', { a: '=', r: 'Domínguez–Leko, Yerevan 2001', c: 'As brancas podem tentar 15.Bb5!? Ne7 16.Ncb4 Bh3!?, mas o jogo também fica igual.' }],
  ['c07-e', '2', 'e', '(e) 14...Rb8', '14... Rb8 15 h4 Bh6 16 Bxa6 Rxb2 17 Bxc8 Qxc8 18 Rc4 Qb8 19 O-O', { a: '±', r: 'Iordachescu–Sawatzki, Berlim 1995', c: '14...a5 é melhor que 14...Rb8?! 15.h4!, que deixa as brancas melhor.' }],
  // Coluna 8
  ['c08', 'f', 'f', '(f)', '13 Be2 Bg5 14 O-O Be6', { a: '⩲', c: 'O lance de Kasparov 13.h4 pôs 12...Rb8 em dúvida. Com 13.Be2 Bg5 14.O-O Be6 as brancas só jogam por uma vantagem mínima.' }],
  ['c08', 'g-A', 'g', '(g) A', '13... g6 14 g3 Be6 15 h5 Bg7 16 Bh3 a5 17 Nce3', { a: '±', r: 'J. Polgár–Illescas, León 1996', c: '13...g6 14.g3 Be6 15.h5 deixa as brancas melhor.' }],
  ['c08', 'g-B', 'g', '(g) B', '13... Be7 14 a3 Be6 15 Ncb4', { a: '⩲', r: 'Topalov–Leko, Dortmund 2005', c: '13...Be7 14.a3 Be6 15.Ncb4 dá uma pequena vantagem às brancas.' }],
  ['c08', 'h', 'h', '(h)', '15 Qd2 f5 16 Qg5+ Kh8 17 Qf6+ Kg8 18 O-O-O Be6 19 Bd3 Nc6 20 Qh6', { a: '⩲', r: 'Kamsky–Benjamin, Campeonato dos EUA 2004', c: 'Com 15.Qd2 f5 16.Qg5+ a dama branca entra na ala do rei, e as brancas ficam com uma pequena vantagem.' }],
  // Coluna 9
  ['c09', 'i', 'i', '(i)', '11 c4 Nxe4 12 cxb5 Be6 13 Bc4 Ne7 14 Be3 Qa5+ 15 Kf1 Rb8', { a: '∞', r: 'Peschlow–Guthrie, Biel 2005', c: 'As brancas podem repetir a posição com 11.Bg5 ou tentar 11.c4 Nxe4 12.cxb5, com um jogo pouco claro.' }],
  ['c09-i', '1', 'i', '(i) 14...Rc8', '14... Rc8 15 Nxe7', { c: '14...Rc8 15.Nxe7! é bom para as brancas.' }],
  ['c09-i', '2', 'i', '(i) 11.Bg5', '11 Bg5', { c: '11.Bg5 repete a posição.' }],
  ['c09', 'j', 'j', '(j)', '12 c4 Qg6 13 f3 Be7 14 cxb5 Bh4+ 15 g3 Bxg3+ 16 hxg3 Qxg3+ 17 Ke2 Bg4 18 Ke3 f5 19 bxc6 fxe4', { a: '⩲', r: 'Beikert–Conquest, Baden-Baden 1993', c: '12.c4 Qg6 13.f3 leva a uma posição selvagem, provavelmente favorável às brancas.' }],
  ['c09-j', '1', 'j', '(j) 15...Nd4', '15... Nd4 16 Be3 O-O 17 Bxd4 exd4 18 Qd2 d5 19 Bd3 Bg5', { a: '∞', r: 'Anand–Hergott, Olimpíada de Salônica 1984', c: 'As pretas podem sacrificar só peões com 15...Nd4, com um jogo pouco claro.' }],
  ['c09', 'k', 'k', '(k)', '12... d5 13 exd5 Nb4 14 Be4 Qh4 15 Qe2 f5 16 d6', { a: '±', r: 'J. Díaz–A. Hernández, Cuba 1997', c: '12...d5?! 13.exd5 Nb4 14.Be4 deixa as brancas melhor depois de 16.d6!.' }],
  ['c09', 'l', 'l', '(l)', '15 Qf3 Bg4 16 Qe3 b4', { a: '=', r: 'Del Río–Illescas, Espanha 2003', c: 'Com 15.Qf3 Bg4 16.Qe3 b4 o jogo fica igual.' }],
  // Coluna 10
  ['c10', 'm', 'm', '(m)', '10... Qxf6 11 Nb6 Rb8 12 Ncd5 Qd8 13 c3 Be7 14 a4 Bg5 15 Bc4 O-O 16 O-O', { a: '±', r: 'Herrera–Cifuentes, Cuba 1996', c: '10...Qxf6 11.Nb6 dá às brancas o controle da ala da dama e do centro.' }],
  ['c10', 'n', 'n', '(n)', '12... Qb6 13 O-O Qxb2 14 Ncd5 Bxd5 15 exd5 Qd4 16 Rb1 Rc7 17 Qf3', { a: '⩲', r: 'Geenen–Prasad, Olimpíada de Novi Sad 1990', c: '12...Qb6 13.O-O Qxb2 ganha um peão, mas as brancas ficam com uma pequena vantagem.' }],
  ['c10', 'o', 'o', '(o)', '15 Qf3 h5 16 Nd5 Bxd5 17 exd5 Rh6 18 Rab1 Qa5 19 e4 f5 20 a3 f4 21 Kh1 Ng6 22 b4 Qd8 23 c4', { a: '±', r: 'Fogarasi–Rovid, Hungria 1991', c: 'Com 15.Qf3 h5 16.Nd5 as brancas ficam melhor.' }],
  // Coluna 11
  ['c11', 'p', 'p', '(p)', '7 a4 a6 8 Na3 Be7 9 Bc4 O-O 10 O-O Be6 11 Bg5 Bxc4 12 Nxc4 Nxe4 13 Bxe7 Nxe7 14 Nxe4 d5', { a: '=', r: 'Howell–Nunn, Hastings 1994', c: '7.a4 é lento demais para manter a iniciativa.' }],
  ['c11', 'q', 'q', '(q)', '8... Ne7 9 c3 Nf5 10 a4 Be7 11 Bd3 O-O 12 O-O Nh4 13 f4 a6 14 Na3 exf4 15 Bxf4 Ng6 16 Bxg6 fxg6 17 Nc4 Qc7 18 b3 Bf5 19 a5 Be4', { a: '=', r: 'Ye–Novik, Olimpíada de Moscou 1994', c: 'As pretas também podem jogar 8...Ne7 9.c3 Nf5, com igualdade.' }],
  ['c11', 'r', 'r', '(r)', '11 Be3 O-O 12 Bd3 f5 13 f4 Bh4+ 14 g3 exf4 15 Bxf4 Re8+ 16 Ne2 Bf6 17 Qc2 b5', { a: '=', r: 'Akopian–Stephens, EUA 1993', c: 'Com 11.Be3 O-O 12.Bd3 f5 o jogo fica igual depois de 17...b5.' }],
  ['c11', 's', 's', '(s)', '15 Qc2 exf4 16 gxf4 Bd4+', { a: '=', r: 'Yudasin–Kramnik, match 1994', c: 'Com 15.Qc2 exf4 16.gxf4 Bd4+ o jogo fica igual.' }],
  // Coluna 12
  ['c12', 't-A', 't', '(t) A', '6 Nb3 Bb4 7 Bc4 Nxe4 8 Bxf7+ Kxf7 9 Qd5+ Kf8 10 Qxe4 d5', { a: '∓', c: 'Outros lances dão pouca chance de vantagem: 6.Nb3 Bb4 7.Bc4?! Nxe4 deixa as pretas um pouco melhor.' }],
  ['c12', 't-B', 't', '(t) B', '6 Nf5 d5 7 exd5 Bxf5 8 dxc6 bxc6', { a: '=', c: '6.Nf5 d5 7.exd5 Bxf5 8.dxc6 bxc6 é igual.' }],
  ['c12', 'u-A', 'u', '(u) A', '7 Bg5 h6', { a: '⩱', c: 'Depois de 7.Bg5 h6 as pretas ganham a iniciativa.' }],
  ['c12', 'u-B', 'u', '(u) B', '7 Bd3 d5', { a: '⩱', c: 'Depois de 7.Bd3 d5 as pretas também ganham a iniciativa.' }],
  ['c12', 'v', 'v', '(v)', '7... Nxe4 8 O-O Nxc3 9 bxc3 Be7 10 Qd5 O-O 11 Nxe5 d6', { a: '=', r: 'Kofidis–Makropoulou, Campeonato Grego 1994', c: 'Também é bom 7...Nxe4, com igualdade. A coluna é Mukhin–Minasian, Leningrado 1990.' }],
]

const capitulo = {
  id: 'siciliana-sveshnikov-b',
  arquivo: 'siciliana-sveshnikov-b',
  nome: 'Siciliana Sveshnikov B — 9.Nd5, 8...Be6, 7.Nd5 e 6.Nf3',
  fonte: 'Modern Chess Openings — Sicilian Defense, Sveshnikov Variation (pp. 341–343), colunas 7–12',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5',
  corPadrao: 'b',
  ordem: 341,
  grupos: [
    { id: 'na3', nome: '6.Ndb5 d6 7.Bg5 a6 8.Na3', colunas: [7, 8, 9, 10] },
    { id: 'outros', nome: '7.Nd5 e 6.Nf3', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
