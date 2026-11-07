<script setup lang="ts">
import type { Xeque } from '../lib/taticas'
import CartaoDica from './CartaoDica.vue'

defineProps<{ xeque?: Xeque | null }>()

const TITULO: Record<Xeque['tipo'], string> = {
  xeque: 'Xeque',
  'xeque-descoberto': 'Xeque descoberto',
  'xeque-duplo': 'Xeque duplo',
}
</script>

<template>
  <CartaoDica
    v-if="xeque"
    tipo="errado"
    :lance="TITULO[xeque.tipo]"
    :texto="xeque.texto.replace(/^[^:]+: /, '')"
  >
    <p class="origem">Seta vermelha da peça que dá xeque até o rei</p>
  </CartaoDica>
</template>

<style scoped>
.origem {
  margin: 0.25rem 0 0;
  color: var(--texto-suave);
  font-size: 0.8125rem;
}
</style>
