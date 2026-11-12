<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue'
import { buscarEstatisticas, ErroExplorador, FAIXAS_RATING, type Estatisticas } from '../lib/explorador'
import { fmtSan } from '../lib/formato'
import { conectarLichess, conexaoInvalida, conexaoLichess, erroConexaoLichess } from '../lib/lichessConta'
import { progresso } from '../lib/progresso'

/** Estatísticas do explorador do lichess para a posição do Explorar. Só consulta com a seção aberta. */
const props = defineProps<{ fen: string; lancesDoLivro: string[] }>()
const emit = defineEmits<{ jogar: [san: string] }>()

const config = progresso.config
const aberto = ref(false)
const carregando = ref(false)
const erro = ref<string | null>(null)
const dados = shallowRef<Estatisticas | null>(null)

let pedido = 0
let espera: ReturnType<typeof setTimeout> | undefined

async function consultar() {
  const token = conexaoLichess.value?.token
  if (!aberto.value || !token) return
  const meu = ++pedido
  carregando.value = true
  erro.value = null
  try {
    const resultado = await buscarEstatisticas(props.fen, config.fonteExplorador, token, config.ratingExplorador)
    if (meu === pedido) dados.value = resultado
  } catch (falha) {
    if (meu !== pedido) return
    dados.value = null
    erro.value = falha instanceof Error ? falha.message : 'Não foi possível consultar o lichess.'
    if (falha instanceof ErroExplorador && falha.tipo === 'sem-login') conexaoInvalida()
  } finally {
    if (meu === pedido) carregando.value = false
  }
}

// Ao andar pelas posições, espera um instante para não consultar cada lance intermediário.
watch(
  () => [props.fen, aberto.value, config.fonteExplorador, config.ratingExplorador, conexaoLichess.value?.token],
  () => {
    clearTimeout(espera)
    espera = setTimeout(consultar, 350)
  },
)

