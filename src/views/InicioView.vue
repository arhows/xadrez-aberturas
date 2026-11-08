<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { percorrer } from '../lib/arvore'
import { buscarCapitulo, obterCapitulos } from '../lib/capitulos'
import { carregarConjuntos, livroDoConjunto, type ConjuntoExercicios } from '../lib/exercicios'
import { fmtLance } from '../lib/formato'
import { progresso } from '../lib/progresso'
import { proximaFila, totalRevisoes } from '../lib/resumoAberturas'
import { revisoesPendentes } from '../lib/revisaoExercicios'

const capitulos = obterCapitulos()
const totalLinhas = capitulos.reduce(
  (soma, c) => soma + c.capitulo.linhas.filter((linha) => !c.desativadas.includes(linha.id)).length,
  0,
)

// Os exercícios carregam à parte (são grandes); o cartão mostra os totais quando chegarem.
const conjuntos = ref<ConjuntoExercicios[]>([])
onMounted(async () => {
  conjuntos.value = await carregarConjuntos()
})
const totalProblemas = computed(() => conjuntos.value.reduce((soma, c) => soma + c.problemas.length, 0))
const totalLivros = computed(() => new Set(conjuntos.value.map(livroDoConjunto)).size)
const resolvidos = computed(() =>
  Object.values(progresso.exercicios).reduce((soma, estados) => soma + Object.keys(estados).length, 0),
)
const ultimo = computed(() => conjuntos.value.find((c) => c.id === progresso.ultimoConjunto))
const revisoesExercicios = computed(() => revisoesPendentes(conjuntos.value))

const maisErrados = computed(() =>
  Object.values(progresso.errosPorAresta)
    .filter((erro) => buscarCapitulo(erro.capitulo))
    .sort((a, b) => b.erros - a.erros)
    .slice(0, 5)
    .filter((erro) => percorrer(buscarCapitulo(erro.capitulo)!.arvore, erro.caminho))
    .map((erro) => ({ ...erro, rotulo: fmtLance(erro.caminho.length, erro.caminho.at(-1)!) })),
)
</script>

<template>
  <div class="pagina inicio">
    <div class="areas">
      <section class="area">
        <h2>Aberturas</h2>
        <p class="suave">
          {{ capitulos.length }} {{ capitulos.length === 1 ? 'abertura' : 'aberturas' }} · {{ totalLinhas }} linhas
        </p>
        <p v-if="totalRevisoes" class="pendente">{{ totalRevisoes }} para revisar hoje</p>
        <p v-else class="em-dia">Tudo em dia hoje</p>
        <div class="acoes">
          <RouterLink
            v-if="proximaFila"
            class="botao primario"
            :to="{ name: 'treino', params: { cap: proximaFila.id }, query: { auto: '1' } }"
          >Revisar agora</RouterLink>
          <RouterLink class="botao" :class="{ primario: !proximaFila }" to="/aberturas">Ver aberturas</RouterLink>
        </div>
      </section>

      <section class="area">
        <h2>Exercícios</h2>
        <p class="suave">
          <template v-if="conjuntos.length">
            {{ totalLivros }} livros · {{ totalProblemas.toLocaleString('pt-BR') }} problemas de mate
          </template>
          <template v-else>Problemas de mate dos livros de Polgár e Cicero</template>
        </p>
        <p class="suave">{{ resolvidos.toLocaleString('pt-BR') }} resolvidos</p>
        <p v-if="revisoesExercicios.length" class="pendente">{{ revisoesExercicios.length }} para revisar hoje</p>
        <div class="acoes">
          <RouterLink
            v-if="revisoesExercicios.length"
            class="botao primario"
            :to="{ name: 'exercicio', params: { conjunto: revisoesExercicios[0].conjunto }, query: { n: String(revisoesExercicios[0].n), revisao: '1' } }"
          >Revisar exercícios</RouterLink>
          <RouterLink
            v-if="ultimo"
            class="botao"
            :class="{ primario: !revisoesExercicios.length }"
            :to="{ name: 'exercicio', params: { conjunto: ultimo.id } }"
          >Continuar: {{ ultimo.nome }}</RouterLink>
          <RouterLink class="botao" :class="{ primario: !ultimo && !revisoesExercicios.length }" to="/exercicios">
            Ver livros
          </RouterLink>
        </div>
        <p v-if="ultimo" class="suave">{{ livroDoConjunto(ultimo) }}</p>
      </section>
    </div>

    <section v-if="maisErrados.length" class="erros">
      <h2>Lances em que você mais erra</h2>
      <ul>
        <li v-for="erro in maisErrados" :key="erro.caminho.join(' ')">
          <RouterLink :to="{ name: 'explorar', params: { cap: erro.capitulo }, query: { c: erro.caminho.join(' ') } }">
            {{ erro.rotulo }}
          </RouterLink>
          <span class="suave">
            {{ buscarCapitulo(erro.capitulo)!.capitulo.nome }} · {{ erro.erros }} {{ erro.erros === 1 ? 'erro' : 'erros' }}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.inicio {
  max-width: 56rem;
}
.areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
  gap: 1rem;
}
.area {
  display: grid;
  align-content: start;
  gap: 0.25rem;
  padding: 1.25rem;
  border: 1px solid var(--borda);
  border-radius: 12px;
  background: var(--superficie);
}
h2 {
  margin: 0 0 0.25rem;
  font-size: 1.25rem;
}
.erros h2 {
  font-size: 1.125rem;
}
p {
  margin: 0;
}
.suave {
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.pendente {
  color: var(--aviso);
  font-weight: 600;
}
.em-dia {
  color: var(--ok);
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0 0.25rem;
}
.erros {
  margin-top: 2rem;
}
.erros ul {
  margin: 0.5rem 0 0;
  padding: 0;
  list-style: none;
}
.erros li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  min-height: 44px;
  border-bottom: 1px solid var(--borda);
}
</style>
