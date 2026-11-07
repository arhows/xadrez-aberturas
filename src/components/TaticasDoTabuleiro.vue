<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formatarAvaliacao } from '../lib/motor'
import { taticasDaPosicao, type Oportunidade, type Tatica } from '../lib/taticas'
import type { Forma } from './Tabuleiro.vue'

const props = defineProps<{
  fen: string
  /** Tática do próximo lance, confirmada pelo Stockfish. */
  oportunidade?: (Oportunidade & { cp: number }) | null
  /** Lances do livro nesta posição, para dizer se o livro joga a tática. */
  lancesDoLivro?: string[]
}>()
const emit = defineEmits<{ formas: [formas: Forma[]] }>()

const taticas = computed(() => taticasDaPosicao(props.fen))
/** -1 = a tática disponível; 0.. = um item da lista. */
const selecionada = ref<number | null>(null)

const ROTULO: Record<Tatica['tipo'], string> = {
  'cravada-absoluta': 'Cravada',
  cravada: 'Cravada',
  'ataque-duplo': 'Ataque duplo',
  espeto: 'Espeto',
  'sem-defesa': 'Sem defesa',
  atacada: 'Atacada',
}
const ROTULO_OPORTUNIDADE: Record<Oportunidade['tipo'], string> = {
  garfo: 'Garfo',
  cravada: 'Cravada',
  espeto: 'Espeto',
  descoberto: 'Ataque descoberto',
}

const livroJoga = computed(
  () => !!props.oportunidade && (props.lancesDoLivro ?? []).includes(props.oportunidade.lance),
)

function formasDa(tatica: Tatica): Forma[] {
  return [
    { de: tatica.de, cor: 'yellow' },
    ...tatica.alvos.map((alvo): Forma => ({ de: tatica.de, para: alvo, cor: 'yellow' })),
  ]
}

function formasDaOportunidade(o: Oportunidade): Forma[] {
  return [
    { de: o.de, para: o.para, cor: 'blue' },
    ...o.alvos.map((alvo): Forma => ({ de: o.executor, para: alvo, cor: 'yellow' })),
  ]
}

function alternar(indice: number) {
  selecionada.value = selecionada.value === indice ? null : indice
  if (selecionada.value === null) emit('formas', [])
  else if (selecionada.value === -1) emit('formas', formasDaOportunidade(props.oportunidade!))
  else emit('formas', formasDa(taticas.value[selecionada.value]))
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
  <section v-if="taticas.length || oportunidade" class="taticas" aria-label="Táticas no tabuleiro">
    <h2>Táticas no tabuleiro</h2>

    <button
      v-if="oportunidade"
      type="button"
      class="tatica disponivel"
      :class="{ ativa: selecionada === -1 }"
      :aria-pressed="selecionada === -1"
      @click="alternar(-1)"
    >
      <span class="titulo">
        <span class="selo" :class="oportunidade.cor === 'w' ? 'brancas' : 'pretas'">{{ ROTULO_OPORTUNIDADE[oportunidade.tipo] }}</span>
        Tática disponível para {{ oportunidade.cor === 'w' ? 'as brancas' : 'as pretas' }}
      </span>
      <span>{{ oportunidade.texto.replace(/^[^:]+: /, '') }}</span>
      <span class="suave">
        Stockfish {{ formatarAvaliacao(oportunidade.cp) }} ·
        {{ livroJoga ? 'o livro joga este lance' : 'o livro segue outro caminho' }}
      </span>
    </button>

    <ul v-if="taticas.length">
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
    <p class="nota">
      Toque num item para ver as setas. A lista vem da posição das peças; a tática disponível é confirmada
      pelo Stockfish.
    </p>
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
.tatica.disponivel {
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  border-left: 4px solid #3a77c9;
}
.titulo {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-weight: 600;
}
.tatica.ativa {
  border-color: var(--aviso);
  background: var(--superficie);
}
.tatica.disponivel.ativa {
  border-left-color: #3a77c9;
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
.suave {
  color: var(--texto-suave);
  font-size: 0.8125rem;
}
.nota {
  margin: 0.375rem 0 0;
  color: var(--texto-suave);
  font-size: 0.8125rem;
}
</style>
