// Transcrição do MCO 15ª ed. — Defesa Índia da Dama, Sistema Petrosian 4.a3 Bb7 5.Nc3 d5 6.cxd5 Nxd5 (pp. 566–568), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs india-dama-a
// Formato: ver gambito-do-rei.cjs. Dicas em india-dama-a-dicas.cjs.
//
// Introdução (pp. 563–565): 4.a3 col. 1–18, 4.g3 19–36, 4.e3 37–39, 4.Nc3 40–41, 4.Bf4 42.
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Avaliações tiradas do texto: (a) e (r) "boas chances de ataque" ficaram ⩲; (e) e (w) "vantagem mínima" ficaram ⩲;
// (i) B "bom contrajogo" ficou =; (p) "com o ataque" ficou ±; (s) "vantagem nítida" ficou ± e "ganhando" ficou +−;
// (v) 8...Be7 "mais chances de ataque para as brancas" ficou ⩲.
// Notas só com comentário: (i) C 10.h6, (l) 11.Bxc7 e 11.Qxc7, (p), (t).
// Errata: na nota (f) o livro dá 15...Rc8 e depois 17...Rc8 de novo; a linha foi cortada em 17.Rac1.
// Notação: na nota (q) o livro escreve 15...Qxb5+, mas não é xeque (o bispo de d3 tapa a diagonal); ficou 15...Qxb5.

const F = '1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 a3 Bb7 5 Nc3 d5 6 cxd5 Nxd5'

