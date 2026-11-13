// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante das Trocas (pp. 415–417), colunas 49–54.
// Gerar: node scripts/mco/gerar.cjs gdr-i
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-i-dicas.cjs.
//
// A tabela só traz avaliação na coluna 52; nas outras usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (a) o livro termina com 10 Nge2, impossível com o cavalo já em f3 (6 Nf3); a linha ficou até 9...Be6.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 cxd5 exd5 5 Bg5 c6'
const Q = `${B} 6 Qc2 Be7 7 e3 Nbd7 8 Bd3 O-O`
const G = `${Q} 9 Nge2 Re8 10 O-O Nf8`

const colunas = {
  c49: [`${B} 6 Nf3 Be7 7 e3 Nbd7 8 Bd3 Nh5 9 Bxe7 Qxe7 10 O-O Nhf6 11 Qc2 O-O 12 Rfe1 g6 13 a3 Nb6`, 'nf3', '6.Nf3 8...Nh5', '⩲',
    'Na Variante das Trocas as brancas fixam a estrutura de peões: as pretas ficam com o peão d5 e as brancas planejam o ataque de minoria (b4–b5) na ala da dama. Com 6.Nf3 Be7 7.e3 Nbd7 8.Bd3 Nh5 as pretas trocam o bispo de g5, mas as brancas ficam um pouco melhor (Piket–Timman, Wijk aan Zee 1996).'],
  c50: [`${Q} 9 Nf3 Re8 10 O-O Nf8 11 Rab1 g6 12 b4 Ne6 13 Bh4 a6`, 'qc2', '6.Qc2 9.Nf3 11.Rab1', '∞',
    'Com 6.Qc2 as brancas impedem ...Bf5. Depois de 9.Nf3 Re8 10.O-O Nf8 11.Rab1 elas preparam o ataque de minoria com b4–b5; as pretas reagrupam o cavalo por f8 e e6, e o jogo fica com chances para os dois lados (Ftáčnik–Ivanchuk, Moscou 1994).'],
  c51: [`${Q} 9 Nf3 Re8 10 O-O Nf8 11 h3 g6 12 Rab1 Ne6 13 Bh6 Ng7`, 'qc2', '11.h3', '⩲',
    'Com 11.h3 as brancas tiram g4 das peças pretas antes de Rab1. Depois de 11...g6 12.Rab1 Ne6 13.Bh6 Ng7 o ataque de minoria segue com b4, e as brancas ficam um pouco melhor (Ruban–Panchenko, Rússia 1994).'],
  c52: [`${G} 11 f3 Be6 12 Bh4 N6d7 13 Bf2 Rc8`, 'nge2', '9.Nge2 11.f3 12.Bh4', '=',
    'Com 9.Nge2 e 11.f3 as brancas trocam de plano: em vez do ataque de minoria, preparam e4 para ocupar o centro. Depois de 11...Be6 12.Bh4 N6d7 13.Bf2 Rc8 as pretas ficam bem colocadas e o jogo é igual.'],
  c53: [`${G} 11 f3 Be6 12 Rad1 Rc8 13 a3 c5`, 'nge2', '12.Rad1', '⩲',
    'Com 12.Rad1 a torre apoia a ruptura central. Depois de 12...Rc8 13.a3 c5 as pretas abrem a coluna c, mas as brancas ficam um pouco melhor (Hansen).'],
  c54: [`${G} 11 Rab1 Ne4 12 Bxe7 Qxe7 13 Bxe4 dxe4`, 'nge2', '11.Rab1', '=',
    'Com 11.Rab1 as brancas voltam ao ataque de minoria mesmo com o cavalo em e2. Depois de 11...Ne4 12.Bxe7 Qxe7 13.Bxe4 dxe4 as pretas ficam com o peão em e4, mas com jogo ativo igualam (Leko–Z. Almási, Hungria 1995).'],
}

