<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import Avaliacao from '../components/Avaliacao.vue'
import CartaoDica from '../components/CartaoDica.vue'
import PlanoMeioJogo from '../components/PlanoMeioJogo.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { aberturasVizinhas } from '../lib/aberturasVizinhas'
import { buscarCapitulo, obterCapitulos } from '../lib/capitulos'
import {
  buscarLinha,
  corDoCapitulo,
  coresDaEscolha,
  descreverUnidade,
  idsDoEscopo,
  planoDeRevisao,
  proximaLinha,
  unidadesDeRevisao,
  type EscolhaCor,
  type Escopo,
  type PlanoDeRevisao,
} from '../lib/escopo'
import { fmtLance, fmtTexto } from '../lib/formato'
import { carregarMotor, type DadosMotor } from '../lib/motor'
import { somarAtividade } from '../lib/painel'
import { chaveDaNota, lerNota } from '../lib/anotacoes'
import { marcasDoCapitulo } from '../lib/qualidade'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'
import {
  aplicarResultado,
  dataLocal,
  estaPendente,
  filaDoDia,
  idCartao,
  notaDaPartida,
  type UnidadeRevisao,
} from '../lib/srs'
import {
  adiantarPeloJaJogado,
  avancar,
  iniciarPartida,
  lanceEsperado,
  lancesAceitos,
  noAtual,
  sortear,
  terminou,
  vezDoUsuario,
  type Partida,
} from '../lib/treino'
import type { Aresta } from '../lib/arvore'

const route = useRoute()
const capitulo = buscarCapitulo(route.params.cap as string)!
const { arvore } = capitulo
const idCapitulo = capitulo.capitulo.id
const config = progresso.config

/** Marca do MCO no lance, como "7...Nf6!?" no retorno do Treino. */
const marcas = marcasDoCapitulo(capitulo)
const comMarca = (ply: number, aresta: Aresta) => `${fmtLance(ply, aresta.san)}${marcas.get(aresta.id) ?? ''}`

const corEscolhida = computed<EscolhaCor>({
  get: () => corDoCapitulo(capitulo, progresso.corPorCapitulo),
  set: (cor) => {
    progresso.corPorCapitulo[idCapitulo] = cor
  },
})

const OPCOES_DE_COR: { valor: EscolhaCor; nome: string }[] = [
  { valor: 'w', nome: 'Brancas' },
  { valor: 'b', nome: 'Pretas' },
  { valor: 'ambas', nome: 'Ambas' },
]

/** null = espera o usuário tocar em Continuar. */
const TEMPO_DICA_MS = { normal: 2000, longo: 5000, toque: null } as const
const TEMPO_ADVERSARIO_MS = 500
const TEMPO_DESFAZER_MS = 350

type Fase = 'escolha' | 'vazio' | 'jogando' | 'fim-partida'
const fase = ref<Fase>('escolha')
const escolhaEscopo = ref(String(route.query.escopo ?? 'capitulo'))

const escopoEscolhido = computed<Escopo>(() => {
  const [tipo, id] = escolhaEscopo.value.split(':')
  if (tipo === 'grupo') return { tipo: 'grupo', id }
  if (tipo === 'linha') return { tipo: 'linha', id }
  return { tipo: 'capitulo' }
})

// Estado da sessão
let idsNoEscopo = new Set<string>()
/** O que conta como lance do livro nesta partida; na revisão, só a linha revisada. */
let escopoDaPartida = idsNoEscopo
const revisando = ref(false)
const fila = ref<UnidadeRevisao[]>([])
let pesosDeErro = new Map<string, number>()
const revisaoAutomatica = route.query.auto === '1'
/** Caminhos (nós) das partidas já terminadas nesta sessão: a próxima pula o começo repetido. */
let caminhosDaSessao: string[][] = []

function planos(): PlanoDeRevisao[] {
  return planoDeRevisao(
    obterCapitulos(),
    {
      cartoes: progresso.cartoes,
      notasConferidas: progresso.notasConferidas,
      corPorCapitulo: progresso.corPorCapitulo,
      profundidade: config.profundidade,
      novasPorDia: config.novasPorDia,
      repertorio: progresso.repertorio.capitulos,
    },
    dataLocal(),
  )
}

