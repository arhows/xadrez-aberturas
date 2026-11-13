// Transcrição do MCO 15ª ed. — Gambito da Dama Recusado, Variante Ortodoxa (pp. 398–399), colunas 13–18.
// Gerar: node scripts/mco/gerar.cjs gdr-c
// Formato: ver gambito-do-rei.cjs. Dicas em gdr-c-dicas.cjs.
//
// As notas (k), (p) e (v) não trazem lances; o comentário delas entrou no resumo das colunas 15, 16 e 17.
// Correções: na nota (n) o livro traz 13.Bxb5, mas não há peça em b5; ficou 13.Bb5.
// Na nota (l) o livro segue 7.Qb3 b6 com 8.O-O, impossível com o bispo em f1; a linha ficou só até 7...b6.

const B = '1 d4 d5 2 c4 e6 3 Nc3 Nf6 4 Bg5 Be7 5 e3 O-O 6 Nf3 Nbd7'

const colunas = {
  c13: [`${B} 7 Rc1 c6 8 Qc2 a6 9 a4 Re8 10 Bd3 dxc4 11 Bxc4 Nd5 12 Bxe7 Qxe7 13 O-O Nb4`, 'rc1', '7.Rc1 c6 8.Qc2 a6', '⩲',
    'Com 8.Qc2 as brancas adiam Bd3 e esperam que as pretas troquem em c4. As pretas respondem com o útil 8...a6 e só depois fazem a manobra libertadora; o cavalo vai a b4 contra a dama, mas as brancas ficam um pouco melhor.'],
  c14: [`${B} 7 Rc1 a6 8 b3 h6 9 Bh4 Bb4 10 Bd3 c5 11 O-O cxd4 12 exd4 Qa5 13 Qc2 dxc4`, 'rc1', '7...a6 8.b3', '⩲',
    'Com 7...a6 as pretas preparam ...dxc4 e ...b5. As brancas firmam c4 com 8.b3; as pretas jogam ...Bb4 e ...c5 e dão às brancas um peão isolado, mas as brancas ficam com pequena vantagem.'],
  c15: [`${B} 7 Rc1 dxc4 8 Bxc4 c5 9 O-O a6 10 Be2 cxd4 11 Nxd4 Qb6 12 Qc2 Re8 13 Rfd1 Nf8`, 'rc1', '7...dxc4 8.Bxc4 c5', '⩲',
    'Com 7...dxc4 e 8...c5 as pretas abrem o jogo logo. Depois de 10...cxd4 11.Nxd4 as peças brancas ficam mais ativas, e elas mantêm uma pequena vantagem (Nenashev–Peregadov, Akmola 1993).'],
  c16: [`${B} 7 Qc2 c6 8 O-O-O dxc4 9 Bxc4 b5 10 Bd3 Bb7 11 Kb1 h6 12 h4 Rc8 13 Rh3 Qa5`, 'qc2', '7.Qc2 c6 8.O-O-O', '±',
    'Com 7.Qc2 e 8.O-O-O as brancas rocam para lados opostos e preparam um ataque de peões na ala do rei. As pretas expandem-se na ala da dama com ...b5, mas depois de 12.h4 e 13.Rh3 as brancas têm boas chances de ataque (Burgess–Ravikumar, Londres 1987).'],
  c17: [`${B} 7 Qc2 c5 8 O-O-O Qa5 9 Kb1 dxc4 10 Bxc4 cxd4 11 Rxd4 h6 12 h4 b5 13 Bxb5`, 'qc2', '7...c5 8.O-O-O', '⩲',
    'Com 7...c5 as pretas contra-atacam o centro de imediato. Depois de 8.O-O-O Qa5 o jogo fica agudo; as pretas sacrificam um peão com 12...b5, e a posição fica confusa, mas provavelmente favorável às brancas.'],
  c18: [`${B} 7 Qc2 c5 8 Rd1 cxd4 9 Nxd4 dxc4 10 Bxc4 Qa5 11 Bh4 Ne5 12 Be2 Ng6 13 Nb3 Qb6`, 'qc2', '8.Rd1', '±',
    'Com 8.Rd1 as brancas preferem colocar a torre contra a dama preta. Depois das trocas no centro as pretas atacam o bispo com ...Ne5 e ...Ng6, mas as brancas ficam melhor.'],
}

