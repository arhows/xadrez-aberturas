// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante 5.Bf4 (pp. 420–422), colunas 61–66.
// Gerar: node scripts/mco/gerar.cjs gdr-k
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-k-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// A nota (o) não traz lances ("as brancas ficaram com pequena vantagem"); o comentário entrou no resumo da coluna 64.
// Correções: na nota (q) A o livro traz 11...Be7 e depois 14...Be7 de novo; o 11º lance preto é 11...b5 (o que explica 12 Bd3 e 12...Bb7).
// Na nota (x) o livro termina com 17...Be3, impossível (o peão branco de d4 bloqueia o bispo de b6); a linha ficou até 17 exd4.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Nf3 Be7 5 Bf4 O-O 6 e3 c5 7 dxc5 Bxc5'
const Q = `${B} 8 Qc2 Nc6 9 a3 Qa5`

const colunas = {
  c61: [`${Q} 10 O-O-O Be7 11 h4 Rd8 12 g4 Bd7 13 Kb1 dxc4 14 Bxc4 Rac8 15 g5 Nh5`, 'qc2', '8.Qc2 10.O-O-O 11.h4', '=',
    'Na Variante 5.Bf4 as brancas colocam o bispo fora da cadeia de peões e, depois de 6...c5 7.dxc5 Bxc5, jogam 8.Qc2 e 9.a3. Com 10.O-O-O os roques ficam em lados opostos e começa uma corrida de ataques; depois de 15.g5 Nh5 as pretas aos poucos igualaram (Kasparov–Ehlvest, Novgorod 1995).'],
  c62: [`${Q} 10 O-O-O Be7 11 g4 dxc4 12 Bxc4 e5 13 g5 exf4 14 gxf6 Bxf6 15 Nd5 Ne7`, 'qc2', '11.g4', '=',
    'Com 11.g4 as brancas atacam de imediato. Depois de 11...dxc4 12.Bxc4 e5 13.g5 exf4 14.gxf6 Bxf6 as pretas ganham uma peça por peões, e o jogo é agudo, mas mais ou menos igual (Anand–Kramnik, León 2002).'],
  c63: [`${Q} 10 Nd2 Bb4 11 cxd5 exd5 12 Bd3 d4 13 O-O Bxc3 14 Nc4 Qh5 15 bxc3 Nd5`, 'qc2', '10.Nd2 Bb4', '∞',
    'Com 10.Nd2 as brancas preparam Nb3 ou Nc4 contra a dama preta. Depois de 10...Bb4 11.cxd5 exd5 12.Bd3 d4 as pretas abrem o jogo e as chances ficam para os dois lados (Korchnoi–Lutz, Zurique 1999).'],
  c64: [`${Q} 10 Nd2 Be7 11 Bg3 Bd7 12 Be2 Rac8 13 O-O Qd8 14 cxd5 exd5 15 Nf3 a6`, 'qc2', '10...Be7', '⩲',
    'Com 10...Be7 as pretas mantêm a tensão no centro. Depois de 11.Bg3 Bd7 12.Be2 Rac8 13.O-O a dama recua e as pretas aceitam o peão isolado; as brancas ficaram com pequena vantagem (L.B. Hansen–Cifuentes Parada, Wijk aan Zee 1994).'],
  c65: [`${B} 8 a3 Nc6 9 Be2 dxc4 10 Bxc4 Qxd1+ 11 Rxd1 a6 12 Be2 Rd8 13 Rxd8+ Nxd8 14 O-O Bd7 15 Rd1 Be8`, 'a3', '8.a3', '⩲',
    'Com 8.a3 as brancas guardam a dama em d1. Depois de 9.Be2 dxc4 10.Bxc4 Qxd1+ as damas se trocam cedo; no final as brancas ficam com uma pequena vantagem (M. Gurevich–Ekström, Neuchâtel 1996).'],
  c66: [`${B} 8 cxd5 Nxd5 9 Nxd5 exd5 10 a3 Nc6 11 Bd3 Bb6 12 O-O Bg4 13 h3 Bh5 14 b4 a6 15 Rc1 d4`, 'cxd5', '8.cxd5 Nxd5', '⩲',
    'Com 8.cxd5 Nxd5 9.Nxd5 exd5 as pretas ficam com o peão isolado em d5, mas com peças ativas. Depois de 10.a3 Nc6 11.Bd3 Bb6 12.O-O Bg4 elas pressionam, e com 15...d4 abrem o jogo; as brancas mantêm uma pequena vantagem (Beliavsky–Kir. Georgiev, Biel 1992).'],
}

