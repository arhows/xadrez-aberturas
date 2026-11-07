<script setup lang="ts">
import { computed } from 'vue'
import { obterCapitulos } from '../lib/capitulos'
import { progresso } from '../lib/progresso'
import type { TipoProblema } from '../lib/validacao'


const TITULOS: Record<TipoProblema, string> = {
  'lance-ilegal': 'Lance ilegal',
  'dica-sem-lance': 'Dica sem lance',
  'linha-base-inexistente': 'Linha base inexistente',
  'desvio-inconsistente': 'Desvio inconsistente',
}

const secoes = computed(() =>
  obterCapitulos().map((c) => ({
    id: c.capitulo.id,
    nome: c.capitulo.nome,
    fonte: c.capitulo.fonte,
    pendentes: c.capitulo.notasPendentes,
    estatisticas: c.estatisticas,
    desativadas: c.desativadas,
    problemas: c.problemas,
    aConferir: (c.capitulo.notas ?? []).filter((nota) => nota.conferir),
  })),
)
</script>

<template>
  <div class="pagina">
  <section v-for="secao in secoes" :key="secao.id" class="secao">
    <h2>{{ secao.nome }}</h2>
    <p v-if="secao.fonte" class="fonte">{{ secao.fonte }}</p>

    <dl class="numeros">
      <div><dt>Linhas</dt><dd>{{ secao.estatisticas.linhas }}</dd></div>
      <div><dt>Notas</dt><dd>{{ secao.estatisticas.notas }}</dd></div>
      <div><dt>Lances</dt><dd>{{ secao.estatisticas.lances }}</dd></div>
      <div><dt>Dicas</dt><dd>{{ secao.estatisticas.dicas }}</dd></div>
    </dl>

    <h3>Erros de validação ({{ secao.problemas.length }})</h3>
    <p v-if="secao.problemas.length === 0" class="ok">
      Todos os lances são legais e todas as dicas têm lance.
    </p>
    <ul v-else class="cartoes">
      <li v-for="(problema, i) in secao.problemas" :key="i" class="cartao erro">
        <strong>{{ TITULOS[problema.tipo] }}</strong> em <code>{{ problema.linha }}</code>
        <span v-if="secao.desativadas.includes(problema.linha)"> (desativada)</span>
        <p>{{ problema.mensagem }}</p>
        <code v-if="problema.fen" class="fen">{{ problema.fen }}</code>
      </li>
    </ul>

    <h3>Notas a conferir ({{ secao.aConferir.length }})</h3>
    <p class="ajuda">Só entram no Treino depois de marcadas como conferidas.</p>
    <ul class="cartoes">
      <li v-for="nota in secao.aConferir" :key="nota.id" class="cartao aviso">
        <strong>{{ nota.rotulo }}</strong> da coluna {{ nota.coluna }}
        (<code>{{ nota.id }}</code>)
        <p>{{ nota.conferir }}</p>
        <label>
          <input v-model="progresso.notasConferidas" type="checkbox" :value="nota.id" />
          Conferida
        </label>
      </li>
    </ul>

    <template v-if="secao.pendentes">
      <h3>Ainda não transcrito</h3>
      <p class="cartao aviso">{{ secao.pendentes }}</p>
    </template>
  </section>
  </div>
</template>

<style scoped>
.secao {
  margin-bottom: 2rem;
}
h2 {
  margin: 0 0 0.25rem;
}
h3 {
  margin: 1.5rem 0 0.5rem;
}
.fonte,
.ajuda {
  margin: 0 0 0.5rem;
  color: var(--texto-suave);
}
.numeros {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin: 1rem 0 0;
}
.numeros div {
  padding: 0.5rem;
  border: 1px solid var(--borda);
  border-radius: 8px;
  text-align: center;
}
.numeros dt {
  font-size: 0.875rem;
  color: var(--texto-suave);
}
.numeros dd {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.ok {
  color: var(--ok);
}
.cartoes {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.cartao {
  margin: 0;
  padding: 0.75rem;
  border-radius: 8px;
  border-left: 4px solid;
  background: var(--superficie);
}
.cartao p {
  margin: 0.25rem 0 0.5rem;
}
.erro {
  border-color: var(--erro);
}
.aviso {
  border-color: var(--aviso);
}
.fen {
  display: block;
  overflow-wrap: anywhere;
  font-size: 0.875rem;
}
label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
}
</style>
