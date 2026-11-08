<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import {
  buscarConjunto,
  casasDaSolucao,
  ehPromocao,
  verificarLance,
  vezDoProblema,
  type PecaPromocao,
} from '../lib/exercicios'
import { fmtLance } from '../lib/formato'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'

const TEMPO_DESFAZER_MS = 350

const route = useRoute()
const router = useRouter()
const conjunto = buscarConjunto(route.params.conjunto as string)!
const config = progresso.config

progresso.exercicios[conjunto.id] ??= {}
const estados = computed(() => progresso.exercicios[conjunto.id] ?? {})

/** Sem número na URL, abre o primeiro problema ainda não resolvido de primeira. */
const problema = (() => {
  const pedido = Number(route.query.n)
  const achado = conjunto.problemas.find((p) => p.n === pedido)
  if (achado) return achado
  return conjunto.problemas.find((p) => estados.value[p.n] !== 'primeira') ?? conjunto.problemas[0]
})()
const indice = conjunto.problemas.indexOf(problema)
const vez = vezDoProblema(problema)
const solucao = casasDaSolucao(problema)

const fen = ref(problema.fen)
const ultimoLance = ref<[string, string] | null>(null)
const resolvido = ref(false)
const erros = ref(0)
/** 0 = sem pista, 1 = peça destacada, 2 = seta da solução. */
const pista = ref(0)
const aguardando = ref(false)
const promocaoPendente = ref<{ de: string; para: string } | null>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()

interface Aviso {
  tipo: 'certo' | 'errado' | 'neutro'
  lance?: string
  texto?: string
}
const aviso = ref<Aviso | null>(null)

let temporizador: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(temporizador))

const orientacao = computed<'white' | 'black'>(() =>
  config.orientacaoAutomatica && vez === 'b' ? 'black' : 'white',
)
const jogavel = computed(() => !resolvido.value && !aguardando.value && !promocaoPendente.value)
const formas = computed<Forma[]>(() => {
  if (resolvido.value) return []
  // O tabuleiro devolve o peão enquanto a peça não é escolhida; a seta mostra o lance pendente.
  const pendente = promocaoPendente.value
  if (pendente) return [{ de: pendente.de, para: pendente.para, cor: 'yellow' }]
  if (pista.value >= 2) return [{ de: solucao.from, para: solucao.to, cor: 'green' }]
  return pista.value === 1 ? [{ de: solucao.from, cor: 'yellow' }] : []
})

const enunciado = `${vez === 'w' ? 'Brancas' : 'Pretas'} jogam e dão mate em ${conjunto.lances} ${conjunto.lances === 1 ? 'lance' : 'lances'}.`
const plyInicial = vez === 'w' ? 1 : 2

function aoJogar(de: string, para: string) {
  if (ehPromocao(fen.value, de, para)) {
    promocaoPendente.value = { de, para }
    return
  }
  conferir(de, para)
}

function promover(peca: PecaPromocao | null) {
  const pendente = promocaoPendente.value!
  promocaoPendente.value = null
  if (peca) conferir(pendente.de, pendente.para, peca)
  else tabuleiro.value?.sincronizar()
}

function conferir(de: string, para: string, promocao?: PecaPromocao) {
  const lance = verificarLance(fen.value, de, para, promocao)
  if (!lance) {
    tabuleiro.value?.sincronizar()
    return
  }

  if (!lance.mate) {
    erros.value++
    tocar('errado')
    aviso.value = { tipo: 'errado', lance: fmtLance(plyInicial, lance.san), texto: 'Não é mate. Tente de novo.' }
    aguardando.value = true
    temporizador = setTimeout(() => {
      aguardando.value = false
      tabuleiro.value?.sincronizar()
    }, TEMPO_DESFAZER_MS)
    return
  }

  tocar('certo')
  fen.value = lance.fenDepois
  ultimoLance.value = [lance.from, lance.to]
  resolvido.value = true
  const dePrimeira = erros.value === 0 && pista.value === 0
  estados.value[problema.n] = dePrimeira ? 'primeira' : 'ajuda'
  const outras = problema.solucoes.filter((san) => san !== lance.san)
  aviso.value = {
    tipo: 'certo',
    lance: fmtLance(plyInicial, lance.san),
    texto:
      (dePrimeira ? 'Mate! Resolvido de primeira.' : 'Mate!') +
      (outras.length ? ` Também dava mate: ${outras.join(', ')}.` : ''),
  }
}

function pedirPista() {
  pista.value++
  if (pista.value === 1) aviso.value = { tipo: 'neutro', texto: 'A peça destacada dá o mate.' }
  if (pista.value === 2) aviso.value = { tipo: 'neutro', texto: 'Jogue o lance da seta.' }
}

