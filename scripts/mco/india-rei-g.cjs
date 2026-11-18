// Transcrição do MCO 15ª ed. — Índia do Rei, Clássica: 7.d5 (Petrosian), 7.dxe5 e 6...Bg4 (pp. 610–612), colunas 37–42.
// Gerar: node scripts/mco/gerar.cjs india-rei-g
// Formato: ver gambito-do-rei.cjs. Dicas em india-rei-g-dicas.cjs.
//
// Nenhuma coluna traz avaliação no fim; cada uma usa a da nota que a continua:
// 37 (h) ∞, 38 (m) ∞, 39 (s) =, 40 (u) =, 41 (x) =, 42 (aa) ±.
// As notas (m) e (aa) não têm lances e entraram no resumo da coluna: (m) "empate combinado" numa posição de "faca de
// dois gumes" ficou ∞; (aa) "rei preto muito abalado" ficou ±.
// Avaliações tiradas do texto: (d) 11.O-O "bom jogo para as pretas" ficou =; (f) "excelente compensação pela
// qualidade" ficou =; (j) "bom para as pretas" ficou =; (p) "obscuro" ficou ∞; (s) "igual" ficou =; (u) "empate
// combinado" ficou =.
// Sinais conferidos com zoom: (a), (b) 6...Nbd7, (d) 14...Bf6?!, (i), (k) B, (l), (q), (y), (z) ⩲; (i) 8...f5 e
// 8...a5, (w) ±.

const F = '1 d4 Nf6 2 c4 g6 3 Nc3 Bg7 4 e4 d6 5 Nf3 O-O 6 Be2'
const P = `${F} e5 7 d5`
const T = `${F} e5 7 dxe5 dxe5 8 Qxd8 Rxd8 9 Bg5`

const colunas = {
  c37: [`${P} a5 8 Bg5 h6 9 Bh4 Na6 10 Nd2 Qe8 11 O-O Nh7 12 a3 Bd7 13 b3 h5 14 f3 Bh6 15 Kh1 Be3`, 'petrosian', '7.d5 a5 8.Bg5', '∞',
    'O 7.d5 é o Sistema Petrosian: as brancas fecham o centro já e usam 8.Bg5 para cravar o cavalo e frear ...f5. Depois de 8...h6 9.Bh4 Na6 10.Nd2 Qe8 11.O-O Nh7 12.a3 Bd7 13.b3 h5 14.f3 Bh6 15.Kh1 Be3 o jogo fica obscuro.'],
  c38: [`${P} Na6 8 Nd2 Ne8 9 O-O f5 10 exf5 gxf5 11 f4 c5 12 dxc6 bxc6 13 Nb3 e4 14 Be3 Nac7 15 Qd2`, 'petrosian', '7...Na6', '∞',
    'Com 7...Na6 o cavalo vai a c5. Depois de 8.Nd2 Ne8 9.O-O f5 10.exf5 gxf5 11.f4 c5 12.dxc6 bxc6 13.Nb3 e4 14.Be3 Nac7 15.Qd2 a partida Gulko–Kasparov, Riga 1995, terminou empatada; a posição é de faca de dois gumes.'],
  c39: [`${T} Re8 10 Nd5 Nxd5 11 cxd5 c6 12 Bc4 cxd5 13 Bxd5 Nd7 14 Rc1 h6 15 Be3 Nf6`, 'dxe5', '7.dxe5 dxe5 8.Qxd8 Rxd8 9.Bg5 Re8', '=',
    'O 7.dxe5 troca as damas e busca um final tranquilo, com ameaças de Nd5. Depois de 7...dxe5 8.Qxd8 Rxd8 9.Bg5 Re8 10.Nd5 Nxd5 11.cxd5 c6 12.Bc4 cxd5 13.Bxd5 Nd7! 14.Rc1 h6 15.Be3 Nf6 o jogo fica igual.'],
  c40: [`${T} c6 10 Nxe5 Re8 11 O-O-O Na6 12 Rd6 Be6 13 Nf3 Ng4 14 Nd2 Nc5 15 Bh4 Bc8`, 'dxe5', '9...c6', '=',
    'Com 9...c6 as pretas entregam o peão de e5 em troca de atividade. Depois de 10.Nxe5 Re8 11.O-O-O Na6 12.Rd6 Be6 13.Nf3 Ng4 14.Nd2 Nc5 15.Bh4 Bc8 as peças pretas compensam o peão.'],
  c41: [`${T} Na6 10 Nd5 Rd6 11 Bxf6 Bxf6 12 Nxf6+ Rxf6 13 Nxe5 Re6 14 f4 Re8 15 Bf3 f6`, 'dxe5', '9...Na6', '=',
    'Com 9...Na6 o cavalo vai a c5. Depois de 10.Nd5 Rd6 11.Bxf6 Bxf6 12.Nxf6+ Rxf6 13.Nxe5 Re6 14.f4 Re8 15.Bf3 f6 as pretas recuperam o peão.'],
  c42: [`${F} Bg4 7 Be3 Nfd7 8 O-O c5 9 d5 Na6 10 Ng5 Bxe2 11 Qxe2 Bxc3 12 bxc3 Qa5 13 Rac1 Qa4 14 f4 Nc7 15 Rf3`, 'bg4', '6...Bg4', '±',
    'O 6...Bg4 troca o bispo pelo cavalo de f3 para pressionar d4. Depois de 7.Be3 Nfd7 8.O-O c5 9.d5 Na6 10.Ng5 Bxe2 11.Qxe2 Bxc3 12.bxc3 Qa5 13.Rac1 Qa4 14.f4 Nc7 15.Rf3 o rei preto fica muito exposto (Shulman–D\'Amore, Olimpíada de Moscou 1994).'],
}

