// Transcrição do MCO 15ª ed. — Defesa Center Counter (Escandinava) (pp. 379–380), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs escandinava
// Formato: ver gambito-do-rei.cjs. Dicas em escandinava-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.

const B = '1 e4 d5 2 exd5'

const colunas = {
  c01: [`${B} Qxd5 3 Nc3 Qa5 4 d4 Nf6 5 Nf3 Bg4 6 h3 Bh5 7 g4 Bg6 8 Ne5 e6 9 Bg2 c6 10 h4 Be4`, 'qa5', '5.Nf3 Bg4 6.h3', '⩲',
    'Na Escandinava as pretas tomam em d5 de imediato. Com 2...Qxd5 3.Nc3 Qa5 a dama fica segura na borda; contra 5...Bg4 as brancas expulsam o bispo com h3 e g4, e depois de 8.Ne5 ficam com jogo ativo e uma pequena vantagem.'],
  c02: [`${B} Qxd5 3 Nc3 Qa5 4 d4 Nf6 5 Nf3 c6 6 Bc4 Bf5 7 Ne5 e6 8 g4 Bg6 9 h4 Nbd7 10 Nxd7 Nxd7`, 'qa5', '5...c6 6.Bc4 Bf5', '=',
    'Com 5...c6 e 6...Bf5 as pretas montam uma posição sólida, parecida com a Caro-Kann. As brancas atacam o bispo com Ne5, g4 e h4, mas depois da troca em d7 as pretas igualam.'],
  c03: [`${B} Qxd5 3 Nc3 Qa5 4 d4 Nf6 5 Bc4 c6 6 Bd2 Bf5 7 Nd5 Qd8 8 Nxf6+ gxf6 9 Bf4 Qb6 10 Bb3 a5`, 'qa5', '5.Bc4 c6 6.Bd2', '⩲',
    'Com 5.Bc4 e 6.Bd2 as brancas ameaçam o salto Nd5, que ataca a dama. Depois de 7.Nd5 Qd8 8.Nxf6+ gxf6 as pretas ficam com os peões dobrados, mas ganham a coluna g; as brancas mantêm uma pequena vantagem.'],
  c04: [`${B} Nf6 3 d4 Nxd5 4 Nf3 g6 5 c4 Nb6 6 Nc3 Bg7 7 c5 Nd5 8 Bc4 c6 9 O-O Be6 10 Qb3 Nxc3`, 'nf6', '2...Nf6 3.d4 Nxd5 4.Nf3 g6', '⩲',
    'Com 2...Nf6 as pretas recapturam com o cavalo. As brancas não devem segurar o peão; com 3.d4, 4.Nf3 e c4 elas ganham espaço. Contra o fianqueto 4...g6 o avanço 7.c5 dá às brancas uma pequena vantagem.'],
  c05: [`${B} Nf6 3 d4 Nxd5 4 Nf3 Bg4 5 Be2 Nc6 6 c4 Nb6 7 d5 Bxf3 8 gxf3 Ne5 9 Nc3 e6 10 Be3 Bb4`, 'nf6', '4...Bg4 5.Be2 Nc6', '⩲',
    'Com 4...Bg4 e 5...Nc6 as pretas pressionam d4. Depois de 6.c4 Nb6 7.d5 Bxf3 8.gxf3 o cavalo preto vai a e5, mas as brancas têm o par de bispos e uma pequena vantagem.'],
  c06: [`${B} Nf6 3 Bb5+ Bd7 4 Be2 Nxd5 5 d4 Bf5 6 Nf3 e6 7 a3 Be7 8 c4 Nb6 9 Be3 O-O 10 Nc3 Bf6`, 'bb5', '3.Bb5+ Bd7 4.Be2', '=',
    'Com 3.Bb5+ as brancas tentam segurar o peão, mas não devem. Depois de 4.Be2 Nxd5 as pretas recuperam o peão, desenvolvem-se com calma e ficam pelo menos iguais.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a-A', 'a', '(a) A', '3 Nf3 Bg4 4 Be2 Nc6 5 O-O O-O-O 6 h3 Bh5 7 Nc3 Qd7', { a: '=', r: 'Pucovski–Plenkovic, Croácia 2005', c: '3.Nf3 é razoável. Melhor que 3...e5?! é 3...Bg4 4.Be2 Nc6, com igualdade.' }],
  ['c01-a-A', '1', 'a', '(a) A 3...e5', '3... e5 4 Nc3', { a: '±', c: '3...e5?! 4.Nc3 favorece as brancas.' }],
  ['c01', 'a-B', 'a', '(a) B', '3 d4 e5 4 dxe5 Qxd1+ 5 Kxd1 Nc6', { a: '=', c: '3.d4 permite o contragolpe 3...e5! 4.dxe5 Qxd1+, com igualdade.' }],
  ['c01', 'b', 'b', '(b)', '3... Qd6 4 Nf3 Nf6 5 d4 c6 6 Ne5 Nbd7 7 Bf4 Nd5 8 Bg3 Nxc3 9 bxc3 Nxe5 10 Bxe5 Qg6 11 Rb1', { a: '⩲', r: 'L\'Ami–Grotenhuis, Hilversum 2006', c: '3...Qd6 está na moda, mas depois de 4.Nf3 Nf6 5.d4 c6 6.Ne5 as brancas ficam mais ativas.' }],
  ['c01-b', '1', 'b', '(b) 8...Qb4', '8... Qb4 9 a3', { c: '8...Qb4 9.a3! é bom para as brancas.' }],
  ['c01', 'c', 'c', '(c)', '4 Nf3 Nf6 5 Bc4 Nc6 6 d3 Bf5', { a: '=', c: 'O melhor é tomar conta do centro com 4.d4. O tímido 4.Nf3 Nf6 5.Bc4 Nc6 6.d3 dá igualdade.' }],
  ['c01', 'd', 'd', '(d)', '9 h4 Bb4 10 Rh3 Bxc3+ 11 bxc3 Nbd7 12 Nxd7 Nxd7 13 h5 Be4 14 Re3 Bc6 15 Bd2 O-O-O', { a: '=', r: 'Arnason–Rogers, Bor 1984', c: '9.h4 Bb4 10.Rh3 leva à igualdade.' }],
  ['c01', 'e-A', 'e', '(e) A', '10... Nbd7 11 Nxd7 Kxd7 12 Bd2 h5 13 g5 Ng8 14 d5', { a: '±', r: 'Smirin–Asanov, Pequim 1991', c: '10...Be4 é melhor que 10...Nbd7 11.Nxd7 Kxd7, que favorece as brancas depois de 14.d5!.' }],
  ['c01', 'e-B', 'e', '(e) B', '11 Bxe4 Nxe4 12 Qf3 Nd6 13 Bf4 f6 14 Nd3 Nb5 15 O-O', { a: '⩲', r: 'Hossain–Bakhmatov, Memorial Larl Mala 2000', c: 'Depois de 10...Be4 11.Bxe4 Nxe4 12.Qf3 as brancas têm jogo ativo.' }],
  // Coluna 2
  ['c02', 'f-A', 'f', '(f) A', '5... Bf5 6 Bc4 c6 7 Bd2', { c: '5...Bf5 6.Bc4 c6 7.Bd2 transpõe para a nota (g).' }],
  ['c02', 'f-B', 'f', '(f) B', '5... Nc6 6 Bb5 Bd7 7 Bd2 O-O-O 8 a4', { a: '±', r: 'Psakhis–Efimov, Lenk 1991', c: '5...Nc6?! 6.Bb5 Bd7 7.Bd2 favorece as brancas.' }],
  ['c02', 'g', 'g', '(g)', '6... Bg4 7 h3 Bh5 8 Bd2 e6 9 Qe2 Bb4 10 O-O-O Nbd7 11 g4 Bg6 12 Kb1 O-O-O 13 a3 Bxc3 14 Bxc3 Qc7 15 Bd2 Ne4 16 Bc1 Nb6 17 Bd3', { a: '⩲', r: 'Dolmatov–Rogers, Tallinn 1985', c: '6...Bg4 7.h3 Bh5 8.Bd2 e6 9.Qe2 Bb4 10.O-O-O dá pequena vantagem às brancas.' }],
  ['c02-g', '1', 'g', '(g) 10.a3', '10 a3 Nbd7 11 O-O-O Bxc3 12 Bxc3 Qc7 13 g4 Bg6 14 Ne5 Ne4', { a: '=', r: 'Wolff–Rogers, Honolulu 1998', c: 'Menos preciso é 10.a3 Nbd7 11.O-O-O Bxc3, com igualdade depois de 14...Ne4!.' }],
  ['c02', 'h', 'h', '(h)', '7 Bd2 e6 8 Qe2 Bb4 9 Ne5 Nbd7 10 Nxd7 Nxd7 11 a3 Bxc3 12 Bxc3 Qc7 13 d5 cxd5 14 Bxd5 O-O 15 Bf3 Rac8 16 O-O Nb6', { a: '=', c: '7.Bd2 e6 8.Qe2 Bb4 9.Ne5 Nbd7 leva à igualdade.' }],
  ['c02-h', '1', 'h', '(h) 8.Nd5', '8 Nd5', { c: '8.Nd5 é parecido com a coluna 3.' }],
  ['c02-h', '2', 'h', '(h) 9.O-O-O', '9 O-O-O Nbd7 10 a3 Bxc3 11 Bxc3 Qc7 12 Ne5 Nxe5 13 dxe5 Nd5 14 Bd2', { a: '⩲', c: '9.O-O-O Nbd7 10.a3 dá só uma pequena vantagem às brancas.' }],
  ['c02', 'i', 'i', '(i)', '11 h5 Be4 12 Rh3 Bd5 13 Bd3 O-O-O', { a: '=', r: 'Marsuura–Zarnicki, Memorial Mario Covas 2004', c: '11.h5 Be4 12.Rh3 Bd5 leva à igualdade.' }],
  // Coluna 3
  ['c03', 'j-A', 'j', '(j) A', '6... Qb6 7 Nf3 Qxb2 8 Ne5 e6 9 Rb1 Qa3 10 O-O', { a: '∞', r: 'Degraeve–Tomczak, Capelle-la-Grande 2006', c: '6...Qb6 7.Nf3 Qxb2 8.Ne5 dá às brancas compensação razoável pelo peão. Talvez seja a melhor escolha das pretas.' }],
  ['c03', 'j-B', 'j', '(j) B', '6... Qc7 7 Nf3 Bg4 8 h3 Bxf3 9 Qxf3', { a: '⩲', r: 'Yemelin–Podinic, Bósnia 2005', c: '6...Qc7 7.Nf3 Bg4 8.h3 dá pequena vantagem às brancas.' }],
  ['c03', 'k', 'k', '(k)', '8... exf6 9 Bf4 Bd6 10 Qe2+ Kf8 11 Bxd6+ Qxd6 12 Qd2', { a: '⩲', r: 'W. Watson–Christiansen, Alemanha 1995', c: '8...exf6 9.Bf4! Bd6 10.Qe2+ tira o roque das pretas.' }],
  ['c03', 'l', 'l', '(l)', '9 c3 e6 10 Ne2 Nd7 11 O-O Bd6', { a: '∞', r: 'Georgiev–Babula, Romênia 1995', c: '9.c3 e6 10.Ne2 Nd7 leva a um jogo indefinido.' }],
  ['c03', 'm', 'm', '(m)', '11 a4 Rg8 12 Ne2 Na6 13 O-O Nb4 14 Bg3 e6 15 Nf4', { a: '⩲', r: 'W. Watson–Rogers, Londres 1987', c: '11.a4 Rg8 12.Ne2 Na6 dá pequena vantagem às brancas.' }],
  ['c03-m', '1', 'm', '(m) 12...Rxg2', '12... Rxg2 13 Bg3', { a: '±', c: '12...Rxg2? 13.Bg3 prende a torre.' }],
  // Coluna 4
  ['c04', 'n', 'n', '(n)', '3 c4 c6 4 dxc6 Nxc6 5 Nf3 e5 6 d3 Bc5', { a: '∞', c: '3.c4 c6 4.dxc6 Nxc6 dá às pretas boa compensação pelo peão.' }],
  ['c04', 'o', 'o', '(o)', '3... Bg4 4 f3 Bf5 5 c4 e6 6 dxe6 Nc6 7 Be3 Bb4+ 8 Nc3 Qe7', { a: '∞', r: 'de Firmian–Vescovi, Bermudas 1996', c: 'A Variante Portuguesa 3...Bg4!? 4.f3 Bf5 é muito divertida. Depois de 5.c4 e6 6.dxe6 Nc6! as pretas têm bom jogo pelos peões.' }],
  ['c04-o', '1', 'o', '(o) 5.Bb5+', '5 Bb5+ Nbd7 6 c4 e6 7 dxe6 Bxe6 8 c5 c6 9 Ba4', { a: '⩲', r: 'Smirnov–Vlassov, Aeroflot Open 2003', c: 'Mais exigente é 5.Bb5+! Nbd7 6.c4 e6, e 9.Ba4 dá alguma vantagem às brancas.' }],
  ['c04', 'p', 'p', '(p)', '4 c4', { c: '4.c4 tem pouco significado próprio, porque as brancas costumam jogar c4 logo.' }],
  ['c04', 'q', 'q', '(q)', '7 Be2 O-O 8 O-O Nc6 9 d5 Ne5 10 c5 Nxf3+ 11 Bxf3 Nd7 12 Be3 Ne5 13 Be2', { a: '⩲', r: 'Isaksen–Nielsen, Esbjerg 1994', c: '7.Be2 O-O 8.O-O Nc6 9.d5 dá pequena vantagem às brancas.' }],
  ['c04', 'r', 'r', '(r)', '7... N6d7 8 Bc4 O-O 9 O-O b6 10 Re1 bxc5 11 Bg5', { a: '±', c: '7...N6d7 8.Bc4 O-O 9.O-O b6 10.Re1! favorece as brancas.' }],
  ['c04', 's', 's', '(s)', '11 bxc3 Bxc4 12 Qxc4 Nd7 13 Rb1', { a: '⩲', r: 'Gallagher–Forster, Suíça 2006', c: '11.bxc3 Bxc4 12.Qxc4 dá pequena vantagem às brancas.' }],
  // Coluna 5
  ['c05', 't', 't', '(t)', '5... e6 6 O-O Be7 7 c4 Nb6 8 Nc3 O-O 9 Be3 Nc6 10 b3', { a: '⩲', r: 'Kovacs–Horvath, Hungria 1993', c: '5...e6 6.O-O Be7 7.c4 dá pequena vantagem às brancas.' }],
  ['c05', 'u', 'u', '(u)', '11 Qb3 Qe7 12 O-O-O O-O-O 13 dxe6 fxe6 14 Ne4', { a: '⩲', r: 'G. Hernández–Reyes, México 2006', c: '11.Qb3 Qe7 12.O-O-O dá pequena vantagem às brancas.' }],
  // Coluna 6
  ['c06', 'v', 'v', '(v)', '4 Bc4 b5 5 Bb3 a5 6 a3 Bg4 7 f3 Bc8 8 Nc3 Ba6', { a: '∞', r: 'Zukertort–Kenny, Southampton 1884', c: '4.Bc4 b5 5.Bb3 a5 dá compensação às pretas pelo peão. Elas devem jogar ...g6 e se desenvolver antes de tentar recuperá-lo.' }],
  ['c06', 'w', 'w', '(w)', '7 O-O Be7 8 c4 Nb4 9 Na3 O-O 10 Bf4 c6', { a: '∞', c: '7.O-O Be7 8.c4 Nb4 leva a um jogo indefinido.' }],
  ['c06', 'x', 'x', '(x)', '11 h3 Nc6 12 g4 Bg6 13 h4 e5 14 dxe5 Nxe5 15 Nxe5 Bxe5', { a: '=', r: 'Balashov–Smagin, Novgorod 1995', c: '11.h3 Nc6 12.g4 Bg6 13.h4 e5! deixa as pretas pelo menos iguais.' }],
]

const capitulo = {
  id: 'escandinava',
  arquivo: 'escandinava',
  nome: 'Escandinava (Center Counter)',
  fonte: 'Modern Chess Openings — Center Counter (Scandinavian) Defense (pp. 379–380), colunas 1–6',
  base: '1. e4 d5 2. exd5',
  corPadrao: 'b',
  ordem: 379,
  grupos: [
    { id: 'qa5', nome: '2...Qxd5 3.Nc3 Qa5', colunas: [1, 2, 3] },
    { id: 'nf6', nome: '2...Nf6 3.d4', colunas: [4, 5] },
    { id: 'bb5', nome: '2...Nf6 3.Bb5+', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
