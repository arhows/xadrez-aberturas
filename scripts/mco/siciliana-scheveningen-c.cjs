// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante Scheveningen, Ataque Keres (pp. 297–299), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs siciliana-scheveningen-c
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-scheveningen-c-dicas.cjs.
//
// A tabela só traz avaliação no fim da coluna 18; nas outras a avaliação vem da última nota.
// Nota (t): o livro escreve "16 g6 hxg6 17 h5 b4 18 hxg6 h6"; depois de ...hxg6 as pretas não têm mais peão h.
// Usei 16...fxg6, que deixa a sequência legal (e a casa f6 livre para 21...Nf6).

const B = '1 e4 c5 2 Nf3 e6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 d6 6 g4'

const colunas = {
  c13: [`${B} h6 7 g5 hxg5 8 Bxg5 Nc6 9 Qd2 Qb6 10 Nb3 a6 11 O-O-O Bd7 12 h4 Qc7 13 Be2 O-O-O 14 f4 Be7`, 'h6', '6...h6 7.g5', '⩲',
    'No Ataque Keres as brancas avançam 6.g4 logo, sem completar o desenvolvimento, para expulsar o cavalo de f6. A resposta mais segura é 6...h6, que segura espaço na ala do rei. Com 7.g5 hxg5 8.Bxg5 as brancas abrem a coluna g e ficam só um pouco melhor.'],
  c14: [`${B} h6 7 h4 Nc6 8 Rg1 h5 9 gxh5 Nxh5 10 Bg5 Nf6 11 Rg3 a6 12 Nxc6 bxc6 13 Qf3 Rb8 14 O-O-O Qb6`, 'h6', '7.h4 Nc6', '⩲',
    'Com 7.h4 as brancas preparam g5 sem trocar logo. Depois de 7...Nc6 8.Rg1 h5 o peão g é trocado, e as brancas mantêm a iniciativa.'],
  c15: [`${B} h6 7 h4 Be7 8 Rg1 d5 9 exd5 Nxd5 10 Nxd5 Qxd5 11 Bg2 Qc4 12 Be3 Bd7 13 Qe2 Qxe2+ 14 Kxe2 Nc6`, 'h6', '7...Be7 8.Rg1 d5', '⩲',
    'Com 7...Be7 e 8...d5 as pretas abrem o centro contra o ataque. As damas se trocam, e as brancas ficam só um pouco melhor no final.'],
  c16: [`${B} a6 7 g5 Nfd7 8 Be3 b5 9 a3 Bb7 10 h4 Nb6 11 h5 N8d7 12 g6 hxg6 13 hxg6 Rxh1 14 gxf7+ Kxf7`, 'outros', '6...a6', '±',
    'Com 6...a6 as pretas mantêm uma estrutura sólida, mas deixam a iniciativa às brancas. Depois de 12.g6! as brancas abrem a ala do rei e ficam melhor.'],
  c17: [`${B} Be7 7 g5 Nfd7 8 h4 Nc6 9 Be3 O-O 10 Qe2 Nxd4 11 Bxd4 a6 12 O-O-O b5 13 a3 Rb8 14 f4 Re8`, 'outros', '6...Be7', '±',
    'Com 6...Be7 as pretas rocam pequeno diante do ataque. As brancas avançam os peões da ala do rei e ficam claramente melhor.'],
  c18: [`${B} Nc6 7 g5 Nd7 8 Be3 a6 9 Qd2 Qc7 10 O-O-O Nxd4 11 Qxd4 b5 12 h4 Rb8 13 Kb1 b4 14 Na4`, 'outros', '6...Nc6', '⩲',
    'Com 6...Nc6 as pretas desenvolvem e esperam. Depois de 9.Qd2 e do roque grande as brancas ficam um pouco melhor (Hort–Andersson, Las Palmas 1973).'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '8... a6 9 Bg2 Bd7 10 Qe2 Be7 11 O-O-O Qc7 12 h4 Nc6 13 f4', { a: '⩲', r: 'Geller–Korchnoi, Moscou 1971', c: '8...a6 9.Bg2 Bd7 10.Qe2! deixa as brancas mais ativas do que na coluna.' }],
  ['c13', 'b', 'b', '(b)', '9... a6 10 O-O-O Bd7 11 h4 Be7 12 Be2 Nxd4 13 Qxd4 Qa5 14 Rhg1', { a: '⩲', r: 'Milos–Valerga, Continental Americano 2003', c: 'É bom expulsar o cavalo do centro. Com 9...a6 as brancas ficam um pouco melhor.' }],
  ['c13', 'c', 'c', '(c)', '12 f4 O-O-O 13 h4 Qc7 14 Bg2 Be7 15 Bf3', { c: '12.f4 O-O-O 13.h4 Qc7 14.Bg2 Be7 15.Bf3 é outra ordem de lances que chega à nota (f).' }],
  ['c13', 'd', 'd', '(d)', '13... b5 14 Rhe1 Be7 15 Kb1 b4 16 Nd5 exd5 17 exd5 Na5 18 Nd4 Kd8 19 Qf4 Kc8 20 Bf3', { a: '∞', r: 'Grünfeld–Akopian, Haifa 1995', c: 'Mais agudo é 13...b5; depois de 16.Nd5! as brancas têm ataque pela peça.' }],
  ['c13', 'e', 'e', '(e)', '14 h5 Be7 15 Qf4 Ne5 16 h6 Ng6 17 Qf3 Ne5 18 hxg7', { a: '⩲', r: 'van Riemsdijk–Paolozzi, Brasil 1986', c: 'Com 14.h5 Be7 15.Qf4!? e 18.hxg7! as brancas ficam um pouco melhor.' }],
  ['c13-e', '1', 'e', '(e) 15...e5', '15... e5 16 Qf3 Bg4 17 Qxf6 gxf6 18 Bxg4+ Kb8 19 Nd5', { a: '⩲', r: 'Tisdall–Jansa, Oslo 1988', c: '15...e5 16.Qf3 Bg4 17.Qxf6! também é bom para as brancas.' }],
  ['c13-e', '2', 'e', '(e) 14...Nxh5', '14... Nxh5 15 Bxh5 f6', { c: 'As pretas deviam tentar 14...Nxh5 15.Bxh5 f6.' }],
  ['c13', 'f', 'f', '(f)', '15 Bf3 g6 16 Ne2 Ne8 17 Bxe7 Nxe7 18 Qe3 e5', { a: '⩲', r: 'Palac–Stohl, Vinkovci 1995', c: 'Depois de 15.Bf3 as brancas ficam com uma vantagem muito pequena.' }],
  // Coluna 14
  ['c14', 'g-A', 'g', '(g) A', '7 Rg1 Nc6 8 h4', { c: '7.Rg1 Nc6 8.h4 é uma ordem de lances tão comum quanto a da coluna.' }],
  ['c14', 'g-B', 'g', '(g) B', '7 Be3 Nc6 8 f3 a6 9 Qe2 Nxd4 10 Bxd4 e5 11 Be3 Be6 12 O-O-O Rc8 13 Kb1 Rxc3 14 bxc3 Qa5', { a: '=', r: 'Volkmann–David, Plovdiv 2003', c: 'As brancas também já tentaram um plano mais lento com 7.Be3 e 8.f3; com o sacrifício de qualidade 13...Rxc3 fica igual.' }],
  ['c14', 'g-C', 'g', '(g) C', '7 Bg2 Nc6 8 h3 Bd7 9 Be3 a6 10 f4 Qc7 11 Qf3 Nxd4 12 Bxd4 e5 13 Be3 Bc6', { a: '∞', r: 'Svidler–Akopian, Rússia 1993', c: 'Com 7.Bg2 e 8.h3 o jogo fica pouco claro.' }],
  ['c14', 'h', 'h', '(h)', '8... d5 9 Bb5 Bd7 10 exd5 Nxd5 11 Nxd5 exd5 12 Be3 Be7 13 Qd2 Nxd4 14 Bxd7+ Qxd7 15 Qxd4 Bf6 16 Qb4', { a: '⩲', r: 'Hracek–Movsesian, Liga Tcheca 2005', c: 'Com 8...d5 9.Bb5 as brancas ficam um pouco melhor.' }],
  ['c14-h', '1', 'h', '(h) 12...Qxh4', '12... Qxh4 13 Qe2 Nxd4 14 Bxd4+ Qe7 15 Bxd7+ Kxd7 16 Be3 Rd8 17 O-O-O', { a: '⩲', r: 'Ashley–Salov, Nova York 1995', c: '12...Qxh4 13.Qe2 também deixa as brancas um pouco melhor.' }],
  ['c14', 'i', 'i', '(i)', '9 g5 Ng4 10 Be2 d5 11 Nxc6 bxc6 12 Bxg4 hxg4 13 Qxg4 d4 14 Ne2 Rb8', { a: '=', r: 'Schmittdiel–Adorján, Dortmund 1984', c: 'Com 9.g5 Ng4 10.Be2 d5! as pretas têm bom jogo pelo peão.' }],
  ['c14-i', '1', 'i', '(i) 11.Bxg4', '11 Bxg4 hxg4 12 g6 f6 13 exd5 exd5', { a: '=', c: '11.Bxg4 hxg4 12.g6 f6 é igual.' }],
  ['c14', 'j', 'j', '(j)', '10... Qb6 11 Nb3 a6 12 Qe2 Qc7 13 O-O-O b5 14 Bg2', { a: '±', r: 'Ljubojević–Kotronias, Olimpíada de Dubai 1986', c: 'Com 10...Qb6?! 11.Nb3 a6 12.Qe2! (agora uma casa mais ativa que d2) as brancas ficam melhor.' }],
  ['c14', 'k', 'k', '(k)', '11 Qd2 Qb6 12 Nb3 a6 13 O-O-O Bd7 14 Rg3 Qc7 15 Bg2 Nh5', { a: '=', r: 'Zhu Chen–Ehlvest, Gibraltar 2007', c: 'Com 11.Qd2 fica igual.' }],
  ['c14', 'l', 'l', '(l)', '15 b3 Nh5 16 Rg1 d5 17 Kb1 Bb4 18 Bh3 Qa5 19 Ne2 Bd7 20 c4', { a: '⩲', r: 'Morović–Veingold, Espanha 1993', c: 'Depois de 15.b3 e 20.c4! as brancas ficam com o ataque.' }],
  // Coluna 15
  ['c15', 'm', 'm', '(m)', '7... a6 8 Bg2 Nc6 9 g5 hxg5 10 hxg5 Rxh1+ 11 Bxh1 Nd7 12 f4 Qb6 13 Nde2 g6 14 b3 Qc5 15 Qd2 b5 16 Bb2 Bb7 17 O-O-O', { a: '⩲', r: 'Anand–J. Polgár, Madri 1993', c: 'Com 7...a6 8.Bg2 Nc6 as brancas ficam um pouco melhor.' }],
  ['c15', 'n', 'n', '(n)', '8 Bg2 Nc6 9 g5 hxg5 10 hxg5 Rxh1+ 11 Bxh1 Nh7 12 f4 g6 13 e5 dxe5 14 Nxc6 bxc6 15 Qxd8+ Kxd8 16 Bxc6 Rb8', { a: '=', r: 'Kruppa–Epishin, Minsk 1990', c: 'Agora 8.Bg2 não é tão eficaz, porque as pretas têm tempo na ala do rei; depois de 12...g6! e 13.e5 fica igual.' }],
  ['c15', 'o', 'o', '(o)', '15 Nxc6 Bxc6 16 Bxc6+ bxc6 17 Bd4 O-O 18 h5', { a: '⩲', r: 'Rasik–Jansa, Ostrava 1992', c: 'Depois de 15.Nxc6 as brancas ficam só um pouco melhor no final.' }],
  // Coluna 16
  ['c16', 'p', 'p', '(p)', '9... Nb6 10 Rg1 N8d7 11 f4 Qc7 12 Qf3 Nc5 13 f5', { a: '⩲', r: 'Papin–Trofimov, Rússia 2005', c: 'Com 9...Nb6 as brancas ficam um pouco melhor.' }],
  ['c16', 'q', 'q', '(q)', '10... Nc6 11 h5 Rc8 12 Rh3 Nde5 13 f4 Nxd4 14 Bxd4 Nc4 15 b3 Nb6 16 Qd2', { a: '±', r: 'Luther–Rotstein, Espanha 1994', c: 'Com 10...Nc6 11.h5 e 12.Rh3! as brancas ficam melhor.' }],
  ['c16', 'r-A', 'r', '(r) A', '14... Ke7 15 Qg4 Qc8 16 Qxe6+ Kd8 17 Qe8+ Kc7 18 Ne6+ Kc6 19 Nd5', { a: '+−', c: '14...Ke7? 15.Qg4 Qc8 16.Qxe6+ e 19.Nd5! ganha.' }],
  ['c16', 'r-B', 'r', '(r) B', '15 Qf3+ Qf6 16 Qxh1', { a: '±', r: 'Spasov–Mirzoev, La Roda 2005', c: 'Depois de 14...Kxf7 15.Qf3+ Qf6 16.Qxh1 as brancas ficam com vantagem clara.' }],
  // Coluna 17
  ['c17', 's', 's', '(s)', '9... a6 10 Qe2 Qc7 11 O-O-O b5 12 Nxc6 Qxc6 13 Bd4 b4 14 Nd5 exd5 15 Bxg7 Rg8 16 exd5 Qc7 17 Bf6 Ne5 18 Bxe5 dxe5 19 f4', { a: '∞', r: 'Karpov–Dorfman, Campeonato da URSS 1976', c: 'Com 9...a6 e 14.Nd5 as brancas sacrificam uma peça e têm boa compensação.' }],
  ['c17', 't-A', 't', '(t) A', '14... b4', { a: '±', c: 'Talvez 14...b4 seja melhor, embora as brancas ainda fiquem melhor.' }],
  ['c17', 't-B', 't', '(t) B', '15 Qh2 Bf8 16 g6 fxg6 17 h5 b4 18 hxg6 h6 19 axb4 Rxb4 20 f5 e5 21 Be3 Nf6 22 Bg5', { a: '±', r: 'Rogalewicz–Kjejdo, por correspondência 1993', c: 'Depois de 14...Re8 15.Qh2!? Bf8 16.g6! as brancas ficam claramente melhor.' }],
  // Coluna 18
  ['c18', 'u-A', 'u', '(u) A', '6... e5 7 Bb5+ Bd7 8 Bxd7+ Qxd7 9 Nf5 h5 10 gxh5 Nxh5 11 Bh6 Nc6 12 Qxh5 Ne7 13 Qg5 Nxf5 14 exf5 Rxh6 15 Nd5', { a: '±', r: 'Morović–Suba, Las Palmas 1995', c: '6...e5?! confundiu muitos jogadores de brancas, mas já se achou uma solução clara: 7.Bb5+ e 9.Nf5, com vantagem branca.' }],
  ['c18-u-A', '1', 'u', '(u) A 10...Nxe4', '10... Nxe4 11 Nxg7+', { a: '±', c: '10...Nxe4 11.Nxg7+ deixa as brancas melhor.' }],
  ['c18-u-A', '2', 'u', '(u) A 11...g6', '11... g6 12 Bxf8', { a: '±', c: '11...g6 12.Bxf8 também.' }],
  ['c18', 'u-B', 'u', '(u) B', '6... d5 7 exd5 Nxd5 8 Bb5+ Bd7 9 Nxd5', { c: 'O outro avanço central também é ruim: 6...d5 7.exd5 Nxd5 8.Bb5+ Bd7 9.Nxd5 deixa as pretas com peão isolado.' }],
  ['c18', 'v', 'v', '(v)', '8 Ndb5 Nb6 9 Bf4 Ne5 10 Qh5 Ng6 11 Be3 a6 12 Nd4 d5 13 O-O-O Bb4', { a: '∞', r: 'Mieske–Mochocki, por correspondência 1993', c: 'Com 8.Ndb5 as pretas ganham contrajogo.' }],
  ['c18', 'w-A', 'w', '(w) A', '8... Nb6 9 h4 d5 10 Bb5 Bd7 11 exd5 exd5 12 Qe2 Be7 13 O-O-O', { a: '±', r: 'A. Ivanov–Lesiège, Filadélfia 1991', c: 'Com 8...Nb6 9.h4 d5 as brancas ficam melhor.' }],
  ['c18', 'w-B', 'w', '(w) B', '8... Be7 9 h4', { c: '8...Be7 9.h4 transpõe para a coluna anterior.' }],
  ['c18', 'x', 'x', '(x)', '9 h4 Qc7 10 Qe2 b5 11 Nxc6 Qxc6 12 Bd4 b4 13 Nd5 a5', { a: '∞', r: 'Nunn–Howell, Londres 1990', c: '9.Qd2 é um lance antigo, mas provavelmente o melhor. Com 9.h4 Qc7 10.Qe2 b5 o jogo fica pouco claro.' }],
  ['c18-x', '1', 'x', '(x) 9.Bc4', '9 Bc4', { c: 'Uma ideia interessante é 9.Bc4!?, nos moldes do Ataque Velimirović.' }],
]

const capitulo = {
  id: 'siciliana-scheveningen-c',
  arquivo: 'siciliana-scheveningen-c',
  nome: 'Siciliana Scheveningen — Ataque Keres (6.g4)',
  fonte: 'Modern Chess Openings — Sicilian Defense, Scheveningen Variation, Keres Attack (pp. 297–299), colunas 13–18',
  base: '1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. g4',
  corPadrao: 'b',
  ordem: 297,
  grupos: [
    { id: 'h6', nome: '6...h6', colunas: [13, 14, 15] },
    { id: 'outros', nome: '6...a6, 6...Be7 e 6...Nc6', colunas: [16, 17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
