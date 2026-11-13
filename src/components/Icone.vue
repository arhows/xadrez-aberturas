<script setup lang="ts">
import { computed } from 'vue'
import { DESENHOS, type NomeDoIcone } from '../lib/icones'

/** Ícone de traço 24×24 no estilo dos da barra de navegação; herda a cor do texto. */
const props = defineProps<{ nome: NomeDoIcone }>()
const desenho = computed(() => DESENHOS[props.nome])
</script>

<template>
  <svg
    class="icone-svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="desenho"
  ></svg>
</template>
