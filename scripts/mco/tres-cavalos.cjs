// Transcrição do MCO 15ª ed. — Jogo dos Três Cavalos (pp. 129–131).
// Gerar: node scripts/mco/gerar.cjs tres-cavalos
// Formato: ver gambito-do-rei.cjs. Dicas em tres-cavalos-dicas.cjs.

const T3 = '1 e4 e5 2 Nf3 Nc6 3 Nc3'

const colunas = {
  c01: [`${T3} g6 4 d4 exd4 5 Nd5 Bg7 6 Bg5 Nce7 7 Nxd4 h6 8 Bh4 c6 9 Nc3 Qb6 10 Nb3 a5 11 a4 d5`, 'g6', '3...g6 4.d4 exd4 5.Nd5 Bg7 6.Bg5 Nce7 7.Nxd4', '⩲',
    'Jogo dos Três Cavalos: as pretas evitam a simetria dos Quatro Cavalos com 3...g6. Depois de 4.d4 exd4 5.Nd5 as brancas ganham tempo atacando com Bg5, e ficam um pouco melhor.'],
  c02: [`${T3} g6 4 d4 exd4 5 Nd5 Bg7 6 Bg5 Nce7 7 e5 h6 8 Bxe7 Nxe7 9 Qxd4 Nxd5 10 Qxd5 O-O 11 O-O-O d6`, 'g6', '5.Nd5: 7.e5', '∞',
    'Com 7.e5 as brancas ganham espaço e trocam peças, mas as pretas entregam um peão e ficam com compensação.'],
  c03: [`${T3} g6 4 d4 exd4 5 Nxd4 Bg7 6 Be3 Nf6 7 Nxc6 bxc6 8 e5 Ng8 9 Bd4 Qe7 10 Qe2 f6 11 exf6 Nxf6`, 'g6', '5.Nxd4 Bg7 6.Be3 Nf6 7.Nxc6', '⩲',
    'Com 5.Nxd4 o jogo lembra uma Escocesa. Depois de 7.Nxc6 e 8.e5 as brancas ficam um pouco melhor.'],
  c04: [`${T3} g6 4 d4 exd4 5 Nxd4 Bg7 6 Be3 Nf6 7 Qd2 O-O 8 O-O-O Re8 9 f3 d5 10 Nxc6 bxc6 11 Bh6 Bh8`, 'g6', '5.Nxd4: 7.Qd2 e roque grande', '±',
    'Com 7.Qd2 e o roque grande as brancas atacam o rei preto com Bh6. As pretas reagem com ...d5, mas as brancas ficam melhor.'],
  c05: [`${T3} Bb4 4 Nd5 Ba5 5 Bc4 Nf6 6 O-O d6 7 d3 h6 8 c3 Nxd5 9 exd5 Ne7 10 d4 exd4 11 Qa4+ c6`, 'outros', '3...Bb4 4.Nd5', '⩲',
    '3...Bb4 é pouco jogado. As brancas atacam o bispo com Nd5 e costumam ficar só com uma pequena vantagem.'],
  c06: [`${T3} Bc5 4 Nxe5 Nxe5 5 d4 Bd6 6 dxe5 Bxe5 7 Bd3 Qh4 8 Nd5 Ne7 9 g3 Qh3 10 Nxe7 Kxe7 11 f4 Qg2`, 'outros', '3...Bc5 4.Nxe5 Nxe5 5.d4', '+−',
    '3...Bc5 é mais arriscado: esbarra no clássico garfo de peão 4.Nxe5 Nxe5 5.d4. Apesar das tentativas de melhorar a linha, as brancas mantêm a vantagem.'],
}

