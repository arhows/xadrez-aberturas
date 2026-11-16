// Transcrição do MCO 15ª ed. — Abertura Catalã, Variante Aberta com 7.Qc2 a6 8.a4 (pp. 520–521), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs catalana-a
// Formato: ver gambito-do-rei.cjs. Dicas em catalana-a-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correção: a tabela traz 15...Bd7 na coluna 2, mas a nota (f) segue com 16.e5 Bd5, que só é possível com o bispo em c6;
// além disso 15...Bd7? perde material depois de 16.e5 (Stockfish +3,6). O lance é 15...Qd7.
// A nota (h) traz duas coisas: a alternativa 15...h6 e a continuação da coluna 3 (16.Qxf3 c6 17.Red1 Qa5 =).

const A = '1 d4 Nf6 2 c4 e6 3 g3 d5 4 Bg2 dxc4 5 Nf3 Be7 6 O-O O-O 7 Qc2 a6 8 a4'
const G = `${A} Bd7 9 Qxc4 Bc6 10 Bg5`

const colunas = {
  c01: [`${G} a5 11 Nc3 Na6 12 Rac1 Nb4 13 Rfd1 Rc8 14 Bxf6 Bxf6 15 e4 b6`, 'bg5', '8...Bd7 9.Qxc4 Bc6 10.Bg5 a5 12.Rac1', '⩲',
    'Na Variante Aberta da Catalã as pretas tomam o peão de c4 e abrem a grande diagonal do bispo de g2; as brancas gastam tempo para recuperá-lo. Com 7.Qc2 a6 8.a4 as brancas impedem ...b5. A manobra 8...Bd7 e 9...Bc6 coloca o bispo preto contra o de g2. Depois de 10.Bg5 a5 11.Nc3 Na6 12.Rac1 Nb4 13.Rfd1 Rc8 14.Bxf6 Bxf6 15.e4 b6 as brancas têm o centro e ficam um pouco melhor.'],
  c02: [`${G} a5 11 Nc3 Na6 12 Bxf6 Bxf6 13 e4 Nb4 14 Rfd1 b6 15 Ne1 Qd7`, 'bg5', '12.Bxf6', '⩲',
    'Com 12.Bxf6 Bxf6 13.e4 as brancas ocupam o centro logo. Depois de 13...Nb4 14.Rfd1 b6 15.Ne1 Qd7 o cavalo branco vai a d3, e as brancas ficam um pouco melhor. (A tabela traz 15...Bd7, erro de impressão: a nota (f) só funciona com 15...Qd7.)'],
  c03: [`${G} Bd5 11 Qd3 Be4 12 Qe3 Bc6 13 Nc3 Nbd7 14 Qd3 Bb4 15 Rfe1 Bxf3`, 'bg5', '10...Bd5 11.Qd3 Be4', '=',
    'Com 10...Bd5 o bispo ataca a dama branca e ganha tempo. Depois de 11.Qd3 Be4 12.Qe3 Bc6 13.Nc3 Nbd7 14.Qd3 Bb4 15.Rfe1 Bxf3 16.Qxf3 c6 17.Red1 Qa5 o jogo é igual (Beliavsky–Z. Almasi, Úbeda 1997).'],
  c04: [`${G} Bd5 11 Qd3 c5 12 Nc3 Bc6 13 e4 cxd4 14 Qxd4 h6 15 Bf4 Nbd7`, 'bg5', '11...c5', '=',
    'Com 11...c5 as pretas atacam o centro na hora. Depois de 12.Nc3 Bc6 13.e4 cxd4 14.Qxd4 h6 15.Bf4 Nbd7 as brancas têm mais espaço, mas as pretas estão bem desenvolvidas e o jogo é igual.'],
  c05: [`${A} Bd7 9 Rd1 Bc6 10 Nc3 Bxf3 11 Bxf3 Nc6 12 Bxc6 bxc6 13 Bg5 Rb8 14 e3 a5 15 Rac1 Nd7`, 'rd1', '9.Rd1', '=',
    'Com 9.Rd1 as brancas deixam o peão de c4 para depois e se desenvolvem. Depois de 9...Bc6 10.Nc3 Bxf3 11.Bxf3 Nc6 12.Bxc6 bxc6 as pretas ficam com peões dobrados, mas recebem a coluna b; após 13.Bg5 Rb8 14.e3 a5 15.Rac1 Nd7 o jogo é igual.'],
  c06: [`${A} Nc6 9 Qxc4 Qd5 10 Qd3 Rd8 11 Nc3 Qh5 12 Qc4 Bd7 13 Bf4 Rac8 14 e4 Nb4 15 h3 c5`, 'nc6', '8...Nc6', '∞',
    'Com 8...Nc6 o cavalo pressiona d4. Depois de 9.Qxc4 Qd5 a dama preta ocupa o centro; após 10.Qd3 Rd8 11.Nc3 Qh5 12.Qc4 Bd7 13.Bf4 Rac8 14.e4 Nb4 15.h3 c5 a posição fica pouco clara.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a-A', 'a', '(a) A', '8... c5 9 dxc5 Nc6 10 Rd1 Qa5', { a: '=', r: 'Stamenković–Gligorić, Iugoslávia 1996', c: '8...c5 9.dxc5 Nc6 10.Rd1 Qa5 é igual.' }],
  ['c01', 'a-B', 'a', '(a) B', '8... Nbd7 9 Nbd2 c5 10 dxc5 Nxc5', { a: '=', r: 'Gorelov–Rozentalis, URSS 1984', c: '8...Nbd7 9.Nbd2 c5 10.dxc5 Nxc5 é igual.' }],
  ['c01', 'b', 'b', '(b)', '10 Bf4 a5 11 Nc3 Na6 12 Rfe1 Bd5 13 Nxd5 exd5', { a: '=', r: 'Donchenko–Geller, URSS 1979', c: '10.Bf4 é pouco jogado. Depois de 10...a5 11.Nc3 Na6 12.Rfe1 Bd5 13.Nxd5 exd5 as pretas igualaram.' }],
  ['c01', 'c', 'c', '(c)', '11... Ra6 12 e3 Rb6 13 Qe2 Nbd7', { a: '=', r: 'Salov–Granda Zúñiga, Wijk aan Zee 1997', c: 'Interessante é 11...Ra6 12.e3 Rb6 13.Qe2 Nbd7, igual.' }],
  ['c01', 'd', 'd', '(d)', '16 d5 exd5 17 exd5 Bb7 18 Nd4 Ba6 19 Ncb5 Bxd4 20 Rxd4', { a: '⩲', r: 'V. Mikhalevski–Rozentalis, Beersheba 1997', c: '16.d5 exd5 17.exd5 Bb7 18.Nd4 Ba6 19.Ncb5 Bxd4 20.Rxd4 é um pouco melhor para as brancas numa posição complexa.' }],
  // Coluna 2
  ['c02', 'e', 'e', '(e)', '14... Rb8 15 Rac1 Qd7 16 b3 Rfd8 17 Qe2', { a: '±', r: 'Karpov–J. Polgar, Dos Hermanas 1997', c: '14...Rb8 15.Rac1 Qd7 16.b3 Rfd8 17.Qe2 é melhor para as brancas.' }],
  ['c02', 'f', 'f', '(f)', '16 e5 Bd5 17 Nxd5 exd5 18 Qc3 Be7 19 Nd3', { a: '⩲', r: 'Akesson–Ftacnik, Noruega 2006', c: '16.e5 Bd5 17.Nxd5 exd5 18.Qc3 Be7 19.Nd3 é um pouco melhor para as brancas.' }],
  // Coluna 3
  ['c03', 'g', 'g', '(g)', '11 Qc2 Be4 12 Qc1 Nc6 13 Rd1 Nd5 14 Bxe7 Qxe7', { a: '=', r: 'Stefanova–Speelman, Gibraltar 2004', c: '11.Qc2 Be4 12.Qc1 Nc6 13.Rd1 Nd5 14.Bxe7 Qxe7 é igual.' }],
  ['c03', 'h-A', 'h', '(h) A', '15... h6 16 Bxf6 Nxf6 17 e4 b6 18 Ne5', { a: '⩲', c: 'Em vez de 15...Bxf3, 15...h6 16.Bxf6 Nxf6 17.e4 b6 18.Ne5 é um pouco melhor para as brancas.' }],
  ['c03-h-A', '1', 'h', '(h) A 16.Bf4', '16 Bf4 Rc8 17 Qc2 b6 18 e4', { a: '⩲', r: 'Khalifman–Lautier, Biel 1993', c: '16.Bf4 Rc8 17.Qc2 b6 18.e4 dá às brancas uma pequena vantagem.' }],
  ['c03', 'h-B', 'h', '(h) B', '16 Qxf3 c6 17 Red1 Qa5', { a: '=', r: 'Beliavsky–Z. Almasi, Úbeda 1997', c: 'Depois de 15...Bxf3 a partida seguiu 16.Qxf3 c6 17.Red1 Qa5, igual.' }],
  // Coluna 4
  ['c04', 'i', 'i', '(i)', '12 dxc5 Ne4 13 Bxe7 Qxe7 14 Nc3 Nxc3 15 Qxc3 Rc8 16 Rfc1 Nd7 17 b4 a5 18 Qd4 axb4', { a: '⩲', r: 'Marin–Gómez, Sevilha 1992', c: '12.dxc5 é uma alternativa importante: 12...Ne4 13.Bxe7 Qxe7 14.Nc3 Nxc3 15.Qxc3 Rc8 16.Rfc1 Nd7 17.b4 a5 18.Qd4 axb4 provavelmente é um pouco melhor para as brancas.' }],
  ['c04', 'j', 'j', '(j)', '12... cxd4 13 Nxd5 Qxd5 14 b4', { a: '±', r: 'Karpov–Beliavsky, Linares 1994', c: '12...cxd4 13.Nxd5 Qxd5? 14.b4 é melhor para as brancas.' }],
  ['c04-j', '1', 'j', '(j) 13...Nxd5', '13... Nxd5', { a: '⩲', c: '13...Nxd5 é melhor, mas as brancas ainda ficam um pouco melhor.' }],
  ['c04', 'k', 'k', '(k)', '13 Rfd1 cxd4 14 Nxd4 Bxg2 15 Kxg2 Qa5 16 Bxf6 Bxf6', { a: '=', r: 'Kasimdzhanov–Aronian, Olimpíada de Turim 2006', c: '13.Rfd1 cxd4 14.Nxd4 Bxg2 15.Kxg2 Qa5 16.Bxf6 Bxf6 é igual.' }],
  ['c04', 'l', 'l', '(l)', '16 Qc4 Rc8 17 Qe2 Bc5', { a: '=', r: 'Beliavsky–Ki. Georgiev, Iugoslávia 1998', c: '16.Qc4 Rc8 17.Qe2 Bc5 é igual.' }],
  // Coluna 5
  ['c05', 'm', 'm', '(m)', '10... Bb4 11 Bg5 Bxc3 12 Bxf6 Qxf6 13 Qxc3 Qe7 14 Qxc4', { a: '⩲', r: 'Azmaiparashvili–Novopashin, URSS 1981', c: '10...Bb4 11.Bg5 Bxc3 12.Bxf6 Qxf6 13.Qxc3 Qe7 14.Qxc4 é um pouco melhor para as brancas.' }],
  ['c05', 'n', 'n', '(n)', '12 e3 Nd5 13 Qe2 Na5', { a: '=', r: 'Romanishin–Geller, URSS 1980/81', c: '12.e3 Nd5 13.Qe2 Na5 é igual.' }],
  ['c05', 'o', 'o', '(o)', '16 Bxe7 Qxe7 17 Ne4 Rb4 18 Nd2 Nb6', { a: '=', r: 'Hulak–Iordachescu, Varsóvia 2005', c: '16.Bxe7 Qxe7 17.Ne4 Rb4 18.Nd2 Nb6 é igual.' }],
  // Coluna 6
  ['c06', 'p', 'p', '(p)', '9... Nb4 10 Nc3 b5 11 Qb3 bxa4 12 Nxa4 Rb8 13 Rd1', { a: '⩲', r: 'Filipov–Am. Rodríguez, Linares 1997', c: '9...Nb4 10.Nc3 b5 11.Qb3 bxa4 12.Nxa4 Rb8 13.Rd1 é um pouco melhor para as brancas.' }],
  ['c06', 'q', 'q', '(q)', '10 Nbd2 Rd8 11 e3 Qxc4 12 Nxc4 Rb8 13 Bd2 Ne4 14 Rfd1 Nxd2 15 Nfxd2 Nb4', { a: '=', r: 'Ftacnik–Beliavsky, Olimpíada de Yerevan 1996', c: '10.Nbd2 Rd8 11.e3 Qxc4 12.Nxc4 Rb8 13.Bd2 Ne4 14.Rfd1 Nxd2 15.Nfxd2 Nb4 é igual.' }],
  ['c06', 'r', 'r', '(r)', '10... Nb4 11 Qd1 c5 12 Nc3 Qc4 13 dxc5 Rd8 14 Bd2 Qxc5 15 Qb3 Bd7 16 Rfc1', { a: '±', r: 'Polugaevsky–Ivkov, Hilversum 1973', c: '10...Nb4 11.Qd1 c5 12.Nc3 Qc4 13.dxc5 Rd8 14.Bd2 Qxc5 15.Qb3 Bd7 16.Rfc1 é melhor para as brancas.' }],
  ['c06', 's', 's', '(s)', '16 g4 Nxg4 17 hxg4 Qxg4', { a: '∞', r: 'Wojtkiewicz–Johansson, Rilton Cup 1992', c: '16.g4 Nxg4 17.hxg4 Qxg4 leva a uma posição pouco clara.' }],
]

const capitulo = {
  id: 'catalana-a',
  arquivo: 'catalana-a',
  nome: 'Catalã — Aberta com 7.Qc2 a6 8.a4',
  fonte: 'Modern Chess Openings — Catalan Opening (pp. 520–521), colunas 1–6',
  base: '1. d4 Nf6 2. c4 e6 3. g3',
  corPadrao: 'w',
  ordem: 517,
  grupos: [
    { id: 'bg5', nome: '8...Bd7 9.Qxc4 Bc6 10.Bg5', colunas: [1, 2, 3, 4] },
    { id: 'rd1', nome: '8...Bd7 9.Rd1', colunas: [5] },
    { id: 'nc6', nome: '8...Nc6', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
