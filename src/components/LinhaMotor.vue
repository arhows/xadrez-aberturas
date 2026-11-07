<script setup lang="ts">
import { computed } from 'vue'
import { fmtSan } from '../lib/formato'
import { formatarAvaliacao, type AnaliseMotor } from '../lib/motor'

const props = defineProps<{
  analise?: AnaliseMotor | null
  /** Lances do livro nesta posição; vazio no fim da linha. */
  lancesDoLivro: string[]
}>()

const concorda = computed(() => !!props.analise && props.lancesDoLivro.includes(props.analise.lance))
</script>

<template>
  <p v-if="analise" class="motor">
    <span class="marca" aria-hidden="true"></span>
    <span>
      <strong>Stockfish {{ formatarAvaliacao(analise.cp) }}</strong>
      <template v-if="!lancesDoLivro.length"> · melhor lance: {{ fmtSan(analise.lance) }}</template>
      <template v-else-if="concorda"> · concorda com o livro ({{ fmtSan(analise.lance) }})</template>
      <template v-else> · prefere {{ fmtSan(analise.lance) }} (seta azul); o livro segue a seta verde</template>
      <span class="suave"> · {{ analise.profundo ? 'análise longa' : 'análise rápida' }}</span>
    </span>
  </p>
</template>

<style scoped>
.motor {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  margin: 0;
  font-size: 0.875rem;
}
.marca {
  flex: none;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: #3a77c9;
}
.suave {
  color: var(--texto-suave);
}
</style>
