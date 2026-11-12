// Transcrição do MCO 15ª ed. — Siciliana, segundos lances incomuns (pp. 360–361), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-incomuns
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-incomuns-dicas.cjs.
//
// Colunas 1–5 terminam sem avaliação na tabela; a avaliação vem da nota que continua cada coluna.
// A coluna 5 termina num lance das brancas (9.Bc4); a continuação 9...Qe4+ está na nota (q).

const B = '1 e4 c5'

const colunas = {
  c01: [`${B} 2 Nf3 Nf6 3 e5 Nd5 4 Nc3 e6 5 Nxd5 exd5 6 d4 Nc6 7 dxc5 Bxc5 8 Qxd5 Qb6 9 Bc4 Bxf2+`, 'nf6', 'Nimzowitsch 3.e5 Nd5 4.Nc3', '±',
    'Na Variante Nimzowitsch, 2...Nf6 convida 3.e5. Depois de 4.Nc3 e6 5.Nxd5 exd5 as pretas sacrificam um peão por desenvolvimento rápido; com o famoso 9...Bxf2+ surge uma luta aguda, mas as brancas ficam melhor.'],
  c02: [`${B} 2 Nf3 Nf6 3 Nc3 Nc6 4 d4 d5 5 exd5 Nxd5 6 Nxd5 Qxd5 7 Be3 cxd4 8 Nxd4 Qa5+ 9 c3 Nxd4`, 'nf6', '3.Nc3 Nc6 4.d4 d5', '⩲',
    'Com 3.Nc3 as brancas recusam o convite de 3.e5. As pretas abrem o centro com 4...d5, trocam peças e caem num final em que as brancas mantêm pequena vantagem.'],
  c03: [`${B} 2 Nf3 a6 3 c4 Nc6 4 d4 cxd4 5 Nxd4 Nf6 6 Nc3 e5 7 Nf5 d5 8 cxd5 Bxf5 9 exf5 Nd4`, 'a6', '2...a6 3.c4', '±',
    'A Variante O\'Kelly, 2...a6, prepara uma armadilha contra 3.d4. Com 3.c4 as brancas fixam o centro, e depois de 7.Nf5 d5 8.cxd5 ficam melhor.'],
  c04: [`${B} 2 g3 d5 3 exd5 Qxd5 4 Nf3 Nc6 5 Bg2 Qe6+ 6 Kf1 g6 7 Nc3 Bg7 8 d3 Nf6 9 Be3 Nd5`, 'g3', '2.g3 d5', '=',
    'Contra 2.g3 as pretas atacam logo com 2...d5. A dama é expulsa com ganho de tempo, mas o xeque 5...Qe6+ tira das brancas o direito de rocar, e o jogo fica igual.'],
  c05: [`${B} 2 b4 cxb4 3 a3 d5 4 exd5 Qxd5 5 Nf3 e5 6 axb4 Bxb4 7 c3 Bc5 8 Na3 Nf6 9 Bc4`, 'b4', 'Gambito do Flanco 2.b4', '∓',
    'No Gambito do Flanco as brancas entregam o peão b para desviar o peão c5 e dominar o centro. Com 3...d5 as pretas devolvem a iniciativa, e as brancas não têm compensação suficiente pelo peão.'],
  c06: [`${B} 2 b3 Nc6 3 Bb2 d6 4 Bb5 Bd7 5 f4 Nf6 6 Nc3 e6 7 Nf3 Be7 8 O-O O-O 9 Bxc6 Bxc6`, 'b3', '2.b3', '=',
    'Com 2.b3 o bispo da dama vai para a grande diagonal. As pretas se desenvolvem com calma e igualam. A coluna é Root–Weinstein, Lone Pine 1979.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '4 d4 cxd4 5 Qxd4 e6 6 Bc4 Nc6 7 Qe4 d6 8 exd6 Nf6 9 Qe2 Bxd6 10 Nc3 a6 11 Bg5 h6', { a: '=', r: 'Tkachiev–Shirazi, França 1996', c: '4.d4 cxd4 5.Qxd4 e6 6.Bc4 leva à igualdade.' }],
  ['c01', 'b', 'b', '(b)', '4... Nxc3 5 dxc3 Nc6 6 Bf4 e6 7 Qd2 Qc7 8 O-O-O h6 9 h4 b6 10 Bc4 Bb7 11 Qe2', { a: '⩲', c: '4...Nxc3 5.dxc3 dá pequena vantagem às brancas (Nunn).' }],
  ['c01', 'c', 'c', '(c)', '6... d6 7 Bb5+ Nc6 8 O-O Be7 9 exd6 Qxd6 10 dxc5 Qxc5 11 Qd3 O-O 12 Be3 Qd6 13 c3', { a: '⩲', r: 'Alda–Rossetto, Buenos Aires 1991', c: '6...d6 7.Bb5+ Nc6 8.O-O dá pequena vantagem às brancas.' }],
  ['c01', 'd', 'd', '(d)', '8... d6 9 exd6 Qb6 10 Qe4+ Be6 11 Qh4 Bxd6 12 Bd3 Nb4 13 O-O Nxd3 14 cxd3', { a: '⩲', r: 'van der Wiel–Afek, Hoogeveen 2004', c: '8...d6 9.exd6 Qb6 dá pequena vantagem às brancas.' }],
  ['c01', 'e', 'e', '(e)', '10 Ke2 O-O 11 Rf1 Bc5 12 Ng5 Nxe5 13 Qxe5 d5 14 Qxd5 Re8+ 15 Kf3 Qf6+ 16 Kg3 Bd6+ 17 Rf4 Be6 18 Nxe6 Rxe6 19 Qxd6 Qg6+ 20 Rg4 Re3+ 21 Bxe3 Qxd6+ 22 Kf2', { a: '+−', r: 'Spassky–Ćirić, Mariánské Lázně 1962', c: 'Depois de 10.Ke2 O-O 11.Rf1 Bc5 12.Ng5! as brancas chegam a uma posição vencedora.' }],
  ['c01-e', '1', 'e', '(e) 12...Nd4+', '12... Nd4+ 13 Kd1 Ne6 14 Ne4 d6 15 exd6 Rd8 16 Bd3 Bxd6 17 Qh5', { a: '±', c: '12...Nd4+ 13.Kd1 Ne6 também deixa as brancas melhor.' }],
  ['c01-e', '2', 'e', '(e) 14.Bxd5', '14 Bxd5 Bg4+ 15 Kd3 Rae8 16 Bxf7+ Kh8 17 Bxe8 Rxf1 18 Bd2 Rf2', { a: '∓', r: 'Kaidanov–Kreitner, Chicago 1995', c: '14.Bxd5? Bg4+ 15.Kd3 Rae8! vira o jogo a favor das pretas.' }],
  ['c01-e', '3', 'e', '(e) 14...Bg4+', '14... Bg4+ 15 Rf3', { a: '±', c: 'As pretas podem melhorar com 14...Bg4+ 15.Rf3, mas as brancas continuam melhor.' }],
  // Coluna 2
  ['c02', 'f', 'f', '(f)', '3... d5 4 exd5 Nxd5 5 Bb5+ Nc6 6 O-O Bg4 7 h3 Bh5 8 g4 Bg6 9 Ne5 Qd6 10 Nc4 Qd7 11 Qf3 e6 12 Ne5 Qd6 13 d4 cxd4 14 Nxd5 exd5 15 Bf4 Qc5 16 Nxg6 hxg6 17 Rfe1+ Kd7 18 Re5', { a: '+−', r: 'Wibe–Svenneby, por correspondência 1990', c: '3...d5 4.exd5 Nxd5 5.Bb5+ Nc6 6.O-O Bg4 7.h3 Bh5?! leva a um ataque branco decisivo: depois de 18.Re5! as pretas abandonaram.' }],
  ['c02-f', '1', 'f', '(f) 5...Bd7', '5... Bd7 6 Qe2', { c: '5...Bd7 6.Qe2! é a alternativa.' }],
  ['c02-f', '2', 'f', '(f) 7...Bxf3', '7... Bxf3', { a: '⩲', c: '7...Bxf3 é melhor, mas as brancas mantêm pequena vantagem.' }],
  ['c02', 'g-A', 'g', '(g) A', '8... Nxd4 9 Qxd4 Qxd4 10 Bxd4', { a: '⩲', c: '8...Nxd4 9.Qxd4 Qxd4 10.Bxd4 também deixa às brancas o melhor final.' }],
  ['c02', 'g-B', 'g', '(g) B', '8... Bd7 9 Nb5 Qxd1+ 10 Rxd1 Rc8 11 Nxa7 Nxa7 12 Bxa7 Rxc2 13 Bd4 e5 14 Bd3 Bb4+ 15 Kf1 Rc8 16 Bxe5', { a: '±', r: 'Siero-González–Casafús, Río Gallegos 1986', c: '8...Bd7 9.Nb5 dá vantagem às brancas, sobretudo depois de 13...e5?.' }],
  ['c02', 'h', 'h', '(h)', '10 b4 Qe5 11 Qxd4 Qxd4 12 Bxd4 f6 13 f4 e6 14 g3 Bd6 15 O-O-O', { a: '⩲', r: 'Spassky–Přibyl, Tallinn 1973', c: 'Com 10.b4! Qe5 11.Qxd4 as brancas ficam com um final um pouco melhor.' }],
  // Coluna 3
  ['c03', 'i-A', 'i', '(i) A', '3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 e5 6 Nf3 Bb4', { r: 'Schmidt–O\'Kelly, Beverwijk 1964', c: 'Com 3.d4? as brancas caem na armadilha: depois de 5...e5! 6.Nf3 Bb4 as pretas ficam muito ativas.' }],
  ['c03', 'i-B', 'i', '(i) B', '3 c3', { c: '3.c3 é uma boa alternativa: as brancas têm uma versão melhorada da Siciliana com 2.c3, porque ...a6 é prematuro.' }],
  ['c03', 'j', 'j', '(j)', '10 Bd3 Nxd5 11 O-O Bb4 12 Be4 Nxc3 13 bxc3 Bxc3 14 Rb1 O-O 15 Rxb7', { a: '±', c: '10.Bd3 Nxd5 11.O-O dá vantagem às brancas.' }],
  // Coluna 4
  ['c04', 'k', 'k', '(k)', '2... g6', { c: 'As pretas podem jogar 2...g6, 2...d6, 2...Nc6 ou 2...e6, que provavelmente transpõem para as variantes fechadas vistas antes.' }],
  ['c04', 'l', 'l', '(l)', '4... Bg4 5 Bg2 Qe6+ 6 Kf1 Nc6 7 h3 Bh5 8 Nc3 Nf6 9 d3 Qd7 10 g4 Bg6 11 Bf4 e6 12 Ne5 Nxe5 13 Bxe5 Bd6 14 Bxd6 Qxd6 15 Bxb7', { a: '⩲', r: 'Byklum–Carlsen, Copa Politiken 2003', c: '4...Bg4 é uma faca de dois gumes: depois de 15.Bxb7 as brancas ficam com pequena vantagem.' }],
  ['c04', 'm', 'm', '(m)', '10 Bd2 Nxc3 11 Bxc3 Bxc3 12 bxc3 Qf6', { a: '=', r: 'Sepp–Dreev, Olimpíada de Moscou 1994', c: 'Depois de 10.Bd2 Nxc3 as pretas ficam pelo menos com igualdade.' }],
  // Coluna 5
  ['c05', 'n', 'n', '(n)', '2 Nf3 d6 3 b4 cxb4 4 d4 Nf6 5 Bd3 e6 6 O-O Be7 7 Nbd2 d5 8 e5 Nfd7', { a: '∓', r: 'Cordon–Gligorić, Hastings 1969/70', c: 'O Gambito do Flanco adiado, 2.Nf3 d6 3.b4, é duvidoso.' }],
  ['c05', 'o', 'o', '(o)', '3... bxa3 4 Nxa3 d6 5 Bb2 Nc6 6 d4 Nf6 7 Bd3 e6 8 Nf3 Be7 9 O-O O-O 10 c4 b6 11 Qe2 Bb7', { a: '=', r: 'Marshall–Sämisch, Baden-Baden 1925', c: 'Aceitar o gambito com 3...bxa3 dá às brancas jogo razoável pelo peão.' }],
  ['c05', 'p', 'p', '(p)', '7 Na3 Bxa3 8 Bxa3 Nc6 9 c4 Qd8 10 Qb1 Nge7', { a: '=', r: 'Bronstein–Benko, Moscou x Budapeste 1949', c: 'A linha antiga 7.Na3 Bxa3 8.Bxa3 dá igualdade às brancas.' }],
  ['c05', 'q-A', 'q', '(q) A', '9 Nb5 O-O 10 Nc7 Bxf2+ 11 Kxf2 Qc5+', { a: '−+', c: 'As brancas não podem jogar 9.Nb5 O-O 10.Nc7, por causa de 10...Bxf2+! 11.Kxf2 Qc5+, que ganha o cavalo.' }],
  ['c05', 'q-B', 'q', '(q) B', '9... Qe4+ 10 Be2 O-O 11 Nb5 Na6', { a: '∓', r: 'Porrasmaa–Kask, por correspondência 1987', c: 'Depois de 9.Bc4 Qe4+ 10.Be2 O-O 11.Nb5 Na6 as brancas não têm compensação suficiente pelo peão.' }],
  // Coluna 6
  ['c06', 'r-A', 'r', '(r) A', '2 Ne2 d6 3 g3 g6 4 Bg2 Bg7 5 O-O Nc6 6 c3 e5 7 d3 Nge7 8 a3 O-O 9 b4 b6', { a: '=', r: 'Keres–Fischer, Torneio de Candidatos de Curaçao 1962', c: 'Outro lance raro é 2.Ne2, com igualdade.' }],
  ['c06', 'r-B', 'r', '(r) B', '2 Bc4 e6 3 Nc3 a6 4 a4 Nc6 5 d3 g6 6 f4 Bg7 7 Nf3 Nge7 8 O-O O-O', { a: '=', r: 'MacDonnell–Burn, Londres 1862', c: '2.Bc4 e6 3.Nc3 a6 também é igual.' }],
  ['c06', 'r-C', 'r', '(r) C', '2 c4 Nc6 3 Nf3 e5', { a: '=', c: '2.c4 Nc6 3.Nf3 e5 é igual.' }],
  ['c06', 's-A', 's', '(s) A', '2... e6 3 Bb2 d5 4 Bb5+ Nc6 5 exd5 exd5 6 Nf3 Qe7+', { a: '=', r: 'Bošković–Micić, Iugoslávia 1993', c: 'As pretas têm várias respostas razoáveis, como 2...e6 3.Bb2 d5, com igualdade.' }],
  ['c06', 's-B', 's', '(s) B', '2... Nf6 3 e5 Nd5 4 Bb2 g6 5 g3 Bg7 6 Bg2 Nc7 7 Qc1 Nc6 8 f4 O-O 9 Nf3 d6', { a: '=', r: 'Blatný–Jirovský, República Tcheca 1996', c: '2...Nf6 3.e5 Nd5 4.Bb2 g6!? também é igual.' }],
  ['c06', 't', 't', '(t)', '4 f4 Nf6 5 Nc3 g6 6 g3 Bg7 7 Bg2 O-O', { a: '=', r: 'Spassky–Najdorf, Bugojno 1982', c: '4.f4 Nf6 5.Nc3 g6 também leva à igualdade.' }],
]

const capitulo = {
  id: 'siciliana-incomuns',
  arquivo: 'siciliana-incomuns',
  nome: 'Siciliana — Segundos lances incomuns',
  fonte: 'Modern Chess Openings — Sicilian Defense, Unusual Second Moves (pp. 360–361), colunas 1–6',
  base: '1. e4 c5',
  corPadrao: 'b',
  ordem: 360,
  grupos: [
    { id: 'nf6', nome: '2.Nf3 Nf6 (Nimzowitsch)', colunas: [1, 2] },
    { id: 'a6', nome: '2.Nf3 a6 (O\'Kelly)', colunas: [3] },
    { id: 'g3', nome: '2.g3', colunas: [4] },
    { id: 'b4', nome: 'Gambito do Flanco 2.b4', colunas: [5] },
    { id: 'b3', nome: '2.b3', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
