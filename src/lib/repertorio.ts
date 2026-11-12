import { computed } from 'vue'
import type { CapituloCarregado } from './capitulos'
import { progresso } from './progresso'

/** O repertório pessoal: as aberturas que a pessoa joga, de onde saem as revisões e as linhas novas. */

/** A pessoa já escolheu alguma abertura? Sem escolha, tudo conta (como antes desta opção existir). */
export const repertorioEscolhido = computed(() => progresso.repertorio.capitulos.length > 0)

const conjunto = computed(() => new Set(progresso.repertorio.capitulos))

export function estaNoRepertorio(id: string): boolean {
  return conjunto.value.has(id)
}

/** Capítulos que contam para revisão, painel e Início: os do repertório, ou todos sem escolha. */
export function capitulosDoRepertorio(capitulos: CapituloCarregado[]): CapituloCarregado[] {
  return repertorioEscolhido.value ? capitulos.filter((c) => estaNoRepertorio(c.capitulo.id)) : capitulos
}

export function alternarRepertorio(id: string, agora = new Date()): void {
  const atual = progresso.repertorio.capitulos
  progresso.repertorio = {
    capitulos: atual.includes(id) ? atual.filter((c) => c !== id) : [...atual, id],
    atualizado: agora.toISOString(),
  }
}
