<script setup lang="ts">
import { watchEffect } from 'vue'
import { progresso } from './lib/progresso'

watchEffect(() => {
  document.documentElement.dataset.tema = progresso.config.tema
})
</script>

<template>
  <nav class="topo">
    <RouterLink to="/" class="marca">Aberturas</RouterLink>
    <RouterLink to="/diagnostico">Diagnóstico</RouterLink>
    <RouterLink to="/config">Configurações</RouterLink>
  </nav>
  <main>
    <RouterView :key="$route.fullPath" />
  </main>
</template>

<style scoped>
.topo {
  display: flex;
  align-items: center;
  gap: 1rem;
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
</style>
