// Transcrição do MCO 15ª ed. — Caro-Kann, Variante dos Dois Cavalos (pp. 191–192), colunas 49–54.
// Gerar: node scripts/mco/gerar.cjs caro-kann-f
// Formato: ver gambito-do-rei.cjs. Dicas em caro-kann-f-dicas.cjs.

const D3 = '1 e4 c6 2 Nc3 d5 3 Nf3'
const BG = `${D3} Bg4 4 h3 Bxf3 5 Qxf3`

const colunas = {
  c49: [`${BG} Nf6 6 d3 e6 7 Bd2 Nbd7 8 g4 Bb4 9 g5 Ng8 10 h4 d4 11 Nb1 Qb6`, 'bg4', '5...Nf6 6.d3 e6 7.Bd2', '=',
    'Variante dos Dois Cavalos: as brancas adiam d4 e desenvolvem os cavalos primeiro. Com 3...Bg4 as pretas trocam o bispo pelo cavalo de f3; as brancas ficam com o par de bispos e avançam os peões no flanco do rei, mas as pretas igualam.'],
  c50: [`${BG} Nf6 6 d3 e6 7 g3 Bb4 8 Bd2 d4 9 Nb1 Qb6 10 b3 a5 11 a3 Bxd2+`, 'bg4', '5...Nf6 6.d3 e6 7.g3', '=',
    'Com 7.g3 as brancas preparam o fianqueto; as pretas trocam o bispo de casas escuras e igualam.'],
  c51: [`${BG} e6 6 d4 dxe4 7 Nxe4 Nf6 8 Bd3 Qxd4 9 c3 Qd8 10 O-O Nbd7 11 Bf4 Nxe4`, 'bg4', '5...e6 6.d4!', '∞',
    'Com 6.d4! as brancas entregam o peão de d4 em troca de desenvolvimento rápido e iniciativa.'],
  c52: [`${D3} Bg4 4 h3 Bh5 5 exd5 cxd5 6 Bb5+ Nc6 7 g4 Bg6 8 Ne5 Rc8 9 d4 e6 10 Qe2 Bb4 11 h4 Ne7`, 'bg4', '4...Bh5', '=',
    'Com 4...Bh5 as pretas mantêm o bispo; as brancas o caçam com g4 e h4, mas as pretas igualam.'],
  c53: [`${D3} Nf6 4 e5 Ne4 5 Ne2 Bg4 6 Nfg1 Bxe2 7 Bxe2 e6 8 d3 Nc5 9 Nf3 Ncd7 10 O-O c5 11 c3 Nc6`, 'outras', '3...Nf6 4.e5', '⩲',
    'Com 3...Nf6 4.e5 o cavalo das pretas vai para e4; elas ficam com uma posição sólida, mas as brancas mantêm uma pequena vantagem com 12.d4 (Estrin–Kopylov, Moscou 1951).'],
  c54: [`${D3} dxe4 4 Nxe4 Nd7 5 Bc4 Ngf6 6 Neg5 e6 7 Qe2 Nd5 8 d4 h6 9 Ne4 Be7 10 O-O O-O 11 a4 a5`, 'outras', '3...dxe4 4.Nxe4 Nd7 5.Bc4', '⩲',
    'Com 3...dxe4 a posição lembra a linha principal com 4...Nd7. As brancas ficam um pouco melhor se jogarem pelo ataque, impedindo as rupturas de peões das pretas com c3, Re1 e Bd3 (Tseshkovsky–Dzindzichashvili, URSS 1972).'],
}

