<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { lanceDoComputador, NIVEIS, nivelPorNumero, pararComputador, type LanceUci } from '../lib/adversario'
import { buscarCapitulo } from '../lib/capitulos'
import { baixarTexto } from '../lib/download'
import { ehPromocao, type PecaPromocao } from '../lib/exercicios'
import { fmtLance, fmtSan, fmtTexto } from '../lib/formato'
import { jogoDosLances, pgnDoJogo, situacaoDoJogo } from '../lib/jogo'
import { separarLances, type Cor } from '../lib/lances'
import { progresso } from '../lib/progresso'
import { dataLocal } from '../lib/srs'

const route = useRoute()
const escolhas = progresso.config.jogo

/** Lances até a posição de partida (do Treino ou do Explorar); vazio = posição inicial. */
const inicio = (() => {
  const pedidos = separarLances(String(route.query.c ?? ''))
  try {
    jogoDosLances(pedidos)
    return pedidos
  } catch {
    return []
  }
})()
const capitulo = route.query.cap ? buscarCapitulo(String(route.query.cap)) : undefined
// Vindo do Treino, a cor da linha treinada já vem marcada.
if (route.query.cor === 'w' || route.query.cor === 'b') escolhas.cor = route.query.cor

const fase = ref<'escolha' | 'jogando' | 'fim'>('escolha')
const sans = ref<string[]>([...inicio])
const minhaCor = ref<Cor>('w')
const orientacaoAmigo = ref<'white' | 'black'>('white')
const pensando = ref(false)
const abandono = ref<string | null>(null)
const erroMotor = ref<string | null>(null)
const promocaoPendente = ref<{ de: string; para: string } | null>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
/** Muda a cada lance ou desfazer, para ignorar a resposta atrasada do computador. */
let versao = 0

const contraMotor = computed(() => escolhas.adversario === 'motor')
const nivel = computed(() => nivelPorNumero(escolhas.nivel))
const jogo = computed(() => jogoDosLances(sans.value))
const fen = computed(() => jogo.value.fen())
const situacao = computed(() => situacaoDoJogo(jogo.value))
const vez = computed<Cor>(() => jogo.value.turn())
const orientacao = computed<'white' | 'black'>(() =>
  contraMotor.value ? (minhaCor.value === 'w' ? 'white' : 'black') : orientacaoAmigo.value,
)
const ultimoLance = computed<[string, string] | null>(() => {
  const ultimo = jogo.value.history({ verbose: true }).at(-1)
  return ultimo ? [ultimo.from, ultimo.to] : null
})
const formas = computed<Forma[]>(() => {
  const pendente = promocaoPendente.value
  return pendente ? [{ de: pendente.de, para: pendente.para, cor: 'yellow' }] : []
})
const jogavel = computed(
  () =>
    fase.value === 'jogando' &&
    !situacao.value.fim &&
    !pensando.value &&
    !promocaoPendente.value &&
    (!contraMotor.value || vez.value === minhaCor.value),
)
const nomeDoMotor = computed(() => `Stockfish nível ${nivel.value.nivel} (${nivel.value.nome})`)
const textoInicio = computed(() =>
  inicio.map((san, i) => (i % 2 === 0 ? fmtLance(i + 1, san) : fmtSan(san))).join(' '),
)

function comecar() {
  pararComputador()
  pensando.value = false
  minhaCor.value = escolhas.cor === 'sorteio' ? (Math.random() < 0.5 ? 'w' : 'b') : escolhas.cor
  orientacaoAmigo.value = jogoDosLances(inicio).turn() === 'b' ? 'black' : 'white'
  sans.value = [...inicio]
  abandono.value = null
  erroMotor.value = null
  versao++
  fase.value = 'jogando'
  if (contraMotor.value && vez.value !== minhaCor.value) void vezDoComputador()
}

function fazer(lance: LanceUci): boolean {
  const copia = jogoDosLances(sans.value)
  try {
    const feito = copia.move(lance)
    sans.value = [...sans.value, feito.san]
    versao++
  } catch {
    return false
  }
  if (situacao.value.fim) fase.value = 'fim'
  return true
}

