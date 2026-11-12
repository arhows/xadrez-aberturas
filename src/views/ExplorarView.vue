<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import Avaliacao from '../components/Avaliacao.vue'
import AvisosDoLance from '../components/AvisosDoLance.vue'
import AnaliseAoVivo from '../components/AnaliseAoVivo.vue'
import AvisoXeque from '../components/AvisoXeque.vue'
import CartaoDica from '../components/CartaoDica.vue'
import ExploradorLichess from '../components/ExploradorLichess.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import LinhaMotor from '../components/LinhaMotor.vue'
import TaticasDoTabuleiro from '../components/TaticasDoTabuleiro.vue'
import RamoLances from '../components/RamoLances.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { CONTEXTO_ARVORE } from '../components/arvoreContexto'
import { percorrer, type Aresta } from '../lib/arvore'
import { buscarCapitulo } from '../lib/capitulos'
import { descreverUnidade } from '../lib/escopo'
import { fmtLance, fmtSan, fmtTexto } from '../lib/formato'
import { Chess } from 'chess.js'
import { casasDoLance } from '../lib/lances'
import { carregarMotor, type DadosMotor } from '../lib/motor'
import { aproveitamento, indiceDePosicoes } from '../lib/partidasRepertorio'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'
import { oportunidadeDaPosicao, xequeDaPosicao } from '../lib/taticas'

const route = useRoute()
const capitulo = buscarCapitulo(route.params.cap as string)!
const { arvore } = capitulo
const idsColunas = new Set(capitulo.capitulo.linhas.map((linha) => linha.id))

const mostrarNotas = ref(true)
const orientacao = ref<'white' | 'black'>('white')
const caminho = ref<Aresta[]>([])
const abertos = reactive(new Set<string>())
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
const listaLances = ref<HTMLElement>()

const chave = (sequencia: Aresta[]) => sequencia.map((aresta) => aresta.san).join(' ')

/** Lances jogados depois de sair do livro (o tabuleiro aceita qualquer lance legal). */
interface LanceFora {
  san: string
  from: string
  to: string
  fen: string
}
const fora = ref<LanceFora[]>([])

function saidas(no: string): Aresta[] {
  const todas = arvore.nos.get(no)!.saidas
  if (mostrarNotas.value) return todas
  return todas.filter((aresta) => aresta.linhas.some((id) => idsColunas.has(id)))
}

function selecionar(novo: Aresta[]) {
  fora.value = []
  caminho.value = novo
  for (let i = 1; i <= novo.length; i++) abertos.add(chave(novo.slice(0, i)))
}

/** Linha mostrada no histórico: ao voltar, os lances seguintes continuam visíveis. */
const linhaVista = ref<Aresta[]>([])
watch(caminho, (novo) => {
  const prefixo = chave(linhaVista.value.slice(0, novo.length)) === chave(novo)
  if (!prefixo) linhaVista.value = novo
})

const ehPrefixoDoAtual = (sequencia: Aresta[]) => chave(caminho.value.slice(0, sequencia.length)) === chave(sequencia)

provide(CONTEXTO_ARVORE, {
  arvore,
  saidas,
  ehAtual: (sequencia) => chave(sequencia) === chave(caminho.value),
  estaAberto: (sequencia) => abertos.has(chave(sequencia)),
  alternar(sequencia) {
    const id = chave(sequencia)
    if (!abertos.has(id)) {
      abertos.add(id)
      return
    }
    abertos.delete(id)
    // Recolher o ramo da posição atual volta a posição para antes dele.
    if (ehPrefixoDoAtual(sequencia)) {
      fora.value = []
      caminho.value = sequencia.slice(0, -1)
    }
  },
  selecionar,
})

