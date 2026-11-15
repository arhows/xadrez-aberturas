// Transcrição do MCO 15ª ed. — Eslava, 5.a4 Bf5: 6.Ne5 e 6.e3 (pp. 484–485), colunas 61–66.
// Gerar: node scripts/mco/gerar.cjs eslava-k
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-k-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Na nota (o) o livro traz 17...Ne4, ambíguo; é 17...Nce4 (descobre a torre contra a dama). Faltavam também capturas: nota (c) 13.Bxc4 e (c) 11.Bxc4.
// A nota (k) não tem lances (a escolha entre 8...O-O e 8...Nbd7); o comentário foi para o resumo da coluna 64.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 dxc4 5 a4 Bf5'
const F = `${B} 6 Ne5 e6 7 f3 Bb4`
const E = `${B} 6 e3 e6 7 Bxc4 Bb4 8 O-O`

const colunas = {
  c61: [`${F} 8 e4 Bxe4 9 fxe4 Nxe4 10 Bd2 Qxd4 11 Nxe4 Qxe4+`, 'ne5', '6.Ne5 e6 7.f3 Bb4 8.e4', '=',
    'Com 5.a4 Bf5 as pretas desenvolvem o bispo antes de ...e6. Com 6.Ne5 e6 7.f3 Bb4 8.e4 Bxe4! 9.fxe4 Nxe4 elas dão o bispo por dois peões e ataque; depois de 10.Bd2 Qxd4 11.Nxe4 Qxe4+ o jogo é igual (Kramnik–Ivanchuk, Linares 1994).'],
  c62: [`${F} 8 Nxc4 O-O 9 Bg5 h6 10 Bh4 c5 11 dxc5 Qxd1+`, 'ne5', '8.Nxc4', '∓',
    'Com 8.Nxc4 O-O 9.Bg5 h6 10.Bh4 c5 11.dxc5 Qxd1+ as damas saem cedo, e as pretas ficam com o jogo mais fácil (Akopian–Oll, Nova York 1994).'],
  c63: [`${F} 8 Bg5 h6 9 Bh4 c5 10 dxc5 Qxd1+ 11 Kxd1 Nbd7`, 'ne5', '8.Bg5', '∞',
    'Com 8.Bg5 h6 9.Bh4 c5 10.dxc5 Qxd1+ 11.Kxd1 Nbd7 as pretas trocam as damas e têm contrajogo pelo peão (Pétursson–Hector, Malmö 1993).'],
  c64: [`${E} Nbd7 9 Qe2 O-O 10 e4 Bg6 11 Bd3 Bh5`, 'e3', '6.e3 8...Nbd7 9.Qe2', '=',
    'Com 6.e3 e6 7.Bxc4 Bb4 8.O-O as pretas escolhem entre 8...Nbd7 e 8...O-O: o primeiro prepara melhor a resposta a 9.Nh4, o segundo a 9.Qb3. Depois de 8...Nbd7 9.Qe2 O-O 10.e4 Bg6 11.Bd3 Bh5 o jogo é igual (Gelfand–Miton, Sochi 2007).'],
  c65: [`${E} Nbd7 9 Nh4 Bg4 10 f3 Bh5 11 g4 Nd5`, 'e3', '9.Nh4', '∞',
    'Com 9.Nh4 Bg4 10.f3 Bh5 11.g4 Nd5 as brancas ganham espaço na ala do rei, mas o bispo preto fica vivo; a posição é complicada, com chances para os dois lados (Tukmakov–Ehlvest, Kuibyshev 1986).'],
  c66: [`${E} O-O 9 Nh4 Nbd7 10 Nxf5 exf5 11 Qc2 g6`, 'e3', '8...O-O 9.Nh4', '∞',
    'Com 8...O-O 9.Nh4 Nbd7 10.Nxf5 exf5 11.Qc2 g6 as brancas ficam com o par de bispos, e as pretas com um peão em f5 que controla e4 (Onischuk–Shirov, Rússia 2006).'],
}

