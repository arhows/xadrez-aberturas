// Transcrição do MCO 15ª ed. — Defesa Índia da Dama, linha principal do 4.g3 (pp. 574–575), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs india-dama-d
// Formato: ver gambito-do-rei.cjs. Dicas em india-dama-d-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua.
// Avaliações tiradas do texto: (b) "iniciativa das brancas" ficou ⩲; (c) "com contrajogo" ficou =;
// (d) A "grande vantagem de espaço" ficou ±; (f) "empate combinado" ficou =; (j) e (q) "vantagem no final" ficaram ⩲;
// (k) 10...f5 "pequena desvantagem" ficou ⩲; (n) "vantagem mínima" ficou ⩲.
// Errata: na nota (s) o livro dá 9...exd5, mas o peão e preto já foi para d5 no 7º lance; ficou 9...cxd5.
// Errata: na nota (u) o livro dá 17...exd5, mas as pretas já não têm peão e (foi para d5 no 7º lance); ficou 17...cxd5.

const F = '1 d4 Nf6 2 c4 e6 3 Nf3 b6 4 g3 Bb7 5 Bg2 Be7 6 O-O O-O'

const colunas = {
  c19: [`${F} 7 Nc3 Ne4 8 Bd2 Bf6 9 Rc1 c5 10 d5 exd5 11 cxd5 Nxd2 12 Nxd2 d6 13 Nde4 Be5`, 'ne4', '7.Nc3 Ne4 8.Bd2 Bf6 9.Rc1 c5', '=',
    'O fianqueto, 4.g3, disputa a grande diagonal e as casas e4 e d5. Na linha principal, 7.Nc3 Ne4, as pretas trocam uma peça para ganhar espaço. Depois de 8.Bd2 Bf6 9.Rc1 c5 10.d5 exd5 11.cxd5 Nxd2 12.Nxd2 d6 13.Nde4 Be5! o bispo fica ativo no centro, e o jogo é igual.'],
  c20: [`${F} 7 Nc3 Ne4 8 Bd2 Bf6 9 Rc1 Nxd2 10 Qxd2 d6 11 d5 e5 12 e4 a5 13 h4 Nd7`, 'ne4', '9...Nxd2', '=',
    'Com 9...Nxd2 10.Qxd2 d6 11.d5 e5 as pretas fecham o centro. Depois de 12.e4 a5 13.h4 Nd7 o jogo é igual.'],
  c21: [`${F} 7 Nc3 Ne4 8 Bd2 f5 9 d5 Bf6 10 Rc1 Na6 11 a3 Nac5 12 b4 Nxc3 13 Bxc3 Ne4`, 'ne4', '8...f5', '⩲',
    'Com 8...f5 as pretas firmam o cavalo em e4. Depois de 9.d5 Bf6 10.Rc1 Na6 11.a3 Nac5 12.b4 Nxc3 13.Bxc3 Ne4, com 14.Bxf6 as brancas ficam com vantagem no final.'],
  c22: [`${F} 7 Nc3 Ne4 8 Qc2 Nxc3 9 Qxc3 c5 10 Rd1 d6 11 b3 Bf6 12 Bb2 Qc7 13 Qc2 Nd7`, 'ne4', '8.Qc2', '⩲',
    'Com 8.Qc2 Nxc3 9.Qxc3 as brancas mantêm a dama na grande diagonal. Depois de 9...c5 10.Rd1 d6 11.b3 Bf6 12.Bb2 Qc7 13.Qc2 Nd7 as pretas montam um ouriço, e as brancas ficam só com uma vantagem mínima.'],
  c23: [`${F} 7 Nc3 d5 8 Ne5 Na6 9 cxd5 exd5 10 Qa4 Qe8 11 Qxe8 Rfxe8 12 Bg5 Ne4 13 Bxe7 Rxe7`, 'd5', '7...d5', '⩲',
    'Com 7...d5 as pretas disputam o centro com peões, mas deixam as peças brancas mais ativas. Depois de 8.Ne5 Na6 9.cxd5 exd5 10.Qa4 Qe8 11.Qxe8 Rfxe8 12.Bg5 Ne4 13.Bxe7 Rxe7 as damas saem, e as brancas ficam com vantagem no final.'],
  c24: [`${F} 7 d5 exd5 8 Nh4 c6 9 cxd5 Nxd5 10 Nf5 Nc7 11 e4 d5 12 Nc3 Nba6 13 Bf4 Bf6`, 'd5sac', '7.d5', '=',
    'O sacrifício de peão 7.d5 exd5 8.Nh4 abre a grande diagonal e mira f5. Depois de 8...c6 9.cxd5 Nxd5 10.Nf5 Nc7 11.e4 d5 12.Nc3 Nba6 13.Bf4 Bf6 as pretas devolvem o material na hora certa, e o jogo é igual.'],
}

