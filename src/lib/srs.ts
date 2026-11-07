import type { Cor } from './lances'

/** Unidade de revisão = linha (ou nota) + cor treinada (SPEC 5). */
export interface UnidadeRevisao {
  capitulo: string
  linha: string
  cor: Cor
}

export interface Cartao {
  repeticoes: number
  intervalo: number
  facilidade: number
  /** Datas locais no formato AAAA-MM-DD. */
  proxima: string
  criado: string
}

export type Nota = 5 | 3 | 1

const FACILIDADE_INICIAL = 2.5
const FACILIDADE_MINIMA = 1.3
/** Repetições seguidas a partir das quais a unidade conta como dominada (intervalo de 7d+). */
const REPETICOES_DOMINADO = 3

export function idCartao(unidade: UnidadeRevisao): string {
  return `${unidade.capitulo}/${unidade.linha}|${unidade.cor}`
}

export function dataLocal(data: Date = new Date()): string {
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${data.getFullYear()}-${mes}-${dia}`
}

export function somarDias(data: string, dias: number): string {
  const [ano, mes, dia] = data.split('-').map(Number)
  return dataLocal(new Date(ano, mes - 1, dia + dias))
}

export function notaDaPartida(erros: number, pistas: number): Nota {
  if (erros > 0) return 1
  return pistas > 0 ? 3 : 5
}

/** SM-2 simplificado com intervalos 1d → 3d → 7d → intervalo × facilidade. */
export function revisar(cartao: Cartao | undefined, nota: Nota, hoje: string): Cartao {
  const anterior = cartao ?? {
    repeticoes: 0,
    intervalo: 0,
    facilidade: FACILIDADE_INICIAL,
    proxima: hoje,
    criado: hoje,
  }

  const distancia = 5 - nota
  const facilidade = Math.max(
    FACILIDADE_MINIMA,
    anterior.facilidade + 0.1 - distancia * (0.08 + distancia * 0.02),
  )

  const repeticoes = nota < 3 ? 0 : anterior.repeticoes + 1
  let intervalo: number
  if (repeticoes <= 1) intervalo = 1
  else if (repeticoes === 2) intervalo = 3
  else if (repeticoes === 3) intervalo = 7
  else intervalo = Math.round(anterior.intervalo * facilidade)

  return { ...anterior, repeticoes, intervalo, facilidade, proxima: somarDias(hoje, intervalo) }
}

/**
 * Treinar fora do prazo não adianta a agenda: só um erro muda o cartão,
 * porque mostra que a linha foi esquecida antes da hora.
 */
export function aplicarResultado(cartao: Cartao | undefined, nota: Nota, hoje: string): Cartao {
  if (cartao && cartao.proxima > hoje && nota !== 1) return cartao
  return revisar(cartao, nota, hoje)
}

export function estaPendente(cartao: Cartao | undefined, hoje: string): boolean {
  return cartao !== undefined && cartao.proxima <= hoje
}

export function estaDominado(cartao: Cartao | undefined): boolean {
  return cartao !== undefined && cartao.repeticoes >= REPETICOES_DOMINADO
}

export interface Fila {
  pendentes: UnidadeRevisao[]
  novas: UnidadeRevisao[]
}

/** Revisões vencidas (as mais atrasadas primeiro) + novas até o limite diário. */
export function filaDoDia(
  unidades: UnidadeRevisao[],
  cartoes: Record<string, Cartao>,
  hoje: string,
  limiteNovas: number,
): Fila {
  const criadasHoje = Object.values(cartoes).filter((cartao) => cartao.criado === hoje).length
  const vagas = Math.max(0, limiteNovas - criadasHoje)

  const pendentes = unidades
    .filter((unidade) => estaPendente(cartoes[idCartao(unidade)], hoje))
    .sort((a, b) =>
      cartoes[idCartao(a)].proxima.localeCompare(cartoes[idCartao(b)].proxima),
    )
  const novas = unidades.filter((unidade) => !cartoes[idCartao(unidade)]).slice(0, vagas)

  return { pendentes, novas }
}