const noAtual = computed(() => caminho.value.at(-1)?.para ?? arvore.raiz)
const foraDoLivro = computed(() => fora.value.length > 0)
const fen = computed(() => fora.value.at(-1)?.fen ?? arvore.nos.get(noAtual.value)!.fen)
/** Último lance do livro; fora do livro, as dicas e notas dele deixam de valer. */
const ultima = computed(() => (foraDoLivro.value ? undefined : caminho.value.at(-1)))
const ultimoLance = computed<[string, string] | null>(() => {
  const lance = fora.value.at(-1) ?? caminho.value.at(-1)
  return lance ? [lance.from, lance.to] : null
})
const continuacoes = computed(() => (foraDoLivro.value ? [] : saidas(noAtual.value)))
/** O lance do livro mais estudado nesta posição (o que aparece em mais linhas e notas). */
const principal = computed(() =>
  continuacoes.value.reduce<Aresta | null>((melhor, a) => (!melhor || a.linhas.length > melhor.linhas.length ? a : melhor), null),
)
const plyAtual = computed(() => caminho.value.length + fora.value.length)

const formasTatica = ref<Forma[]>([])

/** Seta para cada lance do livro, mais larga quanto mais linhas passam por ele. */
const setas = computed<Forma[]>(() => {
  const maior = Math.max(1, ...continuacoes.value.map((aresta) => aresta.linhas.length))
  const doLivro: Forma[] = [...formasTatica.value, ...(escondido.value ? [] : continuacoes.value).map((aresta): Forma => ({
    de: aresta.from,
    para: aresta.to,
    cor: 'green',
    largura: 3 + 11 * (aresta.linhas.length / maior),
  }))]
  const melhor = progresso.config.motorAoVivo ? melhorAoVivo.value : analise.value?.lance
  const sugestao = !escondido.value && melhor && casasDoLance(fen.value, melhor)
  if (sugestao && !continuacoes.value.some((aresta) => aresta.san === melhor)) {
    doLivro.push({ de: sugestao.from, para: sugestao.to, cor: 'blue' })
  }
  const ameaca = ultima.value?.ameaca
  if (ameaca) doLivro.push({ de: ameaca.from, para: ameaca.to, cor: 'red' })
  for (const de of xeque.value?.atacantes ?? []) doLivro.push({ de, para: xeque.value!.rei, cor: 'red' })
  return doLivro
})

const xeque = computed(() => xequeDaPosicao(fen.value, ultimoLance.value))

const dadosMotor = shallowRef<DadosMotor | null>(null)
carregarMotor(capitulo.capitulo.id).then((dados) => (dadosMotor.value = dados))
const oportunidade = computed(() =>
  oportunidadeDaPosicao(fen.value, foraDoLivro.value ? undefined : dadosMotor.value?.posicoes[noAtual.value]),
)

/** Histórico: fora do livro, o caminho do livro seguido dos lances novos. */
const lancesDoHistorico = computed(() =>
  foraDoLivro.value
    ? [...caminho.value.map((a) => a.san), ...fora.value.map((l) => l.san)]
    : linhaVista.value.map((a) => a.san),
)
function irNoHistorico(ply: number) {
  if (foraDoLivro.value && ply > caminho.value.length) fora.value = fora.value.slice(0, ply - caminho.value.length)
  else selecionar((foraDoLivro.value ? caminho.value : linhaVista.value).slice(0, ply))
}
const analise = computed(() =>
  progresso.config.mostrarMotor && !foraDoLivro.value ? (dadosMotor.value?.posicoes[noAtual.value] ?? null) : null,
)
/** Melhor lance da análise ao vivo, para a seta azul. */
const melhorAoVivo = ref<string | null>(null)
const avaliacaoAoVivo = ref<number | null>(null)
/** Barra de chance: análise pré-calculada no livro; fora dele, a do Stockfish ao vivo (se ligado). */
const avaliacaoDaBarra = computed(() => {
  if (!foraDoLivro.value) {
    const pre = dadosMotor.value?.posicoes[noAtual.value]?.cp
    if (pre !== undefined) return pre
  }
  return progresso.config.motorAoVivo ? avaliacaoAoVivo.value : null
})

/** Com uma única linha ativa, mostra a ideia geral dela. */
const unidadeAtiva = computed(() => {
  const linhas = ultima.value?.linhas
  return linhas?.length === 1 ? descreverUnidade(capitulo, linhas[0]) : null
})

function avancar() {
  const proxima = continuacoes.value[0]
  if (proxima) selecionar([...caminho.value, proxima])
}

