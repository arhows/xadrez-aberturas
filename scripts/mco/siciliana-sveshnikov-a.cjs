// Transcrição do MCO 15ª ed. — Siciliana com 2...Nc6 e ...e5: Variante Sveshnikov (pp. 338–340), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-sveshnikov-a
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-sveshnikov-a-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.
// Coluna 5: o livro escreve "17 Re1 Bf5", mas o peão branco está em f5; o lance é 17...Bxf5.
// Nota (i): o livro numera "21 Be2 Nxd5 20 Qg5"; o lance das brancas é o 22º (22.Qg5).
// Nota (l) A: o sinal de avaliação está ilegível no PDF ("6"); usamos ±, pelo sentido do texto.
// Nota (w) A: "13 e3" no PDF é 13.c3 (o peão e já está em e4).

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 e5 6 Ndb5 d6 7 Bg5 a6 8 Na3 b5 9 Bxf6 gxf6 10 Nd5'

const colunas = {
  c01: [`${B} f5 11 Bd3 Be6 12 Qh5 Rg8 13 g3 Nd4 14 c3 fxe4 15 Bxe4 Bg4 16 Qxh7 Rg7 17 Qh6 Nf3+`, 'f5', '10...f5 11.Bd3 Be6 12.Qh5', '=',
    'Na Sveshnikov as pretas aceitam peões dobrados em f6 e a casa fraca em d5 em troca do par de bispos e de muita atividade. Com 12.Qh5 Rg8 13.g3 Nd4 o jogo fica muito agudo; depois de 17...Nf3+ as brancas precisam decidir onde pôr o rei, e o jogo fica igual.'],
  c02: [`${B} f5 11 Bd3 Be6 12 c3 Bg7 13 O-O Bxd5 14 exd5 Ne7 15 Qh5 e4 16 Bc2 Qc8 17 Rae1 O-O`, 'f5', '12.c3 Bg7 13.O-O', '=',
    'Com 12.c3 e 13.O-O as brancas jogam com calma. As pretas trocam o cavalo de d5 e avançam ...e4; depois de 17...O-O o jogo fica igual.'],
  c03: [`${B} f5 11 c3 Bg7 12 exf5 Bxf5 13 Nc2 O-O 14 Nce3 Be6 15 Bd3 f5 16 O-O Ra7 17 a4 Ne7`, 'f5', '11.c3 Bg7 12.exf5', '⩲',
    'Com 11.c3 e 12.exf5 as brancas trazem o cavalo de a3 por c2 até e3, para dominar d5 e f5. As pretas defendem a ala da dama com ...Ra7; as brancas ficam com uma pequena vantagem.'],
  c04: [`${B} f5 11 Nxb5 axb5 12 Bxb5 Bd7 13 exf5 Bg7 14 a4 Nd4 15 Bxd7+ Qxd7 16 c3 Qc6 17 Ne3 Bh6`, 'f5', '11.Nxb5', '=',
    'Com 11.Nxb5 as brancas sacrificam o cavalo por dois peões e o ataque ao rei preto no centro. As pretas devolvem material e, depois de 17...Bh6, o jogo termina em empate.'],
  c05: [`${B} Bg7 11 Bd3 Ne7 12 Nxe7 Qxe7 13 O-O O-O 14 c3 f5 15 Nc2 Rb8 16 exf5 e4 17 Re1 Bxf5`, 'bg7', '10...Bg7 11.Bd3', '⩲',
    'Com 10...Bg7 as pretas trocam logo o cavalo de d5 por ...Ne7. Depois de 14...f5 e 16...e4 elas ganham atividade, mas as brancas mantêm uma pequena vantagem.'],
  c06: [`${B} Bg7 11 c3 Ne7 12 Nxe7 Qxe7 13 Nc2 f5 14 exf5 O-O 15 Ne3 Bb7 16 Be2 Rad8 17 Nd5 Qg5`, 'bg7', '11.c3', '±',
    'Com 11.c3 e 13.Nc2 o cavalo vai para e3 e d5. Esta linha é difícil para as pretas: depois de 17...Qg5 18.h4! as brancas ficam melhor.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '12... Bg7 13 O-O f4 14 c4 bxc4 15 Bxc4 O-O 16 Rac1 Kh8 17 Rfd1 Rb8 18 b3', { a: '⩲', r: 'Ernst–Benjamin, Reykjavík 1990', c: 'Contra o antigo 12...Bg7 as brancas ficam com uma pequena vantagem.' }],
  ['c01-a', '1', 'a', '(a) 13...O-O', '13... O-O 14 exf5 Bxd5 15 f6', { a: '+−', c: '13...O-O? 14.exf5 Bxd5 15.f6 ganha.' }],
  ['c01', 'b', 'b', '(b)', '13... Rg4 14 f4 exf4 15 Nxf4 Rxf4 16 gxf4 Qa5+ 17 Kd1 Qb4 18 exf5 Bd5 19 Re1+ Kd7 20 f6', { a: '±', r: 'Motylev–Tzermiadianos, Istambul 2003', c: '13...Rg4 14.f4 exf4 15.Nxf4 Rxf4 dá às pretas jogo, mas depois de 20.f6! as brancas ficam melhor.' }],
  ['c01-b', '1', 'b', '(b) 14...Bg7', '14... Bg7 15 c3 b4 16 Nc2 bxc3 17 Nxc3 exf4 18 exf5 Rg5 19 Qxh7 Bxc3+ 20 bxc3 Bd5 21 gxf4', { a: '±', r: 'Magem Badals–I. Sokolov, Barcelona 1992', c: '14...Bg7?! 15.c3 b4 também deixa as brancas melhor.' }],
  ['c01', 'c', 'c', '(c)', '14 O-O-O Rc8 15 f4 Bxd5 16 exd5 Qf6 17 c3 e4 18 Rhe1 b4 19 Bxa6 Rc5 20 Rxd4 bxa3 21 Rb4 axb2+ 22 Kb1 Qxc3 23 Rb8+ Ke7 24 Qh4+ Rg5 25 Qxg5+ f6 26 Rb7+ Kd8', { a: '=', r: 'Barcenilla–Altan, Campeonato Mundial Júnior 1991', c: '14.O-O-O Rc8 leva a uma posição aguda, com chances de ataque para os dois lados; com 24...Rg5! as pretas empatam.' }],
  ['c01-c', '1', 'c', '(c) 24...f6', '24... f6 25 Qxh7+ Rg7 26 Rxe4+', { c: '24...f6?! 25.Qxh7+ Rg7 26.Rxe4+! é bom para as brancas.' }],
  ['c01', 'd-A', 'd', '(d) A', '18 Ke2 Ng5+ 19 f3 Nxe4 20 fxg4 Qc8 21 Qe3 Qxg4+ 22 Qf3 Qxf3+ 23 Kxf3 f5 24 Nc2 Kf7 25 Nce3', { r: 'Lie–Gabrielsen, Campeonato Norueguês 2006', c: 'Aqui as brancas têm uma decisão importante sobre onde pôr o rei. Com 18.Ke2 as damas saem.' }],
  ['c01-d-A', '1', 'd', '(d) A 25...Nf6', '25... Nf6', { a: '=', c: 'Agora as pretas igualam com 25...Nf6.' }],
  ['c01-d-A', '2', 'd', '(d) A 25...Ke6', '25... Ke6 26 Nxf5', { c: '25...Ke6? 26.Nxf5! foi o que aconteceu na partida, e as brancas ficaram melhor.' }],
  ['c01', 'd-B', 'd', '(d) B', '18 Kf1 Rg5 19 Nf6+ Ke7 20 Qh8 Nd2+ 21 Kg2 Nxe4 22 Nxe4 Rg6 23 Qh4+ Kd7 24 Qxd8+ Rxd8', { a: '=', r: 'Magem Badals–Zsu. Polgár, Madri 1992', c: 'Com 18.Kf1 as brancas ganham um peão, mas o par de bispos das pretas compensa.' }],
  // Coluna 2
  ['c02', 'e', 'e', '(e)', '12 O-O Bxd5 13 exd5 Ne7 14 c3 Bg7', { c: '12.O-O Bxd5! 13.exd5 Ne7 14.c3 Bg7 volta à coluna.' }],
  ['c02-e', '1', 'e', '(e) 14.Nxb5', '14 Nxb5 Bg7 15 Nc3 e4 16 Bc4 Qa5', { c: '14.Nxb5 Bg7! 15.Nc3 e4 16.Bc4 Qa5 dá às pretas bom jogo pelo peão.' }],
  ['c02', 'f-A', 'f', '(f) A', '13 Qh5 O-O 14 exf5 Bxd5 15 f6 e4 16 fxg7 Re8 17 Be2 Re5 18 Qh6 b4 19 Nc2 bxc3 20 bxc3 Qg5 21 Qxg5 Rxg5 22 O-O Be6 23 Rfd1 Rc5', { a: '=', r: 'Anand–van Wely, Wijk aan Zee 2003', c: '13.Qh5 O-O 14.exf5 Bxd5 15.f6 leva a um jogo igual.' }],
  ['c02-f-A', '1', 'f', '(f) A 22.Rd1', '22 Rd1', { c: '22.Rd1!? também merece atenção.' }],
  ['c02', 'f-B', 'f', '(f) B', '13 Qh5 O-O 14 Ne3 f4 15 Nf5 Qf6 16 g4 Bxf5 17 exf5 e4', { a: '∓', r: 'Ramer–Schandorff, Vlissingen 2004', c: '13.Qh5 O-O 14.Ne3!? f4 15.Nf5 Qf6 16.g4 Bxf5 17.exf5?! e4! deixa as pretas um pouco melhor.' }],
  ['c02', 'g', 'g', '(g)', '15 Nc2 O-O 16 a4 e4 17 Be2 bxa4 18 Rxa4 Qb6 19 Rb4 Qc5', { a: '=', r: 'Sadvakasov–Khalifman, Liga Russa 2005', c: 'Com 15.Nc2 O-O 16.a4 o jogo fica igual.' }],
  ['c02', 'h', 'h', '(h)', '15... Qd7 16 Rad1 O-O 17 Bb1 Rae8 18 Nc2 e4 19 Nd4', { a: '⩲', r: 'Minasian–van Wely, Khanty-Mansiysk 2005', c: '15...Qd7 16.Rad1 O-O 17.Bb1; depois de 18...e4 19.Nd4 as brancas ficam um pouco melhor.' }],
  ['c02', 'i', 'i', '(i)', '18 Bb3 a5 19 Nxb5 a4 20 Bd1 Qc5 21 Be2 Nxd5 22 Qg5 Rab8', { a: '=', r: 'Pelletier–McShane, Biel 2004', c: 'Com 18.Bb3 a5 19.Nxb5 a4 as pretas recuperam o peão, e o jogo fica igual.' }],
  // Coluna 3
  ['c03', 'j', 'j', '(j)', '11 exf5 Bxf5 12 c3 Bg7', { c: 'A posição do 13º lance muitas vezes surge pela ordem 11.exf5 Bxf5 12.c3 Bg7, que dá às brancas a chance de errar no 12º lance.' }],
  ['c03-j', 'A', 'j', '(j) A', '12 Qf3 Nd4 13 Nc7+ Qxc7 14 Qxa8+ Ke7 15 c3 b4 16 cxb4 Bh6', { a: '∓', c: '12.Qf3? Nd4! 13.Nc7+ Qxc7 14.Qxa8+ Ke7 deixa as pretas melhor.' }],
  ['c03-j-A', '1', 'j', '(j) A 17.Qxh8', '17 Qxh8 Qb7', { a: '−+', c: '17.Qxh8?! Qb7 ganha.' }],
  ['c03-j', 'B', 'j', '(j) B', '12 Bd3 e4 13 Qe2 Nd4 14 Qe3 Bg7 15 f3 Qh4+ 16 g3 Nxf3+ 17 Qxf3 exf3 18 gxh4 Bxd3 19 cxd3 Bxb2', { a: '∓', c: '12.Bd3 e4 13.Qe2 Nd4 também deixa as pretas melhor.' }],
  ['c03-j-B', '1', 'j', '(j) B 15.Bxe4', '15 Bxe4 O-O', { a: '∓', c: '15.Bxe4 O-O é bom para as pretas.' }],
  ['c03', 'k', 'k', '(k)', '11... fxe4 12 Bxb5 axb5 13 Nxb5 Qg5 14 Nbc7+ Kd8 15 Nxa8 Qxg2 16 Rf1 Ba6 17 Ne3 Qf3 18 Rg1 Bd3 19 Qxf3 exf3 20 Rd1 e4 21 Rxd3 exd3 22 Nb6', { a: '+−', r: 'Z. Almasi–Kuhn, Budapeste 1992', c: '11...fxe4? agora cai num sacrifício vencedor: 12.Bxb5! axb5 13.Nxb5; as brancas venceram o final contra os peões arruinados das pretas.' }],
  ['c03', 'l-A', 'l', '(l) A', '13... Ne7 14 Bd3 Nxd5 15 Bxf5 Ne7 16 Qg4', { a: '±', r: 'Ivanchuk–Kramnik, Novgorod 1994', c: '13...Ne7?! 14.Bd3! Nxd5 15.Bxf5 deixa as brancas melhor.' }],
  ['c03-l-A', '1', 'l', '(l) A 14...Be6', '14... Be6 15 Nxe7 Qxe7 16 Be4', { a: '±', c: '14...Be6 15.Nxe7 Qxe7 16.Be4 também deixa as brancas melhor.' }],
  ['c03', 'l-B', 'l', '(l) B', '13... Be6 14 Nce3 Ne7 15 a4 Nxd5 16 Nxd5 O-O 17 Be2 bxa4 18 Rxa4', { a: '⩲', r: 'de Firmian–Kiss, Kavala 2006', c: '13...Be6 14.Nce3 Ne7 15.a4 dá uma pequena vantagem às brancas.' }],
  ['c03', 'm', 'm', '(m)', '16... e4 17 Nf4 Bf7 18 Bc2 Be5 19 Nh3 Kh8 20 f4', { a: '⩲', r: 'de Firmian–Shabalov, Virginia Beach 2007', c: '16...e4 17.Nf4 Bf7 18.Bc2 dá uma pequena vantagem às brancas.' }],
  ['c03', 'n', 'n', '(n)', '18 Nxe7+ Rxe7 19 axb5 axb5 20 Bxb5 d5 21 Ra6 f4 22 Rxe6 Rxe6 23 Qxd5', { a: '⩲', r: 'Anand–Leko, Wijk aan Zee 2005', c: 'Com 18.Nxe7+ Rxe7 19.axb5 e 22.Rxe6! as brancas ficam um pouco melhor, porque os dois peões passados têm futuro.' }],
  // Coluna 4
  ['c04', 'o', 'o', '(o)', '11 Bxb5 axb5 12 Nxb5 Ra4 13 Nbc7+ Kd7 14 O-O Rxe4 15 Qh5 Nd4 16 c3 Ne2+ 17 Kh1 Kc6 18 g3 Kb7 19 Rae1 Rc4 20 Na6 Ka8', { a: '∓', r: 'Mastrovasilis–Illescas, Olimpíada de Calvià 2004', c: 'O outro sacrifício em b5, 11.Bxb5, foi analisado até uma vantagem das pretas: 12...Ra4! e o rei preto foge para a8.' }],
  ['c04-o', '1', 'o', '(o) 16.Qxf7+', '16 Qxf7+ Kc6 17 Nb4+ Kb7', { a: '∓', c: '16.Qxf7+ Kc6 17.Nb4+ Kb7 também deixa as pretas melhor.' }],
  ['c04', 'p', 'p', '(p)', '12... Bb7 13 exf5 Rc8 14 c3 Bg7', { a: '=', r: 'Sulkis–van Wely, Aeroflot Open 2004', c: 'Menos testada, mas igualmente boa, é a defesa 12...Bb7 13.exf5 Rc8!?.' }],
  ['c04', 'q', 'q', '(q)', '16 O-O Qb7 17 c4 Rc8 18 f6 Bh6 19 Qd3 Qb6', { a: '∓', r: 'Olthof–Tyagunov, correspondência 1984', c: '16.O-O Qb7! 17.c4 Rc8 deixa as pretas um pouco melhor.' }],
  ['c04', 'r', 'r', '(r)', '18 cxd4 Bxe3 19 fxe3 Qxg2 20 Rf1 Qxb2', { a: '=', r: 'Nunn–Adorján, Skara 1980', c: 'Com 18.cxd4 Bxe3 19.fxe3 Qxg2 a partida terminou empatada.' }],
  // Coluna 5
  ['c05', 's', 's', '(s)', '13 c4 f5 14 O-O O-O 15 Qh5 Rb8 16 exf5 e4 17 Rae1 Bb7 18 Nc2 bxc4 19 Bxc4 d5 20 Bxd5 Bxd5 21 f6 Qxf6 22 Qxd5 Rxb2 23 Ne3 Qe6', { a: '=', r: 'Short–Illescas, Linares 1992', c: 'Contra 13.c4 as pretas precisam sacrificar um peão, mas têm boas chances.' }],
  ['c05-s', '1', 's', '(s) 14.cxb5', '14 cxb5 d5', { c: '14.cxb5 d5! dá às pretas um bom jogo.' }],
  ['c05-s', '2', 's', '(s) 15.Qf3', '15 Qf3 Re8 16 Rfe1 f4 17 cxb5 Qg5 18 h3 d5 19 exd5 f5', { c: '15.Qf3 Re8!? 16.Rfe1 f4 dá contrajogo às pretas (Ochoa).' }],
  ['c05-s', '3', 's', '(s) 15.Re1', '15 Re1 fxe4 16 Bxe4 Rb8 17 cxb5 axb5 18 Qd3 f5 19 Bd5+ Kh8 20 Nxb5 e4 21 Qb3 Be5 22 a4 Bd7 23 Rac1 Qe8 24 Bc4 Qh5', { r: 'Kosten–Chandler, Hastings 1991', c: '15.Re1 fxe4 16.Bxe4 Rb8 dá às pretas um ataque.' }],
  ['c05', 't', 't', '(t)', '13... f5 14 exf5 Bb7 15 Re1 Qg5 16 g3 O-O 17 c4 Rae8 18 Be4', { a: '±', r: 'Anand–Lobron, Dortmund 1996', c: '13...f5?! 14.exf5 deixa as brancas melhor.' }],
  ['c05', 'u', 'u', '(u)', '15... Bb7 16 exf5 d5 17 Re1 Qg5 18 Ne3', { a: '±', r: 'Borge–Schandorff, Dinamarca 1996', c: '15...Bb7 16.exf5 d5 17.Re1 Qg5 18.Ne3 deixa as brancas melhor.' }],
  ['c05-u', '1', 'u', '(u) 18...d4', '18... d4 19 cxd4 exd4 20 Qg4', { c: '18...d4 19.cxd4 exd4 20.Qg4 repele o ataque.' }],
  ['c05', 'v', 'v', '(v)', '18 Ne3 Bg6 19 Nd5 Qe5 20 Bc2', { a: '⩲', r: 'Anand–Radjabov, match de rápidas 2006', c: 'Com 18.Ne3 Bg6 19.Nd5 as brancas ficam com uma pequena vantagem.' }],
  // Coluna 6
  ['c06', 'w-A', 'w', '(w) A', '11 g3 f5 12 Bg2 f4 13 c3 O-O 14 Nc2 Kh8 15 Qd3 Bh6 16 a4 bxa4 17 Rxa4 a5 18 O-O Bd7 19 Raa1 f5', { a: '=', r: 'Zapata–Conquest, Cuba 1996', c: '11.g3 f5 12.Bg2 f4 leva à igualdade.' }],
  ['c06', 'w-B', 'w', '(w) B', '11 Qh5 Ne7 12 Ne3 f5 13 exf5 e4 14 O-O-O O-O', { a: '=', c: '11.Qh5 Ne7 12.Ne3 f5 13.exf5 e4! também é igual.' }],
  ['c06', 'x', 'x', '(x)', '11... f5', { c: '11...f5 transpõe para a coluna 3. É o recomendado, porque esta coluna é difícil para as pretas.' }],
  ['c06', 'y', 'y', '(y)', '18 h4 Qh6 19 Rh3 Kh8 20 Kf1 e4 21 g4', { a: '±', r: 'Adams–Nunn, Bruxelas 1992', c: 'Com 18.h4! Qh6 19.Rh3 e, depois de 20...e4, 21.g4! as brancas ficam claramente melhor.' }],
]

const capitulo = {
  id: 'siciliana-sveshnikov-a',
  arquivo: 'siciliana-sveshnikov-a',
  nome: 'Siciliana Sveshnikov A — 9.Bxf6 gxf6 10.Nd5',
  fonte: 'Modern Chess Openings — Sicilian Defense, Sveshnikov Variation (pp. 338–340), colunas 1–6',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Bxf6 gxf6 10. Nd5',
  corPadrao: 'b',
  ordem: 338,
  grupos: [
    { id: 'f5', nome: '10...f5', colunas: [1, 2, 3, 4] },
    { id: 'bg7', nome: '10...Bg7', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
