// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante do Dragão: Clássico Menor, Levenfish e outros (pp. 282–283), colunas 25–30.
// Gerar: node scripts/mco/gerar.cjs siciliana-dragao-e
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-dragao-e-dicas.cjs.
//
// A tabela traz avaliação no fim das colunas 27–29; nas outras a avaliação vem da última nota.

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 g6'

const colunas = {
  c25: [`${B} 6 Be2 Bg7 7 O-O O-O 8 Nb3 Nc6 9 Bg5 Be6 10 f4 b5 11 Bf3 b4 12 Nd5 a5 13 a4 bxa3`, 'be2', '6.Be2 Bg7 7.O-O', '=',
    'No Clássico Menor as brancas jogam 6.Be2 e roque pequeno, mas sem Be3. Com 8.Nb3 e 9.Bg5 o bispo vai para g5; as pretas respondem com 10...b5! e contra-atacam na ala da dama, com igualdade.'],
  c26: [`${B} 6 Be2 Bg7 7 Be3 Nc6 8 Qd2 Ng4 9 Bxg4 Bxg4 10 f3 Bd7 11 Nxc6 bxc6 12 Bh6 Bxh6 13 Qxh6 Qa5`, 'be2', '7.Be3 Nc6 8.Qd2', '=',
    'Com 7.Be3 e 8.Qd2 as brancas adiam o roque. As pretas respondem com 8...Ng4 e trocam o bispo de e3; fica igual.'],
  c27: [`${B} 6 f4 Nc6 7 Nxc6 bxc6 8 e5 Nd7 9 exd6 exd6 10 Be3 Be7 11 Qf3 d5 12 O-O-O O-O 13 g4 Bf6`, 'levenfish', '6.f4 Nc6!', '=',
    'Na Variante Levenfish as brancas jogam 6.f4 e ameaçam e5. O melhor é 6...Nc6!, e depois de 7.Nxc6 bxc6 8.e5 Nd7 as pretas igualam (Tarjan–Timman, Veneza 1974).'],
  c28: [`${B} 6 f4 Bg7 7 e5 dxe5 8 fxe5 Nfd7 9 e6 Ne5 10 Bb5+ Nbc6 11 exf7+ Kf8 12 Nxc6 Qxd1+ 13 Nxd1`, 'levenfish', '6...Bg7', '±',
    'Com 6...Bg7 as pretas permitem 7.e5. Depois de 7...dxe5?! e 9.e6 as brancas ficam melhor no final (Dzafarov–Guseynov, por correspondência 1975).'],
  c29: [`${B} 6 f4 Nbd7 7 Be2 Bg7 8 O-O O-O 9 Bf3 a6 10 Nb3 Nb6 11 a4 Be6 12 a5 Nc4 13 g4`, 'levenfish', '6...Nbd7', '±',
    'Com 6...Nbd7 as pretas impedem e5. As brancas ganham espaço com 11.a4! e 13.g4 e ficam melhor (Ely–Miles, Birmingham 1973).'],
  c30: [`${B} 6 g3 Nc6 7 Nde2 Bg7 8 Bg2 O-O 9 O-O Rb8 10 a4 a6 11 Nd5 b5 12 axb5 axb5 13 Bg5 Nd7`, 'g3', '6.g3', '=',
    'Com 6.g3 as brancas fazem o fianqueto do bispo de f1. Depois de 7.Nde2 as pretas avançam ...b5 na ala da dama e ficam iguais.'],
}

