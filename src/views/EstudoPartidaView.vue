<script setup lang="ts">
import { Chess } from 'chess.js'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import {
  corDoLance,
  perguntasDoEstudo,
  posicoesDoEstudo,
  registrarErroNoEstudo,
  separar,
  type LadoDoEstudo,
} from '../lib/estudoPartidas'
import { fmtLance, fmtSan } from '../lib/formato'
import { lancesAntesDoFen } from '../lib/jogo'
import type { Cor } from '../lib/lances'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'

/** Uma partida do Estudo de partidas: rever lance a lance ou adivinhar os lances de um lado. */

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const estudo = computed(() => progresso.estudos[id]!)
const sans = separar(estudo.value.lances)
const posicoes = posicoesDoEstudo(estudo.value)
const antes = lancesAntesDoFen(estudo.value.fen)
const fmtNum = (i: number, san: string) => fmtLance(antes + i + 1, san)

const NOME_DA_COR: Record<Cor, string> = { w: 'as brancas', b: 'as pretas' }
const ladoInicial = (lado: LadoDoEstudo): 'white' | 'black' => (lado === 'b' ? 'black' : 'white')

const modo = ref<'ver' | 'quiz'>('ver')
const ply = ref(0)
const orientacao = ref<'white' | 'black'>(ladoInicial(estudo.value.lado))

// ---------- Ver ----------
function ir(p: number) {
  ply.value = Math.max(0, Math.min(sans.length, p))
}
function aoTeclar(e: KeyboardEvent) {
  if (modo.value !== 'ver' || (e.target as HTMLElement)?.tagName === 'INPUT') return
  if (e.key === 'ArrowLeft') ir(ply.value - 1)
  if (e.key === 'ArrowRight') ir(ply.value + 1)
  if (e.key === 'Home') ir(0)
  if (e.key === 'End') ir(sans.length)
}
onMounted(() => window.addEventListener('keydown', aoTeclar))
onBeforeUnmount(() => window.removeEventListener('keydown', aoTeclar))

// ---------- Adivinhar ----------
const perguntas = ref<number[]>([])
const desde = ref(0)
const acertos = ref(0)
const respondidas = ref(0)
const fimQuiz = ref(false)
const aguardando = ref(false)
const aviso = ref<{ tipo: 'certo' | 'errado' | 'neutro'; lance?: string; texto?: string } | null>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
const mostrarResposta = ref<[string, string] | null>(null)
let temporizador: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(temporizador))

/** Começa da posição mostrada no tabuleiro (no início, a partida toda). */
function comecarQuiz() {
  clearTimeout(temporizador)
  const inicio = ply.value >= sans.length ? 0 : ply.value
  desde.value = inicio
  perguntas.value = perguntasDoEstudo(estudo.value, estudo.value.lado, inicio)
  if (!perguntas.value.length) return
  modo.value = 'quiz'
  acertos.value = 0
  respondidas.value = 0
  fimQuiz.value = false
  mostrarResposta.value = null
  ply.value = perguntas.value[0]
  if (estudo.value.lado !== 'ambos') orientacao.value = ladoInicial(estudo.value.lado)
  const quem = estudo.value.lado === 'ambos' ? 'os lances dos dois lados' : `cada lance d${NOME_DA_COR[estudo.value.lado]}`
  aviso.value = { tipo: 'neutro', texto: `Ache ${quem}. Os lances que você errar entram na revisão.` }
}

function avancarAteAPergunta() {
  const proxima = perguntas.value.find((i) => i >= ply.value)
  if (proxima === undefined) terminar()
  else ply.value = proxima
}