const notas = [
  // Coluna 49
  ['c49', 'a', 'a', '(a)', '7... Bg4 8 Bd3 Nbd7 9 h3 Be6', { a: '⩲', r: 'Vaganian–Short, Skellefteå 1989', c: '7...Bg4 é duvidoso: depois de 8.Bd3 Nbd7 9.h3 Be6 as brancas ficaram um pouco melhor. (O livro segue com 10.Nge2, impossível com o cavalo já em f3; a linha ficou até aqui.)' }],
  ['c49', 'b', 'b', '(b)', '10... O-O 11 Qb1 Nhf6 12 b4 Re8 13 Rc1 a6 14 a4 g6 15 Qb2 a5 16 bxa5', { a: '⩲', r: 'Kramnik–Timman, Belgrado 1995', c: '10...O-O 11.Qb1 Nhf6 12.b4 Re8 13.Rc1 a6 14.a4 é um pouco melhor para as brancas.' }],
  ['c49-b', '1', 'b', '(b) 11...g6', '11... g6 12 b4 a6 13 a4 Ng7 14 b5', { a: '±', r: 'Kramnik', c: 'Se 11...g6, 12.b4 a6 13.a4 Ng7 14.b5 dá grande vantagem às brancas (Kramnik).' }],
  ['c49', 'c', 'c', '(c)', '13 Rab1 Nb6 14 b4 Be6 15 a4 a6 16 a5 Nc8 17 Ne5 Nd6 18 f3 Rad8 19 Qf2 Nd7 20 Na4 Nxe5 21 dxe5 Ne8 22 e4', { a: '⩲', r: 'Onischuk–Pelletier, Poikovsky 2003', c: 'As brancas foram mais diretas em Onischuk–Pelletier: 13.Rab1 Nb6 14.b4 Be6 15.a4 a6 16.a5, e depois de 22.e4 ficaram com a iniciativa.' }],
  ['c49', 'd', 'd', '(d)', '14 b4', { a: '⩲', r: 'Piket–Timman, Wijk aan Zee 1996', c: 'Depois de 14.b4 as brancas ficam um pouco melhor.' }],
  // Coluna 50
  ['c50', 'e', 'e', '(e)', '10 O-O-O Nf8 11 h3 Be6 12 Kb1 Rc8 13 g4 N6d7 14 Bxe7 Qxe7 15 Nd2 c5 16 f4 f6 17 Rhe1 cxd4 18 exd4', { a: '⩲', r: 'Bacrot–Bruzón, Havana 2005', c: '10.O-O-O Nf8 11.h3 Be6 12.Kb1 Rc8 13.g4, com roques opostos, é um pouco melhor para as brancas.' }],
  ['c50', 'f-A', 'f', '(f) A', '11 Rae1 Be6 12 Ne5 N6d7 13 Bxe7 Rxe7 14 f4 f6 15 Nf3 Rc8', { a: '⩲', r: 'Rogers–Speelman, Espanha 1994', c: 'Há outros lances aqui: 11.Rae1 Be6 12.Ne5 N6d7 13.Bxe7 Rxe7 14.f4 é um pouco melhor para as brancas.' }],
  ['c50', 'f-B', 'f', '(f) B', '11 Bxf6 Bxf6 12 b4 Bg4 13 Nd2 Be7', { a: '=', r: 'Timman–Kasparov, Mundo × URSS 1984', c: '11.Bxf6 Bxf6 12.b4 Bg4 13.Nd2 Be7 é igual.' }],
  ['c50', 'f-C', 'f', '(f) C', '11 a3 a5 12 Ne5 Ng4 13 Bxe7 Qxe7', { a: '=', r: 'Bagirov–Avsalumov, URSS 1986', c: '11.a3 a5 12.Ne5 Ng4 13.Bxe7 Qxe7 é igual.' }],
  ['c50', 'g-A', 'g', '(g) A', '11... a5 12 a3 Bd6 13 Rfe1 Bg4 14 Nd2 Bh5 15 Bh4 Bg6 16 Nf3 Bxd3 17 Qxd3 N8d7 18 e4 dxe4 19 Nxe4 Be7', { a: '=', r: 'Ivanchuk–Bruzón, Havana 2005', c: '11...a5 12.a3 Bd6 13.Rfe1 Bg4 foi igual.' }],
  ['c50', 'g-B', 'g', '(g) B', '11... Be6 12 b4 a6 13 Na4 N6d7 14 Bxe7 Qxe7 15 Nc5', { a: '⩲', r: 'Portisch–Yusupov, Bugojno 1986', c: '11...Be6 12.b4 a6 13.Na4 N6d7 14.Bxe7 Qxe7 15.Nc5 é um pouco melhor para as brancas. Também 11...Ng6, 11...Ne4 e 11...Bd6 deixam as brancas um pouco melhor.' }],
  ['c50', 'h', 'h', '(h)', '14 a4 Ng7 15 b5 axb5 16 axb5 Bf5 17 bxc6 bxc6 18 Ne5 Rc8', { a: '∞', r: 'Ftáčnik–Ivanchuk, Moscou 1994', c: '14.a4 Ng7 15.b5 axb5 16.axb5 Bf5 17.bxc6 bxc6 18.Ne5 Rc8 dá chances aos dois lados.' }],
  ['c50-h', '1', 'h', '(h) 17.h3', '17 h3 Bxd3 18 Qxd3 Nf5', { a: '=', r: 'Ftáčnik', c: '17.h3 Bxd3 18.Qxd3 Nf5 é igual.' }],
  // Coluna 51
  ['c51', 'i', 'i', '(i)', '11... Be6 12 Bxf6 Bxf6 13 b4 Rc8 14 Na4 Rc7 15 Rac1 Be7 16 Qb1 Bd6', { a: '⩲', r: 'Karpov–Campora, San Nicolás 1994', c: '11...Be6 é outra linha principal: 12.Bxf6 Bxf6 13.b4 Rc8 14.Na4 Rc7 15.Rac1 é um pouco melhor para as brancas.' }],
  ['c51-i', '1', 'i', '(i) 14.Rac1', '14 Rac1', { c: '14.Rac1 também é jogado.' }],
  ['c51-i', '2', 'i', '(i) 12.Rab1', '12 Rab1 N6d7 13 Bf4 Nb6 14 Na4 Nxa4 15 Qxa4 Ng6 16 Bh2', { a: '⩲', r: 'I. Sokolov–Yusupov, Amsterdã 1994', c: 'Também 12.Rab1 N6d7 13.Bf4 Nb6 14.Na4 é um pouco melhor para as brancas.' }],
  ['c51', 'j-A', 'j', '(j) A', '12 Bxf6 Bxf6 13 b4 Be7 14 b5 Bd6 15 bxc6', { a: '⩲', r: 'P. Nikolić–L. Hansen, Wijk aan Zee 1995', c: '12.Bxf6 Bxf6 13.b4 Be7 14.b5 é um pouco melhor para as brancas.' }],
  ['c51', 'j-B', 'j', '(j) B', '12 Bh6 Ne6 13 Rab1 c5 14 dxc5 Nxc5 15 Rbd1 Qa5 16 Nd4 Bd7 17 Bg5', { a: '⩲', r: 'Yermolinsky–Kaidanov, Asheville 1995', c: '12.Bh6 Ne6 13.Rab1 c5 14.dxc5 Nxc5 15.Rbd1 Qa5?! 16.Nd4 é um pouco melhor para as brancas.' }],
  ['c51', 'k', 'k', '(k)', '13 Bh4 Ng7 14 b4 a6 15 a4', { a: '⩲', r: 'Gelfand–Lobron, Munique 1994', c: '13.Bh4 Ng7 14.b4 a6 15.a4 é um pouco melhor para as brancas.' }],
  ['c51', 'l-A', 'l', '(l)', '14 b4 a6 15 a4 Bf5 16 Bxg7 Bxd3 17 Qxd3 Kxg7 18 b5', { a: '⩲', r: 'Ruban–Panchenko, Rússia 1994', c: 'Na coluna, 14.b4 a6 15.a4 Bf5 16.Bxg7 Bxd3 17.Qxd3 Kxg7 18.b5 dá vantagem às brancas.' }],
  ['c51', 'l-B', 'l', '(l) 13...a5', '13... a5 14 a3 Ng7 15 b4 axb4 16 axb4 Bf5', { a: '=', r: 'Yermolinsky–G. García, Nova York 1994', c: '13...a5 14.a3 Ng7 15.b4 axb4 16.axb4 Bf5 é igual.' }],
  // Coluna 52
  ['c52', 'm-A', 'm', '(m) A', '10 O-O-O Qa5 11 Kb1 b5 12 Ng3 h6 13 Bf4 g5', { a: '∞', r: 'Miles–Morović, Túnis 1985', c: 'As brancas têm várias alternativas: 10.O-O-O Qa5 11.Kb1 b5 12.Ng3 h6 13.Bf4 g5 é indefinido.' }],
  ['c52', 'm-B', 'm', '(m) B', '10 h3 Nf8 11 g4 a5 12 Ng3 h6 13 Bxf6 Bxf6', { a: '∞', r: 'Salov–van der Sterren, Hilversum 1993', c: '10.h3 Nf8 11.g4 a5 12.Ng3 h6 13.Bxf6 Bxf6 foi indefinido.' }],
  ['c52', 'n', 'n', '(n)', '10... g6 11 f3 Nh5 12 Bxe7 Rxe7 13 e4 Nb6 14 Rf2', { a: '⩲', r: 'Timman', c: '10...g6 11.f3 Nh5 12.Bxe7 Rxe7 13.e4 Nb6 14.Rf2 é um pouco melhor para as brancas (Timman).' }],
  ['c52-n', '1', 'n', '(n) 14.e5', '14 e5 c5', { r: 'Timman–Short, San Lorenzo 1993', c: 'Em vez de 14.e5 c5, como em Timman–Short.' }],
  ['c52', 'o-A', 'o', '(o) A', '11... c5 12 Bxf6 Bxf6 13 dxc5 Rxe3 14 Rad1', { a: '⩲', r: 'Mozetić–Abramović, Iugoslávia 1995', c: 'Aqui também as pretas têm muitas escolhas: 11...c5 12.Bxf6 Bxf6 13.dxc5 Rxe3 14.Rad1 é um pouco melhor para as brancas.' }],
  ['c52', 'o-B', 'o', '(o) B', '11... Ng6 12 Rad1 Nh5 13 Bxe7 Qxe7', { a: '⩲', r: 'Markov–P. Horváth, Harkány 1991', c: '11...Ng6 12.Rad1 Nh5 13.Bxe7 Qxe7 é um pouco melhor para as brancas.' }],
  ['c52', 'o-C', 'o', '(o) C', '11... b5 12 Bh4 a6 13 Bf2 Bb7 14 Kh1', { a: '⩲', r: 'Gelfand–Beliavsky, Belgrado 1991', c: '11...b5 12.Bh4 a6 13.Bf2 Bb7 14.Kh1 é um pouco melhor para as brancas.' }],
  ['c52', 'o-D', 'o', '(o) D', '11... Nh5 12 Bxe7 Rxe7 13 e4 dxe4 14 fxe4 Ne6 15 d5 Nc5 16 Rab1 Qb6', { a: '=', r: 'I. Sokolov–van der Sterren, Holanda 1995', c: '11...Nh5 12.Bxe7 Rxe7 13.e4 dxe4 14.fxe4 Ne6 15.d5 Nc5 é igual.' }],
  ['c52', 'p', 'p', '(p)', '12 Rae1 Rc8 13 Kh1 a6 14 a3 h6 15 Bh4 c5', { a: '=', r: 'Yrjölä–Pigusov, Helsinque 1992', c: '12.Rae1 Rc8 13.Kh1 a6 14.a3 h6 15.Bh4 c5 foi mais ou menos igual.' }],
  ['c52-p', '1', 'p', '(p) 13...N6d7', '13... N6d7 14 Bxe7', { a: '⩲', r: 'Kasparov–Andersson, Belfort 1988', c: '13...N6d7 14.Bxe7 é um pouco melhor para as brancas.' }],
  ['c52', 'q', 'q', '(q)', '12... Rc8 13 Rad1 Qa5 14 Bf2 N6d7 15 a3 f6 16 Ng3', { a: '⩲', r: 'Malaniuk–Nenashev, Tashkent 1987', c: '12...Rc8 13.Rad1 Qa5 14.Bf2 N6d7 15.a3 f6 16.Ng3 é um pouco melhor para as brancas.' }],
  ['c52', 'r', 'r', '(r)', '13... Bh4', { r: 'Sadler–Murugan, Londres 1993', c: '13...Rc8 é melhor que o fraco 13...Bh4, jogado em Sadler–Murugan.' }],
  // Coluna 53
  ['c53', 's', 's', '(s)', '12... N6d7 13 Bxe7 Qxe7 14 Nf4', { a: '⩲', r: 'Ruzele–van der Sterren, Manila 1992', c: '12...N6d7 13.Bxe7 Qxe7 14.Nf4 é um pouco melhor para as brancas.' }],
  ['c53-s', '1', 's', '(s) 13.Bf4', '13 Bf4 Rc8 14 a3 a5 15 Kh1 b5', { a: '⩲', r: 'Kamsky–van der Sterren, Wijk aan Zee 1994', c: '13.Bf4 Rc8 14.a3 a5 15.Kh1 b5 também é um pouco melhor para as brancas.' }],
  ['c53', 't', 't', '(t)', '13 Kh1 Ng6 14 a3 Qc7 15 Nf4 Bd7 16 Qf2 Rcd8 17 Rc1 Qd6 18 Nxg6 fxg6 19 Bf4 Qe6 20 Bc7 Rc8 21 Be5 Qf7 22 e4 Be6', { a: '=', r: 'Ivanchuk–Bruzón, Mérida 2006', c: '13.Kh1 Ng6 14.a3 Qc7 15.Nf4 Bd7 16.Qf2, e depois de 22.e4 Be6 as pretas estavam sólidas.' }],
  ['c53', 'u', 'u', '(u)', '14 dxc5 Rxc5 15 Nd4', { a: '⩲', r: 'Hansen', c: 'Depois de 14.dxc5 Rxc5 15.Nd4 as brancas ficam um pouco melhor (Hansen).' }],
  // Coluna 54
  ['c54', 'v-A', 'v', '(v) A', '11... Ng4 12 Bf4 Bd6 13 b4 Bxf4 14 Nxf4 Qd6 15 h3 g5 16 hxg4 gxf4 17 Qe2 Qh6', { a: '∞', r: 'Murugan', c: '11...Ng4 12.Bf4 Bd6 13.b4 Bxf4 14.Nxf4 Qd6 15.h3 g5 16.hxg4 gxf4 17.Qe2 Qh6 teria sido indefinido (Murugan).' }],
  ['c54-v-A', '1', 'v', '(v) A 12.Bxe7', '12 Bxe7 Qxe7 13 h3 Nf6 14 b4 Ne6', { a: '=', r: 'Murugan', c: '12.Bxe7 Qxe7 13.h3 Nf6 14.b4 Ne6 é igual, segundo Murugan.' }],
  ['c54-v-A', '2', 'v', '(v) A 14...g5', '14... g5', { r: 'Hodgson–Murugan, Inglaterra 1993', c: '14...g5? ocorreu em Hodgson–Murugan; 14...Qd6 era melhor.' }],
  ['c54', 'v-B', 'v', '(v) B', '11... Nh5 12 Bxe7 Qxe7 13 b4 a6 14 a4 Qg5 15 b5 Re6 16 bxa6 bxa6 17 Bf5 Rh6 18 Bxc8 Rxc8', { a: '=', r: 'Hodgson–Crouch, Dublin 1993', c: '11...Nh5 12.Bxe7 Qxe7 13.b4 a6 14.a4 Qg5 levou a uma posição em que as chances de ataque das pretas compensavam as fraquezas da estrutura.' }],
  ['c54', 'w', 'w', '(w)', '12 Bf4 Nd6 13 b4 Ng6 14 b5', { a: '⩲', r: 'Panno–Forestani, Mar del Plata 2003', c: 'O lance habitual é 12.Bf4, e 12...Nd6 13.b4 Ng6 14.b5 deu às brancas uma pequena vantagem.' }],
  ['c54', 'x', 'x', '(x)', '13 b4 a6 14 a4', { a: '⩲', r: 'Leko', c: 'Com 13.b4 a6 14.a4, como recomenda Leko, as brancas provavelmente ficam um pouco melhor.' }],
  ['c54', 'y-A', 'y', '(y) A', '14 d5 Qc5 15 b4 Qc4 16 Rfd1 cxd5 17 Rxd5 Bg4 18 Rd4 Qc6', { a: '∞', r: 'Leko', c: 'Depois de 14.d5 Qc5 15.b4 Qc4 16.Rfd1 cxd5 17.Rxd5 Bg4 18.Rd4 Qc6 a posição seria confusa (Leko).' }],
  ['c54-y-A', '1', 'y', '(y) A 14...cxd5', '14... cxd5 15 Nxd5 Qg5 16 Nc7 Bh3 17 Nf4', { a: '±', c: 'Não 14...cxd5 15.Nxd5 Qg5 16.Nc7 Bh3 17.Nf4, melhor para as brancas.' }],
  ['c54', 'y-B', 'y', '(y) B', '14 Ng3 f5 15 Rfd1 Be6 16 b4 a6 17 Na4 Qf7 18 a3 Nd7', { a: '=', r: 'Leko–Z. Almási, Hungria 1995', c: 'Leko–Z. Almási seguiu 14.Ng3 f5 15.Rfd1 Be6 16.b4 a6 17.Na4 Qf7 18.a3 Nd7, e as pretas igualaram.' }],
  ['c54-y-B', '1', 'y', '(y) B 17.a4', '17 a4', { c: '17.a4 era uma alternativa.' }],
]

const capitulo = {
  id: 'gdr-i',
  arquivo: 'gdr-i',
  nome: 'Gambito da Dama Recusado — Variante das Trocas (4.cxd5)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 415–417), colunas 49–54',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 415,
  grupos: [
    { id: 'nf3', nome: '6.Nf3', colunas: [49] },
    { id: 'qc2', nome: '6.Qc2 e 9.Nf3', colunas: [50, 51] },
    { id: 'nge2', nome: '6.Qc2 e 9.Nge2', colunas: [52, 53, 54] },
  ],
}

module.exports = { capitulo, colunas, notas }
