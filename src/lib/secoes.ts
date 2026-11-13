import type { RouteLocationRaw } from 'vue-router'

/**
 * O mapa do app: três partes (Aprender = conhecimento, Praticar = exercícios, Jogar = aplicação)
 * mais o Início e o Eu. O menu, as páginas de seção e o Início leem daqui, então um recurso novo
 * entra num lugar só.
 */
export type Secao = 'inicio' | 'aprender' | 'praticar' | 'jogar' | 'eu'

export interface Atalho {
  /** Identifica o atalho para a página de seção anexar um selo (pendências do dia). */
  id: string
  nome: string
  descricao: string
  para: RouteLocationRaw
}

export interface GrupoDeAtalhos {
  titulo?: string
  atalhos: Atalho[]
}

export interface SecaoDoApp {
  secao: Exclude<Secao, 'inicio' | 'eu'>
  nome: string
  descricao: string
  para: string
  grupos: GrupoDeAtalhos[]
}

export const APRENDER: SecaoDoApp = {
  secao: 'aprender',
  nome: 'Aprender',
  descricao: 'O que você precisa saber para jogar melhor.',
  para: '/aprender',
  grupos: [
    {
      atalhos: [
        { id: 'fundamentos', nome: 'Fundamentos', descricao: 'Do zero: o movimento das peças, capturar, xeque e mate', para: '/fundamentos' },
        { id: 'aberturas', nome: 'Aberturas', descricao: 'As aberturas do MCO, coluna por coluna, com as ideias', para: '/aberturas' },
        { id: 'armadilhas', nome: 'Armadilhas', descricao: 'As armadilhas de cada abertura: como armar e como escapar', para: '/armadilhas' },
        { id: 'estrategia', nome: 'Estratégia', descricao: 'Estruturas de peões, planos e partidas-modelo (Grooten, Koblenz)', para: '/estrategia' },
      ],
    },
  ],
}

export const PRATICAR: SecaoDoApp = {
  secao: 'praticar',
  nome: 'Praticar',
  descricao: 'Exercícios para fixar padrões e lances.',
  para: '/praticar',
  grupos: [
    {
      titulo: 'Cálculo',
      atalhos: [
        { id: 'taticas', nome: 'Táticas e mates', descricao: 'Por tema e por livro: garfos, cravadas, mates em 1 a 4', para: '/exercicios' },
        { id: 'sequencia', nome: 'Sequência', descricao: 'Exercícios cada vez mais difíceis até o primeiro erro', para: { name: 'diario', query: { modo: 'sequencia' } } },
        { id: 'relampago', nome: 'Relâmpago', descricao: 'O máximo de acertos contra o relógio', para: '/relampago' },
      ],
    },
    {
      titulo: 'Aberturas e estratégia',
      atalhos: [
        { id: 'repertorio', nome: 'Treinar meu repertório', descricao: 'Jogue os lances do livro de memória', para: '/aberturas' },
        { id: 'armadilhas', nome: 'Armadilhas', descricao: 'Arme e escape: teste o que estudou', para: '/armadilhas' },
        { id: 'quizzes', nome: 'Planos por estrutura', descricao: 'Quizzes e partidas-modelo para adivinhar os lances', para: '/estrategia' },
      ],
    },
    {
      atalhos: [{ id: 'erros', nome: 'Meus erros', descricao: 'Os lances de abertura em que você mais erra', para: '/erros' }],
    },
  ],
}

export const JOGAR: SecaoDoApp = {
  secao: 'jogar',
  nome: 'Jogar',
  descricao: 'Use o que aprendeu numa partida de verdade.',
  para: '/jogar',
  grupos: [
    {
      atalhos: [
        { id: 'computador', nome: 'Contra o computador', descricao: 'Com relógio, na força que escolher', para: '/partida' },
        { id: 'online', nome: 'Online', descricao: 'Contra um amigo, por link; as partidas valendo contam no ranking', para: '/online' },
      ],
    },
    {
      titulo: 'Depois da partida',
      atalhos: [
        { id: 'partidas', nome: 'Minhas partidas', descricao: 'Do lichess ou coladas em PGN: análise e onde você saiu do livro', para: '/partidas' },
        { id: 'editor', nome: 'Editor e análise de posição', descricao: 'Monte uma posição, analise com o Stockfish ou jogue dali', para: '/editor' },
      ],
    },
    {
      titulo: 'Antes da partida',
      atalhos: [
        { id: 'preparacao', nome: 'O que estudar', descricao: 'Os lances mais jogados no seu nível e os capítulos que os cobrem', para: '/preparacao' },
        { id: 'jogador', nome: 'Estudar um jogador', descricao: 'As aberturas que ele joga e como enfrentá-las', para: '/jogador' },
      ],
    },
    {
      atalhos: [{ id: 'ranking', nome: 'Ranking', descricao: 'Rating das partidas on-line valendo', para: '/ranking' }],
    },
  ],
}

export const EU = {
  grupos: [
    {
      atalhos: [
        { id: 'progresso', nome: 'Progresso', descricao: 'Aberturas, exercícios e atividade por dia', para: '/progresso' },
        { id: 'diagnostico', nome: 'Diagnóstico', descricao: 'Conferência dos dados das aberturas: lances ilegais, notas a conferir', para: '/diagnostico' },
        { id: 'config', nome: 'Configurações', descricao: 'Tema, tabuleiro, repertório e conta', para: '/config' },
      ],
    },
  ] satisfies GrupoDeAtalhos[],
}

export const SECOES = [APRENDER, PRATICAR, JOGAR]
