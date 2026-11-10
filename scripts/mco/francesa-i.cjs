// Transcrição do MCO 15ª ed. — Defesa Francesa, Tarrasch com 3...Nc6 (Linha Guimard) (pp. 239–241), colunas 85–90.
// Gerar: node scripts/mco/gerar.cjs francesa-i
// Formato: ver gambito-do-rei.cjs. Dicas em francesa-i-dicas.cjs.

const G = '1 e4 e6 2 d4 d5 3 Nd2 Nc6'
const K = `${G} 4 Ngf3 Nf6 5 e5 Nd7`

const colunas = {
  c85: [`${K} 6 Be2 f6 7 exf6 Qxf6 8 Nf1 Bd6 9 Ne3 O-O 10 O-O Qg6 11 g3 Nf6 12 Nh4 Qe8`, 'principal', '6.Be2', '⩲',
    'Na Linha Guimard, 3...Nc6, as pretas pressionam d4 e preparam ...e5. Depois de 4.Ngf3 Nf6 5.e5 Nd7 quebram com ...f6. Com 6.Be2 e a manobra Nf1–e3 as brancas ficam um pouco melhor.'],
  c86: [`${K} 6 Bd3 f6 7 exf6 Qxf6 8 O-O Nxd4 9 Nxd4 Qxd4 10 Re1 Nf6 11 Ne4 Bd7 12 Nxf6+ Qxf6`, 'principal', '6.Bd3', '±',
    'Com 6.Bd3 as brancas oferecem o peão de d4. As pretas o pegam, mas 11.Ne4! abre o jogo contra o rei preto, e as brancas ficam melhor.'],
  c87: [`${K} 6 Nb3 a5 7 a4 b6 8 Bg5 Be7 9 Qd2 h6 10 Bxe7 Nxe7 11 Nc1 c5 12 c3 O-O`, 'outros6', '6.Nb3', '±',
    'Com 6.Nb3 as brancas impedem ...c5 por algum tempo e trocam os bispos de casas escuras. O jogo das brancas no flanco do rei vale mais que o das pretas no da dama.'],
  c88: [`${K} 6 Bb5 a6 7 Bxc6 bxc6 8 Nb3 a5 9 Bg5 Be7 10 h4 h6 11 Be3 a4 12 Nc5 Nxc5`, 'outros6', '6.Bb5', '⩲',
    'Com 6.Bb5 as brancas trocam em c6 e deixam as pretas com peões dobrados; ficam com mais liberdade de manobra.'],
  c89: [`${K} 6 c3 f6 7 exf6 Qxf6 8 Be2 Bd6 9 Nf1 O-O 10 Ng3 Nb6 11 Be3 e5 12 dxe5 Nxe5`, 'outros6', '6.c3', '=',
    'Com 6.c3 as brancas reforçam d4, mas as pretas quebram com ...f6 e ...e5 e igualam.'],
  c90: [`${G} 4 c3 e5 5 exd5 Qxd5 6 Ngf3 exd4 7 Bc4 Qf5 8 Nxd4 Nxd4 9 cxd4 Be6 10 Qa4+ Bd7 11 Qb3 O-O-O 12 O-O Bd6`, 'c3', '4.c3', '⩲',
    'Com 4.c3 as brancas reforçam d4 e tiram a casa b4 do cavalo. As pretas precisam agir com 4...e5; depois das trocas no centro as brancas ficam com vantagem mínima.'],
}

