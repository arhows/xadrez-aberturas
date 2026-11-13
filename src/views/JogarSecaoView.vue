<script setup lang="ts">
import ListaDeAtalhos from '../components/ListaDeAtalhos.vue'
import { JOGAR } from '../lib/secoes'
</script>

<template>
  <div class="pagina secao-app">
    <header>
      <h1>{{ JOGAR.nome }}</h1>
      <p class="corpo suave">{{ JOGAR.descricao }}</p>
    </header>
    <ListaDeAtalhos :grupos="JOGAR.grupos" />
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
