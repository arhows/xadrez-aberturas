<script setup lang="ts">
import { Chess } from 'chess.js'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import {
  buscarEstrutura,
  chaveDaPartidaModelo,
  corDoVencedor,
  INICIO_DO_QUIZ,
  marcasDaPartida,
  perguntasDoQuiz,
} from '../lib/estrategia'
import { fmtLance, fmtSan } from '../lib/formato'
import type { Cor } from '../lib/lances'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'

/** Partida-modelo: percorrer lance a lance ou adivinhar os lances de um dos lados. */

const route = useRoute()
const estrutura = buscarEstrutura(route.params.id as string)!
const partida = estrutura.partidas.find((p) => p.n === Number(route.params.n))!
const sans = partida.lances.split(' ')
const marcas = marcasDaPartida(partida)
const proxima = estrutura.partidas.find((p) => p.n === partida.n + 1)

/** Posições depois de cada meio-lance (0 = inicial). */
const posicoes = (() => {
  const jogo = new Chess()
  const lista = [{ fen: jogo.fen(), ultimo: null as [string, string] | null }]
  for (const san of sans) {
    const m = jogo.move(san)
    lista.push({ fen: jogo.fen(), ultimo: [m.from, m.to] })
  }
  return lista
})()

const modo = ref<'ver' | 'quiz'>('ver')
const ply = ref(0)
const orientacao = ref<'white' | 'black'>('white')
const sansMarcados = sans.map((san, i) => san + (marcas.get(i) ?? ''))

// ---------- Ver ----------
function ir(p: number) {
  ply.value = Math.max(0, Math.min(sans.length, p))
}
function aoTeclar(e: KeyboardEvent) {
  if (modo.value !== 'ver') return
  if (e.key === 'ArrowLeft') ir(ply.value - 1)
  if (e.key === 'ArrowRight') ir(ply.value + 1)
  if (e.key === 'Home') ir(0)
  if (e.key === 'End') ir(sans.length)
}
onMounted(() => window.addEventListener('keydown', aoTeclar))
onBeforeUnmount(() => window.removeEventListener('keydown', aoTeclar))

// ---------- Quiz ----------
const corQuiz = ref<Cor>(corDoVencedor(partida))
const perguntas = computed(() => perguntasDoQuiz(partida, corQuiz.value))
const acertos = ref(0)
const respondidas = ref(0)
const fimQuiz = ref(false)
const aguardando = ref(false)
const aviso = ref<{ tipo: 'certo' | 'errado' | 'neutro'; lance?: string; texto?: string } | null>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
const mostrarResposta = ref<[string, string] | null>(null)
let temporizador: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(temporizador))

const nomeDaCor = (c: Cor) => (c === 'w' ? partida.brancas : partida.pretas)

function comecarQuiz(cor: Cor) {
  clearTimeout(temporizador)
  corQuiz.value = cor
  modo.value = 'quiz'
  orientacao.value = cor === 'w' ? 'white' : 'black'
  acertos.value = 0
  respondidas.value = 0
  fimQuiz.value = false
  mostrarResposta.value = null
  ply.value = perguntas.value[0] ?? INICIO_DO_QUIZ
  aviso.value = { tipo: 'neutro', texto: `Você joga com as ${cor === 'w' ? 'brancas' : 'pretas'}: ache cada lance de ${nomeDaCor(cor)}.` }
}

function avancarAteAPergunta() {
  const proximaPergunta = perguntas.value.find((i) => i >= ply.value)
  if (proximaPergunta === undefined) {
    terminar()
    return
  }
  ply.value = proximaPergunta
}

function terminar() {
  fimQuiz.value = true
  ply.value = sans.length
  const total = respondidas.value
  if (!total) return
  const chave = chaveDaPartidaModelo(estrutura.id, partida.n)
  const anterior = progresso.estrategia[chave]
  const taxa = (x: { acertos: number; total: number }) => x.acertos / x.total
  const atual = { acertos: acertos.value, total, data: new Date().toISOString() }
  if (!anterior || taxa(atual) >= taxa(anterior)) progresso.estrategia[chave] = atual
  aviso.value = { tipo: 'certo', texto: `Fim da partida: você acertou ${acertos.value} de ${total} lances de ${nomeDaCor(corQuiz.value)}.` }
}

