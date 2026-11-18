// Transcrição do MCO 15ª ed. — Defesa Índia da Dama, 4.g3 Ba6 (pp. 578–579), colunas 31–36.
// Gerar: node scripts/mco/gerar.cjs india-dama-f
// Formato: ver gambito-do-rei.cjs. Dicas em india-dama-f-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Avaliações tiradas do texto: (e) 13.bxc4 "com compensação pelo peão" ficou =; (m) B "as brancas ganham uma
// pequena vantagem" ficou ⩲; (o) "um bom domínio pelo peão" ficou ⩲; (p) "chances para os dois lados" ficou ∞.
// Sinais conferidos com zoom: (h) ±; (b), (c), (d), (i), (j), (k), (l), (r) ⩲.
// Notas só com comentário: (a), (j) 8.Bd2, (o) 17...h5.
// Errata: na nota (f) o livro dá "20...Rxb2", impossível (a torre está em c8); trocado por 20...Nxb2, a única captura em b2.
// Notação: (j) 12.Nbd2 virou 12.Nd2 (o cavalo de c4 está cravado pelo bispo de a6).

const F = '1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 g3 Ba6'

const colunas = {
  c31: [`${F} 5 b3 Bb4+ 6 Bd2 Be7 7 Nc3 O-O 8 e4 d5 9 cxd5 Bxf1 10 Kxf1 exd5 11 e5 Ne4 12 Kg2 Qd7`, 'bb4', '5.b3 Bb4+ 6.Bd2 Be7 7.Nc3', '⩲',
    'O fianqueto exagerado de Nimzovich: 4...Ba6 ataca c4. Depois de 5.b3 Bb4+ 6.Bd2 Be7 o bispo branco fica mal em d2. Com 7.Nc3 O-O 8.e4 d5 9.cxd5 Bxf1 10.Kxf1 exd5 11.e5 Ne4 12.Kg2 Qd7 as brancas ficam um pouco melhor.'],
  c32: [`${F} 5 b3 Bb4+ 6 Bd2 Be7 7 Bg2 c6 8 Bc3 d5 9 Ne5 Nfd7 10 Nxd7 Nxd7 11 Nd2 O-O 12 O-O Rc8`, 'bb4', '7.Bg2', '=',
    'Com 7.Bg2 c6 8.Bc3 d5 as pretas montam uma defesa sólida. Depois de 9.Ne5 Nfd7 10.Nxd7 Nxd7 11.Nd2 O-O 12.O-O Rc8 o jogo é igual.'],
  c33: [`${F} 5 b3 Bb7 6 Bg2 Bb4+ 7 Bd2 a5 8 O-O O-O 9 Qc2 Na6 10 Bg5 Be7 11 Nc3 Nb4 12 Qb2 h6`, 'b3', '5...Bb7', '⩲',
    'Com 5...Bb7 o bispo volta à grande diagonal, agora que b3 enfraqueceu c3. Depois de 6.Bg2 Bb4+ 7.Bd2 a5 8.O-O O-O 9.Qc2 Na6 10.Bg5 Be7 11.Nc3 Nb4 12.Qb2 h6 as brancas ficam um pouco melhor.'],
  c34: [`${F} 5 b3 b5 6 cxb5 Bxb5 7 Bg2 Bb4+ 8 Bd2 a5 9 O-O O-O 10 a3 Be7 11 Nc3 Bc6 12 Qc2 d5`, 'b3', '5...b5', '⩲',
    'Com 5...b5 as pretas desafiam c4 de imediato. Depois de 6.cxb5 Bxb5 7.Bg2 Bb4+ 8.Bd2 a5 9.O-O O-O 10.a3 Be7 11.Nc3 Bc6 12.Qc2 d5 as brancas ficam um pouco melhor.'],
  c35: [`${F} 5 Nbd2 c5 6 e4 cxd4 7 e5 Ng4 8 h3 Nh6 9 Bg2 Nc6 10 O-O Be7 11 Qa4 Bb7 12 Nxd4 Qc7`, 'outros', '5.Nbd2', '∞',
    'Com 5.Nbd2 as brancas defendem c4 com o cavalo. Depois de 5...c5 6.e4 cxd4 7.e5 Ng4 8.h3 Nh6 9.Bg2 Nc6 10.O-O Be7 11.Qa4 Bb7 12.Nxd4 Qc7 há chances para os dois lados.'],
  c36: [`${F} 5 Qb3 Nc6 6 Nbd2 Na5 7 Qa4 Bb7 8 Bg2 c5 9 dxc5 bxc5 10 O-O Qc7 11 Rd1 Be7 12 Ng5 Bxg2`, 'outros', '5.Qb3', '=',
    'Com 5.Qb3 a dama defende c4. Depois de 5...Nc6 6.Nbd2 Na5 7.Qa4 Bb7 8.Bg2 c5 9.dxc5 bxc5 10.O-O Qc7 11.Rd1 Be7 12.Ng5 Bxg2 o jogo é igual.'],
}

