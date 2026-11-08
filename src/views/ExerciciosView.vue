<script setup lang="ts">
import { obterConjuntos, type ConjuntoExercicios } from '../lib/exercicios'
import { progresso } from '../lib/progresso'

const conjuntos = obterConjuntos()

function contagem(conjunto: ConjuntoExercicios) {
  const estados = Object.values(progresso.exercicios[conjunto.id] ?? {})
  return {
    primeira: estados.filter((e) => e === 'primeira').length,
    ajuda: estados.filter((e) => e === 'ajuda').length,
  }
}
</script>

<template>
  <div class="pagina">
    <h1>Exercícios</h1>
    <section v-for="conjunto in conjuntos" :key="conjunto.id" class="conjunto">
      <h2>{{ conjunto.nome }}</h2>
      <p class="suave">{{ conjunto.fonte }} · {{ conjunto.problemas.length }} problemas</p>
      <p class="suave">
        ✓ {{ contagem(conjunto).primeira }} de primeira · {{ contagem(conjunto).ajuda }} com ajuda
      </p>
      <RouterLink class="botao primario" :to="{ name: 'exercicio', params: { conjunto: conjunto.id } }">
        Resolver
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}
h2 {
  margin: 0;
  font-size: 1.125rem;
}
.suave {
  margin: 0.25rem 0 0;
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.conjunto {
  display: grid;
  justify-items: start;
  gap: 0.25rem;
  padding: 1rem;
  border: 1px solid var(--borda);
  border-radius: 8px;
}
.conjunto .botao {
  margin-top: 0.5rem;
}
.conjunto + .conjunto {
  margin-top: 1rem;
}
</style>
