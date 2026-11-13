<script setup lang="ts">
import { Chess } from 'chess.js'
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import {
  conferirLance,
  destinosDoPercurso,
  ehPromocaoNoLance,
  fenDasPecas,
  lancesCertos,
  lerPecas,
  melhorCaminho,
  moverNoPercurso,
  percursoCompleto,
  pretasRestantes,
  type ExercicioCasa,
  type ExercicioLance,
  type ExercicioPercurso,
} from '../lib/fundamentos'
import { fmtSan } from '../lib/formato'
import { buscarLicao, LICOES } from '../lib/licoes'
import { somarAtividade } from '../lib/painel'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'

type Peca = 'q' | 'r' | 'b' | 'n'

const TEMPO_VOLTAR_MS = 1400
const VAZIO = '8/8/8/8/8/8/8/8 w - - 0 1'

const route = useRoute()
const router = useRouter()
const licao = buscarLicao(route.params.licao as string)!
const indiceLicao = LICOES.indexOf(licao)
const proximaLicao = LICOES[indiceLicao + 1]
const licaoAnterior = LICOES[indiceLicao - 1]
const feitos = computed(() => progresso.fundamentos)

/** Sem número na URL, abre o primeiro exercício ainda não feito da lição. */
const indice = (() => {
  const pedido = Number(route.query.n) - 1
  if (pedido >= 0 && pedido < licao.exercicios.length) return pedido
  const pendente = licao.exercicios.findIndex((e) => !feitos.value[e.id])
  return pendente >= 0 ? pendente : 0
})()
const exercicio = licao.exercicios[indice]
const comecoDaLicao = indice === 0 && !feitos.value[exercicio.id]

const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
const concluido = ref(false)
const aviso = ref<{ tipo: 'certo' | 'errado' | 'neutro'; texto: string; lance?: string } | null>(null)
const formas = ref<Forma[]>([])
const usouDica = ref(false)
let temporizador: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(temporizador))

function concluir(texto?: string) {
  concluido.value = true
  tocar('certo')
  if (!progresso.fundamentos[exercicio.id]) {
    progresso.fundamentos[exercicio.id] = new Date().toISOString()
    somarAtividade(progresso.atividade, 'exercicios')
  }
  const explicacao = exercicio.explicacao ?? ''
  aviso.value = { tipo: 'certo', texto: [texto, explicacao].filter(Boolean).join(' ') }
}

// ---------- casa ----------
const pergunta = ref(0)
const casaEx = exercicio.tipo === 'casa' ? (exercicio as ExercicioCasa) : null

function aoTocarCasa(casa: string) {
  if (!casaEx || concluido.value) return
  const atual = casaEx.perguntas[pergunta.value]
  if (atual.casas.includes(casa)) {
    formas.value = [{ de: casa, cor: 'green' }]
    if (pergunta.value + 1 >= casaEx.perguntas.length) {
      concluir()
      return
    }
    pergunta.value++
    aviso.value = { tipo: 'certo', texto: '' }
    tocar('certo')
  } else {
    formas.value = [{ de: casa, cor: 'red' }]
    aviso.value = { tipo: 'errado', texto: `Essa é a casa ${casa}.` }
    tocar('errado')
  }
}

// ---------- percurso ----------
const percursoEx = exercicio.tipo === 'percurso' ? (exercicio as ExercicioPercurso) : null
const pecas = shallowRef(percursoEx ? lerPecas(percursoEx.pecas) : new Map<string, string>())
const pegas = shallowRef(new Set<string>())
const lancesFeitos = ref(0)
const ultimoPercurso = ref<[string, string] | null>(null)
const minimo = percursoEx ? (melhorCaminho(percursoEx, pecas.value, new Set())?.length ?? 0) : 0
const estrelasRestantes = computed(() => (percursoEx ? percursoEx.estrelas.filter((e) => !pegas.value.has(e)) : []))
const destinosPercurso = computed(() => (percursoEx && !concluido.value ? destinosDoPercurso(pecas.value) : null))

function lanceNoPercurso(de: string, para: string) {
  const ex = percursoEx!
  pecas.value = moverNoPercurso(pecas.value, de, para)
  if (ex.estrelas.includes(para)) pegas.value = new Set([...pegas.value, para])
  lancesFeitos.value++
  ultimoPercurso.value = [de, para]
  formas.value = []
  aviso.value = null
  if (percursoCompleto(ex, pecas.value, pegas.value)) {
    const n = lancesFeitos.value
    concluir(n <= minimo ? `Perfeito: ${n} ${n === 1 ? 'lance' : 'lances'}, o mínimo possível.` : `Feito em ${n} lances (dava em ${minimo}).`)
    return
  }
  if (!melhorCaminho(ex, pecas.value, pegas.value)) {
    aviso.value = { tipo: 'errado', texto: 'Assim não dá mais para terminar. Toque em Recomeçar.' }
    tocar('errado')
  }
}

