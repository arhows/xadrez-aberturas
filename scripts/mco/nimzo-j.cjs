// Transcrição do MCO 15ª ed. — Defesa Nimzo-Índia, 4.f3 e Variante Leningrado (pp. 559–560), colunas 55–60.
// Gerar: node scripts/mco/gerar.cjs nimzo-j
// Formato: ver gambito-do-rei.cjs. Dicas em nimzo-j-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Avaliações tiradas do texto: (d) "as brancas ficam claramente melhor" ficou ±, e "ganhando" ficou +−;
// (e) B "chances um pouco melhores para as brancas numa posição confusa" ficou ⩲;
// (i) "grande vantagem" ficou ±; (t) "chances mais ou menos iguais" ficou =.
// Notas só com comentário: (a), (k) 17...gxf3, (t) 12.Bf5.
// Nota (a): o livro escreve "5...Bxc3+ 6 bxc3 d5", mas ...d5 já foi jogado no 4º lance; a linha termina em 6.bxc3.
// Notação: em (s) o livro escreve 10.Nge2, mas o cavalo de c3 está cravado; ficou 10.Ne2.

const F = '1 d4 Nf6 2 c4 e6 3 Nc3 Bb4'

const colunas = {
  c55: [`${F} 4 f3 d5 5 a3 Be7 6 e4 dxe4 7 fxe4 e5 8 d5 Bc5 9 Nf3 Ng4 10 Na4 Bf2+ 11 Ke2 Bh4`, 'f3', '4.f3 d5 5.a3 Be7?!', '±',
    'Com 4.f3 as brancas preparam e4 sem gastar tempo com a3. A defesa mais segura é 5...Bxc3+, que volta à Sämisch; com 5...Be7?! as brancas tomam o centro: 6.e4 dxe4 7.fxe4 e5 8.d5 Bc5 9.Nf3! Ng4 10.Na4 Bf2+ 11.Ke2 Bh4, e com 12.g3 as brancas ficam claramente melhor.'],
  c56: [`${F} 4 f3 c5 5 d5 b5 6 e4 bxc4 7 Bxc4 Nxd5 8 Bxd5 exd5 9 Qxd5 Nc6 10 Ne2 Ba6 11 Kf2 O-O`, 'f3', '4...c5 5.d5 b5', '=',
    'Com 4...c5 5.d5 b5 as pretas abrem o jogo como num Gambito Benko. Depois de 6.e4 bxc4 7.Bxc4 Nxd5! 8.Bxd5 exd5 9.Qxd5 Nc6 10.Ne2 Ba6 11.Kf2 O-O as pretas têm desenvolvimento pelo peão, e o jogo é igual.'],
  c57: [`${F} 4 Bg5 h6 5 Bh4 c5 6 d5 d6 7 e3 Bxc3+ 8 bxc3 e5 9 f3 Nbd7 10 Bd3 Qe7 11 Qb1 Kd8`, 'leningrado', 'Leningrado 4...h6 8...e5', '=',
    'A Variante Leningrado, 4.Bg5, crava o cavalo de f6. Com 4...h6 5.Bh4 c5 6.d5 d6 7.e3 Bxc3+ 8.bxc3 e5 as pretas fecham o centro e deixam o bispo de h4 sem jogo. Depois de 9.f3 Nbd7 10.Bd3 Qe7 11.Qb1 Kd8 o rei preto vai para c7, e o jogo é igual.'],
  c58: [`${F} 4 Bg5 h6 5 Bh4 c5 6 d5 d6 7 e3 Bxc3+ 8 bxc3 Qe7 9 Nf3 Nbd7 10 Nd2 O-O 11 Be2 Ne5`, 'leningrado', '8...Qe7', '⩲',
    'Com 8...Qe7 as pretas adiam ...e5. Depois de 9.Nf3 Nbd7 10.Nd2 O-O 11.Be2 Ne5, com 12.Ne4! as brancas ficam um pouco melhor.'],
  c59: [`${F} 4 Bg5 h6 5 Bh4 c5 6 d5 b5 7 dxe6 fxe6 8 cxb5 d5 9 e3 O-O 10 Bd3 d4 11 exd4 cxd4`, 'leningrado', '6...b5', '⩲',
    'Com 6...b5 as pretas entregam um peão para ganhar o centro. Depois de 7.dxe6 fxe6 8.cxb5 d5 9.e3 O-O 10.Bd3 d4 11.exd4 cxd4, com 12.a3 as brancas ficam um pouco melhor.'],
  c60: [`${F} 4 Bg5 c5 5 d5 d6 6 e3 exd5 7 cxd5 Nbd7 8 Bd3 Qa5 9 Ne2 Nxd5 10 O-O Bxc3 11 bxc3 c4`, 'leningrado', '4...c5', '=',
    'Com 4...c5 5.d5 d6 6.e3 exd5 7.cxd5 Nbd7 8.Bd3 Qa5 as pretas pressionam c3 e o peão de d5. Depois de 9.Ne2 Nxd5 10.O-O Bxc3 11.bxc3 c4! as chances são mais ou menos iguais.'],
}

