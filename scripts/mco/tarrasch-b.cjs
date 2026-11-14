// Transcrição do MCO 15ª ed. — Defesa Tarrasch, Rubinstein com 9.dxc5, 9.b3 e 9.Be3 (pp. 444–446), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs tarrasch-b
// Formato: ver gambito-do-rei.cjs. Dicas em tarrasch-b-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// A nota (l) não traz lances ("a posição é mais ou menos igual"); o comentário entrou no resumo da coluna 8.
// Correções: na nota (z) B o livro traz 13 Rb3 Rb8 14 Bf4, mas nenhuma torre chega a b3 (e 13 Qb3 perde a dama para ...cxb3); a linha ficou até 12...bxc6.

const B = '1 d4 d5 2 c4 e6 3 Nc3 c5 4 cxd5 exd5 5 Nf3 Nc6 6 g3 Nf6 7 Bg2 Be7 8 O-O O-O'

const colunas = {
  c07: [`${B} 9 dxc5 Bxc5 10 Bg5 d4 11 Bxf6 Qxf6 12 Nd5 Qd8 13 Nd2 Re8 14 Rc1 Bb6 15 Nc4 Bg4`, 'dxc5', '9.dxc5 Bxc5 10.Bg5 d4', '=',
    'Com 9.dxc5 Bxc5 as brancas trocam no centro e deixam as pretas com o peão isolado. Depois de 10.Bg5 d4 11.Bxf6 Qxf6 12.Nd5 os cavalos brancos saltam pelo tabuleiro, mas as pretas ficam ativas e igualam (Ghaem Maghami–Mamedyarov, Baku 2003).'],
  c08: [`${B} 9 dxc5 d4 10 Na4 Bf5 11 Ne1 Qd7 12 Nd3 Rad8 13 Bd2 Bh3 14 b4 Rfe8 15 Nab2 Bxg2`, 'dxc5', '9...d4', '=',
    'Com 9...d4 as pretas sacrificam o peão de c5 para ganhar espaço no centro e desenvolver as peças. Depois de 10.Na4 Bf5 11.Ne1 Qd7 12.Nd3 os cavalos brancos defendem c5, e a posição fica mais ou menos igual (Vaisman–Urzica, Romênia 1974).'],
  c09: [`${B} 9 b3 Ne4 10 Bb2 Bf6 11 Na4 Re8 12 Rc1 b6 13 dxc5 Bxb2 14 Nxb2 Nb4 15 a3 Na2`, 'b3', '9.b3 Ne4', '=',
    'Com 9.b3 o bispo vai a b2, um posto menos agressivo que g5. Depois de 9...Ne4 10.Bb2 Bf6 11.Na4 Re8 12.Rc1 b6 13.dxc5 Bxb2 14.Nxb2 Nb4!? as pretas buscam complicações com o cavalo em a2, e o jogo fica igual (D. Gurevich–Christiansen, Campeonato dos EUA 2003).'],
  c10: [`${B} 9 b3 Bg4 10 dxc5 Bxc5 11 Bb2 Re8 12 Rc1 a6 13 Nxd5 Bxf2+ 14 Rxf2 Nxd5 15 Ne5 Nxe5`, 'b3', '9...Bg4', '∞',
    'Com 9...Bg4 as pretas desenvolvem o bispo antes. Depois de 10.dxc5 Bxc5 11.Bb2 Re8 12.Rc1 a6 13.Nxd5 Bxf2+ 14.Rxf2 Nxd5 as pretas entregam a qualidade por peões e ataque; a luta é indefinida (Rivas Pastor–Fernández García, Torremolinos 1983).'],
  c11: [`${B} 9 Be3 Ng4 10 Bf4 Be6 11 dxc5 Bxc5 12 Na4 Be7 13 Nd4 Nxd4 14 Qxd4 Qa5 15 Rac1 Rac8`, 'be3', '9.Be3 Ng4', '=',
    'Com 9.Be3 as brancas pressionam c5 e podem surpreender, mas as pretas ficam bem com jogo correto. Depois de 9...Ng4 10.Bf4 Be6 11.dxc5 Bxc5 12.Na4 Be7 13.Nd4 Nxd4 14.Qxd4 Qa5 o jogo fica igual (Agdestein–Pétursson, Gausdal 1985).'],
  c12: [`${B} 9 Be3 c4 10 Ne5 Be6 11 Nxc4 dxc4 12 d5 Nxd5 13 Nxd5 Bf6 14 Rc1 Bxb2 15 Rxc4 Ne7`, 'be3', '9...c4', '⩲',
    'Com 9...c4 as pretas fecham a ala da dama. Depois de 10.Ne5 Be6 11.Nxc4! dxc4 12.d5 as brancas sacrificam o cavalo para abrir o centro; com 13.Nxd5 Bf6 14.Rc1 Bxb2 15.Rxc4 elas recuperam o material e ficam com vantagem (Tukmakov–Szitas, Aix-les-Bains 1991).'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '10... Be6 11 Bxf6 Qxf6 12 Nxd5 Qxb2 13 Nc7 Rad8 14 Qc1 Qxc1 15 Raxc1 Bb6 16 Nxe6 fxe6 17 e3', { a: '⩲', r: 'Chesarsky–Damjanović, Tel Aviv 1991', c: '10...Be6 leva quase à força a um final um pouco melhor para as brancas: 11.Bxf6 Qxf6 12.Nxd5 Qxb2 13.Nc7 Rad8 14.Qc1 Qxc1 15.Raxc1.' }],
  ['c07', 'b-A', 'b', '(b) A', '11 Ne4 Be7', { a: '=', c: '11.Ne4 Be7 não dá nada às brancas.' }],
  ['c07', 'b-B', 'b', '(b) B', '11 Na4 Be7 12 Rc1 Be6 13 Bxf6 Bxf6 14 Nc5 Qe7 15 Qa4 Bd5 16 Rfe1 Rad8', { a: '=', r: 'Larsen–Granda Zúñiga, Buenos Aires 1991', c: '11.Na4 Be7 12.Rc1 Be6 13.Bxf6 Bxf6 14.Nc5 Qe7 15.Qa4 Bd5 16.Rfe1 Rad8 está bem para as pretas.' }],
  ['c07', 'c', 'c', '(c)', '12... Qd6 13 Nd2 Bf5 14 Rc1 a6 15 Nc4 Qd8 16 Nf4', { a: '⩲', r: 'Donaldson–Fayvinov, Boston 2001', c: '12...Qd6 13.Nd2 Bf5 14.Rc1 a6 15.Nc4 Qd8 16.Nf4 é um pouco melhor para as brancas.' }],
  ['c07', 'd', 'd', '(d)', '13... a6 14 Rc1 Ba7 15 Nb3 Qd6', { a: '⩲', r: 'Plachetka–Nunn, Skara 1980', c: '13...a6 14.Rc1 Ba7 15.Nb3 Qd6 é um pouco melhor para as brancas.' }],
  ['c07', 'e', 'e', '(e)', '14 Re1 Bg4 15 Nb3 Bb6 16 Rc1 Ba5 17 Nxa5 Qxa5 18 b4 Nxb4 19 Qd2 Nc6 20 Qxa5 Nxa5 21 Nc7 d3', { a: '=', r: 'Spraggett–Leski, San Francisco 1987', c: '14.Re1 Bg4 15.Nb3 Bb6 16.Rc1 Ba5 17.Nxa5 Qxa5 18.b4 Nxb4 19.Qd2 é igual.' }],
  ['c07', 'f', 'f', '(f)', '14... Bf8 15 Nb3 Bg4 16 Nxd4 Nxd4 17 Qxd4 Bxe2 18 Rfe1', { a: '±', r: 'Barlov–Dabetić, Iugoslávia 1994', c: '14...Bf8 15.Nb3 Bg4 16.Nxd4 Nxd4 17.Qxd4 Bxe2 18.Rfe1 é melhor para as brancas.' }],
  ['c07', 'g', 'g', '(g)', '16 Re1 Ba5 17 Nxa5 Qxa5 18 b4 Nxb4 19 Qxd4 Nxd5 20 Qxg4 Nf6 21 Qc4 Rab8', { a: '=', r: 'Ghaem Maghami–Mamedyarov, Baku 2003', c: '16.Re1 Ba5 17.Nxa5 Qxa5 18.b4 Nxb4 19.Qxd4 Nxd5 20.Qxg4 Nf6 21.Qc4 Rab8 é igual.' }],
  // Coluna 8
  ['c08', 'h-A', 'h', '(h) A', '10... Be6 11 a3 Qd7 12 b4 Rad8 13 Bd2', { a: '±', r: 'Geller–Enevoldsen, Moscou 1956', c: 'Outros lances razoáveis: 10...Be6 11.a3 Qd7 12.b4 Rad8 13.Bd2; as pretas não têm compensação suficiente pelo peão.' }],
  ['c08', 'h-B', 'h', '(h) B', '10... Bg4 11 a3 Ne4 12 b4 Bf6 13 Bb2', { a: '±', r: 'Anetbaev–Itkis, URSS 1972', c: '10...Bg4 11.a3 Ne4 12.b4 Bf6 13.Bb2 também não dá compensação suficiente pelo peão.' }],
  ['c08', 'i-A', 'i', '(i) A', '11 Nh4 Bg4 12 a3 Nd5 13 Qb3 Be6', { a: '∓', r: 'Fine–Vidmar, Hastings 1938', c: 'As brancas têm muitas escolhas aqui: 11.Nh4 Bg4 12.a3 Nd5 13.Qb3 Be6 foi bom para as pretas.' }],
  ['c08', 'i-B', 'i', '(i) B', '11 b4 d3 12 e3 Nxb4', { a: '=', r: 'Eliskases–Koch, Swinemünde 1936', c: '11.b4 d3 12.e3 Nxb4 é igual.' }],
  ['c08', 'i-C', 'i', '(i) C', '11 Bd2 Ne4 12 Rc1 Bf6 13 b4 Re8', { a: '∞', r: 'Sznapik–Nunn, Cidade do México 1977', c: '11.Bd2 Ne4 12.Rc1 Bf6 13.b4 Re8 é indefinido.' }],
  ['c08', 'j', 'j', '(j)', '12... Be4 13 b4 Bxg2 14 Kxg2 b5 15 cxb6 Nxb4', { a: '∞', r: 'Calvia–Borik, Alemanha Ocidental 1984', c: '12...Be4 é bem possível: depois de 13.b4 Bxg2 14.Kxg2 b5 15.cxb6 Nxb4 há chances para os dois lados.' }],
  ['c08', 'k', 'k', '(k)', '13... Nd5 14 b4 Bf6 15 b5', { a: '∞', r: 'Ilić–Marjanović, Iugoslávia 1976', c: '13...Nd5!? foi usado em Ilić–Marjanović: depois de 14.b4 Bf6 as brancas deviam ter jogado 15.b5, indefinido.' }],
  // Coluna 9
  ['c09', 'm', 'm', '(m)', '13 Re1 Ba6 14 dxc5 Bxb2 15 Nxb2 bxc5 16 Na4 c4 17 Nd2 Qf6', { a: '∓', r: 'Cherepkov–Novik, Leningrado 1991', c: 'Adiar a troca com 13.Re1 Ba6 14.dxc5 Bxb2 15.Nxb2 bxc5 16.Na4 c4 17.Nd2 Qf6 é bom para as pretas.' }],
  ['c09', 'n', 'n', '(n)', '16 Rc2 Ba6 17 Na4 b5 18 Qa1 bxa4 19 Qxa2 axb3 20 Qxb3 Bc4', { a: '=', r: 'D. Gurevich–Christiansen, Campeonato dos EUA 2003', c: '16.Rc2 Ba6 17.Na4 b5 18.Qa1 bxa4 19.Qxa2 axb3 20.Qxb3 Bc4 é igual. A linha é arriscada; as pretas podem preferir o mais seguro 14...bxc5, também mais ou menos igual.' }],
  ['c09-n', '1', 'n', '(n) 14...bxc5', '14... bxc5', { a: '=', c: '14...bxc5 é mais seguro e também mais ou menos igual.' }],
  // Coluna 10
  ['c10', 'o', 'o', '(o)', '9... Re8 10 Bb2 Bg4 11 Ne5 cxd4 12 Nxc6 bxc6 13 Qxd4 Qa5', { a: '∓', r: 'Pilardeau–Jablonska, Mundial Júnior 1991', c: 'Depois de 9...Re8 10.Bb2 Bg4, 11.dxc5 transporia, mas 11.Ne5 cxd4 12.Nxc6 bxc6 13.Qxd4 Qa5 foi excelente para as pretas.' }],
  ['c10', 'p', 'p', '(p)', '11... Rc8 12 h3 Be6 13 e3 Qe7 14 Ne2 Rfd8 15 Nfd4', { a: '⩲', r: 'Uhlmann–Espig, Halle 1981', c: '11...Rc8 12.h3 Be6 13.e3 Qe7 14.Ne2 Rfd8 15.Nfd4 é um pouco melhor para as brancas.' }],
  ['c10', 'q-A', 'q', '(q) A', '12... Bb6 13 Na4 Qe7 14 e3', { a: '⩲', r: 'Uhlmann–Espig, Alemanha Oriental 1976', c: '12...Bb6 13.Na4 Qe7 14.e3 é um pouco melhor para as brancas.' }],
  ['c10', 'q-B', 'q', '(q) B', '12... Bf8 13 Na4 Rc8 14 a3 Ne4', { a: '⩲', r: 'Inkiov–Liverios, Plovdiv 1982', c: '12...Bf8 13.Na4 Rc8 14.a3 Ne4 é um pouco melhor para as brancas.' }],
  ['c10', 'r', 'r', '(r)', '16 Qxd5 Qg5 17 Rcf1 Rad8 18 Qxb7 f6 19 Bxe5 Qxe5 20 e4 Bc8 21 Qc6 Rd6 22 Qc1 Bb7 23 Qc4+ Kh8 24 Rf5 Qe7', { a: '∞', r: 'Rivas Pastor–Fernández García, Torremolinos 1983', c: '16.Qxd5 Qg5 17.Rcf1 Rad8 18.Qxb7 f6 19.Bxe5 Qxe5 20.e4: as pretas têm compensação numa luta indefinida.' }],
  // Coluna 11
  ['c11', 's', 's', '(s)', '9 Bf4 Be6 10 dxc5 Bxc5 11 Rc1 Bb6 12 Na4 d4', { a: '∞', r: 'Lengyel–Quiñones, Amsterdã 1964', c: '9.Bf4 Be6 10.dxc5 Bxc5 11.Rc1 Bb6 12.Na4 d4 dá chances aos dois lados.' }],
  ['c11-s', '1', 's', '(s) 10.Rc1', '10 Rc1 c4 11 Ne5 Qb6 12 e4 Nxe5 13 dxe5 Nxe4 14 Nxd5 Bxd5 15 Qxd5 Ng5', { a: '=', r: 'Shamkovich', c: '10.Rc1 c4 11.Ne5 Qb6 12.e4 Nxe5 13.dxe5 Nxe4 14.Nxd5 Bxd5 15.Qxd5 Ng5 é igual (Shamkovich). (O Stockfish discorda: dá cerca de +4 para as brancas no fim da linha.)' }],
  ['c11', 't', 't', '(t)', '11 Qa4 c4 12 Rad1 a6 13 e4 b5 14 Qc2 Nb4 15 Qe2 Nf6 16 Ne5 dxe4 17 d5 Nbxd5', { a: '=', r: 'Yrjölä–H. Olafsson, Gausdal 1985', c: '11.Qa4 c4 12.Rad1 a6 13.e4 b5 14.Qc2 Nb4 15.Qe2 Nf6 16.Ne5 dxe4 17.d5 Nbxd5 é igual.' }],
  ['c11', 'u', 'u', '(u)', '11... d4 12 Ne4 Bd5 13 Nd6 b6 14 Nxd4 Bxg2 15 Kxg2', { a: '±', r: 'Taimanov–Padevski, Havana 1964', c: '11...d4?! é ruim depois de 12.Ne4 Bd5 13.Nd6 b6 14.Nxd4 Bxg2 15.Kxg2.' }],
  ['c11', 'v-A', 'v', '(v) A', '12 Rc1 a6 13 Qd3 h6 14 h3 Nf6', { a: '=', r: 'Tal–Chandler, Jūrmala 1983', c: 'As alternativas são 12.Rc1 a6 13.Qd3 h6 14.h3 Nf6, igual.' }],
  ['c11', 'v-B', 'v', '(v) B', '12 Ne1 Bd4 13 Nd3 Nf6 14 Rc1 h6 15 Na4 Ne4', { a: '=', r: 'Flohr–Lasker, Moscou 1935', c: '12.Ne1 Bd4 13.Nd3 Nf6 14.Rc1 h6 15.Na4 Ne4 foi igual.' }],
  ['c11', 'v-C', 'v', '(v) C', '12 Ng5 Nf6 13 Rc1 Be7 14 Nxe6 fxe6 15 e4 d4 16 Na4 e5', { a: '=', r: 'Granda Zúñiga–Teixeira, São Paulo 2003', c: '12.Ng5!? Nf6 13.Rc1 Be7 14.Nxe6 fxe6 15.e4 d4 16.Na4 e5 é igual.' }],
  ['c11', 'w', 'w', '(w)', '14... Bf6 15 Qb4 Rc8 16 Rad1', { a: '±', r: 'Darga–Wade, Havana 1964', c: 'Não 14...Bf6?! 15.Qb4 Rc8 16.Rad1, com vantagem considerável das brancas.' }],
  ['c11', 'x', 'x', '(x)', '16 Nc3 Bc5 17 Qd2 Qb6 18 e3 d4', { a: '=', r: 'Agdestein–Pétursson, Gausdal 1985', c: '16.Nc3 Bc5 17.Qd2 Qb6 18.e3 d4 é igual.' }],
  // Coluna 12
  ['c12', 'y', 'y', '(y)', '9... Bg4 10 Qa4 Bxf3 11 Bxf3 c4 12 b3', { a: '⩲', r: 'Zlotnik', c: '9...Bg4 10.Qa4 Bxf3 11.Bxf3 c4 12.b3 é bom para as brancas (Zlotnik).' }],
  ['c12-y', '1', 'y', '(y) 10.dxc5', '10 dxc5 Bxf3 11 Bxf3 d4 12 Bxc6 dxe3 13 Bxb7 exf2+ 14 Kg2 Bxc5', { a: '∞', r: 'Hölzl–Barbero, Graz 1991', c: '10.dxc5 Bxf3 11.Bxf3 d4 12.Bxc6 dxe3 13.Bxb7 exf2+ 14.Kg2 Bxc5 foi indefinido.' }],
  ['c12', 'z-A', 'z', '(z) A', '10... Bf5 11 Qa4 Nb4 12 Rfc1 a6 13 Qd1', { a: '⩲', r: 'Larsen–Ljubojević, Manila 1975', c: '10...Bf5 11.Qa4 Nb4 12.Rfc1 a6 13.Qd1 é um pouco melhor para as brancas.' }],
  ['c12', 'z-B', 'z', '(z) B', '10... h6 11 Qa4 a6 12 Nxc6 bxc6', { a: '∞', r: 'Schroll–Lendwal, Áustria 1991', c: '10...h6 11.Qa4 a6 12.Nxc6 bxc6 levou a uma posição indefinida. (O livro segue com 13.Rb3 Rb8 14.Bf4, mas nenhuma torre chega a b3, e 13.Qb3 perderia a dama para ...cxb3; a linha ficou até 12...bxc6.)' }],
  ['c12', 'aa', 'aa', '(aa)', '14 Qd2 Bxd5 15 Bxd5 Bxb2', { a: '=', r: 'Korchnoi–Carlsen, Smartfish 2004', c: '14.Rc1 é melhor que 14.Qd2, quando 14...Bxd5 15.Bxd5 Bxb2! iguala.' }],
  ['c12', 'bb', 'bb', '(bb)', '16 Nxe7+ Qxe7 17 Bc5 Qc7 18 Rc2 Rac8 19 Be4 Rfd8 20 Qb1 Qe5 21 Rxb2 Rxc5 22 Bxh7+ Kh8 23 Bd3', { a: '±', r: 'Tukmakov–Szitas, Aix-les-Bains 1991', c: 'Depois de 16.Nxe7+ Qxe7 17.Bc5 Qc7 18.Rc2 Rac8 19.Be4 Rfd8 20.Qb1 Qe5 21.Rxb2 Rxc5 22.Bxh7+ Kh8 23.Bd3 as brancas ficaram melhor.' }],
]

const capitulo = {
  id: 'tarrasch-b',
  arquivo: 'tarrasch-b',
  nome: 'Defesa Tarrasch — Rubinstein com 9.dxc5, 9.b3 e 9.Be3',
  fonte: 'Modern Chess Openings — Tarrasch Defense (pp. 444–446), colunas 7–12',
  base: '1. d4 d5 2. c4 e6 3. Nc3 c5',
  corPadrao: 'b',
  ordem: 444,
  grupos: [
    { id: 'dxc5', nome: '9.dxc5', colunas: [7, 8] },
    { id: 'b3', nome: '9.b3', colunas: [9, 10] },
    { id: 'be3', nome: '9.Be3', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