function aoJogar(de: string, para: string) {
  if (modo.value !== 'quiz' || aguardando.value || fimQuiz.value) {
    tabuleiro.value?.sincronizar()
    return
  }
  const i = ply.value
  let san: string
  try {
    san = new Chess(posicoes[i].fen).move({ from: de, to: para, promotion: 'q' }).san
  } catch {
    tabuleiro.value?.sincronizar()
    return
  }
  const certo = sans[i]
  const semSinais = (x: string) => x.replace(/[+#]/g, '')
  const acertou = semSinais(san) === semSinais(certo)
  respondidas.value++
  const rotulo = fmtLance(i + 1, certo) + (marcas.get(i) ?? '')
  if (acertou) {
    acertos.value++
    tocar('certo')
    aviso.value = { tipo: 'certo', lance: rotulo, texto: marcas.get(i)?.startsWith('!') ? 'Lance-chave da partida!' : '' }
  } else {
    tocar('errado')
    aviso.value = { tipo: 'errado', lance: fmtSan(san), texto: `${nomeDaCor(corQuiz.value)} jogou ${rotulo}.` }
    mostrarResposta.value = posicoes[i + 1].ultimo
  }
  // Mostra o lance da partida, depois a resposta do adversário, e para na próxima pergunta.
  aguardando.value = true
  ply.value = i + 1
  temporizador = setTimeout(
    () => {
      mostrarResposta.value = null
      if (i + 2 > sans.length) {
        aguardando.value = false
        terminar()
        return
      }
      ply.value = i + 2
      aguardando.value = false
      avancarAteAPergunta()
    },
    acertou ? 900 : 1800,
  )
}

function sairDoQuiz() {
  clearTimeout(temporizador)
  modo.value = 'ver'
  aviso.value = null
  aguardando.value = false
}

const fen = computed(() => posicoes[ply.value].fen)
const ultimoLance = computed(() => posicoes[ply.value].ultimo)
const formas = computed<Forma[]>(() => (mostrarResposta.value ? [{ de: mostrarResposta.value[0], para: mostrarResposta.value[1], cor: 'green' }] : []))
const jogavel = computed(() => modo.value === 'quiz' && !aguardando.value && !fimQuiz.value)
const historicoAte = computed(() => (modo.value === 'quiz' && !fimQuiz.value ? sansMarcados.slice(0, ply.value) : sansMarcados))
const marcaAtual = computed(() => (ply.value > 0 ? marcas.get(ply.value - 1) : undefined))
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" :to="{ name: 'estrutura', params: { id: estrutura.id } }" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>{{ partida.brancas.split(' ').at(-1) }} – {{ partida.pretas.split(' ').at(-1) }}</h1>
  </header>

  <div class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :formas="formas"
        :jogavel="jogavel"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink :to="{ name: 'estrutura', params: { id: estrutura.id } }" class="trilha">‹ {{ estrutura.nome }}</RouterLink>
        <h1 class="titulo-pagina">{{ partida.brancas }} – {{ partida.pretas }}</h1>
        <p class="suave">{{ partida.evento }}{{ partida.resultado !== '*' ? ` · ${partida.resultado}` : '' }}</p>
      </div>
      <p class="objetivo"><strong>Objetivo:</strong> {{ partida.objetivo }}</p>
      <p v-if="!partida.completa" class="suave">A partida aparece até o lance {{ Math.ceil(sans.length / 2) }} (o restante não pôde ser conferido no livro).</p>

      <template v-if="modo === 'ver'">
        <div class="navegacao" role="group" aria-label="Navegar nos lances">
          <button type="button" class="botao" :disabled="ply === 0" aria-label="Início" @click="ir(0)">⏮</button>
          <button type="button" class="botao" :disabled="ply === 0" aria-label="Lance anterior" @click="ir(ply - 1)">◀</button>
          <button type="button" class="botao" :disabled="ply >= sans.length" aria-label="Próximo lance" @click="ir(ply + 1)">▶</button>
          <button type="button" class="botao" :disabled="ply >= sans.length" aria-label="Fim" @click="ir(sans.length)">⏭</button>
          <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
        </div>
        <p v-if="marcaAtual" class="suave">O livro marca este lance com <strong>{{ marcaAtual }}</strong>.</p>
        <section class="cartao quiz-convite">
          <strong>Adivinhe os lances</strong>
          <span class="suave">A partir do lance {{ INICIO_DO_QUIZ / 2 + 1 }}, você tenta achar cada lance do lado escolhido.</span>
          <div class="acoes">
            <button type="button" class="botao" :class="{ primario: corDoVencedor(partida) === 'w' }" @click="comecarQuiz('w')">Jogar com as brancas</button>
            <button type="button" class="botao" :class="{ primario: corDoVencedor(partida) === 'b' }" @click="comecarQuiz('b')">Jogar com as pretas</button>
          </div>
        </section>
      </template>

      <template v-else>
        <CartaoDica v-if="aviso" :tipo="aviso.tipo" :lance="aviso.lance" :texto="aviso.texto" />
        <p class="placar">✓ {{ acertos }} de {{ respondidas }}<span class="suave"> · {{ perguntas.length }} lances no total</span></p>
        <p v-if="jogavel" class="corpo-forte">Qual lance {{ nomeDaCor(corQuiz) }} jogou?</p>
        <div class="acoes">
          <button v-if="fimQuiz" type="button" class="botao primario" @click="comecarQuiz(corQuiz)">↺ De novo</button>
          <button type="button" class="botao" @click="sairDoQuiz">{{ fimQuiz ? 'Rever a partida' : 'Sair do quiz' }}</button>
        </div>
      </template>

      <HistoricoLances :lances="historicoAte" :atual="ply" :clicavel="modo === 'ver'" @ir="ir" />

      <div class="acoes">
        <RouterLink class="botao" :to="{ name: 'analise', query: { c: partida.lances, titulo: `${partida.brancas} – ${partida.pretas}`, volta: route.fullPath } }">Analisar com o Stockfish</RouterLink>
        <RouterLink v-if="proxima" class="botao" :to="{ name: 'partida-modelo', params: { id: estrutura.id, n: proxima.n } }">Próxima partida →</RouterLink>
      </div>
    </div>
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
.cabeca-painel {
  display: grid;
  gap: var(--espaco-1);
}
.cabeca-painel .titulo-pagina,
.cabeca-painel p {
  margin: 0;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.objetivo {
  margin: 0;
  line-height: 1.5;
}
.navegacao,
.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2);
}
.quiz-convite {
  display: grid;
  gap: var(--espaco-2);
}
.placar {
  margin: 0;
  color: var(--ok);
  font-weight: 700;
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
