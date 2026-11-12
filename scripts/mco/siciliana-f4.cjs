// Transcrição do MCO 15ª ed. — Siciliana, Ataque f4 (Grand Prix) (pp. 358–359), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-f4
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-f4-dicas.cjs.
//
// Colunas 1–4 terminam sem avaliação na tabela; a avaliação vem da nota que continua cada coluna.

const B = '1 e4 c5'

const colunas = {
  c01: [`${B} 2 Nc3 Nc6 3 f4 g6 4 Nf3 Bg7 5 Bb5 Nd4 6 O-O Nxb5 7 Nxb5 d6 8 a4 Nf6 9 d3 O-O 10 Qe1 e6`, 'nc3', '2.Nc3 Nc6 3.f4 5.Bb5', '∞',
    'No Ataque Grand Prix as brancas jogam f4 e preparam um ataque na ala do rei com Qe1–h4. Com 5.Bb5 Nd4 as pretas trocam o bispo branco e ficam com o par de bispos; o jogo tem chances para os dois lados.'],
  c02: [`${B} 2 Nc3 Nc6 3 f4 g6 4 Nf3 Bg7 5 Bc4 e6 6 f5 Nge7 7 fxe6 fxe6 8 d3 d5 9 Bb3 b5 10 exd5 exd5`, 'nc3', '5.Bc4 e6 6.f5', '=',
    'Com 5.Bc4 e 6.f5 as brancas atacam de imediato. As pretas respondem com 8...d5 e 9...b5!, ganhando espaço com tempo, e a luta fica equilibrada.'],
  c03: [`${B} 2 Nc3 d6 3 f4 g6 4 Nf3 Bg7 5 Bc4 Nc6 6 O-O e6 7 d3 Nge7 8 Qe1 O-O 9 f5 d5 10 Bb3 c4`, 'nc3', '2...d6 3.f4', '=',
    'Com 2...d6 as pretas mantêm a opção de ...e6 e ...Nge7, que neutraliza o bispo de c4. Contra 9.f5 elas reagem no centro com 9...d5 e 10...c4, e igualam.'],
  c04: [`${B} 2 f4 d5 3 exd5 Nf6 4 Bb5+ Bd7 5 Bxd7+ Qxd7 6 c4 e6 7 dxe6 Qxe6+ 8 Qe2 Nc6 9 Qxe6+ fxe6 10 Na3 Nb4`, 'f4', '2.f4 d5 3.exd5 Nf6', '⩲',
    'Contra o 2.f4 imediato, 2...d5 é o golpe central clássico. Com 3...Nf6 as pretas oferecem um peão; as brancas trocam as damas e ficam com pequena vantagem no final.'],
  c05: [`${B} 2 f4 g6 3 d4 cxd4 4 Qxd4 Nf6 5 e5 Nc6 6 Qd3 Ng8 7 Be3 Bg7 8 Nc3 d6 9 exd6 Bf5 10 Qb5 Qxd6`, 'f4', '2...g6 3.d4', '=',
    'Com 2...g6 3.d4 cxd4 4.Qxd4 as brancas centralizam a dama, mas ela vira alvo. O cavalo recua com 6...Ng8!, as pretas atacam o centro com ...d6 e igualam.'],
  c06: [`${B} 2 f4 e6 3 Nf3 d5 4 Nc3 dxe4 5 Nxe4 Nf6 6 Bb5+ Bd7 7 Bxd7+ Nbxd7 8 Qe2 Be7 9 d3 O-O 10 O-O b5`, 'f4', '2...e6 3.Nf3 d5', '=',
    'Com 2...e6 e 3...d5 as pretas abrem o centro. Depois das trocas em e4 e d7 elas completam o desenvolvimento, avançam ...b5 e igualam. A coluna é Motwani–King, Dublin 1991.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '5... d6 6 Bxc6+ bxc6 7 O-O Nf6 8 d3 O-O 9 Qe1 Ne8 10 Qh4 f5 11 e5', { a: '⩲', c: 'Contra 5...d6, 6.Bxc6+ deixa as pretas com peões dobrados em c6, que limitam a atividade delas.' }],
  ['c01-a', '1', 'a', '(a) 5...e6', '5... e6 6 Bxc6 bxc6 7 e5', { a: '±', c: '5...e6?! 6.Bxc6 bxc6 7.e5 favorece as brancas.' }],
  ['c01-a', '2', 'a', '(a) 6.O-O', '6 O-O Bd7 7 d3 Nd4', { a: '=', c: '6.O-O Bd7 7.d3 Nd4 é menos forte que 6.Bxc6+.' }],
  ['c01-a-2', '1', 'a', '(a) 7...a6', '7... a6', { a: '=', c: '7...a6 também é igual.' }],
  ['c01', 'b-A', 'b', '(b) A', '6 Nxd4 cxd4 7 Ne2 Nf6 8 e5 Nd5 9 c4 Nb4 10 d3 a6 11 Ba4 b5', { a: '=', r: 'Lamm–Bator, Liga Sueca 2005', c: '6.Nxd4 cxd4 7.Ne2 Nf6 leva à igualdade.' }],
  ['c01-b-A', '1', 'b', '(b) A 8.Bd3', '8 Bd3 d6', { c: '8.Bd3 d6 é a alternativa.' }],
  ['c01', 'b-B', 'b', '(b) B', '6 Bd3 d6 7 Nxd4 cxd4 8 Ne2 e6 9 c3 dxc3 10 dxc3 Nf6 11 O-O O-O', { a: '=', r: 'Perelshteyn–Hjartarson, Nova York 1996', c: '6.Bd3 d6 7.Nxd4 cxd4 também é igual.' }],
  ['c01', 'c', 'c', '(c)', '7... d5 8 e5 d4 9 c3 a6 10 Na3 d3 11 Nc4 b5 12 Ne3 Nh6 13 b3 Nf5 14 Qe1 O-O 15 Ba3', { a: '±', r: 'Hebden–Thorsson, Kópavogur 1994', c: '7...d5 8.e5! d4: depois de manobras pouco ortodoxas, as brancas ficam com grande vantagem.' }],
  ['c01', 'd', 'd', '(d)', '11 Qh4 a6 12 Nxd6 Qxd6 13 e5 Qd8 14 f5 exf5 15 Bg5 Re8 16 Bxf6 Bxf6 17 exf6 Qd6', { a: '∞', r: 'Hráček–Alterman, Pula 1997', c: '11.Qh4 a6 12.Nxd6 leva a um jogo com chances para os dois lados.' }],
  // Coluna 2
  ['c02', 'e', 'e', '(e)', '6 O-O Nge7 7 d3 d5 8 Bb3 O-O 9 Qe1 Na5 10 Qh4 Nec6 11 Qf2 b6', { a: '=', r: 'Carlier–Rogers, Hungria 1991', c: 'Um jogo mais lento, como 6.O-O, facilita a defesa das pretas.' }],
  ['c02', 'f', 'f', '(f)', '6... gxf5 7 d3 Nge7 8 O-O d5 9 exd5 exd5 10 Bb3 Be6 11 Ne2 Qd7 12 c3 O-O-O 13 d4', { a: '⩲', r: 'Herman–Servat, Rosário 1992', c: '6...gxf5 7.d3 Nge7 8.O-O dá pequena vantagem às brancas.' }],
  ['c02', 'g', 'g', '(g)', '7... dxe6 8 d3 O-O 9 O-O Na5 10 Bb3 Nxb3 11 axb3 Nc6', { a: '=', r: 'Gabriel–Nutiu, Singapura 1990', c: '7...fxe6 é a recaptura mais comum. Mais segura e menos ambiciosa é 7...dxe6, com igualdade.' }],
  ['c02', 'h', 'h', '(h)', '11 O-O c4 12 dxc4 dxc4 13 Qxd8+ Nxd8 14 Nxb5 cxb3 15 Nc7+ Kd7 16 Nxa8 bxc2 17 Rf2 Bb7', { a: '=', r: 'Tishin–Rychagov, Tula 2002', c: '11.O-O c4 12.dxc4 dxc4 leva a complicações que terminam em igualdade.' }],
  ['c02-h', '1', 'h', '(h) 11.Nxb5', '11 Nxb5 Qa5+', { c: '11.Nxb5? é respondido com 11...Qa5+, que ganha o cavalo.' }],
  ['c02-h', '2', 'h', '(h) 11...Bxc3', '11... Bxc3 12 bxc3 c4 13 Ng5 Bf5 14 Qe2 cxb3 15 axb3', { c: 'Depois de 11...Bxc3 12.bxc3 c4 as brancas têm compensação pela peça.' }],
  // Coluna 3
  ['c03', 'i-A', 'i', '(i) A', '2... e6 3 f4 d5 4 Nf3', { c: '2...e6 3.f4 d5 4.Nf3 transpõe para a coluna 6.' }],
  ['c03', 'i-B', 'i', '(i) B', '2... g6 3 d4 cxd4 4 Qxd4 Nf6 5 Bb5 Nc6 6 Bxc6 dxc6 7 Qxd8+ Kxd8', { a: '=', r: 'Horváth–Kader, Keszthely 1994', c: '2...g6 3.d4 cxd4 4.Qxd4 Nf6 leva à igualdade.' }],
  ['c03-i-B', '1', 'i', '(i) B 3.f4', '3 f4 Bg7 4 Nf3 d6', { c: '3.f4 Bg7 4.Nf3 d6 volta à coluna.' }],
  ['c03', 'j', 'j', '(j)', '4 d4 cxd4 5 Qxd4 Nf6 6 e5 Nc6 7 Bb5 Nh5 8 Nf3 Bg7 9 O-O O-O', { a: '=', r: 'Christiansen–Ftáčnik, Groningen 1991', c: '4.d4 cxd4 5.Qxd4 Nf6 6.e5 Nc6 7.Bb5 Nh5! dá às pretas um jogo ativo.' }],
  ['c03', 'k', 'k', '(k)', '5 Bb5+ Bd7 6 Bxd7+ Qxd7 7 O-O Nc6 8 d3 Nf6 9 Qe1 O-O 10 Bd2 Rac8 11 Kh1 Nd4', { a: '=', r: 'C. Hansen–van Wely, Cap d\'Agde 1996', c: '5.Bb5+ Bd7 6.Bxd7+ Qxd7 leva à igualdade.' }],
  ['c03-k', '1', 'k', '(k) 6.a4', '6 a4 Nc6 7 d3 Nf6 8 Be3 O-O 9 h3 Ne8 10 O-O Nc7', { a: '=', r: 'Sigurjónsson–de Firmian, Reykjavík 1993', c: '6.a4 Nc6 7.d3 Nf6 também é igual.' }],
  ['c03', 'l', 'l', '(l)', '5... e6 6 d4 cxd4 7 Nxd4 Ne7 8 Bb3 O-O 9 O-O Nbc6 10 Be3', { a: '±', r: 'Short–Kolev, Burgas 1995', c: 'Depois de 5...e6?! as brancas mudam de plano com 6.d4! e jogam contra o peão d6.' }],
  ['c03', 'm', 'm', '(m)', '7 f5 exf5 8 d3 Nge7 9 Qe1 h6 10 Qg3 Ne5 11 Bb5+ Bd7', { a: '∓', r: 'Abramović–Kozul, Campeonato Iugoslavo 1986', c: '7.f5 exf5 8.d3 Nge7 9.Qe1 h6! deixa as pretas um pouco melhor.' }],
  ['c03-m', '1', 'm', '(m) 10.Bd2', '10 Bd2 fxe4', { a: '∓', c: '10.Bd2 fxe4 também favorece as pretas.' }],
  ['c03-m', '2', 'm', '(m) 10.exf5', '10 exf5 Bxf5 11 g4 Bxg4 12 Bxf7+ Kxf7 13 Ne5+ Kg8 14 Nxg4 Nd4', { a: '∓', r: 'Hellers–Gelfand, Olimpíada de Novi Sad 1990', c: '10.exf5 Bxf5 11.g4 Bxg4 12.Bxf7+ deixa as pretas um pouco melhor.' }],
  ['c03', 'n', 'n', '(n)', '11 dxc4 dxe4 12 f6 Bxf6 13 Nxe4 Bg7 14 Bg5 f6 15 Rd1 Qc7 16 Be3 b6', { a: '=', r: 'Wolff–Browne, Campeonato dos EUA 1995', c: '11.dxc4 dxe4 12.f6 Bxf6 13.Nxe4 leva à igualdade.' }],
  ['c03-n', '1', 'n', '(n) 11...d4', '11... d4 12 f6 Bxf6 13 e5 Bg7 14 Ne4 Nxe5 15 Nxe5 Bxe5 16 Bg5 f5 17 Qh4', { r: 'Mitkov–Stefánsson, Áustria 1991', c: '11...d4 12.f6! dá às brancas jogo contra o roque enfraquecido.' }],
  // Coluna 4
  ['c04', 'o', 'o', '(o)', '3... Qxd5 4 Nc3 Qd8 5 Nf3 Nf6 6 Ne5 e6 7 Qf3 Be7 8 b3 O-O 9 Bb2 Nfd7 10 Nxd7 Bxd7', { a: '=', r: 'Mas–Jiravorasuk, Sea Chess League 2001', c: 'O simples 3...Qxd5 está perfeitamente bem.' }],
  ['c04', 'p', 'p', '(p)', '11 Nh3 Nd3+ 12 Ke2 O-O-O 13 Nc2 e5 14 fxe5 Nxe5 15 b3', { a: '⩲', r: 'Kharlov–Senff, Amsterdã 2005', c: '11.Nh3 Nd3+ 12.Ke2 dá pequena vantagem às brancas.' }],
  // Coluna 5
  ['c05', 'q', 'q', '(q)', '3 Nf3 Bg7 4 Nc3 Nc6', { c: '3.Nf3 Bg7 4.Nc3 Nc6 transpõe para a coluna 1.' }],
  ['c05', 'r', 'r', '(r)', '9... Nf6 10 Bc5 exd6 11 Bxd6 Be6 12 O-O-O Qa5 13 Qb5', { a: '±', r: 'Hebden–Mokry, Copenhague 1985', c: '9...Nf6 10.Bc5! favorece as brancas.' }],
  // Coluna 6
  ['c06', 's-A', 's', '(s) A', '4 exd5 exd5 5 Bb5+ Bd7 6 Qe2+ Qe7 7 Ne5 a6', { a: '=', r: 'Seijas–Rodríguez, Candás 1992', c: '4.exd5 exd5 5.Bb5+ leva à igualdade.' }],
  ['c06', 's-B', 's', '(s) B', '4 e5 Nc6 5 c3 d4', { a: '=', c: '4.e5 pode transpor para a Francesa, mas as pretas também podem jogar 4...Nc6 5.c3 d4, com igualdade.' }],
  ['c06', 's-C', 's', '(s) C', '4 Bb5+ Bd7 5 Bxd7+ Nxd7 6 d3 Bd6 7 O-O Ne7 8 c4 d4', { a: '=', r: 'Minasian–Yudasin, Los Angeles 2003', c: '4.Bb5+ Bd7 5.Bxd7+ também é igual.' }],
  ['c06', 't', 't', '(t)', '5... Be7 6 d4 cxd4 7 Qxd4 Qxd4 8 Nxd4 a6 9 g3 Nf6 10 Bg2 Nbd7 11 Bd2', { a: '±', r: 'Adams–Lautier, Tilburg 1997', c: '5...Be7 6.d4! leva a um final em que, segundo Adams, as brancas têm vantagem considerável.' }],
  ['c06', 'u', 'u', '(u)', '6 Nxf6+ Qxf6 7 Ne5 Qxf4 8 Bb5+ Bd7 9 Qe2 Bxb5 10 Qxb5+ Nc6', { a: '∓', r: 'Wahls–Lutz, Alemanha 1994', c: '6.Nxf6+ Qxf6 7.Ne5? Qxf4 deixa as pretas um pouco melhor.' }],
]

const capitulo = {
  id: 'siciliana-f4',
  arquivo: 'siciliana-f4',
  nome: 'Siciliana — Ataque f4 (Grand Prix)',
  fonte: 'Modern Chess Openings — Sicilian Defense, f4 Attack (pp. 358–359), colunas 1–6',
  base: '1. e4 c5',
  corPadrao: 'b',
  ordem: 358,
  grupos: [
    { id: 'nc3', nome: '2.Nc3 e 3.f4', colunas: [1, 2, 3] },
    { id: 'f4', nome: '2.f4 direto', colunas: [4, 5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
