<script setup lang="ts">
import { fmtTexto } from '../lib/formato'

defineProps<{ plano?: { brancas: string; pretas: string } | null }>()
</script>

<template>
  <section v-if="plano" class="plano" aria-label="Plano para o meio-jogo">
    <h3>Plano para o meio-jogo</h3>
    <p><strong>Brancas:</strong> {{ fmtTexto(plano.brancas) }}</p>
    <p><strong>Pretas:</strong> {{ fmtTexto(plano.pretas) }}</p>
    <p class="origem">Comentário do app, conferido com o Stockfish</p>
  </section>
</template>

<style scoped>
.plano {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--borda);
}
h3 {
  margin: 0 0 0.375rem;
  font-size: 1rem;
}
p {
  margin: 0.25rem 0;
}
.origem {
  color: var(--texto-suave);
  font-size: 0.8125rem;
}
</style>
