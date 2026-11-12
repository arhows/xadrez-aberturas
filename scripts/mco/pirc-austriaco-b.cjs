// Transcrição do MCO 15ª ed. — Defesa Pirc, Ataque Austríaco (pp. 367–368), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs pirc-austriaco-b
// Formato: ver gambito-do-rei.cjs. Dicas em pirc-austriaco-b-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.
// Erro do livro: (h) está numerada um lance adiante ("12 Ng5 Nf6 13 hxg6 hxg6 14 Ncxe4 ..."); a linha legal é 11.Ng5 Nf6 12.hxg6 hxg6 13.Ncxe4.

const B = '1 e4 d6 2 d4 Nf6 3 Nc3 g6 4 f4 Bg7 5 Nf3'

const colunas = {
  c07: [`${B} O-O 6 e5 dxe5 7 dxe5 Qxd1+ 8 Kxd1 Nh5 9 Bc4 Bg4 10 Rf1 Nc6 11 Ke1 Rad8 12 Be3 Na5`, 'e5', '6.e5 dxe5 7.dxe5', '=',
    'Com 6.e5 as brancas avançam de imediato. Depois de 6...dxe5 7.dxe5 as damas se trocam e o rei branco perde o roque, mas as pretas precisam jogar com precisão para igualar o final.'],
  c08: [`${B} O-O 6 e5 Nfd7 7 h4 c5 8 h5 cxd4 9 Qxd4 dxe5 10 Qf2 e4 11 Nxe4 Nf6 12 Nxf6+ exf6`, 'e5', '6...Nfd7 7.h4', '=',
    'Com 6...Nfd7 as pretas recuam o cavalo e contra-atacam com ...c5. As brancas atacam com 7.h4 e h5, mas as pretas devolvem o peão e igualam.'],
  c09: [`${B} O-O 6 Be2 c5 7 dxc5 Qa5 8 O-O Qxc5+ 9 Kh1 Nbd7 10 Bd3 b6 11 Qe1 Bb7 12 Be3 Qh5`, 'be2', '6.Be2 c5', '=',
    'O tranquilo 6.Be2 é manso para o Ataque Austríaco. As pretas respondem com 6...c5, recuperam o peão com a dama e igualam.'],
  c10: [`${B} c5 6 dxc5 Qa5 7 Bd3 Qxc5 8 Qe2 Bg4 9 Be3 Qa5 10 O-O Nc6 11 h3 Bxf3 12 Qxf3 O-O`, 'c5', '5...c5 6.dxc5', '=',
    'Com 5...c5 as pretas buscam contrajogo imediato. O seguro 6.dxc5 Qa5 leva a uma posição em que as pretas recuperam o peão, trocam o bispo por f3 e igualam.'],
  c11: [`${B} c5 6 Bb5+ Bd7 7 e5 Ng4 8 e6 fxe6 9 Ng5 Bxb5 10 Nxe6 Bxd4 11 Nxb5 Qa5+ 12 Qd2 Bf2+`, 'c5', '6.Bb5+ Bd7 7.e5 Ng4 8.e6', '=',
    'A linha mais interessante é 6.Bb5+ Bd7 7.e5, que leva a uma pancadaria. Com 8.e6 fxe6 9.Ng5 as brancas sacrificam tudo; as pretas devolvem o material e o jogo termina em igualdade.'],
  c12: [`${B} c5 6 Bb5+ Bd7 7 e5 Ng4 8 Bxd7+ Qxd7 9 d5 dxe5 10 h3 e4 11 Nxe4 Nf6 12 Nxf6+ Bxf6`, 'c5', '8.Bxd7+', '=',
    'Com 8.Bxd7+ Qxd7 9.d5 as brancas jogam com mais calma. As pretas devolvem o peão em e4, trocam os cavalos e ficam com chances iguais.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a-A', 'a', '(a) A', '5 e5 Nfd7 6 Nf3 c5 7 exd6 O-O 8 dxc5 Qa5 9 Be2 Bxc3+ 10 bxc3 Qxc3+ 11 Bd2 Qxc5', { a: '∓', r: 'Ivanović–M. Gurevich, Lucerna 1989', c: '5.e5 Nfd7 6.Nf3 c5! deixa as pretas um pouco melhor.' }],
  ['c07-a-A', '1', 'a', '(a) A 7.dxc5', '7 dxc5 dxe5', { c: '7.dxc5 dxe5 é a alternativa.' }],
  ['c07', 'a-B', 'a', '(a) B', '5 Bd3 Nc6 6 Nf3 Bg4 7 e5 Bxf3 8 gxf3 Nh5 9 Be3 e6 10 h4 O-O', { a: '=', r: 'Fedorowicz–Smyslov, Nova York 1989', c: '5.Bd3 evita 5...c5, porque 6.dxc5 seria bom. As pretas igualam com 5...Nc6.' }],
  ['c07', 'b', 'b', '(b)', '7 fxe5 Nd5 8 Bc4 Nb6 9 Bb3 Nc6 10 Be3 Na5 11 Qe2 Nxb3 12 axb3 f6 13 O-O Be6 14 Rad1 c6', { a: '=', r: 'Perecz–Schüssler, Dortmund 1979', c: '7.fxe5 Nd5 8.Bc4 Nb6 leva à igualdade.' }],
  ['c07', 'c', 'c', '(c)', '8... Rd8+ 9 Ke1 Nd5 10 Nxd5 Rxd5 11 Bc4 Rd8 12 Ng5 e6 13 Be3', { a: '⩲', c: '8...Rd8+ 9.Ke1 Nd5 deixa as brancas com a iniciativa no final.' }],
  ['c07-c', '1', 'c', '(c) 9...Ne8', '9... Ne8', { c: '9...Ne8! é melhor.' }],
  ['c07', 'd', 'd', '(d)', '10 Ke1 Bxf3 11 gxf3 Nc6 12 Be3 e6', { a: '∓', r: 'Kulicov–Lahno, Ucrânia 2003', c: '10.Ke1 Bxf3 11.gxf3 deixa as pretas um pouco melhor.' }],
  ['c07-d', '1', 'd', '(d) 10.Ke2', '10 Ke2 Nc6 11 Be3 g5', { c: '10.Ke2 Nc6 11.Be3 g5! também é bom para as pretas.' }],
  ['c07', 'e-A', 'e', '(e) A', '12... Bh6 13 g3 Kh8 14 Rd1', { a: '±', r: 'Ott–Jansa, Bad Wörishofen 1992', c: '12...Bh6?! 13.g3 favorece as brancas.' }],
  ['c07', 'e-B', 'e', '(e) B', '13 Bd3 f6', { a: '=', c: 'Depois de 12...Na5 13.Bd3 f6! o jogo é igual.' }],
  // Coluna 8
  ['c08', 'f', 'f', '(f)', '7 Bc4 Nb6 8 Bb3 Nc6 9 Be3 Na5 10 Qe2 Nxb3 11 axb3 f6', { a: '=', r: 'Unzicker–Tringov, Liubliana 1979', c: '7.Bc4 Nb6 8.Bb3 Nc6 leva à igualdade.' }],
  ['c08', 'g', 'g', '(g)', '9 hxg6 dxc3 10 gxf7+ Rxf7 11 Bc4 e6 12 Ng5 Nxe5 13 Qh5 h6 14 fxe5 hxg5 15 Qh7+ Kf8 16 Qh8+ Bxh8 17 Rxh8+ Kg7', { a: '=', r: 'W. Schmidt–Bachmann, Liga Alemã 2001', c: '9.hxg6 dxc3 10.gxf7+ leva a uma sequência forçada que termina em igualdade.' }],
  ['c08-g', '1', 'g', '(g) 13.fxe5', '13 fxe5 cxb2', { a: '−+', c: '13.fxe5? cxb2 ganha para as pretas.' }],
  ['c08', 'h', 'h', '(h)', '11 Ng5 Nf6 12 hxg6 hxg6 13 Ncxe4 Nxe4 14 Nxe4 Qd4', { a: '=', r: 'Cawdery–Danisa, San Antonio 1995', c: '11.Ng5 Nf6 12.hxg6 hxg6 13.Ncxe4 Nxe4 14.Nxe4 Qd4! leva à igualdade.' }],
  ['c08', 'i', 'i', '(i)', '13 hxg6 Re8+ 14 Be2 hxg6 15 O-O Nc6', { a: '=', r: 'Neiksans–Postny, Atenas 2001', c: '13.hxg6 Re8+ 14.Be2 hxg6 é igual.' }],
  // Coluna 9
  ['c09', 'j', 'j', '(j)', '9... Nc6 10 Bd3 Bg4 11 Qe1 Bxf3 12 Rxf3 Nb4 13 Be3 Nxd3 14 cxd3 Qb4', { a: '=', r: 'Short–Speelman, match de 1988', c: 'Também é bom 9...Nc6, com igualdade.' }],
  ['c09', 'k', 'k', '(k)', '13 Nd2 Ng4 14 Bg1 Bd4 15 Rf3 Bxg1 16 Qxg1 Qc5', { a: '=', r: 'van der Wiel–Smirin, Wijk aan Zee 1994', c: '13.Nd2 Ng4 14.Bg1 Bd4 leva à igualdade.' }],
  // Coluna 10
  ['c10', 'l', 'l', '(l)', '8... O-O 9 Be3 Qc7 10 O-O Nbd7 11 h3 a6 12 a4 b6 13 Qf2 Bb7 14 Qh4', { a: '±', r: 'Tal–Gufeld, URSS 1970', c: '8...Bg4 é o lance mais flexível, porque as pretas devem cravar o cavalo de qualquer jeito. 8...O-O foi menos preciso.' }],
  ['c10', 'm', 'm', '(m)', '11 Kh1 O-O 12 Qe1 Bxf3 13 Rxf3 e6 14 Rh3 Rac8 15 a3 a6 16 Qh4 h5', { a: '=', r: 'Bologan–Nyback, Olimpíada de Calvià 2004', c: '11.Kh1 O-O 12.Qe1 leva à igualdade depois de 16...h5!.' }],
  ['c10', 'n', 'n', '(n)', '13 Kh1 Nd7 14 Bd2 Nc5 15 Rad1 Qb6 16 Bc1 Nxd3 17 cxd3 f5', { a: '=', r: 'Kindermann–Khalifman, Hamburgo 1991', c: '13.Kh1 Nd7 14.Bd2 Nc5 leva à igualdade.' }],
  // Coluna 11
  ['c11', 'o', 'o', '(o)', '6... Nbd7 7 e5 Ng4 8 e6 fxe6 9 Ng5', { a: '+−', c: 'Não 6...Nbd7? 7.e5 Ng4 8.e6 fxe6 9.Ng5, que ganha.' }],
  ['c11', 'p', 'p', '(p)', '7 Bxd7+ Nfxd7 8 d5 b5 9 Qe2 b4 10 Nd1 Nb6 11 O-O O-O 12 Nf2 Qc8', { a: '=', r: 'Shirov–Beliavsky, Madri 1997', c: '7.Bxd7+ Nfxd7 8.d5 b5 leva à igualdade.' }],
  ['c11', 'q', 'q', '(q)', '8... Bxb5 9 exf7+ Kd7 10 Nxb5 Qa5+ 11 Nc3 cxd4 12 Nxd4 Bxd4 13 Qxd4 Nc6 14 Qc4 Qb6 15 Qe2 h5 16 Ne4 Nd4 17 Qd3 Nf5 18 a4 a6 19 Ra3', { a: '±', r: 'McDonald–Zimmerman, Yelets 1996', c: '8...Bxb5 9.exf7+ Kd7 deixa o rei preto exposto, e as brancas ficam melhor.' }],
  ['c11-q', '1', 'q', '(q) 12...h5', '12... h5 13 h3 Nc6 14 Ne2 Nh6 15 Be3 Nf5 16 Bf2', { a: '⩲', c: '12...h5 13.h3 Nc6 também dá pequena vantagem às brancas.' }],
  ['c11', 'r-A', 'r', '(r) A', '10 Qxg4 Bc4 11 b3 Bxd4 12 Bd2 Bd5 13 Nxd5 exd5 14 O-O-O Nc6 15 Qe6 Qc8 16 Qf7+ Kd7 17 Qxd5 Qg8', { a: '=', r: 'Nunn–Seirawan, Skellefteå 1989', c: '10.Qxg4 Bc4 11.b3 Bxd4 leva à igualdade.' }],
  ['c11', 'r-B', 'r', '(r) B', '10 Nxb5 Qa5+ 11 c3 Qxb5 12 Nxe6 Na6 13 Nxg7+ Kf7 14 Qxg4 Kxg7', { a: '=', r: 'Anand–M. Gurevich, Linares 1991', c: '10.Nxb5 Qa5+ 11.c3 Qxb5 12.Nxe6 Na6! também é igual.' }],
  ['c11-r-B', '1', 'r', '(r) B 12.Qxg4', '12 Qxg4 cxd4 13 Nxe6 Qc4 14 Nxg7+ Kf7', { a: '=', c: '12.Qxg4 cxd4 13.Nxe6 Qc4 é igual.' }],
  ['c11', 's', 's', '(s)', '11 Nxd8 Bf2+ 12 Kd2 Be3+ 13 Ke1 Bf2+', { a: '=', c: '11.Nxd8 Bf2+ 12.Kd2 Be3+ 13.Ke1 Bf2+ é empate por xeque perpétuo.' }],
  ['c11', 't', 't', '(t)', '13 Kd1 Ne3+ 14 Ke2 Qxb5+ 15 Kxf2 Ng4+ 16 Kg3 Na6 17 b3 Nh6 18 Bb2 Rg8', { a: '=', r: 'Volcu–Dragomirescu, Campeonato Europeu Feminino 2005', c: '13.Kd1 Ne3+ 14.Ke2 Qxb5+ leva à igualdade.' }],
  ['c11-t', '1', 't', '(t) 17.Kxg4', '17 Kxg4 Qd7', { c: '17.Kxg4?! Qd7 é arriscado para as brancas.' }],
  // Coluna 12
  ['c12', 'u', 'u', '(u)', '8 h3 cxd4 9 Qxd4 dxe5 10 Qd5 e4 11 Ng5 Nh6 12 Qxb7 Bxc3+ 13 bxc3 O-O 14 Qxa8 Qc7 15 Qxe4 Qxc3+ 16 Kf2 Qxa1', { a: '=', r: 'J. Polgár–Tregubov, Budapeste 1992', c: '8.h3 cxd4 9.Qxd4 leva a uma posição selvagem que termina em igualdade.' }],
  ['c12', 'v', 'v', '(v)', '11 hxg4 exf3 12 Qxf3 Na6 13 Bd2 O-O-O', { a: '=', r: 'Westerinen–Nijboer, Skei 1994', c: '11.hxg4 exf3 12.Qxf3 Na6 também é igual.' }],
  ['c12', 'w', 'w', '(w)', '13 O-O O-O 14 Be3 Bxb2 15 Rb1 Bf6 16 Ne5 Qc7 17 Ng4 Nd7', { a: '=', r: 'L\'Ami–M. Gurevich, Turquia 2006', c: 'Depois de 13.O-O O-O 14.Be3 Bxb2 as chances ficam mais ou menos iguais.' }],
]

const capitulo = {
  id: 'pirc-austriaco-b',
  arquivo: 'pirc-austriaco-b',
  nome: 'Pirc — Ataque Austríaco (6.e5, 6.Be2 e 5...c5)',
  fonte: 'Modern Chess Openings — Pirc Defense, Austrian Attack (pp. 367–368), colunas 7–12',
  base: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3',
  corPadrao: 'b',
  ordem: 367,
  grupos: [
    { id: 'e5', nome: '5...O-O 6.e5', colunas: [7, 8] },
    { id: 'be2', nome: '5...O-O 6.Be2', colunas: [9] },
    { id: 'c5', nome: '5...c5', colunas: [10, 11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
