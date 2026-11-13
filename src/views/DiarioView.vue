<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ResolverMisturado from '../components/ResolverMisturado.vue'
import {
  chaveDoItem,
  diasSeguidos,
  itensMisturados,
  proximoDaSequencia,
  serieDoDia,
  type ItemMisturado,
} from '../lib/diario'
import { obterConjuntos } from '../lib/exercicios'
import { progresso } from '../lib/progresso'
import { dataLocal } from '../lib/srs'

/**
 * Exercícios do dia (uma série fixa por dia, misturando táticas e mates) e Sequência (fica mais
 * difícil a cada acerto e acaba no primeiro erro, como o Puzzle Streak do lichess).
 */
const route = useRoute()
const router = useRouter()
const modo = computed<'serie' | 'sequencia'>(() => (route.query.modo === 'sequencia' ? 'sequencia' : 'serie'))
function trocarModo(novo: 'serie' | 'sequencia') {
  router.replace({ name: 'diario', query: novo === 'sequencia' ? { modo: novo } : {} })
}

// ---------- Exercícios do dia ----------
const hoje = dataLocal()
const serie = serieDoDia(obterConjuntos(), hoje)
const feitos = computed(() => progresso.diario[hoje] ?? {})
const primeiroPendente = () => {
  const i = serie.findIndex((_, j) => !feitos.value[String(j)])
  return i < 0 ? null : i
}
/** Exercício aberto; null = a série acabou (mostra o resumo). */
const indice = ref<number | null>(primeiroPendente())
const resolvidoAgora = ref(false)
const dias = computed(() => diasSeguidos(progresso.diario, hoje))
const dePrimeira = computed(() => Object.values(feitos.value).filter((e) => e === 'primeira').length)
const completos = computed(() => Object.keys(feitos.value).length)

function aoResolverNaSerie(primeira: boolean) {
  const i = String(indice.value)
  const dia = (progresso.diario[hoje] ??= {})
  // Vale o primeiro resultado do dia: refazer depois de ver a solução não vira "de primeira".
  dia[i] ??= primeira ? 'primeira' : 'ajuda'
  resolvidoAgora.value = true
}
function abrir(i: number | null) {
  indice.value = i
  resolvidoAgora.value = false
}
function seguirNaSerie() {
  abrir(primeiroPendente())
}

// ---------- Sequência ----------
const itens = itensMisturados(obterConjuntos())
const faseSeq = ref<'inicio' | 'jogando' | 'fim'>('inicio')
const itemSeq = shallowRef<ItemMisturado | null>(null)
const acertos = ref(0)
const pulos = ref(1)
const acertouAgora = ref(false)
const recordeNovo = ref(false)
let vistos = new Set<string>()

