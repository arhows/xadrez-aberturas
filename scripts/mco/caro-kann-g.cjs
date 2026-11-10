// Transcrição do MCO 15ª ed. — Caro-Kann, 3...g6, Variante das Trocas e Fantasia (pp. 193–194), colunas 55–60.
// Gerar: node scripts/mco/gerar.cjs caro-kann-g
// Formato: ver gambito-do-rei.cjs. Dicas em caro-kann-g-dicas.cjs.

const D2 = '1 e4 c6 2 d4 d5'
const TR = `${D2} 3 exd5 cxd5 4 Bd3 Nc6 5 c3`

const colunas = {
  c55: [`${D2} 3 Nc3 g6 4 e5 Bg7 5 f4 h5 6 Be3 Nh6 7 Nf3 Bg4 8 h3 Bxf3 9 Qxf3 Nf5 10 Bf2 h4`, 'g6', '3.Nc3 g6', '⩲',
    'Com 3...g6 as pretas fazem o fianqueto sem trocar em e4. Contra 3.Nc3 as brancas fecham o centro com 4.e5 e 5.f4 e ficam com mais espaço.'],
  c56: [`${D2} 3 Nd2 g6 4 Ngf3 Bg7 5 h3 dxe4 6 Nxe4 Nd7 7 Bd3 Ngf6 8 O-O Nxe4 9 Bxe4 O-O 10 Bg5 h6`, 'g6', '3.Nd2 g6', '⩲',
    'Com 3.Nd2 as brancas mantêm o centro flexível; as pretas trocam em e4 e as brancas ficam com uma pequena vantagem com 10.Bg5!.'],
  c57: [`${TR} Nf6 6 Bf4 Bg4 7 Qb3 Qd7 8 Nd2 e6 9 Ngf3 Bxf3 10 Nxf3 Bd6`, 'trocas', 'Trocas: 5...Nf6 6.Bf4', '=',
    'Variante das Trocas: a estrutura é a da Defesa Eslava com cores invertidas. As brancas pressionam b7 com Qb3, mas com jogo preciso as pretas igualam.'],
  c58: [`${TR} Qc7 6 Ne2 Bg4 7 f3 Bd7 8 Na3 a6 9 Nc2 e6 10 Bf4 Bd6`, 'trocas', 'Trocas: 5...Qc7', '⩲',
    'Com 5...Qc7 as pretas impedem Bf4, mas as brancas forçam a troca dos bispos de casas escuras e ficam um pouco melhor.'],
  c59: [`${D2} 3 f3 dxe4 4 fxe4 e5 5 Nf3 Be6 6 Bg5 Be7 7 Bxe7 Qxe7 8 Nc3 Bg4 9 Bc4 Nd7 10 d5 Ngf6`, 'fantasia', 'Fantasia: 3...dxe4', '=',
    'Variante Fantasia: com 3.f3 as brancas sustentam e4 com outro peão. Depois de 3...dxe4 4.fxe4 e5 as pretas atacam o centro e igualam.'],
  c60: [`${D2} 3 f3 e6 4 Nc3 Bb4 5 Bf4 Nf6 6 Qd3 b6 7 Ne2 Ba6 8 Qe3 O-O 9 O-O-O Be7 10 g4 c5`, 'fantasia', 'Fantasia: 3...e6', '=',
    'Com 3...e6 as pretas jogam à maneira da Francesa; as brancas rocam grande e avançam no flanco do rei, mas as pretas igualam com ...c5.'],
}

