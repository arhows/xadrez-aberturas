import { Chess } from 'chess.js'
import type { Pedido } from './analise.worker'
import { chaveDoMate, responder, type LanceVerificado, type Resposta } from './mate'

export { chaveDoMate, jogarSan, matesEm1, responder, type LanceVerificado, type Resposta } from './mate'

export interface Problema {
  /** Número do problema no livro. */
  n: number
  fen: string
  /** Lances que resolvem (SAN), conferidos pelo gerador; no Mate em 3, só a chave do livro. */
  solucoes: string[]
  /** Defesa mais resistente contra a primeira solução, quando calculada pelo gerador. */
  defesa?: string
  /**
   * Lance do adversário antes do exercício ("Black now played ...Kg8"): o diagrama (`fen`) é a
   * posição antes dele, e `solucoes` valem para a posição depois dele.
   */
  previo?: string
  /** Jogadores e torneio, quando o problema vem de uma partida. */
  partida?: string
  /** Problemas táticos: a linha inteira depois do `previo` (lances seus e respostas, em SAN). */
  linha?: string[]
  /** Dificuldade do problema no lichess. */
  rating?: number
  faixa?: 'facil' | 'medio' | 'dificil'
  /** Id do problema no lichess (lichess.org/training/<id>). */
  lichess?: string
  /** Enunciado próprio (exercícios de livro: "As brancas empatam"). */
  tarefa?: string
  /** Explicação mostrada depois de resolver. */
  explicacao?: string
}

export interface ConjuntoExercicios {
  id: string
  nome: string
  fonte: string
  /** Mate em quantos lances. */
  lances: number
  /** Livro de origem, para agrupar os conjuntos; sem ele, vale a fonte sem o capítulo. */
  livro?: string
  /** 'tatica' = problemas do lichess por tema (tela própria); sem ele, problemas de mate. */
  tipo?: 'mate' | 'tatica'
  /** Tema do lichess (fork, pin…), nos conjuntos táticos. */
  tema?: string
  problemas: Problema[]
}

/** Ordem dos livros na tela: primeiro o Polgár, depois o Cicero. */
const ORDEM_DOS_LIVROS = ['polgar', 'cicero']
const posicaoDoArquivo = (caminho: string) => {
  const i = ORDEM_DOS_LIVROS.findIndex((prefixo) => caminho.includes(`/${prefixo}-`))
  return i < 0 ? ORDEM_DOS_LIVROS.length : i
}

export function livroDoConjunto(conjunto: ConjuntoExercicios): string {
  return conjunto.livro ?? conjunto.fonte.replace(/, cap\. \d+$/, '')
}

export type PecaPromocao = 'q' | 'r' | 'b' | 'n'

// Os conjuntos são grandes (o Mate em 2 tem mais de 3 mil problemas): carregam só quando
// uma tela de exercícios abre, fora do pacote inicial do app.
const arquivos = import.meta.glob<ConjuntoExercicios>('../../data/exercicios/*.json', { import: 'default' })
/** Táticas por tema (gerado por scripts/taticas/gerar.mjs), na ordem dos temas. */
const arquivosTaticos = import.meta.glob<ConjuntoExercicios>('../../data/taticas/*.json', { import: 'default' })
export const ORDEM_DOS_TEMAS = [
  'peca-desprotegida', 'garfo', 'cravada', 'espeto', 'ataque-descoberto', 'xeque-duplo', 'remocao-do-defensor',
  'desvio', 'atracao', 'peca-presa', 'mate-do-corredor', 'mate-sufocado', 'peao-avancado', 'lance-intermediario',
  'interferencia', 'liberacao', 'raio-x', 'lance-silencioso', 'sacrificio', 'zugzwang',
]
const posicaoDoTema = (caminho: string) => {
  const i = ORDEM_DOS_TEMAS.findIndex((tema) => caminho.endsWith(`/${tema}.json`))
  return i < 0 ? ORDEM_DOS_TEMAS.length : i
}

let carregando: Promise<ConjuntoExercicios[]> | undefined
let carregados: ConjuntoExercicios[] = []

/** Carrega todos os conjuntos uma única vez: primeiro as táticas por tema, depois os de mate. */
export function carregarConjuntos(): Promise<ConjuntoExercicios[]> {
  const taticos = Object.keys(arquivosTaticos)
    .sort((a, b) => posicaoDoTema(a) - posicaoDoTema(b))
    .map((caminho) => arquivosTaticos[caminho]())
  const deMate = Object.keys(arquivos)
    .sort((a, b) => posicaoDoArquivo(a) - posicaoDoArquivo(b) || a.localeCompare(b))
    .map((caminho) => arquivos[caminho]())
  carregando ??= Promise.all([...taticos, ...deMate]).then((lista) => (carregados = lista))
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

/** Omit que respeita cada caso da união. */
type SemId<T> = T extends unknown ? Omit<T, 'id'> : never

let worker: Worker | null | undefined
let proximoId = 0
const pendentes = new Map<number, (resultado: unknown) => void>()

/** Executa a busca no worker, para a tela não travar; sem suporte a worker, calcula aqui. */
function noWorker<T>(pedido: SemId<Pedido>, local: () => T): Promise<T> {
  if (worker === undefined) {
    try {
      worker = new Worker(new URL('./analise.worker.ts', import.meta.url), { type: 'module' })
      worker.onmessage = (evento: MessageEvent<{ id: number; resultado: unknown }>) => {
        pendentes.get(evento.data.id)?.(evento.data.resultado)
        pendentes.delete(evento.data.id)
      }
    } catch {
      worker = null
    }
  }
  const atual = worker
  if (!atual) return Promise.resolve(local())
  const id = ++proximoId
  return new Promise((resolver) => {
    pendentes.set(id, resolver as (resultado: unknown) => void)
    atual.postMessage({ ...pedido, id })
  })
}

/** Resposta do defensor; com mate em 2 ou mais ainda por vir, a busca vai para o worker. */
export function analisar(fenDepois: string, restantes: number): Promise<Resposta> {
  if (restantes <= 1) return Promise.resolve(responder(fenDepois, restantes))
  return noWorker({ tipo: 'responder', fen: fenDepois, restantes }, () => responder(fenDepois, restantes))
}

/** Um lance que força mate em até `lances` lances, para a pista; a partir de 3, no worker. */
export function buscarChave(fen: string, lances: number): Promise<string | undefined> {
  if (lances <= 2) return Promise.resolve(chaveDoMate(fen, lances))
  return noWorker({ tipo: 'chave', fen, lances }, () => chaveDoMate(fen, lances))
}

/** Lado de quem resolve: o da vez no diagrama, ou o outro se o adversário joga antes. */
export function vezDoProblema(problema: Problema): 'w' | 'b' {
  const doDiagrama = problema.fen.split(' ')[1] === 'b' ? 'b' : 'w'
  if (!problema.previo) return doDiagrama
  return doDiagrama === 'w' ? 'b' : 'w'
}
