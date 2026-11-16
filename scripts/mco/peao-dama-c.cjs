// Transcrição do MCO 15ª ed. — Gambito Blackmar-Diemer e Contragambito Albin (pp. 513–514), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs peao-dama-c
// Formato: ver gambito-do-rei.cjs. Dicas em peao-dama-c-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Na coluna 18 a nota (t) fala em boa compensação das pretas pelo peão; usamos ∞.
// Correções:
// - Coluna 16: a impressão do 4º lance das pretas parece "Nf6"; é 4...Nc6 (o cavalo de c6 captura em e5 na coluna 17,
//   e o de g8 só sai na coluna 18 com ...Nge7).
// Stockfish: discorda da coluna 17 (+2,6 com 10.Bg2), da nota (i) (+3,4) e da nota (p) (−2,1).
// - Nota (p): o livro traz 10 e6! Bxe6; o bispo das pretas está em h3 e não alcança e6. Quem captura é a dama: 10...Qxe6.

const B = '1 d4 d5 2 e4 dxe4 3 Nc3'
const BDG = `${B} Nf6 4 f3 exf3 5 Nxf3`
const A = '1 d4 d5 2 c4 e5 3 dxe5 d4 4 Nf3 Nc6'

const colunas = {
  c13: [`${BDG} Bg4 6 h3 Bxf3 7 Qxf3 c6 8 Be3 e6 9 Bd3 Nbd7`, 'bdg', 'Blackmar-Diemer 5...Bg4', '∓',
    'No Gambito Blackmar-Diemer as brancas entregam o peão de e4 para abrir linhas e atacar logo. Depois de 2...dxe4 3.Nc3 Nf6 4.f3 exf3 5.Nxf3 as brancas têm desenvolvimento rápido e a coluna f semiaberta. Com 5...Bg4 6.h3 Bxf3 7.Qxf3 c6 8.Be3 e6 9.Bd3 Nbd7 as pretas trocam peças, ficam sólidas e mantêm o peão a mais.'],
  c14: [`${BDG} Bf5 6 Ne5 e6 7 g4 Bg6 8 Qf3 c6 9 g5 Ng8`, 'bdg', '5...Bf5', '∞',
    'Com 5...Bf5 o bispo sai para fora da cadeia de peões. As brancas atacam com 6.Ne5 e6 7.g4, perseguindo o bispo. Depois de 7...Bg6 8.Qf3 c6 9.g5 Ng8 a posição fica muito aberta, com chances para os dois lados.'],
  c15: [`${B} e5 4 Be3 exd4 5 Bxd4 Nc6 6 Bb5 Bd7 7 Nge2 Nf6 8 O-O Be7 9 Bxf6 Bxf6`, 'bdg', '3...e5 (Contragambito Lemberger)', '=',
    'Com 3...e5 as pretas devolvem o golpe no centro em vez de defender o peão de e4. Depois de 4.Be3 exd4 5.Bxd4 Nc6 6.Bb5 Bd7 7.Nge2 Nf6 8.O-O Be7 9.Bxf6 Bxf6 as brancas recuperam o peão de e4 e o jogo é igual.'],
  c16: [`${A} 5 g3 Bg4 6 Bg2 Qd7 7 Nbd2 O-O-O 8 O-O Bh3 9 a3 h5`, 'albin', 'Albin 5.g3', '±',
    'No Contragambito Albin as pretas entregam o peão de e5 e ganham uma cunha em d4, esperando atacar. Com 5.g3 as brancas fazem o fianqueto do bispo do rei, o melhor plano. Depois de 5...Bg4 6.Bg2 Qd7 7.Nbd2 O-O-O 8.O-O Bh3 9.a3 h5 as pretas atacam o roque, mas as brancas chegam primeiro com 10.e6! e b4.'],
  c17: [`${A} 5 Nbd2 Bg4 6 h3 Bh5 7 a3 Qe7 8 g3 Nxe5 9 Nxe5 Qxe5`, 'albin', '5.Nbd2', '=',
    'Com 5.Nbd2 o cavalo vai a b3 para atacar d4. Depois de 5...Bg4 6.h3 Bh5 7.a3?! Qe7! 8.g3 Nxe5 9.Nxe5 Qxe5 as pretas recuperam o peão e o jogo é igual. (O Stockfish discorda: com 10.Bg2 as brancas ficam bem melhor, cerca de +2,6.)'],
  c18: [`${A} 5 a3 Be6 6 e3 dxe3 7 Qxd8+ Rxd8 8 Bxe3 Nge7 9 Nc3 Nf5`, 'albin', '5.a3', '∞',
    'Com 5.a3 as brancas preparam b4 para ganhar espaço na ala da dama. Depois de 5...Be6 6.e3 dxe3 7.Qxd8+ Rxd8 8.Bxe3 Nge7 9.Nc3 Nf5 as damas saem do tabuleiro, mas as peças pretas ficam tão ativas que compensam o peão.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '3 f3 e5 4 Be3 exd4 5 Bxd4 Nc6 6 Bb5 Bd7', { a: '∓', r: 'Fridlizius–Sjöberg, Gotemburgo 1903', c: 'O 3.f3 original de Blackmar é refutado por 3...e5!: 4.Be3 exd4 5.Bxd4 Nc6 6.Bb5 Bd7 é melhor para as pretas.' }],
  ['c13-a', '1', 'a', '(a) 4.dxe5', '4 dxe5 Qxd1+ 5 Kxd1 Nc6 6 Bf4 Nge7', { a: '∓', c: '4.dxe5 Qxd1+ 5.Kxd1 Nc6 6.Bf4 Nge7 é melhor para as pretas.' }],
  ['c13', 'b', 'b', '(b)', '4 Bg5 Nbd7 5 Qe2 e6 6 Nxe4 Be7 7 Bxf6 Nxf6 8 Nf3 O-O 9 O-O-O Qd5 10 Nc3 Qa5', { a: '=', r: 'Rogers–van den Brink, Ringsted 1992', c: '4.Bg5 Nbd7 5.Qe2 e6 6.Nxe4 Be7 7.Bxf6 Nxf6 8.Nf3 O-O 9.O-O-O Qd5 10.Nc3 Qa5 é igual.' }],
  ['c13', 'c-A', 'c', '(c) A', '4... e3 5 Bxe3 e6 6 Nge2 Nbd7 7 Ng3 Be7 8 Qd3 O-O 9 O-O-O a6', { a: '⩲', r: 'Milov–Gelfand, Biel 1995', c: 'Recusar o gambito com 4...e3 é seguro: 5.Bxe3 e6 6.Nge2 Nbd7 7.Ng3 Be7 8.Qd3 O-O 9.O-O-O a6 deixa as brancas só levemente melhor.' }],
  ['c13', 'c-B', 'c', '(c) B', '4... Bf5 5 g4 Bg6 6 h4 h6 7 Nh3 e6 8 Nf4 Bh7 9 Be3 Bb4', { a: '∞', r: 'Dravnieks–Buckingham, por correspondência 1988', c: 'O agudo 4...Bf5 5.g4 Bg6 6.h4 h6 7.Nh3 e6 8.Nf4 Bh7 9.Be3 Bb4 dá chances para os dois lados.' }],
  ['c13', 'd', 'd', '(d)', '5 Qxf3 g6 6 Bf4 Bg7 7 Nb5 Na6 8 O-O-O O-O 9 Ne2 c6', { a: '∓', r: 'Billian–Grant, por correspondência 1968', c: '5.Qxf3?! g6 6.Bf4 Bg7 7.Nb5 Na6 8.O-O-O O-O 9.Ne2 c6 é melhor para as pretas.' }],
  ['c13', 'e', 'e', '(e)', '8 g4 Qxd4 9 Be3 Qb4 10 O-O-O e6 11 Nb5 Na6', { a: '∓', c: '8.g4?! Qxd4 9.Be3 Qb4 10.O-O-O e6 11.Nb5 Na6 é melhor para as pretas.' }],
  ['c13', 'f', 'f', '(f)', '10 a3 Be7 11 O-O Nb6 12 Qg3 Nbd5', { a: '∓', r: 'Runarsson–V. Johansson, Reykjavik 2002', c: '10.a3 Be7 11.O-O Nb6 12.Qg3 Nbd5 é melhor para as pretas.' }],
  // Coluna 14
  ['c14', 'g-A', 'g', '(g) A', '5... e6 6 Bg5 Be7 7 Bd3 Nbd7 8 O-O h6 9 Bd2 b6 10 a4 Bb7 11 a5', { a: '∞', r: 'Zilbermints–Eisen, Marshall Chess Club (Nova York) 1997', c: '5...e6 6.Bg5 Be7 7.Bd3 Nbd7 8.O-O h6 9.Bd2 b6 10.a4 Bb7 11.a5 dá às brancas algum jogo pelo peão.' }],
  ['c14', 'g-B', 'g', '(g) B', '5... g6 6 Bc4 Bg7 7 O-O O-O 8 Qe1 b6 9 Qh4 Ba6 10 Bxa6 Nxa6 11 Bh6 Qd7', { a: '=', r: 'Meszaros–Madl, Hungria 1993', c: '5...g6 6.Bc4 Bg7 7.O-O O-O 8.Qe1 b6 9.Qh4 Ba6 10.Bxa6 Nxa6 11.Bh6 Qd7 é igual.' }],
  ['c14', 'h', 'h', '(h)', '7... Ne4 8 gxf5 Qh4+ 9 Ke2 Qf2+ 10 Kd3 Nc5+ 11 Kc4 a6 12 b4 b5+ 13 Nxb5 axb5+ 14 Kc3 Ne4+ 15 Kb3 Bxb4 16 Bxb5+ c6', { a: '∞', r: 'Moore–Dow, por correspondência 1981', c: '7...Ne4!? 8.gxf5 Qh4+ 9.Ke2 Qf2+ 10.Kd3 Nc5+ 11.Kc4 a6 12.b4 b5+ 13.Nxb5 axb5+ 14.Kc3 Ne4+ 15.Kb3 Bxb4 16.Bxb5+ c6: as complicações malucas acabaram empatadas.' }],
  ['c14', 'i', 'i', '(i)', '10 Bd3 Qxd4 11 Nxg6 hxg6 12 Bf4 Ne7 13 O-O-O Qb6 14 Rhf1 Nf5 15 Bxf5 gxf5 16 g6 Na6', { a: '∞', r: 'Motta–Mongilutz, por correspondência 1990', c: '10.Bd3 Qxd4 11.Nxg6 hxg6 12.Bf4 Ne7 13.O-O-O Qb6 14.Rhf1 Nf5 15.Bxf5 gxf5 16.g6 Na6 dá chances para os dois lados numa posição muito aberta. (O Stockfish prefere as brancas, cerca de +3,4.)' }],
  // Coluna 15
  ['c15', 'j', 'j', '(j)', '4 Qh5 exd4 5 Bc4 Qd7 6 Qe5+ Qe7 7 Qxd4 Nc6', { a: '∓', r: 'Sebastyen–Siskov, Hungria 2000', c: '4.Qh5 exd4 5.Bc4 Qd7 6.Qe5+ Qe7 7.Qxd4 Nc6 é melhor para as pretas.' }],
  ['c15', 'k', 'k', '(k)', '10 Nxe4 Be7 11 Qd5 O-O 12 Rad1 Be6 13 Qh5 Qc8', { a: '=', r: 'Nissen–Nugel, por correspondência 1991', c: '10.Nxe4 Be7 11.Qd5 O-O 12.Rad1 Be6 13.Qh5 Qc8 é igual.' }],
  // Coluna 16
  ['c16', 'l-A', 'l', '(l) A', '3 e3 exd4 4 exd4 Nf6', { a: '=', c: '3.e3 exd4 4.exd4 Nf6 é igual.' }],
  ['c16', 'l-B', 'l', '(l) B', '3 Nc3 exd4 4 Qxd4 Nc6 5 Qxd5 Be6 6 Qb5 a6 7 Qa4 Bb4', { a: '∓', r: 'Marshall–Duras, Karlsbad 1907', c: '3.Nc3 exd4 4.Qxd4 Nc6! 5.Qxd5 Be6 6.Qb5 a6 7.Qa4 Bb4: a vantagem de desenvolvimento das pretas lhes dá a melhor posição.' }],
  ['c16', 'm', 'm', '(m)', '4 e3 Bb4+ 5 Bd2 dxe3 6 fxe3 Qh4+ 7 g3 Qe4', { a: '∓', c: '4.e3? Bb4+ 5.Bd2 dxe3! 6.fxe3 Qh4+ 7.g3 Qe4 é melhor para as pretas.' }],
  ['c16-m', '1', 'm', '(m) 6.Bxb4?', '6 Bxb4 exf2+ 7 Ke2 fxg1=N+', { a: '−+', c: '6.Bxb4? perde: 6...exf2+ 7.Ke2 fxg1=N+!, e as pretas ganham.' }],
  ['c16', 'n-A', 'n', '(n) A', '5... Be6 6 Nbd2 Qd7 7 Bg2 Bh3 8 O-O Bxg2 9 Kxg2 h5 10 h4 Nh6 11 a3 O-O-O 12 b4', { a: '±', r: 'Hoang Thanh Trang–Taylor, Budapeste 2003', c: '5...Be6 6.Nbd2 Qd7 7.Bg2 Bh3 8.O-O Bxg2 9.Kxg2 h5 10.h4 Nh6 11.a3 O-O-O 12.b4 é melhor para as brancas.' }],
  ['c16', 'n-B', 'n', '(n) B', '5... Nge7 6 Bg2 Ng6 7 Bg5 Qd7 8 O-O Ngxe5 9 Nbd2', { a: '±', r: 'Trapl–Mista, República Tcheca 1995', c: '5...Nge7 6.Bg2 Ng6 7.Bg5 Qd7 8.O-O Ngxe5 9.Nbd2 é melhor para as brancas.' }],
  ['c16-n-B', '1', 'n', '(n) B 7...Be7', '7... Be7 8 Bxe7 Qxe7 9 Nxd4', { a: '±', c: '7...Be7 8.Bxe7 Qxe7 9.Nxd4 é melhor para as brancas.' }],
  ['c16', 'o-A', 'o', '(o) A', '7 h3 Be6 8 b3 O-O-O 9 Bb2 Nge7 10 Na3 Ng6 11 Nc2 Bc5 12 a3 Ngxe5 13 Nxe5 Nxe5 14 f4 Nxc4 15 bxc4 Bxc4 16 Qd2 Rhe8 17 Bf3 d3', { a: '∓', r: 'Martinez–Ramirez, Espanha 1990', c: 'Um exemplo de como as brancas deixam a iniciativa das pretas crescer: 7.h3 Be6 8.b3 O-O-O 9.Bb2 Nge7 10.Na3?! Ng6 11.Nc2 Bc5 12.a3 Ngxe5 13.Nxe5 Nxe5 14.f4 Nxc4! 15.bxc4 Bxc4 16.Qd2 Rhe8 17.Bf3 d3, melhor para as pretas.' }],
  ['c16', 'o-B', 'o', '(o) B', '7 O-O O-O-O 8 Qb3 Nge7 9 Rd1 Qf5 10 Na3 Ng6 11 Nxd4 Rxd4 12 Rxd4 Nxd4 13 Qxb7+', { a: '±', r: 'Hellers–Kostopoulos, Grécia 2004', c: 'Um bom plano é 7.O-O O-O-O 8.Qb3 Nge7 9.Rd1 Qf5 10.Na3 Ng6 11.Nxd4! Rxd4 12.Rxd4 Nxd4 13.Qxb7+, melhor para as brancas.' }],
  ['c16', 'p', 'p', '(p)', '10 e6 Qxe6 11 b4 f6 12 Qa4 Kb8 13 Bb2', { a: '±', r: 'Khan–Ziatdinov, Chicago 1997', c: '10.e6! Qxe6 11.b4 f6 12.Qa4 Kb8 13.Bb2 e as brancas têm o ataque. (O livro traz 10...Bxe6, impossível: o bispo preto está em h3. O Stockfish discorda da avaliação: depois de 13.Bb2 prefere as pretas, cerca de −2,1.)' }],
  // Coluna 17
  ['c17', 'q', 'q', '(q)', '6... Bxf3 7 Nxf3 f6 8 exf6 Nxf6 9 g3 Bb4+ 10 Bd2 Qe7 11 a3 Bxd2+ 12 Qxd2 O-O-O 13 Qd3', { a: '±', r: 'Capablanca–Aurbach, Paris 1914', c: '6...Bxf3 7.Nxf3 f6 8.exf6 Nxf6 9.g3 Bb4+ 10.Bd2 Qe7 11.a3 Bxd2+ 12.Qxd2 O-O-O 13.Qd3! é melhor para as brancas.' }],
  ['c17', 'r', 'r', '(r)', '10 Bg2 O-O-O 11 Nf3 Qa5+ 12 Bd2 Qa6 13 O-O Nf6', { a: '=', r: 'Portisch–Forintos, Hungria 1964', c: '10.Bg2 O-O-O 11.Nf3 Qa5+ 12.Bd2 Qa6 13.O-O Nf6 é igual.' }],
  ['c17-r', '1', 'r', '(r) 7.g3', '7 g3', { c: 'Se as brancas jogarem 7.g3, o jogo fica parecido com a coluna anterior.' }],
  // Coluna 18
  ['c18', 's', 's', '(s)', '5... Bg4 6 h3 Bxf3 7 gxf3 Nxe5 8 f4 Nc6 9 Bg2 Qd7 10 b4', { a: '±', r: 'Lasker–Albin, Nova York 1893', c: '5...Bg4 6.h3 Bxf3 7.gxf3 Nxe5 8.f4 Nc6 9.Bg2 Qd7 10.b4 é melhor para as brancas.' }],
  ['c18', 't', 't', '(t)', '10 Bf4 h6 11 h4 Ncd4 12 O-O-O Nxf3', { a: '∞', r: 'Babula–Krasenkow, Brno 1994', c: 'A partida seguiu 10.Bf4 h6 11.h4; agora 11...Ncd4 12.O-O-O Nxf3 deixa as pretas com boa compensação pelo peão.' }],
]

const capitulo = {
  id: 'peao-dama-c',
  arquivo: 'peao-dama-c',
  nome: 'Peão da Dama — Gambitos Blackmar-Diemer e Albin',
  fonte: 'Modern Chess Openings — Blackmar-Diemer and Albin Counter Gambits (pp. 513–514), colunas 13–18',
  base: '1. d4 d5',
  corPadrao: 'w',
  ordem: 513,
  grupos: [
    { id: 'bdg', nome: 'Gambito Blackmar-Diemer (2.e4)', colunas: [13, 14, 15] },
    { id: 'albin', nome: 'Contragambito Albin (2.c4 e5)', colunas: [16, 17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
