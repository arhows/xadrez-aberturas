<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Avaliacao from '../components/Avaliacao.vue'
import CartaoDica from '../components/CartaoDica.vue'
import Tabuleiro from '../components/Tabuleiro.vue'
import { percorrer } from '../lib/arvore'
import { LEGENDA } from '../lib/avaliacao'
import { buscarCapitulo } from '../lib/capitulos'
import { buscarLinha } from '../lib/escopo'
import { fmtLance, fmtTexto } from '../lib/formato'

const route = useRoute()
const router = useRouter()

const capitulo = buscarCapitulo(route.params.cap as string)!
const linha = buscarLinha(capitulo, route.params.linha as string)
const lances = capitulo.unidades.find((u) => u.id === linha?.id)?.lances ?? []
const arestas = percorrer(capitulo.arvore, lances.map((l) => l.san)) ?? []

const ply = ref(0)
const orientacao = ref<'white' | 'black'>('white')

const lanceAtual = computed(() => lances[ply.value - 1])
const noFim = computed(() => lances.length > 0 && ply.value === lances.length)
const fen = computed(() => lanceAtual.value?.fenDepois ?? capitulo.arvore.nos.get(capitulo.arvore.raiz)!.fen)
const ultimoLance = computed<[string, string] | null>(() =>
  lanceAtual.value ? [lanceAtual.value.from, lanceAtual.value.to] : null,
)
const dica = computed(() => arestas[ply.value - 1]?.dica ?? null)

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
      <Tabuleiro :fen="fen" :orientacao="orientacao" :ultimo-lance="ultimoLance" />
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
        <RouterLink
          class="botao primario"
          :to="{ name: 'treino', params: { cap: capitulo.capitulo.id }, query: { escopo: `linha:${linha.id}` } }"
        >Treinar esta linha</RouterLink>
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
.fim .botao {
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
