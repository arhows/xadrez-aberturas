// Transcrição do MCO 15ª ed. — Semi-Eslava, Meran com 11...Nxe5 12.Nxe5 axb5, 13.O-O e 13.Bxb5+ (pp. 465–466), colunas 7–12.
// Gerar: node scripts/mco/gerar.cjs eslava-b
// Formato: ver gambito-do-rei.cjs. Dicas em eslava-b-dicas.cjs.
//
// A tabela desta página não traz avaliações no fim das colunas; usamos a avaliação da nota que continua cada coluna.
// Correções: na nota (r) o livro segue com 26 Qxg5, mas não há peão preto em g5; a linha ficou até 25...Rha6.
// Na nota (q) o livro traz 21...Nf8, impossível para o cavalo de e4; ficou 21...Nf6.

const B = '1 d4 d5 2 c4 c6 3 Nf3 Nf6 4 Nc3 e6 5 e3 Nbd7 6 Bd3 dxc4 7 Bxc4 b5 8 Bd3 a6 9 e4 c5 10 e5 cxd4 11 Nxb5 Nxe5 12 Nxe5 axb5'
const O = `${B} 13 O-O Qd5 14 Qe2`
const R = `${O} Ba6 15 Bg5 Be7 16 f4 O-O 17 Rf3 Bb7`
const X = `${B} 13 Bxb5+ Bd7 14 Nxd7 Qa5+ 15 Bd2 Qxb5 16 Nxf8`

const colunas = {
  c07: [`${O} Rb8 15 Bg5 Bd6 16 f4 h6 17 Bh4 g5 18 Bg3 gxf4 19 Bxf4 Rg8`, 'oo', '13.O-O Qd5 14.Qe2 Rb8', '=',
    'Com 13.O-O Qd5 a dama preta ocupa o centro, defende b5 e d4 e mira g2. Depois de 14.Qe2 Rb8 15.Bg5 Bd6 16.f4 h6 17.Bh4 g5 as pretas contra-atacam na ala do rei, e o jogo fica igual (Toshkov–Bagirov, Baku 1983).'],
  c08: [`${R} 18 Rh3 g6 19 b3 Rfc8`, 'oo', '14...Ba6 18.Rh3', '=',
    'Com 14...Ba6 15.Bg5 Be7 16.f4 O-O as pretas devolvem o peão de b5 para rocar. Depois de 17.Rf3 Bb7 18.Rh3 g6 19.b3 Rfc8 a torre branca ataca pela terceira fila, mas as pretas defendem e a partida terminou empatada (Moskalenko–Kaidanov, URSS 1988).'],
  c09: [`${R} 18 Re1 g6 19 Qf2 Rxa2`, 'oo', '18.Re1', '∓',
    'Com 18.Re1 as brancas reforçam o centro, mas depois de 18...g6 19.Qf2?! Rxa2 o contra-ataque preto chega antes do ataque branco (Miles–Yusupov, Bugojno 1986).'],
  c10: [`${R} 18 Rg3 Rxa2 19 Rxa2 Qxa2`, 'oo', '18.Rg3', '∓',
    'Com 18.Rg3 a torre ataca g7. Depois de 18...Rxa2 19.Rxa2 Qxa2 as pretas ganham peões e têm compensação excelente; a posição é favorável a elas (Sasikiran–Abdulla, Scarborough 1999).'],
  c11: [`${X} Kxf8 17 a4 Qxb2 18 O-O h5 19 Rb1 Qa2`, 'bxb5', '13.Bxb5+ 16...Kxf8', '⩲',
    'Com 13.Bxb5+ Bd7 14.Nxd7 Qa5+ 15.Bd2 Qxb5 16.Nxf8 as brancas trocam peças e deixam o rei preto sem roque. Depois de 16...Kxf8 17.a4 Qxb2 18.O-O h5 19.Rb1 Qa2 as brancas ficam com a iniciativa e uma pequena vantagem (Vilela–Kuczynski, Camagüey 1987).'],
  c12: [`${X} Rxf8 17 a4 Qc4 18 b3 Qd3 19 Qe2 Qxb3`, 'bxb5', '16...Rxf8', '=',
    'Com 16...Rxf8 a torre recaptura e o rei fica em e8. Depois de 17.a4 Qc4 18.b3 Qd3 19.Qe2 Qxb3 as pretas recuperam o peão e o jogo fica mais ou menos igual (Ibragimov–Lukács, Budapeste 1992).'],
}