async function vezDoComputador() {
  const minha = versao
  pensando.value = true
  try {
    const lance = await lanceDoComputador(fen.value, nivel.value)
    // Cancelada (desfazer, abandonar, nova partida): quem cancelou já cuidou do estado.
    if (minha !== versao || fase.value !== 'jogando') return
    pensando.value = false
    if (lance) fazer(lance)
  } catch (erro) {
    pensando.value = false
    erroMotor.value = erro instanceof Error ? erro.message : 'O Stockfish não respondeu.'
  }
}

function aoJogar(de: string, para: string) {
  if (ehPromocao(fen.value, de, para)) {
    promocaoPendente.value = { de, para }
    return
  }
  jogar({ from: de, to: para })
}

function jogar(lance: LanceUci) {
  if (!fazer(lance)) {
    tabuleiro.value?.sincronizar()
    return
  }
  if (contraMotor.value && fase.value === 'jogando') void vezDoComputador()
}

const PECAS_PROMOCAO: { peca: PecaPromocao; nome: string }[] = [
  { peca: 'q', nome: 'Dama' },
  { peca: 'r', nome: 'Torre' },
  { peca: 'b', nome: 'Bispo' },
  { peca: 'n', nome: 'Cavalo' },
]

function promover(peca: PecaPromocao | null) {
  const pendente = promocaoPendente.value!
  promocaoPendente.value = null
  if (peca) jogar({ from: pendente.de, to: pendente.para, promotion: peca })
  else tabuleiro.value?.sincronizar()
}

/** Contra o computador, volta até a sua vez (desfaz o seu lance e a resposta dele). */
function desfazer() {
  pararComputador()
  pensando.value = false
  let lista = [...sans.value]
  if (lista.length <= inicio.length) return
  lista.pop()
  if (contraMotor.value) {
    while (lista.length > inicio.length && jogoDosLances(lista).turn() !== minhaCor.value) lista.pop()
    // Antes do primeiro lance seu, o computador joga de novo.
  }
  sans.value = lista
  versao++
  fase.value = 'jogando'
  abandono.value = null
  if (contraMotor.value && vez.value !== minhaCor.value) void vezDoComputador()
}

function abandonar() {
  pararComputador()
  pensando.value = false
  const quem = contraMotor.value ? 'Você abandonou' : `As ${vez.value === 'w' ? 'brancas' : 'pretas'} abandonaram`
  abandono.value = `${quem}.`
  fase.value = 'fim'
}

const resultado = computed(() => {
  if (abandono.value) {
    const perdeu = contraMotor.value ? minhaCor.value : vez.value
    return perdeu === 'w' ? '0-1' : '1-0'
  }
  return situacao.value.resultado
})

const textoFim = computed(() => {
  if (abandono.value) return abandono.value
  if (!contraMotor.value) return situacao.value.texto
  if (resultado.value === '1/2-1/2') return situacao.value.texto
  const venci = (resultado.value === '1-0') === (minhaCor.value === 'w')
  return `${situacao.value.texto} ${venci ? 'Você venceu!' : 'O computador venceu.'}`
})

function exportarPgn() {
  const voce = 'Você'
  const outro = contraMotor.value ? nomeDoMotor.value : 'Amigo'
  const brancas = !contraMotor.value ? 'Brancas' : minhaCor.value === 'w' ? voce : outro
  const pretas = !contraMotor.value ? 'Pretas' : minhaCor.value === 'b' ? voce : outro
  baixarTexto(
    `partida-${dataLocal()}.pgn`,
    pgnDoJogo(sans.value, { brancas, pretas, resultado: resultado.value, data: dataLocal() }),
    'application/x-chess-pgn',
  )
}

onBeforeUnmount(pararComputador)
</script>

