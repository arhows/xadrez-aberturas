// Transcrição do MCO 15ª ed. — Semi-Eslava, Meran com 10.e5 cxd4 11.Nxb5 (pp. 463–464), colunas 1–6.
// Gerar: node scripts/mco/gerar.cjs eslava-a
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-a-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (a) o livro traz 17...Rd8, impossível com a dama preta em d8; a linha ficou até 17 Qe4.
// Na nota (p) o livro traz 23 Rfc1, mas o rei branco está em f3 e a torre em h1; ficou 23 Rhc1.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 e6 5 e3 Nbd7 6 Bd3 dxc4 7 Bxc4 b5 8 Bd3 a6 9 e4 c5 10 e5 cxd4 11 Nxb5'
const A = `${B} axb5 12 exf6 gxf6 13 O-O`
const N = `${B} Nxe5 12 Nxe5 axb5 13 Qf3`

const colunas = {
  c01: [`${A} Qb6 14 Be4 Bb7 15 Bxb7 Qxb7 16 Nxd4 Rg8 17 f3 Ne5 18 Qe2 Bc5`, 'axb5', '11...axb5 13...Qb6', '=',
    'A Meran é a linha mais aguda da Semi-Eslava: as pretas tomam em c4 e expandem a ala da dama com ...b5, ...a6 e ...c5. Depois de 9.e4 c5 10.e5 cxd4 11.Nxb5 axb5 12.exf6 gxf6 o rei preto fica no centro e a estrutura arruinada, mas as pretas têm o par de bispos e casas centrais; com 13...Qb6 o jogo é igual (Kamsky–Kramnik, Linares 1994).'],
  c02: [`${A} Bb7 14 Nxd4 Rg8 15 f3 Bc5 16 Be3 Rg5 17 Nc2 Qb6 18 Qe2 O-O-O`, 'axb5', '13...Bb7', '=',
    'Com 13...Bb7 as pretas desenvolvem o bispo antes da dama. Depois de 14.Nxd4 Rg8 15.f3 Bc5 16.Be3 Rg5 a torre preta entra no jogo pela quinta fila, e com 18...O-O-O as chances ficam mais ou menos iguais (R. Sherbakov–Sorokin, URSS 1991).'],
  c03: [`${B} Ng4 12 Nbxd4 Bb4+ 13 Bd2 Bxd2+ 14 Qxd2 Bb7 15 Rd1 O-O 16 O-O Ngxe5 17 Be2 Qb6 18 b3 Nxf3+`, 'ng4', '11...Ng4 12.Nbxd4', '=',
    'Com 11...Ng4 as pretas atacam o peão de e5 em vez de recapturar em b5. Depois de 12.Nbxd4 Bb4+ 13.Bd2 Bxd2+ 14.Qxd2 Bb7 15.Rd1 O-O 16.O-O Ngxe5 as pretas recuperam o peão e o jogo fica igual (Miles–Kasparov, match 1986).'],
  c04: [`${B} Ng4 12 Qa4 Bb7 13 Nbxd4 Qb6 14 O-O Bc5 15 h3 Bxf3 16 hxg4 Bd5 17 Nf3 Qb7 18 Qf4 O-O`, 'ng4', '12.Qa4', '∞',
    'Com 12.Qa4 a dama crava o cavalo de d7. Depois de 12...Bb7! 13.Nbxd4 Qb6 14.O-O Bc5 15.h3 Bxf3 16.hxg4 Bd5 as pretas sacrificam uma peça por ataque; com 18...O-O as chances são para os dois lados (Bareev–Chernin, Kazan 1997).'],
  c05: [`${N} Bb4+ 14 Ke2 Rb8 15 Qg3 Qd6 16 Nf3 Qxg3 17 hxg3 Bd6 18 Bf4 Bxf4`, 'nxe5', '11...Nxe5 13...Bb4+', '=',
    'Com 11...Nxe5 12.Nxe5 axb5 13.Qf3 as brancas atacam a torre de a8 e o cavalo de f6. Depois de 13...Bb4+ 14.Ke2 Rb8 15.Qg3 Qd6 as damas se trocam, e o final é igual (Szabó–Ståhlberg, Saltsjöbaden 1948).'],
  c06: [`${N} Qa5+ 14 Ke2 Bd6 15 Qc6+ Ke7 16 Bd2 b4 17 Qxd6+ Kxd6 18 Nc4+ Kd7`, 'nxe5', '13...Qa5+', '=',
    'Com 13...Qa5+ 14.Ke2 Bd6 15.Qc6+ Ke7 o jogo fica muito tático. Depois de 16.Bd2 b4 17.Qxd6+ Kxd6 18.Nc4+ Kd7 19.Nxa5 Rxa5 as pretas ficam com torre e peões pela dama, e o final é igual (Reshevsky–Botvinnik, Moscou 1955).'],
}

