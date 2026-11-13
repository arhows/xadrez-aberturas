// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante 5.Bf4, outras linhas (pp. 423–425), colunas 67–72.
// Gerar: node scripts/mco/gerar.cjs gdr-l
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-l-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// A nota (q) não traz lances ("o vaivém do bispo é curioso, mas bem lógico"); o comentário entrou no resumo da coluna 70.
// Correções: na nota (z) o livro traz 8...cxd5, impossível (o peão de c5 não captura em d5); ficou 8...exd5.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Nf3 Be7 5 Bf4 O-O 6 e3'
const Q = `${B} c6 7 Qc2 Nbd7`

const colunas = {
  c67: [`${B} c5 7 dxc5 Bxc5 8 Be2 Bb4 9 O-O Bxc3 10 bxc3 Nc6 11 Nd2 Qe7 12 Bg5 Rd8 13 Qc2 h6`, 'c5', '6...c5 8.Be2 Bb4', '=',
    'Depois de 6...c5 7.dxc5 Bxc5 8.Be2 as pretas movem o bispo de novo com 8...Bb4, uma ideia recente: trocam em c3 e deixam as brancas com peões dobrados. A posição é mais ou menos igual (Hertneck–Beliavsky, Munique 1994).'],
  c68: [`${Q} 8 h3 a6 9 Rd1 h6 10 a3 dxc4 11 Bxc4 Nd5 12 O-O Nxf4 13 exf4 Qc7`, 'c6', '6...c6 7.Qc2 8.h3 a6', '±',
    'Com 6...c6 as pretas jogam de forma sólida, como na Ortodoxa. Depois de 7.Qc2 Nbd7 8.h3 a6 9.Rd1 h6 10.a3 dxc4 11.Bxc4 Nd5 elas trocam o bispo de f4, mas as brancas ficam com um bom ataque (Kramnik–Lputian, Debrecen 1992).'],
  c69: [`${Q} 8 h3 Re8 9 a3 Nf8 10 Bd3 dxc4 11 Bxc4 Nd5 12 Bg3 Nxc3 13 Qxc3 Bd6`, 'c6', '8...Re8', '⩲',
    'Com 8...Re8 as pretas preparam ...Nf8 para defender a ala do rei. Depois de 9.a3 Nf8 10.Bd3 dxc4 11.Bxc4 Nd5 12.Bg3 elas trocam peças, mas as brancas ficam com vantagem de espaço (Beliavsky–Speelman, Linares 1991).'],
  c70: [`${Q} 8 a3 Nh5 9 Be5 f6 10 Bg3 f5 11 Be5 Nhf6 12 Bf4 Ne4 13 h3 Ndf6`, 'c6', '8.a3 Nh5', '⩲',
    'Com 8.a3 Nh5 as pretas atacam o bispo de f4, e o bispo branco passeia por e5, g3, e5 e f4: um vaivém curioso, mas bem lógico. As pretas montam uma estrutura Stonewall com ...f5 e ...Ne4, e as brancas ficam com pequena vantagem (M. Gurevich–A. Fernández, Linares 1995).'],
  c71: [`${B} c6 7 Bd3 Nbd7 8 O-O Nh5 9 Qc2 Nxf4 10 exf4 dxc4 11 Bxc4 Nb6 12 Bd3 g6 13 a3 Nd5`, 'c6', '7.Bd3', '⩲',
    'Com 7.Bd3 as brancas se desenvolvem de forma simples. Depois de 7...Nbd7 8.O-O Nh5 9.Qc2 Nxf4 10.exf4 as pretas ficam com o par de bispos, mas as brancas ganham o controle de e5 e uma vantagem pequena e estável (Dorfman–Ivkov, França 1993).'],
  c72: [`${B} b6 7 cxd5 Nxd5 8 Nxd5 exd5 9 Bd3 Bb4+ 10 Ke2 Bd6 11 Bxd6 Qxd6 12 Rc1 c5 13 dxc5 bxc5`, 'b6', '6...b6', '±',
    'Com 6...b6 as pretas jogam como na Tartakower. Depois de 7.cxd5 Nxd5 8.Nxd5 exd5 9.Bd3 Bb4+ 10.Ke2 o rei branco fica no centro, mas com as peças trocadas está seguro; os peões pendentes pretos em c5 e d5 dão às brancas uma vantagem média (Psakhis–Westerinen, Gausdal 1994).'],
}

