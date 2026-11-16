// Transcrição do MCO 15ª ed. — Defesa Budapeste (pp. 504–505), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs budapeste
// Formato: ver gambito-do-rei.cjs. Dicas em budapeste-dicas.cjs.
//
// Só a coluna 5 traz avaliação no fim; nas outras usamos a avaliação da nota que continua a coluna.
// Correções:
// - Nota (i): o livro traz 7 Nbd2 0-0 8 0-0 Re8 9 Nxe5..., impossível (as pretas já rocaram e não há cavalo preto em e5); ficou só 7.Nbd2.
// - Nota (m): o livro numera a linha a partir de "9 Nd5", mas ela é alternativa a 8.Nxe5; renumerada como 8.Nd5 Nxf3+ 9.gxf3...
// - Nota (o) B: o livro traz 5 Bb2, impossível (o peão está em b2); o lance que bloqueia o xeque é 5.Bd2.

const B = '1 d4 Nf6 2 c4 e5 3 dxe5'
const G = `${B} Ng4 4 Bf4 Nc6 5 Nf3 Bb4+`

const colunas = {
  c01: [`${G} 6 Nbd2 Qe7 7 e3 Ngxe5 8 Nxe5 Nxe5 9 Be2 O-O 10 O-O a5`, 'bf4', '3...Ng4 4.Bf4 Nc6 5.Nf3 Bb4+ 6.Nbd2', '=',
    'Na Budapeste as pretas entregam o peão de e5 para desenvolver as peças com rapidez. Com 4.Bf4 as brancas seguram o peão por enquanto. Contra 5...Bb4+ o simples 6.Nbd2 segue o desenvolvimento. Depois de 6...Qe7 7.e3 Ngxe5 8.Nxe5 Nxe5 9.Be2 O-O 10.O-O a5 o material fica igual e o jogo também (Rogozenko–Moldovan, Romênia 2000).'],
  c02: [`${G} 6 Nc3 Bxc3+ 7 bxc3 Qe7 8 Qd5 f6 9 exf6 Nxf6 10 Qd3 d6`, 'bf4', '6.Nc3', '⩲',
    'Com 6.Nc3 as brancas ficam com o peão, mas aceitam peões dobrados e isolados na coluna c. Depois de 6...Bxc3+ 7.bxc3 Qe7 8.Qd5 f6 9.exf6 Nxf6 10.Qd3 d6 as pretas têm alguma compensação, e as brancas ficam um pouco melhor (Rogers–Miezis, Reykjavik 2004).'],
  c03: [`${B} Ng4 4 Nf3 Bc5 5 e3 Nc6 6 Be2 O-O 7 O-O Re8 8 Nc3 Ncxe5 9 Nxe5 Nxe5 10 Kh1 d6`, 'nf3', '4.Nf3 Bc5', '±',
    'Com 4.Nf3 as brancas se desenvolvem sem tentar segurar o peão. Depois de 4...Bc5 5.e3 Nc6 6.Be2 O-O 7.O-O Re8 8.Nc3 Ncxe5 9.Nxe5 Nxe5 10.Kh1 d6 as pretas recuperam o peão, mas as brancas ficam melhor com o par de bispos (Beliavsky–Mohr, Portorož 1997).'],
  c04: [`${B} Ng4 4 Nf3 Nc6 5 Bg5 Be7 6 Bxe7 Qxe7 7 Nc3 Ngxe5 8 Nxe5 Qxe5 9 e3 O-O 10 Be2 d6`, 'nf3', '4...Nc6', '=',
    'Com 4...Nc6 5.Bg5 as brancas trocam os bispos de casas escuras. Depois de 5...Be7 6.Bxe7 Qxe7 7.Nc3 Ngxe5 8.Nxe5 Qxe5 9.e3 O-O 10.Be2 d6 o jogo é igual.'],
  c05: [`${B} Ng4 4 e4 Nxe5 5 f4 Nec6 6 Be3 Bb4+ 7 Nc3 Qh4+ 8 g3 Bxc3+ 9 bxc3 Qe7 10 Bd3 Na6`, 'e4', '4.e4', '=',
    'Com 4.e4 Nxe5 5.f4 as brancas devolvem o peão e montam um grande centro, ganhando tempo contra o cavalo. Depois de 5...Nec6 6.Be3 Bb4+ 7.Nc3 Qh4+ 8.g3 Bxc3+ 9.bxc3 Qe7 10.Bd3 Na6 o jogo é igual (Keres–Gilg, Praga 1937).'],
  c06: [`${B} Ne4 4 a3 Nc6 5 Nf3 d6 6 Qc2 Bf5 7 Nc3 Nxf2 8 Qxf5 Nxh1 9 e6 fxe6 10 Qxe6+ Qe7`, 'fajarowicz', '3...Ne4 (Fajarowicz)', '±',
    'A Variante Fajarowicz, 3...Ne4, é cheia de armadilhas, mas fica suspeita depois de 4.a3!, que tira b4 do bispo preto. Depois de 4...Nc6 5.Nf3 d6 6.Qc2 Bf5 7.Nc3! Nxf2 8.Qxf5 Nxh1 9.e6 fxe6 10.Qxe6+ Qe7 as brancas ficam melhor (Reshevsky–Bisguier, Nova York 1955).'],
}

