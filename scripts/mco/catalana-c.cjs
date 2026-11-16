// Transcrição do MCO 15ª ed. — Abertura Catalã, Variante Aberta com 5...c5 6.O-O Nc6 (pp. 524–525), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs catalana-c
// Formato: ver gambito-do-rei.cjs. Dicas em catalana-c-dicas.cjs.
//
// Só a coluna 14 traz avaliação no fim; nas outras usamos a avaliação da nota que continua a coluna.
// As notas (c) e (j) não trazem avaliação (só lances fora de moda ou sugeridos).
// Correção: a nota (k) traz "17 17 e3"; o número repetido foi tirado (16...Bf6 17.e3 g6).

const A = '1 d4 Nf6 2 c4 e6 3 g3 d5 4 Bg2 dxc4 5 Nf3 c5 6 O-O Nc6'
const E = `${A} 7 Ne5 Bd7 8 Na3 cxd4 9 Naxc4`
const Q = `${A} 7 Qa4`

const colunas = {
  c13: [`${E} Bc5 10 Qb3 O-O 11 Bf4 Qc8 12 Rac1 Nd5 13 Nd3 Nxf4 14 gxf4 Be7`, 'ne5', '7.Ne5 Bd7 8.Na3 cxd4 9.Naxc4 Bc5', '⩲',
    'Com 5...c5 e 6...Nc6 as pretas pressionam logo o peão de d4. Com 7.Ne5 as brancas abrem o bispo de g2 contra o cavalo de c6. Depois de 7...Bd7 8.Na3 cxd4 9.Naxc4 o peão de d4 é das pretas, mas as peças brancas ficam muito ativas. Após 9...Bc5 10.Qb3 O-O 11.Bf4 Qc8 12.Rac1 Nd5 13.Nd3 Nxf4 14.gxf4 Be7 as brancas ficam um pouco melhor.'],
  c14: [`${E} Nxe5 10 Nxe5 Qb6 11 Nxd7 Nxd7 12 Qa4 Qb4 13 Qxb4 Bxb4 14 Bxb7 Rb8`, 'ne5', '9...Nxe5', '⩲',
    'Com 9...Nxe5 10.Nxe5 Qb6 as pretas trocam peças. Depois de 11.Nxd7 Nxd7 12.Qa4 Qb4 13.Qxb4 Bxb4 14.Bxb7 Rb8 as brancas recuperam o peão e ficam com um final um pouco melhor, graças ao par de bispos.'],
  c15: [`${E} Be7 10 Qb3 Qc8 11 Bf4 O-O 12 Rac1 Nd5 13 Rfd1 Nxf4 14 gxf4 Rb8`, 'ne5', '9...Be7', '=',
    'Com 9...Be7 as pretas desenvolvem o bispo antes de rocar. Depois de 10.Qb3 Qc8 11.Bf4 O-O 12.Rac1 Nd5 13.Rfd1 Nxf4 14.gxf4 Rb8 as pretas trocam o bispo de f4 e o jogo é igual.'],
  c16: [`${Q} Bd7 8 Qxc4 b5 9 Qd3 Rc8 10 dxc5 Bxc5 11 Nc3 b4 12 Ne4 Nxe4 13 Qxe4 Ne7 14 Ne5 Bb5`, 'qa4', '7.Qa4 Bd7 8.Qxc4 b5', '=',
    'Com 7.Qa4 as brancas cravam o cavalo de c6 e recuperam logo o peão de c4. Depois de 7...Bd7 8.Qxc4 b5 a dama perde tempo; após 9.Qd3 Rc8 10.dxc5 Bxc5 11.Nc3 b4 12.Ne4 Nxe4 13.Qxe4 Ne7! 14.Ne5 Bb5 o jogo é igual.'],
  c17: [`${Q} Bd7 8 Qxc4 cxd4 9 Nxd4 Rc8 10 Nc3 Nxd4 11 Qxd4 Bc5 12 Qh4 b5 13 Bg5 Be7 14 Rfd1 Rc4`, 'qa4', '8...cxd4', '=',
    'Com 8...cxd4 9.Nxd4 Rc8 as pretas abrem a coluna c. Depois de 10.Nc3 Nxd4 11.Qxd4 Bc5 12.Qh4 b5 13.Bg5 Be7 14.Rfd1 Rc4 as peças pretas ficam ativas e o jogo é igual.'],
  c18: [`${Q} cxd4 8 Nxd4 Qxd4 9 Bxc6+ Bd7 10 Rd1 Qxd1+ 11 Qxd1 Bxc6 12 Nd2 h5 13 h3 Rd8 14 Qc2 Bc5`, 'qa4', '7...cxd4', '±',
    'Com 7...cxd4 8.Nxd4 Qxd4 9.Bxc6+ Bd7 10.Rd1 Qxd1+ 11.Qxd1 Bxc6 as brancas ficam com a dama contra torre, bispo e peão. Depois de 12.Nd2 h5 13.h3 Rd8 14.Qc2 Bc5 15.Nxc4 a vantagem material das brancas acabou prevalecendo (Hovde–Groiss, por correspondência 1984–90).'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '6... cxd4 7 Nxd4 Qb6 8 Nc3 Bd7 9 Be3 Bc5 10 b4 cxb3 11 Rb1 Bxd4 12 Bxd4 Qc7 13 Qxb3', { a: '±', r: 'V. Mikhalevski–Murey, Israel 1997', c: '6...cxd4 7.Nxd4 Qb6 8.Nc3 Bd7 9.Be3 Bc5 10.b4 cxb3 11.Rb1 Bxd4 12.Bxd4 Qc7 13.Qxb3 é melhor para as brancas.' }],
  ['c13-a', '1', 'a', '(a) 7...Na6', '7... Na6 8 Na3 Bxa3 9 bxa3 O-O 10 Bb2 Qb6', { a: '=', r: 'Cetverik–Z. Ivan, Harkány 1996', c: 'Mas 7...Na6 8.Na3 Bxa3 9.bxa3 O-O 10.Bb2 Qb6 foi jogável para as pretas.' }],
  ['c13', 'b', 'b', '(b)', '7... Nxe5 8 dxe5 Qxd1 9 Rxd1 Nd5 10 Na3 Bd7 11 Nxc4', { a: '±', r: 'Marosi–Kral, Hungria 1994', c: '7...Nxe5 8.dxe5 Qxd1 9.Rxd1 Nd5 10.Na3 Bd7 11.Nxc4 é melhor para as brancas: o peão de e5 aperta as pretas.' }],
  ['c13-b', '1', 'b', '(b) 8...Nd5', '8... Nd5 9 Na3 Bd7 10 Nxc4', { a: '⩲', r: 'Petrosian–Panno, Palma de Mallorca 1969', c: '8...Nd5 9.Na3 Bd7 10.Nxc4 é um pouco melhor para as brancas.' }],
  ['c13', 'c-A', 'c', '(c) A', '8 Nxc6', { c: 'A alternativa 8.Nxc6 saiu de moda.' }],
  ['c13', 'c-B', 'c', '(c) B', '8 Nxc4', { c: 'A alternativa 8.Nxc4 saiu de moda.' }],
  ['c13', 'd', 'd', '(d)', '8... Nd5 9 Naxc4 Nxd4 10 Be3', { a: '⩲', r: 'Kakhiana–A. Sokolov, Helsinque 1992', c: '8...Nd5 9.Naxc4 Nxd4 10.Be3 é um pouco melhor para as brancas.' }],
  ['c13', 'e', 'e', '(e)', '11 Qxb7 Nxe5 12 Nxe5 Rb8 13 Qf3 Bd6 14 Nc6', { a: '∞', r: 'Kasparov–Deep Blue, Filadélfia 1996', c: '11.Qxb7 Nxe5 12.Nxe5 Rb8 13.Qf3 Bd6 14.Nc6 deu às pretas boa compensação. As pretas podem evitar esta linha jogando antes 10...Qc8.' }],
  ['c13', 'f', 'f', '(f)', '15 Nce5 Qc7 16 Rc4 Rfc8 17 Rfc1', { a: '⩲', r: 'Piket–van der Sterren, Holanda 1994', c: '15.Nce5 Qc7 16.Rc4 Rfc8 17.Rfc1 é um pouco melhor para as brancas.' }],
  // Coluna 14
  ['c14', 'g', 'g', '(g)', '11 Nc4 Qa6 12 Qxd4 Rc8', { a: '=', r: 'Cosma–Zontakh, Belgrado 1996', c: '11.Nc4 Qa6 12.Qxd4 Rc8 é igual.' }],
  ['c14', 'h-A', 'h', '(h) A', '12... Rd8 13 e3 Bc5 14 exd4 Bxd4 15 Bg5 O-O 16 Bxd8 Rxd8 17 Rad1 e5', { a: '∞', r: 'Chernin–Gyimesi, Lillafüred 1999', c: '12...Rd8 13.e3 Bc5 14.exd4 Bxd4 15.Bg5 O-O 16.Bxd8 Rxd8 17.Rad1 e5 dá às pretas alguma compensação pela qualidade.' }],
  ['c14-h-A', '1', 'h', '(h) A 15...f6', '15... f6 16 Rad1', { c: '15...f6 16.Rad1 mantém a iniciativa das brancas.' }],
  ['c14', 'h-B', 'h', '(h) B', '12... O-O-O 13 Rd1', { a: '±', r: 'Topalov–Morozevich, Madri 1996', c: '12...O-O-O 13.Rd1 é melhor para as brancas.' }],
  // Coluna 15
  ['c15', 'i', 'i', '(i)', '9... Rc8 10 Bf4 Be7 11 Qb3 Nxe5 12 Bxe5 Bc6 13 Bxc6+ bxc6 14 Rfd1 c5 15 e3 O-O', { a: '=', r: 'Brochet–Inkiov, França 2003', c: '9...Rc8 10.Bf4 Be7!? 11.Qb3 Nxe5 12.Bxe5 Bc6 13.Bxc6+ bxc6 14.Rfd1 c5 15.e3 O-O é igual.' }],
  ['c15', 'j', 'j', '(j)', '11 Bd2', { c: '11.Bd2!?, com a ideia de Rac1 e Na5, é a sugestão de van Wely.' }],
  ['c15', 'k', 'k', '(k)', '15 Be4 Qc7 16 Qf3 Bf6 17 e3 g6', { a: '=', r: 'Piket–van Wely, Mônaco 1997', c: '15.Be4 Qc7 16.Qf3 Bf6 17.e3 g6 é igual.' }],
  // Coluna 16
  ['c16', 'l-A', 'l', '(l) A', '7... Qa5 8 Qxc4 cxd4 9 Nxd4', { a: '⩲', r: 'Hübner–Doghri, Olimpíada de Yerevan 1996', c: '7...Qa5 8.Qxc4 cxd4 9.Nxd4 é um pouco melhor para as brancas.' }],
  ['c16', 'l-B', 'l', '(l) B', '7... Nd7 8 dxc5 Bxc5 9 Qxc4 O-O 10 Nc3 a6 11 Rd1 Qb6 12 Ne4', { a: '±', r: 'Bischoff–Sonntag, Bundesliga 1987', c: '7...Nd7 8.dxc5 Bxc5 9.Qxc4 O-O 10.Nc3 a6 11.Rd1 Qb6 12.Ne4 é melhor para as brancas.' }],
  ['c16', 'm', 'm', '(m)', '10 Bg5 c4 11 Qd1 Be7 12 Nc3 b4 13 Bxf6 gxf6 14 Ne4 Qa5 15 Qd2 f5', { a: '∞', r: 'Hübner–Müller, Alemanha 1997', c: '10.Bg5 c4 11.Qd1 Be7 12.Nc3 b4 13.Bxf6 gxf6 14.Ne4 Qa5 15.Qd2 f5 leva a uma posição pouco clara.' }],
  ['c16', 'n', 'n', '(n)', '15 Be3 Bxe3 16 Qxe3 O-O', { a: '=', r: 'M. Grunberg–Ilinic, Índia 2004', c: '15.Be3 Bxe3 16.Qxe3 O-O é igual.' }],
  // Coluna 17
  ['c17', 'o', 'o', '(o)', '12... Bc6 13 Rd1 Qb6 14 Bxc6+ Rxc6 15 Bh6', { a: '⩲', r: 'Topalov–van Wely, Melody Amber 2003', c: '12...Bc6 13.Rd1 Qb6 14.Bxc6+ Rxc6 15.Bh6! é um pouco melhor para as brancas.' }],
  ['c17', 'p', 'p', '(p)', '14 Rad1 Rc4 15 Rd4 Rxd4 16 Qxd4 Qb6 17 Qh4', { a: '±', c: 'As brancas provavelmente fazem melhor com 14.Rad1 Rc4 15.Rd4 Rxd4 16.Qxd4 Qb6 17.Qh4, melhor para elas porque o peão de f2 fica protegido.' }],
  ['c17', 'q', 'q', '(q)', '15 Rd4 Rxd4 16 Qxd4 Qb6 17 Qh4 b4 18 Ne4 Nxe4 19 Bxe7 Qxf2+ 20 Kh1 Bc6', { a: '=', r: 'Ilinčić–Smagin, Belgrado–Moscou 1998', c: '15.Rd4 Rxd4 16.Qxd4 Qb6 17.Qh4 b4 18.Ne4 Nxe4 19.Bxe7 Qxf2+ 20.Kh1 Bc6 é igual.' }],
  // Coluna 18
  ['c18', 'r', 'r', '(r)', '9... bxc6 10 Qxc6+ Qd7 11 Qxa8 Bc5 12 Nc3', { a: '±', r: 'Christiansen–Lhagva, Olimpíada de Lucerna 1982', c: '9...bxc6 10.Qxc6+ Qd7 11.Qxa8 Bc5 12.Nc3 não foi suficiente para as pretas.' }],
  ['c18', 's', 's', '(s)', '10... Bxc6 11 Qxc6+ bxc6 12 Rxd4', { a: '±', c: '10...Bxc6 11.Qxc6+ bxc6 12.Rxd4 leva a um final ruim para as pretas.' }],
  ['c18-s', '1', 's', '(s) 11...Qd7', '11... Qd7 12 Rxd7 bxc6 13 Rd4', { a: '±', c: '11...Qd7 12.Rxd7 bxc6 13.Rd4 também leva a um final ruim para as pretas.' }],
  ['c18', 't-A', 't', '(t) A', '12... b5', { a: '⩲', c: '12...b5 já foi tentado, mas deixa as brancas pelo menos um pouco melhor.' }],
  ['c18', 't-B', 't', '(t) B', '12... c3', { a: '⩲', c: '12...c3 já foi tentado, mas deixa as brancas pelo menos um pouco melhor.' }],
  ['c18', 't-C', 't', '(t) C', '12... Be7', { a: '⩲', c: '12...Be7 já foi tentado, mas deixa as brancas pelo menos um pouco melhor.' }],
  ['c18', 'u', 'u', '(u)', '15 Nxc4 Ne4 16 Ne3 Bb6 17 b4', { a: '±', r: 'Hovde–Groiss, por correspondência 1984–90', c: '15.Nxc4 Ne4 16.Ne3 Bb6 17.b4: a vantagem material das brancas acabou prevalecendo.' }],
]

const capitulo = {
  id: 'catalana-c',
  arquivo: 'catalana-c',
  nome: 'Catalã — Aberta com 5...c5 6.O-O Nc6',
  fonte: 'Modern Chess Openings — Catalan Opening (pp. 524–525), colunas 13–18',
  base: '1. d4 Nf6 2. c4 e6 3. g3',
  corPadrao: 'w',
  ordem: 524,
  grupos: [
    { id: 'ne5', nome: '7.Ne5', colunas: [13, 14, 15] },
    { id: 'qa4', nome: '7.Qa4', colunas: [16, 17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
