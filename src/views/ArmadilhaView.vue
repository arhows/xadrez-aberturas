<script setup lang="ts">
import { Chess } from 'chess.js'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import {
  buscarArmadilha,
  chaveDaArmadilha,
  conferirDefesa,
  lanceDoErro,
  linhaDaPunicao,
  obterArmadilhas,
  posicoesDaArmadilha,
  type ModoArmadilha,
} from '../lib/armadilhas'
import { fmtLance } from '../lib/formato'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'

/** Uma armadilha: ver a sequência, armar (punir o erro) ou se defender (achar um lance seguro). */

const route = useRoute()
const router = useRouter()
const armadilha = computed(() => buscarArmadilha(route.params.id as string)!)
const posicoes = computed(() => posicoesDaArmadilha(armadilha.value))
const sans = computed(() => armadilha.value.lances.split(' '))
const punicao = computed(() => linhaDaPunicao(armadilha.value))
const vitima = computed(() => (armadilha.value.lado === 'w' ? 'b' : 'w'))
const nomeDaCor = (c: 'w' | 'b') => (c === 'w' ? 'brancas' : 'pretas')

const modo = ref<ModoArmadilha>((['ver', 'armar', 'defender'].includes(route.query.modo as string) ? route.query.modo : 'ver') as ModoArmadilha)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
let temporizador: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(temporizador))

// ---------- Ver ----------
const ply = ref(0)
function ir(p: number) {
  ply.value = Math.max(0, Math.min(sans.value.length, p))
}
function aoTeclar(e: KeyboardEvent) {
  if (modo.value !== 'ver') return
  if (e.key === 'ArrowLeft') ir(ply.value - 1)
  if (e.key === 'ArrowRight') ir(ply.value + 1)
}
onMounted(() => window.addEventListener('keydown', aoTeclar))
onBeforeUnmount(() => window.removeEventListener('keydown', aoTeclar))
const historicoMarcado = computed(() =>
  sans.value.map((s, i) => (i === armadilha.value.erro - 1 ? `${s}??` : i === armadilha.value.erro ? `${s}!` : s)),
)

// ---------- Armar e Defender ----------
const passo = ref(0)
const retorno = ref<{ tipo: 'certo' | 'errado' | 'neutro'; lance?: string; texto?: string } | null>(null)
const resolvido = ref(false)
const mostrarDica = ref(false)
const ocupado = ref(false)

function marcarFeito(m: 'armar' | 'defender') {
  const chave = chaveDaArmadilha(armadilha.value.id, m)
  if (!progresso.armadilhas[chave]) progresso.armadilhas[chave] = new Date().toISOString()
}

function comecar(m: ModoArmadilha) {
  clearTimeout(temporizador)
  modo.value = m
  passo.value = 0
  resolvido.value = false
  mostrarDica.value = false
  ocupado.value = false
  retorno.value = null
  ply.value = m === 'ver' ? armadilha.value.erro - 1 : 0
  if (route.query.modo !== m) router.replace({ query: { ...route.query, modo: m } })
}

const fen = computed(() => {
  if (modo.value === 'ver') return posicoes.value[ply.value].fen
  if (modo.value === 'armar') return posicoes.value[armadilha.value.erro + passo.value].fen
  return posicoes.value[armadilha.value.erro - 1].fen
})
const ultimoLance = computed(() => {
  if (modo.value === 'ver') return posicoes.value[ply.value].ultimo
  if (modo.value === 'armar') return posicoes.value[armadilha.value.erro + passo.value].ultimo
  return posicoes.value[armadilha.value.erro - 1].ultimo
})
const orientacao = ref<'white' | 'black'>('white')
watch(
  [modo, armadilha],
  () => {
    const cor = modo.value === 'defender' ? vitima.value : armadilha.value.lado
    orientacao.value = cor === 'w' ? 'white' : 'black'
  },
  { immediate: true },
)

const jogavel = computed(() => modo.value !== 'ver' && !resolvido.value && !ocupado.value)

function sanDoLance(de: string, para: string): string | null {
  try {
    return new Chess(fen.value).move({ from: de, to: para, promotion: 'q' }).san
  } catch {
    return null
  }
}

