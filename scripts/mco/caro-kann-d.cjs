// Transcrição do MCO 15ª ed. — Caro-Kann, Ataque Panov-Botvinnik (pp. 185–188), colunas 31–42.
// Gerar: node scripts/mco/gerar.cjs caro-kann-d
// Formato: ver gambito-do-rei.cjs. Dicas em caro-kann-d-dicas.cjs.

const P5 = '1 e4 c6 2 d4 d5 3 exd5 cxd5 4 c4 Nf6 5 Nc3'
const NC = `${P5} Nc6`

const colunas = {
  c31: [`${NC} 6 Bg5 Be6 7 a3 Qd7 8 b4 dxc4 9 Bxf6 gxf6 10 d5 O-O-O 11 Bxc4 Ne5 12 Bb5 Qc7`, 'bg5', '5...Nc6 6.Bg5 Be6', '⩱',
    'Ataque Panov-Botvinnik: com 4.c4 as brancas aceitam um peão isolado em d4 em troca de jogo ativo das peças. Com 6...Be6 as pretas jogam de forma aguda e ficam com bom jogo.'],
  c32: [`${NC} 6 Bg5 Qa5 7 Bd2 dxc4 8 Bxc4 e6 9 Nf3 Qb6 10 O-O Be7 11 Be3 O-O 12 Qe2 Qa5`, 'bg5', '5...Nc6 6.Bg5 Qa5', '⩲',
    'Com 6...Qa5 as pretas cravam o cavalo; depois de 7.Bd2 dxc4 as brancas ficam com o peão isolado e peças ativas.'],
  c33: [`${NC} 6 Bg5 e6 7 c5 Be7 8 Bb5 O-O 9 Nf3 Ne4 10 Bxe7 Qxe7 11 Qc2 Ng5 12 Nxg5 Qxg5`, 'bg5', '5...Nc6 6.Bg5 e6', '=',
    'Com 7.c5 as brancas fecham o flanco da dama; as pretas igualam atacando o centro. A coluna segue Keres–Alekhine, AVRO 1938.'],
  c34: [`${NC} 6 Nf3 Bg4 7 cxd5 Nxd5 8 Qb3 Bxf3 9 gxf3 e6 10 Qxb7 Nxd4 11 Bb5+ Nxb5 12 Qc6+ Ke7`, 'nf3', '5...Nc6 6.Nf3 Bg4', '⩲',
    'Com 6...Bg4 as pretas pressionam d4; a linha força um final em que as brancas têm vantagem mínima (Karpov–Kramnik, Linares 1993).'],
  c35: [`${NC} 6 Nf3 e6 7 c5 Ne4 8 Qc2 f5 9 Bb5 Bd7 10 O-O Be7 11 Bxc6 bxc6 12 Bf4`, 'nf3', '5...Nc6 6.Nf3 e6', '±',
    'Com 7.c5 as brancas ganham espaço no flanco da dama e controlam e5. A coluna é Vasiukov–Padevsky, Varna 1971.'],
  c36: [`${NC} 6 cxd5 Nxd5 7 Bc4 Nb6 8 Bb5 a6 9 Bxc6+ bxc6 10 Nf3 e6 11 O-O c5 12 Be3`, 'nf3', '5...Nc6 6.cxd5', '⩲',
    'Com 6.cxd5 as brancas abrem o jogo; depois de 8...a6?! as pretas ficam com peões fracos. A coluna é Alekhine–Coleman, Buenos Aires 1926.'],
  c37: [`${P5} e6 6 Nf3 Be7 7 c5 O-O 8 Bd3 b6 9 b4 a5 10 Na4 Nfd7 11 b5 bxc5 12 dxc5 e5 13 c6 e4`, 'e6', '5...e6 6.Nf3 Be7 7.c5', '=',
    'Com 5...e6 as pretas jogam como no Gambito da Dama. Com 7.c5 as brancas criam uma maioria no flanco da dama, e as pretas contra-atacam no centro.'],
  c38: [`${P5} e6 6 Nf3 Be7 7 cxd5 exd5 8 Bb5+ Bd7 9 Bxd7+ Nbxd7 10 Qb3 Nb6 11 O-O O-O 12 Bg5 h6 13 Bh4 Rc8`, 'e6', '5...e6 6.Nf3 Be7 7.cxd5', '⩲',
    'Com 7.cxd5 exd5 o peão isolado agora é das pretas, e as brancas ficam um pouco melhor.'],
  c39: [`${P5} e6 6 Nf3 Bb4 7 cxd5 Nxd5 8 Qc2 Nc6 9 Bd3 Ba5 10 Be4 h6 11 O-O O-O 12 Rd1 Qd6 13 Qb3 Rd8`, 'e6', '5...e6 6.Nf3 Bb4', '=',
    'Com 6...Bb4 as pretas jogam à maneira da Nimzo-Índia e igualam.'],
  c40: [`${P5} g6 6 Qb3 Bg7 7 cxd5 O-O 8 Be2 Nbd7 9 Bf3 Nb6 10 Nge2 Bg4 11 Bxg4 Nxg4 12 a4 Nf6 13 Nf4 a5`, 'g6', '5...g6 6.Qb3 … 8.Be2', '=',
    'Com 5...g6 as pretas entregam o peão de d5 por algum tempo para fazer o fianqueto. Com 8.Be2 e 9.Bf3 as brancas seguram o peão, mas as pretas igualam.'],
  c41: [`${P5} g6 6 Qb3 Bg7 7 cxd5 O-O 8 Nge2 Nbd7 9 g3 Nb6 10 Bg2 Bf5 11 Nf4 h6 12 a4 a5 13 O-O g5`, 'g6', '5...g6 6.Qb3 … 8.Nge2', '∞',
    'Com 8.Nge2 e o fianqueto as brancas defendem d5; o jogo fica complicado.'],
  c42: [`${P5} g6 6 cxd5 Bg7 7 Bc4 O-O 8 Nge2 Nbd7 9 Nf4 Nb6 10 Bb3 Bf5 11 O-O Qd7 12 a4 a5 13 h3 h5`, 'g6', '5...g6 6.cxd5', '=',
    'Com 6.cxd5 e 7.Bc4 as brancas seguram o peão de d5; as pretas igualam.'],
}

