import { Chess } from 'chess.js'
import { responder, type LanceVerificado, type Resposta } from './mate'

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
}

export interface ConjuntoExercicios {
  id: string
  nome: string
  fonte: string
  /** Mate em quantos lances. */
  lances: number
  /** Livro de origem, para agrupar os conjuntos; sem ele, vale a fonte sem o capítulo. */
  livro?: string
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

let carregando: Promise<ConjuntoExercicios[]> | undefined
let carregados: ConjuntoExercicios[] = []

/** Carrega todos os conjuntos uma única vez, na ordem dos nomes de arquivo. */
export function carregarConjuntos(): Promise<ConjuntoExercicios[]> {
  carregando ??= Promise.all(
    Object.keys(arquivos)
      .sort((a, b) => posicaoDoArquivo(a) - posicaoDoArquivo(b) || a.localeCompare(b))
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

let worker: Worker | null | undefined

/**
 * Resposta do defensor; com mate em 2 ainda por vir a busca é pesada e vai para um worker,
 * para a tela não travar. Sem suporte a worker, calcula aqui mesmo.
 */
export function analisar(fenDepois: string, restantes: number): Promise<Resposta> {
  if (restantes <= 1) return Promise.resolve(responder(fenDepois, restantes))
  if (worker === undefined) {
    try {
      worker = new Worker(new URL('./analise.worker.ts', import.meta.url), { type: 'module' })
    } catch {
      worker = null
    }
  }
  const atual = worker
  if (!atual) return Promise.resolve(responder(fenDepois, restantes))
  return new Promise((resolver) => {
    atual.onmessage = (evento: MessageEvent<Resposta>) => resolver(evento.data)
    atual.postMessage({ fen: fenDepois, restantes })
  })
}

/** Lado de quem resolve: o da vez no diagrama, ou o outro se o adversário joga antes. */
export function vezDoProblema(problema: Problema): 'w' | 'b' {
  const doDiagrama = problema.fen.split(' ')[1] === 'b' ? 'b' : 'w'
  if (!problema.previo) return doDiagrama
  return doDiagrama === 'w' ? 'b' : 'w'
}