function voltar() {
  if (foraDoLivro.value) fora.value = fora.value.slice(0, -1)
  else caminho.value = caminho.value.slice(0, -1)
}

/** Volta à posição inicial para praticar a linha de novo do começo. */
function voltarAoInicio() {
  fora.value = []
  caminho.value = []
}

function voltarAoLivro() {
  fora.value = []
}

/** Joga um lance fora do livro; promoção vira dama (o Explorar não tem escolha de peça). */
function jogarFora(lance: { from: string; to: string } | string): boolean {
  const jogo = new Chess(fen.value)
  try {
    const feito = typeof lance === 'string' ? jogo.move(lance) : jogo.move({ ...lance, promotion: 'q' })
    fora.value = [...fora.value, { san: feito.san, from: feito.from, to: feito.to, fen: jogo.fen() }]
    return true
  } catch {
    return false
  }
}

// Suas partidas importadas: o que foi jogado a partir desta posição (pela sequência de lances).
const indicePartidas = computed(() => indiceDePosicoes(Object.values(progresso.partidas.analisadas)))
const nasPartidas = computed(() => {
  const chave = [...caminho.value.map((aresta) => aresta.san), ...fora.value.map((lance) => lance.san)].join(' ')
  const doLivro = foraDoLivro.value ? [] : arvore.nos.get(noAtual.value)!.saidas
  return (indicePartidas.value.get(chave) ?? []).map((lance) => ({
    ...lance,
    aresta: doLivro.find((aresta) => aresta.san === lance.san),
  }))
})
const totalNasPartidas = computed(() => nasPartidas.value.reduce((soma, lance) => soma + lance.total, 0))

function jogarDasPartidas(lance: { san: string; aresta?: Aresta }) {
  if (lance.aresta) selecionar([...caminho.value, lance.aresta])
  else jogarFora(lance.san)
}

// Modo Adivinhar: setas e lances do livro ficam escondidos até a pessoa tentar (ou pedir para ver).
const revelado = ref(false)
const errouAqui = ref(false)
watch([noAtual, () => fora.value.length], () => {
  revelado.value = false
  errouAqui.value = false
})
const escondido = computed(() => progresso.config.adivinhar && !revelado.value && continuacoes.value.length > 0)

function aoJogar(de: string, para: string) {
  const aresta = continuacoes.value.find((s) => s.from === de && s.to === para)
  if (aresta) {
    if (progresso.config.adivinhar) tocar('certo')
    selecionar([...caminho.value, aresta])
  } else if (progresso.config.adivinhar && continuacoes.value.length) {
    // Adivinhando, um lance fora do livro não sai do livro: volta e mostra as setas.
    tocar('errado')
    errouAqui.value = true
    revelado.value = true
    tabuleiro.value?.sincronizar()
  } else if (!jogarFora({ from: de, to: para })) tabuleiro.value?.sincronizar()
}

/** Toque numa linha do motor: segue o livro se o lance for dele, senão joga fora do livro. */
function jogarSan(san: string) {
  const aresta = continuacoes.value.find((s) => s.san === san)
  if (aresta) selecionar([...caminho.value, aresta])
  else jogarFora(san)
}

function aoTeclar(evento: KeyboardEvent) {
  if (evento.key === 'ArrowLeft') voltar()
  if (evento.key === 'ArrowRight') avancar()
  if (evento.key === 'Home') voltarAoInicio()
}

onMounted(() => window.addEventListener('keydown', aoTeclar))
onBeforeUnmount(() => window.removeEventListener('keydown', aoTeclar))

// Mantém o lance atual visível dentro da lista, sem rolar a página inteira.
watch(caminho, async () => {
  await nextTick()
  const lista = listaLances.value
  const atual = lista?.querySelector<HTMLElement>('.lance.atual')
  if (!lista || !atual) return
  const limites = lista.getBoundingClientRect()
  const posicao = atual.getBoundingClientRect()
  if (posicao.top < limites.top) lista.scrollTop -= limites.top - posicao.top
  else if (posicao.bottom > limites.bottom) lista.scrollTop += posicao.bottom - limites.bottom
})

