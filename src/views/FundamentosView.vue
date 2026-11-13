<script setup lang="ts">
import { computed } from 'vue'
import { feitosNaLicao } from '../lib/fundamentos'
import { LICOES } from '../lib/licoes'
import { progresso } from '../lib/progresso'

const total = LICOES.reduce((soma, l) => soma + l.exercicios.length, 0)
const feitos = computed(() => LICOES.reduce((soma, l) => soma + feitosNaLicao(l, progresso.fundamentos), 0))
const percentual = computed(() => Math.round((feitos.value / total) * 100))
/** Primeira lição ainda não terminada, para o botão "Continuar". */
const atual = computed(() => LICOES.find((l) => feitosNaLicao(l, progresso.fundamentos) < l.exercicios.length))
</script>

<template>
  <div class="pagina">
    <RouterLink to="/aprender" class="trilha">‹ Aprender</RouterLink>
    <h1>Fundamentos do xadrez</h1>
    <p class="intro">
      Aprenda a jogar do zero: o tabuleiro, como cada peça se move e captura, como defender, o xeque, o xeque-mate e as
      regras especiais. Cada lição tem uma explicação curta e exercícios no tabuleiro.
    </p>

    <section class="resumo">
      <div>
        <strong>{{ feitos }} de {{ total }} exercícios</strong>
        <div class="progresso fino" role="presentation">
          <span class="trilho"><span :style="{ width: `${percentual}%` }"></span></span>
        </div>
      </div>
      <RouterLink v-if="atual" class="botao primario" :to="{ name: 'licao', params: { licao: atual.id } }">
        {{ feitos ? 'Continuar' : 'Começar' }}
      </RouterLink>
      <span v-else class="completo">✓ Curso completo</span>
    </section>

    <ol class="licoes">
      <li v-for="(licao, i) in LICOES" :key="licao.id">
        <RouterLink :to="{ name: 'licao', params: { licao: licao.id } }" class="licao">
          <span
            class="numero"
            :class="{ feita: feitosNaLicao(licao, progresso.fundamentos) === licao.exercicios.length }"
            aria-hidden="true"
          >{{ feitosNaLicao(licao, progresso.fundamentos) === licao.exercicios.length ? '✓' : i + 1 }}</span>
          <span class="textos">
            <strong>{{ licao.titulo }}</strong>
            <span class="suave">{{ licao.resumo }}</span>
          </span>
          <span class="suave contagem">{{ feitosNaLicao(licao, progresso.fundamentos) }}/{{ licao.exercicios.length }}</span>
        </RouterLink>
      </li>
    </ol>
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
.intro {
  margin: 0 0 1rem;
  line-height: 1.5;
}
.resumo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 1rem;
  border: 1px solid var(--borda);
  border-radius: 12px;
  background: var(--superficie);
}
.resumo > div {
  display: grid;
  flex: 1;
  gap: var(--espaco-2);
}
.completo {
  color: var(--ok);
  font-weight: 600;
}
.licoes {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--borda);
  border-radius: 12px;
  overflow: hidden;
}
.licoes li + li {
  border-top: 1px solid var(--borda);
}
.licao {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 56px;
  padding: 0.75rem 1rem;
  color: var(--texto);
  text-decoration: none;
  background: var(--superficie);
}
.licao:hover {
  background: var(--superficie-2);
}
.numero {
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--borda-controle);
  border-radius: 50%;
  font-variant-numeric: tabular-nums;
}
.numero.feita {
  border-color: var(--ok);
  color: var(--ok);
  font-weight: 700;
}
.textos {
  display: grid;
  flex: 1;
  min-width: 0;
}
.suave {
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.contagem {
  font-variant-numeric: tabular-nums;
}
</style>
