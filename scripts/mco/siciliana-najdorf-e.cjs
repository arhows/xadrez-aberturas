// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Najdorf: 6.Be2 (pp. 261–263), colunas 31–36.
// Gerar: node scripts/mco/gerar.cjs siciliana-najdorf-e
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-najdorf-e-dicas.cjs.

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 a6 6 Be2'
const E = `${B} e5 7 Nb3 Be7`

const colunas = {
  c31: [`${E} 8 O-O O-O 9 Kh1 b6 10 Be3 Bb7 11 f3 b5 12 a4 b4 13 Nd5 Nxd5`, 'roque', '8.O-O O-O 9.Kh1', '=',
    'O 6.Be2 é a linha clássica e posicional contra a Najdorf. As pretas jogam 6...e5 e depois 7.Nb3 Be7 a luta gira em torno da casa d5. Com 9.Kh1 b6 e o preciso 11...b5! as pretas igualam.'],
  c32: [`${E} 8 O-O O-O 9 Be3 Be6 10 Qd2 Nbd7 11 a4 Rc8 12 a5 Qc7 13 Rfd1 Qc6`, 'roque', '9.Be3', '=',
    'Com 9.Be3 Be6 10.Qd2 os dois lados disputam d5. A dama preta pressiona a coluna c e o jogo fica igual.'],
  c33: [`${E} 8 O-O O-O 9 f4 b5 10 a4 b4 11 Nd5 Nxd5 12 Qxd5 Qb6+ 13 Kh1 Bb7`, 'roque', '9.f4', '=',
    'Com 9.f4 as brancas atacam e5, mas 9...b5! dá contrajogo rápido; fica igual (Larsen–Romanishin, Riga 1979).'],
  c34: [`${E} 8 Be3 Be6 9 Qd2 O-O 10 f4 exf4 11 Bxf4 Nc6 12 O-O-O Ne5 13 Nd4 Qd7`, 'be3', '8.Be3', '=',
    'Com 8.Be3 e 9.Qd2 as brancas preparam o roque grande. As pretas trocam em f4, colocam o cavalo em e5 e igualam.'],
  c35: [`${B} e5 7 Nb3 Be6 8 f4 Qc7 9 g4 exf4 10 g5 Nfd7 11 Bxf4 Nc6 12 Qd2 Rc8 13 O-O-O Nce5`, 'be6', '7...Be6', '±',
    'Com 7...Be6 as pretas adiam o ...Be7. As brancas respondem com 8.f4 e o agressivo 9.g4!, e ficam claramente melhor.'],
  c36: [`${B} Nbd7 7 O-O Nc5 8 Bf3 e6 9 Be3 Be7 10 a4 O-O 11 a5 Qc7 12 b4 Ncd7 13 Na4 d5`, 'nbd7', '6...Nbd7', '±',
    'Com 6...Nbd7 e 7...Nc5 as pretas pressionam e4 sem jogar ...e5. As brancas ganham espaço na ala da dama com a4–a5 e b4 e ficam claramente melhor.'],
}

