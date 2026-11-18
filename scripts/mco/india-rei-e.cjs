// Transcrição do MCO 15ª ed. — Índia do Rei, Clássica: 9.Bg5, 9.Kh1 e 7.Be3 (pp. 605–607), colunas 25–30.
// Gerar: node scripts/mco/gerar.cjs india-rei-e
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-e-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 25 (e) ⩲, 26 (k) =, 27 (n) ⩲, 28 (s) ⩲, 29 (w) =, 30 (z) ⩲.
// Avaliações tiradas do texto: (b) "mais ou menos igual" ficou =; (h) "chances equilibradas" ficou =; (i)
// "claramente melhor para as pretas" ficou ∓; (k) B "vantagem clara para as pretas" ficou ∓; (m) "chances para os
// dois lados" ficou ∞; (p) "contrajogo suficiente" ficou =; (u) "muito bom para as pretas" ficou ∓; (v) "boa
// compensação pelo peão" ficou = e 17.Qxc6? "perde" ficou -+; (w) 16.f3?! "bom para as pretas" ficou ∓.
// Sinais conferidos com zoom: (e), (l) 19.Bf1, (n), (p) 12...Nxf5, (s), (t) A, (x) B, (z) ⩲; (q) ±.
// Erratas: (t) A "10 d5 Nd7 11 h3 Nc6" é impossível (nenhum cavalo preto chega a d7 ou volta a c6); a linha foi
// cortada em 10.d5. (y) "11...exd5" é impossível (as pretas não têm mais peão e); ficou 11...cxd5. (f) A "14...bxc5"
// é impossível (não há peão preto em b6); ficou 14...dxc5.

const F = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 Nf3 O-O 6 Be2 e5'
const O = `${F} 7 O-O Nc6 8 d5 Ne7`
const E = `${F} 7 Be3`

