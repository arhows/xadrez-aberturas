// Exercícios do livro "Chess Strategy for Club Players" de Herman Grooten (exercícios do fim de
// cada capítulo, soluções no capítulo 24). Posições transcritas dos diagramas (o PDF é escaneado)
// e conferidas com o diagrama repetido nas soluções; a linha é a da solução do livro, às vezes
// encurtada depois que o plano fica claro. scripts/grooten/gerar.mjs confere a legalidade.
// Enunciados e explicações são resumos próprios em português. `previo` = lance do adversário antes da pergunta.

/** Um conjunto por capítulo, na ordem do livro. */
export const CAPITULOS = [
  {
    cap: 4,
    nome: 'Vantagem material',
    exercicios: [
      { n: '4.1', fen: '3R4/8/8/3p4/3Pbk2/8/5K2/8 w - - 0 1', linha: 'Ke2 Bf3+ Kd3 Be4+ Kc3 Ke3 Re8 Kf4 Kb4 Ke3 Kc5 Kf4 Rd8 Kf5 Rxd5+ Bxd5 Kxd5', tarefa: 'Como as brancas convertem a vantagem material?', explicacao: 'Para ganhar, as brancas precisam conquistar o peão de d5 e forçar a troca do bispo — mas só quando o final de peões resultante estiver ganho. O rei branco caminha até c5 enquanto a torre mantém o rei preto afastado.' },
      { n: '4.2', fen: '1rq3k1/5pb1/2p1r1p1/4p1Pp/1pP1P3/pP1R1Q1P/P1B2P2/2K4R b - - 0 1', linha: 'Bf8 Rhd1 Bc5 Qe2 Bd4 Kb1 c5 Rf3 Qd8 h4 Qe7 Rg1 Rf8 Bd3 Kh7 Rfg3 Rd6 R1g2 f6 gxf6 Rfxf6', tarefa: 'Quem está melhor? As pretas jogam: qual o plano?', explicacao: 'Material igual, mas o bispo preto tem futuro em d4, enquanto o branco está preso atrás dos próprios peões. Plano: bispo a d4 apoiado por ...c5, depois abrir a coluna f com ...f6 e pressionar f2/f3 com as peças pesadas.' },
      { n: '4.3', fen: '8/1k6/3p1p2/1KpP1P2/2P5/8/1b1N4/8 w - - 0 1', linha: 'Nf3 Bc3 Nh4 Bd2 Ng6 Bh6 Ne7 Bd2 Nc6 Bc3 Nd8+ Kc7 Nf7 Be5 Ka6', tarefa: 'Cavalo bom contra bispo ruim: as brancas ganham. Qual o plano?', explicacao: 'Três peões pretos estão fixos na cor do bispo. O cavalo passeia pela posição e expulsa o rei preto de b7 (ameaçando Na5+ e Nd8+); depois ataca d6 e o rei branco entra pela ala da dama.' },
      { n: '4.4', fen: 'rn2r1k1/p1pq1ppp/bp2p3/8/2PPQ3/B1PB4/P4PPP/R3K2R b KQ - 0 13', linha: 'f5 Qxa8 Nc6 Qxe8+ Qxe8 O-O Na5 Rae1 Bxc4 Bxc4 Nxc4 Bc1 c5', tarefa: 'Portisch–Fischer, 1966. As pretas jogam 13...f5 e entregam duas torres pela dama. Vale a pena?', explicacao: 'Sim: numa posição fechada, a dama coopera bem com as peças menores, enquanto as torres brancas não têm colunas. As pretas ganham o peão fraco de c4 e ficam com cavalo bom contra bispo ruim.' },
    ],
  },
  {
    cap: 5,
    nome: 'Rei enfraquecido',
    exercicios: [
      { n: '5.1', fen: 'rnbq1rk1/4bpp1/2p1pn1p/pp2N1N1/3P3P/P2B2P1/1PPBQ3/R3KR2 w - - 0 17', linha: 'Rxf6 gxf6 Qh5 fxg5 Qxh6 f5 Qg6+ Kh8 hxg5 Bxa3 Ke2 Qd5 Nf3', tarefa: 'Smyslov–Gereben, 1949. As brancas têm muitas peças apontadas para a ala do rei. Como transformar isso em algo concreto?', explicacao: 'O sacrifício de qualidade em f6 destrói o abrigo do rei preto; depois a dama entra por h5 e h6. Com a coluna h aberta (hxg5), o rei branco sai do caminho com Ke2 para que a torre chegue a h1, e o mate não tem defesa.' },
      { n: '5.2', fen: 'r5k1/pb1r1p1p/npNq2p1/3P1p2/1P6/4QB2/P4PPP/3RR1K1 b - - 0 22', previo: 'Nxb4', linha: 'Ne7+ Kg7 Qc3+ Kh6 Nxf5+ gxf5 Re6+', tarefa: 'Kosten–Berg, 1988. As brancas jogaram 22.b4 e as pretas aceitaram o peão com 22...Nxb4. Como as brancas continuam?', explicacao: 'O peão foi oferecido para desviar o cavalo e abrir a diagonal grande: depois de Ne7+ e Qc3+, as pretas não podem cobrir com ...Qf6 porque o cavalo de b4 ficaria pendurado. O sacrifício em f5 e a interferência Re6+ terminam com mate em f6.' },
      { n: '5.3', fen: '3qrk2/5p2/r2p1pnp/1ppP1N2/8/2P1R2P/1PBQ1PP1/6K1 w - - 0 30', linha: 'Re6 Rxe6 dxe6 d5 Qxh6+ Ke8 exf7+ Kxf7 Qh7+ Ke6 Qxg6', tarefa: 'Schlechter–Salwe, 1909. As brancas investiram material para cercar o rei preto. Como manter a iniciativa?', explicacao: 'A torre em e6 não pode ser tomada com o peão f (Qxh6+ e mate), e depois da troca o peão branco chega a e6 e abre caminho para a dama. As brancas recuperam o material com o rei preto exposto no centro.' },
      { n: '5.4', fen: '2r2rk1/pp4bp/1n3q2/4p2R/3nP3/2N1B1Q1/PP4P1/1K1R2N1 b - - 0 22', linha: 'Rxc3 bxc3 Na4 Bxd4 exd4 Kc2 Qf7 Rxd4 Qxa2+ Kd3 Qb1+ Kd2 Qb2+', tarefa: 'Laznicka–Ponomariov, 2007. O sacrifício de qualidade 22...Rxc3 é correto? Como as pretas continuam depois de 23.bxc3?', explicacao: 'Sim: a estrutura do rei branco fica arruinada. O lance-chave é ...Na4, que abre caminho para a dama chegar à ala da dama por b6 ou pela diagonal a2-f7, e o rei branco não encontra abrigo.' },
    ],
  },
  {
    cap: 6,
    nome: 'Peão passado',
    exercicios: [
      { n: '6.1', fen: '2r4b/5k1p/p4Pp1/1p1P2p1/8/1P2R2P/1Br3P1/4R1K1 w - - 0 38', linha: 'Re7+ Kf8 Rxh7 Kg8 Rxh8+ Kxh8 Re8+ Kh7 f7', tarefa: 'Zysk–Kettner, 1986/87. As brancas têm dois peões passados em f6 e d5, mas as pretas criaram contrajogo com ...Rc2. Como progredir rápido?', explicacao: 'O peão de f6 decide com tática: a torre invade a sétima, elimina o bispo de h8 e, depois de Re8+, o peão de f7 coroa porque a torre preta de c8 está cravada pela de e8.' },
      { n: '6.2', fen: '1rbqr1k1/3n1p2/3P3p/1ppn2p1/8/2B2NPP/1PQ2P2/R3RBK1 w - - 0 29', linha: 'Ne5 Nb4 Qd2 Nxe5 Rxe5 Rxe5 Bxe5 Nc6 Qe3 Nxe5 Qxe5 c4 Bg2 Be6 Ra7 b4 Be4 c3 Bh7+ Kxh7 Qxe6', tarefa: 'Kasparov–Browne, 1979. Qual lance é melhor: A) 29.Rxe8+, B) 29.Ne5, C) 29.Qd2 ou D) 29.h4?', explicacao: 'B) 29.Ne5: trocar os bloqueadores deixa o peão de d6 livre como arma de ataque. As brancas eliminam todas as peças que podiam bloqueá-lo, e o peão amarra as pretas até surgir a tática Bh7+ seguida de Qxe6, aproveitando a fraqueza da oitava fila.' },
      { n: '6.3', fen: 'r3b1k1/pp2npp1/3r1q1p/3P4/4B3/4QN2/P4PPP/3RR1K1 w - - 0 20', linha: 'Ne5 Bb5 Qc5 Rb6 d6 Ng6 Bxg6 fxg6 d7 Rd8 a4 Ba6 Nxg6', tarefa: 'Tomashevsky–Iljin, 2006. Como colocar o peão passado em movimento, expulsando a torre que o bloqueia? Qual o próximo lance?', explicacao: 'O bloqueio em casas escuras só cai com tática: Ne5 (com Bh7+ se a dama tomar) e Qc5, que ataca o bispo e indiretamente a torre de d6, cuja defensora pode ser expulsa por Ng4. Com a torre fora de d6, o peão corre até d7 e amarra as pretas.' },
      { n: '6.4', fen: '4r3/1Q3p1k/R2Pn1qb/2pNpN1p/4P3/8/6P1/6K1 w - - 0 38', linha: 'Qe7 Rb8 d7 Bf8 Rxe6 Qxe6 d8=Q Rb1+ Kh2 Bxe7 Ndxe7', tarefa: 'Volkov–Nevednichy, 2008. O peão passado de d6 devia decidir, mas as pretas têm recursos. Como escoltá-lo até a promoção de forma criativa?', explicacao: 'A dama se oferece em e7, à frente do peão: não pode ser tomada (dxe7 e o peão coroa) e expulsa o bloqueador. Com a dama do lado certo do peão, d7 vem com força e as pretas acabam perdendo material decisivo.' },
    ],
  },
  {
    cap: 7,
    nome: 'Peões fracos',
    exercicios: [
      { n: '7.1', fen: 'r2r2k1/1pqbbpp1/p1nppn1p/8/2P4B/P1N1PN2/1PQ1BPPP/2RR2K1 w - - 0 1', linha: 'Nd5 exd5 cxd5 Qa5 dxc6 Bxc6 Nd4 Rac8 Nf5 Qe5 Nxe7+', tarefa: 'Savchenko–Sinanovic, 1990. Como as brancas forçam um enfraquecimento na estrutura de peões preta? Quais as consequências?', explicacao: 'O cavalo em d5 não pode ser ignorado e, depois de exd5 cxd5, o cavalo de c6 é expulso. Fica um peão isolado e atrasado em d6, sem compensação, que as brancas pressionam com as torres na coluna d.' },
      { n: '7.2', fen: '1r6/3r3p/pb1pkPp1/1p1Rp1P1/1P2K2P/2P1B3/1P6/5R2 w - - 0 1', linha: 'f7 Rxf7 Rxd6+ Kxd6 Rxf7 Bxe3 Rf6+ Ke7 Kxe3 Ra8 Rb6 Kf7 Ke4 Rc8 Kxe5', tarefa: 'Sozin–Botvinnik, 1931. O peão atrasado de d6 sofre pressão, mas como as brancas progridem? Elas acharam uma bela solução.', explicacao: 'Para abrir a posição, as brancas devolvem material com f7 e Rxd6+, entrando num final de torres em que os peões pretos de e5, a6 e h7 são fracos. O rei branco centralizado recolhe o peão de e5 e o resto é técnica.' },
      { n: '7.3', fen: '4rbk1/1q1r1pp1/pp1p3p/3n4/3Nn2B/P2QPN1P/1P3PP1/2RR2K1 w - - 0 1', linha: 'Nc6 Ndf6 Bxf6 Nxf6 Nb4 b5 Nd5 Qxd5 Qxd5 Nxd5 Rxd5', tarefa: 'Petrosian–Planinc, 1972. As pretas querem ...d6-d5 com peças ativas. Qual manobra reduz o jogo das peças pretas a quase nada? Escolha: A) 1.Ne2, B) 1.Rc6, C) 1.Nc6 ou D) 1.b4.', explicacao: 'C) 1.Nc6: o cavalo desorganiza os cavalos pretos e segue para b4, de onde controla d5, a casa à frente do peão fraco. Depois da troca de um cavalo e das damas, as brancas ficam com cavalo bom contra bispo ruim, coluna c aberta e o peão de d6 fixo.' },
      { n: '7.4', fen: '2bqrr1k/1pp4p/p3pbp1/2P5/1P1P4/P1N1QB2/6PP/3RR2K w - - 0 21', linha: 'Ne4 Bg7 Nf2 Qe7 Nd3 c6 Ne5 Rd8 Nc4 Qh4 Nd6', tarefa: 'Seirawan–Adams, 1992. As pretas têm um peão fraco em e6 e querem libertar-se com ...e6-e5. Com que manobra as brancas tornam esse avanço ilusório?', explicacao: 'O cavalo é reposicionado (e4-f2-d3) para controlar e5 e manter o peão de e6 fixo; evitando a troca pelo bispo de casas escuras, ele dança até d6, de onde ataca a ala da dama e prepara o ataque ao peão fraco.' },
    ],
  },
  {
    cap: 9,
    nome: 'Casas fortes e fracas',
    exercicios: [
      { n: '9.1', fen: '8/2k5/3p4/2pPn1p1/b1P2p2/1NK2P2/6P1/5B2 b - - 0 46', linha: 'Bxb3 Kxb3 Kb6 Kc3 Ng6 Kd3 Ka5 Kc3 Nh4 Kb3 Nf5', tarefa: 'Filip–Petrosian, Curaçao 1962. As pretas podem trocar em b3 e ficar com cavalo contra bispo? Qual o plano para ganhar?', explicacao: 'Sim: o cavalo é bom e o bispo branco é ruim, preso atrás dos próprios peões. O rei preto ameaça entrar pela ala da dama enquanto o cavalo vai, via g6 e h4, até f5 e e3, de onde ataca g2 e põe as brancas em zugzwang.' },
      { n: '9.2', fen: '4rr1k/2pn1qbp/1p1p4/p2Ppp2/2P5/1P2BPP1/P3QNRP/6RK w - - 0 1', linha: 'g4 Rg8 gxf5 Qxf5 Ne4 Bf6 Rxg8+ Rxg8 Rxg8+ Kxg8 Qg2+ Kf7 Qg4 Qxg4 fxg4', tarefa: 'Ivanov–Gelfand, Nova York 1989. Como as brancas criam uma casa forte? Qual o plano depois?', explicacao: 'Com g4 as brancas eliminam o peão de f5 e ganham a casa e4 para as suas peças. Depois trocam as peças pesadas e instalam o cavalo em e4, chegando a um final de cavalo bom contra bispo ruim.' },
      { n: '9.3', fen: 'r1bqn1k1/p3nrbp/3p2p1/2pPppB1/2P1P3/1NN5/P3BPPP/1R1Q1RK1 w - - 0 15', linha: 'exf5 Bxf5 Bd3 h6 Bxe7 Rxe7 Qc2 Rf7 Ne4 Nf6 Ng3 Bxd3 Qxd3', tarefa: 'Chernin–Gunawan, Belgrado 1988. Depois de 15.exf5 Bxf5, como as brancas conquistam a casa e4? Que peças devem trocar?', explicacao: 'O bispo de g5 sai pelo cavalo de e7 e Bd3 oferece a troca dos bispos de casas claras, os defensores de e4. Com Ng3 as brancas forçam essa troca e depois ocupam e4 com o cavalo, contra o bispo ruim de g7.' },
      { n: '9.4', fen: '2bqr1k1/2r3b1/1p1p1pp1/p1nP4/P2BPP2/1PN2RN1/6P1/3QR1K1 w - - 0 28', linha: 'f5 g5 Nh5 Rf7 Rg3 Bd7 Kf2 Qe7 Rge3 Qf8 Qb1 Rfe7 Kg1 Rc8 Qb2 Be8 Nxg7 Rxg7 Ne2 Rf7 Bc3 Nd7 Nd4', tarefa: 'Olafsson–Lombardy, Palma de Mallorca 1989. Com que lance as brancas criam uma casa forte no campo preto? Qual o plano depois?', explicacao: 'f5 cria uma casa forte em e6 e ainda enfraquece h5. O plano é proteger bem e4 e levar o cavalo de c3 a e6 via e2–d4; trocar o bispo de g7 também ajuda, pois ele defende f6.' },
    ],
  },
  {
    cap: 10,
    nome: 'Teoria das ilhas de peões',
    exercicios: [
      { n: '10.1', fen: '7q/1kp5/1p2p3/p2p3r/P2Pn3/2P1QN2/2P3P1/4RK2 b - - 0 44', linha: 'Qe8 Nd2 Nxd2+ Qxd2 Qxa4 Rxe6 Qa1+ Kf2 Rh1 Qg5 Rf1+ Kg3 Qxc3+ Qe3 Qxc2 Re5 Rd1', tarefa: 'Gligorić–Smyslov, Amsterdã 1994. As pretas têm menos ilhas de peões. Qual a estratégia e com que lance começar?', explicacao: 'A dama vai para a ala da dama atacar os peões soltos de a4 e c3. As brancas não conseguem defender tudo e o rei branco, desprotegido, acaba sob ataque de dama e torre.' },
      { n: '10.2', fen: '2r5/pp1bk1p1/4pr1p/3p4/1P3P2/3BK3/1PP3PP/3R1R2 w - - 0 23', linha: 'b3 a6 c4 dxc4 bxc4 Bc6 g3 Rd8 Be4 Bxe4 Rxd8 Kxd8 Kxe4 Ke7 Rd1 Rf8 c5', tarefa: 'Nunn–Hug, Biel 1986. As brancas têm duas ilhas de peões contra três. Como transformar isso em algo concreto?', explicacao: 'Em vez de esperar, as brancas atacam a estrutura preta com b3 e c4, desfazendo o próprio peão dobrado. Trocam as peças ativas das pretas, centralizam o rei em e4 e miram o peão fraco de e6 e a ala da dama.' },
      { n: '10.3', fen: '3r1rk1/1pq3bp/p2pbnp1/4p1B1/7Q/2P2B1P/PPN1RPP1/3R2K1 w - - 0 22', linha: 'Nb4 d5 Qg3 Qf7 Rxe5 d4 cxd4 Kh8 d5 Bf5 d6', tarefa: 'Geller–Kan, URSS 1952. Com que manobra as brancas mostram que a estrutura preta é mais fraca do que parece?', explicacao: 'O cavalo vai a b4 para chegar a d5 e bloquear os peões centrais. Quando as pretas avançam ...d5 para evitar isso, Qg3 ataca e5 e o centro preto desmorona.' },
      { n: '10.4', fen: '2r2bk1/1p4p1/p2pb1qp/P2Npr2/8/1P2BP2/2PQ2PP/R2R3K b - - 0 25', linha: 'Rxf3 gxf3 Rxc2 Rg1 Qf5 Rxg7+ Kxg7 Qd1 Qg6', tarefa: 'Resende–Pereira, por correspondência, 1988. As brancas bloqueiam o centro e têm menos ilhas. As pretas têm algum contra-jogo? Escolha: A) 1...Rh5, B) 1...Rxf3, C) 1...Rc5.', explicacao: 'Resposta B: o sacrifício em f3 abre o roque branco e ativa as peças pesadas pretas a tempo. Depois de ...Rxc2 e ...Qf5 as ameaças de mate decidem.' },
    ],
  },
  {
    cap: 11,
    nome: 'O centro de peões',
    exercicios: [
      { n: '11.1', fen: '3r4/1p3pk1/p1p1r1p1/7p/1PNPP1n1/P2R2P1/6P1/3R2K1 w - - 0 29', previo: 'Nd2', linha: 'Ne5 d5 Nxd3 dxe6 Ne5 exf7 Nxf7 Kf2 Rd3', tarefa: 'Kottnauer–Euwe, Amsterdã 1950. As brancas jogaram 29.Nd2 para proteger e4. Como as pretas minam o centro?', explicacao: 'O cavalo vai a e5 e ataca o peão de d4, que não pode ser bem defendido. As brancas avançam d5 e cedem casas centrais e material.' },
      { n: '11.2', fen: 'r2qr1k1/pb2bppp/4pn2/1p1pN3/2pP1B2/2P1P2Q/PPB2PPP/R3K2R w KQ - 0 14', linha: 'g4 g6 Bd1 Bf8 Bg5 Be7 Qf3 b4 cxb4 Bxb4+ Kf1 Be7 Kg2 Rb8 Ba4 Rf8 Bh6', tarefa: 'Bernstein–Stahlberg, Zurique 1934. As brancas têm um centro sólido. Que plano escolher? A) roque pequeno, f3 e e4; B) roque pequeno e g4; C) roque grande e g4; D) rei no centro e g4.', explicacao: 'Resposta D: com o centro estável, o rei fica bem em e1 e o ataque com g4–g5 chega antes do contra-jogo preto com ...b4. As brancas acabam ganhando a qualidade.' },
      { n: '11.3', fen: 'r3r1k1/1bqn1pbp/pp1ppnp1/5P2/P3P3/2NBBN1Q/1PP3PP/4RRK1 b - - 0 15', linha: 'gxf5 exf5 e5 Be2 d5 Bh6 Bxh6 Qxh6 Qc5+ Kh1 Qf8', tarefa: 'Westerduin–Grooten, Bussum 1995. As brancas jogaram 15.f5. Como reagir? A) 15...exf5, B) 15...gxf5, C) 15...e5.', explicacao: 'Resposta B: tomar com o peão de g enfraquece o rei, mas mantém um centro forte, abre a coluna g e a diagonal do bispo de b7. Depois de ...e5 e ...d5 os peões centrais pretos dominam.' },
      { n: '11.4', fen: '2kr1r2/pp4pp/2pPb3/4P3/8/6P1/P2R2BP/5RK1 w - - 0 26', linha: 'Rf4 Kd7 Rdf2 Rxf4 gxf4 Bf5 Rb2 b6 Kf2 Rc8 Ke3 Ke6 Bf1 b5 a4 a6 Ra2', tarefa: 'Euwe–Landau, Amsterdã 1931. As brancas têm dois peões centrais fortes. Qual o melhor plano? A) Rxf8, h4, Kh2 e Bh3; B) Rf4 e dobrar na coluna f; C) trocar todas as torres.', explicacao: 'Resposta B: dobrar na coluna f força a troca em f4, e gxf4 reforça ainda mais o centro. Depois o rei se centraliza, o bispo busca c4 e a torre tenta entrar pela ala da dama.' },
    ],
  },
  {
    cap: 12,
    nome: 'A diagonal',
    exercicios: [
      { n: '12.1', fen: '3r1k2/5pp1/2q1pb2/p2r3P/1p6/3B1QR1/PPP2P2/1K5R b - - 0 28', linha: 'Qc5 Be4 Qd4 c3 bxc3 Bxd5 c2+ Kxc2 Qxb2+ Kd3 Rxd5+ Ke3 Qd2+', tarefa: 'Ramaekers–Grooten, Brunssum 1982. Qual o plano das pretas e com que lance multifuncional executá-lo?', explicacao: 'O plano é formar uma bateria com a dama à frente do bispo na grande diagonal. ...Qc5 prepara ...Qd4 e, ao mesmo tempo, ataca h5 e f2; o peão de b4 ajuda a abrir a diagonal contra o rei branco.' },
      { n: '12.2', fen: '2kr2r1/pb3p1p/1p1p2q1/2P1n1p1/2P1P3/2Q1BP2/P3B1PP/2R2R1K b - - 0 18', linha: 'g4 Rg1 gxf3 gxf3 Qxe4 Rxg8 Rxg8', tarefa: 'Hebden–Hodgson, Guernsey 1985. As brancas acabam de jogar 18.bxc5. Como as pretas fazem o bispo de b7 brilhar?', explicacao: 'Em vez de retomar em c5, ...g4 ameaça mate em g2 e mina a cadeia e4–f3–g2 que bloqueia o bispo. Depois de ...Qxe4 a grande diagonal se abre e a posição branca desaba.' },
      { n: '12.3', fen: '3k4/pp6/2pr1p1p/3n1B2/P4P1P/2P2KP1/8/4R3 w - - 0 34', linha: 'Kg4 Ne7 Bb1 Ke8 Kh5 Kf7 Ba2+ Kf8 Kxh6 Rd2 Be6 Rd3 g4 Rxc3 g5', tarefa: 'Alekhine–Euwe, Holanda 1937 (match pelo título). Bispo contra cavalo com peões nas duas alas: como as brancas fazem valer a vantagem?', explicacao: 'Sem se importar com o peão de c3, o rei branco invade a ala do rei e ganha o peão de h6. O peão passado de h, apoiado pelo bispo de longo alcance, é rápido demais para o cavalo.' },
      { n: '12.4', fen: '6k1/1b3p1p/1p2p1p1/pP2Pnq1/P1P5/2B5/r4PPP/R3NQK1 b - - 0 28', linha: 'Ne3 fxe3 Qxe3+ Kh1 Rf2 Qg1 Qe2 Nf3 Bxf3 Re1 Rxg2 Rxe2 Rf2+ Qg2 Rf1#', tarefa: 'Van der Linde–Grooten, Utrecht 1985. As pretas sacrificaram um peão e têm peças ativas. É hora de uma combinação?', explicacao: 'Sim: ...Ne3 rasga a segunda fileira para a torre cooperar com o bispo de b7 contra g2. Com a torre em f2 e a dama em e2, as ameaças de mate na diagonal decidem.' },
    ],
  },
  {
    cap: 14,
    nome: 'A coluna aberta',
    exercicios: [
      { n: '14.1', fen: '2r3k1/pp2ppbp/3p1np1/3P4/4P3/4BP2/PP1K2PP/5B1R w - - 0 16', linha: 'g3 Nd7 Bh3 Rc7 Bxd7 Rxd7 b3 a6 Rc1 h5 Rc8+ Kh7 Bb6', tarefa: 'Ree–Cornelis, Siegen 1970. Como as brancas ganham vantagem incomodando a torre preta da coluna c?', explicacao: 'Com g3 e Bh3 as brancas atacam a casa c8 e obrigam a torre a sair da coluna. Depois de trocar o bispo pelo cavalo em d7, a torre branca toma a coluna c, entra em c8 e o bispo em b6 deixa a torre preta sem atividade.' },
      { n: '14.2', fen: 'r2q1rk1/1b1n1pbn/p2p2p1/1p1Pp2p/PPp1P3/2P1BNNP/2BQ1PP1/R3R1K1 w - - 0 22', linha: 'Ra3 Ndf6 Rea1 Qd7 R1a2 Rfc8 Qc1 Bf8 Qa1 Qe8 Nf1 Be7 N1d2 Kg7 Nb1', tarefa: 'Fischer–Spassky, Sveti Stefan 1992. As brancas jogam. Qual o plano, considerando a tensão entre a4 e b5?', explicacao: 'As pretas não podem trocar em a4 sem estragar a estrutura, então as brancas triplicam torres e dama na coluna a, prontas para abri-la com axb5. O cavalo vai de f3 a b1, via d2, para depois atacar o peão de b5.' },
      { n: '14.3', fen: 'r5rk/2pb3n/np1p1q2/p2Pp2p/2P1Pp2/1PQN1P2/P3BN1P/R5RK b - - 0 23', linha: 'Ng5 a3 Rg7 Rg2 Rag8 Rag1 Nc5 Nxc5 Bh3', tarefa: 'Hamann–Uhlmann, Amsterdã 1975. As pretas jogam. Como aproveitar a única coluna aberta, a g?', explicacao: 'O cavalo em g5 fecha a coluna por um momento, para as pretas dobrarem as torres sem permitir a troca. Depois o cavalo de a6 volta ao jogo por c5, desvia o cavalo de d3, e o golpe Bh3 abre caminho para as torres na coluna g.' },
      { n: '14.4', fen: 'r3r1k1/ppq1pp2/2p1bbpB/8/2P5/3P1BP1/P3PPK1/1RQ4R w - - 0 22', linha: 'Qg1 Bf5 Qh2 e5 Bg5 Bg7 Qh4 f6 Bxf6 Rab8 g4', tarefa: 'Seirawan–Sokolov, Sarajevo 1987. As brancas abriram a coluna h. Qual a melhor manobra e que ameaças ela cria?', explicacao: 'A dama vai de c1 para h2 por g1, atrás da torre na coluna h, mirando h7. Quando as pretas abrem espaço com ...e5, Bg5 e Qh4 exploram a casa f6 enfraquecida e o ataque decide.' },
    ],
  },
  {
    cap: 15,
    nome: 'O par de bispos',
    exercicios: [
      { n: '15.1', fen: 'br3rk1/p3q1pp/3ppn2/2p2p2/1PP5/PQ3PP1/1B1RP1BP/R5K1 w - - 0 19', linha: 'Qe3 f4 Qd3 fxg3 hxg3 Rfd8 Qe3 cxb4 axb4 Rxb4 Rxa7 Rb7 Ra6 Rc7 Bh3 e5 Ba3 Ne8 c5', tarefa: 'Makogonov–Keres, 1939. Avalie a posição e a sequência 19.Qe3 f4 20.Qd3 fxg3 21.hxg3 Rfd8 22.Qe3 cxb4 23.axb4 Rxb4 24.Rxa7 Rb7 25.Ra6 Rc7 26.Bh3 e5 27.Ba3 Ne8. Qual o melhor 28º lance das brancas?', explicacao: 'O par de bispos vale mais quanto mais aberta a posição. ...f4 abriu a diagonal h3–c8 e ...cxb4 abriu a ala da dama; agora c5 rompe o centro preto e os dois bispos dominam.' },
      { n: '15.2', fen: '1r3qk1/3b2pp/pp4n1/2pP4/2P2p2/P1BB1P2/4R1PP/4Q1K1 w - - 0 33', linha: 'h4 Re8 h5 Ne7 Re5 g6 Qh4 Bf5 d6 Nc6 hxg6 Bxg6 Bxg6', tarefa: 'Prusikin–Markos, Pulvermühle 2006. As brancas estão melhor. Como progredir?', explicacao: 'O cavalo de g6 é o grande defensor, por isso o peão h avança para expulsá-lo. Com o cavalo desalojado, os bispos ganham força e a dama entra pelas casas escuras enfraquecidas; d6 decide.' },
      { n: '15.3', fen: '2rr2k1/1b2qppp/pb2p3/1p2P3/1P2BPn1/P1N5/1B2Q1PP/R4R1K b - - 0 21', linha: 'Qh4 g3 Rxc3 gxh4 Rd2 Qxd2 Bxe4+ Qg2 Rh3', tarefa: 'Rotlewi–Rubinstein, Lodz 1907. As pretas jogam. Como os dois bispos decidem? Calcule as variantes principais.', explicacao: 'Depois de ...Qh4 e g3, a dama é oferecida: ...Rxc3 elimina um defensor e abre a diagonal longa. Com ...Rd2 o outro defensor é desviado e os dois bispos apontados para g2 e h2 dão o mate.' },
      { n: '15.4', fen: 'rn2k2r/1bqp1pp1/pp2pn2/2b4p/P3P3/1NNB3P/1PP1QPP1/R1B2RK1 b kq - 0 11', linha: 'Ng4 hxg4 hxg4 e5 Bf3 gxf3 Qd8', tarefa: 'Slingerland–Bosboom, Enschede 1993. As brancas acabam de jogar 11.Nb3. As pretas jogam: como usar os bispos e a coluna h?', explicacao: 'O sacrifício ...Ng4 abre a coluna h para a torre. Depois de e5, ...Bf3 impede a defesa Qxg4 e, aceito o bispo, ...Qd8 ameaça Qh4 com mate que não há como parar.' },
    ],
  },
  {
    cap: 16,
    nome: 'Controle de uma fileira',
    exercicios: [
      { n: '16.1', fen: 'rr3k2/2RR4/1p4P1/8/8/8/p5PK/8 w - - 0 1', linha: 'Rg7 a1=Q Rcf7+ Ke8 Rg8#', tarefa: 'As brancas jogam. Precisam se contentar com o empate?', explicacao: 'Não: Rg7 mantém o rei preto preso em f8 e a coluna g passa a funcionar como uma coluna h. Mesmo com a promoção preta, o xeque em f7 e Rg8 dão mate.' },
      { n: '16.2', fen: '1r4k1/ppp1Qpp1/3q3p/2nP1B1P/2P5/6P1/P4P2/4R1K1 w - - 0 32', linha: 'Qe8+ Qf8 Qe7 Qxe7 Rxe7 Kf8 Rxc7 Na6 d6 Rd8 c5 b6 c6', tarefa: 'Ivanchuk–Nielsen, Skanderborg 2003. A dama branca chegou à sétima fileira. Como as brancas progridem?', explicacao: 'Com o xeque em e8 a dama preta é empurrada para a última fileira, e a troca das damas deixa a torre branca na sétima, onde ganha o peão de c7. Os peões passados d e c avançam apoiados pela torre.' },
      { n: '16.3', fen: '1k1r3r/p1nb2pp/Ppp1pp2/8/1P1PP3/N1R1KPP1/7P/2R2B2 w - - 0 31', linha: 'b5 Nxb5 Bxb5 cxb5 Rc7 Rc8 Rb7+ Ka8 Rxd7 Rxc1 Nxb5 Rhc8 Rxg7', tarefa: 'Botvinnik–Vidmar, Groningen 1946. As brancas jogam b5. Depois de 31...Nxb5, com que peça retomar? E se a torre entrar em c7 e as pretas responderem ...Rc8?', explicacao: 'Retoma-se com o bispo para conservar o cavalo, que é decisivo na rede de mate. Depois de ...Rc8, as brancas entregam a qualidade em d7: a torre na sétima, junto com o cavalo, prende o rei preto e vai recolhendo peões.' },
      { n: '16.4', fen: '4r1k1/5p2/2p3p1/2P1q2p/3pP2P/3Q2P1/5PK1/2R5 w - - 0 34', previo: 'f3', linha: 'Ra8 Qc4 Ra3 Rd1 Rc3 Qa4 d3 Qxc6 Rc1 Rxc1 Qb2+ Kh3 Qxc1', tarefa: 'Taimanov–Timman, Wijk aan Zee 1981. As brancas jogaram 34.f3, enfraquecendo a segunda fileira. As pretas jogam: como explorar isso?', explicacao: 'A torre preta entra pela coluna a até a terceira fileira e o peão d avança para liberar a segunda fileira para a dama. O golpe ...Rc1 desvia a torre branca e a dama entra em b2 com xeque, ganhando material.' },
    ],
  },
  {
    cap: 17,
    nome: 'Peça fora de jogo',
    exercicios: [
      { n: '17.1', fen: 'r4r2/4p1k1/3p1pp1/nqpP4/8/1P3BP1/1Q2PPK1/R6R w - - 0 1', linha: 'Qd2 g5 Qe3 Qd7 Bg4 Qc7 Bf5 Kf7 Rh7+ Ke8 Rah1 Qb7 Rh8', tarefa: 'Keres–Szabo, Hastings 1954/55. Como as brancas aproveitam o cavalo preto fora de jogo em a5?', explicacao: 'Como o cavalo de a5 não chega ao lado do rei, as brancas atacam ali: a dama vai a e3, mirando as fraquezas da coluna e sem deixar de vigiar a5. O bispo ocupa f5 e as torres invadem pela coluna h.' },
      { n: '17.2', fen: 'r1b2rk1/npp1qppp/3p4/p1bP4/3Np3/PP2P2P/1BQP1PP1/R3KB1R w KQ - 0 13', linha: 'Ne2 f6 Nf4 Bd7 Be2 c6 h4 Kf7 g4 Ke8 Rg1 Kd8 g5', tarefa: 'Grooten–Cuijpers, Dieren 1979. Em que lado do tabuleiro as brancas devem jogar? Qual o plano?', explicacao: 'O cavalo de a7 e o bispo de c5 não participam da defesa do roque, então a luta vai para a ala do rei. As brancas evitam trocas, levam o cavalo a f4 e avançam os peões g e h.' },
      { n: '17.3', fen: 'r1b3k1/pp1p1ppp/1bpPr3/7q/3nBB2/2NQ2P1/PP3P1P/R3R1K1 w - - 0 25', linha: 'Na4 f5 Nxb6 fxe4 Qxd4 axb6 Rxe4 Qc5 Qd3 Qf5 Rae1 Ra4 f3', tarefa: 'Timman–Kuzubov, Gotemburgo 2005. As pretas estão atrasadas no desenvolvimento (Ra8 e Bc8 parados). Que estratégia as brancas devem seguir?', explicacao: 'O peão de d6 divide a posição preta e prende o bispo de c8. As brancas trocam as peças ativas do adversário (cavalo de d4, bispo de b6) e ficam com peças centralizadas contra peças passivas.' },
      { n: '17.4', fen: 'r4rk1/1bq1bpnp/ppn1p1p1/4P3/P2N4/2N1BB2/1PP1Q1PP/3R1R1K w - - 0 17', linha: 'Nxc6 Bxc6 Qc4 Rfc8 Qxc6 Qxc6 Bxc6 Rxc6 Rd7 Re8 g4', tarefa: 'Geller–Mikhalchishin, Tbilisi 1978. As brancas têm uma liquidação forçada que dá um final quase decisivo. Que peça preta deve ser limitada?', explicacao: 'O alvo é o cavalo de g7, que quer ir a f5. As brancas trocam as peças ativas, colocam a torre na sétima e jogam g4: o cavalo fica sem casas e acaba perdido.' },
    ],
  },
  {
    cap: 19,
    nome: 'Harmonia e coordenação',
    exercicios: [
      { n: '19.1', fen: '1n4k1/rP2p1b1/1n1pP1p1/p1p2qN1/4N3/3Q4/PP4PP/R1B1K3 w - - 0 21', linha: 'Qb5 Rxb7 Qe8+ Bf8 g4 Qe5 Qf7+ Kh8 Qh7#', tarefa: 'Grooten–Philippe, 1998. As peças pretas da ala da dama estão amarradas. Como as brancas aproveitam?', explicacao: 'A dama troca de ala com tempo: Qb5 obriga a torre a perder tempo em b7 e Qe8+ entra pela porta dos fundos. Com g4 a dama preta é desviada da defesa de f7/h7 e as peças brancas cooperam num mate rápido.' },
      { n: '19.2', fen: 'rn1q2k1/p2n1ppp/1ppNr3/6PP/3P1B2/P7/1P3P2/R2Q1K1R w - - 0 18', linha: 'd5 Rxd6 Bxd6 Qxg5 Qf3 Qxd5 Qxd5 cxd5 Rc1 Na6 b4', tarefa: 'Botvinnik–Smyslov, Moscou 1954. Como as brancas exploram a falta de harmonia no campo preto?', explicacao: 'O cavalo de d6 é um "polvo" que paralisa as pretas; d5 abre linhas e ameaça reforçá-lo. As pretas devolvem a qualidade, mas ficam com peças passivas que se atrapalham, e as brancas tomam a coluna c e prendem o cavalo de a6.' },
      { n: '19.3', fen: '5B2/8/8/8/1pk5/1q6/4P2N/3R2K1 w - - 0 1', linha: 'Rd4+ Kxd4 Nf3+ Kd5 e4+ Kc6 Nd4+', tarefa: 'Estudo de Kasparian, 1977. Torre e duas peças contra dama, mas espalhadas. Como fazer as brancas cooperarem?', explicacao: 'O sacrifício da torre atrai o rei para o centro, onde cavalo e peão dão xeques que o empurram para casas de garfo. Todas as fugas terminam num garfo de cavalo que ganha a dama.' },
      { n: '19.4', fen: '1R6/K2p4/p6B/4k3/2P5/2P2pp1/3p4/8 w - - 0 1', linha: 'Bxd2 f2 Be1 f1=Q Re8+ Kd6 Bxg3+ Kc5 Rc8#', tarefa: 'Estudo de Rinck, 1908. Os peões pretos parecem imparáveis. Como as brancas se salvam — e ganham?', explicacao: 'O bispo volta a e1 para que, se o peão capturar ali, a torre ganhe a dama por raio X em e8. Depois da promoção em f1, o xeque de torre e o bispo em g3 tecem uma rede de mate no centro.' },
    ],
  },
  {
    cap: 20,
    nome: 'Vantagem de desenvolvimento',
    exercicios: [
      { n: '20.1', fen: 'rnb1k1nr/1p3pbp/p1p3p1/q3p3/2B1PB2/2N2N2/P1PQ1PPP/1R2R1K1 w - - 0 13', linha: 'Qd6 Qxc3 Red1 Nd7 Bxf7+ Kxf7 Ng5+ Ke8 Qe6+', tarefa: 'Tal–Tringov, Amsterdã 1964. As brancas desenvolveram tudo, as pretas quase nada. Qual a combinação?', explicacao: 'A dama invade d6 e entrega uma peça; com a segunda torre em d1, todas as brancas atacam o rei preto ainda no centro. O sacrifício em f7 seguido de Ng5 e Qe6 leva a mate.' },
      { n: '20.2', fen: 'r1bqk2r/ppppbppp/8/1n2Q3/8/8/PPPP1PPP/RNB1R1K1 w kq - 0 9', linha: 'Qxg7 Rf8 a4 Nd6 Nc3 Nf5 Nd5 f6 Qxh7 d6 Qg6+', tarefa: 'Ljubojević–Calvo, Lanzarote 1973. As pretas jogaram 8...Nd4xb5 em vez de rocar. Como as brancas punem?', explicacao: 'A dama come em g7 e impede o roque; com a4 e Nc3-d5 as brancas trazem peças com tempo contra o rei preto preso no centro e a ala do rei se desfaz.' },
      { n: '20.3', fen: 'r1b1k2r/ppppqppp/2n2n2/b7/2B1P3/1QN2N2/P4PPP/R1B2RK1 w kq - 0 10', linha: 'Nd5 Nxd5 exd5 Ne5 Nxe5 Qxe5 Bb2 Qg5 h4 Qxh4 Bxg7 Rg8 Rfe1+ Kd8 Qg3', tarefa: 'Fischer–Fine, Nova York 1963. As brancas mobilizaram quase tudo. Dê uma variante convincente.', explicacao: 'Nd5 rompe a coesão preta e abre a coluna e. O bispo de b2 e h4 mantêm a dama preta ocupada, as torres chegam ao centro e o rei preto nunca consegue se abrigar; Qg3 encerra com ameaça de Bf6#.' },
      { n: '20.4', fen: '4q1kr/pr2Bpbp/3P1pp1/3b4/2pN4/2P1Q3/P3BPPP/3R2K1 w - - 0 23', linha: 'Nf5 Be6 Nxg7 Kxg7 Bxf6+ Kxf6 Qd4+ Kg5 Qg7 Bg4 Rd5+ f5 h4+', tarefa: 'Grooten–Goormachtigh, Bélgica 1991/92. As brancas deram uma qualidade pela atividade e a torre de h8 está fora de jogo. Como continuar com força?', explicacao: 'O cavalo vai a f5 e se troca por g7, e o sacrifício em f6 arrasta o rei preto para o meio do tabuleiro. A dama centralizada e o lance calmo Qg7 fecham a rede, num tema parecido com Petrosian–Pachman.' },
    ],
  },
  {
    cap: 21,
    nome: 'Centralização',
    exercicios: [
      { n: '21.1', fen: '2r1rbk1/pp1q1pp1/5n1p/1P1p4/P1nP1P2/2NQ2NP/R5P1/2B2RK1 b - - 0 22', linha: 'Bb4 Nd1 Ne4 f5 Nxg3 Qxg3 Bd6 Qf3 Be7 Qg3 Bf6 Bxh6 Bxd4+', tarefa: 'Stolberg–Botvinnik, URSS 1940. As pretas jogam: como aumentar a influência no centro?', explicacao: 'Bb4 expulsa o cavalo de c3, defensor da casa e4, e o cavalo preto entra ali. O bispo chega à grande diagonal, ganha d4 e as peças pretas centralizadas dominam o tabuleiro.' },
      { n: '21.2', fen: '2r2rk1/1bpR1p2/1pq1pQp1/p3P2p/P1PR3P/5N2/2P2PPK/8 w - - 0 32', linha: 'Kg3 Rce8 Kf4 Bc8 Kg5 Bxd7 Kh6', tarefa: 'Short–Timman, Tilburg 1991. Como as brancas aproveitam ao máximo a posição centralizada?', explicacao: 'Com as peças brancas firmes no centro e a dama em f6, o próprio rei marcha g3-f4-g5-h6 e participa do ataque. Em h6 ele ajuda a dar mate em g7 e as pretas não conseguem impedir.' },
      { n: '21.3', fen: 'r3kn1r/pp1b1ppp/2p5/3pP1B1/Q5n1/2NBP3/Pq3PPP/2R2RK1 w kq - 2 14', linha: 'Qd4 f6 exf6 gxf6 Bxf6 Rg8 Nb5 Qxb5 Bxb5 Ne6 Qb2 cxb5 Bh4', tarefa: 'Yusupov–Nogueiras, Montpellier 1985. As peças pretas não se coordenam. Como as brancas exploram isso?', explicacao: 'A "supercentralização" Qd4 cria várias ameaças de uma vez (Nxd5/Nb5/Ne4 com mate em c7 ou d6, Rb1, e6). As pretas não dão conta de tudo e acabam com pouco material.' },
      { n: '21.4', fen: '5r1k/1bp3pp/1p2B3/nq1n3N/1b1PN3/8/5PPP/B2QR1K1 w - - 0 24', linha: 'Qg4 g6 Qg5 Bxe1 Qe5+ Rf6 Nexf6 Nc4 Qxe1 gxh5 Bd7', tarefa: 'Sokolov–Plaskett, Hastings 1998/99. As peças pretas estão encostadas na ala da dama. Como as brancas jogaram?', explicacao: 'Com as pretas longe, as brancas atacam o outro lado: a dama vai a g4 e depois à casa central e5, alinhada com o bispo de a1. O cavalo de d5 não pode sair por causa de d4-d5, e as brancas recuperam o material com ataque decisivo.' },
    ],
  },
  {
    cap: 22,
    nome: 'Vantagem de espaço',
    exercicios: [
      { n: '22.1', fen: 'r3n2R/qr1kb1p1/3p4/2pPpPpB/p1P5/8/PP6/2B2QRK w - - 0 39', linha: 'Rxe8 Rxe8 Qh3 Bf6 Bxe8+ Kxe8 Qh8+ Kd7 Bxg5 Kc7 Bxf6 gxf6 Rg7+', tarefa: 'Réti–Grünfeld, Semmering 1926. As brancas têm enorme vantagem de espaço. Como decidir com ataque ao rei?', explicacao: 'A troca em e8 abre caminho para a dama entrar com tempo por h3 e h8. Depois as brancas trocam o defensor de f6 e as peças pesadas invadem pela sétima fileira.' },
      { n: '22.2', fen: '1nb1qrk1/1r2b1p1/p1p1p3/2PpPp2/RP3P1p/2B1P1P1/2Q3BP/R3N1K1 w - - 0 25', linha: 'gxh4 Bxh4 Nf3 Bd8 h4 Qh5 Be1 Bd7 Qf2 Kf7 Bf1 Rh8 Bxa6 Nxa6 Rxa6', tarefa: 'Petrosian–Bondarevsky, URSS 1950. Mais espaço, mas a fortaleza preta não cai fácil. Com que lance as brancas dão um grande passo?', explicacao: 'Tomando em h4 as brancas abrem a coluna g e, com h4, fixam a fraqueza de g5. Assim jogam nas duas alas: o peão de a6 cai e as pretas, sem espaço, ficam passivas.' },
      { n: '22.3', fen: '1n3b1k/4rqrb/p1p1p1pp/1pPpPp2/1P1N1PPP/P1B1P1R1/2BK2R1/6Q1 w - - 0 51', linha: 'h5 gxh5 gxf5 Bxf5 Nxf5 exf5 e6 Qg8 Bxf5', tarefa: 'Grooten–Klip, Enschede 1991. As brancas prepararam a ruptura. Com que lance atacam a cadeia de peões preta?', explicacao: 'h5 quebra a estrutura: se as pretas tomam em g4, hxg6 abre a coluna g. No jogo, gxf5 e e6 abrem a grande diagonal para o bispo de c3 e o rei preto fica encurralado no canto.' },
      { n: '22.4', fen: '1qrrbk2/Rp3n1p/1Pp1p1pP/2Pp1pP1/R2P1P2/3BPN2/6K1/Q7 w - - 0 52', linha: 'Nd2 Bd7 Nb3 Re8 Na5 Nd8 Ba6 bxa6 Rxd7 Re7 Rxd8+ Rxd8 Nxc6', tarefa: 'Capablanca–Treybal, Carlsbad 1929. Posição fechada com uma só coluna aberta. Qual o plano das brancas?', explicacao: 'O ponto fraco é b7: o cavalo vai a a5 via d2-b3 para atacá-lo. Quando as pretas cobrem tudo, o sacrifício Ba6 abre a sétima fileira e a torre invade com ganho decisivo.' },
    ],
  },
]