/** Em "Revisar agora", o próximo capítulo com fila depois de terminar este. */
const proximoCapitulo = computed(() =>
  revisaoAutomatica && fila.value.length === 0
    ? planos().find((plano) => plano.capitulo !== capitulo && plano.fila.length > 0)
    : undefined,
)

/** Abertura anterior e seguinte (só as do repertório, se esta estiver nele), para o fim da sessão. */
const vizinhas = aberturasVizinhas(obterCapitulos(), capitulo.capitulo.id, progresso.repertorio.capitulos)

// Estado da partida
const partida = shallowRef<Partida | null>(null)
const placar = ref({ acertos: 0, erros: 0, pistas: 0 })
const nivelPista = ref(0)
const erroNestaJogada = ref(false)
const aguardando = ref(false)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()

interface Aviso {
  tipo: 'certo' | 'errado' | 'neutro'
  lance?: string
  texto?: string | null
  fechavel?: boolean
  /** Nota pessoal do lance (escrita no Estudo ou no Explorar). */
  nota?: string
}
const aviso = ref<Aviso | null>(null)

let temporizador: ReturnType<typeof setTimeout> | undefined
let aoFimDaEspera: (() => void) | null = null

/** Sem tempo (null), a espera só termina quando o usuário toca em Continuar. */
const esperandoToque = ref(false)

function esperar(ms: number | null, depois: () => void) {
  clearTimeout(temporizador)
  aoFimDaEspera = depois
  esperandoToque.value = ms === null
  if (ms !== null) temporizador = setTimeout(pularEspera, ms)
}

function pularEspera() {
  clearTimeout(temporizador)
  esperandoToque.value = false
  const depois = aoFimDaEspera
  aoFimDaEspera = null
  depois?.()
}

onBeforeUnmount(() => {
  clearTimeout(temporizador)
  aoFimDaEspera = null
})

/** Revisão vencida pesa mais; lances em que o usuário erra também puxam a linha. */
function pesoDaLinha(id: string, cor: UnidadeRevisao['cor']): number {
  const cartao = progresso.cartoes[idCartao({ capitulo: idCapitulo, linha: id, cor })]
  return 1 + (estaPendente(cartao, dataLocal()) ? 3 : 0) + (pesosDeErro.get(id) ?? 0)
}

function calcularPesosDeErro(): Map<string, number> {
  const pesos = new Map<string, number>()
  for (const erro of Object.values(progresso.errosPorAresta)) {
    if (erro.capitulo !== idCapitulo) continue
    for (const id of erro.linhas) pesos.set(id, Math.min(3, (pesos.get(id) ?? 0) + erro.erros))
  }
  return pesos
}

function iniciarSessao(livre = false) {
  const hoje = dataLocal()
  caminhosDaSessao = []
  pesosDeErro = calcularPesosDeErro()

  if (revisaoAutomatica && !livre) {
    const revisao = planos().find((plano) => plano.capitulo === capitulo)!
    idsNoEscopo = new Set(revisao.ids)
    fila.value = revisao.fila
  } else {
    const escopo = escopoEscolhido.value
    const ids = idsDoEscopo(capitulo, escopo, config.profundidade, progresso.notasConferidas)
    idsNoEscopo = new Set(ids)
    const unidades = unidadesDeRevisao(capitulo, ids, coresDaEscolha(corEscolhida.value))
    if (livre || escopo.tipo === 'linha') {
      fila.value = unidades
    } else {
      const { pendentes, novas } = filaDoDia(unidades, progresso.cartoes, hoje, config.novasPorDia)
      fila.value = [...pendentes, ...novas]
    }
  }

  if (fila.value.length === 0) fase.value = 'vazio'
  else proximaPartida()
}

/** A unidade sorteada da fila (a partida pode mudar de alvo no caminho, mas é esta que sai da fila ao pular). */
let unidadeSorteada: UnidadeRevisao | null = null
/** A última linha foi pulada: a tela final não mostra placar nem altera a agenda. */
const pulada = ref(false)

function proximaPartida() {
  const unidade = sortear(fila.value, (u) => pesoDaLinha(u.linha, u.cor))
  unidadeSorteada = unidade
  revisando.value = false
  escopoDaPartida = idsNoEscopo
  comecarPartida(unidade.linha, unidade.cor, true)
}

/**
 * Recomeça a linha atual do primeiro lance. Os erros e pistas de antes continuam valendo
 * na nota (senão recomeçar apagaria um erro e a revisão deixaria de cobrar a linha).
 */
