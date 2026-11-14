// Transcrição do MCO 15ª ed. — Defesa Tarrasch, Variante Rubinstein com 9.Bg5 (pp. 442–443), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs tarrasch-a
// Formato: ver gambito-do-rei.cjs. Dicas em tarrasch-a-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (w) o livro traz 18...Rac8, mas a torre de a8 já foi a d8; ficou 18...Rc8 (a torre de d8).
// Na nota (n) o livro termina com 19 Qb4 b6, mas a dama de d3 não chega a b4; a linha ficou até 18...Be6.
// Na nota (y) B o livro traz 15...Qxb2 16 Qd2, mas o peão branco já está em b3; a linha ficou até 15 Qxd5.
// A nota (r) traz 15 Rd4?!, impossível com o cavalo branco em d4; o comentário entrou no resumo da coluna 4.
// Na nota (s) o lance 17...Bc5 (o livro parece trazer "Be5", impossível para o bispo de e7) foi lido como Bc5.

const B = '1 d4 d5 2 c4 e6 3 Nc3 c5 4 cxd5 exd5 5 Nf3 Nc6 6 g3 Nf6 7 Bg2 Be7 8 O-O O-O 9 Bg5'
const D = `${B} cxd4 10 Nxd4 h6 11 Be3 Re8`

