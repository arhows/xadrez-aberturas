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
  ehLivro,
  ehPergunta,
  LIVROS,
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
const livro = ehLivro(route.params.livro) ? route.params.livro : 'logico'
const momentosChave = LIVROS[livro].perguntas === 'chave'
const partida = buscarPartidaLogica(Number(route.params.n), livro)!
const sans = partida.lances.split(' ')
const posicoes = posicoesDaPartida(partida)
const notas = notasPorPly(partida)
const vencedor = corDoVencedorLogico(partida)
const nomeDoVencedor = vencedor === 'w' ? partida.brancas : partida.pretas
const ladoDoVencedor = vencedor === 'w' ? 'brancas' : 'pretas'
const principios = principiosDaPartida(partida)
const proxima = (() => {
  const seguinte = buscarPartidaLogica(partida.n + 1, livro)
  return seguinte && partidaPronta(seguinte) ? seguinte : null
})()
const PROFUNDIDADE = 12

/** Lances em que o app pergunta: todos os do vencedor, ou só os momentos-chave. */
const pergunta = (ply: number) => ehPergunta(partida, livro, ply)
const total = sans.filter((_, ply) => pergunta(ply)).length
const lista = livro === 'logico' ? { name: 'lance-a-lance' } : { name: 'lance-a-lance', query: { livro } }
const destinoDaPartida = (n: number) =>
  livro === 'logico' ? { name: 'lance-a-lance-partida', params: { n } } : { name: 'lance-a-lance-livro', params: { livro, n } }

const fase = ref<'intro' | 'pergunta' | 'resposta' | 'fim'>('intro')
const ply = ref(0)
const acertos = ref(0)
const respondidas = ref(0)
/** O que aparece depois de cada pergunta. */
const resposta = ref<{
  acertou: boolean
  mostrou: boolean
  palpite?: string
  /** Casas do seu lance, para a seta vermelha ao rever a posição de antes. */
  casasDoPalpite?: [string, string]
  lance: string
  nota?: NotaDoLance
  veredicto?: VeredictoDoPalpite | 'avaliando' | null
} | null>(null)
/**
 * Os lances que andaram sozinhos até a próxima pergunta (a resposta do adversário, ou, nos
 * momentos-chave, a sequência inteira), com a última nota que houver entre eles.
 */
const lanceDoAdversario = ref<{ lance: string; nota?: NotaDoLance } | null>(null)
/** A sequência automática parou numa nota (nos momentos-chave) e espera o "Continuar". */
const pausado = ref(false)
function seguirDaNota() {
  if (!pausado.value) return
  pausado.value = false
  vezDoAdversario()
}
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
let versao = 0
let temporizador: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(temporizador))

const rotulo = (p: number) => fmtLance(p + 1, sans[p])

function comecar() {
  revendo.value = null
  clearTimeout(temporizador)
  versao++
  ply.value = 0
  acertos.value = 0
  respondidas.value = 0
  resposta.value = null
  lanceDoAdversario.value = null
  pausado.value = false
  fase.value = 'pergunta'
  vezDoAdversario()
}

/** Joga os lances que não são pergunta (com uma pausa, para dar para ver) e para na próxima pergunta. */
function vezDoAdversario() {
  if (ply.value >= sans.length) return terminar()
  if (pergunta(ply.value)) return
  const minha = versao
  const primeiro = ply.value
  /** Os lances jogados nesta sequência; muitos (a abertura, nos momentos-chave) mostram só os 10 últimos. */
  const texto = (ate: number) => {
    const de = Math.max(primeiro, ate - 9)
    const partes: string[] = de > primeiro ? ['…'] : []
    for (let q = de; q <= ate; q++) partes.push(q === de || q % 2 === 0 ? rotulo(q) : fmtSan(sans[q]))
    return partes.join(' ')
  }
  const passo = () => {
    if (minha !== versao) return
    const p = ply.value
    lanceDoAdversario.value = { lance: texto(p), nota: notas[p] }
    ply.value = p + 1
    if (ply.value >= sans.length) return terminar()
    if (pergunta(ply.value)) return
    // Lance com nota no meio da sequência: para, para dar tempo de ler.
    if (notas[p]) pausado.value = true
    else temporizador = setTimeout(passo, 380)
  }
  temporizador = setTimeout(passo, ply.value === 0 ? 300 : 450)
}

