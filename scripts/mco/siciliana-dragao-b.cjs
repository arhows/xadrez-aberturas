// Transcrição do MCO 15ª ed. — Defesa Siciliana, Variante do Dragão: Ataque Iugoslavo com 9.Bc4 (pp. 274–276), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs siciliana-dragao-b
// Formato: ver gambito-do-rei.cjs. Dicas em siciliana-dragao-b-dicas.cjs.
//
// A tabela não traz avaliação no fim das colunas; a avaliação de cada coluna vem da sua última nota.

const B = '1 e4 c5 2 Nf3 d6 3 d4 cxd4 4 Nxd4 Nf6 5 Nc3 g6 6 Be3 Bg7 7 f3 O-O 8 Qd2 Nc6 9 Bc4'
const R = `${B} Bd7 10 O-O-O Rc8 11 Bb3 Ne5 12 h4 Nc4 13 Bxc4 Rxc4 14 h5 Nxh5 15 g4 Nf6`
const Q = `${B} Bd7 10 O-O-O Qa5 11 Bb3 Rfc8 12 Kb1 Ne5 13 h4`

const colunas = {
  c07: [`${R} 16 Nde2 Re8 17 Bh6 Bh8`, 'rc8', '12...Nc4 … 16.Nde2', '⩱',
    'Em vez de travar com 12...h5, as pretas trocam o bispo de b3 com 12...Nc4. As brancas abrem a coluna h com 14.h5 e 15.g4; com 16...Re8 e 17...Bh8 as pretas guardam o bispo do Dragão e ficam um pouco melhor.'],
  c08: [`${R} 16 Bh6 Nxe4 17 Qe3 Rxc3`, 'rc8', '16.Bh6', '=',
    'Com 16.Bh6 as brancas vão trocar o bispo do Dragão. As pretas respondem com 16...Nxe4! e o sacrifício de qualidade em c3; fica igual.'],
  c09: [`${Q} Nc4 14 Bxc4 Rxc4 15 Nb3 Qc7 16 Bd4 Be6 17 h5 a5`, 'qa5', '10...Qa5 … 13...Nc4', '⩲',
    'Com 10...Qa5 e 11...Rfc8 as pretas dobram as forças na ala da dama. Depois de 15.Nb3 a dama preta não acha uma boa casa e as brancas ficam um pouco melhor.'],
  c10: [`${Q} b5 14 Ncxb5 Qxd2 15 Bxd2 Nc4 16 Bxc4 Rxc4 17 b3 Rc5`, 'qa5', '13...b5', '⩲',
    'Com 13...b5 as pretas sacrificam um peão para trocar as damas e ganhar atividade. As brancas ficam um pouco melhor no final.'],
  c11: [`${B} Bd7 10 O-O-O Qc7 11 Bb3 Na5 12 h4 Nc4 13 Bxc4 Qxc4 14 Bh6 b5 15 Bxg7 Kxg7 16 Kb1 e6 17 h5 b4`, 'outras', '10...Qc7', '±',
    'Com 10...Qc7 e 11...Na5 as pretas trocam o bispo de b3 e retomam com a dama. As brancas trocam o bispo do Dragão e atacam na coluna h; ficam melhor.'],
  c12: [`${B} Nxd4 10 Bxd4 Be6 11 Bb3 Qa5 12 O-O-O b5 13 Kb1 b4 14 Nd5 Bxd5 15 exd5 Qb5 16 Qd3 Qb7 17 Rhe1 a5`, 'outras', '9...Nxd4', '±',
    'Com 9...Nxd4 e 10...Be6 as pretas avançam logo os peões da ala da dama. Depois de 14.Nd5 e da troca em d5 as brancas ficam claramente melhor.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '10 Bb3 Nxd4 11 Bxd4 b5 12 h4 a5 13 a4 bxa4 14 Nxa4 Be6', { a: '∞', r: 'Shirov–Ivanchuk, Wijk aan Zee 1999', c: '10.Bb3 permite 10...Nxd4 e 11...b5, com chances para os dois lados.' }],
  ['c07', 'b-A', 'b', '(b) A', '12 g4 b5', { c: '12.g4?! b5! dá às pretas jogo imediato na ala da dama.' }],
  ['c07', 'b-B', 'b', '(b) B', '12 Kb1 Nc4 13 Bxc4 Rxc4 14 g4 Qc7 15 g5 Nh5 16 Nd5 Qd8 17 Ne2 Be6 18 Ng3 Bxd5 19 exd5 Qd7', { a: '=', r: 'Svidler–van Wely, Wijk aan Zee 1999', c: 'Com 12.Kb1 fica igual.' }],
  ['c07', 'b-C', 'b', '(b) C', '12 Bh6 Bxh6 13 Qxh6 Rxc3 14 bxc3 Qc7 15 Kb1 Rc8', { a: '=', c: 'Com 12.Bh6 vem o sacrifício de qualidade 13...Rxc3!; fica igual.' }],
  ['c07', 'c', 'c', '(c)', '14 g4 b5 15 h5 b4 16 Nd5 e6 17 Nxb4', { a: '⩲', c: '14.h5 é de longe o mais jogado, mas 14.g4 provavelmente é mais forte. As pretas têm chances práticas pelo peão, mas com jogo cuidadoso as brancas ficam melhor.' }],
  ['c07-c', '1', 'c', '(c) 16...Nxd5', '16... Nxd5 17 exd5 Qa5 18 Kb1 Qxd5 19 Qh2', { a: '±', c: 'Com 16...Nxd5 17.exd5 Qa5 18.Kb1 as brancas ficam melhor.' }],
  ['c07-c-1', '1', 'c', '(c) 17...Qc7', '17... Qc7 18 Kb1', { a: '⩲', c: 'Com 17...Qc7 também.' }],
  ['c07', 'd', 'd', '(d)', '16... Qa5 17 Bh6 Bxh6 18 Qxh6 Rfc8 19 Rd3', { a: '±', r: 'Karpov–Korchnoi, match 1974', c: '16...Qa5?! 17.Bh6 e 19.Rd3! ameaça 20.g5 e 21.Nf4; as brancas ficam melhor.' }],
  ['c07-d', '1', 'd', '(d) 17...Bh8', '17... Bh8 18 Bxf8', { a: '±', c: '17...Bh8 18.Bxf8 não dá compensação suficiente pela qualidade.' }],
  ['c07', 'e', 'e', '(e)', '18 e5 Nxg4 19 fxg4 Bxe5 20 Bf4 Qa5 21 Bxe5 Qxe5 22 Qh6 Qg7', { a: '⩱', r: 'Kerek–Schneider, Budapeste 1994', c: 'Com 18.e5 Nxg4! as pretas ficam um pouco melhor.' }],
  ['c07-e', '1', 'e', '(e) 18...dxe5', '18... dxe5 19 g5', { a: '±', c: '18...dxe5? 19.g5 deixa as brancas melhor.' }],
  // Coluna 8
  ['c08', 'f-A', 'f', '(f) A', '16 Nb3 Re8 17 Bh6 Bh8 18 Bg5 Qc8 19 Rh4 Nxg4 20 fxg4 Bxg4', { a: '⩱', r: 'segundo Khalifman', c: 'As brancas têm várias alternativas tão importantes quanto 16.Bh6, mas nenhuma dá vantagem. Com 16.Nb3 as pretas ficam bem depois de 19...Nxg4!.' }],
  ['c08-f-A', '1', 'f', '(f) A 17.e5', '17 e5 Nxg4', { c: '17.e5 Nxg4!, como na coluna anterior.' }],
  ['c08-f-A', '2', 'f', '(f) A 19.Qh2', '19 Qh2 Be6', { a: '=', c: 'Com 19.Qh2 Be6 fica igual.' }],
  ['c08', 'f-B', 'f', '(f) B', '16 Nd5 e6 17 Nxf6+ Qxf6 18 Qh2 Rfc8', { a: '=', c: 'Com 16.Nd5 fica igual.' }],
  ['c08', 'f-C', 'f', '(f) C', '16 Kb1 Re8 17 Nd5 e6 18 Nxf6+ Qxf6 19 Qh2 h6 20 Qxd6 Rd8', { a: '=', r: 'segundo Ward', c: 'Com 16.Kb1 Re8! fica igual.' }],
  ['c08-f-C', '1', 'f', '(f) C 19...e5', '19... e5', { c: '19...e5 é sensato.' }],
  ['c08', 'f-D', 'f', '(f) D', '16 e5 Nxg4 17 fxg4 Bxg4 18 Rdg1 dxe5 19 Rxg4 Rxd4 20 Bxd4 exd4 21 Ne4 Qd5', { r: 'Hellers–Ernst, Suécia 1987', c: 'Com 16.e5 Nxg4 as pretas sacrificam peças e ficam com boa compensação pela torre.' }],
  ['c08-f-D', '1', 'f', '(f) D 16...dxe5', '16... dxe5 17 Nb3 Rc6 18 Bc5 h6', { a: '∞', r: 'Wibe–Nesis, por correspondência 1991', c: '16...dxe5 também é possível.' }],
  ['c08', 'g-A', 'g', '(g) A', '17 Nxe4 Rxd4 18 Qh2 Be5 19 Qh4 Rxd1+ 20 Kxd1 f5 21 Bxf8 Kxf8', { a: '∓', r: 'Baikov–Utiatsky, URSS 1967', c: '17.Nxe4? Rxd4 deixa as pretas melhor.' }],
  ['c08', 'g-B', 'g', '(g) B', '17 Qh2 Be5 18 f4 Bxd4 19 Rxd4 Rxd4 20 Bxf8 h5 21 gxh5 Qxf8 22 hxg6 Qg7 23 gxf7+ Kxf7 24 Rg1 Bg4 25 Nxe4 Rxe4 26 Rxg4', { a: '=', r: 'Reichelt–Schneider, Dortmund 1988', c: 'Com 17.Qh2 fica igual.' }],
  ['c08', 'h', 'h', '(h)', '18 bxc3 Nf6 19 Bxg7 Kxg7 20 Ne2 Qa5 21 Qh6+ Kg8', { a: '=', r: 'Janotta–Comte, Liga Francesa 2001', c: 'Depois de 18.bxc3 fica igual.' }],
  // Coluna 9
  ['c09', 'i', 'i', '(i)', '12 h4 Ne5 13 h5 Nxh5 14 g4 Nf6 15 Bh6 Rxc3 16 bxc3 Bxh6', { a: '=', r: 'Tal–Wade, Palma de Mallorca 1966', c: 'Com 12.h4 fica igual. As brancas podem jogar 13.Kb1 e voltar à coluna, mas é mais flexível jogar o lance já no 12.' }],
  ['c09', 'j', 'j', '(j)', '13 Bg5 Nc4 14 Bxc4 Rxc4 15 Nb3 Qe5 16 Bf4 Qe6 17 Ne2', { a: '⩲', c: 'A abordagem posicional 13.Bg5 dá vantagem depois de 13...Nc4.' }],
  ['c09-j', '1', 'j', '(j) 13...Rc5', '13... Rc5 14 Rhe1 b5 15 f4 Nc4 16 Bxc4 bxc4 17 e5 Rb8 18 exf6 exf6 19 Bh4 Qb4', { r: 'Sievers–Ward, Inglaterra 1991', c: 'As pretas jogam melhor com o agudo 13...Rc5!, que lhes dá bom jogo.' }],
  ['c09-j-1', '1', 'j', '(j) 14.Bxf6', '14 Bxf6 Bxf6 15 Nd5 Qxd2 16 Nxf6+ Kg7', { a: '=', c: 'Com 14.Bxf6 fica igual.' }],
  ['c09', 'k-A', 'k', '(k) A', '15... Qe5 16 Bd4 Qe6 17 Rhe1 Bc6 18 Qd3 a5 19 e5', { a: '±', r: 'Thórhallsson–Tisdall, Gausdal 1996', c: 'A dama não tem uma boa casa. Com 15...Qe5 as brancas ficam melhor.' }],
  ['c09', 'k-B', 'k', '(k) B', '15... Qa6 16 e5 Ne8 17 Nd5 Bxe5 18 Nxe7+ Kf8 19 Nd5 Rxc2 20 Bh6+ Ng7 21 Qxc2 Bf5 22 Qxf5 gxf5 23 f4', { a: '±', r: 'Zuckerman–van Scheltinga, Wijk aan Zee 1968', c: 'Com 15...Qa6 16.e5! as brancas ficam melhor.' }],
  ['c09-k-B', '1', 'k', '(k) B 16...dxe5', '16... dxe5 17 Nc5', { c: '16...dxe5 17.Nc5.' }],
  ['c09', 'k-C', 'k', '(k) C', '15... Qd8 16 Bh6', { a: '±', c: 'Com 15...Qd8 16.Bh6 também.' }],
  ['c09', 'l', 'l', '(l)', '18 a4 b5 19 Nxb5 Qb8 20 h6 Bh8 21 Nc3 Rb4 22 e5', { a: '⩲', r: 'Gaponenko–Vlam, Gent 2002', c: 'Depois de 18.a4 as brancas ficam um pouco melhor.' }],
  // Coluna 10
  ['c10', 'm', 'm', '(m)', '14 h5 Nc4 15 Bxc4 bxc4 16 Bh6 Bxh6 17 Qxh6 Rab8 18 Nd5 Nxd5 19 exd5 Qa3 20 Nb3 cxb3 21 bxa3 bxc2+ 22 Ka1 cxd1=Q+ 23 Rxd1 Bf5', { a: '=', r: 'Tolnai–Jovičić, Leibnitz 1990', c: 'Com 14.h5 as pretas sacrificam a dama com 19...Qa3 e 20...cxb3!, e fica igual.' }],
  ['c10', 'n', 'n', '(n)', '14... Qd8 15 Nc3 Rab8 16 h5', { a: '±', r: 'Reutsky–Bergez, Budapeste 2004', c: '14...Qd8?! deixa as brancas melhor.' }],
  ['c10-n', '1', 'n', '(n) 15.Qe2', '15 Qe2', { c: '15.Qe2 também é bom.' }],
  ['c10', 'o', 'o', '(o)', '15 Rxd2 Rab8 16 Nc3 a5 17 a4 Nc4 18 Bxc4 Rxc4 19 Rd3 Rcb4 20 Ndb5 Bxb5 21 axb5 Nd7', { a: '=', r: 'Schlosser–Ward, Oakham 1990', c: 'Com 15.Rxd2 fica igual.' }],
  ['c10', 'p', 'p', '(p)', '15... Rab8 16 Nc3 Be8 17 h5 a5 18 hxg6 hxg6 19 a4', { r: 'Nijboer–Halay, Vlissingen 2005', c: '15...Rab8 é outra opção.' }],
  ['c10', 'q', 'q', '(q)', '18 c4 a6 19 Nc3 Rb8 20 Kc2 Ng4 21 fxg4 Bxd4 22 g5', { a: '⩲', r: 'Ree–Ward, Inglaterra 1993', c: 'Depois de 18.c4 as brancas ficam um pouco melhor.' }],
  ['c10-q', '1', 'q', '(q) 18...e5', '18... e5 19 Ne2 Bxb5 20 cxb5 Rxb5 21 Bg5', { a: '±', r: 'Thórhallsson–Halldórsson, Islândia 1994', c: 'Com 18...e5 as brancas ficam melhor.' }],
  // Coluna 11
  ['c11', 'r', 'r', '(r)', '10... Qb8 11 h4 Rc8 12 Bb3 a5 13 h5 a4 14 Bd5 Nxh5 15 g4 Nf6 16 Nf5 Bxf5 17 gxf5 Nb4 18 fxg6 Nfxd5 19 Bd4 Bxd4 20 Qxd4 e5 21 gxf7+ Kf8 22 Qg1', { a: '±', r: 'Agdestein–Karlsson, Gausdal 1987', c: 'Com 10...Qb8 as brancas jogam 13.h5! e 16.Nf5! e ficam melhor.' }],
  ['c11', 's', 's', '(s)', '14 h5 b5 15 hxg6 fxg6 16 Bh6 b4 17 Nd5 Qxa2', { a: '=', r: 'Šimík–Klíma, Highlands Open 2005', c: 'Com 14.h5 fica igual.' }],
  ['c11', 't', 't', '(t)', '18 hxg6 fxg6 19 Nce2 e5 20 Nb3 Rac8 21 g4 Be6 22 Ng3', { a: '±', r: 'De Jong–Golzow, por correspondência 1992', c: 'Depois de 18.hxg6 as brancas ficam melhor.' }],
  // Coluna 12
  ['c12', 'u', 'u', '(u)', '9... Nd7 10 Bb3 Nb6 11 Nd5 Nxd5 12 Bxd5 Bd7 13 h4', { a: '⩲', r: 'Jurković–Petrillo, Gênova 1987', c: 'Com 9...Nd7 as brancas ficam com uma vantagem simples.' }],
  ['c12', 'v', 'v', '(v)', '12... Bxb3 13 cxb3 Rfc8 14 Kb1', { a: '⩲', c: 'Com 12...Bxb3 13.cxb3! o rei branco fica seguro na ala da dama, enquanto h4 e h5 iniciam o ataque na ala do rei.' }],
  ['c12', 'w', 'w', '(w)', '18 Ba4', { a: '±', r: 'Browne–Kastner, EUA 1970', c: '18.Ba4! dá às brancas clara vantagem.' }],
]

const capitulo = {
  id: 'siciliana-dragao-b',
  arquivo: 'siciliana-dragao-b',
  nome: 'Siciliana Dragão — Iugoslavo, 9.Bc4',
  fonte: 'Modern Chess Openings — Sicilian Defense, Dragon Variation, Yugoslav Attack (pp. 274–276), colunas 7–12',
  base: '1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4',
  corPadrao: 'b',
  ordem: 274,
  grupos: [
    { id: 'rc8', nome: '10...Rc8 e 12...Nc4', colunas: [7, 8] },
    { id: 'qa5', nome: '10...Qa5', colunas: [9, 10] },
    { id: 'outras', nome: '10...Qc7 e 9...Nxd4', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