const notas = [
  // Coluna 19
  ['c19', 'a', 'a', '(a)', '9 Qc2 Nxd2 10 Qxd2 d6 11 e4 Nd7 12 d5 Qe7 13 Rfe1 Bxc3 14 Qxc3 e5', { a: '=', r: 'Petrosian–Karpov, Milão 1975', c: '9.Qc2 Nxd2 10.Qxd2 d6 11.e4 Nd7 12.d5 Qe7 13.Rfe1 Bxc3 14.Qxc3 e5 leva à igualdade.' }],
  ['c19', 'b', 'b', '(b)', '11... Nxc3 12 Bxc3 d6 13 Nd2 Nd7 14 Nc4', { a: '⩲', r: 'Lalić', c: '11...Nxc3?! 12.Bxc3 d6 13.Nd2 Nd7 14.Nc4 deixa a iniciativa com as brancas.' }],
  ['c19', 'c', 'c', '(c)', '13 Nc4 Ba6 14 Qb3 Bxc4 15 Qxc4 Nd7 16 e3 a6 17 a4 Qe7', { a: '=', r: 'Vyzmanavin–Khalifman, URSS 1990', c: '13.Nc4 Ba6 14.Qb3 Bxc4 15.Qxc4 Nd7 16.e3 a6 17.a4 Qe7 dá contrajogo às pretas.' }],
  ['c19', 'd-A', 'd', '(d) A', '13... Be7 14 f4 Nd7 15 g4 a6 16 a4', { a: '±', r: 'Karpov–Salov, Linares 1993', c: '13...Be5 é melhor que o recuo passivo 13...Be7 14.f4 Nd7 15.g4 a6 16.a4, com grande vantagem de espaço para as brancas.' }],
  ['c19', 'd-B', 'd', '(d) B', '14 f4 Bd4+ 15 Kh1 Ba6 16 Rf3 Re8 17 a4 Qe7', { a: '=', r: 'Leitão–Milos, Brasil 2006', c: 'Depois de 13...Be5 14.f4 Bd4+ 15.Kh1 Ba6 16.Rf3 Re8 17.a4 Qe7 o jogo é igual.' }],
  ['c19-d-B', '1', 'd', '(d) B 14.Qd2', '14 Qd2 Ba6 15 Rfe1 g6', { a: '=', c: '14.Qd2 Ba6 15.Rfe1 g6 leva à igualdade.' }],
  // Coluna 20
  ['c20', 'e', 'e', '(e)', '9... d6 10 d5 Nxd2 11 Nxd2 Kh8 12 Nde4 Bxc3 13 Rxc3 Nd7 14 f4', { a: '⩲', r: 'Ftáčnik–Karpov, Dubai 1986', c: '9...d6 10.d5! Nxd2 11.Nxd2 Kh8 12.Nde4 Bxc3 13.Rxc3 Nd7 14.f4 é um pouco melhor para as brancas.' }],
  ['c20-e', '1', 'e', '(e) 10...Nxc3', '10... Nxc3 11 Bxc3 Bxc3 12 Rxc3', { a: '⩲', c: '10...Nxc3 11.Bxc3 Bxc3 12.Rxc3 é um pouco melhor para as brancas.' }],
  ['c20', 'f', 'f', '(f)', '12 b4 a5 13 a3 Nd7 14 e4 g6 15 h4 Ba6 16 Nb5 h5 17 Rc2', { a: '=', r: 'Kasparov–Salov, Skellefteå 1989', c: '12.b4 a5 13.a3 Nd7 14.e4 g6 15.h4 Ba6 16.Nb5 h5 17.Rc2, e os jogadores combinaram o empate.' }],
  ['c20', 'g', 'g', '(g)', '14 Bh3 Nc5 15 Rfd1 Bc8', { a: '=', r: 'Wojtkiewicz–Benjamin, Foxwoods 2002', c: '14.Bh3 Nc5 15.Rfd1 Bc8 leva à igualdade.' }],
  // Coluna 21
  ['c21', 'h', 'h', '(h)', '9 Qc2 Bf6 10 Rad1 Na6 11 Ne5 Nxc3 12 Bxc3 Bxg2 13 Kxg2', { a: '⩲', r: 'Ivanchuk–Timman, Wijk aan Zee 2001', c: '9.Qc2 Bf6 10.Rad1 Na6 11.Ne5 Nxc3 12.Bxc3 Bxg2 13.Kxg2 é um pouco melhor para as brancas.' }],
  ['c21', 'i', 'i', '(i)', '10 Qc2 Bxc3 11 Bxc3 exd5 12 cxd5 Bxd5 13 Rad1 c6', { a: '∓', r: 'Hübner–Tiviakov, Venlo 2000', c: '10.Qc2?! Bxc3 11.Bxc3 exd5 12.cxd5 Bxd5 13.Rad1 c6 é melhor para as pretas.' }],
  ['c21', 'j', 'j', '(j)', '14 Bxf6 Qxf6 15 Qd4 Ng5 16 Qxf6 Nxf3+ 17 Bxf3 Rxf6 18 Rfd1', { a: '⩲', r: 'Ftáčnik–Prandstetter, Varsóvia 1987', c: '14.Bxf6 Qxf6 15.Qd4! Ng5 16.Qxf6 Nxf3+ 17.Bxf3 Rxf6 18.Rfd1 dá às brancas vantagem no final.' }],
  // Coluna 22
  ['c22', 'k', 'k', '(k)', '8 Nxe4 Bxe4 9 Ne1 Bxg2 10 Nxg2 d5 11 Qa4 Qd7 12 Qxd7 Nxd7', { a: '=', c: '8.Nxe4 Bxe4 9.Ne1 Bxg2 10.Nxg2 d5 11.Qa4 Qd7 12.Qxd7 Nxd7 é igual e levou a muitos "empates de grande mestre".' }],
  ['c22-k', '1', 'k', '(k) 10...f5', '10... f5', { a: '⩲', c: 'Se quiserem evitar essa continuação estéril, as pretas podem jogar 10...f5, com uma pequena desvantagem.' }],
  ['c22', 'l', 'l', '(l)', '9... f5 10 b3 Bf6 11 Bb2 d6 12 Qd2 Nd7 13 Ne1 Bxg2 14 Nxg2 Bg5 15 Qc2 Nf6 16 d5 Qd7', { a: '=', r: 'Andersson–Ehlvest, Clermont-Ferrand 1989', c: 'Uma boa alternativa é 9...f5 10.b3 Bf6 11.Bb2 d6 12.Qd2 Nd7 13.Ne1 Bxg2 14.Nxg2 Bg5 15.Qc2 Nf6 16.d5 Qd7, com igualdade.' }],
  ['c22', 'm-A', 'm', '(m) A', '10 b3 Bf6 11 Bb2 cxd4 12 Nxd4 Bxg2 13 Kxg2 Nc6 14 Qe3 Qc8', { a: '=', r: 'Azmaiparashvili–Timman, Pula 1997', c: '10.b3 Bf6 11.Bb2 cxd4 12.Nxd4 Bxg2 13.Kxg2 Nc6 14.Qe3 Qc8 leva à igualdade.' }],
  ['c22', 'm-B', 'm', '(m) B', '10 dxc5 bxc5 11 Rd1 d6 12 b3 Nc6 13 Bb2 Bf6', { a: '=', r: 'Najdorf–Gheorghiu, Buenos Aires 1970', c: '10.dxc5 bxc5 11.Rd1 d6 12.b3 Nc6 13.Bb2 Bf6 leva à igualdade.' }],
  ['c22', 'n', 'n', '(n)', '14 e4 Rac8 15 Qe2 Rfd8 16 Rd2 cxd4 17 Bxd4 Bxd4 18 Nxd4 a6', { a: '⩲', r: 'Grivas–Z. Almasi, Olimpíada de Moscou 1994', c: '14.e4 Rac8 15.Qe2 Rfd8 16.Rd2 cxd4 17.Bxd4 Bxd4 18.Nxd4 a6 deixa as brancas só com uma vantagem mínima numa posição tipo ouriço.' }],
  // Coluna 23
  ['c23', 'o', 'o', '(o)', '8... Nbd7 9 cxd5 exd5 10 Qa4 Nxe5 11 dxe5 Ne8 12 Nxd5 Bxd5 13 Rd1 c6 14 e4', { a: '±', r: 'Najdorf–Wexler, Buenos Aires 1965', c: 'As pretas têm sérios problemas depois de 8...Nbd7 9.cxd5 exd5 10.Qa4! Nxe5 11.dxe5 Ne8 12.Nxd5! Bxd5 13.Rd1 c6 14.e4, melhor para as brancas.' }],
  ['c23', 'p', 'p', '(p)', '9 Bg5 c5 10 e3 Ne4 11 Bxe7 Qxe7 12 cxd5 exd5 13 Qa4 Nc7', { a: '=', r: 'Browne–Spassky, Tilburg 1978', c: '9.Bg5 c5 10.e3 Ne4 11.Bxe7 Qxe7 12.cxd5 exd5 13.Qa4 Nc7 leva à igualdade.' }],
  ['c23', 'q', 'q', '(q)', '14 e3 Rd8 15 Nd3 c5 16 dxc5 bxc5 17 Rfd1', { a: '⩲', r: 'Karkanaque–Dervishi, Erevan 2000', c: '14.e3 Rd8 15.Nd3 c5 16.dxc5 bxc5 17.Rfd1 dá às brancas vantagem no final.' }],
  // Coluna 24
  ['c24', 'r-A', 'r', '(r) A', '7 Qc2 c5 8 dxc5 bxc5 9 Nc3 d6 10 Rd1 Qb6 11 b3 Nc6', { a: '=', r: 'Grünfeld–Eliskases, Viena 1935', c: 'Os outros lances não criam problemas para as pretas: 7.Qc2 c5 8.dxc5 bxc5 9.Nc3 d6 10.Rd1 Qb6 11.b3 Nc6 leva à igualdade.' }],
  ['c24', 'r-B', 'r', '(r) B', '7 b3 d5 8 cxd5 exd5 9 Bb2 Nbd7 10 Nc3 Re8 11 Rc1 a6 12 Rc2 Bd6', { a: '=', r: 'Lisenko–Adams, Dublin 1991', c: '7.b3 d5 8.cxd5 exd5 9.Bb2 Nbd7 10.Nc3 Re8 11.Rc1 a6 12.Rc2 Bd6 leva à igualdade.' }],
  ['c24', 'r-C', 'r', '(r) C', '7 Re1 d5 8 cxd5 exd5 9 Nc3 c5 10 Bf4 Nbd7 11 Rc1 Ne4', { a: '=', r: 'Ivanchuk–van Wely, Mônaco (às cegas) 1998', c: '7.Re1 d5 8.cxd5 exd5 9.Nc3 c5 10.Bf4 Nbd7 11.Rc1 Ne4 leva à igualdade.' }],
  ['c24', 's', 's', '(s)', '9... cxd5 10 Nc3 Na6 11 Nf5 Nc7 12 Bf4 d6 13 Re1 Re8 14 Rc1 Bf8 15 Ne3 Qd7 16 Nexd5', { a: '⩲', r: 'Lputian–Dzindzichashvili, Interzonal de Manila 1990', c: '9...cxd5 10.Nc3 Na6 11.Nf5 Nc7 12.Bf4 d6 13.Re1 Re8 14.Rc1 Bf8 15.Ne3 Qd7 16.Nexd5 é um pouco melhor para as brancas.' }],
  ['c24', 't', 't', '(t)', '12 Re1 d4 13 Nxd4 c5 14 Nf5 Nc6 15 Nc3 Nd4', { a: '=', r: 'Aronian–Ivanchuk, Linares 2007', c: '12.Re1 d4 13.Nxd4 c5 14.Nf5 Nc6 15.Nc3 Nd4 leva à igualdade.' }],
  ['c24', 'u', 'u', '(u)', '14 Nd6 Bc8 15 exd5 Bxc3 16 bxc3 Nxd5 17 Bxd5 cxd5 18 Qxd5 Be6', { a: '=', r: 'Yusupov–Beliavsky, Munique 1990', c: '14.Nd6 Bc8 15.exd5 Bxc3 16.bxc3 Nxd5 17.Bxd5 cxd5 18.Qxd5 Be6 leva à igualdade.' }],
]

const capitulo = {
  id: 'india-dama-d',
  arquivo: 'india-dama-d',
  nome: 'Índia da Dama — 4.g3, linha principal',
  fonte: 'Modern Chess Openings — Queen\'s Indian Defense (pp. 574–575), colunas 19–24',
  base: '1. d4 Nf6 2. c4 e6 3. Nf3 b6',
  corPadrao: 'b',
  ordem: 574,
  grupos: [
    { id: 'ne4', nome: '7.Nc3 Ne4', colunas: [19, 20, 21, 22] },
    { id: 'd5', nome: '7.Nc3 d5', colunas: [23] },
    { id: 'd5sac', nome: '7.d5', colunas: [24] },
  ],
}

module.exports = { capitulo, colunas, notas }
