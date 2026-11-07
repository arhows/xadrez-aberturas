<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { formatarAvaliacao } from '../lib/motor'
import { progresso } from '../lib/progresso'
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

/** Com as setas automáticas, nada selecionado mostra todas; um item tocado mostra só ele. */
const formas = computed<Forma[]>(() => {
  if (selecionada.value === -1 && props.oportunidade) return formasDaOportunidade(props.oportunidade)
  if (selecionada.value !== null && selecionada.value >= 0) {
    const tatica = taticas.value[selecionada.value]
    return tatica ? formasDa(tatica) : []
  }
  if (!progresso.config.taticasAutomaticas) return []
  return [
    ...(props.oportunidade ? formasDaOportunidade(props.oportunidade) : []),
    ...taticas.value.flatMap(formasDa),
  ]
})

watch(formas, (valor) => emit('formas', valor), { immediate: true })

function alternar(indice: number) {
  selecionada.value = selecionada.value === indice ? null : indice
}

// Nova posição: a tática selecionada na anterior não vale mais.
watch(
  () => props.fen,
  () => {
    selecionada.value = null
  },
)
</script>

<template>
  <section v-if="taticas.length || oportunidade" class="taticas" aria-label="Táticas no tabuleiro">
    <div class="cabecalho">
      <h2>Táticas no tabuleiro</h2>
      <label class="automatico">
        <input v-model="progresso.config.taticasAutomaticas" type="checkbox" />
        Setas automáticas
      </label>
    </div>

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
      {{ progresso.config.taticasAutomaticas ? 'Toque num item para destacar só ele.' : 'Toque num item para ver as setas.' }}
      A lista vem da posição das peças; a tática disponível é confirmada pelo Stockfish.
    </p>
  </section>
</template>

<style scoped>
.cabecalho {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  margin-bottom: 0.5rem;
}
h2 {
  margin: 0;
  font-size: 1rem;
}
.automatico {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 44px;
  color: var(--texto-suave);
  font-size: 0.875rem;
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