function recomecarLinha() {
  clearTimeout(temporizador)
  aoFimDaEspera = null
  esperandoToque.value = false
  const atual = partida.value!
  const { erros, pistas } = placar.value
  // Volta à linha sorteada (a partida pode ter trocado de alvo no caminho).
  const linha = !revisando.value && unidadeSorteada ? unidadeSorteada.linha : atual.alvo
  comecarPartida(linha, atual.cor)
  placar.value = { acertos: 0, erros, pistas }
}

/**
 * Tira a linha da sessão sem nota: o cartão não muda, então ela continua pendente
 * e volta na próxima revisão. Se ainda houver fila, já começa a próxima.
 */
function pularLinha() {
  clearTimeout(temporizador)
  aoFimDaEspera = null
  esperandoToque.value = false
  const sorteada = unidadeSorteada
  if (sorteada) fila.value = fila.value.filter((u) => idCartao(u) !== idCartao(sorteada))
  if (fila.value.length) {
    proximaPartida()
  } else {
    aviso.value = null
    pulada.value = true
    fase.value = 'fim-partida'
  }
}

/** Joga de novo a linha que acabou de terminar, sem afetar a agenda nem a fila. */
function revisarLinha() {
  const { alvo, cor } = partida.value!
  revisando.value = true
  escopoDaPartida = new Set([alvo])
  comecarPartida(alvo, cor)
}

/** `pularRepetido`: começa onde a linha sai das partidas já jogadas nesta sessão. */
function comecarPartida(linha: string, cor: UnidadeRevisao['cor'], pularRepetido = false) {
  const nova = iniciarPartida(arvore, linha, cor)
  partida.value = pularRepetido ? adiantarPeloJaJogado(arvore, nova, caminhosDaSessao) : nova
  placar.value = { acertos: 0, erros: 0, pistas: 0 }
  const pulados = partida.value.jogadas.length
  aviso.value = pulados
    ? { tipo: 'neutro', texto: `Esta variante repete o começo que você acabou de jogar: ela continua a partir do lance ${Math.floor(pulados / 2) + 1}.` }
    : null
  pulada.value = false
  fase.value = 'jogando'
  prepararJogada(0)
}

function prepararJogada(atraso: number | null) {
  const atual = partida.value!
  nivelPista.value = 0
  erroNestaJogada.value = false

  if (terminou(arvore, atual)) {
    aguardando.value = true
    esperar(atraso, finalizarPartida)
  } else if (vezDoUsuario(arvore, atual)) {
    aguardando.value = false
  } else {
    aguardando.value = true
    esperar(atraso === null ? null : Math.max(atraso, TEMPO_ADVERSARIO_MS), () => {
      aviso.value = null
      jogarAdversario()
    })
  }
}

function jogarAdversario() {
  const atual = partida.value!
  const aresta = lanceEsperado(arvore, atual)!
  partida.value = avancar(atual, aresta, escopoDaPartida)
  prepararJogada(0)
}

const esperado = computed(() => (partida.value ? lanceEsperado(arvore, partida.value) : null))
const plyDaJogada = computed(() => (partida.value?.jogadas.length ?? 0) + 1)

const dicaVisivel = (tipo: 'certo' | 'errado') =>
  config.dicasNoTreino === 'sempre' || (tipo === 'errado' && config.dicasNoTreino === 'erro')

function registrarErro(aresta: Aresta) {
  const atual = partida.value!
  const chave = `${idCapitulo}|${aresta.id}`
  const anterior = progresso.errosPorAresta[chave]
  progresso.errosPorAresta[chave] = {
    capitulo: idCapitulo,
    erros: (anterior?.erros ?? 0) + 1,
    caminho: [...atual.jogadas.map((jogada) => jogada.san), aresta.san],
    linhas: aresta.linhas,
    seguidos: 0,
    atualizado: new Date().toISOString(),
  }
}

