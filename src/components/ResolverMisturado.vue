<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import CartaoDica from './CartaoDica.vue'
import Tabuleiro, { type Forma } from './Tabuleiro.vue'
import { ehMate, type ItemMisturado } from '../lib/diario'
import {
  analisar,
  buscarChave,
  casasDoLance,
  ehPromocao,
  jogarSan,
  verificarLance,
  vezDoProblema,
  type LanceVerificado,
  type PecaPromocao,
  type Resposta,
} from '../lib/exercicios'
import { fmtSan } from '../lib/formato'
import { corDoPly, numeroDoPly } from '../lib/lances'
import { somarAtividade } from '../lib/painel'
import { conferirLanceTatico } from '../lib/problemasTaticos'
import { progresso } from '../lib/progresso'
import { notaDoExercicio, registrarResultado } from '../lib/revisaoExercicios'
import { tocar } from '../lib/som'

/**
 * Um exercício da mistura (tática do lichess ou mate em 1 a 4) com o tabuleiro e o painel.
 * Na série do dia vale errar e pedir pista; na Sequência o primeiro erro encerra e mostra o lance
 * certo. O tema da tática só aparece depois, para não entregar o padrão. Monte de novo (`key`)
 * a cada exercício.
 */
/** `treino`: refazendo a série do dia; não conta de novo no progresso nem na revisão. */
const props = defineProps<{ item: ItemMisturado; modo: 'serie' | 'sequencia'; treino?: boolean }>()
const emit = defineEmits<{ resolvido: [dePrimeira: boolean]; falhou: [] }>()

const TEMPO_PREVIO_MS = 900
const TEMPO_RESPOSTA_MS = 550
const TEMPO_DESFAZER_MS = 600
const TEMPO_REFUTACAO_MS = 1600

const { conjunto, problema } = props.item
const mate = ehMate(props.item)
const config = progresso.config
const vez = vezDoProblema(problema)
const previo = problema.previo ? jogarSan(problema.fen, problema.previo) : null
const fenInicial = previo?.fenDepois ?? problema.fen
const plyInicial = (() => {
  const [, lado, , , , numero] = fenInicial.split(' ')
  return ((Number(numero) || 1) - 1) * 2 + (lado === 'b' ? 2 : 1)
})()
const lanceDeAbertura: [string, string] | null = previo ? [previo.from, previo.to] : null

const jogadas = ref<LanceVerificado[]>([])
const fenDoPasso = computed(() => jogadas.value.at(-1)?.fenDepois ?? fenInicial)
const fen = ref(problema.fen)
const ultimoLance = ref<[string, string] | null>(null)
const aguardando = ref(!!previo)
const terminado = ref(false)
/** Já resolvido uma vez: refazer do início (para memorizar) não conta de novo. */
const jaResolvido = ref(false)
const falhou = ref(false)
const erros = ref(0)
const pista = ref(0)
const usouPista = ref(false)
const alvoDaPista = ref<{ from: string; to: string } | null>(null)
const promocaoPendente = ref<{ de: string; para: string } | null>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
const aviso = ref<{ tipo: 'certo' | 'errado' | 'neutro'; lance?: string; texto?: string } | null>(null)

let temporizador: ReturnType<typeof setTimeout> | undefined
let ativo = true
onBeforeUnmount(() => {
  ativo = false
  clearTimeout(temporizador)
})
function depois(ms: number, acao: () => void) {
  clearTimeout(temporizador)
  temporizador = setTimeout(acao, ms)
}

const rotulo = (ply: number, san: string) => `${numeroDoPly(ply)}${corDoPly(ply) === 'w' ? '.' : '...'}${fmtSan(san)}`
const nomeDoLado = vez === 'w' ? 'brancas' : 'pretas'
const nomeDoAdversario = vez === 'w' ? 'As pretas' : 'As brancas'
const orientacao = computed<'white' | 'black'>(() => (config.orientacaoAutomatica && vez === 'b' ? 'black' : 'white'))
const jogavel = computed(() => !terminado.value && !aguardando.value && !promocaoPendente.value)
/** Mates: lances que ainda faltam para o mate, contando o da vez. */
const restantes = computed(() => conjunto.lances - Math.ceil(jogadas.value.length / 2))

