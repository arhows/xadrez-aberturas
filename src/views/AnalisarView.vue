<script setup lang="ts">
import { Chess } from 'chess.js'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AnaliseAoVivo from '../components/AnaliseAoVivo.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { problemaDaPosicao } from '../lib/editor'
import { buscarCapitulo } from '../lib/capitulos'
import { jogoDosLances, lancesAntesDoFen, situacaoDoJogo } from '../lib/jogo'
import { casasDoLance, separarLances } from '../lib/lances'
import { novoIdDeEstudo, type LadoDoEstudo } from '../lib/estudoPartidas'
import { progresso } from '../lib/progresso'

/**
 * Tabuleiro de análise: parte de uma posição do editor (fen) ou dos lances de uma abertura (c),
 * joga lances livres das duas cores com o Stockfish ao lado.
 */

type Peca = 'q' | 'r' | 'b' | 'n'

const route = useRoute()
const router = useRouter()

/** Partida do Estudo de partidas aberta para corrigir os lances. */
const estudo = typeof route.query.estudo === 'string' ? progresso.estudos[route.query.estudo] : undefined

const fenInicial = (() => {
  const pedido = typeof route.query.fen === 'string' ? route.query.fen : (estudo?.fen ?? '')
  if (!pedido || problemaDaPosicao(pedido)) return new Chess().fen()
  return new Chess(pedido).fen()
})()
const antes = lancesAntesDoFen(fenInicial)

/** Lances da abertura (vindo do Treino ou do Explorar): ficam no histórico, e dá para voltar neles. */
const lancesDaAbertura = (() => {
  if (typeof route.query.fen === 'string' && route.query.fen) return []
  const pedidos = separarLances(estudo ? estudo.lances : String(route.query.c ?? ''))
  try {
    jogoDosLances(pedidos, fenInicial)
    return pedidos
  } catch {
    return []
  }
})()
const capitulo = route.query.cap ? buscarCapitulo(String(route.query.cap)) : undefined

const sans = ref<string[]>([...lancesDaAbertura])
const ply = ref(lancesDaAbertura.length)
const orientacao = ref<'white' | 'black'>(route.query.orientacao === 'black' || route.query.cor === 'b' ? 'black' : 'white')
/** Para onde o "voltar" leva: a abertura de onde veio, ou o editor. */
const voltarPara = computed(() =>
  estudo
    ? { rota: { name: 'estudo-partida', params: { id: estudo.id } }, nome: estudo.nome }
    : capitulo
      ? { rota: { name: 'abertura', params: { cap: capitulo.capitulo.id } }, nome: capitulo.capitulo.nome }
      : { rota: { name: 'editor', query: { fen: fenInicial } }, nome: 'Editor de posição' },
)
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

/** Jogar contra o computador a partir da posição mostrada (pelos lances, quando partiu do início). */
function jogarDaqui() {
  const cor = orientacao.value === 'black' ? 'b' : 'w'
  if (typeof route.query.fen === 'string' && route.query.fen) void router.push({ name: 'jogar', query: { fen: fen.value } })
  else void router.push({ name: 'jogar', query: { c: sans.value.slice(0, ply.value).join(' '), cor, cap: capitulo?.capitulo.id, treino: '1' } })
}

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

// ---------- Salvar no Estudo de partidas ----------
const salvando = ref(false)
const nomeEstudo = ref(estudo?.nome ?? '')
const ladoEstudo = ref<LadoDoEstudo>(estudo?.lado ?? (orientacao.value === 'black' ? 'b' : 'w'))
const videoEstudo = ref(estudo?.video ?? '')

/**
 * Guarda todos os lances do histórico (não só até a posição mostrada). Mudar os lances de uma
 * partida já salva cria outra no lugar dela: as revisões antigas apontavam para outros lances.
 */
function salvarEstudo() {
  const nome = nomeEstudo.value.trim()
  if (!nome || !sans.value.length) return
  const agora = new Date().toISOString()
  const lances = sans.value.join(' ')
  const fenDoEstudo = fenInicial === new Chess().fen() ? undefined : fenInicial
  const mesmosLances = estudo && estudo.lances === lances && (estudo.fen ?? undefined) === fenDoEstudo
  const id = mesmosLances ? estudo.id : novoIdDeEstudo()
  if (estudo && !mesmosLances) progresso.estudos[estudo.id] = { ...estudo, apagada: true, atualizado: agora }
  progresso.estudos[id] = {
    id,
    nome,
    lances,
    ...(fenDoEstudo ? { fen: fenDoEstudo } : {}),
    lado: ladoEstudo.value,
    ...(videoEstudo.value.trim() ? { video: videoEstudo.value.trim() } : {}),
    criado: mesmosLances ? estudo.criado : agora,
    atualizado: agora,
    ...(mesmosLances && estudo.melhor ? { melhor: estudo.melhor } : {}),
  }
  void router.push({ name: 'estudo-partida', params: { id } })
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
    <RouterLink class="voltar" :to="voltarPara.rota" :aria-label="`Voltar: ${voltarPara.nome}`">
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
        <RouterLink :to="voltarPara.rota" class="trilha">‹ {{ voltarPara.nome }}</RouterLink>
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
      <p v-if="sans.length <= lancesDaAbertura.length" class="suave">
        Faça lances das duas cores no tabuleiro para explorar a posição. Tocar numa linha do Stockfish joga o primeiro lance dela.
      </p>

      <div class="acoes">
        <label class="marcar"><input v-model="comMotor" type="checkbox" /> Stockfish</label>
        <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
        <button type="button" class="botao" @click="copiarFen">{{ copiado ? 'Copiado!' : 'Copiar FEN' }}</button>
      </div>
      <div class="acoes">
        <button type="button" class="botao" @click="router.push({ name: 'editor', query: { fen, orientacao } })">Editar esta posição</button>
        <button v-if="!situacao.fim" type="button" class="botao" @click="jogarDaqui">Jogar daqui</button>
        <button v-if="sans.length && !salvando" type="button" class="botao primario" @click="salvando = true">
          {{ estudo ? 'Salvar alterações' : 'Salvar para treinar' }}
        </button>
      </div>

      <form v-if="salvando" class="cartao salvar" @submit.prevent="salvarEstudo">
        <strong>{{ estudo ? 'Salvar alterações no Estudo de partidas' : 'Salvar no Estudo de partidas' }}</strong>
        <span class="suave">Ficam guardados os {{ sans.length }} meios-lances do histórico, para rever e adivinhar depois.</span>
        <label class="campo">
          <span>Nome</span>
          <input id="estudo-nome" v-model="nomeEstudo" type="text" maxlength="120" placeholder="Ex.: Capablanca × Marshall, 1918" required />
        </label>
        <label class="campo">
          <span>Lado para adivinhar</span>
          <select id="estudo-lado" v-model="ladoEstudo">
            <option value="w">Brancas</option>
            <option value="b">Pretas</option>
            <option value="ambos">Os dois</option>
          </select>
        </label>
        <label class="campo">
          <span>Link do vídeo (opcional)</span>
          <input id="estudo-video" v-model="videoEstudo" type="url" placeholder="https://www.youtube.com/..." />
        </label>
        <div class="acoes">
          <button type="submit" class="botao primario" :disabled="!nomeEstudo.trim()">Salvar</button>
          <button type="button" class="botao fantasma" @click="salvando = false">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.salvar {
  display: grid;
  gap: var(--espaco-2);
}
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
