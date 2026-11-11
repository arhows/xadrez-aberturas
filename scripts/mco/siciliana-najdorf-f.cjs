// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Najdorf: 6.Bc4 (pp. 264–266), colunas 37–42.
// Gerar: node scripts/mco/gerar.cjs siciliana-najdorf-f
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-najdorf-f-dicas.cjs.

// Erros do livro corrigidos:
// - Nota (y) omitida: "15 Qg4" entrega a dama ao cavalo de f6, "16...Nxe5" é impossível, e "17 Qf4 b4" também (dama atacada pelo peão de e5; o peão b já foi capturado em 14.Nxb5). A coluna fica com ∞ ("posição aguda, com chances para os dois lados", Vavra–Ftáčnik, República Tcheca 1995).

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 a6 6 Bc4 e6 7 Bb3'
const R = `${B} b5 8 O-O Be7`

const colunas = {
  c37: [`${R} 9 Qf3 Qc7 10 Qg3 O-O 11 Bh6 Ne8 12 Rad1 Bd7 13 Nf3 Nc6 14 Bf4 Qb7`, 'qf3', '9.Qf3 Qc7', '=',
    'O 6.Bc4 (Variante Fischer–Sozin) mira e6 e prepara sacrifícios nessa casa. As pretas jogam 6...e6 7.Bb3 b5 e depois 8.O-O Be7 9.Qf3 Qc7 10.Qg3 rocam com 10...O-O; o jogo fica igual.'],
  c38: [`${R} 9 Qf3 Qb6 10 Be3 Qb7 11 Qg3 b4 12 Na4 Nbd7 13 f3 O-O 14 Rac1 Ne5`, 'qf3', '9.Qf3 Qb6', '=',
    'Com 9...Qb6 a dama vai para b7 e pressiona e4. Depois de 11...b4 12.Na4 o cavalo branco fica na borda, e o jogo fica igual.'],
  c39: [`${R} 9 f4 Bb7 10 e5 dxe5 11 fxe5 Bc5 12 Be3 Nc6 13 exf6 Bxd4 14 Qe1 Bxe3+`, 'f4', '9.f4', '=',
    'Com 9.f4 as brancas ameaçam f5 ou e5. Depois de 10.e5 dxe5 11.fxe5 Bc5! as pretas contra-atacam em d4, e a troca geral leva à igualdade.'],
  c40: [`${B} b5 8 O-O Bb7 9 Re1 Nbd7 10 Bg5 h6 11 Bxf6 Nxf6 12 Qd3 Nd7 13 Qh3 Qf6 14 Rad1 Be7`, 'bb7', '8...Bb7', '±',
    'Com 8...Bb7 as pretas atacam e4 logo. As brancas respondem com 9.Re1 e 10.Bg5, e depois de 14...Be7 vem o sacrifício 15.Nxe6!, com vantagem clara.'],
  c41: [`${B} b5 8 Qf3 Qc7 9 Bg5 Nbd7 10 O-O-O Be7 11 e5 Bb7 12 Qg3 Nxe5 13 Bxe6 fxe6 14 f4 Kf7`, 'qf3-grande', '8.Qf3', '=',
    'Com 8.Qf3 e 10.O-O-O as brancas vão para o ataque direto. Depois dos sacrifícios em e6 o rei preto fica exposto, mas o jogo termina em xeque perpétuo.'],
  c42: [`${B} Nbd7 8 f4 Nc5 9 f5 Be7 10 Qf3 O-O 11 Be3 e5 12 Nde2 Nxb3 13 axb3 b5 14 Nxb5 d5`, 'nbd7', '7...Nbd7', '∞',
    'Com 7...Nbd7 e 8...Nc5 as pretas atacam o bispo de b3. Depois de 13...b5! e 14.Nxb5?! d5 a posição fica aguda, com chances para os dois lados.'],
}

