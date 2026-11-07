<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Aresta } from '../lib/arvore'
import { corDoPly } from '../lib/lances'
import { fmtLance, fmtSan } from '../lib/formato'
import { CONTEXTO_ARVORE } from './arvoreContexto'

const props = withDefaults(defineProps<{ inicio: Aresta; prefixo: Aresta[]; nivel?: number }>(), {
  nivel: 0,
})

/** Depois de alguns níveis o recuo para, senão as linhas profundas não cabem no celular. */
const NIVEIS_COM_RECUO = 4
const contexto = inject(CONTEXTO_ARVORE)!

/** Lances em sequência até a próxima bifurcação, para não aninhar sem necessidade. */
const trecho = computed(() => {
  const arestas = [props.inicio]
  const vistos = new Set([props.inicio.de])
  let saidas = contexto.saidas(props.inicio.para)
  while (saidas.length === 1 && !vistos.has(saidas[0].de)) {
    vistos.add(saidas[0].de)
    arestas.push(saidas[0])
    saidas = contexto.saidas(saidas[0].para)
  }
  return { arestas, ramos: saidas }
})

const caminhoAte = (indice: number) => [
  ...props.prefixo,
  ...trecho.value.arestas.slice(0, indice + 1),
]

const caminhoFinal = computed(() => caminhoAte(trecho.value.arestas.length - 1))

function rotulo(indice: number): string {
  const ply = props.prefixo.length + indice + 1
  const san = trecho.value.arestas[indice].san
  // O número só aparece nas brancas e no começo do trecho, como num PGN.
  return indice === 0 || corDoPly(ply) === 'w' ? fmtLance(ply, san) : fmtSan(san)
}
</script>

<template>
  <div class="ramo">
    <span class="trecho">
      <slot />
      <template v-for="(aresta, i) in trecho.arestas" :key="aresta.id">
        <button
          type="button"
          class="lance"
          :class="{ atual: contexto.ehAtual(caminhoAte(i)) }"
          @click="contexto.selecionar(caminhoAte(i))"
        >{{ rotulo(i) }}</button>
        <span v-for="selo in aresta.selos" :key="selo.id" class="selo">Nota {{ selo.rotulo }}</span>
        <span v-if="aresta.armadilhas.length" class="selo armadilha">Armadilha</span>
      </template>
    </span>

    <ul v-if="trecho.ramos.length" class="ramos" :class="{ recuo: nivel < NIVEIS_COM_RECUO }">
      <li v-for="ramo in trecho.ramos" :key="ramo.id">
        <RamoLances
          v-if="contexto.estaAberto([...caminhoFinal, ramo])"
          :inicio="ramo"
          :prefixo="caminhoFinal"
          :nivel="nivel + 1"
        >
          <button
            type="button"
            class="alternar"
            aria-label="Recolher"
            aria-expanded="true"
            @click="contexto.alternar([...caminhoFinal, ramo])"
          >▾</button>
        </RamoLances>
        <template v-else>
          <button
            type="button"
            class="alternar"
            aria-label="Expandir"
            aria-expanded="false"
            @click="contexto.alternar([...caminhoFinal, ramo])"
          >▸</button>
          <button
            type="button"
            class="lance"
            @click="contexto.selecionar([...caminhoFinal, ramo])"
          >{{ fmtLance(caminhoFinal.length + 1, ramo.san) }}</button>
          <span v-for="selo in ramo.selos" :key="selo.id" class="selo">Nota {{ selo.rotulo }}</span>
          <span v-if="ramo.armadilhas.length" class="selo armadilha">Armadilha</span>
          <span class="contagem">{{ ramo.linhas.length }}</span>
        </template>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.trecho {
  line-height: 2;
}
.lance {
  padding: 0.125rem 0.25rem;
  border: 0;
  border-radius: 4px;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.lance:hover {
  background: var(--superficie);
}
.lance.atual {
  background: var(--destaque);
  color: var(--sobre-destaque);
  font-weight: 600;
}
.selo {
  margin: 0 0.25rem;
  padding: 0 0.375rem;
  border-radius: 999px;
  background: var(--aviso);
  color: #1f1f1c;
  font-size: 0.75rem;
  white-space: nowrap;
}
.selo.armadilha {
  background: var(--erro);
  color: #ffffff;
}
.contagem {
  margin-left: 0.25rem;
  color: var(--texto-suave);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
}
.ramos {
  margin: 0;
  padding: 0;
  list-style: none;
}
.ramos.recuo {
  padding-left: 0.5rem;
  border-left: 1px solid var(--borda);
}
.alternar {
  width: 1.5rem;
  height: 2rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--texto-suave);
  font: inherit;
  cursor: pointer;
}
</style>
