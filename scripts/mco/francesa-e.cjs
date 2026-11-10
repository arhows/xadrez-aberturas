// Transcrição do MCO 15ª ed. — Defesa Francesa, Winawer com 6...Ne7: Peão Envenenado e Linha Principal
// (pp. 217–222), colunas 31–42.
// Gerar: node scripts/mco/gerar.cjs francesa-e
// Formato: ver gambito-do-rei.cjs. Dicas em francesa-e-dicas.cjs.

const W = '1 e4 e6 2 d4 d5 3 Nc3 Bb4 4 e5 c5 5 a3 Bxc3+ 6 bxc3 Ne7'
const PP = `${W} 7 Qg4 Qc7 8 Qxg7 Rg8 9 Qxh7 cxd4`
const P10 = `${PP} 10 Ne2 Nbc6 11 f4 dxc3 12 Qd3 Bd7`
const O7 = `${W} 7 Qg4 O-O`

const colunas = {
  c31: [`${P10} 13 Nxc3 a6 14 Rb1 Na5 15 h4 Nf5`, 'pp-qc7', '7.Qg4 Qc7 … 13.Nxc3', '⩲',
    'Na Winawer as pretas cravam o cavalo com 3...Bb4 e, depois de 5.a3 Bxc3+, as brancas ficam com o par de bispos e peões dobrados. Com 7.Qg4 a dama ataca g7: na Variante do Peão Envenenado as pretas entregam o flanco do rei em troca de contrajogo no centro. Com 13.Nxc3 as brancas ficam um pouco melhor.'],
  c32: [`${P10} 13 Qxc3 Nf5 14 Rb1 d4 15 Qd3 O-O-O`, 'pp-qc7', '7.Qg4 Qc7 … 13.Qxc3', '=',
    'Com 13.Qxc3 Nf5 as pretas avançam ...d4 e rocam grande; a posição é complexa e as chances são iguais.'],
  c33: [`${P10} 13 Rb1 d4 14 Nxd4 Nxd4 15 Qxd4 Nf5`, 'pp-qc7', '7.Qg4 Qc7 … 13.Rb1', '±',
    'Com 13.Rb1 d4 14.Nxd4 as brancas devolvem material para abrir o jogo e ficam melhor.'],
  c34: [`${PP} 10 Kd1 Nbc6 11 Nf3 dxc3 12 Bf4 Bd7 13 Ng5 Rf8 14 Bd3 Qb6 15 Be3 d4`, 'pp-qc7', '7.Qg4 Qc7 … 10.Kd1', '∓',
    'Com 10.Kd1 o rei branco sai da coluna e, mas as pretas ficam com um centro forte de peões e um pouco melhor.'],
  c35: [`${O7} 8 Bd3 Nbc6 9 Qh5 Ng6 10 Nf3 Qc7 11 Be3 c4 12 Bxg6 fxg6 13 Qg4 Qf7 14 Ng5 Qe8 15 h4 h6`, 'pp-oo', '7.Qg4 O-O 8.Bd3', '⩲',
    'Com 7...O-O as pretas defendem g7 rocando; as brancas atacam o rei com Bd3, Qh5 e h4 e têm chances de ataque.'],
  c36: [`${O7} 8 Nf3 Nbc6 9 Bd3 f5 10 exf6 Rxf6 11 Bg5 e5 12 Qg3 Rxf3 13 gxf3 c4 14 Be2 exd4 15 Bf6 Qf8`, 'pp-oo', '7.Qg4 O-O 8.Nf3', '∓',
    'Com 8.Nf3 Nbc6 9.Bd3 f5 as pretas abrem a coluna f e entregam a qualidade em f3; ficam com o centro e um pouco melhor.'],
  c37: [`${W} 7 Nf3 Nbc6 8 Be2 Qa5 9 Bd2 Bd7 10 O-O c4 11 Ng5 h6 12 Nh3 Ng6 13 Bh5 O-O-O 14 f4 Rdf8 15 Qe1 Nge7`, 'nf3', '7.Nf3 Nbc6', '⩲',
    'Na linha principal as brancas jogam 7.Nf3, desenvolvendo sem pressa. Com 7...Nbc6 e ...c4 as pretas fecham o flanco da dama e as brancas preparam f4–f5 no flanco do rei: um pouco melhor para as brancas.'],
  c38: [`${W} 7 Nf3 Bd7 8 dxc5 Qc7 9 Bd3 Ba4 10 Rb1 Nd7 11 Rb4 Bc6 12 O-O Nxc5 13 Rg4 Ng6 14 Nd4 O-O-O 15 f4 Bd7`, 'nf3', '7.Nf3 Bd7', '⩲',
    'Com 7...Bd7 as pretas querem trocar o bispo bom das brancas por ...Ba4; com 8.dxc5 as brancas trocam a estrutura de peões por atividade e ficam um pouco melhor.'],
  c39: [`${W} 7 Nf3 b6 8 Bb5+ Bd7 9 Bd3 Ba4 10 O-O c4 11 Be2 h6 12 Nh4 Nbc6 13 f4 Qd7 14 g4 g6 15 f5 gxf5`, 'nf3', '7.Nf3 b6', '=',
    'Com 7...b6 as pretas preparam a troca dos bispos de casas claras e fecham a posição com ...c4: luta estratégica, igual.'],
  c40: [`${W} 7 Nf3 Qc7 8 a4 b6 9 Bb5+ Bd7 10 O-O Bxb5 11 axb5 Nd7 12 Qd3 h6 13 Ra4 O-O 14 Bd2 Rfc8 15 Rc1 Nf8`, 'nf3', '7.Nf3 Qc7', '⩲',
    'Com 7...Qc7 8.a4 b6 9.Bb5+ os bispos de casas claras são trocados; a torre branca entra pela quarta fileira e as brancas ficam um pouco melhor.'],
  c41: [`${W} 7 a4 Qa5 8 Bd2 Nbc6 9 Nf3 Bd7 10 Bb5 Qc7 11 O-O O-O 12 Re1 b6 13 Bd3 h6 14 Qc1 c4 15 Bf1 Kh7`, 'a4', '7.a4 Qa5 8.Bd2', '=',
    'Com 7.a4 as brancas preparam Ba3 e impedem ...Qa5–a4 e ...Ba4. Com 8.Bd2 as pretas fecham com ...c4 e igualam.'],
  c42: [`${W} 7 a4 Qa5 8 Qd2 Nbc6 9 Nf3 Bd7 10 Be2 f6 11 exf6 gxf6 12 dxc5 O-O-O 13 O-O e5 14 c4 d4 15 Qh6 Ng6`, 'a4', '7.a4 Qa5 8.Qd2', '∞',
    'Com 8.Qd2 as pretas atacam a cunha com ...f6 e rocam grande; com o centro de peões preto, as chances são dos dois lados.'],
}

