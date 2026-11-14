<script setup lang="ts">
import { computed } from 'vue'
import ListaDeAtalhos from '../components/ListaDeAtalhos.vue'
import { avisosOnline } from '../lib/avisosOnline'
import { JOGAR } from '../lib/secoes'

const selos = computed(() => {
  const partes = [
    avisosOnline.desafios ? `${avisosOnline.desafios} ${avisosOnline.desafios === 1 ? 'DESAFIO' : 'DESAFIOS'}` : '',
    avisosOnline.minhaVez ? (avisosOnline.minhaVez === 1 ? 'SUA VEZ' : `SUA VEZ EM ${avisosOnline.minhaVez}`) : '',
  ].filter(Boolean)
  return { online: partes.join(' · ') || undefined }
})
</script>

<template>
  <div class="pagina secao-app">
    <header>
      <h1>{{ JOGAR.nome }}</h1>
      <p class="corpo suave">{{ JOGAR.descricao }}</p>
    </header>
    <ListaDeAtalhos tom="jogar" :grupos="JOGAR.grupos" :selos="selos" />
  </div>
</template>

<style scoped>
.secao-app {
  display: grid;
  gap: var(--espaco-5);
}
header {
  display: grid;
  gap: var(--espaco-1);
}
h1,
p {
  margin: 0;
}
.suave {
  color: var(--texto-suave);
}
</style>
