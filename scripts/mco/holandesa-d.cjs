// Transcrição do MCO 15ª ed. — Defesa Holandesa, variantes menores (pp. 501–502), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs holandesa-d
// Formato: ver gambito-do-rei.cjs. Dicas em holandesa-d-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correção: na nota (g) o livro traz 4 e4 dxe4, impossível (o peão preto ainda está em d7); o lance é 4...fxe4.

const B = '1 d4 f5'

const colunas = {
  c19: [`${B} 2 c4 e6 3 Nc3 d5 4 e3 Bd6 5 Nf3 c6 6 Ne5 Nf6 7 f4 O-O 8 Be2 b6`, 'c4', '2.c4 e6 3.Nc3 d5 (contra-Stonewall)', '=',
    'Com 4.e3 e 7.f4 as brancas montam o seu próprio Stonewall, com o cavalo em e5. Depois de 2.c4 e6 3.Nc3 d5 4.e3 Bd6 5.Nf3 c6 6.Ne5 Nf6 7.f4 O-O 8.Be2 b6 o jogo é igual (Grabliauskas–Tregubov, Berlim 1996).'],
  c20: [`${B} 2 e4 fxe4 3 Nc3 Nf6 4 Bg5 Nc6 5 d5 Ne5 6 Qd4 Nf7 7 Bxf6 exf6 8 Nxe4 Be7`, 'e4', '2.e4 (Gambito Staunton)', '=',
    'O Gambito Staunton, 2.e4, entrega um peão para abrir linhas, mas hoje é pouco jogado. Depois de 2...fxe4 3.Nc3 Nf6 4.Bg5 Nc6 5.d5 Ne5 6.Qd4 Nf7 7.Bxf6 exf6 8.Nxe4 Be7 o jogo é agudo, com chances pelo menos iguais para as pretas (Kravcov–Vyzhmanavin, Novgorod 1997).'],
  c21: [`${B} 2 Bg5 g6 3 Nd2 Bg7 4 e3 d6 5 f4 Nf6 6 Bd3 c6 7 Ngf3 Qb6 8 Rb1 Be6`, 'bg5', '2.Bg5 g6', '⩲',
    'Com 2.Bg5 as brancas atacam a casa e7 e ameaçam trocar o cavalo que viria a f6. Depois de 2...g6 3.Nd2 Bg7 4.e3 d6 5.f4 Nf6 6.Bd3 c6 7.Ngf3 Qb6 8.Rb1 Be6 as brancas ficam um pouco melhor (U. Andersson–Yusupov, Úbeda 1997).'],
  c22: [`${B} 2 Bg5 h6 3 Bh4 g5 4 e3 Nf6 5 Bg3 d6 6 h4 Rg8 7 hxg5 hxg5 8 Nc3 e6`, 'bg5', '2...h6', '⩲',
    'Com 2...h6 3.Bh4 g5 as pretas expulsam o bispo, mas enfraquecem a ala do rei. Depois de 4.e3 Nf6 5.Bg3 d6 6.h4 Rg8 7.hxg5 hxg5 8.Nc3 e6 as brancas ficam um pouco melhor (M. Gurevich–Illescas, Espanha 2004).'],
  c23: [`${B} 2 Nc3 d5 3 Bg5 g6 4 h4 Bg7 5 e3 c6 6 Bd3 Be6 7 Nf3 Nd7 8 h5 Ngf6`, 'nc3', '2.Nc3 d5 3.Bg5 g6', '=',
    'Com 2.Nc3 as brancas preparam e4. Depois de 2...d5 3.Bg5 g6 4.h4 Bg7 5.e3 c6 6.Bd3 Be6 7.Nf3 Nd7 8.h5 Ngf6 o jogo é igual (Kovačević–Kristiansen, Plovdiv 1983).'],
  c24: [`${B} 2 Nc3 d5 3 Bg5 Nf6 4 f3 Nc6 5 Qd2 e6 6 O-O-O Bb4 7 e3 O-O 8 Nh3 Rb8`, 'nc3', '3...Nf6', '⩲',
    'Com 3...Nf6 4.f3 as brancas preparam e4 e o roque grande. Depois de 4...Nc6 5.Qd2 e6 6.O-O-O Bb4 7.e3 O-O 8.Nh3 Rb8 as brancas ficam um pouco melhor (L\'Ami–Nijboer, Groningen 2004).'],
}