function aoJogar(de: string, para: string) {
  const atual = partida.value!
  const aceito = lancesAceitos(arvore, atual, escopoDaPartida).find(
    (aresta) => aresta.from === de && aresta.to === para,
  )

  if (!aceito) {
    const certo = esperado.value!
    placar.value.erros++
    erroNestaJogada.value = true
    registrarErro(certo)
    tocar('errado')
    nivelPista.value = 3
    aviso.value = {
      tipo: 'errado',
      lance: comMarca(plyDaJogada.value, certo),
      texto: dicaVisivel('errado') ? certo.dica : null,
      nota: lerNota(chaveDaNota(idCapitulo, certo.id)),
    }
    // Desfaz o lance e espera o usuário jogar o certo, com a seta na tela.
    aguardando.value = true
    esperar(TEMPO_DESFAZER_MS, () => {
      aguardando.value = false
      tabuleiro.value?.sincronizar()
    })
    return
  }

  if (!erroNestaJogada.value && nivelPista.value === 0) placar.value.acertos++
  tocar('certo')

  const ply = plyDaJogada.value
  const nota = lerNota(chaveDaNota(idCapitulo, aceito.id))
  // A nota pessoal também dá tempo de leitura, como a dica.
  const mostrarDica = (dicaVisivel('certo') && !!aceito.dica) || !!nota
  aviso.value = {
    tipo: 'certo',
    lance: comMarca(ply, aceito),
    texto: dicaVisivel('certo') ? aceito.dica : null,
    fechavel: mostrarDica,
    nota,
  }
  partida.value = avancar(atual, aceito, escopoDaPartida, (id) => pesoDaLinha(id, atual.cor))
  prepararJogada(mostrarDica ? TEMPO_DICA_MS[config.tempoDica] : TEMPO_ADVERSARIO_MS)
}

function pedirPista() {
  const certo = esperado.value
  if (!certo || nivelPista.value >= 3) return
  nivelPista.value++
  placar.value.pistas++
  if (nivelPista.value === 2) {
    aviso.value = {
      tipo: 'neutro',
      texto: certo.dica ?? 'Este lance não tem dica. Mais uma pista mostra a seta.',
    }
  }
}

const textoBotaoPista = computed(() =>
  ['Pista: qual peça?', 'Pista: por quê?', 'Pista: mostrar seta', 'Pista'][nivelPista.value],
)

function finalizarPartida() {
  aviso.value = null
  caminhosDaSessao.push(partida.value!.jogadas.map((j) => j.para))
  somarAtividade(progresso.atividade, 'linhas')
  if (!revisando.value) {
    const { alvo, cor } = partida.value!
    const id = idCartao({ capitulo: idCapitulo, linha: alvo, cor })
    const nota = notaDaPartida(placar.value.erros, placar.value.pistas)
    progresso.cartoes[id] = aplicarResultado(progresso.cartoes[id], nota, dataLocal())
    fila.value = fila.value.filter((u) => idCartao(u) !== id)
  }
  fase.value = 'fim-partida'
}

function repetir() {
  iniciarSessao(true)
}

// Tabuleiro
const dadosMotor = shallowRef<DadosMotor | null>(null)
carregarMotor(idCapitulo).then((dados) => (dadosMotor.value = dados))
const noDoTabuleiro = computed(() => (partida.value ? noAtual(arvore, partida.value) : null))
const orientacao = computed<'white' | 'black'>(() =>
  config.orientacaoAutomatica && partida.value?.cor === 'b' ? 'black' : 'white',
)
const ultimoLance = computed<[string, string] | null>(() => {
  const ultima = partida.value?.jogadas.at(-1)
  return ultima ? [ultima.from, ultima.to] : null
})
const jogavel = computed(
  () =>
    fase.value === 'jogando' &&
    !aguardando.value &&
    !!partida.value &&
    vezDoUsuario(arvore, partida.value) &&
    !terminou(arvore, partida.value),
)
const formas = computed<Forma[]>(() => {
  const certo = esperado.value
  if (!certo || !jogavel.value) return []
  if (nivelPista.value >= 3) return [{ de: certo.from, para: certo.to, cor: 'green' }]
  return nivelPista.value >= 1 ? [{ de: certo.from, cor: 'yellow' }] : []
})

/** Linhas abrem no Estudo; notas, que não têm estudo próprio, abrem no Explorar. */
const linkParaRever = computed(() => {
  const atual = partida.value
  if (!atual) return { name: 'inicio' }
  if (buscarLinha(capitulo, atual.alvo)) {
    return { name: 'estudo', params: { cap: idCapitulo, linha: atual.alvo } }
  }
  return {
    name: 'explorar',
    params: { cap: idCapitulo },
    query: { c: atual.jogadas.map((jogada) => jogada.san).join(' ') },
  }
})