const notas = [
  // Coluna 61
  ['c61', 'a-A', 'a', '(a) A', '6... Nbd7 7 Nxc4 Nb6 8 Ne5 a5 9 e3 h6 10 Bd3 Bxd3 11 Nxd3 Nbd5 12 Qb3 Qb6 13 Qxb6 Nxb6', { a: '=', r: 'Topalov–Gelfand, Melody Amber 2005', c: 'Uma alternativa nova é 6...Nbd7 7.Nxc4 Nb6!? 8.Ne5 a5; então 9.e3 h6 10.Bd3 Bxd3 11.Nxd3 Nbd5 12.Qb3 Qb6 13.Qxb6 Nxb6 é igual.' }],
  ['c61', 'a-B', 'a', '(a) B', '6... Nbd7 7 Nxc4 Nb6 8 Ne5 a5 9 g3 e6 10 Bg2 Bb4 11 O-O O-O 12 Bg5 h6 13 Bxf6 Qxf6 14 Na2 Bd6 15 Qb3 Qd8 16 e4 Bh7 17 Rfd1 Rb8', { a: '=', r: 'Vaganian–Handke, Dresden 2007', c: 'Mais testado é 9.g3 e6 10.Bg2 Bb4 11.O-O O-O 12.Bg5 h6 13.Bxf6 Qxf6 14.Na2 Bd6 15.Qb3 Qd8 16.e4 Bh7 17.Rfd1 Rb8, com chances iguais.' }],
  ['c61-a-B', '1', 'a', '(a) 9...Nfd7', '9... Nfd7 10 Nxd7 Qxd7 11 e4 Bh3 12 Bxh3 Qxh3 13 Qb3 Ra6 14 Bf4 e6 15 Be5', { a: '±', r: 'Aronian–Carlsen, match de Candidatos 2007', c: '9...Nfd7 10.Nxd7 Qxd7 11.e4 Bh3 12.Bxh3 Qxh3 13.Qb3 Ra6 14.Bf4 e6 15.Be5 é melhor para as brancas.' }],
  ['c61', 'b', 'b', '(b)', '7 g3 Bb4 8 Bg2 Be4 9 f3 Bg6 10 O-O c5 11 Na2 Ba5 12 dxc5 Qd5', { a: '=', r: 'I. Sokolov–Bareev, León 1995', c: '7.g3 Bb4 8.Bg2 Be4! 9.f3 Bg6 10.O-O c5 11.Na2 Ba5 12.dxc5 Qd5 é igual.' }],
  ['c61', 'c', 'c', '(c)', '7... c5 8 e4 Bg6 9 Be3 cxd4 10 Qxd4 Qxd4 11 Bxd4 Nfd7 12 Nxd7 Nxd7 13 Bxc4 Rc8 14 Ba2 a5 15 h4 h5', { a: '=', r: 'Ponomariov–Rublevsky, match de Candidatos 2007', c: '7...c5 8.e4 Bg6 9.Be3 cxd4 10.Qxd4 Qxd4 11.Bxd4 Nfd7 12.Nxd7 Nxd7 13.Bxc4 Rc8 14.Ba2 a5 15.h4 h5 é igual.' }],
  ['c61-c', '1', 'c', '(c) 8...cxd4', '8... cxd4 9 exf5 Bb4 10 fxe6 fxe6 11 Bxc4 dxc3 12 Qxd8+ Kxd8 13 Ke2 cxb2 14 Bxb2 Ke7 15 Nd3 Rc8 16 Rac1', { a: '∞', r: 'P. H. Nielsen–Baramidze, Dresden 2007', c: 'Se 8...cxd4 9.exf5 Bb4 10.fxe6 fxe6 11.Bxc4 dxc3 12.Qxd8+ Kxd8 13.Ke2 cxb2 14.Bxb2 Ke7 15.Nd3 Rc8 16.Rac1, as brancas têm algum jogo pelo peão.' }],
  ['c61', 'd', 'd', '(d)', '10 Qf3 Qxd4 11 Qxf7+ Kd8 12 Bg5+ Nxg5 13 Qxg7 Bxc3+ 14 bxc3 Qxc3+ 15 Ke2 Qc2+ 16 Ke1 Qc3+', { a: '=', c: '10.Qf3 Qxd4 11.Qxf7+ Kd8 12.Bg5+ Nxg5 13.Qxg7 Bxc3+ 14.bxc3 Qxc3+ 15.Ke2 Qc2+ 16.Ke1 Qc3+ é empate por xeque perpétuo.' }],
  ['c61', 'e', 'e', '(e)', '12 Qe2 Bxd2+ 13 Kxd2 Qd5+ 14 Kc2 Na6 15 Nxc4 O-O-O 16 Qe5 f6 17 Qe3 Kb8 18 Be2 e5', { a: '=', r: 'Kramnik–Ivanchuk, Linares 1994', c: '12.Qe2 Bxd2+ 13.Kxd2 Qd5+ 14.Kc2 Na6 15.Nxc4 O-O-O 16.Qe5 f6 17.Qe3 Kb8 18.Be2 e5 é igual.' }],
  // Coluna 62
  ['c62', 'f', 'f', '(f)', '12 Kxd1 Rd8+ 13 Kc1 Nc6 14 e4 Bh7 15 Bf2 Nd7 16 Bd3 Bxc5', { a: '∓', r: 'Akopian–Oll, Nova York 1994', c: '12.Kxd1 Rd8+ 13.Kc1 Nc6 14.e4 Bh7 15.Bf2 Nd7 16.Bd3 Bxc5 é melhor para as pretas.' }],
  ['c62-f', '1', 'f', '(f) 12.Rxd1', '12 Rxd1 Bc2 13 Rc1 Bxa4 14 Bxf6 gxf6 15 Ra1 Bb3 16 Nb6 Nc6 17 Nxa8 Rxa8 18 e3 Bxc5', { a: '∓', r: 'Bareev–Ehlvest, URSS 1986', c: '12.Rxd1 Bc2 13.Rc1 Bxa4 14.Bxf6 gxf6 15.Ra1 Bb3 16.Nb6 Nc6 17.Nxa8 Rxa8 18.e3 Bxc5: o peão a mais, os dois bispos e o desenvolvimento harmonioso compensam com folga a qualidade.' }],
  ['c62', 'g', 'g', '(g)', '8 h4 c5 9 dxc5 Qa5 10 Qd4 Bxc5 11 Qxc4 O-O 12 e4 Bd6 13 Nd3 Bg3+ 14 Kd1 Bg6', { a: '∓', r: 'Kelečević–Pelletier, Biel 1996', c: '8.h4 c5 9.dxc5 Qa5 10.Qd4 Bxc5 11.Qxc4 O-O 12.e4 Bd6 13.Nd3 Bg3+ 14.Kd1 Bg6 é melhor para as pretas.' }],
  // Coluna 63
  ['c63', 'h', 'h', '(h)', '10... Qa5 11 Qd4 Nc6 12 Nxc6 bxc6 13 e4 Bxc5 14 Qxc4 Bg6', { a: '=', r: 'Adianto–Kramnik, Londres (rápido) 1994', c: 'Também é bom 10...Qa5 11.Qd4 Nc6 12.Nxc6 bxc6 13.e4 Bxc5! 14.Qxc4 Bg6, sem problemas para as pretas.' }],
  ['c63', 'i', 'i', '(i)', '11 Rxd1 Bc2 12 Rd4 Nc6 13 Rxc4 a5 14 Nxc6 bxc6', { a: '=', c: '11.Rxd1 Bc2 12.Rd4 Nc6 13.Rxc4 a5 14.Nxc6 bxc6 é igual.' }],
  ['c63', 'j', 'j', '(j)', '12 Nxd7 O-O-O 13 e4 Rxd7+ 14 Kc2 Bg6 15 Bxc4 Bxc5 16 a5 Nd5', { a: '∞', r: 'Pétursson–Hector, Malmö 1993', c: '12.Nxd7 O-O-O 13.e4 Rxd7+ 14.Kc2 Bg6 15.Bxc4 Bxc5 16.a5 Nd5! dá contrajogo às pretas.' }],
  // Coluna 64
  ['c64', 'l', 'l', '(l)', '9... Bg6 10 e4 Bxc3 11 bxc3 Nxe4 12 Ba3 Qc7 13 Rfe1 Nxc3 14 Qe3 Ne4 15 Ne5 Nxe5 16 dxe5', { a: '⩲', r: 'Pelletier–L\'Ami, Bundesliga 2006', c: '9...Bg6 10.e4 Bxc3!? 11.bxc3 Nxe4 12.Ba3 Qc7 13.Rfe1 Nxc3 14.Qe3 Ne4 15.Ne5 Nxe5 16.dxe5: as brancas têm a iniciativa pelo peão.' }],
  ['c64-l', '1', 'l', '(l) 10...O-O', '10... O-O', { c: '10...O-O transpõe para a coluna.' }],
  ['c64', 'm', 'm', '(m)', '12 e5 Nd5 13 Nxd5 cxd5 14 Qe3 Be7 15 Ng5 Bxg5 16 Qxg5 Bg6 17 Be2 Nb8', { a: '=', r: 'Gelfand–Miton, Sochi 2007', c: '12.e5 Nd5 13.Nxd5 cxd5 14.Qe3 Be7 15.Ng5 Bxg5 16.Qxg5 Bg6 17.Be2 Nb8 é igual.' }],
  ['c64-m', '1', 'm', '(m) 12.Bf4', '12 Bf4 Re8 13 e5 Nd5', { a: '=', c: '12.Bf4 Re8 (ameaçando ...e5) 13.e5 Nd5 é igual.' }],
  // Coluna 65
  ['c65', 'n', 'n', '(n)', '9 Qb3 a5 10 Na2 Be7 11 Qxb7 Rb8 12 Qa6 Ra8 13 Qxc6 Rc8 14 Qb5 Rb8', { a: '=', c: '9.Qb3 a5 10.Na2 Be7 11.Qxb7 Rb8 12.Qa6 Ra8 13.Qxc6 Rc8 14.Qb5 Rb8 é empate por repetição.' }],
  ['c65-n', '1', 'n', '(n) 11.Nh4', '11 Nh4 Be4 12 Nc3 Nb6 13 Be2 O-O', { a: '=', c: '11.Nh4 Be4 12.Nc3 Nb6 13.Be2 O-O é igual.' }],
  ['c65', 'o', 'o', '(o)', '10 Qb3 a5 11 f3 Bh5 12 g3 O-O 13 Bd2 c5 14 Be2 cxd4 15 exd4 Nc5 16 Qc4 Rc8 17 Rad1 Nce4', { a: '−+', r: 'K. Georgiev–Hasbun, Internet 2007', c: 'Não é bom 10.Qb3 a5 11.f3 Bh5 12.g3 O-O 13.Bd2 c5 14.Be2 cxd4 15.exd4 Nc5 16.Qc4 Rc8 17.Rad1 Nce4, e as pretas ganham: o cavalo sai de c5 e a torre de c8 ataca a dama. (O livro escreve só Ne4; os dois cavalos chegam a e4.)' }],
  ['c65', 'p', 'p', '(p)', '12 Ng2 Bg6 13 Na2 Be7 14 e4 N5b6 15 Bb3 a5 16 Nc3 h5 17 Nf4 Nf8', { a: '∞', r: 'Tukmakov–Ehlvest, Kuibyshev 1986', c: '12.Ng2 Bg6 13.Na2 Be7 14.e4 N5b6 15.Bb3 a5 16.Nc3 h5 17.Nf4 Nf8! dá chances aos dois lados numa posição complicada.' }],
  ['c65-p', '1', 'p', '(p) 12.Qe1', '12 Qe1', { c: '12.Qe1!? é uma alternativa.' }],
  // Coluna 66
  ['c66', 'q-A', 'q', '(q) A', '9 Qb3 Qe7 10 a5 c5 11 Ne5 cxd4 12 exd4 Nc6 13 Nxc6 bxc6 14 Bg5 Rab8', { a: '=', c: '9.Qb3 Qe7 10.a5 c5 11.Ne5 cxd4 12.exd4 Nc6 13.Nxc6 bxc6 14.Bg5 Rab8 é igual.' }],
  ['c66', 'q-B', 'q', '(q) B', '9 Qe2 Bg6 10 Ne5 Nbd7 11 Nxg6 hxg6 12 Rd1 Qa5 13 Bd2 e5 14 d5 Rad8', { a: '=', r: 'Karpov–Kramnik, Mônaco (às cegas) 1995', c: '9.Qe2 Bg6 10.Ne5 Nbd7 11.Nxg6 hxg6 12.Rd1 Qa5 13.Bd2 e5 14.d5 Rad8 é igual.' }],
  ['c66-q-B', '1', 'q', '(q) 9...Nbd7', '9... Nbd7', { c: '9...Nbd7 transpõe para a coluna 64.' }],
  ['c66', 'r', 'r', '(r)', '9... Bg6 10 Nxg6 hxg6 11 Qc2', { a: '⩲', r: 'Sadler', c: '9...Bg6 10.Nxg6 hxg6 11.Qc2 deixa as brancas com os dois bispos e prontas para as rupturas pretas (Sadler).' }],
  ['c66', 's', 's', '(s)', '12 f3 Rc8 13 Rd1 Qe7 14 e4 fxe4 15 Nxe4 Nxe4 16 fxe4 c5 17 d5 Qd6 18 a5 a6 19 Rf1 Rce8 20 Bh6 Ne5 21 g3 f6 22 Bxf8 Rxf8', { a: '∞', r: 'Onischuk–Shirov, Rússia 2006', c: '12.f3 Rc8 13.Rd1 Qe7 14.e4 fxe4 15.Nxe4 Nxe4 16.fxe4 c5 17.d5 Qd6 18.a5 a6 19.Rf1 Rce8 20.Bh6 Ne5 21.g3 f6 22.Bxf8 Rxf8: as pretas têm compensação pela qualidade.' }],
]

const capitulo = {
  id: 'eslava-k',
  arquivo: 'eslava-k',
  nome: 'Eslava — 5.a4 Bf5: 6.Ne5 e 6.e3',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 484–485), colunas 61–66',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 484,
  grupos: [
    { id: 'ne5', nome: '6.Ne5 e6 7.f3 Bb4', colunas: [61, 62, 63] },
    { id: 'e3', nome: '6.e3 e6 7.Bxc4 Bb4 8.O-O', colunas: [64, 65, 66] },
  ],
}

module.exports = { capitulo, colunas, notas }
