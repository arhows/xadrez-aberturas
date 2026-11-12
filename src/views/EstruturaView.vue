<script setup lang="ts">
import { useRoute } from 'vue-router'
import { buscarEstrutura, chaveDaPartidaModelo, obterEstrategia } from '../lib/estrategia'
import { progresso } from '../lib/progresso'

/** Uma estrutura de peões: planos de cada lado e partidas-modelo. */

const route = useRoute()
const estrutura = buscarEstrutura(route.params.id as string)!
const familia = obterEstrategia()!.familias.find((f) => f.id === estrutura.familia)
const resultado = (n: number) => progresso.estrategia[chaveDaPartidaModelo(estrutura.id, n)]
const textoResultado = (r: string) => (r === '*' ? '' : r.replace('½–½', '½-½'))
</script>

<template>
  <div class="pagina">
    <RouterLink to="/estrategia" class="trilha">‹ Estratégia · {{ familia?.nome }}</RouterLink>
    <h1>{{ estrutura.nome }}</h1>
    <p class="suave">Aparece em: {{ estrutura.origem }}</p>
    <p class="ideia">{{ estrutura.ideia }}</p>

    <div class="planos">
      <section class="cartao">
        <h2><span class="marcador" aria-hidden="true"></span> Planos das brancas</h2>
        <ul>
          <li v-for="(plano, i) in estrutura.brancas" :key="i">{{ plano }}</li>
        </ul>
      </section>
      <section class="cartao">
        <h2><span class="marcador b" aria-hidden="true"></span> Planos das pretas</h2>
        <ul>
          <li v-for="(plano, i) in estrutura.pretas" :key="i">{{ plano }}</li>
        </ul>
      </section>
    </div>

    <p class="regra"><strong>Para lembrar:</strong> {{ estrutura.regra }}</p>

    <section class="cartao">
      <h2>Partidas-modelo</h2>
      <ul class="partidas">
        <li v-for="p in estrutura.partidas" :key="p.n">
          <RouterLink :to="{ name: 'partida-modelo', params: { id: estrutura.id, n: p.n } }" class="partida">
            <span class="textos">
              <strong>{{ p.brancas }} – {{ p.pretas }}</strong>
              <span class="suave">{{ [p.evento, textoResultado(p.resultado)].filter(Boolean).join(' · ') }}</span>
              <span>{{ p.objetivo }}</span>
            </span>
            <span v-if="resultado(p.n)" class="nota">✓ {{ resultado(p.n).acertos }}/{{ resultado(p.n).total }}</span>
          </RouterLink>
        </li>
      </ul>
    </section>
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
  margin: 0 0 0.25rem;
}
h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 1.05rem;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.ideia {
  margin: 0.75rem 0;
  font-size: 1.05rem;
  line-height: 1.5;
}
.planos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
.cartao {
  display: grid;
  gap: var(--espaco-2);
  margin-bottom: 1rem;
}
.cartao ul {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding-left: 1.2rem;
  line-height: 1.45;
}
.marcador {
  width: 14px;
  height: 14px;
  border: 1.5px solid var(--borda-controle);
  border-radius: 50%;
  background: #fff;
}
.marcador.b {
  background: #1c1d1a;
}
.regra {
  margin: 0 0 1rem;
  padding: 0.75rem 1rem;
  border-left: 4px solid var(--destaque);
  border-radius: var(--raio-sm);
  background: var(--superficie-2);
  line-height: 1.5;
}
.partidas {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}
.partidas li + li {
  border-top: 1px solid var(--borda);
}
.partida {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: var(--texto);
  text-decoration: none;
}
.textos {
  display: grid;
  gap: 2px;
  flex: 1;
  min-width: 0;
}
.nota {
  color: var(--ok);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
</style>