const colunas = {
  c01: [`${D} 12 Rc1 Bf8 13 Na4 Bd7 14 Nc5 Bxc5 15 Rxc5 Qe7`, 'cxd4', '9...cxd4 12.Rc1 Bf8', '=',
    'Na Defesa Tarrasch as pretas aceitam o peão isolado em d5 em troca de jogo livre para as peças. Na Variante Rubinstein (6.g3) o bispo de g2 pressiona d5; com 9.Bg5 cxd4 10.Nxd4 h6 11.Be3 Re8 12.Rc1 Bf8 as pretas defendem tudo e o jogo fica igual (S. Ivanov–Lugovoi, Rússia 2005).'],
  c02: [`${D} 12 Rc1 Bg4 13 h3 Be6 14 Kh2 Qd7 15 Qa4 a6`, 'cxd4', '12...Bg4', '=',
    'Com 12...Bg4 13.h3 Be6 as pretas forçam h3 antes de defender d5 com o bispo. Depois de 14.Kh2 Qd7 15.Qa4 a6 o jogo fica quase igual (Timman–Bosch, Hilversum 2006).'],
  c03: [`${D} 12 Qb3 Na5 13 Qc2 Bg4 14 Nf5 Bb4 15 Bd4 Bxc3`, 'cxd4', '12.Qb3', '=',
    'Com 12.Qb3 a dama pressiona d5 e b7. Depois de 12...Na5 13.Qc2 Bg4 14.Nf5 Bb4 15.Bd4 Bxc3 as pretas trocam peças e igualam (Vera–Akobian, Campeonato Continental 2005).'],
  c04: [`${D} 12 Qa4 Bd7 13 Rad1 Nb4 14 Qb3 a5 15 a4 Rc8`, 'cxd4', '12.Qa4', '=',
    'Com 12.Qa4 a dama crava o cavalo de c6. Depois de 12...Bd7 13.Rad1 Nb4 14.Qb3 a5 15.a4 (deixar o peão avançar com ...a4 e ...a3 dá às pretas jogo excelente, como em Beliavsky–Kasparov, Moscou 1983) 15...Rc8 as pretas ficam ativas e o jogo é mais ou menos igual (Yusupov–Illescas, Linares 1988).'],
  c05: [`${B} c4 10 Ne5 Be6 11 Nxc6 bxc6 12 b3 Qa5 13 Na4 Rad8 14 e3 c5 15 Bxf6 gxf6`, 'c4', '9...c4', '⩲',
    'Com 9...c4 as pretas fecham a ala da dama e ganham espaço, mas o peão d5 perde o apoio. Depois de 10.Ne5 Be6 11.Nxc6 bxc6 12.b3 Qa5 13.Na4 as brancas atacam a cadeia de peões e ficam um pouco melhor (Arlandi–Haag, Arco 1999).'],
  c06: [`${B} Be6 10 dxc5 Bxc5 11 Rc1 Bb6 12 b3 d4 13 Ne4 Qe7 14 Nh4 Kh8 15 Bxf6 gxf6`, 'be6', '9...Be6', '±',
    'Com 9...Be6 as pretas defendem d5 e deixam as brancas trocarem em c5. Depois de 10.dxc5 Bxc5 11.Rc1 Bb6 12.b3 d4 13.Ne4 as brancas ficam com casas fortes; com 15.Bxf6 gxf6 o roque preto fica enfraquecido (Korchnoi–Piket, Nijmegen 1993).'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '10... Re8 11 Rc1 h6 12 Bf4 Bg4 13 h3 Be6 14 Nxe6 fxe6 15 Qb3', { a: '⩲', r: 'Tukmakov–Barthel, Biel 1998', c: '10...Re8 11.Rc1 h6 12.Bf4 Bg4 13.h3 Be6 14.Nxe6 fxe6 15.Qb3 é um pouco melhor para as brancas.' }],
  ['c01', 'b', 'b', '(b)', '11 Bf4 Bg4 12 h3 Bh5 13 Nf5 Bg6 14 Nxe7+ Qxe7 15 Nxd5 Nxd5 16 Qxd5 Rad8 17 Qc4 Nd4', { a: '=', r: 'Neverov–Eljanov, Campeonato Ucraniano 2001', c: '11.Bf4 Bg4 12.h3 Bh5 13.Nf5 Bg6 14.Nxe7+ Qxe7 15.Nxd5 Nxd5 16.Qxd5 Rad8 17.Qc4 Nd4 é igual: as pretas recuperam o peão.' }],
  ['c01', 'c', 'c', '(c)', '11... Bg4 12 Qa4 Qd7 13 Bxd5 Nxd4 14 Qxd4', { a: '±', r: 'Khenkin–Manca, Lido 2003', c: '11...Bg4 12.Qa4 Qd7 13.Bxd5! Nxd4 14.Qxd4 ganha um peão.' }],
  ['c01', 'd', 'd', '(d)', '12... Be6 13 Nxc6 bxc6 14 Na4 Qa5 15 a3', { a: '⩲', r: 'Campos–Villavicencio, Benidorm 1989', c: '12...Be6 13.Nxc6 bxc6 14.Na4 Qa5 15.a3 é um pouco melhor para as brancas.' }],
  ['c01', 'e', 'e', '(e)', '13 a3 Bg4 14 h3 Be6 15 Nxc6 bxc6 16 Bd4 Nh7 17 Na4 Qd7 18 h4 Bf5', { a: '=', r: 'Gelfand–Grischuk, Biel 2001', c: '13.a3 Bg4 14.h3 Be6 15.Nxc6 bxc6 16.Bd4 Nh7 17.Na4 Qd7 18.h4 Bf5 é igual.' }],
  ['c01', 'f', 'f', '(f)', '16 Qc1 Qe5 17 Rd1 Qh5', { a: '=', r: 'S. Ivanov–Lugovoi, Rússia 2005', c: '16.Qc1 Qe5 17.Rd1 Qh5 é igual.' }],
  // Coluna 2
  ['c02', 'g', 'g', '(g)', '14 Qc2 Qd7 15 Nxe6 fxe6 16 Rfd1', { a: '⩲', r: 'Marin–Pétursson, Grécia 1987', c: '14.Qc2 Qd7 15.Nxe6 fxe6 16.Rfd1 levou a uma vantagem mínima das brancas.' }],
  ['c02', 'h', 'h', '(h)', '14... Qa5 15 Qa4 Qxa4 16 Nxa4 Bd7 17 Nc3 Nxd4 18 Bxd4 Bc6 19 e3 Ne4 20 Rc2', { a: '⩲', r: 'van Wely–Piket, Wijk aan Zee 1992', c: '14...Qa5 15.Qa4 Qxa4 16.Nxa4 Bd7 17.Nc3 Nxd4 18.Bxd4 Bc6 19.e3 Ne4 20.Rc2 é um final um pouco favorável às brancas.' }],
  ['c02', 'i', 'i', '(i)', '15 Nxc6 bxc6 16 Na4', { c: '15.Nxc6 bxc6 16.Na4 também é possível, mas é mais promissor manter o peão d preto isolado.' }],
  ['c02', 'j', 'j', '(j)', '16 Rfd1 b5 17 Qc2 Rac8 18 Nxe6 fxe6', { a: '=', r: 'Timman–Bosch, Hilversum 2006', c: '16.Rfd1 b5 17.Qc2 Rac8 18.Nxe6 fxe6 leva a uma quase igualdade.' }],
  // Coluna 3
  ['c03', 'k', 'k', '(k)', '14 h3 Bd7 15 Rad1 Qc8', { a: '=', r: 'Vukić–Novoselski, Iugoslávia 1984', c: '14.h3 Bd7 15.Rad1 Qc8 é igual.' }],
  ['c03', 'l', 'l', '(l)', '14... Rc8 15 Nxe7+ Rxe7 16 Rad1 Qe8 17 h3 Bh5', { a: '⩲', r: 'Karpov–Kasparov, Moscou 1984', c: '14...Rc8 15.Nxe7+ Rxe7 16.Rad1 Qe8 17.h3 Bh5 é só um pouco melhor para as brancas.' }],
  ['c03', 'm', 'm', '(m)', '15 h3 Bxf5 16 Qxf5 Bxc3 17 bxc3 Nc4', { a: '∞', r: 'Kouatly–Martín González, Salônica 1984', c: '15.h3 Bxf5 16.Qxf5 Bxc3 17.bxc3 Nc4 foi indefinido.' }],
  ['c03-m', '1', 'm', '(m) 17...Rxe3', '17... Rxe3', { c: '17...Rxe3 também é possível aqui.' }],
  ['c03', 'n', 'n', '(n)', '16 Bxc3 Rxe2 17 Qd3 Re8 18 Ne3 Be6', { a: '=', r: 'Vera–Akobian, Campeonato Continental 2005', c: '16.Bxc3 Rxe2 17.Qd3 Re8 18.Ne3 Be6 é igual. (O livro segue com 19.Qb4 b6, mas a dama de d3 não chega a b4; a linha ficou até 18...Be6.)' }],
  // Coluna 4
  ['c04', 'o', 'o', '(o)', '12 Qc2 Bg4 13 Rfd1 Qd7 14 Nb3 Rad8 15 Rac1 Be6', { a: '=', r: 'Sandström–Brøjtigem, Berlim 1985', c: '12.Qc2 Bg4 13.Rfd1 Qd7 14.Nb3 Rad8 15.Rac1 Be6 é igual.' }],
  ['c04', 'p', 'p', '(p)', '12... Na5 13 Rad1 Nc4 14 Bc1', { a: '⩲', r: 'Kirov–Makropoulos, Pernik 1981', c: '12...Na5 13.Rad1 Nc4 14.Bc1 é um pouco melhor para as brancas.' }],
  ['c04', 'q', 'q', '(q)', '13 Qb3 Na5 14 Qc2 Rc8 15 Rad1 Nc4 16 Bc1 Bb4 17 Nxd5 Nxd5 18 Bxd5 Qe7', { a: '∞', r: 'Chlong–Zolnierowicz, Berna 1991', c: '13.Qb3 Na5 14.Qc2 Rc8 15.Rad1 Nc4 16.Bc1 Bb4 17.Nxd5 Nxd5 18.Bxd5 Qe7 foi confuso.' }],
  ['c04', 's', 's', '(s)', '16 Ndb5 Bc6 17 Bd4 Bc5', { a: '=', r: 'Yusupov–Illescas, Linares 1988', c: 'Yusupov–Illescas ficou mais ou menos igual depois de 16.Ndb5 Bc6 17.Bd4 Bc5.' }],
  // Coluna 5
  ['c05', 't', 't', '(t)', '11 f4 Ng4 12 Bxe7 Nxe7 13 Qd2 Nxe5 14 fxe5 Qd7 15 Rf2 b5 16 e3 b4', { a: '∓', r: 'Summermatter–Balashov, Lenk 1991', c: '11.f4 Ng4 12.Bxe7 Nxe7 13.Qd2 Nxe5 14.fxe5 Qd7 15.Rf2 b5 16.e3 b4: as perspectivas pretas na ala da dama são mais sérias que o ataque branco na ala do rei e no centro.' }],
  ['c05', 'u', 'u', '(u)', '12... cxb3 13 axb3 h6 14 Bf4 Qb6 15 Qd3 a5 16 Rfc1', { a: '⩲', r: 'Sveshnikov–Rogulj, Smederevska Palanka 1980', c: '12...cxb3 13.axb3 h6 14.Bf4 Qb6 15.Qd3 a5 16.Rfc1 é um pouco melhor para as brancas.' }],
  ['c05', 'v', 'v', '(v)', '13... Rfd8 14 e3 c5 15 Nxc5 Bxc5 16 dxc5 Qxc5 17 Bxf6 gxf6 18 bxc4 dxc4 19 Bxa8', { a: '±', r: 'Chernin–Marjanović, Subotica 1987', c: '13...Rad8 é uma melhoria sobre 13...Rfd8 14.e3 c5 15.Nxc5 Bxc5 16.dxc5 Qxc5 17.Bxf6 gxf6 18.bxc4 dxc4 19.Bxa8, com vantagem branca. Agora não há torre em a8 para capturar.' }],
  ['c05', 'w', 'w', '(w)', '16 Nxc5 Bxc5 17 dxc5 Qxc5 18 Qh5 Rc8 19 Qh6', { a: '⩲', r: 'Arlandi–Haag, Arco 1999', c: '16.Nxc5 Bxc5 17.dxc5 Qxc5 18.Qh5 Rc8 19.Qh6 é um pouco melhor para as brancas. (O livro traz 18...Rac8, mas a torre de a8 já foi a d8.)' }],
  // Coluna 6
  ['c06', 'x-A', 'x', '(x) A', '11 Na4 Be7 12 Be3 Bg4 13 Rc1 Re8', { a: '=', r: 'Geller–Spassky, Riga 1965', c: '11.Na4 Be7 12.Be3 Bg4 13.Rc1 Re8 é igual.' }],
  ['c06-x-A', '1', 'x', '(x) A 11...Bb6', '11... Bb6', { r: 'Tal–Keres, Iugoslávia 1959', c: '11...Bb6 é jogável, como em Tal–Keres.' }],
  ['c06', 'x-B', 'x', '(x) B', '11 Bxf6 Qxf6 12 Nxd5 Qxb2 13 Nc7 Rad8 14 Qc1 Qxc1 15 Raxc1', { a: '⩲', c: '11.Bxf6 Qxf6 12.Nxd5 Qxb2 13.Nc7 Rad8 14.Qc1 Qxc1 15.Raxc1 é um final um pouco melhor para as brancas, visto em muitas partidas, recentes e antigas.' }],
  ['c06', 'y-A', 'y', '(y) A', '12... Re8 13 e3 Nb4 14 Nd4 h6 15 Bxf6 Qxf6', { a: '=', r: 'Rubinstein–Lasker, Berlim 1918', c: '12...Re8 13.e3 Nb4 14.Nd4 h6 15.Bxf6 Qxf6 foi igual em Rubinstein–Lasker.' }],
  ['c06-y-A', '1', 'y', '(y) A 14.a3', '14 a3 Nc6 15 b4', { r: 'Korchnoi', c: 'Korchnoi sugere 14.a3 Nc6 15.b4.' }],
  ['c06', 'y-B', 'y', '(y) B', '12... Rc8 13 Bxf6 Qxf6 14 Nxd5 Bxd5 15 Qxd5', { a: '⩲', c: '12...Rc8 13.Bxf6 Qxf6 14.Nxd5 Bxd5 15.Qxd5 é um pouco melhor para as brancas. (O livro segue com 15...Qxb2 16.Qd2, mas o peão branco já está em b3; a linha ficou até 15.Qxd5.)' }],
  ['c06', 'z', 'z', '(z)', '16 Qd2 Ne5 17 Qh6 Ng6 18 Qh5 Rad8 19 Nf5 Bxf5 20 Qxf5 Kg7 21 a4', { a: '±', r: 'Korchnoi–Piket, Nijmegen 1993', c: 'Depois de 16.Qd2 Ne5 17.Qh6 Ng6 18.Qh5 Rad8 19.Nf5 Bxf5 20.Qxf5 Kg7 21.a4 a posição era ruim para as pretas.' }],
]

const capitulo = {
  id: 'tarrasch-a',
  arquivo: 'tarrasch-a',
  nome: 'Defesa Tarrasch — Rubinstein com 9.Bg5',
  fonte: 'Modern Chess Openings — Tarrasch Defense (pp. 442–443), colunas 1–6',
  base: '1. d4 d5 2. c4 e6 3. Nc3 c5',
  corPadrao: 'b',
  ordem: 442,
  grupos: [
    { id: 'cxd4', nome: '9...cxd4', colunas: [1, 2, 3, 4] },
    { id: 'c4', nome: '9...c4', colunas: [5] },
    { id: 'be6', nome: '9...Be6', colunas: [6] },
  ],
}

module.exports = { capitulo, colunas, notas }
