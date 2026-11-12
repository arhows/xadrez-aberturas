// Transcrição do MCO 15ª ed. — Sicilianas não abertas: variantes fechadas menores e Gambito Smith-Morra (pp. 350–351), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs siciliana-fechada-b
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-fechada-b-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; a avaliação vem da nota que continua cada coluna.

const B = '1 e4 c5'

const colunas = {
  c07: [`${B} 2 Nc3 Nc6 3 g3 e6 4 Bg2 Nf6 5 Nge2 d5 6 exd5 exd5 7 d4 cxd4 8 Nxd4 Bb4 9 O-O O-O 10 Bg5 Bxc3`, 'nc3', '2.Nc3 Nc6 3.g3 e6', '=',
    'Com 2.Nc3 e 3.g3 as brancas preparam a Fechada, mas contra 3...e6 elas mudam de plano com 5.Nge2 e d4. As pretas ficam com o peão isolado em d5, trocam em c3 e igualam.'],
  c08: [`${B} 2 Nc3 e6 3 g3 d5 4 exd5 exd5 5 Bg2 Nf6 6 Nge2 d4 7 Ne4 Nxe4 8 Bxe4 Nd7 9 d3 Nf6 10 Bg2 Bd6`, 'nc3', '2...e6 3.g3 d5', '=',
    'Com 2...e6 e 3...d5 as pretas abrem o centro logo. Depois de 6...d4 elas ganham espaço e igualam com facilidade.'],
  c09: [`${B} 2 Nf3 Nc6 3 Nc3 e5 4 Bc4 Be7 5 d3 d6 6 Nd2 Nf6 7 Nf1 Bg4 8 f3 Be6 9 Ne3 Nd7 10 O-O O-O`, 'nf3', '2.Nf3 Nc6 3.Nc3 e5', '=',
    'Com 3.Nc3 as brancas ameaçam transpor para linhas abertas; 3...e5 fecha d4. As brancas manobram o cavalo por d2, f1 e e3 rumo a d5, e o jogo fica igual.'],
  c10: [`${B} 2 Nf3 d6 3 c3 Nf6 4 h3 Nc6 5 Bd3 d5 6 e5 Nd7 7 e6 fxe6 8 Ng5 Nf6 9 Bxh7 Nxh7 10 Qh5+ Kd7`, 'nf3', '2...d6 3.c3 4.h3', '∓',
    'Com 3.c3 Nf6 4.h3?! as brancas perdem tempo. As pretas respondem com 5...d5! e, depois do sacrifício 7.e6 e 9.Bxh7, ficam com boa compensação.'],
  c11: [`${B} 2 d4 cxd4 3 c3 dxc3 4 Nxc3 Nc6 5 Nf3 d6 6 Bc4 a6 7 O-O Nf6 8 b4 Bg4 9 b5 Bxf3 10 gxf3 axb5`, 'morra', 'Smith-Morra 5...d6', '∓',
    'No Gambito Smith-Morra as brancas entregam um peão por desenvolvimento rápido e colunas abertas. Com 6...a6 as pretas impedem Nb5 e, depois de 8.b4 Bg4, ficam um pouco melhor.'],
  c12: [`${B} 2 d4 cxd4 3 c3 dxc3 4 Nxc3 Nc6 5 Nf3 e6 6 Bc4 Qc7 7 Qe2 Nf6 8 O-O Ng4 9 Nb5 Qb8 10 h3 h5`, 'morra', '5...e6', '=',
    'Com 5...e6 e 6...Qc7 as pretas evitam as armadilhas na coluna d. Depois de 8...Ng4 e 10...h5 a posição fica aguda, com chances mais ou menos iguais.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '5 f4 d5 6 e5 Nd7 7 Nf3 Be7 8 O-O O-O 9 d3 Rb8 10 Kh1 b5 11 Ne2 b4 12 g4 f6 13 exf6 Nxf6', { a: '∞', r: 'Lukin–Sveshnikov, São Petersburgo 1994', c: '5.f4 d5 6.e5 leva a um jogo com chances para os dois lados.' }],
  ['c07', 'b', 'b', '(b)', '5... d6 6 O-O Be7 7 d3 O-O 8 f4 Bd7 9 Kh1 Rc8 10 Be3', { a: '⩲', r: 'Gdanski–Adorján, Budapeste 1993', c: '5...d6 6.O-O Be7 7.d3 dá uma pequena vantagem às brancas.' }],
  ['c07-b', '1', 'b', '(b) 7.d4', '7 d4 cxd4 8 Nxd4 Bd7 9 a4 a6', { c: '7.d4 cxd4 8.Nxd4 Bd7 9.a4 a6 transpõe para a Taimanov com 6.g3.' }],
  ['c07', 'c', 'c', '(c)', '8... Bg4 9 Qd3 Be7 10 h3 Be6 11 Nxe6 fxe6 12 O-O O-O 13 Bg5 h6 14 Bd2 Qd7 15 Rae1', { a: '⩲', r: 'Fischer–Bertok, Rovinj/Zagreb 1970', c: '8...Bg4 9.Qd3 dá uma pequena vantagem às brancas.' }],
  ['c07', 'd', 'd', '(d)', '10 Nce2 h6 11 c3 Bc5 12 Be3 Bb6 13 h3 Re8 14 Re1 Ne5', { a: '=', c: '10.Nce2 é sólido, mas as pretas mantêm o equilíbrio com jogo ativo.' }],
  ['c07', 'e', 'e', '(e)', '11 bxc3 h6 12 Bf4 Bg4 13 Qd3 Qd7 14 Rfe1 Rfe8 15 Nxc6 bxc6 16 Qd4 Bh3', { a: '=', r: 'Spassky–G. García, Linares 1981', c: 'Com 11.bxc3 h6! 12.Bf4 Bg4 o jogo fica igual.' }],
  ['c07-e', '1', 'e', '(e) 12.Bxf6', '12 Bxf6 Qxf6 13 Bxd5 Rd8', { c: '12.Bxf6 Qxf6 13.Bxd5 Rd8 dá às pretas jogo pelo peão.' }],
  // Coluna 8
  ['c08', 'f', 'f', '(f)', '4 Bg2 dxe4 5 Nxe4 Be7 6 Ne2 Nf6 7 d4 Nxe4 8 Bxe4 Nc6', { a: '=', r: 'Abramović–Cvetković, Islândia 1989', c: '4.Bg2 dxe4 5.Nxe4 Be7 leva à igualdade.' }],
  ['c08', 'g', 'g', '(g)', '9 O-O Nf6 10 Bg2 Bd6 11 c3 d3 12 Nf4 O-O 13 Nxd3 Bxg3 14 fxg3 Qxd3 15 Qf3 Qxf3', { a: '=', r: 'Spassky–Kasparov, Bugojno 1982', c: 'Com 9.O-O Nf6 10.Bg2 Bd6 o jogo fica igual.' }],
  ['c08', 'h', 'h', '(h)', '11 O-O O-O 12 Bf4 Bg4 13 Bxd6 Qxd6', { a: '=', r: 'Kuipers–van den Berg, Holanda 1995', c: 'Com 11.O-O O-O 12.Bf4 Bg4 o jogo fica igual.' }],
  // Coluna 9
  ['c09', 'i', 'i', '(i)', '3... e6', { c: 'Outros lances, como 3...e6, 3...g6 ou 3...Nf6, permitem 4.d4, que transpõe para as linhas abertas da Siciliana.' }],
  ['c09', 'j-A', 'j', '(j) A', '6 Ng5 Bxg5 7 Qh5 Be7 8 Qxf7+ Kd7 9 Qxg7 Nf6 10 O-O', { a: '∞', r: 'Adams–Coleman, Campeonato Britânico 1989', c: 'Em Adams–Coleman houve o sacrifício criativo 6.Ng5!?; as brancas venceram, mas têm no máximo compensação pela peça.' }],
  ['c09', 'j-B', 'j', '(j) B', '6 Nd5 Nf6 7 c3 Nxd5 8 Bxd5 O-O 9 a3 Bf6 10 b4 Ne7 11 Bb3 b6 12 O-O Bb7', { a: '=', r: 'Balashov–Yakovich, Campeonato Russo 1994', c: '6.Nd5 Nf6 7.c3 Nxd5 8.Bxd5 O-O 9.a3 Bf6! leva à igualdade.' }],
  ['c09', 'j-C', 'j', '(j) C', '6 O-O Be6 7 Nd5 Nf6 8 Ng5 Bxd5 9 exd5 Nb8', { a: '=', r: 'Hector–Sherbakov, Aalborg 1993', c: '6.O-O Be6 7.Nd5 Nf6 8.Ng5 também é igual.' }],
  ['c09', 'k', 'k', '(k)', '6... Bg5 7 h4 Bh6 8 Qh5 Qd7 9 Nd5 Rb8 10 a4 Qd8 11 Nf1 Bxc1 12 Rxc1 Nge7 13 Nxe7 Qxe7', { a: '=', r: 'Movsesian–Radjabov, Copa da ECU 2006', c: '6...Bg5 7.h4 Bh6 também leva à igualdade.' }],
  ['c09', 'l', 'l', '(l)', '11 Ncd5 Bg5 12 f4 exf4 13 Nxf4 Bxf4 14 Rxf4 Nde5', { a: '=', r: 'Nisipeanu–Ikonnikov, Vlissingen 2003', c: 'Com 11.Ncd5 Bg5 12.f4 exf4 o jogo fica igual.' }],
  // Coluna 10
  ['c10', 'm-A', 'm', '(m) A', '3 c4 e5', { c: '3.c4 é bem respondido com 3...e5 ou 3...Bg4.' }],
  ['c10', 'm-B', 'm', '(m) B', '3 Bc4 Nf6 4 d3 e6 5 Bb3 Be7 6 O-O O-O 7 c3 b5 8 Re1 Bb7 9 Nbd2 Nc6', { a: '=', r: 'Waitzkin–Wolff, Nova York 1996', c: '3.Bc4 Nf6 4.d3 e6 leva à igualdade.' }],
  ['c10', 'm-C', 'm', '(m) C', '3 Nc3 Nf6 4 e5 dxe5 5 Nxe5 Nbd7 6 Nc4 g6 7 g3 Nb6 8 Nxb6 Qxb6', { a: '=', r: 'P. Popović–Browne, Novi Sad 1979', c: '3.Nc3 Nf6 4.e5!? dxe5 5.Nxe5 Nbd7 também é igual.' }],
  ['c10-m-C', '1', 'm', '(m) C 3...e5', '3... e5 4 Bc4 Be7 5 d3 Nc6', { c: '3...e5 4.Bc4 Be7 5.d3 Nc6 transpõe para a coluna anterior.' }],
  ['c10', 'n-A', 'n', '(n) A', '4 Bd3 Nc6 5 Bc2 Bg4 6 d3 g6', { a: '=', c: 'O peão e4 está protegido por causa de 5.Qa4+. Com 4.Bd3 Nc6 5.Bc2 as chances são iguais.' }],
  ['c10', 'n-B', 'n', '(n) B', '4 Be2 Nc6 5 d4 cxd4 6 cxd4 Nxe4 7 d5 Qa5+ 8 Nc3 Nxc3 9 bxc3 Ne5 10 Nxe5 Qxc3+ 11 Bd2 Qxe5', { a: '⩱', c: '4.Be2 Nc6 5.d4 deixa às brancas o ônus de justificar o sacrifício de dois peões.' }],
  ['c10', 'o', 'o', '(o)', '11 Nxh7 b6 12 O-O Ba6 13 Re1 Qe8 14 Nf6+ exf6 15 Qxh8 Qg6', { a: '∓', r: 'González–Vera, Campeonato Cubano 1996', c: 'Depois de 11.Nxh7 b6 12.O-O Ba6 as pretas têm compensação esmagadora pela qualidade.' }],
  // Coluna 11
  ['c11', 'p-A', 'p', '(p) A', '3... Nf6 4 e5 Nd5', { c: 'As pretas podem recusar o gambito: 3...Nf6 4.e5 Nd5 transpõe para a Siciliana com 2.c3.' }],
  ['c11', 'p-B', 'p', '(p) B', '3... d3 4 Bxd3 Nc6 5 c4 d6 6 Nc3 g6 7 h3 Bg7 8 Nf3 Bxc3+ 9 bxc3 Nf6', { a: '∞', c: '3...d3 4.Bxd3 Nc6 também recusa o gambito, com chances para os dois lados.' }],
  ['c11', 'p-C', 'p', '(p) C', '3... d5 4 exd5 Qxd5 5 cxd4', { c: 'Uma alternativa muito aguda é 3...d5 4.exd5 Qxd5 5.cxd4, tratada na Siciliana com 2.c3.' }],
  ['c11', 'q-A', 'q', '(q) A', '6... e6 7 O-O Nf6 8 Qe2 a6 9 Bg5 Be7 10 Rfd1 Qc7 11 Rac1 O-O 12 Bb3 h6 13 Bf4 e5', { a: '=', r: 'Fischer–Korchnoi, Buenos Aires 1960', c: 'A linha mais antiga 6...e6 7.O-O Nf6 8.Qe2 dá chances iguais.' }],
  ['c11', 'q-B', 'q', '(q) B', '6... Nf6 7 e5 dxe5 8 Qxd8+ Nxd8 9 Nb5 Rb8 10 Nxe5 e6 11 Nc7+ Ke7 12 Be3 Nc6 13 O-O-O', { a: '±', r: 'Kristiansen–Roberts, Harrachov 1967', c: 'Uma armadilha é 6...Nf6? 7.e5! dxe5 8.Qxd8+: depois de 13.O-O-O! as pretas ficam em apuros. O ponto do 6...a6 da coluna é impedir Nb5 no final.' }],
  ['c11-q-B', '1', 'q', '(q) B 8...Kxd8', '8... Kxd8 9 Ng5', { c: '8...Kxd8 9.Ng5 também é ruim para as pretas.' }],
  ['c11', 'r', 'r', '(r)', '11 Bxb5 g6 12 Nd5 Bg7 13 Bb2 O-O 14 Nxf6+ Bxf6 15 Bxf6 exf6', { a: '∓', r: 'Hughes–Wells, Monarch Assurance 2005', c: 'Com 11.Bxb5 g6 12.Nd5 as brancas recuperam material, mas as pretas ficam um pouco melhor.' }],
  // Coluna 12
  ['c12', 's', 's', '(s)', '5... g6 6 Bc4 Bg7 7 e5 Nh6 8 O-O O-O 9 Bf4 Na5 10 Bd5 e6 11 Be4 d5 12 exd6 f5', { a: '∞', r: 'Torres–West, Salônica 1988', c: '5...g6 6.Bc4 Bg7 7.e5 leva a um jogo pouco claro.' }],
  ['c12-s', '1', 's', '(s) 7.O-O', '7 O-O d6 8 Qe2 Nf6 9 Rd1 Bg4', { a: '∓', c: '7.O-O d6 8.Qe2 Nf6 9.Rd1 Bg4 deixa as pretas um pouco melhor.' }],
  ['c12', 't', 't', '(t)', '6... Bb4 7 O-O Nge7 8 Qe2 O-O 9 Rd1', { a: '±', c: '6...Bb4 7.O-O Nge7 8.Qe2 O-O 9.Rd1 dá às brancas uma iniciativa forte no centro.' }],
  ['c12', 'u', 'u', '(u)', '11 g3 Nge5 12 Nxe5 Nxe5 13 Bf4 a6', { a: '=', r: 'Schmidt–Müller, Alemanha 1993', c: '11.g3 Nge5 12.Nxe5 Nxe5 13.Bf4 a6 leva a uma posição aguda, com chances mais ou menos iguais.' }],
]

const capitulo = {
  id: 'siciliana-fechada-b',
  arquivo: 'siciliana-fechada-b',
  nome: 'Siciliana — Fechadas menores e Gambito Smith-Morra',
  fonte: 'Modern Chess Openings — Sicilian Defense, Minor Closed Variations and Smith-Morra Gambit (pp. 350–351), colunas 7–12',
  base: '1. e4 c5',
  corPadrao: 'b',
  ordem: 350,
  grupos: [
    { id: 'nc3', nome: '2.Nc3 (fechadas menores)', colunas: [7, 8] },
    { id: 'nf3', nome: '2.Nf3 sem d4', colunas: [9, 10] },
    { id: 'morra', nome: 'Gambito Smith-Morra', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
