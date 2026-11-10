// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Najdorf: 6.Bg5, linha principal antiga (pp. 255–257), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs siciliana-najdorf-c
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-najdorf-c-dicas.cjs.
//
// Erros do livro corrigidos:
// - Col. 22, lance 16: "Bxg5" → 16...Bxg5+ (o bispo dá xeque no rei de c1).
// - Nota (j): "16 Ng2" → 16.Ng3 (nenhum cavalo branco chega a g2; o de e2 vai para g3).

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 a6'
const V = `${B} 6 Bg5 e6 7 f4 Be7 8 Qf3 Qc7 9 O-O-O Nbd7`
const G = `${V} 10 g4 b5 11 Bxf6 Nxf6 12 g5 Nd7`

const colunas = {
  c19: [`${G} 13 f5 Nc5 14 f6 gxf6 15 gxf6 Bf8 16 Rg1 h5 17 Rg7 b4`, 'g4', '10.g4 … 13.f5 Nc5', '⩱',
    'A velha linha principal do 6.Bg5: 7...Be7 8.Qf3 Qc7 9.O-O-O Nbd7. O avanço 10.g4 é o plano mais forte das brancas. A coluna 19 foi revivida: depois de 14.f6 a posição é muito aguda, mas as pretas se defendem bem.'],
  c20: [`${G} 13 f5 Bxg5+ 14 Kb1 Ne5 15 Qh5 Qe7 16 Nxe6 Bxe6 17 fxe6 g6`, 'g4', '13.f5 Bxg5+', '⩲',
    'Com 13...Bxg5+ as pretas pegam um peão e o bispo dá xeque. É a alternativa mais segura, mas as brancas ficam um pouco melhor.'],
  c21: [`${G} 13 a3 Rb8 14 h4 b4 15 axb4 Rxb4 16 Bh3 Qc5 17 Nb3 Qb6`, 'g4', '13.a3', '⩱',
    'Com 13.a3 as brancas freiam o ...b4, mas as pretas abrem a coluna b mesmo assim e ficam um pouco melhor.'],
  c22: [`${V} 10 Bd3 b5 11 Rhe1 Bb7 12 Qg3 b4 13 Nd5 exd5 14 e5 dxe5 15 fxe5 Nh5 16 Qh4 Bxg5+ 17 Qxg5 g6`, 'bd3', '10.Bd3 b5', '=',
    'Com 10.Bd3 e 11.Rhe1 as brancas preparam o sacrifício 13.Nd5. A linha leva a um empate forçado: nenhum lado pode fugir dela sem ficar pior.'],
  c23: [`${V} 10 Bd3 h6 11 Bh4 g5 12 fxg5 Ne5 13 Qe2 Nfg4 14 Nf3 hxg5 15 Bg3 Nxf3 16 gxf3 Ne5 17 Qf2 b5`, 'bd3', '10.Bd3 h6', '=',
    'Com 10...h6 e 11...g5 as pretas ganham a casa e5 para os cavalos. Fica igual.'],
  c24: [`${V} 10 Qg3 b5 11 Bxf6 Bxf6 12 Bxb5 O-O 13 Bxd7 Bxd7 14 e5 dxe5 15 Ne4 exd4 16 Nxf6+ Kh8 17 Nh5 Rg8`, 'qg3', '10.Qg3', '=',
    'Com 10.Qg3 as brancas pressionam d6 e g7. Com 10...b5! e 12...O-O! as pretas devolvem o peão e igualam.'],
}

