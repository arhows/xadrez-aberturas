// Transcrição do MCO 15ª ed. — Eslava, 4...a6 (Variante Chebanenko) (pp. 482–483), colunas 55–60.
// Gerar: node scripts/mco/gerar.cjs eslava-j
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-j-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções de notação (capturas sem x no livro): coluna 57, 11...Qxa5; nota (c), 17...Nxc5; nota (n), 17...Qxa2; nota (t), 15.Rxb4.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 a6'
const E = `${B} 5 e3`

const colunas = {
  c55: [`${B} 5 a4 e6 6 Bg5 Nbd7 7 e3 Qa5 8 cxd5 exd5 9 Bd3 Ne4 10 O-O Nxg5 11 Nxg5 Be7 12 f4 Nf6`, 'a4', '5.a4 e6', '±',
    'Com 4...a6 as pretas preparam ...b5. Contra 5.a4 elas jogam 5...e6; depois de 6.Bg5 Nbd7 7.e3 Qa5 8.cxd5 exd5 9.Bd3 Ne4 10.O-O Nxg5 11.Nxg5 Be7 12.f4 Nf6 as brancas têm a iniciativa (Gelfand–Kamsky, Candidatos 2007).'],
  c56: [`${E} g6 6 Be2 Bg7 7 O-O O-O 8 a4 Be6 9 Ng5 Bc8 10 Qb3 b6 11 Bd2 e6 12 Nf3 Nbd7`, 'e3', '5.e3 g6', '±',
    'Com 5.e3 g6 as pretas fazem o fianqueto. Depois de 6.Be2 Bg7 7.O-O O-O 8.a4 Be6 9.Ng5 Bc8 10.Qb3 b6 11.Bd2 e6 12.Nf3 Nbd7 as brancas ficam melhor (Gelfand–Kamsky, Candidatos 2007).'],
  c57: [`${E} b5 6 c5 g6 7 b4 Bg4 8 h3 Bxf3 9 gxf3 a5 10 bxa5 Bg7 11 f4 Qxa5 12 Bd2 b4`, 'e3', '5...b5', '=',
    'Com 5...b5 6.c5 as brancas fecham a ala da dama. Depois de 6...g6 7.b4 Bg4 8.h3 Bxf3 9.gxf3 a5 10.bxa5 Bg7 11.f4 Qxa5 12.Bd2 b4 o jogo é igual (Kamsky–Bacrot, Candidatos 2007).'],
  c58: [`${B} 5 c5 Nbd7 6 Bf4 Nh5 7 Bg5 h6 8 Bd2 Nhf6 9 Qc2 Qc7 10 e4 dxe4 11 Nxe4 Nxe4 12 Qxe4 Nf6`, 'outros', '5.c5', '±',
    'Com 5.c5 as brancas ganham espaço e tiram b6 das pretas. Depois de 5...Nbd7 6.Bf4 Nh5 7.Bg5 h6 8.Bd2 Nhf6 9.Qc2 Qc7 10.e4 dxe4 11.Nxe4 Nxe4 12.Qxe4 Nf6 as brancas ficam melhor (Svetushkin–Vysochin, Capelle-la-Grande 2005).'],
  c59: [`${B} 5 g3 b5 6 c5 g6 7 Bg2 Bg7 8 O-O O-O 9 h3 Nbd7 10 Be3 b4 11 Nb1 a5 12 a3 Ba6`, 'outros', '5.g3', '⩲',
    'Com 5.g3 b5 6.c5 g6 7.Bg2 Bg7 8.O-O O-O 9.h3 Nbd7 10.Be3 b4 11.Nb1 a5 12.a3 Ba6 as brancas ficam um pouco melhor (Khalifman–Volkov, Rússia 2005).'],
  c60: [`${B} 5 Bg5 Ne4 6 h4 Nxc3 7 bxc3 dxc4 8 g3 b5 9 Bg2 Bb7 10 O-O Nd7 11 e4 h6 12 Bf4 e6`, 'outros', '5.Bg5', '∞',
    'Com 5.Bg5 Ne4 6.h4 Nxc3 7.bxc3 dxc4 as pretas ganham um peão, e as brancas ficam com o centro. Depois de 8.g3 b5 9.Bg2 Bb7 10.O-O Nd7 11.e4 h6 12.Bf4 e6 as chances são para os dois lados (Dreev–Malakhov, 2005).'],
}