const notas = [
  // Coluna 31
  ['c31', 'a', 'a', '(a)', '6... Bxd2+ 7 Qxd2', { c: '6...Bxd2+ 7.Qxd2 transpõe para a coluna 29.' }],
  ['c31', 'b', 'b', '(b)', '7... d5 8 cxd5 exd5 9 Bg2 O-O 10 O-O c6 11 Ne5 Bb7 12 Re1', { a: '⩲', r: 'Mamedyarov–Gallego, Varsóvia 2005', c: '7...d5 8.cxd5 exd5 9.Bg2 O-O 10.O-O c6 11.Ne5 Bb7 12.Re1 é um pouco melhor para as brancas.' }],
  ['c31', 'c', 'c', '(c)', '13 Qe2 Nxc3 14 Bxc3 c5 15 Rad1 Nc6 16 Rd2 Qe6 17 Rhd1 Rfd8 18 Ng1 Rac8 19 Nh3', { a: '⩲', r: 'Hjartarson–L.B. Hansen, Copenhague 1997', c: '13.Qe2 Nxc3 14.Bxc3 c5 15.Rad1 Nc6 16.Rd2 Qe6 17.Rhd1 Rfd8 18.Ng1 Rac8 19.Nh3! é um pouco melhor para as brancas.' }],
  // Coluna 32
  ['c32', 'd', 'd', '(d)', '7... d5 8 Ne5 Bb7 9 O-O O-O 10 Nc3 Na6 11 cxd5 exd5 12 Rc1 h6 13 Bf4', { a: '⩲', r: 'Beliavsky–Psakhis, Novosibirsk 1993', c: '7...d5 8.Ne5 Bb7 9.O-O O-O 10.Nc3 Na6 11.cxd5 exd5 12.Rc1 h6 13.Bf4 é um pouco melhor para as brancas.' }],
  ['c32', 'e', 'e', '(e)', '9 Nbd2 Nbd7 10 O-O O-O 11 Re1 c5 12 e4 dxc4 13 Nxc4 Bb7 14 e5 Ne4', { a: '=', r: 'Votava–Naiditsch, Bundesliga 2005', c: '9.Nbd2 Nbd7 10.O-O O-O 11.Re1 c5 12.e4 dxc4! 13.Nxc4 Bb7 14.e5 Ne4 leva à igualdade.' }],
  ['c32-e', '1', 'e', '(e) 13.bxc4', '13 bxc4 cxd4 14 Nxd4 Ne5 15 Nxe6 fxe6 16 Bxe5 Bc5', { a: '=', c: '13.bxc4 cxd4 14.Nxd4 Ne5! 15.Nxe6 fxe6 16.Bxe5 Bc5 dá às pretas compensação pelo peão.' }],
  ['c32', 'f', 'f', '(f)', '13 e4 c5 14 exd5 exd5 15 dxc5 dxc4 16 c6 cxb3 17 Re1 b2 18 Bxb2 Nc5 19 Nb3 Nd3 20 Re2 Nxb2', { a: '=', r: 'Topalov–Leko, Linares 2007', c: '13.e4 c5 14.exd5 exd5 15.dxc5 dxc4 16.c6 cxb3 17.Re1 b2 18.Bxb2 Nc5 19.Nb3 Nd3 20.Re2 Nxb2 leva à igualdade. (O livro dá "20...Rxb2", mas a torre de c8 não chega a b2; o lance legal é 20...Nxb2.)' }],
  // Coluna 33
  ['c33', 'g', 'g', '(g)', '9 Bc3 d5 10 cxd5 Bxd5 11 a3 Bd6', { a: '=', r: 'Novikov–Zhang Zhong, Mundial por Equipes 2005', c: '9.Bc3 d5 10.cxd5 Bxd5 11.a3 Bd6 leva à igualdade.' }],
  ['c33', 'h', 'h', '(h)', '9... c5 10 dxc5 Bxc5 11 Nc3 d5 12 cxd5 exd5 13 Rad1 Na6 14 Qb1 Re8 15 Bg5', { a: '±', r: 'P. Nikolić–Korchnoi, Tilburg 1987', c: '9...c5 10.dxc5 Bxc5 11.Nc3 d5?! 12.cxd5 exd5 13.Rad1 Na6 14.Qb1 Re8 15.Bg5 é melhor para as brancas.' }],
  ['c33', 'i', 'i', '(i)', '13 Bxf6 Bxf6 14 a3 Nc6 15 Qd2 d5 16 cxd5 exd5 17 e3', { a: '⩲', r: 'Anand–Karpov, Frankfurt 1998', c: '13.Bxf6 Bxf6 14.a3 Nc6 15.Qd2 d5 16.cxd5 exd5 17.e3 é um pouco melhor para as brancas.' }],
  // Coluna 34
  ['c34', 'j', 'j', '(j)', '5... d5 6 Bg2 dxc4 7 Ne5 Bb4+ 8 Kf1 Bd6 9 Nxc4 Nd5 10 e4 Ne7 11 Bb2 Nbc6 12 Nd2 e5 13 d5', { a: '⩲', r: 'Huzman–Kasparov, Tel Aviv 1998', c: '5...d5 6.Bg2 dxc4 7.Ne5 Bb4+ 8.Kf1! Bd6 9.Nxc4 Nd5 10.e4 Ne7 11.Bb2 Nbc6 12.Nd2 e5 13.d5 é um pouco melhor para as brancas.' }],
  ['c34-j', '1', 'j', '(j) 8.Bd2', '8 Bd2 cxb3', { c: '8.Bd2 é respondido por 8...cxb3!.' }],
  ['c34', 'k-A', 'k', '(k) A', '7... d5 8 Nc3 Ba6 9 O-O Nbd7 10 Bb2 c5 11 Rc1 Rc8 12 Na4 cxd4 13 Nxd4', { a: '⩲', r: 'Akesson–Stocek, Antália 2004', c: '7...d5 8.Nc3 Ba6 9.O-O Nbd7 10.Bb2 c5 11.Rc1 Rc8 12.Na4 cxd4 13.Nxd4 é um pouco melhor para as brancas.' }],
  ['c34', 'k-B', 'k', '(k) B', '7... Bc6 8 O-O Be7 9 Bg5 O-O 10 Nc3', { a: '⩲', c: '7...Bc6 8.O-O Be7 9.Bg5 O-O 10.Nc3 é um pouco melhor para as brancas.' }],
  ['c34', 'k-C', 'k', '(k) C', '7... c5 8 O-O Bc6 9 Ba3 Na6 10 Nbd2 Be7 11 Rc1 cxd4 12 Bxe7 Qxe7 13 Nc4 O-O 14 Qxd4', { a: '⩲', r: 'van der Sterren–Timman, Campeonato Holandês 1987', c: '7...c5 8.O-O Bc6 9.Ba3 Na6 10.Nbd2 Be7 11.Rc1 cxd4 12.Bxe7 Qxe7 13.Nc4 O-O 14.Qxd4 é um pouco melhor para as brancas.' }],
  ['c34', 'l', 'l', '(l)', '13 Ne5 Bb7 14 Na4 Nfd7 15 Nd3', { a: '⩲', r: 'Tkachiev–Nisipeanu, match 2000', c: '13.Ne5 Bb7 14.Na4 Nfd7 15.Nd3 é um pouco melhor para as brancas.' }],
  // Coluna 35
  ['c35', 'm-A', 'm', '(m) A', '5... Bb7 6 Bg2 Be7 7 e4 Nxe4 8 Ne5 Bb4 9 Qg4 O-O 10 Bxe4 f5 11 Bxb7 fxg4 12 Bxa8 c6', { a: '=', r: 'Ivanchuk–Timman, Amsterdã 1994', c: 'Também é bom 5...Bb7 6.Bg2 Be7 7.e4 Nxe4 8.Ne5 Bb4 9.Qg4 O-O 10.Bxe4 f5 11.Bxb7 fxg4 12.Bxa8 c6, com igualdade.' }],
  ['c35-m-A', '1', 'm', '(m) A 7.O-O', '7 O-O O-O 8 Qc2 d5', { a: '=', c: '7.O-O O-O 8.Qc2 d5 leva à igualdade.' }],
  ['c35', 'm-B', 'm', '(m) B', '5... Bb7 6 Bg2 c5 7 e4 cxd4 8 O-O d6 9 Nxd4 Qd7 10 a4 Be7 11 a5', { a: '⩲', r: 'Yermolinsky–A. Ivanov, Campeonato dos EUA 1997', c: 'Mas as brancas ganham uma pequena vantagem com 5...Bb7 6.Bg2 c5 7.e4 cxd4 8.O-O! d6 9.Nxd4 Qd7 10.a4 Be7 11.a5.' }],
  ['c35', 'n', 'n', '(n)', '6 Bg2 Nc6 7 dxc5 bxc5 8 O-O Bb7', { a: '=', r: 'Hellsten–Hjartarson, Bermudas 1997', c: '6.Bg2 Nc6! 7.dxc5 bxc5 8.O-O Bb7 leva à igualdade.' }],
  ['c35-n', '1', 'n', '(n) 7.Ne5', '7 Ne5 Nxd4 8 Bxa8 Qxa8', { a: '=', c: '7.Ne5 Nxd4 8.Bxa8 Qxa8 leva à igualdade.' }],
  ['c35', 'o', 'o', '(o)', '11 a3 Nf5 12 b4 Bb7 13 g4 Nh4 14 Nxh4 Bxh4 15 Ne4 Be7 16 Bf4 Rc8 17 Qd3 Qc7 18 Qg3', { a: '⩲', r: 'Schneider–Handke, Paris 2001', c: '11.a3 Nf5 12.b4 Bb7 13.g4 Nh4 14.Nxh4 Bxh4 15.Ne4 Be7 16.Bf4!? Rc8 17.Qd3 Qc7?! 18.Qg3 dá às brancas um bom domínio pelo peão.' }],
  ['c35-o', '1', 'o', '(o) 17...h5', '17... h5', { c: '17...h5!? era uma alternativa a 17...Qc7.' }],
  ['c35', 'p', 'p', '(p)', '13 Nb5 Qb8 14 Ne4 Nf5 15 Bf4 Nxe5 16 Rad1 f6 17 g4 a6', { a: '∞', r: 'Grivas–Kalesis, Karditsa 1994', c: '13.Nb5 Qb8 14.Ne4 Nf5 15.Bf4 Nxe5 16.Rad1 f6 17.g4 a6 dá chances para os dois lados.' }],
  // Coluna 36
  ['c36', 'q', 'q', '(q)', '5 Qa4 Bb7 6 Bg2 c5 7 dxc5 Bxc5 8 O-O Be7 9 Nc3 Na6 10 Bf4 O-O 11 Rfd1 Nc5 12 Qc2 Qc8 13 Rac1 Nce4', { a: '=', r: 'Piket–Karpov, match 1999', c: '5.Qa4 Bb7 6.Bg2 c5 7.dxc5 Bxc5 8.O-O Be7 9.Nc3 Na6 10.Bf4 O-O 11.Rfd1 Nc5 12.Qc2 Qc8 13.Rac1 Nce4 leva à igualdade.' }],
  ['c36', 'r', 'r', '(r)', '10... Be7 11 Ne5 Bxg2 12 Kxg2 O-O 13 Ndf3 d6 14 Bd2 dxe5 15 Bxa5', { a: '⩲', r: 'Soriz–Z. Almasi, Buenos Aires 1996', c: '10...Be7 11.Ne5! Bxg2 12.Kxg2 O-O 13.Ndf3 d6 14.Bd2 dxe5 15.Bxa5 é um pouco melhor para as brancas.' }],
  ['c36', 's', 's', '(s)', '13 Kxg2 Rb8 14 Qc2 Qb7+', { a: '=', r: 'Khalifman–Adams, Halkidiki 2002', c: '13.Kxg2 Rb8 14.Qc2 Qb7+ leva à igualdade.' }],
]

const capitulo = {
  id: 'india-dama-f',
  arquivo: 'india-dama-f',
  nome: 'Índia da Dama — 4.g3 Ba6',
  fonte: 'Modern Chess Openings — Queen\'s Indian Defense (pp. 578–579), colunas 31–36',
  base: '1. d4 Nf6 2. c4 e6 3. Nf3 b6',
  corPadrao: 'b',
  ordem: 578,
  grupos: [
    { id: 'bb4', nome: '5.b3 Bb4+', colunas: [31, 32] },
    { id: 'b3', nome: '5.b3, outras', colunas: [33, 34] },
    { id: 'outros', nome: '5.Nbd2 e 5.Qb3', colunas: [35, 36] },
  ],
}

module.exports = { capitulo, colunas, notas }
