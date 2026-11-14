// Transcrição do MCO 15ª ed. — Gambito da Dama Aceito, 4.e3: 4...e6 sem 7.Qe2 e 4...Bg4 (pp. 453–455), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs gda-b
// Formato: ver gambito-do-rei.cjs. Dicas em gda-b-dicas.cjs.
//
// A tabela desta página só traz avaliação na coluna 8; nas outras usamos a avaliação da nota que continua cada coluna.

const B = '1 d4 d5 2 c4 dxc4 3 Nf3 Nf6 4 e3'
const E = `${B} e6 5 Bxc4 c5`
const G = `${B} Bg4 5 Bxc4 e6 6 h3 Bh5`

const colunas = {
  c07: [`${E} 6 O-O a6 7 a4 Nc6 8 Qe2 cxd4 9 Rd1 Be7 10 exd4 O-O 11 Nc3 Nd5 12 Bd3 Ncb4`, 'a6', '6...a6 7.a4', '∞',
    'Com 7.a4 as brancas impedem ...b5 de vez, mas enfraquecem b4. Depois de 7...Nc6 8.Qe2 cxd4 9.Rd1 Be7 10.exd4 O-O 11.Nc3 Nd5 12.Bd3 Ncb4 as pretas ocupam b4 e d5; as chances são para os dois lados (Savchenko–Lupor, 2005).'],
  c08: [`${E} 6 O-O a6 7 e4 b5 8 Bd3 Bb7 9 e5 Nd5 10 a4 c4 11 Be4 Be7 12 b3 Nd7`, 'a6', '7.e4', '=',
    'Com 7.e4 as brancas ocupam o centro e oferecem o peão de e4. Depois de 7...b5 8.Bd3 Bb7 9.e5 Nd5 10.a4 c4 11.Be4 Be7 12.b3 Nd7 as pretas ficam com bom jogo na ala da dama e o jogo é igual.'],
  c09: [`${E} 6 O-O Nc6 7 Qe2 cxd4 8 Rd1 Be7 9 exd4 O-O 10 Nc3 Nb4 11 Ne5 Bd7 12 a3 Nbd5`, 'nc6', '6...Nc6', '⩲',
    'Com 6...Nc6 as pretas pressionam d4 sem ...a6. Depois de 7.Qe2 cxd4 8.Rd1 Be7 9.exd4 O-O 10.Nc3 Nb4 11.Ne5 Bd7 12.a3 Nbd5 as brancas ficam com o peão isolado, mas com iniciativa e uma pequena vantagem (I. Sokolov–Hübner, Nuremberg 1994).'],
  c10: [`${E} 6 Qe2 a6 7 dxc5 Bxc5 8 e4 Nc6 9 O-O Ng4 10 e5 Nd4 11 Nxd4 Qxd4 12 Nd2 Nxe5`, 'qe2', '6.Qe2', '⩲',
    'Com 6.Qe2 a6 7.dxc5 Bxc5 8.e4 as brancas ocupam o centro de imediato. Depois de 8...Nc6 9.O-O Ng4 10.e5 Nd4 11.Nxd4 Qxd4 12.Nd2 Nxe5 as pretas ganham um peão, mas as brancas ficam com jogo mais que suficiente por ele (Neishtadt).'],
  c11: [`${G} 7 O-O Nbd7 8 Nc3 Bd6 9 e4 e5 10 g4 Bg6 11 dxe5 Nxe5 12 Nxe5 Bxe5`, 'bg4', '4...Bg4 8...Bd6', '±',
    'Com 4...Bg4 as pretas desenvolvem o bispo antes de ...e6. Depois de 5.Bxc4 e6 6.h3 Bh5 7.O-O Nbd7 8.Nc3 Bd6 9.e4 e5 10.g4 Bg6 11.dxe5 as brancas ganham espaço e tempo, e ficam melhor (Atalik–Meins, Bad Wiessee 2003).'],
  c12: [`${G} 7 O-O a6 8 Nc3 Nc6 9 Be2 Bd6 10 b3 O-O 11 Bb2 Qe7 12 Rc1 Rfd8`, 'bg4', '7...a6 8...Nc6', '⩲',
    'Com 7...a6 8.Nc3 Nc6 as pretas pressionam d4. Depois de 9.Be2 Bd6 10.b3 O-O 11.Bb2 Qe7 12.Rc1 Rfd8 as brancas golpeiam com 13.Ne5! e ficam com vantagem no final (Taimanov).'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '7... cxd4 8 exd4 Nc6 9 Nc3 Be7 10 Re1 O-O 11 Bg5 Nb4 12 Ne5 Bd7 13 Qb3 Bc6 14 Rad1', { a: '⩲', r: 'Schandorff–Danielsen, Dinamarca 1987', c: 'É ruim trocar em d4 antes de as brancas moverem mais peças: 7...cxd4?! 8.exd4 Nc6 9.Nc3 Be7 10.Re1 O-O 11.Bg5 Nb4 12.Ne5 Bd7 13.Qb3 Bc6 14.Rad1, com pressão central.' }],
  ['c07', 'b', 'b', '(b)', '8... Qc7 9 Nc3 Be7 10 Bd2 O-O 11 d5 exd5 12 Nxd5 Nxd5 13 Bxd5 Bf6', { a: '=', r: 'Yusupov–van Wely, Siemens Masters 2000', c: 'Uma boa alternativa é 8...Qc7 9.Nc3 Be7 10.Bd2 O-O 11.d5 exd5 12.Nxd5 Nxd5 13.Bxd5 Bf6, quase igual.' }],
  ['c07', 'c', 'c', '(c)', '11 Bg5 Nd5 12 Bxe7 Ncxe7 13 Ne5 b6 14 a5 Bb7 15 axb6 Qxb6', { a: '=', r: 'Petrosian–Kotov, URSS 1972', c: '11.Bg5 Nd5 12.Bxe7 Ncxe7 13.Ne5 b6 14.a5 Bb7 15.axb6 Qxb6 é igual.' }],
  ['c07-c', '1', 'c', '(c) 14.Nd2', '14 Nd2 Bb7 15 Ne4 Rc8', { a: '=', c: '14.Nd2 Bb7 15.Ne4 Rc8 também é igual.' }],
  ['c07-c', '2', 'c', '(c) 16.Nd7', '16 Nd7 Qc6 17 Nxf8 Nc3', { a: '∓', c: '16.Nd7?! Qc6 17.Nxf8 Nc3 favorece as pretas.' }],
  ['c07', 'd', 'd', '(d)', '11... Nb4 12 Ne5 Bd7 13 Bg5 Rc8 14 Re1 Be8 15 Rad1', { a: '⩲', r: 'Bareev–Ivanchuk, Linares 1994', c: '11...Nb4 12.Ne5 Bd7 13.Bg5 Rc8 14.Re1! Be8 15.Rad1 é um pouco melhor para as brancas.' }],
  ['c07-d', '1', 'd', '(d) 12...b6', '12... b6 13 Qf3', { a: '⩲', c: '12...b6 13.Qf3 é um pouco melhor para as brancas.' }],
  ['c07', 'e-A', 'e', '(e) A', '12 Ne5 Nxc3 13 bxc3 Nxe5', { a: '=', c: 'As pretas igualam depois de 12.Ne5 Nxc3 13.bxc3 Nxe5.' }],
  ['c07', 'e-B', 'e', '(e) B', '12 Qe4 Nf6 13 Qh4 Nd5', { a: '=', c: 'Também igualam depois de 12.Qe4 Nf6 13.Qh4 Nd5.' }],
  ['c07', 'f', 'f', '(f)', '13 Bb1 b6 14 Ne5 Bb7 15 Ne4 Rc8', { a: '∞', r: 'Savchenko–Lupor, 2005', c: '13.Bb1 b6 14.Ne5 Bb7 15.Ne4 Rc8 dá chances aos dois lados.' }],
  // Coluna 8
  ['c08', 'g-A', 'g', '(g) A', '7 Bb3 Nc6 8 Qe2 cxd4 9 Rd1 Be7 10 exd4 Na5 11 Bc2 b5 12 Nc3 Bb7', { a: '=', r: 'Illescas–Anand, match 1997', c: 'As brancas também já recuaram o bispo: 7.Bb3 Nc6 8.Qe2 cxd4 9.Rd1 Be7 10.exd4 Na5 11.Bc2 b5 12.Nc3 Bb7 é igual.' }],
  ['c08-g-A', '1', 'g', '(g) A 7...b5', '7... b5 8 a4', { c: '7...b5 8.a4 agora enfraquece a ala da dama preta.' }],
  ['c08', 'g-B', 'g', '(g) B', '7 Bd3 Nc6 8 Nc3 cxd4 9 exd4 Be7 10 Bg5 O-O 11 Rc1 Nb4 12 Bb1 Bd7 13 Ne5 Rc8 14 Qb3 b5 15 Rfd1 Nbd5 16 Nxd5 Nxd5 17 Rxc8 Bxc8 18 Nc6 Qd7 19 Qc2 g6', { a: '=', r: 'Atalik–Kofidis, Icária 1996', c: '7.Bd3 Nc6 8.Nc3 cxd4 9.exd4 Be7 10.Bg5 O-O 11.Rc1 Nb4 12.Bb1 Bd7: as pretas se defenderam com sucesso.' }],
  ['c08-g-B', '1', 'g', '(g) B 10.Ne5', '10 Ne5 Bd7', { a: '=', c: '10.Ne5 Bd7 é igual.' }],
  ['c08', 'h', 'h', '(h)', '7... Nxe4 8 Qe2 Nf6 9 d5 b5 10 dxe6 bxc4 11 Rd1', { a: '±', c: 'Tomar o peão e com 7...Nxe4 leva a um jogo muito agudo depois de 8.Qe2 Nf6 9.d5 b5 10.dxe6 bxc4 11.Rd1, com ataque forte pelo bispo.' }],
  ['c08-h', '1', 'h', '(h) 8.d5', '8 d5 Be7 9 dxe6 Bxe6 10 Qxd8+ Bxd8 11 Bxe6 fxe6 12 Re1 Nf6 13 Rxe6+', { a: '⩲', r: 'Aleksandrov–Sadler, Køge 1997', c: 'As brancas podem escolher um caminho mais seguro: 8.d5 Be7 9.dxe6 Bxe6 10.Qxd8+ Bxd8 11.Bxe6 fxe6 12.Re1 Nf6 13.Rxe6+, com pressão no final.' }],
  ['c08', 'i', 'i', '(i)', '9 Bg5 Be7 10 Nbd2 h6 11 Bxf6 Bxf6 12 e5 Be7 13 Be4 Bxe4 14 Nxe4 cxd4', { a: '=', r: 'Loeffler–van den Doel, Bundesliga 2003', c: '9.Bg5 Be7 10.Nbd2 h6 11.Bxf6 Bxf6 12.e5 Be7 13.Be4 Bxe4 14.Nxe4 cxd4 é igual.' }],
  ['c08', 'j', 'j', '(j)', '12 Nbd2 Nc6 13 Bb1 Na5', { a: '∓', r: 'Summerscale–Reeflat, Edimburgo 2003', c: '12.b3 é melhor que 12.Nbd2 Nc6 13.Bb1 Na5, quando as pretas ficam por cima.' }],
  // Coluna 9
  ['c09', 'k', 'k', '(k)', '6... cxd4 7 exd4 Be7 8 Nc3 O-O 9 Bg5 Nbd7 10 Qe2 Nb6 11 Bb3 Bd7 12 Rad1 Bc6 13 Ne5', { a: '⩲', r: 'Botvinnik–Budo, Leningrado 1938', c: 'Aliviar a tensão no centro com 6...cxd4 7.exd4 dá às brancas uma posição agressiva: 7...Be7 8.Nc3 O-O 9.Bg5 Nbd7 10.Qe2 Nb6 11.Bb3 Bd7 12.Rad1 Bc6 13.Ne5, com chances de ataque.' }],
  ['c09', 'l', 'l', '(l)', '13 Bg5 Bc6 14 Nxc6 bxc6 15 Rac1 a5 16 Na4 Nb6 17 Bb3', { a: '⩲', r: 'I. Sokolov–Hübner, Nuremberg 1994', c: '13.Bg5 Bc6 14.Nxc6 bxc6 15.Rac1 a5 16.Na4 Nb6 17.Bb3 é um pouco melhor para as brancas.' }],
  // Coluna 10
  ['c10', 'm', 'm', '(m)', '6... cxd4 7 exd4 Nc6 8 O-O Be7 9 Rd1', { c: '6...cxd4 7.exd4 Nc6 8.O-O Be7 9.Rd1 transpõe para a coluna anterior.' }],
  ['c10-m', '1', 'm', '(m) 8...Nxd4', '8... Nxd4 9 Nxd4 Qxd4 10 Rd1', { a: '±', c: 'Tomar o peão d com 8...Nxd4?! 9.Nxd4 Qxd4 10.Rd1 dá às brancas uma vantagem perigosa de desenvolvimento.' }],
  ['c10', 'n', 'n', '(n)', '8... Qc7 9 e5 Ng4 10 O-O Nxf2 11 Nc3 Nd1+ 12 Kh1 Nxc3 13 bxc3', { a: '∞', r: 'Janković–Borišek, Copa Mitropa 2006', c: '8...Qc7 9.e5 Ng4 10.O-O Nxf2 11.Nc3!? Nd1+ 12.Kh1 Nxc3 13.bxc3 dá às brancas chances de ataque pelo peão.' }],
  ['c10', 'o', 'o', '(o)', '9... b5 10 Bb3 Nd4 11 Nxd4 Qxd4 12 Be3 Qxe4 13 Nd2 Qf5 14 g4 Qe5 15 Nf3 Qe4 16 Ng5 Qc6 17 Rac1 Bb7 18 f3 Bxe3+ 19 Qxe3 Qd6 20 Nxe6 fxe6 21 Bxe6', { a: '±', r: 'Timman–Lautier, Espanha 1997', c: '9...b5 10.Bb3 Nd4 11.Nxd4 Qxd4 12.Be3! Qxe4 13.Nd2 Qf5 14.g4 Qe5 15.Nf3 Qe4 16.Ng5 Qc6 17.Rac1 Bb7 18.f3 Bxe3+ 19.Qxe3 Qd6 20.Nxe6! fxe6 21.Bxe6, com ataque forte.' }],
  ['c10-o', '1', 'o', '(o) 10...e5', '10... e5 11 Be3 Qb6 12 Nc3 Bxe3 13 fxe3 O-O 14 Nd5', { a: '±', r: 'Nogueiras–Spraggett, Szirák 1986', c: '10...e5 11.Be3 Qb6 12.Nc3 Bxe3 13.fxe3 O-O 14.Nd5 é melhor para as brancas.' }],
  ['c10-o', '2', 'o', '(o) 16...Qe5', '16... Qe5 17 Qf3', { c: '16...Qe5 17.Qf3!' }],
  ['c10', 'p', 'p', '(p)', '13 Nb3 Qxc4 14 Qxe5 Bf8 15 Be3 f6 16 Qh5+ g6 17 Qf3', { a: '⩲', r: 'Neishtadt', c: '13.Nb3 Qxc4 14.Qxe5 Bf8 15.Be3 f6 16.Qh5+ g6 17.Qf3 dá às brancas jogo mais que suficiente pelo peão (Neishtadt).' }],
  ['c10-p', '1', 'p', '(p) 15...Qd5', '15... Qd5 16 Qg3 Bd6 17 f4', { a: '⩲', r: 'Gelfand–Salov, Madri 1996', c: 'Ou 15...Qd5 16.Qg3 Bd6 17.f4!, com bom jogo.' }],
  // Coluna 11
  ['c11', 'q', 'q', '(q)', '4... g6 5 Bxc4 Bg7 6 O-O O-O 7 Nc3 Nfd7 8 Qe2 Nb6 9 Bb3 Nc6 10 Rd1 Bg4 11 h3 Bxf3 12 Qxf3', { a: '⩲', r: 'Kramnik–Kamsky, Mônaco 1996', c: '4...g6 5.Bxc4 Bg7 6.O-O O-O 7.Nc3 Nfd7 (jogar como na Grünfeld é o melhor) 8.Qe2 Nb6 9.Bb3 Nc6 10.Rd1 Bg4 11.h3 Bxf3 12.Qxf3 é um pouco melhor para as brancas.' }],
  ['c11-q', '1', 'q', '(q) 7...c5', '7... c5 8 d5 Bg4 9 e4 Nbd7 10 Be2', { a: '⩲', c: '7...c5 8.d5 Bg4 9.e4 Nbd7 10.Be2 é um pouco melhor para as brancas.' }],
  ['c11', 'r-A', 'r', '(r) A', '7 Qb3 Bxf3 8 gxf3 Nbd7 9 Qxb7 c5 10 Nc3 cxd4 11 exd4 Bd6', { a: '∞', r: 'Tóth–Sápi, Hungria 1966', c: '7.Qb3 Bxf3 8.gxf3 Nbd7! 9.Qxb7 c5 10.Nc3 cxd4 11.exd4 Bd6 dá às pretas bom jogo pelo peão.' }],
  ['c11', 'r-B', 'r', '(r) B', '7 Nc3 Nbd7 8 O-O', { c: '7.Nc3 Nbd7 8.O-O transpõe para a coluna.' }],
  ['c11-r-B', '1', 'r', '(r) B 7...Nc6', '7... Nc6 8 Bb5', { a: '⩲', c: 'Mas não 7.Nc3 Nc6?! 8.Bb5, um pouco melhor para as brancas.' }],
  ['c11', 's', 's', '(s)', '8... Be7 9 Be2 O-O 10 e4 Nb6 11 Be3', { a: '⩲', r: 'Panchenko–Moskalenko, Simferopol 1990', c: '8...Be7 é passivo e deixa as brancas controlarem o centro depois de 9.Be2 O-O 10.e4 Nb6 11.Be3.' }],
  ['c11', 't', 't', '(t)', '10 Be2 O-O 11 dxe5 Nxe5 12 Nd4 Bc5 13 Nb3 Qxd1 14 Bxd1 Bb6', { a: '=', r: 'Antunes–Miles, Wijk aan Zee 1996', c: '10.Be2 O-O 11.dxe5 Nxe5 12.Nd4 Bc5 13.Nb3 Qxd1 14.Bxd1 Bb6 é igual.' }],
  ['c11', 'u', 'u', '(u)', '13 f4 Qd4+ 14 Qxd4 Bxd4+ 15 Kh2 Bxc3 16 bxc3 Bxe4 17 g5 Bd5 18 Re1+ Kf8 19 Bb5 a6 20 Ba4 b5 21 Ba3+ Kg8 22 gxf6 bxa4 23 Re5', { a: '±', r: 'Atalik–Meins, Bad Wiessee 2003', c: '13.f4! Qd4+ 14.Qxd4 Bxd4+ 15.Kh2 Bxc3 16.bxc3 Bxe4 17.g5 Bd5 18.Re1+ Kf8 19.Bb5 a6 20.Ba4 b5?! 21.Ba3+ Kg8 22.gxf6 bxa4 23.Re5: de qualquer modo as pretas estão sob pressão. (O Stockfish vai além: no fim da linha dá cerca de +5, vantagem decisiva.)' }],
  ['c11-u', '1', 'u', '(u) 17...Nd7', '17... Nd7 18 Re1 f5 19 gxf6 Nxf6 20 Bd3 Kf7 21 Rxe4', { a: '±', c: '17...Nd7 perde dois bispos por uma torre depois de 18.Re1 f5 19.gxf6 Nxf6 20.Bd3 Kf7 21.Rxe4.' }],
  // Coluna 12
  ['c12', 'v', 'v', '(v)', '13 Ne5 Bxe2 14 Nxc6 Bxd1 15 Nxe7+ Bxe7 16 Rfxd1', { a: '⩲', r: 'Taimanov', c: '13.Ne5! Bxe2 14.Nxc6 Bxd1 15.Nxe7+ Bxe7 16.Rfxd1 dá às brancas vantagem no final (Taimanov).' }],
]

const capitulo = {
  id: 'gda-b',
  arquivo: 'gda-b',
  nome: 'Gambito da Dama Aceito — 4.e3: 4...e6 e 4...Bg4',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Accepted (pp. 453–455), colunas 7–12',
  base: '1. d4 d5 2. c4 dxc4',
  corPadrao: 'b',
  ordem: 453,
  grupos: [
    { id: 'a6', nome: '6.O-O a6 (sem 7.Qe2)', colunas: [7, 8] },
    { id: 'nc6', nome: '6.O-O Nc6', colunas: [9] },
    { id: 'qe2', nome: '6.Qe2', colunas: [10] },
    { id: 'bg4', nome: '4...Bg4', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
