// Transcrição do MCO 15ª ed. — Índia do Rei, Clássica, Ataque Baioneta: 10.g3, 10.c5, 10.Nd2 e 9...a5 (pp. 599–601),
// colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs india-rei-c
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-c-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 13 (b) =, 14 (d) =, 15 (g) ∓, 16 (l) ∓, 17 (p) =, 18 (w) =.
// Avaliações tiradas do texto: (f) A empate combinado: =; (f) B "as pretas ficam melhor" ficou ∓; (j) "parece
// suspeito para as pretas" ficou ⩲; (l) 22.Rc2 "bom para as brancas" ficou ±; (m) "boas chances de ataque para as
// pretas" ficou ∓; (n) "vantagem para as pretas" ficou ⩱; (o) A as pretas abandonaram: +-; (o) 16.Qxf3 "ganha":
// -+; (s) "chances para os dois lados" ficou ∞.
// Sinais conferidos com zoom: (c), (c) 14.bxa5, (k), (r), (r) 10...c5 ±; (g), (l) ∓; (t), (u) ⩲.
// Erratas: (r) "11 Neq" ficou 11.Ne1 (o único lance de cavalo que deixa a dama recapturar em a5 e libera d2 para o
// bispo); (t) "16 Qc7" é impossível; ficou 16.Qc2.

const F = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 Nf3 O-O 6 Be2 e5 7 O-O Nc6 8 d5 Ne7 9 b4'
const H = `${F} Nh5`
const G = `${H} 10 g3 f5 11 Ng5 Nf6 12 f3 c6`
const C = `${H} 10 c5 Nf4 11 Bxf4 exf4 12 Rc1`

