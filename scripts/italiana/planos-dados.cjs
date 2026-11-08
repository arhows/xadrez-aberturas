// Planos de meio-jogo para o fim de cada coluna. Baseados na estrutura da posição final
// e na continuação do Stockfish 19 (posicoes-finais.cjs). Texto do app, não do livro.
const P = (brancas, pretas) => ({ brancas, pretas })

const italiana = {
  c01: P(
    'Rocar primeiro, porque o cavalo de e5 está cravado pela dama de e7 contra o rei. Depois, levar as torres às colunas c e e e usar o peão de d4 como apoio para o cavalo de e5, pressionando o cavalo de c6. Com o peão isolado, as brancas precisam de atividade: trocas favorecem as pretas.',
    'Rocar logo e manter o cavalo em d5, a casa bem em frente ao peão isolado; enquanto as brancas não rocam, a dama de e7 crava o cavalo de e5. Trocar peças leva a um final em que o peão de d4 vira alvo.',
  ),
  c02: P(
    'Sem o roque, a compensação vem da atividade: o bispo de a3 impede o roque curto preto, e a torre vai para c1 contra c7. Depois, levar o rei para g1 e ligar as torres.',
    'Com um peão a mais, desenvolver e rocar longo (o motor indica ...Qd7 e ...O-O-O), já que o roque curto está proibido pelo bispo de a3. Depois, trocar peças e atacar os peões isolados de a2 e d4.',
  ),
  c03: P(
    'Pressionar a coluna e com as torres (Re3, Rae1) contra o cavalo cravado de e7 e o rei ainda no centro; um xeque com Qa4+ atrapalha o desenvolvimento preto.',
    'Desfazer a cravada e rocar: ...Bd7 ou ...Bf5 e depois ...O-O. Com o rei seguro, o peão a mais e o peão isolado branco de d5 contam a favor das pretas.',
  ),
  c04: P(
    'Usar o espaço do peão de d5 e as diagonais abertas: Re1, a dama em g3 ou e3 e os bispos contra o roque preto. A compensação pelo peão é dinâmica, não de estrutura.',
    'Consolidar com ...d6 e desenvolver o bispo de c8. Trocar as damas tira o ataque branco, e aí o peão a mais e o peão isolado de a2 falam mais alto.',
  ),
  c05: P(
    'Atacar o rei preto antes que ele se abrigue: Re1 crava o cavalo de e7, e a dama vai para a4 ou b4 para manter o rei no centro e pegar peões no flanco da dama.',
    'Tirar o rei do centro (o motor indica ...f6 e ...Kf7) e oferecer a troca das damas. Num final, o peão isolado de d4 é um alvo.',
  ),
  c06: P(
    'Com a cadeia de peões c3-d4-e5, jogar no flanco do rei: Nh4 para trocar o bispo de f5 e o avanço f4-f5.',
    'Romper a cadeia com ...f6, que ataca e5 pela frente, e com ...c5 contra d4; trocar o bispo forte de d3 alivia a defesa.',
  ),
  c07: P(
    'Jogo de manobras: o cavalo de h2 vai para g4 para trocar o cavalo de f6, e o de d2 vai para c4 e e3, mirando d5 e f5. A coluna d aberta pede uma torre.',
    'Reagrupar com ...Nd8-e6, oferecer a troca do bispo de b3 com ...Be6 e disputar a coluna d. A estrutura é simétrica, e a posição é igual.',
  ),
  c08: P(
    'Completar a manobra Nf1-g3, recuar o bispo para c2 e preparar d4 com Be3. Se as pretas jogarem ...d5, resolver a tensão central com exd5.',
    'Romper com ...d5, como o livro indica depois de 12.Be3, para liberar as peças; o bispo de a7 pressiona f2 e d4.',
  ),
  c09: P(
    'Ganhar o par de bispos com Nxe6, recuar o bispo para c2 e só então rocar; depois, Ng3 e controle da casa f5.',
    'Pressionar e4 com as torres e com o peão de d5, e decidir se troca o bispo de b3 com ...Nxb3. O rei branco ainda no centro é motivo para abrir o jogo.',
  ),
  c10: P(
    'Usar o espaço no flanco da dama: a5 para afastar o bispo, Nbd2 e o avanço d4 no momento certo; h3 questiona o bispo de g4.',
    'Levar o cavalo para g6 (via e7) e explorar a cravada no cavalo de f3. Os peões em g5 e h6 dão espaço, mas também enfraquecem o próprio roque.',
  ),
  c11: P(
    'Pressionar d6 com o bispo de a3 e preparar d4 com Re1 e Qc2. Com o flanco da dama travado, o jogo acontece no centro.',
    'Buscar atividade no flanco do rei: ...Nh5-f4 e ...Bg4, aproveitando o cavalo de g6.',
  ),
  c12: P(
    'Retomar em h4 com o bispo, mantendo a cravada, e depois Nd2, Qe2 e as torres no centro: um jogo de manobras.',
    'Quebrar a cravada com ...h6 e ...Be6, oferecer a troca do bispo de c4 e preparar ...c6 e ...d5.',
  ),
  c13: P(
    'Jogar com o espaço: o cavalo vai para e3 e d5 (ou f5), e b4 e a5 incomodam o bispo, sempre mantendo o centro e4+d4. As pretas estão apertadas.',
    'Liberar o jogo com ...f5, que é o objetivo de ...Kh8 e ...Ng8, ou trocar em d4 com ...exd4. Ficar passivo deixa as brancas melhor.',
  ),
  c14: P(
    'Rocar e sustentar o centro e4+d4 (f3 é uma opção sólida), usando a coluna c e a casa d5.',
    'Pressionar o centro com as peças e com ...c5 ou ...d5; o cavalo encontra uma boa casa em b4, e a troca do bispo de b3 tira um atacante.',
  ),
  c15: P(
    'Abrir o centro com d4 enquanto o bispo preto está em c7; o espaço no flanco da dama (a5 e b4) ajuda nas manobras.',
    '...d5 é a ruptura natural, preparada por ...c6 e ...Bc7; com ela as pretas igualam ou ficam um pouco melhor.',
  ),
  c16: P(
    'Expulsar o cavalo de f4 com g3 e resolver a tensão com cxd6; depois, rocar e usar o bispo de c4 contra f7. Os peões dobrados em c exigem cuidado nas trocas.',
    'Manter o cavalo ativo em f4 ou h3, recuperar a tensão em c5 (as brancas têm peões dobrados em c) e completar o desenvolvimento com o roque e o bispo de c8.',
  ),
  c17: P(
    'Rocar e usar a coluna a semiaberta e a casa f5 para o cavalo; o peão dobrado em b3 ajuda a controlar c4.',
    'Aproveitar o par de bispos: ...g5 afasta o bispo de h4, e a ruptura ...d5 abre diagonais.',
  ),
  c18: P(
    'Com um peão a menos, jogar pela atividade: Bxf6 estraga a estrutura preta, Qa4+ e pressão pela coluna f. Sem isso, o peão a menos pesa.',
    'Com o peão a mais, completar o desenvolvimento (roque longo ou ...Rg8 se a coluna g abrir) e trocar peças; o peão isolado branco de e4 é um alvo.',
  ),
  c19: P(
    'A posição é difícil: o bispo de g8 está preso e precisa de ajuda para sair. Desenvolver o cavalo de b1 e tentar resgatar o bispo; o livro recomenda evitar esta linha.',
    'Capturar ou cercar o bispo de g8 (o cavalo vai para e7) e avançar ...g4 para afastar o cavalo de f3.',
  ),
  c20: P(
    'Manter o rei preto no centro: Re1 e o cavalo para c4 ou e5, aumentando a pressão no cavalo cravado de c6.',
    'O roque curto está proibido pelo bispo de a3, então abrigar o rei com ...Kf7 e trocar peças; as pretas têm um peão a mais.',
  ),
  c21: P(
    'Explorar o desenvolvimento muito superior: Nd5 para trocar um defensor e ataque ao roque com Bd3, de olho em h7.',
    'Devolver material para se desenvolver: ...b5 para ativar o bispo de c8 e trocar o cavalo de d5. A defesa é difícil.',
  ),
  c22: P(
    'Com a qualidade a menos, abrir linhas contra o rei preto ainda no centro: exd6, h3 e o avanço g4-g5.',
    'Rocar o quanto antes e devolver o peão se for preciso; com a qualidade a mais, trocar peças e usar o peão passado de a7.',
  ),
  c23: P(
    'Atacar no flanco do rei: Bh6 dificulta o roque curto, e c4, Nc3 e as torres no centro apoiam o peão avançado de e5.',
    'Rocar com segurança (depois de ...d6 e ...Bf5), atacar o peão de e5 e explorar os peões isolados brancos de a2 e c3.',
  ),
  c24: P(
    'Construir o centro com c3 e d4, ganhando tempo contra o bispo de d4; Bd5 e Qf3 pressionam a7 e f7.',
    'Recuar o bispo para a7, segurar o peão a mais e completar o desenvolvimento com ...b5 e ...Bb7; o peão branco de a5 trava o flanco da dama.',
  ),
}

