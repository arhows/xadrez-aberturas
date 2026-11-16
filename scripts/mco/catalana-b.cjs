// Transcrição do MCO 15ª ed. — Abertura Catalã, Variante Aberta com 7.Qc2 a6 8.Qxc4 b5 9.Qc2 Bb7 (pp. 522–523), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs catalana-b
// Formato: ver gambito-do-rei.cjs. Dicas em catalana-b-dicas.cjs.
//
// A tabela não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correção: a nota (d) numera a continuação como 12 Qxc3 Bxg2 13 Kxg2; ela segue o 16...Nxc3 da coluna e é 17.Qxc3 Bxg2 18.Kxg2.

const A = '1 d4 Nf6 2 c4 e6 3 g3 d5 4 Bg2 dxc4 5 Nf3 Be7 6 O-O O-O 7 Qc2 a6 8 Qxc4 b5 9 Qc2 Bb7'
const F = `${A} 10 Bf4`
const G = `${A} 10 Bg5 Nbd7 11 Bxf6 Nxf6 12 Nbd2 Rc8 13 Nb3`

const colunas = {
  c07: [`${F} Nd5 11 Nc3 Nxf4 12 gxf4 Nc6 13 Rfd1 Nb4 14 Qc1 Qb8 15 a3 Nd5 16 Ne5 Nxc3`, 'bf4', '10.Bf4 Nd5', '⩲',
    'Com 8.Qxc4 b5 9.Qc2 Bb7 as brancas recuperam o peão, mas deixam as pretas expandirem na ala da dama e porem o bispo na grande diagonal. Contra 10.Bf4, o lance 10...Nd5 troca o bispo. Depois de 11.Nc3 Nxf4 12.gxf4 Nc6 13.Rfd1 Nb4 14.Qc1 Qb8 15.a3 Nd5 16.Ne5 Nxc3 17.Qxc3 Bxg2 18.Kxg2 as brancas ficam um pouco melhor, com o centro forte apesar dos peões dobrados.'],
  c08: [`${F} Nc6 11 Rd1 Nb4 12 Qc1 Rc8 13 Nc3 Nbd5 14 Nxd5 Bxd5 15 Be3 Ng4 16 Ne1 Bxg2`, 'bf4', '10...Nc6', '=',
    'Com 10...Nc6 o cavalo vai a b4 e d5. Depois de 11.Rd1 Nb4 12.Qc1 Rc8 13.Nc3 Nbd5 14.Nxd5 Bxd5 15.Be3 Ng4 16.Ne1 Bxg2 17.Nxg2 Qd5 18.f3 Nxe3 as pretas trocam o bispo e o jogo é igual (Bruzón–Anand, Olimpíada de Turim 2006).'],
  c09: [`${F} Bd6 11 Nbd2 Nbd7 12 Bg5 Rc8 13 Nb3 h6 14 Bxf6 Nxf6 15 Rac1 Bd5 16 Rfd1 Qe7`, 'bf4', '10...Bd6', '⩲',
    'Com 10...Bd6 as pretas desafiam o bispo de f4. Depois de 11.Nbd2 Nbd7 12.Bg5 Rc8 13.Nb3 h6 14.Bxf6 Nxf6 15.Rac1 Bd5 16.Rfd1 Qe7 o cavalo branco em b3 vigia c5, e as brancas ficam um pouco melhor.'],
  c10: [`${G} Be4 14 Qc3 Nd5 15 Qd2 c5 16 Nxc5 Bxc5`, 'bg5', '10.Bg5 Nbd7 13...Be4', '⩲',
    'Com 10.Bg5 as brancas trocam o cavalo de f6 e lutam pela casa c5. Depois de 10...Nbd7 11.Bxf6 Nxf6 12.Nbd2 Rc8 13.Nb3 Be4 14.Qc3 Nd5 15.Qd2 c5 16.Nxc5 Bxc5 17.dxc5 Rxc5 as pretas liberam o jogo, mas as brancas mantêm uma vantagem mínima.'],
  c11: [`${G} c5 14 dxc5 Be4 15 Qc3 Bd5 16 Rac1 Nd7`, 'bg5', '13...c5', '⩲',
    'Com 13...c5 as pretas entregam o peão por um momento para ativar as peças. Depois de 14.dxc5 Be4 15.Qc3 Bd5 16.Rac1 Nd7 17.Qe3 Bxb3 18.Qxb3 Nxc5 o material fica igual, e as brancas ficam só um pouco melhor.'],
  c12: [`${A} 10 Bd2 Be4 11 Qc1 Nbd7 12 Ba5 Rc8 13 Nbd2 Ba8 14 Qc2 Qe8 15 b4 Nd5 16 a3 f5`, 'bd2', '10.Bd2', '=',
    'Com 10.Bd2 o bispo vai a a5 para fixar a ala da dama das pretas. Depois de 10...Be4 11.Qc1 Nbd7 12.Ba5 Rc8 13.Nbd2 Ba8 14.Qc2 Qe8 15.b4 Nd5 16.a3 f5 as pretas montam um Stonewall e buscam jogo na ala do rei; o jogo é quase igual.'],
}