const titulo = computed(() =>
  partida.value ? descreverUnidade(capitulo, partida.value.alvo) : null,
)

/** O adversário acabou de entrar numa nota: mostra o comentário dela. */
const notaAoEntrar = computed(() => {
  const atual = partida.value
  return atual?.jogadas.at(-1)?.selos.find((selo) => selo.id === atual.alvo) ?? null
})

/** Tamanho da linha cobrada (em meios-lances), para "lance N de M". */
const totalDaLinha = computed(() => {
  const atual = partida.value
  if (!atual) return 0
  let total = atual.jogadas.length
  let no = noAtual(arvore, atual)
  for (;;) {
    const aresta = no.saidas.find((s) => s.linhas.includes(atual.alvo))
    if (!aresta) break
    total++
    no = arvore.nos.get(aresta.para)!
  }
  return total
})
const progressoDaLinha = computed(() =>
  totalDaLinha.value ? Math.round(((partida.value?.jogadas.length ?? 0) / totalDaLinha.value) * 100) : 0,
)
const voltarPara = { name: 'abertura', params: { cap: idCapitulo } }

const pontos = computed(() =>
  Math.max(0, placar.value.acertos * 2 - placar.value.erros * 2 - placar.value.pistas),
)

/** No fim do treino de uma coluna, a coluna seguinte do capítulo. */
const colunaSeguinte = computed(() => {
  const escopo = escopoEscolhido.value
  return escopo.tipo === 'linha' ? proximaLinha(capitulo, escopo.id) : undefined
})

