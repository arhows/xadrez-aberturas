// Transcrição do MCO 15ª ed. — Defesa Chigorin (pp. 489–490), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs chigorin
// Formato: ver gambito-do-rei.cjs. Dicas em chigorin-dicas.cjs.
//
// As colunas 1–4 não trazem avaliação no fim; usamos a avaliação da nota que continua cada coluna.
// As notas (k) e (n) não têm lances: o comentário foi para o resumo das colunas 3 e 4.
// Correção: na nota (i) o livro traz 6...Nge7; como o cavalo de c6 está cravado, o lance se escreve 6...Ne7.

const B = '1 d4 d5 2 c4 Nc6'
const N = `${B} 3 Nf3 Bg4`

const colunas = {
  c01: [`${N} 4 cxd5 Bxf3 5 gxf3 Qxd5 6 e3 e5 7 Nc3 Bb4 8 Bd2 Bxc3 9 bxc3 exd4 10 cxd4 Nge7`, 'nf3', '3.Nf3 Bg4 4.cxd5 Bxf3 5.gxf3', '±',
    'Com 3.Nf3 Bg4 as pretas trocam o bispo pelo cavalo para pressionar d4. Depois de 4.cxd5 Bxf3 5.gxf3 Qxd5 6.e3 e5 7.Nc3 Bb4 8.Bd2 Bxc3 9.bxc3 exd4 10.cxd4 Nge7 as brancas têm o par de bispos e ficam melhor (Ivanchuk–Brynell, Liga Sueca 2004).'],
  c02: [`${N} 4 cxd5 Bxf3 5 dxc6 Bxc6 6 Nc3 e6 7 e4 Bb4 8 f3 Qh4+ 9 g3 Qh5 10 Be3 O-O-O`, 'nf3', '5.dxc6', '±',
    'Com 5.dxc6 Bxc6 as brancas ficam com o centro de peões. Depois de 6.Nc3 e6 7.e4 Bb4 8.f3 Qh4+ 9.g3 Qh5 10.Be3 O-O-O as pretas pressionam d4, mas as brancas ficam melhor (Shulman–Savage, World Open 2002).'],
  c03: [`${N} 4 Qa4 Bxf3 5 gxf3 e6 6 Nc3 Bb4 7 cxd5 exd5 8 a3 Bxc3+ 9 bxc3 Ne7 10 Rb1 Rb8`, 'nf3', '4.Qa4', '=',
    'Com 4.Qa4 a dama crava o cavalo de c6. Depois de 4...Bxf3 5.gxf3 e6 6.Nc3 Bb4 7.cxd5 exd5 8.a3 Bxc3+ 9.bxc3 Ne7 10.Rb1 Rb8 o par de bispos compensa a estrutura das brancas, e o jogo tem equilíbrio dinâmico (Malaniuk–Morozevich, Alushta 1994).'],
  c04: [`${B} 3 Nc3 dxc4 4 Nf3 Nf6 5 e4 Bg4 6 Be3 e6 7 Bxc4 Bb4 8 Qc2 O-O 9 Rd1 Bxf3 10 gxf3 Nh5`, 'nc3', '3.Nc3 dxc4', '=',
    'Com 3.Nc3 dxc4 as pretas tomam o peão e jogam contra o centro. Depois de 4.Nf3 Nf6 5.e4 Bg4 (as brancas também têm 5.e3, 5.d5 e 5.Bg5) 6.Be3 e6 7.Bxc4 Bb4 8.Qc2 O-O 9.Rd1 Bxf3 10.gxf3 Nh5 o jogo é igual.'],
  c05: [`${B} 3 Nc3 Nf6 4 cxd5 Nxd5 5 e4 Nxc3 6 bxc3 e5 7 d5 Nb8 8 Be3 a6 9 Qb3 Nd7 10 Nf3 Bd6`, 'nc3', '3.Nc3 Nf6', '=',
    'Com 3...Nf6 as pretas deixam as brancas montar o centro para atacá-lo depois. Depois de 4.cxd5 Nxd5 5.e4 Nxc3 6.bxc3 e5 7.d5 Nb8 8.Be3 a6 9.Qb3 Nd7 10.Nf3 Bd6 o jogo é igual.'],
  c06: [`${B} 3 cxd5 Qxd5 4 e3 e5 5 Nc3 Bb4 6 Bd2 Bxc3 7 bxc3 Qd6 8 Bd3 Nge7 9 Ne2 O-O 10 O-O b6`, 'cxd5', '3.cxd5 Qxd5', '=',
    'Com 3.cxd5 Qxd5 a dama preta vai cedo ao centro. Depois de 4.e3 e5 5.Nc3 Bb4 6.Bd2 Bxc3 7.bxc3 Qd6 8.Bd3 Nge7 9.Ne2 O-O 10.O-O b6 o jogo é igual (Brenninkmeijer–Skembris, Wijk aan Zee 1995).'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '4 Nc3 e6 5 Bf4 Bxf3 6 gxf3 Bd6 7 Bg3 Nge7', { a: '=', r: 'Kramnik–Morozevich, Siemens Giants 2000', c: '4.Nc3 e6 5.Bf4 Bxf3 6.gxf3 Bd6 7.Bg3 Nge7 é igual.' }],
  ['c01-a', '1', 'a', '(a) 4...e5', '4... e5 5 cxd5 Bxf3 6 gxf3 exd4 7 dxc6 dxc3 8 cxb7', { a: '±', c: '4...e5 5.cxd5 Bxf3 6.gxf3 exd4 7.dxc6 dxc3 8.cxb7 é melhor para as brancas.' }],
  ['c01', 'b', 'b', '(b)', '5 exf3 Qxd5 6 Be3 O-O-O 7 Nc3 Qa5 8 Bb5 Nxd4 9 Bxd4 e5', { a: '∓', r: 'Svendsen–Reefschläger, Gausdal 1995', c: '5.exf3 Qxd5 6.Be3 O-O-O 7.Nc3 Qa5 8.Bb5 Nxd4 9.Bxd4 e5 é melhor para as pretas.' }],
  ['c01', 'c', 'c', '(c)', '6... e6 7 Nc3 Qh5 8 Bg2 O-O-O 9 f4 Qxd1+ 10 Kxd1 Nce7 11 Ke2 Nf6', { a: '=', r: 'Filipov–Miles, Aberto Carlos Torre 2000', c: '6...e6 é mais seguro: 7.Nc3 Qh5 8.Bg2 O-O-O 9.f4 Qxd1+ 10.Kxd1 Nce7 11.Ke2 Nf6 é igual. Mais tarde as pretas querem ...h6 e ...g5 para abrir a ala do rei.' }],
  ['c01', 'd', 'd', '(d)', '9... Qd6 10 Rb1 b6 11 f4 exf4 12 e4 Nge7 13 Qf3 Qa3 14 Qxf4 Qxa2 15 Rd1 Qe6 16 Be2', { a: '±', r: 'Sakaev–de Firmian, Copenhague 2005', c: '9...Qd6 10.Rb1 b6 11.f4 exf4 12.e4 Nge7 13.Qf3 Qa3 14.Qxf4 Qxa2 15.Rd1 Qe6 16.Be2 é melhor para as brancas.' }],
  ['c01', 'e', 'e', '(e)', '11 Bg2 O-O-O 12 Qb3 Qg5 13 Rg1 Qh5 14 Rb1', { a: '±', r: 'Ivanchuk–Brynell, Liga Sueca 2004', c: '11.Bg2 O-O-O 12.Qb3 Qg5 13.Rg1 Qh5 14.Rb1 é melhor para as brancas.' }],
  // Coluna 2
  ['c02', 'f', 'f', '(f)', '6... Nf6 7 f3 e5 8 dxe5 Nd7 9 e6 fxe6 10 e4', { a: '±', r: 'Schlenga–Knippel, Bundesliga 1989', c: '6...Nf6 7.f3 e5 8.dxe5 Nd7 9.e6 fxe6 10.e4 é melhor para as brancas.' }],
  ['c02', 'g', 'g', '(g)', '8... f5 9 Bc4', { c: '8...f5 9.Bc4 é arriscado, mas jogável.' }],
  ['c02', 'h', 'h', '(h)', '11 Bg2 f5 12 O-O Bxc3 13 bxc3 Nf6 14 exf5', { a: '±', r: 'Shulman–Savage, World Open 2002', c: '11.Bg2 f5 12.O-O Bxc3 13.bxc3 Nf6 14.exf5 é melhor para as brancas.' }],
  // Coluna 3
  ['c03', 'i', 'i', '(i)', '5 exf3 e6 6 Nc3 Ne7 7 Bg5', { a: '=', r: 'I. Ivanov–J. Watson, Nova York 1984', c: '5.exf3 e6 6.Nc3 Ne7 7.Bg5 é igual.' }],
  ['c03', 'j', 'j', '(j)', '5... e5 6 dxe5 Qh4 7 Rg1 Qxh2 8 cxd5 Qxg1', { a: '∞', r: 'Dubrinka–Segal, Roterdã 1998', c: '5...e5 6.dxe5 Qh4 7.Rg1 Qxh2 8.cxd5 Qxg1 dá uma posição desequilibrada e cheia de complicações.' }],
  // Coluna 4
  ['c04', 'l', 'l', '(l)', '4 d5 Ne5 5 Qd4 Ng6 6 e4 e5 7 Qxc4 Bd6', { a: '=', r: 'Goldin–Morozevich, São Petersburgo 1993', c: '4.d5 Ne5 5.Qd4 Ng6 6.e4 e5 7.Qxc4 Bd6 é igual.' }],
  ['c04', 'm', 'm', '(m)', '4... a6 5 d5 Nb8 6 e4 b5', { r: 'Spierings–Tait, Leeds 1990', c: '4...a6 5.d5 Nb8 6.e4 b5 é uma tentativa interessante das pretas: elas seguram o peão de c4.' }],
  ['c04', 'o', 'o', '(o)', '11 e5 Ne7 12 O-O c6', { a: '=', r: 'Diep–Deep Sjeng, Graz 2003', c: '11.e5 Ne7 12.O-O c6 é igual.' }],
  // Coluna 5
  ['c05', 'p', 'p', '(p)', '4 Nf3 Bg4 5 cxd5 Nxd5 6 e4', { a: '±', r: 'Rey–Leski, São Francisco 1987', c: '4.Nf3 dxc4 transpõe para a coluna 4, mas 4...Bg4 5.cxd5 Nxd5 6.e4 é melhor para as brancas.' }],
  ['c05', 'q', 'q', '(q)', '7 Nf3 exd4 8 cxd4 Bb4+ 9 Bd2 Qe7', { a: '∓', r: 'J. Watson', c: '7.Nf3 exd4 8.cxd4 Bb4+ 9.Bd2 Qe7 é melhor para as pretas: o peão de e4 fica atacado.' }],
  // Coluna 6
  ['c06', 'r', 'r', '(r)', '7 Bxc3 exd4 8 Ne2 Nf6 9 Nxd4 O-O 10 Nb5 Qg5 11 Nxc7 Bg4', { r: 'Bannick–Fercec, Oberwart 2003', c: '7.Bxc3 exd4 8.Ne2 Nf6 9.Nxd4 O-O 10.Nb5 Qg5! 11.Nxc7 Bg4 dá jogo muito ativo às pretas.' }],
  ['c06', 's', 's', '(s)', '7... exd4 8 cxd4 Nf6 9 Ne2', { a: '±', r: 'Burmakin–Marinšek, Liubliana 1994', c: '7...exd4 8.cxd4 Nf6 9.Ne2 é melhor para as brancas.' }],
]

const capitulo = {
  id: 'chigorin',
  arquivo: 'chigorin',
  nome: 'Defesa Chigorin',
  fonte: "Modern Chess Openings — Chigorin's Defense (pp. 489–490), colunas 1–6",
  base: '1. d4 d5 2. c4 Nc6',
  corPadrao: 'b',
  ordem: 488,
  grupos: [
    { id: 'nf3', nome: '3.Nf3 Bg4', colunas: [1, 2, 3] },
    { id: 'nc3', nome: '3.Nc3', colunas: [4, 5] },
    { id: 'cxd5', nome: '3.cxd5 Qxd5', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
