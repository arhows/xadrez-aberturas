// Transcrição do MCO 15ª ed. — Defesa Siciliana, Dragão Acelerado, Ataque Maróczy (pp. 287–289), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs siciliana-acelerado-b
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-acelerado-b-dicas.cjs.
//
// A tabela não traz avaliação no fim das colunas; a avaliação vem da última nota.
// Nota (d), 14.Bd4: o livro escreve "17...Rxc1"; com o rei branco em e1 o lance dá xeque (Rxc1+).

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4 g6 5 c4'

const colunas = {
  c07: [`${B} Nf6 6 Nc3 d6 7 f3 Nxd4 8 Qxd4 Bg7 9 Be3 O-O 10 Qd2 Qa5 11 Rc1 Be6 12 Nd5 Qxa2`, 'nf6', '5...Nf6 6.Nc3 d6 7.f3', '⩲',
    'No Ataque Maróczy as brancas jogam 5.c4 e controlam d5 com os peões c4 e e4, o que dificulta ...d5 e ...b5. Com 7.f3 e 9.Be3 elas montam um bloco sólido. As pretas trocam em d4 e buscam contrajogo com ...Qa5 e ...Be6; depois de 12...Qxa2 as brancas ficam um pouco melhor.'],
  c08: [`${B} Nf6 6 Nc3 d6 7 Be2 Nxd4 8 Qxd4 Bg7 9 Bg5 O-O 10 Qd2 Be6 11 Rc1 Qa5 12 f3 Rfc8`, 'nf6', '7.Be2', '=',
    'Com 7.Be2 e 9.Bg5 as brancas desenvolvem o bispo de c1 de forma mais ativa. As pretas seguem com ...Be6, ...Qa5 e ...Rfc8, pressionando c4, e ficam iguais.'],
  c09: [`${B} Bg7 6 Be3 Nh6 7 Nc3 d6 8 Be2 O-O 9 O-O f5 10 exf5 gxf5 11 f4 Qb6 12 Nxf5 Qxb2`, 'bg7', '5...Bg7 6.Be3 Nh6', '∞',
    'Com 5...Bg7 6.Be3 Nh6 as pretas mandam o cavalo para f5 e preparam ...f5. O jogo fica agudo: depois de 12.Nxf5 Qxb2 há chances para os dois lados.'],
  c10: [`${B} Bg7 6 Be3 Nf6 7 Nc3 Ng4 8 Qxg4 Nxd4 9 Qd1 Ne6 10 Rc1 d6 11 b4 O-O 12 Be2 a5`, 'bg7', '6...Nf6 7.Nc3 Ng4', '⩲',
    'Com 7...Ng4 as pretas trocam o bispo de e3 ou ganham tempo contra a dama. Depois de 9...Ne6 e 11.b4, que tira a casa c5 do cavalo, as brancas ficam um pouco melhor.'],
  c11: [`${B} Bg7 6 Be3 Nf6 7 Nc3 O-O 8 Be2 b6 9 O-O Bb7 10 Nxc6 Bxc6 11 f3 d6 12 Qd2 Qd7`, 'roque', '7...O-O 8.Be2 b6', '⩲',
    'Com 7...O-O 8.Be2 b6 as pretas fazem o fianqueto do bispo de c8 para pressionar e4. Depois de 10.Nxc6 e 11.f3 as brancas mantêm o bloco e ficam um pouco melhor.'],
  c12: [`${B} Bg7 6 Be3 Nf6 7 Nc3 O-O 8 Be2 d6 9 O-O Bd7 10 Qd2 Nxd4 11 Bxd4 Bc6 12 f3 a5`, 'roque', '8...d6', '⩲',
    'Com 8...d6 e 9...Bd7 as pretas trocam em d4 e colocam o bispo em c6. As brancas mantêm o controle do centro e ficam um pouco melhor.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '7... Bg7 8 Be3 O-O 9 Be2 Nxd4 10 Bxd4 Be6 11 Rc1 Qa5 12 Qd2 Rfc8 13 b3 a6 14 Be3 b5', { a: '=', r: 'Ernst–Petursson, Reykjavík 1994', c: 'Depois de f2–f3 as pretas também podem jogar 7...Bg7 8.Be3 O-O; o natural 9.Be2 permite 9...Nxd4 e a igualdade.' }],
  ['c07-a', '1', 'a', '(a) 9.Qd2', '9 Qd2', { c: '9.Qd2 evita essa continuação igualadora.' }],
  ['c07', 'b', 'b', '(b)', '9 Bg5 O-O 10 Qd2 Be6 11 Rc1 a6 12 b3 Qd7 13 Be2 Rab8 14 Nd5', { a: '⩲', r: 'Daly–de Firmian, Gausdal 2003', c: 'Com 9.Bg5 e 11.Rc1! as brancas ficam um pouco melhor.' }],
  ['c07', 'c', 'c', '(c)', '12 Be2 Rfc8 13 b3 a6 14 Na4 Qxd2+ 15 Kxd2 Nd7 16 g4 f5 17 exf5 gxf5 18 h3 Rf8 19 f4 Rad8 20 Nc3 d5 21 gxf5 Bxf5 22 cxd5 Nf6 23 Bb6 Rd7 24 Ke3', { a: '⩲', r: 'A. Rodríguez–Antunes, Matanzas 1994', c: 'A alternativa importante é 12.Be2; depois de 14.Na4 as damas se trocam e, com 16.g4!, as brancas ficam com pequena vantagem no final.' }],
  ['c07-c', '1', 'c', '(c) 16.h4', '16 h4 f5 17 Bd3 Rab8 18 Nc3 Nc5', { a: '=', r: 'Nijboer–Zsu. Polgár, Groningen 1993', c: '16.h4 f5 é igual.' }],
  ['c07-c', '2', 'c', '(c) 18.g5', '18 g5 d5', { c: '18.g5 d5.' }],
  ['c07-c', '3', 'c', '(c) 19...d5', '19... d5 20 cxd5 Bxd5 21 Rhd1', { a: '±', c: '19...d5 20.cxd5 Bxd5 21.Rhd1 deixa as brancas melhor.' }],
  ['c07', 'd-A', 'd', '(d) A', '12... Qxd2+ 13 Kxd2', { a: '⩲', c: 'Com 12...Qxd2+ 13.Kxd2 as brancas ficam melhor no final.' }],
  ['c07', 'd-B', 'd', '(d) B', '13 Nxe7+ Kh8 14 Be2 Ng8 15 Nd5 Bxd5 16 cxd5 Rfc8 17 O-O a5 18 Bd4 Qb3 19 f4 Qb4 20 Qxb4 axb4 21 Bxg7+ Kxg7 22 e5', { a: '±', r: 'Shaked–Donaldson, Reno 1994', c: 'Depois de 12...Qxa2 13.Nxe7+ Kh8 14.Be2 Ng8 15.Nd5 as brancas ficam um pouco melhor; com 18...Qb3?! a vantagem cresce.' }],
  ['c07-d-B', '1', 'd', '(d) B 14.Bd4', '14 Bd4 Rae8 15 Nd5 Bxd5 16 cxd5 Rc8 17 Be2 Rxc1+ 18 Qxc1 Nd7 19 Bxg7+ Kxg7 20 Qc3+ Kg8 21 Kf2 Nb6 22 Qf6 Na4', { a: '=', c: '14.Bd4 Rae8 leva a igualdade.' }],
  // Coluna 8
  ['c08', 'e-A', 'e', '(e) A', '9 O-O O-O 10 Qe3 Be6 11 Bd2 Qb6 12 b3 Qxe3 13 Bxe3 Nd7 14 Rac1 Nc5 15 f3 a5 16 Nd5 Bxd5 17 exd5 Bb2 18 Rc2 Ba3', { a: '=', c: 'As alternativas das brancas podem ser preferíveis. Com 9.O-O O-O 10.Qe3 e 11...Qb6! fica igual.' }],
  ['c08', 'e-B', 'e', '(e) B', '9 Be3 O-O 10 Qd2 Be6 11 O-O Qa5 12 Rab1 Rfc8 13 b3 Ng4 14 Nd5 Qxd2 15 Bxd2 Kf8 16 Bg5 f6 17 Bd2 Ne5 18 f4', { a: '⩲', r: 'Gelfand–Andersson, Polanica Zdrój 1997', c: 'Com 9.Be3 e 12.Rab1!? as brancas ficam um pouco melhor.' }],
  ['c08-e-B', '1', 'e', '(e) B 13...b5', '13... b5 14 b4 Qc7 15 e5 dxe5 16 Nxb5', { a: '⩲', r: 'Ivanchuk–Kovačević, Belgrado 1997', c: '13...b5 14.b4 Qc7 15.e5 também deixa as brancas um pouco melhor.' }],
  ['c08-e-B', '2', 'e', '(e) B 15...Bxd5', '15... Bxd5 16 exd5', { a: '⩲', c: '15...Bxd5 16.exd5 também.' }],
  ['c08', 'f', 'f', '(f)', '11... a6 12 b3 b5 13 cxb5 axb5 14 Bxb5 Qa5 15 Bc6 Ra6 16 Na4', { a: '±', r: 'Serper–Donaldson, Las Vegas 1997', c: 'Com 11...a6 12.b3! b5? 13.cxb5 as brancas ficam melhor.' }],
  ['c08-f', '1', 'f', '(f) 12...Qa5', '12... Qa5 13 f3 Rfc8', { c: 'As pretas deviam voltar às linhas principais com 12...Qa5 13.f3 Rfc8; então 14.Na4 é parecido com a nota (c).' }],
  ['c08', 'g', 'g', '(g)', '12 O-O Rfc8 13 b3 a6 14 f4 Rc5 15 Bf3 Rac8 16 Qe3 b5 17 e5 dxe5 18 fxe5 Nd7 19 Bd5 bxc4 20 b4 Qxb4 21 Bxe7 Qa5 22 Bxe6 fxe6 23 Bxc5 Qxc5 24 Qxc5 Nxc5', { a: '=', r: 'Wojtkiewicz–Donaldson, Hamburgo (rápidas) 1994', c: 'Com 12.O-O e 14.f4 o jogo se abre e fica igual.' }],
  ['c08', 'h', 'h', '(h)', '13 b3 a6 14 Nd5 Qxd2+ 15 Kxd2 Nxd5 16 cxd5 Bd7 17 h4 f6 18 Be3 f5 19 exf5 gxf5 20 g4 fxg4 21 fxg4 Bb2', { a: '=', r: 'Mokry–Zsu. Polgár, Trenčianske Teplice 1985', c: 'Depois de 13.b3 a6 14.Nd5 as damas se trocam e fica igual.' }],
  ['c08-h', '1', 'h', '(h) 14.Na4', '14 Na4', { c: '14.Na4 transpõe para a nota (c) depois de ...f6 e Be3.' }],
  // Coluna 9
  ['c09', 'i', 'i', '(i)', '6 Nc2 Nf6 7 Nc3 O-O 8 Be2 d6 9 O-O Nd7 10 Bd2 Nc5 11 b4 Ne6 12 Rc1', { a: '⩲', r: 'Aronian–Vorobiov, Aeroflot Open 2004', c: 'As brancas podem evitar trocas com 6.Nc2, para manter a posição preta apertada; ficam um pouco melhor.' }],
  ['c09', 'j', 'j', '(j)', '10... Nxd4 11 Bxd4 Bxd4 12 Qxd4 Nxf5 13 Qd2 Bd7 14 Bf3 Bc6 15 Bd5+', { a: '⩲', r: 'Tal–Kupreichik, Sochi 1970', c: 'Com 10...Nxd4 as peças se trocam e as brancas ficam um pouco melhor.' }],
  ['c09', 'k', 'k', '(k)', '11... Bd7 12 h3 a6 13 Qd2 Rc8 14 Nb3 Be6 15 Nd5', { a: '⩲', r: 'Acs–T. Minasian, Bundesliga 2001', c: 'Com 11...Bd7 as brancas ficam um pouco melhor.' }],
  ['c09', 'l', 'l', '(l)', '13 Nxh6+ Bxh6 14 Rc1 Bg7 15 Rc2 Qa3 16 Qd2 Be6 17 Kh1 Rac8', { a: '∞', r: 'Spassov–Nicevski, Sófia 1976', c: 'Com 13.Nxh6+ Bxh6 14.Rc1 há chances para os dois lados.' }],
  ['c09-l', '1', 'l', '(l) 15.Nd5', '15 Nd5 Qxa2 16 c5 Kh8 17 Bf3 Be6 18 cxd6 exd6 19 Nc7 Bb3', { a: '∓', r: 'Yermolinsky–I. Ivanov, URSS 1980', c: '15.Nd5 Qxa2 deixa as pretas um pouco melhor.' }],
  // Coluna 10
  ['c10', 'm', 'm', '(m)', '9... e5 10 Nb5 O-O 11 Qd2 Qh4 12 Bd3 d5 13 cxd5 Nxb5 14 Bxb5 Qxe4 15 O-O Rd8 16 Rfd1 Qf5 17 Rac1 Bd7 18 Be2 e4 19 Rc7 Bc6 20 dxc6 Rxd2 21 Rxd2 bxc6 22 Bc4 Be5 23 Rb7 Rf8 24 Rxa7 Bf4', { a: '=', r: 'Quist–Espig, Alemanha 1993', c: 'Com 9...e5!? 10.Nb5 O-O 11.Qd2 Qh4 as pretas buscam jogo ativo. Depois de 16.Rfd1 as brancas parecem melhor, mas 16...Qf5 e 19.Rc7!? levam a igualdade.' }],
  ['c10-m', '1', 'm', '(m) 10.Bd3', '10 Bd3 O-O 11 O-O d6 12 Nb5 Nxb5 13 cxb5 d5 14 exd5 Qxd5 15 f3 Be6 16 Qe2 Qd7 17 Rfd1', { a: '⩲', r: 'Z. Almási–Chatalbashev, Krynica 1998', c: '10.Bd3 O-O 11.O-O d6 12.Nb5!? deixa as brancas um pouco melhor.' }],
  ['c10-m', '2', 'm', '(m) 23.Rxf7', '23 Rxf7 Qxf7 24 Bxf7+ Kxf7 25 Rd7+ Ke6 26 Rxh7 a5', { a: '=', r: 'Gufeld–Espig, Sochi 1972', c: '23.Rxf7 Qxf7 24.Bxf7+ Kxf7 também é igual.' }],
  ['c10', 'n', 'n', '(n)', '10 Be2 Bxc3+ 11 bxc3 b6 12 O-O Bb7 13 f3 Qc7 14 Rb1 O-O 15 Qd2 f5 16 exf5 gxf5', { a: '∓', c: '10.Be2?! Bxc3+ estraga os peões brancos e deixa as pretas um pouco melhor.' }],
  ['c10', 'o', 'o', '(o)', '10... Qa5 11 Be2 b6 12 Qd5 Qxd5 13 cxd5 Nd4 14 Bc4 Bb7 15 Kd2 e6 16 Rhd1', { a: '⩲', r: 'Ribli–Rogers, Alemanha 1995', c: 'Com 10...Qa5 as damas se trocam e as brancas ficam um pouco melhor.' }],
  ['c10', 'p-A', 'p', '(p) A', '11 Bd3 O-O 12 O-O a5 13 Bb1 Bd7 14 Qe2 Bc6 15 Rfd1', { a: '⩲', r: 'Beliavsky–Velimirović, Reggio Emilia 1986/87', c: '11.b4 tira a casa c5 do cavalo preto. Um jogo de outro tipo surge com 11.Bd3; as brancas também ficam um pouco melhor.' }],
  ['c10', 'p-B', 'p', '(p) B', '11 Qd2 Qa5 12 Be2 Bd7 13 O-O Nc5 14 f3 Na4', { a: '=', c: '11.Qd2 Qa5 permite 13...Nc5 e 14...Na4!, com igualdade.' }],
  ['c10', 'q-A', 'q', '(q) A', '12... b6 13 Qd2 Bb7 14 f3 Kh8 15 O-O f5 16 exf5 gxf5 17 f4', { a: '±', r: 'Suba–Joksić, Zurique 1987', c: 'Pior é 12...b6, com vantagem das brancas.' }],
  ['c10', 'q-B', 'q', '(q) B', '13 a3 axb4 14 axb4 Bd7 15 O-O Bc6 16 Qd2 Ra3 17 Nd5 Re8 18 Rfd1 Nf8 19 h3', { a: '⩲', r: 'Marjanović–Velimirović, Sarajevo 1984', c: 'A coluna é Marjanović–Velimirović, que seguiu com 13.a3 axb4 14.axb4; as brancas ficaram um pouco melhor.' }],
  // Coluna 11
  ['c11', 'r', 'r', '(r)', '9 Nxc6', { a: '⩲', c: '9.Nxc6 imediato também pode dar alguma vantagem às brancas.' }],
  ['c11', 's-A', 's', '(s) A', '10 Rc1 Nxd4 11 Bxd4 Bh6 12 Rc2 Nxe4', { a: '∓', c: 'Há armadilhas a evitar: 10.Rc1? Nxd4 11.Bxd4 Bh6! 12.Rc2 Nxe4 deixa as pretas melhor.' }],
  ['c11', 's-B', 's', '(s) B', '10 Qd2 Nxd4 11 Bxd4 e5 12 Bxe5 Nxe4 13 Nxe4 Bxe5', { a: '∓', c: '10.Qd2?! Nxd4 11.Bxd4 e5! também é bom para as pretas.' }],
  ['c11', 's-C', 's', '(s) C', '10 f3 Rc8 11 Qd2 d6 12 Rfd1', { a: '⩲', c: '10.f3 Rc8 11.Qd2 d6 12.Rfd1 é um pouco melhor para as brancas.' }],
  ['c11-s-C', '1', 's', '(s) C 10...Nh5', '10... Nh5', { c: 'Mas as pretas podem tentar 10...Nh5.' }],
  ['c11', 't', 't', '(t)', '10... dxc6 11 e5 Ne8 12 f4 Qc7 13 Qb3', { a: '⩲', r: 'Christiansen–Mezentsev, Los Angeles 2003', c: 'Com 10...dxc6 11.e5 o cavalo preto é expulso e as brancas ficam um pouco melhor.' }],
  ['c11', 'u', 'u', '(u)', '13 Rfd1 Rfc8 14 Bf1 Qe8 15 a4', { a: '⩲', r: 'Shabalov–Karklins, U.S. Open 2003', c: 'Depois de 13.Rfd1 e 15.a4 as brancas ficam um pouco melhor.' }],
  // Coluna 12
  ['c12', 'v', 'v', '(v)', '10 Nb3 a5 11 Nd2 Bc8 12 Rb1 Nd7 13 Nb3 b6', { a: '=', r: 'Zvjaginsev–Savchenko, Halkidiki 2002', c: 'Com 10.Nb3 a5 fica igual.' }],
  ['c12', 'w', 'w', '(w)', '13 Kh1 Nd7 14 Bxg7 Kxg7 15 f4 Nc5 16 Bf3 a4 17 Rae1', { a: '⩲', r: 'Karlsson–Wedberg, Eksjö 1980', c: 'Depois de 13.Kh1 e 15.f4 as brancas ficam um pouco melhor.' }],
]

const capitulo = {
  id: 'siciliana-acelerado-b',
  arquivo: 'siciliana-acelerado-b',
  nome: 'Siciliana Dragão Acelerado — Maróczy',
  fonte: 'Modern Chess Openings — Sicilian Defense, Accelerated Dragon, Maróczy Bind (pp. 287–289), colunas 7–12',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4',
  corPadrao: 'b',
  ordem: 287,
  grupos: [
    { id: 'nf6', nome: '5...Nf6 6.Nc3 d6', colunas: [7, 8] },
    { id: 'bg7', nome: '5...Bg7 6.Be3', colunas: [9, 10] },
    { id: 'roque', nome: '7...O-O', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
