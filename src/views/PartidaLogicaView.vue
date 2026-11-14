<script setup lang="ts">
import { Chess } from 'chess.js'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Ilustracao from '../components/Ilustracao.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { avaliarPosicao } from '../lib/avaliador'
import { fmtLance, fmtSan, fmtTexto } from '../lib/formato'
import {
  buscarPartidaLogica,
  chaveDoLogico,
  corDoVencedorLogico,
  NOME_PRINCIPIO,
  notasPorPly,
  partidaPronta,
  posicoesDaPartida,
  principiosDaPartida,
  TEXTO_DO_VEREDICTO,
  veredictoDoPalpite,
  type NotaDoLance,
  type VeredictoDoPalpite,
} from '../lib/logico'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'

/**
 * Uma partida do Lance a lance: você joga com o lado vencedor e tenta achar cada lance. Acertou,
 * lê o porquê; jogou outro, o Stockfish compara o seu lance com o da partida.
 */
const route = useRoute()
const partida = buscarPartidaLogica(Number(route.params.n))!
const sans = partida.lances.split(' ')
const posicoes = posicoesDaPartida(partida)
const notas = notasPorPly(partida)
const vencedor = corDoVencedorLogico(partida)
const nomeDoVencedor = vencedor === 'w' ? partida.brancas : partida.pretas
const ladoDoVencedor = vencedor === 'w' ? 'brancas' : 'pretas'
const principios = principiosDaPartida(partida)
const proxima = (() => {
  const seguinte = buscarPartidaLogica(partida.n + 1)
  return seguinte && partidaPronta(seguinte) ? seguinte : null
})()
const PROFUNDIDADE = 12

const moveDoVencedor = (ply: number) => (ply % 2 === 0 ? 'w' : 'b') === vencedor
/** Lances do vencedor: as perguntas. */
const total = sans.filter((_, ply) => moveDoVencedor(ply)).length

const fase = ref<'intro' | 'pergunta' | 'resposta' | 'fim'>('intro')
const ply = ref(0)
const acertos = ref(0)
const respondidas = ref(0)
/** O que aparece depois de cada pergunta. */
const resposta = ref<{
  acertou: boolean
  mostrou: boolean
  palpite?: string
  lance: string
  nota?: NotaDoLance
  veredicto?: VeredictoDoPalpite | 'avaliando' | null
} | null>(null)
/** A resposta do adversário, com a nota quando houver. */
const lanceDoAdversario = ref<{ lance: string; nota?: NotaDoLance } | null>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
let versao = 0
let temporizador: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(temporizador))

const rotulo = (p: number) => fmtLance(p + 1, sans[p])

function comecar() {
  clearTimeout(temporizador)
  versao++
  ply.value = 0
  acertos.value = 0
  respondidas.value = 0
  resposta.value = null
  lanceDoAdversario.value = null
  fase.value = 'pergunta'
  vezDoAdversario()
}

/** Joga o lance do adversário (com uma pausa, para dar para ver) e para na próxima pergunta. */
function vezDoAdversario() {
  if (ply.value >= sans.length) return terminar()
  if (moveDoVencedor(ply.value)) return
  const minha = versao
  temporizador = setTimeout(
    () => {
      if (minha !== versao) return
      const p = ply.value
      lanceDoAdversario.value = { lance: rotulo(p), nota: notas[p] }
      ply.value = p + 1
      if (ply.value >= sans.length) terminar()
    },
    ply.value === 0 ? 300 : 450,
  )
}

