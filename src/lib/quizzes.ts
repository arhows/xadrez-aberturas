import { Chess } from 'chess.js'
import type { ResultadoQuiz } from './estrategia'

/**
 * Quizzes de estratégia (capítulos de quiz do "Chess Strategy for Club Players", de Herman Grooten):
 * partidas comentadas que param em perguntas — achar o lance no tabuleiro ou escolher entre
 * alternativas. Gerado por scripts/grooten/gerarQuizzes.mjs.
 */

export interface PerguntaDeLance {
  tipo: 'lance'
  /** Meios-lances da partida já jogados quando a pergunta aparece. */
  depois: number
  pergunta: string
  /** SAN do lance certo; `aceitas` = outros lances que o livro também aprova. */
  resposta: string
  aceitas?: string[]
  explicacao: string
}

export interface PerguntaDeEscolha {
  tipo: 'escolha'
  depois: number
  pergunta: string
  opcoes: string[]
  /** Índice da alternativa certa (0 = A). */
  certa: number
  explicacao: string
}

export type PerguntaDoQuiz = PerguntaDeLance | PerguntaDeEscolha

export interface PartidaDoQuiz {
  brancas: string
  pretas: string
  evento: string
  /** Posição inicial, quando o livro não dá a partida desde o 1º lance. */
  fen?: string
  /** Lances em SAN separados por espaço. */
  lances: string
  perguntas: PerguntaDoQuiz[]
}

export interface Quiz {
  id: string
  cap: number
  nome: string
  partidas: PartidaDoQuiz[]
}

export interface LivroDeQuizzes {
  fonte: string
  quizzes: Quiz[]
}

let carregando: Promise<LivroDeQuizzes> | undefined
let carregado: LivroDeQuizzes | null = null

/** O arquivo só é baixado quando uma tela de estratégia abre. */
export function carregarQuizzes(): Promise<LivroDeQuizzes> {
  carregando ??= import('../../data/estrategia/quizzes.json').then((m) => (carregado = m.default as LivroDeQuizzes))
  return carregando
}

export function obterQuizzes(): LivroDeQuizzes | null {
  return carregado
}

export function buscarQuiz(id: string): Quiz | undefined {
  return carregado?.quizzes.find((q) => q.id === id)
}

/** Chave do resultado em `progresso.estrategia` (o mesmo registro das partidas-modelo). */
export const chaveDoQuiz = (id: string) => `quiz/${id}`

export const totalDePerguntas = (quiz: Quiz) => quiz.partidas.reduce((s, p) => s + p.perguntas.length, 0)

export interface PosicaoDaPartida {
  fen: string
  ultimo: [string, string] | null
}

/** Posições depois de cada meio-lance (0 = inicial). */
export function posicoesDaPartida(partida: PartidaDoQuiz): PosicaoDaPartida[] {
  const jogo = partida.fen ? new Chess(partida.fen) : new Chess()
  const lista: PosicaoDaPartida[] = [{ fen: jogo.fen(), ultimo: null }]
  for (const san of partida.lances.split(' ')) {
    const m = jogo.move(san)
    lista.push({ fen: jogo.fen(), ultimo: [m.from, m.to] })
  }
  return lista
}

const semSinais = (san: string) => san.replace(/[+#!?]/g, '')

/** O lance jogado (SAN) responde a pergunta? */
export function acertouOLance(pergunta: PerguntaDeLance, san: string): boolean {
  return [pergunta.resposta, ...(pergunta.aceitas ?? [])].some((certo) => semSinais(certo) === semSinais(san))
}

/** Casas de origem e destino do lance certo (para a seta da resposta). */
export function casasDoLance(fen: string, san: string): [string, string] | null {
  try {
    const m = new Chess(fen).move(san)
    return [m.from, m.to]
  } catch {
    return null
  }
}

/** Alternativa que é um lance ("14.Qb3", "14...Nd5") vira seta no tabuleiro; texto livre não. */
export function lanceDaAlternativa(fen: string, opcao: string): [string, string] | null {
  const m = opcao.trim().match(/^(?:\d+\s*\.(?:\s*\.\.)?\s*)?([KQRBNa-hO][^\s,;]*)$/)
  return m ? casasDoLance(fen, m[1]) : null
}

/** Guarda o melhor aproveitamento (empate de taxa: o mais recente). */
export function melhorResultado(anterior: ResultadoQuiz | undefined, atual: ResultadoQuiz): ResultadoQuiz {
  if (!anterior || !anterior.total) return atual
  const taxa = (x: ResultadoQuiz) => (x.total ? x.acertos / x.total : 0)
  return taxa(atual) >= taxa(anterior) ? atual : anterior
}
