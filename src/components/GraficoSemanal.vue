<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { PontoSemanal } from '../lib/painel'

/**
 * Gráfico de uma série por semana (barras ou linha), em SVG desenhado na largura real do
 * cartão. Passar o dedo ou o mouse numa semana mostra o detalhe; o último valor fica escrito
 * ao lado da marca; uma tabela escondida repete os números para leitores de tela.
 */
const props = withDefaults(
  defineProps<{ pontos: PontoSemanal[]; tipo?: 'barras' | 'linha'; titulo: string; sufixo?: string; maximo?: number }>(),
  { tipo: 'barras', sufixo: '', maximo: undefined },
)

const caixa = ref<HTMLDivElement>()
const largura = ref(320)
let observador: ResizeObserver | undefined
onMounted(() => {
  if (!caixa.value) return
  largura.value = caixa.value.clientWidth || 320
  observador = new ResizeObserver(([entrada]) => (largura.value = Math.max(200, entrada.contentRect.width)))
  observador.observe(caixa.value)
})
onBeforeUnmount(() => observador?.disconnect())

const ALTURA = 160
const MARGEM = { cima: 18, baixo: 22, esquerda: 30, direita: 34 }
const area = computed(() => ({
  x: MARGEM.esquerda,
  y: MARGEM.cima,
  w: largura.value - MARGEM.esquerda - MARGEM.direita,
  h: ALTURA - MARGEM.cima - MARGEM.baixo,
}))

/** Topo do eixo arredondado para cima (1, 2, 5 × 10^n), ou o máximo dado (100 para %). */
const topo = computed(() => {
  if (props.maximo) return props.maximo
  const maior = Math.max(1, ...props.pontos.map((p) => p.valor ?? 0))
  const base = 10 ** Math.floor(Math.log10(maior))
  return [1, 2, 5, 10].map((m) => m * base).find((v) => v >= maior)!
})
/** Linhas da grade: zero, meio e topo (sem o meio quando ele não seria um número inteiro). */
const marcas = computed(() => (Number.isInteger(topo.value / 2) ? [0, topo.value / 2, topo.value] : [0, topo.value]))
const passo = computed(() => area.value.w / props.pontos.length)
const xDe = (i: number) => area.value.x + passo.value * (i + 0.5)
const yDe = (v: number) => area.value.y + area.value.h * (1 - v / topo.value)

const barras = computed(() => {
  const larg = Math.max(4, Math.min(22, passo.value * 0.55))
  const base = area.value.y + area.value.h
  return props.pontos.map((p, i) => {
    const v = p.valor ?? 0
    const topoY = yDe(v)
    const h = base - topoY
    const r = Math.min(4, h, larg / 2)
    const x = xDe(i) - larg / 2
    // Topo arredondado, base reta apoiada no eixo.
    const d = h <= 0 ? '' : `M${x},${base}V${topoY + r}Q${x},${topoY} ${x + r},${topoY}H${x + larg - r}Q${x + larg},${topoY} ${x + larg},${topoY + r}V${base}Z`
    return { d, i }
  })
})

/** Trechos da linha (uma semana sem dados interrompe o traço). */
const trechos = computed(() => {
  const lista: string[] = []
  let atual: string[] = []
  props.pontos.forEach((p, i) => {
    if (p.valor === null) {
      if (atual.length) lista.push(atual.join(' '))
      atual = []
    } else atual.push(`${atual.length ? 'L' : 'M'}${xDe(i)},${yDe(p.valor)}`)
  })
  if (atual.length) lista.push(atual.join(' '))
  return lista
})

const ultimo = computed(() => {
  for (let i = props.pontos.length - 1; i >= 0; i--) if (props.pontos[i].valor !== null) return { i, valor: props.pontos[i].valor! }
  return null
})

const dataCurta = (data: string) => {
  const [, mes, dia] = data.split('-')
  return `${dia}/${mes}`
}
/** Rótulos do eixo x: a cada 3 semanas, contando da última para trás. */
const rotulosX = computed(() => props.pontos.map((p, i) => ({ i, texto: (props.pontos.length - 1 - i) % 3 === 0 ? dataCurta(p.inicio) : '' })))

const destaque = ref<number | null>(null)
const dica = computed(() => {
  if (destaque.value === null) return null
  const p = props.pontos[destaque.value]
  const x = xDe(destaque.value)
  return { texto: p.detalhe, semana: `Semana de ${dataCurta(p.inicio)}`, x, esquerda: x > largura.value / 2 }
})
</script>

