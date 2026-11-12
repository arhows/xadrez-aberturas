<script setup lang="ts">
import { Chessground } from 'chessground'
import type { Api } from 'chessground/api'
import type { Config } from 'chessground/config'
import type { DrawShape } from 'chessground/draw'
import type { Key } from 'chessground/types'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PecasCapturadas from './PecasCapturadas.vue'
import { corDaPosicao, destinosLegais, estaEmXeque } from '../lib/lances'
import { progresso } from '../lib/progresso'
import { formatarAvaliacao } from '../lib/motor'
import { chanceDasBrancas } from '../lib/probabilidade'

export interface Forma {
  de: string
  para?: string
  cor: 'green' | 'red' | 'blue' | 'yellow'
  largura?: number
}

const props = withDefaults(
  defineProps<{
    fen: string
    orientacao?: 'white' | 'black'
    ultimoLance?: [string, string] | null
    formas?: Forma[]
    jogavel?: boolean
    /** Peças capturadas acima e abaixo; nos exercícios a posição não vem de uma partida. */
    capturadas?: boolean
    /**
     * Barra de chance de vitória ao lado do tabuleiro (centipeões, ponto de vista das brancas).
     * undefined = sem barra; null = posição sem análise (a barra fica apagada no meio).
     */
    avaliacao?: number | null
  }>(),
  { orientacao: 'white', ultimoLance: null, formas: () => [], jogavel: false, capturadas: true, avaliacao: undefined },
)

const comBarra = computed(() => props.avaliacao !== undefined && progresso.config.barraAvaliacao)
const chance = computed(() => (props.avaliacao == null ? 50 : chanceDasBrancas(props.avaliacao)))
const textoBarra = computed(() => {
  if (props.avaliacao == null) return 'Sem análise desta posição'
  const brancas = Math.round(chance.value)
  return `Chance estimada: brancas ${brancas}%, pretas ${100 - brancas}% (Stockfish ${formatarAvaliacao(props.avaliacao)})`
})
/** Número curto na ponta de quem está melhor, como no lichess. */
const rotuloBarra = computed(() => {
  if (props.avaliacao == null) return ''
  if (Math.abs(props.avaliacao) >= 15000) return 'M'
  return Math.abs(props.avaliacao / 100).toFixed(1).replace('.', ',')
})

const emit = defineEmits<{ lance: [de: string, para: string] }>()

const elemento = ref<HTMLElement>()
let api: Api | undefined
let observador: ResizeObserver | undefined

/** Cores das setas pelos tokens do tema: verde = livro, azul = Stockfish, amarelo = pista. */
function pinceis() {
  const estilo = getComputedStyle(document.documentElement)
  const cor = (nome: string, reserva: string) => estilo.getPropertyValue(nome).trim() || reserva
  return {
    green: { key: 'g', color: cor('--seta-livro', '#2f8a57'), opacity: 0.8, lineWidth: 10 },
    blue: { key: 'b', color: cor('--seta-motor', '#2463a8'), opacity: 0.8, lineWidth: 10 },
    yellow: { key: 'y', color: cor('--seta-pista', '#c9a227'), opacity: 0.85, lineWidth: 10 },
    red: { key: 'r', color: cor('--erro', '#b3322a'), opacity: 0.8, lineWidth: 10 },
  }
}

function configuracao(): Config {
  const vez = corDaPosicao(props.fen) === 'w' ? 'white' : 'black'
  return {
    fen: props.fen,
    orientation: props.orientacao,
    turnColor: vez,
    lastMove: props.ultimoLance ? (props.ultimoLance as Key[]) : undefined,
    check: estaEmXeque(props.fen),
    animation: { enabled: progresso.config.animacaoMs > 0, duration: progresso.config.animacaoMs },
    movable: {
      free: false,
      color: props.jogavel ? vez : undefined,
      dests: props.jogavel ? (destinosLegais(props.fen) as Map<Key, Key[]>) : new Map(),
      showDests: true,
      events: { after: (de, para) => emit('lance', de, para) },
    },
    premovable: { enabled: false },
    // As coordenadas ficam fora do tabuleiro (ver template), para não ficarem sob as peças.
    coordinates: false,
    drawable: { enabled: false, visible: true, brushes: pinceis() },
  }
}

function desenhar() {
  const formas: DrawShape[] = props.formas.map((forma) => ({
    orig: forma.de as Key,
    dest: forma.para as Key | undefined,
    brush: forma.cor,
    modifiers: forma.largura ? { lineWidth: forma.largura } : undefined,
  }))
  api?.setAutoShapes(formas)
}

/** Devolve o tabuleiro ao estado das props, desfazendo um lance recusado. */
function sincronizar() {
  api?.set(configuracao())
  desenhar()
}

defineExpose({ sincronizar })