function aoJogar(de: string, para: string) {
  if (fase.value !== 'pergunta' || !moveDoVencedor(ply.value)) {
    tabuleiro.value?.sincronizar()
    return
  }
  const p = ply.value
  let palpite: string
  try {
    palpite = new Chess(posicoes[p].fen).move({ from: de, to: para, promotion: 'q' }).san
  } catch {
    tabuleiro.value?.sincronizar()
    return
  }
  const semSinais = (x: string) => x.replace(/[+#!?]/g, '')
  const acertou = semSinais(palpite) === semSinais(sans[p])
  respondidas.value++
  if (acertou) acertos.value++
  tocar(acertou ? 'certo' : 'errado')
  resposta.value = { acertou, mostrou: false, palpite, lance: rotulo(p), nota: notas[p], veredicto: acertou ? null : 'avaliando' }
  lanceDoAdversario.value = null
  ply.value = p + 1
  fase.value = 'resposta'
  if (!acertou) void compararComStockfish(p, palpite)
}

/** Avalia a posição depois do seu lance e depois do lance da partida. */
async function compararComStockfish(p: number, palpite: string) {
  const minha = versao
  const depoisDoPalpite = new Chess(posicoes[p].fen)
  depoisDoPalpite.move(palpite)
  const cpDe = async (jogo: Chess) => {
    if (jogo.isCheckmate()) return jogo.turn() === 'w' ? -20000 : 20000
    if (jogo.isDraw()) return 0
    return (await avaliarPosicao(jogo.fen(), PROFUNDIDADE)).cp
  }
  try {
    const cpPalpite = await cpDe(depoisDoPalpite)
    const cpPartida = await cpDe(new Chess(posicoes[p + 1].fen))
    if (minha !== versao || !resposta.value) return
    resposta.value.veredicto = cpPalpite === null || cpPartida === null ? null : veredictoDoPalpite(cpPalpite, cpPartida, vencedor)
  } catch {
    if (minha === versao && resposta.value) resposta.value.veredicto = null
  }
}

/** "Mostrar o lance": conta como pergunta respondida, sem acerto. */
function mostrarLance() {
  if (fase.value !== 'pergunta') return
  const p = ply.value
  respondidas.value++
  resposta.value = { acertou: false, mostrou: true, lance: rotulo(p), nota: notas[p] }
  lanceDoAdversario.value = null
  ply.value = p + 1
  fase.value = 'resposta'
}

function continuar() {
  if (fase.value !== 'resposta') return
  resposta.value = null
  if (ply.value >= sans.length) return terminar()
  fase.value = 'pergunta'
  vezDoAdversario()
}

function terminar() {
  clearTimeout(temporizador)
  fase.value = 'fim'
  ply.value = sans.length
  if (!respondidas.value) return
  const chave = chaveDoLogico(partida.n)
  const anterior = progresso.estrategia[chave]
  const atual = { acertos: acertos.value, total: respondidas.value, data: new Date().toISOString() }
  const taxa = (x: { acertos: number; total: number }) => x.acertos / x.total
  if (!anterior || taxa(atual) >= taxa(anterior)) progresso.estrategia[chave] = atual
}

// Rever a partida no fim: setas e o histórico clicável.
function ir(p: number) {
  if (fase.value === 'fim') ply.value = Math.max(0, Math.min(sans.length, p))
}
function aoTeclar(e: KeyboardEvent) {
  if ((e.target as HTMLElement)?.tagName === 'INPUT') return
  if (fase.value === 'resposta' && e.key === 'Enter') continuar()
  if (fase.value !== 'fim') return
  if (e.key === 'ArrowLeft') ir(ply.value - 1)
  if (e.key === 'ArrowRight') ir(ply.value + 1)
}
onMounted(() => window.addEventListener('keydown', aoTeclar))
onBeforeUnmount(() => window.removeEventListener('keydown', aoTeclar))

const fen = computed(() => posicoes[ply.value].fen)
const ultimoLance = computed(() => posicoes[ply.value].ultimo)
/** Quando o seu lance foi outro, a seta verde mostra o lance da partida. */
const formas = computed<Forma[]>(() => {
  const r = resposta.value
  const ultimo = posicoes[ply.value].ultimo
  return fase.value === 'resposta' && r && !r.acertou && ultimo ? [{ de: ultimo[0], para: ultimo[1], cor: 'green' }] : []
})
const jogavel = computed(() => fase.value === 'pergunta' && moveDoVencedor(ply.value) && ply.value < sans.length)
const historico = computed(() => (fase.value === 'fim' ? sans : sans.slice(0, ply.value)))
const nota = computed(() => (fase.value === 'fim' && ply.value > 0 ? notas[ply.value - 1] : undefined))
const porcentagem = computed(() => (respondidas.value ? Math.round((acertos.value / respondidas.value) * 100) : 0))
const textoDoVeredicto = (v: VeredictoDoPalpite | 'avaliando' | null | undefined) =>
  v === 'avaliando' ? 'O Stockfish está avaliando o seu lance…' : v ? TEXTO_DO_VEREDICTO[v] : ''
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" :to="{ name: 'lance-a-lance' }" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>{{ partida.n }}. {{ partida.brancas }} – {{ partida.pretas }}</h1>
  </header>

  <div class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="vencedor === 'w' ? 'white' : 'black'"
        :ultimo-lance="ultimoLance"
        :formas="formas"
        :jogavel="jogavel"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink :to="{ name: 'lance-a-lance' }" class="trilha">‹ Lance a lance</RouterLink>
        <h1 class="titulo-pagina">{{ partida.n }}. {{ partida.brancas }} – {{ partida.pretas }}</h1>
        <p class="suave">{{ partida.abertura }} · {{ partida.local }} {{ partida.ano }} · {{ partida.resultado.replace('1/2-1/2', '½-½') }}</p>
      </div>

      <!-- Antes de começar -->
      <template v-if="fase === 'intro'">
        <p v-if="partida.tema" class="tema"><strong>Tema:</strong> {{ partida.tema }}</p>
        <p v-if="partida.introducao" class="texto">{{ fmtTexto(partida.introducao) }}</p>
        <p class="suave">São {{ total }} lances de {{ nomeDoVencedor }} para você achar. Leia cada explicação antes de seguir.</p>
        <button type="button" class="botao primario grande largo-celular" @click="comecar">Começar com as {{ ladoDoVencedor }}</button>
      </template>

      <!-- Jogando -->
      <template v-else-if="fase !== 'fim'">
        <p class="placar" aria-live="polite">✓ {{ acertos }} de {{ respondidas }}<span class="suave"> · {{ total }} lances no total</span></p>

        <CartaoDica v-if="lanceDoAdversario && fase === 'pergunta'" tipo="nota" :lance="lanceDoAdversario.lance" :texto="lanceDoAdversario.nota?.texto" />

        <template v-if="fase === 'pergunta' && jogavel">
          <p class="corpo-forte pergunta">Qual lance você jogaria com as {{ ladoDoVencedor }}?</p>
          <button type="button" class="botao fantasma" @click="mostrarLance">Mostrar o lance da partida</button>
        </template>

        <template v-if="fase === 'resposta' && resposta">
          <CartaoDica v-if="resposta.acertou" tipo="certo" :lance="resposta.lance" />
          <article v-else class="cartao comparacao" role="status">
            <p v-if="!resposta.mostrou" class="seu-lance">Você jogou <strong>{{ fmtSan(resposta.palpite!) }}</strong>.</p>
            <p v-if="resposta.veredicto" class="veredicto" :class="resposta.veredicto">{{ textoDoVeredicto(resposta.veredicto) }}</p>
            <p class="na-partida">{{ nomeDoVencedor }} jogou <strong>{{ resposta.lance }}</strong> (seta verde).</p>
          </article>
          <CartaoDica v-if="resposta.nota" tipo="nota" :texto="resposta.nota.texto">
            <p v-if="resposta.nota.alternativa" class="alternativa"><strong>E se…?</strong> {{ fmtTexto(resposta.nota.alternativa) }}</p>
            <p v-if="resposta.nota.principios?.length" class="principios">
              <span v-for="principio in resposta.nota.principios" :key="principio" class="selo">{{ NOME_PRINCIPIO[principio] }}</span>
            </p>
          </CartaoDica>
          <button type="button" class="botao primario grande largo-celular" @click="continuar">Continuar</button>
        </template>
      </template>

      <!-- Fim -->
      <template v-else>
        <div class="conquista">
          <Ilustracao peca="king" tom="aprender" :festa="porcentagem >= 70" pequena />
          <h2 class="titulo-secao">{{ respondidas ? `Você achou ${acertos} de ${respondidas} lances (${porcentagem}%)` : 'Fim da partida' }}</h2>
        </div>
        <p v-if="partida.conclusao" class="texto">{{ fmtTexto(partida.conclusao) }}</p>
        <div v-if="principios.length" class="principios">
          <span class="rotulo">Princípios desta partida</span>
          <span v-for="item in principios" :key="item.principio" class="selo">{{ NOME_PRINCIPIO[item.principio] }} · {{ item.vezes }}</span>
        </div>
        <CartaoDica v-if="nota" tipo="nota" :lance="rotulo(ply - 1)" :texto="nota.texto">
          <p v-if="nota.alternativa" class="alternativa"><strong>E se…?</strong> {{ fmtTexto(nota.alternativa) }}</p>
        </CartaoDica>
        <div class="acoes">
          <button type="button" class="botao primario grande largo-celular" @click="comecar">↺ Jogar de novo</button>
          <RouterLink v-if="proxima" class="botao grande largo-celular" :to="{ name: 'lance-a-lance-partida', params: { n: proxima.n } }">
            Próxima: {{ proxima.brancas }} – {{ proxima.pretas }}
          </RouterLink>
        </div>
        <p class="suave">Toque nos lances abaixo para rever a partida com as explicações.</p>
      </template>

      <HistoricoLances :lances="historico" :atual="ply" :clicavel="fase === 'fim'" @ir="ir" />

      <div class="acoes mais-acoes">
        <RouterLink
          class="botao fantasma"
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
.cabeca-painel .titulo-pagina,
.cabeca-painel p,
.tema,
.texto,
.pergunta,
.placar,
.suave {
  margin: 0;
}
.suave {
  color: var(--texto-suave);
  font-size: 14px;
}
.texto,
.tema {
  line-height: 1.55;
}
.placar {
  color: var(--ok);
  font-weight: 700;
}
.alternativa {
  margin: var(--espaco-2) 0 0;
  padding-top: var(--espaco-2);
  border-top: 1px dashed var(--borda);
}
.comparacao {
  display: grid;
  gap: var(--espaco-2);
}
.comparacao p {
  margin: 0;
}
.veredicto {
  font-weight: 600;
}
.veredicto.melhor,
.veredicto.bom {
  color: var(--ok);
}
.veredicto.pior,
.veredicto.erro {
  color: var(--erro);
}
.principios {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2);
  margin: var(--espaco-2) 0 0;
}
.rotulo {
  width: 100%;
  color: var(--texto-suave);
  font: 600 11px/16px var(--font-texto);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.conquista {
  display: grid;
  justify-items: center;
  gap: var(--espaco-2);
  text-align: center;
}
.conquista h2 {
  margin: 0;
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
