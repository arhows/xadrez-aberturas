import { computed } from 'vue'
import { obterCapitulos, type CapituloCarregado } from './capitulos'
import { planoDeRevisao } from './escopo'
import { progresso } from './progresso'
import { dataLocal, estaDominado, estaPendente, idCartao } from './srs'
import type { Linha } from './tipos'

/** Resumos de progresso das aberturas, usados no início, na lista e na página de cada uma. */

const cartoesDe = (capitulo: CapituloCarregado, linha: string) =>
  (['w', 'b'] as const).map((cor) => progresso.cartoes[idCartao({ capitulo: capitulo.capitulo.id, linha, cor })])

/** Dominar a linha é dominar as duas cores; cada cor vale metade. */
export function percentualLinha(capitulo: CapituloCarregado, linha: Linha): number {
  const dominadas = cartoesDe(capitulo, linha.id).filter(estaDominado).length
  return (dominadas / 2) * 100
}

export function percentual(capitulo: CapituloCarregado, linhas: Linha[] = capitulo.capitulo.linhas): number {
  if (!linhas.length) return 0
  const soma = linhas.reduce((total, linha) => total + percentualLinha(capitulo, linha), 0)
  return Math.round(soma / linhas.length)
}

export function revisoesDaLinha(capitulo: CapituloCarregado, linha: Linha): string {
  const cartoes = cartoesDe(capitulo, linha.id).filter((c) => c !== undefined)
  if (!cartoes.length) return 'Nova'
  if (cartoes.some((cartao) => estaPendente(cartao, dataLocal()))) return 'Revisar hoje'
  const proxima = cartoes.map((cartao) => cartao.proxima).sort()[0]
  const [, mes, dia] = proxima.split('-')
  return `Revisão em ${dia}/${mes}`
}

/** Tamanho da fila de hoje em cada capítulo (revisões vencidas + linhas novas do dia). */
export const filasDeHoje = computed(() =>
  planoDeRevisao(
    obterCapitulos(),
    {
      cartoes: progresso.cartoes,
      notasConferidas: progresso.notasConferidas,
      corPorCapitulo: progresso.corPorCapitulo,
      profundidade: progresso.config.profundidade,
      novasPorDia: progresso.config.novasPorDia,
    },
    dataLocal(),
  ).map((plano) => ({ id: plano.capitulo.capitulo.id, total: plano.fila.length })),
)

export const filaDoCapitulo = (id: string) => filasDeHoje.value.find((fila) => fila.id === id)?.total ?? 0
export const proximaFila = computed(() => filasDeHoje.value.find((fila) => fila.total > 0))
export const totalRevisoes = computed(() => filasDeHoje.value.reduce((soma, fila) => soma + fila.total, 0))