const lances = computed(() =>
  (dados.value?.lances ?? []).map((lance) => ({
    ...lance,
    livro: props.lancesDoLivro.includes(lance.san),
    parte: dados.value!.total ? Math.round((lance.total / dados.value!.total) * 100) : 0,
  })),
)
const pct = (parte: number, total: number) => (total ? (parte / total) * 100 : 0)
const numero = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mi` : n >= 10_000 ? `${Math.round(n / 1000)} mil` : n.toLocaleString('pt-BR'))

async function conectar() {
  erro.value = null
  try {
    await conectarLichess()
  } catch (falha) {
    erro.value = falha instanceof Error ? falha.message : 'Não foi possível conectar.'
  }
}
</script>

<template>
  <details class="explorador" @toggle="aberto = ($event.target as HTMLDetailsElement).open">
    <summary>
      <h2>No lichess</h2>
      <span class="suave">o que se joga nesta posição</span>
    </summary>

    <div v-if="!conexaoLichess" class="conectar">
      <p>
        O explorador do lichess mostra quantas partidas tiveram cada lance e como terminaram. Ele exige uma conta:
        conecte a sua (o app não pede nenhuma permissão, e a conexão fica só neste aparelho).
      </p>
      <p v-if="erroConexaoLichess" class="erro">{{ erroConexaoLichess }}</p>
      <button type="button" class="botao primario" @click="conectar">Conectar ao lichess</button>
    </div>

    <template v-else>
      <div class="filtros">
        <select v-model="config.fonteExplorador" aria-label="Partidas de quem">
          <option value="lichess">Partidas do lichess</option>
          <option value="masters">Partidas de mestres</option>
        </select>
        <select v-if="config.fonteExplorador === 'lichess'" v-model.number="config.ratingExplorador" aria-label="Rating">
          <option v-for="faixa in FAIXAS_RATING" :key="faixa" :value="faixa">perto de {{ faixa || 'iniciante' }}</option>
        </select>
      </div>

      <p v-if="erro" class="erro">{{ erro }}</p>
      <p v-else-if="carregando && !dados" class="suave">Consultando…</p>
      <p v-else-if="dados && !lances.length" class="suave">Nenhuma partida chegou a esta posição.</p>

      <table v-if="lances.length" class="tabela" :class="{ desatualizada: carregando }">
        <caption class="suave">{{ numero(dados!.total) }} partidas</caption>
        <thead>
          <tr>
            <th scope="col">Lance</th>
            <th scope="col" class="num">Partidas</th>
            <th scope="col">Brancas · empates · pretas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lance in lances" :key="lance.san">
            <th scope="row">
              <button type="button" class="chip-lance" :class="{ livro: lance.livro }" @click="emit('jogar', lance.san)">
                {{ fmtSan(lance.san) }}
              </button>
            </th>
            <td class="num">{{ numero(lance.total) }} <span class="suave">· {{ lance.parte }}%</span></td>
            <td>
              <span
                class="barra-resultado"
                role="img"
                :aria-label="`Brancas ${Math.round(pct(lance.brancas, lance.total))}%, empates ${Math.round(pct(lance.empates, lance.total))}%, pretas ${Math.round(pct(lance.pretas, lance.total))}%`"
              >
                <span class="b" :style="{ width: `${pct(lance.brancas, lance.total)}%` }">{{ pct(lance.brancas, lance.total) >= 18 ? `${Math.round(pct(lance.brancas, lance.total))}%` : '' }}</span>
                <span class="e" :style="{ width: `${pct(lance.empates, lance.total)}%` }">{{ pct(lance.empates, lance.total) >= 18 ? `${Math.round(pct(lance.empates, lance.total))}%` : '' }}</span>
                <span class="p" :style="{ width: `${pct(lance.pretas, lance.total)}%` }">{{ pct(lance.pretas, lance.total) >= 18 ? `${Math.round(pct(lance.pretas, lance.total))}%` : '' }}</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="lances.length" class="suave rodape">Verde = lance do livro. Toque num lance para jogá-lo.</p>
    </template>
  </details>
</template>

<style scoped>
.explorador summary {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  min-height: var(--alvo-toque);
  cursor: pointer;
  list-style: revert;
}
.explorador h2 {
  display: inline;
  margin: 0;
}
.suave {
  color: var(--texto-suave);
  font-size: 14px;
}
.conectar,
.filtros {
  display: grid;
  gap: 0.5rem;
  margin: 0.5rem 0;
}
.conectar p {
  margin: 0;
  font-size: 14px;
}
.filtros {
  display: flex;
  flex-wrap: wrap;
}
.filtros select {
  min-height: 40px;
  padding: 0 0.5rem;
  border: 1px solid var(--borda-controle);
  border-radius: var(--raio-md);
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  font-size: 14px;
}
.erro {
  color: var(--erro);
  font-size: 14px;
}
.tabela {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.tabela.desatualizada {
  opacity: 0.6;
}
.tabela caption {
  text-align: left;
  padding-bottom: 0.25rem;
}
.tabela th,
.tabela td {
  padding: 0.25rem 0.375rem;
  border-bottom: 1px solid var(--borda);
  text-align: left;
  font-weight: 400;
}
.tabela thead th {
  color: var(--texto-suave);
  font-weight: 600;
  white-space: nowrap;
}
.tabela td:last-child {
  width: 50%;
}
.num {
  text-align: right !important;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.barra-resultado {
  display: flex;
  height: 20px;
  overflow: hidden;
  border: 1px solid var(--borda);
  border-radius: 4px;
  font-size: 11px;
  line-height: 18px;
}
.barra-resultado span {
  display: block;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
}
/* Cores das peças (não de tema): branco, cinza e quase preto, como no lichess. */
.barra-resultado .b { background: #f4f4f1; color: #1c1d1a; }
.barra-resultado .e { background: #a3a39b; color: #1c1d1a; }
.barra-resultado .p { background: #2a2b27; color: #f4f4f1; }
.rodape {
  margin: 0.5rem 0 0;
}
</style>
