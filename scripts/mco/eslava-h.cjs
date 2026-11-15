// Transcrição do MCO 15ª ed. — Semi-Eslava, Botvinnik com 9.Nxg5 (Gambito Anti-Meran) (pp. 478–479), colunas 43–48.
// Gerar: node scripts/mco/gerar.cjs eslava-h
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-h-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (a) o livro segue com 16 Kf1, impossível (o rei branco já rocou); a linha ficou até 15...Rc8.
// Na nota (b) o livro segue com 20 Qh7, impossível para a dama de e2; a linha ficou até 19...Qf8.
// Na nota (i) a continuação de Novikov–Zivanic (19...Qxd4 20 O-O Qxd1 21 Nxd1…) é impossível (as brancas não têm mais cavalos); ficou só até 19.Bxa8.
// Na nota (n) o livro traz 21...Qc8, impossível (o rei preto está em c8); a linha ficou até 21.Ne4.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 e6 5 Bg5 dxc4 6 e4 b5 7 e5 h6 8 Bh4 g5 9 Nxg5'
const H = `${B} hxg5 10 Bxg5 Nbd7`
const X = `${H} 11 exf6 Bb7 12 g3 c5 13 d5`

const colunas = {
  c43: [`${B} Nd5 10 Nxf7 Qxh4 11 Nxh8 Bb4 12 Rc1 Qe4+ 13 Be2 Nf4 14 a3 Nxg2+ 15 Kf1 Ne3+`, 'nd5', '9...Nd5?!', '±',
    'Com 9.Nxg5 as brancas sacrificam o cavalo (o Gambito Anti-Meran). Com 9...Nd5?! 10.Nxf7 Qxh4 11.Nxh8 Bb4 12.Rc1 Qe4+ 13.Be2 Nf4 14.a3 Nxg2+ 15.Kf1 Ne3+ as pretas atacam o rei, mas as brancas ficam melhor (Timman–Ljubojević, Buenos Aires 1980).'],
  c44: [`${H} 11 g3 Qa5 12 exf6 b4 13 Ne4 Ba6 14 b3 Nb6 15 bxc4 Nxc4`, 'hxg5', '9...hxg5 11.g3 Qa5', '±',
    'Com 9...hxg5 10.Bxg5 Nbd7 as pretas aceitam a peça, e as brancas ficam com peões e ataque. Depois de 11.g3 Qa5 12.exf6 b4 13.Ne4 Ba6 14.b3 Nb6 15.bxc4 Nxc4 as brancas ficam melhor (Mecking–Matsuura, São Paulo 1995).'],
  c45: [`${H} 11 g3 Rg8 12 Bxf6 Nxf6 13 exf6 Qxf6 14 Bg2 Bb7 15 a4 O-O-O`, 'hxg5', '11...Rg8', '⩲',
    'Com 11...Rg8 12.Bxf6 Nxf6 13.exf6 Qxf6 14.Bg2 Bb7 15.a4 O-O-O as pretas dominam a coluna d, mas a pressão branca contra c4 e o rei preto pesa mais; as brancas ficam um pouco melhor (Rogers–Kuijf, Wijk aan Zee 1987).'],
  c46: [`${X} Nb6 14 dxe6 Bxh1 15 e7 Qd7`, 'hxg5', '11.exf6 13...Nb6', '⩲',
    'Com 11.exf6 Bb7 12.g3 c5 13.d5 Nb6 14.dxe6 Bxh1 15.e7 Qd7 as brancas trocam as damas e ficam com um final um pouco melhor (Ionov–Sherbakov, Rússia 1993).'],
  c47: [`${X} Qb6 14 Bg2 O-O-O 15 O-O b4`, 'hxg5', '13...Qb6', '±',
    'Com 13...Qb6 14.Bg2 O-O-O 15.O-O b4 as pretas rocam grande e atacam o cavalo; depois de 16.Rb1! as brancas ficam melhor (Shulman–Kaidanov, Campeonato dos EUA 2006).'],
  c48: [`${B} hxg5 10 Bxg5 Be7 11 exf6 Bxf6 12 Be3 Bb7 13 a4 b4 14 Ne4 c5 15 Nxc5 Bd5`, 'hxg5', '10...Be7', '±',
    'Com 10...Be7 11.exf6 Bxf6 12.Be3 Bb7 13.a4 b4 14.Ne4 c5 15.Nxc5 Bd5 as pretas recuperam material, mas as brancas ficam melhor (Nogueiras–Rogers, Olimpíada de Dubai 1986).'],
}

