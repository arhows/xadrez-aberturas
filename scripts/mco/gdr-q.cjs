// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Semi-Tarrasch com 6.g3, 5...cxd4 e 5.e3 (pp. 437–439), colunas 97–102.
// Gerar: node scripts/mco/gerar.cjs gdr-q
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-q-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// As notas (k) e (l) só sugerem lances (10...Bxc5 11 Qe2 e 12 e5), sem avaliação.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Nf3 c5'
const G = `${B} 5 cxd5 Nxd5 6 g3 Nc6 7 Bg2`
const H = `${G} Be7 8 O-O O-O`

const colunas = {
  c97: [`${H} 9 Nxd5 exd5 10 dxc5 Bxc5 11 Bg5 Qb6 12 Ne1 h6`, 'g3', '6.g3 9.Nxd5 11...Qb6', '⩲',
    'Com 6.g3 as brancas colocam o bispo em g2, contra o peão d5. Depois de 7...Be7 8.O-O O-O 9.Nxd5 exd5 10.dxc5 Bxc5 as pretas ficam com o peão isolado; com 11.Bg5 Qb6 12.Ne1 as brancas pressionam d5 e ficam com uma pequena vantagem (Schandorff–Adamski, Copenhague 2003).'],
  c98: [`${H} 9 Nxd5 exd5 10 dxc5 Bxc5 11 Bg5 Qd7 12 Ne1 h6`, 'g3', '11...Qd7', '⩲',
    'Com 11...Qd7 a dama defende d5 por trás. Depois de 12.Ne1 h6 o cavalo vai a d3 ou f3 e as brancas mantêm a pressão contra o peão isolado; elas ficam um pouco melhor (Kramnik–Anand, Mônaco 1995).'],
  c99: [`${H} 9 e4 Nb6 10 dxc5 Qxd1 11 Rxd1 Bxc5 12 Bf4 f6`, 'g3', '9.e4', '=',
    'Com 9.e4 as brancas expulsam o cavalo de d5. Depois de 9...Nb6 10.dxc5 Qxd1 11.Rxd1 Bxc5 12.Bf4 f6 as damas se trocam cedo e o final é mais ou menos igual (Korchnoi–Brunner, Zurique 1996).'],
  c100: [`${G} cxd4 8 Nxd4 Nxc3 9 bxc3 Nxd4 10 Qxd4 Qxd4 11 cxd4 Bb4+ 12 Bd2 Bxd2+`, 'g3', '7...cxd4', '⩲',
    'Com 7...cxd4 as pretas trocam peças de imediato. Depois de 8.Nxd4 Nxc3 9.bxc3 Nxd4 10.Qxd4 Qxd4 11.cxd4 Bb4+ 12.Bd2 Bxd2+ chega-se a um final em que o bispo de g2 e a coluna c dão uma pequena vantagem às brancas (Bischoff–Ribli, Bundesliga 2001).'],
  c101: [`${B} 5 cxd5 cxd4 6 Qxd4 Nxd5 7 e4 Nxc3 8 Qxc3 Nc6 9 Bb5 Bd7 10 O-O Qb6 11 a4 Qc5 12 Qd3 Qd6`, 'qxd4', '5...cxd4 6.Qxd4', '⩲',
    'Com 5...cxd4 6.Qxd4 Nxd5 7.e4 Nxc3 8.Qxc3 as damas ficam no tabuleiro e as brancas ganham tempo de desenvolvimento. Depois de 8...Nc6 9.Bb5 Bd7 10.O-O Qb6 11.a4 as brancas ficam com uma pequena vantagem (Piket–Brodsky, Wijk aan Zee 1995).'],
  c102: [`${B} 5 e3 Nc6 6 a3 a6 7 b3 cxd4 8 exd4 Be7 9 c5 b6 10 cxb6 Nd7 11 Bd3 a5 12 Nb5 Qxb6`, 'e3', '5.e3 Nc6 6.a3', '⩲',
    'Com 5.e3 Nc6 6.a3 as brancas jogam de forma tranquila. Depois de 6...a6 7.b3 cxd4 8.exd4 Be7 9.c5 elas ganham espaço na ala da dama; as pretas rompem com 9...b6 e 10...Nd7, mas as brancas ficam um pouco melhor (Gelfand–Kramnik, Sanghi Nagar 1994).'],
}

