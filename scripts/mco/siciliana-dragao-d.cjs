// Transcrição do MCO 15ª ed. — Defesa Siciliana, Dragão Clássico (pp. 280–281), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs siciliana-dragao-d
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-dragao-d-dicas.cjs.
//
// A tabela traz avaliação no fim das colunas 21 e 24; nas outras a avaliação vem da última nota.
// Notas (d) e (s) B: o livro escreve "16 dxe5" e "11 dxe5"; as brancas não têm peão d, os lances são 16 fxe5 e 11 fxe5.

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 g6 6 Be2 Bg7 7 O-O Nc6 8 Be3 O-O'

const colunas = {
  c19: [`${B} 9 Nb3 Be6 10 f4 Qc8 11 Kh1 Bg4 12 Bg1 Rb8 13 Nd4 Bxe2 14 Qxe2 b5 15 e5 dxe5`, 'be6', '9.Nb3 Be6 10.f4 Qc8', '=',
    'No Dragão Clássico as brancas jogam de forma posicional, com Be2 e roque pequeno. Com 9.Nb3 o cavalo sai de d4, e as pretas respondem com 9...Be6 e 10...Qc8, trocando o bispo de casas brancas. O lance 14...b5!? leva a jogo igual.'],
  c20: [`${B} 9 Nb3 Be6 10 f4 Na5 11 f5 Bc4 12 Bd3 Bxd3 13 cxd3 d5 14 Nxa5 Qxa5 15 e5 d4`, 'be6', '10...Na5', '=',
    'Com 10...Na5 as pretas mandam o cavalo para c4 e trocam o bispo de casas brancas. Depois de 13...d5! fica igual.'],
  c21: [`${B} 9 Nb3 a5 10 a4 Be6 11 f4 Rc8 12 Bf3 Nd7 13 Rf2 Nb6 14 Be2 Nc4 15 Bxc4 Bxc4`, 'a5a6', '9...a5', '=',
    'Com 9...a5 as pretas ameaçam ...a4 e expulsar o cavalo de b3. Depois de 10.a4 o cavalo preto chega a c4 e fica igual (Hartman–Ernst, Norrköping 1988).'],
  c22: [`${B} 9 Nb3 a6 10 a4 Be6 11 f4 Rc8 12 f5 Bxb3 13 cxb3 Na5 14 Bd3 Nd7 15 Rc1 Nc5`, 'a5a6', '9...a6', '±',
    'As linhas com ...a6 costumam surgir pela ordem da Najdorf. Com 12.f5 as brancas ganham espaço na ala do rei e ficam melhor.'],
  c23: [`${B} 9 Qd2 d5 10 exd5 Nxd5 11 Nxc6 bxc6 12 Rad1 Qc7 13 Nxd5 cxd5 14 Qxd5 Be6 15 Qc5 Qxc5`, 'outros', '9.Qd2', '=',
    'Com 9.Qd2 as brancas não tiram o cavalo de d4, e as pretas liberam o jogo com 9...d5. Depois da troca das damas fica igual.'],
  c24: [`${B} 9 f4 Qb6 10 Qd3 Ng4 11 Bxg4 Bxd4 12 Bxd4 Qxd4+ 13 Qxd4 Nxd4 14 Bd1 Be6 15 Rf2 Rac8`, 'outros', '9.f4', '=',
    'Com 9.f4 as brancas deixam d4 sem defesa extra, e 9...Qb6! ataca o cavalo e b2. As peças se trocam e o final fica igual (Podlesnik–Savchenko, Ljubljana 1996).'],
}

