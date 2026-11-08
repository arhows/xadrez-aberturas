<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, provide, reactive, ref, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import Avaliacao from '../components/Avaliacao.vue'
import AvisosDoLance from '../components/AvisosDoLance.vue'
import AvisoXeque from '../components/AvisoXeque.vue'
import CartaoDica from '../components/CartaoDica.vue'
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
import { casasDoLance } from '../lib/lances'
import { carregarMotor, type DadosMotor } from '../lib/motor'
import { progresso } from '../lib/progresso'
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

function saidas(no: string): Aresta[] {
  const todas = arvore.nos.get(no)!.saidas
  if (mostrarNotas.value) return todas
  return todas.filter((aresta) => aresta.linhas.some((id) => idsColunas.has(id)))
}

function selecionar(novo: Aresta[]) {
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
    if (ehPrefixoDoAtual(sequencia)) caminho.value = sequencia.slice(0, -1)
  },
  selecionar,
})

const noAtual = computed(() => caminho.value.at(-1)?.para ?? arvore.raiz)
const fen = computed(() => arvore.nos.get(noAtual.value)!.fen)
const ultima = computed(() => caminho.value.at(-1))
const ultimoLance = computed<[string, string] | null>(() =>
  ultima.value ? [ultima.value.from, ultima.value.to] : null,
)
const continuacoes = computed(() => saidas(noAtual.value))

const formasTatica = ref<Forma[]>([])

/** Seta para cada lance do livro, mais larga quanto mais linhas passam por ele. */
const setas = computed<Forma[]>(() => {
  const maior = Math.max(1, ...continuacoes.value.map((aresta) => aresta.linhas.length))
  const doLivro: Forma[] = [...formasTatica.value, ...continuacoes.value.map((aresta): Forma => ({
    de: aresta.from,
    para: aresta.to,
    cor: 'green',
    largura: 3 + 11 * (aresta.linhas.length / maior),
  }))]
  const sugestao = analise.value && casasDoLance(fen.value, analise.value.lance)
  if (sugestao && !continuacoes.value.some((aresta) => aresta.san === analise.value!.lance)) {
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
  oportunidadeDaPosicao(fen.value, dadosMotor.value?.posicoes[noAtual.value]),
)
const analise = computed(() =>
  progresso.config.mostrarMotor ? (dadosMotor.value?.posicoes[noAtual.value] ?? null) : null,
)

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
  caminho.value = caminho.value.slice(0, -1)
}

function aoJogar(de: string, para: string) {
  const aresta = continuacoes.value.find((s) => s.from === de && s.to === para)
  if (aresta) selecionar([...caminho.value, aresta])
  else tabuleiro.value?.sincronizar()
}

function aoTeclar(evento: KeyboardEvent) {
  if (evento.key === 'ArrowLeft') voltar()
  if (evento.key === 'ArrowRight') avancar()
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
  if (visivel !== -1) caminho.value = caminho.value.slice(0, visivel)
})

// Permite abrir direto uma posição, como os lances mais errados da tela inicial.
const inicial = percorrer(arvore, String(route.query.c ?? '').split(' ').filter(Boolean))
if (inicial) selecionar(inicial)
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
        jogavel
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <div class="controles">
        <button type="button" class="botao" :disabled="!caminho.length" aria-label="Lance anterior" @click="voltar">◀</button>
        <button type="button" class="botao" :disabled="!continuacoes.length" aria-label="Próximo lance" @click="avancar">▶</button>
        <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
        <label class="marcar">
          <input v-model="mostrarNotas" type="checkbox" />
          Notas
        </label>
      </div>

      <HistoricoLances
        :lances="linhaVista.map((aresta) => aresta.san)"
        :atual="caminho.length"
        clicavel
        @ir="selecionar(linhaVista.slice(0, $event))"
      />

      <CartaoDica
        v-if="ultima"
        :lance="fmtLance(caminho.length, ultima.san)"
        :texto="ultima.dica"
      />
      <CartaoDica v-else texto="Escolha um lance na lista, nas setas ou movendo a peça no tabuleiro." />

      <LinhaMotor :analise="analise" :lances-do-livro="continuacoes.map((aresta) => aresta.san)" />

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

      <section v-if="continuacoes.length">
        <h2>Lances do livro nesta posição</h2>
        <div class="proximos">
          <button
            v-for="aresta in continuacoes"
            :key="aresta.id"
            type="button"
            class="botao"
            @click="selecionar([...caminho, aresta])"
          >
            {{ fmtSan(aresta.san) }}
            <small>{{ aresta.linhas.length }}</small>
          </button>
        </div>
      </section>

      <section>
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
