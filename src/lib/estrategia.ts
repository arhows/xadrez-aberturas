import type { Cor } from './lances'

/**
 * Estratégia por estruturas de peões: as partidas-modelo do "Chess Structures" (Flores Rios)
 * agrupadas por estrutura, com resumos próprios dos planos. Gerado por scripts/estrategia.
 */

export interface PartidaModelo {
  n: number
  brancas: string
  pretas: string
  evento: string
  /** Lances em SAN separados por espaço. */
  lances: string
  /** Marcas do livro na linha principal: "índice:marca" separados por espaço ("23:! 40:!?"). */
  marcas: string
  resultado: string
  /** false = a leitura do livro parou antes do fim; a partida vai até onde foi conferida. */
  completa: boolean
  objetivo: string
}

export interface Estrutura {
  id: string
  nome: string
  familia: string
  origem: string
  ideia: string
  brancas: string[]
  pretas: string[]
  regra: string
  partidas: PartidaModelo[]
}

export interface Familia {
  id: string
  nome: string
  descricao: string
}

export interface LivroDeEstrategia {
  fonte: string
  familias: Familia[]
  estruturas: Estrutura[]
}

let carregando: Promise<LivroDeEstrategia> | undefined
let carregado: LivroDeEstrategia | null = null

/** O arquivo só é baixado quando uma tela de estratégia abre. */
export function carregarEstrategia(): Promise<LivroDeEstrategia> {
  carregando ??= import('../../data/estrategia/estruturas.json').then((m) => (carregado = m.default as LivroDeEstrategia))
  return carregando
}

export function obterEstrategia(): LivroDeEstrategia | null {
  return carregado
}

export function buscarEstrutura(id: string): Estrutura | undefined {
  return carregado?.estruturas.find((e) => e.id === id)
}

export function marcasDaPartida(p: PartidaModelo): Map<number, string> {
  return new Map(
    p.marcas
      .split(' ')
      .filter(Boolean)
      .map((par) => {
        const [i, marca] = par.split(':')
        return [Number(i), marca] as [number, string]
      }),
  )
}

/** Cor que venceu (para o quiz seguir o vencedor); empate ou sem resultado: brancas. */
export function corDoVencedor(p: PartidaModelo): Cor {
  return p.resultado.startsWith('0') ? 'b' : 'w'
}

/** A partir de qual meio-lance o quiz pergunta: depois da abertura (lance 10). */
export const INICIO_DO_QUIZ = 18

/** Índices (0 = 1º lance das brancas) dos lances que o quiz pergunta para a cor escolhida. */
export function perguntasDoQuiz(p: PartidaModelo, cor: Cor, inicio = INICIO_DO_QUIZ): number[] {
  const total = p.lances.split(' ').length
  const lista: number[] = []
  for (let i = Math.min(inicio, Math.max(0, total - 10)); i < total; i++) {
    if ((i % 2 === 0 ? 'w' : 'b') === cor) lista.push(i)
  }
  return lista
}

export interface ResultadoQuiz {
  acertos: number
  total: number
  data: string
}

export const chaveDaPartidaModelo = (estrutura: string, n: number) => `${estrutura}/${n}`

/** Junta o progresso de dois aparelhos: fica o melhor aproveitamento de cada partida. */
export function juntarEstrategia(a: Record<string, ResultadoQuiz>, b: Record<string, ResultadoQuiz>): Record<string, ResultadoQuiz> {
  const junto = { ...a }
  for (const [chave, r] of Object.entries(b)) {
    const atual = junto[chave]
    const taxa = (x: ResultadoQuiz) => (x.total ? x.acertos / x.total : 0)
    if (!atual || taxa(r) > taxa(atual) || (taxa(r) === taxa(atual) && r.data > atual.data)) junto[chave] = r
  }
  return junto
}