const notas = [
  // Coluna 37
  ['c37', 'a-A', 'a', '(a) A', '7 O-O', { c: 'Alguns jogadores preferem 7.O-O para evitar o 7...Nbd7 da coluna 42, mas assim as brancas têm menos opções contra 7...Nc6 ou 7...Be7.' }],
  ['c37', 'a-B', 'a', '(a) B', '7 a3 Be7 8 Ba2 O-O 9 O-O b5 10 f4 Bb7 11 f5 e5 12 Nde2 Nbd7 13 Ng3 Rc8 14 Bg5 Rxc3 15 bxc3 Nxe4', { a: '∓', r: 'Ermenkov–Portisch, Skara 1980', c: 'Com 7.a3 o sacrifício de qualidade 14...Rxc3! deixa as pretas um pouco melhor.' }],
  ['c37', 'b', 'b', '(b)', '8 f4 Bb7 9 f5 e5 10 Nde2 Nbd7 11 Bg5 Be7 12 Ng3 Rc8 13 Nh5 Nxh5 14 Qxh5 O-O', { a: '=', c: 'A velha linha 8.f4 quase não se joga mais: fica igual. (Para 8.Bg5 Be7, ver a nota (r).)' }],
  ['c37-b', '1', 'b', '(b) 13.O-O?!', '13 O-O h5', { c: '13.O-O?! é respondido por 13...h5!.' }],
  ['c37', 'c', 'c', '(c)', '10... Nc6 11 Nxc6 Qxc6 12 Re1 Bb7 13 Qxg7 Rg8 14 Qh6 O-O-O 15 Qh3 Kb8 16 f3 Rg6 17 Be3 Rdg8 18 Re2', { a: '⩲', r: 'Nijboer–Schneider, Campeonato Europeu 2001', c: 'Com 10...Nc6 e 13.Qxg7!? as pretas ficam com a iniciativa, mas sem compensação clara pelo peão.' }],
  ['c37-c', '1', 'c', '(c) 12...O-O', '12... O-O 13 Bh6 Ne8 14 Nd5 Bd8 15 a4', { a: '⩲', c: 'Com 12...O-O 13.Bh6 Ne8 14.Nd5! as brancas ficam um pouco melhor (também 15.Re3).' }],
  ['c37', 'd', 'd', '(d)', '12 Rfe1 Bd7 13 a4 Bf6 14 Rad1 bxa4', { a: '=', r: 'Kasparov–Gelfand, Paris 1991 (até 13.a4)', c: 'Com 12.Rfe1 Bd7 13.a4 as pretas igualam com 13...Bf6.' }],
  ['c37-d', '1', 'd', '(d) 13.Nf5?', '13 Nf5 exf5 14 Nd5 Qd8 15 exf5 Bf6', { a: '−+', c: 'O sacrifício 13.Nf5? não funciona: as pretas ganham.' }],
  ['c37', 'e-A', 'e', '(e) A', '13 a3 Nc6 14 Nxc6 Bxc6 15 Bf4 Qb7 16 Rfe1 a5', { a: '=', r: 'Short–Kasparov, Campeonato Mundial 1993', c: 'Com 13.a3 fica igual.' }],
  ['c37', 'e-B', 'e', '(e) B', '13 f4 Nc6 14 Nxc6 Bxc6 15 f5 Kh8 16 Be3 b4 17 Na4 Nf6', { a: '∞', r: 'A. Sokolov–Gelfand, Campeonato da URSS 1989 (até 17.Na4)', c: 'Com 13.f4 e 17...Nf6 os dois lados ficam com jogo ativo.' }],
  ['c37', 'f', 'f', '(f)', '15 Rfe1 b4 16 Ne2 e5 17 Bg5 Be6 18 Nh4 Bxg5 19 Qxg5 Na5 20 Bd5 Bxd5 21 Rxd5 Nc4', { a: '=', r: 'Hraček–Lutz, Alemanha 1996', c: 'Depois de 15.Rfe1 fica igual.' }],
  // Coluna 38
  ['c38', 'g', 'g', '(g)', '11... Nc6 12 Nxc6 Qxc6 13 f3', { a: '⩲', r: 'Hübner–Armas, Alemanha 1989', c: 'Com 11...Nc6 as brancas mantêm alguma iniciativa.' }],
  ['c38-g', '1', 'g', '(g) 11...O-O', '11... O-O 12 Bh6 Ne8 13 Rad1 Bd7', { a: '=', c: '11...O-O, como na coluna anterior, é sensato.' }],
  ['c38', 'h', 'h', '(h)', '12... Nxe4 13 Qxg7 Bf6 14 Qh6 Rg8 15 f3', { a: '±', r: 'Tisdall–Popovych, Nova York 1974', c: 'Com 12...Nxe4?! as brancas ficam claramente melhor.' }],
  ['c38', 'i', 'i', '(i)', '15 c4 bxc3 16 Rxc3 Bd7 17 Nb6 Nh5 18 Qh3 Nf4 19 Bxf4 Qxb6', { a: '=', r: 'Reinderman–K. Georgiev, Varsóvia 2005', c: 'Depois de 15.c4 fica igual.' }],
  // Coluna 39
  ['c39', 'j-A', 'j', '(j) A', '9 Be3 O-O 10 f4 b4 11 Na4 Bb7 12 e5 dxe5 13 Nxe6 fxe6 14 Bxe6+ Kh8 15 Qxd8 Rxd8 16 fxe5 Ng8 17 Nb6 Ra7 18 Rad1 Nc6 19 Rxd8 Nxd8 20 Bxg8 Kxg8 21 Nc8 Bxc8 22 Bxa7 Nc6', { a: '∓', r: 'Kaidanov–de Firmian, Las Vegas 1994', c: 'Com 9.Be3 e o sacrifício 13.Nxe6!? fica igual depois de 17...Ra7, mas 18.Rad1?! deixa as pretas um pouco melhor.' }],
  ['c39', 'j-B', 'j', '(j) B', '9 a4 b4 10 Na2 Bb7 11 Bxe6 fxe6 12 Nxe6 Qd7 13 Nxg7+ Kf7 14 Nh5 Bxe4 15 Nxf6 Bxf6 16 Qh5+ Kg8 17 Nxb4 Nc6', { a: '=', r: 'Polgár–Ribli, Campeonato Húngaro 1971', c: 'Com 9.a4 e os sacrifícios em e6 fica igual.' }],
  ['c39', 'k', 'k', '(k)', '9... O-O 10 e5 dxe5 11 fxe5 Nfd7 12 Be3 Nxe5 13 Qh5 Nc4 14 Bxc4 bxc4 15 Rad1 Qc7 16 Rf3 g6 17 Qh6 f6 18 Rdf1 e5 19 Rg3 Bd8 20 Nf3 Nc6 21 Bc5 Be7 22 Rxg6+ hxg6 23 Qxg6+', { a: '=', r: 'de Firmian–Ivanchuk, Amsterdã 1996', c: '9...O-O também é razoável: depois do sacrifício 22.Rxg6+ as brancas dão xeque perpétuo.' }],
  ['c39', 'l', 'l', '(l)', '15 Qxe3 Qd4 16 Rae1 gxf6 17 Ne4 Ke7', { a: '=', r: 'de Firmian–Carlsen, Copenhague 2004 (até 17.Ne4)', c: 'Depois de 15.Qxe3 as damas saem e, com 17...Ke7, fica igual.' }],
  // Coluna 40
  ['c40', 'm', 'm', '(m)', '8... b4 9 Na4 Nxe4 10 Re1 d5 11 Bf4 Bb7 12 Nxe6 fxe6 13 Qh5+ Kd7 14 Rxe4', { a: '+−', r: 'Rowley–D’Arruda, 1989', c: '8...b4?! é muito perigoso: depois de 12.Nxe6! as brancas ganham.' }],
  ['c40-m', '1', 'm', '(m) 10...Nf6', '10... Nf6 11 Bg5 Be7 12 Nf5 exf5 13 Bxf6 gxf6 14 Qd5', { a: '+−', c: 'Com 10...Nf6 as brancas também ganham.' }],
  ['c40-m', '2', 'm', '(m) 13...g6', '13... g6 14 Qe5', { a: '±', c: 'Com 13...g6 as brancas ficam claramente melhor.' }],
  ['c40', 'n', 'n', '(n)', '9 f4 b4 10 Na4 Bxe4', { a: '∓', c: 'Com 9.f4?! as pretas pegam o peão e ficam um pouco melhor.' }],
  ['c40', 'o', 'o', '(o)', '9... b4 10 Na4 Nbd7 11 a3 Nxe4 12 Nxe6 fxe6 13 Bxe6', { a: '±', r: 'de Firmian–Hort, Baden-Baden 1981', c: 'Com 9...b4 vem 11.a3! e o sacrifício 12.Nxe6!: as brancas ficam claramente melhor.' }],
  ['c40-o', '1', 'o', '(o) 11...bxa3', '11... bxa3 12 Bxe6 fxe6 13 Nxe6 Qa5 14 Rxa3', { a: '±', c: 'Com 11...bxa3 as brancas também ficam claramente melhor.' }],
  ['c40', 'p-A', 'p', '(p) A', '10... Be7 11 Bxe6', { a: '±', c: 'As pretas precisam tomar cuidado com sacrifícios: 10...Be7?! 11.Bxe6!.' }],
  ['c40', 'p-B', 'p', '(p) B', '10... Nc5 11 Bd5 b4 12 Bxb7 Nxb7 13 Nd5 exd5 14 exd5+ Kd7 15 c3', { a: '±', r: 'Tal–Mukhin, URSS 1972', c: 'Com 10...Nc5 vem 11.Bd5! e o sacrifício 13.Nd5.' }],
  ['c40', 'p-C', 'p', '(p) C', '10... Qb6 11 a4 b4 12 Nd5 exd5 13 exd5+ Ne5 14 a5 Qc5 15 Be3 Qc8 16 Ba4+ Ke7 17 f4', { a: '⩲', r: 'Adams–Sadler, Dublin 1993', c: 'Com 10...Qb6 o sacrifício 12.Nd5 deixa as brancas um pouco melhor.' }],
  ['c40', 'q', 'q', '(q)', '15 Nxe6 fxe6 16 Bxe6 Ne5 17 Bd5', { a: '±', r: 'Grigoriants–Kokarev, Rússia 2002', c: 'O sacrifício 15.Nxe6! dá vantagem clara às brancas.' }],
  // Coluna 41
  ['c41', 'r', 'r', '(r)', '8 Bg5 Be7 9 Qf3 Qc7 10 O-O-O Nbd7', { c: 'Uma linha parecida é 8.Bg5 Be7 9.Qf3 Qc7: 10.O-O-O Nbd7 transpõe para a coluna.' }],
  ['c41-r', '1', 'r', '(r) 10...O-O?', '10... O-O 11 e5 Bb7 12 exf6 Bxf3 13 fxe7 Bxd1 14 Nxe6', { c: 'Não 10...O-O 11.e5 Bb7 12.exf6 Bxf3 13.fxe7 Bxd1? 14.Nxe6!.' }],
  ['c41-r', '2', 'r', '(r) 10.e5', '10 e5 Bb7 11 exd6 Bxd6 12 Qe3 Bc5 13 O-O-O Nc6 14 Bxf6 gxf6 15 Ne4 Bxd4 16 Rxd4 Nxd4 17 Nxf6+ Kf8 18 Qxd4 Rd8', { a: '=', r: 'Kogan–Sutovsky, Rússia 2006', c: 'Em vez de 10.O-O-O, as brancas tentaram 10.e5: fica igual.' }],
  ['c41', 's', 's', '(s)', '11 Rhe1 O-O 12 Qg3 Nc5', { a: '=', r: 'Ly Hong–Nguyen Phu Quoc, Vietnã 2007', c: 'Com 11.Rhe1 fica igual.' }],
  ['c41', 't-A', 't', '(t) A', '14... Ng6 15 Nxe6 Qd7 16 Rhe1 Kf7 17 f5 Nf8 18 Bxf6 Bxf6 19 Rxd6', { a: '+−', r: 'Christiansen–Wojtkiewicz, Campeonato dos EUA 2006', c: 'Não 14...Ng6? 15.Nxe6: as brancas ficam com ataque vencedor.' }],
  ['c41', 't-B', 't', '(t) B', '15 fxe5 dxe5 16 Nxe6 Kxe6 17 Qh3+ Kf7 18 Bxf6 gxf6 19 Rd7 Qc8 20 Rhd1 Bc6 21 Qh5+ Kf8 22 Qh6+ Kf7', { a: '=', r: 'Ris–Ibragimov, Essent Open 2006', c: 'Depois de 14...Kf7 vem 15.fxe5 e as brancas dão xeque perpétuo.' }],
  // Coluna 42
  ['c42', 'u-A', 'u', '(u) A', '7... Nc6', { c: '7...Nc6, muito jogado, transpõe para a Variante Sozin.' }],
  ['c42', 'u-B', 'u', '(u) B', '7... Be7 8 g4 Nc6 9 g5 Nd7 10 h4 Nc5 11 Be3', { a: '±', r: 'Djurhuus–van Wely, Gausdal 1994', c: '7...Be7?! pode ser respondido com 8.g4!: as brancas ficam claramente melhor.' }],
  ['c42-u-B', '1', 'u', '(u) B 8...h6', '8... h6 9 Rg1 Nc6 10 Be3', { a: '⩲', c: 'Com 8...h6 as brancas ficam um pouco melhor.' }],
  ['c42-u-B', '2', 'u', '(u) B 8...d5', '8... d5 9 exd5 Nxd5 10 Nxd5 exd5 11 Nf5', { a: '⩲', c: 'Com 8...d5 também.' }],
  ['c42', 'v', 'v', '(v)', '9 e5 dxe5 10 fxe5 Nfd7 11 Bf4 b5 12 Qe2 Bb7 13 O-O-O Qa5 14 Rhf1 b4 15 Nd5 Bxd5 16 Bxd5 exd5 17 e6 Nf6', { a: '∓', r: 'Vavra–Popov, Pardubice 2000', c: 'O agudo 9.e5 favorece as pretas.' }],
  ['c42-v', '1', 'v', '(v) 14.a3', '14 a3', { a: '=', c: 'Com 14.a3 fica igual.' }],
  ['c42', 'w', 'w', '(w)', '9... e5 10 Nde2 Nxb3 11 axb3 h6 12 Ng3 Bd7 13 Nh5', { a: '±', r: 'Zapata–Fedorowicz, Filadélfia 1993', c: 'Com 9...e5?! o cavalo branco chega a h5 e as brancas ficam claramente melhor.' }],
  ['c42', 'x', 'x', '(x)', '10 O-O O-O 11 fxe6 fxe6 12 Nf5 Nxb3 13 Nxe7+ Qxe7 14 axb3 Bd7', { a: '=', r: 'Berthelot–Loeffler, Cannes 1996', c: 'Com 10.O-O fica igual.' }],
]

const capitulo = {
  id: 'siciliana-najdorf-f',
  arquivo: 'siciliana-najdorf-f',
  nome: 'Siciliana Najdorf — 6.Bc4',
  fonte: 'Modern Chess Openings — Sicilian Defense, Najdorf Variation, 6 Bc4 (pp. 264–266), colunas 37–42',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bc4 e6 7. Bb3',
  corPadrao: 'b',
  ordem: 264,
  grupos: [
    { id: 'qf3', nome: '7...b5 8.O-O Be7 9.Qf3', colunas: [37, 38] },
    { id: 'f4', nome: '9.f4', colunas: [39] },
    { id: 'bb7', nome: '8...Bb7', colunas: [40] },
    { id: 'qf3-grande', nome: '8.Qf3 e roque grande', colunas: [41] },
    { id: 'nbd7', nome: '7...Nbd7', colunas: [42] },
  ],
}

module.exports = { capitulo, colunas, notas }
