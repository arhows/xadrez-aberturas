// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Semi-Tarrasch, outras linhas (pp. 434–436), colunas 91–96.
// Gerar: node scripts/mco/gerar.cjs gdr-p
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-p-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// A letra (n) aparece duas vezes na coluna 94 (10...Bb4+ e 11...Qa5); a nota entrou só uma vez, em 10...Bb4+.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Nf3 c5 5 cxd5 Nxd5'
const E = `${B} 6 e3 Nc6 7 Bc4`
const K = `${B} 6 e4 Nxc3 7 bxc3 cxd4 8 cxd4 Nc6`

const colunas = {
  c91: [`${E} cxd4 8 exd4 Be7 9 O-O O-O 10 Re1 Bf6 11 Ne4 b6 12 a3 Bb7 13 Qd3 Nce7`, 'e3', '6.e3 Nc6 7.Bc4 cxd4', '=',
    'Com 6.e3 Nc6 7.Bc4 o bispo vai a c4 em vez de d3. Depois de 7...cxd4 8.exd4 Be7 9.O-O O-O as brancas ficam com o peão isolado; com 10.Re1 Bf6 11.Ne4 elas buscam o ataque, mas o jogo fica mais ou menos igual (Korchnoi–Oll, Groningen 1993).'],
  c92: [`${E} Nxc3 8 bxc3 Be7 9 O-O O-O 10 Bd3 cxd4 11 exd4 b6 12 Qc2 g6 13 Bh6 Re8`, 'e3', '7...Nxc3', '⩲',
    'Com 7...Nxc3 8.bxc3 as brancas ficam com o par de peões centrais c3 e d4. Depois de 10.Bd3 cxd4 11.exd4 b6 12.Qc2 g6 13.Bh6 elas atacam a ala do rei e ficam um pouco melhor (Eingorn–Alterman, Debrecen 1992).'],
  c93: [`${K} 9 Bc4 Bb4+ 10 Bd2 Bxd2+ 11 Qxd2 O-O 12 O-O b6 13 Rad1 Bb7`, 'e4', '6.e4 9.Bc4 Bb4+', '±',
    'Com 6.e4 Nxc3 7.bxc3 cxd4 8.cxd4 as brancas ficam com o centro de peões d4 e e4. Depois de 8...Nc6 9.Bc4 Bb4+ 10.Bd2 Bxd2+ 11.Qxd2 as pretas trocam peças, mas o centro branco dá a iniciativa e um ataque forte na ala do rei (Mecking–Guillén Ramírez, Ayamonte 2000).'],
  c94: [`${K} 9 Bc4 b5 10 Be2 Bb4+ 11 Bd2 Qa5 12 d5 exd5 13 exd5 Ne7`, 'e4', '9...b5 10.Be2', '⩲',
    'Com 9...b5 as pretas expulsam o bispo de c4. Depois de 10.Be2 Bb4+ 11.Bd2 Qa5 12.d5! exd5 13.exd5 as brancas ficam com um peão passado em d5 e uma pequena vantagem (Adorján–Faragó, Hungria 1993).'],
  c95: [`${K} 9 Bc4 b5 10 Bd3 Bb4+ 11 Bd2 Qa5 12 a3 Bxd2+ 13 Qxd2 Qxd2+`, 'e4', '10.Bd3', '⩲',
    'Com 10.Bd3 Bb4+ 11.Bd2 Qa5 12.a3 Bxd2+ 13.Qxd2 Qxd2+ as damas se trocam. No final as brancas ficam com a pequena vantagem posicional típica desta variante, graças ao centro de peões.'],
  c96: [`${K} 9 a3 Be7 10 Bd3 O-O 11 e5 b5 12 Be4 Bb7 13 Qd3 h6`, 'e4', '9.a3', '=',
    'Com 9.a3 as brancas impedem ...Bb4+. Depois de 9...Be7 10.Bd3 O-O 11.e5 as pretas respondem com 11...b5, uma abordagem recente (antes se jogava 11...f5); o jogo fica mais ou menos equilibrado (Bareev–Magem Badals, Madri 1994).'],
}

