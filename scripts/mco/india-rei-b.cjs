// Transcrição do MCO 15ª ed. — Índia do Rei, Clássica, Ataque Baioneta 9.b4 Nh5 (pp. 596–598), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs india-rei-b
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-b-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 7 (c) ⩲, 8 (h) =, 9 (l) ∞, 10 (r) =, 11 (t) ∓, 12 (w) ⩲.
// Avaliações tiradas do texto: (a), (c) A e (n) "ganha" ficaram +- / -+; (c) B "as brancas tinham vantagem" ficou ⩲;
// (f) A "jogo pela qualidade" e (f) B "jogo razoável pelo peão" ficaram =; (h) "provavelmente igual" ficou =;
// (i) B "jogo complexo" ficou ∞; (j) "as brancas ficam desconfortáveis" ficou ⩱; (l) "chances para os dois lados"
// ficou ∞; (p) "as pretas tinham compensação" ficou =; (r) "bom jogo para as pretas" ficou =.
// Sinais conferidos com zoom: (b), (d) A, (e) 18...a5, (g), (u) B, (v), (w) ⩲; (d) B, (e), (q), (u) C ±;
// (k), (o), (s), (t), (v) 15...Kh7 ∓.
// Notação: (l) 20...Ne6 é captura (Nxe6); (u) A 19.Nc7 é captura (Nxc7).
// Errata: (p) "22...Rxa8" é impossível (a dama de d8 bloqueia a torre de f8); ficou 22...Qxa8. (i) B "16...Bd7" é
// impossível (o bispo de c8 foi trocado em e6); a linha foi cortada em 16.Qb3 (16...Qd7 perderia a dama).
// Nomes como estão no livro: "Wijk ann Zee" (l).

const F = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 Nf3 O-O 6 Be2 e5 7 O-O Nc6 8 d5 Ne7 9 b4 Nh5'
const R = `${F} 10 Re1 f5 11 Ng5 Nf6`
const G = `${F} 10 g3 f5 11 Ng5 Nf6 12 f3`

const colunas = {
  c7: [`${F} 10 Re1 Nf4 11 Bf1 a5 12 bxa5 Rxa5 13 Nd2 c5 14 a4 Ra6 15 Ra3 h6 16 Nb5 Kh8 17 g3 Nh5`, 're1', '10.Re1 Nf4', '⩲',
    'No Ataque Baioneta as brancas avançam logo o peão b para abrir a ala da dama, e 9...Nh5 prepara ...f5 com o cavalo fora do caminho. Contra 10.Re1 o cavalo pula para f4. Depois de 11.Bf1 a5 12.bxa5 Rxa5 13.Nd2 c5 14.a4 Ra6 15.Ra3 h6 16.Nb5 Kh8 17.g3 Nh5 as brancas ficam com uma pequena vantagem.'],
  c8: [`${R} 12 Bf3 c6 13 Be3 h6 14 Ne6 Bxe6 15 dxe6 fxe4 16 Nxe4 Nxe4 17 Bxe4 d5`, 're1', '10...f5 11.Ng5 Nf6 12.Bf3', '=',
    'Com 10...f5 11.Ng5 o cavalo branco mira e6. Depois de 11...Nf6 12.Bf3 c6 13.Be3 (o plano preferido de Kramnik) 13...h6 14.Ne6 Bxe6 15.dxe6 fxe4 16.Nxe4 Nxe4 17.Bxe4 d5 o jogo fica mais ou menos igual.'],
  c9: [`${R} 12 f3 Kh8 13 Ne6 Bxe6 14 dxe6 Nh5 15 g3 Bf6 16 c5 f4 17 Kg2 Nc6`, 're1', '12.f3 Kh8', '∞',
    'Com 12.f3 as brancas firmam e4; 12...Kh8 é a escolha mais atual. Depois de 13.Ne6 Bxe6 14.dxe6 Nh5! 15.g3 Bf6 16.c5 f4 17.Kg2 Nc6 o cavalo vai a d4 para atacar o peão de e6, e há chances para os dois lados.'],
  c10: [`${G} a5 13 bxa5 Rxa5 14 Qb3 Kh8 15 Bd2 Ra8 16 Bd3 b6 17 Kg2 f4`, 'g3', '10.g3 f5 11.Ng5 Nf6 12.f3 a5', '=',
    'Com 10.g3 as brancas tiram a casa f4 do cavalo. Depois de 10...f5 11.Ng5 Nf6, 12.f3 é praticamente obrigatório: sem ele as brancas perdem o controle de f5 e o cavalo de e7 chega a d4. Depois de 12...a5 13.bxa5 Rxa5 14.Qb3 Kh8 15.Bd2 Ra8 16.Bd3 b6 17.Kg2 f4 as pretas ficam com bom jogo.'],
  c11: [`${G} Re8 13 c5 h6 14 Ne6 Bxe6 15 dxe6 d5 16 Nxd5 Nexd5 17 exd5 Nxd5`, 'g3', '12...Re8', '∓',
    'Com 12...Re8 as pretas preparam ...h6 para expulsar o cavalo de g5. Depois de 13.c5 h6 14.Ne6 Bxe6 15.dxe6 d5 16.Nxd5 Nexd5 17.exd5 Nxd5 elas ficam um pouco melhor.'],
  c12: [`${G} c6 13 Be3 f4 14 Bf2 Ne8 15 Qb3 h6 16 Ne6 Bxe6 17 dxe6 fxg3`, 'g3', '12...c6', '⩲',
    'Com 12...c6 as pretas abrem a coluna c. Depois de 13.Be3 f4 14.Bf2 Ne8 15.Qb3 h6 16.Ne6 Bxe6 17.dxe6 fxg3 as brancas ficam um pouco melhor.'],
}

