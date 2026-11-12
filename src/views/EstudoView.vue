<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Avaliacao from '../components/Avaliacao.vue'
import AvisosDoLance from '../components/AvisosDoLance.vue'
import AvisoXeque from '../components/AvisoXeque.vue'
import CartaoDica from '../components/CartaoDica.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import LinhaMotor from '../components/LinhaMotor.vue'
import MinhaNota from '../components/MinhaNota.vue'
import LegendaQualidade from '../components/LegendaQualidade.vue'
import SeloQualidade from '../components/SeloQualidade.vue'
import { marcasDoCapitulo, qualidadeDoMotor } from '../lib/qualidade'
import { chaveDaNota } from '../lib/anotacoes'
import PlanoMeioJogo from '../components/PlanoMeioJogo.vue'
import TaticasDoTabuleiro from '../components/TaticasDoTabuleiro.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { percorrer } from '../lib/arvore'
import { LEGENDA } from '../lib/avaliacao'
import { buscarCapitulo } from '../lib/capitulos'
import { buscarLinha, proximaLinha } from '../lib/escopo'
import { fmtLance, fmtTexto } from '../lib/formato'
import { casasDoLance } from '../lib/lances'
import { carregarMotor, type DadosMotor } from '../lib/motor'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'
import { oportunidadeDaPosicao, xequeDaPosicao } from '../lib/taticas'

const route = useRoute()
const router = useRouter()

const capitulo = buscarCapitulo(route.params.cap as string)!
const linha = buscarLinha(capitulo, route.params.linha as string)
const lances = capitulo.unidades.find((u) => u.id === linha?.id)?.lances ?? []
const arestas = percorrer(capitulo.arvore, lances.map((l) => l.san)) ?? []
const proxima = linha && proximaLinha(capitulo, linha.id)
const tituloDaLinha = (l: { coluna: number | null }) =>
  l.coluna === null ? 'Bônus' : `Coluna ${l.coluna}`

const ply = ref(0)
const orientacao = ref<'white' | 'black'>('white')

const lanceAtual = computed(() => lances[ply.value - 1])
const noFim = computed(() => lances.length > 0 && ply.value === lances.length)
const fen = computed(() => lanceAtual.value?.fenDepois ?? capitulo.arvore.nos.get(capitulo.arvore.raiz)!.fen)
const ultimoLance = computed<[string, string] | null>(() =>
  lanceAtual.value ? [lanceAtual.value.from, lanceAtual.value.to] : null,
)
const arestaAtual = computed(() => arestas[ply.value - 1])
const dica = computed(() => arestaAtual.value?.dica ?? null)
const dadosMotor = shallowRef<DadosMotor | null>(null)
carregarMotor(capitulo.capitulo.id).then((dados) => (dadosMotor.value = dados))

const chaveAtual = computed(() => fen.value.split(' ').slice(0, 4).join(' '))
const analise = computed(() =>
  progresso.config.mostrarMotor ? (dadosMotor.value?.posicoes[chaveAtual.value] ?? null) : null,
)
const proximoDoLivro = computed(() => lances[ply.value])
const oportunidade = computed(() =>
  oportunidadeDaPosicao(fen.value, dadosMotor.value?.posicoes[chaveAtual.value]),
)

// Modo Adivinhar: o próximo lance fica escondido até a pessoa tentar jogá-lo (ou pedir para ver).
const revelado = ref(false)
const errou = ref(false)
watch(ply, () => {
  revelado.value = false
  errou.value = false
})
const escondido = computed(() => progresso.config.adivinhar && !revelado.value)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()

/** Jogar o lance da linha no tabuleiro avança; outro lance volta e mostra a seta. */
function aoJogar(de: string, para: string) {
  const certo = proximoDoLivro.value
  if (certo && certo.from === de && certo.to === para) {
    tocar('certo')
    ply.value++
    return
  }
  tocar('errado')
  errou.value = true
  revelado.value = true
  tabuleiro.value?.sincronizar()
}

// Marca do MCO de cada lance da linha (também aparece no histórico, como no livro).
const marcas = marcasDoCapitulo(capitulo)
const sansComMarca = arestas.map((aresta) => `${aresta.san}${marcas.get(aresta.id) ?? ''}`)

