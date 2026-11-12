<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Chess } from 'chess.js'
import GraficoPartida from '../components/GraficoPartida.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Tabuleiro from '../components/Tabuleiro.vue'
import { analisarLances, contarClasses, posicoesDaPartida, ROTULO_CLASSE, SIMBOLO_CLASSE, type Classe } from '../lib/analisePartida'
import { avaliarPosicoes, pararAvaliacao } from '../lib/avaliador'
import { obterCapitulos } from '../lib/capitulos'
import { fmtLance } from '../lib/formato'
import { marcaNaSequencia, tomDaMarca } from '../lib/qualidade'
import { separarLances } from '../lib/lances'

/** Análise de uma partida pelo Stockfish: gráfico de chance, erros marcados e navegação. */
const PROFUNDIDADE = 10

const route = useRoute()
const sans = (() => {
  const lista = separarLances(String(route.query.c ?? ''))
  try {
    posicoesDaPartida(lista)
    return lista
  } catch {
    return []
  }
})()
const minhaCor = route.query.cor === 'w' || route.query.cor === 'b' ? route.query.cor : null
const titulo = String(route.query.titulo ?? 'Análise da partida')
const voltar = String(route.query.volta ?? '/')

const posicoes = posicoesDaPartida(sans)
const valores = ref<(number | null)[]>(posicoes.map((p) => p.valorFixo ?? null))
const melhores = ref<(string | null)[]>([])
/** Marca do MCO de cada lance enquanto a partida estava no livro. */
const marcas = sans.map((_, i) => marcaNaSequencia(sans.slice(0, i + 1), obterCapitulos()))
/** Histórico com as marcas: do MCO, e ?!/?/?? do motor quando o livro não marcou. */
const sansMarcados = computed(() =>
  sans.map((san, i) => {
    const lance = analise.value.lances[i]
    return `${san}${marcas[i] ?? (lance?.classe ? SIMBOLO_CLASSE[lance.classe] : '')}`
  }),
)
const feitas = ref(0)
const erro = ref<string | null>(null)
const ply = ref(sans.length)
const orientacao = ref<'white' | 'black'>(minhaCor === 'b' ? 'black' : 'white')

const analise = computed(() => analisarLances(sans, valores.value, melhores.value))
const analisando = computed(() => feitas.value < posicoes.length && !erro.value)
/** Casas de origem e destino de cada lance, para destacar o último. */
const casas = (() => {
  const jogo = new Chess()
  return sans.map((san) => {
    const lance = jogo.move(san)
    return [lance.from, lance.to] as [string, string]
  })
})()
const ultimoLance = computed<[string, string] | null>(() => (ply.value > 0 ? casas[ply.value - 1] : null))
const marcados = computed(() => analise.value.lances.filter((l) => l.classe))
const CLASSES: Classe[] = ['imprecisao', 'erro', 'grave']
const resumo = (cor: 'w' | 'b') => contarClasses(analise.value.lances, cor)
const nomeDaCor = (cor: 'w' | 'b') => (minhaCor ? (cor === minhaCor ? 'Você' : 'Adversário') : cor === 'w' ? 'Brancas' : 'Pretas')

function aoTeclar(evento: KeyboardEvent) {
  if (evento.key === 'ArrowLeft' && ply.value > 0) ply.value--
  if (evento.key === 'ArrowRight' && ply.value < sans.length) ply.value++
  if (evento.key === 'Home') ply.value = 0
  if (evento.key === 'End') ply.value = sans.length
}