const notas = [
  // Coluna 61
  ['c61', 'a', 'a', '(a)', '9... Qe7 10 Rd1 Rd8 11 b4 Nxb4 12 axb4 Bxb4 13 Nd2 Bd7 14 Be2', { a: '∞', r: 'Miles–Ziatdinov, Montpellier 1994', c: '9...Qe7 10.Rd1 Rd8 11.b4 Nxb4 12.axb4 Bxb4 13.Nd2 Bd7 14.Be2 foi indefinido.' }],
  ['c61-a', '1', 'a', '(a) 11...Bd6', '11... Bd6 12 Bg5', { a: '⩲', r: 'Miles–Kogan, EUA 1980', c: '11...Bd6 12.Bg5 é um pouco melhor para as brancas.' }],
  ['c61', 'b', 'b', '(b)', '10 Rd1 Be7 11 Be2 e5 12 Nxe5 Nxe5 13 Bxe5 dxc4 14 Bd4 Bf5 15 Qc1 Rac8 16 O-O Rfd8', { a: '=', r: 'Mamedyarov–P.H. Nielsen, San Luis 2005', c: '10.Rd1 Be7 11.Be2 (uma tentativa recente nesta linha antiga) 11...e5 12.Nxe5 Nxe5 13.Bxe5 dxc4 é igual.' }],
  ['c61', 'c-A', 'c', '(c) A', '10... Ne4 11 Nb5 a6 12 Nc7 e5 13 Rxd5 f5 14 Rxe5 Nxe5 15 Bxe5', { a: '±', r: 'Kasparov–Vaganian, Debrecen 1992', c: '10...Ne4 11.Nb5 a6 12.Nc7 e5 13.Rxd5 f5 14.Rxe5 Nxe5 15.Bxe5 é melhor para as brancas.' }],
  ['c61-c-A', '1', 'c', '(c) A 13...Nf6', '13... Nf6 14 Ng5 Bf5', { r: 'Kasparov', c: '13...Nf6 14.Ng5 Bf5 era a melhor tentativa (Kasparov).' }],
  ['c61', 'c-B', 'c', '(c) B', '10... Bd7 11 cxd5 Nxd5 12 Ng5 g6 13 Nge4 Nxc3 14 Qxc3 Qxc3+ 15 Nxc3 e5', { a: '∞', r: 'Piket–Timman, Amsterdã 1995', c: '10...Bd7 11.cxd5 Nxd5 12.Ng5 g6 13.Nge4, e agora 13...Nxc3 14.Qxc3 Qxc3+ 15.Nxc3 e5 é confuso.' }],
  ['c61', 'd', 'd', '(d)', '11... dxc4 12 Bxc4 b6 13 Ng5 Ba6 14 Nce4 g6 15 Nxf6+ Bxf6 16 Ne4 Be7 17 Bxa6', { a: '⩲', r: 'Kasparov–Vaganian, Novgorod 1995', c: '11...dxc4 12.Bxc4 b6 13.Ng5 Ba6 14.Nce4 é um pouco melhor para as brancas.' }],
  ['c61', 'e', 'e', '(e)', '16 Bd6 g6 17 Be2 Bxd6 18 Rxd6 Ne7', { a: '=', r: 'Kasparov–Ehlvest, Novgorod 1995', c: 'Depois de 16.Bd6 g6 17.Be2 Bxd6 18.Rxd6 Ne7 as pretas aos poucos igualaram.' }],
  // Coluna 62
  ['c62', 'f', 'f', '(f)', '12... a6 13 g5 Nh5 14 Bd3 g6 15 Be4 e5 16 Bxe5 Nxe5 17 Rd5 Qc7 18 Rxe5 Be6 19 Rd1 Bd6 20 Rxe6 fxe6 21 Qb3 Ng7 22 Qxb7', { a: '=', r: 'Khalifman–Onischuk, Togliatti 2003', c: '12...a6 13.g5 Nh5 14.Bd3 g6 15.Be4 e5 leva a complicações que terminaram numa posição igual.' }],
  ['c62', 'g', 'g', '(g)', '15 Rd5 Qc7 16 Rh5 g6 17 Nd5 Qd8 18 Rg1 Be6 19 Ng5 Bxg5', { a: '∞', r: 'Libeau–Hoffman, Biel 1993', c: '15.Rd5 Qc7 16.Rh5 g6 17.Nd5 Qd8 18.Rg1 Be6 19.Ng5 Bxg5 foi indefinido.' }],
  ['c62-g', '1', 'g', '(g) 19...Bxd5', '19... Bxd5 20 Bxd5 Qxd5 21 Nxh7 Qd8 22 Rxg6+ fxg6 23 Qxg6+ Bg7 24 Ng5 Rf6 25 Rh8+', { a: '+−', c: '19...Bxd5 20.Bxd5 Qxd5 21.Nxh7 Qd8 22.Rxg6+ fxg6 23.Qxg6+ Bg7 24.Ng5 Rf6 25.Rh8+ teria sido um belo final. (O Stockfish confirma: é mate forçado.)' }],
  ['c62', 'h', 'h', '(h)', '16 Nxf6+ gxf6 17 Rhg1+ Kh8 18 e4 b5 19 Bd5 Nxd5 20 exd5 b4 21 axb4 Qa1+ 22 Kd2 Qa6 23 Qc6 Rd8 24 Kc3 Bb7', { a: '=', r: 'Anand–Kramnik, León 2002 (com computador)', c: '16.Nxf6+ gxf6 17.Rhg1+ Kh8 18.e4 b5 foi mais ou menos igual.' }],
  // Coluna 63
  ['c63', 'i', 'i', '(i)', '11... Nxd5 12 Nxd5 exd5 13 Bd3 h6 14 Rc1 Be7 15 O-O Be6 16 Nb3 Qb6 17 Nc5 Rac8 18 Nxe6 fxe6 19 Qe2 Bf6 20 Qh5', { a: '⩲', r: 'Kramnik–Hübner, Alemanha 1993', c: '11...Nxd5 12.Nxd5 exd5 13.Bd3 h6 14.Rc1 é bom para as brancas.' }],
  ['c63-i', '1', 'i', '(i) 17...Bxc5', '17... Bxc5 18 Qxc5 Qxb2 19 Rb1 Qd2 20 Rfd1 Qa5 21 Rb5', { a: '⩲', r: 'Bareev–Dzandzgava, Debrecen 1992', c: '17...Bxc5 18.Qxc5 Qxb2 19.Rb1 Qd2 20.Rfd1 Qa5 21.Rb5 é um pouco melhor para as brancas.' }],
  ['c63', 'j', 'j', '(j)', '12... Nh5 13 Bg3 h6 14 O-O Bxc3 15 Nb3 Qb6 16 Qxc3', { a: '⩲', r: 'Gelfand–P.H. Nielsen, Olimpíada de Turim 2006', c: '12...Nh5 13.Bg3 h6 14.O-O Bxc3 15.Nb3 Qb6 16.Qxc3 é um pouco melhor para as brancas.' }],
  ['c63', 'k', 'k', '(k)', '16 Bg3 dxe3 17 Rae1', { a: '∞', r: 'Korchnoi–Lutz, Zurique 1999', c: 'Depois de 16.Bg3 dxe3 17.Rae1 as duas partes têm chances.' }],
  ['c63-k', '1', 'k', '(k) 16.Bd6', '16 Bd6 Rd8 17 cxd4 b5 18 Ne5 Rxd6 19 Nxc6 Rh6', { a: '∓', c: 'Se 16.Bd6 Rd8 17.cxd4 b5 18.Ne5 Rxd6 19.Nxc6 Rh6, as pretas têm um ataque forte demais. (O Stockfish vai além: dá cerca de −4, vantagem decisiva das pretas.)' }],
  // Coluna 64
  ['c64', 'l', 'l', '(l)', '12 Rd1 Rac8 13 Be2 a6 14 O-O b5 15 cxd5 exd5 16 Nf3', { a: '⩲', r: 'Lautier–Vaïsser, Campeonato Francês 2005', c: '12.Rd1 Rac8 13.Be2 a6 14.O-O b5 15.cxd5 exd5 16.Nf3 é um pouco melhor para as brancas.' }],
  ['c64', 'm-A', 'm', '(m) A', '12... Rfd8 13 O-O a6 14 b4 Qb6 15 c5 Qa7 16 Na4', { a: '⩲', r: 'L.B. Hansen–P. Andersen, Dinamarca 1993', c: '12...Rfd8 13.O-O a6 14.b4 Qb6 15.c5 é um pouco melhor para as brancas.' }],
  ['c64', 'm-B', 'm', '(m) B', '12... Rfc8 13 Rd1 Qd8 14 O-O Na5', { a: '=', r: 'Lautier–Beliavsky, Bundesliga 2001', c: 'Uma tentativa melhor é 12...Rfc8 13.Rd1 Qd8 14.O-O Na5, perto da igualdade.' }],
  ['c64', 'n', 'n', '(n)', '14 Rad1 d4 15 Nb5 dxe3 16 fxe3 Qb6', { c: '14.Rad1 permitiria 14...d4 15.Nb5 dxe3 16.fxe3 Qb6.' }],
  // Coluna 65
  ['c65', 'p', 'p', '(p)', '9 Rc1 d4 10 Nxd4 e5 11 Nb3 Bxa3 12 bxa3 exf4', { a: '=', r: 'Kramnik–Beliavsky, Belgrado 1993', c: '9.Rc1 d4 10.Nxd4 e5 11.Nb3 Bxa3 12.bxa3 exf4 levou à igualdade.' }],
  ['c65-p', '1', 'p', '(p) 9...dxc4', '9... dxc4 10 Bxc4 Qxd1+', { a: '=', r: 'Kramnik–Vaganian, Lucerna 1993', c: '9...dxc4 10.Bxc4 Qxd1+ também é bom.' }],
  ['c65', 'q-A', 'q', '(q) A', '10... a6 11 Qc2 b5 12 Bd3 Bb7 13 Ne4 Qa5+ 14 Ke2 Be7 15 Nxf6+ Bxf6 16 Bxh7+ Kh8 17 Rac1', { a: '±', r: 'I. Sokolov–Cifuentes Parada, Oviedo 1992', c: '10...a6 11.Qc2 b5 12.Bd3 Bb7 13.Ne4 Qa5+ 14.Ke2 Be7 15.Nxf6+ Bxf6 16.Bxh7+ Kh8 17.Rac1 é melhor para as brancas. (O livro traz 11...Be7, repetido depois em 14...Be7; o lance é 11...b5.)' }],
  ['c65', 'q-B', 'q', '(q) B', '10... Nh5 11 Qxd8 Rxd8 12 Bc7 Rd7 13 Be5 b6', { a: '=', r: 'Lobron–Lutz, Nussloch 1996', c: '10...Nh5 11.Qxd8 Rxd8 12.Bc7 Rd7 13.Be5 b6 foi mais ou menos igual.' }],
  ['c65', 'r', 'r', '(r)', '11... b6 12 e4 Bb7 13 e5 Ng4 14 Ne4 Rfd8 15 O-O', { a: '⩲', r: 'Kramnik–Yusupov, Moscou (rápidas) 1995', c: '11...b6 12.e4 Bb7 13.e5 Ng4 14.Ne4 é um pouco melhor para as brancas.' }],
  ['c65', 's', 's', '(s)', '12 Bd3 Rd8 13 Bg5 h6 14 Bh4 e5 15 Bxf6 gxf6', { a: '∞', r: 'M. Gurevich', c: '12.Bd3 Rd8 13.Bg5 h6 14.Bh4 e5 15.Bxf6 gxf6 é indefinido (M. Gurevich).' }],
  ['c65', 't', 't', '(t)', '16 Nd2 Nc6 17 Nde4 Nxe4 18 Nxe4 Be7 19 Nd6 Bxd6 20 Bxd6', { a: '⩲', r: 'M. Gurevich–Ekström, Neuchâtel 1996', c: 'Depois de 16.Nd2 Nc6 17.Nde4 Nxe4 18.Nxe4 Be7 19.Nd6 Bxd6 20.Bxd6 as brancas ficam com pequena vantagem.' }],
  // Coluna 66
  ['c66', 'u', 'u', '(u)', '8... exd5 9 Rc1 Nc6 10 a3 d4 11 Na4 Qa5+ 12 b4 Nxb4 13 Nd2 dxe3 14 fxe3 Na6 15 Bxa6 Bxa3 16 Ra1 Qxa6 17 Rxa3 b5', { a: '∓', r: 'Slutzkin–Kibalnichenko, Rússia 1992', c: '8...exd5 é intrigante: 9.Rc1 Nc6 10.a3 d4 11.Na4 Qa5+ 12.b4 Nxb4 levou a vantagem preta.' }],
  ['c66-u', '1', 'u', '(u) 11.exd4', '11 exd4 Nxd4 12 Nxd4', { c: '11.exd4 Nxd4 12.Nxd4 talvez fosse melhor.' }],
  ['c66', 'v', 'v', '(v)', '10 Bd3 Bb4+ 11 Ke2 Nc6 12 Qc2 h6 13 Rhd1 Qf6 14 Kf1 Ba5 15 Be2 Bb6', { a: '=', r: 'Quinteros–Najdorf, Mar del Plata 1982', c: '10.Bd3 Bb4+ 11.Ke2 Nc6 12.Qc2 h6 é inofensivo.' }],
  ['c66', 'w', 'w', '(w)', '11... Be7 12 O-O Be6 13 Ne5', { a: '⩲', r: 'Kraidman–Radashkovich, Netanya 1973', c: '11...Be7 12.O-O Be6 13.Ne5 foi bom para as brancas.' }],
  ['c66', 'x', 'x', '(x)', '12... Qf6 13 b4 Bf5 14 Rc1 d4 15 Bg5 Qg6 16 Bxf5 Qxf5 17 exd4', { a: '=', r: 'Leitão–Rybka (computador), Santiago 2006', c: '12...Qf6 é bem possível: 13.b4 Bf5 14.Rc1 d4 15.Bg5 Qg6 16.Bxf5 Qxf5 17.exd4 levou a uma posição de empate. (O livro segue com 17...Be3, impossível; a linha ficou até aqui.)' }],
  ['c66', 'y', 'y', '(y)', '14... Re8 15 Rc1 d4 16 g4 Bg6 17 Bxg6 hxg6 18 b5 dxe3 19 bxc6 e2 20 Qxd8 exf1=Q+ 21 Kxf1', { a: '=', r: 'Dreev–Geller, Helsinque 1992; Dreev', c: '14...Re8 é jogado com frequência: 15.Rc1 d4 16.g4 Bg6 17.Bxg6 hxg6 18.b5 (Dreev–Geller) e agora 18...dxe3 19.bxc6 e2 20.Qxd8 exf1=Q+ 21.Kxf1 é igual (Dreev).' }],
  ['c66-y', '1', 'y', '(y) 15.g4', '15 g4 Bg6 16 Bxg6 hxg6 17 b5 Na5', { a: '=', r: 'Chiburdanidze–Geller, Aruba 1992', c: '15.g4 Bg6 16.Bxg6 hxg6 17.b5 Na5 é igual.' }],
  ['c66', 'z', 'z', '(z)', '16 g4 Bg6 17 e4 Re8 18 Nd2 Rc8 19 Bg3 f6 20 f4', { a: '⩲', r: 'Beliavsky–Kir. Georgiev, Biel 1992', c: 'Depois de 16.g4 Bg6 17.e4 Re8 18.Nd2 Rc8 19.Bg3 f6, 20.f4 teria sido um pouco melhor para as brancas.' }],
  ['c66-z', '1', 'z', '(z) 19.Qb3', '19 Qb3', { c: '19.Qb3!? era uma alternativa.' }],
]

const capitulo = {
  id: 'gdr-k',
  arquivo: 'gdr-k',
  nome: 'Gambito da Dama Recusado — Variante 5.Bf4',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 420–422), colunas 61–66',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 420,
  grupos: [
    { id: 'qc2', nome: '8.Qc2', colunas: [61, 62, 63, 64] },
    { id: 'a3', nome: '8.a3', colunas: [65] },
    { id: 'cxd5', nome: '8.cxd5', colunas: [66] },
  ],
}

module.exports = { capitulo, colunas, notas }
