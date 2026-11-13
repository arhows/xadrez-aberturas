<script setup lang="ts">
import type { GrupoDeAtalhos } from '../lib/secoes'

/** Os atalhos de uma seção, em grupos; `selos` anexa pendências por id ("8 HOJE"). */
defineProps<{ grupos: GrupoDeAtalhos[]; selos?: Record<string, string | undefined> }>()
</script>

<template>
  <div class="grupos">
    <section v-for="(grupo, i) in grupos" :key="i" class="grupo-atalhos">
      <h2 v-if="grupo.titulo" class="rotulo">{{ grupo.titulo }}</h2>
      <div class="lista">
        <RouterLink v-for="atalho in grupo.atalhos" :key="atalho.id" class="linha-lista" :to="atalho.para">
          <span class="nome">{{ atalho.nome }}</span>
          <span class="meta">{{ atalho.descricao }}</span>
          <span class="lado">
            <span v-if="selos?.[atalho.id]" class="selo">{{ selos[atalho.id] }}</span>
            <svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.grupos {
  display: grid;
  gap: var(--espaco-5);
}
.grupo-atalhos {
  display: grid;
  gap: var(--espaco-2);
}
.grupo-atalhos .rotulo {
  margin: 0 0 0 var(--espaco-1);
  font: 600 12px/16px var(--font-texto);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--texto-suave);
}
</style>