const notas = [
  // Coluna 97
  ['c97', 'a', 'a', '(a)', '6... cxd4 7 Nxd5 Qxd5 8 Qxd4 Qb5 9 e4 Qb4+ 10 Qxb4 Bxb4+', { a: '=', r: 'Atalik–Korchnoi, Plovdiv 2003', c: '6...cxd4 7.Nxd5 Qxd5 8.Qxd4 Qb5 9.e4 Qb4+ 10.Qxb4 Bxb4+ é igual.' }],
  ['c97', 'b', 'b', '(b)', '7... Nxc3 8 bxc3 cxd4 9 cxd4 Bb4+ 10 Bd2 Be7 11 Bc3 O-O 12 O-O Bd7 13 Qd2 b5', { a: '=', r: 'Gulko–Vaganian, Yerevan 1996', c: '7...Nxc3 8.bxc3 cxd4 9.cxd4 Bb4+ 10.Bd2 Be7 11.Bc3 O-O 12.O-O Bd7 13.Qd2 foi Gulko–Vaganian; agora 13...b5 teria sido mais ou menos igual.' }],
  ['c97-b', '1', 'b', '(b) 13...Rc8', '13... Rc8', { r: 'Gulko–Vaganian, Yerevan 1996', c: 'Vaganian jogou 13...Rc8.' }],
  ['c97', 'c', 'c', '(c)', '10 Be3 c4 11 b3 cxb3 12 Qxb3 Na5 13 Qd3 Nc4 14 Nd2 Nxe3 15 Qxe3 Be6', { a: '=', r: 'Murdzia–A. Greenfeld, Pardubice 1995', c: '10.Be3 c4 11.b3 cxb3 12.Qxb3 Na5 13.Qd3 Nc4 14.Nd2 Nxe3 15.Qxe3 Be6 foi mais ou menos igual.' }],
  ['c97', 'd', 'd', '(d)', '11... f6 12 Bd2 Bf5 13 Qb3 Bb6 14 Be3 Na5 15 Qc3 Bxe3 16 Qxe3 Re8 17 Qc5 Rc8', { a: '⩲', r: 'Kramnik–Kenghis, Riga 1995', c: '11...f6 12.Bd2 Bf5 13.Qb3 Bb6 14.Be3 Na5 15.Qc3 Bxe3 16.Qxe3 Re8 17.Qc5; agora 17...Rc8 teria limitado as brancas a uma pequena vantagem.' }],
  ['c97-d', '1', 'd', '(d) 17...b6', '17... b6', { r: 'Kramnik–Kenghis, Riga 1995', c: 'Kenghis jogou 17...b6.' }],
  ['c97', 'e-A', 'e', '(e) A', '12 Rc1 d4 13 Bf4 Bf5 14 Bc7 Qb5 15 Nd2 Bb6 16 Bxb6 axb6 17 Nc4', { a: '=', r: 'Kramnik–Anand, Linares 1994 (empate)', c: '12.Rc1 d4 13.Bf4 Bf5 14.Bc7 Qb5 15.Nd2 Bb6 16.Bxb6 axb6 17.Nc4 terminou empatado.' }],
  ['c97-e-A', '1', 'e', '(e) A 13.Qc2', '13 Qc2 Bd6 14 Nd2 Be6 15 Ne4 Be7 16 Bxe7', { a: '⩲', r: 'Illescas–Lautier, Dos Hermanas 1994', c: '13.Qc2 Bd6 14.Nd2 Be6 15.Ne4 Be7 16.Bxe7 é um pouco melhor para as brancas.' }],
  ['c97', 'e-B', 'e', '(e) B', '12 Qxd5 Be6 13 Qd2 h6 14 Bf4 Rfd8 15 Qc3 Rac8', { a: '∞', r: 'Parma', c: '12.Qxd5 Be6 13.Qd2 h6 14.Bf4 Rfd8 15.Qc3 Rac8 dá às pretas bom jogo pelo peão (Parma).' }],
  ['c97', 'f', 'f', '(f)', '13 Bd2 Bf5 14 Nd3 Bxd3 15 exd3 Rad8 16 Rb1 Ne5 17 Bc3 d4 18 Be1 Bb4 19 f4 Bxe1 20 fxe5', { a: '⩲', r: 'Schandorff–Adamski, Copenhague 2003', c: '13.Bd2 Bf5 14.Nd3 Bxd3 15.exd3 Rad8 16.Rb1 Ne5 17.Bc3 d4 18.Be1 Bb4 19.f4 Bxe1 20.fxe5 dá uma pequena vantagem às brancas.' }],
  // Coluna 98
  ['c98', 'g', 'g', '(g)', '12 Qc2 Bb6 13 Rfd1 h6 14 Bd2 Qg4 15 Bf4 Re8 16 h3 Qe6 17 Re1 Qf6', { a: '=', r: 'Kindermann–Rustemov, Bundesliga 2001', c: '12.Qc2 Bb6 13.Rfd1 h6 14.Bd2 Qg4 15.Bf4 Re8 16.h3 Qe6 17.Re1 Qf6 é igual.' }],
  ['c98', 'h-A', 'h', '(h)', '13 Bd2 Bb6 14 Nd3 Qd6 15 Bf4 Qf6', { a: '=', r: 'Wl. Schmidt–Greenfeld, Moscou 1994', c: '12...h6 13.Bd2 Bb6 14.Nd3 Qd6 15.Bf4 Qf6 foi igual.' }],
  ['c98', 'h-B', 'h', '(h) 12...d4', '12... d4 13 Nd3 Bb6 14 Bd2 Qe7 15 Nf4', { a: '⩲', r: 'Kramnik–Anand, Mônaco 1995', c: '12...d4 13.Nd3 Bb6 14.Bd2 Qe7 15.Nf4 é um pouco melhor para as brancas.' }],
  // Coluna 99
  ['c99', 'i', 'i', '(i)', '9... Ndb4 10 d5 exd5 11 exd5 Na5 12 a3 Na6 13 Bf4 Bd6', { a: '∞', r: 'Pira–Gouret, Tarcy 1991', c: '9...Ndb4 é outra linha: depois de 10.d5 exd5 11.exd5 Na5 12.a3 Na6 13.Bf4 Bd6 as duas partes têm chances.' }],
  ['c99-i', '1', 'i', '(i) 11...Nd4', '11... Nd4', { c: '11...Nd4 também é jogável.' }],
  ['c99-i', '2', 'i', '(i) 10.a3', '10 a3 cxd4 11 Nb5 Qb6 12 Nbxd4 e5', { a: '=', r: 'Greenfeld–Gruenfeld, Tel Aviv 1991', c: '10.a3 cxd4 11.Nb5 Qb6 12.Nbxd4 e5 também é igual.' }],
  ['c99', 'j', 'j', '(j)', '10 d5 exd5 11 exd5 Nb4 12 Ne1 Bf6 13 Nd3 Bg4 14 Qxg4 Nxd3', { a: '=', r: 'Yermolinsky–Dlugy, Washington 1991', c: '10.d5 exd5 11.exd5 Nb4 12.Ne1 Bf6 13.Nd3 Bg4 14.Qxg4 Nxd3 é igual.' }],
  ['c99', 'k', 'k', '(k)', '10... Bxc5 11 Qe2', { c: '10...Bxc5 11.Qe2 é outra possibilidade, mas a troca das damas é o modo mais seguro de jogar.' }],
  ['c99', 'l', 'l', '(l)', '12 e5', { c: 'As brancas podem considerar 12.e5, tentando manter as pretas apertadas.' }],
  ['c99', 'm', 'm', '(m)', '13 Rac1 e5 14 Nb5 exf4 15 Rxc5 fxg3 16 hxg3 Bg4 17 Rd2 Rad8 18 Nd6 Ne5', { a: '=', r: 'Korchnoi–Brunner, Zurique 1996', c: 'Depois de 13.Rac1 e5 14.Nb5 exf4 15.Rxc5 fxg3 16.hxg3 Bg4 17.Rd2 Rad8 18.Nd6, 18...Ne5 é igual.' }],
  ['c99-m', '1', 'm', '(m) 18...Bxf3', '18... Bxf3', { a: '⩲', r: 'Korchnoi–Brunner, Zurique 1996', c: 'Na partida, 18...Bxf3 levou a uma pequena vantagem branca.' }],
  // Coluna 100
  ['c100', 'n', 'n', '(n)', '8... Ndb4 9 Nxc6 Qxd1+ 10 Kxd1 Nxc6 11 Be3 Bd7 12 Rc1 Be7 13 Kc2 O-O 14 Rhd1 Rfd8 15 Kb1', { a: '⩲', r: 'Gelfand–Delchev, Moscou 2001', c: '8...Ndb4 9.Nxc6 Qxd1+ 10.Kxd1 Nxc6 11.Be3 Bd7 12.Rc1 Be7 13.Kc2 é um pouco melhor para as brancas.' }],
  ['c100', 'o', 'o', '(o)', '11... Bd6 12 O-O Rb8 13 e4 O-O 14 e5 Be7 15 Be3 Bd7 16 Rfc1', { a: '±', r: 'Kramnik–Lautier, Horgen 1995', c: '11...Bd6 12.O-O Rb8 13.e4 O-O 14.e5 Be7 15.Be3 Bd7 16.Rfc1 deu grande vantagem às brancas.' }],
  ['c100-o', '1', 'o', '(o) 13...Bd7', '13... Bd7', { a: '⩲', r: 'Kramnik', c: '13...Bd7 limitaria as brancas a uma pequena vantagem (Kramnik).' }],
  ['c100', 'p', 'p', '(p)', '13 Kxd2 Ke7 14 Rhc1 Rd8 15 Rc7+ Rd7', { a: '⩲', r: 'Bischoff–Ribli, Bundesliga 2001', c: '13.Kxd2 Ke7 14.Rhc1 Rd8 15.Rc7+ Rd7 foi uma pequena vantagem para as brancas.' }],
  // Coluna 101
  ['c101', 'q', 'q', '(q)', '7 Bg5 f6 8 Nxd5 exd5 9 Bd2 Nc6 10 Qa4 Qb6 11 Bc3 Bd7', { a: '∞', r: 'Goldin–Ruban, Novosibirsk 1993', c: '7.Bg5 é interessante aqui: 7...f6 8.Nxd5 exd5 9.Bd2 Nc6 10.Qa4 Qb6 11.Bc3 Bd7 é indefinido.' }],
  ['c101-q', '1', 'q', '(q) 10...d4', '10... d4', { r: 'Ruban', c: 'Ruban sugere 10...d4.' }],
  ['c101', 'r', 'r', '(r)', '9... Qb6 10 Bxc6+ Qxc6 11 Qxc6+ bxc6 12 O-O Be7 13 Be3 O-O 14 Rfc1', { a: '⩲', r: 'Mureşan–Savereide, Tbilisi 1982', c: '9...Qb6 10.Bxc6+ Qxc6 11.Qxc6+ bxc6 12.O-O é um pouco melhor para as brancas.' }],
  ['c101', 's', 's', '(s)', '10 Bd2 Qb6 11 Be2 Bc5 12 O-O O-O-O', { a: '=', r: 'Kachar–Pavlovichev, Podolsk 1991', c: '10.Bd2 Qb6 11.Be2 Bc5 12.O-O O-O-O é igual. (O Stockfish discorda: depois de 12...O-O-O dá cerca de +6 para as brancas, com 13.Rac1 contra o rei preto na coluna c.)' }],
  ['c101', 't', 't', '(t)', '11 Ba4 Qc5 12 Qd3 Qd6', { a: '=', r: 'Miles–Ribli, Baden-Baden 1981', c: '11.Ba4 Qc5 12.Qd3 Qd6 é igual.' }],
  ['c101-t', '1', 't', '(t) 11...Qb4', '11... Qb4 12 Qxb4 Bxb4 13 Rd1 f6', { a: '=', r: 'Dukhov–Pavlovichev, Podolsk 1990', c: 'Ou 11...Qb4 12.Qxb4 Bxb4 13.Rd1 f6, igual.' }],
  ['c101', 'u', 'u', '(u)', '12 Be3 Qxc3 13 bxc3 a6 14 Be2 Bd6', { a: '=', r: 'Rohde–Ruban, Interpolis 1992', c: '12.Be3 Qxc3 13.bxc3 a6 14.Be2 Bd6 é igual.' }],
  ['c101', 'v', 'v', '(v)', '13 Qe2 Be7 14 b3 Qc7 15 Bb2 O-O 16 Rac1', { a: '⩲', r: 'Piket–Brodsky, Wijk aan Zee 1995', c: '13.Qe2 Be7 14.b3 Qc7 15.Bb2 O-O 16.Rac1 é um pouco melhor para as brancas; 13...a6 talvez seja melhor.' }],
  // Coluna 102
  ['c102', 'w', 'w', '(w)', '5 Bg5 cxd4 6 Nxd4 e5 7 Nf3 d4 8 Nd5 Be7 9 Bxf6 Bxf6', { a: '=', c: '5.Bg5 cxd4 6.Nxd4 e5 7.Nf3 d4 8.Nd5 Be7 9.Bxf6 Bxf6 é igual.' }],
  ['c102-w', '1', 'w', '(w) 6.Qxd4', '6 Qxd4 Be7', { a: '=', c: '6.Qxd4 Be7 também é igual.' }],
  ['c102-w', '2', 'w', '(w) 8...Nc6', '8... Nc6 9 e4 Be7 10 Bxf6 Bxf6 11 b4', { a: '⩲', r: 'Euwe–Alekhine, Holanda 1937', c: 'Não 8...Nc6 9.e4 Be7 10.Bxf6 Bxf6 11.b4, um pouco melhor para as brancas; 8...Qa5+!? é uma ideia.' }],
  ['c102', 'x-A', 'x', '(x) A', '6... Ne4 7 Bd3 Nxc3 8 bxc3 Be7', { a: '=', c: 'As alternativas são 6...Ne4 7.Bd3 Nxc3 8.bxc3 Be7, igual.' }],
  ['c102', 'x-B', 'x', '(x) B', '6... cxd4 7 exd4 Be7 8 c5 Ne4 9 Qc2 Nxc3 10 Qxc3 a5', { a: '=', r: 'Ivkov–Suba, Sóchi 1983', c: 'Ou 6...cxd4 7.exd4 Be7 8.c5 Ne4 9.Qc2 Nxc3 10.Qxc3 a5, igual.' }],
  ['c102', 'y', 'y', '(y)', '9 Be2 O-O 10 O-O Ne4 11 Qc2 Nxc3 12 Qxc3 Bf6 13 Rd1 Ne7 14 c5', { a: '⩲', r: 'P. Littlewood–Thipsay, Campeonato Britânico 2002', c: '9.Be2 O-O 10.O-O Ne4 11.Qc2 Nxc3 12.Qxc3 Bf6 13.Rd1 Ne7 14.c5 é um pouco melhor para as brancas.' }],
  ['c102', 'z', 'z', '(z)', '10 b4 bxc5 11 bxc5 Ne4 12 Bd2 Bf6', { a: '∞', c: '10.b4 bxc5 11.bxc5 Ne4 12.Bd2 Bf6 dá contrajogo às pretas.' }],
  ['c102-z', '1', 'z', '(z) 11.dxc5', '11 dxc5 e5 12 Na4 Bg4', { a: '∞', r: 'Gelfand', c: '11.dxc5 e5 12.Na4 Bg4 é indefinido (Gelfand).' }],
  ['c102', 'aa', 'aa', '(aa)', '13 Bf4 O-O 14 O-O Na7 15 Nc7 Rb8 16 b4 Bb7 17 bxa5 Qxa5 18 Qe2 e5 19 Nxe5 Qxc7 20 Rac1', { a: '+−', r: 'Gelfand–Kramnik, Sanghi Nagar 1994', c: 'Gelfand–Kramnik seguiu 13.Bf4 O-O 14.O-O Na7 15.Nc7 Rb8 16.b4 Bb7 17.bxa5 Qxa5 18.Qe2 e5?, e agora 19.Nxe5 Qxc7 20.Rac1 ganharia.' }],
  ['c102-aa', '1', 'aa', '(aa) 14...Nf6', '14... Nf6', { a: '⩲', c: '14...Nf6 era melhor, com pequena desvantagem para as pretas.' }],
]

const capitulo = {
  id: 'gdr-q',
  arquivo: 'gdr-q',
  nome: 'Gambito da Dama Recusado — Semi-Tarrasch com 6.g3, 5...cxd4 e 5.e3',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 437–439), colunas 97–102',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 437,
  grupos: [
    { id: 'g3', nome: '5.cxd5 Nxd5 6.g3', colunas: [97, 98, 99, 100] },
    { id: 'qxd4', nome: '5...cxd4 6.Qxd4', colunas: [101] },
    { id: 'e3', nome: '5.e3', colunas: [102] },
  ],
}

module.exports = { capitulo, colunas, notas }
