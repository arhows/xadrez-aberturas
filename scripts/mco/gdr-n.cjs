// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, 3.Nc3 com 3...Be7, 3...Bb4 e 3...Nf6 4.Bg5 c5 (pp. 429–431), colunas 79–84.
// Gerar: node scripts/mco/gerar.cjs gdr-n
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-n-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (q) o livro traz 8...Bg6, impossível; é 8...Ng6 (o cavalo de e7).
// Na nota (i) o livro escreve 7...Nd7; para o 10...Bxh4 do livro ser possível, é o cavalo de f6 (7...Nfd7).

const B = '1 d4 d5 2 c4 e6 3 Nc3'
const E = `${B} Be7 4 cxd5 exd5 5 Bf4`
const G = `${B} Nf6 4 Bg5 c5 5 cxd5`

const colunas = {
  c79: [`${E} c6 6 e3 Bf5 7 g4 Be6 8 h4 c5 9 dxc5 Bxc5 10 Nge2 Nc6`, 'be7', '3...Be7 5...c6 7.g4', '=',
    'Com 3...Be7 as pretas evitam a cravada Bg5 e esperam 4.Nf3 para jogar ...Nf6. Contra 4.cxd5 exd5 5.Bf4 c6 6.e3 Bf5 as brancas atacam o bispo com 7.g4 e 8.h4; depois de 8...c5 9.dxc5 Bxc5 10.Nge2 Nc6 o jogo fica mais ou menos igual (Beliavsky).'],
  c80: [`${E} Nf6 6 e3 Bf5 7 Nge2 O-O 8 Ng3 Be6 9 Bd3 c5 10 dxc5 Bxc5`, 'be7', '5...Nf6 7.Nge2', '=',
    'Com 5...Nf6 6.e3 Bf5 7.Nge2 o cavalo vai a g3 para expulsar o bispo de f5. Depois de 8...Be6 9.Bd3 c5 10.dxc5 Bxc5 as pretas ficam com o peão isolado, mas ativas, e o jogo é igual (Baginskaite–Krush, Stillwater 2007).'],
  c81: [`${B} Bb4 4 cxd5 exd5 5 Bf4 Nf6 6 e3 c5 7 Bd3 Nc6 8 Ne2 cxd4 9 exd4 Bg4 10 f3 Be6`, 'bb4', '3...Bb4 4.cxd5', '⩲',
    'Com 3...Bb4 as pretas jogam uma espécie de Nimzo-Índia. Depois de 4.cxd5 exd5 5.Bf4 Nf6 6.e3 c5 7.Bd3 Nc6 8.Ne2 cxd4 9.exd4 as brancas ficam com uma vantagem mínima (Hertneck–Lautier, Munique 1993).'],
  c82: [`${B} Bb4 4 e3 Ne7 5 Bd2 O-O 6 Nf3 Nd7 7 Bd3 b6 8 cxd5 exd5 9 O-O a5 10 Qc2 h6`, 'bb4', '4.e3 Ne7', '⩲',
    'Com 4.e3 Ne7 as pretas desenvolvem o cavalo em e7 para não sofrer a cravada. Depois de 5.Bd2 O-O 6.Nf3 Nd7 7.Bd3 b6 o jogo é tranquilo, e as brancas ficam um pouco melhor (G. Georgadze–Conquest, Senden 1993).'],
  c83: [`${G} cxd4 6 Qxd4 Be7 7 e4 Nc6 8 Qd2 exd5 9 Bxf6 Bxf6 10 exd5 Qe7+`, 'nf6', '3...Nf6 4.Bg5 c5 5...cxd4', '⩲',
    'Com 3...Nf6 4.Bg5 c5 as pretas jogam o Gambito Holandês-Peruano. Depois de 5.cxd5 cxd4 6.Qxd4 Be7 7.e4 Nc6 8.Qd2 exd5 9.Bxf6 Bxf6 10.exd5 Qe7+ as brancas ficam com o peão a mais e uma pequena vantagem (Burgess).'],
  c84: [`${G} Qb6 6 Bxf6 Qxb2 7 Rc1 gxf6 8 e3 cxd4 9 Bb5+ Bd7 10 Bxd7+ Nxd7`, 'nf6', '5...Qb6', '±',
    'Com 5...Qb6 as pretas atacam b2 de imediato. Depois de 6.Bxf6 Qxb2 7.Rc1 gxf6 8.e3 cxd4 9.Bb5+ Bd7 10.Bxd7+ Nxd7 as pretas ganham peões, mas a estrutura fica arruinada, e as brancas ficam bem melhor (C. Hansen–Zsu. Polgar, Debrecen 1990).'],
}

