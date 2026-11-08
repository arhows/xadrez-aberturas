import { Chess } from 'chess.js'

export interface Problema {
  /** Número do problema no livro. */
  n: number
  fen: string
  /** Todos os lances que resolvem (SAN), conferidos pelo gerador. */
  solucoes: string[]
}

export interface ConjuntoExercicios {
  id: string
  nome: string
  fonte: string
  /** Mate em quantos lances. */
  lances: number
  problemas: Problema[]
}

export type PecaPromocao = 'q' | 'r' | 'b' | 'n'

export interface LanceVerificado {
  san: string
  from: string
  to: string
  fenDepois: string
  mate: boolean
}

// Os conjuntos são grandes (o Mate em 2 tem mais de 3 mil problemas): carregam só quando
// uma tela de exercícios abre, fora do pacote inicial do app.
const arquivos = import.meta.glob<ConjuntoExercicios>('../../data/exercicios/*.json', { import: 'default' })

let carregando: Promise<ConjuntoExercicios[]> | undefined
let carregados: ConjuntoExercicios[] = []

/** Carrega todos os conjuntos uma única vez, na ordem dos nomes de arquivo. */
export function carregarConjuntos(): Promise<ConjuntoExercicios[]> {
  carregando ??= Promise.all(
    Object.keys(arquivos)
      .sort()
      .map((caminho) => arquivos[caminho]()),
  ).then((lista) => (carregados = lista))
  return carregando
}

/** Conjuntos já carregados (as rotas de exercícios esperam `carregarConjuntos` antes de abrir). */
export function obterConjuntos(): ConjuntoExercicios[] {
  return carregados
}

export function buscarConjunto(id: string): ConjuntoExercicios | undefined {
  return carregados.find((conjunto) => conjunto.id === id)
}

/** O lance de peão chega à última fileira e precisa da escolha da peça. */
export function ehPromocao(fen: string, de: string, para: string): boolean {
  return new Chess(fen)
    .moves({ verbose: true })
    .some((lance) => lance.from === de && lance.to === para && !!lance.promotion)
}

/** Joga o lance e diz se ele dá mate; null se for ilegal. */
export function verificarLance(
  fen: string,
  de: string,
  para: string,
  promocao?: PecaPromocao,
): LanceVerificado | null {
  const jogo = new Chess(fen)
  try {
    const lance = jogo.move({ from: de, to: para, promotion: promocao })
    return { san: lance.san, from: lance.from, to: lance.to, fenDepois: jogo.fen(), mate: jogo.isCheckmate() }
  } catch {
    return null
  }
}

/** Casas de origem e destino de um lance em SAN, para a pista e a seta. */
export function casasDoLance(fen: string, san: string): { from: string; to: string } {
  const lance = new Chess(fen).move(san)
  return { from: lance.from, to: lance.to }
}

/** Lances que dão mate imediato (o SAN do chess.js marca o mate com #). */
export function matesEm1(fen: string): string[] {
  return new Chess(fen)
    .moves()
    .filter((san) => san.endsWith('#'))
}

export type Resposta =
  /** Todas as respostas permitem mate: o lance é a chave, e esta é a defesa mais resistente. */
  | { tipo: 'defesa'; lance: LanceVerificado }
  /** A resposta escapa do mate no lance seguinte; sem `lance`, o lance afogou o rei. */
  | { tipo: 'refutacao'; lance?: LanceVerificado }

/**
 * Responde pelo defensor depois do primeiro lance de um mate em 2. A defesa escolhida é a que
 * deixa menos lances de mate, para o exercício não ficar mais fácil do que o livro propõe.
 */
export function responder(fenDepois: string): Resposta {
  const jogo = new Chess(fenDepois)
  let melhor: { lance: LanceVerificado; mates: number } | null = null
  for (const resposta of jogo.moves({ verbose: true })) {
    jogo.move(resposta)
    const fen = jogo.fen()
    const mates = jogo.moves().filter((san) => san.endsWith('#')).length
    jogo.undo()
    const lance = { san: resposta.san, from: resposta.from, to: resposta.to, fenDepois: fen, mate: false }
    if (mates === 0) return { tipo: 'refutacao', lance }
    if (!melhor || mates < melhor.mates) melhor = { lance, mates }
  }
  return melhor ? { tipo: 'defesa', lance: melhor.lance } : { tipo: 'refutacao' }
}

export function vezDoProblema(problema: Problema): 'w' | 'b' {
  return problema.fen.split(' ')[1] === 'b' ? 'b' : 'w'
}
