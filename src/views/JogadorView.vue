<script setup lang="ts">
import { Chess } from 'chess.js'
import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import CartaoDica from '../components/CartaoDica.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { gravarLocal, lerLocal } from '../lib/bancoLocal'
import { lerLances } from '../lib/busca'
import { fmtLance, fmtSan } from '../lib/formato'
import {
  jogadorMaisFrequente,
  lancesSeguintes,
  lerPartidasPgn,
  novoIdDeColecao,
  partidasDoJogador,
  partidasNoCaminho,
  type Colecao,
  type PartidaIndexada,
} from '../lib/jogador'
import { casasDoLance } from '../lib/lances'
import { tocar } from '../lib/som'
import { ehZip, lerZip, textoDoArquivo } from '../lib/zip'

/** Estudar um jogador: as partidas dele (PGN importado), a árvore dos lances que ele escolheu e um quiz. */

const CHAVE = 'colecoesDeJogadores'
const MAX_PARTIDAS_NA_LISTA = 30
const LANCES_NO_QUIZ = 15

const colecoes = shallowRef<Colecao[]>([])
const escolhida = ref<string | null>(null)
const carregando = ref(true)
const importando = ref(false)
const erro = ref<string | null>(null)

lerLocal<Colecao[]>(CHAVE)
  .then((salvas) => {
    colecoes.value = salvas ?? []
    escolhida.value = colecoes.value[0]?.id ?? null
  })
  .catch(() => (erro.value = 'Este navegador não deixou abrir o armazenamento local.'))
  .finally(() => (carregando.value = false))

const colecao = computed(() => colecoes.value.find((c) => c.id === escolhida.value) ?? null)

async function salvar(lista: Colecao[]) {
  colecoes.value = lista
  await gravarLocal(CHAVE, JSON.parse(JSON.stringify(lista)))
}

async function importar(evento: Event) {
  const entrada = evento.target as HTMLInputElement
  const arquivo = entrada.files?.[0]
  entrada.value = ''
  if (!arquivo) return
  importando.value = true
  erro.value = null
  try {
    const dados = new Uint8Array(await arquivo.arrayBuffer())
    const textos = ehZip(dados)
      ? (await lerZip(dados)).filter((a) => /\.pgn$/i.test(a.nome)).map((a) => textoDoArquivo(a.dados))
      : [textoDoArquivo(dados)]
    const partidas = textos.flatMap(lerPartidasPgn)
    if (!partidas.length) {
      erro.value = 'Não achei partidas nesse arquivo. Ele precisa ser um PGN (ou um .zip com PGN).'
      return
    }
    const nova: Colecao = {
      id: novoIdDeColecao(),
      nome: arquivo.name,
      jogador: jogadorMaisFrequente(partidas),
      importada: new Date().toISOString(),
      partidas,
    }
    await salvar([...colecoes.value, nova])
    escolhida.value = nova.id
    caminho.value = []
  } catch (falha) {
    erro.value = falha instanceof Error ? falha.message : 'Não foi possível ler o arquivo.'
  } finally {
    importando.value = false
  }
}

const confirmandoApagar = ref(false)
async function apagarColecao() {
  if (!confirmandoApagar.value) {
    confirmandoApagar.value = true
    setTimeout(() => (confirmandoApagar.value = false), 3000)
    return
  }
  confirmandoApagar.value = false
  await salvar(colecoes.value.filter((c) => c.id !== escolhida.value))
  escolhida.value = colecoes.value[0]?.id ?? null
  caminho.value = []
}

async function trocarJogador(nome: string) {
  if (!colecao.value || !nome.trim()) return
  await salvar(colecoes.value.map((c) => (c.id === colecao.value!.id ? { ...c, jogador: nome.trim() } : c)))
  caminho.value = []
}

/** Nome curto para os textos: "Kasparov, Gary" → "Kasparov". */
const nomeCurto = computed(() => {
  const nome = colecao.value?.jogador ?? ''
  return nome.includes(',') ? nome.split(',')[0] : nome
})
const jogadores = computed(() => {
  const nomes = new Map<string, number>()
  for (const p of colecao.value?.partidas ?? []) for (const n of [p.brancas, p.pretas]) nomes.set(n, (nomes.get(n) ?? 0) + 1)
  return [...nomes.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).map(([n]) => n)
})