const notas = [
  // Coluna 55
  ['c55', 'a-A', 'a', '(a) A', '6... a5 7 g3 Nbd7 8 Bg2 h6 9 Bf4 Bb4 10 O-O O-O 11 Nd2 g5 12 Be3 Ng4 13 Qc2 f5 14 Nd1 Qf6', { a: '=', r: 'Miton–Prié, Liga Francesa 2007', c: '6...a5!? 7.g3 Nbd7 8.Bg2 h6 9.Bf4 Bb4 10.O-O O-O 11.Nd2 g5 12.Be3 Ng4 13.Qc2 f5 14.Nd1 Qf6 dá jogo razoável às pretas.' }],
  ['c55', 'a-B', 'a', '(a) B', '6... Bb4 7 Qb3 Qa5 8 Bxf6 gxf6 9 g3 Nd7 10 Bg2 f5 11 O-O Be7 12 e3', { a: '±', r: 'Gagunashvili–Milov, Chicago 2007', c: '6...Bb4 7.Qb3 Qa5 8.Bxf6 gxf6 9.g3 Nd7 10.Bg2 f5 11.O-O Be7 12.e3 é melhor para as brancas.' }],
  ['c55', 'b', 'b', '(b)', '7 a5 h6 8 Bxf6 Nxf6 9 c5 g6 10 Qc2 Bg7 11 e4 dxe4 12 Nxe4 Nxe4 13 Qxe4', { a: '±', r: 'Babula–Jirka, Campeonato Tcheco 2007', c: '7.a5 h6 8.Bxf6 Nxf6 9.c5 g6 10.Qc2 Bg7 11.e4 dxe4 12.Nxe4 Nxe4 13.Qxe4 dá vantagem de espaço às brancas.' }],
  ['c55', 'c', 'c', '(c)', '8 Bxf6 Nxf6 9 Bd3 Bb4 10 Rc1 c5 11 O-O dxc4 12 Bxc4 O-O 13 Qb3 Bd7 14 dxc5 Bxc3 15 Qxc3 Qxc3 16 Rxc3 Ne4 17 Rcc1 Nxc5', { a: '=', r: 'Mahía–Lemito, Argentina 2007', c: '8.Bxf6 Nxf6 9.Bd3 Bb4 10.Rc1 c5 11.O-O dxc4 12.Bxc4 O-O 13.Qb3 Bd7 14.dxc5 Bxc3 15.Qxc3 Qxc3 16.Rxc3 Ne4 17.Rcc1 Nxc5 é igual.' }],
  ['c55', 'd', 'd', '(d)', '10... Nxc3 11 bxc3 Qxc3 12 e4 dxe4 13 Re1', { a: '±', c: '10...Nxc3 11.bxc3 Qxc3 12.e4! dxe4 13.Re1 dá às brancas uma iniciativa perigosa.' }],
  ['c55', 'e', 'e', '(e)', '12 Qh5 Bxg5 13 Qxg5 O-O 14 Qe7 Nf6 15 b4 Qd8 16 Qxd8 Rxd8 17 b5', { a: '⩲', r: 'Lapčević–Krivoborodov, Herceg Novi 2005', c: '12.Qh5 Bxg5 13.Qxg5 O-O 14.Qe7 Nf6 15.b4 Qd8 16.Qxd8 Rxd8 17.b5 é um pouco melhor para as brancas.' }],
  ['c55', 'f', 'f', '(f)', '13 Qc2 h6 14 Nf3 Be6 15 Ne5', { a: '±', r: 'Gelfand–Kamsky, Candidatos 2007', c: '13.Qc2 h6 14.Nf3 Be6 15.Ne5: as brancas têm a iniciativa.' }],
  // Coluna 56
  ['c56', 'g', 'g', '(g)', '8 Qb3 dxc4 9 Bxc4 b5 10 Be2 Nbd7 11 e4 Nb8 12 Bf4', { a: '±', r: 'Carlsen–Malakhov, Copa do Mundo 2005', c: 'Também é promissor 8.Qb3 dxc4?! 9.Bxc4 b5 10.Be2 Nbd7 11.e4 Nb8 12.Bf4, melhor para as brancas.' }],
  ['c56', 'h', 'h', '(h)', '8... Bg4 9 a5 dxc4 10 h3 Bxf3 11 Bxf3 Ne8 12 Ne4 Nd6 13 Nxd6 exd6 14 b3 c3 15 Qd3 d5', { a: '=', r: 'Mamedyarov–Kamsky, Wijk aan Zee 2006', c: '8...Bg4 9.a5 dxc4 10.h3 Bxf3 11.Bxf3 Ne8 12.Ne4 Nd6 13.Nxd6 exd6 14.b3 c3 15.Qd3 d5 deixou as pretas bem.' }],
  ['c56', 'i', 'i', '(i)', '13 cxd5 exd5 14 a5 b5 15 Rfd1 Re8 16 Rac1 Bf8 17 Na2', { a: '±', r: 'Gelfand–Kamsky, Candidatos 2007', c: '13.cxd5 exd5 14.a5 b5 15.Rfd1 Re8 16.Rac1 Bf8 17.Na2 é melhor para as brancas.' }],
  // Coluna 57
  ['c57', 'j', 'j', '(j)', '6 b3 Bg4 7 Be2 Nbd7 8 O-O e6 9 h3 Bf5 10 Bd3 Bxd3 11 Qxd3 Be7 12 cxd5 cxd5 13 a4 b4', { a: '=', r: 'Ács–Bacrot, Bundesliga 2007', c: '6.b3 Bg4 7.Be2 Nbd7 8.O-O e6 9.h3 Bf5 10.Bd3 Bxd3 11.Qxd3 Be7 12.cxd5 cxd5 13.a4 b4 é igual.' }],
  ['c57', 'k', 'k', '(k)', '6... Nbd7 7 Qb3 Rb8 8 Be2 e5 9 O-O Be7 10 Ne1 O-O 11 Nd3 Qc7 12 f3 Re8 13 Bd2', { a: '±', r: 'Nakamura–Pert, Gibraltar 2005', c: '6...Nbd7 7.Qb3 Rb8 8.Be2 e5 9.O-O Be7 10.Ne1 O-O 11.Nd3 Qc7 12.f3 Re8 13.Bd2 é melhor para as brancas.' }],
  ['c57', 'l', 'l', '(l)', '7 Ne5 Bg7 8 Be2 O-O 9 O-O Be6 10 f4 Qc7 11 g4 Ne4 12 Bf3 f5', { a: '=', r: 'Gelfand–Bareev, Copa do Mundo 2005', c: '7.Ne5 Bg7 8.Be2 O-O 9.O-O Be6 10.f4 Qc7 11.g4 Ne4 12.Bf3 f5 é igual.' }],
  ['c57', 'm', 'm', '(m)', '8 a4 Nbd7 9 Bb2 Bg7 10 Ne2 Bxf3 11 gxf3 O-O 12 f4 Qc7 13 Nc1 Rfb8 14 Nb3', { a: '±', r: 'Kožul–Kuljašević, Varsóvia 2005', c: '8.a4 Nbd7 9.Bb2 Bg7 10.Ne2 Bxf3 11.gxf3 O-O 12.f4 Qc7 13.Nc1 Rfb8 14.Nb3 é melhor para as brancas.' }],
  ['c57', 'n', 'n', '(n)', '13 Ne2 Ne4 14 Bg2 Nxd2 15 Qxd2 Nd7 16 O-O O-O 17 Rab1 Qxa2 18 Rb2 Qa6', { a: '=', r: 'Kamsky–Bacrot, Candidatos 2007', c: '13.Ne2 Ne4 14.Bg2 Nxd2 15.Qxd2 Nd7 16.O-O O-O 17.Rab1 Qxa2 18.Rb2 Qa6 é igual.' }],
  // Coluna 58
  ['c58', 'o', 'o', '(o)', '7 Bd2 Nhf6 8 Qc2 g6 9 g3 Bg7 10 Bg2 O-O 11 O-O Re8 12 Rad1 a5 13 h3 b6 14 cxb6 Qxb6 15 Rc1', { a: '±', r: 'Potkin–Kobalia, Sochi 2007', c: '7.Bd2 Nhf6 8.Qc2 g6 9.g3 Bg7 10.Bg2 O-O 11.O-O Re8 12.Rad1 a5 13.h3 b6 14.cxb6 Qxb6 15.Rc1 é melhor para as brancas.' }],
  ['c58', 'p', 'p', '(p)', '9 Bf4 Nh5 10 Be5 Nxe5 11 Nxe5 g6 12 Qc2 Be6 13 e3 Bg7 14 f4 O-O 15 g4 Nf6 16 f5', { a: '±', r: 'Kasimdzhanov–Bacrot, Córsega (rápido) 2006', c: '9.Bf4 Nh5 10.Be5 Nxe5 11.Nxe5 g6 12.Qc2 Be6 13.e3 Bg7 14.f4 O-O 15.g4 Nf6 16.f5 deixa as brancas por cima.' }],
  ['c58', 'q', 'q', '(q)', '13 Qc2 Be6 14 Bd3 Nd7 15 O-O Bd5 16 Rfe1 e6 17 Ne5 Nxe5 18 dxe5', { a: '±', r: 'Svetushkin–Vysochin, Capelle-la-Grande 2005', c: '13.Qc2 Be6 14.Bd3 Nd7 15.O-O Bd5 16.Rfe1 e6 17.Ne5 Nxe5 18.dxe5 é melhor para as brancas.' }],
  ['c58-q', '1', 'q', '(q) 14.O-O-O', '14 O-O-O', { c: '14.O-O-O também é promissor.' }],
  // Coluna 59
  ['c59', 'r', 'r', '(r)', '5... Nbd7 6 cxd5 cxd5 7 Bg2 b5 8 O-O e6 9 Bf4 Bb7 10 Rc1 Rc8 11 Qd3 Be7', { a: '=', r: 'Romanov–Spless, Dresden 2007', c: '5...Nbd7 6.cxd5 (talvez não seja o melhor) cxd5 7.Bg2 b5 8.O-O e6 9.Bf4 Bb7 10.Rc1 Rc8 11.Qd3 Be7 é igual.' }],
  ['c59', 's', 's', '(s)', '6... Bf5 7 Nh4 e6 8 Bg2 Be7 9 Nxf5 exf5 10 Qd3 g6 11 Bh6 Bf8 12 Bg5 Be7 13 Bh6 Bf8 14 Bf4 Be7 15 h3', { a: '⩲', r: 'Eljanov–Simonet, Espanha 2006', c: '6...Bf5 7.Nh4 e6 8.Bg2 Be7 9.Nxf5 exf5 10.Qd3 g6 11.Bh6 Bf8 12.Bg5 Be7 13.Bh6 Bf8 14.Bf4 Be7 15.h3 é um pouco melhor para as brancas.' }],
  ['c59', 't', 't', '(t)', '13 axb4 axb4 14 Ra4 Bb5 15 Rxb4 Qa5 16 Bd2 Ne4 17 Re1 Nxd2 18 Qxd2', { a: '⩲', r: 'Khalifman–Volkov, Rússia 2005', c: '13.axb4 axb4 14.Ra4 Bb5 15.Rxb4 Qa5 16.Bd2 Ne4 17.Re1 Nxd2 18.Qxd2 é um pouco melhor para as brancas.' }],
  // Coluna 60
  ['c60', 'u', 'u', '(u)', '5... dxc4 6 a4 Nd5 7 e4 Nxc3 8 bxc3 b5 9 Be2', { a: '⩲', r: 'Rakhmanulov–Shegda, Ucrânia 2007', c: '5...dxc4 6.a4 Nd5 7.e4 Nxc3 8.bxc3 b5 9.Be2 é um pouco melhor para as brancas.' }],
  ['c60', 'v', 'v', '(v)', '6 e3 Nxg5 7 Nxg5 e6 8 f4 Be7 9 Nf3 O-O 10 Qc2 c5', { a: '∞', r: 'Umarsky–Movsesian, Internet 2005', c: '6.e3 Nxg5 7.Nxg5 e6 8.f4 Be7 9.Nf3 O-O 10.Qc2 c5 dá bom contrajogo às pretas.' }],
  ['c60', 'w', 'w', '(w)', '13 g4 Be7 14 a4 Nb6 15 g5 hxg5 16 hxg5 Bd6', { a: '∞', r: 'Dreev–Malakhov, Copa do Mundo 2005', c: '13.g4 Be7 14.a4 Nb6 15.g5 hxg5 16.hxg5 Bd6 dá chances aos dois lados.' }],
]

const capitulo = {
  id: 'eslava-j',
  arquivo: 'eslava-j',
  nome: 'Eslava — 4...a6 (Chebanenko)',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 482–483), colunas 55–60',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 482,
  grupos: [
    { id: 'a4', nome: '5.a4', colunas: [55] },
    { id: 'e3', nome: '5.e3', colunas: [56, 57] },
    { id: 'outros', nome: '5.c5, 5.g3 e 5.Bg5', colunas: [58, 59, 60] },
  ],
}

module.exports = { capitulo, colunas, notas }
