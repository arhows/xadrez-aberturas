// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Taimanov (pp. 308–309), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs siciliana-taimanov-c
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-taimanov-c-dicas.cjs.
//
// Só a coluna 15 traz avaliação no fim; nas outras a avaliação vem da nota que continua a coluna.

const B = '1 e4 c5 2 Nf3 e6 3 d4 cxd4 4 Nxd4 Nc6'

const colunas = {
  c13: [`${B} 5 Nc3 a6 6 Be3 Qc7 7 Be2 b5 8 Nxc6 Qxc6 9 O-O Bb7 10 Bf3 Rc8 11 e5 Qc7 12 Bxb7 Qxb7 13 Qd3 Ne7`, 'nc3', '5.Nc3 a6 6.Be3 Qc7 7.Be2', '=',
    'Com 6.Be3 as brancas jogam como contra a Scheveningen e podem transpor para 6.Be2. Na coluna as pretas trocam em c6, fianquetam com ...b5 e ...Bb7 e, com 10...Rc8!, igualam.'],
  c14: [`${B} 5 Nc3 a6 6 Be3 Qc7 7 Bd3 Nf6 8 O-O Ne5 9 h3 Bc5 10 Kh1 d6 11 f4 Ng6 12 Qe1 Bd7 13 f5 Ne5`, 'nc3', '7.Bd3', '=',
    'Com 7.Bd3 as brancas preparam f4. As pretas centralizam o cavalo em e5, trocam o bispo de e3 por ...Bc5 e igualam.'],
  c15: [`${B} 5 Nc3 a6 6 Nxc6 bxc6 7 Bd3 d5 8 O-O Nf6 9 Re1 Be7 10 e5 Nd7 11 Qg4 g6 12 Na4 Qa5 13 Bh6 c5`, 'nc3', '6.Nxc6', '=',
    'Com 6.Nxc6 bxc6 as brancas trocam logo e buscam desenvolvimento rápido em troca do forte centro preto. O jogo fica igual (Khairullin–Svidler, Campeonato Russo 2006).'],
  c16: [`${B} 5 Nb5 d6 6 c4 Nf6 7 N1c3 a6 8 Na3 Be7 9 Be2 O-O 10 O-O b6 11 Be3 Bb7 12 Qb3 Nd7 13 Rfd1 Nc5`, 'nb5', '5.Nb5 d6 6.c4 Nf6', '=',
    'Com 5.Nb5 d6 6.c4 as brancas montam um Maróczy: as pretas ficam apertadas, mas as brancas tiram pouco proveito disso. As pretas montam um ouriço com ...b6 e ...Bb7 e igualam.'],
  c17: [`${B} 5 Nb5 d6 6 c4 Nf6 7 N1c3 a6 8 Na3 b6 9 Be2 Bb7 10 O-O Nb8 11 f3 Nbd7 12 Bf4 Qc7 13 Qd2 Be7`, 'nb5', '8...b6', '=',
    'Com 8...b6 e 10...Nb8 as pretas reposicionam o cavalo em d7, num ouriço típico. As brancas têm dificuldade para transformar a vantagem de espaço em algo concreto.'],
  c18: [`${B} 5 Nb5 d6 6 Bf4 e5 7 Be3 Nf6 8 Bg5 Be6 9 Nd2 Be7 10 Bxf6 Bxf6 11 Nc4 O-O 12 Qxd6 Qc8 13 c3 Rd8`, 'nb5', '6.Bf4', '=',
    'Com 5.Nb5 e 6.Bf4 as brancas forçam ...e5, mas o plano gasta tempo demais. As pretas sacrificam o peão d6 e ficam com desenvolvimento ativo, com igualdade.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '5... Qc7', { c: '5...Qc7 também é comum para chegar às posições da Taimanov; contra 6.g3, 6.Be2 ou 6.Be3 o mais flexível é 6...a6.' }],
  ['c13', 'b', 'b', '(b)', '6 Bf4 d6 7 Bg3 Be7 8 Be2 e5 9 Nb3 Nf6 10 O-O O-O 11 Qd3 Be6', { a: '=', r: 'W. Watson–Portisch, Nova York 1987', c: 'Com 6.Bf4 d6 7.Bg3 Be7 8.Be2 e5! as pretas igualam.' }],
  ['c13-b', '1', 'b', '(b) 7...Nf6', '7... Nf6 8 Be2 Be7 9 Nxc6 bxc6 10 e5', { a: '±', c: '7...Nf6?! 8.Be2 Be7 9.Nxc6 bxc6 10.e5 deixa as brancas melhor.' }],
  ['c13', 'c', 'c', '(c)', '7... Nf6 8 O-O', { c: '7...Nf6 8.O-O transpõe para as linhas mais populares das colunas 7 e 8.' }],
  ['c13', 'd-A', 'd', '(d) A', '9 f4 Bb7 10 Bf3 Qc4 11 e5 Bxf3 12 Qxf3 Rc8', { a: '=', r: 'Anand–Timman, Olimpíada de Novi Sad 1990', c: 'Contra 9.f4 as pretas podem jogar 9...Bb7 10.Bf3 Qc4, com igualdade.' }],
  ['c13', 'd-B', 'd', '(d) B', '9 f4 Ba3 10 Bd4 Bxb2 11 Nxb5 Bxa1 12 Bxa1 axb5 13 Bxg7 Qxe4', { a: '=', r: 'Kavalek–Stein, Interzonal de Sousse 1967', c: 'Ou 9...Ba3!?, que também leva à igualdade.' }],
  ['c13', 'e-A', 'e', '(e) A', '10... Rd8 11 Re1 Ne7 12 a4 b4 13 Nd5 Ng6 14 c3 Ne5 15 Bd4', { a: '±', r: 'Lanka–Drei, Nice 1996', c: '10...Rd8 esbarra em 11.Re1!, com o sacrifício Nd5 no ar.' }],
  ['c13', 'e-B', 'e', '(e) B', '10... Qc7 11 e5 Ne7 12 Bxb7 Qxb7 13 Qd3 Nf5 14 Rad1 Be7 15 Bf4 Rd8 16 Ne4 h6 17 g4 Nh4 18 Bg3 Ng6 19 f4', { a: '±', r: 'Shirov–Adams, Grécia 1993', c: '10...Qc7 11.e5 Ne7 deixa as brancas melhor depois de 14...Be7?!.' }],
  ['c13-e-B', '1', 'e', '(e) B 14...Rc8', '14... Rc8', { c: 'Melhor era 14...Rc8!.' }],
  ['c13', 'f', 'f', '(f)', '14 Rad1 Nf5 15 Ne4 Rc4 16 f3 Nxe3 17 Qxe3 Rxc2', { a: '∓', r: 'Petermann–Benjamin, Estocolmo 1996', c: '14.Rad1 Nf5 15.Ne4 Rc4! é igual; depois de 16.f3?! as pretas ficam um pouco melhor.' }],
  // Coluna 14
  ['c14', 'g', 'g', '(g)', '7 f3 Nf6 8 Qd2 b5 9 O-O-O Nxd4 10 Qxd4 Bb7 11 Kb1 Rc8 12 Bd3 Bc5 13 Qxc5 Qxc5', { a: '=', r: 'Carlsen–Skripchenko, Cap d’Agde 2006', c: 'Com 7.f3 e o roque grande o jogo fica igual.' }],
  ['c14', 'h-A', 'h', '(h) A', '8... Bd6 9 Nxc6 bxc6 10 f4 e5 11 f5 Be7 12 Na4 d5 13 Bb6 Qb8 14 Qe1 a5 15 c4 O-O 16 Rc1 Nd7', { a: '=', r: 'Hector–Emms, Ilha de Man 1996', c: '8...Bd6 leva a uma posição desequilibrada: as brancas têm o forte peão f5, e as pretas estão prontas para avançar no centro.' }],
  ['c14', 'h-B', 'h', '(h) B', '8... b5 9 Nxc6 Qxc6 10 f3 Bb7 11 Kh1 Bc5 12 Bxc5 Qxc5 13 Qe1 d6 14 a4 bxa4 15 Rxa4', { a: '±', r: 'Carlsen–E. Paehtz, Lausanne 2005', c: 'Com 8...b5 9.Nxc6 Qxc6 10.f3 as brancas ficam melhor.' }],
  ['c14', 'i', 'i', '(i)', '9... b5 10 f4 Nc4 11 Bxc4 Qxc4 12 Qd3 Bb7 13 a4 Qxd3 14 cxd3 b4 15 Nce2', { a: '⩲', r: 'Short–Illescas, Linares 1990', c: '9...b5?! 10.f4 Nc4 permite às brancas jogar contra a ala da dama enfraquecida.' }],
  ['c14', 'j', 'j', '(j)', '14 Nce2 Qb6 15 Qg3 O-O', { a: '=', r: 'Fressinet–Rublevsky, Olimpíada de Turim 2006', c: 'Com 14.Nce2 Qb6 o jogo fica igual.' }],
  // Coluna 15
  ['c15', 'k', 'k', '(k)', '7 e5 Qc7 8 f4 f5 9 Be3 Ne7 10 Bc5 Nd5', { a: '=', r: 'Rytshagov–Ye, Helsinque 1992', c: 'Com 7.e5 Qc7 8.f4 f5! as pretas igualam.' }],
  ['c15', 'l', 'l', '(l)', '9 Qe2 Be7 10 b3 O-O 11 Bb2 c5 12 Rae1 Re8 13 Kh1 Bb7 14 f4 c4 15 bxc4 dxc4 16 Bxc4 Bb4 17 Bb3 Rc8', { a: '=', r: 'Karasev–Taimanov, São Petersburgo 1995', c: 'Com 9.Qe2 Be7 10.b3 as pretas liberam o jogo com 14...c4! e igualam.' }],
  // Coluna 16
  ['c16', 'm', 'm', '(m)', '5 c4 Nf6 6 Nc3 Bb4 7 Nxc6 bxc6 8 Bd3 e5 9 O-O O-O', { a: '=', r: 'Christiansen–Ribli, Alemanha 1992', c: '5.c4 Nf6 6.Nc3 Bb4 é insosso e leva à igualdade.' }],
  ['c16', 'n', 'n', '(n)', '7 N5c3 Be7 8 Be2 O-O 9 O-O b6 10 Bf4 Bb7 11 Nd2 a6 12 a3 Nd4 13 Bd3 Nd7', { a: '=', r: 'Ljubojević–Karpov, Madri 1973', c: 'Com 7.N5c3 o jogo fica igual.' }],
  ['c16', 'o', 'o', '(o)', '8... d5 9 cxd5 exd5 10 exd5 Nb4 11 Be2 Nfxd5 12 O-O Be6 13 Qa4+ b5 14 Naxb5 axb5 15 Bxb5+ Ke7 16 Nxd5+ Nxd5 17 Qe4', { a: '∞', r: 'Z. Almási–Horváth, Campeonato Húngaro 1993', c: '8...d5 leva a uma linha traiçoeira: depois de 13.Qa4+! as brancas sacrificam o cavalo e têm boa compensação.' }],
  ['c16-o', '1', 'o', '(o) 11...Bc5', '11... Bc5 12 Be3', { c: '11...Bc5 12.Be3! é bom para as brancas.' }],
  ['c16', 'p', 'p', '(p)', '14 Qc2 Qc7 15 Rac1 Rac8 16 Nab1 Nb4 17 Qd2 Qb8 18 f3 Rfd8', { a: '=', r: 'Yudasin–Lautier, Pamplona 1992', c: 'Com 14.Qc2 o jogo fica igual.' }],
  // Coluna 17
  ['c17', 'q', 'q', '(q)', '10... Ne5 11 f4 Ned7 12 Bf3 Be7 13 Qe2 O-O 14 g4', { a: '⩲', r: 'Geller–A. Sokolov, Pančevo 1987', c: '10...Ne5?! é menos preciso: 11.f4 Ned7 e 14.g4! tomam casas.' }],
  ['c17', 'r', 'r', '(r)', '12 Be3 Be7 13 Qd2 Qc7 14 Rac1 Rc8 15 Rfd1 O-O 16 Bf1 Qb8 17 Kh1 Rfe8', { a: '=', r: 'Santo Román–Cebalo, Cannes 1993', c: '12.Be3 leva a uma posição igual, típica do ouriço.' }],
  ['c17', 's', 's', '(s)', '14 Rfd1 Ne5 15 Rac1 O-O', { a: '=', r: 'I. Gurevich–Zsu. Polgár, Nova York 1992', c: 'Com 14.Rfd1 Ne5 o jogo fica igual; as brancas não conseguem transformar a vantagem de espaço em algo concreto.' }],
  // Coluna 18
  ['c18', 't', 't', '(t)', '8... Qa5+ 9 Qd2 Nxe4 10 Qxa5 Nxa5 11 Be3 Kd7 12 f3 Nf6 13 Bxa7 d5 14 f4 Nc6 15 fxe5', { a: '⩲', r: 'A. Rodríguez–Hellsten, Olimpíada de Erevan 1996', c: 'As brancas ficam um pouco melhor depois de 8...Qa5+ 9.Qd2 Nxe4 10.Qxa5.' }],
  ['c18', 'u', 'u', '(u)', '9 N1c3 a6 10 Bxf6 gxf6 11 Na3 d5 12 exd5 Bxa3 13 bxa3 Qa5 14 Qd2 O-O-O', { a: '∓', r: 'Fischer–Petrosian, match 1971', c: '9.N1c3 a6 10.Bxf6 gxf6 11.Na3 d5! deixou as brancas em dificuldades.' }],
  ['c18', 'v', 'v', '(v)', '14 Qc7 Be7 15 Qxc8 Raxc8 16 Nba3 Nd4', { a: '=', r: 'Borišek–Navara, Campeonato Europeu Júnior 2003', c: 'Com 14.Qc7 as damas se trocam e o jogo fica igual.' }],
]

const capitulo = {
  id: 'siciliana-taimanov-c',
  arquivo: 'siciliana-taimanov-c',
  nome: 'Siciliana Taimanov — 6.Be3, 6.Nxc6 e 5.Nb5',
  fonte: 'Modern Chess Openings — Sicilian Defense, Taimanov Variation (pp. 308–309), colunas 13–18',
  base: '1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6',
  corPadrao: 'b',
  ordem: 308,
  grupos: [
    { id: 'nc3', nome: '5.Nc3 a6', colunas: [13, 14, 15] },
    { id: 'nb5', nome: '5.Nb5 d6', colunas: [16, 17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
