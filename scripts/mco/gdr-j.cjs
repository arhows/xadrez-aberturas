// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante das Trocas (pp. 418–419), colunas 55–60.
// Gerar: node scripts/mco/gerar.cjs gdr-j
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-j-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// A nota (o) não traz lances ("a posição é desequilibrada, mas mais ou menos igual"); o comentário entrou no resumo da coluna 57.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 cxd5 exd5'
const N = `${B} 5 Nf3 c6 6 Bf4 Nbd7 7 Qc2`

const colunas = {
  c55: [`${B} 5 Bg5 c6 6 Qc2 Na6 7 e3 Nb4 8 Qd2 Bf5 9 Rc1 a5 10 a3 Na6 11 Nge2 h6 12 Bf4 Bd6`, 'bg5', '5.Bg5 c6 6.Qc2 Na6', '=',
    'Contra 5.Bg5 c6 6.Qc2 as pretas jogam 6...Na6, ameaçando ...Nb4 contra a dama. Depois de 7.e3 Nb4 8.Qd2 Bf5 elas desenvolvem o bispo de c8 fora da cadeia de peões, e o jogo fica mais ou menos igual (Barsov–Se. Ivanov, Alemanha 1994).'],
  c56: [`${B} 5 Bg5 c6 6 e3 Bf5 7 Qf3 Bg6 8 Bxf6 Qxf6 9 Qxf6 gxf6 10 Kd2 Nd7 11 Bd3 a5 12 Nf3 Nb6`, 'bg5', '6.e3 Bf5 7.Qf3', '=',
    'Com 6.e3 Bf5 as pretas desenvolvem o bispo antes que as brancas impeçam. Com 7.Qf3 as brancas forçam a troca das damas; o final com os peões dobrados em f6 é mais ou menos igual (Ivanchuk–Short, Linares 1992).'],
  c57: [`${B} 5 Nf3 c6 6 Bg5 h6 7 Bh4 Bf5 8 Qb3 g5 9 Bg3 Qb6 10 e3 Na6 11 Be5 Be7 12 Qxb6 axb6`, 'nf3', '5.Nf3 c6 6.Bg5 h6', '=',
    'Com 5.Nf3 as brancas adiam a decisão sobre o bispo. Depois de 6.Bg5 h6 7.Bh4 Bf5 8.Qb3 g5 9.Bg3 Qb6 as pretas oferecem a troca das damas; a posição é desequilibrada, mas mais ou menos igual (Beliavsky–Shirov, Biel 1992).'],
  c58: [`${N} Nb6 8 e3 Bg4 9 Ne5 Bh5 10 h3 Bd6 11 g4 Bg6 12 Qb3 Qe7`, 'nf3', '6.Bf4 Nbd7 7.Qc2 Nb6', '=',
    'Com 6.Bf4 o bispo fica fora da cadeia de peões. Depois de 6...Nbd7 7.Qc2 Nb6 8.e3 Bg4 9.Ne5 as brancas ganham espaço na ala do rei, mas as pretas mantêm o equilíbrio (Kir. Georgiev–Smagin, Iugoslávia 1995).'],
  c59: [`${N} Nh5 8 Bg3 g6 9 e3 Nxg3 10 hxg3 Bd6 11 Bd3 Nf6 12 O-O-O Be6`, 'nf3', '7...Nh5', '=',
    'Com 7...Nh5 as pretas trocam o bispo de f4. Depois de 8.Bg3 g6 9.e3 Nxg3 10.hxg3 Bd6 as brancas ficam com a coluna h semiaberta e rocam grande; o jogo é mais ou menos igual (Piket–Seirawan, Amsterdã 1995).'],
  c60: [`${B} 5 Bf4 Be7 6 Qc2 c5 7 dxc5 d4 8 O-O-O Qa5 9 Qa4+ Qxa4 10 Nxa4 Ne4 11 Bg3 Nc6 12 Nf3 Nxc5`, 'bf4', '5.Bf4 Be7 6.Qc2 c5', '∓',
    'Com 5.Bf4 Be7 6.Qc2 c5 7.dxc5 d4 as pretas sacrificam um peão para atacar o cavalo de c3 e o rei branco. Depois de 8.O-O-O Qa5 as brancas trocam as damas, mas as pretas recuperam o peão e ficam com a iniciativa (Ilinčić–Zd. Vuković, Iugoslávia 1995).'],
}