// ---------- lance ----------
const lanceEx = exercicio.tipo === 'lance' ? (exercicio as ExercicioLance) : null
const fenDepois = ref<string | null>(null)
const ultimoLance = ref<[string, string] | null>(lanceEx?.ultimo ?? null)
const promocaoPendente = ref<{ de: string; para: string } | null>(null)

function lanceNaPosicao(de: string, para: string, promocao?: Peca) {
  const ex = lanceEx!
  if (!promocao && ehPromocaoNoLance(ex.fen, de, para)) {
    promocaoPendente.value = { de, para }
    return
  }
  const r = conferirLance(ex, de, para, promocao)
  if (!r) {
    tabuleiro.value?.sincronizar()
    return
  }
  formas.value = []
  const jogo = new Chess(ex.fen)
  jogo.move({ from: de, to: para, promotion: promocao ?? 'q' })
  fenDepois.value = jogo.fen()
  ultimoLance.value = [de, para]
  if (r.certo) {
    concluir()
    aviso.value = { ...aviso.value!, lance: fmtSan(r.san) }
    return
  }
  aviso.value = { tipo: 'errado', texto: r.motivo, lance: fmtSan(r.san) }
  tocar('errado')
  temporizador = setTimeout(() => {
    fenDepois.value = null
    ultimoLance.value = ex.ultimo ?? null
  }, TEMPO_VOLTAR_MS)
}

function promover(peca: Peca | null) {
  const pendente = promocaoPendente.value!
  promocaoPendente.value = null
  if (peca) lanceNaPosicao(pendente.de, pendente.para, peca)
  else tabuleiro.value?.sincronizar()
}

// ---------- tabuleiro ----------
const fen = computed(() => {
  if (percursoEx) return fenDasPecas(pecas.value)
  if (lanceEx) return fenDepois.value ?? lanceEx.fen
  return casaEx?.fen ?? VAZIO
})
const orientacao = computed(() => (casaEx?.orientacao ?? lanceEx?.orientacao ?? 'white') as 'white' | 'black')
const jogavel = computed(() => !concluido.value && !casaEx && fenDepois.value === null && !promocaoPendente.value)
const ultimo = computed(() => (percursoEx ? ultimoPercurso.value : ultimoLance.value))

function aoJogar(de: string, para: string) {
  if (percursoEx) lanceNoPercurso(de, para)
  else if (lanceEx) lanceNaPosicao(de, para)
}

function pedirDica() {
  usouDica.value = true
  if (percursoEx) {
    const passo = melhorCaminho(percursoEx, pecas.value, pegas.value)?.[0]
    if (passo) formas.value = [{ de: passo[0], para: passo[1], cor: 'yellow' }]
  } else if (lanceEx) {
    const certo = lancesCertos(lanceEx)[0]
    if (certo) formas.value = [{ de: certo.de, para: certo.para, cor: 'yellow' }]
  } else if (casaEx) {
    formas.value = casaEx.perguntas[pergunta.value].casas.map((c) => ({ de: c, cor: 'yellow' as const }))
  }
}

function recomecar() {
  router.replace({ name: 'licao', params: { licao: licao.id }, query: { n: String(indice + 1), r: String(Date.now() % 100000) } })
}

function irPara(i: number) {
  router.push({ name: 'licao', params: { licao: licao.id }, query: { n: String(i + 1) } })
}
const proximo = licao.exercicios[indice + 1]

const enunciado = computed(() => {
  if (casaEx && !concluido.value) return casaEx.perguntas[pergunta.value].texto
  return exercicio.enunciado
})
const contador = computed(() => {
  if (casaEx) return `${Math.min(pergunta.value + (concluido.value ? 1 : 0), casaEx.perguntas.length)} de ${casaEx.perguntas.length}`
  if (percursoEx) {
    const partes = []
    if (percursoEx.estrelas.length) partes.push(`★ ${pegas.value.size} de ${percursoEx.estrelas.length}`)
    if (percursoEx.capturarTudo) partes.push(`${pretasRestantes(pecas.value)} peças pretas restantes`)
    partes.push(`${lancesFeitos.value} ${lancesFeitos.value === 1 ? 'lance' : 'lances'}`)
    return partes.join(' · ')
  }
  return ''
})
const vezDasPretas = computed(() => lanceEx?.fen.split(' ')[1] === 'b')