const fileiras = computed(() => (props.orientacao === 'white' ? '87654321' : '12345678').split(''))
const colunas = computed(() => (props.orientacao === 'white' ? 'abcdefgh' : 'hgfedcba').split(''))

onMounted(() => {
  api = Chessground(elemento.value!, configuracao())
  desenhar()
  observador = new ResizeObserver(() => api?.redrawAll())
  observador.observe(elemento.value!)
})

onBeforeUnmount(() => {
  observador?.disconnect()
  api?.destroy()
})

watch(() => [props.fen, props.orientacao, props.ultimoLance, props.jogavel], sincronizar)
watch(() => props.formas, desenhar)

// Trocou o tema (em Configurações ou no sistema): relê as cores das setas.
const temaEscuro = window.matchMedia('(prefers-color-scheme: dark)')
async function trocarPinceis() {
  await nextTick()
  api?.set({ drawable: { brushes: pinceis() } })
  desenhar()
}
watch(() => progresso.config.tema, trocarPinceis)
temaEscuro.addEventListener('change', trocarPinceis)
onBeforeUnmount(() => temaEscuro.removeEventListener('change', trocarPinceis))
</script>

<template>
  <div class="conjunto tabuleiro-tema">
    <PecasCapturadas v-if="capturadas" :fen="fen" :lado="orientacao === 'white' ? 'b' : 'w'" />
    <div class="grade" :class="{ 'com-barra': comBarra }">
      <div
        v-if="comBarra"
        class="barra-avaliacao"
        :class="{ invertida: orientacao === 'black', vazia: avaliacao == null }"
        role="img"
        :aria-label="textoBarra"
        :title="textoBarra"
      >
        <span class="brancas" :style="{ height: `${chance}%` }"></span>
        <span class="rotulo" :class="chance >= 50 ? 'lado-brancas' : 'lado-pretas'">{{ rotuloBarra }}</span>
      </div>
      <div class="fileiras coordenadas" aria-hidden="true">
        <span v-for="f in fileiras" :key="f">{{ f }}</span>
      </div>
      <div class="moldura">
        <div ref="elemento" class="tabuleiro"></div>
      </div>
      <div class="colunas coordenadas" aria-hidden="true">
        <span v-for="c in colunas" :key="c">{{ c }}</span>
      </div>
    </div>
    <PecasCapturadas v-if="capturadas" :fen="fen" :lado="orientacao === 'white' ? 'w' : 'b'" />
  </div>
</template>

<style scoped>
.grade {
  display: grid;
  grid-template-columns: 1rem minmax(0, 1fr);
  grid-template-rows: auto 1.25rem;
}
.moldura {
  width: 100%;
  aspect-ratio: 1;
}
.fileiras,
.colunas {
  display: flex;
  font-size: 12px;
  user-select: none;
}
.fileiras {
  flex-direction: column;
}
.fileiras span {
  flex: 1;
  display: flex;
  align-items: center;
}
.colunas {
  grid-column: 2;
}
/* Com a barra de avaliação: barra | números das fileiras | tabuleiro. */
.grade.com-barra {
  grid-template-columns: 14px 1rem minmax(0, 1fr);
  column-gap: 2px;
}
.grade.com-barra .colunas {
  grid-column: 3;
}
.barra-avaliacao {
  position: relative;
  grid-row: 1;
  overflow: hidden;
  border: 1px solid var(--borda-controle);
  border-radius: 4px;
  /* Cores das peças (não do tema), como no lichess. */
  background: #403f3a;
}
.barra-avaliacao .brancas {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #f4f4f1;
  transition: height 0.5s ease;
}
.barra-avaliacao.invertida .brancas {
  top: 0;
  bottom: auto;
}
.barra-avaliacao.vazia {
  opacity: 0.35;
}
.barra-avaliacao .rotulo {
  position: absolute;
  left: 0;
  right: 0;
  font: 600 9px/12px var(--font-texto);
  text-align: center;
  letter-spacing: -0.02em;
}
/* O número fica na ponta de quem está melhor, na cor que contrasta com aquele lado. */
.barra-avaliacao .rotulo.lado-brancas { bottom: 2px; color: #403f3a; }
.barra-avaliacao .rotulo.lado-pretas { top: 2px; color: #f4f4f1; }
.barra-avaliacao.invertida .rotulo.lado-brancas { top: 2px; bottom: auto; }
.barra-avaliacao.invertida .rotulo.lado-pretas { bottom: 2px; top: auto; }
.colunas span {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tabuleiro {
  width: 100%;
  height: 100%;
}
/* No computador o tabuleiro ganha cantos arredondados; no celular vai de ponta a ponta. */
@media (min-width: 800px) {
  .moldura {
    overflow: hidden;
    border-radius: var(--raio-sm);
  }
}
</style>
