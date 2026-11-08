import type { ConjuntoExercicios } from './exercicios'
import { progresso } from './progresso'
import { aplicarResultado, dataLocal, type Nota } from './srs'

/**
 * Repetição espaçada dos exercícios. Só entram na revisão os problemas errados ou resolvidos
 * com pista: um problema resolvido de primeira na primeira vez não volta. Depois de entrar, o
 * cartão segue o mesmo SM-2 das aberturas (1 → 3 → 7 dias → intervalo × facilidade).
 */

export const chaveExercicio = (conjunto: string, n: number) => `${conjunto}/${n}`

/** 5 = de primeira, 3 = com pista, 1 = com erro. */
export function notaDoExercicio(erros: number, usouPista: boolean): Nota {
  if (erros > 0) return 1
  return usouPista ? 3 : 5
}

export function registrarResultado(conjunto: string, n: number, nota: Nota, hoje = dataLocal()): void {
  const chave = chaveExercicio(conjunto, n)
  const cartao = progresso.cartoesExercicios[chave]
  if (!cartao && nota === 5) return
  progresso.cartoesExercicios[chave] = aplicarResultado(cartao, nota, hoje)
}

export interface Revisao {
  conjunto: string
  n: number
  proxima: string
}

/** Problemas com revisão vencida, dos mais atrasados aos mais recentes. */
export function revisoesPendentes(conjuntos: ConjuntoExercicios[], hoje = dataLocal()): Revisao[] {
  const existentes = new Set(conjuntos.flatMap((c) => c.problemas.map((p) => chaveExercicio(c.id, p.n))))
  const ordem = new Map(conjuntos.map((c, i) => [c.id, i]))
  return Object.entries(progresso.cartoesExercicios)
    .filter(([chave, cartao]) => cartao.proxima <= hoje && existentes.has(chave))
    .map(([chave, cartao]) => {
      const separador = chave.lastIndexOf('/')
      return { conjunto: chave.slice(0, separador), n: Number(chave.slice(separador + 1)), proxima: cartao.proxima }
    })
    .sort(
      (a, b) =>
        a.proxima.localeCompare(b.proxima) ||
        (ordem.get(a.conjunto) ?? 0) - (ordem.get(b.conjunto) ?? 0) ||
        a.n - b.n,
    )
}