const notas = [
  // Coluna 19
  ['c19', 'a', 'a', '(a)', '3... Bb4 4 e3 Nf6 5 Bd3 b6 6 Ne2 Bb7 7 f3 O-O 8 Qc2', { a: '⩲', r: 'Chiburdanidze–S. Lalić, Pula 1997', c: '3...Bb4 4.e3 Nf6 5.Bd3 b6 mistura a Holandesa com a Nimzo-Índia; depois de 6.Ne2 Bb7 7.f3 O-O 8.Qc2 as brancas ficam um pouco melhor.' }],
  ['c19', 'b', 'b', '(b)', '9 O-O Bb7 10 b3 c5', { a: '=', r: 'Grabliauskas–Tregubov, Berlim 1996', c: 'O contra-Stonewall das brancas dá jogo igual depois de 9.O-O Bb7 10.b3 c5.' }],
  // Coluna 20
  ['c20', 'c', 'c', '(c)', '4 f3 d5 5 Bg5 Bf5 6 fxe4 dxe4 7 Bc4 Nc6 8 Nge2 Qd7', { a: '∓', c: '4.f3 d5 5.Bg5 Bf5 6.fxe4 dxe4 7.Bc4 (7.Qe2 e 7.Nge2 são possíveis, mas não melhores) Nc6 8.Nge2 Qd7 deixa as brancas procurando compensação pelo peão.' }],
  ['c20', 'd', 'd', '(d)', '5 f3 e5 6 d5 Nd4 7 Nxe4 Be7 8 d6 cxd6 9 Bxf6 gxf6 10 Ne2 d5 11 Nxd4 dxe4 12 Nf5 Qb6', { a: '∓', r: 'Cifuentes–Schmittdiel, Bad Wörishofen 1992', c: '5.f3 e5 6.d5 Nd4 7.Nxe4 Be7 8.d6?! cxd6 9.Bxf6 gxf6 10.Ne2 d5 11.Nxd4 dxe4 12.Nf5 Qb6 é melhor para as pretas.' }],
  ['c20-d', '1', 'd', '(d) 8.Bxf6', '8 Bxf6', { a: '=', c: '8.Bxf6 em vez de 8.d6 leva à igualdade.' }],
  ['c20', 'e', 'e', '(e)', '7 h4 c6 8 O-O-O Qb6 9 Bxf6 gxf6 10 Qxe4 Qxf2 11 Nf3 Bh6+', { a: '∓', r: 'Karagiannis–Grivas, Grécia 2003', c: '7.h4 c6 8.O-O-O Qb6 9.Bxf6 gxf6 10.Qxe4 Qxf2 11.Nf3 Bh6+ é melhor para as pretas.' }],
  ['c20', 'f', 'f', '(f)', '9 O-O-O O-O 10 Ng3 d6 11 f4 c5', { a: '=', r: 'Kravcov–Vyzhmanavin, Novgorod 1997', c: '9.O-O-O O-O 10.Ng3 d6 11.f4 c5 dá jogo agudo, com chances pelo menos iguais para as pretas.' }],
  // Coluna 21
  ['c21', 'g', 'g', '(g)', '3 Nc3 Bg7 4 e4 fxe4 5 Nxe4 d5 6 Nc5 b6 7 Nb3 Nh6 8 Nf3 O-O', { a: '=', r: 'Chernin–Nijboer, Espanha 2004', c: '3.Nc3 Bg7 4.e4 fxe4 5.Nxe4 d5 6.Nc5 b6 7.Nb3 Nh6 8.Nf3 O-O é igual. (O livro traz 4...dxe4, mas o peão preto ainda está em d7.)' }],
  ['c21', 'h', 'h', '(h)', '7... d5', { c: 'O lance da coluna é agressivo; 7...d5 e 7...Be6 são defesas mais simples.' }],
  ['c21', 'i', 'i', '(i)', '9 c4 a5 10 O-O', { a: '⩲', r: 'U. Andersson–Yusupov, Úbeda 1997', c: '9.c4 a5 10.O-O dá chances um pouco melhores às brancas.' }],
  // Coluna 22
  ['c22', 'j', 'j', '(j)', '2... Nf6 3 Bxf6 exf6', { a: '⩲', c: '2...Nf6 3.Bxf6 exf6 deixa as brancas com chances de vantagem numa luta posicional de cavalos contra bispos.' }],
  ['c22', 'k', 'k', '(k)', '4 Bg3 f4 5 e3', { c: '4.Bg3 f4? 5.e3 ameaça 6.Qh5 mate. Com 4...Nf6 5.e3 as pretas voltariam à coluna.' }],
  ['c22', 'l', 'l', '(l)', '9 Qd2 Qe7 10 O-O-O a6 11 f3 Nc6 12 e4 f4 13 Bf2', { a: '⩲', r: 'M. Gurevich–Illescas, Espanha 2004', c: '9.Qd2 Qe7 10.O-O-O a6 11.f3 Nc6 12.e4 f4 13.Bf2 é um pouco melhor para as brancas.' }],
  // Coluna 23
  ['c23', 'm', 'm', '(m)', '2 g4 fxg4 3 h3 g3 4 fxg3 Nf6 5 Nc3 d5 6 Bg2 e6', { a: '=', r: 'Trebugov–Malaniuk, Linares 1996', c: '2.g4 fxg4 3.h3 g3 (3...d5 também é bom) 4.fxg3 Nf6 5.Nc3 d5 6.Bg2 e6 está bem para as pretas.' }],
  ['c23', 'n-A', 'n', '(n) A', '3 e4 dxe4 4 Bf4 Nf6 5 f3 exf3 6 Nxf3 e6', { a: '∞', r: 'Gelfand–Nikolić, Munique 1994', c: '3.e4 dxe4 4.Bf4 leva a um tipo de Gambito Blackmar-Diemer. Depois de 4...Nf6 5.f3 exf3 (5...Nc6 e 5...e6 são razoáveis) 6.Nxf3 e6 há chances para os dois lados.' }],
  ['c23', 'n-B', 'n', '(n) B', '3 Bf4 c6 4 e3 Nf6 5 Bd3 g6 6 h3 Bg7 7 Nf3 Be6', { a: '=', r: 'Ruf–Zysk, Bundesliga 1994', c: '3.Bf4 c6 4.e3 Nf6 5.Bd3 g6 6.h3 Bg7 7.Nf3 Be6 é igual.' }],
  ['c23', 'o', 'o', '(o)', '5... Be6 6 Nh3 h6 7 Bf4 Nf6 8 Qf3 Bf7 9 Be5 Nbd7 10 Nf4', { a: '⩲', r: 'Skembris–Kourtesis, Grécia 1997', c: '5...Be6 6.Nh3 h6 7.Bf4 Nf6 8.Qf3 Bf7 9.Be5 Nbd7 10.Nf4 é um pouco melhor para as brancas.' }],
  ['c23', 'p', 'p', '(p)', '7 Qf3 Nf6 8 Nge2 Nbd7 9 h5 Rg8 10 hxg6 hxg6 11 O-O-O Qa5', { a: '∞', r: 'Kochiev–Malaniuk, URSS 1984', c: '7.Qf3 Nf6 8.Nge2 Nbd7 9.h5 Rg8 10.hxg6 hxg6 11.O-O-O Qa5 dá uma posição aguda, com chances para os dois lados.' }],
  ['c23', 'q', 'q', '(q)', '9 hxg6 hxg6 10 Rxh8+ Bxh8 11 Ne2 Bf7 12 Nf4 Ne4', { a: '=', r: 'Kovačević–Kristiansen, Plovdiv 1983', c: '9.hxg6 hxg6 10.Rxh8+ Bxh8 11.Ne2 Bf7 12.Nf4 Ne4 é igual.' }],
  // Coluna 24
  ['c24', 'r', 'r', '(r)', '4 Bxf6 exf6 5 e3 c6 6 Bd3 Bd6 7 Qf3 g6 8 O-O-O Be6', { a: '⩲', r: 'Golod–Murey, Rishon LeZion 1997', c: '4.Bxf6 exf6 5.e3 c6 6.Bd3 Bd6 7.Qf3 g6 8.O-O-O Be6 também pode dar vantagem às brancas.' }],
  ['c24', 's', 's', '(s)', '9 Nf4 b5 10 a3', { a: '⩲', r: 'L\'Ami–Nijboer, Groningen 2004', c: '9.Nf4 b5 10.a3 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'holandesa-d',
  arquivo: 'holandesa-d',
  nome: 'Holandesa — variantes menores (2.c4 e6, Staunton, 2.Bg5, 2.Nc3)',
  fonte: 'Modern Chess Openings — Dutch Defense (pp. 501–502), colunas 19–24',
  base: '1. d4 f5',
  corPadrao: 'b',
  ordem: 501,
  grupos: [
    { id: 'c4', nome: '2.c4 e6 (contra-Stonewall)', colunas: [19] },
    { id: 'e4', nome: '2.e4 (Gambito Staunton)', colunas: [20] },
    { id: 'bg5', nome: '2.Bg5', colunas: [21, 22] },
    { id: 'nc3', nome: '2.Nc3', colunas: [23, 24] },
  ],
}

module.exports = { capitulo, colunas, notas }
