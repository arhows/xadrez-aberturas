import { useRoute, type RouteLocationRaw } from 'vue-router'

/** Telas de seção para onde o "voltar" de uma lista pode levar, com o nome mostrado no link. */
const ORIGENS: Record<string, string> = {
  '/': 'Início',
  '/aprender': 'Aprender',
  '/praticar': 'Praticar',
  '/jogar': 'Jogar',
  '/eu': 'Eu',
  '/exercicios': 'Táticas e mates',
}

/** Origem lembrada por rota: ao voltar de uma tela interna (ex.: a abertura), a lista ainda sabe de onde veio. */
const lembradas: Record<string, string> = {}

/**
 * Para onde vai o "voltar" de uma tela alcançável de várias seções (ex.: Aberturas, por Aprender ou por
 * Praticar). Usa a tela anterior do histórico quando ela é uma seção; senão, a última origem lembrada;
 * senão, o padrão. Com `lembrar: false` (telas de exercício, que se abrem de muitos lugares) só vale a
 * tela imediatamente anterior, ou a origem da sequência quando se vem da mesma tela (ex.: um treino
 * encadeado no seguinte).
 */
export function useVolta(padrao: string): { para: string; nome: string }
export function useVolta(
  padrao: RouteLocationRaw,
  opcoes: { nome: string; lembrar?: boolean },
): { para: RouteLocationRaw; nome: string }
export function useVolta(padrao: RouteLocationRaw, opcoes?: { nome: string; lembrar?: boolean }) {
  const rota = useRoute()
  const chave = String(rota.name ?? rota.path)
  const anterior = (window.history.state as { back?: unknown } | null)?.back
  const daSecao = typeof anterior === 'string' && anterior in ORIGENS ? anterior : undefined
  const lembrar = opcoes?.lembrar ?? true
  if (daSecao) lembradas[chave] = daSecao
  const base = rota.matched[0]?.path.split(':')[0]
  const daMesmaTela = !!base && typeof anterior === 'string' && anterior.split('?')[0].startsWith(base)
  if (!daSecao && !lembrar && !daMesmaTela) delete lembradas[chave]
  const origem = daSecao ?? (lembrar || daMesmaTela ? lembradas[chave] : undefined)
  if (origem) return { para: origem, nome: ORIGENS[origem] }
  return { para: padrao, nome: opcoes?.nome ?? (typeof padrao === 'string' ? ORIGENS[padrao] : undefined) ?? 'Voltar' }
}
