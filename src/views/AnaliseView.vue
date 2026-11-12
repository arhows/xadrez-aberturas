<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Chess } from 'chess.js'
import GraficoPartida from '../components/GraficoPartida.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { analisarLances, contarClasses, posicoesDaPartida, sanDoUci, ROTULO_CLASSE, SIMBOLO_CLASSE, type Classe } from '../lib/analisePartida'
import { avaliarPosicoes, pararAvaliacao } from '../lib/avaliador'
import { obterCapitulos } from '../lib/capitulos'
import { fmtLance } from '../lib/formato'
import { lanceNoLivro, tomDaMarca } from '../lib/qualidade'
import { seloDoLance } from '../lib/seloNoTabuleiro'
import { separarLances } from '../lib/lances'
import { lancesAntesDoFen } from '../lib/jogo'

/** Análise de uma partida pelo Stockfish: gráfico de chance, erros marcados e navegação. */
const PROFUNDIDADE = 10

const route = useRoute()
/** Partida que começou numa posição do editor. */
const fenInicial = (() => {
  const pedido = typeof route.query.fen === 'string' ? route.query.fen : ''
  if (!pedido) return undefined
  try {
    return new Chess(pedido).fen()
  } catch {
    return undefined
  }
})()
const antes = lancesAntesDoFen(fenInicial)
/** Número do lance contando os meios-lances antes da posição do editor. */
const fmtNum = (p: number, san: string) => fmtLance(antes + p, san)
const sans = (() => {
  const lista = separarLances(String(route.query.c ?? ''))
  try {
    posicoesDaPartida(lista, fenInicial)
    return lista
  } catch {
    return []
  }
})()
const minhaCor = route.query.cor === 'w' || route.query.cor === 'b' ? route.query.cor : null
const titulo = String(route.query.titulo ?? 'Análise da partida')
const voltar = String(route.query.volta ?? '/')

const posicoes = posicoesDaPartida(sans, fenInicial)
const valores = ref<(number | null)[]>(posicoes.map((p) => p.valorFixo ?? null))
const melhores = ref<(string | null)[]>([])
/** Marca do MCO de cada lance enquanto a partida estava no livro. */
const livro = sans.map((_, i) =>
  fenInicial ? { marca: null, noLivro: false } : lanceNoLivro(sans.slice(0, i + 1), obterCapitulos()),
)
const marcas = livro.map((l) => l.marca)
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

// ---------- Sugestão do Stockfish ----------
/** Seta azul com o melhor lance na posição mostrada (como no lichess). */
const mostrarSeta = ref(true)
/** Ply de um lance marcado cuja alternativa está sendo mostrada (a posição antes dele). */
const vendoMelhor = ref<number | null>(null)
watch(ply, () => (vendoMelhor.value = null))

const analise = computed(() => analisarLances(sans, valores.value, melhores.value, fenInicial))
const analisando = computed(() => feitas.value < posicoes.length && !erro.value)
/** Casas de origem e destino de cada lance, para destacar o último. */
const casas = (() => {
  const jogo = fenInicial ? new Chess(fenInicial) : new Chess()
  return sans.map((san) => {
    const lance = jogo.move(san)
    return [lance.from, lance.to] as [string, string]
  })
})()
const ultimoLance = computed<[string, string] | null>(() => (ply.value > 0 ? casas[ply.value - 1] : null))
/** Sinal no canto da casa de destino do lance mostrado. */
const seloCasa = computed(() => {
  if (ply.value === 0) return null
  const lance = analise.value.lances[ply.value - 1]
  return seloDoLance(casas[ply.value - 1][1], {
    marca: marcas[ply.value - 1],
    classe: lance?.classe ?? lance?.boa ?? null,
    noLivro: livro[ply.value - 1].noLivro,
  })
})
/** Melhor lance (SAN) na posição depois de `i` meios-lances. */
const melhorSan = (i: number) => sanDoUci(posicoes[i]?.fen ?? '', melhores.value[i])
const setaDe = (i: number): Forma[] => {
  const uci = melhores.value[i]
  return uci ? [{ de: uci.slice(0, 2), para: uci.slice(2, 4), cor: 'blue' }] : []
}
/** Posição no tabuleiro: a do lance, ou a de antes do lance marcado quando se vê a alternativa. */
const plyNoTabuleiro = computed(() => (vendoMelhor.value !== null ? vendoMelhor.value - 1 : ply.value))
const formas = computed<Forma[]>(() =>
  vendoMelhor.value !== null ? setaDe(vendoMelhor.value - 1) : mostrarSeta.value ? setaDe(ply.value) : [],
)
const ultimoNoTabuleiro = computed<[string, string] | null>(() =>
  vendoMelhor.value !== null ? (vendoMelhor.value > 1 ? casas[vendoMelhor.value - 2] : null) : ultimoLance.value,
)

