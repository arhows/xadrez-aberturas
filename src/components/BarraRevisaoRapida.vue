<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { encerrarRevisaoRapida, revisaoRapida, tempoRestante } from '../lib/revisaoRapida'

/** Faixa da revisão rápida no Treino e nos exercícios: item atual, tempo que falta e "Encerrar". */
const router = useRouter()
const restante = ref(tempoRestante())
const relogio = setInterval(() => (restante.value = tempoRestante()), 1000)
onBeforeUnmount(() => clearInterval(relogio))
const mmss = (ms: number) => `${Math.floor(ms / 60_000)}:${String(Math.floor((ms % 60_000) / 1000)).padStart(2, '0')}`
</script>

<template>
  <div class="barra-rapida" role="status">
    <span class="rotulo">Revisão rápida</span>
    <span class="apoio">{{ revisaoRapida.atual + 1 }} de {{ revisaoRapida.itens.length }}</span>
    <span class="tempo" :class="{ acabando: restante < 30_000 }">{{ restante ? mmss(restante) : 'tempo esgotado' }}</span>
    <button type="button" class="encerrar" @click="encerrarRevisaoRapida(router)">Encerrar</button>
  </div>
</template>

<style scoped>
.barra-rapida {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-1) var(--espaco-3);
  padding: var(--espaco-2) var(--espaco-3);
  border-radius: var(--raio-md);
  background: color-mix(in srgb, var(--cor-praticar) 12%, var(--superficie));
}
.rotulo {
  color: var(--cor-praticar);
  font: 700 12px/16px var(--font-texto);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.apoio {
  color: var(--texto-suave);
}
.tempo {
  margin-left: auto;
  font: 700 16px/20px var(--font-texto);
  font-variant-numeric: tabular-nums;
}
.tempo.acabando {
  color: var(--aviso);
}
.encerrar {
  min-height: 32px;
  padding: 0 var(--espaco-2);
  border: 0;
  background: none;
  color: var(--destaque);
  font: 600 14px/20px var(--font-texto);
  cursor: pointer;
}
</style>