const notas = [
  // Coluna 43
  ['c43', 'a', 'a', '(a)', '10 Nf3 Qa5 11 Rc1 Bb4 12 Qd2 Nd7 13 Be2 Bb7 14 O-O c5 15 Rfd1 Rc8', { a: '=', r: 'Gavrikov–Nogueiras, Tbilisi 1983', c: '10.Nf3 Qa5 11.Rc1 Bb4 12.Qd2 Nd7 13.Be2 Bb7 14.O-O c5 15.Rfd1 Rc8 leva a um jogo igual. (O livro segue com 16 Kf1, impossível com o rei já rocado; a linha ficou até 15...Rc8.)' }],
  ['c43', 'b', 'b', '(b)', '12 Qd2 c5 13 a3 cxd4 14 axb4 dxc3 15 bxc3 Nc6 16 Be2 Nxe5 17 O-O Qf4 18 Bh5+ Ke7 19 Qe2 Qf8', { a: '+−', r: 'Sanikidze–Gaanov, President’s Cup 2006', c: 'Também é forte 12.Qd2 c5 13.a3! cxd4 14.axb4 dxc3 15.bxc3 Nc6 16.Be2 Nxe5 17.O-O Qf4 18.Bh5+ Ke7 19.Qe2 Qf8, e as brancas venceram. (O livro segue com 20 Qh7, impossível para a dama de e2; a linha ficou até 19...Qf8.) (O Stockfish confirma: cerca de +9.)' }],
  ['c43', 'c-A', 'c', '(c) A', '12... c5 13 dxc5 Bxc3+ 14 bxc3 Qg5 15 Be2 Bb7 16 O-O Nf4 17 Bf3', { a: '±', r: 'Nikolić–Timman, Wijk aan Zee 1997', c: '12...c5 13.dxc5 Bxc3+ 14.bxc3 Qg5 15.Be2 Bb7 16.O-O Nf4 17.Bf3 é melhor para as brancas. (O Stockfish vai além: cerca de +4.)' }],
  ['c43', 'c-B', 'c', '(c) B', '12... Kd7 13 Qf3 Qxd4 14 Ng6 Kc7 15 Be2 Nd7 16 O-O Nxe5 17 Qg3 Bd6 18 Rfd1 Nxg6 19 Rxd4 Bxg3 20 hxg3 Nge7 21 Rg4 Bd7 22 Rg7', { a: '=', r: 'Iljin–Grachev, Open da República Tcheca 2006 (empate)', c: 'O estranho 12...Kd7!? 13.Qf3 Qxd4 14.Ng6 Kc7 15.Be2 Nd7 16.O-O Nxe5 17.Qg3 Bd6 18.Rfd1 Nxg6 19.Rxd4 Bxg3 20.hxg3 Nge7 21.Rg4 Bd7 22.Rg7 terminou empatado, ainda complicado: arriscado, mas jogável.' }],
  ['c43', 'd', 'd', '(d)', '16 fxe3 Qxh1+ 17 Kf2 Qxh2+ 18 Ke1 Be7 19 Kd2', { a: '±', r: 'Timman–Ljubojević, Buenos Aires 1980', c: '16.fxe3 Qxh1+ 17.Kf2 Qxh2+ 18.Ke1 Be7 19.Kd2 é melhor para as brancas.' }],
  // Coluna 44
  ['c44', 'e', 'e', '(e)', '11 Qf3 Bb7 12 Be2 Bh6 13 Bxf6 Nxf6 14 Qxf6 Qxf6 15 exf6 O-O-O 16 Rd1 b4 17 Na4 c5 18 Bxc4 Bxg2 19 Rg1 Bf3 20 Be2 Bxe2 21 Kxe2 cxd4', { a: '∓', r: 'Hartoch–Zuidema, Wijk aan Zee 1973', c: '11.Qf3?! Bb7 12.Be2 Bh6! 13.Bxf6 Nxf6 14.Qxf6 Qxf6 15.exf6 O-O-O 16.Rd1 b4 17.Na4 c5 18.Bxc4 Bxg2 19.Rg1 Bf3 20.Be2 Bxe2 21.Kxe2 cxd4 é melhor para as pretas.' }],
  ['c44', 'f-A', 'f', '(f) A', '14 Bg2 c3', { a: '∓', c: '14.Bg2? c3 é melhor para as pretas.' }],
  ['c44', 'f-B', 'f', '(f) B', '14 Qf3 Rd8 15 Be2 Nb6 16 Nc5 Rd5 17 Nxa6 Qxa6 18 Be3 b3 19 O-O bxa2 20 b3 Kd7 21 bxc4', { a: '±', r: 'Krush–Shabalov, Las Vegas 2007', c: '14.Qf3 Rd8 15.Be2 Nb6 16.Nc5 Rd5 17.Nxa6 Qxa6 18.Be3 b3 19.O-O bxa2 20.b3 Kd7 21.bxc4 é melhor para as brancas. (O Stockfish vai além: cerca de +6.)' }],
  ['c44', 'g', 'g', '(g)', '16 Qb3 Qd5 17 f3 Bb5 18 Rc1 Na3 19 Qxd5 cxd5 20 Nd2', { a: '±', r: 'Mecking–Matsuura, São Paulo 1995', c: '16.Qb3 Qd5 17.f3 Bb5 18.Rc1 Na3 19.Qxd5 cxd5 20.Nd2 é melhor para as brancas.' }],
  ['c44-g', '1', 'g', '(g) 16...Qf5', '16... Qf5 17 f3', { a: '±', c: '16...Qf5 17.f3 também é melhor para as brancas.' }],
  // Coluna 45
  ['c45', 'h-A', 'h', '(h) A', '11... Bb7 12 Bg2 Qb6 13 exf6 c5 14 d5', { c: '11...Bb7 12.Bg2 Qb6 13.exf6 c5 14.d5 transpõe para a coluna 47.' }],
  ['c45', 'h-B', 'h', '(h) B', '11... b4 12 Ne4 Nxe4 13 Bxd8 Kxd8 14 Bg2 f5 15 exf6 Nexf6 16 Qe2 Nd5 17 Qxc4', { a: '⩲', r: 'Lipiridi–Lutovinov, correspondência 1984', c: '11...b4 12.Ne4 Nxe4 13.Bxd8 Kxd8 14.Bg2 f5 15.exf6 Nexf6 16.Qe2 Nd5 17.Qxc4 é um pouco melhor para as brancas.' }],
  ['c45-h-B', '1', 'h', '(h) 15...Ndxf6', '15... Ndxf6 16 Bxe4 Nxe4 17 Qf3', { a: '+−', r: 'P. Nikolić–Bagirov, Sarajevo 1980', c: '15...Ndxf6? 16.Bxe4 Nxe4 17.Qf3 ganha.' }],
  ['c45', 'i', 'i', '(i)', '12 h4 Rxg5 13 hxg5 Nd5 14 g6 fxg6 15 Qg4 Qe7 16 Bg2 Qf7 17 Be4 Ne7 18 Nxb5 cxb5 19 Bxa8', { a: '∞', r: 'Novikov–Zivanic, 2006', c: '12.h4 Rxg5 13.hxg5 Nd5 14.g6 fxg6 15.Qg4 Qe7 16.Bg2 Qf7 17.Be4 Ne7 18.Nxb5 cxb5 19.Bxa8, posição pouco clara; na partida as brancas ficaram com melhores chances. (A continuação que o livro dá para a partida é impossível; a linha ficou até 19.Bxa8.)' }],
  ['c45', 'j', 'j', '(j)', '16 axb5 cxb5 17 Bxb7+ Kxb7 18 Nxb5 Bb4+ 19 Nc3 Rxd4 20 Qe2 Qf5 21 O-O Rgd8 22 Nd1', { a: '⩲', r: 'Rogers–Kuijf, Wijk aan Zee 1987', c: '16.axb5 cxb5 17.Bxb7+ Kxb7 18.Nxb5 Bb4+ 19.Nc3 Rxd4 20.Qe2 Qf5 21.O-O Rgd8 22.Nd1! é um pouco melhor para as brancas.' }],
  // Coluna 46
  ['c46', 'k', 'k', '(k)', '12 Be2 Qb6 13 O-O O-O-O 14 a4 b4 15 Ne4 c5 16 Qb1 Qc7 17 Ng3 cxd4 18 Bxc4 Qc6 19 f3 d3', { a: '∓', r: 'Denker–Botvinnik, match pelo rádio EUA × URSS 1945', c: '12.Be2?! Qb6 13.O-O O-O-O 14.a4 b4 15.Ne4 c5 16.Qb1 Qc7 17.Ng3 cxd4 18.Bxc4 Qc6 19.f3 d3 é melhor para as pretas.' }],
  ['c46', 'l', 'l', '(l)', '16 Qxd7+ Nxd7 17 Nxb5 Bxe7 18 fxe7 f6 19 Be3 Kxe7 20 h4 Bf3 21 Bxc4', { a: '⩲', r: 'Ionov–Sherbakov, Rússia 1993', c: '16.Qxd7+ Nxd7 17.Nxb5 Bxe7 18.fxe7 f6 19.Be3! Kxe7 20.h4 Bf3 21.Bxc4 dá às brancas um final um pouco melhor.' }],
  // Coluna 47
  ['c47', 'm-A', 'm', '(m) A', '13... Qc7 14 Bg2 b4 15 d6 Qb6 16 Ne4 O-O-O 17 O-O Bd5 18 f4 Bxd6 19 Rc1 Bc7 20 Qe2 Qa5 21 a3 b3 22 h4', { a: '±', r: 'Alekseev–Yevseev, São Petersburgo 2006', c: '13...Qc7 14.Bg2 b4 15.d6 Qb6 16.Ne4 O-O-O 17.O-O Bd5 18.f4 Bxd6 19.Rc1 Bc7 20.Qe2 Qa5 21.a3 b3 22.h4 é melhor para as brancas.' }],
  ['c47', 'm-B', 'm', '(m) B', '13... Nxf6 14 Bg2 Be7 15 O-O Nxd5 16 Bxe7 Kxe7 17 Nxb5 Qb6 18 Na3 c3 19 Nc4 Qc7 20 bxc3 Nxc3 21 Qd2 Bxg2 22 Kxg2 Ne4 23 Qe3 Nf6 24 Qf3', { a: '⩲', r: 'van Wely–Dreev, Berna 1993', c: '13...Nxf6 14.Bg2 Be7 15.O-O Nxd5 16.Bxe7 Kxe7 17.Nxb5 Qb6 18.Na3 c3 19.Nc4 Qc7 20.bxc3 Nxc3 21.Qd2 Bxg2 22.Kxg2 Ne4 23.Qe3 Nf6 24.Qf3 é um pouco melhor para as brancas.' }],
  ['c47', 'm-C', 'm', '(m) C', '13... Bh6 14 Bxh6 Rxh6 15 Qd2 Qxf6 16 O-O-O Kf8 17 f3 exd5 18 Nxd5 Bxd5 19 Qxd5', { a: '±', r: 'Atalik–Ivanišević, Hungria 1997', c: '13...Bh6 14.Bxh6 Rxh6 15.Qd2 Qxf6 16.O-O-O Kf8 17.f3 exd5 18.Nxd5 Bxd5 19.Qxd5 é melhor para as brancas.' }],
  ['c47', 'n', 'n', '(n)', '16 Rb1 Qa6 17 dxe6 Bxg2 18 e7 Bxf1 19 Kxf1 Bxe7 20 fxe7 Rdg8 21 Ne4', { a: '±', r: 'Shulman–Kaidanov, Campeonato dos EUA 2006', c: '16.Rb1! Qa6 17.dxe6 Bxg2 18.e7! Bxf1 19.Kxf1 Bxe7 20.fxe7 Rdg8 21.Ne4, e as brancas ficaram melhor. (O livro segue com 21...Qc8, impossível com o rei preto em c8; a linha ficou até 21.Ne4.)' }],
  ['c47-n', '1', 'n', '(n) 18...Ba8', '18... Ba8 19 exd8=Q+ Kxd8 20 Ne2 Kc8 21 Qc2 Qe6 22 f3', { a: '±', r: 'Yermolinsky–Lapshun, Filadélfia 1998', c: '18...Ba8 19.exd8=Q+ Kxd8 20.Ne2 Kc8 21.Qc2 Qe6 22.f3 é melhor para as brancas.' }],
  // Coluna 48
  ['c48', 'o', 'o', '(o)', '12... Nd7 13 g3 Bb7 14 Bg2 Qc7 15 a4 a6 16 O-O O-O-O 17 axb5 cxb5 18 Nxb5 axb5 19 Ra7 Nc5 20 Qa1 Nb3 21 Bxb7+ Qxb7 22 Rxb7 Nxa1 23 Rxf7 Nb3 24 Rxf6', { a: '⩲', r: 'Beliavsky–Agrest, Dresden 2007', c: '12...Nd7 13.g3 Bb7 14.Bg2 Qc7 15.a4 a6 16.O-O O-O-O 17.axb5 cxb5 18.Nxb5! axb5 19.Ra7 Nc5 20.Qa1 Nb3 21.Bxb7+ Qxb7 22.Rxb7 Nxa1 23.Rxf7 Nb3 24.Rxf6 é um pouco melhor para as brancas. (O Stockfish vai além: cerca de +4.)' }],
  ['c48', 'p', 'p', '(p)', '16 Rc1 Rg8 17 Bxc4 Rxg2 18 Qh5', { a: '±', r: 'Nogueiras–Rogers, Olimpíada de Dubai 1986', c: '16.Rc1 Rg8 17.Bxc4 Rxg2 18.Qh5 é melhor para as brancas.' }],
]

const capitulo = {
  id: 'eslava-h',
  arquivo: 'eslava-h',
  nome: 'Semi-Eslava — Botvinnik com 9.Nxg5 (Gambito Anti-Meran)',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 478–479), colunas 43–48',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 478,
  grupos: [
    { id: 'nd5', nome: '9...Nd5', colunas: [43] },
    { id: 'hxg5', nome: '9...hxg5', colunas: [44, 45, 46, 47, 48] },
  ],
}

module.exports = { capitulo, colunas, notas }
