<script setup lang="ts">
import { computed, ref } from 'vue'
import { ROTULO_CLASSE, SIMBOLO_CLASSE, type LanceAnalisado } from '../lib/analisePartida'
import { fmtLance } from '../lib/formato'

/**
 * Chance de vitória das brancas ao longo da partida (como o gráfico de análise do lichess):
 * a área clara é a chance das brancas, a escura a das pretas. Tocar no gráfico vai ao lance.
 */
const props = defineProps<{ chances: (number | null)[]; lances: LanceAnalisado[]; atual: number }>()
const emit = defineEmits<{ ir: [ply: number] }>()

const caixa = ref<HTMLElement>()
const sobre = ref<number | null>(null)

const ultimo = computed(() => Math.max(1, props.chances.length - 1))
const x = (ply: number) => (ply / ultimo.value) * 100
/** Sem avaliação (ainda analisando), a curva repete o último valor conhecido. */
const pontos = computed(() => {
  let anterior = 50
  return props.chances.map((c) => (anterior = c ?? anterior))
})
const area = computed(() => {
  const linha = pontos.value.map((c, ply) => `${x(ply)},${100 - c}`).join(' ')
  return `0,100 ${linha} ${x(pontos.value.length - 1)},100`
})
const marcas = computed(() => props.lances.filter((l) => l.classe && props.chances[l.ply] != null))

function plyDoEvento(evento: PointerEvent): number {
  const r = caixa.value!.getBoundingClientRect()
  return Math.min(ultimo.value, Math.max(0, Math.round(((evento.clientX - r.left) / r.width) * ultimo.value)))
}

const dica = computed(() => {
  const ply = sobre.value
  if (ply === null) return null
  const chance = props.chances[ply]
  const lance = ply > 0 ? props.lances[ply - 1] : null
  const titulo = lance ? fmtLance(ply, lance.san) : 'Início'
  const marca = lance?.classe ? ` · ${ROTULO_CLASSE[lance.classe]}` : ''
  const valor = chance == null ? 'analisando…' : `brancas ${Math.round(chance)}%`
  return { texto: `${titulo}${marca} · ${valor}`, esquerda: x(ply) }
})
</script>

<template>
  <div
    ref="caixa"
    class="grafico"
    role="img"
    aria-label="Gráfico da chance de vitória das brancas ao longo da partida; toque para ir ao lance"
    @pointermove="sobre = plyDoEvento($event)"
    @pointerleave="sobre = null"
    @click="emit('ir', plyDoEvento($event as PointerEvent))"
  >
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="0" width="100" height="100" class="fundo" />
      <polygon :points="area" class="brancas" />
      <line x1="0" y1="50" x2="100" y2="50" class="meio" />
      <line :x1="x(atual)" y1="0" :x2="x(atual)" y2="100" class="atual" />
      <line v-if="sobre !== null" :x1="x(sobre)" y1="0" :x2="x(sobre)" y2="100" class="cursor" />
    </svg>
    <span
      v-for="lance in marcas"
      :key="lance.ply"
      class="marca"
      :class="lance.classe!"
      :style="{ left: `${x(lance.ply)}%`, top: `${100 - (chances[lance.ply] ?? 50)}%` }"
      :title="`${fmtLance(lance.ply, lance.san)}${SIMBOLO_CLASSE[lance.classe!]} · ${ROTULO_CLASSE[lance.classe!]}`"
    ></span>
    <span
      v-if="dica"
      class="dica"
      :style="{ left: `${dica.esquerda}%`, transform: dica.esquerda < 15 ? 'none' : dica.esquerda > 85 ? 'translateX(-100%)' : 'translateX(-50%)' }"
    >{{ dica.texto }}</span>
  </div>
</template>

<style scoped>
.grafico {
  position: relative;
  height: 120px;
  cursor: crosshair;
  touch-action: pan-y;
}
svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  border: 1px solid var(--borda-controle);
  border-radius: var(--raio-sm);
}
/* Cores das peças, as mesmas da barra de avaliação. */
.fundo { fill: #403f3a; }
.brancas { fill: #f4f4f1; }
.meio {
  stroke: #a3a39b;
  stroke-width: 1;
  stroke-dasharray: 3 3;
  vector-effect: non-scaling-stroke;
}
.atual {
  stroke: var(--destaque);
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}
.cursor {
  stroke: var(--borda-controle);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}
.marca {
  position: absolute;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border: 2px solid var(--superficie);
  border-radius: 50%;
  pointer-events: none;
}
.marca.imprecisao { background: var(--aviso); }
.marca.erro { background: #d9772b; }
.marca.grave { background: var(--erro); }
.dica {
  position: absolute;
  top: -30px;
  z-index: 2;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--texto);
  color: var(--fundo);
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
}
</style>