// "Revisar agora" já sabe a cor de cada capítulo, então começa sem perguntar nada;
// "Coluna seguinte" também já começa direto.
if (revisaoAutomatica || route.query.comecar === '1') iniciarSessao()
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" :to="voltarPara" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>{{ capitulo.capitulo.nome }}</h1>
    <div v-if="fase === 'jogando'" class="placar">
      <span class="acertos">✓ {{ placar.acertos }}</span><span class="erros">✗ {{ placar.erros }}</span>
    </div>
  </header>

  <div v-if="fase === 'escolha'" class="pagina formulario">
    <RouterLink :to="voltarPara" class="trilha so-computador">‹ {{ capitulo.capitulo.nome }}</RouterLink>
    <h1 class="titulo-pagina">Treino</h1>

    <div class="cartao">
      <label class="campo">
        <span>O que treinar</span>
        <select v-model="escolhaEscopo">
          <option value="capitulo">Capítulo inteiro</option>
          <optgroup label="Grupos">
            <option v-for="g in capitulo.capitulo.grupos" :key="g.id" :value="`grupo:${g.id}`">{{ g.nome }}</option>
          </optgroup>
          <optgroup label="Linhas">
            <option v-for="l in capitulo.capitulo.linhas" :key="l.id" :value="`linha:${l.id}`">
              {{ l.coluna === null ? 'Bônus' : `Coluna ${l.coluna}` }} — {{ l.nome }}
            </option>
          </optgroup>
        </select>
      </label>

      <div class="campo" role="group" aria-labelledby="rotulo-cor">
        <span id="rotulo-cor">Sua cor</span>
        <div class="segmentado">
          <button
            v-for="opcao in OPCOES_DE_COR"
            :key="opcao.valor"
            type="button"
            :aria-pressed="corEscolhida === opcao.valor"
            @click="corEscolhida = opcao.valor"
          >{{ opcao.nome }}</button>
        </div>
      </div>

      <details class="recolhivel">
        <summary>Ajustes do treino</summary>
        <div class="ajustes">
          <label class="campo">
            <span>Profundidade</span>
            <select v-model="config.profundidade">
              <option value="colunas">Só colunas</option>
              <option value="notas">Colunas + notas</option>
            </select>
          </label>

          <label class="campo">
            <span>Tempo para ler a dica</span>
            <select v-model="config.tempoDica">
              <option value="normal">Normal (2 segundos)</option>
              <option value="longo">Mais tempo (5 segundos)</option>
              <option value="toque">Até eu tocar para continuar</option>
            </select>
          </label>
        </div>
      </details>
    </div>

    <button type="button" class="botao primario grande largo-celular" @click="iniciarSessao()">Começar</button>
  </div>

  <div v-else-if="fase === 'vazio'" class="pagina formulario">
    <RouterLink :to="voltarPara" class="trilha so-computador">‹ {{ capitulo.capitulo.nome }}</RouterLink>
    <h1 class="titulo-pagina">Nada pendente</h1>
    <p>Não há revisões vencidas nem linhas novas disponíveis hoje neste escopo.</p>
    <div class="acoes">
      <RouterLink
        v-if="proximoCapitulo"
        class="botao primario"
        :to="{ name: 'treino', params: { cap: proximoCapitulo.capitulo.capitulo.id }, query: { auto: '1' } }"
      >Revisar {{ proximoCapitulo.capitulo.capitulo.nome }} ({{ proximoCapitulo.fila.length }})</RouterLink>
      <button type="button" class="botao" :class="{ primario: !proximoCapitulo }" @click="iniciarSessao(true)">Treinar mesmo assim</button>
      <RouterLink class="botao fantasma" to="/">Voltar ao início</RouterLink>
    </div>
    <nav v-if="vizinhas.anterior || vizinhas.proxima" class="outras-aberturas" aria-label="Outras aberturas">
      <RouterLink v-if="vizinhas.anterior" class="botao" :to="{ name: 'treino', params: { cap: vizinhas.anterior.capitulo.id } }">
        ← {{ vizinhas.anterior.capitulo.nome }}
      </RouterLink>
      <RouterLink v-if="vizinhas.proxima" class="botao proxima" :to="{ name: 'treino', params: { cap: vizinhas.proxima.capitulo.id } }">
        {{ vizinhas.proxima.capitulo.nome }} →
      </RouterLink>
    </nav>
  </div>

  <div v-else-if="noDoTabuleiro" class="tela">
    <div v-if="fase === 'jogando'" class="progresso fino linha-progresso so-celular">
      <div class="rotulos">
        <span class="nome-linha">{{ titulo?.titulo }}</span>
        <span>lance <strong>{{ partida?.jogadas.length ?? 0 }}</strong> de {{ totalDaLinha }}</span>
      </div>
      <div class="trilho"><span :style="{ width: `${progressoDaLinha}%` }"></span></div>
    </div>

    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="noDoTabuleiro.fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :formas="formas"
        :avaliacao="noDoTabuleiro ? (dadosMotor?.posicoes[noDoTabuleiro.chave]?.cp ?? null) : null"
        :jogavel="jogavel"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <template v-if="fase === 'jogando'">
        <div class="so-computador cabeca-painel">
          <RouterLink :to="voltarPara" class="trilha">‹ {{ capitulo.capitulo.nome }}</RouterLink>
          <h1 class="titulo-pagina">Treino</h1>
          <p class="apoio suave">
            {{ partida?.cor === 'w' ? 'Você joga de brancas' : 'Você joga de pretas' }}<template v-if="revisando"> · revisão</template>
          </p>
        </div>
        <div class="progresso so-computador">
          <div class="rotulos">
            <span>{{ titulo?.titulo }}</span>
            <span>lance <strong>{{ partida?.jogadas.length ?? 0 }}</strong> de {{ totalDaLinha }}</span>
          </div>
          <div class="trilho"><span :style="{ width: `${progressoDaLinha}%` }"></span></div>
        </div>

        <CartaoDica
          v-if="aviso"
          :tipo="aviso.tipo"
          :lance="aviso.lance"
          :texto="aviso.texto"
          :class="{ tocavel: aviso.fechavel }"
          @click="aviso.fechavel && pularEspera()"
        >
          <p v-if="aviso.nota" class="instrucao minha-nota">Minha nota: {{ aviso.nota }}</p>
          <p v-if="aviso.tipo === 'errado'" class="instrucao">Esse não é o lance do livro. Jogue o lance da seta.</p>
          <button v-if="esperandoToque" type="button" class="botao primario continuar" @click.stop="pularEspera">
            Continuar
          </button>
        </CartaoDica>
        <CartaoDica v-else :texto="jogavel ? 'Sua vez: jogue o lance do livro.' : 'O adversário está jogando…'" />

        <CartaoDica v-if="notaAoEntrar" tipo="nota">
          <strong>Nota {{ notaAoEntrar.rotulo }}</strong>
          <p v-if="notaAoEntrar.comentario" class="instrucao">{{ fmtTexto(notaAoEntrar.comentario) }}</p>
          <p v-if="notaAoEntrar.referencia" class="suave">{{ notaAoEntrar.referencia }}</p>
        </CartaoDica>

        <section class="cartao so-computador">
          <div class="cabeca">
            <h2 class="titulo-item">Lances da linha</h2>
            <div class="placar">
              <span class="acertos">✓ {{ placar.acertos }}</span>
              <span class="erros">✗ {{ placar.erros }}</span>
              <span class="pistas">pistas {{ placar.pistas }}</span>
            </div>
          </div>
          <div v-if="partida?.jogadas.length" class="chips">
            <span
              v-for="(jogada, i) in partida.jogadas"
              :key="i"
              class="chip-lance"
              :class="{ atual: i === partida.jogadas.length - 1 }"
            >{{ fmtLance(i + 1, jogada.san) }}</span>
          </div>
          <p v-else class="apoio suave">Os lances aparecem aqui conforme a partida anda.</p>
        </section>

        <div class="rodape-acoes">
          <button
            type="button"
            class="botao grande largo-celular"
            :disabled="!jogavel || nivelPista >= 3"
            @click="pedirPista"
          >{{ textoBotaoPista }}</button>
          <button
            type="button"
            class="botao fantasma secundaria"
            :disabled="!partida?.jogadas.length"
            title="Volta ao primeiro lance desta linha; os erros de antes continuam contando na nota"
            @click="recomecarLinha"
          >Recomeçar linha</button>
          <button
            v-if="!revisando"
            type="button"
            class="botao fantasma secundaria"
            title="Deixa esta linha para a próxima revisão, sem contar como erro"
            @click="pularLinha"
          >Pular linha</button>
        </div>
        <p class="apoio suave so-celular">Pistas usadas: {{ placar.pistas }}</p>
      </template>

      <template v-else>
        <div class="cabeca-painel">
          <RouterLink :to="voltarPara" class="trilha so-computador">‹ {{ capitulo.capitulo.nome }}</RouterLink>
          <h1 class="titulo-pagina">{{ titulo?.titulo }}</h1>
          <p v-if="titulo?.nome" class="suave">{{ titulo.nome }}</p>
          <p v-if="revisando" class="suave">Revisão: não altera a agenda de repetição.</p>
          <p v-if="pulada" class="suave">Linha pulada: ela continua na fila e volta na próxima revisão.</p>
        </div>

        <dl v-if="!pulada" class="placar-final">
          <div><dt>Acertos</dt><dd class="ok">{{ placar.acertos }}</dd></div>
          <div><dt>Erros</dt><dd class="erro">{{ placar.erros }}</dd></div>
          <div><dt>Pistas</dt><dd class="aviso">{{ placar.pistas }}</dd></div>
          <div><dt>Pontos</dt><dd>{{ pontos }}</dd></div>
        </dl>

        <CartaoDica v-if="titulo?.resumo || titulo?.avaliacao" tipo="nota">
          <p v-if="titulo.resumo" class="instrucao">{{ fmtTexto(titulo.resumo) }}</p>
          <p v-if="titulo.avaliacao" class="instrucao">Avaliação: <Avaliacao :valor="titulo.avaliacao" detalhada /></p>
          <p v-if="titulo.referencia" class="suave">{{ titulo.referencia }}</p>
          <PlanoMeioJogo :plano="titulo.plano" />
        </CartaoDica>

        <!-- Um caminho principal à vista; o resto fica numa lista curta logo abaixo. -->
        <div class="acoes">
          <button v-if="fila.length" type="button" class="botao primario grande largo-celular" @click="proximaPartida">
            {{ escopoEscolhido.tipo === 'linha' ? 'Próxima variante' : 'Próxima' }} ({{ fila.length }})
          </button>
          <template v-else>
            <p class="concluido">✓ Sessão concluída.</p>
            <RouterLink
              v-if="proximoCapitulo"
              class="botao primario grande largo-celular"
              :to="{ name: 'treino', params: { cap: proximoCapitulo.capitulo.capitulo.id }, query: { auto: '1' } }"
            >Revisar {{ proximoCapitulo.capitulo.capitulo.nome }} ({{ proximoCapitulo.fila.length }})</RouterLink>
          </template>
          <RouterLink
            v-if="colunaSeguinte"
            class="botao grande largo-celular"
            :class="{ primario: !fila.length && !proximoCapitulo }"
            :to="{ name: 'treino', params: { cap: idCapitulo }, query: { escopo: `linha:${colunaSeguinte.id}`, comecar: '1' } }"
          >Próxima coluna{{ colunaSeguinte.coluna ? ` (${colunaSeguinte.coluna})` : '' }} →</RouterLink>
        </div>

        <div class="lista mais-opcoes">
          <button type="button" class="linha-lista" @click="revisarLinha">
            <span class="nome">Revisar esta linha</span>
            <span class="meta">Repetir agora, sem mexer na agenda</span>
          </button>
          <RouterLink class="linha-lista" :to="linkParaRever">
            <span class="nome">Rever com dicas</span>
            <span class="meta">Passear pela linha lendo os comentários</span>
          </RouterLink>
          <RouterLink
            v-if="partida"
            class="linha-lista"
            :to="{ name: 'jogar', query: { c: partida.jogadas.map((j) => j.san).join(' '), cor: partida.cor, cap: idCapitulo } }"
          >
            <span class="nome">Jogar daqui</span>
            <span class="meta">Continuar a partida contra o computador</span>
          </RouterLink>
          <button v-if="!fila.length" type="button" class="linha-lista" @click="repetir">
            <span class="nome">Treinar de novo</span>
            <span class="meta">Recomeçar a sessão com o mesmo escopo</span>
          </button>
        </div>
        <nav v-if="!fila.length && (vizinhas.anterior || vizinhas.proxima)" class="outras-aberturas" aria-label="Outras aberturas">
          <RouterLink v-if="vizinhas.anterior" class="botao" :to="{ name: 'treino', params: { cap: vizinhas.anterior.capitulo.id } }">
            ← {{ vizinhas.anterior.capitulo.nome }}
          </RouterLink>
          <RouterLink v-if="vizinhas.proxima" class="botao proxima" :to="{ name: 'treino', params: { cap: vizinhas.proxima.capitulo.id } }">
            {{ vizinhas.proxima.capitulo.nome }} →
          </RouterLink>
        </nav>
      </template>
    </div>
  </div>