const notas = [
  // Coluna 67
  ['c67', 'a', 'a', '(a)', '4... Nbd7 5 Bf4 dxc4 6 e3 Nb6 7 Bxc4 Nxc4 8 Qa4+ Bd7 9 Qxc4 Bd6 10 Bg5 h6 11 Bxf6 Qxf6 12 O-O O-O 13 e4', { a: '⩲', r: 'Blagojević–Cvetković, Iugoslávia 1993', c: '4...Nbd7 5.Bf4 dxc4 6.e3 Nb6 7.Bxc4 Nxc4 8.Qa4+ levou a uma posição em que o espaço das brancas pesou um pouco mais que os bispos pretos.' }],
  ['c67', 'b', 'b', '(b)', '8... dxc4', { c: 'Mover o bispo de novo é uma ideia recente. As alternativas são 8...dxc4 e 8...Nc6.' }],
  ['c67', 'c', 'c', '(c)', '11... dxc4 12 Bxc4 Nd5 13 Bxd5 Qxd5 14 c4', { a: '=', c: '11...dxc4 12.Bxc4 Nd5 13.Bxd5 Qxd5 14.c4 talvez fosse um caminho mais fácil para igualar.' }],
  ['c67', 'd', 'd', '(d)', '14 Bh4 Ne5 15 Rfd1 Ng6 16 Bg3 b6 17 Bd3 Nf8', { a: '=', r: 'Hertneck–Beliavsky, Munique 1994', c: 'Depois de 14.Bh4 Ne5 15.Rfd1 Ng6 16.Bg3 b6 17.Bd3 Nf8 o jogo é mais ou menos igual.' }],
  ['c67-d', '1', 'd', '(d) 15.cxd5', '15 cxd5 exd5 16 c4 d4 17 exd4 Rxd4', { a: '=', c: '15.cxd5 exd5 16.c4 d4 17.exd4 Rxd4 não seria melhor.' }],
  // Coluna 68
  ['c68', 'e', 'e', '(e)', '7... a6 8 Rd1 Nbd7 9 Bd3 dxc4 10 Bxc4 b5 11 Be2 c5 12 dxc5 Bxc5', { a: '=', r: 'Meulders–Winkler, Bruxelas 1993', c: '7...a6 foi tentado: depois de 8.Rd1 Nbd7 9.Bd3 dxc4 10.Bxc4 b5 o jogo foi igual.' }],
  ['c68', 'f', 'f', '(f)', '8 Rd1 Nh5 9 Be5 f6 10 Bg3 f5 11 Bd3 Nxg3 12 hxg3 Nf6', { a: '=', r: 'S. Ivanov–Taimanov, Estocolmo 2003', c: '8.Rd1 Nh5 9.Be5 f6 10.Bg3 f5 11.Bd3 Nxg3 12.hxg3 Nf6 deixa as pretas com uma posição sólida.' }],
  ['c68', 'g', 'g', '(g)', '8... Qa5 9 Nd2 Re8 10 Bd3 Bf8 11 cxd5 exd5 12 O-O Qd8 13 Rab1 a5 14 a3', { a: '⩲', r: 'Sasikiran–Bartels, Dresden 2005', c: '8...Qa5 9.Nd2 Re8 10.Bd3 Bf8 11.cxd5 exd5 12.O-O é um pouco melhor para as brancas.' }],
  ['c68', 'h-A', 'h', '(h)', '14 Ne5 Nf6 15 Ba2 Bd7 16 Bb1 Be8 17 d5 Rd8 18 Rfe1 Kh8 19 dxe6 Rxd1 20 Rxd1 fxe6 21 Ne4 g6 22 Nc5 Bxc5 23 Qxc5 Rg8 24 Ba2 Kg7 25 Bxe6 Rf8 26 Nd7', { a: '+−', r: 'Kramnik–Lputian, Debrecen 1992 (1–0)', c: 'Kramnik–Lputian seguiu 14.Ne5 Nf6 15.Ba2 Bd7 16.Bb1 Be8? 17.d5!, e as pretas abandonaram depois de 26.Nd7. Em 17...Rd8, 18.Nxd5 depois de qualquer captura de peão seria imediatamente fatal. (O Stockfish confirma: na posição final as brancas estão com cerca de +8.)' }],
  ['c68-h-A', '1', 'h', '(h) 16...Rfd8', '16... Rfd8 17 Ne4 Kf8 18 Nxf6 Bxf6 19 Qh7', { a: '⩲', c: '16...Rfd8 era necessário; 17.Ne4 Kf8 18.Nxf6 Bxf6 19.Qh7 ainda é um pouco melhor para as brancas.' }],
  ['c68', 'h-B', 'h', '(h) 13...Re8', '13... Re8 14 Ne5 Nf8 15 f5', { a: '±', c: 'Ou 13...Re8 14.Ne5 Nf8 15.f5, com um bom ataque.' }],
  // Coluna 69
  ['c69', 'i-A', 'i', '(i) A', '9 cxd5 Nxd5 10 Nxd5 exd5 11 O-O-O Nf8 12 Bd3 Bd7 13 Kb1 Rc8 14 g4 Qb6 15 Rc1 c5', { a: '=', r: 'Gelfand–Azmaiparashvili, Moscou 1990', c: 'Há outros lances aqui: 9.cxd5 Nxd5 10.Nxd5 exd5 11.O-O-O Nf8 é mais ou menos igual.' }],
  ['c69', 'i-B', 'i', '(i) B', '9 O-O-O Qa5 10 Kb1 dxc4 11 Bxc4 Nd5 12 Nxd5 exd5 13 Bd3 Nf8 14 Ng5', { a: '⩲', r: 'Korchnoi–Baumgarten, Dresden 2006', c: '9.O-O-O Qa5 10.Kb1 dxc4 11.Bxc4 Nd5 12.Nxd5 exd5 13.Bd3 Nf8 14.Ng5 deu vantagem às brancas.' }],
  ['c69', 'j', 'j', '(j)', '10 c5 N6d7 11 Bd3 Bf6 12 O-O e5', { a: '=', r: 'P.H. Nielsen–Bischoff, Bundesliga 2002', c: 'As brancas não conseguiram nada com 10.c5 N6d7 11.Bd3 Bf6 12.O-O e5.' }],
  ['c69', 'k', 'k', '(k)', '10... Ng6 11 Bh2 Bd6 12 Bxd6 Qxd6 13 O-O dxc4 14 Bxc4 Nd5', { a: '=', r: 'Mikhalchishin–Brestian, Trnava 1988', c: '10...Ng6 11.Bh2 Bd6 12.Bxd6 Qxd6 13.O-O dxc4 14.Bxc4 Nd5 foi mais ou menos igual.' }],
  ['c69', 'l', 'l', '(l)', '14 O-O Bxg3 15 fxg3 Bd7 16 g4', { a: '⩲', r: 'Beliavsky–Speelman, Linares 1991', c: 'Depois de 14.O-O Bxg3 15.fxg3 Bd7 16.g4 as brancas ficaram com uma vantagem útil de espaço.' }],
  // Coluna 70
  ['c70', 'm', 'm', '(m)', '9 Bd3 Nxf4 10 Bxh7+ Kh8 11 exf4', { a: '=', r: 'M. Gurevich', c: 'Depois de 9.Bd3 Nxf4 10.Bxh7+ Kh8 11.exf4, tanto 11...dxc4 como 11...g6 (sugerido por M. Gurevich) dão às pretas chances razoáveis.' }],
  ['c70', 'n', 'n', '(n)', '9... Nxe5 10 dxe5 g6 11 O-O-O Qa5 12 g4', { a: '±', c: '9...Nxe5 10.dxe5 g6 11.O-O-O Qa5 12.g4 dá ataque às brancas.' }],
  ['c70', 'o', 'o', '(o)', '10... Nxg3 11 hxg3 f5 12 g4', { a: '⩲', c: 'O imediato 10...Nxg3 11.hxg3 f5 é respondido com 12.g4.' }],
  ['c70', 'p', 'p', '(p)', '11 Bd3 g6 12 Be5 Qe8 13 h3 Nhf6 14 g4 fxg4 15 Ng5 Nxe5 16 dxe5 dxc4 17 Bxc4 Nd5 18 Nge4 Bh4 19 O-O-O g3', { a: '∞', r: 'Saravanan–Ravi, Campeonato Indiano 2006', c: '11.Bd3 g6 12.Be5 Qe8 13.h3 Nhf6 14.g4 levou a uma posição indefinida.' }],
  ['c70', 'r', 'r', '(r)', '12... Nh5 13 Bd3 Nxf4 14 exf4', { a: '⩲', c: 'Se agora 12...Nh5, 13.Bd3 Nxf4 14.exf4 e o peão de e6 fica fraco.' }],
  ['c70', 's', 's', '(s)', '14 Bd3 Bd7 15 O-O Be8 16 Bh2 Bh5 17 Ne5 Nd7 18 f3 Nxe5 19 Bxe5', { a: '⩲', r: 'M. Gurevich–A. Fernández, Linares 1995', c: 'Depois de 14.Bd3 Bd7 15.O-O Be8 16.Bh2 Bh5 17.Ne5 Nd7 18.f3 Nxe5 19.Bxe5 as brancas ficam com pequena vantagem.' }],
  // Coluna 71
  ['c71', 't', 't', '(t)', '7... b6 8 O-O Bb7 9 e4 dxe4 10 Nxe4 c5 11 Nxf6+ Bxf6 12 dxc5 bxc5 13 Re1 g6 14 Re3 Qe7 15 h4', { a: '⩲', r: 'Lesiège–Hébert, Montreal 2002', c: '7...b6 8.O-O Bb7 9.e4 dxe4 10.Nxe4 c5 11.Nxf6+ é um pouco melhor para as brancas.' }],
  ['c71', 'u', 'u', '(u)', '8 Ne5 Nxe5 9 Bxe5 dxc4 10 Bxc4 b6 11 O-O Bb7 12 Qe2', { a: '⩲', r: 'Tregubov–Pigusov, São Petersburgo 1993', c: '8.Ne5 foi tentado: depois de 8...Nxe5 9.Bxe5 dxc4 10.Bxc4 b6 11.O-O Bb7 12.Qe2 as brancas ficaram mais confortáveis.' }],
  ['c71-u', '1', 'u', '(u) 9...b6', '9... b6', { a: '⩲', c: '9...b6 também é um pouco melhor para as brancas.' }],
  ['c71', 'v', 'v', '(v)', '10... g6', { r: 'Dorfman', c: 'Dorfman sugere que 10...g6, sem trocar em c4, daria às pretas mais chances que a continuação da coluna.' }],
  ['c71', 'w', 'w', '(w)', '11... c5 12 Rad1 cxd4 13 Nxd4', { a: '⩲', r: 'Dorfman', c: '11...c5 12.Rad1 cxd4 13.Nxd4 é um pouco melhor para as brancas (Dorfman).' }],
  ['c71', 'x', 'x', '(x)', '14 g3 Bd7 15 Ne4 Rc8 16 Rac1 b6 17 Qe2', { a: '⩲', r: 'Dorfman–Ivkov, França 1993', c: 'Depois de 14.g3 Bd7 15.Ne4 Rc8 16.Rac1 b6 17.Qe2 as brancas tinham uma vantagem pequena, mas estável.' }],
  // Coluna 72
  ['c72', 'y', 'y', '(y)', '6... dxc4 7 Bxc4 a6 8 Bd3 Nbd7 9 e4 c5 10 e5 Nh5', { a: '∞', r: 'Dreev–Nenashev, Manila 1992', c: '6...dxc4 7.Bxc4 a6 8.Bd3 Nbd7 9.e4 c5 10.e5 Nh5 é indefinido.' }],
  ['c72', 'z', 'z', '(z)', '7 Rc1 c5 8 cxd5 exd5 9 Be2 Bb7 10 O-O Nbd7', { a: '⩲', r: 'Gheorghiu–Ree, Wijk aan Zee 1981', c: '7.Rc1 é a principal alternativa: depois de 7...c5 8.cxd5 exd5 9.Be2 Bb7 10.O-O Nbd7 as brancas tinham uma vantagem mínima. (O livro traz 8...cxd5, impossível; ficou 8...exd5.)' }],
  ['c72-z', '1', 'z', '(z) 8...Nxd5', '8... Nxd5 9 Nxd5 exd5 10 Bd3 Nd7 11 O-O', { a: '⩲', r: 'Agdestein–Spassky, Gjøvik 1983', c: '8...Nxd5 9.Nxd5 exd5 10.Bd3 Nd7 11.O-O é um pouco melhor para as brancas.' }],
  ['c72', 'aa', 'aa', '(aa)', '8... Qxd5 9 Bd3 c5 10 Qc2 Bb7 11 O-O cxd4 12 Bxh7+ Kh8 13 Bd3 dxe3 14 fxe3', { a: '±', r: 'Dreev–Doroshkievich, Rostov-on-Don 1993', c: '8...Qxd5 também é jogado. Depois de 9.Bd3 as linhas se ramificam; 9...c5 10.Qc2 Bb7 11.O-O cxd4?! 12.Bxh7+ deixou as brancas bem melhor.' }],
  ['c72-aa', '1', 'aa', '(aa) 9...Ba6', '9... Ba6 10 O-O c5 11 e4 Qb7', { a: '∞', c: '9...Ba6 10.O-O c5 11.e4 Qb7 não é claro.' }],
  ['c72-aa', '2', 'aa', '(aa) 9...Bb4+', '9... Bb4+ 10 Ke2', { c: '9...Bb4+ 10.Ke2 é duvidoso para as pretas.' }],
  ['c72', 'bb', 'bb', '(bb)', '9... c5 10 Ne5 cxd4 11 exd4 Bb4+ 12 Kf1', { a: '∞', c: '9...c5 10.Ne5 cxd4 11.exd4 Bb4+ 12.Kf1 dá chances aos dois lados.' }],
  ['c72', 'cc', 'cc', '(cc)', '12 Qc2 Ba6 13 Rad1', { a: '⩲', r: 'Psakhis', c: 'Com 12.Qc2 Ba6, 13.Rad1 é um pouco melhor para as brancas (Psakhis).' }],
  ['c72-cc', '1', 'cc', '(cc) 13.Bxa6', '13 Bxa6 Nxa6 14 Qa4 b5', { c: '13.Bxa6 Nxa6 14.Qa4 é respondido com 14...b5.' }],
  ['c72', 'dd', 'dd', '(dd)', '12... Ba6 13 Bxa6 Nxa6 14 Qa4 b5 15 Qc2', { a: '±', c: 'Agora 12...Ba6 é respondido com 13.Bxa6 Nxa6 14.Qa4 b5 15.Qc2, melhor para as brancas.' }],
  ['c72', 'ee', 'ee', '(ee)', '14 Qa4 Ba6 15 Rhd1 Bxd3+ 16 Rxd3 Nc6 17 Rd2 Rab8 18 Kf1', { a: '±', r: 'Psakhis–Westerinen, Gausdal 1994', c: 'Psakhis–Westerinen seguiu 14.Qa4 Ba6 15.Rhd1 Bxd3+ 16.Rxd3 Nc6 17.Rd2 Rab8 18.Kf1, e as brancas tinham uma vantagem média numa posição confusa.' }],
]

const capitulo = {
  id: 'gdr-l',
  arquivo: 'gdr-l',
  nome: 'Gambito da Dama Recusado — Variante 5.Bf4, outras linhas',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 423–425), colunas 67–72',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 423,
  grupos: [
    { id: 'c5', nome: '6...c5 8.Be2', colunas: [67] },
    { id: 'c6', nome: '6...c6', colunas: [68, 69, 70, 71] },
    { id: 'b6', nome: '6...b6', colunas: [72] },
  ],
}

module.exports = { capitulo, colunas, notas }