const notas = [
  // Coluna 79
  ['c79', 'a', 'a', '(a)', '3 Nf3 Nf6 4 Bg5 h6 5 Bxf6 Qxf6 6 Nc3 Qd8 7 e3 Be7 8 Qb3 dxc4 9 Bxc4', { a: '⩲', r: 'Cifuentes–Flear, San Sebastián 2005', c: '3.Nf3 Nf6 4.Bg5 h6 5.Bxf6 Qxf6 6.Nc3 Qd8 7.e3 Be7 8.Qb3 dxc4 9.Bxc4 é um pouco melhor para as brancas; outros 4º lances das pretas costumam transpor para outras linhas.' }],
  ['c79', 'b-A', 'b', '(b) A', '3... a6 4 cxd5 exd5 5 Bf4 Nf6 6 e3', { a: '⩲', r: 'Euwe–Alekhine, Zurique 1934', c: '3...a6 é a chamada Defesa Janowski: depois de 4.cxd5 exd5 5.Bf4 Nf6 6.e3 as brancas ficam um pouco melhor.' }],
  ['c79', 'b-B', 'b', '(b) B', '3... b6 4 Nf3 Bb7 5 cxd5 exd5 6 e4 dxe4 7 Ne5 Bd6 8 Qg4 Kf8 9 Bc4', { a: '±', r: 'Pillsbury–Swiderski, Hannover 1902', c: '3...b6 4.Nf3 Bb7 5.cxd5 exd5 6.e4 dxe4 7.Ne5 Bd6 8.Qg4 Kf8 9.Bc4 deu às brancas boas chances de ataque.' }],
  ['c79', 'c', 'c', '(c)', '7... Bg6 8 h4 h5 9 g5 Bd6 10 Nge2', { a: '⩲', r: 'Karpov–Portisch, Linares 1989', c: '7...Bg6 é mais arriscado: 8.h4 h5 9.g5 Bd6 10.Nge2 é um pouco melhor para as brancas.' }],
  ['c79-c', '1', 'c', '(c) 8...Bxh4', '8... Bxh4 9 Qb3 b6 10 Rxh4 Qxh4 11 Nxd5', { a: '±', c: '8...Bxh4 9.Qb3 b6 10.Rxh4 Qxh4 11.Nxd5 é melhor para as brancas. (O Stockfish vai além: dá cerca de +5, vantagem decisiva.)' }],
  ['c79-c', '2', 'c', '(c) 8...h6', '8... h6 9 Nf3 Nd7 10 Bd3', { a: '⩲', r: 'Knaak–Raičević, Atenas 1992', c: '8...h6 9.Nf3 Nd7 10.Bd3 foi um pouco melhor para as brancas.' }],
  ['c79', 'd', 'd', '(d)', '8 h3 Nd7 9 Bd3 g5 10 Bg3 h5 11 f3 Ngf6 12 Rh2 Nb6', { a: '=', r: 'Krush–Bruzón, Buenos Aires 2003', c: '8.h3 Nd7 9.Bd3 g5 10.Bg3 h5 11.f3 Ngf6 12.Rh2 Nb6 é igual.' }],
  ['c79', 'e-A', 'e', '(e) A', '8... Bxh4 9 Qb3 g5 10 Bh2', { a: '±', r: 'Vaiser–Díaz, Havana 1985', c: 'O ganancioso 8...Bxh4?! 9.Qb3 g5 10.Bh2, com a ideia 11.Nf3, foi bom para as brancas.' }],
  ['c79', 'e-B', 'e', '(e) B', '8... Nf6 9 f3 c5 10 Bd3 Nc6 11 Nge2', { a: '⩲', r: 'Chernin–Pigusov, Copenhague 1986', c: '8...Nf6 9.f3 c5 10.Bd3 Nc6 11.Nge2 é um pouco melhor para as brancas.' }],
  ['c79', 'e-C', 'e', '(e) C', '8... Nd7 9 h5 Nb6 10 Be2', { a: '⩲', r: 'Kasparov–Karpov, Moscou 1985', c: '8...Nd7 9.h5 Nb6 10.Be2 é um pouco melhor para as brancas.' }],
  ['c79', 'f', 'f', '(f)', '9 Be5 Bf6 10 Bxb8 Rxb8 11 g5 Be7 12 Bg2 h6 13 Nge2', { a: '⩲', r: 'Dautov–Lputian, Olimpíada de Istambul 2000', c: '9.Be5!? Bf6 10.Bxb8 Rxb8 11.g5 Be7 12.Bg2 h6 13.Nge2 deu vantagem às brancas.' }],
  ['c79', 'g', 'g', '(g)', '10... Ne7 11 Nd4 Nbc6 12 Nxe6', { a: '⩲', r: 'Flear–Beliavsky, Szirák 1987', c: '10...Ne7 11.Nd4 Nbc6 12.Nxe6 é um pouco melhor para as brancas. Depois de 10...Nc6, sugestão de Beliavsky, o jogo é mais ou menos igual.' }],
  // Coluna 80
  ['c80', 'h', 'h', '(h)', '7 Qb3 Nc6 8 Qxb7 Nb4 9 Rc1 O-O 10 a3 Nc2+ 11 Rxc2 Bxc2 12 Bxc7 Qc8 13 Ba6 Qxb7 14 Bxb7 Rab8', { a: '∞', r: 'Ehlvest–Yusupov, Linares 1991', c: '7.Qb3 Nc6 8.Qxb7 Nb4 9.Rc1 O-O 10.a3 Nc2+ 11.Rxc2 Bxc2 12.Bxc7 Qc8 13.Ba6 Qxb7 14.Bxb7 Rab8! dá chances aos dois lados.' }],
  ['c80', 'i', 'i', '(i)', '7... Nfd7 8 h3 Bg6 9 Ng3 Nf8 10 h4 Bxh4 11 Qb3 Bxg3 12 Bxg3', { a: '∞', r: 'Hertneck', c: '7...Nfd7 8.h3 Bg6 9.Ng3 Nf8 10.h4 Bxh4 11.Qb3 Bxg3 12.Bxg3 dá chances aos dois lados (Hertneck). (O Stockfish discorda: no fim da linha dá cerca de +5 para as brancas. O livro escreve só 7...Nd7; para ...Bxh4 ser possível, tem de ser o cavalo de f6.)' }],
  ['c80', 'j', 'j', '(j)', '8... Bg6 9 h4 h6 10 h5 Bh7 11 Bd3', { a: '⩲', r: 'Kasparov', c: 'Se 8...Bg6, 9.h4 h6 10.h5 Bh7 11.Bd3 é melhor para as brancas (Kasparov).' }],
  ['c80', 'k', 'k', '(k)', '11 O-O Nc6 12 Rc1 d4 13 Nce4 Be7 14 Nxf6+ Bxf6 15 b3 dxe3', { a: '=', r: 'Baginskaite–Krush, Stillwater 2007', c: '11.O-O Nc6 12.Rc1 d4 13.Nce4 Be7 14.Nxf6+ Bxf6 15.b3 dxe3 é igual.' }],
  ['c80-k', '1', 'k', '(k) 15.e4', '15 e4', { c: '15.e4 parece melhor.' }],
  // Coluna 81
  ['c81', 'l', 'l', '(l)', '5 Nf3 c6 6 Bf4 Ne7 7 e3 Bf5 8 Qb3 Qb6 9 Nh4', { a: '⩲', r: 'M. Gurevich–Barsov, Bastia 2005', c: '5.Nf3 c6 6.Bf4 Ne7 7.e3 Bf5 8.Qb3 Qb6 9.Nh4 é um pouco melhor para as brancas.' }],
  ['c81', 'm', 'm', '(m)', '6... Ne4 7 Qc2 c5 8 Bd3 cxd4 9 exd4 Bf5', { a: '=', r: 'Safin–Nenashev, Siskek 1993', c: 'Safin–Nenashev seguiu 6...Ne4 7.Qc2 c5 8.Bd3 cxd4 9.exd4 Bf5, igual.' }],
  ['c81-m', '1', 'm', '(m) 7.Rc1', '7 Rc1', { r: 'Nenashev', c: '7.Rc1! é a sugestão de Nenashev.' }],
  ['c81', 'n', 'n', '(n)', '7 Bb5+ Bd7 8 Bxd7+ Qxd7 9 dxc5 Bxc3+ 10 bxc3 O-O 11 Ne2 Rc8', { a: '=', r: 'Hertneck–Lautier, Tilburg 1992', c: '7.Bb5+ Bd7 8.Bxd7+ Qxd7 9.dxc5 Bxc3+ 10.bxc3 O-O 11.Ne2 Rc8: as pretas tinham compensação suficiente pelo peão.' }],
  ['c81', 'o', 'o', '(o)', '11 O-O O-O 12 a3 Bd6', { a: '⩲', r: 'Hertneck–Lautier, Munique 1993', c: 'Hertneck–Lautier seguiu 11.O-O O-O 12.a3, e agora 12...Bd6 teria limitado as brancas a uma vantagem mínima.' }],
  // Coluna 82
  ['c82', 'p', 'p', '(p)', '4 a3 Bxc3+ 5 bxc3 c5 6 e3 Ne7 7 Bd3 Qc7 8 cxd5 exd5 9 Ne2 Bf5', { a: '=', r: 'Shirov–Lautier, Linares 1994', c: '4.a3 já foi jogado aqui: depois de 4...Bxc3+ 5.bxc3 c5 6.e3 Ne7 7.Bd3 Qc7 8.cxd5 exd5 9.Ne2 Bf5 as chances são mais ou menos iguais.' }],
  ['c82-p', '1', 'p', '(p) 7.Nf3', '7 Nf3 Qc7 8 Bb2 O-O 9 Rc1', { a: '⩲', r: 'Korchnoi–Winants, Antuérpia 1994', c: 'Um pouco melhor é 7.Nf3 Qc7 8.Bb2 O-O 9.Rc1.' }],
  ['c82', 'q', 'q', '(q)', '6 a3 Bxc3 7 Bxc3 b6 8 Nf3 Ng6', { a: '=', r: 'Yusupov–Lautier, Amsterdã 1994', c: '6.a3 Bxc3 7.Bxc3 b6 8.Nf3 Ng6 é igual. (O livro traz 8...Bg6, impossível; o lance é do cavalo de e7.)' }],
  ['c82', 'r', 'r', '(r)', '7... dxc4 8 Bxc4 c5 9 a3 Bxc3 10 Bxc3', { a: '⩲', r: 'Georgadze', c: '7...dxc4 8.Bxc4 c5 9.a3 Bxc3 10.Bxc3 é um pouco melhor para as brancas (Georgadze).' }],
  ['c82', 's', 's', '(s)', '11 Rac1 Ba6 12 Bxa6 Rxa6 13 a3 Bxc3 14 Bxc3', { a: '⩲', r: 'G. Georgadze–Conquest, Senden 1993', c: 'G. Georgadze–Conquest seguiu 11.Rac1 Ba6 12.Bxa6 Rxa6 13.a3 Bxc3 14.Bxc3, um pouco melhor para as brancas.' }],
  // Coluna 83
  ['c83', 't', 't', '(t)', '6 Qa4+ Qd7 7 Qxd4 Nc6 8 Qa4 Nxd5 9 O-O-O Be7', { a: '=', r: 'H. Steiner–Wade, Veneza 1953', c: '6.Qa4+ Qd7 7.Qxd4 Nc6 8.Qa4 Nxd5 9.O-O-O Be7 não deu nada às brancas.' }],
  ['c83', 'u', 'u', '(u)', '7 e3 exd5 8 Bb5+ Nc6 9 Nf3 O-O 10 Qa4 Be6 11 O-O Qb6 12 Rac1 h6', { a: '=', r: 'Eingorn–S. Ivanov, Berlim 1992', c: '7.e3 exd5 8.Bb5+ Nc6 9.Nf3 O-O 10.Qa4 Be6 11.O-O Qb6 12.Rac1 h6 é igual.' }],
  ['c83-u', '1', 'u', '(u) 11.Bxc6', '11 Bxc6 bxc6 12 Qxc6', { r: 'S. Ivanov', c: '11.Bxc6 bxc6 12.Qxc6 daria às pretas bom jogo com 12...Rc8, 12...Qa5 ou 12...Rb8 (S. Ivanov).' }],
  ['c83', 'v', 'v', '(v)', '8 Qe3 Nb4 9 Bb5+ Bd7 10 Qe2 exd5 11 Nf3 O-O 12 Bxd7 Qxd7 13 e5', { a: '=', r: 'Klimov–S. Ivanov, Campeonato de São Petersburgo 2003', c: '8.Qe3 Nb4 9.Bb5+ Bd7 10.Qe2 exd5 11.Nf3 O-O 12.Bxd7 Qxd7 13.e5 é igual.' }],
  ['c83-v', '1', 'v', '(v) 8...exd5', '8... exd5 9 Bxf6 Bxf6 10 exd5+ Ne7 11 d6 Qxd6 12 Bb5+ Bd7 13 Rd1', { a: '±', r: 'Evans–Bisguier, EUA 1964', c: '8...exd5 9.Bxf6 Bxf6 10.exd5+ Ne7 11.d6 Qxd6 12.Bb5+ Bd7 13.Rd1 é melhor para as brancas. (O Stockfish vai além: dá cerca de +4, vantagem decisiva.)' }],
  ['c83', 'w-A', 'w', '(w) A', '8... Nxd5 9 exd5 Bxg5 10 f4 Bh4+ 11 g3 exd5 12 gxh4 Qxh4+ 13 Qf2 Qe7+ 14 Qe2 Be6 15 Nf3', { a: '±', r: 'Furman–Dzindzichashvili, URSS 1967', c: '8...Nxd5 9.exd5 Bxg5 10.f4 Bh4+ 11.g3 exd5 12.gxh4 Qxh4+ 13.Qf2 foi melhor para as brancas.' }],
  ['c83', 'w-B', 'w', '(w) B', '8... Nxe4 9 Nxe4 exd5 10 Bxe7 Qxe7 11 Qxd5 f5 12 Bb5', { a: '±', c: '8...Nxe4 9.Nxe4 exd5 10.Bxe7 Qxe7 11.Qxd5 f5 12.Bb5 é melhor para as brancas.' }],
  ['c83-w-B', '1', 'w', '(w) B 11...O-O', '11... O-O 12 f3 Nb4 13 Qc4 Be6 14 Qc5 Qxc5 15 Nxc5 Nc2+ 16 Kd2', { a: '±', c: '11...O-O 12.f3 Nb4 13.Qc4 Be6 14.Qc5 Qxc5 15.Nxc5 Nc2+ 16.Kd2 também é melhor para as brancas.' }],
  ['c83', 'x-A', 'x', '(x)', '11 Nge2 Ne5 12 d6', { a: '⩲', r: 'Burgess', c: 'Depois do lance do texto, 11.Nge2 Ne5 12.d6 é bom para as brancas (Burgess).' }],
  ['c83', 'x-B', 'x', '(x) 10...Nb4', '10... Nb4 11 Bb5+ Bd7 12 Bxd7+ Qxd7 13 Nge2', { a: '⩲', c: '10...Nb4 11.Bb5+ Bd7 12.Bxd7+ Qxd7 13.Nge2 é um pouco melhor para as brancas.' }],
  // Coluna 84
  ['c84', 'y-A', 'y', '(y) A', '6 Nf3 Qxb2 7 Na4 Qb4+ 8 Bd2 Qa3 9 dxe6 Bxe6 10 e3 Ne4', { a: '=', r: 'Neishtadt', c: '6.Nf3 Qxb2 7.Na4 Qb4+ 8.Bd2 Qa3 9.dxe6 Bxe6 10.e3 Ne4 é igual (Neishtadt).' }],
  ['c84', 'y-B', 'y', '(y) B', '6 dxe6 cxd4 7 exf7+ Kxf7 8 Na4 Bb4+ 9 Bd2 Bxd2+ 10 Qxd2 Qb5', { a: '∞', r: 'Borisenko–Makarov, URSS 1956', c: '6.dxe6 cxd4 7.exf7+ Kxf7 8.Na4 Bb4+ 9.Bd2 Bxd2+ 10.Qxd2 Qb5 é indefinido.' }],
  ['c84', 'z', 'z', '(z)', '6... gxf6 7 e3 Qxb2 8 Bb5+ Bd7 9 Bxd7+ Nxd7 10 Nge2 cxd4 11 Rb1', { a: '±', r: 'Taimanov–A. Geller, URSS 1956', c: '6...gxf6 7.e3 Qxb2 8.Bb5+ Bd7 9.Bxd7+ Nxd7 10.Nge2 cxd4 11.Rb1 é melhor para as brancas.' }],
  ['c84', 'aa', 'aa', '(aa)', '7 Qc1 Qxc1+ 8 Rxc1 gxf6 9 Nf3 Kd8 10 e4', { a: '±', r: 'Furman–Kavalek, Harrachov 1956', c: '7.Qc1 Qxc1+ 8.Rxc1 gxf6 9.Nf3 Kd8 10.e4 deu boa vantagem às brancas.' }],
  ['c84', 'bb', 'bb', '(bb)', '11 exd4 Bb4 12 Ne2 Rc8 13 O-O Bxc3 14 Qd3 Nb6 15 Rxc3 O-O 16 dxe6 fxe6 17 Ra3', { a: '±', r: 'C. Hansen–Zsu. Polgar, Debrecen 1990', c: 'Depois de 11.exd4 Bb4 12.Ne2 Rc8 13.O-O Bxc3 14.Qd3 Nb6 15.Rxc3 O-O 16.dxe6 fxe6 17.Ra3 as brancas ficaram bem melhor.' }],
  ['c84-bb', '1', 'bb', '(bb) 12...Bxc3+', '12... Bxc3+ 13 Rxc3 Qxa2 14 dxe6 fxe6 15 O-O', { a: '±', r: 'Spassky–Uitumen, Sóchi 1966', c: '12...Rc8 é uma tentativa de melhorar 12...Bxc3+ 13.Rxc3 Qxa2 14.dxe6 fxe6 15.O-O, melhor para as brancas.' }],
  ['c84-bb', '2', 'bb', '(bb) 13.Rc2', '13 Rc2 Qa3 14 dxe6 fxe6 15 O-O', { a: '±', r: 'Usov–Serebriansky, Kharkov 1961', c: '13.Rc2 Qa3 14.dxe6 fxe6 15.O-O também é melhor para as brancas.' }],
]

const capitulo = {
  id: 'gdr-n',
  arquivo: 'gdr-n',
  nome: 'Gambito da Dama Recusado — 3...Be7, 3...Bb4 e 3...Nf6 4.Bg5 c5',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 429–431), colunas 79–84',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 429,
  grupos: [
    { id: 'be7', nome: '3...Be7', colunas: [79, 80] },
    { id: 'bb4', nome: '3...Bb4', colunas: [81, 82] },
    { id: 'nf6', nome: '3...Nf6 4.Bg5 c5', colunas: [83, 84] },
  ],
}

module.exports = { capitulo, colunas, notas }