const notas = [
  // Coluna 7
  ['c07', 'a-A', 'a', '(a) A', '7... c5 8 Qxc4 cxd4 9 Nxd4 e5 10 Nb3 Nc6 11 Be3 Be6 12 Qb5', { a: '⩲', r: 'Dunnington', c: 'Se 7...c5, então 8.Qxc4 cxd4 9.Nxd4 e5 10.Nb3 Nc6 11.Be3 Be6 12.Qb5 é um pouco melhor para as brancas.' }],
  ['c07', 'a-B', 'a', '(a) B', '7... c5 8 dxc5 Qc7 9 Qxc4 Qxc5 10 Qxc5 Bxc5 11 a3', { a: '⩲', r: 'Khodos–Krogius, URSS 1967', c: 'Contra 7...c5 também serve 8.dxc5 Qc7 9.Qxc4 Qxc5 10.Qxc5 Bxc5 11.a3, um pouco melhor para as brancas.' }],
  ['c07', 'b', 'b', '(b)', '11 Nbd2 Nd7 12 Nb3 c5 13 dxc5 Rc8 14 Rad1 Nxc5 15 e4 Nd7', { a: '=', r: 'Gurieli–Kragelj, Pula 1997', c: '11.Nbd2 Nd7 12.Nb3 c5 13.dxc5 Rc8 14.Rad1 foi a partida; agora 14...Nxc5 15.e4 Nd7 é igual (Kragelj).' }],
  ['c07', 'c-A', 'c', '(c) A', '12... Nd7 13 Rfd1 Bxf3 14 Bxf3 Rb8 15 e3', { a: '⩲', r: 'Kramnik–Svidler, Linares 1998', c: '12...Nd7 13.Rfd1 Bxf3 14.Bxf3 Rb8 15.e3 é um pouco melhor para as brancas.' }],
  ['c07', 'c-B', 'c', '(c) B', '12... Ra7 13 Rfd1 Bd6 14 Ng5', { a: '⩲', r: 'Inkiov–Bönsch, Stara Zagora 1990', c: '12...Ra7 13.Rfd1 Bd6 14.Ng5 é um pouco melhor para as brancas.' }],
  ['c07', 'd', 'd', '(d)', '17 Qxc3 Bxg2 18 Kxg2', { a: '⩲', r: 'Stangl–Ruf, Kecskemét 1990', c: '17.Qxc3 Bxg2 18.Kxg2 é um pouco melhor para as brancas. (O livro numera como 12.Qxc3 Bxg2 13.Kxg2.)' }],
  // Coluna 8
  ['c08', 'e', 'e', '(e)', '11 Nc3 Rc8 12 Rad1 Nb4 13 Qb1 Nbd5', { a: '=', r: 'Piket–Lautier, Wijk aan Zee 1997', c: '11.Nc3 Rc8 12.Rad1 Nb4 13.Qb1 Nbd5 é igual.' }],
  ['c08-e', '1', 'e', '(e) 11...Nxd4', '11... Nxd4 12 Nxd4 Bxg2 13 Nxe6', { a: '⩲', c: '11...Nxd4 12.Nxd4 Bxg2 13.Nxe6 é um pouco melhor para as brancas.' }],
  ['c08', 'f', 'f', '(f)', '12... Qc8 13 Bg5 c5 14 Bxf6 Bxf6 15 dxc5', { a: '⩲', r: 'Vera–Sisniega, México 1984', c: '12...Qc8 13.Bg5 c5 14.Bxf6 Bxf6 15.dxc5 não iguala para as pretas.' }],
  ['c08-f', '1', 'f', '(f) 14...gxf6', '14... gxf6 15 Nc3 Rd8', { a: '⩲', r: 'Agzamov–Karpov, URSS 1983', c: '14...gxf6 15.Nc3 Rd8 também não iguala.' }],
  ['c08', 'g', 'g', '(g)', '17 Nxg2 Qd5 18 f3 Nxe3', { a: '=', r: 'Bruzón–Anand, Olimpíada de Turim 2006', c: '17.Nxg2 Qd5 18.f3 Nxe3 é igual.' }],
  // Coluna 9
  ['c09', 'h', 'h', '(h)', '11... Bxf4 12 gxf4 Nbd7 13 Rfc1', { a: '⩲', r: 'Stangl–Henke, Dortmund 1993', c: '11...Bxf4 12.gxf4 Nbd7 13.Rfc1 é um pouco melhor para as brancas.' }],
  ['c09', 'i', 'i', '(i)', '17 Nfd2 Bxg2 18 Kxg2 e5 19 dxe5 Qxe5 20 Nf3', { a: '⩲', r: 'C. Hansen–S. Petersen, Dinamarca 1990', c: '17.Nfd2 Bxg2 18.Kxg2 e5 19.dxe5 Qxe5 20.Nf3 é um pouco melhor para as brancas.' }],
  // Coluna 10
  ['c10', 'j', 'j', '(j)', '14... Nd7 15 Rfd1 c6 16 Rac1 Qb6 17 Nc5 Nxc5 18 dxc5 Qc7 19 Ne5', { a: '⩲', r: 'Andersson–Winants, Tilburg (rápidas) 1993', c: '14...Nd7 15.Rfd1 c6 16.Rac1 Qb6 17.Nc5 Nxc5 18.dxc5 Qc7 19.Ne5 é um pouco melhor para as brancas.' }],
  ['c10', 'k-A', 'k', '(k) A', '15 Qc6', { a: '=', c: '15.Qc6 já foi tentado, mas as pretas conseguiram igualar.' }],
  ['c10', 'k-B', 'k', '(k) B', '15 Qc1', { a: '=', c: '15.Qc1 já foi tentado, mas as pretas conseguiram igualar.' }],
  ['c10', 'k-C', 'k', '(k) C', '15 Qa5', { a: '=', c: '15.Qa5 já foi tentado, mas as pretas conseguiram igualar.' }],
  ['c10', 'l', 'l', '(l)', '17 dxc5 Rxc5 18 Rfc1 Rxc1+ 19 Rxc1 Qa8', { a: '⩲', r: 'Burgos–De Souza, São Paulo 2004', c: '17.dxc5 Rxc5 18.Rfc1 Rxc1+ 19.Rxc1 Qa8 deixa as brancas só com uma vantagem mínima.' }],
  // Coluna 11
  ['c11', 'm-A', 'm', '(m) A', '14... Bd5 15 Ne1 Bxb3 16 Qxb3 Bxc5 17 Nd3', { a: '±', r: 'Konopka–Breyther, Bundesliga 1994', c: '14...Bd5 15.Ne1 Bxb3 16.Qxb3 Bxc5 17.Nd3 é melhor para as brancas.' }],
  ['c11', 'm-B', 'm', '(m) B', '14... a5 15 a4 Be4 16 Qc3 b4 17 Qe3 Bd5 18 Rfd1', { a: '⩲', r: 'L. B. Hansen–B. Hansen, Campeonato Dinamarquês 1996', c: '14...a5 15.a4 Be4 16.Qc3 b4 17.Qe3 Bd5 18.Rfd1 é um pouco melhor para as brancas.' }],
  ['c11', 'n', 'n', '(n)', '17 Qe3 Bxb3 18 Qxb3 Nxc5 19 Qe3', { a: '⩲', r: 'Kunte–Wells, Edimburgo 2003', c: '17.Qe3 Bxb3 18.Qxb3 Nxc5 19.Qe3 dá às brancas uma pequena vantagem.' }],
  // Coluna 12
  ['c12', 'o', 'o', '(o)', '10... Nc6 11 e3 Ra7 12 Rc1 Qa8 13 Ne1 Nb8 14 Bxb7 Qxb7 15 Ba5 c5 16 dxc5 Nc6', { a: '∞', r: 'I. Almasi–Borocz, Hungria 1998', c: '10...Nc6 é uma alternativa: 11.e3 Ra7 12.Rc1 Qa8 13.Ne1 Nb8 14.Bxb7 Qxb7 15.Ba5 foi a partida; agora 15...c5 16.dxc5 Nc6 daria chances para os dois lados.' }],
  ['c12-o', '1', 'o', '(o) 11.Rd1', '11 Rd1 Nxd4 12 Nxd4 Bxg2 13 Ba5 Be4 14 Qxc7 Qxc7', { a: '=', r: 'Plaskett–Adams, Campeonato Britânico 1997', c: '11.Rd1 Nxd4 12.Nxd4 Bxg2 13.Ba5 Be4 14.Qxc7 Qxc7 não dá nada às brancas.' }],
  ['c12', 'p-A', 'p', '(p) A', '11... Nc6 12 Be3 b4 13 Nbd2 Bd5 14 Rd1', { a: '⩲', r: 'Andersson–Skembris, Bar 1997', c: '11...Nc6 12.Be3 b4 13.Nbd2 Bd5 14.Rd1 é um pouco melhor para as brancas.' }],
  ['c12', 'p-B', 'p', '(p) B', '11... b4 12 Bg5 Nbd7 13 Nbd2 Bd5 14 Qc2', { a: '⩲', r: 'I. Almasi–Donev, Áustria 1997', c: '11...b4 12.Bg5 Nbd7 13.Nbd2 Bd5 foi a partida; agora 14.Qc2 dá às brancas uma pequena vantagem.' }],
  ['c12', 'q', 'q', '(q)', '17 Rae1 Qh5 18 e4 fxe4 19 Rxe4 Qf5', { a: '=', r: 'Payen–Ze Quang, França 2002', c: '17.Rae1 Qh5 18.e4 fxe4 19.Rxe4 Qf5 é quase igual.' }],
  ['c12-q', '1', 'q', '(q) 17...Qg6', '17... Qg6 18 e4 fxe4 19 Qxe4', { a: '⩲', r: 'Gelfand–Lutz 2002', c: '17...Qg6 18.e4 fxe4 19.Qxe4 é um pouco melhor para as brancas.' }],
]

const capitulo = {
  id: 'catalana-b',
  arquivo: 'catalana-b',
  nome: 'Catalã — Aberta com 8.Qxc4 b5 9.Qc2 Bb7',
  fonte: 'Modern Chess Openings — Catalan Opening (pp. 522–523), colunas 7–12',
  base: '1. d4 Nf6 2. c4 e6 3. g3',
  corPadrao: 'w',
  ordem: 522,
  grupos: [
    { id: 'bf4', nome: '10.Bf4', colunas: [7, 8, 9] },
    { id: 'bg5', nome: '10.Bg5', colunas: [10, 11] },
    { id: 'bd2', nome: '10.Bd2', colunas: [12] },
  ],
}

module.exports = { capitulo, colunas, notas }
