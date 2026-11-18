// Transcrição do MCO 15ª ed. — Índia do Rei, Clássica: 7...Nbd7, 7...Na6 e 7...exd4 (pp. 608–609), colunas 31–36.
// Gerar: node scripts/mco/gerar.cjs india-rei-f
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-f-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 31 (g) =, 32 (j) ⩲, 33 (n) ⩲, 34 (p) ⩲, 35 (t) ±, 36 (x) ⩲.
// Avaliações tiradas do texto: (h) A 9...a5 10.Nd2! "bom para as brancas" ficou ±; (i) "um pouco melhor para as
// brancas" ficou ⩲; (j) "pequena vantagem" ficou ⩲; (k) "pequena vantagem de final" e 9...Bg4 "favorece levemente as
// brancas" ficaram ⩲; (m) "vantagem para as brancas" ficou ⩲; (o) A "OK" ficou =; (o) B "favorece as brancas" ficou
// ⩲; (r) "pequena vantagem" ficou ⩲; (v) "contrajogo" ficou ∞; (x) "vantagem de espaço" ficou ⩲ e a partida terminou
// com o abandono das pretas.
// Sinais conferidos com zoom: (b), (c) B, (l), (n) ⩲; (w), (x) 16...Nf8 ±.
// Errata: (w) "22...fxg4" é impossível (as pretas não têm mais peão f, trocado em 16.gxf6); ficou 22...Bxg4, que
// também é o único lance que deixa possível o 24...Bxf5 do livro.

const F = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 Nf3 O-O 6 Be2 e5 7 O-O'
const D = `${F} Nbd7`
const A = `${F} Na6 8 Be3 Ng4 9 Bg5`
const X = `${F} exd4 8 Nxd4 Re8 9 f3`

const colunas = {
  c31: [`${D} 8 Qc2 c6 9 Be3 Ng4 10 Bg5 f6 11 Bd2 f5 12 dxe5 Ndxe5 13 Nxe5 Bxe5 14 Bxg4 fxg4 15 Ne2 Be6`, 'nbd7', '7...Nbd7 8.Qc2', '=',
    'O 7...Nbd7 é sólido, mas mais passivo que 7...Nc6; também se chega aqui por 6...Nbd7 e 7...e5. Depois de 8.Qc2 c6 9.Be3 Ng4 10.Bg5 f6 11.Bd2 f5 12.dxe5 Ndxe5 13.Nxe5 Bxe5 14.Bxg4 fxg4 15.Ne2 Be6 o jogo tende à igualdade.'],
  c32: [`${D} 8 Re1 c6 9 Bf1 exd4 10 Nxd4 Ng4 11 h3 Qb6 12 hxg4 Qxd4 13 Qc2 Qe5 14 Be3 Qe7 15 Rad1 Ne5`, 'nbd7', '8.Re1', '⩲',
    'Com 8.Re1 e 9.Bf1 as brancas reforçam e4. Depois de 9...exd4 10.Nxd4 Ng4!? 11.h3 Qb6 12.hxg4 Qxd4 13.Qc2 Qe5 14.Be3 Qe7 15.Rad1 Ne5 as pretas recuperam a peça, mas as brancas ficam um pouco melhor.'],
  c33: [`${A} f6 10 Bc1 Kh8 11 h3 Nh6 12 dxe5 dxe5 13 Qxd8 Rxd8 14 Be3 Be6 15 a3 Nf7`, 'na6', '7...Na6 8.Be3 Ng4 9.Bg5 f6', '⩲',
    'O 7...Na6 é flexível e foge da teoria principal. Depois de 8.Be3 Ng4 9.Bg5 f6 10.Bc1 Kh8 11.h3 Nh6 12.dxe5 dxe5 13.Qxd8 Rxd8 14.Be3 Be6 15.a3 Nf7 o final é um pouco melhor para as brancas: o cavalo de a6 está mal.'],
  c34: [`${A} Qe8 10 dxe5 dxe5 11 h3 h6 12 Bd2 Nf6 13 Be3 Qe7 14 Nd5 Qd8 15 Nxf6+ Qxf6`, 'na6', '9...Qe8!', '⩲',
    'O 9...Qe8! sai da cravada sem enfraquecer a ala do rei. Depois de 10.dxe5 dxe5 11.h3 h6 12.Bd2 Nf6 13.Be3 Qe7 14.Nd5 Qd8 15.Nxf6+ Qxf6 as brancas ficam um pouco melhor.'],
  c35: [`${X} Nc6 10 Be3 Nh5 11 Qd2 f5 12 Nxc6 bxc6 13 exf5 Bxf5 14 Bd4 Nf6 15 Rfe1 c5`, 'exd4', '7...exd4 8.Nxd4 Re8 9.f3 Nc6', '±',
    'Com 7...exd4 as pretas abrem o centro e pressionam e4. Depois de 8.Nxd4 Re8 9.f3 Nc6 10.Be3 Nh5 11.Qd2 f5 12.Nxc6 bxc6 13.exf5 Bxf5 14.Bd4 Nf6 15.Rfe1 c5 as brancas ficam melhor.'],
  c36: [`${X} c6 10 Kh1 Nh5 11 g4 Nf6 12 Bf4 h5 13 g5 Nh7 14 Qd2 Na6 15 Rad1 Qe7`, 'exd4', '9...c6 10.Kh1 Nh5!?', '⩲',
    'O 10...Nh5!? é provocativo: ameaça ...Qh4. Depois de 11.g4 Nf6 12.Bf4 h5 13.g5 Nh7 14.Qd2 Na6 15.Rad1 Qe7 as brancas têm vantagem de espaço.'],
}