const colunas = {
  c01: [`${F} 7 e3 Be7 8 Bb5+ c6 9 Bd3 Nxc3 10 bxc3 c5 11 O-O Nc6 12 Qe2 O-O 13 Bb2 Rc8 14 Rad1 cxd4`, 'e3', '7.e3 Be7 8.Bb5+ c6 9.Bd3 Nxc3', '=',
    'O Sistema Petrosian, 4.a3, prepara Nc3 sem deixar ...Bb4. Com 4...Bb7 5.Nc3 d5 6.cxd5 Nxd5 as brancas ganham um centro móvel. Depois de 7.e3 Be7 8.Bb5+ c6 9.Bd3 Nxc3 10.bxc3 c5 11.O-O Nc6 12.Qe2 O-O 13.Bb2 Rc8 14.Rad1 cxd4 o jogo é igual.'],
  c02: [`${F} 7 e3 Be7 8 Bb5+ c6 9 Bd3 O-O 10 Qc2 h6 11 O-O c5 12 Nxd5 Qxd5 13 e4 Qh5 14 dxc5 Bxc5`, 'e3', '9...O-O', '=',
    'Com 9...O-O as pretas mantêm o cavalo em d5. Depois de 10.Qc2 h6 11.O-O c5 12.Nxd5 Qxd5 13.e4 Qh5 14.dxc5 Bxc5 a dama preta fica ativa na ala do rei, e o jogo é igual.'],
  c03: [`${F} 7 e3 g6 8 Nxd5 exd5 9 Bb5+ c6 10 Bd3 Bg7 11 b4 O-O 12 Bd2 Nd7 13 Rb1 Re8 14 O-O Nf6`, 'e3', '7...g6', '=',
    'Com 7...g6 o bispo vai para a grande diagonal. Depois de 8.Nxd5 exd5 9.Bb5+ c6 10.Bd3 Bg7 11.b4 O-O 12.Bd2 Nd7 13.Rb1 Re8 14.O-O Nf6 as brancas não conseguem vantagem.'],
  c04: [`${F} 7 Qc2 Nxc3 8 bxc3 Be7 9 e4 O-O 10 Bd3 c5 11 O-O Qc8 12 Qa2 Nd7 13 Qe2 a5 14 e5 Rd8`, 'qc2', '7.Qc2 Nxc3', '=',
    'Com 7.Qc2 as brancas preparam e4 de imediato. Depois de 7...Nxc3 8.bxc3 Be7 9.e4 O-O 10.Bd3 c5 11.O-O Qc8 12.Qa2!? Nd7 13.Qe2 a5 14.e5 Rd8 as pretas defendem bem o centro, e o jogo é igual.'],
  c05: [`${F} 7 Qc2 c5 8 dxc5 Bxc5 9 Bg5 Qc8 10 Rc1 h6 11 Bh4 a5 12 Na4 Nd7 13 e4 Nc7 14 Nxc5 bxc5`, 'qc2', '7...c5', '±',
    'Com 7...c5 8.dxc5 Bxc5 9.Bg5 as brancas atacam a dama. Depois de 9...Qc8 10.Rc1 h6 11.Bh4 a5 12.Na4 Nd7 13.e4 Nc7 14.Nxc5 bxc5, com 15.Be2 as brancas ficam com vantagem nítida.'],
  c06: [`${F} 7 Bd2 Nd7 8 Nxd5 Bxd5 9 Qc2 c5 10 e4 Bb7 11 d5 exd5 12 exd5 Qe7+ 13 Be3 O-O-O 14 O-O-O Nf6`, 'bd2', '7.Bd2', '⩲',
    'Com 7.Bd2 as brancas desenvolvem o bispo antes de decidir o plano. Depois de 7...Nd7 8.Nxd5 Bxd5 9.Qc2 c5 10.e4 Bb7 11.d5!? exd5 12.exd5 Qe7+ 13.Be3 O-O-O 14.O-O-O Nf6 os reis rocam em lados opostos, e as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '11... O-O 12 Qc2 g6 13 e4 Qc7 14 Qe2 Qd8 15 h4 Nc6 16 Be3 Bf6 17 e5 Bg7 18 h5', { a: '⩲', r: 'Polugaevsky–Petrosian, Moscou 1981', c: '11...O-O 12.Qc2 g6 13.e4 Qc7 14.Qe2 Qd8 15.h4! Nc6 16.Be3 Bf6 17.e5 Bg7 18.h5 dá às brancas boas chances de ataque.' }],
  ['c01', 'b', 'b', '(b)', '12 e4 cxd4 13 cxd4 O-O 14 Be3 Rc8 15 Ra2 Na5 16 Bd2 Nc6', { a: '=', r: 'Lobron–Hjartarson, Olimpíada de Manila 1992', c: '12.e4 cxd4 13.cxd4 O-O 14.Be3 Rc8 15.Ra2 Na5 16.Bd2 Nc6 leva à igualdade.' }],
  ['c01', 'c', 'c', '(c)', '15 cxd4 Bf6 16 Be4 Qe7 17 d5 exd5 18 Bxd5 Bxb2', { a: '=', r: 'Johannessen–Yusupov, Bundesliga 2003', c: '15.cxd4 Bf6 16.Be4 Qe7 17.d5 exd5 18.Bxd5 Bxb2 leva à igualdade.' }],
  ['c01-c', '1', 'c', '(c) 15.exd4', '15 exd4 Bf6', { a: '=', c: '15.exd4 Bf6 leva à igualdade.' }],
  ['c01-c', '2', 'c', '(c) 16.e4', '16 e4 Na5', { a: '=', c: '16.e4 Na5 leva à igualdade.' }],
  // Coluna 2
  ['c02', 'd', 'd', '(d)', '9... Nd7 10 e4 N5f6 11 d5 exd5 12 exd5 Bd6 13 O-O O-O 14 Bg5 Qc7', { a: '=', r: 'Khenkin–Henrichs, Osterburg 2006', c: '9...Nd7 10.e4 N5f6!? 11.d5 exd5 12.exd5 Bd6 13.O-O O-O 14.Bg5 Qc7! leva à igualdade.' }],
  ['c02', 'e', 'e', '(e)', '11 e4 Nxc3 12 bxc3 c5 13 O-O Qc8 14 Qe2 Ba6 15 Rd1 Bxd3 16 Rxd3 Nd7', { a: '⩲', r: 'Khenkin–Rombaldoni, Itália 2005', c: '11.e4 Nxc3 12.bxc3 c5 13.O-O Qc8 14.Qe2 Ba6 15.Rd1 Bxd3 16.Rxd3 Nd7 deixa as brancas com uma vantagem mínima.' }],
  ['c02', 'f', 'f', '(f)', '12... exd5 13 b3 Nd7 14 Bb2 a5 15 a4 Rc8 16 Qe2 Bd6 17 Rac1', { a: '⩲', r: 'F. Olafsson–Keres, Tallinn 1975', c: '12...exd5 13.b3 Nd7 14.Bb2 a5 15.a4 Rc8 16.Qe2 Bd6 17.Rac1 é um pouco melhor para as brancas. (O livro continua com "17...Rc8 18.Ba6", mas a torre já está em c8; a linha foi cortada.)' }],
  ['c02', 'g', 'g', '(g)', '15 b4 Bd6 16 Bb2 Nc6 17 Qe2 Rad8 18 e5 Bb8 19 Rfd1 Ne7 20 Be4 Nd5', { a: '=', r: 'Kasparov–Hjartarson, Belgrado 1989', c: '15.b4 Bd6 16.Bb2 Nc6 17.Qe2 Rad8 18.e5 Bb8 19.Rfd1 Ne7 20.Be4 Nd5 leva à igualdade.' }],
  // Coluna 3
  ['c03', 'h', 'h', '(h)', '7... Nd7 8 Bd3 c5 9 e4 N5f6 10 Bf4 a6 11 d5 exd5 12 Nxd5 Nxd5 13 exd5 Bxd5 14 Qc2 Nf6 15 O-O Bd6 16 Qe2+ Kf8 17 Ne5', { a: '⩲', r: 'Portisch–Miles, Olimpíada de Salônica 1984', c: '7...Nd7 8.Bd3 c5 9.e4 N5f6 10.Bf4 a6 11.d5! exd5 12.Nxd5 Nxd5 13.exd5 Bxd5 14.Qc2 Nf6 15.O-O Bd6 16.Qe2+ Kf8 17.Ne5 é um pouco melhor para as brancas.' }],
  ['c03', 'i-A', 'i', '(i) A', '8 Bb5+ c6 9 Bd3 Bg7 10 Na4 Qc7 11 O-O Nd7 12 e4 Nf4', { a: '=', r: 'Gelfand–Kramnik, Melody Amber 2004', c: 'As brancas tentaram outros planos sem vantagem: 8.Bb5+ c6 9.Bd3 Bg7 10.Na4 Qc7 11.O-O Nd7 12.e4 Nf4 leva à igualdade.' }],
  ['c03', 'i-B', 'i', '(i) B', '8 Bb5+ c6 9 Bc4 Bg7 10 e4 Nxc3 11 bxc3 c5 12 Bg5 Qd6 13 Qd3 Nc6 14 Rd1 O-O 15 O-O Na5 16 Ba2 c4', { a: '=', r: 'Pavlović–H. Olafsson, Erevan 1988', c: '8.Bb5+ c6 9.Bc4 Bg7 10.e4 Nxc3 11.bxc3 c5 12.Bg5 Qd6! 13.Qd3 Nc6 14.Rd1 O-O 15.O-O Na5 16.Ba2 c4! dá às pretas bom contrajogo.' }],
  ['c03', 'i-C', 'i', '(i) C', '8 h4 Bg7 9 h5 Nd7 10 Bd3 O-O 11 e4 Nxc3 12 bxc3 Nc5', { a: '∓', r: 'Vokač–Sax, Lázně Bohdaneč 1995', c: 'O mais perigoso é 8.h4 Bg7 9.h5 Nd7 10.Bd3 O-O 11.e4?! Nxc3 12.bxc3 Nc5!, melhor para as pretas.' }],
  ['c03-i-C', '1', 'i', '(i) C 10.h6', '10 h6', { c: '10.h6!? pode criar problemas (Lalić).' }],
  ['c03', 'j', 'j', '(j)', '11 e4 dxe4 12 Bxe4 O-O 13 O-O Nd7 14 Bg5 Qc7 15 Rc1 Rfe8 16 Re1 c5 17 Qc2 Bxe4 18 Rxe4 Qb7', { a: '=', r: 'Kramnik–Anand, Linares 1993', c: '11.e4 dxe4 12.Bxe4 O-O 13.O-O Nd7 14.Bg5 Qc7 15.Rc1 Rfe8 16.Re1 c5 17.Qc2 Bxe4 18.Rxe4 Qb7 leva à igualdade.' }],
  ['c03', 'k', 'k', '(k)', '15 Qc2 Ne4 16 Rfc1 Rc8', { a: '=', r: 'Kasparov–Kramnik, Champions Blitz 2001', c: '15.Qc2 Ne4 16.Rfc1 Rc8 leva à igualdade.' }],
  // Coluna 4
  ['c04', 'l', 'l', '(l)', '8 Qxc3 h6 9 b4 Be7 10 Bf4 O-O 11 Rc1 c5 12 dxc5 bxc5 13 bxc5 Qd5', { a: '=', r: 'Browne–M. Gurevich, Nova York 1989', c: '8.Qxc3 h6! 9.b4 Be7 10.Bf4 O-O! 11.Rc1 c5 12.dxc5 bxc5 13.bxc5 Qd5 é igual, pois ...Rc8 vem a seguir.' }],
  ['c04-l', '1', 'l', '(l) 9.e3', '9 e3 Be7 10 Bb5+ c6 11 Ba4 O-O 12 O-O Nd7 13 e4 b5 14 Bc2 c5', { a: '=', r: 'Ivanchuk–Karpov, Roquebrune 1992', c: '9.e3 Be7 10.Bb5+ c6 11.Ba4 O-O 12.O-O Nd7 13.e4 b5 14.Bc2 c5 leva à igualdade.' }],
  ['c04-l', '2', 'l', '(l) 11.Bxc7', '11 Bxc7 Qd5', { c: 'As pretas têm bom jogo depois de 11.Bxc7 Qd5.' }],
  ['c04-l', '3', 'l', '(l) 11.Qxc7', '11 Qxc7 Qxc7 12 Bxc7 Rc8', { c: 'Também depois de 11.Qxc7 Qxc7 12.Bxc7 Rc8 as pretas têm bom jogo.' }],
  ['c04', 'm', 'm', '(m)', '9 e3 Nd7 10 Bd3 c5 11 O-O Rc8 12 Qe2 O-O 13 e4 Qc7 14 Re1 Rfd8 15 Bd2 e5', { a: '=', r: 'Dreev–Anand, match 1991', c: '9.e3 Nd7 10.Bd3 c5 11.O-O Rc8 12.Qe2 O-O 13.e4 Qc7 14.Re1 Rfd8 15.Bd2 e5 leva à igualdade.' }],
  ['c04-m', '1', 'm', '(m) 11.Bxh7', '11 Bxh7 cxd4 12 exd4 Qc7', { a: '∓', c: '11.Bxh7 cxd4 12.exd4 Qc7 é melhor para as pretas.' }],
  ['c04', 'n', 'n', '(n)', '11... Nd7 12 Bb2 Rc8 13 Qe2', { a: '⩲', r: 'Radjabov–Anand, Dubai (rápidas) 2002', c: 'O lance 11...Qc8 ameaça 12...cxd4 13.cxd4 Qxc2, com igualdade, e prepara ...Ba6 contra 12.Qe2. Em vez disso, 11...Nd7 12.Bb2 Rc8 13.Qe2 é um pouco melhor para as brancas.' }],
  ['c04', 'o', 'o', '(o)', '15 Rb1 cxd4 16 cxd4 Ba6 17 h4 h6 18 a4 Bb4', { a: '=', r: 'Khalifman–Ivanchuk, Elista 1998', c: '15.Rb1 cxd4 16.cxd4 Ba6 17.h4 h6 18.a4 Bb4 leva à igualdade.' }],
  // Coluna 5
  ['c05', 'p', 'p', '(p)', '7... Be7 8 e4 Nxc3 9 bxc3 O-O', { c: '7...Be7 8.e4 Nxc3 9.bxc3 O-O transpõe para a coluna anterior.' }],
  ['c05-p', '1', 'p', '(p) 9...c5', '9... c5 10 Bb5+ Bc6 11 Bd3 Nd7 12 O-O h6 13 Rd1 Qc7 14 d5 exd5 15 exd5 Bxd5 16 Bb5 a6 17 Bf4', { a: '±', r: 'Kasparov–Gheorghiu, Interzonal de Moscou 1982', c: 'Mas não 9...c5?! 10.Bb5+ Bc6 11.Bd3 Nd7 12.O-O h6 13.Rd1 Qc7 14.d5! exd5 15.exd5 Bxd5 16.Bb5 a6 17.Bf4!, com ataque das brancas.' }],
  ['c05', 'q', 'q', '(q)', '8 e4 Nxc3 9 bxc3 Nd7 10 Bf4 cxd4 11 cxd4 Rc8 12 Qb3 Be7 13 Bd3 Nf6 14 Qb5+ Qd7 15 Ne5 Qxb5 16 Bxb5+ Kf8 17 f3 Ne8 18 Bd7', { a: '⩲', r: 'Timman–Karpov, match 1993', c: 'Também é bom 8.e4 Nxc3 9.bxc3 Nd7 10.Bf4 cxd4 11.cxd4 Rc8 12.Qb3 Be7 13.Bd3 Nf6 14.Qb5+ Qd7 15.Ne5 Qxb5 16.Bxb5+ Kf8 17.f3 Ne8 18.Bd7!, um pouco melhor para as brancas.' }],
  ['c05', 'r', 'r', '(r)', '9... f6 10 Bd2 O-O 11 e3 Kh8 12 Bc4 Nxc3 13 Bxc3 Qe7 14 h4', { a: '⩲', r: 'Piket–Lautier, match 1995', c: '9...f6 10.Bd2 O-O 11.e3 Kh8 12.Bc4 Nxc3 13.Bxc3 Qe7 14.h4! dá às brancas boas chances de ataque.' }],
  ['c05', 's-A', 's', '(s) A', '14... Nxc5 15 b4 axb4 16 axb4 Bxe4 17 Qb2', { a: '+−', c: 'Não 14...Nxc5? 15.b4 axb4 16.axb4 Bxe4 17.Qb2, e as brancas ganham.' }],
  ['c05', 's-B', 's', '(s) B', '15 Be2 Ba6 16 O-O O-O 17 Rfd1', { a: '±', r: 'Kasparov–van der Wiel, Amsterdã 1988', c: 'Depois de 14...bxc5 15.Be2 Ba6 16.O-O O-O 17.Rfd1 as brancas ficam com vantagem nítida.' }],
  // Coluna 6
  ['c06', 't', 't', '(t)', '7 e4 Nxc3 8 bxc3 Bxe4 9 Ne5 Qh4', { c: '7.e4?! Nxc3 8.bxc3 Bxe4 9.Ne5 Qh4! torna duvidoso o sacrifício de peão das brancas.' }],
  ['c06', 'u', 'u', '(u)', '7... Be7 8 Qc2 O-O 9 e4 Nxc3 10 Bxc3 Nd7 11 Rd1 Qc8 12 Bd3 c5 13 d5', { a: '⩲', r: 'Dreev–Stefansson, Reykjavik (blitz) 2004', c: '7...Be7 8.Qc2 O-O 9.e4 Nxc3 10.Bxc3 Nd7 11.Rd1 Qc8 12.Bd3 c5 13.d5 é um pouco melhor para as brancas.' }],
  ['c06', 'v', 'v', '(v)', '8 Qc2 c5 9 e4 Nxc3 10 Bxc3 cxd4 11 Nxd4 a6 12 g3 Qc7 13 Bg2 Bc5 14 Qe2 O-O 15 O-O Rac8', { a: '=', r: 'Akopian–Salov, Tilburg 1994', c: '8.Qc2 c5 9.e4 Nxc3 10.Bxc3 cxd4 11.Nxd4 a6 12.g3 Qc7 13.Bg2 Bc5 14.Qe2 O-O 15.O-O Rac8 leva à igualdade.' }],
  ['c06-v', '1', 'v', '(v) 8...Be7', '8... Be7 9 e4 Nxc3 10 Bxc3 O-O 11 O-O-O', { a: '⩲', r: 'Piket–Karpov, match 1999', c: 'O mais lento 8...Be7 9.e4 Nxc3 10.Bxc3 O-O 11.O-O-O dá às brancas mais chances de ataque.' }],
  ['c06', 'w', 'w', '(w)', '8... exd5 9 g3 Bd6 10 Bg5 Be7 11 Bxe7 Qxe7', { a: '⩲', r: 'Kramnik–Psakhis, Calcídica 1992', c: 'Mais seguro é 8...exd5 9.g3 Bd6 10.Bg5 Be7 11.Bxe7 Qxe7, com vantagem mínima das brancas.' }],
  ['c06', 'x', 'x', '(x)', '15 d6 Qe8 16 Bc4 Bxd6 17 Ng5', { a: '⩲', r: 'Atalik–Z. Almasi, Liga Bósnia 2003', c: '15.d6 Qe8 16.Bc4 Bxd6 17.Ng5 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'india-dama-a',
  arquivo: 'india-dama-a',
  nome: 'Índia da Dama — Sistema Petrosian, 6...Nxd5',
  fonte: 'Modern Chess Openings — Queen\'s Indian Defense (pp. 566–568), colunas 1–6',
  base: '1. d4 Nf6 2. c4 e6 3. Nf3 b6',
  corPadrao: 'b',
  ordem: 566,
  grupos: [
    { id: 'e3', nome: '7.e3', colunas: [1, 2, 3] },
    { id: 'qc2', nome: '7.Qc2', colunas: [4, 5] },
    { id: 'bd2', nome: '7.Bd2', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
