<script setup lang="ts">
import type { Aresta } from '../lib/arvore'
import { fmtSan } from '../lib/formato'
import CartaoDica from './CartaoDica.vue'

defineProps<{ aresta?: Aresta | null }>()
</script>

<template>
  <CartaoDica
    v-if="aresta?.ameaca"
    tipo="errado"
    :lance="`Ameaça: ${fmtSan(aresta.ameaca.san)}`"
    :texto="aresta.ameaca.texto"
  >
    <p class="origem">Comentário do app, seta vermelha no tabuleiro</p>
  </CartaoDica>
  <CartaoDica
    v-for="armadilha in aresta?.armadilhas ?? []"
    :key="armadilha.id"
    tipo="nota"
    :lance="`Armadilha: ${armadilha.titulo}`"
    :texto="armadilha.texto"
  >
    <p class="origem">Comentário do app, lances do livro</p>
  </CartaoDica>
</template>

<style scoped>
.origem {
  margin: 0.25rem 0 0;
  color: var(--texto-suave);
  font-size: 0.875rem;
}
</style>
