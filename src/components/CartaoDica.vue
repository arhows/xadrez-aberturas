<script setup lang="ts">
import { fmtTexto } from '../lib/formato'

withDefaults(
  defineProps<{
    lance?: string
    texto?: string | null
    tipo?: 'neutro' | 'certo' | 'errado' | 'nota'
  }>(),
  { tipo: 'neutro' },
)
</script>

<template>
  <article class="dica" :class="tipo">
    <strong v-if="lance" class="lance">{{ lance }}</strong>
    <p v-if="texto">{{ fmtTexto(texto) }}</p>
    <slot />
  </article>
</template>

<style scoped>
.dica {
  padding: 0.75rem 1rem;
  border-left: 4px solid var(--borda);
  border-radius: 8px;
  background: var(--superficie);
  overflow-wrap: anywhere;
}
.lance {
  font-size: 1.125rem;
}
p {
  margin: 0.25rem 0 0;
}
.certo {
  border-color: var(--ok);
}
.errado {
  border-color: var(--erro);
}
.nota {
  border-color: var(--aviso);
}
</style>
