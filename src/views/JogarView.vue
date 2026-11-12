<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import SeloQualidade from '../components/SeloQualidade.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { lanceDoComputador, NIVEIS, nivelPorNumero, pararComputador, type LanceUci } from '../lib/adversario'
import { avaliarPosicao, type Avaliacao } from '../lib/avaliador'
import { buscarCapitulo, obterCapitulos } from '../lib/capitulos'
import { baixarTexto } from '../lib/download'
import { ehPromocao, type PecaPromocao } from '../lib/exercicios'
import { fmtLance, fmtSan, fmtTexto } from '../lib/formato'
import { jogoDosLances, pgnDoJogo, situacaoDoJogo } from '../lib/jogo'
import { separarLances, type Cor } from '../lib/lances'
import { progresso } from '../lib/progresso'
import { aposLance, formatarRelogio, relogioInicial, semMaterialParaMate, tempoPorId, TEMPOS, type Restante } from '../lib/relogio'
import { classificarLance, marcaNaSequencia, type MarcaLivro, type QualidadeMotor } from '../lib/qualidade'
import { Chess } from 'chess.js'
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

// ---------- Relógio (só no modo Partida) ----------
const relogioAtivo = ref(false)
const tempo = computed(() => tempoPorId(escolhas.tempo))
const restante = ref<Restante>({ w: 0, b: 0 })
const agora = ref(0)
const tempoEsgotado = ref<Cor | null>(null)
let turnoDesde = 0
let tiquetaque: ReturnType<typeof setInterval> | undefined

/** Como nos apps, o relógio só começa a correr depois do primeiro lance da partida. */
const relogioCorrendo = computed(() => relogioAtivo.value && fase.value === 'jogando' && sans.value.length > inicio.length)

/** Tempo na tela: o de quem está na vez desconta o que já passou neste lance. */
function mostrado(cor: Cor): number {
  const correndo = relogioCorrendo.value && vez.value === cor
  return correndo ? restante.value[cor] - (agora.value - turnoDesde) : restante.value[cor]
}

function ligarRelogio() {
  pararRelogio()
  turnoDesde = agora.value = performance.now()
  tiquetaque = setInterval(() => {
    agora.value = performance.now()
    if (relogioCorrendo.value && mostrado(vez.value) <= 0) esgotar(vez.value)
  }, 100)
}

function pararRelogio() {
  clearInterval(tiquetaque)
  tiquetaque = undefined
}

function esgotar(cor: Cor) {
  pararRelogio()
  pararComputador()
  pensando.value = false
  restante.value = { ...restante.value, [cor]: 0 }
  tempoEsgotado.value = cor
  fase.value = 'fim'
}

/** Desconta o tempo de quem acabou de jogar (chamado antes de o lance entrar). */
function marcarLanceNoRelogio(quemJogou: Cor) {
  if (!relogioAtivo.value) return
  const instante = performance.now()
  // O primeiro lance só dispara o relógio: nada é descontado nem somado.
  if (sans.value.length > inicio.length) restante.value = aposLance(restante.value, quemJogou, instante - turnoDesde, tempo.value)
  turnoDesde = agora.value = instante
}

const nomeNoRelogio = (cor: Cor) =>
  contraMotor.value ? (cor === minhaCor.value ? 'Você' : 'Stockfish') : cor === 'w' ? 'Brancas' : 'Pretas'
/** Relógio de cima e de baixo, conforme a orientação do tabuleiro. */
const corEmCima = computed<Cor>(() => (orientacao.value === 'white' ? 'b' : 'w'))
const corEmBaixo = computed<Cor>(() => (corEmCima.value === 'w' ? 'b' : 'w'))

// ---------- Modo treino: voltar lance, dica e qualidade de cada lance ----------
/** Fixado ao começar: a partida comum não volta lance, não dá dica nem classifica. */
const treinoAtivo = ref(false)
const PROFUNDIDADE_TREINO = 12
const avaliacoes = new Map<string, Promise<Avaliacao>>()
const avaliar = (fenPosicao: string) => {
  let pedido = avaliacoes.get(fenPosicao)
  if (!pedido) avaliacoes.set(fenPosicao, (pedido = avaliarPosicao(fenPosicao, PROFUNDIDADE_TREINO)))
  return pedido
}
/** Qualidade por lance (chave = ply do lance, 1 = 1.e4); `null` = ainda avaliando. */
const qualidades = ref<Record<number, { marca: MarcaLivro | null; motor: QualidadeMotor | null } | null>>({})
const nivelDica = ref(0)
const dicaLance = ref<{ from: string; to: string } | null>(null)
const carregandoDica = ref(false)

