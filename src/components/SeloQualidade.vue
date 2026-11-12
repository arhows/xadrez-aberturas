<script setup lang="ts">
import { computed } from 'vue'
import { NOME_CLASSE_MOTOR, NOME_MARCA, tomDaMarca, type MarcaLivro, type QualidadeMotor } from '../lib/qualidade'

/** Avaliação de um lance: marca do MCO e opinião do Stockfish. */
const props = defineProps<{ marca?: MarcaLivro | null; motor?: QualidadeMotor | null }>()

const SIMBOLO_MOTOR = { melhor: '★', bom: '✓', imprecisao: '?!', erro: '?', grave: '??' } as const
const TOM_MOTOR = { melhor: 'bom', bom: 'bom', imprecisao: 'duvidoso', erro: 'erro', grave: 'erro' } as const

const textoMotor = computed(() => {
  const m = props.motor
  if (!m) return null
  if (!m.classe) return `perde ${Math.round(m.perda)} pontos de chance`
  if (m.classe === 'melhor' || m.classe === 'bom') return NOME_CLASSE_MOTOR[m.classe]
  return `${NOME_CLASSE_MOTOR[m.classe]} (perde ${Math.round(m.perda)} pontos de chance)`
})
</script>

<template>
  <p v-if="marca || textoMotor" class="selo-qualidade">
    <span v-if="marca" class="parte">
      <span class="fonte">MCO</span>
      <strong class="simbolo" :class="tomDaMarca(marca)">{{ marca }}</strong>
      {{ NOME_MARCA[marca] }}
    </span>
    <span v-if="textoMotor" class="parte">
      <span class="fonte">Stockfish</span>
      <strong v-if="motor?.classe" class="simbolo" :class="TOM_MOTOR[motor.classe]">{{ SIMBOLO_MOTOR[motor.classe] }}</strong>
      {{ textoMotor }}
    </span>
  </p>
</template>

<style scoped>
.selo-qualidade {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-1) var(--espaco-4);
  margin: 0;
  font-size: 14px;
}
.parte {
  display: inline-flex;
  align-items: baseline;
  gap: 6px;
}
.fonte {
  color: var(--texto-suave);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.simbolo {
  font-weight: 700;
}
.otimo,
.bom { color: var(--ok); }
.interessante { color: var(--motor); }
.duvidoso { color: var(--aviso); }
.erro { color: var(--erro); }
</style>