const notas = [
  // Coluna 31
  ['c31', 'a-A', 'a', '(a) A', '7 Bxf6 gxf6 8 c5 Rg8 9 g3 Bg4 10 Be2 Qd7 11 Bxg4 Rxg4', { a: '=', r: 'Psakhis–Zontakh, Portorož 1995', c: 'Há alternativas sérias, como 7.Bxf6.' }],
  ['c31', 'a-B', 'a', '(a) B', '7 c5 Ne4 8 Bh4 Nxc3 9 bxc3 Qa5 10 Qd2 Bf5 11 a4 e5 12 Bb5 Bd7 13 Nf3 e4 14 Bxc6 bxc6 15 Ne5 Qa6', { a: '=', r: 'Gelfand–Dreev, Munique 1994', c: 'Ou 7.c5, também igual.' }],
  ['c31', 'a-C', 'a', '(a) C', '7 g3 Qa5 8 Bg2 Ne4 9 Bxe4 dxe4 10 d5 O-O-O 11 Bd2 Nb4 12 Nxe4 Bf5 13 Qb1 Qb6 14 Ne2 e6', { a: '=', r: 'Tal–Hodgson, Sochi 1986', c: 'Ou 7.g3, igual.' }],
  ['c31', 'b', 'b', '(b)', '8 Bxf6 gxf6 9 c5 O-O-O 10 Bb5 Bg4 11 f3 Bf5 12 Nge2 e5', { a: '=', r: 'Izoria–Mastrovasilis, Grécia x Geórgia 2003', c: 'Com 8.Bxf6 também fica igual.' }],
  ['c31', 'c-A', 'c', '(c) A', '11 dxe6 Qxe6+ 12 Qe2 Ne5', { a: '∓', c: 'Não 11.dxe6?, que deixa as pretas melhor.' }],
  ['c31', 'c-B', 'c', '(c) B', '11 dxc6 Qxc6 12 Qa4 Qb6 13 Rd1 Bh6 14 Nf3 Rhg8', { a: '∞', r: 'Lanka', c: 'Lanka avalia 11.dxc6 como compensação pela peça.' }],
  ['c31', 'd', 'd', '(d)', '13 Nge2 Kb8', { a: '⩱', r: 'Lanka–Adianto, Adelaide 1990', c: 'Depois de 13.Nge2, em vez de 13...Rg8? (como na partida), 13...Kb8 evita problemas na coluna c e deixa as pretas com bom jogo.' }],
  // Coluna 32
  ['c32', 'e-A', 'e', '(e) A', '7 Bxf6 exf6 8 cxd5 Bb4 9 Qd2 Bxc3 10 bxc3 Qxd5 11 Nf3 O-O', { a: '=', r: 'van der Sterren–Nikolac, Eerbeek 1978', c: 'Com 7.Bxf6 as pretas igualam com 8...Bb4!.' }],
  ['c32', 'e-B', 'e', '(e) B', '7 Qd2 Be6 8 c5 Ne4 9 Nxe4 dxe4 10 Qxa5 Nxa5', { a: '=', r: 'Ernst–Engqvist, Gausdal 1992', c: 'Com 7.Qd2 as damas saem e fica igual.' }],
  ['c32', 'f', 'f', '(f)', '7... Qd8 8 Nf3 e6 9 c5 Be7 10 Bb5 O-O 11 O-O', { a: '⩲', r: 'Kindermann–Goldenberg, Trouville 1982', c: 'Com 7...Qd8 as brancas controlam e5 e têm uma boa maioria no flanco da dama.' }],
  ['c32', 'g', 'g', '(g)', '8... Nxd4 9 Nb5 Qb6 10 Nxd4 Qxd4 11 Qa4+ Bd7 12 Bxf7+', { a: '+-', c: '8...Nxd4? perde a dama.' }],
  ['c32', 'h', 'h', '(h)', '9 d5 exd5 10 Nxd5 Qd8 11 Qe2+ Be6 12 Nf4 Nd4 13 Nxe6 fxe6 14 Qd3 Qb6', { a: '=', r: 'Bronstein–Bagirov, Tallinn 1981', c: 'Com 9.d5 o peão isolado some e fica igual.' }],
  ['c32', 'i', 'i', '(i)', '13 Rfd1 Rd8 14 Rac1', { a: '⩲', r: 'Bana–Buchnicek, República Tcheca 2004', c: 'As peças brancas ficam ativas.' }],
  // Coluna 33
  ['c33', 'j-A', 'j', '(j) A', '6... Qb6 7 cxd5 Nxd4 8 Be3 e5 9 dxe6 Bc5 10 exf7+ Ke7 11 Bc4 Rd8 12 Nf3', { a: '±', c: '6...Qb6 é mais arriscado.' }],
  // O livro dá 13 dxe5 Bxh1 14 exf6, mas o peão de d4 já saiu; quem captura em e5 é o de f4.
  ['c33', 'j-B', 'j', '(j) B', '6... dxc4 7 Bxc4 Qxd4 8 Qxd4 Nxd4 9 O-O-O e5 10 f4 Bg4 11 Nf3 Nxf3 12 gxf3 Bxf3 13 fxe5 Bxh1 14 exf6', { a: '±', r: 'Grischuk–Bareev, Moscou 2004', c: '6...dxc4 também é arriscado. (O livro escreve 13.dxe5, mas quem captura é o peão de f4.)' }],
  ['c33', 'k', 'k', '(k)', '7 cxd5 exd5 8 Bxf6 Qxf6 9 Nxd5 Qd8 10 Bc4 Be6 11 Qe2 b5', { a: '-+', c: 'As pretas ganham depois de 7.cxd5 exd5 8.Bxf6?! Qxf6 9.Nxd5 Qd8 10.Bc4 Be6 11.Qe2? b5!.' }],
  ['c33', 'l', 'l', '(l)', '13 Bxc6 bxc6', { a: '=', r: 'Keres–Alekhine, AVRO 1938', c: 'Depois de 13.Bxc6 bxc6 fica igual.' }],
  // Coluna 34
  ['c34', 'm', 'm', '(m)', '8 Bc4 e6 9 O-O Be7 10 h3 Bxf3 11 Qxf3 Nxd4 12 Qe4 Nxc3 13 bxc3 Rc8 14 cxd4 Rxc4 15 Qxb7 Qd7', { a: '=', r: 'Tartakower–Nimzowitsch, Liège 1930', c: 'As brancas devem jogar ativamente; senão as pretas ficam tranquilas.' }],
  ['c34', 'n', 'n', '(n)', '9... Nb6 10 Be3 e6 11 O-O-O Be7 12 d5 exd5 13 Nxd5 Nxd5 14 Rxd5 Qc7 15 Kb1 O-O 16 f4 Rad8 17 Bg2 Rxd5 18 Bxd5', { a: '±', r: 'S. Lalić–Martyn, 4NCL 2006', c: 'Com 9...Nb6 as brancas ficam melhor.' }],
  ['c34', 'o', 'o', '(o)', '13 Qxb5 Qd7 14 Nxd5+ Qxd5 15 Bg5+ f6 16 Qxd5 exd5 17 Be3 Ke6 18 O-O-O Bb4 19 Rd3 Rhd8 20 a3 Rac8+ 21 Kb1 Bc5', { a: '⩲', r: 'Karpov–Kramnik, Linares 1993', c: 'No final as brancas ficam só com uma vantagem mínima.' }],
  // Coluna 35
  ['c35', 'p', 'p', '(p)', '7 cxd5 Nxd5', { c: '7.a3 e 7.cxd5 Nxd5 transpõem para a Semi-Tarrasch do Gambito da Dama.' }],
  ['c35', 'q', 'q', '(q)', '7... Be7 8 Bb5 O-O 9 O-O Bd7 10 a3 a6 11 Bd3', { a: '⩲', c: 'O desenvolvimento normal deixa as brancas melhor: elas controlam e5 e têm a maioria no flanco da dama.' }],
  ['c35', 'r', 'r', '(r)', '8 Bd3 Nxc3 9 bxc3 Be7 10 O-O b6 11 cxb6 axb6 12 Re1 Ba6 13 Bc2 O-O', { a: '=', r: 'Blek–Vladimirov, Frunze 1988', c: 'Com 8.Bd3 as pretas igualam.' }],
  // Coluna 36
  ['c36', 's', 's', '(s)', '7 Bb5 Nxc3 8 bxc3 Qd5 9 Be2 Qxg2 10 Bf3 Qg6 11 Ne2 e5 12 d5 Nd8', { a: '⩱', r: 'Shamkovich–Adianto, Nova York 1994', c: '7.Nf3 transpõe para a coluna 34. Com 7.Bb5 as brancas ficam com pouco pelo peão.' }],
  ['c36', 't', 't', '(t)', '8... e6 9 Nf3 Be7 10 O-O O-O 11 Re1 Nb4', { c: 'As pretas fariam melhor com 8...e6.' }],
  // Coluna 37
  ['c37', 'a', 'a', '(a)', '7... b6 8 b4 a5 9 Na4 Nfd7 10 Bb5 O-O 11 Bf4', { a: '±', r: 'Euwe–Kramer 1941', c: 'Começar logo o contra-ataque no flanco da dama leva a sérios problemas: 11.Bf4 ameaça 12.c6.' }],
  ['c37', 'b', 'b', '(b)', '11 h4 f5 12 Ng5 Qe8 13 Kf1 axb4 14 Nxe6 Nxc5 15 Naxc5 bxc5 16 Nxf8 c4', { a: '∓', r: 'Karlsson–Mahlin, por correspondência 1970', c: '11.h4 é traiçoeiro: ameaça 12.Nxb6 Nxb6 13.Bxh7+! Kxh7 14.Ng5+ e 16.Qh5, ganhando. Na partida as pretas se defenderam bem.' }],
  ['c37', 'c', 'c', '(c)', '12... Nxc5 13 Nxc5 Bxc5 14 Bxh7+ Kxh7 15 Ng5+ Kg6 16 Qc2+', { a: '±', c: '12...Nxc5? cai no sacrifício em h7.' }],
  ['c37', 'd', 'd', '(d)', '14 cxd7 Nxd7 15 O-O exf3 16 Qxf3 Ne5 17 Qg3 Nxd3 18 Qxd3 d4', { a: '=', r: 'Sokolsky–Smagin, por correspondência 1964', c: 'Com 14.cxd7 o jogo se abre e fica igual.' }],
  // Coluna 38
  ['c38', 'e', 'e', '(e)', '7 Bg5 O-O 8 Be2 dxc4 9 O-O a6 10 Bxc4 b5 11 Bd3 Bb7 12 Qe2 Nc6 13 Rad1 Nb4', { a: '=', r: 'Zsu. Polgár–Inkiov, Stara Zagora 1990', c: 'Com 7.Bg5 também fica igual.' }],
  ['c38', 'f', 'f', '(f)', '7... Nxd5 8 Bd3 Nc6', { c: '7...Nxd5 transpõe para a Semi-Tarrasch do Gambito da Dama depois de 8.Bc4 Nc6 ou 8.Bd3 Nc6.' }],
  ['c38', 'g', 'g', '(g)', '8... Nc6 9 Ne5 Bd7 10 O-O O-O 11 Re1 Rc8 12 Bg5 Be8 13 Rc1 a6 14 Ba4', { a: '⩲', r: 'Hillarp Persson–Eriksson, Tórshavn 2000', c: 'Com 8...Nc6 as brancas ficam um pouco melhor.' }],
  ['c38', 'h', 'h', '(h)', '14 Rfe1 Rc6 15 Re2 g5 16 Bg3 Nh5 17 Rae1', { a: '⩲', r: 'Adams–Granda Zúñiga, Elenite 1993', c: 'Com as torres na coluna e as brancas pressionam o peão isolado.' }],
  // Coluna 39
  ['c39', 'i', 'i', '(i)', '6... Nc6', { c: '6...Nc6 transpõe para a coluna 35.' }],
  ['c39', 'j-A', 'j', '(j) A', '7 Bd3 dxc4 8 Bxc4', { c: '7.Bd3 dxc4 8.Bxc4 transpõe para a Defesa Nimzo-Índia.' }],
  ['c39', 'j-B', 'j', '(j) B', '7 Bd2 O-O 8 Rc1 b6 9 cxd5 Bxc3 10 bxc3 Qxd5 11 c4 Qd6 12 Be2 Bb7', { a: '=', r: 'Hort–Ribli, Interzonal de Manila 1976', c: 'Com 7.Bd2 também fica igual.' }],
  ['c39', 'k', 'k', '(k)', '8 Bd2 Nc6 9 Bd3 O-O 10 O-O Be7 11 a3 Bf6 12 Qc2 h6 13 Be3 Nxc3 14 bxc3 e5', { a: '=', r: 'Moiseenko–Volokitin, Campeonato Russo 2005', c: 'Com 8.Bd2 as pretas igualam com ...e5.' }],
  ['c39', 'l', 'l', '(l)', '9 Be2 O-O 10 O-O Re8 11 Rd1 Bf8 12 Bd3 g6 13 Be4 Nxc3 14 bxc3 Bd7 15 Bf4 Rc8', { a: '=', r: 'Wolff–Lutz, Groningen 1993', c: 'Com 9.Be2 também fica igual.' }],
  ['c39', 'm', 'm', '(m)', '10 a3 Nxc3 11 bxc3 Nxd4 12 Nxd4 Qxd4 13 Bb5+ Bd7 14 O-O Qd5 15 c4 Qf5 16 Bxd7+ Kxd7', { a: '∞', r: 'Baumegger–Genser, Hartberg 2004', c: 'Depois de 10.a3, pegar o peão em d4 é arriscado mas jogável. 10...h6 é mais seguro.' }],
  ['c39', 'n', 'n', '(n)', '14 Bb1 Bxc3 15 bxc3 b6 16 Nd2 f5', { a: '=', r: 'Golfstein–Spraggett, Canadian Open 1997', c: 'Ou 14.Bb1, igual.' }],
  // Coluna 40
  ['c40', 'o', 'o', '(o)', '6 Bg5 Bg7 7 Bxf6 Bxf6 8 cxd5 Qb6 9 Bb5+ Bd7 10 Bxd7+ Nxd7 11 Nge2 O-O 12 O-O Rfd8 13 Qd3 Rac8 14 a4 Bg7 15 a5 Qa6 16 Qe3 Re8', { a: '=', r: 'Smyslov–Bronstein, URSS 1967', c: 'Com 6.Bg5 as pretas recuperam o peão e igualam.' }],
  ['c40-o', '1', 'o', '(o) 8.Nxd5', '8 Nxd5 Bg7 9 Nf3 Nc6', { c: 'Se 8.Nxd5, as pretas seguem com ...e6 e ...Nxd4.' }],
  ['c40', 'p', 'p', '(p)', '10... Bf5 11 O-O Ne8 12 Rd1 a5 13 Ng3', { a: '±', r: 'Christiansen–N. Rogers, U.S. Chess League 2005', c: 'Com 10...Bf5 as brancas ficam melhor.' }],
  ['c40', 'q', 'q', '(q)', '14 O-O Qd6 15 Rd1 Rfd8 16 Nb5 Qd7 17 d6 exd6 18 Nc3 Ra6 19 Be3 Rc8', { a: '=', r: 'Sax–Gipslis, Valby 1994', c: 'As pretas recuperam o peão e igualam.' }],
  // Coluna 41
  ['c41', 'r', 'r', '(r)', '8... Na6 9 g3 Qb6 10 Qxb6 axb6 11 Bg2 Nb4 12 O-O Rd8 13 d6 exd6 14 Bg5 Re8 15 a3 Nc6 16 Rfe1 Bg4 17 Bxf6 Bxf6 18 Nd5 Bd8 19 Nec3', { a: '±', r: 'Tal–Botvinnik, Moscou 1966', c: 'Com 8...Na6 as brancas ficam melhor.' }],
  ['c41', 's', 's', '(s)', '12... Qd7 13 a5 Nc8 14 Na4 Nd6 15 O-O g5 16 Nd3 Bh3 17 Ne5', { a: '±', r: 'Suba–Dvoiris, Sochi 1983', c: 'Com 12...Qd7 as brancas ficam melhor.' }],
  ['c41', 't', 't', '(t)', '14 Nfe2 Qd6 15 Nb5 Qb4 16 Qxb4 axb4 17 d6', { a: '∞', r: 'Makarichev', c: 'Sugestão de Makarichev, com complicações pouco claras depois de 17...Bd3 ou 17...exd6.' }],
  // Coluna 42
  ['c42', 'u', 'u', '(u)', '6... Nxd5 7 Qb3 Nxc3 8 Bc4 e6 9 bxc3 Nc6 10 Nf3 Bg7 11 Ba3 Bf8 12 O-O', { a: '±', r: 'Tal–Pohla, URSS 1972', c: 'Com 6...Nxd5 as brancas ficam melhor.' }],
  ['c42-u', '1', 'u', '(u) 7...Nb6', '7... Nb6 8 d5 Bg7 9 Be3 O-O 10 Rd1', { a: '±', c: 'Se 7...Nb6, 8.d5 e as brancas ficam melhor.' }],
  ['c42', 'v', 'v', '(v)', '7 Bb5+ Nbd7 8 d6 exd6 9 Qe2+ Qe7 10 Bf4 Qxe2+ 11 Bxe2 Ke7 12 Bf3 Nb6 13 a4 Bg4', { a: '=', r: 'Barhudarian–Rozentalis, Rilton Cup 2007', c: 'Com 7.Bb5+ as damas saem e fica igual.' }],
  ['c42', 'w', 'w', '(w)', '14 Qe2 Ne8', { a: '=', r: 'Trabeth–Horváth, Balatonbereny 1994', c: 'Depois de 14.Qe2 Ne8 as pretas ameaçam 15...Bxd4.' }],
  ['c42-w', '1', 'w', '(w) 16.Qxe7??', '15 Re1 Nd6 16 Qxe7 Rfe8 17 Qxd7 Rxe1+', { a: '-+', c: '15.Re1 Nd6 16.Qxe7?? perde para 16...Rfe8 17.Qxd7 Rxe1+.' }],
]

const capitulo = {
  id: 'caro-kann-d',
  arquivo: 'caro-kann-d',
  nome: 'Caro-Kann — Ataque Panov-Botvinnik',
  fonte: 'Modern Chess Openings — Caro-Kann Defense (pp. 185–188), colunas 31–42',
  base: '1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3',
  corPadrao: 'b',
  ordem: 185,
  grupos: [
    { id: 'bg5', nome: '5...Nc6 6.Bg5', colunas: [31, 32, 33] },
    { id: 'nf3', nome: '5...Nc6 6.Nf3 e 6.cxd5', colunas: [34, 35, 36] },
    { id: 'e6', nome: '5...e6', colunas: [37, 38, 39] },
    { id: 'g6', nome: '5...g6', colunas: [40, 41, 42] },
  ],
}

module.exports = { capitulo, colunas, notas }
