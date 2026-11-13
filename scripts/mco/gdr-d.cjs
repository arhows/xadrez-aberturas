// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante Petrosian (7.Bxf6) (pp. 400–402), colunas 19–24.
// Gerar: node scripts/mco/gerar.cjs gdr-d
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-d-dicas.cjs.
//
// Correções: na nota (s) A o livro traz 9 h4 h6, mas o peão já está em h6 e o bispo precisa de g7 livre; ficou 9...g6.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Bg5 Be7 5 e3 O-O 6 Nf3 h6 7 Bxf6 Bxf6'

const colunas = {
  c19: [`${B} 8 Rc1 c6 9 Bd3 Nd7 10 O-O dxc4 11 Bxc4 e5 12 h3 exd4 13 exd4 Nb6 14 Bb3 Re8 15 Re1 Rxe1+`, 'rc1', '8.Rc1 c6 11...e5', '=',
    'Na Variante Petrosian as brancas trocam logo o bispo pelo cavalo (7.Bxf6), apostando numa pequena vantagem de desenvolvimento. Com 8...c6, 10...dxc4 e 11...e5 as pretas liberam o jogo; as torres se trocam na coluna e e o jogo fica igual.'],
  c20: [`${B} 8 Rc1 c6 9 Bd3 Nd7 10 O-O dxc4 11 Bxc4 c5 12 Qe2 a6 13 Rfd1 cxd4 14 Nxd4 Qe7 15 Ne4 Be5`, 'rc1', '11...c5', '⩲',
    'Com 11...c5 as pretas golpeiam d4 com outro peão. Depois de 13...cxd4 14.Nxd4 as peças brancas ficam mais ativas e, com 15.Ne4, elas mantêm a pressão.'],
  c21: [`${B} 8 Qc2 Na6 9 Rd1 c5 10 dxc5 Qa5 11 cxd5 Nxc5 12 Nd4 exd5 13 a3 Ne6 14 Be2 Nxd4 15 exd4 Be6`, 'qc2', '8.Qc2 Na6', '=',
    'Com 8.Qc2 as brancas preparam o roque grande ou Rd1. As pretas respondem com 8...Na6 e 9...c5; depois das trocas as brancas ficam com o peão isolado em d4 e o jogo fica igual.'],
  c22: [`${B} 8 Qc2 c5 9 dxc5 Nc6 10 cxd5 exd5 11 O-O-O Be6 12 Nd4 Rc8 13 Bb5 Ne7 14 Nb3 b6 15 Ba6 Rb8`, 'qc2', '8...c5 9.dxc5', '∞',
    'Com 8...c5 as pretas sacrificam o peão c para abrir linhas. Depois de 11.O-O-O as brancas rocam para o lado oposto; as pretas devolvem o peão com ...b6 e o jogo fica indefinido.'],
  c23: [`${B} 8 Qd2 dxc4 9 Bxc4 Nd7 10 O-O-O g6 11 h4 Bg7 12 Kb1 a6 13 Bb3 Qe7 14 Rc1 b6 15 Na4`, 'qd2', '8.Qd2 dxc4', '=',
    'Com 8.Qd2 as brancas também preparam o roque grande. As pretas trocam em c4, recolocam o bispo em g7 com ...g6 e preparam ...c5; com 15.Na4 as brancas impedem ...c5 e o jogo fica igual.'],
  c24: [`${B} 8 Qb3 c6 9 Rd1 Nd7 10 Bd3 Rb8 11 O-O b5 12 cxb5 cxb5 13 Rc1 a6 14 Ne2 e5 15 dxe5 Nxe5`, 'qb3', '8.Qb3 c6', '⩲',
    'Com 8.Qb3 a dama pressiona d5 e b7. As pretas preparam ...b5 com 10...Rb8 e, depois de 14...e5, liberam o jogo; as brancas ficam com uma vantagem muito pequena.'],
}