const notas = [
  // Coluna 49
  ['c49', 'a', 'a', '(a)', '7... Bb4 8 a3 Ba5 9 g4 d4 10 Nb1 c5 11 g5 Nfd7 12 Qg3 Nc6', { a: '=', r: 'Vallejo Pons–Bologan, Pamplona 2002', c: 'Também é bom 7...Bb4.' }],
  ['c49', 'b-A', 'b', '(b) A', '8... g6 9 Qg2 Bd6 10 f4 d4 11 Ne2 e5 12 fxe5 Bxe5 13 g5 Nh5 14 O-O-O', { a: '⩲', r: 'van der Wiel–van Mil, Campeonato Holandês 1991', c: 'Com 8...g6 as brancas ficam um pouco melhor.' }],
  ['c49', 'b-B', 'b', '(b) B', '8... h6 9 h4 Ne5 10 Qg3 Nexg4 11 e5 Bc5 12 Nd1 Qc7 13 f4', { a: '±', r: 'Timman–Miles, Amsterdã 1985', c: 'Com 8...h6 vem 9.h4!.' }],
  ['c49', 'c', 'c', '(c)', '9 a3 Ba5 10 g5 Ng8 11 h4 d4 12 Nb1 h6', { a: '=', c: 'Com 9.a3 também fica igual.' }],
  ['c49-c', '1', 'c', '(c) 10.O-O-O', '10 O-O-O O-O', { a: '=', c: 'Ou 10.O-O-O O-O, igual.' }],
  ['c49', 'd', 'd', '(d)', '12 b3 Qa5 13 a3 Bxd2+ 14 Nxd2 Qc3 15 Ra2', { a: '⩲', r: 'Suetin–Shamkovich, URSS 1972', c: 'Depois de 12.b3, 12...Qa5?! deixa as brancas um pouco melhor.' }],
  ['c49-d', '1', 'd', '(d) 12...Ne7', '12... Ne7 13 a3 Bxd2+ 14 Nxd2 Qc5', { a: '=', c: 'Em vez disso, 12...Ne7 dá chances iguais.' }],
  // Coluna 50
  ['c50', 'e', 'e', '(e)', '7 a3 Bc5 8 Be2 O-O 9 O-O Nbd7 10 Qg3 Bd4 11 Bh6 Ne8 12 Bg5 Ndf6', { a: '=', r: 'Fischer–Larsen, Zurique 1959', c: 'Com 7.a3 as pretas igualam.' }],
  ['c50', 'f', 'f', '(f)', '7... Nbd7 8 Bg2 Bc5 9 O-O O-O 10 Qe2 Bd4 11 Kh2 Bxc3 12 bxc3 dxe4 13 dxe4 Qa5', { a: '=', r: 'Smyslov–Flohr, Campeonato da URSS 1950', c: 'Também 7...Nbd7 iguala.' }],
  ['c50', 'g', 'g', '(g)', '10 Bg2 O-O 11 O-O Nbd7 12 Bc1 a5', { a: '=', r: 'Paragua–Bologan, Trípoli 2004', c: 'Com 10.Bg2 também fica igual; alguns jogadores gostam da formação das brancas.' }],
  ['c50', 'h', 'h', '(h)', '12 Nxd2 Nbd7 13 Bg2 Qc5 14 Qd1 h5', { a: '=', r: 'Fischer–Benko, Candidatos de Bled 1959', c: 'Depois de 12.Nxd2 fica igual.' }],
  // Coluna 51
  ['c51', 'i', 'i', '(i)', '6 d3 Qf6 7 Qe2 Bb4 8 Bd2 Nd7 9 a3 Ba5', { a: '=', r: 'Unzicker–Pomar, Olimpíada de Varna 1962', c: 'As brancas podem ir mais devagar com 6.d3, que transpõe para as colunas anteriores depois de 6...Nf6, ou seguir um caminho próprio depois de 6...Qf6.' }],
  ['c51', 'j', 'j', '(j)', '6... Nf6 7 Bd3 Qb6 8 O-O Qxd4 9 exd5 Nxd5 10 Rd1 Qf6 11 Qg3', { a: '∞', r: 'Balashov–Smagin, Campeonato Russo 1995', c: 'Com 6...Nf6 as brancas têm bom jogo pelo peão.' }],
  ['c51', 'k', 'k', '(k)', '8... Nxe4 9 Qxe4 Nd7 10 c3 Nf6 11 Qe2 Bd6 12 O-O', { a: '⩲', r: 'Short–Karpov, Mônaco 1993', c: 'Sem pegar o peão as brancas ficam um pouco melhor.' }],
  ['c51', 'l', 'l', '(l)', '12 Bxe4 Qb6 13 Qg3 Nf6 14 Bf3', { a: '∞', r: 'Nevednichy–Iordachescu, Memorial Ciocaltea 2001', c: 'A iniciativa das brancas vale o peão.' }],
  // Coluna 52
  ['c52', 'm', 'm', '(m)', '5 d4 e6 6 Bd3 Nf6 7 e5 Nfd7 8 g4 Bg6 9 Bxg6 hxg6 10 Ne2 c5 11 c3 Nc6 12 Kf1 Be7', { a: '=', r: 'Short–Khalifman, Mérida 2001', c: 'Com 5.d4 também fica igual.' }],
  ['c52-m', '1', 'm', '(m) 5...dxe4', '5... dxe4 6 Nxe4 Bxf3 7 Qxf3 Qxd4 8 Be3 Qxb2 9 Bc4', { c: 'Pegar os peões com 5...dxe4 é perigoso: 9.Bc4!.' }],
  ['c52', 'n', 'n', '(n)', '10 h4 f6 11 Nxg6 hxg6 12 Qd3 Kf7 13 a3 a6 14 Bxc6 Rxc6', { a: '⩱', r: 'Ljubojević–Salov, Linares 1991', c: 'Não vale a pena apressar as coisas: depois de 10.h4 as pretas ficam um pouco melhor.' }],
  ['c52-n', '1', 'n', '(n) 12.Bd3', '12 Bd3 f5', { c: 'Se 12.Bd3, 12...f5!.' }],
  ['c52', 'o', 'o', '(o)', '12 h5 Be4 13 f3 O-O 14 Nxc6 Nxc6 15 Be3 Qf6 16 fxe4 Nxd4 17 Bxd4 Qxd4 18 Rd1 Bxc3+ 19 bxc3 Qxc3+ 20 Kf1 dxe4 21 Qxe4 Qxc2 22 Qxc2 Rxc2 23 Rd7 Rxa2 24 Rxb7 Rb2', { a: '=', r: 'Lutz–Khenkin, Bundesliga 2000', c: 'Depois de 12.h5 Be4 13.f3 O-O! as pretas igualam.' }],
  // Coluna 53
  ['c53', 'p', 'p', '(p)', '5... Qb6 6 d4 c5 7 dxc5 Qxc5 8 Ned4 Nc6 9 Bb5 a6 10 Bxc6+ bxc6 11 O-O Qb6 12 e6 fxe6 13 Bf4 g6 14 Be5 Nf6 15 Ng5', { a: '⩲', r: 'Fischer–F. Olafsson, Candidatos de Bled 1959', c: 'Com 5...Qb6 as brancas ficam um pouco melhor.' }],
  ['c53-p', '1', 'p', '(p) 7...Nxc5', '7... Nxc5 8 Nf4 e6 9 Be2 Be7 10 O-O', { a: '⩲', c: 'Ou 7...Nxc5, também um pouco melhor para as brancas.' }],
  // Coluna 54
  ['c54', 'r-A', 'r', '(r) A', '4... Bg4 5 h3 Bxf3 6 Qxf3 e6 7 c3 Nf6 8 d4', { a: '⩲', c: 'Com 4...Bg4 as brancas ficam um pouco melhor.' }],
  ['c54', 'r-B', 'r', '(r) B', '4... Nf6 5 Nxf6+ gxf6 6 g3 Bg4 7 Bg2 Qd7 8 h3 Bf5 9 Nh4 Be6 10 d3 Na6 11 Be3 h5 12 Qd2 Bd5', { a: '=', r: 'van der Wiel–Miles, Bruxelas 1986', c: 'Com 4...Nf6 fica igual; em vez de 9.Nh4?!, um pouco melhor é 9.d3, pensando no roque grande.' }],
  ['c54', 's', 's', '(s)', '5 d4', { c: '5.d4 transpõe para a linha principal com 4...Nd7.' }],
  ['c54', 't', 't', '(t)', '7... Nb6 8 Ne5 Nxc4 9 Qxc4 Qd5 10 Qxd5 exd5 11 Ngxf7', { a: '±', c: 'Com 7...Nb6 vem 8.Ne5!, e as brancas ganham o peão de f7.' }],
]

const capitulo = {
  id: 'caro-kann-f',
  arquivo: 'caro-kann-f',
  nome: 'Caro-Kann — Variante dos Dois Cavalos',
  fonte: 'Modern Chess Openings — Caro-Kann Defense (pp. 191–192), colunas 49–54',
  base: '1. e4 c6 2. Nc3 d5 3. Nf3',
  corPadrao: 'b',
  ordem: 191,
  grupos: [
    { id: 'bg4', nome: '3...Bg4', colunas: [49, 50, 51, 52] },
    { id: 'outras', nome: '3...Nf6 e 3...dxe4', colunas: [53, 54] },
  ],
}

module.exports = { capitulo, colunas, notas }