const notas = [
  // Coluna 13
  ['c13', 'a', 'a', '(a)', '8... h6 9 Bh4 Ne4 10 Bxe7 Qxe7 11 a3 Nxc3 12 Qxc3 dxc4 13 Bxc4 b6 14 O-O Bb7 15 Rfd1 Rfd8 16 b4 Rac8 17 Be2 Nf6 18 Ne5 Nd7 19 Nxd7', { a: '⩲', r: 'Volkov–Halkias, Varsóvia 2005', c: '8...h6 9.Bh4 Ne4 10.Bxe7 Qxe7 dá às brancas uma pequena vantagem.' }],
  ['c13', 'b', 'b', '(b)', '9 a3 Re8 10 h3 dxc4 11 Bxc4 c5 12 dxc5 Nxc5 13 Rd1 Ncd7 14 O-O Qc7 15 Be2 b5 16 Bf4 Qb6 17 e4 Bb7 18 e5', { a: '⩲', r: 'Sasikiran–Kaidanov, Olimpíada de Bled 2002', c: '9.a3 Re8 10.h3 dxc4 11.Bxc4 c5 dá pequena vantagem às brancas.' }],
  ['c13', 'c', 'c', '(c)', '11... b5 12 Bd3 Bb7', { a: '∞', r: 'Vyzmanavin', c: 'Aqui Vyzmanavin considera 11...b5 12.Bd3 Bb7 indefinido.' }],
  ['c13', 'd', 'd', '(d)', '12 Bf4 Nxf4 13 exf4 c5 14 dxc5 Qc7 15 O-O Qxf4 16 Ne4 Nxc5 17 Nxc5 Bxc5 18 Bd3 b6 19 Bxh7+ Kh8 20 Be4 Ra7 21 b4 Bf8 22 Qc6 Rd7 23 g3 Qb8 24 Ng5 Red8 25 Bg6 Qe5 26 Nxf7+ Rxf7 27 Bxf7 Qf5 28 Rfd1 Rxd1+ 29 Rxd1 Qxf7 30 Qxc8 Kh7 31 Qxa6 Qf3 32 Qd3+', { a: '+−', r: 'Alekhine–Rubinstein, Karlovy Vary 1923', c: '12.Bf4 Nxf4 13.exf4 c5 14.dxc5 Qc7 15.O-O Qxf4 16.Ne4 foi jogado em Alekhine–Rubinstein; depois de 19.Bxh7+ as brancas atacaram e as pretas abandonaram depois de 32.Qd3+.' }],
  ['c13-d', '1', 'd', '(d) 19...Kf8', '19... Kf8', { c: '19...Kh8 foi o erro decisivo, segundo Alekhine; depois de 19...Kf8, disse ele, seria difícil provar a vitória.' }],
  ['c13-d', '2', 'd', '(d) 20...Rb8', '20... Rb8', { c: '20...Rb8 seria um pouco melhor.' }],
  ['c13-d', '3', 'd', '(d) 25...fxg6', '25... fxg6 26 Qe4 Bxb4 27 Qh4+ Kg8 28 Qh7+ Kf8 29 Qh8+', { a: '+−', c: 'Se 25...fxg6, 26.Qe4 Bxb4 27.Qh4+ Kg8 28.Qh7+ Kf8 29.Qh8+ dá mate em poucos lances.' }],
  ['c13', 'e', 'e', '(e)', '14 Qb3 a5 15 e4 b6 16 e5', { a: '±', r: 'Vyzmanavin–F. Braga, Benidorm 1993', c: 'Depois de 14.Qb3 a5 15.e4 b6 16.e5 as brancas ficaram com vantagem.' }],
  // Coluna 14
  ['c14', 'f-A', 'f', '(f) A', '8 c5 c6 9 Bd3 e5 10 Bxf6 Bxf6 11 dxe5 Be7 12 Qc2 g6 13 Na4 Qc7', { a: '=', r: 'Vaganian–Onischuk, Moscou 2002', c: '8.c5 c6 9.Bd3 e5 10.Bxf6 Bxf6 leva a uma posição mais ou menos igual.' }],
  ['c14', 'f-B', 'f', '(f) B', '8 cxd5 exd5 9 Bd3 c6 10 O-O Re8 11 Bb1 Nf8', { a: '⩲', r: 'Gligorić–Ivkov, Bugojno 1979', c: '8.cxd5 exd5 9.Bd3 c6 10.O-O Re8 11.Bb1 Nf8 talvez dê uma mínima vantagem às brancas.' }],
  ['c14', 'g', 'g', '(g)', '11... Qa5 12 Qc2 Ba3 13 Rb1 Bb4 14 Rfc1 Ba3', { a: '=', r: 'Kharitonov', c: '11...Qa5 12.Qc2 Ba3 13.Rb1 Bb4 14.Rfc1 Ba3, sugerido por Kharitonov, é uma pequena melhoria para as pretas.' }],
  ['c14', 'h', 'h', '(h)', '14 bxc4 b5 15 c5 Bb7 16 Ne4', { a: '±', r: 'Zvjagintsev–Kharitonov, Rússia 1995', c: 'A partida seguiu 14.bxc4 b5 15.c5 Bb7, e agora 16.Ne4 teria dado às brancas clara vantagem.' }],
  // Coluna 15
  ['c15', 'i', 'i', '(i)', '10 dxc5 Nxc5 11 b4 Nce4 12 Nxe4 Nxe4 13 Bxe7 Qxe7 14 Qd4 Nf6 15 Bb3 a5 16 b5 a4 17 Bc4 Rd8 18 Qf4 Bd7', { a: '=', r: 'I. Sokolov–Iordachescu, Olimpíada de Bled 2002', c: '10.dxc5 Nxc5 11.b4 Nce4 12.Nxe4 Nxe4 leva à igualdade.' }],
  ['c15-i', '1', 'i', '(i) 10...Bxc5', '10... Bxc5 11 Ne4 Be7 12 Nd6', { a: '⩲', c: 'Se 10...Bxc5, 11.Ne4 Be7 12.Nd6 dá pequena vantagem às brancas.' }],
  ['c15', 'j', 'j', '(j)', '12 Qb3', { a: '⩲', r: 'Nenashev', c: 'Nenashev sugere 12.Qb3, que também é um pouco melhor para as brancas.' }],
  // Coluna 16
  ['c16', 'l', 'l', '(l)', '7 Qb3 b6', { r: 'Bogatyrchuk', c: '7.Qb3 b6 é outra possibilidade; Bogatyrchuk dá a continuação 8.O-O Bb7 9.Rad1 h6 10.Bh4 Ne4, com igualdade (mas o roque pequeno ainda não é possível com o bispo em f1).' }],
  ['c16', 'm-A', 'm', '(m) A', '8... Re8 9 Kb1 a6 10 h4 b5 11 c5 b4 12 Na4 a5 13 Bxf6 Bxf6 14 Ng5', { a: '±', r: 'P. Cramling–Arakhamia, Tilburg 1994', c: 'Outros lances são aceitáveis aqui: 8...Re8 9.Kb1 a6 10.h4 b5 11.c5 dá às brancas um bom ataque.' }],
  ['c16', 'm-B', 'm', '(m) B', '8... a6 9 Kb1 h6 10 Bf4 dxc4 11 Bxc4 b5 12 Be2 Bb7 13 Ne5 Rc8 14 Bf3 Qb6', { a: '=', r: 'Kaidanov–Bu Xiangzhi, Xangai 2002', c: '8...a6 9.Kb1 h6 10.Bf4 dxc4 11.Bxc4 b5 leva à igualdade.' }],
  ['c16', 'n', 'n', '(n)', '9... Nd5 10 Bxe7 Qxe7 11 Kb1 Nxc3+ 12 Qxc3 c5 13 Bb5', { a: '±', r: 'Vyzmanavin–Balster, Gelsenkirchen 1991', c: '9...Nd5 10.Bxe7 Qxe7 11.Kb1 Nxc3+ 12.Qxc3 c5 13.Bb5 favorece as brancas. (O livro traz 13.Bxb5, mas não há peça em b5.)' }],
  ['c16', 'o', 'o', '(o)', '10... b4 11 Na4', { a: '±', r: 'Burgess–Richardson, Inglaterra 1987', c: '10...b4 11.Na4 favorece as brancas.' }],
  // Coluna 17
  ['c17', 'q', 'q', '(q)', '8 cxd5 Nxd5 9 Bxe7 Qxe7 10 Nxd5 exd5 11 Bd3 g6', { a: '=', r: 'Piket–Morović, Wijk aan Zee 1994', c: '8.cxd5 Nxd5 9.Bxe7 Qxe7 10.Nxd5 exd5 leva à igualdade.' }],
  ['c17-q', '1', 'q', '(q) 8...cxd4', '8... cxd4 9 Nxd4 Nxd5 10 Bxe7 Nxe7 11 Be2 Nf6', { a: '⩲', r: 'Vladimirov–Kharitonov, Moscou 1981', c: 'Também é possível 8...cxd4 9.Nxd4 Nxd5 10.Bxe7 Nxe7, e as brancas têm muito pouco.' }],
  ['c17', 'r', 'r', '(r)', '8... cxd4 9 Rxd4 Qa5 10 cxd5 exd5 11 h4 Nb6 12 Rf4 Bd6 13 Rxf6 gxf6 14 Bxf6 Nd7 15 Qf5', { a: '+−', r: 'Hillarp Persson–Arencibia, Olimpíada de Bled 2002', c: 'Uma miniatura original surgiu da recaptura 8...cxd4 9.Rxd4!? Qa5 10.cxd5 exd5 11.h4; as pretas abandonaram depois de 15.Qf5.' }],
  ['c17', 's', 's', '(s)', '9 h4 cxd4 10 Nxd4 Bb4 11 Nb3 Qb6 12 Kb1 dxc4 13 Bxc4 Qc6', { a: '=', r: 'Cebalo–Campora, Sarajevo 1986', c: '9.h4 cxd4 10.Nxd4 Bb4 11.Nb3 leva a uma posição mais ou menos igual.' }],
  ['c17', 't', 't', '(t)', '11 exd4 b5 12 Bxb5 Rb8 13 Bd3 Ba3', { a: '∞', r: 'Timoshenko–Ruban, Novosibirsk 1987', c: '11.exd4 b5 12.Bxb5 Rb8 13.Bd3 Ba3 deixa o jogo indefinido.' }],
  ['c17', 'u', 'u', '(u)', '11... e5 12 Rh4 Re8 13 Nd5 g6 14 Nc7', { a: '+−', r: 'Shpindler–Dejlic, por correspondência 1972', c: 'Não 11...e5? 12.Rh4 Re8 13.Nd5 g6 14.Nc7, e as brancas ganham.' }],
  // Coluna 18
  ['c18', 'w', 'w', '(w)', '8... Qa5 9 cxd5 Nxd5 10 Bxe7 Nxe7 11 Bd3 Nf6 12 O-O cxd4 13 Nxd4 Bd7', { a: '⩲', r: 'Capablanca–Em. Lasker, Havana 1921', c: '8...Qa5 9.cxd5 Nxd5 10.Bxe7 Nxe7 deu às brancas uma pequena vantagem numa posição sem vida.' }],
  ['c18', 'x', 'x', '(x)', '12 Bb3 Ng6 13 Bg3 Nh5 14 O-O Nxg3 15 hxg3 Bd7 16 Nf5 Bc6', { a: '=', r: 'Bukhman–A. Sokolov, Campeonato Francês 2002', c: 'Recuar o bispo para o outro lado (12.Bb3) permite às pretas trocar o par dele: 12...Ng6 13.Bg3 Nh5 leva à igualdade.' }],
  ['c18', 'y', 'y', '(y)', '13 Bg3 e5 14 Nb3 Qb6 15 O-O', { a: '⩲', r: 'C. Hansen–Kveinys, Groningen 1990', c: '13.Bg3 e5 14.Nb3 Qb6 15.O-O dá pequena vantagem às brancas.' }],
  ['c18', 'z', 'z', '(z)', '14 Bg3 Bd7 15 h4', { a: '±', r: 'Korchnoi–Osnos, URSS 1963', c: 'Depois de 14.Bg3 Bd7 15.h4 as brancas ficam melhor.' }],
]

const capitulo = {
  id: 'gdr-c',
  arquivo: 'gdr-c',
  nome: 'Gambito da Dama Recusado — Ortodoxa (7.Rc1 e 7.Qc2)',
  fonte: 'Modern Chess Openings — Queen\'s Gambit Declined (pp. 398–399), colunas 13–18',
  base: '1. d4 d5 2. c4 e6',
  corPadrao: 'b',
  ordem: 398,
  grupos: [
    { id: 'rc1', nome: '7.Rc1', colunas: [13, 14, 15] },
    { id: 'qc2', nome: '7.Qc2', colunas: [16, 17, 18] },
  ],
}

module.exports = { capitulo, colunas, notas }
