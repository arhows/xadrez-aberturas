<script setup lang="ts">
import { obterCapitulos, type CapituloCarregado } from '../lib/capitulos'
import { FAMILIAS, familiaDaAbertura } from '../lib/familias'
import { fmtTexto } from '../lib/formato'
import { filaDoCapitulo, percentual } from '../lib/resumoAberturas'

/** Famílias do MCO que têm alguma abertura no app, na ordem do livro. */
const familias = FAMILIAS.map((familia) => ({
  ...familia,
  capitulos: obterCapitulos().filter((c) => familiaDaAbertura(c.capitulo.base).id === familia.id),
})).filter((familia) => familia.capitulos.length)

const linhasAtivas = (capitulo: CapituloCarregado) =>
  capitulo.capitulo.linhas.filter((linha) => !capitulo.desativadas.includes(linha.id)).length
</script>

<template>
  <div class="pagina">
    <h1>Aberturas</h1>
    <section v-for="familia in familias" :key="familia.id" class="familia">
      <h2>{{ familia.nome }} <span class="suave">{{ fmtTexto(familia.lances) }}</span></h2>
      <ul class="cartoes">
        <li v-for="capitulo in familia.capitulos" :key="capitulo.capitulo.id">
          <RouterLink class="cartao" :to="{ name: 'abertura', params: { cap: capitulo.capitulo.id } }">
            <strong>{{ capitulo.capitulo.nome }}</strong>
            <span class="suave">{{ fmtTexto(capitulo.capitulo.base) }}</span>
            <span class="suave">
              {{ linhasAtivas(capitulo) }} linhas · {{ percentual(capitulo) }}% dominado
            </span>
            <span v-if="filaDoCapitulo(capitulo.capitulo.id)" class="pendente">
              {{ filaDoCapitulo(capitulo.capitulo.id) }} para hoje
            </span>
            <span v-else class="em-dia">Em dia</span>
          </RouterLink>
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
h2 {
  margin: 0 0 0.75rem;
  font-size: 1.125rem;
}
h2 .suave {
  font-weight: 400;
}
.familia + .familia {
  margin-top: 2rem;
}
.suave {
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.cartoes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.cartao {
  display: grid;
  gap: 0.25rem;
  height: 100%;
  padding: 1rem;
  border: 1px solid var(--borda);
  border-radius: 8px;
  background: var(--superficie);
  color: var(--texto);
  text-decoration: none;
}
.cartao:hover,
.cartao:focus-visible {
  border-color: var(--destaque);
}
.pendente {
  color: var(--aviso);
  font-size: 0.875rem;
  font-weight: 600;
}
.em-dia {
  color: var(--ok);
  font-size: 0.875rem;
}
</style>