function sortearSeq() {
  const anterior = itemSeq.value ?? undefined
  const proximo = proximoDaSequencia(itens, acertos.value, vistos, Math.random, anterior)
  if (proximo) vistos.add(chaveDoItem(proximo))
  itemSeq.value = proximo
  acertouAgora.value = false
}
function comecarSeq() {
  vistos = new Set()
  acertos.value = 0
  pulos.value = 1
  recordeNovo.value = false
  itemSeq.value = null
  faseSeq.value = 'jogando'
  sortearSeq()
}
function aoResolverNaSeq(primeira: boolean) {
  if (!primeira) return
  acertos.value++
  acertouAgora.value = true
  if (acertos.value > progresso.sequencia) {
    progresso.sequencia = acertos.value
    recordeNovo.value = true
  }
}
function pular() {
  if (pulos.value <= 0) return
  pulos.value--
  sortearSeq()
}
function aoFalharNaSeq() {
  faseSeq.value = 'fim'
}
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" to="/exercicios" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>{{ modo === 'serie' ? 'Exercícios do dia' : 'Sequência' }}</h1>
    <span class="apoio suave">{{ modo === 'serie' ? `${completos} de ${serie.length}` : `${acertos} seguidos` }}</span>
  </header>

  <!-- Exercícios do dia -->
  <template v-if="modo === 'serie'">
    <ResolverMisturado
      v-if="indice !== null"
      :key="`serie-${indice}`"
      :item="serie[indice]"
      modo="serie"
      @resolvido="aoResolverNaSerie"
    >
      <template #topo>
        <div class="cabeca so-computador">
          <RouterLink to="/exercicios" class="trilha">‹ Exercícios</RouterLink>
          <h1 class="titulo-pagina">Exercícios do dia</h1>
        </div>
        <div class="abas" role="tablist">
          <button type="button" role="tab" class="aba ativa" aria-selected="true">Do dia</button>
          <button type="button" role="tab" class="aba" aria-selected="false" @click="trocarModo('sequencia')">Sequência</button>
        </div>
        <div class="bolinhas" aria-label="Exercícios do dia">
          <button
            v-for="(_, i) in serie"
            :key="i"
            type="button"
            class="bolinha"
            :class="[feitos[String(i)], { atual: i === indice }]"
            :aria-label="`Exercício ${i + 1}`"
            @click="abrir(i)"
          >{{ i + 1 }}</button>
        </div>
        <p class="suave">
          Táticas de vários temas e mates em 1, 2, 3 e 4, misturados: o tema não é dito, você tem que reconhecer o padrão.
          <template v-if="dias"> · {{ dias }} {{ dias === 1 ? 'dia seguido' : 'dias seguidos' }}</template>
        </p>
      </template>
      <template #acoes="{ terminado }">
        <button v-if="terminado && resolvidoAgora" type="button" class="botao primario" @click="seguirNaSerie">
          {{ primeiroPendente() === null ? 'Ver o resultado do dia' : 'Próximo' }}
        </button>
      </template>
    </ResolverMisturado>

    <div v-else class="pagina resumo">
      <RouterLink to="/exercicios" class="trilha">‹ Exercícios</RouterLink>
      <h1 class="titulo-pagina">Exercícios do dia</h1>
      <p class="destaque">Série de hoje completa!</p>
      <dl class="placar-final">
        <div><dt>De primeira</dt><dd class="ok">{{ dePrimeira }}</dd></div>
        <div><dt>Com ajuda</dt><dd>{{ completos - dePrimeira }}</dd></div>
        <div><dt>Dias seguidos</dt><dd>{{ dias }}</dd></div>
      </dl>
      <p class="suave">Amanhã tem uma série nova. Os que você errou ou fez com pista voltam na Revisão de hoje dos exercícios.</p>
      <div class="bolinhas">
        <button v-for="(_, i) in serie" :key="i" type="button" class="bolinha" :class="feitos[String(i)]" @click="abrir(i)">{{ i + 1 }}</button>
      </div>
      <div class="acoes">
        <button type="button" class="botao primario" @click="trocarModo('sequencia')">Jogar a Sequência</button>
        <RouterLink class="botao" to="/exercicios">Voltar aos exercícios</RouterLink>
      </div>
    </div>
  </template>

  <!-- Sequência -->
  <template v-else>
    <ResolverMisturado
      v-if="faseSeq !== 'inicio' && itemSeq"
      :key="chaveDoItem(itemSeq)"
      :item="itemSeq"
      modo="sequencia"
      @resolvido="aoResolverNaSeq"
      @falhou="aoFalharNaSeq"
    >
      <template #topo>
        <div class="cabeca so-computador">
          <RouterLink to="/exercicios" class="trilha">‹ Exercícios</RouterLink>
          <h1 class="titulo-pagina">Sequência</h1>
        </div>
        <div class="abas" role="tablist">
          <button type="button" role="tab" class="aba" aria-selected="false" @click="trocarModo('serie')">Do dia</button>
          <button type="button" role="tab" class="aba ativa" aria-selected="true">Sequência</button>
        </div>
        <div class="placar">
          <span class="contagem">{{ acertos }}</span>
          <span class="suave">seguidos · recorde {{ progresso.sequencia }}</span>
        </div>
      </template>
      <template #acoes="{ terminado }">
        <button v-if="acertouAgora" type="button" class="botao primario" @click="sortearSeq">Próximo</button>
        <button v-if="!terminado && faseSeq === 'jogando'" type="button" class="botao" :disabled="pulos <= 0" @click="pular">
          Pular ({{ pulos }})
        </button>
      </template>
      <template #rodape>
        <section v-if="faseSeq === 'fim'" class="fim">
          <strong>Fim da sequência: {{ acertos }} {{ acertos === 1 ? 'acerto' : 'acertos' }}.</strong>
          <span v-if="recordeNovo" class="ok">Recorde novo!</span>
          <span v-else class="suave">Seu recorde é {{ progresso.sequencia }}.</span>
          <button type="button" class="botao primario" @click="comecarSeq">Começar de novo</button>
        </section>
      </template>
    </ResolverMisturado>

    <div v-else class="pagina resumo">
      <RouterLink to="/exercicios" class="trilha">‹ Exercícios</RouterLink>
      <h1 class="titulo-pagina">Sequência</h1>
      <div class="abas" role="tablist">
        <button type="button" role="tab" class="aba" aria-selected="false" @click="trocarModo('serie')">Do dia</button>
        <button type="button" role="tab" class="aba ativa" aria-selected="true">Sequência</button>
      </div>
      <p>
        Táticas e mates misturados, começando fáceis e ficando mais difíceis a cada acerto. O primeiro erro encerra a
        sequência e mostra o lance certo. Você pode pular um exercício por rodada.
      </p>
      <p class="suave">Recorde: {{ progresso.sequencia }}</p>
      <div class="acoes">
        <button type="button" class="botao primario grande" :disabled="!itens.length" @click="comecarSeq">Começar</button>
      </div>
    </div>
  </template>
