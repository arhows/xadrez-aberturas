<script setup lang="ts">
import { computed } from 'vue'
import { exibirAvaliacao } from '../lib/avaliacao'

const props = defineProps<{ valor?: string | null; detalhada?: boolean }>()
const avaliacao = computed(() => exibirAvaliacao(props.valor))
</script>

<template>
  <span v-if="avaliacao" :title="avaliacao.explicacao ?? undefined">
    <strong>{{ avaliacao.rotulo }}</strong>
    <template v-if="detalhada && avaliacao.explicacao"> — {{ avaliacao.explicacao }}</template>
  </span>
</template>