const PECAS_PROMOCAO: { peca: Peca; nome: string }[] = [
  { peca: 'q', nome: 'Dama' },
  { peca: 'r', nome: 'Torre' },
  { peca: 'b', nome: 'Bispo' },
  { peca: 'n', nome: 'Cavalo' },
]
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" to="/fundamentos" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>{{ licao.titulo }}</h1>
    <span class="apoio suave">{{ indice + 1 }} de {{ licao.exercicios.length }}</span>
  </header>

  <div class="tela">
    <p class="enunciado corpo-forte so-celular">
      <span v-if="lanceEx" class="marcador" :class="{ b: vezDasPretas }" aria-hidden="true"></span>{{ enunciado }}
    </p>
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimo"
        :formas="formas"
        :jogavel="jogavel"
        :destinos="destinosPercurso"
        :estrelas="estrelasRestantes"
        :capturadas="false"
        @lance="aoJogar"
        @casa="aoTocarCasa"
      />
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink to="/fundamentos" class="trilha">‹ Fundamentos do xadrez</RouterLink>
        <h1 class="titulo-pagina">{{ indiceLicao + 1 }}. {{ licao.titulo }}</h1>
      </div>

      <nav class="passos" aria-label="Exercícios da lição">
        <button
          v-for="(e, i) in licao.exercicios"
          :key="e.id"
          type="button"
          :class="{ feito: feitos[e.id], atual: i === indice }"
          :aria-label="`Exercício ${i + 1}${feitos[e.id] ? ', feito' : ''}`"
          @click="irPara(i)"
        >{{ feitos[e.id] ? '✓' : i + 1 }}</button>
      </nav>

      <details class="explicacao" :open="comecoDaLicao">
        <summary>Como funciona</summary>
        <p v-for="(paragrafo, i) in licao.texto" :key="i">{{ paragrafo }}</p>
      </details>

      <p class="enunciado corpo-forte so-computador">
        <span v-if="lanceEx" class="marcador" :class="{ b: vezDasPretas }" aria-hidden="true"></span>{{ enunciado }}
      </p>
      <p v-if="casaEx && !concluido" class="suave">{{ exercicio.enunciado }}</p>
      <p v-if="contador" class="suave contador">{{ contador }}</p>

      <div v-if="promocaoPendente" class="promocao">
        <span>Promover para:</span>
        <button v-for="opcao in PECAS_PROMOCAO" :key="opcao.peca" type="button" class="botao" @click="promover(opcao.peca)">
          {{ opcao.nome }}
        </button>
        <button type="button" class="botao" @click="promover(null)">Cancelar</button>
      </div>

      <CartaoDica v-if="aviso && (aviso.texto || aviso.lance || aviso.tipo === 'certo')" :tipo="aviso.tipo" :lance="aviso.lance" :texto="aviso.texto" />

      <div v-if="concluido" class="acoes">
        <button v-if="proximo" type="button" class="botao primario grande largo-celular" @click="irPara(indice + 1)">Próximo exercício</button>
        <template v-else>
          <p class="parabens">Lição concluída!</p>
          <RouterLink v-if="proximaLicao" class="botao primario grande largo-celular" :to="{ name: 'licao', params: { licao: proximaLicao.id } }">
            Próxima lição: {{ proximaLicao.titulo }}
          </RouterLink>
          <RouterLink v-else class="botao primario grande largo-celular" to="/jogar">Curso completo! Jogar uma partida</RouterLink>
        </template>
      </div>
      <div class="acoes secundarias">
        <button v-if="!concluido" type="button" class="botao" @click="pedirDica">Dica</button>
        <button v-if="percursoEx || concluido" type="button" class="botao" @click="recomecar">↺ Recomeçar</button>
      </div>

      <nav class="navegacao-licoes" aria-label="Outras lições">
        <RouterLink v-if="licaoAnterior" class="botao fantasma" :to="{ name: 'licao', params: { licao: licaoAnterior.id } }">
          ← {{ licaoAnterior.titulo }}
        </RouterLink>
        <RouterLink v-if="proximaLicao" class="botao fantasma proxima" :to="{ name: 'licao', params: { licao: proximaLicao.id } }">
          {{ proximaLicao.titulo }} →
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.enunciado {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
}
.tela > .enunciado {
  padding: 0 var(--espaco-4);
}
.marcador {
  flex: none;
  width: 14px;
  height: 14px;
  border: 1.5px solid var(--borda-controle);
  border-radius: 50%;
  background: #ffffff;
}
.marcador.b {
  background: #1c1d1a;
}
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
.passos {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
.passos button {
  width: 40px;
  height: 40px;
  border: 1px solid var(--borda);
  border-radius: 50%;
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
}
.passos .feito {
  border-color: var(--ok);
  color: var(--ok);
  font-weight: 700;
}
.passos .atual {
  outline: 2px solid var(--texto);
  outline-offset: 1px;
}
.explicacao {
  padding: var(--espaco-2) var(--espaco-3);
  border: 1px solid var(--borda);
  border-radius: var(--raio-md);
  background: var(--superficie);
}
.explicacao summary {
  min-height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
}
.explicacao p {
  margin: 0 0 var(--espaco-2);
  line-height: 1.5;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
}
.contador {
  font-variant-numeric: tabular-nums;
}
.acoes,
.promocao {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
.navegacao-licoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-top: var(--espaco-3);
  border-top: 1px solid var(--borda);
}
.navegacao-licoes .proxima {
  margin-left: auto;
}
.parabens {
  margin: 0;
  color: var(--ok);
  font-weight: 600;
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
.acoes.secundarias:empty {
  display: none;
}
@media (max-width: 799.98px) {
  .acoes.secundarias > .botao {
    flex: 1 1 0;
  }
}
</style>
