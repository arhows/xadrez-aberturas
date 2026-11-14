// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Semi-Tarrasch (pp. 432–433), colunas 85–90.
// Gerar: node scripts/mco/gerar.cjs gdr-o
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-o-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções de grafia: na nota (h) o livro traz 17...Nc6 e na nota (k) 16...Bxc6, mas há um bispo branco em c6; ficou 17...Nxc6 e 16...Nxc6.
// Na nota (aa) o livro termina com 19...Ba6, que deixa o bispo para a dama de d3; a linha ficou até 19.Bg3.
// Na nota (y) o livro escreve 15...Ncd5, mas os cavalos pretos estão em b4 e f6; ficou 15...Nbd5.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Nf3 c5 5 cxd5 Nxd5 6 e3 Nc6 7 Bd3 cxd4 8 exd4 Be7 9 O-O O-O 10 Re1'
const F = `${B} Bf6 11 Be4 Nce7`
const N = `${B} Nf6`

const colunas = {
  c85: [`${F} 12 Qd3 h6 13 Ne5 Nxc3 14 Qxc3 Nf5 15 Be3 a5 16 Rac1 a4`, 'be4', '10...Bf6 11.Be4 12.Qd3 13.Ne5', '⩲',
    'Na Semi-Tarrasch as pretas recapturam em d5 com o cavalo e as brancas ficam com o peão isolado em d4. Com 10.Re1 Bf6 11.Be4 Nce7 elas lutam pela casa d5; depois de 12.Qd3 h6 13.Ne5 as brancas mantêm a iniciativa e uma pequena vantagem (Topalov–Karpov, Linares 1995).'],
  c86: [`${F} 12 Qd3 h6 13 Bd2 Bd7 14 Bxd5 exd5 15 Bf4 Be6 16 Be5 Nf5`, 'be4', '13.Bd2', '⩲',
    'Com 13.Bd2 Bd7 14.Bxd5 exd5 as brancas trocam o cavalo de d5 e deixam peões isolados nos dois lados. Depois de 15.Bf4 Be6 16.Be5 Nf5 as brancas ficam com uma pequena vantagem (Jagupov–Legkij, Javoronki 1995).'],
  c87: [`${F} 12 Qb3 b6 13 Bxd5 Nxd5 14 Nxd5 Qxd5 15 Qxd5 exd5 16 Bg5 Bxg5`, 'be4', '12.Qb3', '⩲',
    'Com 12.Qb3 b6 13.Bxd5 as brancas trocam peças e chegam a um final com peões isolados nos dois lados; com o cavalo contra o bispo, ficam um pouco melhor (Sveshnikov–Epishin, Biel 1993).'],
  c88: [`${B} Bf6 11 a3 Qb6 12 Be4 Nce7 13 Ne5 g6 14 Bh6 Bg7 15 Bxg7 Kxg7 16 Qd2 Nf6`, 'a3', '11.a3 Qb6', '⩲',
    'Com 11.a3 as brancas tiram b4 dos cavalos pretos. Depois de 11...Qb6 12.Be4 Nce7 13.Ne5 g6 14.Bh6 elas trocam o bispo de g7 e atacam o rei preto; as brancas ficam com iniciativa (Gulko–Beliavsky, Groningen 1994).'],
  c89: [`${N} 11 a3 b6 12 Bg5 Bb7 13 Bc2 Nd5 14 Qd3 g6 15 h4 Bxg5 16 Nxg5 Nce7`, 'nf6', '10...Nf6 11.a3 b6', '=',
    'Com 10...Nf6 o cavalo volta para defender o rei. Depois de 11.a3 b6 12.Bg5 Bb7 13.Bc2 Nd5 14.Qd3 g6 15.h4 as brancas atacam, mas as pretas trocam peças e o jogo fica mais ou menos igual (Salov–Beliavsky, Madri).'],
  c90: [`${N} 11 Bg5 h6 12 Be3 Nb4 13 Bb1 b6 14 Qd2 Re8 15 a3 Nc6 16 Qd3 Bb7`, 'nf6', '11.Bg5 h6 12.Be3', '⩲',
    'Com 11.Bg5 h6 12.Be3 Nb4 13.Bb1 a bateria dama-bispo contra h7 fica pronta. Depois de 14.Qd2 Re8 15.a3 Nc6 16.Qd3 Bb7 as brancas têm boas chances de ataque (Karpov–Beliavsky, Linares 1995).'],
}