const formasTatica = ref<Forma[]>([])
const xeque = computed(() => xequeDaPosicao(fen.value, ultimoLance.value))

const setaDaAmeaca = computed<Forma[]>(() => {
  const formas: Forma[] = [...formasTatica.value]
  const proximo = proximoDoLivro.value
  // Depois de um erro a seta aparece mesmo sem a análise do motor.
  if (proximo && !escondido.value && (analise.value || errou.value)) formas.push({ de: proximo.from, para: proximo.to, cor: 'green' })
  const sugestao = !escondido.value && analise.value && casasDoLance(fen.value, analise.value.lance)
  if (sugestao && analise.value!.lance !== proximo?.san) {
    formas.push({ de: sugestao.from, para: sugestao.to, cor: 'blue' })
  }
  const ameaca = arestaAtual.value?.ameaca
  if (ameaca) formas.push({ de: ameaca.from, para: ameaca.to, cor: 'red' })
  for (const de of xeque.value?.atacantes ?? []) formas.push({ de, para: xeque.value!.rei, cor: 'red' })
  return formas
})

function anterior() {
  if (ply.value > 0) ply.value--
}

function proximo() {
  if (ply.value < lances.length) ply.value++
}

function aoTeclar(evento: KeyboardEvent) {
  if (evento.target instanceof HTMLSelectElement) return
  if (evento.key === 'ArrowLeft') anterior()
  if (evento.key === 'ArrowRight') proximo()
  if (evento.key === 'Home') ply.value = 0
}

let toqueInicial: { x: number; y: number } | null = null

function aoIniciarToque(evento: TouchEvent) {
  const { clientX: x, clientY: y } = evento.changedTouches[0]
  toqueInicial = { x, y }
}

function aoTerminarToque(evento: TouchEvent) {
  if (!toqueInicial) return
  const dx = evento.changedTouches[0].clientX - toqueInicial.x
  const dy = evento.changedTouches[0].clientY - toqueInicial.y
  toqueInicial = null
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return
  if (dx > 0) anterior()
  else proximo()
}

onMounted(() => window.addEventListener('keydown', aoTeclar))
onBeforeUnmount(() => window.removeEventListener('keydown', aoTeclar))

function trocarLinha(evento: Event) {
  const id = (evento.target as HTMLSelectElement).value
  router.push({ name: 'estudo', params: { cap: capitulo.capitulo.id, linha: id } })
}
</script>

