<script setup lang="ts">
import { Chess } from 'chess.js'
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { fmtLance } from '../lib/formato'
import { progresso } from '../lib/progresso'
import {
  acertouOLance,
  buscarQuiz,
  casasDoLance,
  chaveDoQuiz,
  lanceDaAlternativa,
  melhorResultado,
  posicoesDaPartida,
  totalDePerguntas,
} from '../lib/quizzes'
import { tocar } from '../lib/som'

/**
 * Quiz de estratégia: a partida anda sozinha até cada pergunta; a pessoa joga o lance no
 * tabuleiro ou escolhe uma alternativa, lê a explicação e continua.
 */

const route = useRoute()
const quiz = buscarQuiz(route.params.id as string)!
const total = totalDePerguntas(quiz)
const posicoes = quiz.partidas.map(posicoesDaPartida)
const sans = quiz.partidas.map((p) => p.lances.split(' '))

const ip = ref(0)
const iq = ref(0)
const ply = ref(0)
const fase = ref<'andando' | 'pergunta' | 'respondida' | 'fim'>('andando')
const acertos = ref(0)
const respondidas = ref(0)
const ultimaCerta = ref(false)
const escolhida = ref<number | null>(null)
const lanceJogado = ref<string | null>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()

const partida = computed(() => quiz.partidas[ip.value])
const pergunta = computed(() => partida.value.perguntas[iq.value])
const posicao = computed(() => posicoes[ip.value][ply.value])
const numeroDaPergunta = computed(() => quiz.partidas.slice(0, ip.value).reduce((s, p) => s + p.perguntas.length, 0) + iq.value + 1)
const vezNaPergunta = (i: number, j: number) => new Chess(posicoes[i][quiz.partidas[i].perguntas[j]?.depois ?? 0].fen).turn()
const orientacao = ref<'white' | 'black'>(vezNaPergunta(0, 0) === 'w' ? 'white' : 'black')
const nomeDoLado = computed(() => (new Chess(posicao.value.fen).turn() === 'w' ? 'brancas' : 'pretas'))

let temporizador: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(temporizador))

/** Anda pela partida até o meio-lance `alvo`; trechos longos pulam direto para perto da pergunta. */
function andarAte(alvo: number, depois: () => void) {
  clearTimeout(temporizador)
  fase.value = 'andando'
  if (alvo - ply.value > 8) ply.value = alvo - 4
  const passo = () => {
    if (ply.value >= alvo) {
      depois()
      return
    }
    ply.value++
    temporizador = setTimeout(passo, 450)
  }
  temporizador = setTimeout(passo, ply.value === 0 ? 300 : 450)
}

function abrirPergunta() {
  escolhida.value = null
  lanceJogado.value = null
  andarAte(pergunta.value.depois, () => (fase.value = 'pergunta'))
}

function registrar(certo: boolean) {
  respondidas.value++
  ultimaCerta.value = certo
  if (certo) acertos.value++
  tocar(certo ? 'certo' : 'errado')
  fase.value = 'respondida'
}

function aoJogar(de: string, para: string) {
  const q = pergunta.value
  if (fase.value !== 'pergunta' || q.tipo !== 'lance') {
    tabuleiro.value?.sincronizar()
    return
  }
  let san: string
  try {
    san = new Chess(posicao.value.fen).move({ from: de, to: para, promotion: 'q' }).san
  } catch {
    tabuleiro.value?.sincronizar()
    return
  }
  lanceJogado.value = san
  tabuleiro.value?.sincronizar()
  registrar(acertouOLance(q, san))
}

function escolher(i: number) {
  const q = pergunta.value
  if (fase.value !== 'pergunta' || q.tipo !== 'escolha') return
  escolhida.value = i
  registrar(i === q.certa)
}

function continuar() {
  if (iq.value + 1 < partida.value.perguntas.length) {
    iq.value++
    abrirPergunta()
    return
  }
  if (ip.value + 1 < quiz.partidas.length) {
    ip.value++
    iq.value = 0
    ply.value = 0
    orientacao.value = vezNaPergunta(ip.value, 0) === 'w' ? 'white' : 'black'
    abrirPergunta()
    return
  }
  terminar()
}

function terminar() {
  clearTimeout(temporizador)
  fase.value = 'fim'
  ply.value = sans[ip.value].length
  const chave = chaveDoQuiz(quiz.id)
  progresso.estrategia[chave] = melhorResultado(progresso.estrategia[chave], {
    acertos: acertos.value,
    total: respondidas.value,
    data: new Date().toISOString(),
  })
}

function recomecar() {
  ip.value = 0
  iq.value = 0
  ply.value = 0
  acertos.value = 0
  respondidas.value = 0
  orientacao.value = vezNaPergunta(0, 0) === 'w' ? 'white' : 'black'
  abrirPergunta()
}

function ir(p: number) {
  if (fase.value === 'fim') ply.value = Math.max(0, Math.min(sans[ip.value].length, p))
}

/** Seta verde com a resposta depois de responder (lance certo ou alternativa que é lance). */
const formas = computed<Forma[]>(() => {
  if (fase.value !== 'respondida') return []
  const q = pergunta.value
  const casas = q.tipo === 'lance' ? casasDoLance(posicao.value.fen, q.resposta) : lanceDaAlternativa(posicao.value.fen, q.opcoes[q.certa])
  return casas ? [{ de: casas[0], para: casas[1], cor: 'green' }] : []
})