function aoJogar(de: string, para: string) {
  if (fase.value !== 'pergunta' || !pergunta(ply.value)) {
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
  resposta.value = { acertou, mostrou: false, palpite, casasDoPalpite: [de, para], lance: rotulo(p), nota: notas[p], veredicto: acertou ? null : 'avaliando' }
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
  revendo.value = null
  const p = ply.value
  respondidas.value++
  resposta.value = { acertou: false, mostrou: true, lance: rotulo(p), nota: notas[p] }
  lanceDoAdversario.value = null
  ply.value = p + 1
  fase.value = 'resposta'
}

function continuar() {
  if (fase.value !== 'resposta') return
  revendo.value = null
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
  const chave = chaveDoLogico(partida.n, livro)
  const anterior = progresso.estrategia[chave]
  const atual = { acertos: acertos.value, total: respondidas.value, data: new Date().toISOString() }
  const taxa = (x: { acertos: number; total: number }) => x.acertos / x.total
  if (!anterior || taxa(atual) >= taxa(anterior)) progresso.estrategia[chave] = atual
}

// Rever a partida no fim: setas e o histórico clicável.
function ir(p: number) {
  if (fase.value === 'fim') ply.value = Math.max(0, Math.min(sans.length, p))
}

/**
 * Durante a partida: voltar e avançar pelas posições já jogadas sem mexer no andamento. Útil depois
 * de errar, para ver como estava a posição (e a peça capturada) antes do lance.
 */
const revendo = ref<number | null>(null)
const podeRever = computed(() => (fase.value === 'pergunta' || fase.value === 'resposta') && ply.value > 0)
function voltarPosicao() {
  if (!podeRever.value) return
  revendo.value = Math.max(0, (revendo.value ?? ply.value) - 1)
}
function avancarPosicao() {
  if (revendo.value === null) return
  const proxima = revendo.value + 1
  revendo.value = proxima >= ply.value ? null : proxima
}
function voltarAoAtual() {
  revendo.value = null
}
function aoTeclar(e: KeyboardEvent) {
  if ((e.target as HTMLElement)?.tagName === 'INPUT') return
  if (fase.value === 'resposta' && e.key === 'Enter') continuar()
  if (pausado.value && e.key === 'Enter') seguirDaNota()
  if (fase.value !== 'fim') {
    if (e.key === 'ArrowLeft') voltarPosicao()
    if (e.key === 'ArrowRight') avancarPosicao()
    return
  }
  if (e.key === 'ArrowLeft') ir(ply.value - 1)
  if (e.key === 'ArrowRight') ir(ply.value + 1)
}
onMounted(() => window.addEventListener('keydown', aoTeclar))
onBeforeUnmount(() => window.removeEventListener('keydown', aoTeclar))

/** A posição no tabuleiro: a atual, ou a que está sendo revista. */
const mostrado = computed(() => revendo.value ?? ply.value)
const fen = computed(() => posicoes[mostrado.value].fen)
const ultimoLance = computed(() => posicoes[mostrado.value].ultimo)
/**
 * Quando o seu lance foi outro, a seta verde mostra o lance da partida. Revendo a posição de antes
 * do lance, aparecem as duas: verde (o da partida) e vermelha (o seu).
 */
const formas = computed<Forma[]>(() => {
  const r = resposta.value
  if (fase.value !== 'resposta' || !r || r.acertou) return []
  const daPartida = posicoes[ply.value].ultimo
  if (revendo.value === null) return daPartida ? [{ de: daPartida[0], para: daPartida[1], cor: 'green' }] : []
  if (revendo.value !== ply.value - 1) return []
  const setas: Forma[] = daPartida ? [{ de: daPartida[0], para: daPartida[1], cor: 'green' }] : []
  if (r.casasDoPalpite) setas.push({ de: r.casasDoPalpite[0], para: r.casasDoPalpite[1], cor: 'red' })
  return setas
})
const jogavel = computed(() => revendo.value === null && fase.value === 'pergunta' && pergunta(ply.value) && ply.value < sans.length)
/** Texto da barra de revisão: qual posição está no tabuleiro. */
const textoRevendo = computed(() => {
  if (revendo.value === null) return ''
  if (revendo.value === 0) return 'Posição inicial'
  return `Depois de ${rotulo(revendo.value - 1)}`
})
const historico = computed(() => (fase.value === 'fim' ? sans : sans.slice(0, ply.value)))
const nota = computed(() => (fase.value === 'fim' && ply.value > 0 ? notas[ply.value - 1] : undefined))
const porcentagem = computed(() => (respondidas.value ? Math.round((acertos.value / respondidas.value) * 100) : 0))
const textoDoVeredicto = (v: VeredictoDoPalpite | 'avaliando' | null | undefined) =>
  v === 'avaliando' ? 'O Stockfish está avaliando o seu lance…' : v ? TEXTO_DO_VEREDICTO[v] : ''
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" :to="lista" aria-label="Voltar">
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
      <div v-if="podeRever" class="rever" role="group" aria-label="Rever as posições anteriores">
        <button type="button" class="botao fantasma" :disabled="revendo === 0" aria-label="Posição anterior" @click="voltarPosicao">‹</button>
        <span class="suave">
          <template v-if="revendo !== null">{{ textoRevendo }}</template>
          <template v-else>Rever as posições anteriores</template>
        </span>
        <button type="button" class="botao fantasma" :disabled="revendo === null" aria-label="Próxima posição" @click="avancarPosicao">›</button>
        <button v-if="revendo !== null" type="button" class="botao" @click="voltarAoAtual">Voltar ao lance atual</button>
      </div>
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink :to="lista" class="trilha">‹ Lance a lance</RouterLink>
        <h1 class="titulo-pagina">{{ partida.n }}. {{ partida.brancas }} – {{ partida.pretas }}</h1>
        <p class="suave">{{ partida.abertura }} · {{ [partida.local, partida.ano].filter(Boolean).join(' ') }} · {{ partida.resultado.replace('1/2-1/2', '½-½') }}</p>
      </div>

      <!-- Antes de começar -->
      <template v-if="fase === 'intro'">
        <p v-if="partida.tema" class="tema"><strong>Tema:</strong> {{ partida.tema }}</p>
        <p v-if="partida.introducao" class="texto">{{ fmtTexto(partida.introducao) }}</p>
        <p class="suave">
          São {{ total }} lances de {{ nomeDoVencedor }} para você achar<template v-if="momentosChave">, nos momentos-chave; os
          outros lances andam sozinhos</template>. Leia cada explicação antes de seguir.
        </p>
        <button type="button" class="botao primario grande largo-celular" @click="comecar">Começar com as {{ ladoDoVencedor }}</button>
      </template>

      <!-- Jogando -->
      <template v-else-if="fase !== 'fim'">
        <p class="placar" aria-live="polite">✓ {{ acertos }} de {{ respondidas }}<span class="suave"> · {{ total }} lances no total</span></p>

        <CartaoDica v-if="lanceDoAdversario && fase === 'pergunta'" tipo="nota" :lance="lanceDoAdversario.lance" :texto="lanceDoAdversario.nota?.texto" />
        <button v-if="pausado && fase === 'pergunta'" type="button" class="botao primario grande largo-celular" @click="seguirDaNota">Continuar</button>

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
          <RouterLink v-if="proxima" class="botao grande largo-celular" :to="destinoDaPartida(proxima.n)">
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
.rever {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--espaco-2);
  margin-top: var(--espaco-2);
}
.rever .botao.fantasma {
  min-width: 44px;
  font-size: 20px;
}
.rever .suave {
  font-size: 14px;
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
