// Transcrição do MCO 15ª ed. — Gambito da Dama Aceito, linha principal com 7.Qe2 (pp. 451–452), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs gda-a
// Formato: ver gambito-do-rei.cjs. Dicas em gda-a-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (s) o livro traz 19 Nxd1, mas nenhum cavalo branco chega a d1; ficou 19 Rxd1.

const B = '1 d4 d5 2 c4 dxc4 3 Nf3 Nf6 4 e3 e6 5 Bxc4 c5 6 O-O a6 7 Qe2'
const R = `${B} b5 8 Bb3 Bb7 9 Rd1 Nbd7 10 Nc3`

const colunas = {
  c01: [`${R} Qb8 11 d5 Nxd5 12 Nxd5 Bxd5 13 Bxd5 exd5 14 Rxd5 Be7`, 'bb3', '9.Rd1 Nbd7 10.Nc3 Qb8', '⩲',
    'No Gambito da Dama Aceito as pretas devolvem o peão e usam o tempo para se desenvolver, buscando deixar as brancas com o peão isolado em d4. Na linha principal com 7.Qe2 b5 8.Bb3 Bb7 9.Rd1 Nbd7 10.Nc3 Qb8 as brancas golpeiam com 11.d5! e, depois das trocas, ficam com o peão a mais por pouco tempo e pressão na coluna d; elas ficam um pouco melhor (Vaganian–García Palermo, Reggio Emilia 1992/93).'],
  c02: [`${R} Qc7 11 e4 cxd4 12 Nxd4 Nc5 13 Bg5 Bd6 14 Rac1 Bxh2+`, 'bb3', '10...Qc7', '=',
    'Com 10...Qc7 as pretas evitam d5 e pressionam a coluna c. Depois de 11.e4 cxd4 12.Nxd4 Nc5 13.Bg5 Bd6 14.Rac1 Bxh2+ o jogo fica muito agudo, mas termina em igualdade (Christiansen–Anand, Las Palmas 1993).'],
  c03: [`${R} Bd6 11 e4 cxd4 12 Rxd4 Bc5 13 Rd3 Qc7 14 Be3 O-O`, 'bb3', '10...Bd6', '=',
    'Com 10...Bd6 as pretas desenvolvem o bispo e preparam o roque. Depois de 11.e4 cxd4 12.Rxd4 Bc5 13.Rd3 Qc7 14.Be3 O-O o jogo fica igual (The Baron × Shredder, computadores, 2005).'],
  c04: [`${B} b5 8 Bb3 Bb7 9 a4 b4 10 Nbd2 Be7 11 a5 Nbd7 12 Nc4 Qc7 13 Bd2 Bd5 14 Rfc1 Qb7`, 'bb3', '9.a4 b4', '=',
    'Com 9.a4 as brancas atacam o peão de b5. Depois de 9...b4, o lance seguro, 10.Nbd2 Be7 11.a5 Nbd7 12.Nc4 as brancas ocupam c4, mas as pretas igualam (Vladimirov–Sorokin, Dubai 2002).'],
  c05: [`${B} b5 8 Bd3 cxd4 9 exd4 Be7 10 a4 bxa4 11 Rxa4 O-O 12 Nc3 Bb7 13 Rd1 a5 14 Bg5 Nc6`, 'bd3', '8.Bd3', '=',
    'Com 8.Bd3 o bispo mira h7. Depois de 8...cxd4 9.exd4 as brancas ficam com o peão isolado; com 10.a4 bxa4 11.Rxa4 O-O as pretas se desenvolvem e igualam (Dautov–Rublevsky, Budapeste 1996).'],
  c06: [`${B} Nc6 8 Nc3 b5 9 Bb3 Bb7 10 Rd1 Qb6 11 d5 exd5 12 Nxd5 Nxd5 13 Bxd5 Be7 14 e4 O-O`, 'nc6', '7...Nc6', '=',
    'Com 7...Nc6 as pretas pressionam d4 antes de ...b5. Depois de 8.Nc3 b5 9.Bb3 Bb7 10.Rd1 Qb6 11.d5 exd5 12.Nxd5 Nxd5 13.Bxd5 Be7 14.e4 O-O o jogo fica igual (Danilov–Narva, Tallinn 2002).'],
}