const doisCavalos = {
  c01: P(
    'Rocar, conter o cavalo de e4 com f3 ou f4 e fazer valer o peão a mais; os peões isolados pretos de a7 e c6 são alvos no final.',
    'A atividade compensa o peão: cavalo forte em e4, bispos em diagonais abertas e ...f5-f4 contra o roque. Trazer o cavalo de a5 de volta ao jogo (...Nb7).',
  ),
  c02: P(
    'Retomar em e2 e jogar contra os peões isolados de a7 e c6; Bf4 e c3 consolidam o centro.',
    '...c5 elimina o peão de d4 e ativa as peças; com isso as pretas igualam.',
  ),
  c03: P(
    'Retomar em d4 e centralizar o cavalo em e5; o peão isolado preto de a7 é uma fraqueza de longo prazo.',
    'Atividade de peças: ...Ng4 e ...Ne4 contra o rei branco, e as torres na coluna e aberta.',
  ),
  c04: P(
    'Com dois peões a mais, consolidar: desenvolver o lado da dama (Bd2, Na3) e levar o rei para um lugar seguro.',
    'Atacar antes que as brancas se organizem: ...c5, ...Rb8 e as torres nas colunas abertas contra o rei branco no centro.',
  ),
  c05: P(
    'O cavalo voltou da borda: ativar as peças (Nh5, Be3) e pressionar os peões isolados de a7 e c6.',
    'Peças ativas no centro e no flanco da dama: os cavalos buscam d4, e ...Rb8 pressiona b2.',
  ),
  c06: P(
    'Conter o avanço dos peões pretos: b4 afasta o cavalo de a5, Bh5 mira g6 e f4 freia o flanco do rei.',
    'Avançar ...g4 e ...f4 para cercar o cavalo de h3 e atacar o rei, trazendo a dama para f6 ou g6.',
  ),
  c07: P(
    'Rocar, colocar o bispo em b2 contra e5 e levar o cavalo para c5; os peões isolados pretos de a7 e c6 são alvos.',
    'Desenvolver o bispo em g7 e jogar ...f5 contra o cavalo de e4; o cavalo de f4 incomoda g2.',
  ),
  c08: P(
    'Eliminar o peão de e3 (Bxe3) e rocar; os três peões na coluna c (c2, c4 e c6) precisam de cuidado.',
    'O peão de e3 desorganiza as brancas: ...Ne4 e ...Ng3 contra o rei, e depois recuperar o peão de c6.',
  ),
  c09: P(
    'Com a peça a mais, consolidar: o motor indica 13.d3, seguido de Bf3 e Nc3, mirando o rei preto em c8 pela diagonal longa. O livro segue 13.Bf3 e dá igualdade.',
    'Compensação dinâmica pela peça: ataque ao roque com o cavalo de f4, a dama em h4 e a torre na coluna d. Sem iniciativa constante, a peça a menos pesa.',
  ),
  c10: P(
    'Abrir o centro com dxe4 e rocar; o rei preto em c8 e os peões isolados de a7 e c7 são alvos.',
    'Usar o par de bispos e a coluna d: ...Bb4 contra c3 e as torres no centro.',
  ),
  c11: P(
    'Dominar o centro com d4, conter o cavalo com f3 e desenvolver (Na3-c4); o rei preto em e7 é um alvo.',
    'Usar a coluna f e o cavalo (...Nh5-f4) contra o roque branco; o rei em e7 precisa de ...d6 para se abrigar.',
  ),
  c12: P(
    'Com a torre a mais, desenvolver rápido (Bf4, Qd2, g3) e trocar as damas para apagar o ataque; o rei em f1 é o ponto fraco.',
    'Atacar o rei branco em f1 antes que ele se abrigue: dama, cavalos e bispo contra f2 e e1, aproveitando a coluna f aberta.',
  ),
  c13: P(
    'Trocar em e6 e capturar em g7, abrindo o rei preto; depois Bh6 e as peças contra o roque.',
    'Contra-atacar no centro com os peões de c4 e d4 (...d3) e as torres nas colunas abertas.',
  ),
  c14: P(
    'Pressionar o rei preto em e7 pela coluna e (Re1) com os cavalos ativos e tentar recuperar o peão de d4.',
    'Abrigar o rei (...Kf8) e sustentar o peão de d4 com ...c5; a torre de g7 mira g2.',
  ),
  c15: P(
    'Eliminar o incômodo peão de d3: Nd4 e depois Qf3 com pressão em f7. Atenção ao cavalo de g4, que mira f2.',
    'O peão de d3 é o trunfo preto: sustentá-lo e ativar o cavalo de g4 contra f2. O rei perdeu o roque e deve buscar segurança.',
  ),
  c16: P(
    'Ativar o bispo com Bg5 e a dama contra o rei preto em c8; a torre de e6 está ativa.',
    'Usar o peão de d4 e o bispo de d6, e trocar a torre ativa de e6; a posição é igual.',
  ),
  c17: P(
    'Desfazer a pressão com Re2 e recuperar o peão de d4 com Nxd4.',
    'Rocar, manter o par de bispos e trocar as damas; o jogo se equilibra.',
  ),
  c18: P(
    'O motor indica Nd6+, que abre caminho para a dama em d6 contra o rei preto no centro; a compensação pelo peão é dinâmica.',
    'Rocar o quanto antes e devolver o peão se for preciso; o par de bispos é o trunfo de longo prazo.',
  ),
  c19: P(
    'Pressionar d5 e c7: g3 expulsa a dama de h4, Bxc5 troca o bispo ativo e Qxd5 ganha o peão central.',
    'Ataque ao roque com a dama em h4 e o cavalo de e4; o bispo de a6 domina a diagonal até f1.',
  ),
  c20: P(
    'Expulsar o cavalo de e4 com f3 e completar o desenvolvimento com Nc3 e Qd2.',
    'Reposicionar o cavalo em e6, trocar o cavalo de d4 e mirar o peão de b2 com a dama.',
  ),
  c21: P(
    'Retomar em e5 com a torre e jogar com o bispo de b3 contra d5; a estrutura é simétrica e a posição é de manobras.',
    'Atacar o peão de c2 com ...Nb4 e usar o par de bispos.',
  ),
  c22: P(
    'Plano típico da Ruy Lopez: h3, d4 e a manobra Nf1-g3.',
    'Ganhar espaço no flanco da dama com ...a5-a4 e reorganizar com ...Bf8; é uma posição de manobras.',
  ),
  c23: P(
    'Trocar o cavalo forte de f4 (Bxf4) e depois Bb5-a4 e o cavalo para g4 contra o roque.',
    'Pressão no flanco da dama com ...c5 e ...Qc7, e torres na coluna d; o peão de f4 restringe as brancas.',
  ),
  c24: P(
    'Jogar contra os peões fracos de c5 e c7 (Qc3, b3, Bb2) e trocar peças, aproveitando a estrutura superior.',
    'Usar o par de bispos em diagonais abertas (...Bb7, dama em f5) e evitar trocas que levem a um final com os peões dobrados.',
  ),
  'bonus-fried-liver': P(
    'Manter o rei preto no centro: d4 abre o jogo e Bf4 ataca e5. Com a peça a menos, o ataque precisa ser constante.',
    'Consolidar a peça a mais: reforçar d5, recuar o rei (...Kf7) e trocar peças; aos poucos o rei fica seguro.',
  ),
}

module.exports = { italiana, doisCavalos }
