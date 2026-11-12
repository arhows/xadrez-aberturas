import type { CapituloCarregado } from './capitulos'
import { analisarPartida, type PartidaAnalisada } from './partidas'

/** Liga as partidas importadas ao repertório: reanálise, resumo por abertura e contagem por posição. */

/**
 * Identifica o repertório: muda quando entra uma abertura ou quando um capítulo ganha
 * colunas ou notas. Hash curto, porque fica guardado no progresso (e na nuvem).
 */
export function assinaturaDoRepertorio(capitulos: CapituloCarregado[]): string {
  const texto = capitulos
    .map((c) => `${c.capitulo.id}:${c.capitulo.linhas.length}:${c.capitulo.notas?.length ?? 0}`)
    .sort()
    .join('|')
  let h = 5381
  for (let i = 0; i < texto.length; i++) h = ((h << 5) + h + texto.charCodeAt(i)) >>> 0
  return h.toString(36)
}

/** Analisa de novo, com o repertório atual, uma partida que guardou os lances. */
export function reanalisar(partida: PartidaAnalisada, capitulos: CapituloCarregado[]): PartidaAnalisada | null {
  if (!partida.lances) return null
  const voce = 'Você'
  const nova = analisarPartida(
    {
      id: partida.id,
      site: partida.site,
      url: partida.url,
      data: partida.data,
      brancas: partida.cor === 'w' ? voce : partida.adversario,
      pretas: partida.cor === 'w' ? partida.adversario : voce,
      resultado: partida.resultado,
      sans: partida.lances.split(' '),
    },
    partida.cor,
    capitulos,
  )
  return nova
}

/**
 * Se o repertório mudou desde a última análise, analisa de novo todas as partidas que têm
 * os lances guardados. Devolve quantas mudaram de abertura (ex.: entraram no repertório).
 * Não soma erros no Treino: isso só vale para partidas novas, na importação.
 */
export function atualizarAnalises(
  partidas: { analisadas: Record<string, PartidaAnalisada>; assinatura?: string },
  capitulos: CapituloCarregado[],
): number {
  const assinatura = assinaturaDoRepertorio(capitulos)
  if (partidas.assinatura === assinatura) return 0
  let mudaram = 0
  for (const [id, partida] of Object.entries(partidas.analisadas)) {
    const nova = reanalisar(partida, capitulos)
    if (!nova) continue
    if (nova.capitulo !== partida.capitulo) mudaram++
    partidas.analisadas[id] = nova
  }
  partidas.assinatura = assinatura
  return mudaram
}

export type Placar = { vitorias: number; empates: number; derrotas: number }

export function resultadoParaVoce(partida: PartidaAnalisada): keyof Placar {
  if (partida.resultado === '½-½' || partida.resultado === '*') return 'empates'
  return (partida.resultado === '1-0') === (partida.cor === 'w') ? 'vitorias' : 'derrotas'
}

/** Pontos por partida (vitória 1, empate ½), em %. */
export function aproveitamento(placar: Placar): number {
  const total = placar.vitorias + placar.empates + placar.derrotas
  return total ? Math.round(((placar.vitorias + placar.empates / 2) / total) * 100) : 0
}

export interface ResumoAbertura {
  capitulo: string
  partidas: PartidaAnalisada[]
  placar: Placar
  /** Média de meios-lances seguindo o livro. */
  mediaNoLivro: number
  /** Partidas em que foi você quem saiu do livro. */
  desviosSeus: number
}

export function resumoPorAbertura(partidas: PartidaAnalisada[]): ResumoAbertura[] {
  const grupos = new Map<string, PartidaAnalisada[]>()
  for (const p of partidas) if (p.capitulo) grupos.set(p.capitulo, [...(grupos.get(p.capitulo) ?? []), p])
  return [...grupos]
    .map(([capitulo, lista]) => {
      const placar: Placar = { vitorias: 0, empates: 0, derrotas: 0 }
      for (const p of lista) placar[resultadoParaVoce(p)]++
      return {
        capitulo,
        partidas: lista,
        placar,
        mediaNoLivro: Math.round(lista.reduce((soma, p) => soma + p.noLivro, 0) / lista.length),
        desviosSeus: lista.filter((p) => p.desvio?.quem === 'voce').length,
      }
    })
    .sort((a, b) => b.partidas.length - a.partidas.length)
}

export interface LanceNasPartidas {
  san: string
  total: number
  placar: Placar
}

/**
 * Índice "lances até aqui" → lances jogados em seguida nas suas partidas. Usa os lances
 * guardados; nas partidas antigas, só o trecho conhecido até o desvio.
 */
export function indiceDePosicoes(partidas: PartidaAnalisada[]): Map<string, LanceNasPartidas[]> {
  const indice = new Map<string, Map<string, LanceNasPartidas>>()
  for (const p of partidas) {
    const sans = p.lances
      ? p.lances.split(' ')
      : p.desvio
        ? [...p.desvio.caminho, p.desvio.jogado]
        : p.fora
          ? [...p.fora.caminho, p.fora.jogado]
          : []
    const resultado = resultadoParaVoce(p)
    for (let i = 0; i < sans.length; i++) {
      const chave = sans.slice(0, i).join(' ')
      const lances = indice.get(chave) ?? new Map<string, LanceNasPartidas>()
      const lance = lances.get(sans[i]) ?? { san: sans[i], total: 0, placar: { vitorias: 0, empates: 0, derrotas: 0 } }
      lance.total++
      lance.placar[resultado]++
      lances.set(sans[i], lance)
      indice.set(chave, lances)
    }
  }
  return new Map([...indice].map(([chave, lances]) => [chave, [...lances.values()].sort((a, b) => b.total - a.total)]))
}