const notas = [
  // Coluna 1
  ['c01', 'a-A', 'a', '(a) A', '3 d5 Bc5 4 Nc3 d6', { a: '=', c: 'Recusar o sacrifício dá às pretas um jogo fácil: 3.d5 Bc5 4.Nc3 d6 é igual.' }],
  ['c01', 'a-B', 'a', '(a) B', '3 e3 exd4 4 exd4 d5', { a: '=', c: '3.e3 exd4 4.exd4 d5 também é igual.' }],
  ['c01', 'b', 'b', '(b)', '4... g5 5 Bd2 Nxe5 6 Bc3 Bg7 7 e3 g4 8 Ne2 d6 9 Nf4 h5 10 Qe2', { a: '±', c: 'O impetuoso 4...g5 (a ideia de Balogh) 5.Bd2 Nxe5 6.Bc3 Bg7 7.e3 g4 8.Ne2 d6 9.Nf4 h5 10.Qe2 é melhor para as brancas.' }],
  ['c01', 'c', 'c', '(c)', '7 a3 Ngxe5 8 Nxe5 Nxe5 9 e3 Bxd2+ 10 Qxd2 d6 11 b4 O-O 12 Be2 b6 13 O-O Bb7 14 Qc3 Nd7', { a: '=', r: 'Lacrosse–Lukas, Vlissingen 2003', c: 'Contra 7.a3 as pretas jogam 7...Ngxe5!, que ameaça 8...Nd3 mate. Depois de 8.Nxe5 Nxe5 9.e3 Bxd2+ 10.Qxd2 d6 11.b4 O-O 12.Be2 b6 13.O-O Bb7 14.Qc3 Nd7, com ...a5 a seguir, o jogo é igual.' }],
  ['c01', 'd', 'd', '(d)', '9... b6 10 O-O Bxd2 11 Qxd2 Bb7 12 Rac1 d6 13 b4 O-O 14 c5', { a: '±', r: 'Alterman–Blatny, Pardubice 1993', c: '9...b6 10.O-O Bxd2 11.Qxd2 Bb7 12.Rac1 d6 13.b4 O-O 14.c5 é melhor para as brancas.' }],
  ['c01', 'e', 'e', '(e)', '11 Nb3 a4 12 a3 Ba5 13 Nd4 Bb6 14 Nb5 d6 15 Nc3 Qe8', { a: '=', r: 'Rogozenko–Moldovan, Romênia 2000', c: '11.Nb3 a4 12.a3 Ba5 13.Nd4 Bb6 14.Nb5 d6 15.Nc3 Qe8 é igual.' }],
  // Coluna 2
  ['c02', 'f', 'f', '(f)', '6... Qe7 7 Rc1 Ngxe5 8 Nxe5 Nxe5 9 a3 Bxc3+ 10 Rxc3 O-O 11 g3 d6 12 Bg2', { a: '⩲', r: 'Korchnoi–Gómez Esteban, Pamplona 1990', c: '6...Qe7 deixa as brancas evitar os peões dobrados: 7.Rc1 Ngxe5 8.Nxe5 Nxe5 9.a3 Bxc3+ 10.Rxc3 O-O 11.g3 d6 12.Bg2 é um pouco melhor para elas.' }],
  ['c02', 'g', 'g', '(g)', '11 g3 O-O 12 Bg2 Bd7 13 O-O Rae8 14 c5 dxc5 15 Bxc7', { a: '⩲', r: 'Rogers–Miezis, Reykjavik 2004', c: '11.g3 O-O 12.Bg2 Bd7 13.O-O Rae8 14.c5 dxc5 15.Bxc7 é um pouco melhor para as brancas.' }],
  // Coluna 3
  ['c03', 'h', 'h', '(h)', '6 Nc3 O-O 7 Bd3 Re8 8 a3 Ngxe5 9 b4 Nxf3+ 10 Qxf3 Ne5 11 Qe2 Nxd3+ 12 Qxd3 Bd6 13 O-O b6 14 Ra2 a5 15 b5 Bb7', { a: '∓', r: 'Gamboa–Blatny, Nova York 1996', c: '6.Nc3 O-O 7.Bd3 Re8 8.a3 Ngxe5 9.b4 Nxf3+ 10.Qxf3 Ne5 11.Qe2 Nxd3+ 12.Qxd3 Bd6 13.O-O b6 é igual; depois de 14.Ra2?! a5 15.b5 Bb7 as pretas ficam melhor.' }],
  ['c03', 'i', 'i', '(i)', '7 Nbd2', { a: '=', r: 'Yusupov–Piket, Amsterdã 1994', c: '7.Nbd2 leva a chances equilibradas: mais tarde a torre preta vai de a6 para a ala do rei. O livro segue com 7...O-O, impossível porque as pretas já rocaram.' }],
  ['c03', 'j', 'j', '(j)', '10 b3 a5 11 Ne4 Bf8 12 c5 Qh4 13 f4 Ng4 14 Bxg4 Rxe4 15 Bf3 Re8', { a: '=', r: 'Jelen–Mohr, Campeonato Esloveno 1993', c: '10.b3 a5 11.Ne4 Bf8 12.c5 Qh4 13.f4 Ng4! 14.Bxg4 Rxe4 15.Bf3 Re8 terminou empatado.' }],
  ['c03', 'k', 'k', '(k)', '11 Na4 b6 12 Bd2 a5 13 Nxc5 bxc5 14 f4 Nd7 15 Bf3 Rb8 16 Qc2 a4 17 Rae1', { a: '±', r: 'Beliavsky–Mohr, Portorož 1997', c: '11.Na4 b6 12.Bd2 a5 13.Nxc5 bxc5 14.f4 Nd7 15.Bf3 Rb8 16.Qc2 a4 17.Rae1 é melhor para as brancas, que têm o par de bispos e podem avançar no centro.' }],
  // Coluna 4
  ['c04', 'l-A', 'l', '(l) A', '5 Bf4', { c: '5.Bf4 transpõe para a coluna 1.' }],
  ['c04', 'l-B', 'l', '(l) B', '5 e3 Bb4+ 6 Bd2 Bxd2+ 7 Qxd2 O-O 8 Be2 Ncxe5 9 Nxe5 Nxe5 10 O-O d6 11 Nc3 Bg4', { a: '=', r: 'Gutman–Shvidler, Beersheba 1982', c: '5.e3 Bb4+ 6.Bd2 Bxd2+ 7.Qxd2 O-O 8.Be2 Ncxe5 9.Nxe5 Nxe5 10.O-O d6 11.Nc3 Bg4 é igual.' }],
  ['c04', 'm', 'm', '(m)', '8 Nd5 Nxf3+ 9 gxf3 Qe5 10 Qd2 Ne7 11 f4 Qd6 12 Bg2 Nxd5 13 cxd5 c5 14 O-O f5', { a: '=', r: 'Chloupek–Pokorný, Tchecoslováquia 1992', c: '8.Nd5 Nxf3+ 9.gxf3 Qe5 10.Qd2 Ne7 11.f4 Qd6 12.Bg2 Nxd5 13.cxd5 c5! 14.O-O f5 é igual. (O livro numera a linha a partir de 9.Nd5.)' }],
  ['c04', 'n', 'n', '(n)', '11 O-O Be6 12 Qd2 a6 13 Rac1 Rac8', { a: '=', c: '11.O-O Be6 12.Qd2 a6 13.Rac1 Rac8 é igual.' }],
  // Coluna 5
  ['c05', 'o-A', 'o', '(o) A', '4 Qd4 d6 5 exd6 Bxd6 6 Qe4+ Be6 7 Nc3 O-O 8 Nf3 Qd7 9 Nd4 Bxc4 10 Nf5 Be6 11 Nxd6 cxd6', { a: '∓', r: 'Beliavsky–Epishin, Reggio Emilia 1991', c: 'O raro 4.Qd4? d6 5.exd6 Bxd6 6.Qe4+ Be6! 7.Nc3 O-O 8.Nf3 Qd7 9.Nd4 Bxc4 10.Nf5 Be6 11.Nxd6 cxd6 deixa as pretas à frente no desenvolvimento.' }],
  ['c05', 'o-B', 'o', '(o) B', '4 e6 Bb4+ 5 Bd2 Qf6 6 exf7+ Kxf7 7 Nf3 Qxb2', { a: '=', r: 'Khasin–A. Ivanov, URSS 1979', c: 'O raro 4.e6 Bb4+ 5.Bd2 Qf6! 6.exf7+ Kxf7 7.Nf3 Qxb2 é igual. (O livro traz 5.Bb2, impossível.)' }],
  ['c05', 'p', 'p', '(p)', '5... Ng6 6 Be3 Bb4+ 7 Nd2 Qe7 8 Kf2 Bxd2 9 Qxd2 Qxe4 10 Bd3', { c: '5...Ng6 6.Be3 Bb4+ 7.Nd2 Qe7 8.Kf2 Bxd2 9.Qxd2 Qxe4 10.Bd3 é um sacrifício de peão promissor para as brancas.' }],
  ['c05', 'q', 'q', '(q)', '6 a3 a5 7 Be3 Na6 8 Nc3 Bc5 9 Qd2 d6 10 Bd3 Qh4+ 11 g3 Qh5', { a: '=', r: 'Dautov–van Wely, Alemanha 1994', c: '6.a3 a5 7.Be3 Na6! 8.Nc3 Bc5 9.Qd2 d6 10.Bd3 Qh4+ 11.g3 Qh5 é igual.' }],
  ['c05', 'r', 'r', '(r)', '7 Nd2 Qe7 8 a3 Qxe4 9 Kf2 Bxd2 10 Qxd2 O-O 11 Bd3 Qe7 12 Nf3 d6 13 Rae1 Qf6 14 Qc2 h6 15 b4 Bg4', { a: '∓', r: 'Dautov–Blatny, Bad Wörishofen 1991', c: '7.Nd2 Qe7 8.a3 Qxe4 9.Kf2 Bxd2 10.Qxd2 O-O 11.Bd3 Qe7 12.Nf3 d6 13.Rae1 Qf6 14.Qc2 h6 15.b4 Bg4 é melhor para as pretas.' }],
  // Coluna 6
  ['c06', 's-A', 's', '(s) A', '4 Nf3 Bb4+ 5 Bd2 Nxd2 6 Nbxd2 Nc6 7 a3 Bxd2+ 8 Qxd2 Qe7 9 Qc3 O-O 10 Rd1 Re8 11 Rd5', { a: '±', r: 'S. Bekker-Jensen–Olsson, Copenhague 2005', c: '4.Nf3 Bb4+ 5.Bd2 Nxd2 6.Nbxd2 Nc6 7.a3 Bxd2+ 8.Qxd2 Qe7 9.Qc3 O-O 10.Rd1 Re8 11.Rd5 é melhor para as brancas.' }],
  ['c06', 's-B', 's', '(s) B', '4 Qc2 Bb4+ 5 Nc3 d5 6 exd6 Bf5 7 Bd2 Nxd6 8 e4 Bxc3 9 Bxc3 Bxe4 10 Qd2 O-O 11 O-O-O Nd7', { a: '=', c: '4.Qc2 Bb4+ 5.Nc3 d5 6.exd6 Bf5 7.Bd2 Nxd6 8.e4 Bxc3 9.Bxc3 Bxe4 10.Qd2 O-O 11.O-O-O Nd7 é igual.' }],
  ['c06', 't', 't', '(t)', '4... b6 5 Nf3 Bb7 6 Nbd2 Qe7 7 Qc2', { a: '±', r: 'Hillarp Persson–Romero Holmes, Bali 2003', c: '4...b6 5.Nf3 Bb7 6.Nbd2 Qe7 7.Qc2 é melhor para as brancas.' }],
  ['c06', 'u', 'u', '(u)', '6 exd6 Bxd6 7 Nbd2 Bf5 8 g3 Bc5 9 e3 Qf6 10 Bg2 O-O-O', { r: 'Olsen–Conquest, Reykjavik 1996', c: '6.exd6 Bxd6 7.Nbd2 Bf5 8.g3 Bc5 9.e3 Qf6 10.Bg2 O-O-O deu às pretas uma posição muito ativa.' }],
  ['c06', 'v', 'v', '(v)', '11 Qd5 h6 12 g3 g5 13 Bg2', { a: '±', r: 'Reshevsky–Bisguier, Nova York 1955', c: '11.Qd5 h6 12.g3 g5 13.Bg2 é melhor para as brancas.' }],
]

const capitulo = {
  id: 'budapeste',
  arquivo: 'budapeste',
  nome: 'Defesa Budapeste',
  fonte: 'Modern Chess Openings — Budapest Defense (pp. 504–505), colunas 1–6',
  base: '1. d4 Nf6 2. c4 e5',
  corPadrao: 'b',
  ordem: 503,
  grupos: [
    { id: 'bf4', nome: '3...Ng4 4.Bf4', colunas: [1, 2] },
    { id: 'nf3', nome: '4.Nf3', colunas: [3, 4] },
    { id: 'e4', nome: '4.e4', colunas: [5] },
    { id: 'fajarowicz', nome: '3...Ne4 (Fajarowicz)', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