// ---------- Árvore ----------
const cor = ref<'w' | 'b'>('b')
const caminho = ref<string[]>([])
watch([cor, escolhida], () => (caminho.value = []))

const base = computed<PartidaIndexada[]>(() => (colecao.value ? partidasDoJogador(colecao.value, cor.value) : []))
const noCaminho = computed(() => partidasNoCaminho(base.value, caminho.value))
const seguintes = computed(() => lancesSeguintes(noCaminho.value, caminho.value.length))
const vezDoJogador = computed(() => (caminho.value.length % 2 === 0 ? 'w' : 'b') === cor.value)

function fenDe(sans: string[]): string {
  const jogo = new Chess()
  for (const san of sans) {
    try {
      jogo.move(san)
    } catch {
      break
    }
  }
  return jogo.fen()
}

const aviso = ref<{ tipo: 'certo' | 'errado' | 'neutro'; texto: string } | null>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()

function ir(san: string) {
  caminho.value = [...caminho.value, san]
  aviso.value = null
}
function voltar(n = 1) {
  caminho.value = caminho.value.slice(0, Math.max(0, caminho.value.length - n))
  aviso.value = null
}

const textoLances = ref('')
function irParaLances() {
  const lida = lerLances(textoLances.value)
  if (!lida) {
    aviso.value = { tipo: 'errado', texto: 'Não entendi esses lances. Exemplo: 1.d4 Nf6 2.c4 g6' }
    return
  }
  caminho.value = lida.sans
  aviso.value = noCaminho.value.length
    ? null
    : { tipo: 'neutro', texto: `Nenhuma partida de ${nomeCurto.value} com essa cor passa por esses lances nessa ordem.` }
}

// ---------- Quiz: adivinhe o lance ----------
const quiz = shallowRef<{ partida: PartidaIndexada; ply: number; inicio: number; acertos: number; perguntas: number; fim: boolean } | null>(null)
let temporizador: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(temporizador))

function comecarQuiz() {
  const candidatas = noCaminho.value.filter((p) => p.lances.length > caminho.value.length + 2)
  if (!candidatas.length) return
  const partida = candidatas[Math.floor(Math.random() * candidatas.length)]
  quiz.value = { partida, ply: caminho.value.length, inicio: caminho.value.length, acertos: 0, perguntas: 0, fim: false }
  aviso.value = { tipo: 'neutro', texto: `Partida sorteada. Ache o lance de ${nomeCurto.value}.` }
  avancarAdversario()
}

/** Joga os lances do adversário até ser a vez do jogador (ou a partida acabar). */
function avancarAdversario() {
  const q = quiz.value
  if (!q) return
  const vezDele = (q.ply % 2 === 0 ? 'w' : 'b') === cor.value
  const acabou = q.ply >= q.partida.lances.length || q.perguntas >= LANCES_NO_QUIZ
  if (acabou) {
    quiz.value = { ...q, fim: true }
    return
  }
  if (!vezDele) {
    temporizador = setTimeout(() => {
      quiz.value = { ...q, ply: q.ply + 1 }
      avancarAdversario()
    }, 600)
  }
}