const notas = [
  ['c01', 'a', 'a', '(a)', '4 Bc4 Bg7 5 a3 d6 6 d3 h6 7 O-O', { a: '=', r: 'Pedrich–Grabarczyk, Polônia 1991', c: 'Com 4.Bc4 o jogo fica igual.' }],
  ['c01', 'b-A', 'b', '(b) A', '5... Nb4 6 Bg5 f6 7 Nxf6+ Nxf6 8 e5 Nbd5 9 Qxd4 c5 10 Qh4 Qa5+ 11 Bd2 Qb6 12 O-O-O', { a: '±', c: 'Com 5...Nb4 as brancas ganham um ataque perigoso.' }],
  ['c01', 'b-B', 'b', '(b) B', '5... h6 6 Nxd4 Nf6 7 Nb5 Nxd5 8 exd5 a6 9 Qe2+', { a: '±', r: 'Volchok–Kots, URSS 1962', c: 'Com 5...h6 também.' }],
  ['c01', 'c-A', 'c', '(c) A', '6... Nge7 7 Nxd4 Bxd4 8 Qxd4', { a: '+−', c: '6...Nge7? perde: 8.Qxd4! ganha.' }],
  ['c01', 'c-B', 'c', '(c) B', '6... f6 7 Bf4 d6 8 Nxd4 Nge7 9 Bc4 Ne5 10 Bb3', { a: '±', r: 'Lemmer–Naiditsch, Bélgica 2004', c: 'Com 6...f6 as brancas ficam melhor.' }],
  ['c01', 'd', 'd', '(d)', '7... c6 8 Nxe7 Nxe7 9 Qd2 h6 10 Bh4 d5 11 O-O-O O-O 12 exd5 g5 13 Bg3 Qxd5 14 c4', { a: '⩲', r: 'Jonkman–Krasenkow, Wijk aan Zee 2002', c: 'Com 7...c6 as brancas ficam um pouco melhor.' }],
  ['c01', 'e', 'e', '(e)', '8 Bf4', { a: '=', r: 'Lehmann–Keres, Alemanha Ocidental × URSS 1966', c: 'Com 8.Bf4 o jogo ficou igual. (O livro continua 8...d5, impossível com o cavalo branco em d5; a sequência exata não fecha.)' }],
  ['c01', 'f', 'f', '(f)', '10... d5 11 Bd3 Be6 12 O-O dxe4 13 Nxe4', { a: '⩲', r: 'Bhend–Ackermann, Brocco 1991', c: 'Com 10...d5 as brancas ficam um pouco melhor.' }],
  ['c01', 'g', 'g', '(g)', '12 Bd3 Nf6 13 O-O dxe4 14 Bxf6 Bxf6 15 Nxe4', { a: '⩲', r: 'Bisguier–Keres, Gotemburgo 1955 (até 13...dxe4)', c: 'Com 14.Bxf6 e 15.Nxe4 as brancas ganham uma pequena vantagem.' }],
  ['c02', 'h', 'h', '(h)', '7 Bc4 c6 8 Nxe7 Nxe7 9 O-O', { a: '=', r: 'Honfi–Radovici, Kecskemét 1962', c: 'Com 7.Bc4 o jogo fica igual.' }],
  ['c02', 'i', 'i', '(i)', '8 Bh4 g5 9 Nxe7 Qxe7 10 Bg3 f5', { a: '=', r: 'análise de Zukertort', c: 'Com 8.Bh4 o jogo fica igual.' }],
  ['c02', 'j', 'j', '(j)', '12 h3 Be6 13 Qxb7 Rb8 14 Qe4 Qe8 15 Re1 c5 16 b3 Rb4', { a: '∞', r: 'Osman–Tisdall, Capelle-la-Grande 1993', c: 'As pretas têm compensação pelo peão.' }],
  ['c03', 'k', 'k', '(k)', '6... Nge7 7 Qd2 O-O 8 O-O-O d6 9 Kb1 a6 10 h4 h5 11 Nxc6 Nxc6 12 Bg5', { a: '⩲', r: 'Leko–Alterman, Munique 1991', c: 'Com 6...Nge7 as brancas ficam um pouco melhor.' }],
  ['c03', 'l', 'l', '(l)', '8... Nd5 9 Nxd5 cxd5 10 Qxd5 Rb8 11 O-O-O', { a: '±', r: 'Berg–Santos, Olimpíada de Bled 2002', c: 'Com 8...Nd5 as brancas ficam melhor.' }],
  ['c03', 'm', 'm', '(m)', '10... Qe6 11 Ne4 d6 12 Ng5', { a: '±', r: 'Radu–Dąbrowska, Singapura 1990', c: 'Com 10...Qe6 as brancas ficam melhor.' }],
  ['c04', 'n-A', 'n', '(n) A', '8... Nxd4 9 Bxd4 d6 10 f3 Be6 11 g4 c5 12 Be3 Qa5 13 Bh6', { a: '±', r: 'Yurtaev–Gulko, Frunze 1985', c: 'Com 8...Nxd4 as brancas ficam melhor.' }],
  ['c04', 'n-B', 'n', '(n) B', '8... Ng4 9 Nxc6 bxc6 10 Bd4 Bxd4 11 Qxd4 Qf6 12 h3 Qxd4 13 Rxd4', { a: '⩲', r: 'Am. Rodríguez–Lima, Matanzas 1992', c: 'Com 8...Ng4 as brancas ficam um pouco melhor.' }],
  ['c04', 'o', 'o', '(o)', '9 Nxc6 bxc6 10 Bg5 Qe7 11 Bc4 Qe5 12 Rde1 d6 13 f4 Qa5 14 e5', { a: '±', r: 'Abdel–van der Sterren, Lucerna 1989', c: 'Com 9.Nxc6 as brancas também ficam melhor.' }],
  ['c04', 'p-A', 'p', '(p) A', '10 Bb5 Bd7 11 exd5 Nxd4 12 Bxd4 Bxb5 13 Nxb5 Qxd5 14 Nxc7 Qxa2 15 c3 Rec8', { a: '∞', r: 'Malakhov–Geller, Rússia 1994', c: 'Com 10.Bb5 a posição fica confusa.' }],
  ['c04-p-A', '1', 'p', '(p) A 14.Nc3', '14 Nc3 Qc6', { a: '=', r: 'Braun–Geller, Dortmund 1992', c: 'Com 14.Nc3 o jogo fica igual.' }],
  ['c04', 'p-B', 'p', '(p) B', '10 exd5 Nxd5 11 Nxc6 bxc6 12 Nxd5 Qxd5', { a: '=', r: 'Vehí Bach–Barón Rodríguez, Pamplona 2002', c: 'Com 10.exd5 o jogo fica igual.' }],
  ['c04', 'q', 'q', '(q)', '12 exd5 Nxd5 13 Bc4', { a: '±', r: 'Svidler–Geller, Moscou 1992', c: 'As brancas ficam claramente melhor.' }],
  ['c05', 'r-A', 'r', '(r) A', '4... Nf6 5 Nxb4 Nxb4 6 Nxe5 Qe7 7 d4 d6 8 a3 dxe5 9 axb4 exd4 10 Qxd4', { a: '⩲', r: 'análise de Belavenets', c: 'Com 4...Nf6 as brancas ficam um pouco melhor.' }],
  ['c05', 'r-B', 'r', '(r) B', '4... Be7 5 d4 d6 6 Bb5 Bg4 7 dxe5 dxe5 8 h3 Bd7 9 Qe2', { a: '±', r: 'Botvinnik–Smyslov, Sverdlovsk 1943', c: 'Com 4...Be7 as brancas ficam melhor.' }],
  ['c05', 's', 's', '(s)', '5 c3 d6 6 b4 Bb6 7 a4 a6 8 Nxb6', { a: '⩲', r: 'análise de Keres', c: 'Com 5.c3 as brancas ficam um pouco melhor.' }],
  ['c05', 't', 't', '(t)', '8... O-O 9 b4 Bb6 10 a4', { a: '⩲', r: 'Alekhine–Cohn, Carlsbad 1911', c: 'Com 8...O-O as brancas ficam um pouco melhor.' }],
  ['c05', 'u', 'u', '(u)', '12 dxc6 bxc6 13 Nxd4 Bd7 14 Re1', { a: '⩲', r: 'Leonhardt–Tarrasch, Hamburgo 1919', c: 'As brancas ficam com uma pequena vantagem.' }],
  ['c06', 'v-A', 'v', '(v) A', '3... f5 4 d4 fxe4 5 Nxe5 Nf6 6 Bc4 d5 7 Nxd5 Nxd5 8 Qh5+ g6 9 Nxg6 hxg6 10 Qxg6+ Kd7 11 Bxd5', { a: '±', r: 'Breyer–Balla, Pistyan 1912', c: 'Com 3...f5 as brancas ficam melhor.' }],
  ['c06', 'v-B', 'v', '(v) B', '3... Nge7 4 Bc4 Ng6 5 d4 exd4 6 Nxd4 Bb4 7 O-O Bxc3 8 bxc3 O-O 9 f4 Na5 10 Bd3', { a: '±', r: 'Goldenov–Bakulin, URSS 1965', c: 'Com 3...Nge7 também.' }],
  ['c06', 'w-A', 'w', '(w) A', '7 f4 Bxc3+ 8 bxc3 Qe7 9 Qd4 Nf6 10 e5 d6 11 Be2 dxe5', { a: '∞', r: 'análise de Romanishin', c: 'Com 7.f4 há chances para os dois lados.' }],
  ['c06', 'w-B', 'w', '(w) B', '7 Bc4 Nf6 8 O-O O-O 9 Bg5', { a: '⩲', r: 'Nepeina–Litinskaya, Simferopol 1992', c: 'Com 7.Bc4 as brancas ficam um pouco melhor.' }],
  ['c06', 'x', 'x', '(x)', '7... d6 8 O-O Qh4 9 f4 Bd4+ 10 Kh1', { a: '±', r: 'Verlinsky–Kubbel, URSS 1922', c: '7...Qh4 é a patente de Romanishin; com 7...d6 as brancas ficam claramente melhor.' }],
  ['c06', 'y', 'y', '(y)', '8 Bd2 Nf6 9 Qe2 O-O 10 g3 Qh3 11 f4 Bxc3 12 Bxc3 d6 13 Bxf6', { a: '±', r: 'Zarnick–Fressinet, ACP Blitz 2004', c: 'Com 8.Bd2 as brancas também ficam melhor.' }],
  ['c06', 'z-A', 'z', '(z) A', '8... c6 9 Ne3 Ne7 10 g3 Qh3 11 f4', { a: '±', c: 'Com 8...c6 as brancas ficam melhor.' }],
  ['c06', 'z-B', 'z', '(z) B', '8... Nf6 9 Ne3 Nxe4 10 Qe2 Nc5 11 Nd5 Nxd3+ 12 cxd3', { a: '±', r: 'análise de Glek', c: 'Com 8...Nf6 também.' }],
  ['c06', 'aa', 'aa', '(aa)', '12 Rf1 Bd4 13 Qh5 d5 14 Bd2 Rd8 15 f5 Bxb2 16 Rd1 dxe4 17 Bc4', { a: '+−', r: 'Glek–Romanishin, Biel 1996', c: 'Depois de 17.Bc4 as pretas abandonaram.' }],
]

const capitulo = {
  id: 'tres-cavalos',
  arquivo: 'tres-cavalos',
  nome: 'Jogo dos Três Cavalos',
  fonte: 'Modern Chess Openings — Three Knights’ Game (pp. 129–131), colunas 1–6',
  base: '1. e4 e5 2. Nf3 Nc6 3. Nc3',
  corPadrao: 'w',
  ordem: 129,
  grupos: [
    { id: 'g6', nome: '3...g6 4.d4 exd4', colunas: [1, 2, 3, 4] },
    { id: 'outros', nome: '3...Bb4 e 3...Bc5', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
