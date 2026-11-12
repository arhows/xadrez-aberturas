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
import { cantoDaCasa, type SeloCasa } from '../lib/seloNoTabuleiro'

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
    /** Duração da animação das peças (ms); sem ela, vale a das Configurações. */
    animacao?: number
    /** Sinal de avaliação no canto da casa de destino do lance. */
    selo?: SeloCasa | null
    /**
     * Lances permitidos por casa de origem, no lugar dos lances legais (lições de Fundamentos,
     * em que as posições não têm reis). Com eles, o xeque não é conferido.
     */
    destinos?: Map<string, string[]> | null
    /** Estrelas para pegar, desenhadas no meio das casas. */
    estrelas?: string[]
    /**
     * Editor de posição: as peças das duas cores se arrastam para qualquer casa, e soltar fora
     * do tabuleiro tira a peça. Cada mudança sai no evento `mudou`.
     */
    editavel?: boolean
  }>(),
  { orientacao: 'white', ultimoLance: null, formas: () => [], jogavel: false, capturadas: true, avaliacao: undefined, animacao: undefined, selo: null, destinos: null, estrelas: () => [], editavel: false },
)

const posicaoDoSelo = computed(() => (props.selo ? cantoDaCasa(props.selo.casa, props.orientacao) : null))

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

const emit = defineEmits<{ lance: [de: string, para: string]; casa: [casa: string]; mudou: [disposicao: string] }>()

const posicaoDaCasa = (casa: string) => {
  const c = cantoDaCasa(casa, props.orientacao)
  return { left: `${c.esquerda - 12.5}%`, top: `${c.topo}%` }
}

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

/** Posições sem reis (lições de Fundamentos) não são válidas para o chess.js: sem xeque. */
function xequeNaPosicao(): boolean {
  if (props.destinos) return false
  try {
    return estaEmXeque(props.fen)
  } catch {
    return false
  }
}

function configuracao(): Config {
  const vez = corDaPosicao(props.fen) === 'w' ? 'white' : 'black'
  return {
    fen: props.fen,
    orientation: props.orientacao,
    turnColor: vez,
    lastMove: props.ultimoLance ? (props.ultimoLance as Key[]) : undefined,
    check: xequeNaPosicao(),
    animation: { enabled: (props.animacao ?? progresso.config.animacaoMs) > 0, duration: props.animacao ?? progresso.config.animacaoMs },
    movable: props.editavel
      ? { free: true, color: 'both', dests: undefined, showDests: false, events: {} }
      : {
      free: false,
      color: props.jogavel ? vez : undefined,
      dests: !props.jogavel ? new Map() : ((props.destinos ?? destinosLegais(props.fen)) as Map<Key, Key[]>),
      showDests: true,
      events: { after: (de, para) => emit('lance', de, para) },
    },
    draggable: { deleteOnDropOff: props.editavel },
    premovable: { enabled: false },
    // As coordenadas ficam fora do tabuleiro (ver template), para não ficarem sob as peças.
    coordinates: false,
    drawable: { enabled: false, visible: true, brushes: pinceis() },
    events: {
      select: (casa) => emit('casa', casa),
      change: () => {
        if (props.editavel && api) emit('mudou', api.getFen())
      },
    },
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

watch(() => [props.fen, props.orientacao, props.ultimoLance, props.jogavel, props.destinos, props.editavel], sincronizar)
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
        <span v-for="estrela in estrelas" :key="estrela" class="estrela-casa" :style="posicaoDaCasa(estrela)" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" /></svg>
        </span>
        <span
          v-if="selo && posicaoDoSelo"
          class="selo-casa"
          :class="selo.tom"
          :style="{ left: `${posicaoDoSelo.esquerda}%`, top: `${posicaoDoSelo.topo}%` }"
          role="img"
          :aria-label="selo.nome"
          :title="selo.nome"
        >
          <svg v-if="selo.tom === 'livro'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z" /><path d="M12 6.5v13" />
          </svg>
          <template v-else>{{ selo.simbolo }}</template>
        </span>
      </div>
      <div class="colunas coordenadas" aria-hidden="true">
        <span v-for="c in colunas" :key="c">{{ c }}</span>
      </div>
    </div>
    <PecasCapturadas v-if="capturadas" :fen="fen" :lado="orientacao === 'white' ? 'w' : 'b'" />
  </div>
</template>

<style scoped>
.estrela-casa {
  position: absolute;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 12.5%;
  height: 12.5%;
  pointer-events: none;
}
.estrela-casa svg {
  width: 62%;
  height: 62%;
  fill: #f2c230;
  stroke: #8a6a00;
  stroke-width: 1.2;
  filter: drop-shadow(0 1px 1px rgb(0 0 0 / 35%));
}
.grade {
  display: grid;
  grid-template-columns: 1rem minmax(0, 1fr);
  grid-template-rows: auto 1.25rem;
}
.moldura {
  position: relative;
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
/* Círculo no canto superior direito da casa, meio para fora, por cima das peças. */
.selo-casa {
  position: absolute;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(20px, 6%, 34px);
  aspect-ratio: 1;
  transform: translate(-65%, -35%);
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
  color: #fff;
  font: 800 clamp(10px, 2.2vmin, 15px)/1 var(--font-texto);
  letter-spacing: -0.04em;
  pointer-events: none;
}
/* Cores fixas (não do tema), como nos apps de análise. */
.selo-casa.brilhante { background: #1baaa6; }
.selo-casa.bom { background: #5b8bb0; }
.selo-casa.interessante { background: #8f6fb0; }
.selo-casa.melhor { background: #6fa83e; }
.selo-casa.excelente { background: #8fb14b; }
.selo-casa.livro { background: #a3815d; }
.selo-casa svg { width: 62%; height: 62%; }
.selo-casa.imprecisao { background: #e3ad1d; }
.selo-casa.erro { background: #e0802a; }
.selo-casa.grave { background: #c9352f; }
/* No computador o tabuleiro ganha cantos arredondados; no celular vai de ponta a ponta. */
@media (min-width: 800px) {
  .moldura {
    overflow: hidden;
    border-radius: var(--raio-sm);
  }
}
</style>
