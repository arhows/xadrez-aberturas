<script setup lang="ts">
import { livroDoConjunto, obterConjuntos, type ConjuntoExercicios } from '../lib/exercicios'
import { progresso } from '../lib/progresso'

/** Conjuntos agrupados por livro, na ordem em que foram carregados. */
const livros: { nome: string; conjuntos: ConjuntoExercicios[] }[] = []
for (const conjunto of obterConjuntos()) {
  const nome = livroDoConjunto(conjunto)
  const livro = livros.find((l) => l.nome === nome)
  if (livro) livro.conjuntos.push(conjunto)
  else livros.push({ nome, conjuntos: [conjunto] })
}

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
    <section v-for="livro in livros" :key="livro.nome" class="livro">
      <h2>{{ livro.nome }}</h2>
      <div v-for="conjunto in livro.conjuntos" :key="conjunto.id" class="conjunto">
        <h3>{{ conjunto.nome }}</h3>
        <p class="suave">{{ conjunto.fonte }} · {{ conjunto.problemas.length }} problemas</p>
        <p class="suave">
          ✓ {{ contagem(conjunto).primeira }} de primeira · {{ contagem(conjunto).ajuda }} com ajuda
        </p>
        <RouterLink class="botao primario" :to="{ name: 'exercicio', params: { conjunto: conjunto.id } }">
          Resolver
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}
h2 {
  margin: 0 0 0.75rem;
  font-size: 1.125rem;
}
h3 {
  margin: 0;
  font-size: 1rem;
}
.livro + .livro {
  margin-top: 2rem;
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