const notas = [
  // Coluna 7
  ['c7', 'a', 'a', '(a)', '15... g5 16 g3 Nh3+ 17 Bxh3 Bxh3 18 g4', { a: '+-', c: '15...g5? 16.g3 Nh3+ 17.Bxh3 Bxh3 18.g4 prende o bispo de h3 e as brancas ganham.' }],
  ['c7', 'b', 'b', '(b)', '16... g5 17 g3 Nfg6 18 Bd3 f5 19 exf5 Bxf5', { a: '⩲', c: '16...g5 17.g3 Nfg6 18.Bd3 f5 19.exf5 Bxf5 é um pouco melhor para as brancas.' }],
  ['c7', 'c-A', 'c', '(c) A', '17... Nh3+ 18 Bxh3 Bxh3 19 g4', { a: '+-', c: '17...Nh3+? 18.Bxh3 Bxh3 19.g4 também perde o bispo.' }],
  ['c7', 'c-B', 'c', '(c) B', '18 Bb2 Bd7 19 Be2 Nf6 20 f4', { a: '⩲', r: 'Milov–Gofstein, Israel 1997', c: 'Depois de 17...Nh5, 18.Bb2 Bd7 19.Be2 Nf6 20.f4 deu vantagem às brancas.' }],
  // Coluna 8
  ['c8', 'd-A', 'd', '(d) A', '10... c6 11 Ba3 cxd5 12 cxd5 Bg4 13 h3 Bd7 14 b5', { a: '⩲', r: 'Shariyazdanov–Mamedov, Dubai 2001', c: '10...c6 11.Ba3!? cxd5 12.cxd5 Bg4 13.h3 Bd7 14.b5! é um pouco melhor para as brancas.' }],
  ['c8-d-A', '1', 'd', '(d) A 11.Bb2', '11 Bb2 Nf4 12 Bf1 b6 13 dxc6 Nxc6 14 a3 Re8 15 Nd5 Ne6', { a: '=', c: '11.Bb2 Nf4 12.Bf1 b6 13.dxc6 Nxc6 14.a3 Re8 15.Nd5 Ne6 leva à igualdade.' }],
  ['c8', 'd-B', 'd', '(d) B', '10... h6 11 Nd2 Nf4 12 Bf1 a5 13 bxa5 Rxa5 14 Nb3 Ra8 15 c5 f5 16 cxd6 cxd6 17 Nd2 g5 18 Rb1 g4 19 Qb3 fxe4 20 Ndxe4 Kh8 21 Be3', { a: '±', r: 'Karpov–Kamsky, match (7ª partida) 1996', c: '10...h6?! 11.Nd2! Nf4 12.Bf1 a5 13.bxa5 Rxa5 14.Nb3 Ra8 15.c5 f5 16.cxd6 cxd6 17.Nd2! g5 18.Rb1 g4 19.Qb3 fxe4 20.Ndxe4 Kh8 21.Be3 é melhor para as brancas.' }],
  ['c8', 'e', 'e', '(e)', '11... Nf4 12 Bxf4 exf4 13 Rc1 Bf6 14 Ne6 Bxe6 15 dxe6 Bxc3 16 Rxc3 fxe4 17 Bf1 e3 18 fxe3 fxe3 19 Rcxe3 c6 20 Qd2 d5 21 cxd5 cxd5 22 Qd4', { a: '±', r: 'Kramnik–Shirov, Tilburg 1997', c: '11...Nf4 12.Bxf4 exf4 13.Rc1 favorece as brancas: 13...Bf6 14.Ne6 Bxe6 15.dxe6 Bxc3 16.Rxc3 fxe4 17.Bf1 e3 18.fxe3 fxe3?! 19.Rcxe3 c6 20.Qd2 d5 21.cxd5 cxd5 22.Qd4! é melhor para as brancas.' }],
  ['c8-e', '1', 'e', '(e) 18...a5', '18... a5', { a: '⩲', c: '18...a5 era melhor que 18...fxe3?!, mas as brancas continuam um pouco melhor.' }],
  ['c8', 'f-A', 'f', '(f) A', '13 Bb2 h6 14 Ne6 Bxe6 15 dxe6 fxe4 16 Nxe4 Nxe4 17 Rxe4 d5 18 cxd5 cxd5 19 Rxe5 Bxe5 20 Bxe5 Qb6 21 Bb2', { a: '=', r: 'Shirov–Radjabov, Linares 2004', c: '13.Bb2 h6 14.Ne6 Bxe6 15.dxe6 fxe4 16.Nxe4 Nxe4 17.Rxe4 d5 18.cxd5 cxd5 19.Rxe5 Bxe5 20.Bxe5 Qb6 21.Bb2: as brancas entregam a qualidade e têm jogo por ela.' }],
  ['c8', 'f-B', 'f', '(f) B', '13 Qb3 h6 14 Ne6 Bxe6 15 dxe6 Qc8 16 Rd1 Rd8 17 b5', { a: '=', r: 'Bacrot–Radjabov, Trípoli 2004', c: '13.Qb3 h6 14.Ne6 Bxe6 15.dxe6 Qc8 16.Rd1 Rd8 17.b5: as brancas têm jogo razoável pelo peão de e6.' }],
  ['c8', 'g', 'g', '(g)', '13... f4 14 Bc1 h6 15 Ne6 Bxe6 16 dxe6 Nc8 17 b5 Qe8 18 bxc6 bxc6 19 c5', { a: '⩲', r: 'Kramnik–Gelfand, Belgrado 1997', c: '13...f4 14.Bc1 h6 15.Ne6 Bxe6 16.dxe6 Nc8 17.b5! Qe8 18.bxc6 bxc6 19.c5! é um pouco melhor para as brancas.' }],
  ['c8', 'h', 'h', '(h)', '18 cxd5 cxd5 19 Bc2 b6 20 Qg4 e4 21 Rad1 Qc7 22 Bb3 Rf5', { a: '=', r: 'Xu Jun–Ponomariov, Shenyang 2000', c: '18.cxd5 cxd5 19.Bc2 b6 20.Qg4 e4! 21.Rad1 Qc7 22.Bb3 Rf5 deve ser igual.' }],
  // Coluna 9
  ['c9', 'i-A', 'i', '(i) A', '12... Nh5 13 c5 Nf4 14 Bc4 Kh8 15 Rb1 dxc5 16 bxc5 Nexd5', { a: '=', r: 'van Wely–Stellwagen, Maastricht 2005', c: '12...Nh5 13.c5 Nf4 14.Bc4 Kh8 15.Rb1!? dxc5 16.bxc5 Nexd5! leva à igualdade.' }],
  ['c9', 'i-B', 'i', '(i) B', '12... c6 13 Kh1 h6 14 Ne6 Bxe6 15 dxe6 Ne8 16 Qb3', { a: '∞', c: '12...c6 13.Kh1 h6 14.Ne6 Bxe6 15.dxe6 Ne8 16.Qb3 dá um jogo complexo. (O livro continua com 16...Bd7, impossível: o bispo de c8 já foi trocado em e6.)' }],
  ['c9', 'j', 'j', '(j)', '13 c5 dxc5 14 bxc5 h6', { a: '⩱', r: 'Gyimesi–Radjabov, Moscou 2005', c: '13.c5 dxc5!? 14.bxc5 h6 deixa as brancas numa posição desconfortável.' }],
  ['c9', 'k', 'k', '(k)', '17 g4 Ng7 18 Bc4 Nc6', { a: '∓', r: 'van Wely–Radjabov, Wijk aan Zee 2007', c: '17.g4?! Ng7 18.Bc4 Nc6 é melhor para as pretas.' }],
  ['c9', 'l', 'l', '(l)', '18 cxd6 cxd6 19 Nd5 Nd4 20 Bb2 Nxe6', { a: '∞', r: 'Shirov–Radjabov, Wijk ann Zee 2007', c: '18.cxd6 cxd6 19.Nd5 Nd4 20.Bb2 Nxe6 dá chances para os dois lados.' }],
  // Coluna 10
  ['c10', 'n', 'n', '(n)', '13 Ba3 c5 14 dxc6 Qb6+', { a: '-+', c: '13.Ba3? c5! 14.dxc6 Qb6+ ganha para as pretas.' }],
  ['c10', 'o', 'o', '(o)', '13... c6 14 c5 cxd5 15 exd5 Rxa5 16 Be3 h6 17 cxd6 Qxd6 18 Ne6 Bxe6 19 dxe6 Qxe6', { a: '∓', r: 'Feldman–Lesiege, New York Open 1992', c: '13...c6!? 14.c5 cxd5 15.exd5 Rxa5 16.Be3 h6 17.cxd6 Qxd6 18.Ne6 Bxe6 19.dxe6 Qxe6 é melhor para as pretas.' }],
  ['c10', 'p', 'p', '(p)', '14 a4 Ne8 15 Bd2 Ra8 16 Qb3 Kh8 17 a5 f4 18 Ne6 Bxe6 19 dxe6 c6 20 Na4 Nc7 21 Nb6 Nxe6 22 Nxa8 Qxa8 23 Rfb1 Nc5', { a: '=', r: 'van Wely–Pugachev, Leeuwarden 1994', c: '14.a4 Ne8 15.Bd2 Ra8 16.Qb3 Kh8 17.a5 f4 18.Ne6 Bxe6 19.dxe6 c6 20.Na4 Nc7 21.Nb6 Nxe6 22.Nxa8 Qxa8 23.Rfb1 Nc5: as pretas têm compensação pela qualidade.' }],
  ['c10', 'q', 'q', '(q)', '14... b6 15 Bd2 Re8 16 Bd3 Bd7 17 a4 f4 18 Nb5 Bh6 19 gxf4 exf4 20 Bxa5 bxa5 21 Ne6 Bxe6 22 dxe6 Bg7 23 c5', { a: '±', r: 'Hjartarson–Yurtaev, Olimpíada de Manila 1992', c: '14...b6?! 15.Bd2 Re8 16.Bd3 Bd7 17.a4 f4 18.Nb5 Bh6 19.gxf4 exf4 20.Bxa5 bxa5 21.Ne6 Bxe6 22.dxe6 Bg7 23.c5 é melhor para as brancas.' }],
  ['c10', 'r', 'r', '(r)', '18 a4 Bh6 19 gxf4 Nh5 20 fxe5 Nf5', { a: '=', r: 'Veingold–Atalik, Oviedo (rápidas) 1993', c: '18.a4 Bh6 19.gxf4 Nh5 20.fxe5 Nf5 dá bom jogo às pretas.' }],
  // Coluna 11
  ['c11', 's', 's', '(s)', '14 cxd6 Qxd6 15 Ne6 Bxe6 16 dxe6 Qxb4 17 Qb3 Qxb3 18 axb3 a6', { a: '∓', r: 'van Wely–Pieterse, Campeonato Holandês 1991', c: '14.cxd6 Qxd6 15.Ne6 Bxe6 16.dxe6 Qxb4 17.Qb3 Qxb3 18.axb3 a6 é melhor para as pretas.' }],
  ['c11', 't', 't', '(t)', '18 Bc4 c6 19 Qb3 Qe7 20 Rd1 Rad8 21 Bxd5 cxd5 22 Rxd5 Rxd5 23 Qxd5 e4', { a: '∓', r: 'Sestjakov–van Wely, Kecskemét 1991', c: '18.Bc4 c6 19.Qb3 Qe7 20.Rd1 Rad8 21.Bxd5 cxd5 22.Rxd5 Rxd5 23.Qxd5 e4 é melhor para as pretas.' }],
  // Coluna 12
  ['c12', 'u-A', 'u', '(u) A', '12... Kh8 13 Be3 f4 14 Bf2 fxg3 15 hxg3 Bh6 16 Ne6 Bxe6 17 dxe6 Qc8 18 Nd5 Qxe6 19 Nxc7 Qh3 20 Nxa8 Be3', { a: '=', r: 'Donaldson–Silman, São Francisco 1996', c: '12...Kh8 13.Be3 f4!? 14.Bf2 fxg3 15.hxg3 Bh6 16.Ne6 Bxe6 17.dxe6 Qc8 18.Nd5 Qxe6 19.Nxc7 Qh3 20.Nxa8 Be3 leva à igualdade.' }],
  ['c12-u-A', '1', 'u', '(u) A 13.Kg2', '13 Kg2 a5 14 bxa5 Rxa5 15 a4 h6 16 Ne6 Bxe6 17 dxe6 Nc6 18 Bd2 fxe4 19 fxe4 Ra8 20 Rb1 b6 21 Be3', { a: '=', r: 'van Wely–Popović, Smokovec 1992', c: '13.Kg2 a5 14.bxa5 Rxa5 15.a4 h6 16.Ne6 Bxe6 17.dxe6 Nc6 18.Bd2 fxe4 19.fxe4 Ra8 20.Rb1 b6 21.Be3 também leva à igualdade.' }],
  ['c12', 'u-B', 'u', '(u) B', '12... f4 13 Kg2 h6 14 Ne6 Bxe6 15 dxe6 c6 16 b5 Qc7 17 bxc6 bxc6 18 Ba3 Rfd8 19 Qa4 Qc8 20 Rab1 Kh8 21 Rfd1 Qxe6 22 Qa6 h5 23 Rb7', { a: '⩲', r: 'van Wely–Ye Jingchuan, Biel 1993', c: '12...f4 13.Kg2 h6 14.Ne6 Bxe6 15.dxe6 c6 16.b5 Qc7 17.bxc6 bxc6 18.Ba3 Rfd8 19.Qa4 Qc8 20.Rab1 Kh8 21.Rfd1 Qxe6 22.Qa6 h5 23.Rb7 é um pouco melhor para as brancas.' }],
  ['c12', 'u-C', 'u', '(u) C', '12... h6 13 Ne6 Bxe6 14 dxe6 c6 15 b5 Ne8 16 bxc6 bxc6 17 Rb1 Rf6 18 c5 d5 19 exd5 cxd5 20 Rb7 Rxe6 21 Qb3 Nc7 22 Rd1', { a: '±', r: 'Teo Kok Siong–C. J. Hansen, Olimpíada de Moscou 1994', c: '12...h6?! 13.Ne6 Bxe6 14.dxe6 c6 15.b5 Ne8 16.bxc6 bxc6 17.Rb1 Rf6 18.c5 d5 19.exd5 cxd5 20.Rb7 Rxe6 21.Qb3 Nc7 22.Rd1 é melhor para as brancas.' }],
  ['c12', 'v', 'v', '(v)', '13... h6 14 Ne6 Bxe6 15 dxe6 Ne8 16 Qb3 Nc7 17 Rad1 Kh7 18 c5 d5 19 exd5 cxd5 20 Nxd5 Nexd5 21 Bc4', { a: '⩲', r: 'Stefansson–Kristinsson, correspondência 1989', c: '13...h6 14.Ne6 Bxe6 15.dxe6 Ne8 16.Qb3 Nc7 17.Rad1 Kh7 18.c5 d5 19.exd5 cxd5 20.Nxd5 Nexd5 21.Bc4 é um pouco melhor para as brancas.' }],
  ['c12-v', '1', 'v', '(v) 15...Kh7', '15... Kh7 16 Rc1 Ne8 17 b5 Nc7 18 bxc6 bxc6 19 c5 d5 20 exd5 cxd5 21 Nb5 Nxe6 22 c6 a6', { a: '∓', r: 'K. Fitzgerald–Nijboer, Holanda 1993', c: '15...Kh7 16.Rc1?! Ne8 17.b5 Nc7 18.bxc6 bxc6 19.c5 d5 20.exd5 cxd5 21.Nb5 Nxe6 22.c6 a6 é melhor para as pretas.' }],
  ['c12', 'w', 'w', '(w)', '18 hxg3 Nc7 19 Rad1 Kh7 20 c5 d5 21 exd5 cxd5 22 Nxd5 Nexd5 23 Bc4 Nxe6 24 Bxd5 Nd4', { a: '⩲', r: 'Miles–Shirov, Biel 1992', c: '18.hxg3 Nc7 19.Rad1 Kh7 20.c5 d5 21.exd5 cxd5 22.Nxd5 Nexd5 23.Bc4 Nxe6 24.Bxd5 Nd4 é um pouco melhor para as brancas.' }],
  ['c12-w', '1', 'w', '(w) 21...Nexd5', '21... Nexd5', { a: '=', c: '21...Nexd5!? leva à igualdade.' }],
]

const capitulo = {
  id: 'india-rei-b',
  arquivo: 'india-rei-b',
  nome: 'Índia do Rei — Ataque Baioneta 9.b4',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 596–598), colunas 7–12",
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. b4 Nh5',
  corPadrao: 'b',
  ordem: 596,
  grupos: [
    { id: 're1', nome: '10.Re1', colunas: [7, 8, 9] },
    { id: 'g3', nome: '10.g3 f5 11.Ng5 Nf6 12.f3', colunas: [10, 11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