const semSinais = (s: string) => s.replace(/[+#]/g, '')

function aoJogar(de: string, para: string) {
  const san = jogavel.value ? sanDoLance(de, para) : null
  tabuleiro.value?.sincronizar()
  if (!san) return
  if (modo.value === 'armar') jogarArmar(san)
  else jogarDefender(san)
}

function jogarArmar(san: string) {
  const esperado = punicao.value[passo.value]
  const daMate = san.endsWith('#')
  if (semSinais(san) !== semSinais(esperado) && !daMate) {
    tocar('errado')
    retorno.value = { tipo: 'errado', lance: san, texto: 'Não é esse. Procure o lance que pune o erro.' }
    return
  }
  tocar('certo')
  mostrarDica.value = false
  const n = armadilha.value.erro + passo.value + 1
  if (daMate || passo.value + 1 >= punicao.value.length) {
    passo.value = daMate && semSinais(san) !== semSinais(esperado) ? passo.value : passo.value + 1
    resolvido.value = true
    marcarFeito('armar')
    retorno.value = { tipo: 'certo', lance: fmtLance(n, esperado), texto: 'Armadilha completa!' }
    return
  }
  retorno.value = { tipo: 'certo', lance: fmtLance(n, esperado) }
  passo.value++
  ocupado.value = true
  temporizador = setTimeout(() => {
    passo.value++
    ocupado.value = false
  }, 650)
}

function jogarDefender(san: string) {
  const resposta = conferirDefesa(armadilha.value, san)
  const n = armadilha.value.erro
  if (resposta === 'defendeu') {
    tocar('certo')
    resolvido.value = true
    marcarFeito('defender')
    retorno.value = { tipo: 'certo', lance: fmtLance(n, san), texto: 'Você escapou da armadilha.' }
  } else if (resposta === 'caiu') {
    tocar('errado')
    resolvido.value = true
    retorno.value = { tipo: 'errado', lance: fmtLance(n, san), texto: 'Caiu na armadilha! Veja a punição.' }
  } else {
    tocar('errado')
    retorno.value = { tipo: 'errado', lance: fmtLance(n, san), texto: 'Esse lance não segura a posição. Tente outro.' }
  }
}

/** Setas: a dica (lance da punição ou até 3 defesas) e, no modo Ver, o erro e a punição. */
const formas = computed<Forma[]>(() => {
  const setas: Forma[] = []
  const seta = (posicaoFen: string, san: string, cor: Forma['cor']) => {
    try {
      const m = new Chess(posicaoFen).move(san)
      setas.push({ de: m.from, para: m.to, cor })
    } catch {
      /* lance fora da posição */
    }
  }
  if (modo.value === 'armar' && mostrarDica.value && !resolvido.value) seta(fen.value, punicao.value[passo.value], 'green')
  if (modo.value === 'defender' && (mostrarDica.value || (resolvido.value && retorno.value?.tipo === 'errado')))
    for (const d of armadilha.value.defesas.slice(0, 3)) seta(fen.value, d, 'green')
  return setas
})

const tituloDoModo = computed(() => {
  if (modo.value === 'armar') return `Você joga com as ${nomeDaCor(armadilha.value.lado)}. O adversário acabou de errar com ${fmtLance(armadilha.value.erro, lanceDoErro(armadilha.value))}: puna!`
  if (modo.value === 'defender') return `Você joga com as ${nomeDaCor(vitima.value)}. Há uma armadilha no ar: ache um lance seguro.`
  return ''
})

const proxima = computed(() => {
  const lista = obterArmadilhas()
  const i = lista.findIndex((a) => a.id === armadilha.value.id)
  return lista[i + 1]
})

watch(
  () => route.params.id,
  () => comecar(modo.value),
)
comecar(modo.value)
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" :to="{ name: 'armadilhas' }" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>{{ armadilha.nome }}</h1>
  </header>

  <div class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :formas="formas"
        :jogavel="jogavel"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink :to="{ name: 'armadilhas' }" class="trilha">‹ Armadilhas</RouterLink>
        <h1 class="titulo-pagina">{{ armadilha.nome }}</h1>
      </div>
      <p class="suave">{{ armadilha.abertura }} · armada pelas {{ nomeDaCor(armadilha.lado) }}</p>

      <div class="abas" role="tablist" aria-label="Modo">
        <button v-for="m in (['ver', 'armar', 'defender'] as const)" :key="m" type="button" role="tab" class="aba" :class="{ ativa: modo === m }" :aria-selected="modo === m" @click="comecar(m)">
          {{ m === 'ver' ? 'Ver' : m === 'armar' ? 'Armar' : 'Defender' }}
          <span v-if="m !== 'ver' && progresso.armadilhas[chaveDaArmadilha(armadilha.id, m)]" class="ok" aria-label="feito">✓</span>
        </button>
      </div>

      <template v-if="modo === 'ver'">
        <CartaoDica tipo="nota" :texto="armadilha.texto" />
        <CartaoDica v-if="armadilha.ideia" tipo="nota" lance="Como se defender" :texto="armadilha.ideia" />
        <div class="navegacao" role="group" aria-label="Navegar nos lances">
          <button type="button" class="botao" :disabled="ply === 0" aria-label="Início" @click="ir(0)">⏮</button>
          <button type="button" class="botao" :disabled="ply === 0" aria-label="Lance anterior" @click="ir(ply - 1)">◀</button>
          <button type="button" class="botao" :disabled="ply >= sans.length" aria-label="Próximo lance" @click="ir(ply + 1)">▶</button>
          <button type="button" class="botao" :disabled="ply >= sans.length" aria-label="Fim" @click="ir(sans.length)">⏭</button>
          <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
        </div>
        <p class="suave">
          <template v-if="ply === armadilha.erro - 1">Posição antes do erro: {{ nomeDaCor(armadilha.erro % 2 === 1 ? 'w' : 'b') }} jogam.</template>
          <template v-else-if="ply === armadilha.erro">O erro: {{ fmtLance(armadilha.erro, lanceDoErro(armadilha)) }}??</template>
          <template v-else-if="ply === sans.length">Fim da punição.</template>
        </p>
        <HistoricoLances :lances="historicoMarcado" :atual="ply" :clicavel="true" @ir="ir" />
      </template>

      <template v-else>
        <p class="corpo-forte">{{ tituloDoModo }}</p>
        <CartaoDica v-if="retorno" :tipo="retorno.tipo" :lance="retorno.lance" :texto="retorno.texto" />
        <template v-if="resolvido">
          <CartaoDica tipo="nota" :texto="armadilha.texto" />
          <CartaoDica v-if="modo === 'defender' && armadilha.ideia" tipo="nota" lance="Como se defender" :texto="armadilha.ideia" />
          <p v-if="modo === 'defender'" class="suave">Lances aceitos: {{ armadilha.defesas.join(', ') }}.</p>
        </template>
        <div class="acoes">
          <button v-if="!resolvido" type="button" class="botao" @click="mostrarDica = true">Dica</button>
          <button v-if="resolvido || retorno?.tipo === 'errado'" type="button" class="botao" @click="comecar(modo)">↺ De novo</button>
          <button v-if="resolvido && retorno?.tipo === 'errado'" type="button" class="botao primario" @click="comecar('ver'); ir(armadilha.erro)">Ver a punição</button>
          <button v-if="resolvido && modo === 'armar' && !progresso.armadilhas[chaveDaArmadilha(armadilha.id, 'defender')]" type="button" class="botao primario" @click="comecar('defender')">Agora se defenda</button>
          <button v-if="resolvido && modo === 'defender' && !progresso.armadilhas[chaveDaArmadilha(armadilha.id, 'armar')]" type="button" class="botao primario" @click="comecar('armar')">Agora arme</button>
        </div>
      </template>

      <div class="acoes">
        <RouterLink v-if="proxima" class="botao" :to="{ name: 'armadilha', params: { id: proxima.id }, query: { modo } }">Próxima armadilha →</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trilha {
  display: inline-flex;
  align-items: center;
  min-height: var(--alvo-toque);
  color: var(--destaque);
  font-size: 14px;
  text-decoration: none;
}
.cabeca-painel {
  display: grid;
  gap: var(--espaco-1);
}
.cabeca-painel .titulo-pagina {
  margin: 0;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.corpo-forte {
  margin: 0;
  line-height: 1.5;
}
.abas {
  display: flex;
  gap: var(--espaco-1);
  border-bottom: 1px solid var(--borda);
}
.aba {
  min-height: var(--alvo-toque);
  padding: 0 0.875rem;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  color: var(--texto-suave);
  font: inherit;
  cursor: pointer;
}
.aba.ativa {
  border-bottom-color: var(--destaque);
  color: var(--texto);
  font-weight: 700;
}
.ok {
  color: var(--ok);
}
.navegacao,
.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2);
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
