// Transcrição do MCO 15ª ed. — Abertura Catalã, Variante Fechada, outros 6º lances (pp. 534–535), colunas 43–48.
// Gerar: node scripts/mco/gerar.cjs catalana-h
// Formato: ver gambito-do-rei.cjs. Dicas em catalana-h-dicas.cjs.
//
// Errata: coluna 45, o livro traz "12...dxe6", impossível (as pretas já não têm peão em d);
// o lance é 12...fxe6 (Topalov–Kramnik, Linares 1997; a nota (f) segue com ...Rf6 pela coluna f aberta).
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Nota (e) fala de 16.c5, mas a coluna termina no 14º lance e o livro não dá o 15º: entrou só no resumo da coluna 44.
// Nota (b): a ordem de lances da partida Lautier–Kramnik é nossa (o livro só descreve a posição:
// bispo em a6 e cavalo em b8 depois de 10.Nd2).

const A = '1 d4 Nf6 2 c4 e6 3 g3 d5 4 Bg2 Be7 5 Nf3 O-O 6 O-O'

const colunas = {
  c43: [`${A} Nbd7 7 b3 c6 8 Bb2 b6 9 Nc3 a5 10 Nd2 Ba6 11 e4 dxc4 12 e5 Nd5 13 bxc4 Nxc3 14 Bxc3 Rc8`, 'nbd7', '6...Nbd7 7.b3', '⩲',
    'Com 6...Nbd7 as pretas mantêm d5 e preparam ...c6 e ...b6. Depois de 7.b3 c6 8.Bb2 b6 9.Nc3 a5 10.Nd2 Ba6 11.e4 dxc4 12.e5 Nd5 13.bxc4 Nxc3 14.Bxc3 Rc8, com 15.Re1 as brancas ficam um pouco melhor.'],
  c44: [`${A} Nbd7 7 Qc2 c6 8 Rd1 b6 9 Bf4 Bb7 10 Nc3 Rc8 11 Ne5 Nh5 12 Be3 Nhf6 13 h3 b5 14 Nxd7 Nxd7`, 'nbd7', '7.Qc2 c6 8.Rd1', '=',
    'Com 7.Qc2 c6 8.Rd1 b6 9.Bf4 as brancas desenvolvem o bispo antes de e3. Depois de 9...Bb7 10.Nc3 Rc8 11.Ne5 Nh5 12.Be3 Nhf6 13.h3 b5 14.Nxd7 Nxd7 o jogo é igual: em Beliavsky–Yusupov, Úbeda 1997, as brancas jogaram 16.c5, e Yusupov dá 16...a5 como igual.'],
  c45: [`${A} c6 7 Nc3 dxc4 8 a4 Nbd7 9 e4 e5 10 dxe5 Ng4 11 Bf4 Qa5 12 e6 fxe6 13 Qe2 Nge5 14 Nd4 Nd3`, 'c6', '6...c6 7.Nc3 dxc4', '⩱',
    'Com 6...c6 7.Nc3 dxc4 as pretas tomam o peão: é o Gambito Catalão. Depois de 8.a4 Nbd7 9.e4 e5 10.dxe5 Ng4 11.Bf4 Qa5 12.e6 fxe6 13.Qe2 Nge5 14.Nd4 Nd3 a luta é selvagem e as pretas talvez fiquem um pouco melhor.'],
  c46: [`${A} c6 7 Nbd2 b6 8 Qc2 Bb7 9 e4 Na6 10 a3 c5 11 e5 Nd7 12 dxc5 bxc5 13 Re1 Qc7 14 h4 Rad8`, 'c6', '7.Nbd2', '⩲',
    'Com 7.Nbd2 b6 8.Qc2 Bb7 9.e4 as brancas ocupam o centro. Depois de 9...Na6 10.a3 c5 11.e5 Nd7 12.dxc5 bxc5 13.Re1 Qc7 14.h4 Rad8, com 15.Nf1 as brancas ficam um pouco melhor.'],
  c47: [`${A} c5 7 cxd5 Nxd5 8 dxc5 Bxc5 9 a3 Nc6 10 b4 Be7 11 Bb2 Bf6 12 Qb3 Bd7 13 Nbd2 Bxb2 14 Qxb2 Qe7`, 'c5', '6...c5', '⩲',
    'Com 6...c5 as pretas atacam o centro logo. Depois de 7.cxd5 Nxd5 8.dxc5 Bxc5 9.a3 Nc6 10.b4 Be7 11.Bb2 Bf6 12.Qb3 Bd7 13.Nbd2 Bxb2 14.Qxb2 Qe7, com 15.Rac1 as brancas ficam um pouco melhor.'],
  c48: [`${A} Na6 7 Nc3 c5 8 cxd5 exd5 9 dxc5 Nxc5 10 Be3 Nce4 11 Rc1 Be6 12 Nd4 Bd7 13 Nxe4 dxe4 14 Nb3 h6`, 'na6', '6...Na6', '⩲',
    'Com 6...Na6 o cavalo vai a c5 depois de ...c5. Depois de 7.Nc3 c5 8.cxd5 exd5 9.dxc5 Nxc5 10.Be3 Nce4 11.Rc1 Be6 12.Nd4 Bd7 13.Nxe4 dxe4 14.Nb3 h6 as pretas ficam com o peão isolado e, com 15.Qd4, as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 43
  ['c43', 'a-A', 'a', '(a) A', '10 Re1 Ba6 11 cxd5 cxd5 12 e4', { a: '=', c: '10.Re1 Ba6 11.cxd5 cxd5 12.e4 é igual.' }],
  ['c43', 'a-B', 'a', '(a) B', '10 Ne5 Nxe5 11 dxe5 Nd7 12 cxd5 cxd5 13 e4 Ba6 14 exd5', { r: 'Crepinšek–Minev, Maribor 1967', c: '10.Ne5 Nxe5 11.dxe5 Nd7 12.cxd5 cxd5 13.e4 Ba6 14.exd5 é um sacrifício de qualidade promissor.' }],
  ['c43', 'b', 'b', '(b)', '15 Re1', { a: '⩲', r: 'Keres–Böök, Kemeri 1937', c: '15.Re1 é um pouco melhor para as brancas.' }],
  ['c43-b', '1', 'b', '(b) Kramnik', '6... c6 7 b3 b6 8 Bb2 a5 9 Nc3 Ba6 10 Nd2 Ra7 11 Qc2 Rd7 12 e3 c5 13 Rfd1 cxd4 14 exd4 Nc6', { a: '=', r: 'Lautier–Kramnik, match 1993', c: 'Kramnik não jogou 6...Nbd7: chegou à posição depois de 10.Nd2 com o bispo já em a6 e o cavalo ainda em b8. Seguiu 10...Ra7 11.Qc2 Rd7 12.e3 c5 13.Rfd1 cxd4 14.exd4 Nc6, com igualdade.' }],
  // Coluna 44
  ['c44', 'c', 'c', '(c)', '10... Nh5 11 Be5 f6 12 Bf4 Nxf4 13 gxf4 f5 14 e3 Rc8 15 Rac1 Bd6', { a: '=', r: 'El Debs–Leitão, Brasil 2006', c: '10...Nh5 11.Be5 f6 12.Bf4 Nxf4 13.gxf4 f5 14.e3 Rc8 15.Rac1 Bd6 é igual.' }],
  ['c44', 'd', 'd', '(d)', '11 Rac1 Nh5 12 Qb3 Nxf4 13 gxf4 Bd6 14 e3 Qe7', { a: '=', r: 'Piket–Seirawan, Amsterdã 1996', c: '11.Rac1 Nh5 12.Qb3 Nxf4 13.gxf4 Bd6 14.e3 Qe7 é igual.' }],
  // Coluna 45
  ['c45', 'f', 'f', '(f)', '15 Nxe6 Rf6 16 Bc7 Qb4', { a: '⩱', r: 'Topalov–Kramnik, Linares 1997', c: 'A coluna mostra o jogo típico do Gambito Catalão. 15.Nxe6 Rf6 16.Bc7 Qb4 deu uma luta selvagem, talvez com pequena vantagem das pretas.' }],
  ['c45-f', '1', 'f', '(f) 14...Nb6', '14... Nb6', { c: '14...Nd3 melhora o antigo 14...Nb6.' }],
  // Coluna 46
  ['c46', 'g', 'g', '(g)', '7 Qc2 b6 8 Ne5 Bb7 9 Bf4 dxc4 10 Qxc4 Ba6 11 Qc2 Qxd4 12 Rd1 Qc5 13 Nc3', { r: 'Piket–Brenninkmeijer, Groningen 1998', c: '7.Qc2 b6 8.Ne5 Bb7 9.Bf4 dxc4 10.Qxc4 Ba6 11.Qc2 Qxd4 12.Rd1 Qc5 13.Nc3 foi um sacrifício de peão promissor.' }],
  ['c46', 'h', 'h', '(h)', '10... dxc4 11 Nxc4 b5 12 Ncd2 c5 13 e5 Nd5 14 Ne4', { a: '⩲', r: 'Kaidanov–Nenashev, Lucerna 1993', c: '10...dxc4 11.Nxc4 b5 12.Ncd2 c5 13.e5 Nd5 14.Ne4 é um pouco melhor para as brancas.' }],
  ['c46', 'i', 'i', '(i)', '15 Nf1 Nab8 16 cxd5 Bxd5 17 Bg5', { a: '⩲', r: 'Kožul–C. Hansen, Wijk aan Zee 1991', c: '15.Nf1 Nab8 16.cxd5 Bxd5 17.Bg5 é um pouco melhor para as brancas.' }],
  // Coluna 47
  ['c47', 'j', 'j', '(j)', '7... Qxd5 8 Nc3 Qh5 9 dxc5 Rd8 10 Qc2', { a: '⩲', r: 'Lombardy–Navarro, México 1980', c: '7...Qxd5 8.Nc3 Qh5 9.dxc5 Rd8 10.Qc2 é um pouco melhor para as brancas.' }],
  ['c47-j', '1', 'j', '(j) 7...exd5', '7... exd5', { c: '7...exd5 é a Defesa Tarrasch.' }],
  ['c47', 'k', 'k', '(k)', '8 e4 Nf6 9 Nc3 Nc6 10 dxc5 Qxd1 11 Rxd1 Bxc5 12 h3', { a: '⩲', r: 'Helm–Lahlum, Bergen 2002', c: 'Também 8.e4 Nf6 9.Nc3 Nc6 10.dxc5 Qxd1 11.Rxd1 Bxc5 12.h3, um pouco melhor para as brancas.' }],
  ['c47', 'l', 'l', '(l)', '15 Rac1 Rfc8 16 e4 Nb6 17 e5 a5 18 bxa5 Nd5', { a: '⩲', r: 'Stohl–Atalik, Aberto de Pequim 1996', c: '15.Rac1 Rfc8 16.e4 Nb6 17.e5 a5 18.bxa5 Nd5 é um pouco melhor para as brancas.' }],
  ['c47-l', '1', 'l', '(l) 18.b5', '18 b5 Na7 19 Nd4 Na4', { r: 'Atalik', c: '18.b5 Na7 19.Nd4 Na4 dá contrajogo às pretas.' }],
  // Coluna 48
  ['c48', 'm', 'm', '(m)', '10... Bf5 11 Rc1 Rc8 12 Nd4 Bg6 13 Bh3', { a: '±', c: '10...Bf5 11.Rc1 Rc8 12.Nd4 Bg6 13.Bh3 é melhor para as brancas.' }],
  ['c48', 'n', 'n', '(n)', '15 Qd4', { a: '⩲', r: 'Tukmakov–Kuzmin, Lvov 1990', c: '15.Qd4 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'catalana-h',
  arquivo: 'catalana-h',
  nome: 'Catalã — Fechada, outros 6º lances',
  fonte: 'Modern Chess Openings — Catalan Opening (pp. 534–535), colunas 43–48',
  base: '1. d4 Nf6 2. c4 e6 3. g3',
  corPadrao: 'w',
  ordem: 534,
  grupos: [
    { id: 'nbd7', nome: '6...Nbd7', colunas: [43, 44] },
    { id: 'c6', nome: '6...c6', colunas: [45, 46] },
    { id: 'c5', nome: '6...c5', colunas: [47] },
    { id: 'na6', nome: '6...Na6', colunas: [48] },
  ],
}

module.exports = { capitulo, colunas, notas }