const notas = [
  // Coluna 7
  ['c07', 'a', 'a', '(a)', '14... Ra5 15 f4 Bd6 16 Bd2 b4 17 a3 Bxe5 18 fxe5 Qxe5 19 Qf3 Qd5 20 Qg3 Ra7 21 Rxf6 gxf6 22 Qg7 Rf8 23 Bxb4 Re7 24 Rc1 Bb7 25 Rc5', { a: '+−', r: 'Botvinnik–Belavenets, Leningrado 1934 (1–0)', c: '14...Ra5?! 15.f4 Bd6 16.Bd2 b4 17.a3 Bxe5 18.fxe5 Qxe5 19.Qf3 Qd5 20.Qg3 Ra7 21.Rxf6 gxf6 22.Qg7 Rf8 23.Bxb4 Re7 24.Rc1 Bb7 25.Rc5, e as pretas abandonaram.' }],
  ['c07', 'b', 'b', '(b)', '15 f4 Be7 16 Rf3 O-O 17 Bd2 Bb7 18 Rh3 g6 19 Bxb5 Qxg2+ 20 Qxg2 Bxg2 21 Kxg2 Rxb5', { a: '⩲', r: 'Kouatly–M. Raičević, Trnava 1986', c: '15.f4?! Be7 16.Rf3 O-O 17.Bd2 Bb7 18.Rh3 g6 19.Bxb5 Qxg2+! 20.Qxg2 Bxg2 21.Kxg2 Rxb5 é só um pouco melhor para as brancas.' }],
  ['c07', 'c', 'c', '(c)', '15... Be7 16 Rac1 O-O 17 Nc6 Rb7 18 f4 Rc7 19 Nxe7+ Rxe7 20 Bxf6 gxf6 21 Qg4+ Kh8 22 Qh4', { a: '+−', r: 'Dreev–Sakaev, Moscou 1992 (1–0)', c: '15...Be7? levou a uma derrota rápida: 16.Rac1 O-O 17.Nc6 Rb7 18.f4 Rc7 19.Nxe7+ Rxe7 20.Bxf6 gxf6 21.Qg4+ Kh8 22.Qh4, e as pretas abandonaram.' }],
  ['c07', 'd', 'd', '(d)', '20 Rac1 Bb7 21 Bxb5+ Kf8 22 Rf3 d3 23 Bxd3 Qd4+ 24 Qe3 Bxe5 25 Bxe5 Rxg2+ 26 Kf1 Qxe3 27 Rxe3 Ng4', { a: '=', r: 'Toshkov–Bagirov, Baku 1983', c: 'Toshkov–Bagirov seguiu 20.Rac1 Bb7 21.Bxb5+ Kf8 22.Rf3 d3 23.Bxd3 Qd4+ 24.Qe3 Bxe5 25.Bxe5 Rxg2+ 26.Kf1 Qxe3 27.Rxe3 Ng4, igual.' }],
  ['c07-d', '1', 'd', '(d) 20.Ng6', '20 Ng6 Nd7 21 Qf2', { c: 'As brancas poderiam tentar 20.Ng6!? Nd7 21.Qf2.' }],
  // Coluna 8
  ['c08', 'e', 'e', '(e)', '15 a4 Bd6 16 axb5 Bb7 17 Rxa8+ Bxa8 18 Nc6 Bxc6 19 bxc6 Ke7 20 Bc4 Qxc6', { a: '∓', r: 'Lilienthal–Botvinnik, Moscou 1941', c: 'Tentar recuperar o peão sacrificado de imediato é um erro: 15.a4?! Bd6! 16.axb5 Bb7 17.Rxa8+ Bxa8 18.Nc6 Bxc6 19.bxc6 Ke7 20.Bc4 Qxc6 é melhor para as pretas.' }],
  ['c08', 'f', 'f', '(f)', '15... h6 16 Bh4 Bd6 17 f4 Rc8 18 a4 Bxe5 19 fxe5 Nd7 20 Rae1', { a: '±', r: 'Seirawan–Younglove, EUA 1985', c: 'A ideia de Bronstein, 15...h6?!, esbarra em 16.Bh4 Bd6 17.f4 Rc8 18.a4 Bxe5 19.fxe5 Nd7 20.Rae1.' }],
  ['c08', 'g-A', 'g', '(g) A', '16 a4 O-O 17 axb5 Bb7 18 f4 h6 19 Bh4 Rxa1 20 Rxa1 Ra8', { a: '∓', r: 'Alekhine–Bogoljubow, Campeonato Mundial 1934 (12ª partida)', c: 'As alternativas não dão nada às brancas: 16.a4 O-O 17.axb5 Bb7 18.f4 h6 19.Bh4 Rxa1 20.Rxa1 Ra8.' }],
  ['c08', 'g-B', 'g', '(g) B', '16 Rac1 O-O 17 f4 Rac8 18 a4 Rxc1 19 Rxc1 Rc8 20 Rxc8+ Bxc8 21 axb5 Bb7 22 Qc2 Bd6', { a: '∓', r: 'Toshkov–Dolmatov, Sófia 1984', c: '16.Rac1 O-O 17.f4 Rac8 18.a4 Rxc1 19.Rxc1 Rc8 20.Rxc8+ Bxc8 21.axb5 Bb7 22.Qc2?! Bd6! é um pouco melhor para as pretas.' }],
  ['c08', 'h', 'h', '(h)', '20 Bxb5 d3 21 Rxd3 Qc5+ 22 Kh1 Ne4 23 Bxe7 Nf2+ 24 Kg1 Nh3+ 25 Kh1', { a: '=', r: 'Moskalenko–Kaidanov, URSS 1988 (empate)', c: '20.Bxb5 d3 21.Rxd3 Qc5+ 22.Kh1 Ne4 23.Bxe7 Nf2+ 24.Kg1 Nh3+ 25.Kh1, e os jogadores concordaram empate.' }],
  // Coluna 9
  ['c09', 'i', 'i', '(i)', '20 Bb1 Ra1 21 Qh4 d3 22 Bxf6 Bxf6 23 Qxf6 d2 24 Rd1 Rxb1 25 Rxb1 d1=Q+ 26 Rxd1 Qxd1+', { a: '∓', r: 'Miles–Yusupov, Bugojno 1986', c: 'O contra-ataque preto chega antes de o ataque branco engrenar: 20.Bb1 Ra1 21.Qh4 d3 22.Bxf6 Bxf6 23.Qxf6 d2 24.Rd1 Rxb1 25.Rxb1 d1=Q+ 26.Rxd1 Qxd1+.' }],
  // Coluna 10
  ['c10', 'j', 'j', '(j)', '18 Qf2 Rxa2 19 Rf1 Rfa8 20 Qh4 Ra1 21 Bxf6 Rxf1+ 22 Kxf1 Bxf6 23 Qxh7+ Kf8 24 Qh5 Bxe5 25 fxe5 f5', { a: '∓', r: 'Donaldson', c: '18.Qf2 Rxa2! 19.Rf1 Rfa8 20.Qh4 Ra1 21.Bxf6 Rxf1+ 22.Kxf1 Bxf6 23.Qxh7+ Kf8 24.Qh5 Bxe5 25.fxe5 f5 é um pouco melhor para as pretas (Donaldson).' }],
  ['c10', 'k', 'k', '(k)', '18... Rfc8 19 Bxh7+ Kf8 20 Bh6 gxh6 21 Qh5 Ke8 22 Qxf7+ Kd8 23 Rg7 Qc5 24 h3 Rc7 25 Bg6 Kc8 26 Qxe6+ Kb8', { a: '∓', r: 'Takachiev–Bacrot, Enghien-les-Bains 2001', c: 'Talvez seja ainda melhor 18...Rfc8!? 19.Bxh7 Kf8 20.Bh6 gxh6 21.Qh5 Ke8 22.Qxf7 Kd8 23.Rg7 Qc5 24.h3 (Takachiev–Bacrot); agora 24...Rc7 25.Bg6 Kc8 26.Qxe6 Kb8 é claramente melhor para as pretas.' }],
  ['c10', 'l', 'l', '(l)', '20 Bxf6 Bxf6 21 Nd7 Be7 22 Nxf8 Bxf8 23 h4 Qa1+ 24 Kh2 Qc1', { a: '∓', r: 'Sasikiran–Abdulla, Scarborough 1999', c: '20.Bxf6 Bxf6 21.Nd7 Be7 22.Nxf8 Bxf8 23.h4 Qa1 24.Kh2 Qc1 é um pouco melhor para as pretas.' }],
  ['c10-l', '1', 'l', '(l) 20.Bh6', '20 Bh6 Qa1+ 21 Kf2 g6 22 Bxf8 Bxf8', { a: '∞', c: 'Contra 20.Bh6 as pretas podem jogar 20...Qa1+ 21.Kf2 g6 22.Bxf8 Bxf8, com a ideia ...Bh6 e ...Nd5 e compensação excelente pela qualidade.' }],
  ['c10-l', '2', 'l', '(l) 21.Bxh7+', '21 Bxh7+ Kxh7 22 Rh3+ Kg8 23 Qh5 Qb1+', { a: '−+', c: '21.Bxh7+? Kxh7 22.Rh3 Kg8 23.Qh5 Qb1 ganha para as pretas.' }],
  // Coluna 11
  ['c11', 'm', 'm', '(m)', '14 Bxd7+ Nxd7 15 Nxd7 Bb4+ 16 Bd2 Qa5 17 a3 Bxd2+ 18 Qxd2 Kxd7 19 Qxa5 Rxa5', { a: '∓', r: 'Pokorný–Šulc, Trenčianske Teplice 1925', c: '14.Nxd7 é mais desafiador que 14.Bxd7+ Nxd7, quando as pretas ficam bem: 15.Nxd7 Bb4+ 16.Bd2 Qa5 17.a3 Bxd2+ 18.Qxd2 Kxd7 19.Qxa5 Rxa5, com maioria central e pressão na ala da dama.' }],
  ['c11-m', '1', 'm', '(m) 15.Nd3', '15 Nd3 Qa5+ 16 Bd2 Qf5', { a: '∓', c: 'Ou 15.Nd3 Qa5+ 16.Bd2 Qf5!, também bom para as pretas.' }],
  ['c11', 'n', 'n', '(n)', '16 Nxf6+ gxf6 17 Qe2 Qxe2+ 18 Kxe2 Kd7 19 Rhb1 Rg8 20 g3 Ra4', { a: '=', r: 'Trifunović–Schmid, Oberhausen 1961', c: 'Não é melhor 16.Nxf6+ gxf6 17.Qe2 Qxe2+ 18.Kxe2 Kd7 19.Rhb1 Rg8 20.g3 Ra4, igual.' }],
  ['c11-n', '1', 'n', '(n) 17.Qf3', '17 Qf3 Qe5+ 18 Kd1 Rc8 19 Re1 Qd6 20 Qxf6 Rg8', { a: '∞', c: '17.Qf3 Qe5+ 18.Kd1 Rc8 19.Re1 Qd6 20.Qxf6 Rg8 dá às pretas um bom contrajogo.' }],
  ['c11', 'o', 'o', '(o)', '17 b3 Ke7 18 a4 Qe5+ 19 Qe2', { a: '=', r: 'Koons–Kodić, Budapeste 2007', c: '17.b3 Ke7 18.a4 Qe5 19.Qe2 é igual.' }],
  ['c11', 'p', 'p', '(p)', '18 Rb1 Qa2 19 O-O h5 20 Bf4 Kg8 21 Rb4 Nd5 22 Rxd4 Rc8 23 h3 Qc2 24 Qa1 Qc3 25 a5 Qxa1 26 Rxa1 Nxf4 27 Rxf4 Rc7 28 a6', { a: '=', r: 'Silman–Donaldson, Vancouver 1988 (empate)', c: '18.Rb1 Qa2 19.O-O h5 20.Bf4 Kg8 21.Rb4 Nd5 22.Rxd4 Rc8 23.h3 Qc2 24.Qa1 Qc3 25.a5 Qxa1 26.Rxa1 Nxf4 27.Rxf4 Rc7 28.a6, empate.' }],
  ['c11', 'q', 'q', '(q)', '18... Ne4 19 Qf3 f5 20 Bf4 Qc3 21 Qh5 Nf6 22 Qh4 Qb4 23 Rfc1', { a: '±', r: 'Gutov–Melentiev, Belovo 2006', c: 'Com 18...h5 as pretas afastam a dama branca de h5 e preparam a torre por ...h4 e ...Rh5. Em vez disso, depois de 18...Ne4 19.Qf3 f5 20.Bf4 Qc3 21.Qh5 Nf6 22.Qh4 Qb4 23.Rfc1 o rei preto teve problemas. (O livro traz 21...Nf8; o cavalo de e4 vai a f6.)' }],
  ['c11', 'r', 'r', '(r)', '20 Bf4 Kg8 21 Rb4 Nd5 22 Rxd4 Nxf4 23 Rxf4 e5 24 Re4 Rh6 25 h3 Rha6', { a: '⩲', r: 'Vilela–Kuczynski, Camagüey 1987', c: '20.Bf4 Kg8 21.Rb4 Nd5 22.Rxd4 Nxf4 23.Rxf4 e5 24.Re4 Rh6! 25.h3 Rha6 é um pouco melhor para as brancas. (O livro segue com 26.Qxg5 Rxa4 27.Rxe5, mas não há peão em g5; a linha ficou até 25...Rha6.)' }],
  ['c11-r', '1', 'r', '(r) 20...Qd5', '20... Qd5', { c: '20...Qd5!? é uma alternativa.' }],
  // Coluna 12
  ['c12', 's', 's', '(s)', '19 Qf3 Qe4+ 20 Qxe4 Nxe4 21 b4 Ke7 22 Ke2 e5 23 Rhc1 Nxd2 24 Kxd2 Rfb8 25 Rc4 Ke6', { a: '=', r: 'Moreira Ferr Dias–Czukar, Campeonato Mundial por e-mail 2003 (empate)', c: '19.Qf3 Qe4 20.Qxe4 Nxe4 21.b4 Ke7 22.Ke2 e5 23.Rhc1 Nxd2 24.Kxd2 Rfb8 25.Rc4 Ke6 terminou empatado nesta posição maluca.' }],
  ['c12', 't', 't', '(t)', '20 O-O Rxa4 21 Qe5 Nd7 22 Qxg7 Rxa1 23 Rxa1 Qb2 24 Ra8+ Ke7', { a: '=', r: 'Ibragimov–Lukács, Budapeste 1992', c: '20.O-O Rxa4 21.Qe5 Nd7 22.Qxg7 Rxa1 23.Rxa1 Qb2 24.Ra8+ Ke7 dá chances mais ou menos iguais.' }],
]

const capitulo = {
  id: 'eslava-b',
  arquivo: 'eslava-b',
  nome: 'Semi-Eslava — Meran com 11...Nxe5: 13.O-O e 13.Bxb5+',
  fonte: 'Modern Chess Openings — Slav and Semi-Slav Defense (pp. 465–466), colunas 7–12',
  base: '1. d4 d5 2. c4 c6',
  corPadrao: 'b',
  ordem: 465,
  grupos: [
    { id: 'oo', nome: '13.O-O Qd5', colunas: [7, 8, 9, 10] },
    { id: 'bxb5', nome: '13.Bxb5+', colunas: [11, 12] },
  ],
}

module.exports = { capitulo, colunas, notas }
