<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import {
  analisar,
  buscarChave,
  buscarConjunto,
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
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'

const TEMPO_DESFAZER_MS = 350
const TEMPO_DEFESA_MS = 500
/** Quanto a refutação de um lance errado fica na tela antes de voltar. */
const TEMPO_REFUTACAO_MS = 1800
const POR_BLOCO = 100

const route = useRoute()
const router = useRouter()
const conjunto = buscarConjunto(route.params.conjunto as string)!
const config = progresso.config

progresso.exercicios[conjunto.id] ??= {}
progresso.ultimoConjunto = conjunto.id
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
const plyInicial = vez === 'w' ? 1 : 2
/** Lance do adversário antes do exercício (só em alguns livros), jogado ao abrir. */
const previo = problema.previo ? jogarSan(problema.fen, problema.previo) : null
const fenInicial = previo?.fenDepois ?? problema.fen
const TEMPO_PREVIO_MS = 900

/** Lances já jogados no problema (do usuário e do defensor), com a posição depois de cada um. */
const jogadas = ref<LanceVerificado[]>([])
const fenDoPasso = computed(() => jogadas.value.at(-1)?.fenDepois ?? fenInicial)
/** Posição na tela: pode mostrar por um instante um lance errado e a refutação dele. */
const fen = ref(problema.fen)
const ultimoLance = ref<[string, string] | null>(null)
/** Último lance antes das jogadas do usuário: o do adversário, quando há. */
const lanceDeAbertura: [string, string] | null = previo ? [previo.from, previo.to] : null
const resolvido = ref(false)
const erros = ref(0)
/** Pista do lance atual: 0 = nenhuma, 1 = peça destacada, 2 = seta. */
const pista = ref(0)
const usouPista = ref(false)
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
let ativo = true
onBeforeUnmount(() => {
  ativo = false
  clearTimeout(temporizador)
})
function depois(ms: number, acao: () => void) {
  clearTimeout(temporizador)
  temporizador = setTimeout(acao, ms)
}

/** "1.Qb1", "1...Rd1+": o lance com o número, conforme a vez. */
function rotulo(ply: number, san: string) {
  return `${numeroDoPly(ply)}${corDoPly(ply) === 'w' ? '.' : '...'}${fmtSan(san)}`
}
const plyAtual = computed(() => plyInicial + jogadas.value.length)

/** Sequência jogada no formato "1.Qb1 Kc4 2.Qb4#". */
const sequencia = computed(() =>
  jogadas.value
    .map((lance, i) => {
      const ply = plyInicial + i
      if (corDoPly(ply) === 'w' || i === 0) return rotulo(ply, lance.san)
      return fmtSan(lance.san)
    })
    .join(' '),
)

/** Lances que o usuário ainda tem para dar o mate, contando o da vez. */
const restantes = computed(() => conjunto.lances - Math.ceil(jogadas.value.length / 2))

/** Lance que a pista aponta, buscado quando ela é pedida (no mate longo a busca demora). */
const alvoDaPista = ref<{ from: string; to: string } | null>(null)

const orientacao = computed<'white' | 'black'>(() =>
  config.orientacaoAutomatica && vez === 'b' ? 'black' : 'white',
)
const jogavel = computed(() => !resolvido.value && !aguardando.value && !promocaoPendente.value)
const formas = computed<Forma[]>(() => {
  if (resolvido.value || aguardando.value) return []
  // O tabuleiro devolve o peão enquanto a peça não é escolhida; a seta mostra o lance pendente.
  const pendente = promocaoPendente.value
  if (pendente) return [{ de: pendente.de, para: pendente.para, cor: 'yellow' }]
  const alvo = alvoDaPista.value
  if (pista.value === 0 || !alvo) return []
  if (pista.value >= 2) return [{ de: alvo.from, para: alvo.to, cor: 'green' }]
  return pista.value === 1 ? [{ de: alvo.from, cor: 'yellow' }] : []
})

const nomeDoLado = vez === 'w' ? 'Brancas' : 'Pretas'
const nomeDoAdversario = vez === 'w' ? 'As pretas' : 'As brancas'
/** Lance do adversário como no livro: "…Kg8" quando as pretas jogam. */
const rotuloPrevio = previo ? `${vez === 'w' ? '…' : ''}${fmtSan(previo.san)}` : ''
const prazo = `${conjunto.lances} ${conjunto.lances === 1 ? 'lance' : 'lances'}`
const enunciado = previo
  ? `Depois de ${rotuloPrevio}, ${nomeDoLado.toLowerCase()} dão mate em ${prazo}.`
  : `${nomeDoLado} jogam e dão mate em ${prazo}.`

// Com lance anterior, o diagrama aparece como no livro e o adversário joga logo depois.
if (previo) {
  aguardando.value = true
  depois(TEMPO_PREVIO_MS, () => {
    fen.value = fenInicial
    ultimoLance.value = lanceDeAbertura
    aguardando.value = false
    aviso.value = { tipo: 'neutro', lance: rotuloPrevio, texto: `${nomeDoAdversario} jogaram. Sua vez.` }
  })
}

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

/** Depois de `ms`, volta a tela para a posição do passo atual (desfaz o lance errado). */
function voltarDepois(ms: number) {
  aguardando.value = true
  depois(ms, () => {
    aguardando.value = false
    fen.value = fenDoPasso.value
    const anterior = jogadas.value.at(-1)
    ultimoLance.value = anterior ? [anterior.from, anterior.to] : lanceDeAbertura
    tabuleiro.value?.sincronizar()
  })
}

async function conferir(de: string, para: string, promocao?: PecaPromocao) {
  const lance = verificarLance(fenDoPasso.value, de, para, promocao)
  if (!lance) {
    tabuleiro.value?.sincronizar()
    return
  }
  const ply = plyAtual.value

  if (lance.mate) return concluir(lance)

  if (restantes.value === 1) {
    errar(lance, ply, 'Não é mate. Tente de novo.')
    voltarDepois(TEMPO_DESFAZER_MS)
    return
  }

  // No mate em 4 o livro garante um único primeiro lance; conferir outro levaria minutos.
  if (jogadas.value.length === 0 && conjunto.lances >= 4 && !problema.solucoes.includes(lance.san)) {
    errar(lance, ply, 'Não é a solução: neste exercício só um primeiro lance força o mate. Tente de novo.')
    voltarDepois(TEMPO_DESFAZER_MS)
    return
  }

  // Contra a chave do livro, a defesa já vem calculada; outros lances são analisados agora.
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
    if (!defesa) {
      errar(lance, ply, 'Afoga o rei: não há mate. Tente de novo.')
      voltarDepois(TEMPO_REFUTACAO_MS)
      return
    }
    // Mostra o lance errado e a resposta que escapa do mate, e depois volta.
    errar(lance, ply, `Não força o mate: ${rotulo(ply + 1, defesa.san)} escapa. Tente de novo.`)
    fen.value = lance.fenDepois
    ultimoLance.value = [lance.from, lance.to]
    aguardando.value = true
    depois(TEMPO_DEFESA_MS, () => {
      fen.value = defesa.fenDepois
      ultimoLance.value = [defesa.from, defesa.to]
      voltarDepois(TEMPO_REFUTACAO_MS)
    })
    return
  }

  // Lance certo: o defensor responde com a defesa mais resistente.
  tocar('certo')
  jogadas.value = [...jogadas.value, lance]
  fen.value = lance.fenDepois
  ultimoLance.value = [lance.from, lance.to]
  pista.value = 0
  alvoDaPista.value = null
  aviso.value = { tipo: 'certo', lance: rotulo(ply, lance.san), texto: 'Isso! Veja a defesa.' }
  aguardando.value = true
  const defesa = resposta.lance
  depois(TEMPO_DEFESA_MS, () => {
    jogadas.value = [...jogadas.value, defesa]
    fen.value = defesa.fenDepois
    ultimoLance.value = [defesa.from, defesa.to]
    aguardando.value = false
    aviso.value = {
      tipo: 'neutro',
      lance: rotulo(ply + 1, defesa.san),
      texto:
        restantes.value === 1
          ? `${nomeDoAdversario} se defenderam. Agora dê o mate.`
          : `${nomeDoAdversario} se defenderam. Mate em ${restantes.value} lances.`,
    }
  })
}

