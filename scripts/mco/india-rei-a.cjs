// Transcrição do MCO 15ª ed. — Índia do Rei, Clássica, linha principal 9.Ne1 (pp. 593–595), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs india-rei-a
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-a-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 1 (d) ⩲, 2 (g) ∞, 3 (l) ∞, 4 (o) ⩱, 5 (s) =, 6 (u) ⩲.
// Avaliações tiradas do texto: (a) A "posição solta das pretas" ficou ⩲; (a) B "as brancas estavam melhor" ficou ±;
// (b) "chances para os dois lados" ficou ∞; (d) "as brancas um pouco melhor" ficou ⩲ (18...a6 perde material: ±);
// (e) A "obriga a entregar o bispo ou a qualidade" ficou ±; (e) B "favorece as brancas" ficou ±; (g) "muito
// obscuro" ficou ∞; (h) "bom jogo para as pretas" ficou =; (j) "pode ser bom para as brancas" ficou ⩲; (k)
// "grande compensação pela peça" ficou =; (l) "com contrajogo" ficou ∞; (m) "obscuro" ficou ∞; (q) as brancas
// abandonaram: −+; (r) "posição confortável para as pretas" ficou =; (s) empate combinado: =; (t) "jogo das pretas
// neutralizado" ficou ⩲; (u) "as brancas um pouco melhor" ficou ⩲.
// Sinais conferidos com zoom: (k) 19.Nb2 ⩲; (o) A 23.b5 ±; (o) B 24...Bf6 ⩱.
// Notação: coluna 6, 13 "Nc5" é captura: 13.Nxc5. (q) "19...Nxd5" é ambíguo (os dois cavalos chegam a d5): ficou
// 19...Nexd5, que o Stockfish dá como decisivo (+1,8 para as pretas; 19...Nfxd5 só +0,3).
// Errata: coluna 6, "16 Qe2" é impossível (o bispo ainda está em e2, ver (u) 20.Bf3); ficou 16.Qd2.

const F = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 Nf3 O-O 6 Be2 e5 7 O-O Nc6 8 d5 Ne7 9 Ne1 Nd7'
const M = `${F} 10 Be3 f5 11 f3 f4 12 Bf2 g5`

const colunas = {
  c1: [`${M} 13 a4 Ng6 14 a5 Kh8 15 Nd3 Nf6 16 c5 h5 17 cxd6 cxd6 18 Nb5`, 'be3', '13.a4 Ng6', '⩲',
    'Na linha principal da Clássica as brancas atacam na ala da dama e as pretas na ala do rei. Com 13.a4 (lance de Korchnoi) as brancas começam já o avanço na ala da dama. Depois de 13...Ng6 14.a5 Kh8 15.Nd3 Nf6 16.c5 h5 17.cxd6 cxd6 18.Nb5 as brancas ficam um pouco melhor numa posição muito teórica.'],
  c2: [`${M} 13 a4 a5 14 Nd3 b6 15 Be1 Nf6 16 Nf2 h5 17 h3 Kh8 18 Nb5 Neg8`, 'be3', '13...a5', '∞',
    'Com 13...a5 as pretas freiam os peões brancos da ala da dama. O lance 15.Be1 libera f2 para o cavalo de d3, que volta para defender o roque. Depois de 16.Nf2 h5 17.h3 Kh8 18.Nb5 Neg8 o jogo fica obscuro.'],
  c3: [`${M} 13 Rc1 Ng6 14 c5 Nxc5 15 b4 Na6 16 Nd3 h5 17 Nb5 Bd7 18 a4 Bh6`, 'be3', '13.Rc1 Ng6', '∞',
    'Com 13.Rc1 e 14.c5! as brancas entregam um peão (ideia de Kozul, 1998) para abrir logo a ala da dama, porque aqui a velocidade decide. Depois de 14...Nxc5 15.b4 Na6 16.Nd3 h5 17.Nb5 Bd7 18.a4 Bh6 as pretas ficam com contrajogo.'],
  c4: [`${M} 13 Rc1 Rf6 14 c5 Nxc5 15 b4 Na6 16 Nd3 Rh6 17 a4 Qe8 18 Kh1 Bd7`, 'be3', '13...Rf6', '⩱',
    'Com 13...Rf6!? a torre vai a h6 para o ataque. As brancas repetem a ideia de entregar o peão com 14.c5. Depois de 14...Nxc5 15.b4 Na6 16.Nd3 Rh6 17.a4 Qe8 18.Kh1 Bd7! as pretas ficam de olho no peão de a4 e o jogo pode ficar melhor para elas.'],
  c5: [`${F} 10 f3 f5 11 g4 Nf6 12 Nd3 c6 13 Nf2 Kh8 14 Bd2 a5 15 a3 Bd7 16 Rb1 Qb8 17 b3 Rf7 18 Qc1 Qc7`, 'f3', '10.f3 f5 11.g4 Nf6', '=',
    'Com 10.f3 e 11.g4 (Sistema Benko) as brancas respondem à expansão das pretas na ala do rei com os próprios peões, para frear o ataque. Depois de 11...Nf6 12.Nd3 c6 13.Nf2 Kh8 14.Bd2 a5 15.a3 Bd7 16.Rb1 Qb8 17.b3 Rf7 18.Qc1 Qc7 o jogo fica igual.'],
  c6: [`${F} 10 f3 f5 11 g4 a5 12 Nd3 Nc5 13 Nxc5 dxc5 14 Be3 b6 15 exf5 gxf5 16 Qd2 Ng6 17 Kh1 Bd7 18 Rg1 fxg4`, 'f3', '11...a5', '⩲',
    'Com 11...a5 as pretas levam o cavalo a c5 e mantêm a tensão na ala do rei. Depois de 12.Nd3 Nc5 13.Nxc5 dxc5 14.Be3 b6 15.exf5 gxf5 16.Qd2 Ng6 17.Kh1 Bd7 18.Rg1 fxg4 as brancas ficam um pouco melhor.'],
}

