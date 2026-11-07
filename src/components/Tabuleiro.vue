<script setup lang="ts">
import { Chessground } from 'chessground'
import type { Api } from 'chessground/api'
import type { Config } from 'chessground/config'
import type { DrawShape } from 'chessground/draw'
import type { Key } from 'chessground/types'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PecasCapturadas from './PecasCapturadas.vue'
import { corDaPosicao, destinosLegais, estaEmXeque } from '../lib/lances'
import { progresso } from '../lib/progresso'

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
  }>(),
  { orientacao: 'white', ultimoLance: null, formas: () => [], jogavel: false },
)

const emit = defineEmits<{ lance: [de: string, para: string] }>()

const elemento = ref<HTMLElement>()
let api: Api | undefined
let observador: ResizeObserver | undefined

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
    drawable: { enabled: false, visible: true },
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
</script>

<template>
  <div class="conjunto">
    <PecasCapturadas :fen="fen" :lado="orientacao === 'white' ? 'b' : 'w'" />
    <div class="moldura">
      <div ref="elemento" class="tabuleiro"></div>
    </div>
    <PecasCapturadas :fen="fen" :lado="orientacao === 'white' ? 'w' : 'b'" />
  </div>
</template>

<style scoped>
.moldura {
  width: 100%;
  aspect-ratio: 1;
}
.tabuleiro {
  width: 100%;
  height: 100%;
}
/* O padrão do chessground desloca estas letras para fora e cria rolagem lateral no celular. */
.tabuleiro :deep(coords.files) {
  left: 0;
  right: 0;
}
</style>