const SIMBOLO_MOTOR = { imprecisao: '?!', erro: '?', grave: '??' } as const
/** Histórico com as marcas dos lances já avaliados (MCO ou ?!/?/?? do motor). */
const sansMarcados = computed(() =>
  sans.value.map((san, i) => {
    const q = qualidades.value[i + 1]
    const classe = q?.motor?.classe
    const doMotor = classe === 'imprecisao' || classe === 'erro' || classe === 'grave' ? SIMBOLO_MOTOR[classe] : ''
    return `${san}${q?.marca ?? doMotor}`
  }),
)
/** O último lance avaliado (o seu, contra o computador). */
const ultimaAvaliada = computed(() => {
  const plys = Object.keys(qualidades.value).map(Number).sort((a, b) => b - a)
  const ply = plys[0]
  return ply ? { ply, san: sans.value[ply - 1], qualidade: qualidades.value[ply] } : null
})

function sanDoUci(fenPosicao: string, uci: string | null): string | null {
  if (!uci) return null
  try {
    return new Chess(fenPosicao).move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] }).san
  } catch {
    return null
  }
}

/** Valor fixo de fim de jogo (mate/empate) ou null para perguntar ao motor. */
function valorDoFim(fenPosicao: string): number | null {
  const j = new Chess(fenPosicao)
  if (j.isCheckmate()) return j.turn() === 'w' ? -20000 : 20000
  if (j.isDraw()) return 0
  return null
}

async function avaliarLance(ply: number, fenAntes: string, fenDepois: string, san: string) {
  qualidades.value = { ...qualidades.value, [ply]: null }
  const marca = marcaNaSequencia(sans.value.slice(0, ply), obterCapitulos(), capitulo)
  try {
    const antes = await avaliar(fenAntes)
    const depois = valorDoFim(fenDepois) ?? (await avaliar(fenDepois)).cp
    if (sans.value[ply - 1] !== san) return
    const motor =
      antes.cp !== null && depois !== null
        ? classificarLance(antes.cp, depois, fenAntes.split(' ')[1] === 'w', sanDoUci(fenAntes, antes.melhor), san)
        : null
    qualidades.value = { ...qualidades.value, [ply]: { marca, motor } }
  } catch {
    if (sans.value[ply - 1] === san) qualidades.value = { ...qualidades.value, [ply]: { marca, motor: null } }
  }
}

/** 1º toque: qual peça mexer; 2º: a seta do melhor lance (Stockfish). */
async function pedirDica() {
  if (nivelDica.value === 0) {
    carregandoDica.value = true
    const minha = versao
    try {
      const { melhor } = await avaliar(fen.value)
      if (minha !== versao || !melhor) return
      dicaLance.value = { from: melhor.slice(0, 2), to: melhor.slice(2, 4) }
      nivelDica.value = 1
    } finally {
      carregandoDica.value = false
    }
  } else if (nivelDica.value === 1) nivelDica.value = 2
}

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
  if (pendente) return [{ de: pendente.de, para: pendente.para, cor: 'yellow' }]
  const dica = dicaLance.value
  if (dica && jogavel.value && nivelDica.value === 1) return [{ de: dica.from, cor: 'yellow' }]
  if (dica && jogavel.value && nivelDica.value === 2) return [{ de: dica.from, para: dica.to, cor: 'green' }]
  return []
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
  treinoAtivo.value = escolhas.modo === 'treino'
  relogioAtivo.value = !treinoAtivo.value && tempo.value.minutos > 0
  restante.value = relogioInicial(tempo.value)
  tempoEsgotado.value = null
  qualidades.value = {}
  nivelDica.value = 0
  dicaLance.value = null
  versao++
  fase.value = 'jogando'
  if (relogioAtivo.value) ligarRelogio()
  else pararRelogio()
  if (contraMotor.value && vez.value !== minhaCor.value) void vezDoComputador()
}