<template>
  <div v-if="fase === 'escolha'" class="pagina formulario">
    <RouterLink :to="capitulo ? { name: 'abertura', params: { cap: capitulo.capitulo.id } } : '/'" class="trilha">
      ‹ {{ capitulo ? fmtTexto(capitulo.capitulo.nome) : 'Início' }}
    </RouterLink>
    <h1 class="titulo-pagina">Jogar</h1>
    <p v-if="inicio.length" class="suave">
      A partida começa depois de <span class="lance">{{ textoInicio }}</span>.
    </p>

    <div class="cartao">
      <fieldset class="opcoes">
        <legend>Adversário</legend>
        <label class="marcar"><input v-model="escolhas.adversario" type="radio" value="motor" /> Computador (Stockfish)</label>
        <label class="marcar"><input v-model="escolhas.adversario" type="radio" value="amigo" /> Amigo, neste aparelho</label>
      </fieldset>

      <template v-if="escolhas.adversario === 'motor'">
        <fieldset class="opcoes">
          <legend>Sua cor</legend>
          <label class="marcar"><input v-model="escolhas.cor" type="radio" value="w" /> Brancas</label>
          <label class="marcar"><input v-model="escolhas.cor" type="radio" value="b" /> Pretas</label>
          <label class="marcar"><input v-model="escolhas.cor" type="radio" value="sorteio" /> Sortear</label>
        </fieldset>

        <label class="campo">
          <span>Nível do computador</span>
          <select v-model.number="escolhas.nivel">
            <option v-for="n in NIVEIS" :key="n.nivel" :value="n.nivel">{{ n.nivel }} · {{ n.nome }}</option>
          </select>
          <span class="ajuda">Nos níveis baixos o Stockfish erra de propósito; o 8 é a força máxima deste aparelho.</span>
        </label>
      </template>
      <p v-else class="suave">Vocês dois jogam no mesmo tabuleiro, alternando os lances. Dá para girar o tabuleiro a qualquer momento.</p>
    </div>

    <button type="button" class="botao primario grande largo-celular" @click="comecar">Começar</button>
  </div>

  <div v-else class="tela">
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
      <div class="cabeca-painel">
        <h1 class="titulo-pagina">Jogar</h1>
        <p class="suave">
          <template v-if="contraMotor">Você de {{ minhaCor === 'w' ? 'brancas' : 'pretas' }} contra {{ nomeDoMotor }}</template>
          <template v-else>Amigo, neste aparelho</template>
        </p>
      </div>

      <CartaoDica v-if="fase === 'fim'" tipo="nota">
        <strong>Fim de partida · {{ resultado.replace('1/2-1/2', '½-½') }}</strong>
        <p class="instrucao">{{ textoFim }}</p>
      </CartaoDica>
      <CartaoDica v-else-if="erroMotor" tipo="errado" :texto="erroMotor" />
      <CartaoDica
        v-else
        :texto="pensando ? 'O computador está pensando…' : contraMotor ? (vez === minhaCor ? `Sua vez. ${situacao.texto}` : situacao.texto) : situacao.texto"
      />

      <div v-if="promocaoPendente" class="promocao">
        <span>Promover para:</span>
        <button v-for="opcao in PECAS_PROMOCAO" :key="opcao.peca" type="button" class="botao" @click="promover(opcao.peca)">
          {{ opcao.nome }}
        </button>
        <button type="button" class="botao" @click="promover(null)">Cancelar</button>
      </div>

      <HistoricoLances :lances="sans" :atual="sans.length" />

      <div class="acoes">
        <template v-if="fase === 'jogando'">
          <button type="button" class="botao" :disabled="sans.length <= inicio.length" @click="desfazer">Voltar lance</button>
          <button v-if="!contraMotor" type="button" class="botao" @click="orientacaoAmigo = orientacaoAmigo === 'white' ? 'black' : 'white'">Girar</button>
          <button type="button" class="botao fantasma" @click="abandonar">Abandonar</button>
        </template>
        <template v-else>
          <button type="button" class="botao primario" @click="comecar">Jogar de novo</button>
          <button type="button" class="botao" @click="fase = 'escolha'">Mudar opções</button>
          <button type="button" class="botao" :disabled="sans.length <= inicio.length" @click="desfazer">Voltar lance</button>
          <button type="button" class="botao" @click="exportarPgn">Exportar PGN</button>
          <RouterLink
            v-if="capitulo"
            class="botao fantasma"
            :to="{ name: 'explorar', params: { cap: capitulo.capitulo.id }, query: { c: sans.join(' ') } }"
          >Ver no Explorar</RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formulario {
  display: grid;
  gap: var(--espaco-4);
  align-content: start;
}
.titulo-pagina {
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
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.opcoes {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
.opcoes legend {
  padding: 0;
  font: 600 14px/20px var(--font-texto);
}
.opcoes input[type='radio'] {
  border-radius: 50%;
}
.cabeca-painel p {
  margin: 0;
}
.instrucao {
  margin: 0.25rem 0 0;
}
.promocao,
.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2);
}
</style>