<template>
  <div v-if="linha && lances.length" class="tela">
    <div class="area-tabuleiro" @touchstart.passive="aoIniciarToque" @touchend.passive="aoTerminarToque">
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :formas="setaDaAmeaca"
        :avaliacao="dadosMotor?.posicoes[chaveAtual]?.cp ?? null"
        :jogavel="!noFim"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <label class="campo">
        <span>Linha</span>
        <select :value="linha.id" @change="trocarLinha">
          <option v-for="l in capitulo.capitulo.linhas" :key="l.id" :value="l.id">
            {{ l.coluna === null ? 'Bônus' : `Coluna ${l.coluna}` }} — {{ l.nome }}
          </option>
        </select>
      </label>

      <div class="controles">
        <button type="button" class="botao" :disabled="ply === 0" aria-label="Voltar ao início" title="Voltar ao início" @click="ply = 0">⏮</button>
        <button type="button" class="botao" :disabled="ply === 0" aria-label="Lance anterior" @click="anterior">◀</button>
        <span class="posicao">{{ ply }} / {{ lances.length }}</span>
        <button type="button" class="botao" :disabled="noFim" aria-label="Próximo lance" @click="proximo">▶</button>
        <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
        <label class="marcar" title="Esconde a seta do próximo lance até você tentar jogá-lo">
          <input v-model="progresso.config.adivinhar" type="checkbox" />
          Adivinhar
        </label>
      </div>

      <div v-if="!noFim && (errou || escondido)" class="adivinhe">
        <p v-if="errou">Esse não é o lance da linha. Jogue o lance da seta verde.</p>
        <p v-else>Qual é o próximo lance? Jogue no tabuleiro.</p>
        <button v-if="escondido" type="button" class="botao" @click="revelado = true">Mostrar lance</button>
      </div>

      <!-- Adivinhando, o histórico só mostra até o lance atual, para não entregar os próximos. -->
      <HistoricoLances
        :lances="progresso.config.adivinhar ? sansComMarca.slice(0, ply + (revelado ? 1 : 0)) : sansComMarca"
        :atual="ply"
        clicavel
        @ir="ply = $event"
      />

      <CartaoDica
        v-if="lanceAtual"
        :lance="`${fmtLance(lanceAtual.ply, lanceAtual.san)}${arestaAtual ? (marcas.get(arestaAtual.id) ?? '') : ''}`"
        :texto="dica"
      />
      <SeloQualidade
        v-if="arestaAtual"
        :marca="marcas.get(arestaAtual.id) ?? null"
        :motor="qualidadeDoMotor(arestaAtual, dadosMotor?.posicoes)"
      />
      <MinhaNota
        v-if="lanceAtual && arestaAtual"
        :chave="chaveDaNota(capitulo.capitulo.id, arestaAtual.id)"
        :lance="fmtLance(lanceAtual.ply, lanceAtual.san)"
      />
      <CartaoDica v-if="!lanceAtual" texto="Jogue o lance no tabuleiro, ou avance com ▶, com as setas do teclado ou deslizando no tabuleiro." />
      <AvisoXeque :xeque="xeque" />
      <AvisosDoLance :aresta="arestaAtual" />
      <LinhaMotor v-if="!escondido" :analise="analise" :lances-do-livro="proximoDoLivro ? [proximoDoLivro.san] : []" />
      <TaticasDoTabuleiro
        v-if="progresso.config.mostrarTaticas"
        :fen="fen"
        :oportunidade="oportunidade"
        :lances-do-livro="proximoDoLivro ? [proximoDoLivro.san] : []"
        @formas="formasTatica = $event"
      />

      <LegendaQualidade />

      <CartaoDica v-if="noFim" tipo="nota" class="fim">
        <strong>Fim da linha</strong>
        <p>{{ fmtTexto(linha.resumo) }}</p>
        <p v-if="linha.avaliacao">Avaliação: <Avaliacao :valor="linha.avaliacao" detalhada /></p>
        <PlanoMeioJogo :plano="linha.plano" />
        <details>
          <summary>Legenda dos símbolos</summary>
          <dl class="legenda">
            <template v-for="item in LEGENDA" :key="item.simbolo">
              <dt>{{ item.simbolo }}</dt>
              <dd>{{ item.texto }}</dd>
            </template>
          </dl>
        </details>
        <div class="acoes">
          <button type="button" class="botao" @click="ply = 0">Rever este estudo</button>
          <RouterLink
            class="botao"
            :to="{ name: 'treino', params: { cap: capitulo.capitulo.id }, query: { escopo: `linha:${linha.id}` } }"
          >Treinar esta linha</RouterLink>
          <RouterLink
            v-if="proxima"
            class="botao primario"
            :to="{ name: 'estudo', params: { cap: capitulo.capitulo.id, linha: proxima.id } }"
          >Próximo estudo: {{ tituloDaLinha(proxima) }}</RouterLink>
          <RouterLink v-else class="botao primario" :to="{ name: 'abertura', params: { cap: capitulo.capitulo.id } }">
            Último estudo do capítulo: voltar à abertura
          </RouterLink>
        </div>
      </CartaoDica>
    </div>
  </div>

  <div v-else class="pagina">
    <p>Esta linha não existe ou foi desativada por um erro nos dados.</p>
    <RouterLink to="/diagnostico">Ver Diagnóstico</RouterLink>
  </div>
</template>

<style scoped>
.controles {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
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
.posicao {
  min-width: 4rem;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.fim p {
  margin: 0.5rem 0;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}
.legenda {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.125rem 0.75rem;
  margin: 0.5rem 0 0;
}
.legenda dt {
  font-weight: 600;
}
.legenda dd {
  margin: 0;
}
</style>