const notas = [
  // Coluna 55
  ['c55', 'a', 'a', '(a)', '4... Nxd5 5 e4 Nxc3 6 bxc3 c5 7 a3 Be7 8 Nf3 O-O 9 Bd3 cxd4 10 cxd4 Nc6', { a: '⩲', r: 'Bareev–Hráček, Pardubice 1994', c: '4...Nxd5 é possível. Depois de 5.e4 Nxc3 6.bxc3 c5, numa posição parecida com a Semi-Tarrasch, as brancas talvez fiquem um pouco melhor.' }],
  ['c55-a', '1', 'a', '(a) 9...Nc6', '9... Nc6', { c: '9...Nc6 é mais comum.' }],
  ['c55', 'b', 'b', '(b)', '7 a3 Nc7 8 e3 Ne6 9 Bh4 Be7 10 Bd3 g6', { a: '⩲', r: 'Vaganian–Westerinen, Moscou 1982', c: '7.a3 é a alternativa: depois de 7...Nc7 8.e3 Ne6 9.Bh4 Be7 10.Bd3 g6 as brancas ficaram um pouco melhor.' }],
  ['c55', 'c', 'c', '(c)', '7... Nc7 8 Bd3 Be7 9 Nge2 Nh5 10 Bxe7 Qxe7 11 O-O-O g6 12 Kb1 Ng7 13 Ng3 O-O 14 h4 h5 15 Qd2', { a: '⩲', r: 'Dohosian–Vaganian, Tilburg 1994', c: '7...Nc7 8.Bd3 Be7 9.Nge2 Nh5 10.Bxe7 Qxe7 11.O-O-O é um pouco melhor para as brancas.' }],
  ['c55', 'd-A', 'd', '(d) A', '8 Qd1 Bf5 9 Rc1 Qa5 10 Bxf6 gxf6 11 Qd2 Nxa2 12 Ra1 Nxc3 13 Rxa5 Ne4 14 Rxd5', { a: '∞', r: 'Ehlvest–Short, Manila 1992', c: '8.Qd1 Bf5 9.Rc1 Qa5 10.Bxf6 gxf6 11.Qd2 Nxa2 12.Ra1 Nxc3 13.Rxa5 Ne4 14.Rxd5 foi indefinido.' }],
  ['c55-d-A', '1', 'd', '(d) A 10...Nxa2', '10... Nxa2 11 Bh4 Bb4 12 Qd2 Nxc1 13 Qxc1', { a: '∞', r: 'Ehlvest', c: '10...Nxa2 11.Bh4 Bb4 12.Qd2 Nxc1 13.Qxc1 é indefinido (Ehlvest).' }],
  ['c55', 'd-B', 'd', '(d) B', '8 Qb1 h6 9 Bh4 g6 10 Qd1 Bf5 11 Rc1 g5 12 Bg3 Qa5 13 Qf3', { a: '⩲', c: '8.Qb1 h6 9.Bh4 g6 10.Qd1 Bf5 11.Rc1 g5 12.Bg3 Qa5 13.Qf3 é um pouco melhor para as brancas.' }],
  ['c55-d-B', '1', 'd', '(d) B 8...g6', '8... g6 9 Qd1 a5 10 a3 Na6 11 Bd3', { a: '⩲', r: 'Dohosian–Vaganian, Tilburg 1994', c: 'Não 8...g6 9.Qd1 a5 10.a3 Na6 11.Bd3, um pouco melhor para as brancas.' }],
  ['c55', 'e', 'e', '(e)', '11 Bxa6 Rxa6 12 Nge2 Be7', { a: '=', r: 'Züger–King, Berna 1988', c: '11.Bxa6 Rxa6 12.Nge2 Be7 é igual.' }],
  ['c55', 'f', 'f', '(f)', '13 Ng3 Bh7 14 Bxd6 Qxd6', { a: '=', r: 'Barsov–Se. Ivanov, Alemanha 1994', c: 'Barsov–Se. Ivanov seguiu 13.Ng3 Bh7 14.Bxd6 Qxd6, com chances mais ou menos iguais.' }],
  // Coluna 56
  ['c56', 'g', 'g', '(g)', '6... Qb6 7 Qc2 Ne4 8 Bf4 Bf5 9 Bd3 Na6 10 a3 Qa5 11 Rc1 Nxc3 12 Qxc3 Qxc3+ 13 Rxc3 Bxd3 14 Rxd3 O-O-O', { a: '=', r: 'Kelly–Baburin, Bunratty 2005', c: '6...Qb6 7.Qc2 Ne4 8.Bf4 Bf5 9.Bd3 Na6 leva a um final igual.' }],
  ['c56', 'h', 'h', '(h)', '8... gxf6 9 Qd1 Qb6 10 Qd2 Na6', { a: '⩲', r: 'Petrosian–Barcza, Budapeste 1953', c: '8...gxf6 9.Qd1 Qb6 10.Qd2 Na6 é um pouco melhor para as brancas.' }],
  ['c56', 'i', 'i', '(i)', '10 Nf3 Nd7 11 Nh4 Bb4 12 Rc1 Nb6 13 a3 Bxc3+ 14 Rxc3 Nc8 15 f3 Nd6 16 g3 a5 17 b3 a4 18 b4', { a: '⩲', r: 'Carlsen–Azmaiparashvili, Khanty-Mansiysk 2005', c: 'As brancas se deram bem recentemente com 10.Nf3: em Carlsen–Azmaiparashvili, 10...Nd7 11.Nh4 Bb4 12.Rc1 deu vantagem às brancas.' }],
  ['c56', 'j', 'j', '(j)', '11 h4 Nb6 12 h5 Bf5', { a: '=', r: 'Vaiser–Ruban, Novosibirsk 1993', c: '11.h4 Nb6 12.h5 Bf5 é igual.' }],
  ['c56', 'k', 'k', '(k)', '13 b3 Kd7 14 Ne1 Bb4 15 Nc2 Bxc3+ 16 Kxc3 Nc8', { a: '=', r: 'Ivanchuk–Short, Linares 1992', c: '13.b3 Kd7 14.Ne1 Bb4 15.Nc2 Bxc3+ 16.Kxc3 Nc8 foi mais ou menos igual.' }],
  // Coluna 57
  ['c57', 'l', 'l', '(l)', '8 e3 Nbd7 9 Bd3 Bxd3 10 Qxd3 Bd6 11 O-O O-O', { a: '=', r: 'Itkis–Pelletier, Kuşadası 2006', c: '8.e3 Nbd7 9.Bd3 Bxd3 10.Qxd3 Bd6 11.O-O O-O é igual.' }],
  ['c57', 'm', 'm', '(m)', '9 Qxb7 gxh4 10 Qxa8 Qb6', { a: '−+', c: '9.Qxb7? gxh4 10.Qxa8 Qb6 perde para as brancas: a dama fica presa.' }],
  ['c57', 'n', 'n', '(n)', '10 Nd2 Nbd7 11 e3 Qxb3 12 Nxb3 Ne4 13 Nxe4 Bxe4 14 Nd2 Bg6 15 h4 Rg8', { a: '=', r: 'Vallejo Pons–Shirov, Melody Amber 2004', c: '10.Nd2 Nbd7 11.e3 Qxb3 12.Nxb3 Ne4 é igual.' }],
  // Coluna 58
  ['c58', 'p', 'p', '(p)', '7... Bb4 8 e3 Nh5 9 Bg5 Be7 10 Bxe7 Qxe7 11 O-O-O Nb6 12 h3', { a: '⩲', r: 'Epishin–Ivanchuk, Tilburg 1992', c: '7...Bb4 8.e3 Nh5 9.Bg5 Be7 10.Bxe7 Qxe7 11.O-O-O é um pouco melhor para as brancas.' }],
  ['c58', 'q', 'q', '(q)', '8 h3 Bd6 9 Bxd6 Qxd6 10 e3 Qe7 11 Bd3', { r: 'Epishin–Smagin, Rússia 1995', c: '8.h3 Bd6 9.Bxd6 Qxd6 10.e3 Qe7 11.Bd3 foi Epishin–Smagin.' }],
  ['c58-q', '1', 'q', '(q) 11...Nc4', '11... Nc4 12 Bxc4 dxc4 13 O-O O-O 14 e4 b5 15 Rfe1', { a: '±', r: 'Epishin–Smagin, Rússia 1995', c: '11...Nc4 12.Bxc4 dxc4 13.O-O O-O 14.e4 b5 15.Rfe1 levou a uma posição muito superior para as brancas.' }],
  ['c58-q', '2', 'q', '(q) 11...Be6', '11... Be6', { a: '=', r: 'Smagin', c: 'Smagin sugere 11...Be6, com a ideia ...Nc8–d6, como suficiente para igualar.' }],
  ['c58', 'r', 'r', '(r)', '9 Bd3 Bxf3 10 gxf3 Bd6 11 Bg5 Be7 12 Bh4 g6 13 O-O-O', { a: '⩲', r: 'Dreev–I. Sokolov, Neum 2000', c: '9.Bd3 Bxf3 10.gxf3 Bd6 11.Bg5 Be7 12.Bh4 g6 13.O-O-O é um pouco melhor para as brancas.' }],
  ['c58', 's', 's', '(s)', '10... Bg6 11 Qb3 a5 12 a3 a4 13 Qd1 Ne4 14 Be2 Bd6 15 Nxg6 hxg6 16 Nxe4 dxe4 17 Qc2 f5 18 Bxd6 Qxd6 19 b4', { a: '⩲', r: 'Kir. Georgiev–Piket, Moscou 1994', c: '10...Bg6 11.Qb3 a5 12.a3 a4 13.Qd1 Ne4 foi Kir. Georgiev–Piket; depois de 18...Qxd6, 19.b4! teria sido um pouco melhor para as brancas.' }],
  ['c58', 't', 't', '(t)', '13 Be2 Nfd7 14 Nd3 a5 15 Bxd6 Qxd6', { a: '=', r: 'Kir. Georgiev–Smagin, Iugoslávia 1995', c: '13.Be2 Nfd7 14.Nd3 a5 15.Bxd6 Qxd6 foi mais ou menos igual.' }],
  // Coluna 59
  ['c59', 'u', 'u', '(u)', '8 Bg5 Be7 9 Bxe7 Qxe7 10 e3 Nb6 11 O-O-O g6 12 Bd3 Bg4 13 h3 Bxf3 14 gxf3 O-O-O', { a: '=', c: '8.Bg5 Be7 9.Bxe7 Qxe7 10.e3 Nb6 11.O-O-O g6 é igual.' }],
  ['c59', 'v', 'v', '(v)', '13 Kb1 Qe7 14 Ka1 O-O-O 15 Rc1 Kb8', { a: '=', r: 'Piket–Seirawan, Amsterdã 1995', c: 'Piket–Seirawan seguiu 13.Kb1 Qe7 14.Ka1 O-O-O 15.Rc1 Kb8, mais ou menos igual.' }],
  ['c59-v', '1', 'v', '(v) 15.Rb1', '15 Rb1', { r: 'Seirawan', c: 'Seirawan sugere 15.Rb1, com a ideia Rhc1 e b4.' }],
  // Coluna 60
  ['c60', 'w', 'w', '(w)', '6... O-O 7 e3 c5 8 dxc5 Bxc5 9 Nf3 Nc6 10 Be2 d4 11 exd4 Nxd4 12 Nxd4 Qxd4', { a: '=', r: 'Karpov–Kasparov, Moscou 1985', c: '6...O-O 7.e3 c5 8.dxc5 Bxc5 9.Nf3 Nc6 10.Be2 d4 11.exd4 Nxd4 12.Nxd4 Qxd4 é igual.' }],
  ['c60-w', '1', 'w', '(w) 10.Bb5', '10 Bb5 d4 11 Bxc6 dxc3 12 Qxc3 Qe7', { a: '−+', c: 'Não 10.Bb5 d4 11.Bxc6 dxc3 12.Qxc3 Qe7, que ganha para as pretas.' }],
  ['c60', 'x-A', 'x', '(x) A', '8 Rd1', { c: '8.Rd1 deixaria o rei vulnerável no centro.' }],
  ['c60', 'x-B', 'x', '(x) B', '8 Qa4+ Nc6 9 Nb5 O-O 10 Bc7 Qd7 11 Bd6 Ne4', { a: '∓', r: 'Zd. Vuković', c: '8.Qa4+ Nc6 9.Nb5 O-O 10.Bc7 Qd7 11.Bd6 Ne4 dá a iniciativa às pretas (Zd. Vuković).' }],
  ['c60', 'y', 'y', '(y)', '9 Rxd4 Nc6', { a: '∓', c: '9.Rxd4 Nc6 deixa as pretas com um ataque forte; as brancas preferem trocar as damas, mas a iniciativa preta continua.' }],
  ['c60', 'z-A', 'z', '(z)', '13 Nxc5 Bxc5 14 Ne5 Nxe5 15 Bxe5 Bf5 16 g4 Bg6 17 Bg2 Rc8', { a: '−+', r: 'Ilinčić–Zd. Vuković, Iugoslávia 1995', c: 'Ilinčić–Zd. Vuković seguiu 13.Nxc5 Bxc5 14.Ne5 Nxe5 15.Bxe5 Bf5 16.g4 Bg6 17.Bg2? Rc8, e as pretas ficaram com vantagem decisiva.' }],
  ['c60-z-A', '1', 'z', '(z) 17.Rd2', '17 Rd2', { c: '17.Rd2 era melhor.' }],
  ['c60', 'z-B', 'z', '(z) 12...h5', '12... h5 13 Nd2 Nxd2 14 Rxd2 Bg5 15 f4 Bf6', { a: '∓', c: '12...h5 13.Nd2 Nxd2 14.Rxd2 Bg5 15.f4 Bf6 teria sido claramente vantajoso para as pretas.' }],
]

const capitulo = {
  id: 'gdr-j',
  arquivo: 'gdr-j',
  nome: 'Gambito da Dama Recusado — Variante das Trocas, outras linhas',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 418–419), colunas 55–60',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 418,
  grupos: [
    { id: 'bg5', nome: '5.Bg5 c6', colunas: [55, 56] },
    { id: 'nf3', nome: '5.Nf3 c6', colunas: [57, 58, 59] },
    { id: 'bf4', nome: '5.Bf4', colunas: [60] },
  ],
}

module.exports = { capitulo, colunas, notas }