const enunciado = computed(() => {
  if (mate) {
    const prazo = `${conjunto.lances} ${conjunto.lances === 1 ? 'lance' : 'lances'}`
    return `As ${nomeDoLado} dão mate em ${prazo}.`
  }
  return `As ${nomeDoLado} jogam e ganham.`
})
/** Depois de terminar: o que era o exercício (o tema fica escondido antes). */
const sobre = computed(() =>
  mate ? `${conjunto.fonte}` : `Tema: ${conjunto.nome}${problema.rating ? ` · rating ${problema.rating}` : ''}`,
)

const formas = computed<Forma[]>(() => {
  const pendente = promocaoPendente.value
  if (pendente) return [{ de: pendente.de, para: pendente.para, cor: 'yellow' }]
  const alvo = alvoDaPista.value
  if (aguardando.value || !alvo || pista.value === 0) return []
  return pista.value >= 2 ? [{ de: alvo.from, para: alvo.to, cor: 'green' }] : [{ de: alvo.from, cor: 'yellow' }]
})

if (previo) {
  depois(TEMPO_PREVIO_MS, () => {
    fen.value = fenInicial
    ultimoLance.value = lanceDeAbertura
    aguardando.value = false
    aviso.value = { tipo: 'neutro', lance: rotulo(plyInicial - 1, previo.san), texto: `${nomeDoAdversario} jogaram. Sua vez.` }
  })
}

/** O lance certo nesta posição (para a pista e para mostrar depois do erro). */
async function lanceCerto(): Promise<string | undefined> {
  if (!mate) return problema.linha?.[jogadas.value.length]
  if (jogadas.value.length === 0) return problema.solucoes[0]
  return buscarChave(fenDoPasso.value, restantes.value)
}

function aoJogar(de: string, para: string) {
  if (ehPromocao(fenDoPasso.value, de, para)) {
    promocaoPendente.value = { de, para }
    return
  }
  void conferir(de, para)
}
function promover(peca: PecaPromocao | null) {
  const pendente = promocaoPendente.value!
  promocaoPendente.value = null
  if (peca) void conferir(pendente.de, pendente.para, peca)
  else tabuleiro.value?.sincronizar()
}

function mostrarPasso() {
  fen.value = fenDoPasso.value
  const anterior = jogadas.value.at(-1)
  ultimoLance.value = anterior ? [anterior.from, anterior.to] : lanceDeAbertura
  aguardando.value = false
  tabuleiro.value?.sincronizar()
}

/** Lance errado: mostra-o (e a refutação, se houver) e volta. Na Sequência, encerra. */
function errar(lance: LanceVerificado, ply: number, texto: string, refutacao?: LanceVerificado | null) {
  erros.value++
  tocar('errado')
  fen.value = lance.fenDepois
  ultimoLance.value = [lance.from, lance.to]
  aguardando.value = true
  const naSequencia = props.modo === 'sequencia'
  aviso.value = { tipo: 'errado', lance: rotulo(ply, lance.san), texto: naSequencia ? texto.replace(' Tente de novo.', '') : texto }
  const voltar = () => {
    mostrarPasso()
    if (naSequencia) void falhar()
  }
  if (refutacao) {
    depois(TEMPO_RESPOSTA_MS, () => {
      fen.value = refutacao.fenDepois
      ultimoLance.value = [refutacao.from, refutacao.to]
      depois(TEMPO_REFUTACAO_MS, voltar)
    })
  } else depois(naSequencia ? TEMPO_REFUTACAO_MS : TEMPO_DESFAZER_MS, voltar)
}

