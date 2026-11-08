<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { fmtSan } from '../lib/formato'
import { formatarAvaliacao } from '../lib/motor'
import { analisarAoVivo, pararAnalise, type AnaliseAoVivo, type LinhaAoVivo } from '../lib/stockfishAoVivo'

const props = defineProps<{ fen: string }>()
const emit = defineEmits<{
  /** Melhor lance atual (SAN) para a seta azul, ou null enquanto não há análise. */
  melhor: [san: string | null]
  /** O usuário tocou numa linha: jogar o primeiro lance dela. */
  jogar: [san: string]
}>()

const analise = ref<AnaliseAoVivo | null>(null)
const erro = ref('')
let ultimaAtualizacao = 0

function aoAtualizar(nova: AnaliseAoVivo) {
  if (nova.fen !== props.fen) return
  // Até 6 atualizações por segundo: o motor manda dezenas de linhas por segundo.
  const agora = performance.now()
  if (!nova.terminou && agora - ultimaAtualizacao < 160) return
  ultimaAtualizacao = agora
  analise.value = nova
  emit('melhor', nova.linhas[0]?.sans[0] ?? null)
}

watch(
  () => props.fen,
  (fen) => {
    analise.value = null
    emit('melhor', null)
    analisarAoVivo(fen, aoAtualizar).catch(() => (erro.value = 'Não foi possível carregar o Stockfish neste navegador.'))
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  pararAnalise()
  emit('melhor', null)
})

function avaliacao(linha: LinhaAoVivo): string {
  if (linha.mate !== undefined) return linha.mate > 0 ? `#${linha.mate}` : `#−${-linha.mate}`
  return formatarAvaliacao(linha.cp ?? 0)
}

/** "12.Nf3 Bg4 13.h3" a partir do número de lance da posição. */
function sequencia(sans: string[]): string {
  const [, vez, , , , lance] = props.fen.split(' ')
  let numero = Number(lance) || 1
  let brancas = vez === 'w'
  return sans
    .map((san, i) => {
      const texto = brancas ? `${numero}.${fmtSan(san)}` : i === 0 ? `${numero}...${fmtSan(san)}` : fmtSan(san)
      if (!brancas) numero++
      brancas = !brancas
      return texto
    })
    .join(' ')
}
</script>

<template>
  <section class="ao-vivo" aria-live="polite">
    <p class="cabecalho">
      <span class="marca" aria-hidden="true"></span>
      <strong>Stockfish 19 ao vivo</strong>
      <span class="suave">
        <template v-if="erro">{{ erro }}</template>
        <template v-else-if="!analise">carregando…</template>
        <template v-else>profundidade {{ analise.profundidade }}{{ analise.terminou ? '' : '…' }}</template>
      </span>
    </p>
    <ol v-if="analise?.linhas.length" class="linhas">
      <li v-for="(linha, i) in analise.linhas" :key="i">
        <button type="button" class="linha" :title="`Jogar ${fmtSan(linha.sans[0])}`" @click="emit('jogar', linha.sans[0])">
          <span class="nota" :class="{ boa: (linha.mate ?? linha.cp ?? 0) > 0, ruim: (linha.mate ?? linha.cp ?? 0) < 0 }">
            {{ avaliacao(linha) }}
          </span>
          <span class="pv">{{ sequencia(linha.sans) }}</span>
        </button>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.ao-vivo {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--borda);
  border-radius: 8px;
}
.cabecalho {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}
.marca {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: #3b82f6;
}
.suave {
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.linhas {
  margin: 0.375rem 0 0;
  padding: 0;
  list-style: none;
}
.linha {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  min-height: 36px;
  align-items: center;
  padding: 0.25rem 0.375rem;
  border: 0;
  border-radius: 6px;
  background: none;
  color: var(--texto);
  font: inherit;
  font-size: 0.875rem;
  text-align: left;
  cursor: pointer;
}
.linha:hover,
.linha:focus-visible {
  background: var(--superficie);
}
.nota {
  flex: none;
  min-width: 3.5rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.pv {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