function fazer(lance: LanceUci): boolean {
  const copia = jogoDosLances(sans.value)
  const quemJoga = copia.turn()
  try {
    const feito = copia.move(lance)
    marcarLanceNoRelogio(quemJoga)
    sans.value = [...sans.value, feito.san]
    versao++
    nivelDica.value = 0
    dicaLance.value = null
  } catch {
    return false
  }
  if (situacao.value.fim) {
    fase.value = 'fim'
    pararRelogio()
  }
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
  const fenAntes = fen.value
  if (!fazer(lance)) {
    tabuleiro.value?.sincronizar()
    return
  }
  // No modo treino, cada lance de quem joga no tabuleiro ganha a avaliação logo depois.
  if (treinoAtivo.value) void avaliarLance(sans.value.length, fenAntes, fen.value, sans.value.at(-1)!)
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
  if (!treinoAtivo.value) return
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
  nivelDica.value = 0
  dicaLance.value = null
  qualidades.value = Object.fromEntries(Object.entries(qualidades.value).filter(([ply]) => Number(ply) <= lista.length))
  fase.value = 'jogando'
  abandono.value = null
  if (contraMotor.value && vez.value !== minhaCor.value) void vezDoComputador()
}

function abandonar() {
  pararRelogio()
  pararComputador()
  pensando.value = false
  const quem = contraMotor.value ? 'Você abandonou' : `As ${vez.value === 'w' ? 'brancas' : 'pretas'} abandonaram`
  abandono.value = `${quem}.`
  fase.value = 'fim'
}

/** Acabou o tempo: perde quem ficou sem tempo, a não ser que o outro não tenha como dar mate. */
const empateSemMaterial = computed(() => tempoEsgotado.value !== null && semMaterialParaMate(fen.value, tempoEsgotado.value === 'w' ? 'b' : 'w'))

const resultado = computed(() => {
  if (tempoEsgotado.value) return empateSemMaterial.value ? '1/2-1/2' : tempoEsgotado.value === 'w' ? '0-1' : '1-0'
  if (abandono.value) {
    const perdeu = contraMotor.value ? minhaCor.value : vez.value
    return perdeu === 'w' ? '0-1' : '1-0'
  }
  return situacao.value.resultado
})