const notas = [
  // Coluna 55
  ['c55', 'a', 'a', '(a)', '3... b5 4 a3', { a: '⩲', c: '3...b5?! 4.a3! simplesmente deixa as pretas com uma fraqueza no flanco da dama.' }],
  ['c55', 'b-A', 'b', '(b) A', '4 h3 dxe4 5 Nxe4 Bg7 6 Nf3', { c: '4.h3 dxe4 5.Nxe4 Bg7 6.Nf3 transpõe para a coluna seguinte.' }],
  // O livro continua 8...O-O 9 cxd5 Qxd5 10 Nc3 ±, mas o roque é impossível: o bispo de f8 não saiu.
  ['c55', 'b-B', 'b', '(b) B', '4 h3 Nh6 5 Bf4 f6 6 exd5 cxd5 7 Nb5 Na6 8 c4', { a: '⩲', c: 'As pretas também jogaram 4...Nh6!?. (O livro segue com 8...O-O, impossível porque o bispo de f8 ainda não saiu; a linha para em 8.c4!.)' }],
  ['c55', 'c', 'c', '(c)', '4... h5 5 Bd3 Nh6 6 Nce2 c5 7 c3', { a: '⩲', c: 'Com 4...h5 as brancas ficam um pouco melhor.' }],
  ['c55', 'd', 'd', '(d)', '8 Be2 Nf5 9 Bf2 e6 10 O-O Nd7 11 Qd2 Bf8', { a: '=', r: 'Horvath–Mohr, Bundesliga 2006', c: 'Com 8.Be2 as pretas igualam.' }],
  ['c55', 'e', 'e', '(e)', '11 Bd3 e6 12 O-O Nd7 13 b3 Bf8 14 Ne2', { a: '⩲', r: 'Hector–Hoi, Copenhague 2002', c: 'Depois de 11.Bd3 as brancas ficam um pouco melhor.' }],
  // Coluna 56
  ['c56', 'f', 'f', '(f)', '3... dxe4 4 Nxe4', { c: 'Claro que 3...dxe4 4.Nxe4 volta à linha principal. Esta coluna e a anterior mostram a diferença entre 3.Nc3 e 3.Nd2 se as pretas não capturam em e4.' }],
  ['c56', 'g', 'g', '(g)', '5... Nh6 6 Bd3 O-O 7 O-O f6 8 Re1 Nf7 9 c4 Na6 10 exd5 cxd5 11 Qb3 Nc7 12 cxd5 b6 13 Ne4', { a: '⩲', r: 'Svidler–Georgadze, Gausdal 1992', c: 'As pretas podem manter a posição fechada com o estranho 5...Nh6, mas as brancas ficam com a posição mais harmoniosa.' }],
  ['c56', 'h', 'h', '(h)', '11 Be3 c5 12 Qd2 cxd4 13 Bxh6', { a: '⩲', r: 'Chandler–Christiansen, Olimpíada de Salônica 1984', c: 'Depois de 11.Be3 c5 vem 12.Qd2!.' }],
  // Coluna 57
  ['c57', 'i', 'i', '(i)', '6 Nf3 Bg4 7 O-O e6', { a: '=', c: '6.Nf3 parece mais natural, mas 6...Bg4 7.O-O e6 dá igualdade rápida às pretas.' }],
  ['c57', 'j', 'j', '(j)', '6... g6 7 Nf3 Bg7 8 Nbd2 Bf5 9 Bxf5 gxf5 10 Ne5 Qb6', { a: '=', r: 'Spielmann–Sämisch, Berlim 1920', c: 'Com 6...g6 e 8...Bf5! também fica igual.' }],
  ['c57', 'k-A', 'k', '(k) A', '7... Qc8', { c: '7...Qc8 também é razoável.' }],
  ['c57', 'k-B', 'k', '(k) B', '7... Na5 8 Qa4+ Bd7 9 Qc2 e6 10 Nf3 Qb6 11 a4', { a: '⩲', r: 'Fischer–Petrosian, URSS x Resto do Mundo 1970', c: 'Com 7...Na5?! e 11.a4! (evitando a troca dos bispos de casas brancas) as brancas ficam um pouco melhor.' }],
  ['c57', 'l', 'l', '(l)', '11 Bxd6 Qxd6 12 O-O O-O 13 Rae1 Qc7 14 Qd1 Rab8 15 Re3 g6', { a: '=', r: 'Meister–Khalifman, Copa da Alemanha 2003', c: 'Os bispos se trocam e fica igual.' }],
  // Coluna 58
  ['c58', 'm', 'm', '(m)', '6... e6 7 Bf4 Bd6 8 Bxd6 Qxd6 9 Nd2 Nf6 10 f4 Ng4 11 Nf3', { a: '⩲', r: 'Meyer–Lein, Berlim 1984', c: 'Com 6...e6 e 10.f4! as brancas ficam um pouco melhor.' }],
  ['c58', 'n', 'n', '(n)', '11 Bxd6 Qxd6 12 O-O Nge7 13 Qd2', { a: '⩲', r: 'Lein–Goffman, EUA 1980', c: 'Depois da troca dos bispos as brancas ficam um pouco melhor.' }],
  // Coluna 59
  ['c59', 'o', 'o', '(o)', '5... exd4 6 Bc4 Be7 7 O-O Nf6 8 Ng5 O-O 9 Nxf7', { a: '±', c: '5...exd4 é arriscado: as brancas têm jogo rápido contra f7.' }],
  ['c59', 'p-A', 'p', '(p) A', '6 Nxe5 Qh4+', { a: '∓', c: 'Não 6.Nxe5? por 6...Qh4+.' }],
  ['c59', 'p-B', 'p', '(p) B', '6 c3 Nf6 7 Nxe5 Nxe4 8 Nf3 Be7 9 Bd3 Ng5 10 Nbd2 Nd7 11 O-O O-O 12 Qc2 h6 13 Kh1 Nxf3 14 Nxf3 Bd6 15 Bd2 Qa5', { a: '=', r: 'Adams–Seirawan, Bermudas 1999', c: 'Com 6.c3 também fica igual.' }],
  ['c59', 'q', 'q', '(q)', '11 h3 Bxf3 12 Qxf3 Nb6 13 Bb3 O-O', { a: '=', r: 'Murey–Seirawan, Nova York 1985', c: 'Ou 11.h3, igual.' }],
  // Coluna 60
  ['c60', 'r', 'r', '(r)', '3... g6 4 c3 Bg7 5 Na3 Nd7', { a: '∞', r: 'Vinogradov–Kopylov, URSS 1946', c: 'Com 3...g6 a posição fica pouco clara.' }],
  ['c60', 's', 's', '(s)', '11 exd5 Nxd5 12 Nxd5', { a: '=', r: 'McShane–Dreev, Esbjerg 2003', c: 'Depois de 11.exd5 fica igual.' }],
]

const capitulo = {
  id: 'caro-kann-g',
  arquivo: 'caro-kann-g',
  nome: 'Caro-Kann — 3...g6, Trocas e Fantasia',
  fonte: 'Modern Chess Openings — Caro-Kann Defense (pp. 193–194), colunas 55–60',
  base: '1. e4 c6 2. d4 d5',
  corPadrao: 'b',
  ordem: 193,
  grupos: [
    { id: 'g6', nome: '3...g6', colunas: [55, 56] },
    { id: 'trocas', nome: 'Variante das Trocas (3.exd5)', colunas: [57, 58] },
    { id: 'fantasia', nome: 'Variante Fantasia (3.f3)', colunas: [59, 60] },
  ],
}

module.exports = { capitulo, colunas, notas }