<template>
  <figure class="grafico">
    <figcaption class="titulo-item">{{ titulo }}</figcaption>
    <div ref="caixa" class="caixa" @mouseleave="destaque = null">
      <svg :width="largura" :height="ALTURA" :viewBox="`0 0 ${largura} ${ALTURA}`" aria-hidden="true">
        <!-- Grade discreta: zero, meio e topo. -->
        <g class="grade">
          <template v-for="v in marcas" :key="v">
            <line :x1="area.x" :x2="area.x + area.w" :y1="yDe(v)" :y2="yDe(v)" />
            <text :x="area.x - 6" :y="yDe(v) + 4" text-anchor="end">{{ v }}{{ sufixo }}</text>
          </template>
        </g>
        <g class="eixo-x">
          <text v-for="r in rotulosX" :key="r.i" :x="xDe(r.i)" :y="ALTURA - 6" text-anchor="middle">{{ r.texto }}</text>
        </g>

        <line v-if="destaque !== null" class="mira" :x1="xDe(destaque)" :x2="xDe(destaque)" :y1="area.y" :y2="area.y + area.h" />

        <template v-if="tipo === 'barras'">
          <path v-for="b in barras" :key="b.i" class="barra" :class="{ apagada: destaque !== null && destaque !== b.i }" :d="b.d" />
        </template>
        <template v-else>
          <path v-for="(t, k) in trechos" :key="k" class="linha" :d="t" />
          <template v-for="(p, i) in pontos" :key="i">
            <circle v-if="p.valor !== null && (destaque === i || pontos.filter((q) => q.valor !== null).length === 1)" class="ponto" :cx="xDe(i)" :cy="yDe(p.valor)" r="4" />
          </template>
          <circle v-if="ultimo && destaque === null" class="ponto" :cx="xDe(ultimo.i)" :cy="yDe(ultimo.valor)" r="4" />
        </template>

        <!-- Valor da última semana: em cima da barra, ou à direita do ponto da linha. -->
        <text
          v-if="ultimo && destaque === null"
          class="rotulo-valor"
          :x="tipo === 'barras' ? xDe(ultimo.i) : xDe(ultimo.i) + 8"
          :y="tipo === 'barras' ? yDe(ultimo.valor) - 5 : yDe(ultimo.valor) + 4"
          :text-anchor="tipo === 'barras' ? 'middle' : 'start'"
        >{{ ultimo.valor }}{{ sufixo }}</text>

        <!-- Alvos de toque: a coluna inteira de cada semana. -->
        <rect
          v-for="(_, i) in pontos"
          :key="`alvo-${i}`"
          class="alvo"
          :x="area.x + passo * i"
          :y="0"
          :width="passo"
          :height="ALTURA"
          @mouseenter="destaque = i"
          @touchstart.passive="destaque = i"
        />
      </svg>
      <div v-if="dica" class="dica" :class="{ esquerda: dica.esquerda }" :style="{ left: `${dica.x}px` }">
        <span class="semana">{{ dica.semana }}</span>
        <span>{{ dica.texto }}</span>
      </div>
    </div>
    <div class="visualmente-oculto">
    <table>
      <caption>{{ titulo }}</caption>
      <tr v-for="p in pontos" :key="p.inicio">
        <th scope="row">Semana de {{ dataCurta(p.inicio) }}</th>
        <td>{{ p.detalhe }}</td>
      </tr>
    </table>
    </div>
  </figure>
</template>

<style scoped>
.grafico {
  position: relative;
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
}
.caixa {
  position: relative;
  width: 100%;
}
svg {
  display: block;
  overflow: visible;
}
.grade line {
  stroke: var(--borda);
  stroke-width: 1;
}
.grade text,
.eixo-x text {
  fill: var(--texto-suave);
  font: 500 11px/1 var(--font-texto);
}
.barra {
  fill: var(--cor-aprender);
  transition: opacity 0.15s;
}
.barra.apagada {
  opacity: 0.45;
}
.linha {
  fill: none;
  stroke: var(--cor-aprender);
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.ponto {
  fill: var(--cor-aprender);
  stroke: var(--superficie);
  stroke-width: 2;
}
.mira {
  stroke: var(--texto-suave);
  stroke-width: 1;
  stroke-dasharray: 3 3;
}
.rotulo-valor {
  fill: var(--texto);
  font: 600 12px/1 var(--font-texto);
}
.alvo {
  fill: transparent;
  cursor: default;
}
.dica {
  position: absolute;
  top: 0;
  z-index: 1;
  display: grid;
  gap: 2px;
  max-width: 220px;
  padding: var(--espaco-2) var(--espaco-3);
  border: 1px solid var(--borda);
  border-radius: var(--raio-sm);
  background: var(--superficie);
  box-shadow: var(--sombra-cartao);
  font-size: 13px;
  line-height: 18px;
  pointer-events: none;
  transform: translateX(10px);
  white-space: nowrap;
}
.dica.esquerda {
  transform: translateX(calc(-100% - 10px));
}
.dica .semana {
  color: var(--texto-suave);
  font-size: 12px;
}
.visualmente-oculto {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
</style>
