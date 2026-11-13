import type { ConjuntoExercicios, Problema } from './exercicios'
import type { EstadoExercicio } from './progresso'
import { somarDias } from './srs'

/**
 * Exercícios do dia e Sequência: táticas do lichess e mates em 1 a 4 misturados. Treinar temas
 * diferentes em sequência obriga a reconhecer o padrão em vez de já saber qual procurar.
 * Os exercícios de estratégia dos livros (Grooten, Koblenz) ficam de fora: pedem planos, não um
 * cálculo rápido.
 */

export interface ItemMisturado {
  conjunto: ConjuntoExercicios
  problema: Problema
  /** Dificuldade aproximada: o rating do lichess nas táticas, uma estimativa pelo livro nos mates. */
  rating: number
}

/** Mates não têm rating: estimativa por livro e número de lances. */
export function ratingDoMate(conjunto: ConjuntoExercicios): number {
  const cicero = conjunto.id.startsWith('cicero')
  return { 1: cicero ? 900 : 750, 2: cicero ? 1450 : 1250, 3: cicero ? 1850 : 1650, 4: 2050 }[conjunto.lances] ?? 1500
}

const ehDeLivro = (conjunto: ConjuntoExercicios) => !!conjunto.tema && conjunto.problemas.every((p) => p.rating === undefined)

/** Todos os exercícios que entram na mistura, com a dificuldade de cada um. */
export function itensMisturados(conjuntos: ConjuntoExercicios[]): ItemMisturado[] {
  const itens: ItemMisturado[] = []
  for (const conjunto of conjuntos) {
    if (conjunto.tipo === 'tatica') {
      if (ehDeLivro(conjunto)) continue
      for (const problema of conjunto.problemas) if (problema.rating && problema.linha?.length) itens.push({ conjunto, problema, rating: problema.rating })
    } else if (conjunto.lances >= 1 && conjunto.lances <= 4) {
      const rating = ratingDoMate(conjunto)
      for (const problema of conjunto.problemas) itens.push({ conjunto, problema, rating })
    }
  }
  return itens
}

export const chaveDoItem = (item: ItemMisturado) => `${item.conjunto.id}/${item.problema.n}`
export const ehMate = (item: ItemMisturado) => item.conjunto.tipo !== 'tatica'

/** Gerador pseudoaleatório com semente (mulberry32): a mesma data dá a mesma série. */
export function aleatorioComSemente(texto: string): () => number {
  let semente = 0
  for (const letra of texto) semente = (Math.imul(semente, 31) + letra.charCodeAt(0)) | 0
  return () => {
    semente = (semente + 0x6d2b79f5) | 0
    let t = Math.imul(semente ^ (semente >>> 15), 1 | semente)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const escolher = <T>(lista: T[], aleatorio: () => number): T => lista[Math.floor(aleatorio() * lista.length)]

/** Táticas da série, em ratings crescentes; os mates entram um de cada (1, 2, 3 e 4 lances). */
const RATINGS_DA_SERIE = [900, 1150, 1350, 1550, 1750, 1950]
export const TAMANHO_DA_SERIE = RATINGS_DA_SERIE.length + 4

/**
 * A série do dia: 6 táticas de temas diferentes e um mate de cada tamanho, embaralhados.
 * Depende só da data (e dos dados do app), então é a mesma em todos os aparelhos.
 */
export function serieDoDia(conjuntos: ConjuntoExercicios[], data: string): ItemMisturado[] {
  const aleatorio = aleatorioComSemente(`serie-${data}`)
  const itens = itensMisturados(conjuntos)
  const serie: ItemMisturado[] = []
  const temasUsados = new Set<string>()
  for (const alvo of RATINGS_DA_SERIE) {
    const perto = itens.filter((i) => !ehMate(i) && !temasUsados.has(i.conjunto.id) && Math.abs(i.rating - alvo) <= 100)
    if (!perto.length) continue
    const item = escolher(perto, aleatorio)
    temasUsados.add(item.conjunto.id)
    serie.push(item)
  }
  for (const lances of [1, 2, 3, 4]) {
    const mates = itens.filter((i) => ehMate(i) && i.conjunto.lances === lances)
    if (mates.length) serie.push(escolher(mates, aleatorio))
  }
  // Embaralha (Fisher–Yates) para os temas não virem em blocos.
  for (let i = serie.length - 1; i > 0; i--) {
    const j = Math.floor(aleatorio() * (i + 1))
    ;[serie[i], serie[j]] = [serie[j], serie[i]]
  }
  return serie
}

/** Rating alvo do n-ésimo exercício da Sequência (0 = o primeiro): começa fácil e sobe. */
export function ratingDaSequencia(n: number): number {
  return Math.min(2500, 700 + n * 50)
}

/**
 * Próximo exercício da Sequência, perto do rating alvo e sem repetir os já vistos. Mais ou
 * menos um em cada três é mate, quando há mate dessa dificuldade.
 */
export function proximoDaSequencia(
  itens: ItemMisturado[],
  n: number,
  vistos: Set<string>,
  aleatorio: () => number = Math.random,
  anterior?: ItemMisturado,
): ItemMisturado | null {
  const alvo = ratingDaSequencia(n)
  for (const janela of [100, 200, 400, 3000]) {
    const perto = itens.filter((i) => Math.abs(i.rating - alvo) <= janela && !vistos.has(chaveDoItem(i)))
    if (!perto.length) continue
    const mates = perto.filter(ehMate)
    // Táticas de outro tema que o anterior, para variar o padrão.
    const taticas = perto.filter((i) => !ehMate(i) && i.conjunto.id !== anterior?.conjunto.id)
    const lista = mates.length && (aleatorio() < 0.33 || !taticas.length) ? mates : taticas.length ? taticas : perto
    return escolher(lista, aleatorio)
  }
  return null
}

/** Resultado de cada exercício da série de um dia, pela posição na série ("0" a "9"). */
export type SerieDoDia = Record<string, EstadoExercicio>

export function serieCompleta(feitos: SerieDoDia | undefined, tamanho = TAMANHO_DA_SERIE): boolean {
  return Object.keys(feitos ?? {}).length >= tamanho
}

/**
 * Dias seguidos com a série completa, contando até hoje; se a de hoje ainda não acabou, a
 * contagem vem até ontem (o dia ainda não está perdido).
 */
export function diasSeguidos(diario: Record<string, SerieDoDia>, hoje: string): number {
  let dia = serieCompleta(diario[hoje]) ? hoje : somarDias(hoje, -1)
  let total = 0
  while (serieCompleta(diario[dia])) {
    total++
    dia = somarDias(dia, -1)
  }
  return total
}

/** Junta o diário de dois aparelhos: resolvido de primeira em algum deles vale de primeira. */
export function juntarDiario(a: Record<string, SerieDoDia>, b: Record<string, SerieDoDia>): Record<string, SerieDoDia> {
  const saida: Record<string, SerieDoDia> = { ...a }
  for (const [dia, feitos] of Object.entries(b)) {
    const juntos: SerieDoDia = { ...(saida[dia] ?? {}) }
    for (const [i, estado] of Object.entries(feitos)) juntos[i] = juntos[i] === 'primeira' || estado === 'primeira' ? 'primeira' : 'ajuda'
    saida[dia] = juntos
  }
  return saida
}