const rotuloDaResposta = computed(() => {
  const q = pergunta.value
  if (q.tipo === 'lance') return fmtLance(q.depois + 1, q.resposta)
  return `${'ABCDEF'[q.certa]}) ${q.opcoes[q.certa]}`
})

const historico = computed(() => sans[ip.value].slice(0, ply.value))
const resultado = computed(() => progresso.estrategia[chaveDoQuiz(quiz.id)])

abrirPergunta()
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" :to="{ name: 'estrategia' }" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>Quiz · {{ quiz.nome }}</h1>
  </header>

  <div class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="posicao.fen"
        :orientacao="orientacao"
        :ultimo-lance="posicao.ultimo"
        :formas="formas"
        :jogavel="fase === 'pergunta' && pergunta.tipo === 'lance'"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink :to="{ name: 'estrategia' }" class="trilha">‹ Estratégia</RouterLink>
        <h1 class="titulo-pagina">Quiz · {{ quiz.nome }}</h1>
      </div>
      <p class="suave">{{ partida.brancas }} – {{ partida.pretas }} · {{ partida.evento }}</p>

      <template v-if="fase !== 'fim'">
        <p class="placar">
          Pergunta {{ numeroDaPergunta }} de {{ total }}<span class="suave"> · ✓ {{ acertos }} de {{ respondidas }}</span>
        </p>

        <p v-if="fase === 'andando'" class="suave">A partida segue até a próxima pergunta…</p>

        <template v-else>
          <p class="pergunta corpo-forte">
            <span class="marcador" :class="nomeDoLado === 'brancas' ? 'w' : 'b'" aria-hidden="true"></span>
            {{ pergunta.pergunta }}
          </p>
          <p v-if="fase === 'pergunta' && pergunta.tipo === 'lance'" class="suave">Jogue o lance das {{ nomeDoLado }} no tabuleiro.</p>

          <div v-if="pergunta.tipo === 'escolha'" class="opcoes" role="group" aria-label="Alternativas">
            <button
              v-for="(opcao, i) in pergunta.opcoes"
              :key="i"
              type="button"
              class="opcao"
              :class="{
                certa: fase === 'respondida' && i === pergunta.certa,
                errada: fase === 'respondida' && i === escolhida && i !== pergunta.certa,
              }"
              :disabled="fase !== 'pergunta'"
              @click="escolher(i)"
            >
              <span class="letra">{{ 'ABCDEF'[i] }}</span>
              <span>{{ opcao }}</span>
            </button>
          </div>

          <template v-if="fase === 'respondida'">
            <CartaoDica
              :tipo="ultimaCerta ? 'certo' : 'errado'"
              :lance="ultimaCerta ? rotuloDaResposta : (lanceJogado ?? undefined)"
              :texto="ultimaCerta ? null : `A resposta é ${rotuloDaResposta}.`"
            />
            <CartaoDica tipo="nota" :texto="pergunta.explicacao" />
            <div class="acoes">
              <button type="button" class="botao primario" @click="continuar">Continuar →</button>
            </div>
          </template>
        </template>
      </template>

      <template v-else>
        <CartaoDica tipo="certo" :texto="`Fim do quiz: você acertou ${acertos} de ${respondidas} perguntas.`" />
        <p v-if="resultado" class="suave">Seu melhor resultado: {{ resultado.acertos }} de {{ resultado.total }}.</p>
        <div class="acoes">
          <button type="button" class="botao primario" @click="recomecar">↺ De novo</button>
          <RouterLink class="botao" :to="{ name: 'estrategia' }">Outros quizzes</RouterLink>
        </div>
      </template>

      <HistoricoLances :lances="historico" :atual="ply" :clicavel="fase === 'fim'" @ir="ir" />

      <div class="acoes">
        <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
        <RouterLink
          v-if="fase === 'fim'"
          class="botao"
          :to="{ name: 'analise', query: { c: partida.lances, titulo: `${partida.brancas} – ${partida.pretas}`, volta: route.fullPath } }"
        >Analisar com o Stockfish</RouterLink>
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
.cabeca-painel .titulo-pagina {
  margin: 0;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.placar {
  margin: 0;
  font-weight: 700;
}
.pergunta {
  display: flex;
  gap: var(--espaco-2);
  align-items: baseline;
  margin: 0;
  line-height: 1.5;
}
.marcador {
  flex: none;
  width: 12px;
  height: 12px;
  border: 1.5px solid var(--texto);
  border-radius: 50%;
}
.marcador.w {
  background: #fff;
}
.marcador.b {
  background: #222;
}
.opcoes {
  display: grid;
  gap: var(--espaco-2);
}
.opcao {
  display: flex;
  align-items: center;
  gap: var(--espaco-2);
  min-height: var(--alvo-toque);
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--borda);
  border-radius: 10px;
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.opcao:hover:not(:disabled) {
  background: var(--superficie-2);
}
.opcao:disabled {
  cursor: default;
}
.opcao.certa {
  border-color: var(--ok);
  box-shadow: inset 0 0 0 1px var(--ok);
}
.opcao.errada {
  border-color: var(--erro, #c0392b);
  box-shadow: inset 0 0 0 1px var(--erro, #c0392b);
}
.letra {
  flex: none;
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--superficie-2);
  font-weight: 700;
  font-size: 13px;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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