</template>

<style scoped>
.cabeca {
  display: grid;
  gap: var(--espaco-1);
}
.cabeca .titulo-pagina,
.resumo .titulo-pagina {
  margin: 0;
}
.trilha {
  display: inline-flex;
  align-items: center;
  min-height: var(--alvo-toque);
  color: var(--destaque);
  font-size: 14px;
  text-decoration: none;
}
.abas {
  display: flex;
  gap: var(--espaco-2);
}
.aba {
  min-height: 40px;
  padding: 0 var(--espaco-3);
  border: 1px solid var(--borda-controle);
  border-radius: 999px;
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  cursor: pointer;
}
.aba.ativa {
  border-color: var(--destaque);
  background: var(--destaque);
  color: #fff;
  font-weight: 600;
}
.bolinhas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}
.bolinha {
  width: 40px;
  height: 40px;
  border: 1px solid var(--borda);
  border-radius: 50%;
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
}
.bolinha.primeira {
  border-color: var(--ok);
  background: var(--ok);
  color: #fff;
  font-weight: 600;
}
.bolinha.ajuda {
  border-color: var(--aviso);
  color: var(--aviso);
  font-weight: 600;
}
.bolinha.atual {
  outline: 2px solid var(--texto);
  outline-offset: 1px;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.placar {
  display: flex;
  align-items: baseline;
  gap: var(--espaco-2);
}
.contagem {
  font: 600 36px/40px var(--font-titulo);
  font-variant-numeric: tabular-nums;
}
.fim {
  display: grid;
  gap: var(--espaco-2);
  justify-items: start;
  padding: var(--espaco-3);
  border: 1px solid var(--borda);
  border-radius: var(--raio-md);
  background: var(--superficie);
}
.ok {
  color: var(--ok);
}
.resumo {
  display: grid;
  gap: var(--espaco-4);
  align-content: start;
}
.resumo p {
  margin: 0;
}
.destaque {
  color: var(--ok);
  font: 600 20px/28px var(--font-titulo);
}
.placar-final {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--espaco-2);
  margin: 0;
}
.placar-final div {
  padding: var(--espaco-3);
  border-radius: var(--raio-md);
  background: var(--superficie-2);
  text-align: center;
}
.placar-final dt {
  color: var(--texto-suave);
  font-size: 13px;
}
.placar-final dd {
  margin: 0;
  font: 600 28px/36px var(--font-titulo);
}
.placar-final .ok {
  color: var(--ok);
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
@media (max-width: 799.98px) {
  .so-computador {
    display: none;
  }
}
@media (min-width: 800px) {
  .so-celular {
    display: none;
  }
}
</style>
