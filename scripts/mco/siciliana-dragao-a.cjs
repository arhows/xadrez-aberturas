// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante do Dragão: Ataque Iugoslavo, Linha Soltis (pp. 272–273), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs siciliana-dragao-a
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-dragao-a-dicas.cjs.
//
// A tabela não traz avaliação no fim das colunas; a avaliação de cada coluna vem da sua última nota.
// Nota (u): o livro escreve "23...Rxc1" sem xeque; o lance dá xeque (Rxc1+).

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 g6 6 Be3 Bg7 7 f3 Nc6 8 Qd2 O-O 9 Bc4 Bd7 10 O-O-O Rc8 11 Bb3 Ne5 12 h4 h5'

const colunas = {
  c01: [`${B} 13 Bg5 Rc5 14 Kb1 b5 15 g4 a5 16 gxh5 a4 17 h6 Bh8 18 h7+ Nxh7 19 Bd5 Bg7`, 'bg5', '13.Bg5 Rc5 14.Kb1 b5', '⩲',
    'Na Linha Soltis as pretas travam o avanço com 12...h5. O sutil 13.Bg5 é a tentativa mais forte. Com 14...b5 15.g4 as brancas abrem a ala do rei e, depois de 17.h6!, ficam um pouco melhor.'],
  c02: [`${B} 13 Bg5 Rc5 14 Kb1 Re8 15 Rhe1 Qa5 16 a3 Qa6 17 f4 Nc4 18 Bxc4 Rxc4 19 e5 Nh7`, 'bg5', '14...Re8', '=',
    'Com 14...Re8 as pretas defendem e7 e esperam. Depois de 16...Qa6! e da troca em c4 o jogo termina em xeque perpétuo.'],
  c03: [`${B} 13 Bg5 Rc5 14 f4 Nc4 15 Qd3 Ng4 16 Bxc4 Nf2 17 Qe2 Nxh1 18 Bb3 Qb6 19 f5 Bxd4`, 'bg5', '14.f4', '⩲',
    'Com 14.f4 as brancas atacam o cavalo de e5. As pretas ganham a qualidade com ...Nf2 e ...Nxh1, mas o cavalo fica preso e as brancas ficam um pouco melhor.'],
  c04: [`${B} 13 Bh6 Bxh6 14 Qxh6 Rxc3 15 bxc3 Qc7 16 Kb1 Rc8 17 g4 Qxc3 18 gxh5 Nc4 19 Bxc4 Rxc4`, 'outros13', '13.Bh6', '=',
    'Com 13.Bh6 as brancas trocam o bispo do Dragão. A resposta típica é o sacrifício de qualidade 14...Rxc3!, que destrói o roque branco; fica igual.'],
  c05: [`${B} 13 Kb1 Nc4 14 Bxc4 Rxc4 15 Nde2 b5 16 Bh6 Qa5 17 Bxg7 Kxg7 18 Nf4 Rfc8 19 Ncd5 Qxd2`, 'outros13', '13.Kb1', '=',
    'Com 13.Kb1 as brancas tiram o rei da diagonal. As pretas trocam o bispo de b3, avançam ...b5 e igualam com a troca das damas.'],
  c06: [`${B} 13 g4 hxg4 14 h5 Nxh5 15 Bh6 e6 16 Rdg1 Qf6 17 Bxg7 Qxg7 18 fxg4 Nf6 19 Rh4 g5`, 'outros13', '13.g4', '∓',
    'O sacrifício 13.g4 abre a coluna h, mas com 15...e6! e ...Qf6 as pretas defendem e ficam melhor.'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '13... Nc4 14 Qe2 Na5 15 Kb1', { a: '⩲', r: 'Geller–Miles, Linares 1983', c: 'Com 13...Nc4 14.Qe2! as brancas ficam seguras na ala da dama e prontas para agir na ala do rei.' }],
  ['c01', 'b', 'b', '(b)', '15 Rhe1 a5 16 f4 Nc4 17 Bxc4 Rxc4 18 e5 b4 19 Ncb5 dxe5 20 fxe5 Nd5', { a: '∞', r: 'van Kempen–Poli, por correspondência 1996', c: 'Com 15.Rhe1 as chances ficam para os dois lados.' }],
  ['c01-b', '1', 'b', '(b) 16...Neg4', '16... Neg4 17 e5 a4 18 Bxf7+ Rxf7 19 e6', { a: '±', r: 'Tornai–Horváth, Budapeste 1994', c: '16...Neg4?! 17.e5! a4 18.Bxf7+ deixa as brancas melhor.' }],
  ['c01-b-1', '1', 'b', '(b) 17...b4', '17... b4 18 Na4', { a: '±', c: 'Com 17...b4 18.Na4 também.' }],
  ['c01-b', '2', 'b', '(b) 19...Qb6', '19... Qb6 20 Nxd6 exd6 21 exf6', { a: '+−', r: 'Santo Román–Moingt, Cannes 1993', c: '19...Qb6? 20.Nxd6! ganha.' }],
  ['c01', 'c', 'c', '(c)', '15... hxg4 16 h5 Rxc3 17 bxc3 Nxf3 18 Nxf3 Nxe4 19 Qh2 Nxc3+ 20 Kc1 Qa5', { a: '=', r: 'Srba–Tupy, Eslováquia 2004', c: 'Com 15...hxg4 16.h5 as pretas sacrificam a qualidade em c3 e igualam.' }],
  ['c01-c', '1', 'c', '(c) 16...Nxh5', '16... Nxh5 17 Nd5 Re8 18 Rxh5 gxh5 19 Qh2', { a: '±', r: 'Vouldis–Tiviakov, Plovdiv 2003', c: '16...Nxh5?! 17.Nd5 e 18.Rxh5! dá ataque às brancas.' }],
  ['c01', 'd', 'd', '(d)', '16... Nxh5 17 Nd5 Re8 18 Nf4 Nc4 19 Bxc4 Rxc4 20 Nxh5 Rxd4 21 Qg2', { a: '±', r: 'Smirnov–Konguvei, Win TV 2004', c: 'Com 16...Nxh5 17.Nd5 e 18.Nf4! as brancas ficam melhor.' }],
  ['c01', 'e', 'e', '(e)', '18 Bd5 Kh7', { a: '⩱', c: 'Com 18.Bd5?! Kh7! o rei preto fica escondido na coluna h e as pretas ficam um pouco melhor.' }],
  ['c01', 'f', 'f', '(f)', '20 Be3 e6 21 Nxe6 Bxe6 22 Bxc5', { a: '⩲', r: 'Smirnov–Golubev, Izmir 2004', c: 'Depois de 20.Be3 as brancas ganham a qualidade e ficam um pouco melhor.' }],
  // Coluna 2
  ['c02', 'g-A', 'g', '(g) A', '15 g4 hxg4 16 h5 Nxh5 17 Nd5 Rxd5 18 exd5 Nxf3 19 Nxf3 gxf3', { a: '⩱', r: 'Martin–Mestel, Lloyds Bank 1994', c: 'Com 15.g4?! as pretas sacrificam a qualidade em d5 e ficam um pouco melhor.' }],
  ['c02-g-A', '1', 'g', '(g) A 17.f4', '17 f4', { c: '17.f4!? merece atenção.' }],
  ['c02', 'g-B', 'g', '(g) B', '15 f4 Nc4 16 Qd3 Qc8 17 f5 Ne5 18 Qe2 Kh7 19 Bxf6 Bxf6 20 g4 hxg4 21 Nd5 Bg7', { a: '∞', r: 'Large–W. Watson, Londres (rápidas) 1991', c: 'Com 15.f4!? o jogo fica confuso.' }],
  ['c02', 'g-C', 'g', '(g) C', '15 Bh6 Qa5 16 Bxg7 Kxg7 17 Rhe1 b5 18 Nd5 Qxd2', { a: '=', r: 'Hráček–Jirovský, Bundesliga 2007', c: 'Com 15.Bh6 as peças são trocadas e fica igual.' }],
  ['c02', 'h', 'h', '(h)', '15... b5 16 f4 Nc4 17 Bxc4 Rxc4 18 e5 b4', { a: '∞', r: 'Glimbrant–Komljenović, Andorra 1991', c: 'Com 15...b5 o jogo fica confuso.' }],
  ['c02-h', '1', 'h', '(h) 17.Qd3', '17 Qd3', { c: '17.Qd3 pode ser melhor.' }],
  ['c02', 'i', 'i', '(i)', '16 f4 Nc4 17 Bxc4 Rxc4 18 Bxf6 Bxf6 19 Nd5 Qxd2 20 Nxf6+ exf6 21 Rxd2 f5', { a: '=', r: 'Beliavsky–Georgiev, Wijk aan Zee 1985', c: 'Com 16.f4 as peças são trocadas e fica igual.' }],
  ['c02', 'j', 'j', '(j)', '16... b5 17 Bxf6 exf6 18 Nde2 Rc6 19 Nd5', { a: '±', r: 'Anand–Kasparov, Campeonato Mundial 1995', c: '16...b5?! deixa a casa d5 para as brancas.' }],
  ['c02', 'k', 'k', '(k)', '20 e6 Bxe6 21 Nxe6 Bxc3 22 bxc3 Qxa3 23 Nd4 Nxg5 24 hxg5 Ra4', { a: '=', r: 'Smirin–Hodgson, Ischia 1996', c: 'Empate combinado. Depois de 25.Nb3 as pretas dão xeque perpétuo.' }],
  // Coluna 3
  ['c03', 'l-A', 'l', '(l) A', '14 g4 hxg4 15 h5 Nxh5 16 Nd5 Rxd5 17 Bxd5 Qb6 18 Bb3 gxf3', { a: '⩱', c: 'Com 14.g4 hxg4 15.h5 as pretas ficam um pouco melhor.' }],
  ['c03', 'l-B', 'l', '(l) B', '14 g4 hxg4 15 f4 Nc4 16 Qd3 b5 17 f5 gxf5 18 exf5 Ne5 19 Qe3 Rxc3 20 bxc3 Kh7 21 h5 a5', { a: '=', r: 'Sarwat–Sameeh, Tanta 2001', c: 'Com 15.f4 fica igual.' }],
  ['c03-l-B', '1', 'l', '(l) B 16.Qe2', '16 Qe2 b5 17 f5 Qa5', { a: '=', c: 'Com 16.Qe2 também fica igual.' }],
  ['c03', 'm', 'm', '(m)', '14... Neg4 15 Rhe1 Qa5 16 f5 gxf5 17 Nxf5 Bxf5 18 exf5 Re8 19 Nd5', { a: '⩲', r: 'Kamsky–Ivanchuk, Buenos Aires 1994', c: 'Com 14...Neg4 as brancas ficam um pouco melhor.' }],
  ['c03', 'n', 'n', '(n)', '15... b5 16 e5 Ng4 17 exd6 Rxg5 18 fxg5 Nf2 19 Qe2 Nxd1 20 Rxd1 Nxd6 21 Ncxb5 Nxb5 22 Nxb5 Bxb5 23 Bxf7+', { a: '±', r: 'Rocha–Langier, Mar del Plata 1989', c: 'Com 15...b5 16.e5 as brancas ficam melhor.' }],
  ['c03', 'o', 'o', '(o)', '18... Bg4 19 Nf3 Rxc3 20 bxc3 Qa5 21 Rxh1 Qxc3', { a: '=', r: 'Eames–Snape, 4NCL', c: '18...Bg4! dá jogo suficiente às pretas.' }],
  ['c03', 'p', 'p', '(p)', '20 Rxd4 Rxf5 21 exf5 Qxd4 22 fxg6 Qg1+ 23 Nd1 Bg4 24 gxf7+ Kg7 25 Qd2', { a: '⩲', r: 'Klovans–Tiviakov, Groningen 1991', c: 'Depois de 20.Rxd4 as brancas ficam um pouco melhor.' }],
  // Coluna 4
  ['c04', 'q', 'q', '(q)', '13... Nc4 14 Bxc4 Rxc4 15 Bxg7 Kxg7 16 g4 hxg4 17 h5 Rh8 18 hxg6 fxg6 19 f4', { a: '⩲', r: 'R. Anderson–Khachiyan, US Open 2003', c: 'Com 13...Nc4 as brancas ficam um pouco melhor.' }],
  ['c04', 'r', 'r', '(r)', '15... Qa5 16 Kb1 Rc8 17 g4 Qxc3', { c: '15...Qa5 volta à coluna. As pretas esperam por 17.g4 para tomar em c3, porque aí 18.Ne2 deixaria f3 sem defesa.' }],
  ['c04', 's', 's', '(s)', '16... a5 17 f4 Nfg4 18 Qg5 a4 19 fxe5 axb3 20 cxb3 Nf2 21 e6', { a: '±', r: 'Short–H. Olafsson, Wijk aan Zee 1987', c: '16...a5? é lento demais.' }],
  ['c04', 't', 't', '(t)', '17... a5 18 Nf5 Bxf5 19 exf5 Qxc3 20 fxg6 Nc4 21 gxf7+ Kxf7 22 Qc1', { a: '⩲', r: 'W. Watson–Kudrin, Palma de Mallorca 1989', c: 'Com 17...a5 18.Nf5! as brancas ficam um pouco melhor.' }],
  ['c04', 'u', 'u', '(u)', '20 Rd3 Qb4+ 21 Rb3 Qc5 22 Ne2 Rxc2 23 Rc1 Rxc1+ 24 Nxc1 Ba4', { a: '=', r: 'Kovačević–Ristić, Sérvia e Montenegro 2005 (até 22.Ne2)', c: 'Depois de 20.Rd3 e 22...Rxc2 fica igual.' }],
  // Coluna 5
  ['c05', 'v', 'v', '(v)', '15 Nb3 Qc7 16 Bd4 Bc6 17 Qe2 b5 18 e5 Nd5 19 Nxd5 Bxd5', { a: '=', r: 'Kaplan–Miles, Hastings 1976/77', c: 'Com 15.Nb3 fica igual.' }],
  ['c05', 'w', 'w', '(w)', '20 Rxd2 Nxd5 21 Nxd5 Kf8', { a: '=', r: 'Anand–Kasparov, Campeonato Mundial 1995', c: 'Depois da troca das damas fica igual.' }],
  // Coluna 6
  ['c06', 'x', 'x', '(x)', '13 Rdg1 Qa5 14 Kb1 Rc5 15 g4 hxg4 16 h5 Nxh5', { a: '⩱', c: 'Com 13.Rdg1 as pretas ficam com chances um pouco melhores.' }],
  ['c06-x', '1', 'x', '(x) 14...Rc4', '14... Rc4', { c: '14...Rc4!? também é possível.' }],
  ['c06-x', '2', 'x', '(x) 15...Rxc3', '15... Rxc3 16 gxh5', { a: '∞', c: 'Com 15...Rxc3 16.gxh5! o jogo fica confuso.' }],
  ['c06', 'y', 'y', '(y)', '17 fxg4 Bxh6 18 Qxh6 Qf4+ 19 Qxf4 Nxf4', { a: '⩱', r: 'Goodman–Miles, Inglaterra 1974', c: 'Com 17.fxg4 as damas saem e as pretas ficam um pouco melhor.' }],
  ['c06-y', '1', 'y', '(y) 17.Bg5', '17 Bg5 Nxf3', { a: '∓', c: '17.Bg5? Nxf3 deixa as pretas melhor.' }],
  ['c06', 'z', 'z', '(z)', '20 Rh3 Rxc3', { a: '∓', r: 'segundo Sapi e Schneider', c: 'Com 20.Rh3 Rxc3! as pretas ficam melhor.' }],
]

const capitulo = {
  id: 'siciliana-dragao-a',
  arquivo: 'siciliana-dragao-a',
  nome: 'Siciliana Dragão — Iugoslavo, Linha Soltis',
  fonte: 'Modern Chess Openings — Sicilian Defense, Dragon Variation, Yugoslav Attack, Soltis Line (pp. 272–273), colunas 1–6',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 Nc6 8. Qd2 O-O 9. Bc4 Bd7 10. O-O-O Rc8 11. Bb3 Ne5 12. h4 h5',
  corPadrao: 'b',
  ordem: 272,
  grupos: [
    { id: 'bg5', nome: '13.Bg5 Rc5', colunas: [1, 2, 3] },
    { id: 'outros13', nome: '13.Bh6, 13.Kb1 e 13.g4', colunas: [4, 5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