async function falhar() {
  terminado.value = true
  falhou.value = true
  registrarResultado(conjunto.id, problema.n, 1)
  const san = await lanceCerto()
  if (!ativo) return
  if (san) {
    alvoDaPista.value = casasDoLance(fenDoPasso.value, san)
    pista.value = 2
    aviso.value = { tipo: 'neutro', lance: rotulo(plyInicial + jogadas.value.length, san), texto: `Errou: o certo era o lance da seta. ${sobre.value}.` }
  }
  emit('falhou')
}

async function conferir(de: string, para: string, promocao?: PecaPromocao) {
  const lance = verificarLance(fenDoPasso.value, de, para, promocao)
  if (!lance) {
    tabuleiro.value?.sincronizar()
    return
  }
  const ply = plyInicial + jogadas.value.length
  if (mate) return conferirMate(lance, ply)
  const passo = jogadas.value.length
  const resultado = conferirLanceTatico(problema, passo, lance.san, lance.mate)
  if (resultado === 'errado') return errar(lance, ply, 'Não é o melhor lance. Tente de novo.')
  if (resultado === 'fim') return concluir(lance, ply)
  avancar(lance, ply, jogarSan(lance.fenDepois, problema.linha![passo + 1]), 'Continue a combinação.')
}

async function conferirMate(lance: LanceVerificado, ply: number) {
  if (lance.mate) return concluir(lance, ply)
  if (restantes.value === 1) return errar(lance, ply, 'Não é mate. Tente de novo.')
  if (jogadas.value.length === 0 && conjunto.lances >= 4 && !problema.solucoes.includes(lance.san)) {
    return errar(lance, ply, 'Não é a solução: só um primeiro lance força o mate. Tente de novo.')
  }
  let resposta: Resposta
  if (jogadas.value.length === 0 && problema.defesa && lance.san === problema.solucoes[0]) {
    resposta = { tipo: 'defesa', lance: jogarSan(lance.fenDepois, problema.defesa) }
  } else {
    fen.value = lance.fenDepois
    ultimoLance.value = [lance.from, lance.to]
    aguardando.value = true
    aviso.value = { tipo: 'neutro', lance: rotulo(ply, lance.san), texto: 'Analisando…' }
    resposta = await analisar(lance.fenDepois, restantes.value - 1)
    if (!ativo) return
  }
  if (resposta.tipo === 'refutacao') {
    const defesa = resposta.lance
    if (!defesa) return errar(lance, ply, 'Afoga o rei: não há mate. Tente de novo.')
    return errar(lance, ply, `Não força o mate: ${rotulo(ply + 1, defesa.san)} escapa. Tente de novo.`, defesa)
  }
  const faltam = restantes.value - 1
  avancar(lance, ply, resposta.lance, faltam === 1 ? 'Agora dê o mate.' : `Mate em ${faltam} lances.`)
}

/** Lance certo que não encerra: o adversário responde e a vez volta. */
function avancar(lance: LanceVerificado, ply: number, resposta: LanceVerificado, seguir: string) {
  tocar('certo')
  jogadas.value = [...jogadas.value, lance]
  fen.value = lance.fenDepois
  ultimoLance.value = [lance.from, lance.to]
  pista.value = 0
  alvoDaPista.value = null
  aviso.value = { tipo: 'certo', lance: rotulo(ply, lance.san), texto: 'Isso! Continue.' }
  aguardando.value = true
  depois(TEMPO_RESPOSTA_MS, () => {
    jogadas.value = [...jogadas.value, resposta]
    fen.value = resposta.fenDepois
    ultimoLance.value = [resposta.from, resposta.to]
    aguardando.value = false
    aviso.value = { tipo: 'neutro', lance: rotulo(ply + 1, resposta.san), texto: `${nomeDoAdversario} responderam. ${seguir}` }
  })
}