const notas = [
  // Coluna 85
  ['c85', 'a', 'a', '(a)', '7... Be7 8 O-O O-O 9 Nxd5 Qxd5 10 e4 Qh5 11 dxc5 Bxc5', { a: '=', r: 'Keres–Tal, Zurique 1959', c: '7...Be7 sem a troca prévia no centro também é possível: 8.O-O O-O 9.Nxd5 Qxd5 10.e4 Qh5 11.dxc5 Bxc5 é mais ou menos igual.' }],
  ['c85-a', '1', 'a', '(a) 9.a3', '9 a3 Nxc3 10 bxc3 b6 11 Bb2 Bb7 12 Qe2', { a: '⩲', r: 'Psakhis–Sveshnikov, Sóchi 1985', c: 'Outra tentativa é 9.a3 Nxc3 10.bxc3 b6 11.Bb2 Bb7 12.Qe2, um pouco melhor para as brancas.' }],
  ['c85', 'b', 'b', '(b)', '11... Qd6 12 Bg5 Bxg5 13 Nxg5', { a: '⩲', r: 'Kulhánek–Lechtýnský, Náchod 2006', c: '11...Qd6 12.Bg5 Bxg5 13.Nxg5 dá uma pequena vantagem às brancas.' }],
  ['c85', 'c', 'c', '(c)', '12 Ne5 Bd7 13 Qh5 g6 14 Qh3 Bc6 15 Bh6 Bg7', { a: '=', r: 'Velimirović–Matulović, Iugoslávia 1995', c: '12.Ne5 Bd7 13.Qh5 g6 14.Qh3 Bc6 15.Bh6 Bg7 foi mais ou menos igual.' }],
  ['c85', 'd', 'd', '(d)', '12... g6 13 Bh6 Bg7 14 Qd2 Nf6 15 Bc2 b6 16 Rad1 Bb7 17 Ne5', { a: '⩲', r: 'Winslow–Nur, Nova York 1993', c: '12...g6 13.Bh6 Bg7 14.Qd2 Nf6 15.Bc2 b6 16.Rad1 Bb7 17.Ne5 é um pouco melhor para as brancas.' }],
  ['c85', 'e', 'e', '(e)', '15... Nxe3 16 Qxe3 Qb6', { a: '⩲', c: 'O lance mais antigo é 15...Nxe3 16.Qxe3 Qb6, com pequena vantagem branca.' }],
  ['c85', 'f', 'f', '(f)', '17 Red1 Nxe3 18 Qxe3 Qb6 19 Ng4', { a: '⩲', r: 'Topalov–Karpov, Linares 1995', c: 'Topalov–Karpov seguiu 17.Red1 Nxe3 18.Qxe3 Qb6 19.Ng4, um pouco melhor para as brancas.' }],
  ['c85-f', '1', 'f', '(f) 17...Ra5', '17... Ra5 18 Nc4 Rb5', { a: '∞', r: 'Karpov', c: 'Karpov sugere 17...Ra5 18.Nc4 Rb5 e considera o jogo indefinido.' }],
  // Coluna 86
  ['c86', 'g', 'g', '(g)', '13... b6 14 Ne5 Bb7 15 Qg3', { a: '⩲', r: 'Leskij', c: '13...b6 14.Ne5 Bb7 15.Qg3 é um pouco melhor para as brancas (Leskij).' }],
  ['c86', 'h', 'h', '(h)', '14 Ne5 Nxc3 15 Qxc3 Bc6 16 Bxc6 Bxe5 17 dxe5 Nxc6', { a: '=', r: 'Li Chao–Wang Hao, Yerevan 2006', c: 'As brancas também podem tentar 14.Ne5 Nxc3 15.Qxc3 Bc6 16.Bxc6 Bxe5 17.dxe5 Nxc6, igual. (O livro escreve 17...Nc6; é uma captura.)' }],
  ['c86', 'i-A', 'i', '(i)', '17 Bxf6 Qxf6 18 Rac1 Nd6 19 Ne5 Rfd8 20 h3', { a: '⩲', r: 'Jagupov–Legkij, Javoronki 1995', c: 'Depois de 16...Nf5 a partida seguiu 17.Bxf6 Qxf6 18.Rac1 Nd6 19.Ne5 Rfd8, e 20.h3 manteria a vantagem das brancas.' }],
  ['c86', 'i-B', 'i', '(i) 16...Nc6', '16... Nc6', { a: '⩲', c: '16...Nc6 seria um pouco vantajoso para as brancas.' }],
  // Coluna 87
  ['c87', 'j', 'j', '(j)', '12... Qb6 13 Bxd5 Nxd5 14 Nxd5 exd5 15 Qxb6 axb6 16 Bd2 Bg4', { a: '=', r: 'Himmel–Podgaets, Dortmund 1993 (empate)', c: '12...Qb6 já foi tentado: 13.Bxd5 Nxd5 14.Nxd5 exd5 15.Qxb6 axb6 16.Bd2 Bg4, empate.' }],
  ['c87', 'k', 'k', '(k)', '13 Bf4 Bb7 14 Be5 Bc6 15 Rac1 Nxc3 16 Bxc6 Nxc6 17 Rxc3 Bxe5 18 dxe5 Nd4 19 Nxd4', { a: '=', r: 'J. Polgar–Karpov, Viena 1996 (empate)', c: '13.Bf4 Bb7 14.Be5 Bc6 15.Rac1 Nxc3 16.Bxc6 Nxc6 17.Rxc3 Bxe5 18.dxe5 Nd4 19.Nxd4 é igual, e os jogadores concordaram empate. (O livro escreve 16...Bxc6; é o cavalo que recaptura.)' }],
  ['c87', 'l', 'l', '(l)', '13... exd5 14 Bf4 Bg4 15 Ne5', { a: '⩲', r: 'Epishin', c: '13...exd5 14.Bf4 Bg4 15.Ne5 é um pouco melhor para as brancas (Epishin).' }],
  ['c87', 'm', 'm', '(m)', '17 Nxg5 f6 18 Nf3', { a: '⩲', r: 'Sveshnikov–Epishin, Biel 1993', c: '17.Nxg5 f6 18.Nf3 é um pouco melhor para as brancas.' }],
  // Coluna 88
  ['c88', 'n-A', 'n', '(n) A', '11... Bd7 12 Bc2 Rc8 13 Ne4 Be7 14 Qd3 g6 15 Bd2', { a: '⩲', r: 'Gulko–Kaidanov, EUA 1994', c: 'Em Gulko–Kaidanov foi tentado 11...Bd7: depois de 12.Bc2 Rc8 13.Ne4 Be7 14.Qd3 g6 15.Bd2 as brancas mantiveram vantagem.' }],
  ['c88-n-A', '1', 'n', '(n) A 12...Nxc3', '12... Nxc3 13 bxc3 Rc8', { r: 'Gulko', c: '12...Nxc3 13.bxc3 Rc8 era melhor (Gulko).' }],
  ['c88', 'n-B', 'n', '(n) B', '11... Nxc3 12 bxc3 b6 13 h4 Bb7 14 Ng5 Bxg5 15 Bxg5 Qd6 16 Re3', { a: '⩲', r: 'Gulko–Becerra Rivero, Campeonato dos EUA 2004', c: 'Dez anos depois, Gulko–Becerra Rivero seguiu 11...Nxc3 12.bxc3 b6 13.h4 Bb7 14.Ng5, um pouco melhor para as brancas.' }],
  ['c88', 'o', 'o', '(o)', '12... Nxd4 13 Bxd5 exd5 14 Nxd5 Nxf3+ 15 Qxf3 Qc6 16 Bd2', { a: '±', r: 'Gulko', c: '12...Nxd4 13.Bxd5 exd5 14.Nxd5 Nxf3+ 15.Qxf3 Qc6 16.Bd2 é melhor para as brancas (Gulko).' }],
  ['c88', 'p', 'p', '(p)', '14... Rd8 15 Qf3 Qxd4 16 Rad1', { a: '⩲', c: '14...Rd8 15.Qf3 Qxd4 16.Rad1 é um pouco melhor para as brancas. (O Stockfish discorda: depois de 16.Rad1 dá cerca de +4 para as brancas.)' }],
  ['c88', 'q', 'q', '(q)', '17 Rad1 Rd8 18 Re3 Bd7 19 Rf3 Neg8 20 g4 Be8 21 g5 Nh5 22 Na4 Qc7 23 Nc5 Rab8 24 Qc3 Qe7 25 d5 Qxg5+ 26 Kh1 Ngf6 27 Rg1 Qh4 28 dxe6 Nxe4 29 exf7 Bxf7 30 Rxf7+ Kg8 31 Qb3 Kh8 32 Rxh7+ Kxh7 33 Qf7+', { a: '+−', r: 'Gulko–Beliavsky, Groningen 1994; Gulko', c: 'Gulko–Beliavsky seguiu 17.Rad1 Rd8 18.Re3 Bd7 19.Rf3 Neg8 20.g4 Be8 21.g5 Nh5 22.Na4 Qc7 23.Nc5 Rab8 24.Qc3 Qe7. Em vez de 25.Nxf7, Gulko indica 25.d5!! Qxg5+ 26.Kh1 Ngf6 27.Rg1 Qh4 28.dxe6 Nxe4 29.exf7 Bxf7 30.Rxf7+ Kg8 31.Qb3 Kh8 32.Rxh7+ Kxh7 33.Qf7+ e mate no lance seguinte: teria sido um fim lógico para a partida. (O Stockfish confirma o mate.)' }],
  ['c88-q', '1', 'q', '(q) 22...Bxa4', '22... Bxa4 23 Rxf7+ Kh8 24 Rxb7', { a: '+−', c: 'Se 22...Bxa4, 23.Rxf7+ Kh8 24.Rxb7. (O Stockfish dá cerca de +8.)' }],
  ['c88-q', '2', 'q', '(q) 25.Nxf7', '25 Nxf7', { a: '=', r: 'Gulko–Beliavsky, Groningen 1994', c: 'Na partida, 25.Nxf7 levou ao empate depois de outras aventuras.' }],
  // Coluna 89
  ['c89', 'r', 'r', '(r)', '10... Ncb4 11 Bb1 b6 12 a3 Nxc3 13 bxc3 Nd5 14 Qd3 Nf6 15 Bg5 g6 16 Ne5 Bb7 17 Bh6 Re8 18 Qh3', { a: '±', r: 'Adams–Seirawan, Wijk aan Zee 1991', c: 'Outro lance aqui é 10...Ncb4: depois de 11.Bb1 b6 12.a3 Nxc3 13.bxc3 Nd5 14.Qd3 Nf6 as brancas ficaram claramente melhor.' }],
  ['c89', 's', 's', '(s)', '12 Bc2 Ba6 13 Bg5 Rc8', { c: 'Contra 12.Bc2 as pretas devem jogar 12...Ba6 13.Bg5 Rc8, buscando jogo nas casas claras fracas da ala da dama.' }],
  ['c89-s', '1', 's', '(s) 13.b4', '13 b4 Bc4 14 b5 Na5 15 Ne5 Rc8 16 Re3 Bd6 17 Rh3 Bxe5 18 Bxh7+ Nxh7 19 Qh5 Bd3', { a: '∓', r: 'Dobrov–Chebotarev, Sóchi 2005', c: 'Dobrov–Chebotarev seguiu 12.Bc2 Ba6 13.b4?!, mas o jogo grosseiro foi repelido depois de 13...Bc4 14.b5 Na5 15.Ne5 Rc8. (O Stockfish dá cerca de −6 no fim da linha, vantagem decisiva das pretas.)' }],
  ['c89', 't', 't', '(t)', '13... Ba6 14 Qd2 Rc8 15 Qf4 Nh5 16 Qg4 Bxg5 17 Qxh5 Bh6 18 d5 exd5 19 Bf5 Rb8 20 Nxd5 Bc8 21 Bxc8 Rxc8 22 Rad1', { a: '+−', r: 'Johannessen–Carlsen, Campeonato Norueguês 2005', c: 'Menos confiável é 13...Ba6?! 14.Qd2 Rc8 15.Qf4 Nh5 16.Qg4 Bxg5 17.Qxh5 Bh6 18.d5!, e depois de 22.Rad1 as brancas ganham, pois não há defesa contra Ne7.' }],
  ['c89', 'u', 'u', '(u)', '16 hxg5 Nxc3 17 bxc3 Na5', { c: '16.hxg5 deixaria o peão vulnerável depois de 16...Nxc3 17.bxc3 Na5, com a ameaça ...Bxf3.' }],
  ['c89', 'v', 'v', '(v)', '17 Qf3 Nxc3 18 Qxb7 Ncd5 19 Qa6 Rc8 20 Be4 Rc7', { a: '=', r: 'Salov–Beliavsky, Madri', c: 'Depois de 17.Qf3 Nxc3 18.Qxb7 Ncd5 19.Qa6 Rc8 20.Be4 Rc7 o jogo ficou mais ou menos igual.' }],
  // Coluna 90
  ['c90', 'w', 'w', '(w)', '11... b6 12 Qe2 Bb7 13 Rad1 Nb4 14 Bb1', { a: '⩲', r: 'Bobotsov–Petrosian, Moscou 1967', c: '11...b6 12.Qe2 Bb7 13.Rad1 Nb4 14.Bb1 é um pouco melhor para as brancas.' }],
  ['c90', 'x', 'x', '(x)', '14... Bb7 15 Bxh6 Bxf3 16 Bxg7 Kxg7 17 Qg5+ Kh8 18 Qh6+ Kg8 19 Re5', { a: '+−', c: '14...Bb7 15.Bxh6 Bxf3 16.Bxg7 Kxg7 17.Qg5+ Kh8 18.Qh6+ Kg8 19.Re5 decidiria a partida.' }],
  ['c90', 'y', 'y', '(y)', '15... Nbd5 16 Nxd5 exd5 17 Bxh6 gxh6 18 Qxh6 Ne4 19 Rxe4 dxe4 20 Bxe4 f5 21 Qg6+ Kh8 22 Ne5 Rf8 23 Bxa8', { a: '+−', r: 'Karpov', c: '15...Nbd5 16.Nxd5 exd5 17.Bxh6 gxh6 18.Qxh6 Ne4 19.Rxe4 dxe4 20.Bxe4 f5 21.Qg6+ Kh8 22.Ne5 Rf8 23.Bxa8 ganha (Karpov). Tanto 16...Qxd5 como 16...Nxd5 levam a sacrifícios parecidos em h6. (O Stockfish confirma: cerca de +8.) (O livro escreve 15...Ncd5, mas os cavalos estão em b4 e f6.)' }],
  ['c90', 'z', 'z', '(z)', '16 d5 Na5 17 Qc2 exd5 18 Bd4 g6 19 Bxf6 Bxf6 20 Rxe8+ Qxe8 21 Nxd5', { a: '⩲', r: 'Karpov', c: 'Karpov indica como continuação possível 16.d5 Na5 17.Qc2 exd5 18.Bd4 g6 19.Bxf6 Bxf6 20.Rxe8+ Qxe8 21.Nxd5, com boas chances de ataque.' }],
  ['c90', 'aa', 'aa', '(aa)', '17 Ne4 Kf8 18 Bf4 Nd5 19 Bg3', { a: '=', r: 'Karpov–Beliavsky, Linares 1995', c: 'Depois de 17.Ne4 Kf8 18.Bf4 Nd5 19.Bg3 as pretas conseguiram, de algum modo, escapar com um empate (depois de mais 50 lances). (O livro segue com 19...Ba6, que deixa o bispo para a dama de d3; a linha ficou até 19.Bg3.)' }],
]

const capitulo = {
  id: 'gdr-o',
  arquivo: 'gdr-o',
  nome: 'Gambito da Dama Recusado — Semi-Tarrasch (4...c5 5.cxd5 Nxd5)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 432–433), colunas 85–90',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 432,
  grupos: [
    { id: 'be4', nome: '10...Bf6 11.Be4', colunas: [85, 86, 87] },
    { id: 'a3', nome: '10...Bf6 11.a3', colunas: [88] },
    { id: 'nf6', nome: '10...Nf6', colunas: [89, 90] },
  ],
}

module.exports = { capitulo, colunas, notas }
