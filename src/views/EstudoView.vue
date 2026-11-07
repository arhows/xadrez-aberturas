<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Avaliacao from '../components/Avaliacao.vue'
import AvisosDoLance from '../components/AvisosDoLance.vue'
import CartaoDica from '../components/CartaoDica.vue'
import LinhaMotor from '../components/LinhaMotor.vue'
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

const formasTatica = ref<Forma[]>([])

const setaDaAmeaca = computed<Forma[]>(() => {
  const formas: Forma[] = [...formasTatica.value]
  const proximo = proximoDoLivro.value
  if (analise.value && proximo) formas.push({ de: proximo.from, para: proximo.to, cor: 'green' })
  const sugestao = analise.value && casasDoLance(fen.value, analise.value.lance)
  if (sugestao && analise.value!.lance !== proximo?.san) {
    formas.push({ de: sugestao.from, para: sugestao.to, cor: 'blue' })
  }
  const ameaca = arestaAtual.value?.ameaca
  if (ameaca) formas.push({ de: ameaca.from, para: ameaca.to, cor: 'red' })
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
      <Tabuleiro :fen="fen" :orientacao="orientacao" :ultimo-lance="ultimoLance" :formas="setaDaAmeaca" />
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
        <button type="button" class="botao" :disabled="ply === 0" aria-label="Lance anterior" @click="anterior">◀</button>
        <span class="posicao">{{ ply }} / {{ lances.length }}</span>
        <button type="button" class="botao" :disabled="noFim" aria-label="Próximo lance" @click="proximo">▶</button>
        <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
      </div>

      <CartaoDica
        v-if="lanceAtual"
        :lance="fmtLance(lanceAtual.ply, lanceAtual.san)"
        :texto="dica"
      />
      <CartaoDica v-else texto="Avance com ▶, com as setas do teclado ou deslizando no tabuleiro." />
      <AvisosDoLance :aresta="arestaAtual" />
      <LinhaMotor :analise="analise" :lances-do-livro="proximoDoLivro ? [proximoDoLivro.san] : []" />
      <TaticasDoTabuleiro v-if="progresso.config.mostrarTaticas" :fen="fen" @formas="formasTatica = $event" />

      <CartaoDica v-if="noFim" tipo="nota" class="fim">
        <strong>Fim da linha</strong>
        <p>{{ fmtTexto(linha.resumo) }}</p>
        <p v-if="linha.avaliacao">Avaliação: <Avaliacao :valor="linha.avaliacao" detalhada /></p>
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
          <RouterLink v-else class="botao primario" to="/">Último estudo do capítulo: voltar ao início</RouterLink>
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
  align-items: center;
  gap: 0.5rem;
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
