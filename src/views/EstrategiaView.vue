<script setup lang="ts">
import { computed } from 'vue'
import { chaveDaPartidaModelo, obterEstrategia, type Estrutura } from '../lib/estrategia'
import { progresso } from '../lib/progresso'
import { chaveDoQuiz, obterQuizzes, totalDePerguntas } from '../lib/quizzes'

/** Estratégia por estruturas de peões: famílias e estruturas, com o progresso do quiz. */

const livro = obterEstrategia()!
const grupos = computed(() =>
  livro.familias
    .map((f) => ({ ...f, estruturas: livro.estruturas.filter((e) => e.familia === f.id) }))
    .filter((f) => f.estruturas.length),
)
const feitas = (e: Estrutura) => e.partidas.filter((p) => progresso.estrategia[chaveDaPartidaModelo(e.id, p.n)]).length
const totalPartidas = livro.estruturas.reduce((s, e) => s + e.partidas.length, 0)
const quizzes = obterQuizzes()?.quizzes ?? []
const resultadoDoQuiz = (id: string) => progresso.estrategia[chaveDoQuiz(id)]
const totalFeitas = computed(() => livro.estruturas.reduce((s, e) => s + feitas(e), 0))
</script>

<template>
  <div class="pagina">
    <RouterLink to="/aprender" class="trilha">‹ Aprender</RouterLink>
    <h1>Estratégia por estruturas</h1>
    <p class="intro">
      A estrutura de peões decide os planos de cada lado. Em cada estrutura: o resumo dos planos das brancas e das pretas e
      partidas-modelo de grandes mestres para estudar lance a lance ou adivinhar os lances do vencedor.
    </p>
    <p class="suave">{{ totalFeitas }} de {{ totalPartidas }} partidas-modelo estudadas no quiz.</p>

    <section v-if="quizzes.length" class="familia">
      <header>
        <h2>Quizzes de estratégia</h2>
        <p class="suave">Partidas comentadas do livro de Herman Grooten que param em perguntas: ache o lance ou escolha o plano certo.</p>
      </header>
      <ul class="estruturas">
        <li v-for="q in quizzes" :key="q.id">
          <RouterLink :to="{ name: 'quiz', params: { id: q.id } }" class="estrutura">
            <span class="textos">
              <strong>{{ q.nome }}</strong>
              <span class="suave">{{ q.partidas[0].brancas }} – {{ q.partidas[0].pretas }} · {{ totalDePerguntas(q) }} perguntas</span>
            </span>
            <span class="contagem suave">{{ resultadoDoQuiz(q.id) ? `${resultadoDoQuiz(q.id).acertos}/${resultadoDoQuiz(q.id).total}` : '—' }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>

    <section v-for="g in grupos" :key="g.id" class="familia">
      <header>
        <h2>{{ g.nome }}</h2>
        <p class="suave">{{ g.descricao }}</p>
      </header>
      <ul class="estruturas">
        <li v-for="e in g.estruturas" :key="e.id">
          <RouterLink :to="{ name: 'estrutura', params: { id: e.id } }" class="estrutura">
            <span class="textos">
              <strong>{{ e.nome }}</strong>
              <span class="suave">{{ e.ideia }}</span>
            </span>
            <span class="contagem suave">{{ feitas(e) }}/{{ e.partidas.length }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>
    <p class="suave fonte">{{ livro.fonte }}</p>
  </div>
</template>

<style scoped>
.trilha {
  display: inline-flex;
  align-items: center;
  min-height: var(--alvo-toque);
  color: var(--destaque);
  font-size: 14px;
  text-decoration: none;
}
h1 {
  margin: 0 0 0.5rem;
}
h2 {
  margin: 0;
  font-size: 1.15rem;
}
.intro {
  margin: 0 0 0.5rem;
  line-height: 1.5;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.familia {
  margin-top: 1.25rem;
  border: 1px solid var(--borda);
  border-radius: 12px;
  overflow: hidden;
  background: var(--superficie);
}
.familia header {
  display: grid;
  gap: 2px;
  padding: 0.75rem 1rem;
}
.estruturas {
  margin: 0;
  padding: 0;
  list-style: none;
}
.estruturas li {
  border-top: 1px solid var(--borda);
}
.estrutura {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 56px;
  padding: 0.75rem 1rem;
  color: var(--texto);
  text-decoration: none;
  background: var(--fundo);
}
.estrutura:hover {
  background: var(--superficie-2);
}
.textos {
  display: grid;
  flex: 1;
  min-width: 0;
}
.contagem {
  font-variant-numeric: tabular-nums;
}
.fonte {
  margin-top: 1rem;
  font-size: 13px;
}
</style>