const notas = [
  // Coluna 25
  ['c25', 'a', 'a', '(a)', '9 Kh1 a5 10 a4 Be6 11 f4 Bxb3 12 cxb3 Nb4 13 Bf3 e6 14 Be3 Qc7', { a: '=', r: 'Malofeev–Krylov, Zima 2007', c: 'Com 9.Kh1 a5 10.a4 fica igual.' }],
  ['c25', 'b', 'b', '(b)', '9... a5 10 a4 Be6 11 Kh1 Rc8 12 f4 Nb4 13 Nd4 Bc4 14 Ndb5 Bxe2 15 Qxe2 Rc5 16 Rad1', { a: '⩲', r: 'Fishbein–Olesen, Filadélfia 1992', c: 'Com 9...a5 as brancas ficam um pouco melhor depois de 14.Ndb5!.' }],
  ['c25', 'c', 'c', '(c)', '10 Kh1 Na5 11 f4 Nc4 12 f5 Nxb2 13 Qc1 Bc4 14 e5 Bxe2 15 Nxe2 Ne4 16 f6 exf6 17 exf6 Re8', { a: '∓', r: 'Khalifman–Savchenko, URSS 1984', c: 'Com 10.Kh1 Na5 o cavalo preto chega a c4 e pega b2; depois de 13.Qc1?! e 17...Re8! as pretas ficam um pouco melhor.' }],
  ['c25-c', '1', 'c', '(c) 13.Qe1', '13 Qe1', { a: '=', c: '13.Qe1 é igual.' }],
  ['c25', 'd', 'd', '(d)', '14 Rxa3 a4 15 Bxf6 Bxf6 16 Nxf6+ exf6 17 Nd4 Qb6 18 c3 Bb3', { a: '=', r: 'Ye–Ljubojević, Olimpíada de Moscou 1994', c: 'Depois de 14.Rxa3 a4 e das trocas em f6 fica igual.' }],
  // Coluna 26
  ['c26', 'e', 'e', '(e)', '7... Nbd7 8 O-O a6 9 a4', { c: '7...Nbd7 8.O-O a6 9.a4 dá um híbrido de Najdorf e Dragão em que as pretas têm dificuldade para liberar a posição.' }],
  ['c26', 'f', 'f', '(f)', '8 Nb3 O-O 9 f4 Be6 10 g4 Na5 11 g5 Nd7 12 Bd4 f6 13 gxf6 Nxf6 14 Qd2 Rc8 15 f5 Bf7', { a: '=', r: 'Shabalov–Finegold, Key West 1994', c: '8.Nb3 O-O 9.f4 Be6 10.g4 é uma tentativa de esmagar as pretas na ala do rei; com 12...f6! elas igualaram.' }],
  ['c26', 'g', 'g', '(g)', '14 Qg7 Rf8 15 Qd4 Qb6', { a: '=', r: 'Kurochkin–Kotsur, Liga Russa 2001', c: 'Depois de 14.Qg7 Rf8 15.Qd4 Qb6 fica igual.' }],
  // Coluna 27
  ['c27', 'h-A', 'h', '(h) A', '7 Bb5 Bd7 8 Bxc6 Bxc6 9 e5 dxe5 10 fxe5 Ne4 11 Nxe4 Bxe4 12 O-O Bg7', { a: '=', r: 'Penrose–Barden, Hastings 1957/58', c: 'Com 7.Bb5 Bd7 e 10...Ne4! fica igual.' }],
  ['c27', 'h-B', 'h', '(h) B', '7 Nf3 Bg7 8 Bd3 O-O 9 O-O a6', { a: '=', c: 'Com 7.Nf3 fica igual.' }],
  ['c27', 'i', 'i', '(i)', '8... dxe5 9 Qxd8+ Kxd8 10 fxe5 Nd5 11 Bd2 Bg7 12 O-O-O Kc7 13 Nxd5+ cxd5 14 c4', { a: '⩲', r: 'Adianto–Babu, Madras 1996', c: '8...dxe5?! troca as damas, e depois de 14.c4 as brancas ficam um pouco melhor.' }],
  ['c27', 'j', 'j', '(j)', '9 Qf3 Bg7 10 Bb5 O-O 11 Bxc6 Rb8', { a: '=', r: 'Bronstein–Vasiukov, Campeonato da URSS 1959', c: 'Contra 9.Qf3 as pretas simplesmente desenvolvem e entregam o peão de c6 em troca de tempo; fica igual.' }],
  ['c27', 'k', 'k', '(k)', '10 Qd4 Nf6 11 Be3 Be7 12 Be2 O-O 13 O-O c5 14 Qd2 d5 15 Bf3 Bb7 16 Rad1 Rb8', { a: '=', r: 'Szabo–Reshevsky, Helsinque 1952', c: 'Com 10.Qd4 fica igual.' }],
  ['c27', 'l', 'l', '(l)', '11 Qd2 O-O 12 O-O-O Nb6 13 Be2 d5 14 h4 h5 15 g4 Bxg4 16 Bxg4 Nc4 17 Qd3 Qb8 18 b3', { r: 'Larsen–Lein, Lone Pine 1979', c: '11.Qd2 O-O 12.O-O-O Nb6 13.Be2 d5 14.h4 h5! 15.g4?! Bxg4 16.Bxg4 Nc4 17.Qd3 Qb8! 18.b3.' }],
  ['c27-l', '1', 'l', '(l) 18...Nxe3', '18... Nxe3 19 Qxe3 Re8 20 Qd2 hxg4 21 h5 Qd6', { a: '∓', c: 'Agora 18...Nxe3 19.Qxe3 Re8 20.Qd2 hxg4 21.h5 Qd6 é favorável às pretas, embora complicado.' }],
  // Coluna 28
  ['c28', 'm', 'm', '(m)', '7... Nh5 8 Bb5+ Bd7 9 e6 fxe6 10 Nxe6 Bxc3+ 11 bxc3 Qc8 12 Bxd7+ Kxd7 13 Ng5 Qxc3+ 14 Bd2 Qc4 15 Rb1 b6', { a: '∞', r: 'Conquest–W. Watson, Inglaterra 1989', c: 'As pretas talvez ainda consigam igualar com 7...Nh5; o jogo fica pouco claro.' }],
  ['c28', 'n', 'n', '(n)', '8... Ng4 9 Bb5+ Kf8 10 Ne6+', { a: '+−', c: 'Um erro comum é 8...Ng4? 9.Bb5+ Kf8? 10.Ne6+, que ganha a dama.' }],
  ['c28-n', '1', 'n', '(n) 9...Bd7', '9... Bd7 10 Qxg4', { a: '+−', c: '9...Bd7 10.Qxg4 também ganha.' }],
  ['c28', 'o', 'o', '(o)', '11... Kxf7 12 O-O+ Bf6 13 Nxc6 bxc6 14 Qxd8 Rxd8 15 Ba4 Ba6 16 Re1', { a: '⩲', r: 'San Pedro–Díaz, Vasallo 1993', c: 'Com 11...Kxf7 12.O-O+ as brancas ficam um pouco melhor no final.' }],
  // Coluna 29
  ['c29', 'p', 'p', '(p)', '7 Nf3 Qc7 8 Bd3 a6 9 O-O Bg7', { c: '7.Nf3 Qc7 8.Bd3 a6 9.O-O Bg7 transpõe para a Najdorf, coluna 39.' }],
  ['c29', 'q', 'q', '(q)', '8 Be3 O-O 9 O-O a6 10 Bf3 e5 11 Nb3 exf4 12 Bxf4 Ne5 13 Qe2 Be6', { a: '=', r: 'V. Ristić–N. Ristić, Iugoslávia 1990', c: 'A combinação de Be3 e f4 não é a melhor contra este sistema; com 8.Be3 fica igual.' }],
  // Coluna 30
  ['c30', 'r', 'r', '(r)', '6 Bc4 Bg7 7 h3 Nc6 8 Be3 O-O 9 Bb3 Qa5 10 O-O', { c: '6.Bc4 Bg7 7.h3 Nc6 8.Be3 O-O 9.Bb3 Qa5 10.O-O transpõe para o Dragão Acelerado, coluna 3.' }],
  ['c30', 's', 's', '(s)', '6... Bg7 7 Bg2 O-O 8 h3 Nc6 9 Nb3 Rb8 10 a4 b6 11 O-O Bb7', { a: '=', r: 'Petursson–de Firmian, Akureyri 1994', c: 'Com 6...Bg7 e 9...Rb8! fica igual.' }],
  ['c30-s', '1', 's', '(s) 8.O-O', '8 O-O Bg4 9 Nde2 Qc8', { a: '=', c: '8.O-O Bg4! 9.Nde2 Qc8 é igual.' }],
  ['c30', 't', 't', '(t)', '7 Bg2 Nxd4 8 Qxd4 Bg7 9 O-O O-O', { a: '=', c: '7.Bg2 permite a troca 7...Nxd4!, com igualdade simples.' }],
  ['c30', 'u', 'u', '(u)', '7... Bd7 8 Bg2 Qc8 9 h3 Bg7 10 a4 O-O 11 Be3 Rd8 12 Qd2 Nb4 13 Rc1', { a: '⩲', r: 'Rechlis–Rachels, Interzonal de Manila 1990', c: 'Com 7...Bd7 as brancas ficam um pouco melhor.' }],
  ['c30', 'v', 'v', '(v)', '14 Ra2 h6 15 Bd2 Bb7 16 Bc3 Nde5 17 b3 e6', { a: '=', r: 'G. Hernández–Serper, Chicago 1997', c: 'Depois de 14.Ra2 fica igual.' }],
]

const capitulo = {
  id: 'siciliana-dragao-e',
  arquivo: 'siciliana-dragao-e',
  nome: 'Siciliana Dragão — Clássico Menor, Levenfish e 6.g3',
  fonte: 'Modern Chess Openings — Sicilian Defense, Dragon Variation, Minor Classical, Levenfish, Misc. (pp. 282–283), colunas 25–30',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6',
  corPadrao: 'b',
  ordem: 282,
  grupos: [
    { id: 'be2', nome: '6.Be2 (Clássico Menor)', colunas: [25, 26] },
    { id: 'levenfish', nome: '6.f4 (Levenfish)', colunas: [27, 28, 29] },
    { id: 'g3', nome: '6.g3', colunas: [30] },
  ],
}

module.exports = { capitulo, colunas, notas }
