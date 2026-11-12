<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import CartaoDica from '../components/CartaoDica.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { obterCapitulos } from '../lib/capitulos'
import { fmtLance, fmtSan, fmtTexto } from '../lib/formato'
import { progresso } from '../lib/progresso'
import { registrarRecorde, sortearPergunta, type PerguntaRelampago } from '../lib/relampago'
import { capitulosDoRepertorio, repertorioEscolhido } from '../lib/repertorio'
import { tocar } from '../lib/som'
import { registrarErroNoLance } from '../lib/treinoErros'

const config = progresso.config
const MINUTOS = [1, 3, 5]
const TEMPO_DO_ERRO_MS = 900

const capitulos = capitulosDoRepertorio(obterCapitulos())
const fase = ref<'inicio' | 'jogando' | 'fim'>('inicio')
const pergunta = shallowRef<PerguntaRelampago | null>(null)
const acertos = ref(0)
const erros = ref(0)
const restanteMs = ref(0)
const mostrandoErro = ref(false)
const recordeNovo = ref(false)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()

let fimEm = 0
let relogio: ReturnType<typeof setInterval> | undefined
let espera: ReturnType<typeof setTimeout> | undefined

const recorde = computed(() => progresso.relampago[String(config.minutosRelampago)] ?? 0)
const tempo = computed(() => {
  const s = Math.ceil(restanteMs.value / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
})
const orientacao = computed<'white' | 'black'>(() => (pergunta.value?.cor === 'b' ? 'black' : 'white'))
const formas = computed<Forma[]>(() =>
  mostrandoErro.value && pergunta.value
    ? [{ de: pergunta.value.esperado.from, para: pergunta.value.esperado.to, cor: 'green' }]
    : [],
)
const contexto = computed(() =>
  (pergunta.value?.antes ?? []).map((san, i) => (i % 2 === 0 ? fmtLance(i + 1, san) : fmtSan(san))).join(' '),
)

function proxima() {
  mostrandoErro.value = false
  pergunta.value = sortearPergunta(capitulos, progresso.corPorCapitulo)
  if (!pergunta.value) terminar()
}

function comecar() {
  acertos.value = 0
  erros.value = 0
  recordeNovo.value = false
  fimEm = Date.now() + config.minutosRelampago * 60_000
  restanteMs.value = config.minutosRelampago * 60_000
  fase.value = 'jogando'
  proxima()
  clearInterval(relogio)
  relogio = setInterval(() => {
    restanteMs.value = Math.max(0, fimEm - Date.now())
    if (restanteMs.value === 0) terminar()
  }, 200)
}

function terminar() {
  clearInterval(relogio)
  clearTimeout(espera)
  if (fase.value !== 'jogando') return
  fase.value = 'fim'
  recordeNovo.value = registrarRecorde(progresso.relampago, config.minutosRelampago, acertos.value)
}

function aoJogar(de: string, para: string) {
  const atual = pergunta.value
  if (!atual || mostrandoErro.value) return
  if (atual.aceitos.some((aresta) => aresta.from === de && aresta.to === para)) {
    tocar('certo')
    acertos.value++
    proxima()
    return
  }
  tocar('errado')
  erros.value++
  registrarErroNoLance(progresso.errosPorAresta, atual.capitulo.capitulo.id, atual.antes, atual.esperado)
  mostrandoErro.value = true
  tabuleiro.value?.sincronizar()
  espera = setTimeout(proxima, TEMPO_DO_ERRO_MS)
}

onBeforeUnmount(() => {
  clearInterval(relogio)
  clearTimeout(espera)
})
</script>

<template>
  <div v-if="fase === 'jogando' && pergunta" class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="pergunta.fen"
        :orientacao="orientacao"
        :formas="formas"
        :jogavel="!mostrandoErro"
        :capturadas="false"
        @lance="aoJogar"
      />
    </div>
    <div class="painel">
      <div class="placar-relampago">
        <span class="tempo" :class="{ acabando: restanteMs < 10_000 }">{{ tempo }}</span>
        <span class="acertos">✓ {{ acertos }}</span>
        <span class="erros">✗ {{ erros }}</span>
      </div>
      <CartaoDica tipo="nota">
        <p class="instrucao">
          <strong>{{ fmtTexto(pergunta.capitulo.capitulo.nome) }}</strong> · {{ pergunta.cor === 'w' ? 'brancas' : 'pretas' }} jogam
        </p>
        <p v-if="contexto" class="suave lance">{{ contexto }}</p>
      </CartaoDica>
      <CartaoDica
        v-if="mostrandoErro"
        tipo="errado"
        :lance="fmtLance(pergunta.antes.length + 1, pergunta.esperado.san)"
        texto="Era o lance da seta."
      />
      <button type="button" class="botao fantasma largo-celular" @click="terminar">Parar</button>
    </div>
  </div>

  <div v-else class="pagina formulario">
    <RouterLink to="/" class="trilha">‹ Início</RouterLink>
    <h1 class="titulo-pagina">Relâmpago</h1>

    <template v-if="fase === 'fim'">
      <dl class="placar-final">
        <div><dt>Acertos</dt><dd class="ok">{{ acertos }}</dd></div>
        <div><dt>Erros</dt><dd class="erro">{{ erros }}</dd></div>
        <div><dt>Recorde ({{ config.minutosRelampago }} min)</dt><dd>{{ recorde }}</dd></div>
      </dl>
      <p v-if="recordeNovo" class="destaque">Recorde novo!</p>
      <p v-if="erros" class="suave">Os lances que você errou foram para “Treinar meus erros”.</p>
    </template>
    <p v-else>
      Posições sorteadas {{ repertorioEscolhido ? 'do seu repertório' : 'de todas as aberturas' }}, sempre na vez da cor que você
      treina em cada uma. Jogue o lance do livro o mais rápido que puder; se errar, a seta mostra o certo e vem a próxima.
    </p>

    <label class="campo">
      <span>Duração</span>
      <select v-model.number="config.minutosRelampago">
        <option v-for="m in MINUTOS" :key="m" :value="m">
          {{ m }} {{ m === 1 ? 'minuto' : 'minutos' }} · recorde {{ progresso.relampago[String(m)] ?? 0 }}
        </option>
      </select>
    </label>
    <p v-if="!capitulos.length" class="erro">Nenhuma abertura disponível.</p>
    <div class="acoes">
      <button type="button" class="botao primario grande largo-celular" :disabled="!capitulos.length" @click="comecar">
        {{ fase === 'fim' ? 'Jogar de novo' : 'Começar' }}
      </button>
      <RouterLink v-if="fase === 'fim' && erros" class="botao largo-celular" to="/erros">Treinar meus erros</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.formulario {
  display: grid;
  gap: var(--espaco-4);
  align-content: start;
}
.titulo-pagina {
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
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.instrucao {
  margin: 0;
}
.erro {
  color: var(--erro);
}
.destaque {
  margin: 0;
  color: var(--ok);
  font: 600 20px/28px var(--font-titulo);
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
.placar-relampago {
  display: flex;
  align-items: baseline;
  gap: var(--espaco-4);
  font-variant-numeric: tabular-nums;
}
.tempo {
  font: 600 36px/40px var(--font-titulo);
}
.tempo.acabando {
  color: var(--erro);
}
.acertos {
  color: var(--ok);
  font-size: 20px;
  font-weight: 600;
}
.erros {
  color: var(--erro);
  font-size: 20px;
  font-weight: 600;
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
.placar-final .erro {
  color: var(--erro);
}
</style>
