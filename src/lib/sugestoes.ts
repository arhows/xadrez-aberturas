import type { EscolhaCor } from './escopo'
import type { Cor } from './lances'
import type { PartidaAnalisada } from './partidas'
import { aproveitamento, resultadoParaVoce, type Placar } from './partidasRepertorio'

/**
 * Sugestões de estudo tiradas das partidas importadas (lichess, chess.com, PGN):
 * - adicionar: abertura que você joga bastante e não está no seu repertório;
 * - cor: abertura do repertório que você joga com a cor que não treina;
 * - treinar: posição do livro em que você saiu dele mais de uma vez.
 */
export interface SugestaoAdicionar {
  tipo: 'adicionar'
  chave: string
  capitulo: string
  partidas: number
  /** Cor com que você joga a abertura (ou as duas, se nenhuma passa de 3/4 das partidas). */
  cor: EscolhaCor
  aproveitamento: number
}
export interface SugestaoCor {
  tipo: 'cor'
  chave: string
  capitulo: string
  /** A cor que você joga e não treina. */
  cor: Cor
  partidas: number
}
export interface SugestaoTreinar {
  tipo: 'treinar'
  chave: string
  capitulo: string
  vezes: number
  caminho: string[]
  jogado: string
  livro: string
  /** Linhas e notas do livro que seguem o lance certo (a tela escolhe uma coluna para treinar). */
  linhas: string[]
}
export type Sugestao = SugestaoAdicionar | SugestaoCor | SugestaoTreinar

export interface ContextoDoRepertorio {
  repertorioEscolhido: boolean
  noRepertorio: (capitulo: string) => boolean
  corTreinada: (capitulo: string) => EscolhaCor
}

/** Partidas mínimas para sugerir uma abertura ou uma cor; desvios repetidos a partir de 2. */
export const MINIMO_DE_PARTIDAS = 3
export const MINIMO_DE_DESVIOS = 2
const MAXIMO_POR_TIPO = 3

function agrupar<T>(lista: T[], chave: (item: T) => string): Map<string, T[]> {
  const grupos = new Map<string, T[]>()
  for (const item of lista) grupos.set(chave(item), [...(grupos.get(chave(item)) ?? []), item])
  return grupos
}

export function sugestoesDasPartidas(partidas: PartidaAnalisada[], contexto: ContextoDoRepertorio): Sugestao[] {
  const comAbertura = partidas.filter((p) => p.capitulo)
  const porCapitulo = agrupar(comAbertura, (p) => p.capitulo!)
  const conta = (id: string) => !contexto.repertorioEscolhido || contexto.noRepertorio(id)

  const adicionar: SugestaoAdicionar[] = []
  const cor: SugestaoCor[] = []
  for (const [capitulo, lista] of porCapitulo) {
    const brancas = lista.filter((p) => p.cor === 'w').length
    const pretas = lista.length - brancas
    // Sem repertório escolhido, as aberturas que você mais joga são o melhor ponto de partida.
    if (!contexto.noRepertorio(capitulo)) {
      if (lista.length < MINIMO_DE_PARTIDAS) continue
      const placar: Placar = { vitorias: 0, empates: 0, derrotas: 0 }
      for (const p of lista) placar[resultadoParaVoce(p)]++
      adicionar.push({
        tipo: 'adicionar',
        chave: `adicionar:${capitulo}`,
        capitulo,
        partidas: lista.length,
        cor: brancas >= lista.length * 0.75 ? 'w' : pretas >= lista.length * 0.75 ? 'b' : 'ambas',
        aproveitamento: aproveitamento(placar),
      })
    } else if (contexto.repertorioEscolhido) {
      const treinada = contexto.corTreinada(capitulo)
      if (treinada === 'ambas') continue
      const outra: Cor = treinada === 'w' ? 'b' : 'w'
      const naOutra = outra === 'w' ? brancas : pretas
      if (naOutra >= MINIMO_DE_PARTIDAS && naOutra * 2 >= lista.length) {
        cor.push({ tipo: 'cor', chave: `cor:${capitulo}:${outra}`, capitulo, cor: outra, partidas: naOutra })
      }
    }
  }

  const desvios = comAbertura.filter((p) => conta(p.capitulo!) && p.desvio?.quem === 'voce' && p.desvio.aresta?.linhas.length)
  const treinar: SugestaoTreinar[] = []
  for (const [chave, lista] of agrupar(desvios, (p) => `${p.capitulo}|${p.desvio!.caminho.join(' ')}|${p.desvio!.jogado}`)) {
    if (lista.length < MINIMO_DE_DESVIOS) continue
    const { desvio, capitulo } = lista[0]
    treinar.push({
      tipo: 'treinar',
      chave: `treinar:${chave}`,
      capitulo: capitulo!,
      vezes: lista.length,
      caminho: desvio!.caminho,
      jogado: desvio!.jogado,
      livro: desvio!.aresta!.san,
      linhas: desvio!.aresta!.linhas,
    })
  }

  const maiores = <T extends { partidas?: number; vezes?: number }>(lista: T[]) =>
    lista.sort((a, b) => (b.partidas ?? b.vezes ?? 0) - (a.partidas ?? a.vezes ?? 0)).slice(0, MAXIMO_POR_TIPO)
  return [...maiores(treinar), ...maiores(adicionar), ...maiores(cor)]
}
