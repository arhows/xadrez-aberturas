<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { taticasDaPosicao, type Tatica } from '../lib/taticas'
import type { Forma } from './Tabuleiro.vue'

const props = defineProps<{ fen: string }>()
const emit = defineEmits<{ formas: [formas: Forma[]] }>()

const taticas = computed(() => taticasDaPosicao(props.fen))
const selecionada = ref<number | null>(null)

const ROTULO: Record<Tatica['tipo'], string> = {
  'cravada-absoluta': 'Cravada',
  cravada: 'Cravada',
  'ataque-duplo': 'Ataque duplo',
  espeto: 'Espeto',
  'sem-defesa': 'Sem defesa',
  atacada: 'Atacada',
}

function formasDa(tatica: Tatica): Forma[] {
  return [
    { de: tatica.de, cor: 'yellow' },
    ...tatica.alvos.map((alvo): Forma => ({ de: tatica.de, para: alvo, cor: 'yellow' })),
  ]
}

function alternar(indice: number) {
  selecionada.value = selecionada.value === indice ? null : indice
  emit('formas', selecionada.value === null ? [] : formasDa(taticas.value[selecionada.value]))
}

// Nova posição: as setas da tática anterior não valem mais.
watch(
  () => props.fen,
  () => {
    selecionada.value = null
    emit('formas', [])
  },
)
</script>

<template>
  <section v-if="taticas.length" class="taticas" aria-label="Táticas no tabuleiro">
    <h2>Táticas no tabuleiro</h2>
    <ul>
      <li v-for="(tatica, i) in taticas" :key="`${tatica.tipo}-${tatica.de}-${tatica.alvos.join()}`">
        <button
          type="button"
          class="tatica"
          :class="{ ativa: selecionada === i }"
          :aria-pressed="selecionada === i"
          @click="alternar(i)"
        >
          <span class="selo" :class="tatica.favorece === 'w' ? 'brancas' : 'pretas'">{{ ROTULO[tatica.tipo] }}</span>
          <span>{{ tatica.texto.replace(/^[^:]+: /, '') }}</span>
        </button>
      </li>
    </ul>
    <p class="nota">Toque num item para ver as setas. Detectado pela posição das peças, sem cálculo de variantes.</p>
  </section>
</template>

<style scoped>
h2 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}
ul {
  display: grid;
  gap: 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.tatica {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  width: 100%;
  min-height: 44px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--borda);
  border-radius: 8px;
  background: none;
  color: inherit;
  font: inherit;
  font-size: 0.9375rem;
  text-align: left;
  cursor: pointer;
}
.tatica.ativa {
  border-color: var(--aviso);
  background: var(--superficie);
}
.selo {
  flex: none;
  padding: 0 0.375rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}
.selo.brancas {
  background: #f1efe6;
  color: #1f1f1c;
  border: 1px solid #b9b6a8;
}
.selo.pretas {
  background: #2b2b28;
  color: #f1efe6;
  border: 1px solid #2b2b28;
}
.nota {
  margin: 0.375rem 0 0;
  color: var(--texto-suave);
  font-size: 0.8125rem;
}
</style>