function errar(lance: LanceVerificado, ply: number, texto: string) {
  erros.value++
  tocar('errado')
  aviso.value = { tipo: 'errado', lance: rotulo(ply, lance.san), texto }
}

function concluir(lance: LanceVerificado) {
  tocar('certo')
  jogadas.value = [...jogadas.value, lance]
  fen.value = lance.fenDepois
  ultimoLance.value = [lance.from, lance.to]
  resolvido.value = true
  const dePrimeira = erros.value === 0 && !usouPista.value
  estados.value[problema.n] = dePrimeira ? 'primeira' : 'ajuda'
  const chave = jogadas.value[0].san
  const outras = problema.solucoes.filter((san) => san !== chave).map(fmtSan)
  const rotuloOutras = conjunto.lances === 1 ? 'Também dava mate' : 'Outra chave possível'
  aviso.value = {
    tipo: 'certo',
    lance: sequencia.value,
    texto:
      (dePrimeira ? 'Mate! Resolvido de primeira.' : 'Mate!') +
      (outras.length ? ` ${rotuloOutras}: ${outras.join(', ')}.` : ''),
  }
}

async function pedirPista() {
  usouPista.value = true
  if (!alvoDaPista.value) {
    // Primeiro lance: a chave do livro; depois, a busca de um lance que mantém o mate.
    let san: string | undefined = problema.solucoes[0]
    if (jogadas.value.length > 0) {
      aguardando.value = true
      aviso.value = { tipo: 'neutro', texto: 'Procurando a pista…' }
      san = await buscarChave(fenDoPasso.value, restantes.value)
      if (!ativo) return
      aguardando.value = false
    }
    alvoDaPista.value = san ? casasDoLance(fenDoPasso.value, san) : null
  }
  pista.value++
  const texto =
    pista.value === 1
      ? restantes.value > 1
        ? 'A peça destacada faz o próximo lance do mate.'
        : 'A peça destacada dá o mate.'
      : 'Jogue o lance da seta.'
  aviso.value = { tipo: 'neutro', texto }
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

/** A grade mostra 100 problemas por vez, começando pelo bloco do problema atual. */
const blocos = Array.from({ length: Math.ceil(conjunto.problemas.length / POR_BLOCO) }, (_, i) => {
  const lista = conjunto.problemas.slice(i * POR_BLOCO, (i + 1) * POR_BLOCO)
  return { indice: i, rotulo: `${lista[0].n}–${lista.at(-1)!.n}`, problemas: lista }
})
const blocoEscolhido = ref(Math.floor(indice / POR_BLOCO))

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
        <span class="suave"> ({{ indice + 1 }} de {{ conjunto.problemas.length }})</span>
      </p>
      <p class="enunciado">{{ enunciado }}</p>
      <p v-if="problema.partida" class="suave">{{ problema.partida }}</p>
      <p v-if="sequencia && !resolvido" class="sequencia">{{ sequencia }}</p>

      <div v-if="promocaoPendente" class="promocao">
        <span>Promover para:</span>
        <button v-for="opcao in PECAS_PROMOCAO" :key="opcao.peca" type="button" class="botao" @click="promover(opcao.peca)">
          {{ opcao.nome }}
        </button>
        <button type="button" class="botao" @click="promover(null)">Cancelar</button>
      </div>

      <CartaoDica v-if="aviso" :tipo="aviso.tipo" :lance="aviso.lance" :texto="aviso.texto" />

      <div class="acoes">
        <button v-if="!resolvido" type="button" class="botao" :disabled="pista >= 2 || aguardando" @click="pedirPista">
          {{ pista === 0 ? 'Pista: qual peça?' : 'Mostrar o lance' }}
        </button>
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
        <label v-if="blocos.length > 1" class="campo-bloco">
          <span>Problemas</span>
          <select v-model="blocoEscolhido">
            <option v-for="bloco in blocos" :key="bloco.indice" :value="bloco.indice">{{ bloco.rotulo }}</option>
          </select>
        </label>
        <div class="grade-problemas">
          <button
            v-for="p in blocos[blocoEscolhido].problemas"
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
.enunciado,
.sequencia {
  margin: 0;
}
.enunciado {
  font-size: 1.125rem;
}
.sequencia {
  font-weight: 600;
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
.campo-bloco {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.campo-bloco select {
  min-height: 44px;
  font: inherit;
}
.grade-problemas {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(2.75rem, 1fr));
  gap: 0.25rem;
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