const notas = [
  // Coluna 31
  ['c31', 'a', 'a', '(a)', '8 Bd3 cxd4 9 Ne2 dxc3 10 Qxg7 Rg8 11 Qxh7 Qxe5 12 Bf4 Qf6 13 h4 Nd7 14 Bg5 Qg7', { a: '=', r: 'van den Doel–Peek, Amsterdã 2004', c: 'Com 8.Bd3 as brancas pegam os peões depois; fica igual.' }],
  ['c31-a', '1', 'a', '(a) 8...c4', '8... c4 9 Be2 Nf5', { c: '8...c4 9.Be2 Nf5 é razoável.' }],
  ['c31', 'b', 'b', '(b)', '11 Bf4 dxc3 12 Qd3 Bd7 13 Qxc3 O-O-O 14 h4 Ng6 15 Bg3 Ngxe5', { a: '=', c: 'Com 11.Bf4 fica igual.' }],
  ['c31', 'c', 'c', '(c)', '12... d4 13 Nxd4 Nxd4 14 Qxd4 Bd7 15 Rg1 Nf5 16 Qf2 Qc6 17 Bd3 Qd5 18 Rb1 Bc6 19 Rb3', { a: '⩲', r: 'Ernst–Einarsson, Reykjavik 1990', c: 'Com 12...d4 vem 15.Rg1!, e as brancas ficam um pouco melhor.' }],
  ['c31', 'd', 'd', '(d)', '14 Ne2 Rc8 15 Bd2 Nf5 16 Rb1 Na7 17 Nd4 Nxd4 18 Qxd4 Nb5 19 Qd3 Qxc2 20 Qxc2 Rxc2 21 a4', { a: '⩲', r: 'Khalifman–Shulman, Khanty-Mansiysk 2005', c: 'Com 14.Ne2 as brancas ficam um pouco melhor.' }],
  ['c31-d', '1', 'd', '(d) 14...Nf5?!', '14... Nf5 15 h3 Na5 16 g4 Bb5 17 Qc3', { a: '±', c: '14...Nf5?! 15.h3 deixa as brancas melhor.' }],
  ['c31-d', '2', 'd', '(d) 16.h3', '16 h3 Nxe5', { c: 'Não 16.h3, por causa de 16...Nxe5!.' }],
  ['c31', 'e', 'e', '(e)', '14... Rc8 15 h4 Nf5 16 Rh3 Nce7 17 h5 Nh6 18 Bd2', { a: '⩲', r: 'Landa–Bunzmann 2002', c: 'Com 14...Rc8 as brancas ficam um pouco melhor.' }],
  ['c31', 'f', 'f', '(f)', '16 Rh3 O-O-O 17 h5 Bc6 18 Rb4', { a: '⩲', r: 'Cheparinov–Szymanski, Anibal Open 2005', c: 'Depois de 16.Rh3 as brancas ficam um pouco melhor.' }],
  // Coluna 32
  ['c32', 'g', 'g', '(g)', '13... O-O-O 14 Ng3 Rh8 15 Bd2 Rdg8 16 O-O-O Kb8 17 Bd3 Nc8 18 Rdg1', { a: '⩲', r: 'Spassky–Nogueiras, Candidatos de Montpellier 1985', c: 'Com 13...O-O-O 14.Ng3!? as brancas ficam um pouco melhor.' }],
  ['c32-g', '1', 'g', '(g) 14.Rb1', '14 Rb1 d4 15 Qd3 Nf5', { c: '14.Rb1 d4 15.Qd3 Nf5 volta à coluna.' }],
  ['c32', 'h', 'h', '(h)', '14... Rc8 15 Bd2 a6 16 Rg1 b5 17 g4', { a: '±', r: 'Short–Kosten, Hastings 1988/89', c: '14...Rc8?! é menos preciso; as pretas já ficam em dificuldade.' }],
  ['c32', 'i', 'i', '(i)', '16 Rg1 Be8 17 g4 Nh4 18 Rg3 f6 19 exf6 e5 20 g5 Bf7 21 Bh3+ Kb8 22 fxe5 Nxe5 23 Qe4 Rge8 24 Kf1 Neg6 25 Qg4 Qxc2 26 Bf4+ Nxf4 27 Qxf4+ Ka8 28 Re1 d3 29 Qxh4 Qxe2+', { a: '-+', r: 'Sznapik–Nogueiras, Olimpíada de Thessaloniki 1988', c: 'As pretas têm chances iguais nesta posição complexa. Na partida, 18...f6! e 22.fxe5? deram a vitória às pretas: as brancas abandonaram.' }],
  ['c32-i', '1', 'i', '(i) 22.f5', '22 f5', { c: 'Melhor era 22.f5.' }],
  ['c32-i', '2', 'i', '(i) 24.Qxh4', '24 Qxh4 Qxc2', { a: '-+', c: '24.Qxh4 Qxc2 também ganha para as pretas.' }],
  // Coluna 33
  ['c33', 'j', 'j', '(j)', '13 Be3 O-O-O 14 g3 Nf5 15 Bf2 Kb8 16 Bh3 Nce7 17 g4 Nh6 18 Rg1 Rc8 19 Nd4 Ng6 20 Qe3', { a: '±', r: 'Sax–Sulman, Pula 1997', c: 'As brancas podem tentar desenvolver com 13.Be3 e ficam melhor na partida.' }],
  ['c33-j', '1', 'j', '(j) 17.Qxc3', '17 Qxc3 Qxc3+ 18 Nxc3 Rc8 19 Kd2 Rc7', { c: '17.Qxc3 Qxc3 18.Nxc3 Rc8 19.Kd2 Rc7, com ...Rgc8 (Sulman).' }],
  ['c33-j', '2', 'j', '(j) 15...d4!', '15... d4 16 Bh3 Nce7 17 g4 Ne3 18 Bxe3 dxe3 19 Qxe3 Bc6 20 O-O Rh8', { a: '∞', c: 'Mas o lance temático das pretas é 15...d4!, com jogo pouco claro.' }],
  ['c33', 'k-A', 'k', '(k) A', '13... Nf5 14 h3 d4 15 g4 Nh4 16 Qh7 Nf3+ 17 Kf2 O-O-O 18 Kxf3 Nxe5+ 19 fxe5 Bc6+ 20 Kf2 Bxh1 21 Rb4 Qxe5 22 Bf4', { a: '±', r: 'Horvath–Uhlmann, Szirak 1985', c: '13...Nf5 é respondido por 14.h3!, e as brancas ficam melhor.' }],
  ['c33', 'k-B', 'k', '(k) B', '13... O-O-O 14 Nxc3 Na5 15 g3 Kb8 16 Ne2 Ba4 17 c3 Nf5 18 Bh3 d4', { a: '∞', r: 'Svidler–Ivanchuk, Linares 1999', c: 'Com 13...O-O-O e 18...d4! o jogo fica pouco claro.' }],
  ['c33', 'l', 'l', '(l)', '14 Ng3 O-O-O 15 Ne4 Nxe5 16 fxe5 Qxe5 17 Qe2 Bc6 18 Ng3 Qh8', { r: 'Smirin–Short, Tilburg 1992', c: 'Com 14.Ng3 as pretas sacrificam uma peça com 15...Nxe5! e têm boa compensação.' }],
  ['c33', 'm', 'm', '(m)', '16 Qf2 Bc6 17 Rg1 O-O-O 18 Qxa7 Qd7 19 Qa8+ Kc7 20 Qa5+ Kb8 21 Qxc3 Be4 22 Be3', { a: '±', r: 'Hertneck–Bunzmann, Bundesliga 2007', c: 'Depois de 16.Qf2 as brancas ficam melhor.' }],
  // Coluna 34
  ['c34', 'n', 'n', '(n)', '11... Nxe5 12 Bf4 Qxc3 13 Nxe5 Qxa1+ 14 Bc1 d3 15 Qxf7+ Kd8 16 Qf6 dxc2+ 17 Kxc2 Qa2+ 18 Bb2 Bd7 19 Nf7+ Ke8 20 Nd6+ Kd8 21 Nxb7+ Ke8 22 Be2', { c: '11...Nxe5 leva a complicações perigosas; a posição também pode surgir de 10...Nd7.' }],
  ['c34-n', '1', 'n', '(n) 14...Rf8', '14... Rf8 15 Bd3 Bd7 16 Re1 Nc6 17 Nxf7', { r: 'Fuchs–Uhlmann 1966', c: 'Ou 14...Rf8 15.Bd3 Bd7 16.Re1 Nc6 17.Nxf7!.' }],
  ['c34', 'o', 'o', '(o)', '16 Bf4 Ng6 17 Ne4 O-O-O 18 Nd6+ Kb8 19 Bg3 Ngxe5', { a: '∓', r: 'Thipsay–Agdestein, Olimpíada de Thessaloniki 1984', c: 'Depois de 16.Bf4 Ng6!? Thipsay jogou 17.Ne4 e perdeu aos poucos.' }],
  ['c34-o', '1', 'o', '(o) 17.Bxg6', '17 Bxg6 fxg6 18 Qxg6+ Kd8 19 Nxe6+ Bxe6 20 Qxe6 Rxf4 21 Qg8+ Kc7 22 Qxa8 d3', { a: '-+', c: '17.Bxg6 fxg6 18.Qxg6+ Kd8 19.Nxe6+?! Bxe6 20.Qxe6 Rxf4 21.Qg8+ Kc7 22.Qxa8? d3 ganha para as pretas.' }],
  // Coluna 35
  ['c35', 'p', 'p', '(p)', '7... Kf8 8 Nf3 Qa5 9 Bd2 Qa4 10 Ra2 b6 11 Qf4 h6 12 h4 Nd7', { a: '⩲', r: 'A. Sokolov–Eingorn, Campeonato da URSS 1988', c: 'Com 7...Kf8 as brancas mantêm a posição mais harmoniosa com o simples 13.Bd3 e 14.O-O.' }],
  ['c35', 'q', 'q', '(q)', '8... f5 9 exf6 Rxf6 10 Bg5 Rf7 11 Qh5 g6 12 Qd1 Nbc6 13 Nf3 Qf8 14 O-O c4 15 Be2', { a: '⩲', r: 'Shirov–Timman, Wijk aan Zee 2003', c: 'Com 8...f5 as brancas ficam um pouco melhor.' }],
  ['c35', 'r-A', 'r', '(r) A', '9... h6 10 Bxh6 gxh6 11 Qxh6 Nf5 12 Bxf5 exf5 13 O-O-O f4 14 Nh3 Ne7 15 Ng5 Bf5 16 g4 Be4 17 Rhe1 Qb6 18 e6 Bg6 19 Rd3', { a: '+-', r: 'Maus–Hübner, Lugano 1989', c: 'As pretas precisam ter cuidado: 9...h6? 10.Bxh6! e as pretas abandonaram depois de 19.Rd3.' }],
  ['c35', 'r-B', 'r', '(r) B', '9... Nf5 10 Nf3 f6 11 g4 c4 12 gxf5 cxd3 13 Rg1 Ne7 14 exf6 Rxf6 15 Rxg7+ Kxg7 16 Qg5+ Ng6 17 fxg6 hxg6 18 Bf4 Bd7 19 Be5 dxc2 20 h4 Be8 21 Nh2', { a: '+-', r: 'Kruppa–Kamerov, Kherson 1991', c: 'Com 9...Nf5 vem 15.Rxg7+!, com ataque vencedor.' }],
  ['c35', 's', 's', '(s)', '11 h4 cxd4 12 Kd1 dxc3 13 Rh3', { c: 'Morozevich tem uma ideia criativa, 11.h4!?: arriscado, mas divertido.' }],
  ['c35-s', '1', 's', '(s) 11...c4?', '11... c4 12 Ng5', { c: '11...c4? é respondido por 12.Ng5!.' }],
  ['c35', 't', 't', '(t)', '11... Nce7 12 h4 Bd7 13 Qg5 f6 14 exf6 gxf6 15 Qh6 cxd4 16 h5', { a: '⩲', r: 'Cvek–Petrik, Mitropa Cup 2006', c: 'Com 11...Nce7 vem 16.h5!, com complicações favoráveis às brancas.' }],
  ['c35', 'u', 'u', '(u)', '16 Nh3 a5 17 h5 gxh5 18 Qe2', { a: '⩲', r: 'Macieja–Vaisser, Istambul 2003', c: 'Depois de 16.Nh3 as brancas têm chances de ataque.' }],
  // Coluna 36
  ['c36', 'v', 'v', '(v)', '8... f5 9 exf6 Rxf6 10 Bg5 Nd7 11 Bd3 c4 12 Be2 Rf5 13 O-O Nf6 14 Bxf6 Rxf6 15 Ne5', { a: '⩲', r: 'Smirin–Ulibin, URSS 1988 (até 12...Rf5)', c: 'Com 8...f5 10.Bg5 Nd7! 11.Bd3! as brancas ficam um pouco melhor.' }],
  ['c36-v', '1', 'v', '(v) 10...Qa5', '10... Qa5 11 Bxf6 Qxc3+ 12 Ke2 Ng6 13 Rc1 gxf6 14 h4', { a: '±', c: '10...Qa5 deixa as brancas melhor.' }],
  ['c36', 'w', 'w', '(w)', '11... Rf7 12 Bxe7 Rxe7 13 Qh4 g6 14 O-O c4 15 Be2 Bd7 16 Rfe1 Qf8 17 Bf1 Rae8 18 Re2', { a: '⩲', r: 'Sax–Schmidt, Varsóvia 1987', c: 'Com 11...Rf7 as brancas ficam um pouco melhor.' }],
  ['c36', 'x-A', 'x', '(x) A', '12 Qh4 e4 13 Bxf6 gxf6 14 Qxf6 exd3', { a: '=', r: 'Psakhis–Dokhoian, Klaipeda 1988', c: 'Com 12.Qh4 fica igual.' }],
  ['c36', 'x-B', 'x', '(x) B', '12 Bxh7+ Kxh7 13 Qh5+ Kg8 14 Bxf6 gxf6 15 dxe5 Qf8', { a: '=', c: '12.Bxh7+ também mantém o equilíbrio, depois de 15...Qf8!.' }],
  ['c36', 'y', 'y', '(y)', '16 Bxd4 Nf5 17 Qf4 Nfxd4 18 Qxf8+ Kxf8 19 cxd4 Nxd4', { a: '∓', r: 'Campello–Teixeira, Rio de Janeiro 2004', c: 'Depois de 16.Bxd4 as pretas ficam um pouco melhor. O livro traz 18...Kxf4; o rei retoma em f8.' }],
  // Coluna 37
  ['c37', 'a', 'a', '(a)', '8 Bd3 Qc7 9 O-O Bd7 10 a4 c4 11 Be2 f6 12 Re1 Ng6 13 Ba3 fxe5 14 dxe5 Ncxe5 15 Nxe5 Nxe5 16 Qd4 Ng6 17 Bh5', { a: '±', r: 'Fischer–Larsen, match 1971', c: 'Também razoável é 8.Bd3; 12...Ng6?! 13.Ba3! deixa as brancas melhor.' }],
  ['c37-a', '1', 'a', '(a) 8...Qa5', '8... Qa5 9 Bd2 c4 10 Bf1 f6 11 exf6 gxf6', { a: '∞', r: 'R. Byrne–Korchnoi, Londres 1979', c: 'Mas as brancas precisam contar com 8...Qa5 9.Bd2 c4, com jogo pouco claro.' }],
  ['c37', 'b', 'b', '(b)', '8... Qc7 9 O-O Bd7 10 Re1 f6 11 Bf4 Ng6 12 Bg3 fxe5 13 Bd3 O-O-O 14 Bxg6 hxg6 15 Nxe5 Nxe5 16 Bxe5', { a: '±', r: 'Nunn–Hess, Lugano 1986', c: 'Com 8...Qc7 as brancas ficam melhor.' }],
  ['c37-b', '1', 'b', '(b) 12...f5', '12... f5 13 h4', { c: 'Se 12...f5, 13.h4!.' }],
  ['c37', 'c-A', 'c', '(c) A', '9... cxd4 10 cxd4 Qa4 11 Rb1 Nxd4 12 Bd3 Ndc6 13 Rb3', { r: 'Dolmatov–Oll, Campeonato da URSS 1989', c: 'Com 9...cxd4 e 13.Rb3! as brancas têm compensação enorme pelo peão.' }],
  ['c37-c-A', '1', 'c', '(c) 13...O-O?', '13... O-O 14 Bxh7+', { a: '+-', c: '13...O-O? 14.Bxh7+! ganha.' }],
  ['c37-c-A', '2', 'c', '(c) 12...Nxf3+', '12... Nxf3+ 13 Qxf3 Qd4 14 O-O Qxe5 15 Rfe1 Qf6 16 Qg3', { a: '±', c: 'As pretas não melhoram com 12...Nxf3+: 14.O-O! e as brancas ficam melhor.' }],
  ['c37-c-A', '3', 'c', '(c) 12...Nec6', '12... Nec6 13 O-O Nxf3+ 14 Qxf3 Nxe5 15 Qg3 Nxd3 16 Qxg7', { a: '+-', c: 'Nem com 12...Nec6: depois de 16.Qxg7 as brancas ganham.' }],
  ['c37', 'c-B', 'c', '(c) B', '9... Qa4 10 Rb1', { c: 'Se 9...Qa4, 10.Rb1!.' }],
  ['c37', 'd', 'd', '(d)', '10... f6 11 c4 Qc7 12 cxd5 Nxd5 13 c4 Nde7 14 exf6 gxf6 15 Bc3 O-O-O 16 d5 exd5 17 cxd5 Be6 18 Bxf6 Rhg8 19 dxc6 Rxd1 20 cxb7+ Kb8 21 Rfxd1', { a: '±', r: 'Markarichev–Lputian, URSS 1979', c: 'É perigoso abrir a posição com 10...f6; depois de 15...O-O-O? as brancas entregam a dama com compensação esmagadora.' }],
  ['c37-d', '1', 'd', '(d) 15...cxd4', '15... cxd4 16 Nxd4 Nxd4 17 Qxd4 e5 18 Qe3', { a: '⩲', c: 'O relativamente melhor é 15...cxd4, e as brancas ficam um pouco melhor.' }],
  ['c37', 'e', 'e', '(e)', '13... Nce7 14 a4 O-O-O 15 Qe1 Kb8 16 Bc1 Rc8 17 Ba3', { a: '±', r: 'Planinc–Timman, Amsterdã 1974', c: 'Com 13...Nce7 14.a4! as brancas ficam melhor.' }],
  ['c37', 'f', 'f', '(f)', '16 a4 f6 17 Bc1 fxe5 18 fxe5 Rxf1+ 19 Kxf1 Rf8+ 20 Nf2', { a: '⩲', r: 'Balashov–Naumkin, Campeonato da URSS 1991 (até 16...f6); análise de Naumkin', c: 'Depois de 16.a4 f6 17.Bc1 as brancas ficam um pouco melhor.' }],
  // Coluna 38
  ['c38', 'g', 'g', '(g)', '8 Rb1 Qc7 9 h4 Ba4 10 Bd3 Nd7 11 h5 h6 12 O-O', { a: '⩲', r: 'Bologan–Matamoros, Liga Espanhola 2002', c: '8.dxc5 troca a estrutura de peões por atividade. Em vez disso, 8.Rb1 talvez dê uma pequena vantagem.' }],
  ['c38', 'h', 'h', '(h)', '8... Ng6 9 Bd3 Nc6 10 O-O Ncxe5 11 Nxe5 Nxe5 12 Bf4 Qf6 13 Qd2 Nxd3 14 cxd3', { a: '⩲', r: 'Bruzon–Pelletier, Biel 2006', c: 'Com 8...Ng6 as brancas ficam um pouco melhor.' }],
  ['c38', 'i', 'i', '(i)', '16 Rg3 Kb8 17 Qe1 Ka8 18 h4 Nxd3 19 cxd3 h5 20 Be3', { a: '⩲', r: 'Spassky–Korchnoi, match 1977', c: 'Depois de 16.Rg3 as brancas ficam um pouco melhor.' }],
  // Coluna 39
  ['c39', 'j-A', 'j', '(j) A', '8 a4 Ba6 9 Bb5+ Bxb5 10 axb5 Nd7 11 O-O O-O 12 Qd3 Rc8 13 Bd2 h6 14 Ra2', { a: '⩲', r: 'de Firmian–Shulman, San Francisco 2002', c: 'Com 8.a4 Ba6 9.Bb5+ as brancas ficam um pouco melhor. O livro traz 10...Ne7, mas o cavalo já está em e7; o lance é 10...Nd7.' }],
  ['c39', 'j-B', 'j', '(j) B', '8 a4 Ba6 9 Bxa6 Nxa6 10 Qe2 Nb8 11 a5 Nd7 12 O-O h6 13 c4 dxc4 14 dxc5 bxc5', { a: '=', r: 'van der Welde–Halkias, Amsterdã 2006', c: 'Com 9.Bxa6 fica igual.' }],
  ['c39', 'k', 'k', '(k)', '10... h6 11 Re1 Qc7 12 dxc5 bxc5 13 c4 Nd7 14 cxd5 Nxd5 15 Qe2', { a: '⩲', r: 'de Firmian–Antonsen, Estocolmo 1997', c: 'Com 10...c4 as pretas fecham a posição e a partida vira uma luta estratégica. Com 10...h6 as brancas ficam um pouco melhor.' }],
  ['c39', 'l', 'l', '(l)', '16 gxf5 Nxf5 17 Nxf5 exf5', { a: '=', r: 'Vonthron–Porper, Viena 2006', c: 'Depois de 16.gxf5 fica igual.' }],
  // Coluna 40
  ['c40', 'm-A', 'm', '(m) A', '8 Bd3 b6 9 O-O Ba6 10 Bxa6 Nxa6 11 a4 Nc6 12 Qe2 Nab8 13 Ba3 Nd7', { a: '=', r: 'Cooke–Claasen, Dortmund 1993', c: 'Com 8.Bd3 fica igual.' }],
  ['c40', 'm-B', 'm', '(m) B', '8 Be2 b6', { a: '=', c: '8.Be2!? b6 também é igual.' }],
  ['c40', 'm-C', 'm', '(m) C', '8 h4 Bd7 9 h5 h6 10 Bd3 Ba4 11 dxc5 Nd7 12 Rh4 Qa5 13 Be3', { a: '⩲', r: 'Short–Ivanchuk, Horgen 1995', c: 'Digno de nota é 8.h4!?, com pequena vantagem das brancas.' }],
  ['c40', 'n-A', 'n', '(n) A', '8... Nbc6 9 Ba3 cxd4 10 cxd4 Qa5+ 11 Qd2 Qxd2+ 12 Kxd2 Na5 13 Bd3 Bd7 14 Rhb1 Rc8 15 Bb4 Nec6 16 Bd6', { a: '⩲', r: 'Golubev–Ivanchuk, Klaipeda 1985', c: 'Com 8...Nbc6 as pretas ficam num final desagradável.' }],
  ['c40-n-A', '1', 'n', '(n) 12...Bd7', '12... Bd7 13 a5 Nf5 14 Bc5', { a: '±', c: 'Se 12...Bd7, 13.a5! e as brancas ficam melhor.' }],
  ['c40', 'n-B', 'n', '(n) B', '8... Bd7 9 Bd3 Nbc6 10 O-O c4', { c: '8...Bd7 9.Bd3 Nbc6 10.O-O c4 transpõe para a nota (a) da coluna 37.' }],
  ['c40', 'o', 'o', '(o)', '10 Bd3 Nbc6 11 O-O h6 12 Ba3 Na5 13 Nd2 O-O 14 dxc5 bxc5 15 Nb3 Nxb3 16 cxb3', { a: '⩲', c: 'Com 10.Bd3 as brancas ficam um pouco melhor, mas a posição é muito desequilibrada.' }],
  ['c40', 'p-A', 'p', '(p) A', '11... O-O 12 Qd3 h6 13 Ra4 Rc8 14 dxc5 bxc5 15 Rg4', { a: '⩲', c: 'Com 11...O-O e 15.Rg4 as brancas têm perspectivas de ataque.' }],
  ['c40-p-A', '1', 'p', '(p) 13...Nd7', '13... Nd7', { c: '13...Nd7 volta à coluna.' }],
  ['c40', 'p-B', 'p', '(p) B', '11... a5 12 Ng5 h6 13 Nh3 Nd7 14 Nf4 O-O 15 Nh5', { a: '⩲', r: 'Ivkov–R. Byrne, Interzonal de Sousse 1967', c: 'Com 11...a5 as brancas ficam um pouco melhor.' }],
  ['c40', 'q', 'q', '(q)', '16 Ra6 Qd7 17 Rca1 c4 18 Qf1 Qxb5 19 Rxa7 Rxa7 20 Rxa7 Nc6 21 Ra2', { a: '⩲', r: 'Karpov–Mednis, Viena 1986', c: 'Depois de 16.Ra6 as brancas ficam um pouco melhor.' }],
  // Coluna 41
  ['c41', 'r', 'r', '(r)', '7 h4 Qa5 8 Bd2 cxd4 9 cxd4 Qa4 10 Nf3 Nbc6 11 Bd3 Nxd4 12 h5 Nec6 13 Kf1 Nf5 14 Bxf5 exf5 15 h6', { r: 'Fedorowicz–Yermolinsky, St. Martin 1993', c: 'Aventureiro é 7.h4!?, com jogo ativo pelo peão.' }],
  ['c41-r', '1', 'r', '(r) 7...Qc7', '7... Qc7', { c: '7...Qc7 é mais seguro.' }],
  ['c41', 's', 's', '(s)', '9 Qg4 O-O 10 Nf3 f6 11 Bd3 f5 12 Qg3 c4 13 Be2 b5 14 O-O bxa4 15 Ng5 Nxd4', { a: '∓', r: 'Fischer–Korchnoi, Herceg Novi (blitz) 1970', c: 'No grande torneio de blitz de Herceg Novi, Fischer experimentou 9.Qg4; depois de 15.Ng5? Nxd4 sofreu sua única derrota no torneio.' }],
  ['c41', 't', 't', '(t)', '10 Be2 f6 11 exf6 gxf6 12 O-O O-O-O 13 Re1 c4', { a: '=', r: 'Tringov–Timman 1983', c: 'Com o direto 10.Be2 f6! as pretas igualam com conforto.' }],
  ['c41-t', '1', 't', '(t) 12.c4', '12 c4 Qc7 13 cxd5 Nxd5 14 c4 Nde7 15 Bc3 cxd4 16 Nxd4 Nxd4 17 Qxd4 e5', { a: '=', c: 'Com 12.c4 também fica igual.' }],
  ['c41', 'u', 'u', '(u)', '10... c4 11 O-O a6 12 Bxc6 Bxc6 13 Ng5 h6 14 Qh5 g6 15 Qh3 Bxa4 16 Rfb1', { a: '⩲', r: 'Nunn–Hübner, Alemanha 1987', c: 'Com 10...c4 as pretas ficam um pouco desconfortáveis.' }],
  ['c41', 'v', 'v', '(v)', '16 Bf4 Ng6 17 Bg3 Qd8 18 Qd2 f5 19 exf6 Rxf6 20 Nh4 Nge7', { a: '=', r: 'Nunn–Gulko, San Francisco 1995', c: 'Depois de 16.Bf4 fica igual.' }],
  // Coluna 42
  ['c42', 'w-A', 'w', '(w) A', '10 Bd3 f6 11 O-O fxe5 12 Nxe5 Nxe5 13 dxe5 O-O 14 c4 Qxd2 15 Bxd2 Bc6 16 a5 Rad8', { a: '=', r: 'Fischer–Uhlmann, Interzonal de Estocolmo 1962', c: 'Com 10.Bd3 fica igual.' }],
  ['c42', 'w-B', 'w', '(w) B', '10 Ba3 cxd4 11 cxd4 Qxd2+ 12 Kxd2 Nf5 13 c3 Na5 14 Ra2 f6 15 Bd3 Nc4+ 16 Bxc4 dxc4', { a: '=', r: 'Brunner–Kindermann, Berna 1990 (até 14...f6)', c: 'Com 10.Ba3 as damas saem e fica igual.' }],
  ['c42', 'x', 'x', '(x)', '14 Qh6 Rdf8 15 c4 Nf5 16 Qh5 Ng7', { a: '=', r: 'Timman–Nogueiras, Bruxelas 1988 (até 15.c4)', c: 'Com 14.Qh6 também fica igual.' }],
  ['c42', 'y', 'y', '(y)', '16 Nd2 f5 17 Nb3 Qc7 18 f4 Nb4 19 Bd1 d3 20 cxd3 Nxd3', { a: '∞', r: 'Bogdanović–Uhlmann, Sarajevo 1965', c: 'Depois de 16.Nd2 há chances para os dois lados.' }],
]

const capitulo = {
  id: 'francesa-e',
  arquivo: 'francesa-e',
  nome: 'Francesa — Winawer, 6...Ne7',
  fonte: 'Modern Chess Openings — French Defense (pp. 217–222), colunas 31–42',
  base: '1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7',
  corPadrao: 'b',
  ordem: 217,
  grupos: [
    { id: 'pp-qc7', nome: 'Peão Envenenado (7.Qg4 Qc7)', colunas: [31, 32, 33, 34] },
    { id: 'pp-oo', nome: 'Peão Envenenado (7.Qg4 O-O)', colunas: [35, 36] },
    { id: 'nf3', nome: 'Linha principal (7.Nf3)', colunas: [37, 38, 39, 40] },
    { id: 'a4', nome: 'Linha principal (7.a4)', colunas: [41, 42] },
  ],
}

module.exports = { capitulo, colunas, notas }