</template>

<style scoped>
.minha-nota {
  padding-left: var(--espaco-2);
  border-left: 3px solid var(--aviso);
  white-space: pre-wrap;
}
.formulario {
  display: grid;
  gap: var(--espaco-4);
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
.cabeca-painel {
  display: grid;
  gap: var(--espaco-1);
}
.cabeca-painel p,
.formulario p {
  margin: 0;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
}
.instrucao {
  margin: 0.25rem 0 0;
}
.tocavel {
  cursor: pointer;
}
.continuar {
  margin-top: var(--espaco-3);
}
.linha-progresso {
  padding: 0 var(--espaco-4);
}
.nome-linha {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cartao .titulo-item {
  margin: 0;
}
.rodape-acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
.ajustes {
  display: grid;
  gap: var(--espaco-4);
}
.placar-final {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--espaco-2);
  margin: 0;
  text-align: center;
}
.placar-final div {
  padding: var(--espaco-3) var(--espaco-2);
  border: 1px solid var(--borda);
  border-radius: var(--raio-md);
  background: var(--superficie);
}
.placar-final dt {
  color: var(--texto-suave);
  font-size: 14px;
}
.placar-final dd {
  margin: 0;
  font: 600 28px/34px var(--font-titulo);
  font-variant-numeric: tabular-nums;
}
.placar-final .ok {
  color: var(--ok);
}
.placar-final .erro {
  color: var(--erro);
}
.placar-final .aviso {
  color: var(--aviso);
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2);
}
.outras-aberturas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: var(--espaco-3);
  padding-top: var(--espaco-3);
  border-top: 1px solid var(--borda);
}
.outras-aberturas .proxima {
  margin-left: auto;
}
.concluido {
  width: 100%;
  margin: 0;
  color: var(--ok);
  font-weight: 600;
}
@media (max-width: 799.98px) {
  .so-computador {
    display: none;
  }
  .largo-celular {
    width: 100%;
  }
  /* Debaixo do tabuleiro: a pista em cima, as duas saídas lado a lado. */
  .rodape-acoes > .secundaria {
    flex: 1 1 0;
  }
}
@media (min-width: 800px) {
  .so-celular {
    display: none;
  }
}
</style>