const notas = [
  // Coluna 19
  ['c19', 'a', 'a', '(a)', '8... Nbd7 9 Bc4 h6 10 Bxf6 Bxf6 11 O-O-O Qb6 12 Nxe6 fxe6 13 Bxe6 Nf8 14 Bb3', { a: '±', r: 'Giles–Browne, US Open 1988', c: 'Com 8...Nbd7 9.Bc4! e 12.Nxe6! as brancas ficam com um ataque forte.' }],
  ['c19-a', '1', 'a', '(a) 9...Qc7', '9... Qc7 10 Bxe6', { c: '9...Qc7 é respondido por 10.Bxe6!.' }],
  ['c19', 'b', 'b', '(b)', '11... gxf6 12 f5 Ne5 13 Qh3 O-O 14 Rg1 Kh8 15 Nce2 Rg8 16 Rg3 Bd7 17 Nf4', { a: '±', r: 'Brodsky–Stoica, Romênia 1994', c: 'Com 11...gxf6 as brancas ficam claramente melhor.' }],
  ['c19-b', '1', 'b', '(b) 11...Bxf6?!', '11... Bxf6 12 Bxb5', { a: '±', c: '11...Bxf6?! 12.Bxb5! dá vantagem clara às brancas.' }],
  ['c19', 'c', 'c', '(c)', '14 h4 b4 15 Nce2 e5 16 Nb3 Nxe4 17 Qxe4 Bb7 18 Rd5 Rc8 19 c3 Qc4 20 Qxc4 Rxc4 21 Bg2 Bxd5 22 Bxd5 Rxh4', { a: '⩱', r: 'Nunn–Browne, Gjøvik 1983', c: 'Menos incisivo é 14.h4; com 16...Nxe4! as pretas ficam um pouco melhor.' }],
  ['c19-c', '1', 'c', '(c) 15.Nb1', '15 Nb1 Bb7', { a: '=', c: 'Com 15.Nb1 fica igual.' }],
  ['c19-c', '2', 'c', '(c) 15.fxe6', '15 fxe6 fxe6 16 Nce2 g6', { a: '=', c: 'Com 15.fxe6 também fica igual.' }],
  ['c19-c', '3', 'c', '(c) 17.Bg2', '17 Bg2', { a: '=', c: 'Em vez de 17.Qxe4?!, 17.Bg2 fica igual.' }],
  ['c19', 'd-A', 'd', '(d) A', '16 Bh3 b4', { a: '⩱', c: 'O 16.Rg1 coloca as pretas sob forte pressão. Há muitas alternativas agudas; com 16.Bh3?! b4 as pretas ficam um pouco melhor.' }],
  ['c19', 'd-B', 'd', '(d) B', '16 Qh5 Bd7 17 Bh3 b4 18 Nce2 O-O-O 19 Qxf7 Bh6+ 20 Kb1 Rdf8 21 Qh5 Rxf6', { a: '=', r: 'Browne–Mecking, San Antonio 1972', c: 'Com 16.Qh5 fica igual.' }],
  ['c19-d-B', '1', 'd', '(d) B 16...b4?!', '16... b4 17 Nd5 exd5 18 exd5 Bb7 19 Re1+ Kd8 20 Kb1', { a: '±', c: 'Com 16...b4?! 17.Nd5! as brancas ficam com um ataque forte.' }],
  ['c19', 'd-C', 'd', '(d) C', '16 a3 Nd7 17 Nxe6 fxe6 18 f7+ Ke7 19 e5 d5', { a: '⩱', r: 'Šimáček–Dydyshko, Ostrava 2005 (até 19.e5)', c: 'Com 16.a3 Nd7! 17.Nxe6?! as pretas respondem 19...d5 e ficam melhor.' }],
  ['c19', 'e-A', 'e', '(e) A', '16... b4 17 Nd5 exd5 18 exd5 Bd7 19 Rg7 O-O-O 20 Rxf7 Bh6+ 21 Kb1 Rdf8 22 Rxf8+ Rxf8 23 Ne6 Nxe6 24 dxe6 Bxe6 25 Bh3 Qd7 26 Qa8+ Kc7 27 Qa7+ Kc8 28 Qxa6+ Kc7 29 Qa5+ Kc8 30 Rd4 Rxf6 31 Qa8+ Kc7 32 Rc4+ Bxc4 33 Qa7+', { a: '+−', r: 'Simon–Pásztor, Hungria 1997', c: 'Com 16...b4 17.Nd5! as brancas ganham.' }],
  ['c19', 'e-B', 'e', '(e) B', '16... Bd7 17 Rg7 Bxg7 18 fxg7 Rg8 19 e5 O-O-O 20 exd6 Qb6 21 Ne4', { a: '±', r: 'segundo Olim', c: 'Com 16...Bd7 as brancas ficam claramente melhor.' }],
  ['c19', 'f', 'f', '(f)', '18 Nd5 exd5 19 exd5 Nd7 20 Nc6 Bb7 21 Bh3 Bxc6 22 dxc6 Ne5', { a: '⩱', r: 'Vásquez–Vallejo Pons, Trípoli 2004', c: 'Com 18.Nd5 as pretas devolvem o material e ficam um pouco melhor.' }],
  ['c19-f', '1', 'f', '(f) 20.Ne6', '20 Ne6 Qa5', { c: 'Se 20.Ne6, então 20...Qa5.' }],
  ['c19-f', '2', 'f', '(f) 17.Re1', '17 Re1 Nd7 18 e5', { a: '=', c: 'As brancas podem tentar 17.Re1 Nd7 18.e5!?, mas as pretas devem ficar bem.' }],
  // Coluna 20
  ['c20', 'g', 'g', '(g)', '15... Qd8 16 Rg1 Bf6 17 fxe6 O-O 18 Bh3 g6 19 Nd5 Kh8 20 Qe2 fxe6 21 Bxe6 Ra7 22 Rgf1', { a: '⩲', r: 'Psakhis–Cvitan, Genebra 1992', c: 'Com 15...Qd8 as brancas ganham um pouco mais.' }],
  ['c20-g', '1', 'g', '(g) 17...g6', '17... g6 18 exf7+ Kxf7 19 Qh6', { a: '⩲', c: 'Com 17...g6 as brancas também ficam um pouco melhor.' }],
  ['c20', 'h', 'h', '(h)', '16 fxe6 g6 17 exf7+ Kxf7 18 Qe2 Bg4 19 Qf2+ Qf6 20 Qxf6+ Bxf6 21 Be2 Bc8', { a: '⩱', r: 'Shabalov–Hellers, Nova York 1993', c: 'Com 16.fxe6 as damas saem e as pretas ficam com um final mais confortável.' }],
  ['c20-h', '1', 'h', '(h) 16.Rg1', '16 Rg1 Bf6 17 fxe6 g6', { a: '=', c: 'Com 16.Rg1 fica igual.' }],
  ['c20', 'i', 'i', '(i)', '18 exf7+ Kxf7 19 Qh3 Kg7 20 Nd5 Qd8 21 Qc3 Ra7 22 Qa3', { a: '⩲', r: 'Baklan–Gallagher, Bundesliga 2001', c: 'Depois de 18.exf7+ as brancas ficam um pouco melhor.' }],
  // Coluna 21
  ['c21', 'j', 'j', '(j)', '13 Bh3 b4 14 Nce2 Bb7 15 Kb1 Nc5 16 Ng3 d5', { a: '⩱', r: 'Smyslov–Fischer, Torneio de Candidatos de Bled 1959', c: 'Com 13.Bh3?! b4! as pretas ficam com a iniciativa. (O livro traz "16.Ng2", que é impossível; o cavalo vai para g3.)' }],
  ['c21', 'k', 'k', '(k)', '14 Bh3 Nc5 15 Rhg1 b4 16 axb4 Rxb4 17 f5 Qb7', { a: '=', c: 'Uma linha antiga é 14.Bh3; depois de 17...Qb7! fica igual.' }],
  ['c21', 'l', 'l', '(l)', '16... Qb6 17 Nf5 Bf8 18 Ne3 Qa5 19 Qe2 Nb6', { a: '=', r: 'Boetew–Tenev, por correspondência 1987', c: '16...Qb6 17.Nf5 Bf8! também serve.' }],
  ['c21-l', '1', 'l', '(l) 17...exf5?', '17... exf5 18 Nd5 Qc5 19 exf5', { a: '±', c: 'Não 17...exf5 18.Nd5: as brancas ficam claramente melhor.' }],
  ['c21', 'm', 'm', '(m)', '18 h5 Nc5 19 Nxc5 dxc5 20 g6 fxg6 21 hxg6 h6 22 Nd5 exd5 23 Bxc8 O-O', { a: '⩱', r: 'Kaplan–Browne, Madri 1973', c: 'Depois de 18.h5 as pretas rocam e ficam um pouco melhor.' }],
  // Coluna 22
  ['c22', 'n', 'n', '(n)', '12... O-O-O 13 Bxb5 axb5 14 Ndxb5 Qb8 15 e5', { a: '±', r: 'Luther–Baramidze, Altenkirchen 2005', c: 'Com 12...O-O-O o sacrifício 13.Bxb5! dá vantagem clara às brancas.' }],
  ['c22', 'o', 'o', '(o)', '14 exd5 Kd8 15 Nc6+ Bxc6 16 dxc6 Nb6 17 Bh4 Rg8', { r: 'Berg–Negi, Wijk aan Zee 2007', c: 'As brancas podem tentar ganhar com 14.exd5. As chances práticas são parecidas, embora em teoria as pretas fiquem melhor.' }],
  ['c22', 'p', 'p', '(p)', '16 e6 Nxg3 17 exf7+ Kxf7 18 Rxe7+ Kg8 19 hxg3 Qxg3 20 Ne6 Qe5 21 Rf1 Nf8 22 Bf5 Bc8 23 Re8 Kf7 24 Re7+ Kg8 25 Re8 Kf7', { a: '=', r: 'Hellers–de Firmian, Biel 1989', c: 'O espetacular 16.e6 leva ao empate por repetição.' }],
  ['c22', 'q', 'q', '(q)', '18 e6 Nc5 19 exf7+ Kxf7 20 Rf1+ Kg8 21 Nf5 Ne6 22 Nh6+ Kg7 23 Nf5+', { a: '=', c: 'Depois de 18.e6 Nc5! a partida termina em empate. Nenhum lado pode fugir desta linha sem ficar pior.' }],
  ['c22-q', '1', 'q', '(q) 18.g4?!', '18 g4 h6 19 Qd2 Ng7 20 e6 Nf8', { a: '⩱', c: 'Com 18.g4?! as pretas ficam um pouco melhor.' }],
  // Coluna 23
  ['c23', 'r-A', 'r', '(r) A', '11 Qh3 Nb6 12 f5 e5 13 Nde2 Bd7 14 Be3 Bc6', { a: '=', r: 'Chandler–Browne, Bath 1983', c: 'Com 11.Qh3 fica igual.' }],
  ['c23', 'r-B', 'r', '(r) B', '11 h4 Nc5', { a: '⩱', c: 'Com 11.h4 Nc5! as pretas ficam um pouco melhor.' }],
  ['c23', 's', 's', '(s)', '12 e5 gxh4 13 exf6 Nxf6 14 f5 e5 15 Nde2 Bd7 16 Be4 Rg8', { a: '∞', r: 'segundo Nunn', c: 'Com 12.e5 o jogo fica incerto.' }],
  ['c23', 't', 't', '(t)', '15 Bxg5 Bxg5+ 16 Nxg5 Qc5 17 Nh3 b5 18 Kb1 Bb7', { a: '∞', r: 'Mamedov–Areshchenko, Aeroflot Open 2007', c: 'Com 15.Bxg5 as pretas ficam com compensação pelo peão.' }],
  ['c23', 'u', 'u', '(u)', '18 a3 Qa7', { a: '=', r: 'Bartholomew–Wojtkiewicz, Foxwoods 2005', c: 'Depois de 18.a3 Qa7 fica igual.' }],
  // Coluna 24
  ['c24', 'v', 'v', '(v)', '10 Be2 b5 11 Bxf6 Nxf6 12 e5 Bb7 13 exf6 Bxf3 14 Bxf3 Bxf6 15 Bxa8 Bxd4 16 Rxd4 d5 17 Bxd5 exd5 18 Nxd5 Qc5 19 Re1+ Kf8', { a: '=', r: 'Keres–Fischer, Torneio de Candidatos de Bled 1959', c: 'Com 10.Be2 as trocas levam à igualdade.' }],
  ['c24-v', '1', 'v', '(v) 13.Qg3', '13 Qg3 dxe5 14 fxe5 Nd7 15 Bxb5 axb5 16 Ndxb5 Qc5 17 Qxg7 Qxe5', { a: '=', r: 'Mischke–Braczko, por correspondência 1991', c: 'Com 13.Qg3 as pretas ficam bem depois de 17...Qxe5!.' }],
  ['c24', 'w', 'w', '(w)', '11 Bxb5 axb5 12 Ndxb5 Qb8 13 e5 dxe5 14 fxe5 Nxe5 15 Rhe1 Ng6 16 Nc7+ Kf8 17 Nxa8 Qxa8', { a: '⩱', r: 'Shirazi–Browne, Campeonato dos EUA 1983', c: 'O sacrifício 11.Bxb5 não funciona: as pretas ficam um pouco melhor.' }],
  ['c24-w', '1', 'w', '(w) 15.Bf4', '15 Bf4 Nfg4 16 h3 g5', { c: 'Se 15.Bf4, então 15...Nfg4 16.h3 g5!.' }],
  ['c24', 'x', 'x', '(x)', '11... Nxf6 12 e5 dxe5 13 fxe5 Nd7 14 Bxb5 axb5 15 Ndxb5 Qb6 16 Qxg7', { a: '±', c: 'Com 11...Nxf6 e 14...axb5?! as brancas ficam claramente melhor.' }],
  ['c24-x', '1', 'x', '(x) 14...O-O', '14... O-O 15 Bxd7', { a: '⩲', c: 'Com 14...O-O as brancas ficam um pouco melhor.' }],
  ['c24', 'y', 'y', '(y)', '18 Rxd4 Rac8 19 Qf2 Qa5 20 Kb1 Ba4 21 b3 Bxb3 22 axb3 Qxh5', { a: '=', r: 'Ivanović–de Firmian, Vršac 1983', c: 'Depois de 18.Rxd4 fica igual.' }],
  ['c24-y', '1', 'y', '(y) 19.c3', '19 c3 Bc6 20 Kb1 Bd5', { a: '=', c: 'Com 19.c3 também fica igual.' }],
]

const capitulo = {
  id: 'siciliana-najdorf-c',
  arquivo: 'siciliana-najdorf-c',
  nome: 'Siciliana Najdorf — 6.Bg5, linha antiga',
  fonte: 'Modern Chess Openings — Sicilian Defense, Najdorf Variation, 6 Bg5 Old Main Line (pp. 255–257), colunas 19–24',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3 Qc7 9. O-O-O Nbd7',
  corPadrao: 'b',
  ordem: 255,
  grupos: [
    { id: 'g4', nome: '10.g4 b5 11.Bxf6 Nxf6 12.g5 Nd7', colunas: [19, 20, 21] },
    { id: 'bd3', nome: '10.Bd3', colunas: [22, 23] },
    { id: 'qg3', nome: '10.Qg3', colunas: [24] },
  ],
}

module.exports = { capitulo, colunas, notas }