const notas = [
  // Coluna 1
  ['c01', 'a', 'a', '(a)', '14 Qe2 Ba6 15 a4 Bg7 16 a5 Qd8 17 Qe4', { a: '=', r: 'Dreev–Bareev, Superfinal Russa 2005', c: 'As brancas devem considerar 14.Qe2 Ba6 15.a4 Bg7 16.a5 Qd8 17.Qe4, que em Dreev–Bareev terminou em igualdade. (O livro segue com 17...Rd8, impossível com a dama preta em d8; a linha ficou até 17.Qe4.)' }],
  ['c01-a', '1', 'a', '(a) 14...b4', '14... b4 15 Rd1 Bc5 16 Bf4 h5 17 Bg3 Rg8 18 Nd2', { a: '±', r: 'Lugovoi–Vitiugov, 2005', c: '14...b4 15.Rd1 Bc5 16.Bf4 h5 17.Bg3 Rg8 18.Nd2 é melhor para as brancas.' }],
  ['c01', 'b', 'b', '(b)', '17 Qf3 Qxf3 18 Nxf3 Rg4 19 b3 Rc8 20 Be3 Ba3 21 Nd4 Rc5', { a: '=', r: 'Santos–Rodríguez Guerrero, Capelle-la-Grande 2006', c: '17.Qf3 Qxf3 18.Nxf3 Rg4 19.b3 Rc8 20.Be3 Ba3 21.Nd4 Rc5 é igual.' }],
  ['c01', 'c', 'c', '(c)', '17... Bc5 18 Be3 Ne5 19 Qe2 Qa6 20 Rfd1 Rd8 21 Nc2 Bxe3+ 22 Nxe3 Nc4 23 Rxd8+ Kxd8', { a: '=', r: 'van der Sterren–Shirov, Alemanha 1995', c: '17...Bc5 18.Be3 Ne5 19.Qe2 Qa6 20.Rfd1 foi van der Sterren–Shirov; agora 20...Rd8 21.Nc2 Bxe3+ 22.Nxe3 Nc4 23.Rxd8+ Kxd8 é igual. Como as brancas podem evitar essa linha com 18.Kh1 Ne5?! 19.Nb3, recomenda-se o lance da coluna.' }],
  ['c01-c', '1', 'c', '(c) 18.Kh1', '18 Kh1 Ne5 19 Nb3', { c: '18.Kh1 Ne5?! 19.Nb3 evita a linha.' }],
  ['c01', 'd', 'd', '(d)', '19 Be3 Rd8 20 Rad1 Nc4 21 Bf2 Qb6 22 b3 Bxd4 23 bxc4 bxc4', { a: '=', r: 'Kamsky–Kramnik, Linares 1994', c: '19.Be3 Rd8 20.Rad1 Nc4 21.Bf2 Qb6 22.b3 Bxd4 23.bxc4 bxc4 é igual.' }],
  // Coluna 2
  ['c02', 'e', 'e', '(e)', '15 g3 Ne5 16 Bxb5+ Ke7 17 Be3 Qd5 18 f3 f5 19 Be2 Bg7 20 Qd2 Ra4 21 Rad1', { a: '⩲', r: 'Riemersma–Serper, Tilburg 1994', c: 'Também é razoável 15.g3 Ne5 16.Bxb5+ Ke7 17.Be3 Qd5 18.f3 f5 19.Be2 Bg7 20.Qd2 Ra4 21.Rad1, com pequena pressão branca.' }],
  ['c02', 'f', 'f', '(f)', '16... Qb6 17 Bxb5 Rd8 18 Qb3 Rg5 19 Ba4 Qxb3 20 axb3 Ke7 21 Rac1', { a: '⩲', c: '16...Qb6 17.Bxb5 Rd8 18.Qb3 Rg5 19.Ba4 Qxb3 20.axb3 Ke7 21.Rac1 é um pouco melhor para as brancas.' }],
  ['c02-f', '1', 'f', '(f) 20.Bxb3', '20 Bxb3 Nb6', { a: '∞', c: '20.Bxb3 Nb6 dá contrajogo às pretas.' }],
  ['c02-f', '2', 'f', '(f) 21...Nb6', '21... Nb6 22 Nc6+ Bxc6 23 Bxc5+', { a: '+−', c: '21...Nb6? perde para 22.Nc6+ Bxc6 23.Bxc5+.' }],
  ['c02', 'g', 'g', '(g)', '19 Kh1 Re5', { a: '=', r: 'R. Sherbakov–Sorokin, URSS 1991', c: '19.Kh1 Re5 dá chances mais ou menos iguais.' }],
  // Coluna 3
  ['c03', 'h', 'h', '(h)', '15 Be2 Ndxe5 16 h3 Nxf3+ 17 Bxf3 Bxf3 18 Nxf3 Qxd2+ 19 Nxd2 Nf6 20 Ke2 Ke7', { a: '=', r: 'Seirawan–Chernin, Montpellier 1985', c: '15.Be2 Ndxe5 16.h3 Nxf3+ 17.Bxf3 Bxf3 18.Nxf3 Qxd2+ 19.Nxd2 Nf6 20.Ke2 Ke7 é um jogo igual.' }],
  ['c03', 'i', 'i', '(i)', '19 Bxf3 Nf6 20 Bxb7 Qxb7 21 Nc2 a5 22 Ne3 Rfb8 23 Qb2 Qc7', { a: '=', r: 'Miles–Kasparov, match 1986 (empate)', c: '19.Bxf3 Nf6 20.Bxb7 Qxb7 21.Nc2 a5 22.Ne3 Rfb8 23.Qb2 Qc7, empate.' }],
  // Coluna 4
  ['c04', 'j', 'j', '(j)', '12... Qb6 13 Nd6+ Bxd6 14 exd6 e5 15 Bf5 Nf6 16 Nxe5 Qxd6 17 Nxd7 Bxd7 18 Bxd7+ Nxd7 19 O-O', { a: '⩲', r: 'L\'Ami–V. Georgiev, Wijk aan Zee 2007', c: '12...Qb6 13.Nd6+ Bxd6 14.exd6 e5 15.Bf5 Nf6 16.Nxe5 Qxd6 17.Nxd7 Bxd7 18.Bxd7+ Nxd7 19.O-O é um pouco melhor para as brancas.' }],
  ['c04-j', '1', 'j', '(j) 13.O-O', '13 O-O Bb7 14 Nbxd4 Bc5 15 h3 Bxf3 16 hxg4 Bd5 17 Nf3 Qb7 18 Qf4 O-O', { a: '=', r: 'Hillarp Persson–Stefánsson, Reykjavík 2006', c: '13.O-O Bb7 14.Nbxd4 Bc5 15.h3 Bxf3 16.hxg4 Bd5 17.Nf3 Qb7 18.Qf4 O-O é igual.' }],
  ['c04', 'k', 'k', '(k)', '15 Be3 Nxe3 16 fxe3 h6 17 Kh1 Rd8', { a: '=', r: 'Alterman–Chernin, Beersheba 1992', c: '15.Be3 Nxe3 16.fxe3 h6 17.Kh1 Rd8 é igual.' }],
  ['c04', 'l', 'l', '(l)', '17 Nb3 O-O 18 Qxd7 Bxb3 19 Bxh7+ Kxh7 20 Qd3+ Kg8 21 Qxb3 Qxb3 22 axb3 Rfb8', { a: '=', r: 'Trifunović–Gligorić, Amsterdã 1950', c: '17.Nb3 O-O 18.Qxd7 Bxb3 19.Bxh7+ Kxh7 20.Qd3+ Kg8 21.Qxb3 Qxb3 22.axb3 Rfb8 é igual.' }],
  ['c04', 'm', 'm', '(m)', '19 Qh2 f5 20 exf6 Nxf6 21 g5 Ne4 22 Be3 Bxe3 23 fxe3 Qxb2 24 g6 h6', { a: '∞', r: 'Bareev–Chernin, Kazan 1997', c: '19.Qh2 f5! 20.exf6 Nxf6 21.g5 Ne4 22.Be3 Bxe3 23.fxe3 Qxb2 24.g6 h6 dá chances aos dois lados.' }],
  // Coluna 5
  ['c05', 'n', 'n', '(n)', '13 Qb3 Qa5+ 14 Bd2 b4 15 f4 Bb7 16 O-O Be7 17 Bc4 O-O 18 Bxe6 Nd5 19 Bh3 Ne3 20 Rfc1 Qd5', { a: '∓', r: 'Vaganian–Dolmatov, Campeonato da URSS 1979', c: '13.O-O e 13.Bxb5+ são vistos nas páginas seguintes, enquanto 13.Qb3?! Qa5+ 14.Bd2 b4 15.f4 Bb7 16.O-O Be7 17.Bc4 O-O! 18.Bxe6 Nd5 19.Bh3 Ne3 20.Rfc1 Qd5 favorece as pretas.' }],
  ['c05', 'o', 'o', '(o)', '14 Kd1 Bd7 15 Nc6 Bxc6 16 Qxc6+ Ke7 17 Qxb5 Rb8 18 Qg5 h6 19 Qxg7 Qd5 20 Qg3 Rhg8', { a: '∓', r: 'Ree–Torre, Wijk aan Zee 1984', c: '14.Kd1 Bd7 15.Nc6 Bxc6 16.Qxc6+ Ke7 17.Qxb5 Rb8 18.Qg5 h6! 19.Qxg7 Qd5 20.Qg3 Rhg8 é um pouco melhor para as pretas.' }],
  ['c05', 'p', 'p', '(p)', '15 Nc6 Bb7 16 Bf4 Bd6 17 Nxd8 Bxf3+ 18 Kxf3 Rxd8 19 Bxb5+ Ke7 20 Bd2 Rb8 21 a4 Nd5 22 b3 f5 23 Rhc1 e5', { a: '∞', r: 'Bronstein–Botvinnik, Campeonato Mundial 1951', c: '15.Nc6 Bb7 16.Bf4 Bd6 17.Nxd8 Bxf3+ 18.Kxf3 Rxd8 19.Bxb5+ Ke7 20.Bd2 Rb8! 21.a4 Nd5 22.b3 f5 23.Rhc1 e5 dá chances aos dois lados. É uma ótima ilustração do final típico da Meran: os peões brancos da ala da dama equilibram a maioria central preta. (O livro traz 23.Rfc1; a torre está em h1.)' }],
  ['c05', 'q', 'q', '(q)', '19 gxf4 Bd7 20 Nxd4 Ke7 21 Rac1 Rhc8', { a: '=', r: 'Szabó–Ståhlberg, Saltsjöbaden 1948', c: '19.gxf4 Bd7 20.Nxd4 Ke7 21.Rac1 Rhc8 é igual.' }],
  // Coluna 6
  ['c06', 'r', 'r', '(r)', '15 Bd2 Qa6 16 a4 O-O 17 Bxb5 Bxe5 18 Bxa6 Bxa6+ 19 Kd1 Rfb8 20 Re1 Bb7 21 Qd3 Ng4 22 Qe2 h5 23 h3 Ba6 24 Qf3 Bb7 25 Qe2 Ba6', { a: '=', r: 'Donaldson', c: 'Outra tentativa é 15.Bd2 Qa6 16.a4 O-O 17.Bxb5 Bxe5 18.Bxa6 Bxa6+ 19.Kd1 Rfb8 20.Re1 Bb7, e os lances se repetem, igual (Donaldson).' }],
  ['c06', 's', 's', '(s)', '19 Nxa5 Rxa5 20 Rhc1 Ba6 21 Bxa6 Rxa6 22 Rc4 Nd5 23 Rxd4 Rb8 24 Kd3', { a: '=', r: 'Reshevsky–Botvinnik, Moscou 1955', c: '19.Nxa5 Rxa5 20.Rhc1 Ba6 21.Bxa6 Rxa6 22.Rc4 Nd5 23.Rxd4 Rb8 24.Kd3 é igual.' }],
]

const capitulo = {
  id: 'eslava-a',
  arquivo: 'eslava-a',
  nome: 'Semi-Eslava — Meran com 10.e5 cxd4 11.Nxb5',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 463–464), colunas 1–6',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 463,
  grupos: [
    { id: 'axb5', nome: '11...axb5', colunas: [1, 2] },
    { id: 'ng4', nome: '11...Ng4', colunas: [3, 4] },
    { id: 'nxe5', nome: '11...Nxe5', colunas: [5, 6] },
  ],
}

module.exports = { capitulo, colunas, notas }
