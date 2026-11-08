<script setup lang="ts">
import { watchEffect } from 'vue'
import { progresso } from './lib/progresso'
import { atualizarAgora, pwa } from './lib/pwa'

watchEffect(() => {
  document.documentElement.dataset.tema = progresso.config.tema
})
</script>

<template>
  <nav class="topo">
    <RouterLink to="/" class="marca">Xadrez</RouterLink>
    <RouterLink to="/aberturas">Aberturas</RouterLink>
    <RouterLink to="/exercicios">Exercícios</RouterLink>
    <RouterLink to="/diagnostico">Diagnóstico</RouterLink>
    <RouterLink to="/config">Configurações</RouterLink>
  </nav>
  <div v-if="pwa.atualizacaoDisponivel" class="aviso-versao" role="status">
    <span>Há uma versão nova do app.</span>
    <button type="button" class="botao" @click="atualizarAgora">Atualizar</button>
  </div>
  <main>
    <RouterView :key="$route.fullPath" />
  </main>
</template>

<style scoped>
.topo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 1rem;
  padding: 0 1rem;
  border-bottom: 1px solid var(--borda);
}
.topo a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--texto-suave);
  text-decoration: none;
  font-size: 0.875rem;
}
.topo .marca {
  margin-right: auto;
  color: var(--texto);
  font-size: 1rem;
  font-weight: 600;
}
.aviso-versao {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid var(--borda);
  background: var(--superficie);
  font-size: 0.875rem;
}
</style>