function verMelhor(p: number) {
  ply.value = p
  // O watch de ply limpa a escolha; marca depois dele.
  setTimeout(() => (vendoMelhor.value = p))
}

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
      <Tabuleiro
        :fen="posicoes[plyNoTabuleiro].fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoNoTabuleiro"
        :avaliacao="valores[plyNoTabuleiro]"
        :selo="vendoMelhor === null ? seloCasa : null"
        :formas="formas"
      />
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
        <RouterLink class="botao" :to="{ name: 'analisar', query: { fen: posicoes[ply].fen, orientacao } }" title="Explorar esta posição com lances livres">Analisar daqui</RouterLink>
        <label class="marcar" title="Seta azul com o melhor lance do Stockfish na posição mostrada">
          <input v-model="mostrarSeta" type="checkbox" />
          Seta do Stockfish
        </label>
      </div>

      <HistoricoLances :lances="sansMarcados" :atual="ply" :antes="antes" clicavel @ir="ply = $event" />

      <p v-if="ply > 0 && (marcas[ply - 1] || analise.lances[ply - 1]?.boa || analise.lances[ply - 1]?.classe)" class="lance-atual">
        {{ fmtNum(ply, sans[ply - 1]) }}:
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
          <template v-if="melhorSan(ply - 1)">
            · Melhor era <strong class="lance">{{ fmtNum(ply, melhorSan(ply - 1)!) }}</strong>
            <button v-if="vendoMelhor === null" type="button" class="botao pequeno" @click="verMelhor(ply)">Ver</button>
          </template>
        </template>
      </p>
      <p v-if="vendoMelhor !== null" class="vendo-melhor">
        Posição antes de <span class="lance">{{ fmtNum(vendoMelhor, sans[vendoMelhor - 1]) }}</span>: o Stockfish jogaria
        <strong class="lance">{{ fmtNum(vendoMelhor, melhorSan(vendoMelhor - 1) ?? '') }}</strong> (seta azul).
        <button type="button" class="botao pequeno" @click="vendoMelhor = null">Voltar ao lance</button>
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
              {{ fmtNum(lance.ply, lance.san) }}<span class="simbolo" :class="lance.classe!">{{ SIMBOLO_CLASSE[lance.classe!] }}</span>
            </button>
            <span class="suave">
              {{ ROTULO_CLASSE[lance.classe!] }} de {{ nomeDaCor(lance.cor).toLowerCase() }} · −{{ Math.round(lance.perda) }} pontos de chance
              <template v-if="melhorSan(lance.ply - 1)"> · melhor era <span class="lance">{{ fmtNum(lance.ply, melhorSan(lance.ply - 1)!) }}</span></template>
            </span>
            <button v-if="melhorSan(lance.ply - 1)" type="button" class="botao pequeno" @click="verMelhor(lance.ply)">Ver</button>
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
.vendo-melhor {
  margin: 0;
  padding: 0.5rem 0.75rem;
  border-left: 3px solid var(--motor);
  border-radius: var(--raio-sm);
  background: var(--superficie-2);
  font-size: 14px;
}
.pequeno {
  min-height: 32px;
  padding: 0 0.5rem;
  font-size: 13px;
  vertical-align: middle;
}
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
