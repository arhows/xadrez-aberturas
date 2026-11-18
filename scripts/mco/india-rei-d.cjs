// Transcrição do MCO 15ª ed. — Índia do Rei, Clássica, 9.Bd2 e 9.Nd2 (pp. 602–604), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs india-rei-d
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-d-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 19 (c) ∞, 20 (e) ⩲, 21 (h) ∓, 22 (q) ⩲, 23 (t) ∞, 24 (w) ∞.
// Avaliações tiradas do texto: (g) "posição complexa" ficou ∞ e 20.Qh3 Nf6 = está no texto; (i) "as brancas
// rompem" ficou ±; (j) A "alguma vantagem" ficou ⩲; (j) B empate combinado: =; (k) "não consegue muito" ficou =;
// (m) "muito melhor para as brancas" ficou ±; (p) "vantagem para as brancas" ficou ⩲; (q) C "forte pressão na ala da
// dama" ficou ±; (q) B "obscuro" ficou ∞; (r) "com igualdade" ficou =; (s) "bom contrajogo pela qualidade" ficou =;
// (w) "jogo contra o rei branco" ficou ∞.
// Sinais conferidos com zoom: (a) 13...g4, (d) A 10...h6, (d) B, (e), (o), (v) ⩲; (f) A ±; (o) 16...Ng8 ∓.
// Notação: coluna 21, 17.Qb7 é captura (Qxb7).
// Nomes como estão no livro: "Leiningrad" (f) A.

const F = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 Nf3 O-O 6 Be2 e5 7 O-O Nc6 8 d5 Ne7'
const B = `${F} 9 Bd2`
const N = `${F} 9 Nd2`

const colunas = {
  c19: [`${B} Nh5 10 Rc1 f5 11 exf5 Nxf5 12 c5 Nf4 13 Bxf4 exf4 14 c6 bxc6 15 dxc6 g5 16 h3 Kh8 17 b3 h5`, 'bd2', '9.Bd2 Nh5 10.Rc1', '∞',
    'O 9.Bd2 é um lance de espera que prepara Rc1 e c5. Contra 9...Nh5 10.Rc1 f5 11.exf5 Nxf5 12.c5 Nf4 13.Bxf4 exf4 14.c6 bxc6 15.dxc6 g5 16.h3 Kh8 17.b3 h5 o jogo fica obscuro.'],
  c20: [`${B} Nh5 10 b4 f5 11 exf5 Bxf5 12 c5 Kh8 13 cxd6 Qxd6 14 Rc1 a6 15 Be3 b6 16 a3 Nf6 17 Qb3 h6`, 'bd2', '10.b4', '⩲',
    'Com 10.b4 as brancas avançam logo na ala da dama. Depois de 10...f5 11.exf5 Bxf5 12.c5 Kh8 13.cxd6 Qxd6 14.Rc1 a6 15.Be3 b6 16.a3 Nf6 17.Qb3 h6 elas ficam um pouco melhor.'],
  c21: [`${B} Ne8 10 Rc1 f5 11 exf5 gxf5 12 Ng5 h6 13 Ne6 Bxe6 14 dxe6 Qc8 15 Qb3 c6 16 Bh5 Qxe6 17 Qxb7 Nf6`, 'bd2', '9...Ne8', '∓',
    'Com 9...Ne8 o cavalo defende d6 e libera o peão f. Depois de 10.Rc1 f5 11.exf5 gxf5 12.Ng5 h6 13.Ne6 Bxe6 14.dxe6 Qc8 15.Qb3 c6 16.Bh5 Qxe6 17.Qxb7 Nf6 as pretas ficam um pouco melhor (Taimanov–Fischer, 1971).'],
  c22: [`${N} c5 10 Rb1 b6 11 b4 Ne8 12 bxc5 bxc5 13 Nb3 f5 14 Bg5 Bf6 15 Bd2 Kh8 16 Bd3 Bg7 17 f3 Ng8`, 'nd2', '9.Nd2 c5', '⩲',
    'O 9.Nd2 prepara b4 e c5; por isso as pretas costumam responder com 9...c5 ou 9...a5. Depois de 9...c5 10.Rb1 b6 11.b4 Ne8 12.bxc5 bxc5 13.Nb3 f5 14.Bg5 Bf6 15.Bd2 Kh8 16.Bd3 Bg7 17.f3 Ng8 as brancas ficam um pouco melhor.'],
  c23: [`${N} a5 10 a3 Bd7 11 b3 c5 12 Rb1 Ne8 13 b4 axb4 14 axb4 b6 15 bxc5 bxc5 16 Nb3 f5 17 f3 Nf6`, 'nd2', '9...a5 10.a3 Bd7', '∞',
    'Com 9...a5 as pretas freiam b4. Depois de 10.a3 Bd7 11.b3 c5 12.Rb1 Ne8 13.b4 axb4 14.axb4 b6 15.bxc5 bxc5 16.Nb3 f5 17.f3 Nf6 o jogo fica obscuro.'],
  c24: [`${N} a5 10 a3 Nd7 11 Rb1 f5 12 b4 Kh8 13 Qc2 Ng8 14 f3 Ngf6 15 Nb5 axb4 16 axb4 Nh5 17 g3 Ndf6`, 'nd2', '10...Nd7', '∞',
    'O 10...Nd7 foi a escolha de Kasparov por vários anos. Depois de 11.Rb1 f5 12.b4 Kh8 13.Qc2 Ng8 14.f3 Ngf6 15.Nb5 axb4 16.axb4 Nh5 17.g3 Ndf6 as pretas têm jogo contra o rei branco.'],
}