const notas = [
  // Coluna 19
  ['c19', 'a-A', 'a', '(a) A', '8... Be7 9 a3 c6 10 Bd3 Nd7 11 O-O b6 12 Qe2', { a: '⩲', r: 'A. Petrosian–Hübner, Sevilha 1997', c: 'Outras possibilidades: 8...Be7 9.a3 c6 10.Bd3 Nd7 dá pequena vantagem às brancas.' }],
  ['c19', 'a-B', 'a', '(a) B', '8... a6 9 a3 c6 10 Bd3 Nd7 11 O-O b5', { a: '=', r: 'Portisch–Short, Bruxelas 1986', c: '8...a6 9.a3 c6 10.Bd3 Nd7 11.O-O b5 leva à igualdade.' }],
  ['c19', 'a-C', 'a', '(a) C', '8... Nc6 9 cxd5 exd5 10 Be2 Ne7 11 b4 a6 12 a4', { a: '±', r: 'Korchnoi–Spassky, URSS 1963', c: '8...Nc6 9.cxd5 exd5 10.Be2 Ne7 11.b4 deixa as brancas com clara vantagem.' }],
  ['c19', 'b', 'b', '(b)', '9... dxc4 10 Bxc4 Nd7 11 Ne4 e5 12 Nxf6+ Qxf6 13 O-O Qe7 14 e4', { a: '⩲', r: 'Gligorić–Portisch, Zagreb 1965', c: 'Se 9...dxc4 10.Bxc4 Nd7, as brancas jogam 11.Ne4 e5 12.Nxf6+ e ficam com pequena vantagem.' }],
  ['c19', 'c-A', 'c', '(c) A', '12 Bb3 exd4 13 exd4 Re8 14 h3 Nf8 15 d5 Bd7', { a: '=', r: 'Ribli–Karpov, Londres 1984', c: '12.Bb3 exd4 13.exd4 Re8 14.h3 Nf8 foi igual.' }],
  ['c19', 'c-B', 'c', '(c) B', '12 Ne4 exd4 13 Nxf6+ Nxf6 14 Qxd4 Bg4 15 Qf4 Bxf3 16 Qxf3 Qd2', { a: '=', r: 'Dorfman–Lputian, URSS 1984', c: '12.Ne4 exd4 13.Nxf6+ Nxf6 14.Qxd4 Bg4 também leva à igualdade.' }],
  ['c19', 'd', 'd', '(d)', '14... Bf5 15 Re1 a5 16 a3 Re8 17 Rxe8+ Qxe8 18 Qd2 Qd7', { a: '=', r: 'H. Ólafsson–van der Sterren, Wijk aan Zee 1987', c: '14...Bf5 também é suficiente: 15.Re1 a5 16.a3 Re8 leva à igualdade.' }],
  ['c19', 'e', 'e', '(e)', '16 Qxe1 Bf5 17 Ne4 Bxe4 18 Qxe4 Nd5 19 Bxd5 cxd5 20 Qf5 Qb6 21 Rc8+ Rxc8 22 Qxc8+ Kh7 23 Qf5+ Kg8 24 Qxd5 Qxb2', { a: '=', r: 'Shabalov–Klovans, URSS 1987', c: '16.Qxe1 Bf5 17.Ne4 Bxe4 18.Qxe4 Nd5 leva a um final igual.' }],
  ['c19-e', '1', 'e', '(e) 15...Bf5', '15... Bf5 16 Rxe8+ Qxe8 17 Qd2 Qd7 18 Re1 a5 19 Qf4 a4 20 Bxf7+ Kxf7 21 g4', { a: '±', r: 'Rohde–Shapiro, Filadélfia 2004', c: 'As pretas também podem jogar como na nota anterior, com 15...Bf5 16.Rxe8+ Qxe8 17.Qd2 Qd7 18.Re1 a5, mas precisam evitar uma tática escondida: 19.Qf4 a4? 20.Bxf7+! Kxf7 21.g4.' }],
  // Coluna 20
  ['c20', 'f', 'f', '(f)', '12 dxc5 Nxc5 13 b4 Bxc3 14 Rxc3 Ne4 15 Rd3 Qe7 16 Rd4', { a: '⩲', r: 'A. Petrosian–M. Gurevich, Baku 1986', c: '12.dxc5 Nxc5 13.b4 Bxc3 14.Rxc3 dá pequena vantagem às brancas.' }],
  ['c20', 'g', 'g', '(g)', '13... b5 14 dxc5 bxc4 15 c6', { a: '±', r: 'Kasparov', c: 'Se 13...b5, 14.dxc5 bxc4 15.c6 é vantajoso para as brancas.' }],
  ['c20', 'h', 'h', '(h)', '14 exd4 b5 15 Bb3 Qb6 16 d5 Nc5', { a: '∞', r: 'Kasparov', c: '14.exd4 b5 15.Bb3 Qb6 16.d5 Nc5 leva a uma posição indefinida, segundo Kasparov.' }],
  ['c20', 'i', 'i', '(i)', '16 Qh5 Rd8 17 Bf1 Bb8 18 Qa5 b6', { a: '⩲', r: 'Kasparov–H. Ólafsson, Dubai 1986', c: '16.Qh5 Rd8 17.Bf1 Bb8 18.Qa5 b6, e as brancas mantiveram a pressão.' }],
  // Coluna 21
  ['c21', 'j-A', 'j', '(j) A', '9 cxd5 Nb4 10 Qb3 Nxd5 11 Bc4 Nxc3 12 bxc3 b6', { a: '=', r: 'P. Nikolić–K. Georgiev, Heraklion 1985', c: '9.cxd5 Nb4 10.Qb3 Nxd5 11.Bc4 Nxc3 12.bxc3 b6 foi inofensivo.' }],
  ['c21-j-A', '1', 'j', '(j) A 11.Rc1', '11 Rc1', { r: 'ECO', c: '11.Rc1 é a recomendação da ECO.' }],
  ['c21', 'j-B', 'j', '(j) B', '9 a3 dxc4 10 Bxc4 c5 11 Rd1 cxd4 12 Nxd4 Bd7 13 Ba2 Qe7 14 h4', { a: '⩲', r: 'Ribli–Beliavsky, Reggio Emilia 1986', c: '9.a3 dxc4 10.Bxc4 c5 11.Rd1 cxd4 12.Nxd4 Bd7 13.Ba2 Qe7 14.h4.' }],
  ['c21-j-B', '1', 'j', '(j) B 14...Bxh4', '14... Bxh4 15 g3 Bf6 16 Bb1', { a: '∞', r: 'Ribli', c: 'Agora 14...Bxh4 15.g3 Bf6 16.Bb1 teria sido indefinido, segundo Ribli.' }],
  ['c21', 'k', 'k', '(k)', '10 cxd5 Nb4 11 Qb3 Nxd5 12 Nxd5 exd5', { a: '=', c: '10.cxd5 Nb4 11.Qb3 Nxd5 12.Nxd5 exd5 não dá nada às brancas.' }],
  ['c21', 'l', 'l', '(l)', '12 a3 Na4', { a: '⩲', r: 'Sturua', c: '12.a3 Na4 é um pouco melhor para as brancas.' }],
  ['c21', 'm', 'm', '(m)', '14 Nb5 a6 15 b4 Qd8 16 Rxd5 Bd7 17 Qd2 axb5 18 Rxd7 Qxd7 19 Qxd7 Bxc3+ 20 Ke2 Rfd8 21 Qxb7 Ng5 22 e4 Rxa3 23 Qxb5 Ra2+ 24 Ke3 Bd2+', { a: '−+', r: 'Piket–Sturua, Debrecen 1992', c: 'Em Piket–Sturua as brancas tentaram ganhar material sem cuidado com 14.Nb5? a6 15.b4 Qd8 16.Rxd5, e foram abaladas por 18...Qxd7!. Diante de 25.Ke2 Bf4+ 26.Ke1 Ra1+ 27.Ke2 Rd2 mate, Piket abandonou.' }],
  // Coluna 22
  ['c22', 'n', 'n', '(n)', '8... Nc6 9 Rd1 b6 10 a3 Bb7 11 cxd5 exd5 12 Be2 Ne7 13 O-O a6 14 Rd2 Qd6 15 Rfd1', { r: 'Piket–Vaganian, Debrecen 1992', c: '8...Nc6 levou a um jogo interessante em Piket–Vaganian: em vez de 14.Ne5, como foi jogado, Piket recomenda 14.Rd2 Qd6 15.Rfd1, com a ideia Bf1, g3 e Bg2.' }],
  ['c22-n', '1', 'n', '(n) 9.O-O-O', '9 O-O-O', { c: '9.O-O-O também já foi jogado.' }],
  ['c22', 'o-A', 'o', '(o) A', '9... dxc4 10 Bxc4 Qa5 11 O-O Bxc3 12 Qxc3 Qxc3 13 bxc3 Nd7 14 c6 bxc6 15 Rab1 Nb6', { a: '=', r: 'Zvjagintsev–Beliavsky, Essen 2000', c: '9...dxc4 10.Bxc4 Qa5 11.O-O Bxc3 leva a um final igual.' }],
  ['c22', 'o-B', 'o', '(o) B', '9... Qa5 10 Rc1 Nc6 11 a3 d4 12 exd4 Nxd4 13 Nxd4 Bxd4', { a: '=', r: 'Piket–Korchnoi, Tilburg 1992', c: '9...Qa5 10.Rc1 Nc6 11.a3 d4 leva a uma posição mais ou menos igual: a maioria de peões branca na ala da dama é compensada pelo jogo das pretas no centro.' }],
  ['c22', 'p-A', 'p', '(p) A', '11 Bb5 Qa5 12 O-O d4', { a: '=', r: 'Chernin–Geller, URSS 1985', c: 'Depois de 11.Bb5 as pretas podem igualar com 11...Qa5 12.O-O d4.' }],
  ['c22', 'p-B', 'p', '(p) B', '11 Bb5 Bg4 12 Bxc6 bxc6 13 Nd4 Bxd4 14 exd4 Re8+', { a: '∞', r: 'Douven–Geller, Moscou 1986', c: 'Ou buscar complicações com 11...Bg4 12.Bxc6 bxc6 13.Nd4, com jogo indefinido.' }],
  ['c22', 'q', 'q', '(q)', '12 a3', { c: '12.a3 era o lance habitual antes e ainda pode ser usado.' }],
  ['c22', 'r', 'r', '(r)', '16 Ne4 Be5 17 f4 Qc7 18 Nc3 Bxc3 19 Qxc3 Qc6', { a: '∞', r: 'van Wely–Piket, Leeuwarden 1992', c: 'A partida seguiu 16.Ne4 Be5 17.f4 Qc7, e agora 18.Nc3 Bxc3 19.Qxc3 Qc6 teria sido indefinido (van Wely).' }],
  // Coluna 23
  ['c23', 's-A', 's', '(s) A', '8... c6 9 h4 g6 10 g4 Bg7 11 g5 h5 12 Ne5', { a: '±', r: 'Gelfand–Zumsande, Internet 2004', c: 'Outros lances plausíveis: 8...c6 9.h4 g6 10.g4 Bg7 11.g5 h5 12.Ne5 favorece as brancas. (O livro traz 9...h6, mas o peão já está em h6.)' }],
  ['c23', 's-B', 's', '(s) B', '8... Nc6 9 Rc1 a6 10 Be2 dxc4 11 Bxc4 e5 12 d5 Na7 13 Qc2 Bd7', { a: '=', r: 'Eingorn–A. Petrosian, URSS 1985', c: '8...Nc6 9.Rc1 a6 10.Be2 dxc4 11.Bxc4 e5 foi igual.' }],
  ['c23', 't', 't', '(t)', '9... c5 10 dxc5 Nd7 11 Ne4 Be7 12 Rd1 Qc7 13 b4 a5 14 Nd6 Nf6 15 e4 axb4 16 e5 Bxd6 17 Qxd6 Ne8 18 Qb6 Ra5', { a: '=', r: 'Bacrot–Marciano, Campeonato Francês 2000', c: '9...c5 10.dxc5 Nd7 11.Ne4 Be7 leva a uma sequência aguda que terminou em igualdade.' }],
  ['c23', 'u', 'u', '(u)', '10... c5 11 h4 cxd4 12 exd4 Nb6 13 Bb3 Bd7 14 g4', { a: '±', c: 'Se 10...c5 11.h4 cxd4 12.exd4 Nb6 13.Bb3 Bd7 14.g4, as brancas têm chances de ataque.' }],
  ['c23', 'v', 'v', '(v)', '15 Ne2 c5', { a: '∓', r: 'Sadler–van der Sterren, Linares 1995', c: '15.Na4 é melhor que 15.Ne2 c5, que deu vantagem às pretas.' }],
  // Coluna 24
  ['c24', 'w', 'w', '(w)', '9 O-O-O Nd7 10 e4 dxc4 11 Bxc4 e5 12 d5 Nc5 13 Qc2 Qb6', { a: '=', r: 'Filip–Zíta, Tchecoslováquia 1963', c: '9.O-O-O Nd7 10.e4 dxc4 11.Bxc4 e5 foi igual.' }],
  ['c24', 'x', 'x', '(x)', '9... a6 10 cxd5 cxd5 11 Bd3 Nc6 12 O-O b5 13 Bb1 g6 14 e4 Bg7 15 Rfe1 Na5', { a: '=', r: 'Nikolić–Onischuk, Wijk aan Zee 2005', c: '9...a6 10.cxd5 cxd5 11.Bd3 Nc6 12.O-O b5 levou a um jogo satisfatório para as pretas.' }],
  ['c24', 'y', 'y', '(y)', '10... b6 11 cxd5 cxd5 12 e4 dxe4 13 Bxe4 Rb8 14 O-O b5', { a: '=', r: 'Kasparov–Karpov, Moscou 1985', c: '10...b6 11.cxd5 cxd5 12.e4 dxe4 13.Bxe4 Rb8 14.O-O b5 leva à igualdade. O lance do texto tenta jogar ...b5 de uma vez.' }],
  ['c24', 'z-A', 'z', '(z) A', '13 e4 b4 14 Ne2 dxe4 15 Bxe4 Ba6', { a: '=', r: 'Gligorić–Klovans, Elista 2002', c: '13.e4 b4 14.Ne2 dxe4 15.Bxe4 Ba6 leva à igualdade.' }],
  ['c24', 'z-B', 'z', '(z) B', '13 a3 Be7 14 Qa2 a6 15 b4 Bb7 16 Rb1 Bd6 17 a4 Bc6', { a: '=', r: 'Dizdarević–Short, Sarajevo 2004', c: '13.a3 Be7 14.Qa2 a6 15.b4 Bb7 também é igual.' }],
  ['c24', 'aa', 'aa', '(aa)', '14... Bb7', { c: '14...e5 talvez seja ativo demais; 14...Bb7 já foi jogado aqui com chances razoáveis.' }],
  ['c24', 'bb', 'bb', '(bb)', '16 Nfd4 Rb6 17 Bb1 g6 18 Qc2 Qd6', { a: '⩲', r: 'Yusupov–Bönsch, Baden-Baden 1992', c: 'Em Yusupov–Bönsch, 16.Nfd4 Rb6 17.Bb1 g6 18.Qc2 Qd6 deu às brancas uma vantagem muito pequena.' }],
]

const capitulo = {
  id: 'gdr-d',
  arquivo: 'gdr-d',
  nome: 'Gambito da Dama Recusado — Variante Petrosian (7.Bxf6)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 400–402), colunas 19–24',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 400,
  grupos: [
    { id: 'rc1', nome: '8.Rc1', colunas: [19, 20] },
    { id: 'qc2', nome: '8.Qc2', colunas: [21, 22] },
    { id: 'qd2', nome: '8.Qd2', colunas: [23] },
    { id: 'qb3', nome: '8.Qb3', colunas: [24] },
  ],
}

module.exports = { capitulo, colunas, notas }
