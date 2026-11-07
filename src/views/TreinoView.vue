<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import Avaliacao from '../components/Avaliacao.vue'
import CartaoDica from '../components/CartaoDica.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { buscarCapitulo, obterCapitulos } from '../lib/capitulos'
import {
  buscarLinha,
  corDoCapitulo,
  coresDaEscolha,
  descreverUnidade,
  idsDoEscopo,
  planoDeRevisao,
  unidadesDeRevisao,
  type EscolhaCor,
  type Escopo,
  type PlanoDeRevisao,
} from '../lib/escopo'
import { fmtLance, fmtTexto } from '../lib/formato'
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

const corEscolhida = computed<EscolhaCor>({
  get: () => corDoCapitulo(capitulo, progresso.corPorCapitulo),
  set: (cor) => {
    progresso.corPorCapitulo[idCapitulo] = cor
  },
})

const TEMPO_DICA_MS = 2000
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

function planos(): PlanoDeRevisao[] {
  return planoDeRevisao(
    obterCapitulos(),
    {
      cartoes: progresso.cartoes,
      notasConferidas: progresso.notasConferidas,
      corPorCapitulo: progresso.corPorCapitulo,
      profundidade: config.profundidade,
      novasPorDia: config.novasPorDia,
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
}
const aviso = ref<Aviso | null>(null)

let temporizador: ReturnType<typeof setTimeout> | undefined
let aoFimDaEspera: (() => void) | null = null

function esperar(ms: number, depois: () => void) {
  clearTimeout(temporizador)
  aoFimDaEspera = depois
  temporizador = setTimeout(pularEspera, ms)
}

function pularEspera() {
  clearTimeout(temporizador)
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

function proximaPartida() {
  const unidade = sortear(fila.value, (u) => pesoDaLinha(u.linha, u.cor))
  revisando.value = false
  escopoDaPartida = idsNoEscopo
  comecarPartida(unidade.linha, unidade.cor)
}

/** Joga de novo a linha que acabou de terminar, sem afetar a agenda nem a fila. */
function revisarLinha() {
  const { alvo, cor } = partida.value!
  revisando.value = true
  escopoDaPartida = new Set([alvo])
  comecarPartida(alvo, cor)
}

function comecarPartida(linha: string, cor: UnidadeRevisao['cor']) {
  partida.value = iniciarPartida(arvore, linha, cor)
  placar.value = { acertos: 0, erros: 0, pistas: 0 }
  aviso.value = null
  fase.value = 'jogando'
  prepararJogada(0)
}

function prepararJogada(atraso: number) {
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
    esperar(Math.max(atraso, TEMPO_ADVERSARIO_MS), () => {
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
      lance: fmtLance(plyDaJogada.value, certo.san),
      texto: dicaVisivel('errado') ? certo.dica : null,
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
  const mostrarDica = dicaVisivel('certo') && !!aceito.dica
  aviso.value = {
    tipo: 'certo',
    lance: fmtLance(ply, aceito.san),
    texto: mostrarDica ? aceito.dica : null,
    fechavel: mostrarDica,
  }
  partida.value = avancar(atual, aceito, escopoDaPartida, (id) => pesoDaLinha(id, atual.cor))
  prepararJogada(mostrarDica ? TEMPO_DICA_MS : TEMPO_ADVERSARIO_MS)
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

const pontos = computed(() =>
  Math.max(0, placar.value.acertos * 2 - placar.value.erros * 2 - placar.value.pistas),
)

// "Revisar agora" já sabe a cor de cada capítulo, então começa sem perguntar nada.
if (revisaoAutomatica) iniciarSessao()
</script>

<template>
  <div v-if="fase === 'escolha'" class="pagina formulario">
    <h1>Treino — {{ capitulo.capitulo.nome }}</h1>

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

    <label class="campo">
      <span>Sua cor</span>
      <select v-model="corEscolhida">
        <option value="w">Brancas</option>
        <option value="b">Pretas</option>
        <option value="ambas">Ambas</option>
      </select>
    </label>

    <label class="campo">
      <span>Profundidade</span>
      <select v-model="config.profundidade">
        <option value="colunas">Só colunas</option>
        <option value="notas">Colunas + notas</option>
      </select>
    </label>

    <button type="button" class="botao primario" @click="iniciarSessao()">Começar</button>
  </div>

  <div v-else-if="fase === 'vazio'" class="pagina">
    <h1>Nada pendente</h1>
    <p>Não há revisões vencidas nem linhas novas disponíveis hoje neste escopo.</p>
    <div class="acoes">
      <RouterLink
        v-if="proximoCapitulo"
        class="botao primario"
        :to="{ name: 'treino', params: { cap: proximoCapitulo.capitulo.capitulo.id }, query: { auto: '1' } }"
      >Revisar {{ proximoCapitulo.capitulo.capitulo.nome }} ({{ proximoCapitulo.fila.length }})</RouterLink>
      <button type="button" class="botao primario" @click="iniciarSessao(true)">Treinar mesmo assim</button>
      <RouterLink class="botao" to="/">Voltar ao início</RouterLink>
    </div>
  </div>

  <div v-else-if="noDoTabuleiro" class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="noDoTabuleiro.fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :formas="formas"
        :jogavel="jogavel"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <template v-if="fase === 'jogando'">
        <p class="situacao">
          <strong>{{ titulo?.titulo }}</strong> ·
          {{ partida?.cor === 'w' ? 'você joga de brancas' : 'você joga de pretas' }}
          <template v-if="revisando"> · revisão</template>
        </p>

        <CartaoDica
          v-if="aviso"
          :tipo="aviso.tipo"
          :lance="aviso.lance"
          :texto="aviso.texto"
          :class="{ tocavel: aviso.fechavel }"
          @click="aviso.fechavel && pularEspera()"
        >
          <p v-if="aviso.tipo === 'errado'" class="instrucao">Esse não é o lance do livro. Jogue o lance da seta.</p>
        </CartaoDica>
        <p v-else class="suave">
          {{ jogavel ? 'Sua vez.' : 'O adversário está jogando…' }}
        </p>

        <CartaoDica v-if="notaAoEntrar" tipo="nota">
          <strong>Nota {{ notaAoEntrar.rotulo }}</strong>
          <p v-if="notaAoEntrar.comentario" class="instrucao">{{ fmtTexto(notaAoEntrar.comentario) }}</p>
          <p v-if="notaAoEntrar.referencia" class="suave">{{ notaAoEntrar.referencia }}</p>
        </CartaoDica>

        <button
          type="button"
          class="botao"
          :disabled="!jogavel || nivelPista >= 3"
          @click="pedirPista"
        >{{ textoBotaoPista }}</button>

        <p class="placar-linha">
          ✓ {{ placar.acertos }} · ✗ {{ placar.erros }} · pistas {{ placar.pistas }}
        </p>
      </template>

      <template v-else>
        <h1>{{ titulo?.titulo }}</h1>
        <p v-if="titulo?.nome" class="suave">{{ titulo.nome }}</p>
        <p v-if="revisando" class="suave">Revisão: não altera a agenda de repetição.</p>

        <dl class="placar">
          <div><dt>Acertos</dt><dd>{{ placar.acertos }}</dd></div>
          <div><dt>Erros</dt><dd>{{ placar.erros }}</dd></div>
          <div><dt>Pistas</dt><dd>{{ placar.pistas }}</dd></div>
          <div><dt>Pontos</dt><dd>{{ pontos }}</dd></div>
        </dl>

        <CartaoDica v-if="titulo?.resumo || titulo?.avaliacao" tipo="nota">
          <p v-if="titulo.resumo" class="instrucao">{{ fmtTexto(titulo.resumo) }}</p>
          <p v-if="titulo.avaliacao" class="instrucao">Avaliação: <Avaliacao :valor="titulo.avaliacao" detalhada /></p>
          <p v-if="titulo.referencia" class="suave">{{ titulo.referencia }}</p>
        </CartaoDica>

        <div class="acoes">
          <button type="button" class="botao" @click="revisarLinha">Revisar esta linha</button>
          <RouterLink class="botao" :to="linkParaRever">Rever com dicas</RouterLink>
          <button v-if="fila.length" type="button" class="botao primario" @click="proximaPartida">
            Próxima ({{ fila.length }})
          </button>
          <template v-else>
            <p class="concluido">Sessão concluída.</p>
            <RouterLink
              v-if="proximoCapitulo"
              class="botao primario"
              :to="{ name: 'treino', params: { cap: proximoCapitulo.capitulo.capitulo.id }, query: { auto: '1' } }"
            >Revisar {{ proximoCapitulo.capitulo.capitulo.nome }} ({{ proximoCapitulo.fila.length }})</RouterLink>
            <button type="button" class="botao" @click="repetir">Treinar de novo</button>
          </template>
          <RouterLink class="botao" to="/">Início</RouterLink>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.formulario {
  display: grid;
  gap: 1rem;
}
h1 {
  margin: 0;
  font-size: 1.25rem;
}
.situacao {
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
.placar-linha {
  margin: 0;
  color: var(--texto-suave);
  font-variant-numeric: tabular-nums;
}
.placar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin: 0;
  text-align: center;
}
.placar div {
  padding: 0.5rem;
  border: 1px solid var(--borda);
  border-radius: 8px;
}
.placar dt {
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.placar dd {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
.concluido {
  width: 100%;
  margin: 0;
  color: var(--ok);
}
</style>