function concluir(lance: LanceVerificado, ply: number) {
  tocar('certo')
  jogadas.value = [...jogadas.value, lance]
  fen.value = lance.fenDepois
  ultimoLance.value = [lance.from, lance.to]
  terminado.value = true
  pista.value = 0
  if (jaResolvido.value) {
    aviso.value = { tipo: 'certo', lance: rotulo(ply, lance.san), texto: 'Resolvido de novo! Refaça quantas vezes quiser para memorizar.' }
    return
  }
  jaResolvido.value = true
  const dePrimeira = erros.value === 0 && !usouPista.value
  if (!props.treino) {
    somarAtividade(progresso.atividade, 'exercicios')
    // Conta também no conjunto de origem (sem rebaixar um "de primeira" de antes) e na revisão.
    const estados = (progresso.exercicios[conjunto.id] ??= {})
    if (estados[problema.n] !== 'primeira') estados[problema.n] = dePrimeira ? 'primeira' : 'ajuda'
    registrarResultado(conjunto.id, problema.n, notaDoExercicio(erros.value, usouPista.value))
  }
  const explicacao = problema.explicacao ? ` ${problema.explicacao}` : ''
  aviso.value = {
    tipo: 'certo',
    lance: rotulo(ply, lance.san),
    texto: `${dePrimeira ? 'Resolvido de primeira!' : 'Resolvido.'} ${sobre.value}.${explicacao}`,
  }
  emit('resolvido', dePrimeira)
}

async function pedirPista() {
  usouPista.value = true
  if (!alvoDaPista.value) {
    aguardando.value = true
    const san = await lanceCerto()
    if (!ativo) return
    aguardando.value = false
    alvoDaPista.value = san ? casasDoLance(fenDoPasso.value, san) : null
  }
  pista.value++
  aviso.value = { tipo: 'neutro', texto: pista.value === 1 ? 'A peça destacada faz o lance.' : 'Jogue o lance da seta.' }
}

/**
 * Volta à posição do enunciado para refazer os lances (na série do dia). Vale no meio do exercício,
 * depois de uma pista, e também depois de resolvido, para memorizar o caminho.
 */
function recomecar() {
  clearTimeout(temporizador)
  jogadas.value = []
  terminado.value = false
  pista.value = 0
  alvoDaPista.value = null
  promocaoPendente.value = null
  mostrarPasso()
  aviso.value = { tipo: 'neutro', texto: `De volta ao início. ${enunciado.value}` }
}
const podeRecomecar = computed(() => props.modo === 'serie' && !falhou.value && (jogadas.value.length > 0 || terminado.value || pista.value > 0))

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
      <slot name="topo" />
      <p class="enunciado corpo-forte">
        <span class="marcador" :class="vez" aria-hidden="true"></span>{{ enunciado }}
      </p>

      <div v-if="promocaoPendente" class="acoes">
        <span>Promover para:</span>
        <button v-for="opcao in PECAS_PROMOCAO" :key="opcao.peca" type="button" class="botao" @click="promover(opcao.peca)">{{ opcao.nome }}</button>
        <button type="button" class="botao" @click="promover(null)">Cancelar</button>
      </div>

      <CartaoDica v-if="aviso" :tipo="aviso.tipo" :lance="aviso.lance" :texto="aviso.texto" />

      <div class="acoes">
        <button v-if="modo === 'serie' && !terminado" type="button" class="botao grande largo-celular" :disabled="pista >= 2 || aguardando" @click="pedirPista">
          {{ pista === 0 ? 'Pista: qual peça?' : 'Mostrar o lance' }}
        </button>
        <slot name="acoes" :terminado="terminado || jaResolvido" :falhou="falhou" />
        <button v-if="podeRecomecar" type="button" class="botao fantasma recomecar" :disabled="aguardando && !terminado" @click="recomecar">
          ↺ Recomeçar do início
        </button>
        <a
          v-if="terminado && problema.lichess"
          class="botao fantasma"
          :href="`https://lichess.org/training/${problema.lichess}`"
          target="_blank"
          rel="noopener"
        >Ver no lichess</a>
      </div>
      <slot name="rodape" />
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
.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
</style>