const colunas = {
  c25: [`${O} 9 Bg5 Nh5 10 Ne1 Nf4 11 Nd3 Nxd3 12 Bxd3 f6 13 Bd2 f5 14 b4 Kh8 15 Rc1 c6`, 'outros9', '9.Bg5 Nh5', '⩲',
    'Com 9.Bg5 as brancas desenvolvem o bispo e incomodam o cavalo de f6, o que atrasa o ataque preto. Depois de 9...Nh5 10.Ne1 Nf4 11.Nd3 Nxd3 12.Bxd3 f6 13.Bd2 f5 14.b4 Kh8 15.Rc1 c6 as brancas ficam um pouco melhor.'],
  c26: [`${O} 9 Bg5 Nd7 10 Nd2 f5 11 exf5 gxf5 12 f4 Nf6 13 fxe5 dxe5 14 c5 h6 15 Bxf6 Rxf6`, 'outros9', '9...Nd7', '=',
    'Com 9...Nd7 o cavalo libera o peão f sem ir à borda. Depois de 10.Nd2 f5 11.exf5 gxf5 12.f4 Nf6 13.fxe5 dxe5 14.c5 h6 15.Bxf6 Rxf6 o jogo fica igual.'],
  c27: [`${O} 9 Kh1 Nd7 10 Bd2 Kh8 11 b4 Ng8 12 Rc1 f5 13 exf5 gxf5 14 Ng5 Ndf6 15 f4 e4`, 'outros9', '9.Kh1', '⩲',
    'O 9.Kh1, ideia de Larsen, tira o rei da diagonal sem comprometer as peças. Depois de 9...Nd7 10.Bd2 Kh8 11.b4 Ng8 12.Rc1 f5 13.exf5 gxf5 14.Ng5 Ndf6 15.f4 e4 as brancas ficam um pouco melhor.'],
  c28: [`${E} Ng4 8 Bg5 f6 9 Bh4 Nc6 10 d5 Ne7 11 Nd2 Nh6 12 f3 c5 13 Rb1 Nf7 14 O-O f5 15 b4 b6`, 'be3', '7.Be3 Ng4 8.Bg5 f6 9.Bh4', '⩲',
    'O 7.Be3 é o Sistema Gligorić–Taimanov: as brancas adiam o roque. Depois de 7...Ng4 8.Bg5 f6 9.Bh4 Nc6 10.d5 Ne7 11.Nd2 Nh6 12.f3 c5 13.Rb1 Nf7 14.O-O f5 15.b4 b6 as brancas ficam um pouco melhor.'],
  c29: [`${E} Ng4 8 Bg5 f6 9 Bc1 f5 10 exf5 Bxf5 11 h3 Nf6 12 dxe5 dxe5 13 Qxd8 Rxd8 14 Nxe5 Ne4 15 Nxe4 Bxe4`, 'be3', '9.Bc1', '=',
    'O recuo 9.Bc1 é menos comum. Depois de 9...f5 10.exf5 Bxf5 11.h3 Nf6 12.dxe5 dxe5 13.Qxd8 Rxd8 14.Nxe5 Ne4! 15.Nxe4 Bxe4 o jogo fica igual.'],
  c30: [`${E} exd4 8 Nxd4 Re8 9 f3 c6 10 Bf2 d5 11 exd5 cxd5 12 O-O Nc6 13 c5 Nh5 14 Qd2 Be5 15 g3 Ng7`, 'be3', '7...exd4', '⩲',
    'Com 7...exd4 as pretas abrem o centro e pressionam e4. Depois de 8.Nxd4 Re8 9.f3 c6 10.Bf2! d5 11.exd5 cxd5 12.O-O Nc6 13.c5 Nh5 14.Qd2 Be5 15.g3 Ng7 as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 25
  ['c25', 'a', 'a', '(a)', '8 Be3 Re8 9 dxe5 dxe5 10 Qxd8 Nxd8 11 Nb5 Ne6 12 Ng5 Re7', { a: '=', c: '8.Be3 não é perigoso: 8...Re8 9.dxe5 dxe5 10.Qxd8 Nxd8 11.Nb5 Ne6 12.Ng5 Re7 leva à igualdade.' }],
  ['c25-a', '1', 'a', '(a) 8...Ng4', '8... Ng4 9 Bg5 f6', { c: '8...Ng4 9.Bg5 f6 também é um bom plano.' }],
  ['c25', 'b', 'b', '(b)', '11... Nxe2+ 12 Qxe2 h6 13 Bd2 g5 14 g4 Ng6 15 f3 Nf4 16 Nxf4 exf4', { a: '=', r: 'Pelletier–Radjabov, Biel 2006', c: '11...Nxe2+ 12.Qxe2 h6 13.Bd2 g5 14.g4 Ng6 15.f3 Nf4 16.Nxf4 exf4 e, com 17.Nd1 e Bc3, o jogo fica mais ou menos igual.' }],
  ['c25-b', '1', 'b', '(b) 13.Be3', '13 Be3 f5 14 f3 g5 15 c5 Ng6', { a: '=', r: 'Pelletier–Fedorov, Plovdiv 2003', c: '13.Be3 f5 14.f3 g5! 15.c5 Ng6 leva à igualdade.' }],
  ['c25', 'c', 'c', '(c)', '12 Qxd3', { c: '12.Qxd3!? também merece atenção.' }],
  ['c25', 'd', 'd', '(d)', '13 Be3 f5 14 f3 c5 15 Rb1 f4 16 Bf2 g5 17 b4 b6 18 bxc5 bxc5', { a: '=', r: 'Yermolinsky–Fedorowicz, Nova York 1993', c: '13.Be3 f5 14.f3 c5 15.Rb1 f4 16.Bf2 g5 17.b4 b6 18.bxc5 bxc5 leva à igualdade.' }],
  ['c25', 'e', 'e', '(e)', '16 Kh1 f4 17 Be2 h5 18 Be1 Bh6 19 Rc2 cxd5 20 Nxd5 Nc6', { a: '⩲', r: 'Ashley–Fedorowicz, Nova York 1993', c: '16.Kh1 f4 17.Be2 h5 18.Be1 Bh6 19.Rc2 cxd5 20.Nxd5 Nc6 é um pouco melhor para as brancas.' }],
  // Coluna 26
  ['c26', 'f-A', 'f', '(f) A', '9... Ne8 10 Nd2 h6 11 Be3 f5 12 f3 f4 13 Bf2 g5 14 c5 dxc5 15 Bxc5 Rf6 16 Nc4 Rg6 17 d6', { a: '=', r: 'Ftacnik–Joecks, Alemanha 1993', c: '9...Ne8 10.Nd2 h6 11.Be3 f5 12.f3 f4 13.Bf2 g5 14.c5 dxc5 15.Bxc5 Rf6 16.Nc4 Rg6 17.d6 leva à igualdade. (O livro imprime "14...bxc5".)' }],
  ['c26', 'f-B', 'f', '(f) B', '9... h6 10 Bxf6 Bxf6 11 b4 Kg7 12 c5 Ng8', { a: '=', r: 'Pelletier–Hjartarsson, Bundesliga 2003', c: '9...h6 10.Bxf6 Bxf6 11.b4 Kg7 12.c5 Ng8 leva à igualdade.' }],
  ['c26', 'g', 'g', '(g)', '10... a5 11 a3 f5 12 f3 c5 13 dxc6 bxc6 14 b4 Nf6 15 Kh1 Be6 16 Nb3 axb4 17 axb4 Rxa1 18 Qxa1 Qb6', { a: '=', r: 'Eingorn–Zapata, Moscou (GMA Open) 1989', c: '10...a5 11.a3 f5 12.f3 c5 13.dxc6 bxc6 14.b4 Nf6 15.Kh1 Be6 16.Nb3 axb4 17.axb4 Rxa1 18.Qxa1 Qb6 leva à igualdade.' }],
  ['c26', 'h', 'h', '(h)', '11 f3 Nf6 12 b4 Nh5 13 c5 Nf4 14 Bh4 h6 15 Rc1 g5 16 Bf2 Neg6 17 cxd6 cxd6 18 Nb5 Nxe2+ 19 Qxe2 Nf4', { a: '=', r: 'Lukacs–Schebler, Budapeste 1996', c: '11.f3 Nf6 12.b4 Nh5 13.c5 Nf4 14.Bh4 h6 15.Rc1 g5 16.Bf2 Neg6 17.cxd6 cxd6 18.Nb5 Nxe2+ 19.Qxe2 Nf4 dá chances equilibradas.' }],
  ['c26', 'i', 'i', '(i)', '12... h6 13 Bh4 exf4 14 Nf3 Nf6 15 Bxf6 Rxf6 16 Nd4 c5', { a: '∓', r: 'Pomes–Spraggett, Terrassa 1990', c: '12...h6 13.Bh4 exf4 14.Nf3?! Nf6 15.Bxf6 Rxf6 16.Nd4 c5 é claramente melhor para as pretas.' }],
  ['c26-i', '1', 'i', '(i) 14.Qc2', '14 Qc2', { a: '=', c: '14.Qc2 mantém a igualdade.' }],
  ['c26', 'j', 'j', '(j)', '13 Bh5 e4 14 Nb3 c5 15 dxc6 bxc6 16 Kh1 d5 17 Be2 Kh8 18 Bh4 Ng6 19 Bf2 Nxf4 20 Bc5 Nxe2 21 Bxf8 Ng3+ 22 hxg3 Qxf8', { a: '∓', r: 'Gelfand–Grivas, Haifa 1989', c: '13.Bh5?! e4 14.Nb3 c5 15.dxc6 bxc6 16.Kh1 d5 17.Be2 Kh8 18.Bh4 Ng6 19.Bf2 Nxf4 20.Bc5 Nxe2 21.Bxf8 Ng3+ 22.hxg3 Qxf8 é melhor para as pretas.' }],
  ['c26', 'k-A', 'k', '(k) A', '16 Bc4 Kh8 17 Qf3 e4 18 Qe3 Rg6 19 Rae1', { a: '=', c: '16.Bc4 Kh8 17.Qf3 e4 18.Qe3 Rg6 19.Rae1 leva à igualdade.' }],
  ['c26', 'k-B', 'k', '(k) B', '16 Bc4 Kh8 17 Nf3 Rg6 18 Qe2 e4 19 Nh4 Bd4+', { a: '∓', r: 'Piza–Campos López, San Fernando 1991', c: '17.Nf3?! Rg6 18.Qe2 e4 19.Nh4 e agora 19...Bd4+ daria clara vantagem às pretas.' }],
  // Coluna 27
  ['c27', 'l-A', 'l', '(l) A', '9 Nh4 Ne8 10 g3 Bh3 11 Re1 f5 12 exf5 Nxf5 13 Nf3 h6 14 Ne4 Bg4 15 Qd3 Nf6 16 Bd2 Qd7 17 Bc3 Nxe4 18 Qxe4 Bh3 19 Nd2', { a: '=', r: 'Hertneck–W. Watson, Alemanha 1994', c: '9.Nh4!? Ne8 10.g3 Bh3 11.Re1 f5 12.exf5 Nxf5 13.Nf3 h6 14.Ne4 Bg4 15.Qd3 Nf6 16.Bd2 Qd7 17.Bc3 Nxe4 18.Qxe4 Bh3 19.Nd2?! leva à igualdade.' }],
  ['c27-l-A', '1', 'l', '(l) A 19.Bf1', '19 Bf1', { a: '⩲', c: '19.Bf1 seria um pouco melhor para as brancas.' }],
  ['c27', 'l-B', 'l', '(l) B', '9 a4 a5', { a: '=', c: '9.a4?! a5! leva à igualdade.' }],
  ['c27', 'm', 'm', '(m)', '10 g4 Kh8 11 Rg1 a5 12 Be3 Nc5', { a: '∞', r: 'Carlsen–Radjabov, Biel 2006', c: '10.g4 Kh8 11.Rg1 a5 12.Be3 Nc5 dá chances para os dois lados.' }],
  ['c27', 'n', 'n', '(n)', '16 Be3 h6 17 Nh3 Ne7 18 Qd2 a6 19 Nf2 Bd7 20 Nfd1 Qe8 21 Bd4 Rd8 22 Ne3 Bc8 23 a4', { a: '⩲', r: 'Larsen–P. H. Nielsen, Campeonato Dinamarquês 1991', c: '16.Be3 h6 17.Nh3 Ne7 18.Qd2 a6 19.Nf2 Bd7 20.Nfd1 Qe8 21.Bd4 Rd8 22.Ne3 Bc8 23.a4 é um pouco melhor para as brancas; as pretas precisavam de mais atividade.' }],
  // Coluna 28
  ['c28', 'p', 'p', '(p)', '9... g5 10 Bg3 Nh6 11 d5 f5 12 exf5 g4 13 Nd2 Bxf5 14 Nf1 Nd7 15 Ne3 e4 16 O-O Nc5 17 Rc1 Qd7', { a: '=', r: 'Roiz–Radjabov, Saint Vincent 2005', c: '9...g5 10.Bg3 Nh6 11.d5 f5 12.exf5 g4!? 13.Nd2 Bxf5 14.Nf1 Nd7 15.Ne3 e4 16.O-O Nc5 17.Rc1 Qd7! dá contrajogo suficiente.' }],
  ['c28-p', '1', 'p', '(p) 12...Nxf5', '12... Nxf5 13 Nd2 Nd4 14 O-O Nxe2+ 15 Qxe2 Qe8 16 Nde4', { a: '⩲', r: 'K. Georgiev–Bologan, Gibraltar 2006', c: '12...Nxf5 13.Nd2 Nd4 14.O-O Nxe2+ 15.Qxe2 Qe8 16.Nde4 é um pouco melhor para as brancas.' }],
  ['c28', 'q', 'q', '(q)', '11... h5 12 h3 Nh6 13 g4', { a: '±', c: '11...h5?! é prematuro antes do roque branco: 12.h3 Nh6 13.g4! é melhor para as brancas.' }],
  ['c28', 'r', 'r', '(r)', '13 dxc6 bxc6 14 b4 Kh8 15 Bf2 Nf7 16 O-O Bh6 17 b5 c5 18 Nd5 Ng5 19 Nb1 Ne6 20 Nbc3 Nd4', { a: '=', r: 'Onischuk–Ivanchuk, Olimpíada de Calvià 2004', c: '13.dxc6 bxc6 14.b4 Kh8 15.Bf2 Nf7 16.O-O Bh6 17.b5 c5 18.Nd5 Ng5 19.Nb1 Ne6 20.Nbc3 Nd4 leva à igualdade.' }],
  ['c28', 's', 's', '(s)', '16 a4 Bh6 17 Bf2 Kh8 18 a5 Ng8 19 Qc2 Nf6 20 Rb2 Nh5 21 Ra1 Bd7 22 axb6 axb6 23 Rxa8 Qxa8 24 Ra2 Qd8 25 bxc5 bxc5 26 Ra7', { a: '⩲', r: 'Gelfand–Nataf, Cannes 2002', c: '16.a4 Bh6 17.Bf2 Kh8 18.a5 Ng8 19.Qc2 Nf6 20.Rb2 Nh5 21.Ra1 Bd7 22.axb6 axb6 23.Rxa8 Qxa8 24.Ra2 Qd8 25.bxc5 bxc5 26.Ra7 é um pouco melhor para as brancas.' }],
  // Coluna 29
  ['c29', 't-A', 't', '(t) A', '9... Nc6 10 d5', { a: '⩲', c: '9...Nc6?! 10.d5 é um pouco melhor para as brancas. (O livro continua com "10...Nd7 11 h3 Nc6 12 h4!", lances impossíveis nessa posição; a linha foi cortada.)' }],
  ['c29', 't-B', 't', '(t) B', '9... exd4 10 Nxd4 f5 11 h3 Nh6 12 exf5 Nxf5 13 Nxf5 Bxf5 14 Be3 Nc6 15 Qd2 Kh8 16 Rd1 Qf6 17 O-O Rae8', { a: '=', r: 'Damjanović–Nijboer, Calvià 2006', c: '9...exd4 10.Nxd4 f5! 11.h3! Nh6 12.exf5 Nxf5 13.Nxf5 Bxf5 14.Be3 Nc6 15.Qd2 Kh8 16.Rd1 Qf6 17.O-O Rae8 leva à igualdade.' }],
  ['c29-t-B', '1', 't', '(t) B 11.O-O', '11 O-O fxe4', { a: '=', c: '11.O-O fxe4 também leva à igualdade.' }],
  ['c29', 'u', 'u', '(u)', '10 h3 Nxf2', { a: '∓', r: 'Ivanchuk–Bologan, Edmonton 2005', c: '10.h3? Nxf2! foi muito bom para as pretas.' }],
  ['c29', 'v', 'v', '(v)', '11 dxe5 Nxe5 12 Nxe5 Bxe5 13 Qd5+ Kh8 14 Qxb7 Nd7 15 O-O Nc5 16 Qd5 c6', { a: '=', c: '11.dxe5 Nxe5 12.Nxe5 Bxe5 13.Qd5+ Kh8 14.Qxb7 Nd7 15.O-O Nc5 16.Qd5 c6! dá às pretas boa compensação pelo peão.' }],
  ['c29-v', '1', 'v', '(v) 17.Qxc6?', '17 Qxc6 Bxc3 18 bxc3 Be4 19 Qb5 Rb8', { a: '-+', c: '17.Qxc6? perde: 17...Bxc3 18.bxc3 Be4 19.Qb5 Rb8 prende a dama.' }],
  ['c29', 'w', 'w', '(w)', '16 Bf3 Bxf3 17 Nxf3 Nc6 18 O-O Nd4', { a: '=', r: 'Onischuk–Smirin, Olimpíada de Turim 2006', c: '16.Bf3 Bxf3 17.Nxf3 Nc6 18.O-O Nd4! leva à igualdade.' }],
  ['c29-w', '1', 'w', '(w) 16.f3?!', '16 f3 Bc2 17 f4 Nd7', { a: '∓', c: '16.f3?! Bc2 17.f4 Nd7! é bom para as pretas.' }],
  // Coluna 30
  ['c30', 'x-A', 'x', '(x) A', '7... Na6 8 O-O', { c: '7...Na6 8.O-O transpõe para 7.O-O Na6 8.Be3.' }],
  ['c30', 'x-B', 'x', '(x) B', '7... h6 8 O-O Ng4 9 Bc1 Nc6 10 d5 Ne7 11 Ne1 f5 12 Bxg4 fxg4 13 Be3', { a: '⩲', r: 'Sasikiran–Kasimdzhanov, Hyderabad 2002', c: '7...h6 8.O-O Ng4 9.Bc1 Nc6 10.d5 Ne7 11.Ne1 f5 12.Bxg4 fxg4 13.Be3 é um pouco melhor para as brancas.' }],
  ['c30', 'y', 'y', '(y)', '10 Qd2 d5 11 exd5 cxd5 12 O-O Nc6 13 c5 Rxe3 14 Qxe3 Qf8', { c: 'Contra 10.Qd2 as pretas têm um sacrifício de qualidade promissor: 10...d5 11.exd5 cxd5 12.O-O Nc6 13.c5 Rxe3! 14.Qxe3 Qf8. (O livro imprime "11...exd5".)' }],
  ['c30', 'z', 'z', '(z)', '16 Rfd1 Be6 17 Bb5 Qd7 18 Rac1', { a: '⩲', r: 'Ivanchuk–Radjabov, Morelia/Linares 2006', c: '16.Rfd1 Be6 17.Bb5 Qd7 18.Rac1 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'india-rei-e',
  arquivo: 'india-rei-e',
  nome: 'Índia do Rei — 9.Bg5, 9.Kh1 e 7.Be3',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 605–607), colunas 25–30",
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5',
  corPadrao: 'b',
  ordem: 605,
  grupos: [
    { id: 'outros9', nome: '7.O-O Nc6 8.d5 Ne7: 9.Bg5 e 9.Kh1', colunas: [25, 26, 27] },
    { id: 'be3', nome: '7.Be3', colunas: [28, 29, 30] },
  ],
}

module.exports = { capitulo, colunas, notas }