const notas = [
  // Coluna 85
  ['c85', 'a', 'a', '(a)', '4... e5 5 Bb5 exd4 6 Nxd4 Bd7 7 Nxc6 bxc6 8 Bd3 Bc5 9 O-O Nf6 10 e5 Ng4 11 Nf3', { a: '±', r: 'Fiorito–Feige, Argentina 1997', c: '4...e5 é ambicioso demais: as brancas ficam melhor.' }],
  ['c85', 'b', 'b', '(b)', '6... Be7 7 Nf1 O-O 8 Ne3 f6 9 exf6 Nxf6 10 O-O Bd6 11 c4 b6 12 a3 Ne7 13 b4 dxc4 14 Nxc4 Nfd5 15 Bd3 h6 16 Re1', { a: '±', r: 'Psakhis–Drashko, Sarajevo 1984 (até 15...h6)', c: 'Com 6...Be7 as brancas ficam melhor depois de 16.Re1.' }],
  ['c85', 'c', 'c', '(c)', '7... Nxf6 8 O-O Bd6 9 Re1 O-O 10 c4 b6 11 b3 Bb7 12 Bb2', { a: '⩲', r: 'Svidler–Vysochin, Yurmala 1992', c: 'Com 7...Nxf6 as brancas ficam com uma vantagem simples.' }],
  ['c85', 'd', 'd', '(d)', '8... e5 9 Ne3 e4 10 Nxd5 Qd6 11 Bc4 exf3 12 O-O Nb6 13 Re1+ Kd7 14 Re6 Nxc4 15 Rxd6+ Nxd6 16 Bf4', { a: '±', r: 'Peters–Lakdawala, Long Beach 1992', c: 'Com 8...e5 as brancas ganham material depois de 14.Re6!.' }],
  ['c85', 'e', 'e', '(e)', '9... b6 10 O-O Bb7 11 c4 Ne7 12 b3 O-O-O 13 cxd5 exd5 14 a4', { a: '⩲', r: 'Oleksienko–Leniart, Ucrânia 2006', c: 'Com 9...b6 e roque grande as brancas ficam um pouco melhor.' }],
  ['c85', 'f', 'f', '(f)', '13 f4 Ne7 14 Bd3 c5 15 c3 b6 16 Qe2 Ne4 17 Ng4', { a: '⩲', r: 'D. Popović–Todorčević, Belgrado 2004', c: 'Depois de 13.f4 as brancas ficam um pouco melhor.' }],
  // Coluna 86
  ['c86', 'g', 'g', '(g)', '6... Nb4 7 Be2 c5 8 c3 Nc6 9 O-O', { a: '⩲', r: 'Nisipeanu–Soln, Trgovina 2002', c: 'Com 6...Nb4 se chega a posições parecidas com as de 3...Nf6 4.e5, mas as brancas ganharam tempo com o passeio do cavalo preto.' }],
  ['c86', 'h', 'h', '(h)', '7 Ng5 fxg5 8 Qh5+ g6 9 Bxg6+ hxg6 10 Qxg6+ Ke7 11 Ne4 Ndxe5 12 dxe5 Nxe5 13 Qf6+ Kd7 14 Qxe5 dxe4 15 Bxg5 Qe8 16 O-O-O+ Bd6 17 Qb5+ c6 18 Rxd6+ Kxd6 19 Rd1+ Kc7 20 Bf4+', { a: '+-', r: 'Hellers–Jacobsen, Groningen 1984', c: 'Uma bela partida curta: depois de 7.Ng5 fxg5? 8.Qh5+ as brancas atacam o rei, e com 18.Rxd6+! as pretas abandonaram.' }],
  ['c86-h', '1', 'h', '(h) 7...Ndxe5', '7... Ndxe5 8 dxe5 fxg5 9 Qh5+ Kd7 10 Nf3 g6 11 Qg4 Be7 12 Nxg5 Qg8 13 Qa4 h6 14 Nf3 Kd8', { a: '=', r: 'Nunn–Short, Campeonato Britânico 1979', c: 'As pretas se defendem melhor com 7...Ndxe5!: igual.' }],
  ['c86', 'i', 'i', '(i)', '8... Bd6 9 c4 O-O 10 Nb3 h6 11 Qe2 dxc4 12 Bxc4 Nb6 13 Bb5 Bd7 14 Be3 a6 15 Bd3', { a: '⩲', r: 'Emms–Titshoff, Münster 1995', c: 'É melhor recusar o peão com 8...Bd6. A coluna é Ghinda–Urzica, Romênia 1984.' }],
  ['c86', 'j', 'j', '(j)', '13 Qh5+ g6 14 Qxd5', { a: '±', c: 'Depois de 13.Qh5+ g6 14.Qxd5 as brancas ficam melhor. A coluna melhora o 12.Nd6+? de Zlatić–Sebestyen, Hungria 2003.' }],
  // Coluna 87
  ['c87', 'k-A', 'k', '(k) A', '6... Be7 7 Bb5 O-O 8 O-O Ncb8 9 c3 b6 10 Nbd2 Ba6 11 a4 c6 12 Bxa6 Nxa6 13 Qe2 Nc7 14 b3', { a: '⩲', r: 'Deep Junior–Hübner, Dortmund 2000', c: 'Com 6...Be7 as brancas ficam um pouco melhor.' }],
  ['c87', 'k-B', 'k', '(k) B', '6... f6 7 Bb5', { a: '±', c: '6...f6?! 7.Bb5 deixa as brancas melhor.' }],
  ['c87', 'l', 'l', '(l)', '13 Bd3 Ba6 14 O-O Bxd3 15 Nxd3 c4 16 Nf4 b5 17 axb5 Rb8 18 Rfe1 Rxb5 19 Ra2 Qb6 20 g4 Rb8 21 Re2', { a: '±', r: 'R. Byrne–Sahović, Reykjavík 1982', c: 'Depois de 13.Bd3 o jogo das brancas no flanco do rei tem mais potencial que a ação das pretas no flanco da dama.' }],
  // Coluna 88
  ['c88', 'm', 'm', '(m)', '8... c5 9 Bg5 Be7 10 Na5 Nxe5 11 Nxe5 Bxg5 12 Nac6 Qd6 13 Qh5 O-O 14 dxc5 Qxc5 15 Qxg5 f6', { a: '=', r: 'Stojanović–Berkes, Olimpíada de Turim 2006', c: 'Mais afiado é 8...c5: igual.' }],
  ['c88', 'n', 'n', '(n)', '13 dxc5 Ba6 14 Qd4 Bb5 15 Rh3 Qc8 16 O-O-O', { a: '⩲', r: 'Tolnai–Monin, Budapeste 1990 (até 14.Qd4)', c: 'Depois de 13.dxc5 as brancas ficam com mais liberdade de manobra.' }],
  // Coluna 89
  ['c89', 'o', 'o', '(o)', '8 Bb5 Bd6 9 Nf1 e5 10 dxe5 Ncxe5 11 Nxe5 Qxe5+', { a: '=', r: 'Radulov–Szabo, Montilla 1975', c: 'Com 8.Bb5 também fica igual.' }],
  ['c89', 'p', 'p', '(p)', '13 Bxb6 axb6 14 Qxd5+ Be6 15 Qxb7 Qf7 16 Rd1 Rxa2 17 O-O Rxb2', { a: '=', r: 'De Wit–Brynell, Bruxelas 1996', c: 'Depois de 13.Bxb6 as pretas recuperam o peão e o empate foi acordado.' }],
  // Coluna 90
  ['c90', 'q-A', 'q', '(q) A', '4... Nf6 5 e5 Nd7 6 Bd3 f5 7 g4', { a: '±', c: 'As pretas precisam agir. Se 4...Nf6 5.e5 Nd7 6.Bd3 f5, vem 7.g4!.' }],
  ['c90', 'q-B', 'q', '(q) B', '4... dxe4 5 Nxe4 Qd5 6 Bd3 e5 7 Qe2 Be6 8 f4 exf4 9 Nf3 O-O-O 10 Bxf4', { a: '±', r: 'Lauterbach–Dahlgrün, Haifa 1989', c: 'Com 4...dxe4 as brancas ficam melhor depois de 8.f4!.' }],
  ['c90', 'r', 'r', '(r)', '7... Qh5 8 cxd4 Be6 9 Bxe6 fxe6 10 Qb3 O-O-O 11 Qxe6+ Kb8', { a: '∞', r: 'Lucas–Maréchal, Béthune 2001', c: 'Interessante é 7...Qh5: as pretas entregam um peão e têm jogo por ele.' }],
  ['c90', 's', 's', '(s)', '13 Nf3 f6 14 Re1 Ne7 15 Bd2 Nc6', { a: '⩲', r: 'Simić–Praznik, Eslováquia 1996', c: 'Depois de 13.Nf3 as brancas ficam com vantagem mínima.' }],
  ['c90-s', '1', 's', '(s) 13.Bxf7', '13 Bxf7 Nh6', { c: 'Com 13.Bxf7 Nh6 as pretas ficam com o ataque.' }],
]

const capitulo = {
  id: 'francesa-i',
  arquivo: 'francesa-i',
  nome: 'Francesa — Tarrasch, Linha Guimard',
  fonte: 'Modern Chess Openings — French Defense (pp. 239–241), colunas 85–90',
  base: '1. e4 e6 2. d4 d5 3. Nd2 Nc6',
  corPadrao: 'b',
  ordem: 239,
  grupos: [
    { id: 'principal', nome: '4.Ngf3 Nf6 5.e5 Nd7: 6.Be2 e 6.Bd3', colunas: [85, 86] },
    { id: 'outros6', nome: '4.Ngf3 Nf6 5.e5 Nd7: outros sextos lances', colunas: [87, 88, 89] },
    { id: 'c3', nome: '4.c3', colunas: [90] },
  ],
}

module.exports = { capitulo, colunas, notas }