const notas = [
  // Coluna 1
  ['c01', 'a-A', 'a', '(a) A', '9... Nc6 10 Nc3', { c: '9...Nc6 10.Nc3 transpõe para a coluna 6.' }],
  ['c01', 'a-B', 'a', '(a) B', '9... Be7 10 Nc3 O-O 11 e4 b4 12 d5 bxc3 13 dxe6 Qb6 14 exf7+ Kh8 15 e5 Ne4 16 e6 Bf6 17 Ne5', { a: '±', r: 'Kir. Georgiev–Dlugy, Belfort 1983', c: '9...Be7 10.Nc3 O-O 11.e4 b4 12.d5! bxc3 13.dxe6 Qb6 14.exf7+ Kh8 15.e5 Ne4 16.e6 Bf6 17.Ne5! deu às brancas ameaças fortes.' }],
  ['c01-a-B', '1', 'a', '(a) B 11...cxd4', '11... cxd4 12 Nxd4 Qc7 13 Bg5', { a: '⩲', c: '11...cxd4 12.Nxd4 Qc7 13.Bg5 é um pouco melhor para as brancas.' }],
  ['c01', 'b', 'b', '(b)', '10 e4 Bxe4 11 Ng5 Bg6 12 d5 e5 13 Ne6 Qb6', { a: '∓', c: 'O imaginativo 10.e4 Bxe4 é melhor para as pretas depois de 11.Ng5 Bg6 12.d5 e5 13.Ne6 Qb6.' }],
  ['c01-b', '1', 'b', '(b) 11.d5', '11 d5 e5 12 Nxe5 Nxe5 13 Nc3 c4 14 Nxe4 cxb3 15 d6 Nxe4 16 Qxe4 Bxd6 17 Bg5 f6 18 Rxd6 Qxd6 19 Qxa8+ Qd8 20 Qxa6 O-O 21 Qxb5 Qd3', { a: '=', r: 'Wieringa–De Graaf, correspondência 1993', c: 'Mas 11.d5 e5 12.Nxe5 Nxe5 13.Nc3 começa complicações interessantes: Wieringa–De Graaf seguiu até 20.Qxa6, e agora 20...O-O 21.Qxb5 Qd3 é igual.' }],
  ['c01-b', '2', 'b', '(b) 10...cxd4', '10... cxd4 11 e5 Bxf3 12 gxf3 Nh5', { a: '=', c: 'As pretas também podem jogar 10...cxd4 11.e5 Bxf3 12.gxf3 Nh5, igual.' }],
  ['c01', 'c-A', 'c', '(c) A', '11 e4 cxd4 12 Nxd4 Bd6 13 h3 O-O', { a: '=', c: 'O direto 11.e4 cxd4 12.Nxd4 Bd6 13.h3 O-O é simplesmente igual.' }],
  ['c01', 'c-B', 'c', '(c) B', '11 Ne5 Nxe5 12 dxe5 Qxe5 13 Nxb5 c4 14 Bxc4 axb5 15 Bxb5+', { a: '±', c: 'Mais complicado é 11.Ne5!?, com a ideia 11...Nxe5 12.dxe5 Qxe5 13.Nxb5! c4 14.Bxc4 axb5 15.Bxb5+, com ataque muito forte. (O Stockfish confirma: cerca de +4 para as brancas.)' }],
  ['c01-c-B', '1', 'c', '(c) B 11...Bd6', '11... Bd6 12 Nxd7 Nxd7 13 d5 exd5', { a: '=', r: 'Neishtadt', c: '11...Bd6 12.Nxd7 Nxd7 13.d5 exd5 está bem para as pretas (Neishtadt).' }],
  ['c01', 'd', 'd', '(d)', '11... exd5 12 Nxd5 c4 13 e4 Bd6 14 Bc2 O-O 15 Nxf6+ Nxf6 16 Bg5', { a: '±', c: '11...exd5 12.Nxd5 c4? 13.e4! ameaça o devastador 14.Bf4; depois de 13...Bd6 14.Bc2 O-O 15.Nxf6+ Nxf6 16.Bg5 as brancas ficam claramente melhor.' }],
  ['c01', 'e', 'e', '(e)', '15 e4 Qb7 16 Bg5 Nb6 17 Rad1 f6 18 Bf4 O-O 19 R5d2 Rfe8', { a: '⩲', r: 'Atalik–Topalov, Sarajevo 2001', c: '15.e4 Qb7 16.Bg5 Nb6 17.Rad1 f6 18.Bf4 O-O! 19.R5d2 Rfe8 foi Atalik–Topalov.' }],
  ['c01-e', '1', 'e', '(e) 15...Nb6', '15... Nb6 16 Rh5 O-O 17 e5', { a: '±', c: '15...Nb6 16.Rh5 O-O 17.e5 é melhor para as brancas.' }],
  ['c01-e', '2', 'e', '(e) 16...Bxg5', '16... Bxg5 17 Rad1', { a: '±', c: '16...Bxg5 17.Rad1! é bom para as brancas.' }],
  ['c01-e', '3', 'e', '(e) 18...Nxd5', '18... Nxd5 19 exd5 O-O 20 d6 Bd8 21 d7 Bc7 22 Qe6+ Rf7 23 b4 c4 24 Be3 c3 25 Ne1 Rd8 26 Bc5', { a: '±', r: 'Vaganian–García Palermo, Reggio Emilia 1992/93', c: '18...O-O! é melhor que 18...Nxd5, quando as brancas ganham jogo ativo pela qualidade: 19.exd5 O-O 20.d6 Bd8 21.d7 Bc7 22.Qe6+ Rf7 23.b4! c4 24.Be3 c3 25.Ne1 Rd8 26.Bc5.' }],
  // Coluna 2
  ['c02', 'f', 'f', '(f)', '10... Qb6 11 d5 exd5 12 Nxd5 Nxd5 13 Bxd5 Bxd5 14 Rxd5 Be7 15 e4 Qb7', { c: '10...Qb6 11.d5 exd5 12.Nxd5 Nxd5 13.Bxd5 Bxd5 14.Rxd5 Be7 15.e4 Qb7 transpõe para a coluna 1.' }],
  ['c02-f', '1', 'f', '(f) 11.a4', '11 a4 c4 12 Bc2 b4 13 a5 Qc7 14 Na4 Rc8 15 e4 b3 16 Bb1 Qxa5 17 e5', { a: '∞', r: 'Hoi–Sadler, Olimpíada de Yerevan 1996', c: 'As brancas podem tentar 11.a4 c4 12.Bc2 b4 13.a5 Qc7 14.Na4 Rc8 15.e4 b3 16.Bb1 Qxa5 17.e5, com jogo agudo.' }],
  ['c02', 'g', 'g', '(g)', '11... b4 12 Nd5 exd5 13 exd5+ Be7 14 dxc5', { a: '±', r: 'Addison–Berliner, EUA 1962', c: '11...b4?! 12.Nd5 exd5 13.exd5+ Be7 14.dxc5 é melhor para as brancas.' }],
  ['c02', 'h-A', 'h', '(h) A', '12... Be7 13 Bg5 b4 14 Na4 Qe5 15 Bxf6 Nxf6 16 Nb6 Rd8 17 Ba4+', { a: '⩲', r: 'Keres–Smyslov, Torneio de Candidatos 1950', c: '12...Be7 13.Bg5 b4 14.Na4 Qe5 15.Bxf6 Nxf6 16.Nb6 Rd8 17.Ba4+ é um pouco melhor para as brancas.' }],
  ['c02', 'h-B', 'h', '(h) B', '12... Bc5 13 Be3 Qe5 14 Nf3 Qh5 15 Bxc5 Nxc5 16 Nxb5 O-O 17 Nd6 Bxe4 18 Nxe4', { a: '⩲', r: 'Olesen–Kishnev, Copenhague 1991', c: '12...Bc5 13.Be3 Qe5 14.Nf3 Qh5 15.Bxc5 Nxc5 16.Nxb5 O-O 17.Nd6 Bxe4 18.Nxe4 é um pouco melhor para as brancas.' }],
  ['c02', 'i', 'i', '(i)', '15 Kh1 Be5 16 Bxf6 gxf6 17 Ncxb5 Qe7 18 Rxc5 Qxc5 19 Nxe6 fxe6 20 Qh5+ Ke7 21 Bxe6 Kxe6 22 Qg4+ Kf7 23 Rd7+ Qe7 24 Qh5+ Kf8 25 Qh6+ Kf7', { a: '=', r: 'Christiansen–Anand, Las Palmas 1993', c: '15.Kh1 Be5 16.Bxf6 gxf6 17.Ncxb5 Qe7! 18.Rxc5! Qxc5 19.Nxe6 fxe6 20.Qh5+ Ke7 21.Bxe6! Kxe6 22.Qg4+ Kf7 23.Rd7+ Qe7 24.Qh5+ Kf8 25.Qh6+ Kf7: igualdade depois das complicações.' }],
  // Coluna 3
  ['c03', 'j', 'j', '(j)', '15 Rad1 Bxe3 16 Qxe3 Nc5 17 Rd4 Nxb3', { a: '=', r: 'The Baron × Shredder (computadores), 2005', c: '15.Rad1 Bxe3 16.Qxe3 Nc5 17.Rd4 Nxb3 é igual.' }],
  // Coluna 4
  ['c04', 'k', 'k', '(k)', '9... Nbd7 10 axb5 axb5 11 Rxa8 Qxa8 12 Nc3 b4 13 Nb5 Qa5 14 e4 cxd4 15 Bf4 Bc5', { a: '∓', r: 'Medić–Danielian, Olimpíada de Bled 2002', c: 'O lance do texto é seguro, mas as pretas podem fazer melhor com o complicado 9...Nbd7 10.axb5 axb5 11.Rxa8 Qxa8 12.Nc3 b4 13.Nb5 Qa5 14.e4 cxd4! 15.Bf4 Bc5.' }],
  ['c04-k', '1', 'k', '(k) 13...Bxf3', '13... Bxf3 14 gxf3 Qb8 15 f4 Be7 16 e4', { a: '⩲', c: '13...Bxf3 14.gxf3 Qb8 15.f4 Be7 16.e4 é um pouco melhor para as brancas.' }],
  ['c04', 'l', 'l', '(l)', '11 Nc4 O-O 12 Rd1 Qc7 13 Bd2 Nbd7', { a: '=', r: 'Yusupov–Anand, Dortmund 1997', c: '11.Nc4 O-O 12.Rd1 Qc7 13.Bd2 Nbd7 é igual.' }],
  ['c04', 'm', 'm', '(m)', '15 Ba4 O-O 16 Nfe5 Rfd8', { a: '=', r: 'Vladimirov–Sorokin, Dubai 2002', c: '15.Ba4 O-O 16.Nfe5 Rfd8 é igual.' }],
  // Coluna 5
  ['c05', 'n', 'n', '(n)', '9... Bb7 10 a4 bxa4 11 Bc2 Be7 12 Bxa4+ Nbd7 13 Ne5 Rc8 14 d5', { a: '⩲', r: 'Endzelins–Szily, correspondência 1959', c: 'Um erro sutil é 9...Bb7 10.a4 bxa4 11.Bc2! Be7 12.Bxa4+ Nbd7 13.Ne5 Rc8 14.d5!, um pouco melhor para as brancas.' }],
  ['c05-n', '1', 'n', '(n) 14...Bxd5', '14... Bxd5 15 Nc3 O-O 16 Nxd5 exd5 17 Nc6', { a: '±', c: '14...Bxd5 15.Nc3 O-O 16.Nxd5 exd5 17.Nc6 ganha a qualidade.' }],
  ['c05', 'o', 'o', '(o)', '13 Ne5 Nc6 14 Rd1 Nb4 15 Bb1 Rc8', { a: '=', r: 'Rashkovsky–Kaidanov, URSS 1986', c: '13.Ne5 permite o imediato 13...Nc6! 14.Rd1 Nb4 15.Bb1 Rc8, cobrindo as casas-chave da defesa.' }],
  ['c05', 'p', 'p', '(p)', '15 Bxf6 Bxf6 16 Be4 Rb8 17 d5 exd5 18 Nxd5 g6', { a: '=', r: 'Dautov–Rublevsky, Budapeste 1996', c: '15.Bxf6 Bxf6 16.Be4 Rb8 17.d5 exd5 18.Nxd5 g6! é igual.' }],
  // Coluna 6
  ['c06', 'q-A', 'q', '(q) A', '8 dxc5 Bxc5 9 e4', { c: '8.dxc5 Bxc5 9.e4 transpõe para a coluna 10.' }],
  ['c06', 'q-B', 'q', '(q) B', '8 Rd1 b5 9 dxc5 Qc7 10 Bd3 Nb4 11 a4 bxa4 12 Rxa4 Rb8 13 Nc3 Bxc5', { a: '=', c: '8.Rd1 b5! 9.dxc5 Qc7 10.Bd3 Nb4 11.a4 bxa4 12.Rxa4 Rb8 13.Nc3 Bxc5 é igual.' }],
  ['c06', 'r', 'r', '(r)', '8... cxd4 9 Rd1 Na5 10 Nxd4 Nxc4', { a: '=', r: 'Fomichenko–Korchnoi, Banyoles 2006', c: 'Uma ideia nova é 8...cxd4 9.Rd1 Na5! 10.Nxd4 Nxc4, igual.' }],
  ['c06', 's', 's', '(s)', '15 Be3 Rfd8 16 Rac1 Nb4 17 Bxb7 Qxb7 18 a3 Rxd1+ 19 Rxd1 Nc6', { a: '=', r: 'Danilov–Narva, Tallinn 2002', c: '15.Be3 Rfd8 16.Rac1 Nb4! 17.Bxb7 Qxb7 18.a3 Rxd1+ 19.Rxd1 Nc6 é igual. (O livro traz 19.Nxd1; nenhum cavalo branco chega a d1.)' }],
]

const capitulo = {
  id: 'gda-a',
  arquivo: 'gda-a',
  nome: 'Gambito da Dama Aceito — linha principal com 7.Qe2',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Accepted (pp. 451–452), colunas 1–6',
  base: '1. d4 d5 2. c4 dxc4',
  corPadrao: 'b',
  ordem: 451,
  grupos: [
    { id: 'bb3', nome: '7...b5 8.Bb3', colunas: [1, 2, 3, 4] },
    { id: 'bd3', nome: '8.Bd3', colunas: [5] },
    { id: 'nc6', nome: '7...Nc6', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