const notas = [
  // Coluna 31
  ['c31', 'b', 'b', '(b)', '8... exd4 9 Nxd4 Re8 10 Be3 Nc5 11 f3 a5 12 Rad1 Qe7 13 Nb3', { a: '⩲', c: '8...exd4 9.Nxd4 Re8 10.Be3 Nc5 11.f3 a5 12.Rad1 Qe7 13.Nb3 é um pouco melhor para as brancas; depois de ...c6 o peão de d6 vira alvo.' }],
  ['c31', 'c-A', 'c', '(c) A', '9 dxe5 dxe5', { c: '9.dxe5 dxe5 entrega às pretas o controle duradouro de d4.' }],
  ['c31', 'c-B', 'c', '(c) B', '9 Rd1 Qe7 10 Rb1 exd4 11 Nxd4 Re8 12 f3 d5 13 cxd5 cxd5 14 Ncb5 Nc5 15 e5', { a: '⩲', r: 'Novik–Monin, Rússia 1994', c: '9.Rd1!? Qe7 10.Rb1 exd4 11.Nxd4 Re8 12.f3 d5 13.cxd5 cxd5 14.Ncb5!? Nc5 15.e5 é um pouco melhor para as brancas.' }],
  ['c31-c-B', '1', 'c', '(c) B 9...Qc7', '9... Qc7', { c: '9...Qc7 também é jogável.' }],
  ['c31', 'd', 'd', '(d)', '11 Bh4 Qe7 12 b4 Re8 13 d5 Nh6 14 dxc6 bxc6 15 b5', { c: '11.Bh4!? Qe7 12.b4 Re8 13.d5 Nh6 14.dxc6!? bxc6 15.b5 também é interessante: as brancas dominam casas importantes.' }],
  ['c31', 'e', 'e', '(e)', '11... Nh6', { c: '11...Nh6, seguido de ...Nf7 e só depois ...f5, é mais sólido.' }],
  ['c31', 'f', 'f', '(f)', '12 Bg5 Bf6 13 Bxf6 Qxf6 14 dxe5 Ndxe5 15 Nxe5 Nxe5 16 f4', { a: '⩲', c: '12.Bg5 Bf6 13.Bxf6 Qxf6 14.dxe5 Ndxe5 15.Nxe5 Nxe5 16.f4 é um pouco melhor para as brancas, que têm mais espaço.' }],
  ['c31-f', '1', 'f', '(f) 14.Rad1', '14 Rad1', { c: '14.Rad1 também é promissor.' }],
  ['c31', 'g', 'g', '(g)', '16 Rad1 Qh4 17 g3 Qe7 18 Bf4 Rad8 19 b3 Bf7', { a: '=', r: 'Uhlmann–Knaak, Leipzig 1986', c: '16.Rad1 Qh4 17.g3 Qe7 18.Bf4 Rad8 19.b3 Bf7 leva a uma posição mais ou menos igual.' }],
  // Coluna 32
  ['c32', 'h-A', 'h', '(h) A', '8 d5 Nc5 9 Nd2 a5 10 b3 Ne8 11 Rb1 f5 12 a3 fxe4 13 Ndxe4 Nxe4 14 Nxe4', { a: '⩲', c: '8.d5 Nc5 9.Nd2 a5 10.b3 Ne8 11.Rb1 f5 12.a3 fxe4 13.Ndxe4 Nxe4 14.Nxe4 é um pouco melhor para as brancas.' }],
  ['c32-h-A', '1', 'h', '(h) A 10...Bd7', '10... Bd7', { c: '10...Bd7 merece atenção: depois de Rb1 e b4 o cavalo vai a a4.' }],
  ['c32-h-A', '2', 'h', '(h) A 11.Bb2', '10... Bd7 11 Bb2 Bh6', { c: 'Contra 11.Bb2 as pretas respondem 11...Bh6.' }],
  ['c32-h-A', '3', 'h', '(h) A 12.f3?', '12 f3 Bh6', { c: '12.f3? é ruim por causa de 12...Bh6!.' }],
  ['c32-h-A', '4', 'h', '(h) A 12...Nf6', '12... Nf6', { c: '12...Nf6 talvez seja melhor.' }],
  ['c32-h-A', '5', 'h', '(h) A 9.Bg5', '9 Bg5 h6 10 Bxf6 Bxf6 11 b4 Na6 12 a3 Bg7', { c: 'Contra 9.Bg5 o certo é 9...h6! 10.Bxf6 Bxf6 11.b4 Na6 12.a3 Bg7: as pretas depois jogam nas casas escuras.' }],
  ['c32-h-A-5', '1', 'h', '(h) A 9...a5', '9... a5 10 Nd2', { a: '±', c: '9...a5 10.Nd2! é bom para as brancas.' }],
  ['c32', 'h-B', 'h', '(h) B', '8 dxe5', { c: '8.dxe5?! dá às pretas o controle de d4 por muito tempo.' }],
  ['c32', 'h-C', 'h', '(h) C', '8 Be3 c6 9 Qc2', { c: '8.Be3! é muito jogado e pode transpor para a coluna anterior, por exemplo 8...c6 9.Qc2.' }],
  ['c32', 'i', 'i', '(i)', '11 Qxg4 Bxd4 12 Qd1 Qf6 13 Be3', { a: '⩲', c: '11.Qxg4 Bxd4 12.Qd1 Qf6 13.Be3 é um pouco melhor para as brancas.' }],
  ['c32', 'j', 'j', '(j)', '16 f3 Be6 17 b3 b6 18 Qd2 Rad8 19 g5 f6 20 Rc1 fxg5 21 Bxg5 Bf6 22 Bxf6 Qxf6 23 Qh6', { a: '⩲', r: 'Agzamov–Knaak, Tunja 1984', c: '16.f3 Be6 17.b3 b6 18.Qd2 Rad8 19.g5 f6 20.Rc1 fxg5 21.Bxg5 Bf6 22.Bxf6 Qxf6 23.Qh6 deu uma pequena vantagem às brancas.' }],
  // Coluna 33
  ['c33', 'k', 'k', '(k)', '8 Re1 c6 9 Bf1 exd4 10 Nxd4 Ng4 11 h3 Qb6 12 hxg4 Qxd4 13 g5 Qxd1 14 Rxd1 Nc5 15 f3 Be5 16 Rb1 a5 17 Ne2 Re8 18 Be3 b6 19 b3', { a: '⩲', r: 'Kožul–Smirin, Šibenik 2006', c: 'O 7...Na6 é mais agudo que 7...Nbd7. Contra 8.Re1 c6 9.Bf1 exd4 10.Nxd4 Ng4 11.h3 Qb6 12.hxg4 Qxd4 13.g5 Qxd1 14.Rxd1 Nc5 15.f3 Be5 16.Rb1 a5 17.Ne2 Re8 18.Be3 b6 19.b3 as brancas têm só uma pequena vantagem no final.' }],
  ['c33-k', '1', 'k', '(k) 9...Bg4', '9... Bg4 10 d5 c5 11 h3 Bd7', { a: '⩲', c: '9...Bg4 10.d5 c5!? 11.h3 Bd7 fecha o jogo, mas favorece levemente as brancas.' }],
  ['c33', 'l', 'l', '(l)', '10 Bh4 Nh6 11 d5 g5 12 Bg3 f5 13 exf5', { a: '⩲', c: '10.Bh4 Nh6 11.d5 g5 12.Bg3 f5 13.exf5 é um pouco melhor para as brancas, que controlam e4.' }],
  ['c33', 'm', 'm', '(m)', '12... fxe5 13 Be3', { a: '⩲', c: 'Tomar com o peão f (12...fxe5) dá vantagem às brancas depois de 13.Be3.' }],
  ['c33', 'n', 'n', '(n)', '16 b4 c6 17 Rfd1', { a: '⩲', r: 'Kramnik–Topalov, Novgorod 1997', c: '16.b4 c6 17.Rfd1 é um pouco melhor para as brancas: o cavalo de a6 está mal colocado.' }],
  // Coluna 34
  ['c34', 'o-A', 'o', '(o) A', '11... f6 12 Bd2 Nh6 13 Be3 c6 14 c5 Nf7', { a: '=', c: 'A tentativa moderna e mais aguda é 11...f6!? 12.Bd2 Nh6; contra 13.Be3, 13...c6 14.c5 Nf7 está bem para as pretas.' }],
  ['c34-o-A', '1', 'o', '(o) A 13.c5', '13 c5 Nxc5 14 Qc1 Nf7 15 Nd5 Ne6 16 Nxc7 Nxc7 17 Qxc7 Nd8 18 Rfc1 Be6', { a: '=', r: 'M. Gurevich–López Martínez, Andorra 2004', c: '13.c5!? Nxc5 14.Qc1 Nf7 15.Nd5 Ne6 16.Nxc7 Nxc7 17.Qxc7 Nd8! 18.Rfc1 Be6 leva à igualdade.' }],
  ['c34', 'o-B', 'o', '(o) B', '11... Nf6 12 Be3 b6 13 a3 Bb7 14 Qc2 Nc5 15 Bxc5 bxc5 16 Nd2', { a: '⩲', c: '11...Nf6 12.Be3 b6 13.a3 Bb7 14.Qc2 Nc5 15.Bxc5 bxc5 16.Nd2 favorece as brancas: os peões pretos ficam fracos.' }],
  ['c34', 'p', 'p', '(p)', '16 c5 Nb8 17 b4', { a: '⩲', r: 'A. Spielman–Gallagher, França 2003', c: '16.c5 Nb8 17.b4 é um pouco melhor para as brancas.' }],
  // Coluna 35
  ['c35', 'q', 'q', '(q)', '10 Nxc6 bxc6', { c: '10.Nxc6 bxc6 abre linhas para as pretas; as brancas devem adiar essa troca.' }],
  ['c35', 'r', 'r', '(r)', '11... Nf4 12 Rf2 Nxe2+ 13 Rxe2 Ne5 14 b3 a6 15 Bg5 f6 16 Bh4', { a: '⩲', r: 'Pelletier–Glek, Zurique 2001', c: '11...Nf4 12.Rf2 Nxe2+ 13.Rxe2 Ne5 14.b3 a6 15.Bg5 f6 16.Bh4 dá só uma pequena vantagem às brancas.' }],
  ['c35', 's', 's', '(s)', '14 g4 Bxc3 15 Qxc3 Qe7 16 Kf2 Qh4+', { a: '=', c: '14.g4? Bxc3! 15.Qxc3 Qe7 16.Kf2 Qh4+ leva à igualdade.' }],
  ['c35', 't', 't', '(t)', '16 Bf2 Qb8 17 Rad1 Qb4 18 g4 Be6 19 Nb5 Qxd2 20 Rxd2 Rec8 21 Bd3', { a: '±', r: 'Khuzman–Svidler, Haifa 1996', c: '16.Bf2 Qb8 17.Rad1 Qb4? 18.g4! Be6 19.Nb5 Qxd2 20.Rxd2 Rec8 21.Bd3 é melhor para as brancas.' }],
  ['c35-t', '1', 't', '(t) 17...Qb7', '17... Qb7', { a: '⩲', c: '17...Qb7 era melhor, mas as brancas ainda ficam um pouco melhor.' }],
  // Coluna 36
  ['c36', 'v', 'v', '(v)', '11 f4 Nf6 12 Bf3 Bg4', { a: '∞', c: '11.f4 Nf6 12.Bf3 Bg4 dá contrajogo às pretas contra o peão de e4.' }],
  ['c36-v', '1', 'v', '(v) 12...Na6', '12... Na6', { a: '∞', c: '12...Na6 também dá contrajogo.' }],
  ['c36', 'w', 'w', '(w)', '14... Nd7 15 Be3 f6 16 gxf6 Qxf6 17 Rg1 Ne5 18 Raf1 Bh3 19 Rf2 Rf8 20 Rg3 Qh4 21 f4 Ng4 22 Bxg4 Bxg4 23 f5 gxf5 24 Nxf5 Bxf5 25 exf5', { a: '±', r: 'Shneider–Epishin, Uzhgorod 1987', c: '14...Nd7 15.Be3 f6 16.gxf6 Qxf6 17.Rg1 Ne5 18.Raf1 Bh3 19.Rf2 Rf8 20.Rg3 Qh4 21.f4 Ng4 22.Bxg4 Bxg4 23.f5 gxf5 24.Nxf5 Bxf5 25.exf5 é melhor para as brancas. (O livro imprime "22...fxg4".)' }],
  ['c36', 'x', 'x', '(x)', '16 Rg1 Be5 17 Be3 Bh3 18 f4 Bg7 19 f5 Be5 20 Qe1 Nc5 21 Qh4 Bxd4 22 Bxd4 Nxe4 23 fxg6 fxg6 24 Qxh3 Nxc3 25 Qxc3 c5 26 Bh8 Nxg5 27 Rxg5 Kh7 28 Bd3', { a: '⩲', r: 'Sarkar–Markzon, Filadélfia 2005', c: 'As brancas têm vantagem de espaço. Na partida seguiu 16.Rg1 Be5 17.Be3 Bh3 18.f4 Bg7 19.f5! Be5 20.Qe1 Nc5 21.Qh4 Bxd4 22.Bxd4 Nxe4 23.fxg6 fxg6 24.Qxh3 Nxc3 25.Qxc3! c5 26.Bh8 Nxg5 27.Rxg5 Kh7 28.Bd3 e as pretas abandonaram.' }],
  ['c36-x', '1', 'x', '(x) 16...Nf8', '16... Nf8 17 a3 Bd7 18 Ndb5 d5 19 Nd6 d4 20 Nxe8', { a: '±', c: '16...Nf8 17.a3 Bd7 18.Ndb5! d5 19.Nd6 d4 20.Nxe8 é melhor para as brancas.' }],
]

const capitulo = {
  id: 'india-rei-f',
  arquivo: 'india-rei-f',
  nome: 'Índia do Rei — 7...Nbd7, 7...Na6 e 7...exd4',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 608–609), colunas 31–36",
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O',
  corPadrao: 'b',
  ordem: 608,
  grupos: [
    { id: 'nbd7', nome: '7...Nbd7', colunas: [31, 32] },
    { id: 'na6', nome: '7...Na6', colunas: [33, 34] },
    { id: 'exd4', nome: '7...exd4', colunas: [35, 36] },
  ],
}

module.exports = { capitulo, colunas, notas }
