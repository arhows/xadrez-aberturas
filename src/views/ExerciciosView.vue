<script setup lang="ts">
import { livroDoConjunto, obterConjuntos, type ConjuntoExercicios } from '../lib/exercicios'
import { progresso } from '../lib/progresso'

interface Livro {
  autor: string
  titulo: string
  conjuntos: ConjuntoExercicios[]
}

/** Conjuntos agrupados por livro ("Autor, Título"), na ordem em que foram carregados. */
const livros: Livro[] = []
for (const conjunto of obterConjuntos()) {
  const [autor, ...titulo] = livroDoConjunto(conjunto).split(', ')
  const livro = livros.find((l) => l.autor === autor)
  if (livro) livro.conjuntos.push(conjunto)
  else livros.push({ autor, titulo: titulo.join(', '), conjuntos: [conjunto] })
}

function contagem(conjuntos: ConjuntoExercicios[]) {
  const estados = conjuntos.flatMap((c) => Object.values(progresso.exercicios[c.id] ?? {}))
  const total = conjuntos.reduce((soma, c) => soma + c.problemas.length, 0)
  const primeira = estados.filter((e) => e === 'primeira').length
  const ajuda = estados.filter((e) => e === 'ajuda').length
  return { total, primeira, ajuda, percentual: total ? Math.round(((primeira + ajuda) / total) * 100) : 0 }
}

const numero = (n: number) => n.toLocaleString('pt-BR')
</script>

<template>
  <div class="pagina">
    <h1>Exercícios</h1>
    <section v-for="livro in livros" :key="livro.autor" class="livro">
      <header>
        <h2>{{ livro.autor }}</h2>
        <p class="titulo">{{ livro.titulo }}</p>
        <p class="suave">
          {{ numero(contagem(livro.conjuntos).total) }} problemas ·
          {{ contagem(livro.conjuntos).percentual }}% resolvidos
        </p>
        <div class="barra" role="presentation">
          <span :style="{ width: `${contagem(livro.conjuntos).percentual}%` }"></span>
        </div>
      </header>
      <ul class="conjuntos">
        <li v-for="conjunto in livro.conjuntos" :key="conjunto.id">
          <div>
            <strong>{{ conjunto.nome }}</strong>
            <span class="suave">
              {{ numero(conjunto.problemas.length) }} problemas ·
              ✓ {{ contagem([conjunto]).primeira }} de primeira · {{ contagem([conjunto]).ajuda }} com ajuda
            </span>
          </div>
          <RouterLink class="botao" :to="{ name: 'exercicio', params: { conjunto: conjunto.id } }">Resolver</RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
}
.livro {
  border: 1px solid var(--borda);
  border-radius: 12px;
  background: var(--superficie);
  overflow: hidden;
}
.livro + .livro {
  margin-top: 1.25rem;
}
header {
  display: grid;
  gap: 0.25rem;
  padding: 1rem 1rem 0.75rem;
}
h2 {
  margin: 0;
  font-size: 1.125rem;
}
p {
  margin: 0;
}
.titulo {
  font-style: italic;
}
.suave {
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.barra {
  height: 6px;
  margin-top: 0.25rem;
  border-radius: 3px;
  background: var(--borda);
  overflow: hidden;
}
.barra span {
  display: block;
  height: 100%;
  background: var(--ok);
}
.conjuntos {
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--fundo);
}
.conjuntos li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--borda);
}
.conjuntos li div {
  display: grid;
}
</style>
