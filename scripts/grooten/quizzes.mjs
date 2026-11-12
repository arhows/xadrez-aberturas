// Quizzes do livro "Chess Strategy for Club Players" de Herman Grooten (capítulos 13, 18 e 23):
// partidas comentadas que param em perguntas. Lances transcritos do PDF escaneado e conferidos
// refazendo cada partida desde o 1º lance e comparando com os diagramas do livro.
// Perguntas e explicações são resumos próprios em português.
// No quiz 18, a pergunta sobre 20.Rd8!! vem de uma variante comentada no livro (depois de 15...f6),
// por isso entra como uma segunda "partida" que começa na posição depois de 15.Bg5.
// Gerar o JSON: node scripts/grooten/gerarQuizzes.mjs

export const QUIZZES = [
  {
    "cap": 13,
    "nome": "Casa forte",
    "partidas": [
      {
        "brancas": "Botvinnik, Mikhail",
        "pretas": "Donner, Jan Hein",
        "evento": "Amsterdã 1963",
        "lances": "1.c4 Nf6 2.Nf3 e6 3.g3 d5 4.Bg2 Be7 5.O-O O-O 6.b3 b6 7.Bb2 Bb7 8.cxd5 Nxd5 9.d4 c5 10.dxc5 Bxc5 11.Nbd2 Nd7 12.a3 N5f6 13.b4 Be7 14.Nd4 Bxg2 15.Kxg2 Qc7 16.Qb3 Rfc8 17.Rfc1 Qb7+ 18.Qf3 Nd5 19.e4 N5f6 20.b5 a6 21.Nc6 Bf8 22.a4 axb5 23.axb5 Rxa1 24.Rxa1 Ra8 25.Rd1 Ne8 26.Nc4 Nc5 27.e5 Rc8 28.Ra1 Rc7 29.Ra7 Qxa7 30.Nxa7 Rxa7 31.Nxb6",
        "perguntas": [
          {
            "depois": 18,
            "tipo": "lance",
            "pergunta": "Qual a melhor reação das brancas ao último lance das pretas?",
            "resposta": "dxc5",
            "explicacao": "Trocando em c5 as brancas obrigam o bispo de e7 a se mexer de novo e ganham tempo. A estrutura fica simétrica, mas as brancas saem com pequena vantagem de desenvolvimento."
          },
          {
            "depois": 26,
            "tipo": "escolha",
            "pergunta": "Qual o plano mais promissor para as brancas?",
            "opcoes": [
              "14.Qb3",
              "14.Re1",
              "14.Nd4",
              "14.Rc1"
            ],
            "certa": 2,
            "explicacao": "14.Nd4 aceita a troca dos bispos de casas brancas, que aqui favorece as brancas (o cavalo mira c6). 14.Qb3 é expulsa por ...Bd5; 14.Rc1 deixa as pretas trocarem torres e aliviar; 14.Re1 (com e4) é respondido por ...a5, atacando b4."
          },
          {
            "depois": 30,
            "tipo": "lance",
            "pergunta": "Como as brancas devem continuar?",
            "resposta": "Qb3",
            "explicacao": "Sem o bispo de b7, a dama já não pode ser incomodada por ...Bd5 em b3. De lá ela pode ir a f3, de onde mira a casa c6."
          },
          {
            "depois": 34,
            "tipo": "escolha",
            "pergunta": "Qual a consequência lógica da ideia do 14º lance das brancas?",
            "opcoes": [
              "18.Qf3",
              "18.f3",
              "18.e4",
              "18.Kg1"
            ],
            "certa": 0,
            "explicacao": "18.Qf3 oferece a troca de damas: sem elas, o cavalo se instala em c6 de vez. Os outros lances não fazem nada pela conquista de c6."
          },
          {
            "depois": 38,
            "tipo": "lance",
            "pergunta": "Como as brancas podem aumentar a vantagem?",
            "resposta": "b5",
            "explicacao": "Com 20.b5 as brancas fixam a casa c6 para o cavalo e cedem c5 às pretas. A posse de c6 vale muito mais do que a de c5."
          },
          {
            "depois": 40,
            "tipo": "lance",
            "pergunta": "Qual o melhor lance das brancas agora?",
            "resposta": "Nc6",
            "explicacao": "O cavalo ocupa a casa forte c6 imediatamente, antes que as pretas troquem torres. De lá ele causa grande desordem no campo preto."
          },
          {
            "depois": 48,
            "tipo": "escolha",
            "pergunta": "O que é mais sensato aqui?",
            "opcoes": [
              "Trocar torres com 25.Rxa8",
              "Permitir a troca com 25.Nc4",
              "Evitar a troca com 25.Rd1",
              "Evitar a troca com 25.Rc1"
            ],
            "certa": 2,
            "explicacao": "As pretas não fazem nada com a coluna a, e manter um par de torres ajuda a explorar o cavalo de c6. Em d1 a torre opera pela coluna d; trocar torres alivia as pretas."
          },
          {
            "depois": 52,
            "tipo": "lance",
            "pergunta": "Como as brancas empurram o adversário ainda mais para o canto?",
            "resposta": "e5",
            "explicacao": "Como as pretas não conseguem pôr um cavalo em d5 de imediato, 27.e5 tira mais casas delas e prepara Nd6 com um peão passado perigoso. Surgem também vários golpes táticos."
          },
          {
            "depois": 53,
            "tipo": "escolha",
            "pergunta": "Pretas jogam. Qual dessas opções não perde de forma imediata?",
            "opcoes": [
              "27...Nc7",
              "27...Ra2",
              "27...Ra4",
              "27...Rc8"
            ],
            "certa": 3,
            "explicacao": "27...Rc8 (o lance da partida) evita a perda imediata, embora tire a torre da coluna a. 27...Nc7 perde para 28.Rd7! Nxd7 29.Ne7+ Bxe7 30.Qxb7; 27...Ra2 sofre com a fileira de trás após 28.Rd8; 27...Ra4 cai para 28.Nd6 Nxd6 29.exd6 e Ne5."
          },
          {
            "depois": 54,
            "tipo": "lance",
            "pergunta": "Qual o melhor lance das brancas?",
            "resposta": "Ra1",
            "explicacao": "Como a torre preta saiu da coluna a, Botvinnik a ocupa na hora. Depois de Ra7 a dama preta fica presa e acaba perdida."
          }
        ]
      }
    ]
  },
  {
    "cap": 18,
    "nome": "Coluna aberta",
    "partidas": [
      {
        "brancas": "Biyiasas, Peter",
        "pretas": "Hug, Werner",
        "evento": "Interzonal de Petrópolis 1973",
        "lances": "1.Nf3 c5 2.e4 e6 3.Nc3 Nc6 4.Bb5 Nge7 5.O-O a6 6.Bxc6 Nxc6 7.d4 cxd4 8.Nxd4 Be7 9.Nxc6 dxc6 10.e5 O-O 11.Qe2 Qc7 12.Bf4 c5 13.Ne4 Qc6 14.Rad1 b6 15.Bg5 Bxg5 16.Rd6 Qc7 17.Nxg5 Bb7 18.Qd3 g6 19.Rd1 Bd5 20.c4 Bc6 21.Qh3 h5 22.Nxe6",
        "perguntas": [
          {
            "depois": 20,
            "tipo": "lance",
            "pergunta": "Como as brancas continuam?",
            "resposta": "Qe2",
            "aceitas": [
              "Qg4"
            ],
            "explicacao": "As brancas querem manter as damas no tabuleiro (trocar seria bom para as pretas). Qe2 deixa o peão e5 sempre protegido; 11.Qg4, mais agressivo, também dava vantagem."
          },
          {
            "depois": 24,
            "tipo": "lance",
            "pergunta": "Qual a melhor forma de as brancas continuarem?",
            "resposta": "Ne4",
            "explicacao": "O cavalo é ativado rumo à ala do rei e ainda pode aproveitar a casa d6, enfraquecida pela estrutura das pretas."
          },
          {
            "depois": 28,
            "tipo": "lance",
            "pergunta": "Qual deve ser o objetivo da estratégia das brancas, e com que lance ele se realiza?",
            "resposta": "Bg5",
            "explicacao": "As brancas querem trocar os bispos de casas escuras: sem o bispo e7, a casa d6 vira trampolim para as peças brancas na coluna d aberta."
          },
          {
            "depois": 30,
            "tipo": "lance",
            "pergunta": "Como você continuaria?",
            "resposta": "Rd6",
            "explicacao": "Lance intermediário: não é obrigatório retomar já. A torre ocupa d6 com ganho de tempo; depois de 16.Nxg5 Bb7 as pretas colocariam a tempo uma torre na coluna d e a vantagem sumiria."
          },
          {
            "depois": 34,
            "tipo": "lance",
            "pergunta": "Com que lance multifuncional as brancas aumentam a vantagem?",
            "resposta": "Qd3",
            "explicacao": "A dama domina a coluna d com ganho de tempo (ameaça Qxh7#) e força as pretas a enfraquecer o roque com ...g6."
          },
          {
            "depois": 36,
            "tipo": "lance",
            "pergunta": "Qual a melhor escolha das brancas nesta posição?",
            "resposta": "Rd1",
            "explicacao": "Dobrar torres na única coluna aberta: a posse da coluna d é decisiva, e a torre de d6 terá papel importante no ataque."
          },
          {
            "depois": 40,
            "tipo": "lance",
            "pergunta": "Qual a continuação mais promissora das brancas?",
            "resposta": "Qh3",
            "explicacao": "A dama força um segundo enfraquecimento (...h5) e, de h3, também mira a casa e6, preparando a combinação seguinte."
          },
          {
            "depois": 42,
            "tipo": "lance",
            "pergunta": "Com que combinação as brancas decidem a partida?",
            "resposta": "Nxe6",
            "explicacao": "Pseudo-sacrifício que destrói a estrutura das pretas: 22...fxe6 23.Qxe6+ Qf7 (23...Kh8 24.Rxc6) 24.Qxg6+ Qxg6 25.Rxg6+ Kh7 26.Rxc6, com material de sobra. As pretas abandonaram."
          }
        ]
      },
      {
        "brancas": "Biyiasas, Peter",
        "pretas": "Hug, Werner",
        "evento": "Interzonal de Petrópolis 1973 (variante 15...f6)",
        "fen": "r1b2rk1/4bppp/ppq1p3/2p1P1B1/4N3/8/PPP1QPPP/3R1RK1 b - - 1 15",
        "lances": "15...f6 16.exf6 gxf6 17.Bh6 Rf7 18.Qg4+ Kh8 19.Qh5 Qe8 20.Rd8 Bxd8 21.Nd6 Qd7 22.Nxf7+ Kg8 23.Qg4+ Kxf7 24.Qg7+ Ke8 25.Qf8#",
        "perguntas": [
          {
            "depois": 9,
            "tipo": "lance",
            "pergunta": "Se as pretas recusam a troca de bispos com 15...f6, parecem ter tudo sob controle e preparam ...Bb7. Que surpresa as espera?",
            "resposta": "Rd8",
            "explicacao": "Golpe tático: 20.Rd8!! Bxd8 21.Nd6 Qd7 22.Nxf7+ Kg8 23.Qg4+! Kxf7 24.Qg7+ Ke8 25.Qf8# é mate. Se 20...Qxd8, 21.Qxf7 Qg8 22.Qxe7 ganha."
          }
        ]
      }
    ]
  },
  {
    "cap": 23,
    "nome": "Vantagem de espaço",
    "partidas": [
      {
        "brancas": "Smyslov, Vasily",
        "pretas": "Gudmundsson, Kristjan",
        "evento": "Reykjavik 1974",
        "lances": "1.d4 Nf6 2.Nf3 g6 3.b3 Bg7 4.Bb2 O-O 5.g3 d6 6.Bg2 c5 7.O-O Nc6 8.d5 Na5 9.c4 a6 10.Nbd2 b5 11.e4 Rb8 12.Bc3 Qc7 13.e5 Ng4 14.exd6 exd6 15.Bxg7 Kxg7 16.Re1 f6 17.Qc1 Ne5 18.Bf1 Bg4 19.Nh4 bxc4 20.bxc4 Rfe8 21.f4 Nf7 22.Qc3 Rxe1 23.Rxe1 Nb7 24.h3 Bd7 25.Ne4 Qd8 26.g4 h6 27.Bd3 g5 28.Ng3 gxh4 29.Nh5+ Kf8 30.Nxf6 Ba4 31.Nh5 Ne5 32.fxe5",
        "perguntas": [
          {
            "depois": 14,
            "tipo": "escolha",
            "pergunta": "As pretas deveriam ter jogado 7...cxd4. Qual a melhor forma de as brancas aproveitarem o erro?",
            "opcoes": [
              "8.d5",
              "8.dxc5",
              "8.e3"
            ],
            "certa": 0,
            "explicacao": "Com 8.d5 as brancas ganham bastante espaço e empurram o cavalo para uma casa pior. 8.dxc5 desfaz a tensão central sem proveito, e 8.e3 é uma montagem modesta demais."
          },
          {
            "depois": 20,
            "tipo": "escolha",
            "pergunta": "As pretas atacam o centro branco. Como as brancas devem reagir?",
            "opcoes": [
              "11.cxb5",
              "11.e4",
              "11.Bc3"
            ],
            "certa": 1,
            "explicacao": "11.e4 reforça o centro e amplia a vantagem de espaço. 11.cxb5 dá às pretas uma maioria móvel na ala da dama; 11.Bc3 não é ruim, mas não é urgente."
          },
          {
            "depois": 24,
            "tipo": "escolha",
            "pergunta": "O último lance das pretas foi duvidoso. Como as brancas exploram isso?",
            "opcoes": [
              "13.Rc1",
              "13.Qc2",
              "13.e5"
            ],
            "certa": 2,
            "explicacao": "O avanço temático 13.e5 vem com ganho de tempo, pois 13...dxe5 perderia a qualidade. 13.Rc1 faz pouco numa coluna c que as brancas não querem abrir, e 13.Qc2 é útil, mas menos forte."
          },
          {
            "depois": 32,
            "tipo": "escolha",
            "pergunta": "O roque preto ficou enfraquecido. Como as brancas podem explorar isso de forma inteligente?",
            "opcoes": [
              "17.Qc1",
              "17.Qe2",
              "17.Bh3"
            ],
            "certa": 0,
            "explicacao": "A dama vai para c3: domina a grande diagonal a1-h8, ataca o cavalo de a5 e protege c4. 17.Qe2 é menos eficiente para usar a coluna e, e 17.Bh3 falha taticamente por 17...Nxf2."
          },
          {
            "depois": 40,
            "tipo": "lance",
            "pergunta": "As pretas reagiram nos últimos lances. Como as brancas retomam a iniciativa?",
            "resposta": "f4",
            "explicacao": "Um lance simples e forte: o cavalo preto, incômodo em e5, é expulso e as brancas ganham ainda mais espaço."
          },
          {
            "depois": 48,
            "tipo": "lance",
            "pergunta": "Como as brancas podem aumentar a pressão?",
            "resposta": "Ne4",
            "explicacao": "O cavalo chega a e4 e mira a casa fraca f6, e os problemas das pretas se acumulam."
          },
          {
            "depois": 50,
            "tipo": "lance",
            "pergunta": "Como as brancas podem progredir agora?",
            "resposta": "g4",
            "explicacao": "O avanço g4 prepara g5, que romperia a defesa preta na ala do rei."
          },
          {
            "depois": 52,
            "tipo": "escolha",
            "pergunta": "As fraquezas pretas são muitas. Como as brancas devem atacá-las?",
            "opcoes": [
              "27.Ng3",
              "27.f5",
              "27.Bd3"
            ],
            "certa": 2,
            "explicacao": "27.Bd3 mira o novo ponto fraco, o peão g6, difícil de defender (27.g5!! seria ainda mais direto). 27.f5 entrega a casa e5 às pretas, e 27.Ng3 é boa ideia, mas as pretas resistem com 27...Qa5."
          },
          {
            "depois": 54,
            "tipo": "escolha",
            "pergunta": "Como as brancas abrem um buraco na posição do rei preto?",
            "opcoes": [
              "28.fxg5",
              "28.Ng3",
              "28.Nxf6"
            ],
            "certa": 1,
            "explicacao": "O sacrifício de peça 28.Ng3 conquista o controle da casa f6, e as demais peças brancas entram de forma decisiva. 28.fxg5 abandona a casa e5, e 28.Nxf6 pode ser aceito pelas pretas sem perigo."
          },
          {
            "depois": 60,
            "tipo": "lance",
            "pergunta": "A barreira de peões do rei preto foi destruída. Como as brancas concluem?",
            "resposta": "Nh5",
            "explicacao": "O cavalo volta a h5 e ameaça mate, que as pretas não conseguem evitar de forma satisfatória."
          }
        ]
      }
    ]
  }
]