const notas = [
  // Base (9...Nd7) e coluna 1
  ['c1', 'a-A', 'a', '(a) A', '9... Ne8 10 f4 exf4 11 Bxf4 h6 12 Nf3 g5 13 Be3 f5 14 exf5 Nxf5 15 Bf2', { a: '⩲', c: '9...Ne8!? protege c7. Contra isso, 10.f4!? exf4 11.Bxf4 h6 12.Nf3 g5 13.Be3 f5 14.exf5 Nxf5 15.Bf2 deixa as pretas com casas fracas.' }],
  ['c1', 'a-B', 'a', '(a) B', '9... Ne8 10 Be3 f5 11 f3 f4 12 Bf2 g5 13 c5 Ng6 14 a4 Rf7 15 Nd3 Bf8 16 a5 Rg7 17 a6', { a: '±', r: 'Korchnoi–van Wely, Antuérpia 1997', c: 'Outra opção contra 9...Ne8 é 10.Be3: 10...f5 11.f3 f4 12.Bf2 g5 13.c5 Ng6 14.a4 Rf7 15.Nd3 Bf8 16.a5 Rg7 17.a6, com vantagem branca.' }],
  ['c1', 'b', 'b', '(b)', '10 Nd3 f5 11 Bd2 Kh8 12 Rc1 Nf6 13 f3 c5 14 dxc6 Nxc6 15 Be3 Be6', { a: '∞', r: 'Kozul–Kotronias, Olimpíada de Turim 2006', c: '10.Nd3 f5 11.Bd2 Kh8 12.Rc1 Nf6 13.f3 c5 14.dxc6!? Nxc6 15.Be3 Be6 é a antiga linha principal; o jogo fica dinâmico para os dois lados.' }],
  ['c1', 'd', 'd', '(d)', '18... a6 19 Bb6 Qe7 20 Nc7 Rb8 21 Ba7 Qxc7 22 Rc1 Qxa5 23 Bxb8', { a: '±', r: 'van der Sterren–Nijboer, Roterdã 2000', c: 'Na posição da coluna as brancas ficam um pouco melhor. Se 18...a6, então 19.Bb6! Qe7 20.Nc7 Rb8 21.Ba7! Qxc7 22.Rc1 Qxa5 23.Bxb8 e as brancas ganham material.' }],
  // Coluna 2
  ['c2', 'e-A', 'e', '(e) A', '13... Rf6 14 Nb5 a6 15 Na7', { a: '±', r: 'Summerscale–Black, Birmingham 2001', c: '13...Rf6 14.Nb5 a6 15.Na7! obriga as pretas a trocar o bispo das casas claras ou a entregar a qualidade.' }],
  ['c2', 'e-B', 'e', '(e) B', '13... a6 14 a5 Rf6 15 Na4 Rh6 16 c5 Qe8 17 Kh1 Qh5 18 Bg1 Nf6 19 cxd6 cxd6 20 Nb6 Qh4 21 Nxc8 Rxc8 22 h3 g4 23 Bf2 Qg5 24 fxg4 Nxe4 25 Ra4', { a: '±', r: 'Summerscale–Hebden, Bradford 2002', c: '13...a6 14.a5 Rf6 15.Na4 Rh6 16.c5 Qe8 17.Kh1 Qh5 18.Bg1 Nf6 19.cxd6! cxd6 20.Nb6 Qh4 21.Nxc8! Rxc8 22.h3 g4 23.Bf2 Qg5 24.fxg4 Nxe4 25.Ra4 favorece as brancas nessa posição aguda.' }],
  ['c2', 'g', 'g', '(g)', '19 b4 Rf7 20 bxa5 bxa5 21 c5 Bf8 22 cxd6 cxd6 23 Rc1 Nh6 24 Rc4 Rg7 25 Qc2 g4 26 Bxa5 Qe8', { a: '∞', r: 'Nielsen–Kotronias, Hastings 2004', c: '19.b4 Rf7 20.bxa5 bxa5 21.c5 Bf8 22.cxd6 cxd6 23.Rc1 Nh6 24.Rc4 Rg7 25.Qc2 g4 26.Bxa5 Qe8!: as brancas têm um peão a mais, mas o rei branco fica exposto. (22.c6?! trava a ala da dama.)' }],
  // Coluna 3
  ['c3', 'h', 'h', '(h)', '13 Nd3 Nf6 14 c5 Ng6 15 a4 Kh8 16 a5 Rg8 17 cxd6 cxd6 18 Nb5 g4 19 fxg4 Nxe4 20 Bxa7 Bd7 21 Bb6 Qe7 22 Nc7 Raf8', { a: '=', r: 'Korchnoi–Lanka, Linz 1997', c: '13.Nd3 Nf6 14.c5 Ng6 15.a4 Kh8 16.a5 Rg8 17.cxd6 cxd6 18.Nb5 g4! 19.fxg4 Nxe4 20.Bxa7 Bd7 21.Bb6 Qe7 22.Nc7 Raf8 dá bom jogo às pretas.' }],
  ['c3', 'j', 'j', '(j)', '16 Nb5 Bd7 17 Nxa7 h5 18 Bxa6 bxa6 19 Qc2', { a: '⩲', c: 'Recentemente apareceu 16.Nb5!? Bd7 17.Nxa7 (ou 17.a4!?) 17...h5. Agora 18.Bxa6 bxa6 19.Qc2 pode ser bom para as brancas.' }],
  ['c3', 'k', 'k', '(k)', '16... Rf7 17 Nb5 h5 18 a4 Bh6 19 Nxa7 Bd7 20 b5 Nc5 21 Nc6', { a: '=', r: 'Lastin–Reindermann, Istambul 2003', c: '16...Rf7!? 17.Nb5 h5 18.a4 Bh6 19.Nxa7! Bd7 20.b5 Nc5 21.Nc6! dá às brancas grande compensação pela peça.' }],
  ['c3-k', '1', 'k', '(k) 17...Bd7', '17... Bd7 18 a4 Qe8 19 Nb2', { a: '⩲', c: '17...Bd7 18.a4 Qe8 19.Nb2 é um pouco melhor para as brancas.' }],
  ['c3', 'l', 'l', '(l)', '19 Rc3 Rf7 20 Nxa7 Rg7', { a: '∞', r: 'Korchnoi–Cvitan, Pula 1997', c: '19.Rc3 Rf7! 20.Nxa7 Rg7 dá contrajogo às pretas.' }],
  ['c3-l', '1', 'l', '(l) 19.Nxa7?!', '19 Nxa7 g4 20 fxg4 f3', { c: '19.Nxa7?! g4! 20.fxg4 f3 abre caminho para o ataque das pretas.' }],
  // Coluna 4
  ['c4', 'm', 'm', '(m)', '13... a6 14 Nd3 b6 15 b4 Rf6 16 c5 Rh6', { a: '∞', r: 'Khalifman–Inarkiev, Rússia 2005', c: '13...a6 merece atenção. Depois de 14.Nd3 b6 15.b4 Rf6 16.c5 Rh6 o jogo fica obscuro.' }],
  ['c4', 'n', 'n', '(n)', '14 b4 Rh6 15 c5', { c: 'Em vez de entregar o peão logo com 14.c5, as brancas podem jogar 14.b4!? Rh6 15.c5.' }],
  ['c4', 'o-A', 'o', '(o) A', '18... Qh5 19 Bg1 Bd7 20 Na2 Rc8 21 Nf2 Qe8 22 Ng4 Rg6 23 b5', { a: '±', c: '18...Qh5 é mais fraco que o lance da coluna: 19.Bg1 Bd7 20.Na2! Rc8 21.Nf2 Qe8 22.Ng4! Rg6 23.b5 é melhor para as brancas.' }],
  ['c4', 'o-B', 'o', '(o) B', '19 Qb3 Kh8 20 Nb2 Qh5 21 Bg1 g4 22 fxg4 Bxg4 23 Bxg4 Qxg4 24 Nb5 Bf6', { a: '⩱', r: 'Vera–Nataf, Montreal 2003', c: 'Depois de 18...Bd7!, que vigia o peão de a4: 19.Qb3 Kh8 20.Nb2 Qh5 21.Bg1 g4! 22.fxg4 Bxg4 23.Bxg4 Qxg4 24.Nb5 Bf6! é um pouco melhor para as pretas.' }],
  // Coluna 5
  ['c5', 'q', 'q', '(q)', '13 Kg2 Kh8 14 h3 b5 15 Nb4 bxc4 16 Bxc4 cxd5 17 Nbxd5 Be6 18 Bg5 Bxd5 19 Nxd5 Nexd5', { a: '-+', r: 'P. Cramling–Reyes, Málaga 1987', c: '13.Kg2 Kh8 (13...b5 logo também é possível) 14.h3 b5 15.Nb4 bxc4 16.Bxc4 cxd5 17.Nbxd5 Be6 18.Bg5 Bxd5 19.Nxd5? Nexd5 e as brancas abandonaram.' }],
  ['c5-q', '1', 'q', '(q) 19.exd5', '19 exd5 h6', { a: '=', c: '19.exd5 h6 era melhor, mas dá bom jogo às pretas.' }],
  ['c5', 'r', 'r', '(r)', '14 Kg2 Bd7 15 Bd2 a6 16 a3 b5 17 b3 Qb6 18 h3 Rac8', { a: '=', r: 'Gavrikov–Kochiev, Leningrado 1984', c: '14.Kg2 Bd7 15.Bd2 a6 16.a3 b5 17.b3 Qb6 18.h3 Rac8 deixa as pretas com uma posição confortável.' }],
  ['c5', 's', 's', '(s)', '19 b4 axb4 20 Rxb4 Raf8 21 h3 Neg8 22 Be3 c5 23 Nb5 Qd8 24 Ra4 Ne8 25 Kg2 Ngf6 26 Bg5', { a: '=', r: 'Taimanov–Kavalek, Montilla 1977', c: '19.b4 axb4 20.Rxb4 Raf8 21.h3 Neg8 22.Be3 c5 23.Nb5 Qd8 24.Ra4 Ne8 25.Kg2 Ngf6 26.Bg5 e empate combinado.' }],
  // Coluna 6
  ['c6', 't', 't', '(t)', '11... fxg4 12 fxg4 Rxf1+ 13 Kxf1 a5 14 Be3 h6 15 h4 Nf6 16 Nd3 b6 17 Nf2 Nd7 18 g5 h5 19 b3 Nc5 20 Rb1', { a: '⩲', r: 'A. Petrosian–Korenov, Torneio Classificatório da GMA 1991', c: 'Fechar a ala do rei com ...f4 favorece as brancas, e a troca 11...fxg4 12.fxg4 Rxf1+ 13.Kxf1 também não resolve: 13...a5 14.Be3 h6 15.h4! Nf6 16.Nd3 b6 17.Nf2 Nd7 18.g5 h5 19.b3 Nc5 20.Rb1, e o ataque das pretas parou.' }],
  ['c6', 'u', 'u', '(u)', '19 fxg4 Nf4 20 Bf3 Be8 21 Be4 Bg6', { a: '⩲', r: 'Berković–Kariaka, Simferopol 1991', c: '19.fxg4 Nf4 20.Bf3 Be8 21.Be4 Bg6 deixa as brancas um pouco melhor.' }],
]

const capitulo = {
  id: 'india-rei-a',
  arquivo: 'india-rei-a',
  nome: 'Índia do Rei — Clássica, 9.Ne1',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 593–595), colunas 1–6",
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7',
  corPadrao: 'b',
  ordem: 593,
  grupos: [
    { id: 'be3', nome: '10.Be3 f5 11.f3 f4 12.Bf2 g5', colunas: [1, 2, 3, 4] },
    { id: 'f3', nome: '10.f3 f5 11.g4', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