const notas = [
  // Coluna 31
  ['c31', 'a', 'a', '(a)', '7 Nf3 h6 8 O-O Be6 9 Re1 Nbd7 10 Bf1 Be7 11 a4 b6 12 b3 O-O 13 Bb2 Qc7 14 h3 Rfc8 15 Qd2 Qb7', { a: '=', r: 'Zapata–H. Olafsson, Belgrado 1988', c: '7.Nf3 é seguro e sólido, mas não cria problemas; as pretas igualam totalmente.' }],
  ['c31', 'b', 'b', '(b)', '8... Be6 9 f4 Qc7 10 Kh1 Nbd7 11 a4 O-O 12 f5 Bc4 13 a5', { a: '⩲', c: 'Com 8...Be6 a partida transpõe para a nota (m), a antiga linha principal, que deixa o jogo mais fácil para as brancas.' }],
  ['c31-b', '1', 'b', '(b) 10...O-O?!', '10... O-O 11 f5 Bc4 12 g4 d5 13 g5 Nxe4 14 Nxe4 dxe4 15 f6', { a: '⩲', r: 'Hjartarson–de Firmian, Estocolmo 1997', c: '10...O-O?! 11.f5 Bc4 12.g4! dá às brancas um ataque perigoso.' }],
  ['c31-b', '2', 'b', '(b) 11.g4', '11 g4 h6', { a: '∞', c: 'Com 11.g4 a posição fica incerta.' }],
  ['c31', 'c-A', 'c', '(c) A', '9... b5 10 a4 Bb7 11 Nd5 bxa4 12 Rxa4 Bc6 13 Ra3 Nxe4 14 Na5 Nf6 15 Nxc6 Nxc6 16 Bc4 Nd4 17 Rh3', { a: '±', r: 'Kasparov–Anand, Las Palmas 1996', c: 'As pretas têm muitos jeitos de errar. Com 9...b5 10.a4! as brancas ficam claramente melhor.' }],
  ['c31-c-A', '1', 'c', '(c) A 11...b4', '11... b4 12 Be3', { a: '⩲', c: 'Com 11...b4 as brancas ficam um pouco melhor.' }],
  ['c31', 'c-B', 'c', '(c) B', '9... Be6 10 f4 Qc7 11 f5 Bc4 12 g4', { a: '⩲', c: 'Com 9...Be6 vem 12.g4!, como na nota (b).' }],
  ['c31', 'c-C', 'c', '(c) C', '9... Qc7 10 f4 b5 11 fxe5 dxe5 12 Bg5 Nbd7 13 Bd3 h6 14 Bh4 Bb7 15 Qe2 g6 16 a4 b4 17 Nd1', { a: '⩲', r: 'Stefansson–Akesson, Tórshavn 1997', c: 'Com 9...Qc7 as brancas também ficam um pouco melhor.' }],
  ['c31-c-C', '1', 'c', '(c) C 10.a4', '10 a4 Be6 11 f4 Nbd7 12 f5 Bc4 13 a5', { c: '10.a4 leva à antiga linha principal, da nota (m).' }],
  ['c31', 'd', 'd', '(d)', '10 Bg5 Nbd7 11 Nd5 Nxd5 12 Qxd5 Rb8 13 Bxe7 Qxe7 14 Rad1 Nf6 15 Qxd6 Qxd6 16 Rxd6 Nxe4', { a: '=', r: 'Sutovsky–Gelfand, Tel Aviv 1999', c: 'Com 10.Bg5 as trocas levam à igualdade.' }],
  ['c31-d', '1', 'd', '(d) 10...Bb7', '10... Bb7 11 Bxf6 Bxf6 12 Bc4 Nc6 13 a4', { a: '⩲', r: 'Kasparov–Gelfand, Linares 1997 (até 12...Nc6)', c: 'Com 10...Bb7 o lance 13.a4 deixa as brancas um pouco melhor.' }],
  ['c31-d', '2', 'd', '(d) 11.a4', '11 a4 Bb7 12 f3 d5', { a: '=', c: 'Com 11.a4 Bb7 12.f3 d5! as pretas ficam com boas chances.' }],
  ['c31', 'e', 'e', '(e)', '11... Nbd7 12 a4 Rc8 13 Rf2 Rc7 14 Bf1 Qa8 15 Rd2', { a: '±', r: 'Lutz–Ophoff, Olimpíada de Turim 2006', c: 'Sem o preciso 11...b5! as pretas ficam condenadas a uma defesa difícil: depois de 11...Nbd7?! as brancas impedem o contrajogo.' }],
  ['c31', 'f', 'f', '(f)', '14 exd5 Nd7 15 c3 bxc3 16 bxc3 Bg5 17 Bf2 Qc7 18 c4 Rab8 19 a5 Ba8 20 Ra4 Qb7 21 Nc1 Nc5', { a: '=', r: 'Nijboer–Lagrave, Wijk aan Zee B 2007', c: 'Depois de 14.exd5 e 18...Rab8! fica igual.' }],
  ['c31-f', '1', 'f', '(f) 18...Rfb8', '18... Rfb8 19 a5 Bc8 20 c5', { a: '⩲', c: 'Com 18...Rfb8 vem 20.c5! e as brancas ficam um pouco melhor.' }],
  ['c31-f', '2', 'f', '(f) 18...a5', '18... a5', { a: '=', c: '18...a5 também serve.' }],
  ['c31-f', '3', 'f', '(f) 20.c5', '20 c5 dxc5', { a: '∞', c: 'Com 20.c5 a posição fica incerta.' }],
  // Coluna 32
  ['c32', 'g', 'g', '(g)', '9... Qc7 10 a4 Be6 11 f4 Nbd7 12 Kh1 exf4 13 Rxf4 Ne5', { a: '⩲', r: 'Karpov–Polugaevsky, match do Torneio de Candidatos 1974', c: 'Com 9...Qc7 as brancas ficam com vantagem mínima.' }],
  ['c32', 'h-A', 'h', '(h) A', '10 f4 exf4 11 Bxf4 Nc6 12 Kh1 Rc8 13 Qe1 Ne8 14 Rd1 Bh4 15 Qd2 Bf6 16 Be3 Be5', { a: '=', r: 'Pritchett–Portisch, Olimpíada de Malta 1980', c: 'Com 10.f4 fica igual.' }],
  ['c32-h-A', '1', 'h', '(h) A 11.Rxf4', '11 Rxf4 Nc6 12 Nd5 Bxd5 13 exd5 Ne5 14 Rb4 Qc8', { a: '=', c: 'Com 11.Rxf4 também fica igual.' }],
  ['c32-h-A', '2', 'h', '(h) A 13...Nd7', '13... Nd7 14 Rd1 Nde5', { a: '∞', c: 'Ou 13...Nd7, com posição incerta.' }],
  ['c32', 'h-B', 'h', '(h) B', '10 Nd5 Nbd7 11 Qd3 Bxd5 12 exd5 Re8 13 a4 Bf8 14 a5 Rc8 15 c4 e4 16 Qd1 Ne5 17 Nd2 Nfd7 18 b4 f5 19 Rc1 Qh4', { a: '∞', r: 'Kosten–Hellers, Esbjerg 1988', c: 'Com 10.Nd5 os dois lados ficam com chances.' }],
  ['c32-h-B', '1', 'h', '(h) B 15...g6', '15... g6', { c: '15...g6!? é uma alternativa.' }],
  ['c32', 'h-C', 'h', '(h) C', '10 a4 Nc6 11 a5 Bxb3 12 cxb3 Nxa5 13 Nd5 Nc6', { a: '=', c: 'Com 10.a4 o jogo fica mais ou menos igual.' }],
  ['c32', 'i', 'i', '(i)', '10... b5 11 a4 b4 12 Nd5 Nxe4 13 Nxe7+ Qxe7 14 Qxb4 f5 15 Na5', { a: '⩲', r: 'Yudasin–Gavrikov, Sverdlovsk 1984', c: 'Com 10...b5?! as brancas ficam um pouco melhor.' }],
  ['c32', 'j', 'j', '(j)', '13 Rfc1 Rfe8 14 Nd5 Qc6 15 Bf3 Bxd5 16 exd5 Qc4 17 Qd3 Qh4', { a: '=', r: 'Chandler–A. Petrosian, Jūrmala 1983', c: 'Com 13.Rfc1 fica igual.' }],
  ['c32', 'k', 'k', '(k)', '14 f3 Rfe8 15 Rac1 Qc7', { a: '=', r: 'Naiditsch–Korneev, Oropesa 2000', c: 'Depois de 14.f3 fica igual.' }],
  // Coluna 33
  ['c33', 'l', 'l', '(l)', '9 Re1 Be6 10 Bf1 Nbd7 11 Nd5 Nxd5 12 exd5 Bf5 13 a4 Rc8 14 c3 Bg6', { a: '=', r: 'Geller–Lutz, Dortmund 1991', c: 'O jogo lento também não promete: com 9.Re1 fica igual. (Para 9.a4, ver a nota (o).)' }],
  ['c33-l', '1', 'l', '(l) 11.a4', '11 a4 Rc8 12 a5 Qc7', { a: '=', c: 'Com 11.a4 também fica igual.' }],
  ['c33', 'm', 'm', '(m)', '9... Qc7 10 a4 Be6 11 f5 Bc4 12 a5 Nbd7 13 Kh1 b5 14 axb6 Nxb6 15 Bg5 Rfc8 16 Bxc4 Nxc4 17 Bxf6 Bxf6 18 Nd5 Qd8 19 Ra2', { a: '⩲', r: 'Klovans–Commons, Primorsko 1976', c: 'A antiga linha principal, que surge por várias ordens de lances: as brancas ficam um pouco melhor. (Para 11.Be3, ver a nota (g).)' }],
  ['c33', 'n', 'n', '(n)', '10 fxe5 dxe5 11 Qxd8 Rxd8 12 Bg5 Be6 13 a4 b4 14 Bxf6 Bxf6 15 Nd5 Bxd5 16 exd5 Ra7', { a: '=', r: 'Klovans–Gutman, URSS 1978', c: 'Com 10.fxe5 as damas saem e fica igual.' }],
  ['c33-n', '1', 'n', '(n) 10.Bf3', '10 Bf3 Bb7', { a: '=', c: 'Com 10.Bf3 também fica igual.' }],
  ['c33-n', '2', 'n', '(n) 11...Bxd8', '11... Bxd8', { c: '11...Bxd8! também é bom.' }],
  // Coluna 34
  ['c34', 'o-A', 'o', '(o) A', '8 a4 Nc6 9 f4 O-O 10 O-O Nb4 11 Kh1 Bd7 12 a5 Rc8 13 Be3 Bc6', { a: '=', r: 'Castañeda–Browne, Filadélfia 1993', c: '8.a4 deixa o cavalo preto chegar a b4, cobrindo d5; fica igual.' }],
  ['c34', 'o-B', 'o', '(o) B', '8 Bg5 Be6 9 Bxf6 Bxf6 10 Nd5 Nd7 11 a4 Rc8 12 c3 O-O 13 a5 Bg5', { a: '=', r: 'Del Campo–de Firmian, Linares 1994', c: 'Com 8.Bg5 também fica igual.' }],
  ['c34', 'p', 'p', '(p)', '9 f4 exf4 10 Bxf4 Nc6 11 Qd2 d5 12 exd5 Nxd5 13 Nxd5 Qxd5', { a: '=', r: 'Ye Jiangchuan–Ponomariov, Olimpíada de Bled 2002', c: '9.f4 transporia para a coluna, mas as pretas podem tentar 11...d5!? e têm boas chances de igualar.' }],
  ['c34', 'q', 'q', '(q)', '14 Nxe6 Qxe6 15 Kb1 Rac8 16 Rhe1 Rc5 17 Bd3 Rfc8', { a: '=', r: 'Dolmatov–Browne, Reykjavík 1990', c: 'Depois de 14.Nxe6 fica igual.' }],
  // Coluna 35
  ['c35', 'r', 'r', '(r)', '8... exf4 9 Bxf4 Be7 10 O-O O-O 11 Kh1 Nc6 12 Qe1 Rc8 13 Rd1', { a: '±', r: 'de Firmian–Hamann, Copenhague 1998', c: '8...exf4 deixa as brancas ganharem um tempo em relação à nota (h): ficam claramente melhor.' }],
  ['c35', 's-A', 's', '(s) A', '9... b5 10 a3', { c: '9...b5 deve ser respondido com 10.a3.' }],
  ['c35-s-A', '1', 's', '(s) A 10.g5', '10 g5 b4', { a: '∞', c: 'Com 10.g5 b4! a posição fica incerta.' }],
  ['c35', 's-B', 's', '(s) B', '9... h6 10 g5 hxg5 11 fxg5 Nh7 12 Nd5', { a: '⩲', r: 'Fernandez–Nakamura, New York Masters 2002', c: 'Com 9...h6 as brancas ficam um pouco melhor.' }],
  ['c35', 't', 't', '(t)', '14 h4 Be7 15 Nd4 Qa5 16 Nf5', { a: '±', r: 'R. Byrne–Sanders, US Open 1990', c: 'Depois de 14.h4 e 16.Nf5 as brancas ficam claramente melhor.' }],
  // Coluna 36
  ['c36', 'u-A', 'u', '(u) A', '6... e6', { c: '6...e6 transpõe para a Variante Scheveningen.' }],
  ['c36-u-A', '1', 'u', '(u) A 6...Qc7', '6... Qc7 7 O-O e6', { c: '6...Qc7 7.O-O e6 também transpõe para a Scheveningen.' }],
  ['c36', 'u-B', 'u', '(u) B', '6... b5 7 a4 b4 8 Nd5', { c: '6...b5?! é arriscado demais.' }],
  ['c36', 'u-C', 'u', '(u) C', '6... g6 7 O-O Bg7 8 a4 O-O', { a: '⩲', c: '6...g6 é a outra tentativa razoável de fugir das linhas principais. As brancas podem jogar como no Dragão Clássico; os lances a4 e ...a6 a mais as favorecem um pouco.' }],
  ['c36-u-C', '1', 'u', '(u) C 7.g4', '7 g4 Bg7 8 g5 Nfd7 9 Be3 b5 10 Qd2 Bb7', { a: '∞', r: 'Svidler–Xu Jun, Olimpíada de Yerevan 1996', c: 'Mais agudo é 7.g4, com posição incerta.' }],
  ['c36', 'v', 'v', '(v)', '7... g6 8 a4 b6 9 f4 Bb7 10 Bf3 Qc7 11 Qe1 e5 12 Nde2 Bg7 13 Kh1 O-O 14 f5 Rae8 15 Qh4', { a: '±', r: 'Smagin–Ilinčić, Iugoslávia 1991', c: 'Com 7...g6 o avanço 14.f5! dá às brancas vantagem clara.' }],
  ['c36', 'w', 'w', '(w)', '14 exd5 exd5 15 c3 Bd6 16 h3 Ne5 17 Nb6', { a: '±', r: 'Geller–Quinteros, Baden-Baden 1985', c: 'Depois de 14.exd5 e 17.Nb6 as brancas ficam claramente melhor.' }],
]

const capitulo = {
  id: 'siciliana-najdorf-e',
  arquivo: 'siciliana-najdorf-e',
  nome: 'Siciliana Najdorf — 6.Be2',
  fonte: 'Modern Chess Openings — Sicilian Defense, Najdorf Variation, 6 Be2 (pp. 261–263), colunas 31–36',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be2',
  corPadrao: 'b',
  ordem: 261,
  grupos: [
    { id: 'roque', nome: '6...e5 7.Nb3 Be7 8.O-O O-O', colunas: [31, 32, 33] },
    { id: 'be3', nome: '8.Be3', colunas: [34] },
    { id: 'be6', nome: '7...Be6', colunas: [35] },
    { id: 'nbd7', nome: '6...Nbd7', colunas: [36] },
  ],
}

module.exports = { capitulo, colunas, notas }
