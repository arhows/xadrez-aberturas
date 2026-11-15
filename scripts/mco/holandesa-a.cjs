// Transcrição do MCO 15ª ed. — Defesa Holandesa, Variante Leningrado (pp. 495–496), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs holandesa-a
// Formato: ver gambito-do-rei.cjs. Dicas em holandesa-a-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// A nota (m) não tem lances (só a partida da coluna 4); a (q) não tem avaliação, e usamos ∞ (compensação pelo peão).
// Correção: na nota (u) o livro traz 16...Nfe4; só o cavalo de f6 alcança e4, e o lance se escreve 16...Ne4.
// Stockfish: na nota (u) o motor discorda do livro — 16...Ne4 perde material depois de 17.Nxe4 (cerca de +3,5).

const L = '1 d4 f5 2 g3 Nf6 3 Bg2 g6 4 Nf3 Bg7 5 O-O O-O 6 c4 d6 7 Nc3'
const Q = `${L} Qe8`

const colunas = {
  c01: [`${Q} 8 d5 Na6 9 Rb1 c6 10 b4 Bd7 11 dxc6 bxc6 12 a3 Nc7 13 Bb2 Ne6 14 c5 dxc5`, 'qe8', '7...Qe8 8.d5 Na6', '⩲',
    'Na Variante Leningrado as pretas fazem o fianqueto do bispo de f8 e mantêm os peões centrais flexíveis. Com 7...Qe8 a dama prepara ...e5. Depois de 8.d5 Na6 9.Rb1 c6 10.b4 Bd7 11.dxc6 bxc6 12.a3 Nc7 13.Bb2 Ne6 14.c5! dxc5 as brancas abrem o jogo na ala da dama e ficam um pouco melhor.'],
  c02: [`${Q} 8 d5 a5 9 Nd4 Na6 10 Bg5 Nc5 11 Qd2 Qf7 12 Bh6 Bxh6 13 Qxh6 Bd7 14 Qd2 Rac8`, 'qe8', '8...a5', '=',
    'Com 8...a5 as pretas garantem a casa c5 para o cavalo. Depois de 9.Nd4 Na6 10.Bg5 Nc5 11.Qd2 Qf7 12.Bh6 Bxh6 13.Qxh6 Bd7 14.Qd2 Rac8 a posição é mais ou menos igual (Dydyshko–Mainka, Senden 1997).'],
  c03: [`${Q} 8 Nd5 Nxd5 9 cxd5 Qb5 10 Ng5 Qb6 11 Be3 a5 12 h4 Na6 13 a3 Bd7 14 Qd3 Rfc8`, 'qe8', '8.Nd5', '⩲',
    'Com 8.Nd5 as brancas trocam o cavalo de f6 e abrem a coluna c. Depois de 8...Nxd5 9.cxd5 Qb5 10.Ng5 Qb6 11.Be3 a5 12.h4 Na6 13.a3 Bd7 14.Qd3 Rfc8 as brancas ficam um pouco melhor (Gelfand–Malaniuk, Elista 1998).'],
  c04: [`${Q} 8 Re1 h6 9 b3 Qf7 10 Qd3 Nc6 11 Ba3 a5 12 Nb5 Ne8 13 Bb2 g5 14 Qd2 e5`, 'qe8', '8.Re1', '=',
    'Com 8.Re1 as brancas preparam e4. Depois de 8...h6 9.b3 Qf7 10.Qd3 Nc6 11.Ba3 a5 12.Nb5 Ne8 13.Bb2 g5 14.Qd2 e5 as pretas conseguem ...e5 e o jogo é igual (Farago–Kopylov, Hamburgo 2000).'],
  c05: [`${L} Nc6 8 d5 Na5 9 Qa4 c5 10 dxc6 bxc6 11 Nd4 Bd7 12 Nxc6 Nxc6 13 Bxc6 Bxc6 14 Qxc6 Rc8`, 'nc6', '7...Nc6', '∞',
    'Com 7...Nc6 as pretas provocam 8.d5. Depois de 8...Na5 9.Qa4 c5 10.dxc6 bxc6 11.Nd4 Bd7 12.Nxc6 Nxc6 13.Bxc6 Bxc6 14.Qxc6 Rc8 as brancas ganham um peão, mas as pretas têm boa compensação.'],
  c06: [`${L} c6 8 d5 e5 9 dxe6 Bxe6 10 b3 Na6 11 Bb2 Qe7 12 Ng5 Nc5 13 Nxe6 Nxe6 14 e3 Rad8`, 'c6', '7...c6', '=',
    'Com 7...c6 as pretas preparam ...e5 sem colocar a dama em e8. Depois de 8.d5 e5 9.dxe6 Bxe6 10.b3 Na6 11.Bb2 Qe7 12.Ng5 Nc5 13.Nxe6 Nxe6 14.e3 Rad8 o jogo é igual (Horvath–McDonald, Budapeste 2003).'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '9 Nd4 Bd7 10 e4 fxe4 11 Nxe4 Nxe4 12 Bxe4 c6 13 Be3 Nc7 14 Rb1 Rd8', { a: '=', r: 'Likavsky–Ftáčnik, Liga Tcheca 2005', c: '9.Nd4 Bd7 10.e4 fxe4 11.Nxe4 Nxe4 12.Bxe4 c6 13.Be3 Nc7 14.Rb1 Rd8 é igual.' }],
  ['c01', 'b', 'b', '(b)', '11... Bxc6 12 Qb3 Ne4 13 Bb2 Nxc3 14 Bxc3 Bxc3 15 c5+ e6 16 Qxc3 dxc5 17 b5 Bxb5 18 Ne5', { a: '±', r: 'Kramnik–Malaniuk, Moscou 1994', c: '11...Bxc6 12.Qb3 Ne4 13.Bb2 Nxc3 14.Bxc3 Bxc3 15.c5+ e6 16.Qxc3 dxc5 17.b5 Bxb5 18.Ne5 dá ataque forte às brancas.' }],
  ['c01-b', '1', 'b', '(b) 15.Qxc3', '15 Qxc3 Rc8 16 Qe3', { a: '±', c: '15.Qxc3 Rc8 16.Qe3 também é melhor para as brancas.' }],
  ['c01', 'c', 'c', '(c)', '12 b5 cxb5 13 cxb5 Nc5 14 a4 Rc8', { a: '=', r: 'Haba–M. Gurevich, Liga Austríaca 2002', c: '12.b5 cxb5 13.cxb5 Nc5 14.a4 Rc8 é igual.' }],
  ['c01', 'd', 'd', '(d)', '15 Ne5 Rd8 16 Qb3 Kh8 17 bxc5 Nxc5 18 Qc4 Nb7 19 Qa6', { a: '⩲', r: 'van der Sterren–Onischuk, Bundesliga 2000', c: '15.Ne5 Rd8 16.Qb3 Kh8 17.bxc5 Nxc5 18.Qc4 Nb7 19.Qa6 é um pouco melhor para as brancas.' }],
  // Coluna 2
  ['c02', 'e-A', 'e', '(e) A', '9 Ne1 Na6 10 Nd3 Bd7 11 Rb1 c6', { a: '=', r: 'Rogozenko–McDonald, Budapeste 1995', c: '9.Ne1 Na6 10.Nd3 Bd7 11.Rb1 c6 é igual.' }],
  ['c02', 'e-B', 'e', '(e) B', '9 Be3 Na6 10 Qc1 Ng4 11 Bf4 Bd7', { a: '=', r: 'Kramnik–Bareev, Novgorod 1997', c: '9.Be3 Na6 10.Qc1 Ng4 11.Bf4 Bd7 é igual.' }],
  ['c02', 'f', 'f', '(f)', '10 e4 fxe4 11 Nxe4 Nxe4 12 Bxe4 Bh3 13 Re1 Nc5', { a: '=', r: 'Siebrecht–Nijboer, Campeonato Holandês 2006', c: '10.e4 fxe4 11.Nxe4 Nxe4 12.Bxe4 Bh3 13.Re1 Nc5 é igual.' }],
  ['c02', 'g', 'g', '(g)', '15 Rad1 a4', { a: '=', r: 'Dydyshko–Mainka, Senden 1997', c: '15.Rad1 a4 dá uma posição mais ou menos igual.' }],
  // Coluna 3
  ['c03', 'h', 'h', '(h)', '9... Nd7 10 Ng5 Nb6 11 Qc2 Bxd4 12 Qxc7 Qd7 13 Qc2 Qb5', { a: '=', r: 'Gyimesi–Malaniuk, Amplico Life 2005', c: '9...Nd7!? 10.Ng5 Nb6 parece funcionar para as pretas: 11.Qc2 Bxd4 12.Qxc7 Qd7 13.Qc2 Qb5 é igual.' }],
  ['c03', 'i', 'i', '(i)', '10... h6 11 Ne6 Bxe6 12 dxe6 d5 13 a4 Qb6 14 Bxd5 Rd8 15 Bg2 Rxd4 16 Qc2', { a: '⩲', r: 'Farago–Kopylov, Königspringer 2004', c: '10...h6 11.Ne6 Bxe6 12.dxe6 d5 13.a4 Qb6 14.Bxd5 Rd8 15.Bg2 Rxd4 16.Qc2 é um pouco melhor para as brancas.' }],
  ['c03', 'j', 'j', '(j)', '15 Ne6 Bxe6 16 dxe6 c6 17 d5', { a: '⩲', r: 'Gelfand–Malaniuk, Elista 1998', c: '15.Ne6 Bxe6 16.dxe6 c6 foi a partida; agora 17.d5 deixaria as brancas um pouco melhor.' }],
  // Coluna 4
  ['c04', 'k', 'k', '(k)', '8 b3 Na6 9 Ba3 c6 10 Qd3 Rb8', { a: '=', r: 'Miles–Kramnik, Moscou 1989', c: '8.b3 Na6 9.Ba3 c6 10.Qd3 Rb8 é igual.' }],
  ['c04', 'l', 'l', '(l)', '8... Qf7 9 Qd3 Nc6 10 Ng5 Qe8 11 Nd5 Nxd5 12 cxd5 Nd8 13 Bd2', { a: '⩲', r: 'Valzin–N. McDonald, Hastings 1997/98', c: '8...Qf7 9.Qd3 Nc6 10.Ng5 Qe8 11.Nd5 Nxd5 12.cxd5 Nd8 13.Bd2 é um pouco melhor para as brancas.' }],
  // Coluna 5
  ['c05', 'n', 'n', '(n)', '8... Ne5 9 Nxe5 dxe5 10 e4 f4 11 gxf4 exf4 12 e5 Ng4 13 e6 Ne5 14 Re1 Nxc4 15 Re4 Nd6 16 Rxf4 b6', { a: '=', r: 'Aaberg–Kobalia, Gibraltar 2006', c: 'Mais agudo é 8...Ne5 9.Nxe5 (9.Qb3 é mais lento) dxe5 10.e4 f4 11.gxf4 exf4 12.e5 Ng4 13.e6 Ne5 14.Re1 Nxc4 15.Re4 Nd6 16.Rxf4 b6, igual.' }],
  ['c05', 'o', 'o', '(o)', '9 Qd3 e5 10 dxe6 Bxe6 11 b3 Nc6 12 Rb1 Ng4', { a: '=', r: 'Bareev–Lastin, Rússia 1997', c: '9.Qd3 e5 10.dxe6 Bxe6 11.b3 Nc6 12.Rb1 Ng4 é mais ou menos igual.' }],
  ['c05', 'p', 'p', '(p)', '10... Nxc6 11 Rd1 Qa5 12 Qb3 Qb4 13 Qxb4', { a: '⩲', r: 'Yusupov–M. Gurevich, Linares 1991', c: '10...Nxc6 11.Rd1 Qa5 12.Qb3 Qb4 13.Qxb4 dá às brancas um final melhor.' }],
  ['c05', 'q', 'q', '(q)', '15 Qa6 Qd7', { a: '∞', r: 'N. McDonald', c: 'Depois de 15.Qa6 Qd7 as pretas têm boa compensação pelo peão.' }],
  // Coluna 6
  ['c06', 'r', 'r', '(r)', '9 e4 cxd5 10 cxd5 Na6 11 exf5 gxf5', { a: '=', r: 'Lagunov–Heidrich, Alemanha 1996', c: '9.e4 cxd5 10.cxd5 Na6 11.exf5 gxf5 é igual.' }],
  ['c06', 's', 's', '(s)', '10 Qd3 Na6 11 Ng5 Qe7 12 Bf4 Rad8 13 Rad1 Ng4 14 Nxe6 Qxe6', { a: '=', r: 'Anastasian–Gonzales, Aberto Aníbal 2001', c: '10.Qd3 Na6 11.Ng5 Qe7 12.Bf4 Rad8 13.Rad1 Ng4 14.Nxe6 Qxe6 é igual.' }],
  ['c06', 't', 't', '(t)', '10... Ne4 11 Nxe4 Bxa1 12 Nxd6 Qd7 13 Ba3 Bf6 14 e4', { a: '±', r: 'Schneider–Chernaiev, São Petersburgo 1993', c: '10...Ne4? é um erro: 11.Nxe4 Bxa1 12.Nxd6 Qd7 13.Ba3 Bf6 14.e4 é melhor para as brancas.' }],
  ['c06', 'u', 'u', '(u)', '15 Qc2 Rfe8 16 Rad1 Ne4', { a: '=', r: 'Horvath–McDonald, Budapeste 2003', c: '15.Qc2 Rfe8 16.Rad1 Ne4 é igual. (O Stockfish discorda: depois de 17.Nxe4 Bxb2 18.Qxb2 fxe4 19.Bxe4 as brancas ganham material, cerca de +3,5.)' }],
]

const capitulo = {
  id: 'holandesa-a',
  arquivo: 'holandesa-a',
  nome: 'Holandesa — Leningrado com 7...Qe8, 7...Nc6 e 7...c6',
  fonte: 'Modern Chess Openings — Dutch Defense (pp. 495–496), colunas 1–6',
  base: '1. d4 f5',
  corPadrao: 'b',
  ordem: 493,
  grupos: [
    { id: 'qe8', nome: '7...Qe8', colunas: [1, 2, 3, 4] },
    { id: 'nc6', nome: '7...Nc6', colunas: [5] },
    { id: 'c6', nome: '7...c6', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
