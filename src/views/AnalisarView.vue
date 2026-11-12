<script setup lang="ts">
import { Chess } from 'chess.js'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AnaliseAoVivo from '../components/AnaliseAoVivo.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { problemaDaPosicao } from '../lib/editor'
import { jogoDosLances, lancesAntesDoFen, situacaoDoJogo } from '../lib/jogo'
import { casasDoLance } from '../lib/lances'

/** Tabuleiro de análise: parte de uma posição do editor, joga lances livres com o Stockfish ao lado. */

type Peca = 'q' | 'r' | 'b' | 'n'

const route = useRoute()
const router = useRouter()

const fenInicial = (() => {
  const pedido = typeof route.query.fen === 'string' ? route.query.fen : ''
  if (!pedido || problemaDaPosicao(pedido)) return new Chess().fen()
  return new Chess(pedido).fen()
})()
const antes = lancesAntesDoFen(fenInicial)

const sans = ref<string[]>([])
const ply = ref(0)
const orientacao = ref<'white' | 'black'>(route.query.orientacao === 'black' ? 'black' : 'white')
const comMotor = ref(true)
const melhorSan = ref<string | null>(null)
const avaliacao = ref<number | null>(null)
const promocaoPendente = ref<{ de: string; para: string } | null>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()

const jogo = computed(() => jogoDosLances(sans.value.slice(0, ply.value), fenInicial))
const fen = computed(() => jogo.value.fen())
const situacao = computed(() => situacaoDoJogo(jogo.value))
const ultimoLance = computed<[string, string] | null>(() => {
  const ultimo = jogo.value.history({ verbose: true }).at(-1)
  return ultimo ? [ultimo.from, ultimo.to] : null
})
const formas = computed<Forma[]>(() => {
  if (!comMotor.value || !melhorSan.value) return []
  const casas = casasDoLance(fen.value, melhorSan.value)
  return casas ? [{ de: casas.from, para: casas.to, cor: 'blue' }] : []
})

/** Joga um lance na posição mostrada; os lances depois dela são substituídos. */
function jogar(lance: { from: string; to: string; promotion?: Peca } | string) {
  const copia = new Chess(fen.value)
  try {
    const feito = copia.move(lance)
    sans.value = [...sans.value.slice(0, ply.value), feito.san]
    ply.value++
  } catch {
    tabuleiro.value?.sincronizar()
  }
}

function aoJogar(de: string, para: string) {
  const peca = jogo.value.get(de as never)
  if (peca?.type === 'p' && (para[1] === '8' || para[1] === '1')) {
    promocaoPendente.value = { de, para }
    return
  }
  jogar({ from: de, to: para })
}

function promover(peca: Peca | null) {
  const pendente = promocaoPendente.value!
  promocaoPendente.value = null
  if (peca) jogar({ from: pendente.de, to: pendente.para, promotion: peca })
  else tabuleiro.value?.sincronizar()
}

function ir(p: number) {
  ply.value = Math.max(0, Math.min(sans.value.length, p))
}

function aoTeclar(evento: KeyboardEvent) {
  if ((evento.target as HTMLElement)?.tagName === 'INPUT') return
  if (evento.key === 'ArrowLeft') ir(ply.value - 1)
  if (evento.key === 'ArrowRight') ir(ply.value + 1)
  if (evento.key === 'Home') ir(0)
  if (evento.key === 'End') ir(sans.value.length)
}
onMounted(() => window.addEventListener('keydown', aoTeclar))
onBeforeUnmount(() => window.removeEventListener('keydown', aoTeclar))

const copiado = ref(false)
async function copiarFen() {
  try {
    await navigator.clipboard.writeText(fen.value)
    copiado.value = true
    setTimeout(() => (copiado.value = false), 1500)
  } catch {
    // sem área de transferência: o FEN fica visível no editor
  }
}

const PECAS_PROMOCAO: { peca: Peca; nome: string }[] = [
  { peca: 'q', nome: 'Dama' },
  { peca: 'r', nome: 'Torre' },
  { peca: 'b', nome: 'Bispo' },
  { peca: 'n', nome: 'Cavalo' },
]
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" :to="{ name: 'editor', query: { fen: fenInicial } }" aria-label="Voltar ao editor">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>Análise</h1>
  </header>

  <div class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :formas="formas"
        :jogavel="!situacao.fim && !promocaoPendente"
        :avaliacao="comMotor ? avaliacao : undefined"
        :capturadas="false"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink :to="{ name: 'editor', query: { fen: fenInicial } }" class="trilha">‹ Editor de posição</RouterLink>
        <h1 class="titulo-pagina">Análise da posição</h1>
      </div>
      <p class="situacao corpo-forte">{{ situacao.texto }}</p>

      <div v-if="promocaoPendente" class="acoes">
        <span>Promover para:</span>
        <button v-for="opcao in PECAS_PROMOCAO" :key="opcao.peca" type="button" class="botao" @click="promover(opcao.peca)">
          {{ opcao.nome }}
        </button>
        <button type="button" class="botao" @click="promover(null)">Cancelar</button>
      </div>

      <AnaliseAoVivo
        v-if="comMotor"
        :fen="fen"
        @melhor="melhorSan = $event"
        @avaliacao="avaliacao = $event"
        @jogar="jogar"
      />

      <div class="navegacao" role="group" aria-label="Navegar nos lances">
        <button type="button" class="botao" :disabled="ply === 0" aria-label="Início" @click="ir(0)">⏮</button>
        <button type="button" class="botao" :disabled="ply === 0" aria-label="Lance anterior" @click="ir(ply - 1)">◀</button>
        <button type="button" class="botao" :disabled="ply >= sans.length" aria-label="Próximo lance" @click="ir(ply + 1)">▶</button>
        <button type="button" class="botao" :disabled="ply >= sans.length" aria-label="Último lance" @click="ir(sans.length)">⏭</button>
      </div>

      <HistoricoLances :lances="sans" :atual="ply" :antes="antes" clicavel @ir="ir" />
      <p v-if="!sans.length" class="suave">Faça lances no tabuleiro para explorar a posição. Tocar numa linha do Stockfish joga o primeiro lance dela.</p>

      <div class="acoes">
        <label class="marcar"><input v-model="comMotor" type="checkbox" /> Stockfish</label>
        <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
        <button type="button" class="botao" @click="copiarFen">{{ copiado ? 'Copiado!' : 'Copiar FEN' }}</button>
      </div>
      <div class="acoes">
        <button type="button" class="botao" @click="router.push({ name: 'editor', query: { fen, orientacao } })">Editar esta posição</button>
        <button v-if="!situacao.fim" type="button" class="botao primario" @click="router.push({ name: 'jogar', query: { fen } })">Jogar daqui</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cabeca-painel {
  display: grid;
  gap: var(--espaco-1);
}
.cabeca-painel .titulo-pagina,
.situacao {
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
.acoes,
.navegacao {
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
