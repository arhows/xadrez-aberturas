<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CartaoDica from '../components/CartaoDica.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import {
  buscarConjunto,
  casasDoLance,
  ehPromocao,
  jogarSan,
  obterConjuntos,
  verificarLance,
  vezDoProblema,
  type LanceVerificado,
  type PecaPromocao,
  type Problema,
} from '../lib/exercicios'
import { fmtSan } from '../lib/formato'
import { corDoPly, numeroDoPly } from '../lib/lances'
import { somarAtividade } from '../lib/painel'
import { AUTORES_DOS_LIVROS, conferirLanceTatico, EXPLICACOES, NOMES_DAS_FAIXAS } from '../lib/problemasTaticos'
import { progresso } from '../lib/progresso'
import { notaDoExercicio, registrarResultado, revisoesPendentes } from '../lib/revisaoExercicios'
import { tocar } from '../lib/som'

/** Problemas táticos do lichess por tema: lance do adversário, depois a combinação inteira. */

const TEMPO_PREVIO_MS = 900
const TEMPO_RESPOSTA_MS = 600
const TEMPO_DESFAZER_MS = 700
type Faixa = NonNullable<Problema['faixa']>
const FAIXAS: Faixa[] = ['facil', 'medio', 'dificil']

const route = useRoute()
const router = useRouter()
const conjunto = buscarConjunto(route.params.conjunto as string)!
const config = progresso.config
progresso.exercicios[conjunto.id] ??= {}
progresso.ultimoConjunto = conjunto.id
const estados = computed(() => progresso.exercicios[conjunto.id] ?? {})

/** Faixa escolhida (na URL); sem ela, a do problema pedido ou a fácil. */
const faixaPedida = (FAIXAS as string[]).includes(String(route.query.faixa)) ? (route.query.faixa as Faixa) : null
/** Conjuntos de livro (Koblenz) não têm faixas de dificuldade: todos os problemas juntos. */
const temFaixas = conjunto.problemas.some((p) => p.faixa)
const problema: Problema = (() => {
  const pedido = conjunto.problemas.find((p) => p.n === Number(route.query.n))
  if (pedido) return pedido
  const daFaixa = temFaixas ? conjunto.problemas.filter((p) => p.faixa === (faixaPedida ?? 'facil')) : conjunto.problemas
  return daFaixa.find((p) => estados.value[p.n] !== 'primeira') ?? daFaixa[0] ?? conjunto.problemas[0]
})()
const faixa = ref<Faixa>(problema.faixa ?? 'facil')
const daFaixa = computed(() => (temFaixas ? conjunto.problemas.filter((p) => p.faixa === faixa.value) : conjunto.problemas))

const refazendo = route.query.refazer !== undefined
const revisando = route.query.revisao === '1'
const vez = vezDoProblema(problema)
/** Lance do adversário que cria o problema; sem ele, o problema começa direto na posição. */
const previo = problema.previo ? jogarSan(problema.fen, problema.previo) : null
const fenDeInicio = previo?.fenDepois ?? problema.fen
const linha = problema.linha ?? []
const plyInicial = (() => {
  const [, lado, , , , numero] = fenDeInicio.split(' ')
  return ((Number(numero) || 1) - 1) * 2 + (lado === 'b' ? 2 : 1)
})()

const jogadas = ref<LanceVerificado[]>([])
const fenDoPasso = computed(() => jogadas.value.at(-1)?.fenDepois ?? fenDeInicio)
const fen = ref(problema.fen)
const ultimoLance = ref<[string, string] | null>(null)
const resolvido = ref(false)
const erros = ref(0)
const pista = ref(0)
const usouPista = ref(false)
const aguardando = ref(!!previo)
const promocaoPendente = ref<{ de: string; para: string } | null>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
const aviso = ref<{ tipo: 'certo' | 'errado' | 'neutro'; lance?: string; texto?: string } | null>(null)

let temporizador: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(temporizador))
function depois(ms: number, acao: () => void) {
  clearTimeout(temporizador)
  temporizador = setTimeout(acao, ms)
}

