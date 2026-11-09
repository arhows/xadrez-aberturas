<script setup lang="ts">
import { fmtTexto } from '../lib/formato'

/**
 * Retorno de cada lance (Treino, Exercícios) e notas do livro. Certo e errado nunca dependem
 * só da cor: têm ✓/✗ e a palavra. Notas e dicas usam o bloco de dica.
 */
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
  <article v-if="tipo === 'nota'" class="bloco-dica">
    <strong v-if="lance" class="lance">{{ lance }}</strong>
    <p v-if="texto">{{ fmtTexto(texto) }}</p>
    <slot />
  </article>
  <article v-else class="retorno" :class="[tipo, { 'sem-marca': tipo === 'neutro' }]" role="status">
    <span v-if="tipo !== 'neutro'" class="marca-retorno" aria-hidden="true">{{ tipo === 'certo' ? '✓' : '✗' }}</span>
    <span v-if="tipo !== 'neutro' || lance" class="titulo">
      <template v-if="tipo === 'certo'">Certo<template v-if="lance">: </template></template>
      <template v-else-if="tipo === 'errado'">Errado<template v-if="lance">: </template></template>
      <span v-if="lance" class="lance">{{ lance }}</span>
    </span>
    <div v-if="texto || $slots.default" class="detalhe">
      <template v-if="texto">{{ fmtTexto(texto) }}</template>
      <slot />
    </div>
  </article>
</template>

<style scoped>
.retorno,
.bloco-dica {
  overflow-wrap: anywhere;
}
.retorno.sem-marca {
  grid-template-columns: minmax(0, 1fr);
}
.retorno .detalhe {
  grid-column: -2;
}
.bloco-dica .lance {
  display: block;
}
p {
  margin: 0.25rem 0 0;
}
.bloco-dica > :first-child {
  margin-top: 0;
}
</style>