function responderQuiz(san: string) {
  const q = quiz.value!
  const certo = q.partida.lances[q.ply]
  const semSinais = (x: string) => x.replace(/[+#]/g, '')
  const acertou = semSinais(san) === semSinais(certo)
  const outras = lancesSeguintes(partidasNoCaminho(base.value, q.partida.lances.slice(0, q.ply)), q.ply)
  const tambem = outras.find((l) => semSinais(l.san) === semSinais(san))
  if (acertou) {
    tocar('certo')
    aviso.value = { tipo: 'certo', texto: `${nomeCurto.value} jogou ${fmtSan(certo)}.` }
  } else {
    tocar('errado')
    aviso.value = {
      tipo: tambem ? 'neutro' : 'errado',
      texto: tambem
        ? `Nesta partida ele jogou ${fmtSan(certo)}, mas ${fmtSan(san)} ele também usou em ${tambem.partidas} ${tambem.partidas === 1 ? 'partida' : 'partidas'}.`
        : `${nomeCurto.value} jogou ${fmtSan(certo)}.`,
    }
  }
  quiz.value = { ...q, ply: q.ply + 1, acertos: q.acertos + (acertou ? 1 : 0), perguntas: q.perguntas + 1 }
  temporizador = setTimeout(avancarAdversario, 900)
}

function sairDoQuiz() {
  clearTimeout(temporizador)
  quiz.value = null
  aviso.value = null
}

// ---------- Tabuleiro ----------
const sansNoTabuleiro = computed(() => (quiz.value ? quiz.value.partida.lances.slice(0, quiz.value.ply) : caminho.value))
const fen = computed(() => fenDe(sansNoTabuleiro.value))
const ultimoLance = computed<[string, string] | null>(() => {
  const sans = sansNoTabuleiro.value
  if (!sans.length) return null
  const casas = casasDoLance(fenDe(sans.slice(0, -1)), sans.at(-1)!)
  return casas ? [casas.from, casas.to] : null
})
const formas = computed<Forma[]>(() => {
  if (quiz.value) return []
  return seguintes.value.slice(0, 3).flatMap((l, i) => {
    const casas = casasDoLance(fen.value, l.san)
    return casas ? [{ de: casas.from, para: casas.to, cor: i === 0 ? ('green' as const) : ('blue' as const), largura: i === 0 ? 12 : 7 }] : []
  })
})
const jogavel = computed(() => {
  if (!colecao.value) return false
  const q = quiz.value
  if (q) return !q.fim && q.ply < q.partida.lances.length && (q.ply % 2 === 0 ? 'w' : 'b') === cor.value
  return seguintes.value.length > 0
})

function aoJogar(de: string, para: string) {
  let san: string
  try {
    san = new Chess(fen.value).move({ from: de, to: para, promotion: 'q' }).san
  } catch {
    tabuleiro.value?.sincronizar()
    return
  }
  if (quiz.value) {
    responderQuiz(san)
    return
  }
  if (seguintes.value.some((l) => l.san === san)) ir(san)
  else {
    tabuleiro.value?.sincronizar()
    aviso.value = { tipo: 'neutro', texto: `Nas partidas de ${nomeCurto.value}, ${fmtSan(san)} não aparece aqui.` }
  }
}

const caminhoTexto = computed(() => caminho.value.map((san, i) => (i % 2 === 0 ? fmtLance(i + 1, san) : fmtSan(san))).join(' '))
const partidasNaLista = computed(() =>
  [...noCaminho.value].sort((a, b) => b.partida.data.localeCompare(a.partida.data)).slice(0, MAX_PARTIDAS_NA_LISTA),
)
const ano = (data: string) => data.slice(0, 4).replace(/\?/g, '')
const pct = (fracao: number) => `${Math.round(fracao * 100)}%`
const textoPontos = (pontos: number | null) => (pontos === null ? '—' : `${Math.round(pontos)}%`)
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" to="/" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>{{ colecao ? `Estudar ${nomeCurto}` : 'Estudar um jogador' }}</h1>
  </header>

  <div class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="cor === 'w' ? 'white' : 'black'"
        :ultimo-lance="ultimoLance"
        :formas="formas"
        :jogavel="jogavel"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink to="/" class="trilha">‹ Início</RouterLink>
        <h1 class="titulo-pagina">{{ colecao ? `Estudar ${nomeCurto}` : 'Estudar um jogador' }}</h1>
      </div>

      <p v-if="carregando" class="suave">Carregando…</p>

      <section v-else-if="!colecao" class="cartao">
        <p>
          Importe as partidas de um jogador em PGN para ver, em cada posição, os lances que ele escolheu, quantas vezes e
          como se saiu, e treinar adivinhando os lances dele.
        </p>
        <p class="suave">
          Coleções por jogador: no PGN Mentor (pgnmentor.com → Players), baixe o .zip do jogador (por exemplo, Kasparov.zip) e
          escolha o arquivo aqui. As partidas ficam só neste aparelho.
        </p>
      </section>

      <div v-if="!carregando" class="acoes">
        <label class="botao" :class="{ primario: !colecao }">
          {{ importando ? 'Lendo o arquivo…' : 'Importar PGN ou .zip' }}
          <input type="file" accept=".pgn,.zip,application/zip,application/x-chess-pgn" hidden :disabled="importando" @change="importar" />
        </label>
        <button v-if="colecao" type="button" class="botao fantasma" :class="{ perigo: confirmandoApagar }" @click="apagarColecao">
          {{ confirmandoApagar ? 'Tocar de novo para apagar' : 'Apagar coleção' }}
        </button>
      </div>
      <p v-if="erro" class="erro" role="alert">{{ erro }}</p>

      <template v-if="colecao">
        <section class="cartao escolhas">
          <label v-if="colecoes.length > 1" class="campo">
            <span>Coleção</span>
            <select v-model="escolhida">
              <option v-for="c in colecoes" :key="c.id" :value="c.id">{{ c.nome }} ({{ c.partidas.length }} partidas)</option>
            </select>
          </label>
          <label class="campo">
            <span>Jogador</span>
            <select :value="colecao.jogador" @change="trocarJogador(($event.target as HTMLSelectElement).value)">
              <option v-if="!jogadores.includes(colecao.jogador)" :value="colecao.jogador">{{ colecao.jogador }}</option>
              <option v-for="n in jogadores" :key="n" :value="n">{{ n }}</option>
            </select>
          </label>
          <fieldset class="opcoes">
            <legend>{{ nomeCurto }} jogando de</legend>
            <label class="marcar"><input v-model="cor" type="radio" value="w" /> Brancas</label>
            <label class="marcar"><input v-model="cor" type="radio" value="b" /> Pretas</label>
          </fieldset>
          <p class="suave">{{ base.length }} partidas de {{ cor === 'w' ? 'brancas' : 'pretas' }} em {{ colecao.partidas.length }}.</p>
        </section>

        <template v-if="!quiz">
          <div class="linha-lances">
            <input
              v-model="textoLances"
              class="campo-texto"
              placeholder="Ir para os lances: 1.d4 Nf6 2.c4 g6"
              aria-label="Lances para ir"
              @keydown.enter="irParaLances"
            />
            <button type="button" class="botao" :disabled="!textoLances.trim()" @click="irParaLances">Ir</button>
          </div>

          <div class="caminho">
            <button type="button" class="botao" :disabled="!caminho.length" aria-label="Voltar ao início" @click="voltar(caminho.length)">⏮</button>
            <button type="button" class="botao" :disabled="!caminho.length" aria-label="Voltar um lance" @click="voltar()">◀</button>
            <span class="lance">{{ caminhoTexto || 'Posição inicial' }}</span>
          </div>

          <CartaoDica v-if="aviso" :tipo="aviso.tipo" :texto="aviso.texto" />

          <section class="cartao">
            <h2>{{ vezDoJogador ? `${nomeCurto} jogou aqui` : 'Os adversários jogaram aqui' }}</h2>
            <p class="suave">{{ noCaminho.length }} {{ noCaminho.length === 1 ? 'partida passa' : 'partidas passam' }} por esta posição.</p>
            <table v-if="seguintes.length" class="tabela">
              <thead>
                <tr><th>Lance</th><th>Partidas</th><th :title="`Pontos de ${nomeCurto} depois do lance`">Pontos de {{ nomeCurto }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="l in seguintes" :key="l.san">
                  <td>
                    <button type="button" class="link lance" @click="ir(l.san)">
                      {{ fmtLance(caminho.length + 1, l.san) }}
                    </button>
                  </td>
                  <td>{{ l.partidas }} <span class="suave">({{ pct(l.parte) }})</span></td>
                  <td>{{ textoPontos(l.pontos) }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else class="suave">As partidas terminam aqui.</p>
            <button
              v-if="noCaminho.some((p) => p.lances.length > caminho.length + 2)"
              type="button"
              class="botao primario"
              @click="comecarQuiz"
            >Adivinhe o lance de {{ nomeCurto }}</button>
          </section>

          <section v-if="partidasNaLista.length" class="cartao">
            <h2>Partidas nesta posição</h2>
            <ul class="partidas">
              <li v-for="p in partidasNaLista" :key="p.indice">
                <span>
                  <strong>{{ p.partida.brancas }} – {{ p.partida.pretas }}</strong>
                  <span class="suave"> · {{ [p.partida.evento, ano(p.partida.data)].filter(Boolean).join(' ') }} · {{ p.partida.resultado.replace('1/2-1/2', '½-½') }}</span>
                </span>
                <RouterLink
                  class="botao"
                  :to="{ name: 'analise', query: { c: p.partida.lances, cor, titulo: `${p.partida.brancas} – ${p.partida.pretas} (${ano(p.partida.data)})`, volta: '/jogador' } }"
                >Analisar</RouterLink>
              </li>
            </ul>
            <p v-if="noCaminho.length > partidasNaLista.length" class="suave">Mostrando as {{ partidasNaLista.length }} mais recentes.</p>
          </section>
        </template>

        <section v-else class="cartao">
          <h2>Adivinhe o lance de {{ nomeCurto }}</h2>
          <p class="suave">
            {{ quiz.partida.partida.brancas }} – {{ quiz.partida.partida.pretas }} · {{ ano(quiz.partida.partida.data) }}
          </p>
          <CartaoDica v-if="aviso" :tipo="aviso.tipo" :texto="aviso.texto" />
          <p class="placar">✓ {{ quiz.acertos }} de {{ quiz.perguntas }}</p>
          <p v-if="!quiz.fim && jogavel" class="corpo-forte">Sua vez: qual lance {{ nomeCurto }} jogou?</p>
          <p v-if="quiz.fim" class="corpo-forte">Fim do quiz nesta partida.</p>
          <div class="acoes">
            <button type="button" class="botao primario" @click="comecarQuiz">Outra partida</button>
            <RouterLink
              class="botao"
              :to="{ name: 'analise', query: { c: quiz.partida.partida.lances, cor, titulo: `${quiz.partida.partida.brancas} – ${quiz.partida.partida.pretas}`, volta: '/jogador' } }"
            >Ver a partida inteira</RouterLink>
            <button type="button" class="botao fantasma" @click="sairDoQuiz">Sair do quiz</button>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<style scoped>
.cabeca-painel {
  display: grid;
  gap: var(--espaco-1);
}
.cabeca-painel .titulo-pagina {
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
h2 {
  margin: 0;
  font-size: 1.05rem;
}
.cartao {
  display: grid;
  gap: var(--espaco-2);
}
.cartao p {
  margin: 0;
}
.suave {
  color: var(--texto-suave);
  font-size: 14px;
}
.erro {
  margin: 0;
  color: var(--erro);
  font-weight: 600;
}
.acoes,
.caminho,
.linha-lances {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2);
}
.campo {
  display: grid;
  gap: var(--espaco-1);
  font-weight: 600;
}
.campo select,
.campo-texto {
  min-height: 44px;
  padding: 0 var(--espaco-3);
  border: 1px solid var(--borda-controle);
  border-radius: var(--raio-md);
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  font-weight: 400;
}
.campo-texto {
  flex: 1;
  min-width: 0;
}
.opcoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-1) var(--espaco-4);
  margin: 0;
  padding: 0;
  border: 0;
}
.opcoes legend {
  margin-bottom: var(--espaco-1);
  font-weight: 600;
}
.tabela {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}
.tabela th,
.tabela td {
  padding: 6px 4px;
  border-bottom: 1px solid var(--borda);
  text-align: left;
}
.tabela th {
  color: var(--texto-suave);
  font-size: 13px;
  font-weight: 600;
}
.link {
  min-height: 36px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--destaque);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}
.partidas {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
.partidas li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-2);
}
.placar {
  font-weight: 700;
  color: var(--ok);
}
.perigo {
  color: var(--erro);
}
@media (max-width: 799.98px) {
  .so-computador {
    display: none;
  }
}
@media (min-width: 800px) {
  .so-celular {
    display: none;
  }
}
</style>
