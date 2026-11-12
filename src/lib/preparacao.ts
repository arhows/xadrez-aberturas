import { buscarPorLances, lerLances } from './busca'
import type { CapituloCarregado } from './capitulos'
import type { Estatisticas, LanceExplorador } from './explorador'

/**
 * "O que estudar": a partir do explorador do lichess no nível da pessoa, os lances que o
 * adversário mais joga, as respostas mais usadas contra cada um e os capítulos do livro que
 * cobrem cada resposta. Tudo puro: recebe as estatísticas já consultadas.
 */

export type Lado = 'w' | 'b'

export interface CapituloSugerido {
  id: string
  nome: string
  noRepertorio: boolean
  /** % das colunas dominadas no Treino. */
  dominio: number
}

export interface Resposta {
  san: string
  /** Fração das partidas (0–1) em que essa resposta foi jogada. */
  parte: number
  /** % de pontos (vitória = 1, empate = ½) para o lado da pessoa. */
  pontos: number
  total: number
  /** Capítulos com a posição depois da resposta (ou, sem nenhum, até onde o livro vai). */
  capitulos: CapituloSugerido[]
  /** O livro cobre só parte da sequência. */
  parcial: boolean
}

export interface LanceAdversario {
  san: string
  parte: number
  total: number
  respostas: Resposta[]
  /** A resposta indicada para estudar (repertório > coberta pelo livro > mais jogada). */
  sugestao: Resposta | null
}

export const QUANTOS = 3

/** Os `n` lances mais jogados (o lichess já manda em ordem de partidas). */
export function maisJogados(estatisticas: Estatisticas, n = QUANTOS): (LanceExplorador & { parte: number })[] {
  // O total da posição e a soma dos lances costumam bater; o maior evita frações acima de 100%.
  const base = Math.max(estatisticas.total, estatisticas.lances.reduce((s, l) => s + l.total, 0))
  return estatisticas.lances.slice(0, n).map((l) => ({ ...l, parte: base ? l.total / base : 0 }))
}

export function pontosDoLado(lance: LanceExplorador, lado: Lado): number {
  if (!lance.total) return 0
  const meus = lado === 'w' ? lance.brancas : lance.pretas
  return ((meus + lance.empates / 2) / lance.total) * 100
}

/** Capítulos que cobrem a sequência, com domínio e repertório. */
export function capitulosDaSequencia(
  capitulos: CapituloCarregado[],
  sans: string[],
  dominio: (id: string) => number,
  noRepertorio: (id: string) => boolean,
): { capitulos: CapituloSugerido[]; parcial: boolean } {
  const lida = lerLances(sans.join(' '))
  if (!lida) return { capitulos: [], parcial: false }
  const busca = buscarPorLances(capitulos, lida)
  const achados = busca.resultados.length ? busca.resultados : (busca.parcial?.resultados ?? [])
  const vistos = new Set<string>()
  const lista: CapituloSugerido[] = []
  for (const r of achados) {
    const id = r.capitulo.capitulo.id
    if (vistos.has(id)) continue
    vistos.add(id)
    lista.push({ id, nome: r.capitulo.capitulo.nome, noRepertorio: noRepertorio(id), dominio: dominio(id) })
  }
  lista.sort((a, b) => Number(b.noRepertorio) - Number(a.noRepertorio) || b.dominio - a.dominio)
  return { capitulos: lista, parcial: !busca.resultados.length && lista.length > 0 }
}

/** Escolhe a resposta para estudar: a que já está no repertório; senão, a mais jogada que o livro cobre. */
export function escolherSugestao(respostas: Resposta[]): Resposta | null {
  return (
    respostas.find((r) => r.capitulos.some((c) => c.noRepertorio)) ??
    respostas.find((r) => r.capitulos.length && !r.parcial) ??
    respostas.find((r) => r.capitulos.length) ??
    respostas[0] ??
    null
  )
}

export function montarLanceAdversario(
  lance: LanceExplorador & { parte: number },
  depois: Estatisticas,
  prefixo: string[],
  lado: Lado,
  capitulos: CapituloCarregado[],
  dominio: (id: string) => number,
  noRepertorio: (id: string) => boolean,
): LanceAdversario {
  const respostas = maisJogados(depois).map((r): Resposta => {
    const cobertura = capitulosDaSequencia(capitulos, [...prefixo, lance.san, r.san], dominio, noRepertorio)
    return { san: r.san, parte: r.parte, pontos: pontosDoLado(r, lado), total: r.total, ...cobertura }
  })
  return { san: lance.san, parte: lance.parte, total: lance.total, respostas, sugestao: escolherSugestao(respostas) }
}

export interface ItemDoPlano {
  contra: string
  /** Fração das partidas em que o adversário joga esse lance. */
  parte: number
  resposta: Resposta
  /** Domínio médio dos capítulos da resposta (0–100). */
  dominio: number
}

/** Plano: um item por lance do adversário, do mais urgente (frequente e pouco estudado) ao menos. */
export function planoDeEstudo(lances: LanceAdversario[]): ItemDoPlano[] {
  return lances
    .filter((l) => l.sugestao)
    .map((l) => {
      const caps = l.sugestao!.capitulos
      const dominio = caps.length ? caps.reduce((s, c) => s + c.dominio, 0) / caps.length : 0
      return { contra: l.san, parte: l.parte, resposta: l.sugestao!, dominio }
    })
    .sort((a, b) => b.parte * (100 - b.dominio) - a.parte * (100 - a.dominio))
}