function terminar() {
  fimQuiz.value = true
  ply.value = sans.length
  const total = respondidas.value
  if (!total) return
  const atual = { acertos: acertos.value, total, data: new Date().toISOString() }
  const anterior = estudo.value.melhor
  // Só a partida inteira conta como recorde.
  if (desde.value === 0 && (!anterior || atual.acertos / atual.total >= anterior.acertos / anterior.total)) {
    progresso.estudos[id] = { ...estudo.value, melhor: atual, atualizado: atual.data }
  }
  aviso.value = { tipo: 'certo', texto: `Fim: você acertou ${acertos.value} de ${total} lances.` }
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
  const certo = posicoes[i + 1].ultimo!
  const acertou = certo[0] === de && certo[1] === para
  respondidas.value++
  const rotulo = fmtNum(i, sans[i])
  if (acertou) {
    acertos.value++
    tocar('certo')
    aviso.value = { tipo: 'certo', lance: rotulo }
  } else {
    tocar('errado')
    registrarErroNoEstudo(progresso.cartoesEstudos, id, i)
    aviso.value = { tipo: 'errado', lance: fmtSan(san), texto: `Na partida: ${rotulo}.` }
    mostrarResposta.value = certo
  }
  aguardando.value = true
  ply.value = i + 1
  temporizador = setTimeout(
    () => {
      mostrarResposta.value = null
      aguardando.value = false
      if (i + 1 >= sans.length) {
        terminar()
        return
      }
      // Mostra o lance do outro lado antes da próxima pergunta.
      if (!perguntas.value.includes(i + 1)) ply.value = i + 2
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
const historicoAte = computed(() => (modo.value === 'quiz' && !fimQuiz.value ? sans.slice(0, ply.value) : sans))
const vezDe = computed(() => NOME_DA_COR[corDoLance(estudo.value, ply.value)])
const revisoesDaPartida = computed(() => Object.keys(progresso.cartoesEstudos).filter((c) => c.startsWith(`${id}/`)).length)

// ---------- Editar e apagar ----------
const editando = ref(false)
const nome = ref(estudo.value.nome)
const lado = ref<LadoDoEstudo>(estudo.value.lado)
const video = ref(estudo.value.video ?? '')
const confirmandoApagar = ref(false)

function salvarEdicao() {
  if (!nome.value.trim()) return
  const { video: _antigo, ...resto } = estudo.value
  progresso.estudos[id] = {
    ...resto,
    nome: nome.value.trim(),
    lado: lado.value,
    ...(video.value.trim() ? { video: video.value.trim() } : {}),
    atualizado: new Date().toISOString(),
  }
  editando.value = false
}

function apagar() {
  progresso.estudos[id] = { ...estudo.value, apagada: true, atualizado: new Date().toISOString() }
  for (const chave of Object.keys(progresso.cartoesEstudos)) if (chave.startsWith(`${id}/`)) delete progresso.cartoesEstudos[chave]
  void router.push({ name: 'estudo-partidas' })
}

const linkSeguro = computed(() => (/^https?:\/\//i.test(estudo.value.video ?? '') ? estudo.value.video : null))
const consultaAnalise = computed(() => ({
  c: estudo.value.lances,
  ...(estudo.value.fen ? { fen: estudo.value.fen } : {}),
  ...(estudo.value.lado !== 'ambos' ? { cor: estudo.value.lado } : {}),
  titulo: estudo.value.nome,
  volta: route.fullPath,
}))
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" :to="{ name: 'estudo-partidas' }" aria-label="Voltar: Estudo de partidas">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>{{ estudo.nome }}</h1>
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
        <RouterLink :to="{ name: 'estudo-partidas' }" class="trilha">‹ Estudo de partidas</RouterLink>
        <h1 class="titulo-pagina">{{ estudo.nome }}</h1>
      </div>
      <p class="suave">
        {{ Math.ceil(sans.length / 2) }} lances
        <template v-if="estudo.melhor"> · melhor no Adivinhar: {{ estudo.melhor.acertos }} de {{ estudo.melhor.total }}</template>
        <template v-if="revisoesDaPartida"> · {{ revisoesDaPartida }} {{ revisoesDaPartida === 1 ? 'lance na revisão' : 'lances na revisão' }}</template>
      </p>
      <a v-if="linkSeguro" class="trilha" :href="linkSeguro" target="_blank" rel="noopener noreferrer">▶ Ver o vídeo</a>

      <template v-if="modo === 'ver'">
        <div class="navegar" role="group" aria-label="Navegar nos lances">
          <button type="button" class="botao" :disabled="ply === 0" aria-label="Início" @click="ir(0)">⏮</button>
          <button type="button" class="botao" :disabled="ply === 0" aria-label="Lance anterior" @click="ir(ply - 1)">◀</button>
          <button type="button" class="botao" :disabled="ply >= sans.length" aria-label="Próximo lance" @click="ir(ply + 1)">▶</button>
          <button type="button" class="botao" :disabled="ply >= sans.length" aria-label="Fim" @click="ir(sans.length)">⏭</button>
          <button type="button" class="botao" aria-label="Girar o tabuleiro" title="Girar o tabuleiro" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">⇅</button>
        </div>
        <section class="cartao convite">
          <strong>Adivinhe os lances</strong>
          <span class="suave">
            <template v-if="ply > 0 && ply < sans.length">A partir desta posição (vez d{{ vezDe }}), </template>
            <template v-else>Desde o começo, </template>
            você tenta achar {{ estudo.lado === 'ambos' ? 'os lances dos dois lados' : `cada lance d${NOME_DA_COR[estudo.lado]}` }}.
            Os errados entram na revisão.
          </span>
          <div class="acoes">
            <button type="button" class="botao primario" @click="comecarQuiz">Adivinhar</button>
          </div>
        </section>
      </template>

      <template v-else>
        <CartaoDica v-if="aviso" :tipo="aviso.tipo" :lance="aviso.lance" :texto="aviso.texto" />
        <p class="placar">✓ {{ acertos }} de {{ respondidas }}<span class="suave"> · {{ perguntas.length }} lances no total</span></p>
        <p v-if="jogavel" class="corpo-forte">Qual lance {{ vezDe }} jogaram?</p>
        <div class="acoes">
          <button v-if="fimQuiz" type="button" class="botao primario" @click="ply = desde; comecarQuiz()">↺ De novo</button>
          <button type="button" class="botao" :class="{ fantasma: !fimQuiz }" @click="sairDoQuiz">{{ fimQuiz ? 'Rever a partida' : 'Parar' }}</button>
        </div>
      </template>

      <HistoricoLances :lances="historicoAte" :atual="ply" :antes="antes" :clicavel="modo === 'ver'" @ir="ir" />

      <div class="acoes mais-acoes">
        <RouterLink class="botao fantasma" :to="{ name: 'analise', query: consultaAnalise }">Analisar com o Stockfish</RouterLink>
        <RouterLink class="botao fantasma" :to="{ name: 'analisar', query: { estudo: id } }">Corrigir lances</RouterLink>
        <button type="button" class="botao fantasma" :aria-expanded="editando" @click="editando = !editando">Editar</button>
        <button type="button" class="botao fantasma" @click="confirmandoApagar = true">Apagar</button>
      </div>

      <div v-if="confirmandoApagar" class="cartao confirmar" role="alert">
        <span>Apagar "{{ estudo.nome }}" e as revisões dela?</span>
        <div class="acoes">
          <button type="button" class="botao perigo" @click="apagar">Apagar</button>
          <button type="button" class="botao fantasma" @click="confirmandoApagar = false">Cancelar</button>
        </div>
      </div>

      <form v-if="editando" class="cartao formulario" @submit.prevent="salvarEdicao">
        <label class="campo">
          <span>Nome</span>
          <input id="editar-nome" v-model="nome" type="text" maxlength="120" required />
        </label>
        <label class="campo">
          <span>Lado para adivinhar</span>
          <select id="editar-lado" v-model="lado">
            <option value="w">Brancas</option>
            <option value="b">Pretas</option>
            <option value="ambos">Os dois</option>
          </select>
        </label>
        <label class="campo">
          <span>Link do vídeo (opcional)</span>
          <input id="editar-video" v-model="video" type="url" placeholder="https://www.youtube.com/..." />
        </label>
        <div class="acoes">
          <button type="submit" class="botao primario" :disabled="!nome.trim()">Salvar</button>
          <button type="button" class="botao fantasma" @click="editando = false">Cancelar</button>
        </div>
      </form>
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
  overflow-wrap: anywhere;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.navegar {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--espaco-2);
}
.navegar .botao {
  padding: 0;
  font-size: 18px;
}
.convite,
.formulario,
.confirmar {
  display: grid;
  gap: var(--espaco-2);
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2);
}
.mais-acoes {
  padding-top: var(--espaco-3);
  border-top: 1px solid var(--borda);
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