const notas = [
  // Coluna 19
  ['c19', 'a-A', 'a', '(a) A', '11 Bf3 Bg4 12 h3 Bxf3 13 Qxf3 e6 14 Rad1 Rd8 15 f5 Ne5 16 Qf2 Nc4', { a: '=', r: 'Fedorowicz', c: 'Com 11.Bf3 Bg4 12.h3 o bispo é trocado em f3; fica igual.' }],
  ['c19-a-A', '1', 'a', '(a) A 12.Nd5', '12 Nd5 Bxf3 13 Qxf3 Nd7', { a: '=', c: '12.Nd5 Bxf3 13.Qxf3 Nd7 também é igual.' }],
  ['c19', 'a-B', 'a', '(a) B', '11 h3 Rd8 12 Bf3 Bc4 13 Rf2 e5', { a: '=', c: 'Com 11.h3 Rd8 e 13...e5 fica igual.' }],
  ['c19', 'b', 'b', '(b)', '11... Rd8 12 Bg1 d5 13 e5 Ne4 14 Bd3 f5 15 exf6 Nxc3 16 bxc3 Bxf6', { a: '=', r: 'Mortensen–Winsnes, Liga Sueca 2003', c: 'As pretas também podem jogar 11...Rd8 e 12...d5; fica igual.' }],
  ['c19', 'c', 'c', '(c)', '15 Nxc6 Qxc6 16 Bxa7 b4 17 Nd5 Rb7', { c: 'Com 15.Nxc6 Qxc6 16.Bxa7 b4! 17.Nd5 Rb7 as pretas recuperam o peão com bom jogo.' }],
  ['c19-c', '1', 'c', '(c) 17.Bxb8', '17 Bxb8 bxc3', { a: '∓', c: '17.Bxb8?! bxc3 deixa as pretas um pouco melhor.' }],
  ['c19', 'd', 'd', '(d)', '16 fxe5 Nd7 17 Nxc6 Qxc6 18 Bxa7 Rb7 19 Bd4 b4 20 Ne4 Nxe5', { a: '=', r: 'Glek–Khalifman, Moscou 1995', c: 'Depois de 16.fxe5 Nd7 as pretas recuperam o peão; fica igual.' }],
  // Coluna 20
  ['c20', 'e', 'e', '(e)', '10... Rc8 11 Kh1 Na5 12 f5 Nc4 13 Bd4 Bd7 14 Bxc4 Rxc4 15 Qe2 b5 16 a4', { a: '±', r: 'Seitaj–Velimirović, Kavala 1985', c: 'Com 10...Rc8 11.Kh1 as brancas ficam melhor.' }],
  ['c20-e', '1', 'e', '(e) 11.f5', '11 f5 Bd7 12 g4 Ne5 13 g5 Rxc3', { c: '11.f5?! Bd7 12.g4 Ne5 13.g5 Rxc3! é bom para as pretas.' }],
  ['c20', 'f', 'f', '(f)', '12 Nxa5 Bxe2 13 Nxb7 Bxd1 14 Nxd8 Bxc2', { a: '=', r: 'Lasker–Riumin, Moscou 1936', c: '12.Nxa5 leva a muitas trocas e fica igual.' }],
  ['c20', 'g', 'g', '(g)', '13... Nxb3 14 Qxb3 Ng4 15 Bg5 Bd4+ 16 Kh1 Nf2+ 17 Rxf2 Bxf2 18 Nd5 Re8 19 f6', { a: '±', r: 'Mortensen–Arnason, Esbjerg 1984', c: '13...Nxb3 14.Qxb3! Ng4 15.Bg5 é bom para as brancas: depois de 15...Bd4+ elas devolvem a qualidade e 19.f6 é forte.' }],
  ['c20', 'h', 'h', '(h)', '16 Bxd4 Nd7 17 f6 exf6 18 exf6 Bxf6 19 Bxf6 Qb6+ 20 Kh1 Nxf6 21 Qf3 Kg7 22 Rae1 Qc6', { a: '=', r: 'Megaranto–Gomez, Singapura 2006', c: 'Depois de 16.Bxd4 Nd7 e 17.f6 as peças se trocam e fica igual.' }],
  // Coluna 21
  ['c21', 'i', 'i', '(i)', '11 Nd4 Nxd4 12 Bxd4 Rc8 13 f4 Bc4 14 Rf2 e5', { a: '∞', r: 'Tolush–Rovner, Leningrado 1939', c: 'Com 11.Nd4 o jogo fica pouco claro.' }],
  ['c21', 'j', 'j', '(j)', '12 Kh1 Nd7 13 Bf3 Nb6 14 Bxb6 Qxb6 15 Nd5 Bxd5', { a: '=', r: 'Shamkovich–de Firmian, Nova York 1985', c: 'Com 12.Kh1 fica igual.' }],
  // Coluna 22
  ['c22', 'k', 'k', '(k)', '9... Bd7 10 f4 b5 11 Bxb5 Ng4 12 Qf3 Nb4', { a: '∞', r: 'Nagy–Wharton, Budapeste 1992', c: 'Com 9...Bd7 10.f4 b5!? o jogo fica pouco claro.' }],
  ['c22-k', '1', 'k', '(k) 10.Kh1', '10 Kh1', { a: '⩲', c: 'Mas 10.Kh1 deixa as brancas um pouco melhor.' }],
  ['c22', 'l', 'l', '(l)', '10 f4 b5 11 Bf3 Bd7 12 Qd2 Rb8 13 Nd5 b4', { a: '=', r: 'Glek–D. Gurevich, EUA 1994', c: 'Com 10.f4 b5 fica igual.' }],
  ['c22', 'm', 'm', '(m)', '16 Bc2 Nc6 17 Kh1 e6 18 Qg4', { a: '±', r: 'Backelin–Karlsson, Uppsala 1992', c: 'Depois de 16.Bc2 e 18.Qg4 as brancas ficam melhor.' }],
  // Coluna 23
  ['c23', 'n', 'n', '(n)', '9... Ng4 10 Bxg4 Bxg4 11 Nxc6 bxc6 12 Bh6 Be6 13 Bxg7 Kxg7 14 b3 Qa5 15 f4', { a: '±', r: 'Bella–Scaferelli, Campeonato Italiano 2001', c: 'Com 9...Ng4 as pretas trocam o bispo de e2, mas depois de 11.Nxc6 as brancas ficam melhor.' }],
  ['c23-n', '1', 'n', '(n) 11.f4', '11 f4 Nxd4 12 Bxd4 e5', { a: '=', c: '11.f4 Nxd4 12.Bxd4 e5! é igual.' }],
  ['c23', 'o', 'o', '(o)', '11 Nxd5 Nxd4 12 c4 e5', { a: '=', r: 'Honfi–Gufeld, Kecskemét 1958', c: 'Com 11.Nxd5 Nxd4! fica igual.' }],
  ['c23', 'p', 'p', '(p)', '13 Bd4 e5 14 Bc5 Rd8 15 Ne4 Bf5 16 Ng3 Be6', { a: '=', c: 'Com 13.Bd4 e5 14.Bc5 fica igual.' }],
  ['c23-p', '1', 'p', '(p) 16.Nd6', '16 Nd6 Bf8', { c: '16.Nd6 Bf8!.' }],
  ['c23', 'q', 'q', '(q)', '16 Bxc5 Bxb2', { a: '=', r: 'Kovalev–Savchenko, URSS 1988', c: 'Depois de 16.Bxc5 Bxb2 fica igual.' }],
  // Coluna 24
  ['c24', 'r-A', 'r', '(r) A', '9 Kh1 d5', { a: '=', c: 'Um lance lento como 9.Kh1 é respondido com 9...d5!, com igualdade.' }],
  ['c24', 'r-B', 'r', '(r) B', '9 h3 d5', { a: '=', c: 'O mesmo vale para 9.h3 d5!.' }],
  ['c24', 's-A', 's', '(s) A', '10 Qd2 Nxe4', { c: '10.Qd2? Nxe4 ganha um peão.' }],
  ['c24', 's-B', 's', '(s) B', '10 e5 dxe5 11 fxe5 Nxe5 12 Nf5 Qxb2 13 Nxe7+ Kh8 14 Bd4 Qb4 15 Bxe5 Qxe7 16 Qd4 Nh5', { a: '∓', c: 'Com 10.e5 dxe5 11.fxe5 Nxe5 12.Nf5 Qxb2! as pretas ficam um pouco melhor.' }],
  ['c24', 't', 't', '(t)', '11 Nd5 Bxd4 12 Nxb6 Bxe3+ 13 Kh1 Bxb6', { a: '∓', r: 'Horowitz–Reshevsky, Campeonato dos EUA 1951', c: '11.Nd5 Bxd4! 12.Nxb6 Bxe3+ 13.Kh1 Bxb6 deixa as pretas bem melhor.' }],
]

const capitulo = {
  id: 'siciliana-dragao-d',
  arquivo: 'siciliana-dragao-d',
  nome: 'Siciliana Dragão — Clássico',
  fonte: 'Modern Chess Openings — Sicilian Defense, Classical Dragon (pp. 280–281), colunas 19–24',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be2 Bg7 7. O-O Nc6 8. Be3 O-O',
  corPadrao: 'b',
  ordem: 280,
  grupos: [
    { id: 'be6', nome: '9.Nb3 Be6', colunas: [19, 20] },
    { id: 'a5a6', nome: '9.Nb3 a5 e 9...a6', colunas: [21, 22] },
    { id: 'outros', nome: '9.Qd2 e 9.f4', colunas: [23, 24] },
  ],
}

module.exports = { capitulo, colunas, notas }