function irPara(n: number) {
  router.push({ name: 'exercicio', params: { conjunto: conjunto.id }, query: { n: String(n) } })
}

const anterior = conjunto.problemas[indice - 1]
const proximo = conjunto.problemas[indice + 1]
/** Próximo problema (dando a volta) que ainda não foi resolvido de primeira. */
const proximoPendente = computed(() => {
  const ordem = [...conjunto.problemas.slice(indice + 1), ...conjunto.problemas.slice(0, indice)]
  return ordem.find((p) => estados.value[p.n] !== 'primeira')
})

const contagem = computed(() => {
  const valores = Object.values(estados.value)
  return {
    primeira: valores.filter((e) => e === 'primeira').length,
    ajuda: valores.filter((e) => e === 'ajuda').length,
  }
})

const PECAS_PROMOCAO: { peca: PecaPromocao; nome: string }[] = [
  { peca: 'q', nome: 'Dama' },
  { peca: 'r', nome: 'Torre' },
  { peca: 'b', nome: 'Bispo' },
  { peca: 'n', nome: 'Cavalo' },
]
</script>

<template>
  <div class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :formas="formas"
        :jogavel="jogavel"
        :capturadas="false"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <p class="situacao">
        <strong>{{ conjunto.nome }} · Problema {{ problema.n }}</strong>
        <span class="suave"> de {{ conjunto.problemas.length }}</span>
      </p>
      <p class="enunciado">{{ enunciado }}</p>

      <div v-if="promocaoPendente" class="promocao">
        <span>Promover para:</span>
        <button v-for="opcao in PECAS_PROMOCAO" :key="opcao.peca" type="button" class="botao" @click="promover(opcao.peca)">
          {{ opcao.nome }}
        </button>
        <button type="button" class="botao" @click="promover(null)">Cancelar</button>
      </div>

      <CartaoDica v-if="aviso" :tipo="aviso.tipo" :lance="aviso.lance" :texto="aviso.texto" />

      <div class="acoes">
        <template v-if="!resolvido">
          <button type="button" class="botao" :disabled="pista >= 2" @click="pedirPista">
            {{ pista === 0 ? 'Pista: qual peça?' : 'Mostrar solução' }}
          </button>
        </template>
        <button
          v-if="resolvido && proximoPendente"
          type="button"
          class="botao primario"
          @click="irPara(proximoPendente.n)"
        >Próximo não resolvido ({{ proximoPendente.n }})</button>
        <p v-else-if="resolvido" class="concluido">Todos os problemas resolvidos de primeira!</p>
      </div>

      <div class="navegacao">
        <button type="button" class="botao" :disabled="!anterior" @click="irPara(anterior.n)">← Anterior</button>
        <button type="button" class="botao" :disabled="!proximo" @click="irPara(proximo.n)">Próximo →</button>
      </div>

      <p class="suave">
        ✓ {{ contagem.primeira }} de primeira · {{ contagem.ajuda }} com ajuda
        · {{ conjunto.problemas.length - contagem.primeira - contagem.ajuda }} por fazer
      </p>

      <details class="escolha">
        <summary>Escolher problema</summary>
        <div class="grade-problemas">
          <button
            v-for="p in conjunto.problemas"
            :key="p.n"
            type="button"
            :class="[estados[p.n], { atual: p.n === problema.n }]"
            :aria-label="`Problema ${p.n}${estados[p.n] === 'primeira' ? ', resolvido de primeira' : estados[p.n] === 'ajuda' ? ', resolvido com ajuda' : ''}`"
            @click="irPara(p.n)"
          >{{ p.n }}</button>
        </div>
      </details>

      <p class="suave fonte">{{ conjunto.fonte }}</p>
    </div>
  </div>
</template>

<style scoped>
.situacao,
.enunciado {
  margin: 0;
}
.enunciado {
  font-size: 1.125rem;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
}
.fonte {
  font-size: 0.875rem;
}
.acoes,
.navegacao,
.promocao {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
.acoes:empty {
  display: none;
}
.concluido {
  margin: 0;
  color: var(--ok);
}
.escolha summary {
  min-height: 44px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
}
.grade-problemas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(2.75rem, 1fr));
  gap: 0.25rem;
  max-height: 20rem;
  overflow-y: auto;
  padding: 0.25rem;
}
.grade-problemas button {
  min-height: 44px;
  border: 1px solid var(--borda);
  border-radius: 6px;
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
}
.grade-problemas .primeira {
  border-color: var(--ok);
  color: var(--ok);
  font-weight: 600;
}
.grade-problemas .ajuda {
  border-color: var(--aviso);
  color: var(--aviso);
  font-weight: 600;
}
.grade-problemas .atual {
  outline: 2px solid var(--texto);
  outline-offset: 1px;
}
</style>
