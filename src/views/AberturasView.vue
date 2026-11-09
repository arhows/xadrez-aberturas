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
    <div class="cabecalho">
      <h1>Aberturas</h1>
      <RouterLink class="botao" to="/partidas">Minhas partidas</RouterLink>
    </div>
    <section v-for="familia in familias" :key="familia.id" class="familia">
      <h2>{{ familia.nome }} <span class="suave">{{ fmtTexto(familia.lances) }}</span></h2>
      <ul class="cartoes">
        <li v-for="capitulo in familia.capitulos" :key="capitulo.capitulo.id">
          <RouterLink class="cartao" :to="{ name: 'abertura', params: { cap: capitulo.capitulo.id } }">
            <strong class="titulo-item">{{ capitulo.capitulo.nome }}</strong>
            <span class="lance suave">{{ fmtTexto(capitulo.capitulo.base) }}</span>
            <span class="suave">
              {{ linhasAtivas(capitulo) }} linhas · {{ percentual(capitulo) }}% dominado
            </span>
            <span class="progresso fino"><span class="trilho"><span :style="{ width: `${percentual(capitulo)}%` }"></span></span></span>
            <span class="rodape">
              <span v-if="filaDoCapitulo(capitulo.capitulo.id)" class="selo">{{ filaDoCapitulo(capitulo.capitulo.id) }} PARA HOJE</span>
              <span v-else class="selo ok">EM DIA</span>
            </span>
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.cabecalho {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
h1 {
  margin: 0;
}
h2 {
  margin: 0 0 0.75rem;
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
  gap: var(--espaco-2);
  height: 100%;
  color: var(--texto);
  text-decoration: none;
}
.cartao .lance {
  font-size: 14px;
}
.rodape {
  margin-top: var(--espaco-1);
}
.cartao:hover,
.cartao:focus-visible {
  border-color: var(--destaque);
}
</style>
