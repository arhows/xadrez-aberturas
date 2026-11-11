// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Clássica, Ataque Richter-Rauzer (pp. 325–327), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs siciliana-rauzer-c
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-rauzer-c-dicas.cjs.
//
// A tabela traz avaliação só no fim da coluna 17; nas outras a avaliação vem da nota que continua a coluna.
// Nota (d): o livro dá "14 Bd3 Qa5 15 Kb1 Qc5 16 Nd4 d5 17 Qe2 ±". A dama em a5 não chega a c5 (o peão b5
// está no caminho) e nenhum cavalo branco alcança d4; a nota foi cortada em 15 Kb1, com a avaliação do livro.
// Nota (k): "17...O-O?! 18 exf7+ e 19 Bxb8" — o livro não diz o 18º lance das pretas; a nota para em 18 exf7+.

const B = '1 e4 c5 2 Nf3 Nc6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 d6 6 Bg5 e6 7 Qd2 a6 8 O-O-O h6'

const colunas = {
  c13: [`${B} 9 Be3 Be7 10 f4 Nxd4 11 Bxd4 b5 12 Qe3 Qc7 13 e5 dxe5 14 fxe5 Nd7 15 Ne4 Bb7 16 Nd6+ Qxd6`, 'be3', '9.Be3 Be7 10.f4 12.Qe3', '±',
    'Com 8...h6 as pretas perguntam logo ao bispo de g5. Com 9.Be3 Be7 10.f4 Nxd4 11.Bxd4 b5 12.Qe3 as brancas preparam e5; depois de 16.Nd6+ Qxd6 17.exd6 as pretas devolvem a dama por torre e bispo, mas as brancas ficam melhor.'],
  c14: [`${B} 9 Be3 Be7 10 f4 Nxd4 11 Bxd4 b5 12 Bd3 b4 13 Na4 Rb8 14 e5 dxe5 15 Bxe5 Bd7 16 f5 Bxa4`, 'be3', '12.Bd3 b4 13.Na4', '=',
    'Com 12.Bd3 b4 13.Na4 o cavalo vai para a borda. Depois de 14.e5 dxe5 15.Bxe5 Bd7! as pretas ganham o cavalo de a4 em troca da qualidade, com chances iguais.'],
  c15: [`${B} 9 Be3 Be7 10 f3 Nxd4 11 Bxd4 b5 12 h4 Qa5 13 Qf2 Rb8 14 Kb1 b4 15 Ne2 e5 16 Ba7 Rb7`, 'be3', '10.f3', '=',
    'Com 10.f3 as brancas jogam no estilo do Ataque Inglês, preparando g4 e h4. As pretas avançam os peões da ala da dama; depois de 15...e5 16.Ba7 Rb7 o jogo fica igual.'],
  c16: [`${B} 9 Be3 Bd7 10 f4 Be7 11 Bd3 b5 12 h3 Nxd4 13 Bxd4 b4 14 Ne2 e5 15 Be3 Qa5 16 Kb1 O-O`, 'be3', '9...Bd7', '⩲',
    'Com 9...Bd7 as pretas atrasam ...Be7. Depois de 11.Bd3 b5 12.h3 e 14...e5 elas rocam pequeno, mas as brancas mantêm chances de ataque.'],
  c17: [`${B} 9 Bf4 Bd7 10 Nxc6 Bxc6 11 Qe1 Be7 12 h4 Qc7 13 e5 d5 14 Rh3 Nd7 15 Kb1 Nc5 16 h5 O-O-O`, 'bf4', '9.Bf4 11.Qe1', '=',
    'Com 9.Bf4 o bispo pressiona d6. As pretas trocam em c6 e defendem o peão; depois de 13.e5 d5 elas fecham o centro e rocam grande, com jogo igual.'],
  c18: [`${B} 9 Bf4 Bd7 10 Nxc6 Bxc6 11 f3 d5 12 Qe1 Bb4 13 a3 Ba5 14 b4 Bb6 15 exd5 Bxd5 16 Be5 O-O`, 'bf4', '11.f3 d5', '=',
    'Com 11.f3 as brancas reforçam e4, mas as pretas quebram logo com 11...d5. O bispo vai de b4 a b6 e, depois de 16...O-O, o jogo fica igual.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '9... Nxd4 10 Bxd4 b5 11 f4 Bb7 12 Qe3 Qc7 13 Bb6 Qc8 14 e5', { a: '±', r: 'Nunn–Fedorowicz, Wijk aan Zee 1991', c: '9...Nxd4 10.Bxd4 tem pouco valor próprio, porque as pretas devem jogar 10...Be7 de qualquer jeito: 10...b5?! 11.f4 Bb7 12.Qe3 Qc7 13.Bb6! é muito bom para as brancas.' }],
  ['c13', 'b', 'b', '(b)', '10... Bd7 11 Nf3', { a: '⩲', c: '10...Bd7 11.Nf3 favorece as brancas.' }],
  ['c13', 'c', 'c', '(c)', '11 Qxd4 b5 12 Be2 Bb7 13 g4 Rc8 14 g5 hxg5 15 fxg5 Rh3', { a: '∓', r: 'Smirin–Greenfeld, Israel (relâmpago) 1995', c: '11.Qxd4 b5 12.Be2 Bb7 13.g4 Rc8 deixa as pretas melhor depois de 15...Rh3!.' }],
  ['c13', 'd', 'd', '(d)', '12... Bb7 13 Bxf6 gxf6 14 Bd3 Qa5 15 Kb1', { a: '±', r: 'Arakhamia–Kosteniuk, Campeonato Europeu Feminino 2001', c: 'O livro sugere investigar 12...Bb7 13.Bxf6 gxf6, mas também ali as brancas ficam melhor.' }],
  ['c13-d', '1', 'd', '(d) 13...Bxf6', '13... Bxf6 14 e5', { a: '±', c: '13...Bxf6 14.e5 deixa as brancas melhor.' }],
  ['c13', 'e', 'e', '(e)', '14 Bxe5 Ng4 15 Qf3 Nxe5 16 Qxa8 Nd7', { a: '∞', r: 'Ivanchuk–Kramnik, Dos Hermanas 1996', c: '14.Bxe5 Ng4! 15.Qf3 Nxe5 16.Qxa8 Nd7 dá às pretas boa compensação pela qualidade.' }],
  ['c13', 'f', 'f', '(f)', '17 exd6 Bg5 18 Qxg5 hxg5 19 Bxg7 Rh4 20 Bc3 Rc8 21 h3', { a: '±', r: 'Nijboer–Werle, Groningen 2003', c: 'Com 17.exd6 Bg5 18.Qxg5 hxg5 19.Bxg7 as brancas ficam melhor.' }],
  // Coluna 14
  ['c14', 'g', 'g', '(g)', '12 Kb1 b4 13 Na4 Nxe4 14 Qxb4 d5 15 Qe1 O-O 16 Bd3 f5', { a: '∞', r: 'Palac–Khalifman, Viena 1996', c: '12.Kb1 b4 13.Na4 Nxe4 14.Qxb4 d5 leva a um jogo com chances para os dois lados.' }],
  ['c14-g', '1', 'g', '(g) 12...Bb7', '12... Bb7 13 Bd3 O-O 14 e5 dxe5 15 fxe5 Nd7 16 Ne4 Bxe4 17 Bxe4 Rb8 18 c3', { a: '±', r: 'Kasparov–Kramnik, Novgorod 1997', c: '12...Bb7 13.Bd3 O-O 14.e5 deixa as brancas melhor.' }],
  ['c14', 'h', 'h', '(h)', '12... Bb7 13 Kb1', { c: 'O antigo 12...Bb7 transpõe para Kasparov–Kramnik da nota (g) depois de 13.Kb1.' }],
  ['c14', 'i', 'i', '(i)', '13 Ne2 Qa5 14 Kb1 e5 15 Be3 O-O 16 Ng3 Rd8 17 f5 d5 18 Qf2 Rb8', { a: '=', r: 'Dvoirys–Svidler, Campeonato Russo 1997', c: 'Com 13.Ne2 Qa5 14.Kb1 e5 o jogo fica igual.' }],
  ['c14', 'j', 'j', '(j)', '16 Bxb8 Qxb8 17 b3 Bxa4 18 bxa4 O-O', { a: '∞', r: 'J. Polgár–Kramnik, Moscou 1996', c: '16.Bxb8 Qxb8 17.b3 Bxa4 18.bxa4 O-O dá às pretas boa compensação pela qualidade.' }],
  ['c14', 'k', 'k', '(k)', '17 fxe6 Rc8 18 exf7+ Kxf7 19 Qf4 Qb6 20 Bc4+ Kf8 21 Rhe1 g5 22 Qf1 Kg7', { a: '=', r: 'Z. Wang–Atalik, Pequim 1996', c: 'Com 17.fxe6 Rc8 18.exf7+ Kxf7 as chances ficam mais ou menos iguais.' }],
  ['c14-k', '1', 'k', '(k) 17...O-O', '17... O-O 18 exf7+', { c: '17...O-O?! perde material: 18.exf7+ e 19.Bxb8.' }],
  // Coluna 15
  ['c15', 'l', 'l', '(l)', '11 Qxd4 b5 12 e5 dxe5 13 Qxe5 Bd7 14 Ne4 Nxe4 15 Qxe4 Rc8', { a: '=', c: '11.Qxd4 b5 12.e5 é sem graça e leva à igualdade.' }],
  ['c15', 'm', 'm', '(m)', '11... e5 12 Be3 Be6 13 g4 Rc8 14 Nd5 Bxd5', { a: '=', r: 'Manik–Zawadzki, Liga Tcheca 2004', c: '11...e5 12.Be3 Be6 tem se mostrado uma alternativa sólida.' }],
  ['c15', 'n', 'n', '(n)', '12 Kb1 Rb8 13 Qe3 b4 14 Na4 Qc7 15 b3 O-O 16 Bd3 e5 17 Bb2 Bd7', { a: '=', r: 'Kasparov–Kramnik, Moscou 1996', c: 'Com 12.Kb1 Rb8 13.Qe3 b4 14.Na4 o jogo fica igual.' }],
  ['c15-n', '1', 'n', '(n) 13.Bxf6', '13 Bxf6 Bxf6 14 Qxd6 Qxd6 15 Rxd6 Ke7 16 Rd1 Bxc3', { a: '=', c: '13.Bxf6 Bxf6 14.Qxd6 ganha um peão, mas depois de 15...Ke7 16.Rd1 Bxc3 as pretas recuperam e igualam.' }],
  ['c15', 'o', 'o', '(o)', '17 Nc1 Be6 18 Be3 d5 19 Nb3 Qa4 20 Bc5 O-O 21 g4 d4', { a: '=', r: 'Ivanchuk–Salov, Tilburg 1996', c: 'Com 17.Nc1 Be6 18.Be3 d5 o jogo fica igual.' }],
  // Coluna 16
  ['c16', 'p', 'p', '(p)', '10 f3 Qc7 11 g4 Ne5 12 h4 b5 13 a3 Rb8 14 Kb1 g6 15 Rh2', { a: '±', r: 'McDonald–Csom, Budapeste 1995', c: '10.f3 também cria problemas para as pretas.' }],
  ['c16', 'q', 'q', '(q)', '10... b5 11 Bd3 Qc7 12 Kb1 Na5 13 Qe1 Nc4 14 Bc1 b4 15 Nce2 Rb8 16 h3 g6 17 g4', { a: '±', r: 'Ernst–Roetteler, Bad Wildbad 2002', c: '10...b5 11.Bd3 Qc7 12.Kb1 deixa as brancas melhor.' }],
  ['c16', 'r', 'r', '(r)', '11 Be2 b5 12 Bf3 Rc8 13 Kb1 b4 14 Nce2 Qc7 15 g4 e5 16 Nf5 Bxf5 17 exf5 e4 18 Bg2 Na5 19 Bd4 Nc4 20 Qc1 Nxg4 21 Bxe4 Bf6', { a: '∓', r: 'Wolff–Korchnoi, Nova York 1996', c: 'Com 11.Be2 b5 12.Bf3 a iniciativa passa para as pretas.' }],
  ['c16', 's', 's', '(s)', '17 g4 Rfd8 18 c4 bxc3 19 Nxc3 Bc6 20 g5', { a: '⩲', r: 'Olivier–Delchev, Chambéry 1996', c: 'Com 17.g4 Rfd8 18.c4! as brancas têm chances de ataque.' }],
  ['c16-s', '1', 's', '(s) 17...exf4', '17... exf4 18 Bxf4 Be6 19 b3 d5 20 e5 Ne4 21 Bxe4 dxe4 22 Nd4', { a: '±', c: '17...exf4 18.Bxf4 Be6 19.b3 d5 deixa as brancas melhor.' }],
  // Coluna 17
  ['c17', 't-A', 't', '(t) A', '9 Bxf6 Qxf6 10 Nxc6 bxc6 11 f4 Qd8', { a: '∓', c: '9.Bxf6?! Qxf6 10.Nxc6 bxc6 11.f4 Qd8! deixa as pretas um pouco melhor.' }],
  ['c17', 't-B', 't', '(t) B', '9 Bh4 Nxe4 10 Qf4 g5 11 Qxe4 gxh4 12 Nxc6 bxc6 13 Qxc6+ Bd7 14 Qe4 Rb8', { a: '=', r: 'Krogius–Polugaevsky, Tbilisi 1956', c: 'Uma boa variante de café é 9.Bh4 Nxe4 10.Qf4; depois de 10...g5 11.Qxe4 gxh4 o jogo fica igual.' }],
  ['c17-t-B', '1', 't', '(t) B 10...Ng5', '10... Ng5 11 Nxc6 bxc6 12 Qa4 Qb6 13 Bd3 Rb8 14 f4 Nh7', { a: '∞', r: 'Z. Almasi–Cao, Budapeste 1997', c: '10...Ng5 11.Nxc6 bxc6 12.Qa4 leva a um jogo com chances para os dois lados.' }],
  ['c17', 'u-A', 'u', '(u) A', '10 Nb3 Ne5 11 Bg3 Nh5', { a: '=', c: 'Pressionar o peão d6 não adianta: 10.Nb3 Ne5 11.Bg3 Nh5 é igual.' }],
  ['c17', 'u-B', 'u', '(u) B', '10 Nf3 b5 11 a3 e5', { c: '10.Nf3 b5! 11.a3 e5 dá às pretas um jogo ativo.' }],
  ['c17', 'v', 'v', '(v)', '11... Qa5 12 f3 O-O-O 13 Bc4 Nd7 14 a3 Qc7 15 Ba2 Be7 16 Kb1', { a: '±', r: 'Waitzkin–Csom, Budapeste 1997', c: '11...Qa5 12.f3 O-O-O 13.Bc4 deixa as brancas melhor.' }],
  ['c17-v', '1', 'v', '(v) 12...Rd8', '12... Rd8 13 h4 b5 14 Kb1', { a: '±', r: 'Nunn–van der Wiel, Wijk aan Zee 1983', c: '12...Rd8 13.h4 b5 14.Kb1 também deixa as brancas melhor.' }],
  ['c17', 'w', 'w', '(w)', '12 e5 Nh5 13 Be3 Qc7 14 Be2 g6 15 Bxh5 gxh5 16 Bf4 O-O-O', { a: '=', r: 'Adams–Timman, Amsterdã 1994', c: '12.e5 Nh5 13.Be3 Qc7 14.Be2 g6 15.Bxh5 gxh5: a atividade das pretas compensa a estrutura de peões ruim.' }],
  ['c17', 'x', 'x', '(x)', '13 f3 b5 14 Bd3 Nd7 15 Qg3 g6 16 Kb1 b4 17 Ne2 e5 18 Be3 Nf6', { a: '=', r: 'Sadvakasov–Atalik, Internet 2002', c: 'Com 13.f3 b5 14.Bd3 o jogo também fica igual. A coluna é Kotronias–Shirov, Grécia 1993.' }],
  // Coluna 18
  ['c18', 'y', 'y', '(y)', '11... Qb6 12 Bc4 O-O-O 13 Be3 Qc7 14 Qf2 Nd7 15 a3', { a: '±', r: 'A. Ivanov–Fedorowicz, Nova York 1989', c: 'As brancas mantêm o controle se as pretas não quebram no centro: 11...Qb6 12.Bc4 deixa as brancas melhor.' }],
  ['c18', 'z-A', 'z', '(z) A', '14 Bd2 Qe7 15 e5 Nd7 16 Kb1 Bb6 17 f4 h5 18 Ne2 g6', { a: '=', r: 'Topalov–Salov, Madri 1993', c: 'Com 14.Bd2 Qe7 15.e5 Nd7 o jogo fica igual.' }],
  ['c18', 'z-B', 'z', '(z) B', '14 exd5 Nxd5 15 b4 Nxf4 16 Rxd8+ Bxd8', { a: '=', c: 'Depois de 14.exd5 Nxd5 15.b4 Nxf4! 16.Rxd8+ Bxd8 as pretas têm boa compensação pela dama.' }],
  ['c18', 'aa', 'aa', '(aa)', '16 Nxd5 Nxd5 17 Qg3 O-O 18 c4 Rc8 19 Kb2 Bc7 20 Bxc7 Rxc7 21 Qe5 Qf6', { a: '=', r: 'Hübner–Salov, Skellefteå 1989', c: 'Com 16.Nxd5 Nxd5 17.Qg3 O-O o jogo fica igual.' }],
  ['c18', 'bb', 'bb', '(bb)', '17 Qh4 Be3+ 18 Kb2 Bg5 19 Qd4 Bc6 20 a4 Qxd4 21 Bxd4 Rfc8 22 Kb3 Nd7', { a: '=', r: 'Navara–Bu Xiangzhi, Atenas 2001', c: 'Com 17.Qh4 Be3+ 18.Kb2 Bg5 19.Qd4 as damas saem e o jogo fica igual.' }],
  ['c18-bb', '1', 'bb', '(bb) 20.f4', '20 f4 Qxd4 21 Rxd4 Bh4', { c: '20.f4 Qxd4 21.Rxd4 Bh4 também iguala.' }],
]

const capitulo = {
  id: 'siciliana-rauzer-c',
  arquivo: 'siciliana-rauzer-c',
  nome: 'Siciliana Clássica — Richter-Rauzer com 7...a6 8.O-O-O h6',
  fonte: 'Modern Chess Openings — Sicilian Defense, Richter-Rauzer Attack (pp. 325–327), colunas 13–18',
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Bg5 e6 7. Qd2 a6 8. O-O-O h6',
  corPadrao: 'b',
  ordem: 325,
  grupos: [
    { id: 'be3', nome: '9.Be3', colunas: [13, 14, 15, 16] },
    { id: 'bf4', nome: '9.Bf4', colunas: [17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
