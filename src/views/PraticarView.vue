<script setup lang="ts">
import { computed } from 'vue'
import ListaDeAtalhos from '../components/ListaDeAtalhos.vue'
import { diasSeguidos, TAMANHO_DA_SERIE } from '../lib/diario'
import { obterConjuntos } from '../lib/exercicios'
import { progresso } from '../lib/progresso'
import { proximaFila, totalRevisoes } from '../lib/resumoAberturas'
import { revisoesPendentes } from '../lib/revisaoExercicios'
import { PRATICAR } from '../lib/secoes'
import { dataLocal } from '../lib/srs'

const hoje = dataLocal()
const feitosHoje = Object.keys(progresso.diario[hoje] ?? {}).length
const dias = diasSeguidos(progresso.diario, hoje)
const revisoesExercicios = revisoesPendentes(obterConjuntos()).length

// Com revisões de abertura para hoje, "Treinar meu repertório" já abre o treino da primeira.
const grupos = computed(() =>
  PRATICAR.grupos.map((grupo) => ({
    ...grupo,
    atalhos: grupo.atalhos.map((a) =>
      a.id === 'repertorio' && proximaFila.value
        ? { ...a, para: { name: 'treino', params: { cap: proximaFila.value.id }, query: { auto: '1' } } }
        : a,
    ),
  })),
)
const selos = computed(() => ({
  repertorio: totalRevisoes.value ? `${totalRevisoes.value} HOJE` : undefined,
  taticas: revisoesExercicios ? `${revisoesExercicios} HOJE` : undefined,
  sequencia: progresso.sequencia ? `RECORDE ${progresso.sequencia}` : undefined,
}))
</script>

<template>
  <div class="pagina secao-app">
    <header>
      <h1>{{ PRATICAR.nome }}</h1>
      <p class="corpo suave">{{ PRATICAR.descricao }}</p>
    </header>

    <section class="cartao">
      <div class="cabeca">
        <h2 class="titulo-item">Exercícios do dia</h2>
        <span class="apoio suave">{{ feitosHoje }} de {{ TAMANHO_DA_SERIE }}</span>
      </div>
      <div class="progresso fino">
        <div class="trilho"><span :style="{ width: `${(feitosHoje / TAMANHO_DA_SERIE) * 100}%` }"></span></div>
      </div>
      <p class="apoio suave">
        Táticas e mates em 1 a 4 misturados, sem dizer o tema<template v-if="dias"> · {{ dias }} {{ dias === 1 ? 'dia seguido' : 'dias seguidos' }}</template>
      </p>
      <div class="acoes">
        <RouterLink class="botao" :class="{ primario: feitosHoje < TAMANHO_DA_SERIE }" to="/diario">
          {{ feitosHoje ? (feitosHoje < TAMANHO_DA_SERIE ? 'Continuar a série' : 'Ver a série de hoje') : 'Começar a série' }}
        </RouterLink>
      </div>
    </section>

    <ListaDeAtalhos tom="praticar" :grupos="grupos" :selos="selos" />
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
