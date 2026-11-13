<script setup lang="ts">
import { computed, ref } from 'vue'
import MiniTabuleiro from '../components/MiniTabuleiro.vue'
import { chaveDaArmadilha, grupoDaArmadilha, noRepertorio, obterArmadilhas, ORDEM_DOS_GRUPOS } from '../lib/armadilhas'
import { jogarLances } from '../lib/lances'
import { progresso } from '../lib/progresso'

/** Armadilhas de abertura agrupadas pelo começo da partida, com o que já foi treinado. */

const todas = obterArmadilhas()
const capitulosDoRepertorio = computed(() => progresso.repertorio.capitulos)
const temRepertorio = computed(() => capitulosDoRepertorio.value.length > 0)
const doRepertorio = computed(() => todas.filter((a) => a.capitulos.some((c) => capitulosDoRepertorio.value.includes(c))))
const soRepertorio = ref(false)
/** A miniatura mostra o fim da armadilha: o mate ou o material ganho. */
const finais = new Map(todas.map((a) => [a.id, jogarLances(a.lances).lances.at(-1)?.fenDepois ?? '8/8/8/8/8/8/8/8 w - - 0 1']))

const grupos = computed(() => {
  const lista = soRepertorio.value && temRepertorio.value ? todas.filter((a) => noRepertorio(a, capitulosDoRepertorio.value)) : todas
  return ORDEM_DOS_GRUPOS.map((nome) => ({ nome, armadilhas: lista.filter((a) => grupoDaArmadilha(a) === nome) })).filter((g) => g.armadilhas.length)
})

const armou = (id: string) => !!progresso.armadilhas[chaveDaArmadilha(id, 'armar')]
const defendeu = (id: string) => !!progresso.armadilhas[chaveDaArmadilha(id, 'defender')]
const feitas = computed(() => todas.filter((a) => armou(a.id) && defendeu(a.id)).length)
</script>

<template>
  <div class="pagina">
    <RouterLink to="/aprender" class="trilha">‹ Aprender</RouterLink>
    <h1>Armadilhas de abertura</h1>
    <p class="intro">
      Em cada armadilha, um lance que parece natural perde material ou leva a mate. Veja como ela funciona, treine a punição com o lado
      que arma e aprenda a se defender com o lado que corre o risco.
    </p>
    <p class="suave">{{ feitas }} de {{ todas.length }} armadilhas treinadas nos dois lados.</p>

    <label v-if="temRepertorio" class="filtro">
      <input v-model="soRepertorio" type="checkbox" />
      Só as do meu repertório ({{ doRepertorio.length }})
    </label>

    <section v-for="g in grupos" :key="g.nome" class="grupo">
      <header>
        <h2>{{ g.nome }}</h2>
      </header>
      <ul>
        <li v-for="a in g.armadilhas" :key="a.id">
          <RouterLink :to="{ name: 'armadilha', params: { id: a.id } }" class="item">
            <MiniTabuleiro class="miniatura" :fen="finais.get(a.id)!" :orientacao="a.lado === 'w' ? 'white' : 'black'" :rotulo="`Fim da armadilha ${a.nome}`" />
            <span class="textos">
              <strong>{{ a.nome }}</strong>
              <span class="suave">{{ a.abertura }} · armada pelas {{ a.lado === 'w' ? 'brancas' : 'pretas' }}</span>
            </span>
            <span class="selos">
              <span class="selo" :class="{ feito: armou(a.id) }" :title="armou(a.id) ? 'Armou' : 'Ainda não armou'">{{ armou(a.id) ? '✓' : '·' }} Armar</span>
              <span class="selo" :class="{ feito: defendeu(a.id) }" :title="defendeu(a.id) ? 'Defendeu' : 'Ainda não defendeu'">{{ defendeu(a.id) ? '✓' : '·' }} Defender</span>
            </span>
          </RouterLink>
        </li>
      </ul>
    </section>
    <p v-if="!grupos.length" class="suave">Nenhuma armadilha do seu repertório por enquanto.</p>
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
.filtro {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: var(--alvo-toque);
  margin-top: 0.5rem;
}
.grupo {
  margin-top: 1.25rem;
  border: 1px solid var(--borda);
  border-radius: 12px;
  overflow: hidden;
  background: var(--superficie);
}
.grupo header {
  padding: 0.75rem 1rem;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  border-top: 1px solid var(--borda);
}
.item {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  align-items: center;
  gap: 0.5rem 0.75rem;
  min-height: 56px;
  padding: 0.75rem 1rem;
  color: var(--texto);
  text-decoration: none;
  background: var(--fundo);
}
.item:hover {
  background: var(--superficie-2);
}
.miniatura {
  grid-row: span 2;
  align-self: start;
}
.textos {
  display: grid;
  min-width: 0;
}
.selos {
  grid-column: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}
.selo {
  padding: 2px 8px;
  border: 1px solid var(--borda);
  border-radius: 999px;
  color: var(--texto-suave);
  font-size: 12px;
  white-space: nowrap;
}
.selo.feito {
  border-color: var(--ok);
  color: var(--ok);
}
</style>