const colunas = {
  c13: [`${G} 13 b5 Ne8 14 bxc6 bxc6 15 Kg2 h6 16 Nh3 c5 17 Bd2 g5`, 'g3', '10.g3 ... 13.b5', '=',
    'Com 10.g3 f5 11.Ng5 Nf6 12.f3 c6 13.b5 as brancas abrem a coluna b. Depois de 13...Ne8 14.bxc6 bxc6 15.Kg2 h6 16.Nh3 c5 17.Bd2 g5 o jogo fica igual.'],
  c14: [`${G} 13 Kg2 h6 14 Ne6 Bxe6 15 dxe6 Ne8 16 Qb3 Nc7 17 c5 d5`, 'g3', '13.Kg2', '=',
    'Com 13.Kg2 as brancas protegem a ala do rei antes de agir. Depois de 13...h6 14.Ne6 Bxe6 15.dxe6 Ne8 16.Qb3 Nc7 17.c5 d5 o jogo fica igual.'],
  c15: [`${C} a5 13 cxd6 cxd6 14 Nb5 Bg4 15 Rc7 axb4 16 Qd2 Bxf3 17 Bxf3 Be5`, 'c5', '10.c5 Nf4 ... 12...a5', '∓',
    'Com 10.c5 as brancas aceleram o ataque na ala da dama e cedem o par de bispos. Depois de 10...Nf4 11.Bxf4 exf4 12.Rc1 a5! 13.cxd6 cxd6 14.Nb5 Bg4! 15.Rc7 axb4 16.Qd2 Bxf3 17.Bxf3 Be5 as pretas ficam um pouco melhor.'],
  c16: [`${C} h6 13 Nd2 g5 14 Nc4 a6 15 a4 Ng6 16 cxd6 cxd6 17 a5 Re8`, 'c5', '12...h6', '∓',
    'O lance 12...h6 é mais fraco que 12...a5. Depois de 13.Nd2 g5 14.Nc4 a6 15.a4 Ng6 16.cxd6 cxd6 17.a5 Re8 o jogo segue complicado.'],
  c17: [`${H} 10 Nd2 Nf4 11 a4 f5 12 Bf3 g5 13 exf5 Nxf5 14 g3 Nh3+ 15 Kg2 Qd7 16 Nb3 Nd4 17 Nxd4 exd4`, 'nd2', '10.Nd2', '=',
    'Com 10.Nd2 o cavalo vai a b3 ou c4. Depois de 10...Nf4 11.a4 f5 12.Bf3 g5 13.exf5 Nxf5 14.g3 Nh3+ 15.Kg2 Qd7 16.Nb3 Nd4 17.Nxd4 exd4 o jogo fica igual.'],
  c18: [`${F} a5 10 Ba3 axb4 11 Bxb4 b6 12 a4 Ne8 13 Qb3 Rb8 14 Nb5 f5 15 a5 fxe4 16 Nd2 bxa5 17 Bxa5 Nf5`, 'a5', '9...a5', '=',
    'Com 9...a5 as pretas atacam logo o peão b4. Depois de 10.Ba3 axb4 11.Bxb4 b6 12.a4 Ne8 13.Qb3 Rb8 14.Nb5 f5 15.a5 fxe4 16.Nd2 bxa5 17.Bxa5 Nf5 o jogo fica igual.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '13... c5 14 g4 f4 15 h4 Bd7 16 Rf2 Qc8 17 Rg2 h6 18 Nh3 Nh5', { a: '∓', r: 'Nagendra–Uhlmann, Campeonato Alemão 1993', c: '13...c5 14.g4?! f4 15.h4 Bd7 16.Rf2 Qc8 17.Rg2 h6 18.Nh3 Nh5 é melhor para as pretas.' }],
  ['c13-a', '1', 'a', '(a) 14.Ne6', '14 Ne6 Bxe6 15 dxe6', { a: '±', c: '14.Ne6!? Bxe6 15.dxe6 era melhor para as brancas.' }],
  ['c13', 'b', 'b', '(b)', '18 exf5 Nxf5 19 Nf2 Nd4 20 g4 Nf6 21 Nfe4 Rf7 22 Rb1 Qd7 23 Bd3', { a: '=', r: 'Muse–Uhlmann, Alemanha 1993', c: '18.exf5 Nxf5 19.Nf2 Nd4 20.g4 Nf6 21.Nfe4 Rf7 22.Rb1 Qd7 23.Bd3 leva à igualdade.' }],
  // Coluna 14
  ['c14', 'c', 'c', '(c)', '13... a5 14 b5 c5 15 Qd3 fxe4 16 fxe4 b6 17 Ne6 Bxe6 18 dxe6 Qc7 19 Bg5 h6 20 Bxf6 Bxf6 21 Bg4 h5 22 Bh3 Bg5 23 Nd5', { a: '±', r: 'Dumitrache–Cosma, Romênia 1991', c: '13...a5?! 14.b5 c5 15.Qd3 fxe4 16.fxe4 b6 17.Ne6 Bxe6 18.dxe6 Qc7 19.Bg5 h6 20.Bxf6 Bxf6 21.Bg4 h5 22.Bh3 Bg5 23.Nd5 é melhor para as brancas.' }],
  ['c14-c', '1', 'c', '(c) 14.bxa5', '14 bxa5 Qxa5 15 Qb3 h6 16 Ne6 Bxe6 17 dxe6 Rfb8 18 a4 Kh7 19 Rd1', { a: '±', r: 'Burger–Anderson, Filadélfia 1992', c: '14.bxa5 Qxa5 15.Qb3 h6 16.Ne6 Bxe6 17.dxe6 Rfb8 18.a4 Kh7 19.Rd1 também é melhor para as brancas.' }],
  ['c14', 'd', 'd', '(d)', '18 exd5 cxd5 19 Rd1 Kh7 20 Bb2 d4 21 Nb5 Nxb5 22 Bxb5 Nd5 23 f4 Ne3+ 24 Qxe3 dxe3 25 Rxd8 Rfxd8', { a: '=', r: 'Speelman–Akopian, Debrecen 1992', c: '18.exd5 cxd5 19.Rd1 Kh7 20.Bb2 d4 21.Nb5 Nxb5 22.Bxb5 Nd5 23.f4 Ne3+ 24.Qxe3 dxe3 25.Rxd8 Rfxd8 leva à igualdade.' }],
  // Coluna 15
  ['c15', 'e-A', 'e', '(e) A', '10... f5 11 exf5 Nxf5', { a: '=', c: '10...f5 11.exf5 Nxf5 leva à igualdade.' }],
  ['c15', 'e-B', 'e', '(e) B', '10... f5 11 exf5 e4 12 Nd4 Nxf5 13 Nxf5 Bxf5 14 Bd2', { a: '=', r: 'Ginsburg–Wharton, World Open 1990', c: '10...f5 11.exf5 e4 12.Nd4 Nxf5 13.Nxf5 Bxf5 14.Bd2 também leva à igualdade.' }],
  ['c15-e-B', '1', 'e', '(e) B 13...Rxf5', '13... Rxf5 14 Qc2 Qh4 15 g3 Qh3', { c: 'Nunn sugere 13...Rxf5 14.Qc2 Qh4 15.g3 Qh3!?.' }],
  ['c15', 'f-A', 'f', '(f) A', '13 bxa5 Rxa5 14 cxd6 cxd6 15 Qb3 Kh8 16 Rfd1 Rc5 17 Na4', { a: '=', r: 'Skembris–Ivanović, Olimpíada de Novi Sad 1990', c: '13.bxa5 Rxa5 14.cxd6 cxd6 15.Qb3 Kh8 16.Rfd1 Rc5 17.Na4 e empate combinado.' }],
  ['c15', 'f-B', 'f', '(f) B', '13 a3 Bg4 14 Nb5 axb4 15 axb4 Ra2 16 Rc2 Ra4 17 Rc4 Ra6 18 Qd2 Bxf3 19 Bxf3 g5', { a: '∓', r: 'Kaabi–Ubilava, Olimpíada de Manila 1992', c: '13.a3 Bg4 14.Nb5 axb4 15.axb4 Ra2 16.Rc2 Ra4 17.Rc4 Ra6 18.Qd2 Bxf3 19.Bxf3 g5: com o cavalo indo para e5, as pretas ficam melhor.' }],
  ['c15', 'g', 'g', '(g)', '18 Rxb7 Qa5 19 Nd4 Qxa2 20 Qxa2 Rxa2 21 Rxb4 Rfa8 22 Bg4 Bxd4 23 Rxd4 g5', { a: '∓', r: 'Kamsky–Kasparov, Intel Grand Prix 1994', c: '18.Rxb7 Qa5 19.Nd4 Qxa2 20.Qxa2 Rxa2 21.Rxb4 Rfa8 22.Bg4 Bxd4 23.Rxd4 g5 é melhor para as pretas.' }],
  // Coluna 16
  ['c16', 'h-A', 'h', '(h) A', '12... f5 13 e5 dxe5 14 d6 cxd6 15 cxd6 Nc6 16 Qd5+ Kh8 17 b5 Nd4 18 Nxe5 Nxe2+ 19 Nxe2 Qe8 20 d7 Bxd7 21 Nxd7 Rd8', { a: '∞', r: 'análise de Nunn', c: '12...f5 13.e5 dxe5 14.d6 cxd6 15.cxd6 Nc6 16.Qd5+ Kh8 17.b5 Nd4 18.Nxe5 Nxe2+ 19.Nxe2 Qe8 20.d7 Bxd7 21.Nxd7 Rd8 dá um jogo obscuro.' }],
  ['c16-h-A', '1', 'h', '(h) A 18...Qe8', '18... Qe8 19 Qxd4 Bxe5 20 Qb4 Be6 21 Bf3 Qd7 22 Rfe1 Qg7 23 Bxb7 Rad8', { a: '∞', c: '18...Qe8 19.Qxd4 Bxe5 20.Qb4 Be6 21.Bf3 Qd7 22.Rfe1 Qg7 23.Bxb7 Rad8 também fica obscuro.' }],
  ['c16', 'h-B', 'h', '(h) B', '12... Bg4 13 Nd4 Bxe2 14 Ncxe2 g5 15 g3 Ng6 16 Nf5 Re8 17 f3 Be5 18 Qd2 Kh8 19 Kh1 a6 20 Rc2 h5 21 Rfc1 Qf6 22 cxd6 cxd6 23 Rc7', { a: '±', r: 'Vladimirov–Khuzman, URSS 1990', c: '12...Bg4?! 13.Nd4 Bxe2 14.Ncxe2 g5 15.g3 Ng6 16.Nf5 Re8 17.f3 Be5 18.Qd2 Kh8 19.Kh1 a6 20.Rc2 h5 21.Rfc1 Qf6 22.cxd6 cxd6 23.Rc7 é melhor para as brancas.' }],
  ['c16', 'i-A', 'i', '(i) A', '13 h3 g5 14 a4 Ng6 15 a5 Re8 16 Nd2 f5 17 cxd6 cxd6 18 exf5 Bxf5 19 Nb5 Bb2', { a: '∓', r: 'Sosonko–van Wely, Campeonato Holandês 1995', c: '13.h3 é útil, mas talvez desnecessário: 13...g5 14.a4 Ng6 15.a5 Re8 16.Nd2 f5 17.cxd6 cxd6 18.exf5 Bxf5 19.Nb5 Bb2 é melhor para as pretas.' }],
  ['c16-i-A', '1', 'i', '(i) A 18.Nb5', '18 Nb5', { a: '±', r: 'Sosonko', c: 'Sosonko indica 18.Nb5! como melhor para as brancas.' }],
  ['c16', 'i-B', 'i', '(i) B', '13 a4', { c: '13.a4 pode transpor para as linhas de 13.h3 ou 13.Nd2.' }],
  ['c16', 'i-C', 'i', '(i) C', '13 Nd4 g5 14 Bh5 c6 15 Nb3 cxd5 16 exd5 a5 17 Nb5 a4 18 Na5 dxc5 19 d6 Nf5 20 Rxc5 b6 21 Nc6', { a: '±', r: 'Beliavsky–Romero Holmes, León 1994', c: '13.Nd4!? g5 14.Bh5! c6 15.Nb3 cxd5 16.exd5 a5 17.Nb5 a4 18.Na5 dxc5 19.d6 Nf5 20.Rxc5 b6 21.Nc6 é melhor para as brancas.' }],
  ['c16', 'j', 'j', '(j)', '13... Bxc3 14 Rxc3 Re8 15 Bc4 a5 16 a3 axb4 17 axb4 Kg7', { a: '⩲', c: '13...Bxc3 14.Rxc3 Re8 15.Bc4 a5 16.a3 axb4 17.axb4 Kg7 deixa as pretas numa posição suspeita.' }],
  ['c16', 'k', 'k', '(k)', '14... Ng6 15 Bg4 Ne5 16 Nxe5 Bxe5 17 Bxc8 Rxc8 18 Nb5', { a: '±', r: 'Lein–Rohde, Nova York 1977', c: '14...Ng6 15.Bg4 Ne5? 16.Nxe5 Bxe5 17.Bxc8 Rxc8 18.Nb5 é melhor para as brancas.' }],
  ['c16', 'l', 'l', '(l)', '18 Nb6 Rb8 19 Bh5 Ne5 20 h3 Qf6 21 f3 Bd7 22 Bg4 Bxg4 23 hxg4 h5', { a: '∓', r: 'Skembris–Milos, Olimpíada de Novi Sad 1990', c: '18.Nb6 Rb8 19.Bh5 (19.Bd3!?) 19...Ne5 20.h3 Qf6 21.f3 Bd7?! 22.Bg4? Bxg4 23.hxg4 h5! é melhor para as pretas.' }],
  ['c16-l', '1', 'l', '(l) 21...Nd7', '21... Nd7', { c: 'Milos recomenda 21...Nd7!.' }],
  ['c16-l', '2', 'l', '(l) 22.Rc2', '22 Rc2', { a: '±', r: 'Milos', c: '22.Rc2, com Qe2 e Rfc1, seria bom para as brancas.' }],
  // Coluna 17
  ['c17', 'm', 'm', '(m)', '11 Bf3 f5 12 a4 Kh8 13 Nb3 g5 14 exf5 Nxf5 15 g3 Nh3+ 16 Kg2 Nh6 17 Be4 Ng4 18 Ra2 Qe8 19 f3 Nf6 20 Bb1 Qh5', { a: '∓', r: 'Sosonko–Nijboer, Campeonato Holandês 1996', c: '11.Bf3 f5 12.a4 Kh8 13.Nb3 g5 14.exf5 Nxf5 15.g3 Nh3+ 16.Kg2 Nh6 17.Be4 Ng4 18.Ra2 Qe8 19.f3 Nf6 20.Bb1 Qh5 dá às pretas boas chances de ataque.' }],
  ['c17-m', '1', 'm', '(m) 11...Nd3', '11... Nd3 12 Ba3 a5 13 bxa5 Rxa5', { a: '=', c: '11...Nd3!? 12.Ba3 a5 13.bxa5 Rxa5 leva à igualdade.' }],
  ['c17', 'n', 'n', '(n)', '14 Nde4 Nh4', { a: '⩱', c: '14.Nde4 Nh4 dá uma pequena vantagem às pretas.' }],
  ['c17', 'o', 'o', '(o)', '14... Nd4 15 gxf4 Nxf3+ 16 Nxf3 e4 17 Nxg5 Bxc3 18 Ra3 Bg7 19 Rg3', { a: '+-', r: 'Martin–Britton, Campeonato Britânico 1991', c: '14...Nd4 15.gxf4 Nxf3+ 16.Nxf3 e4? 17.Nxg5 Bxc3 18.Ra3 Bg7 19.Rg3 e as pretas abandonaram.' }],
  ['c17-o', '1', 'o', '(o) 16.Qxf3', '16 Qxf3 g4 17 Qh1 exf4 18 Bb2 Bf5 19 Rfe1 f3', { a: '-+', r: 'Petrosian–Gligorić, Zagreb 1970', c: '16.Qxf3 g4 17.Qh1? exf4 18.Bb2 Bf5 19.Rfe1 f3 ganha para as pretas; melhor 17.Qd3!? ou 17.Qd1! (Speelman).' }],
  ['c17', 'p', 'p', '(p)', '18 Nb5 c6 19 Na3 c5', { a: '=', c: '18.Nb5 c6 19.Na3 c5 leva à igualdade.' }],
  // Coluna 18
  ['c18', 'q', 'q', '(q)', '9... c6 10 Nd2 a5 11 bxa5 Qxa5 12 Bb2 c5 13 a4 Nd7 14 Nb5 Ra6 15 Ra3', { a: '±', r: 'Roiz–Sutovsky, Tel Aviv 2002', c: '9...c6!? 10.Nd2 a5 11.bxa5 Qxa5 12.Bb2 c5 13.a4 Nd7 14.Nb5 Ra6 15.Ra3 é melhor para as brancas.' }],
  ['c18', 'r', 'r', '(r)', '10 bxa5 Rxa5 11 a4 c5 12 Ra3 Ra6 13 Re1 Ne8 14 Nb5', { a: '±', r: 'Gulko–Smirin, Beer Sheva 2005', c: '10.bxa5 Rxa5 11.a4 c5 12.Ra3 Ra6 13.Re1 Ne8 14.Nb5 é melhor para as brancas.' }],
  ['c18-r', '1', 'r', '(r) 10...c5', '10... c5 11 Ne1 Qxa5 12 Bd2 Ne8 13 a4 Qd8 14 Ra3 f5 15 exf5 gxf5 16 f4', { a: '±', r: 'Yermolinsky–Fedorowicz, Campeonato dos EUA 2000', c: '10...c5 11.Ne1 Qxa5 12.Bd2 Ne8 13.a4 Qd8 14.Ra3! f5 15.exf5 gxf5 16.f4 é melhor para as brancas. (O livro imprime "11 Neq".)' }],
  ['c18', 's', 's', '(s)', '10... b6 11 bxa5 Nh5 12 Re1 f5 13 Bb4 bxa5 14 Ba3 Nf6 15 Bd3 fxe4 16 Nxe4 Bg4', { a: '∞', r: 'Kramnik–Smirin, Belgrado 1999', c: '10...b6!? 11.bxa5 Nh5 12.Re1 f5 13.Bb4 bxa5 14.Ba3 Nf6 15.Bd3 fxe4 16.Nxe4 Bg4 dá chances para os dois lados.' }],
  ['c18', 't', 't', '(t)', '11... Nd7 12 a4 Bh6 13 a5 f5 14 Bd3 Kh8 15 Nd2 Ng8 16 Qc2 Rf7 17 Rad1 Ndf6 18 c5', { a: '⩲', r: 'van Wely–Morozevich, Melody Amber 2006', c: '11...Nd7 12.a4 Bh6 13.a5 f5 14.Bd3 Kh8 (14...Rf7 15.Re1!) 15.Nd2 Ng8 16.Qc2 Rf7 17.Rad1 Ndf6 18.c5! é um pouco melhor para as brancas. (O livro imprime "16 Qc7".)' }],
  ['c18', 'u', 'u', '(u)', '12... Re8 13 Re1', { a: '⩲', c: 'Contra 12...Re8 (lance de Lanca), o melhor é 13.Re1, um pouco melhor para as brancas.' }],
  ['c18', 'v', 'v', '(v)', '13 a5 c5', { c: '13.a5? é respondido com 13...c5!.' }],
  ['c18', 'w', 'w', '(w)', '18 Nxe4 Bd7 19 Qd1 Bxb5 20 cxb5 Nd4 21 Rb1 Nf6', { a: '=', r: 'I. Sokolov–Kindermann, Nussloch 1996', c: '18.Nxe4 Bd7 19.Qd1 Bxb5 20.cxb5 Nd4 21.Rb1 Nf6 leva à igualdade.' }],
]

const capitulo = {
  id: 'india-rei-c',
  arquivo: 'india-rei-c',
  nome: 'Índia do Rei — Baioneta: 10.g3, 10.c5, 10.Nd2',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 599–601), colunas 13–18",
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. b4',
  corPadrao: 'b',
  ordem: 599,
  grupos: [
    { id: 'g3', nome: '9...Nh5 10.g3', colunas: [13, 14] },
    { id: 'c5', nome: '9...Nh5 10.c5', colunas: [15, 16] },
    { id: 'nd2', nome: '9...Nh5 10.Nd2', colunas: [17] },
    { id: 'a5', nome: '9...a5', colunas: [18] },
  ],
}

module.exports = { capitulo, colunas, notas }