const rotulo = (ply: number, san: string) => `${numeroDoPly(ply)}${corDoPly(ply) === 'w' ? '.' : '...'}${fmtSan(san)}`
const nomeDoLado = vez === 'w' ? 'brancas' : 'pretas'
const nomeDoAdversario = vez === 'w' ? 'As pretas' : 'As brancas'
const orientacao = computed<'white' | 'black'>(() => (config.orientacaoAutomatica && vez === 'b' ? 'black' : 'white'))
const jogavel = computed(() => !resolvido.value && !aguardando.value && !promocaoPendente.value)

// O adversário joga o lance que cria a combinação; depois é a vez da pessoa.
if (previo) {
  depois(TEMPO_PREVIO_MS, () => {
    fen.value = previo.fenDepois
    ultimoLance.value = [previo.from, previo.to]
    aguardando.value = false
    aviso.value = { tipo: 'neutro', lance: rotulo(plyInicial - 1, previo.san), texto: `${nomeDoAdversario} jogaram. Ache o melhor lance das ${nomeDoLado}.` }
  })
}

const alvoDaPista = computed(() => {
  const san = linha[jogadas.value.length]
  return san ? casasDoLance(fenDoPasso.value, san) : null
})
const formas = computed<Forma[]>(() => {
  const pendente = promocaoPendente.value
  if (pendente) return [{ de: pendente.de, para: pendente.para, cor: 'yellow' }]
  const alvo = alvoDaPista.value
  if (resolvido.value || aguardando.value || !alvo || pista.value === 0) return []
  return pista.value >= 2 ? [{ de: alvo.from, para: alvo.to, cor: 'green' }] : [{ de: alvo.from, cor: 'yellow' }]
})

