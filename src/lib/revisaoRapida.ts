import { reactive } from 'vue'
import type { RouteLocationRaw, Router } from 'vue-router'
import type { Revisao } from './revisaoExercicios'

/**
 * Revisão rápida: uma sessão curta (5 minutos) que alterna as revisões vencidas das aberturas
 * e dos exercícios. Não tem tela de jogo própria: cada item abre o Treino (uma linha do
 * capítulo) ou o exercício, que mostram o botão "Seguir" quando o item termina. O estado fica
 * na sessão do navegador, para sobreviver a um recarregamento.
 */
export const DURACAO_MS = 5 * 60_000
/** Itens no máximo: com mais do que isso, os 5 minutos acabam antes. */
export const MAXIMO_DE_ITENS = 15

export type ItemRapido = { tipo: 'abertura'; capitulo: string } | { tipo: 'exercicio'; conjunto: string; n: number }

interface Estado {
  ativa: boolean
  itens: ItemRapido[]
  /** Índice do item aberto agora. */
  atual: number
  inicio: number
  fim: number
  feitos: { aberturas: number; exercicios: number }
}

const CHAVE = 'xadrez-revisao-rapida'

function lerSalvo(): Estado | null {
  try {
    const texto = sessionStorage.getItem(CHAVE)
    return texto ? (JSON.parse(texto) as Estado) : null
  } catch {
    return null
  }
}

export const revisaoRapida = reactive<Estado>(
  lerSalvo() ?? { ativa: false, itens: [], atual: 0, inicio: 0, fim: 0, feitos: { aberturas: 0, exercicios: 0 } },
)

function salvar() {
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify(revisaoRapida))
  } catch {
    // Sem sessionStorage: a sessão vale só enquanto a página estiver aberta.
  }
}

/**
 * Monta a fila alternando aberturas e exercícios: uma linha de cada capítulo com revisão
 * vencida por vez (o Treino sorteia qual), e os exercícios dos mais atrasados aos mais recentes.
 */
export function montarFila(aberturas: { capitulo: string; pendentes: number }[], exercicios: Revisao[]): ItemRapido[] {
  const linhas: ItemRapido[] = []
  const restantes = aberturas.map((a) => ({ ...a }))
  while (restantes.some((a) => a.pendentes > 0)) {
    for (const a of restantes) {
      if (a.pendentes <= 0) continue
      linhas.push({ tipo: 'abertura', capitulo: a.capitulo })
      a.pendentes--
    }
  }
  const problemas: ItemRapido[] = exercicios.map((e) => ({ tipo: 'exercicio', conjunto: e.conjunto, n: e.n }))
  const fila: ItemRapido[] = []
  for (let i = 0; fila.length < MAXIMO_DE_ITENS && (i < linhas.length || i < problemas.length); i++) {
    if (i < linhas.length) fila.push(linhas[i])
    if (i < problemas.length && fila.length < MAXIMO_DE_ITENS) fila.push(problemas[i])
  }
  return fila
}

export function rotaDoItem(item: ItemRapido): RouteLocationRaw {
  return item.tipo === 'abertura'
    ? { name: 'treino', params: { cap: item.capitulo }, query: { auto: '1', rapida: '1' } }
    : { name: 'exercicio', params: { conjunto: item.conjunto }, query: { n: String(item.n), revisao: '1', rapida: '1' } }
}

export function comecarRevisaoRapida(router: Router, itens: ItemRapido[], agora = Date.now()): void {
  Object.assign(revisaoRapida, {
    ativa: true,
    itens,
    atual: 0,
    inicio: agora,
    fim: 0,
    feitos: { aberturas: 0, exercicios: 0 },
  })
  salvar()
  if (itens.length) void router.push(rotaDoItem(itens[0]))
}

export const tempoRestante = (agora = Date.now()) => Math.max(0, revisaoRapida.inicio + DURACAO_MS - agora)
export const restamItens = () => revisaoRapida.itens.length - revisaoRapida.atual - 1

/**
 * O item aberto terminou: conta (a menos que tenha sido pulado por já estar em dia) e vai para o
 * próximo, ou para o resumo se o tempo ou a fila acabou.
 */
export function seguirRevisaoRapida(router: Router, contar = true, agora = Date.now()): void {
  const item = revisaoRapida.itens[revisaoRapida.atual]
  if (item && contar) revisaoRapida.feitos[item.tipo === 'abertura' ? 'aberturas' : 'exercicios']++
  revisaoRapida.atual++
  const proximo = revisaoRapida.itens[revisaoRapida.atual]
  if (!proximo || tempoRestante(agora) <= 0) return encerrarRevisaoRapida(router, agora)
  salvar()
  void router.replace(rotaDoItem(proximo))
}

export function encerrarRevisaoRapida(router: Router, agora = Date.now()): void {
  revisaoRapida.ativa = false
  revisaoRapida.fim = agora
  salvar()
  void router.replace({ name: 'revisao-rapida' })
}