// Ao esconder as notas, volta a posição para o último lance que continua na árvore.
watch(mostrarNotas, () => {
  const visivel = caminho.value.findIndex(
    (aresta) => !saidas(aresta.de).includes(aresta),
  )
  if (visivel !== -1) {
    fora.value = []
    caminho.value = caminho.value.slice(0, visivel)
  }
})

// Permite abrir direto uma posição, como os lances mais errados da tela inicial.
// Os lances que não são do livro (o desvio de uma partida importada) entram fora do livro.
const pedidos = String(route.query.c ?? '').split(' ').filter(Boolean)
let noLivro = pedidos.length
while (noLivro > 0 && !percorrer(arvore, pedidos.slice(0, noLivro))) noLivro--
const inicial = percorrer(arvore, pedidos.slice(0, noLivro))
if (inicial) selecionar(inicial)
for (const san of pedidos.slice(noLivro)) if (!jogarFora(san)) break
</script>

<template>
  <div class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :formas="setas"
        :avaliacao="avaliacaoDaBarra"
        jogavel
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <div class="controles">
        <button type="button" class="botao" :disabled="!caminho.length && !foraDoLivro" aria-label="Voltar ao início" title="Voltar ao início" @click="voltarAoInicio">⏮</button>
        <button type="button" class="botao" :disabled="!caminho.length && !foraDoLivro" aria-label="Lance anterior" @click="voltar">◀</button>
        <button type="button" class="botao" :disabled="!continuacoes.length" aria-label="Próximo lance" @click="avancar">▶</button>
        <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
        <RouterLink
          class="botao"
          :to="{ name: 'jogar', query: { c: [...caminho.map((a) => a.san), ...fora.map((l) => l.san)].join(' '), cap: capitulo.capitulo.id } }"
        >Jogar daqui</RouterLink>
        <label class="marcar">
          <input v-model="mostrarNotas" type="checkbox" />
          Notas
        </label>
        <label class="marcar" title="Esconde as setas e os lances do livro até você tentar jogar">
          <input v-model="progresso.config.adivinhar" type="checkbox" />
          Adivinhar
        </label>
        <label class="marcar ao-vivo">
          <input v-model="progresso.config.motorAoVivo" type="checkbox" />
          Stockfish ao vivo
        </label>
      </div>

      <HistoricoLances :lances="lancesDoHistorico" :atual="plyAtual" clicavel @ir="irNoHistorico" />

      <CartaoDica
        v-if="foraDoLivro"
        tipo="nota"
        :lance="fmtLance(plyAtual, fora.at(-1)!.san)"
        :texto="progresso.config.motorAoVivo
          ? 'Fora do livro: o Stockfish avalia a posição logo abaixo.'
          : 'Fora do livro. Ligue “Stockfish ao vivo” para avaliar a posição.'"
      >
        <button type="button" class="botao voltar-livro" @click="voltarAoLivro">Voltar ao livro</button>
      </CartaoDica>
      <CartaoDica
        v-else-if="ultima"
        :lance="fmtLance(caminho.length, ultima.san)"
        :texto="ultima.dica"
      />
      <CartaoDica v-else texto="Escolha um lance na lista, nas setas ou movendo a peça no tabuleiro." />

      <div v-if="escondido || (errouAqui && progresso.config.adivinhar)" class="adivinhe">
        <p v-if="errouAqui">Esse lance não é do livro aqui. Veja as setas verdes.</p>
        <p v-else>Qual é o lance do livro? Jogue no tabuleiro.</p>
        <button v-if="escondido" type="button" class="botao" @click="revelado = true">Mostrar lances</button>
      </div>
      <LinhaMotor v-if="!escondido" :analise="analise" :lances-do-livro="continuacoes.map((aresta) => aresta.san)" />
      <AnaliseAoVivo
        v-if="progresso.config.motorAoVivo"
        :fen="fen"
        @melhor="melhorAoVivo = $event"
        @avaliacao="avaliacaoAoVivo = $event"
        @jogar="jogarSan"
      />

      <AvisoXeque :xeque="xeque" />
      <AvisosDoLance :aresta="ultima" />

      <TaticasDoTabuleiro
        v-if="progresso.config.mostrarTaticas"
        :fen="fen"
        :oportunidade="oportunidade"
        :lances-do-livro="continuacoes.map((aresta) => aresta.san)"
        @formas="formasTatica = $event"
      />

      <CartaoDica v-for="selo in ultima?.selos ?? []" :key="selo.id" tipo="nota">
        <strong>Nota {{ selo.rotulo }}</strong>
        <template v-if="selo.avaliacao"> · <Avaliacao :valor="selo.avaliacao" /></template>
        <p v-if="selo.comentario" class="texto">{{ fmtTexto(selo.comentario) }}</p>
        <p v-if="selo.referencia" class="suave">{{ selo.referencia }}</p>
      </CartaoDica>

      <CartaoDica v-if="unidadeAtiva?.resumo && !ultima?.selos.length">
        <strong>{{ unidadeAtiva.titulo }}</strong>
        <template v-if="unidadeAtiva.avaliacao"> · <Avaliacao :valor="unidadeAtiva.avaliacao" /></template>
        <p class="texto">{{ fmtTexto(unidadeAtiva.resumo) }}</p>
        <p v-if="unidadeAtiva.referencia" class="suave">{{ unidadeAtiva.referencia }}</p>
      </CartaoDica>

      <section v-if="continuacoes.length && !escondido">
        <h2>Lances do livro nesta posição</h2>
        <div class="proximos">
          <button
            v-for="aresta in continuacoes"
            :key="aresta.id"
            type="button"
            class="chip-lance"
            :class="{ livro: aresta === principal }"
            @click="selecionar([...caminho, aresta])"
          >
            {{ fmtSan(aresta.san) }}
            <small>{{ aresta.linhas.length }}</small>
          </button>
        </div>
      </section>

      <section v-if="nasPartidas.length && !escondido">
        <h2>Nas suas partidas</h2>
        <p class="apoio-partidas">
          {{ totalNasPartidas }} {{ totalNasPartidas === 1 ? 'partida passou' : 'partidas passaram' }} por aqui. Lances jogados em seguida:
        </p>
        <div class="proximos">
          <button
            v-for="lance in nasPartidas"
            :key="lance.san"
            type="button"
            class="chip-lance"
            :class="{ livro: lance.aresta }"
            :title="`${lance.total}× · ${lance.placar.vitorias} V, ${lance.placar.empates} E, ${lance.placar.derrotas} D${lance.aresta ? '' : ' · fora do livro'}`"
            @click="jogarDasPartidas(lance)"
          >
            {{ fmtSan(lance.san) }}
            <small>{{ lance.total }}× · {{ aproveitamento(lance.placar) }}%</small>
          </button>
        </div>
        <p class="apoio-partidas">Verde = lance do livro. A porcentagem é o seu aproveitamento nessas partidas.</p>
      </section>

      <ExploradorLichess
        v-show="!escondido"
        :fen="fen"
        :lances-do-livro="continuacoes.map((aresta) => aresta.san)"
        @jogar="jogarSan"
      />

      <section v-show="!escondido">
        <h2>Árvore</h2>
        <div ref="listaLances" class="lista">
          <RamoLances
            v-for="aresta in saidas(arvore.raiz)"
            :key="aresta.id"
            :inicio="aresta"
            :prefixo="[]"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.adivinhe {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--raio-md);
  background: var(--superficie-2);
}
.adivinhe p {
  margin: 0;
}
.apoio-partidas {
  margin: 0 0 0.5rem;
  color: var(--texto-suave);
  font-size: 14px;
}
.proximos + .apoio-partidas {
  margin: 0.5rem 0 0;
}
.controles {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.marcar {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  min-height: 44px;
  margin-left: auto;
}
.marcar.ao-vivo {
  margin-left: 0;
}
.voltar-livro {
  margin-top: 0.5rem;
}
.texto {
  margin: 0.25rem 0 0;
}
.suave {
  margin: 0.25rem 0 0;
  color: var(--texto-suave);
  font-size: 0.875rem;
}
h2 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}
.proximos {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
small {
  margin-left: 0.25rem;
  color: var(--texto-suave);
}
.lista {
  max-height: 24rem;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid var(--borda);
  border-radius: 8px;
}
</style>
