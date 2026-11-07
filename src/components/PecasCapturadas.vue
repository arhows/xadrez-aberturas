<script setup lang="ts">
import { computed } from 'vue'
import type { Cor } from '../lib/lances'
import { materialDaPosicao } from '../lib/material'

const props = defineProps<{ fen: string; lado: Cor }>()

// Símbolos das peças capturadas, que são da cor oposta à do lado.
const SIMBOLOS: Record<Cor, Record<string, string>> = {
  w: { q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' },
  b: { q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' },
}

const material = computed(() => materialDaPosicao(props.fen))
const pecas = computed(() =>
  material.value.capturadas[props.lado].map((peca) => SIMBOLOS[props.lado === 'w' ? 'b' : 'w'][peca]),
)
const vantagem = computed(() => (props.lado === 'w' ? 1 : -1) * material.value.saldo)
const descricao = computed(() => {
  const nome = props.lado === 'w' ? 'Brancas' : 'Pretas'
  const total = material.value.capturadas[props.lado].length
  return `${nome}: ${total} ${total === 1 ? 'peça capturada' : 'peças capturadas'}${vantagem.value > 0 ? `, +${vantagem.value} de material` : ''}`
})
</script>

<template>
  <p class="capturadas" :aria-label="descricao" :title="descricao">
    <span class="pecas">{{ pecas.join('') }}</span>
    <span v-if="vantagem > 0" class="vantagem">+{{ vantagem }}</span>
  </p>
</template>

<style scoped>
.capturadas {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 1.75rem;
  margin: 0;
  padding: 0 0.25rem;
  line-height: 1;
}
.pecas {
  font-size: 1.25rem;
  letter-spacing: -0.15em;
  color: var(--texto);
}
.vantagem {
  color: var(--texto-suave);
  font-size: 0.875rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
</style>