function aoJogar(de: string, para: string) {
  if (ehPromocao(fenDoPasso.value, de, para)) {
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
  const lance = verificarLance(fenDoPasso.value, de, para, promocao)
  if (!lance) {
    tabuleiro.value?.sincronizar()
    return
  }
  const passo = jogadas.value.length
  const ply = plyInicial + passo
  const resultado = conferirLanceTatico(problema, passo, lance.san, lance.mate)
  if (resultado === 'errado') {
    erros.value++
    tocar('errado')
    aviso.value = { tipo: 'errado', lance: rotulo(ply, lance.san), texto: 'Não é o melhor lance. Tente de novo.' }
    fen.value = lance.fenDepois
    ultimoLance.value = [lance.from, lance.to]
    aguardando.value = true
    depois(TEMPO_DESFAZER_MS, () => {
      fen.value = fenDoPasso.value
      const anterior = jogadas.value.at(-1)
      ultimoLance.value = anterior ? [anterior.from, anterior.to] : previo ? [previo.from, previo.to] : null
      aguardando.value = false
      tabuleiro.value?.sincronizar()
    })
    return
  }
  jogadas.value = [...jogadas.value, lance]
  fen.value = lance.fenDepois
  ultimoLance.value = [lance.from, lance.to]
  pista.value = 0
  if (resultado === 'fim') return concluir(ply, lance)
  // Certo: o adversário responde com o lance seguinte da linha.
  tocar('certo')
  aviso.value = { tipo: 'certo', lance: rotulo(ply, lance.san), texto: 'Isso! Continue.' }
  aguardando.value = true
  depois(TEMPO_RESPOSTA_MS, () => {
    const resposta = jogarSan(lance.fenDepois, linha[passo + 1])
    jogadas.value = [...jogadas.value, resposta]
    fen.value = resposta.fenDepois
    ultimoLance.value = [resposta.from, resposta.to]
    aguardando.value = false
    aviso.value = { tipo: 'neutro', lance: rotulo(ply + 1, resposta.san), texto: `${nomeDoAdversario} responderam. Continue a combinação.` }
  })
}

function concluir(ply: number, lance: LanceVerificado) {
  tocar('certo')
  resolvido.value = true
  const dePrimeira = erros.value === 0 && !usouPista.value
  somarAtividade(progresso.atividade, 'exercicios')
  if (!refazendo) {
    estados.value[problema.n] = dePrimeira ? 'primeira' : 'ajuda'
    registrarResultado(conjunto.id, problema.n, notaDoExercicio(erros.value, usouPista.value))
  }
  aviso.value = {
    tipo: 'certo',
    lance: rotulo(ply, lance.san),
    texto: (dePrimeira ? 'Resolvido de primeira!' : 'Resolvido.') + (problema.explicacao ? ` ${problema.explicacao}` : ''),
  }
}

function pedirPista() {
  usouPista.value = true
  pista.value++
  aviso.value = { tipo: 'neutro', texto: pista.value === 1 ? 'A peça destacada faz o lance.' : 'Jogue o lance da seta.' }
}

function refazer() {
  const vezes = Number(route.query.refazer ?? 0) + 1
  router.replace({ name: 'tatica', params: { conjunto: conjunto.id }, query: { n: String(problema.n), refazer: String(vezes) } })
}
function irPara(n: number) {
  router.push({ name: 'tatica', params: { conjunto: conjunto.id }, query: { n: String(n) } })
}
function trocarFaixa(nova: Faixa) {
  router.push({ name: 'tatica', params: { conjunto: conjunto.id }, query: { faixa: nova } })
}

/** Próximo da mesma faixa ainda não resolvido de primeira (dando a volta). */
const proximoPendente = computed(() => {
  const lista = daFaixa.value
  const i = lista.findIndex((p) => p.n === problema.n)
  return [...lista.slice(i + 1), ...lista.slice(0, Math.max(0, i))].find((p) => estados.value[p.n] !== 'primeira')
})
const proximaRevisao = computed(() => {
  void resolvido.value
  return revisoesPendentes(obterConjuntos()).find((r) => !(r.conjunto === conjunto.id && r.n === problema.n))
})
function irParaRevisao() {
  const r = proximaRevisao.value!
  router.push({ name: 'exercicio', params: { conjunto: r.conjunto }, query: { n: String(r.n), revisao: '1' } })
}

const contagem = computed(() => {
  const naFaixa = daFaixa.value.map((p) => estados.value[p.n])
  return {
    primeira: naFaixa.filter((e) => e === 'primeira').length,
    ajuda: naFaixa.filter((e) => e === 'ajuda').length,
    total: daFaixa.value.length,
  }
})
const indiceNaFaixa = computed(() => daFaixa.value.findIndex((p) => p.n === problema.n) + 1)
const explicacao = EXPLICACOES[conjunto.tema ?? ''] ?? ''
const autorDoLivro = AUTORES_DOS_LIVROS[conjunto.tema ?? '']
const mostrarExplicacao = Object.keys(estados.value).length === 0

const PECAS_PROMOCAO: { peca: PecaPromocao; nome: string }[] = [
  { peca: 'q', nome: 'Dama' },
  { peca: 'r', nome: 'Torre' },
  { peca: 'b', nome: 'Bispo' },
  { peca: 'n', nome: 'Cavalo' },
]
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" to="/exercicios" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>{{ conjunto.nome }}</h1>
    <span class="apoio suave">{{ temFaixas ? NOMES_DAS_FAIXAS[faixa] : "Exercício" }} · {{ indiceNaFaixa }}/{{ daFaixa.length }}</span>
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
        :capturadas="false"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink to="/exercicios" class="trilha">‹ Táticas e mates</RouterLink>
        <h1 class="titulo-pagina">{{ autorDoLivro ?? "Táticas" }} · {{ conjunto.nome }}</h1>
      </div>

      <div v-if="temFaixas" class="faixas" role="tablist" aria-label="Dificuldade">
        <button
          v-for="f in FAIXAS"
          :key="f"
          type="button"
          role="tab"
          class="faixa"
          :class="{ ativa: f === faixa }"
          :aria-selected="f === faixa"
          @click="trocarFaixa(f)"
        >{{ NOMES_DAS_FAIXAS[f] }}</button>
      </div>

      <details class="explicacao" :open="mostrarExplicacao">
        <summary>{{ autorDoLivro ? 'Sobre estes exercícios' : `O que é ${conjunto.nome.toLowerCase()}?` }}</summary>
        <p>{{ explicacao }}</p>
      </details>

      <p class="enunciado corpo-forte">
        <span class="marcador" :class="vez" aria-hidden="true"></span>
        {{ resolvido ? (problema.tarefa ? 'Resolvido.' : 'Combinação completa.') : (problema.tarefa ?? `As ${nomeDoLado} jogam e ganham.`) }}
      </p>
      <p v-if="revisando || refazendo" class="selos">
        <span v-if="revisando" class="selo">REVISÃO</span>
        <span v-if="refazendo" class="selo neutro">REFAZENDO</span>
      </p>

      <div v-if="promocaoPendente" class="acoes">
        <span>Promover para:</span>
        <button v-for="opcao in PECAS_PROMOCAO" :key="opcao.peca" type="button" class="botao" @click="promover(opcao.peca)">{{ opcao.nome }}</button>
        <button type="button" class="botao" @click="promover(null)">Cancelar</button>
      </div>

      <CartaoDica v-if="aviso" :tipo="aviso.tipo" :lance="aviso.lance" :texto="aviso.texto" />

      <div class="acoes">
        <button v-if="!resolvido" type="button" class="botao" :disabled="pista >= 2 || aguardando" @click="pedirPista">
          {{ pista === 0 ? 'Pista: qual peça?' : 'Mostrar o lance' }}
        </button>
        <template v-if="resolvido">
          <button type="button" class="botao" @click="refazer">↺ Refazer</button>
          <button v-if="revisando && proximaRevisao" type="button" class="botao primario" @click="irParaRevisao">Próxima revisão</button>
          <button v-else-if="proximoPendente" type="button" class="botao primario" @click="irPara(proximoPendente.n)">Próximo problema</button>
          <p v-else class="concluido">Todos desta faixa resolvidos de primeira!</p>
          <a v-if="problema.lichess" class="botao fantasma" :href="`https://lichess.org/training/${problema.lichess}`" target="_blank" rel="noopener">Ver no lichess</a>
        </template>
      </div>

      <section class="cartao">
        <div class="progresso">
          <div class="rotulos">
            <span>{{ temFaixas ? NOMES_DAS_FAIXAS[faixa] : conjunto.nome }}</span>
            <span><strong>{{ contagem.primeira + contagem.ajuda }}</strong> de {{ contagem.total }} resolvidos</span>
          </div>
          <div class="trilho"><span :style="{ width: `${((contagem.primeira + contagem.ajuda) / Math.max(1, contagem.total)) * 100}%` }"></span></div>
        </div>
        <div class="placar">
          <span class="acertos">✓ {{ contagem.primeira }} de primeira</span>
          <span class="pistas">{{ contagem.ajuda }} com ajuda</span>
          <span v-if="problema.rating" class="suave">Problema com rating {{ problema.rating }}</span>
        </div>
      </section>

      <details class="escolha">
        <summary>Escolher problema</summary>
        <div class="grade-problemas">
          <button
            v-for="(p, i) in daFaixa"
            :key="p.n"
            type="button"
            :class="[estados[p.n], { atual: p.n === problema.n }]"
            :aria-label="`Problema ${i + 1}`"
            @click="irPara(p.n)"
          >{{ i + 1 }}</button>
        </div>
      </details>

      <p class="suave fonte">{{ conjunto.fonte }}</p>
    </div>
  </div>
</template>

<style scoped>
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
.faixas {
  display: flex;
  gap: var(--espaco-2);
}
.faixa {
  min-height: 40px;
  padding: 0 var(--espaco-3);
  border: 1px solid var(--borda-controle);
  border-radius: 999px;
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  cursor: pointer;
}
.faixa.ativa {
  border-color: var(--destaque);
  background: var(--destaque);
  color: #fff;
  font-weight: 600;
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
.selos {
  display: flex;
  gap: var(--espaco-2);
  margin: 0;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}
.concluido {
  margin: 0;
  color: var(--ok);
}
.suave {
  margin: 0;
  color: var(--texto-suave);
}
.fonte {
  font-size: 0.875rem;
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
  padding: 0.25rem;
}
.grade-problemas button {
  min-height: 44px;
  border: 1px solid var(--borda);
  border-radius: var(--raio-sm);
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  font-size: 0.875rem;
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