onMounted(async () => {
  window.addEventListener('keydown', aoTeclar)
  if (!sans.length) return
  try {
    await avaliarPosicoes(posicoes, PROFUNDIDADE, (n, lista) => {
      feitas.value = n
      valores.value = posicoes.map((p, i) => lista[i]?.cp ?? p.valorFixo ?? null)
      melhores.value = lista.map((a) => a.melhor)
    })
  } catch (falha) {
    erro.value = falha instanceof Error ? falha.message : 'O Stockfish não respondeu.'
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', aoTeclar)
  pararAvaliacao()
})
</script>

<template>
  <div v-if="sans.length" class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro :fen="posicoes[ply].fen" :orientacao="orientacao" :ultimo-lance="ultimoLance" :avaliacao="valores[ply]" />
    </div>

    <div class="painel">
      <div class="cabeca-painel">
        <RouterLink :to="voltar" class="trilha">‹ Voltar</RouterLink>
        <h1 class="titulo-pagina">{{ titulo }}</h1>
        <p v-if="analisando" class="suave" role="status">Analisando com o Stockfish… {{ feitas }} de {{ posicoes.length }} posições</p>
        <p v-else-if="erro" class="erro">{{ erro }}</p>
      </div>

      <GraficoPartida :chances="analise.chances" :lances="analise.lances" :atual="ply" @ir="ply = $event" />

      <div class="controles">
        <button type="button" class="botao" :disabled="ply === 0" aria-label="Voltar ao início" @click="ply = 0">⏮</button>
        <button type="button" class="botao" :disabled="ply === 0" aria-label="Lance anterior" @click="ply--">◀</button>
        <button type="button" class="botao" :disabled="ply === sans.length" aria-label="Próximo lance" @click="ply++">▶</button>
        <button type="button" class="botao" :disabled="ply === sans.length" aria-label="Último lance" @click="ply = sans.length">⏭</button>
        <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
      </div>

      <HistoricoLances :lances="sansMarcados" :atual="ply" clicavel @ir="ply = $event" />

      <p v-if="ply > 0 && (marcas[ply - 1] || analise.lances[ply - 1]?.boa || analise.lances[ply - 1]?.classe)" class="lance-atual">
        {{ fmtLance(ply, sans[ply - 1]) }}:
        <template v-if="marcas[ply - 1]">
          <span class="fonte">MCO</span> <strong :class="tomDaMarca(marcas[ply - 1]!)">{{ marcas[ply - 1] }}</strong>
        </template>
        <template v-if="analise.lances[ply - 1]?.boa">
          <span class="fonte">Stockfish</span> {{ analise.lances[ply - 1].boa === 'melhor' ? '★ Melhor lance' : '✓ Bom' }}
        </template>
        <template v-else-if="analise.lances[ply - 1]?.classe">
          <span class="fonte">Stockfish</span>
          <strong class="simbolo" :class="analise.lances[ply - 1].classe!">{{ SIMBOLO_CLASSE[analise.lances[ply - 1].classe!] }}</strong>
          {{ ROTULO_CLASSE[analise.lances[ply - 1].classe!] }} (−{{ Math.round(analise.lances[ply - 1].perda) }} pontos)
        </template>
      </p>

      <table class="resumo">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col" class="num">Melhor lance <span class="simbolo bom">★</span></th>
            <th v-for="classe in CLASSES" :key="classe" scope="col" class="num">{{ ROTULO_CLASSE[classe] }} <span class="simbolo" :class="classe">{{ SIMBOLO_CLASSE[classe] }}</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cor in ['w', 'b'] as const" :key="cor">
            <th scope="row">{{ nomeDaCor(cor) }} <span class="suave">({{ cor === 'w' ? 'brancas' : 'pretas' }})</span></th>
            <td class="num">{{ analise.lances.filter((l) => l.cor === cor && l.boa === 'melhor').length }}</td>
            <td v-for="classe in CLASSES" :key="classe" class="num">{{ resumo(cor)[classe] }}</td>
          </tr>
        </tbody>
      </table>

      <section v-if="marcados.length">
        <h2>Lances marcados</h2>
        <ul class="marcados">
          <li v-for="lance in marcados" :key="lance.ply">
            <button type="button" class="chip-lance" :class="{ atual: lance.ply === ply }" @click="ply = lance.ply">
              {{ fmtLance(lance.ply, lance.san) }}<span class="simbolo" :class="lance.classe!">{{ SIMBOLO_CLASSE[lance.classe!] }}</span>
            </button>
            <span class="suave">{{ ROTULO_CLASSE[lance.classe!] }} de {{ nomeDaCor(lance.cor).toLowerCase() }} · −{{ Math.round(lance.perda) }} pontos de chance</span>
          </li>
        </ul>
      </section>
      <p v-else-if="!analisando && !erro" class="suave">Nenhuma imprecisão encontrada nesta profundidade.</p>
      <p v-if="route.query.parcial" class="suave nota">Das partidas importadas o app guarda só os primeiros 25 lances (a abertura); o resto fica de fora da análise.</p>
      <p class="suave nota">Análise rápida (profundidade {{ PROFUNDIDADE }}); serve para achar os momentos que mudaram a partida.</p>
    </div>
  </div>

  <div v-else class="pagina">
    <p>Não há lances para analisar.</p>
    <RouterLink to="/">Voltar ao início</RouterLink>
  </div>
</template>

<style scoped>
.titulo-pagina {
  margin: 0;
}
.cabeca-painel p {
  margin: 0;
}
.trilha {
  display: inline-flex;
  align-items: center;
  min-height: var(--alvo-toque);
  color: var(--destaque);
  font-size: 14px;
  text-decoration: none;
}
.suave {
  color: var(--texto-suave);
  font-size: 14px;
}
.erro {
  color: var(--erro);
}
.controles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.resumo {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.resumo th,
.resumo td {
  padding: 0.375rem;
  border-bottom: 1px solid var(--borda);
  text-align: left;
  font-weight: 400;
}
.resumo thead th {
  color: var(--texto-suave);
  font-weight: 600;
}
.num {
  text-align: right !important;
  font-variant-numeric: tabular-nums;
}
h2 {
  margin: 0 0 0.5rem;
}
.marcados {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.marcados li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
.simbolo {
  margin-left: 2px;
  font-weight: 700;
}
.simbolo.imprecisao { color: var(--aviso); }
.simbolo.bom,
.bom,
.otimo { color: var(--ok); }
.interessante { color: var(--motor); }
.duvidoso { color: var(--aviso); }
.lance-atual {
  margin: 0;
  font-size: 14px;
}
.fonte {
  color: var(--texto-suave);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.simbolo.erro { color: #d9772b; }
.simbolo.grave { color: var(--erro); }
.nota {
  margin: 0;
}
</style>