const notas = [
  // Coluna 55
  ['c55', 'a', 'a', '(a)', '5... Bxc3+ 6 bxc3', { c: 'A defesa mais segura das pretas é 5...Bxc3+ 6.bxc3, que transpõe para a Variante Sämisch, coluna 49. É por isso que 4.f3 é pouco usado.' }],
  ['c55', 'b', 'b', '(b)', '6... c5 7 cxd5 exd5 8 e5 Nfd7 9 Nxd5 cxd4 10 Nxe7 Qxe7 11 f4 Nc6 12 Nf3 O-O 13 b4 a6 14 Bd3', { a: '±', r: 'Milov–Arbakov, Biel 1993', c: '6...c5 7.cxd5 exd5 8.e5 Nfd7 9.Nxd5 cxd4 10.Nxe7 Qxe7 11.f4 Nc6 12.Nf3 O-O 13.b4 a6 14.Bd3 é melhor para as brancas.' }],
  ['c55-b', '1', 'b', '(b) 11...f6', '11... f6 12 Qxd4', { a: '⩲', c: '11...f6 12.Qxd4 é um pouco melhor para as brancas.' }],
  ['c55', 'c', 'c', '(c)', '8... a5 9 Bd3 O-O 10 Nf3 Bg4 11 O-O Nbd7 12 h3 Bxf3 13 Rxf3', { a: '⩲', r: 'Lin–Tong, China 1990', c: '8...a5 9.Bd3 O-O 10.Nf3 Bg4 11.O-O Nbd7 12.h3 Bxf3 13.Rxf3 é um pouco melhor para as brancas.' }],
  ['c55', 'd-A', 'd', '(d) A', '11... Bd4 12 Nxd4 exd4 13 Qxd4 O-O 14 h3 Qh4 15 g3 Qh5 16 Bg2 Ne5+ 17 g4', { a: '+−', r: 'Shirov–Dautov, Daugavpils 1989', c: 'Ou 11...Bd4 12.Nxd4 exd4 13.Qxd4 O-O 14.h3! Qh4?! 15.g3 Qh5 16.Bg2! Ne5+ 17.g4, e as brancas ganham.' }],
  ['c55', 'd-B', 'd', '(d) B', '12 g3 Be7 13 h3 Nf6 14 Qd3 O-O 15 Kf2', { a: '±', r: 'Volkov–Vijayalakshmi, Ilha de Man 2006', c: 'Depois de 11...Bh4 12.g3 Be7 13.h3 Nf6 14.Qd3 O-O 15.Kf2 as brancas ficam claramente melhor.' }],
  // Coluna 56
  ['c56', 'e-A', 'e', '(e) A', '5... Bxc3+ 6 bxc3 d6 7 e4 e5 8 Bd3 Nbd7 9 Ne2 Nf8 10 h4', { a: '⩲', r: 'Piket–Seirawan, Mônaco (às cegas) 1993', c: '5...Bxc3+ 6.bxc3 d6 7.e4 e5 8.Bd3 Nbd7 9.Ne2 Nf8 10.h4 é um pouco melhor para as brancas.' }],
  ['c56', 'e-B', 'e', '(e) B', '5... Nh5 6 Nh3 Qh4+ 7 Nf2 Qxc4 8 e4 Bxc3+ 9 bxc3 Qxc3+ 10 Bd2 Qd4 11 Qc1 exd5 12 Bc3 Qa4 13 Qg5 O-O 14 Qxh5 d4 15 Bd2', { a: '⩲', r: 'Sakaev–Gusinov, Doha 1993', c: '5...Nh5 6.Nh3 Qh4+ 7.Nf2 Qxc4 8.e4 Bxc3+ 9.bxc3 Qxc3+ 10.Bd2 Qd4 11.Qc1 exd5 12.Bc3 Qa4 13.Qg5 O-O 14.Qxh5 d4 15.Bd2 deixa as brancas com chances um pouco melhores numa posição confusa.' }],
  ['c56', 'f', 'f', '(f)', '8 exd5 Qh4+ 9 g3 Qxc4', { a: '∓', c: 'Não 8.exd5? Qh4+ 9.g3 Qxc4, melhor para as pretas.' }],
  ['c56', 'g', 'g', '(g)', '12 Rd1 Re8 13 Bf4 Bxc3 14 bxc3 Qf6', { a: '=', r: 'Krush–E. Paehtz, match 2006', c: '12.Rd1 Re8 13.Bf4 Bxc3 14.bxc3 Qf6 leva à igualdade.' }],
  // Coluna 57
  ['c57', 'h', 'h', '(h)', '6 e3 cxd4 7 exd4 Qa5 8 Qc2 Ne4', { a: '∓', r: 'Boleslavsky–Taimanov, Leningrado 1945', c: '6.e3 cxd4 7.exd4 Qa5 8.Qc2 Ne4 é melhor para as pretas.' }],
  ['c57', 'i', 'i', '(i)', '7... g5 8 Bg3 Ne4 9 Qc2 Qf6 10 Ne2 exd5 11 O-O-O Bxc3 12 Nxc3 Nxc3 13 Qxc3 Qxc3+ 14 bxc3', { a: '±', r: 'Timman–Winants, Bruxelas 1988', c: '7...g5 8.Bg3 Ne4 9.Qc2 Qf6 10.Ne2 exd5 11.O-O-O! Bxc3 12.Nxc3 Nxc3 13.Qxc3 Qxc3+ 14.bxc3, e as brancas recuperam o peão com grande vantagem.' }],
  ['c57', 'j-A', 'j', '(j) A', '9 Qc2 Nbd7 10 Bd3 Qe7 11 f3 Kd8 12 Ne2 g5 13 Bg3 Kc7 14 h4 Rg8', { a: '=', r: 'Timman–Andersson, Tilburg 1977', c: '9.Qc2 Nbd7 10.Bd3 Qe7 11.f3 Kd8 12.Ne2 g5 13.Bg3 Kc7 14.h4 Rg8 leva à igualdade.' }],
  ['c57', 'j-B', 'j', '(j) B', '9 Bd3 e4 10 Bc2 g5 11 Bg3 Qe7 12 h4 Rg8 13 hxg5 hxg5 14 Ne2 Kd8', { a: '=', r: 'Hjartarson–de Firmian, Moscou 1990', c: '9.Bd3 e4! 10.Bc2 g5 11.Bg3 Qe7 12.h4 Rg8 13.hxg5 hxg5 14.Ne2 Kd8 leva à igualdade.' }],
  ['c57', 'k', 'k', '(k)', '9... g5 10 Bg3 e4 11 h4 g4 12 h5 exf3 13 gxf3 Qe7 14 Bh4 Qxe3+ 15 Qe2 Qxe2+ 16 Nxe2 Nxh5 17 O-O-O Nd7 18 fxg4', { a: '±', r: 'Bareev–Sax, Hastings 1990', c: '9...g5 10.Bg3 e4?! 11.h4 g4 12.h5 exf3 13.gxf3 Qe7 14.Bh4! Qxe3+?! 15.Qe2 Qxe2+ 16.Nxe2 Nxh5 17.O-O-O! Nd7 18.fxg4 é melhor para as brancas.' }],
  ['c57-k', '1', 'k', '(k) 17...gxf3', '17... gxf3 18 Re1', { c: '17...gxf3 é respondido por 18.Re1!.' }],
  ['c57', 'l', 'l', '(l)', '12 Ne2 Kc7 13 O-O g5 14 Be1 Nb6 15 a4 a5 16 Ng3 Bd7', { a: '=', r: 'Yermolinsky–Serper, Tilburg (rápidas) 1994', c: '12.Ne2 Kc7 13.O-O g5 14.Be1 Nb6 15.a4 a5 16.Ng3 Bd7 leva à igualdade.' }],
  // Coluna 58
  ['c58', 'm', 'm', '(m)', '9 Bd3 Nbd7 10 dxe6 Qxe6 11 Ne2 g5 12 Bg3 Ne5 13 h4 Rg8', { a: '=', r: 'Graf–Reshevsky, Lugano 1987', c: '9.Bd3 Nbd7 10.dxe6 Qxe6 11.Ne2 g5 12.Bg3 Ne5 13.h4 Rg8 leva à igualdade.' }],
  ['c58', 'n', 'n', '(n)', '12 Ne4 g5 13 Nxf6+ Qxf6 14 Bg3 Nxc4 15 O-O', { a: '⩲', r: 'Rogozenko–Lobron, Internet 2001', c: '12.Ne4! g5 13.Nxf6+ Qxf6 14.Bg3 Nxc4 15.O-O é um pouco melhor para as brancas.' }],
  // Coluna 59
  ['c59', 'o', 'o', '(o)', '6... exd5 7 cxd5 d6 8 e3 Nbd7 9 Bd3 O-O 10 Ne2 Ne5 11 O-O Ng6 12 Bg3 Nh5 13 f4 Bg4 14 Qc2 Bxe2 15 Nxe2', { a: '⩲', r: 'Planinc–Parma, Iugoslávia 1968', c: '6...exd5 7.cxd5 d6 8.e3 Nbd7 9.Bd3 O-O 10.Ne2 Ne5 11.O-O Ng6 12.Bg3 Nh5 13.f4 Bg4 14.Qc2 Bxe2 15.Nxe2 é um pouco melhor para as brancas.' }],
  ['c59', 'p', 'p', '(p)', '7 e3 Bb7 8 dxe6 fxe6 9 cxb5 O-O 10 a3 Ba5 11 Nf3 Qe8', { a: '=', r: 'Yusupov–Christiansen, Nova York (rápidas) 1995', c: '7.e3 Bb7 8.dxe6 fxe6 9.cxb5 O-O 10.a3 Ba5 11.Nf3 Qe8 leva à igualdade.' }],
  ['c59', 'q', 'q', '(q)', '8 e4 O-O 9 e5 Qa5 10 Ne2 Ne4 11 Qc2 Bb7 12 f3 Nxc3 13 bxc3 Ba3 14 cxb5 a6', { a: '∓', r: 'Bareev–Gelfand, Moscou 1990', c: '8.e4?! O-O 9.e5 Qa5! 10.Ne2 Ne4 11.Qc2 Bb7 12.f3 Nxc3 13.bxc3 Ba3 14.cxb5 a6! é melhor para as pretas.' }],
  ['c59', 'r', 'r', '(r)', '12 a3 Ba5 13 b4 dxc3 14 bxa5 Bb7 15 Ne2 Bxg2 16 Rg1', { a: '⩲', r: 'Cooper–Adamski, Nice 1974', c: '12.a3 Ba5 13.b4 dxc3 14.bxa5 Bb7 15.Ne2! Bxg2 16.Rg1 é um pouco melhor para as brancas.' }],
  // Coluna 60
  ['c60', 's', 's', '(s)', '8 Bb5 Qa5 9 Bxd7+ Nxd7 10 Ne2 f6 11 Bf4 Ne5 12 O-O O-O 13 Ne4 Qd8', { a: '=', r: 'Murshed–Korchnoi, Olimpíada de Moscou 1994', c: '8.Bb5 Qa5 9.Bxd7+ Nxd7 10.Ne2 f6 11.Bf4 Ne5 12.O-O O-O 13.Ne4 Qd8 leva à igualdade.' }],
  ['c60', 't', 't', '(t)', '12 Bc2 O-O 13 Ng3 Ne5 14 e4 Nxc3 15 Qe1 Nd3 16 Bxd3 Qxg5 17 Bxc4 Na4', { a: '=', r: 'Lempert–Podlesnik, Bled 1994', c: '12.Bc2 O-O 13.Ng3 Ne5 14.e4 Nxc3 15.Qe1 Nd3 16.Bxd3 Qxg5 17.Bxc4 Na4 dá chances mais ou menos iguais.' }],
  ['c60-t', '1', 't', '(t) 12.Bf5', '12 Bf5 N7b6', { c: '12.Bf5 é respondido por 12...N7b6!.' }],
]

const capitulo = {
  id: 'nimzo-j',
  arquivo: 'nimzo-j',
  nome: 'Nimzo-Índia — 4.f3 e Variante Leningrado',
  fonte: 'Modern Chess Openings — Nimzo-Indian Defense (pp. 559–560), colunas 55–60',
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  corPadrao: 'b',
  ordem: 559,
  grupos: [
    { id: 'f3', nome: '4.f3', colunas: [55, 56] },
    { id: 'leningrado', nome: 'Variante Leningrado 4.Bg5', colunas: [57, 58, 59, 60] },
  ],
}

module.exports = { capitulo, colunas, notas }
