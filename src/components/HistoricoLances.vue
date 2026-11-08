<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { fmtSan } from '../lib/formato'

const props = withDefaults(
  defineProps<{
    /** Lances em SAN desde o primeiro (ply 1 = 1.e4). */
    lances: string[]
    /** Ply da posição mostrada no tabuleiro; 0 = posição inicial. */
    atual: number
    /** Com clique, cada lance leva àquela posição. */
    clicavel?: boolean
  }>(),
  { clicavel: false },
)

const emit = defineEmits<{ ir: [ply: number] }>()

const pares = computed(() => {
  const linhas: { numero: number; brancas?: number; pretas?: number }[] = []
  props.lances.forEach((_, i) => {
    const ply = i + 1
    if (ply % 2 === 1) linhas.push({ numero: (ply + 1) / 2, brancas: ply })
    else if (linhas.length) linhas[linhas.length - 1].pretas = ply
    else linhas.push({ numero: 1, pretas: ply })
  })
  return linhas
})

const lista = ref<HTMLElement>()

// Mantém o lance atual visível dentro da lista, sem rolar a página.
watch(
  () => [props.atual, props.lances.length],
  async () => {
    await nextTick()
    const caixa = lista.value
    const atual = caixa?.querySelector<HTMLElement>('.atual')
    if (!caixa) return
    if (!atual) {
      if (props.atual === 0) caixa.scrollTop = 0
      return
    }
    const limites = caixa.getBoundingClientRect()
    const posicao = atual.getBoundingClientRect()
    if (posicao.top < limites.top) caixa.scrollTop -= limites.top - posicao.top
    else if (posicao.bottom > limites.bottom) caixa.scrollTop += posicao.bottom - limites.bottom
  },
  { immediate: true },
)

function classe(ply: number) {
  return { atual: ply === props.atual, futuro: ply > props.atual }
}
</script>

<template>
  <section v-if="lances.length" class="historico" aria-label="Histórico de lances">
    <ol ref="lista">
      <li v-for="par in pares" :key="par.numero">
        <span class="numero">{{ par.numero }}</span>
        <template v-for="ply in [par.brancas, par.pretas]" :key="ply ?? 'vazio'">
          <button
            v-if="ply && clicavel"
            type="button"
            class="lance"
            :class="classe(ply)"
            :aria-current="ply === atual ? 'step' : undefined"
            @click="emit('ir', ply)"
          >{{ fmtSan(lances[ply - 1]) }}</button>
          <span v-else-if="ply" class="lance" :class="classe(ply)">{{ fmtSan(lances[ply - 1]) }}</span>
          <span v-else class="lance vazio">{{ par.brancas ? '' : '…' }}</span>
        </template>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.historico {
  border: 1px solid var(--borda);
  border-radius: 8px;
  overflow: hidden;
}
ol {
  max-height: 12.5rem;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  list-style: none;
}
li {
  display: grid;
  grid-template-columns: 2.75rem 1fr 1fr;
}
li:nth-child(even) {
  background: color-mix(in srgb, var(--borda) 30%, transparent);
}
.numero {
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--borda);
  color: var(--texto-suave);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
}
.lance {
  display: flex;
  align-items: center;
  min-height: 2rem;
  padding: 0 0.625rem;
  border: 0;
  background: none;
  color: var(--texto);
  font: inherit;
  text-align: left;
}
button.lance {
  cursor: pointer;
}
button.lance:hover {
  background: color-mix(in srgb, var(--borda) 60%, transparent);
}
.lance.futuro {
  color: var(--texto-suave);
  opacity: 0.6;
}
.lance.atual,
button.lance.atual:hover {
  background: var(--destaque);
  color: var(--sobre-destaque);
  font-weight: 600;
  opacity: 1;
}
.lance.vazio {
  color: var(--texto-suave);
}
@media (max-width: 720px) {
  ol {
    max-height: 8.5rem;
  }
}
</style>
