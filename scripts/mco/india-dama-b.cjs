// Transcrição do MCO 15ª ed. — Defesa Índia da Dama, Sistema Petrosian 5...d5: 6.cxd5 exd5, 6.Bg5 e 6.Qc2 (pp. 569–570), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs india-dama-b
// Formato: ver gambito-do-rei.cjs. Dicas em india-dama-b-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Avaliações tiradas do texto: (a) A "pequena vantagem" ficou ⩲; (e) "as pretas quase igualam" ficou ⩲;
// (f) B 7...Qd7 "os peões dobrados defendem bem" ficou =; (g) "jogo razoável" ficou =;
// (j) "vantagem de espaço" ficou ⩲; (l) "vantagem mínima" ficou ⩲; (n) "chances mais ou menos iguais" ficou =;
// (t) "as brancas ficam melhor, mas as pretas têm quase compensação suficiente" ficou ⩲;
// (u) "chances para os dois lados" ficou ∞.
// Notas só com comentário: (c) 11...d4, (f) A e B, (q) 10...Qe7+, (v).
// Notação: na nota (r) o livro escreve 15.Nxd6 sem xeque; ficou 15.Nxd6+.

const F = '1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 a3 Bb7 5 Nc3 d5'

const colunas = {
  c07: [`${F} 6 cxd5 exd5 7 g3 Be7 8 Qa4+ c6 9 Bg2 O-O 10 O-O Nbd7 11 Bf4 Re8 12 Rad1 h6`, 'cxd5', '6.cxd5 exd5 7.g3', '⩲',
    'Com 6.cxd5 exd5 as pretas recapturam com o peão, e o jogo fica mais lento, típico dos peões da dama. Depois de 7.g3 Be7 8.Qa4+ c6 9.Bg2 O-O 10.O-O Nbd7 11.Bf4 Re8 12.Rad1 h6 as pretas quase igualam.'],
  c08: [`${F} 6 cxd5 exd5 7 Bf4 Bd6 8 Bg3 O-O 9 e3 Ne4 10 Qb3 Nxc3 11 Qxc3 c5 12 Be2 Qe7`, 'cxd5', '7.Bf4', '=',
    'Com 7.Bf4 Bd6 8.Bg3 as brancas evitam a troca dos bispos. Depois de 8...O-O 9.e3 Ne4 10.Qb3 Nxc3 11.Qxc3 c5 12.Be2 Qe7 o jogo é igual.'],
  c09: [`${F} 6 Bg5 Be7 7 Qa4+ c6 8 Bxf6 Bxf6 9 cxd5 exd5 10 g3 O-O 11 Bg2 c5 12 Rd1 Qe7`, 'bg5', '6.Bg5 Be7 7.Qa4+ c6', '⩲',
    'Com 6.Bg5 as brancas buscam uma vantagem técnica. Depois de 6...Be7 7.Qa4+ c6 8.Bxf6 Bxf6 9.cxd5 exd5 10.g3 O-O 11.Bg2 c5 12.Rd1 Qe7 as brancas ficam com uma vantagem mínima.'],
  c10: [`${F} 6 Bg5 Be7 7 Qa4+ Qd7 8 Qxd7+ Nbxd7 9 Nb5 Bd8 10 cxd5 Nxd5 11 e4 N5f6 12 Rc1 Bxe4`, 'bg5', '7...Qd7', '=',
    'Com 7...Qd7 as pretas oferecem a troca das damas. Depois de 8.Qxd7+ Nbxd7 9.Nb5 Bd8 10.cxd5 Nxd5 11.e4 N5f6 12.Rc1 Bxe4 as pretas tomam o peão e o jogo é igual.'],
  c11: [`${F} 6 Qc2 dxc4 7 e4 c5 8 d5 exd5 9 exd5 Bd6 10 Bxc4 O-O 11 O-O a6 12 Bg5 Nbd7`, 'qc2', '6.Qc2 dxc4', '=',
    'Com 6.Qc2 o jogo fica agudo. Depois de 6...dxc4 7.e4 c5 8.d5 exd5 9.exd5 Bd6 10.Bxc4 O-O 11.O-O a6 12.Bg5 Nbd7 as brancas têm o peão passado em d5, mas as pretas igualam.'],
  c12: [`${F} 6 Qc2 Be7 7 cxd5 Nxd5 8 Bd2 O-O 9 e4 Nxc3 10 Bxc3 Nd7 11 O-O-O c6 12 h4 b5`, 'qc2', '6...Be7', '=',
    'Com 6...Be7 7.cxd5 Nxd5 8.Bd2 O-O 9.e4 Nxc3 10.Bxc3 Nd7 as brancas rocam do lado da dama e atacam: 11.O-O-O c6 12.h4 b5, e as pretas contra-atacam a tempo; o jogo é igual.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a-A', 'a', '(a) A', '7... Bd6 8 Qa4+ c6 9 Bg2 O-O 10 O-O Re8 11 Bf4 Bxf4 12 gxf4 Qd6 13 Ne5 Nbd7 14 Rfd1', { a: '⩲', r: 'Buhman–C. Hansen, Bundesliga 2002', c: '7...Bd6 8.Qa4+ c6 9.Bg2 O-O 10.O-O Re8 11.Bf4 Bxf4 12.gxf4 Qd6 13.Ne5 Nbd7 14.Rfd1 dá às brancas só uma pequena vantagem.' }],
  ['c07', 'a-B', 'a', '(a) B', '7... c5 8 Qa4+ Bc6 9 Qc2 Bd6 10 Bg2 Nbd7 11 O-O O-O 12 Rd1 Qc7 13 Nh4', { a: '⩲', r: 'Yermolinsky–A. Ivanov, Campeonato dos EUA 1994', c: '7...c5 8.Qa4+ Bc6 9.Qc2 Bd6 10.Bg2 Nbd7 11.O-O O-O 12.Rd1 Qc7 13.Nh4 é um pouco melhor para as brancas.' }],
  ['c07-a-B', '1', 'a', '(a) B 8...Nbd7', '8... Nbd7 9 Bh3', { a: '⩲', c: '8...Nbd7 9.Bh3 é um pouco melhor para as brancas.' }],
  ['c07', 'b', 'b', '(b)', '8 Bg2 O-O 9 O-O Nbd7 10 Bf4 c5 11 Qc2 Rc8 12 Bh3 cxd4 13 Nxd4 Ne4 14 Qa4 Ndc5 15 Qd1 Nxc3 16 bxc3 Ra8', { a: '=', r: 'Akopian–Epishin, Olimpíada de Erevan 1996', c: '8.Bg2 O-O 9.O-O Nbd7 10.Bf4 c5 11.Qc2 Rc8 12.Bh3 cxd4 13.Nxd4 Ne4 14.Qa4 Ndc5 15.Qd1 Nxc3 16.bxc3 Ra8 leva à igualdade.' }],
  ['c07-b', '1', 'b', '(b) 12.Rad1', '12 Rad1 Ne4', { a: '=', c: '12.Rad1 Ne4! leva à igualdade.' }],
  ['c07', 'c', 'c', '(c)', '8... Nbd7 9 Ne5 c5 10 dxc5 bxc5 11 Bh3 Bd6 12 Nxd7 Nxd7 13 O-O d4 14 Nb5 Bb8 15 Bg5 Qxg5 16 Nd6+ Bxd6 17 Qxd7+', { a: '±', r: 'P. Cramling–Bator, Estocolmo 1987', c: '8...Nbd7?! 9.Ne5 c5 10.dxc5 bxc5 11.Bh3! Bd6 12.Nxd7 Nxd7 13.O-O d4 14.Nb5 Bb8 15.Bg5! Qxg5 16.Nd6+ Bxd6 17.Qxd7+ é melhor para as brancas.' }],
  ['c07-c', '1', 'c', '(c) 11...d4', '11... d4 12 O-O dxc3 13 Rd1', { c: '11...d4 12.O-O dxc3 13.Rd1 dá às brancas um ataque forte.' }],
  ['c07', 'd-A', 'd', '(d) A', '10 Bf4 Nh5 11 Bxb8 Qxb8 12 O-O Nf6 13 Ne5', { a: '⩲', r: 'Eingorn–Naumkin, Moscou 1990', c: 'As brancas também ficam um pouco melhor com 10.Bf4 Nh5 11.Bxb8 Qxb8 12.O-O Nf6 13.Ne5.' }],
  ['c07-d-A', '1', 'd', '(d) A 10...Nbd7', '10... Nbd7 11 Rd1 Nh5 12 Bc1', { a: '⩲', c: '10...Nbd7 11.Rd1 Nh5 12.Bc1 é um pouco melhor para as brancas.' }],
  ['c07', 'd-B', 'd', '(d) B', '10 Ne5 b5 11 Qd1 Nbd7 12 Nxd7 Qxd7 13 O-O Rad8 14 Bg5', { a: '⩲', r: 'Gavrikov–Hübner, Suíça 1992', c: 'Ou 10.Ne5 b5 11.Qd1 Nbd7 12.Nxd7 Qxd7 13.O-O Rad8 14.Bg5, um pouco melhor para as brancas.' }],
  ['c07', 'e', 'e', '(e)', '13 Rfe1 Bf8', { a: '⩲', r: 'Fedorowicz–Milisits, Aberto dos EUA 2006', c: '13.Rfe1 Bf8, e as pretas quase igualam.' }],
  // Coluna 8
  ['c08', 'f-A', 'f', '(f) A', '7 Bg5', { c: '7.Bg5 normalmente transpõe para a coluna seguinte.' }],
  ['c08', 'f-B', 'f', '(f) B', '7 Qa4+ c6 8 g3 Be7', { c: '7.Qa4+ c6 8.g3 Be7 transpõe para a coluna anterior.' }],
  ['c08-f-B', '1', 'f', '(f) B 7...Qd7', '7... Qd7 8 Qxd7+ Nbxd7 9 Nb5 Bd6 10 Nxd6+ cxd6 11 Bf4 Ke7', { a: '=', r: 'Razuvaev–Tukmakov, Moscou 1985', c: 'As pretas também podem tentar 7...Qd7!? 8.Qxd7+ Nbxd7 9.Nb5 Bd6 10.Nxd6+ cxd6 11.Bf4 Ke7, e os peões dobrados defendem bem.' }],
  ['c08', 'g', 'g', '(g)', '7... Be7 8 e3 O-O 9 Be2 c5 10 Ne5 Nc6 11 O-O cxd4 12 exd4 Ne4 13 Nxc6 Bxc6 14 Rc1 Qd7', { a: '=', r: 'Faragó–Matanović, Viena 1986', c: 'Também é possível 7...Be7 8.e3 O-O 9.Be2 c5 10.Ne5 Nc6 11.O-O cxd4 12.exd4 Ne4 13.Nxc6 Bxc6 14.Rc1 Qd7, com jogo razoável.' }],
  ['c08', 'h', 'h', '(h)', '8 Ne5 O-O 9 e3 c5 10 Bb5 Na6 11 O-O cxd4 12 exd4 Nc7 13 Ba4 Ne6 14 Bg3 Ne4', { a: '=', r: 'Christiansen–Hübner, Alemanha 1994', c: '8.Ne5 O-O 9.e3 c5 10.Bb5 Na6 11.O-O cxd4 12.exd4 Nc7 13.Ba4 foi a partida; agora 13...Ne6 14.Bg3 Ne4 é igual.' }],
  ['c08', 'i', 'i', '(i)', '13 Bxd6 Qxd6 14 dxc5 bxc5 15 b4 Nd7 16 bxc5 Nxc5 17 O-O Rfc8', { a: '=', r: 'Salov–Hübner, Wijk aan Zee 1992', c: '13.Bxd6 Qxd6 14.dxc5 bxc5 15.b4 Nd7 16.bxc5 Nxc5 17.O-O Rfc8 leva à igualdade.' }],
  // Coluna 9
  ['c09', 'j', 'j', '(j)', '6... dxc4 7 e4 Be7 8 Qc2 Nc6 9 Rd1 Na5 10 Nd2 O-O 11 Nxc4', { a: '⩲', r: 'Zimmerman–Nisipeanu, Eger 1995', c: '6...dxc4 7.e4 Be7 8.Qc2 Nc6 9.Rd1 Na5 10.Nd2 O-O 11.Nxc4 dá às brancas vantagem de espaço.' }],
  ['c09', 'k', 'k', '(k)', '7 e3 O-O 8 Rc1 c5 9 cxd5 exd5 10 Be2 Na6 11 O-O c4 12 Ne5 Nc7 13 Qa4 Qe8', { a: '=', r: 'Stajčić–van Wely, Viena 1994', c: '7.e3 O-O 8.Rc1 c5 9.cxd5 exd5 10.Be2 Na6 11.O-O c4 12.Ne5 Nc7 13.Qa4 Qe8 leva à igualdade.' }],
  ['c09', 'l', 'l', '(l)', '13 O-O Rd8 14 e3 Na6 15 h4 Nc7 16 Rfe1', { a: '⩲', r: 'van Wely–Bacrot, Mulhouse 1998', c: '13.O-O Rd8 14.e3 Na6 15.h4 Nc7 16.Rfe1 dá às brancas uma vantagem mínima.' }],
  // Coluna 10
  ['c10', 'm', 'm', '(m)', '7... Bc6 8 Qb3 dxc4 9 Qxc4 O-O 10 Bxf6 Bxf6 11 e4 b5 12 Nxb5 Bxe4 13 Nxc7 Bd5 14 Nxd5 exd5 15 Qc2 Re8+ 16 Be2', { a: '⩲', r: 'Sadler–Speelman, Hastings 1999', c: '7...Bc6!? 8.Qb3 dxc4 9.Qxc4 O-O 10.Bxf6 Bxf6 11.e4 b5 12.Nxb5 Bxe4 13.Nxc7 Bd5 14.Nxd5 exd5 15.Qc2 Re8+ 16.Be2 é um pouco melhor para as brancas.' }],
  ['c10', 'n', 'n', '(n)', '8 Qc2 dxc4 9 e3 Bxf3 10 gxf3 b5 11 Rg1 c6 12 a4 a6', { a: '=', r: 'I. Sokolov–Leko, Eurotel (rápidas) 2002', c: 'Mais complicado é 8.Qc2 dxc4 9.e3 Bxf3 10.gxf3 b5 11.Rg1 c6 12.a4 a6, com chances mais ou menos iguais.' }],
  ['c10', 'o', 'o', '(o)', '13 Nd2 Bd5 14 Nxc7+ Bxc7 15 Rxc7 Kd8', { a: '=', r: 'Delemarre–Porat, Essent Open 2004', c: '13.Nd2 Bd5 14.Nxc7+ Bxc7 15.Rxc7 Kd8 leva à igualdade.' }],
  // Coluna 11
  ['c11', 'p', 'p', '(p)', '8 dxc5 Bxc5 9 Bxc4 Nbd7 10 O-O Qc7 11 Bd3 a6 12 Bg5 Ne5', { a: '=', r: 'I. Sokolov–Polugaevsky, Holanda 1994', c: '8.dxc5 Bxc5 9.Bxc4 Nbd7 10.O-O Qc7 11.Bd3 a6 12.Bg5 Ne5! leva à igualdade.' }],
  ['c11', 'q', 'q', '(q)', '9... Nxd5 10 Bxc4 Be7 11 Qb3 Nxc3 12 Bxf7+ Kf8 13 bxc3', { a: '±', r: 'Lalić', c: '9...Nxd5?! 10.Bxc4 Be7 11.Qb3 Nxc3 12.Bxf7+ Kf8 13.bxc3 é melhor para as brancas.' }],
  ['c11-q', '1', 'q', '(q) 10...Qe7+', '10... Qe7+ 11 Kf1', { c: '10...Qe7+?! é respondido por 11.Kf1!.' }],
  ['c11', 'r', 'r', '(r)', '10... Qe7+ 11 Be3 Ng4 12 Ne4 Nxe3 13 fxe3 Nd7 14 O-O h6 15 Nxd6+ Qxd6 16 Qe4+ Kf8 17 Qf4', { a: '±', r: 'Sakaev–Z. Almasi, Iugoslávia 1997', c: '10...Qe7+?! 11.Be3 Ng4 12.Ne4! Nxe3 13.fxe3 Nd7 14.O-O h6 15.Nxd6+ Qxd6 16.Qe4+ Kf8 17.Qf4 é melhor para as brancas.' }],
  ['c11', 's', 's', '(s)', '13 a4 Qc7 14 Rad1 Rfe8 15 b3 h6 16 Bh4 Ng4 17 Bg3 Rad8', { a: '=', r: 'Radjabov–Barkhagen, Saint Vincent 2005', c: '13.a4 Qc7 14.Rad1 Rfe8 15.b3 h6 16.Bh4 Ng4 17.Bg3 foi a partida; agora 17...Rad8 é igual.' }],
  // Coluna 12
  ['c12', 't', 't', '(t)', '6... c5 7 cxd5 cxd4 8 Qa4+ Nbd7 9 dxe6 dxc3 10 exd7+ Qxd7 11 Qxd7+ Nxd7 12 bxc3', { a: '⩲', r: 'San Segundo–Salov, Madri 1997', c: '6...c5 7.cxd5 cxd4 8.Qa4+ Nbd7 9.dxe6 dxc3 10.exd7+ Qxd7 11.Qxd7+ Nxd7 12.bxc3 deixa as brancas melhor, embora as pretas tenham quase compensação suficiente pelo peão.' }],
  ['c12', 'u', 'u', '(u)', '7... exd5 8 Bf4 O-O 9 e3 c5 10 Bd3 Ba6 11 Bxa6 Nxa6 12 Rd1 c4', { a: '∞', r: 'Paragua–Rozentalis, Olimpíada de Turim 2006', c: '7...exd5 8.Bf4 O-O 9.e3 c5 10.Bd3 Ba6 11.Bxa6 Nxa6 12.Rd1 c4 dá chances para os dois lados.' }],
  ['c12', 'v', 'v', '(v)', '8 e4 Nxc3 9 bxc3 O-O', { c: '8.e4 Nxc3 9.bxc3 O-O transpõe para a coluna 4 (7.Qc2).' }],
  ['c12', 'w', 'w', '(w)', '13 Rh3 a5 14 d5 cxd5 15 Bxb5 Nf6 16 Ng5 Qb6 17 exd5 Rac8 18 Bd7 Bxd5 19 Bxc8 Rxc8 20 Rxd5 exd5', { a: '=', r: 'Kamsky–Anand, match 1994', c: '13.Rh3 a5 14.d5 cxd5 15.Bxb5 Nf6 16.Ng5 Qb6 17.exd5 Rac8 18.Bd7 Bxd5 19.Bxc8 Rxc8 20.Rxd5 exd5 leva à igualdade.' }],
]

const capitulo = {
  id: 'india-dama-b',
  arquivo: 'india-dama-b',
  nome: 'Índia da Dama — Sistema Petrosian, outras linhas',
  fonte: 'Modern Chess Openings — Queen\'s Indian Defense (pp. 569–570), colunas 7–12',
  base: '1. d4 Nf6 2. c4 e6 3. Nf3 b6',
  corPadrao: 'b',
  ordem: 569,
  grupos: [
    { id: 'cxd5', nome: '6.cxd5 exd5', colunas: [7, 8] },
    { id: 'bg5', nome: '6.Bg5', colunas: [9, 10] },
    { id: 'qc2', nome: '6.Qc2', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