const textoFim = computed(() => {
  if (tempoEsgotado.value) {
    const cor = tempoEsgotado.value === 'w' ? 'brancas' : 'pretas'
    const acabou = !contraMotor.value ? `O tempo das ${cor} acabou` : tempoEsgotado.value === minhaCor.value ? 'Seu tempo acabou' : 'O tempo do computador acabou'
    if (empateSemMaterial.value) return `${acabou}, mas o outro lado não tem material para dar mate. Empate.`
    if (!contraMotor.value) return `Acabou o tempo das ${tempoEsgotado.value === 'w' ? 'brancas' : 'pretas'}.`
    return tempoEsgotado.value === minhaCor.value ? 'Seu tempo acabou. O computador venceu.' : 'O tempo do computador acabou. Você venceu!'
  }
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

onBeforeUnmount(() => {
  pararComputador()
  pararRelogio()
})
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

      <fieldset class="opcoes">
        <legend>Modo</legend>
        <label class="marcar">
          <input v-model="escolhas.modo" type="radio" value="partida" />
          Partida: sem voltar lance e sem dicas; a avaliação dos lances fica para a análise no fim
        </label>
        <label class="marcar">
          <input v-model="escolhas.modo" type="radio" value="treino" />
          Treino: pode voltar lance, pedir dica e ver a qualidade de cada lance logo depois de jogar
        </label>
      </fieldset>

      <label v-if="escolhas.modo === 'partida'" class="campo">
        <span>Tempo</span>
        <select v-model="escolhas.tempo">
          <option v-for="t in TEMPOS" :key="t.id" :value="t.id">
            {{ t.minutos ? `${t.id} · ${t.ritmo}` : t.ritmo }}
          </option>
        </select>
        <span class="ajuda">Minutos de cada jogador + segundos ganhos a cada lance. No modo Treino não há relógio.</span>
      </label>

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
      <div v-if="relogioAtivo" class="relogio" :class="{ ativo: relogioCorrendo && vez === corEmCima, pouco: mostrado(corEmCima) < 20_000 }">
        <span class="nome">{{ nomeNoRelogio(corEmCima) }}</span>
        <span class="tempo" role="timer">{{ formatarRelogio(mostrado(corEmCima)) }}</span>
      </div>
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :formas="formas"
        :jogavel="jogavel"
        @lance="aoJogar"
      />
      <div v-if="relogioAtivo" class="relogio" :class="{ ativo: relogioCorrendo && vez === corEmBaixo, pouco: mostrado(corEmBaixo) < 20_000 }">
        <span class="nome">{{ nomeNoRelogio(corEmBaixo) }}</span>
        <span class="tempo" role="timer">{{ formatarRelogio(mostrado(corEmBaixo)) }}</span>
      </div>
    </div>

    <div class="painel">
      <div class="cabeca-painel">
        <h1 class="titulo-pagina">Jogar</h1>
        <p class="suave">
          <template v-if="contraMotor">Você de {{ minhaCor === 'w' ? 'brancas' : 'pretas' }} contra {{ nomeDoMotor }}</template>
          <template v-else>Amigo, neste aparelho</template>
          · {{ treinoAtivo ? 'modo treino' : relogioAtivo ? tempo.id : 'partida sem relógio' }}
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

      <div v-if="treinoAtivo && ultimaAvaliada" class="avaliacao-lance">
        <span class="lance">{{ fmtLance(ultimaAvaliada.ply, ultimaAvaliada.san) }}</span>
        <span v-if="!ultimaAvaliada.qualidade" class="suave">avaliando…</span>
        <SeloQualidade v-else :marca="ultimaAvaliada.qualidade.marca" :motor="ultimaAvaliada.qualidade.motor" />
      </div>

      <HistoricoLances :lances="treinoAtivo ? sansMarcados : sans" :atual="sans.length" />

      <div class="acoes">
        <template v-if="fase === 'jogando'">
          <template v-if="treinoAtivo">
            <button type="button" class="botao" :disabled="!jogavel || nivelDica >= 2 || carregandoDica" @click="pedirDica">
              {{ carregandoDica ? 'Pensando…' : nivelDica === 0 ? 'Dica: qual peça?' : 'Dica: mostrar o lance' }}
            </button>
            <button type="button" class="botao" :disabled="sans.length <= inicio.length" @click="desfazer">Voltar lance</button>
          </template>
          <button v-if="!contraMotor" type="button" class="botao" @click="orientacaoAmigo = orientacaoAmigo === 'white' ? 'black' : 'white'">Girar</button>
          <button type="button" class="botao fantasma" @click="abandonar">Abandonar</button>
        </template>
        <template v-else>
          <button type="button" class="botao primario" @click="comecar">Jogar de novo</button>
          <button type="button" class="botao" @click="fase = 'escolha'">Mudar opções</button>
          <button v-if="treinoAtivo" type="button" class="botao" :disabled="sans.length <= inicio.length" @click="desfazer">Voltar lance</button>
          <RouterLink
            v-if="sans.length > inicio.length"
            class="botao"
            :to="{ name: 'analise', query: { c: sans.join(' '), cor: contraMotor ? minhaCor : undefined, titulo: 'Análise da partida', volta: '/jogar' } }"
          >Analisar partida</RouterLink>
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
.relogio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-2);
  margin: var(--espaco-1) 0;
  padding: 2px var(--espaco-3);
  border-radius: var(--raio-md);
  background: var(--superficie-2);
  color: var(--texto-suave);
}
.relogio .tempo {
  font: 600 24px/32px var(--font-texto);
  font-variant-numeric: tabular-nums;
}
.relogio.ativo {
  background: var(--destaque);
  color: var(--sobre-destaque);
}
.relogio.pouco .tempo {
  color: var(--erro);
}
.relogio.ativo.pouco {
  background: var(--erro);
}
.relogio.ativo.pouco .tempo {
  color: var(--sobre-destaque);
}
.avaliacao-lance {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--espaco-2);
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