const notas = [
  // Coluna 37
  ['c37', 'a', 'a', '(a)', '5... c5 6 d5 O-O 7 Bd3 e6 8 O-O exd5 9 exd5 Bg4 10 h3 Bxf3 11 Qxf3 Nfd7 12 Qd1 Ne5 13 Be2', { a: '⩲', r: 'Seirawan–de Firmian, Los Angeles 1987', c: '5...c5 6.d5 O-O 7.Bd3 e6 8.O-O exd5 9.exd5 Bg4 10.h3 Bxf3 11.Qxf3 Nfd7 12.Qd1 Ne5 13.Be2 é um pouco melhor para as brancas.' }],
  ['c37', 'b', 'b', '(b)', '6 Be3 e5 7 dxe5 dxe5 8 Qxd8 Rxd8 9 Nd5 Rd7 10 Nxf6+ Bxf6 11 c5 Nc6 12 Bb5 Rd8 13 Bxc6 bxc6 14 Nd2 Ba6', { a: '=', r: 'Rivas–J. Polgar, Madri 1993', c: '6.Be3 e5 7.dxe5 dxe5 8.Qxd8 Rxd8 9.Nd5 Rd7! 10.Nxf6+ Bxf6 11.c5 Nc6 12.Bb5 Rd8 13.Bxc6 bxc6 14.Nd2 Ba6 leva à igualdade.' }],
  ['c37-b', '1', 'b', '(b) 6...Nbd7', '6... Nbd7 7 Nd2 e5 8 d5 Ne8 9 Be2 f5 10 f3 f4 11 Bf2 a5 12 a3 Nef6 13 b4', { a: '⩲', r: 'Sultan Khan–Flohr, Olimpíada de Praga 1931', c: '6...Nbd7 7.Nd2 e5 8.d5 Ne8 9.Be2 f5 10.f3 f4?! 11.Bf2 a5 12.a3 Nef6 13.b4 é um pouco melhor para as brancas.' }],
  ['c37-b-1', '1', 'b', '(b) 10...Bh6!', '10... Bh6', { a: '=', c: '10...Bh6! mantém a igualdade.' }],
  ['c37', 'c', 'c', '(c)', '8 O-O Na6 9 Bg5 h6 10 Bh4 Qe8 11 Ne1 Nh7 12 Nd3 f5 13 exf5 g5 14 Bh5 Qe7 15 Bg3 e4 16 Re1 Bxc3 17 bxc3 Bxf5', { a: '∓', r: 'Ivanov–Glek, Werfen 1991', c: '8.O-O Na6 9.Bg5 h6 10.Bh4 Qe8 11.Ne1 Nh7 12.Nd3 f5 13.exf5 g5 14.Bh5 Qe7 15.Bg3 e4 16.Re1 Bxc3 17.bxc3 Bxf5 é melhor para as pretas.' }],
  ['c37-c', '1', 'c', '(c) 11...Nc5', '11... Nc5 12 f3 Nh5 13 Nb5 Na6 14 Nd3 Nf4 15 Nxf4 exf4 16 Qd2 Qe5 17 Rab1', { a: '=', r: 'C. Hansen–Wojtkiewicz, Wijk aan Zee 1994', c: '11...Nc5 12.f3 Nh5 13.Nb5 Na6 14.Nd3 Nf4 15.Nxf4 exf4 16.Qd2 Qe5 17.Rab1 leva à igualdade.' }],
  ['c37-c', '2', 'c', '(c) 11...g5', '11... g5 12 Bg3 Nxe4 13 Nxe4 f5 14 Bh5 Qe7 15 f3 fxe4 16 fxe4 Nc5', { a: '∞', r: 'Polugaevsky–W. Watson, Sochi 1988', c: '11...g5 12.Bg3 Nxe4 13.Nxe4 f5 14.Bh5 Qe7 15.f3 fxe4 16.fxe4 Nc5 deixa o jogo obscuro.' }],
  ['c37-c', '3', 'c', '(c) 13.f3', '13 f3 Nf6 14 Bf2 g5 15 c5 Qg6 16 cxd6 cxd6 17 exf5 Bxf5', { a: '∞', r: 'Glek', c: '13.f3 Nf6 14.Bf2 g5 15.c5 Qg6 16.cxd6 cxd6 17.exf5 Bxf5, com a ideia ...e4, deixa o jogo obscuro.' }],
  ['c37', 'd', 'd', '(d)', '10... h5 11 Bg5 Qe8 12 a3 Bd7 13 b3 Nh7 14 Be3 h4 15 Qc2 f5 16 f3 Bf6 17 O-O-O Bg5', { a: '∓', r: 'Lerner–Uhlmann, Berlim 1989', c: '10...h5 é uma tentativa interessante: 11.Bg5 Qe8 12.a3 Bd7 13.b3 Nh7 14.Be3 h4!? 15.Qc2 f5 16.f3 Bf6 17.O-O-O Bg5 é melhor para as pretas.' }],
  ['c37-d', '1', 'd', '(d) 11.O-O', '11 O-O Bh6 12 f3 Be3+ 13 Kh1 g5', { a: '=', c: '11.O-O Bh6 12.f3 Be3+ 13.Kh1 g5 dá bom jogo às pretas.' }],
  ['c37-d', '2', 'd', '(d) 12.f3', '12 f3 Bd7 13 Be3 Nh7 14 a3', { a: '∞', c: '12.f3 Bd7 13.Be3 Nh7 14.a3 deixa o jogo obscuro.' }],
  ['c37-d', '3', 'd', '(d) 14...Bf6?!', '14... Bf6 15 h4', { a: '⩲', c: '14...Bf6?! 15.h4 é um pouco melhor para as brancas.' }],
  ['c37', 'e', 'e', '(e)', '12 Kh1 f5 13 exf5 gxf5 14 Bh5 Qd7 15 f4 e4 16 h3 Nc5 17 g4 Nf6 18 Bxf6 Rxf6 19 Qe2 Qe7', { a: '=', r: 'Panno–Fedorowicz, Lone Pine 1978', c: '12.Kh1 f5 13.exf5 gxf5 14.Bh5 Qd7 15.f4 e4 16.h3 Nc5 17.g4 Nf6 18.Bxf6 Rxf6 19.Qe2 Qe7 leva à igualdade.' }],
  ['c37', 'f', 'f', '(f)', '13... f5 14 exf5 gxf5 15 Bh5 Qc8 16 Be7 Re8 17 Bxe8 Qxe8 18 Bh4 e4 19 Qc2 Qh5 20 Bg3 Rf8', { a: '=', r: 'Yusupov–Kasparov, Barcelona 1989', c: '13...f5 14.exf5 gxf5 15.Bh5 Qc8 16.Be7 Re8! 17.Bxe8?! Qxe8 18.Bh4 e4 19.Qc2 Qh5 20.Bg3 Rf8 dá às pretas excelente compensação pela qualidade.' }],
  ['c37-f', '1', 'f', '(f) 17.Bh4', '17 Bh4 Rf8 18 Be7', { a: '=', c: '17.Bh4 Rf8 18.Be7 repete e leva à igualdade.' }],
  ['c37', 'g', 'g', '(g)', '15 Rb1 Be3+ 16 Bf2 Bc5 17 Bxc5 Nxc5 18 Qc2 Qe7 19 b4 axb4 20 axb4 Na4 21 Nd1 h4 22 Nf2 Nf6 23 Nd3 Nh5 24 c5 Qg5 25 Rf2 Bb5', { a: '∓', r: 'Speelman–Timoshenko, Londres (Lloyds Bank) 1992', c: '15.Rb1 Be3+ 16.Bf2 Bc5 17.Bxc5 Nxc5 18.Qc2 Qe7 19.b4 axb4 20.axb4 Na4 21.Nd1 h4 22.Nf2 Nf6 23.Nd3 Nh5 24.c5 Qg5 25.Rf2 Bb5 é melhor para as pretas.' }],
  ['c37', 'h', 'h', '(h)', '16 Rb1 Bc5 17 Qc1 f5 18 exf5 gxf5 19 Bf2 Qg6 20 Bxc5 dxc5', { a: '∞', r: 'Timoshenko–Sahović, Belgrado 1995', c: '16.Rb1 Bc5 17.Qc1 f5 18.exf5 gxf5 19.Bf2 Qg6 20.Bxc5 dxc5 deixa o jogo obscuro.' }],
  // Coluna 38
  ['c38', 'i', 'i', '(i)', '7... Nh5 8 g3 Na6 9 Nd2 Nf6 10 h4 c6 11 Nb3 Nc7 12 Bg5 cxd5 13 cxd5 h6 14 Bxf6 Qxf6 15 Bg4', { a: '⩲', r: 'Petrosian–Gufeld, Campeonato da URSS 1960', c: '7...Nh5 8.g3 Na6 9.Nd2 Nf6 10.h4 c6 11.Nb3 Nc7 12.Bg5 cxd5 13.cxd5 h6 14.Bxf6! Qxf6 15.Bg4 é um pouco melhor para as brancas.' }],
  ['c38-i', '1', 'i', '(i) 8.Ng1', '8 Ng1 Nd7 9 Bxh5 gxh5 10 Qxh5 Nc5 11 Nf3 f5 12 O-O f4 13 b4 Nd7 14 Bb2 Qe7', { a: '∓', r: 'Szabo–Boleslavsky, Torneio de Candidatos, Budapeste 1950', c: '8.Ng1 Nd7! 9.Bxh5 gxh5 10.Qxh5 Nc5 11.Nf3 f5 12.O-O f4 13.b4 Nd7 14.Bb2 Qe7 é melhor para as pretas.' }],
  ['c38-i', '2', 'i', '(i) 8...f5', '8... f5 9 exf5 Qf6 10 Ng5 Qxf5 11 O-O Nf6 12 f3', { a: '±', r: 'Petrosian–I. Zaitsev, Moscou 1966', c: '8...f5 9.exf5 Qf6 10.Ng5 Qxf5 11.O-O Nf6 12.f3 é melhor para as brancas.' }],
  ['c38-i', '3', 'i', '(i) 8...a5', '8... a5 9 h4 Na6 10 Nd2 Nf6 11 g4', { a: '±', c: '8...a5 9.h4 Na6 10.Nd2 Nf6 11.g4 é melhor para as brancas.' }],
  ['c38', 'j', 'j', '(j)', '8 Bg5 h6 9 Bh4 g5 10 Bg3 Nxe4', { a: '=', c: '8.Bg5?! h6 9.Bh4 g5 10.Bg3 Nxe4! está bem para as pretas.' }],
  ['c38', 'k-A', 'k', '(k) A', '8... h5', { c: '8...h5!?, ideia de Hebden, ganha espaço na ala do rei e prepara ...Nh7 e ...f5.' }],
  ['c38-k-A', '1', 'k', '(k) A 9.Rb1', '9 Rb1 c5', { c: 'Contra 9.Rb1, 9...c5 freia as brancas na ala da dama.' }],
  ['c38', 'k-B', 'k', '(k) B', '8... Kh8 9 a3 c5 10 h4 h5 11 Nf3 Ng4 12 Ng5 Nh6 13 Be3 f5 14 exf5 Bxf5 15 Qd2 Ng4 16 Bxg4 Bxg4 17 f3', { a: '⩲', r: 'Kramnik–Kamsky, Melody Amber 1994', c: '8...Kh8 9.a3 c5 10.h4 h5 11.Nf3 Ng4 12.Ng5 Nh6 13.Be3 f5 14.exf5 Bxf5 15.Qd2 Ng4 16.Bxg4 Bxg4 17.f3 é um pouco melhor para as brancas.' }],
  ['c38', 'l', 'l', '(l)', '9 a3 c5 10 h4 f5 11 h5 f4 12 hxg6 hxg6 13 Bg4', { a: '⩲', r: 'Speelman–Ivanchuk, Linares 1991', c: '9.a3 c5 10.h4 f5 11.h5 f4?! 12.hxg6 hxg6 13.Bg4 é um pouco melhor para as brancas.' }],
  // Coluna 39
  ['c39', 'n', 'n', '(n)', '9 Nd5 Rd7 10 Nxe5 Nxd5 11 Nxd7 Nb4 12 Nxb8 Nc2+ 13 Kd1 Nxa1 14 Bf4 Rxb8 15 Kc1 Bd7 16 Kb1 Re8 17 Bd3 f5 18 f3 fxe4 19 Bxe4 Bf5', { a: '=', r: 'Perić–Romero Holmes, Espanha 1994', c: '9.Nd5 Rd7 10.Nxe5 Nxd5 11.Nxd7 Nb4 12.Nxb8 Nc2+ 13.Kd1 Nxa1 14.Bf4 Rxb8 15.Kc1 Bd7 16.Kb1 Re8 17.Bd3 f5 18.f3 fxe4 19.Bxe4 Bf5 leva à igualdade.' }],
  ['c39-n', '1', 'n', '(n) 9.Nxe5', '9 Nxe5 Nxe4', { c: '9.Nxe5 Nxe4 recupera o peão na hora.' }],
  ['c39', 'o-A', 'o', '(o) A', '10 O-O-O h6 11 Be3 c6 12 Ne1 Ng4 13 Bxg4 Bxg4 14 f3 Be6', { a: '=', r: 'Siegel–Grischuk, Szeged 1994', c: '10.O-O-O h6 11.Be3 c6 12.Ne1 Ng4 13.Bxg4 Bxg4 14.f3 Be6 leva à igualdade.' }],
  ['c39-o-A', '1', 'o', '(o) A 11...Ng4', '11... Ng4', { c: '11...Ng4!? também é possível.' }],
  ['c39', 'o-B', 'o', '(o) B', '10 O-O c6 11 Rfd1 Nbd7 12 Rd2 h6 13 Bxf6 Nxf6 14 Rad1 Be6', { a: '∓', r: 'Karst–Bauer, Gau-Algesheim 1994', c: '10.O-O c6 11.Rfd1 Nbd7 12.Rd2 h6 13.Bxf6 Nxf6 14.Rad1 Be6 é melhor para as pretas.' }],
  ['c39', 'o-C', 'o', '(o) C', '10 h3 c6 11 O-O Na6 12 Be3 Bf8 13 Nd2 Nc5', { a: '=', r: 'Elinson–Murey, Israel 1986', c: '10.h3 c6 11.O-O Na6 12.Be3 Bf8 13.Nd2 Nc5 leva à igualdade.' }],
  ['c39', 'p', 'p', '(p)', '12... b5 13 Bb3 Bb7 14 Rc1 Rc8 15 Be3 a5', { a: '∞', r: 'Golod–Becerra Rivero, ICC 2004', c: '12...b5 13.Bb3 Bb7 14.Rc1 Rc8 15.Be3 a5 deixa o jogo obscuro.' }],
  ['c39', 'q-A', 'q', '(q) A', '13... Nc6 14 O-O-O Nb4 15 Bb3 Be6 16 Bxe6 Rxe6 17 Kb1 Na6 18 Rd5', { a: '⩲', r: 'Prangl–Werbeck, por correspondência 1993', c: '13...Nc6 14.O-O-O Nb4 15.Bb3 Be6 16.Bxe6 Rxe6 17.Kb1 Na6 18.Rd5 é um pouco melhor para as brancas.' }],
  ['c39', 'q-B', 'q', '(q) B', '13... Na6 14 a3', { a: '⩲', c: '13...Na6 14.a3 é um pouco melhor para as brancas.' }],
  ['c39', 'r', 'r', '(r)', '14 Nd2 Nc5 15 O-O-O Be6 16 Bxe6 Nxe6', { a: '=', r: 'K. Georgiev–Sutovsky, Gibraltar 2006', c: '14.Nd2 Nc5 15.O-O-O Be6 16.Bxe6 Nxe6 leva à igualdade.' }],
  ['c39', 's', 's', '(s)', '16 Bb3 Nxe4 17 Rc7 Be6', { a: '=', c: '16.Bb3 Nxe4 17.Rc7 Be6 leva a uma posição igual.' }],
  // Coluna 40
  ['c40', 't-A', 't', '(t) A', '11 f4 Na6 12 O-O-O h6 13 Bh4 Nc5 14 Bf3 g5 15 Bf2 Ne6 16 Nxf7 Kxf7 17 e5 Nxf4 18 exf6 Bxf6 19 Ne4 Be5', { a: '=', r: 'Ferragut–Camacho Penate, Cuba 1997', c: '11.f4 Na6 12.O-O-O h6 13.Bh4 Nc5 14.Bf3 g5 15.Bf2 Ne6 16.Nxf7 Kxf7 17.e5 Nxf4 18.exf6 Bxf6 19.Ne4 Be5 leva à igualdade.' }],
  ['c40', 't-B', 't', '(t) B', '11 Bf4 Na6 12 O-O-O Nc5 13 f3 Nh5 14 Be3 Nxe4 15 Nxe4 Bxe5 16 Bd4 Bf5 17 Bxe5 Rxe5 18 Nc3 Nf4', { a: '∓', r: 'Bouaziz–Nunn, Interzonal de Szirák 1987', c: '11.Bf4 Na6 12.O-O-O Nc5 13.f3 Nh5 14.Be3 Nxe4 15.Nxe4 Bxe5 16.Bd4 Bf5 17.Bxe5 Rxe5 18.Nc3 Nf4 é melhor para as pretas.' }],
  ['c40', 'u', 'u', '(u)', '16 Bxg4 Bxg4 17 f3 Be5 18 Bg3 Bxd6 19 Bxd6 Nd3+ 20 Kc2 Rad8 21 c5 Nb4+ 22 Kb3 Nd3 23 Kc2 Nb4+ 24 Kb3 Nd3', { a: '=', r: 'Haag–Pirisi, Balatonberény 1988', c: '16.Bxg4 Bxg4 17.f3 Be5 18.Bg3 Bxd6 19.Bxd6 Nd3+ 20.Kc2 Rad8 21.c5 Nb4+ 22.Kb3 Nd3 23.Kc2 Nb4+ 24.Kb3 Nd3 e o empate foi combinado.' }],
  // Coluna 41
  ['c41', 'v-A', 'v', '(v) A', '10 O-O Re8 11 Rad1 h6 12 Bc1 c6 13 Ne1 Nc5 14 f3 a5 15 Nd3 Bf8', { a: '=', r: 'Pilaste–A. Rodríguez, Havana 1983', c: '10.O-O Re8 11.Rad1 h6 12.Bc1 c6 13.Ne1 Nc5 14.f3 a5 15.Nd3 Bf8 leva à igualdade.' }],
  ['c41', 'v-B', 'v', '(v) B', '10 Nd2 c6 11 O-O-O Nc5 12 Be3 Nd3+ 13 Bxd3 Rxd3 14 Nb3 Rxd1+ 15 Rxd1', { a: '=', r: 'Korsunsky–Ziegler, Las Vegas 1993', c: '10.Nd2 c6 11.O-O-O Nc5 12.Be3 Nd3+ 13.Bxd3 Rxd3 14.Nb3 Rxd1+ 15.Rxd1 leva à igualdade.' }],
  ['c41', 'v-C', 'v', '(v) C', '10 Nxe5 Re8 11 f4 Nc5 12 Bf3 h6 13 Bxf6 Bxf6 14 O-O-O Bxe5 15 fxe5 c6', { a: '=', r: 'Guseinov–Muratov, Moscou 1995', c: '10.Nxe5 Re8 11.f4 Nc5 12.Bf3 h6 13.Bxf6 Bxf6 14.O-O-O Bxe5 15.fxe5 c6 leva à igualdade.' }],
  ['c41', 'w', 'w', '(w)', '14... f6 15 Ng4 h5 16 Nf2 Nc5 17 O-O Nxe4 18 Nxe4 Rxe4 19 Bd3', { a: '±', r: 'Mueller–Gustavsson, Bruchköbel 1993', c: '14...f6? 15.Ng4 h5 16.Nf2 Nc5 17.O-O Nxe4 18.Nxe4 Rxe4 19.Bd3 é melhor para as brancas.' }],
  ['c41', 'x', 'x', '(x)', '16 Nd3 Bf5 17 Nf2 Bxe4 18 Nxe4 f5 19 O-O-O fxe4 20 Be2 Nc5 21 g3 a5', { a: '=', r: 'Tolstikh–Bagaturov, Pardubice 1995', c: '16.Nd3 Bf5 17.Nf2 Bxe4 18.Nxe4 f5 19.O-O-O fxe4 20.Be2 Nc5 21.g3 a5 leva à igualdade.' }],
  // Coluna 42
  ['c42', 'y', 'y', '(y)', '7... Nc6 8 d5 Bxf3 9 Bxf3 Ne5 10 Be2 c6 11 O-O Qa5 12 f4 Ned7 13 a3 cxd5 14 exd5 Rfc8 15 b4', { a: '⩲', r: 'Eingorn–Mironenko, Alicante 1992', c: '7...Nc6 8.d5 Bxf3 9.Bxf3 Ne5 10.Be2 c6 11.O-O Qa5 12.f4 Ned7 13.a3 cxd5 14.exd5 Rfc8 15.b4 é um pouco melhor para as brancas, que têm mais espaço.' }],
  ['c42', 'z', 'z', '(z)', '8 Ng1 Bxe2 9 Ngxe2 c5 10 O-O Na6 11 Rc1 Nc7 12 Qd2 cxd4 13 Nxd4 Ne5 14 b3 Ng4 15 Bg5', { a: '⩲', r: 'Chuchelov–Kaminik, Suíça 1996', c: '8.Ng1 também é bom: 8...Bxe2 9.Ngxe2 c5 10.O-O Na6 11.Rc1 Nc7 12.Qd2 cxd4 13.Nxd4 Ne5 14.b3 Ng4 15.Bg5!? dá às brancas um bloqueio de espaço no estilo Maróczy. Se as pretas jogarem ...e5 e ...f5 por rotina, as casas claras ficam fracas.' }],
]

const capitulo = {
  id: 'india-rei-g',
  arquivo: 'india-rei-g',
  nome: 'Índia do Rei — 7.d5, 7.dxe5 e 6...Bg4',
  fonte: "Modern Chess Openings — King's Indian Defense (pp. 610–612), colunas 37–42",
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2',
  corPadrao: 'b',
  ordem: 610,
  grupos: [
    { id: 'petrosian', nome: '6...e5 7.d5 (Petrosian)', colunas: [37, 38] },
    { id: 'dxe5', nome: '6...e5 7.dxe5', colunas: [39, 40, 41] },
    { id: 'bg4', nome: '6...Bg4', colunas: [42] },
  ],
}

module.exports = { capitulo, colunas, notas }