const notas = [
  // Coluna 19
  ['c19', 'a', 'a', '(a)', '10... h6 11 Re1 Nf4 12 Bf1 g5 13 h4 f6 14 Nh2 gxh4 15 Bxf4 exf4 16 Qh5 f5 17 c5 fxe4 18 cxd6 cxd6 19 Nxe4 Nf5 20 Ng4 Bd7 21 Bd3', { a: '±', r: 'Piket–Nunn, Melody Amber (rápidas) 1995', c: '10...h6 11.Re1 Nf4 12.Bf1 g5 13.h4 f6 14.Nh2 gxh4 15.Bxf4 exf4 16.Qh5 f5 17.c5 fxe4 18.cxd6 cxd6 19.Nxe4 Nf5 20.Ng4 Bd7 21.Bd3 é melhor para as brancas.' }],
  ['c19-a', '1', 'a', '(a) 13...g4', '13... g4 14 Nh2 h5 15 c5 dxc5 16 Be3 Neg6 17 Bxc5 Re8 18 g3 a6 19 Qb3 b6 20 Be3 Bf8 21 Nd1', { a: '⩲', r: 'Piket–Gelfand, Dos Hermanas 1995', c: '13...g4!? 14.Nh2 h5 15.c5 dxc5 16.Be3 Neg6 (16...b6 17.b4 cxb4 18.Nb5!) 17.Bxc5 Re8 18.g3 a6 19.Qb3 b6 20.Be3 Bf8 21.Nd1 é um pouco melhor para as brancas.' }],
  ['c19', 'b', 'b', '(b)', '12 g4 Nd4 13 gxh5 Nxe2+ 14 Qxe2 Bg4', { a: '∓', c: '12.g4? Nd4! 13.gxh5 Nxe2+ 14.Qxe2 Bg4 é melhor para as pretas.' }],
  ['c19', 'c', 'c', '(c)', '18 Nh2 g4 19 hxg4 Nd4 20 gxh5 Qh4 21 Re1', { a: '∞', r: 'Boersma–Peelen, Amsterdã 1987', c: '18.Nh2 g4 19.hxg4 Nd4 20.gxh5 Qh4 21.Re1 deixa o jogo obscuro.' }],
  // Coluna 20
  ['c20', 'd-A', 'd', '(d) A', '10 g3 f5 11 Ng5 Nf6 12 f3 c6 13 Qb3 Kh8 14 Rad1 h6 15 Ne6 Bxe6 16 dxe6 Qc8 17 Be1 Qxe6 18 Qxb7 h5', { a: '=', r: 'Pick–Trapl, República Tcheca 1995', c: '10.g3 f5 11.Ng5 Nf6 12.f3 c6 13.Qb3 Kh8 14.Rad1 h6 15.Ne6 Bxe6 16.dxe6 Qc8 17.Be1 Qxe6 18.Qxb7 h5 leva à igualdade.' }],
  ['c20-d-A', '1', 'd', '(d) A 10...h6', '10... h6 11 Rc1 Bh3 12 Re1 f5 13 Nh4 Nf6 14 exf5 gxf5 15 f4 e4 16 Be3 c5 17 dxc6 bxc6 18 b4 Kh7 19 Qd2 Ng4 20 Bd4', { a: '⩲', r: 'Ioseliani–Gurieli, Geórgia 1990', c: '10...h6 11.Rc1 Bh3 12.Re1 f5 13.Nh4 Nf6 14.exf5 gxf5 15.f4 e4 16.Be3 c5 17.dxc6 bxc6 18.b4 Kh7 19.Qd2 Ng4 20.Bd4 é um pouco melhor para as brancas.' }],
  ['c20', 'd-B', 'd', '(d) B', '10 Ne1 Nf4 11 Nd3 Nxe2+ 12 Qxe2 f5 13 f4 fxe4 14 Nxe4 exf4 15 Rxf4 h6 16 g4', { a: '⩲', c: '10.Ne1 Nf4 11.Nd3 Nxe2+ 12.Qxe2 f5 13.f4 fxe4 14.Nxe4 exf4 15.Rxf4 h6 16.g4 é um pouco melhor para as brancas.' }],
  ['c20-d-B', '1', 'd', '(d) B 11...Nxd3', '11... Nxd3', { r: 'Beikert–Nevrohr, Alemanha 1993', c: '11...Nxd3!? também foi tentado.' }],
  ['c20', 'e', 'e', '(e)', '18 Nh4', { a: '⩲', r: 'Willumsen–Stentebjerg, Dinamarca 1990', c: '18.Nh4 é um pouco melhor para as brancas.' }],
  // Coluna 21
  ['c21', 'f-A', 'f', '(f) A', '9... c5 10 dxc6 bxc6 11 Bg5 Be6 12 c5 Ne8 13 cxd6 Nxd6 14 Qa4', { a: '±', r: 'Korchnoi–Byrne, Torneio de Leiningrad 1973', c: '9...c5?! 10.dxc6 bxc6 (10...Nxc6!?) 11.Bg5! Be6 12.c5 Ne8 13.cxd6 Nxd6 14.Qa4 é melhor para as brancas.' }],
  ['c21', 'f-B', 'f', '(f) B', '9... Nd7 10 b4 h6 11 Qb3 Kh8 12 Rac1 f5 13 Ne1 Nf6 14 f3 f4 15 c5 g5 16 Nb5 Ne8 17 Nd3 h5 18 Nf2', { a: '⩲', r: 'Gligorić–Quinteros, Linares 1981', c: '9...Nd7?! 10.b4 h6 11.Qb3 Kh8 12.Rac1 f5 13.Ne1 Nf6 14.f3 f4 15.c5 g5 16.Nb5 Ne8 17.Nd3 h5 18.Nf2 é um pouco melhor para as brancas.' }],
  ['c21', 'g', 'g', '(g)', '11 Qb3 b6 12 exf5 gxf5 13 Ng5 Nf6 14 f4 h6 15 fxe5 dxe5 16 c5 Nfxd5 17 Nxd5 Nxd5 18 cxb6 axb6 19 Rc6 Kh8 20 Nf3', { a: '∞', r: 'Taimanov–Fischer, match (3ª partida) 1971', c: '11.Qb3 b6 12.exf5 gxf5 13.Ng5 Nf6 14.f4 h6 15.fxe5 dxe5 16.c5 Nfxd5 17.Nxd5 Nxd5 18.cxb6 axb6 19.Rc6 Kh8 20.Nf3 deixa o jogo obscuro; as pretas venceram.' }],
  ['c21-g', '1', 'g', '(g) 20.Qh3', '20 Qh3 Nf6', { a: '=', c: '20.Qh3 Nf6 leva à igualdade.' }],
  ['c21', 'h', 'h', '(h)', '18 Be2 Rfb8', { a: '∓', r: 'Taimanov–Fischer, match (1ª partida) 1971', c: '18.Be2 Rfb8 é melhor para as pretas.' }],
  // Coluna 22
  ['c22', 'i', 'i', '(i)', '9... Nd7 10 b4 f5 11 a4 Nf6 12 f3 f4 13 c5 g5 14 Nc4 h5 15 Ba3 Ng6 16 b5 Ne8 17 b6', { a: '±', c: '9...Nd7?! 10.b4 f5 11.a4 Nf6 12.f3 f4 13.c5 g5 14.Nc4 h5 15.Ba3 Ng6 16.b5 Ne8 17.b6 é melhor para as brancas. Com 9...Ne8 as pretas ao menos protegem d6.' }],
  ['c22', 'j-A', 'j', '(j) A', '12 a4 f5 13 a5 Nf6 14 f3 f4 15 axb6 axb6 16 bxc5 bxc5 17 Nb3 g5 18 Bd2 Ng6 19 Ra1', { a: '⩲', c: '12.a4 f5 13.a5 Nf6 14.f3 f4 15.axb6 axb6 16.bxc5 bxc5 17.Nb3 g5 18.Bd2 Ng6 19.Ra1 é um pouco melhor para as brancas.' }],
  ['c22', 'j-B', 'j', '(j) B', '12 a4 a5 13 bxc5 bxc5 14 Qb3 Nc7 15 Qb6 Ra6 16 Qb8 Ra8', { a: '=', r: 'Fedorowicz–W. Watson, Hastings 1984', c: '12.a4 a5!? 13.bxc5 bxc5 14.Qb3 Nc7! 15.Qb6 Ra6 16.Qb8 Ra8 terminou empatado.' }],
  ['c22', 'k', 'k', '(k)', '13 Qa4 Bd7', { a: '=', c: '13.Qa4 Bd7 não dá muito às brancas.' }],
  ['c22', 'l', 'l', '(l)', '14 f3 Kh8', { c: '14.f3 Kh8 e as pretas seguem com ...Ng8 e ...Bh6.' }],
  ['c22', 'm', 'm', '(m)', '14... Nf6 15 Nxc5 dxc5 16 d6', { a: '±', c: '14...Nf6? 15.Nxc5! dxc5 16.d6 é muito melhor para as brancas.' }],
  ['c22', 'n', 'n', '(n)', '15 Bh6 Rf7 16 exf5 gxf5', { c: '15.Bh6 Rf7 16.exf5 gxf5 deixa o bispo branco mal colocado em h6.' }],
  ['c22', 'o', 'o', '(o)', '16 f3 f4 17 Qc1 g5 18 Nd1 h5 19 Nf2 Ng8 20 Na5 Nh6 21 Nc6 Qd7 22 g4', { a: '⩲', r: 'Lukacs–Thipsay, Kolhapur 1987', c: '16.f3 f4 17.Qc1 g5 18.Nd1 h5 19.Nf2 Ng8 20.Na5 Nh6 21.Nc6 Qd7 22.g4 é um pouco melhor para as brancas.' }],
  ['c22-o', '1', 'o', '(o) 16...Ng8', '16... Ng8 17 Na4 Bg5 18 Bxg5 Qxg5 19 Qc1 Qh5 20 Qe1 Qh6 21 Qc3 Nef6', { a: '∓', r: 'Kamsky–Yurtaev, Olimpíada de Manila 1992', c: '16...Ng8 17.Na4?! Bg5 18.Bxg5 Qxg5 19.Qc1 Qh5! 20.Qe1 Qh6 21.Qc3 Nef6! é melhor para as pretas; 17.Qc1 era melhor.' }],
  ['c22', 'p', 'p', '(p)', '16... Ng8 17 exf5 gxf5 18 Ne2', { a: '⩲', c: '16...Ng8 17.exf5 gxf5 18.Ne2 é um pouco melhor para as brancas.' }],
  ['c22', 'q-A', 'q', '(q) A', '18 exf5 gxf5 19 Ne2', { a: '⩲', c: '18.exf5 gxf5 19.Ne2 é um pouco melhor para as brancas.' }],
  ['c22', 'q-B', 'q', '(q) B', '18 Ne2 f4 19 Na5 g5', { a: '∞', r: 'Eingorn–Hebden, Moscou 1986', c: '18.Ne2?! f4 19.Na5 g5 deixou o jogo obscuro.' }],
  ['c22', 'q-C', 'q', '(q) C', '17... f4 18 Nb5', { a: '±', c: '17...f4 18.Nb5 é melhor para as brancas.' }],
  // Coluna 23
  ['c23', 'r', 'r', '(r)', '11 Rb1 a4 12 b4 axb3 13 Nxb3 b6 14 Ra1 Qe8', { a: '=', c: '11.Rb1 a4 12.b4 axb3 13.Nxb3 b6 14.Ra1 Qe8! leva à igualdade.' }],
  ['c23', 's', 's', '(s)', '11... c6 12 Bb2 Qb6 13 dxc6 bxc6 14 Na4 Qc7 15 c5 d5 16 Nb6 Rad8 17 Bc3 Nxe4 18 Nxe4 dxe4 19 Bxa5 Nf5 20 Nc4 Qb8', { a: '=', r: 'Malakov–Zvjaginsev, Poikovsky 2004', c: '11...c6 12.Bb2 Qb6!? 13.dxc6 bxc6 14.Na4 Qc7 15.c5 d5 16.Nb6 Rad8 17.Bc3 Nxe4 18.Nxe4 dxe4 19.Bxa5 Nf5! 20.Nc4 Qb8: as pretas entregam a qualidade e ficam com contrajogo.' }],
  ['c23', 't', 't', '(t)', '18 Bd2 f4 19 Nb5 Nc8 20 Ra1 Rxa1 21 Qxa1 g5 22 Qa6 Qe7 23 Na5 g4', { a: '∞', r: 'Vaganian–Gelfand, Campeonato Soviético 1989', c: '18.Bd2 f4 19.Nb5 Nc8 20.Ra1 Rxa1 21.Qxa1 g5 22.Qa6 Qe7 23.Na5 g4 deixa o jogo obscuro.' }],
  // Coluna 24
  ['c24', 'v', 'v', '(v)', '13 f3 f4 14 Na4 axb4 15 axb4 g5 16 c5 Nf6 17 Nc4 g4 18 cxd6 cxd6 19 Nab6 Rb8 20 Nxc8 Nxc8 21 Bd2 Nb6 22 Na5 g3 23 h3', { a: '⩲', r: 'Beliavsky–Radjabov, Moscou (rápidas) 2002', c: '13.f3 f4 14.Na4 axb4 15.axb4 g5 16.c5 Nf6 17.Nc4 g4 18.cxd6 cxd6 19.Nab6 Rb8 20.Nxc8 Nxc8 21.Bd2 Nb6 22.Na5 g3 23.h3 é um pouco melhor para as brancas. (14.Nb3 e 15...c6 também são possíveis.)' }],
  ['c24', 'w', 'w', '(w)', '18 c5 Bd7 19 Rb3 fxe4 20 fxe4 Bh3', { a: '∞', r: 'Gelfand–Kasparov, Paris (Immopar) 1991', c: '18.c5 Bd7 19.Rb3 fxe4 20.fxe4 Bh3 dá às pretas jogo contra o rei branco.' }],
]

const capitulo = {
  id: 'india-rei-d',
  arquivo: 'india-rei-d',
  nome: 'Índia do Rei — Clássica, 9.Bd2 e 9.Nd2',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 602–604), colunas 19–24",
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7',
  corPadrao: 'b',
  ordem: 602,
  grupos: [
    { id: 'bd2', nome: '9.Bd2', colunas: [19, 20, 21] },
    { id: 'nd2', nome: '9.Nd2', colunas: [22, 23, 24] },
  ],
}

module.exports = { capitulo, colunas, notas }