const notas = [
  // Coluna 91
  ['c91', 'a', 'a', '(a)', '5... exd5 6 Bg5', { c: '5...exd5 é considerado ruim por causa de 6.Bg5, que leva a posições desfavoráveis com o peão isolado.' }],
  ['c91', 'b', 'b', '(b)', '7... Be7 8 Bxd5 exd5 9 dxc5 Be6 10 O-O Bxc5 11 b3 O-O 12 Bb2 a6 13 Na4', { a: '⩲', r: 'Larsen–Tal, match 1969', c: '7...Be7 8.Bxd5 exd5 9.dxc5 Be6 10.O-O Bxc5 11.b3 O-O 12.Bb2 a6 13.Na4 é um pouco melhor para as brancas.' }],
  ['c91', 'c-A', 'c', '(c) A', '10... b6 11 Nxd5 exd5 12 Bb5 Bd7 13 Qa4', { a: '±', r: 'Botvinnik–Alekhine, AVRO 1938', c: '10...b6 11.Nxd5 exd5 12.Bb5 Bd7 13.Qa4 foi bom para as brancas.' }],
  ['c91', 'c-B', 'c', '(c) B', '10... Nxc3 11 bxc3 b6 12 Bd3 Bb7 13 Qe2 Na5 14 Ne5 Rc8', { a: '=', r: 'Larsen–Ribli, Las Palmas 1982', c: '10...Nxc3 11.bxc3 b6 12.Bd3 Bb7 13.Qe2 Na5 14.Ne5 Rc8 é igual.' }],
  ['c91', 'c-C', 'c', '(c) C', '10... Qd6 11 a3 Rd8 12 Nb5 Qb8 13 Qe2 a6 14 Nc3 Nf6 15 Be3 b5 16 Ba2 b4', { a: '=', r: 'Pintér–Rausis, Gonfreville 2006', c: '10...Qd6 11.a3 Rd8 12.Nb5 Qb8 13.Qe2 a6 14.Nc3 Nf6 é igual.' }],
  ['c91', 'd-A', 'd', '(d)', '14 Bd2 Ng6 15 Neg5 Nde7 16 Rad1', { a: '=', r: 'Korchnoi–Oll, Groningen 1993', c: 'Korchnoi–Oll seguiu 14.Bd2 Ng6 15.Neg5 Nde7; aqui 16.Rad1 teria sido mais ou menos igual.' }],
  ['c91-d-A', '1', 'd', '(d) 16.Rxe6', '16 Rxe6', { r: 'Korchnoi–Oll, Groningen 1993', c: 'Korchnoi jogou o duvidoso 16.Rxe6?!.' }],
  ['c91', 'd-B', 'd', '(d) 13...Re8', '13... Re8 14 Neg5 g6 15 h4', { a: '⩲', r: 'Serper–Kaidanov, Groningen 1993', c: '13...Re8 foi jogado em Serper–Kaidanov; depois 14.Neg5 g6 15.h4 teria dado chances de ataque às brancas.' }],
  // Coluna 92
  ['c92', 'e', 'e', '(e)', '10 e4 cxd4 11 cxd4 b6 12 Bb2 Bb7 13 Qe2 Rc8 14 Rac1 Qd6 15 d5 exd5 16 Bxd5 Qh6', { a: '=', r: 'F. Portisch–Grospeter, Zalakaros 2006', c: '10.e4 cxd4 11.cxd4 b6 12.Bb2 Bb7 13.Qe2 Rc8 14.Rac1 Qd6 15.d5 exd5 16.Bxd5 Qh6 é igual.' }],
  ['c92', 'f', 'f', '(f)', '10... b6 11 Bb2 Bb7 12 Qe2 Rc8 13 Rac1 cxd4 14 exd4 Bf6 15 Rfd1 Qd6', { a: '=', r: 'Hjartarson–Polugaevsky, Groningen 1993', c: '10...b6, sem trocar no centro, foi jogado em Hjartarson–Polugaevsky: depois de 11.Bb2 Bb7 12.Qe2 Rc8 13.Rac1 cxd4 14.exd4 Bf6 15.Rfd1 Qd6 a posição estava equilibrada. Groningen 1993 foi quase um torneio temático desta variante.' }],
  ['c92-f', '1', 'f', '(f) 14.cxd4', '14 cxd4 Nb4 15 Bc4 Rxc4 16 Qxc4 Ba6', { a: '=', r: 'Polugaevsky', c: 'Se 14.cxd4, 14...Nb4 15.Bc4 Rxc4 16.Qxc4 Ba6 igualaria (Polugaevsky).' }],
  ['c92', 'g', 'g', '(g)', '13 h4', { r: 'Eingorn', c: 'Eingorn sugere 13.h4, sem colocar o bispo em h6, como um esquema de ataque mais eficaz.' }],
  ['c92', 'h', 'h', '(h)', '14 h4 Bf8 15 Qd2 Bb7 16 Rfe1 Rc8 17 h5 Bxh6 18 Qxh6 Qf6 19 Ng5 Qg7 20 Qxg7+ Kxg7 21 h6+ Kg8', { a: '⩲', r: 'Eingorn–Alterman, Debrecen 1992', c: 'Depois de 14.h4 Bf8 15.Qd2 Bb7 16.Rfe1 Rc8 17.h5 Bxh6 18.Qxh6 Qf6 19.Ng5 Qg7 20.Qxg7+ Kxg7 21.h6+ Kg8 as brancas tinham vantagem no final.' }],
  ['c92-h', '1', 'h', '(h) 14...Bf6', '14... Bf6', { c: '14...Bf6 talvez seja melhor.' }],
  // Coluna 93
  ['c93', 'i-A', 'i', '(i) A', '7... Nd7 8 Rb1 Qc7 9 Bd3', { a: '⩲', r: 'Vaganian–Gavrikov, URSS 1972', c: 'Há outros lances aqui: 7...Nd7 8.Rb1 Qc7 9.Bd3 é um pouco melhor para as brancas.' }],
  ['c93', 'i-B', 'i', '(i) B', '7... Be7 8 Bc4 Qa5 9 Bd2 O-O 10 O-O b5 11 Bd3 Rd8 12 Qe2', { a: '⩲', r: 'Burgess–B.G. Christensen, Aarhus 1992', c: '7...Be7 8.Bc4 Qa5 9.Bd2 O-O 10.O-O b5 11.Bd3 Rd8 12.Qe2 deu chances de ataque às brancas.' }],
  ['c93', 'j-A', 'j', '(j) A', '8... Bb4+ 9 Bd2 Qa5 10 Rb1 Bxd2+ 11 Qxd2 Qxd2+ 12 Kxd2', { a: '±', r: 'Rubinstein–Schlechter, San Sebastián 1912', c: '8...Bb4+ 9.Bd2 costuma transpor. Se 9...Qa5 10.Rb1 Bxd2+ 11.Qxd2 Qxd2+ 12.Kxd2, as brancas ficam melhor.' }],
  ['c93-j-A', '1', 'j', '(j) A 10...Nc6', '10... Nc6 11 Rxb4', { a: '+−', c: '10...Nc6? 11.Rxb4.' }],
  ['c93', 'j-B', 'j', '(j) B', '8... Bb4+ 9 Bd2 Bxd2+ 10 Qxd2 O-O 11 Bc4 b6 12 d5 Ba6 13 Bxa6 Nxa6 14 d6 e5 15 O-O', { a: '±', r: 'Moskalenko–Djurić, Holguín 1989', c: 'Se as pretas evitam colocar o cavalo em c6, costumam se dar mal: 9...Bxd2+ 10.Qxd2 O-O 11.Bc4 b6 12.d5 Ba6 13.Bxa6 Nxa6 14.d6 é melhor para as brancas.' }],
  ['c93', 'k', 'k', '(k)', '12... Qd6 13 Rfd1 Rd8 14 Rac1 Bd7 15 e5 Qe7 16 Qf4', { a: '⩲', r: 'Petrosian–Korchnoi, Il Ciocco 1977', c: '12...Qd6 13.Rfd1 Rd8 14.Rac1 Bd7 15.e5 Qe7 16.Qf4 é um pouco melhor para as brancas.' }],
  ['c93', 'l-A', 'l', '(l) A', '13 d5 Na5 14 Be2 exd5 15 exd5 Bg4 16 Qb4 Bd7 17 Nd4', { a: '⩲', r: 'van der Vliet', c: '13.d5 é interessante: depois de 13...Na5 14.Be2 exd5 15.exd5 Bg4 16.Qb4, tanto 16...Bd7 17.Nd4 como 16...Bh5 17.Rad1 são bons para as brancas (van der Vliet).' }],
  ['c93-l-A', '1', 'l', '(l) A 16...Bh5', '16... Bh5 17 Rad1', { a: '⩲', r: 'van der Vliet', c: '16...Bh5 17.Rad1 também é bom para as brancas.' }],
  ['c93-l-A', '2', 'l', '(l) A 16.d6', '16 d6 Qf6 17 Rfd1 Rad8 18 Qd4 Rfe8', { a: '=', r: 'Karpov–Seirawan, Mônaco 1993', c: 'Em Karpov–Seirawan, 16.d6 Qf6 17.Rfd1 Rad8 18.Qd4 Rfe8 não deu nada às brancas.' }],
  ['c93', 'l-B', 'l', '(l) B', '13 Rfe1 Bb7 14 d5 exd5 15 Bxd5 Na5 16 Rad1 Bxd5 17 Qb4 Re8 18 Rxd5 Qe7', { a: '=', r: 'Karpov–Zaw, Bali 2000', c: '13.Rfe1 Bb7 14.d5 exd5 15.Bxd5 Na5 16.Rad1 Bxd5 17.Qb4 Re8 18.Rxd5 Qe7 é igual.' }],
  ['c93', 'm', 'm', '(m)', '14 Rfe1 Rc8 15 Qf4 Na5 16 Bd3 Nc4 17 Rc1 b5 18 d5 exd5 19 e5', { a: '±', r: 'Mecking–Guillén Ramírez, Ayamonte 2000', c: '14.Rfe1 Rc8 15.Qf4 Na5 16.Bd3 Nc4 17.Rc1 b5 18.d5 exd5 19.e5 levou a um forte ataque branco na ala do rei.' }],
  // Coluna 94
  ['c94', 'n', 'n', '(n)', '10... a6 11 O-O Be7 12 a4 b4 13 d5 Na5 14 Bf4 exd5 15 exd5 O-O 16 d6 Bf6 17 Rb1 Bc3', { a: '∞', r: 'van Wely–Ivanchuk, Melody Amber 1998', c: '10...a6 11.O-O Be7 12.a4 b4 13.d5 aparece de vez em quando; van Wely–Ivanchuk seguiu 13...Na5 14.Bf4 exd5 15.exd5 O-O 16.d6 Bf6 17.Rb1 Bc3, com chances para os dois lados.' }],
  ['c94', 'o-A', 'o', '(o) A', '12 Bxb4 Qxb4+ 13 Qd2 Bb7 14 a3 Qxd2+ 15 Kxd2 a6', { a: '=', r: 'Portisch–Pintér, Hungria 1984', c: '12.Bxb4 Qxb4+ 13.Qd2 Bb7 14.a3 Qxd2+ 15.Kxd2 a6 é igual.' }],
  ['c94', 'o-B', 'o', '(o) B', '12 a4 Bxd2+ 13 Qxd2 Qxd2+ 14 Kxd2 bxa4 15 Rxa4', { a: '⩲', r: 'Pogorelov–Franco, Ibercaja 1994', c: '12.a4 Bxd2+ 13.Qxd2 Qxd2+ 14.Kxd2 bxa4 15.Rxa4 é um pouco melhor para as brancas.' }],
  ['c94', 'p', 'p', '(p)', '14 O-O Bxd2 15 Nxd2 O-O 16 Nb3 Qd8 17 Bf3 Nf5 18 Qd3', { a: '⩲', r: 'Adorján–Faragó, Hungria 1993', c: 'Adorján–Faragó seguiu 14.O-O Bxd2 15.Nxd2 O-O 16.Nb3 Qd8 17.Bf3 Nf5 18.Qd3, um pouco melhor para as brancas.' }],
  ['c94-p', '1', 'p', '(p) 16...Qb6', '16... Qb6 17 d6 Nc6 18 d7', { a: '±', c: '16...Qb6 17.d6 Nc6 18.d7 é melhor para as brancas.' }],
  // Coluna 95
  ['c95', 'q', 'q', '(q)', '11... a6 12 Rc1 Bxd2+ 13 Qxd2 Bb7 14 O-O O-O', { a: '⩲', r: 'Browne–Pintér, Las Palmas 1982', c: '11...a6 12.Rc1 Bxd2+ 13.Qxd2 Bb7 14.O-O O-O é um pouco melhor para as brancas.' }],
  ['c95', 'r', 'r', '(r)', '12 d5 Ne7 13 Rb1 Bxd2+ 14 Qxd2 Qxd2+ 15 Kxd2 a6 16 dxe6 Bxe6 17 Nd4 Bxa2 18 Ra1 Rd8 19 Ke3', { a: '⩲', r: 'Tratar–Grosar, Bled 2002', c: '12.d5!? Ne7 13.Rb1 Bxd2+ 14.Qxd2 Qxd2+ 15.Kxd2 a6 16.dxe6 Bxe6 17.Nd4 Bxa2 18.Ra1 Rd8 19.Ke3 deu vantagem às brancas.' }],
  ['c95', 's-A', 's', '(s)', '14 Kxd2 a6 15 a4', { a: '⩲', c: 'Depois de 13...Qxd2+ 14.Kxd2 a6 15.a4 as brancas têm a pequena vantagem posicional típica desta variante.' }],
  ['c95', 's-B', 's', '(s) 13...a6', '13... a6 14 a4 b4 15 O-O O-O 16 d5', { a: '±', r: 'Zaitov–Gutop, Moscou 1992', c: 'Se 13...a6, 14.a4 b4 15.O-O O-O 16.d5 dá grande vantagem às brancas.' }],
  // Coluna 96
  ['c96', 't', 't', '(t)', '11... f5', { c: 'Uma abordagem recente. Antes se considerava necessário 11...f5 para defender a ala do rei.' }],
  ['c96', 'u', 'u', '(u)', '12 Qc2 Bb7 13 Bxh7+ Kh8 14 Be4 Nxd4 15 Nxd4 Qxd4 16 Bxb7 Qxe5+', { a: '∓', r: 'Magem Badals', c: '12.Qc2 Bb7 13.Bxh7+ Kh8 14.Be4 Nxd4 15.Nxd4 Qxd4 16.Bxb7 Qxe5+ se volta a favor das pretas (Magem Badals).' }],
  ['c96', 'v', 'v', '(v)', '14 Bd2 Qd7 15 O-O Rfd8', { a: '=', r: 'Bareev–Magem Badals, Madri 1994', c: 'Bareev–Magem Badals seguiu 14.Bd2 Qd7 15.O-O Rfd8, com posição mais ou menos equilibrada.' }],
]

const capitulo = {
  id: 'gdr-p',
  arquivo: 'gdr-p',
  nome: 'Gambito da Dama Recusado — Semi-Tarrasch, outras linhas',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 434–436), colunas 91–96',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 434,
  grupos: [
    { id: 'e3', nome: '6.e3 Nc6 7.Bc4', colunas: [91, 92] },
    { id: 'e4', nome: '6.e4 Nxc3 7.bxc3', colunas: [93, 94, 95, 96] },
  ],
}

module.exports = { capitulo, colunas, notas }
