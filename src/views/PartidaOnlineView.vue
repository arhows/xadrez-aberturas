<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Avatar from '../components/Avatar.vue'
import HistoricoLances from '../components/HistoricoLances.vue'
import Tabuleiro from '../components/Tabuleiro.vue'
import { meuNome } from '../lib/apelido'
import { salvarJogo } from '../lib/jogosSalvos'
import { nuvem } from '../lib/nuvem'
import { corDe, jogoDe, problemaParaEntrar, tempoAgora, vezDe } from '../lib/partidaOnline'
import { progresso } from '../lib/progresso'
import { formatarRelogio, tempoPorId } from '../lib/relogio'
import {
  abandonarPartida,
  adversarioDe,
  aplicarRanking,
  cancelarPartida,
  criarPartida,
  entrarNaPartida,
  garantirJogador,
  jogarLance,
  observarPartida,
  proporEmpate,
  reclamarTempo,
  responderOferta,
  type PartidaComId,
} from '../lib/servidorOnline'
import { copiarTexto } from '../lib/compartilharPosicao'
import { tocar } from '../lib/som'

/** Partida on-line em tempo real com um amigo. */

type Peca = 'q' | 'r' | 'b' | 'n'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
const uid = nuvem.uid!

const partida = shallowRef<PartidaComId | null>(null)
const carregou = ref(false)
const erro = ref<string | null>(null)
const enviando = ref(false)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()
const promocaoPendente = ref<{ de: string; para: string } | null>(null)

function mensagem(e: unknown): string {
  const texto = e instanceof Error ? e.message : String(e)
  return /permission|insufficient/i.test(texto)
    ? 'O Firestore recusou o acesso. As regras do banco precisam ser atualizadas para o jogo on-line.'
    : texto
}

garantirJogador(uid, meuNome()).catch(() => {})

let lancesVistos = -1
const parar = observarPartida(
  id,
  (p) => {
    partida.value = p
    carregou.value = true
    if (p && lancesVistos >= 0 && p.lances.length > lancesVistos && corDe(p, uid) && vezDe(p) === corDe(p, uid)) tocar('certo')
    lancesVistos = p?.lances.length ?? 0
  },
  (e) => {
    erro.value = mensagem(e)
    carregou.value = true
  },
)
onBeforeUnmount(parar)

const minhaCor = computed(() => (partida.value ? corDe(partida.value, uid) : null))
const outro = computed(() => (partida.value ? adversarioDe(partida.value, uid) : null))
const nomeDe = (u: string | null) => (u ? (partida.value?.nomes[u] ?? 'Amigo') : 'aguardando')
const jogo = computed(() => (partida.value ? jogoDe(partida.value) : null))
const fen = computed(() => jogo.value?.fen() ?? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
const ultimoLance = computed<[string, string] | null>(() => {
  const ultimo = jogo.value?.history({ verbose: true }).at(-1)
  return ultimo ? [ultimo.from, ultimo.to] : null
})
const orientacao = computed(() => (minhaCor.value === 'b' ? 'black' : 'white'))
const minhaVez = computed(() => !!partida.value && partida.value.estado === 'jogando' && vezDe(partida.value) === minhaCor.value)
const jogavel = computed(() => minhaVez.value && !enviando.value && !promocaoPendente.value)

// ---------- Relógio ----------
const agora = ref(Date.now())
const tique = setInterval(() => (agora.value = Date.now()), 200)
onBeforeUnmount(() => clearInterval(tique))
const comRelogio = computed(() => !!partida.value && tempoPorId(partida.value.tempo).minutos > 0)
const tempoDe = (cor: 'w' | 'b') => (partida.value ? tempoAgora(partida.value, cor, agora.value) : 0)
let reclamando = false
watch(agora, async () => {
  const p = partida.value
  if (!p || p.estado !== 'jogando' || !comRelogio.value || reclamando) return
  if (tempoDe(vezDe(p)) <= 0) {
    reclamando = true
    await reclamarTempo(id).catch(() => {})
    reclamando = false
  }
})

// ---------- Lances ----------
async function enviar(lance: { from: string; to: string; promotion?: Peca }) {
  enviando.value = true
  erro.value = null
  try {
    await jogarLance(id, uid, lance)
  } catch (e) {
    erro.value = mensagem(e)
    tabuleiro.value?.sincronizar()
  } finally {
    enviando.value = false
  }
}

function aoJogar(de: string, para: string) {
  const peca = jogo.value?.get(de as never)
  if (peca?.type === 'p' && (para[1] === '8' || para[1] === '1')) {
    promocaoPendente.value = { de, para }
    return
  }
  void enviar({ from: de, to: para })
}

function promover(peca: Peca | null) {
  const pendente = promocaoPendente.value!
  promocaoPendente.value = null
  if (peca) void enviar({ from: pendente.de, to: pendente.para, promotion: peca })
  else tabuleiro.value?.sincronizar()
}

const confirmandoAbandono = ref(false)
async function abandonar() {
  if (!confirmandoAbandono.value) {
    confirmandoAbandono.value = true
    setTimeout(() => (confirmandoAbandono.value = false), 3000)
    return
  }
  await abandonarPartida(id, uid).catch((e) => (erro.value = mensagem(e)))
}

async function aceitarConvite() {
  try {
    await entrarNaPartida(id, uid, meuNome())
  } catch (e) {
    erro.value = mensagem(e)
  }
}

// ---------- Convite ----------
const link = computed(() => `${location.origin}${location.pathname}#/online/${id}`)
const copiado = ref(false)
const campoDoLink = ref<HTMLInputElement>()
/** No celular há o "Compartilhar" do aparelho; no computador o mais prático é copiar o link. */
const podeCompartilhar = typeof navigator.share === 'function'
/** Tela de toque (celular, tablet): o "Compartilhar" vem primeiro; com mouse, o "Copiar link". */
const telaDeToque = matchMedia('(pointer: coarse)').matches
const compartilharPrimeiro = podeCompartilhar && telaDeToque
async function compartilhar() {
  try {
    await navigator.share({ title: 'Partida de xadrez', text: `Vamos jogar xadrez? Aceite a partida: ${link.value}` })
  } catch {
    // compartilhamento cancelado
  }
}
async function copiarLink() {
  if (!(await copiarTexto(link.value))) {
    // Não copiou: deixa o link selecionado para a pessoa copiar à mão.
    campoDoLink.value?.select()
    return
  }
  copiado.value = true
  setTimeout(() => (copiado.value = false), 2000)
}

// ---------- Fim ----------
const salva = ref(false)
watch(
  partida,
  (p) => {
    if (!p || p.estado !== 'fim') return
    if (p.valendo && !p.ratingAplicado) void aplicarRanking(id).catch(() => {})
    const cor = corDe(p, uid)
    if (!salva.value && cor && p.lances.length >= 2 && !progresso.jogos[id]) {
      progresso.jogos = salvarJogo(progresso.jogos, {
        id,
        data: new Date().toISOString(),
        lances: p.lances.join(' '),
        inicio: 0,
        adversario: 'online',
        oponente: nomeDe(adversarioDe(p, uid)),
        oponenteUid: adversarioDe(p, uid) ?? undefined,
        cor,
        tempo: p.tempo,
        resultado: p.resultado,
        motivo: p.motivo,
      })
      salva.value = true
    }
  },
  { immediate: true },
)

const resultadoParaMim = computed(() => {
  const p = partida.value
  if (!p || p.estado !== 'fim' || !minhaCor.value) return ''
  if (p.resultado === '1/2-1/2') return 'Empate'
  return (p.resultado === '1-0') === (minhaCor.value === 'w') ? 'Você venceu!' : 'Você perdeu.'
})
const meuRating = computed(() => partida.value?.ratings?.[uid] ?? null)

async function revanche() {
  const p = partida.value!
  const adversario = adversarioDe(p, uid)
  if (!adversario) return
  try {
    const novo = await criarPartida(uid, meuNome(), minhaCor.value === 'w' ? 'b' : 'w', p.tempo, p.valendo, {
      uid: adversario,
      nome: nomeDe(adversario),
    })
    router.push({ name: 'partida-online', params: { id: novo } })
  } catch (e) {
    erro.value = mensagem(e)
  }
}

const situacao = computed(() => {
  const p = partida.value
  if (!p) return ''
  if (p.estado === 'cancelada') return p.motivo || 'Partida cancelada.'
  if (p.estado === 'fim') return p.motivo
  if (p.estado === 'aguardando') return ''
  const xeque = jogo.value?.inCheck() ? 'Xeque! ' : ''
  return minhaVez.value ? `${xeque}Sua vez.` : `${xeque}Vez de ${nomeDe(outro.value)}.`
})
const problemaEntrada = computed(() => (partida.value ? problemaParaEntrar(partida.value, uid) : null))

const PECAS_PROMOCAO: { peca: Peca; nome: string }[] = [
  { peca: 'q', nome: 'Dama' },
  { peca: 'r', nome: 'Torre' },
  { peca: 'b', nome: 'Bispo' },
  { peca: 'n', nome: 'Cavalo' },
]
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" to="/online" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>Partida on-line</h1>
  </header>

  <div v-if="!carregou" class="pagina"><p>Carregando a partida…</p></div>
  <div v-else-if="!partida" class="pagina">
    <p class="erro">{{ erro ?? 'Partida não encontrada.' }}</p>
    <RouterLink class="botao" to="/online">Voltar</RouterLink>
  </div>

  <div v-else-if="partida.estado === 'aguardando'" class="pagina formulario">
    <RouterLink to="/online" class="trilha">‹ Jogar on-line</RouterLink>
    <template v-if="partida.criador === uid">
      <h1 class="titulo-pagina">Esperando seu amigo</h1>
      <p v-if="partida.convidado">Desafio enviado para <strong>{{ nomeDe(partida.convidado) }}</strong>. Ele vê o desafio na tela Jogar on-line; você também pode mandar o link.</p>
      <p v-else>Mande este link para o seu amigo. Quando ele aceitar, a partida começa aqui sozinha.</p>
      <div class="link-convite">
        <input ref="campoDoLink" class="texto" :value="link" readonly aria-label="Link do convite" @focus="($event.target as HTMLInputElement).select()" />
        <button type="button" class="botao" :class="compartilharPrimeiro ? '' : 'primario'" @click="copiarLink">{{ copiado ? '✓ Link copiado!' : 'Copiar link' }}</button>
        <button v-if="podeCompartilhar" type="button" class="botao" :class="compartilharPrimeiro ? 'primario' : 'fantasma'" @click="compartilhar">Compartilhar</button>
      </div>
      <p class="suave">
        {{ tempoPorId(partida.tempo).minutos ? `Tempo ${partida.tempo}` : 'Sem relógio' }} · você joga de
        {{ partida.brancas === uid ? 'brancas' : 'pretas' }}{{ partida.valendo ? ' · valendo ranking' : '' }}
      </p>
      <button type="button" class="botao fantasma" @click="cancelarPartida(id).then(() => router.push('/online'))">Cancelar convite</button>
    </template>
    <template v-else>
      <h1 class="titulo-pagina">Convite para jogar</h1>
      <p><strong>{{ nomeDe(partida.criador) }}</strong> chamou você para uma partida.</p>
      <p class="suave">
        {{ tempoPorId(partida.tempo).minutos ? `Tempo ${partida.tempo}` : 'Sem relógio' }} · você joga de
        {{ partida.brancas ? 'pretas' : 'brancas' }}{{ partida.valendo ? ' · valendo ranking' : '' }}
      </p>
      <p v-if="problemaEntrada" class="erro">{{ problemaEntrada }}</p>
      <button v-else type="button" class="botao primario grande" @click="aceitarConvite">Aceitar e jogar</button>
    </template>
    <p v-if="erro" class="erro" role="alert">{{ erro }}</p>
  </div>

  <div v-else class="tela">
    <div class="area-tabuleiro">
      <div class="placa" :class="{ vez: partida.estado === 'jogando' && vezDe(partida) !== minhaCor }">
        <span class="quem"><Avatar :uid="outro" :nome="nomeDe(outro)" :tamanho="28" /><span class="nome">{{ nomeDe(outro) }}</span></span>
        <span v-if="comRelogio && minhaCor" class="relogio" :class="{ pouco: tempoDe(minhaCor === 'w' ? 'b' : 'w') < 20_000 }">
          {{ formatarRelogio(tempoDe(minhaCor === 'w' ? 'b' : 'w')) }}
        </span>
      </div>
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :jogavel="jogavel"
        @lance="aoJogar"
      />
      <div class="placa" :class="{ vez: minhaVez }">
        <span class="quem"><Avatar :uid="uid" :nome="nomeDe(uid)" :tamanho="28" /><span class="nome">{{ nomeDe(uid) }} (você)</span></span>
        <span v-if="comRelogio && minhaCor" class="relogio" :class="{ pouco: tempoDe(minhaCor) < 20_000 }">{{ formatarRelogio(tempoDe(minhaCor)) }}</span>
      </div>
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink to="/online" class="trilha">‹ Jogar on-line</RouterLink>
        <h1 class="titulo-pagina">{{ nomeDe(partida.brancas) }} × {{ nomeDe(partida.pretas) }}</h1>
        <p class="suave">
          {{ tempoPorId(partida.tempo).minutos ? `Tempo ${partida.tempo}` : 'Sem relógio' }}{{ partida.valendo ? ' · valendo ranking' : ' · amistosa' }}
        </p>
      </div>

      <p v-if="!minhaCor" class="suave">Você está assistindo a esta partida.</p>
      <p class="situacao corpo-forte">{{ situacao }}</p>
      <p v-if="enviando" class="suave">Enviando o lance…</p>
      <p v-if="erro" class="erro" role="alert">{{ erro }}</p>

      <div v-if="promocaoPendente" class="acoes">
        <span>Promover para:</span>
        <button v-for="opcao in PECAS_PROMOCAO" :key="opcao.peca" type="button" class="botao" @click="promover(opcao.peca)">{{ opcao.nome }}</button>
        <button type="button" class="botao" @click="promover(null)">Cancelar</button>
      </div>

      <div v-if="partida.estado === 'jogando' && partida.empate && partida.empate !== uid && minhaCor" class="oferta">
        <span>{{ nomeDe(partida.empate) }} ofereceu empate.</span>
        <button type="button" class="botao primario" @click="responderOferta(id, uid, true)">Aceitar</button>
        <button type="button" class="botao" @click="responderOferta(id, uid, false)">Recusar</button>
      </div>

      <section v-if="partida.estado === 'fim'" class="cartao fim">
        <strong class="resultado">{{ resultadoParaMim || partida.resultado.replace('1/2-1/2', '½-½') }}</strong>
        <span v-if="meuRating" class="suave">
          Rating: {{ meuRating.antes }} → <strong>{{ meuRating.depois }}</strong>
          ({{ meuRating.depois >= meuRating.antes ? '+' : '' }}{{ meuRating.depois - meuRating.antes }})
        </span>
        <span v-else-if="partida.valendo && partida.lances.length >= 2" class="suave">Atualizando o ranking…</span>
        <span v-else-if="partida.valendo" class="suave">Partida com menos de 2 lances: não conta para o ranking.</span>
      </section>

      <HistoricoLances :lances="partida.lances" :atual="partida.lances.length" />

      <div class="acoes" :class="{ jogando: partida.estado === 'jogando' }">
        <template v-if="partida.estado === 'jogando' && minhaCor">
          <button type="button" class="botao" :disabled="partida.empate === uid" @click="proporEmpate(id, uid)">
            {{ partida.empate === uid ? 'Empate oferecido' : 'Oferecer empate' }}
          </button>
          <button type="button" class="botao fantasma" :class="{ perigo: confirmandoAbandono }" @click="abandonar">
            {{ confirmandoAbandono ? 'Tocar de novo para abandonar' : 'Abandonar' }}
          </button>
        </template>
        <template v-if="partida.estado === 'fim' || partida.estado === 'cancelada'">
          <button v-if="minhaCor && outro" type="button" class="botao primario grande largo-celular" @click="revanche">Revanche</button>
          <RouterLink
            v-if="partida.lances.length"
            class="botao"
            :to="{ name: 'analise', query: { c: partida.lances.join(' '), cor: minhaCor ?? undefined, titulo: `${nomeDe(partida.brancas)} × ${nomeDe(partida.pretas)}`, volta: `/online/${id}` } }"
          >Analisar partida</RouterLink>
          <RouterLink class="botao" to="/ranking">Ranking</RouterLink>
          <RouterLink class="botao fantasma" to="/online">Nova partida</RouterLink>
        </template>
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
.cabeca-painel .titulo-pagina,
.cabeca-painel p,
.situacao {
  margin: 0;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.erro {
  margin: 0;
  color: var(--erro);
  font-weight: 600;
}
.placa {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-2);
  padding: var(--espaco-1) var(--espaco-2);
  border-radius: var(--raio-sm);
}
.placa.vez {
  background: var(--superficie-2);
}
.quem {
  display: flex;
  align-items: center;
  gap: var(--espaco-2);
  min-width: 0;
}
.nome {
  font-weight: 600;
}
.relogio {
  min-width: 4.5rem;
  padding: 2px 8px;
  border-radius: var(--raio-sm);
  background: var(--superficie);
  border: 1px solid var(--borda);
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  font-size: 1.15rem;
  text-align: center;
}
.placa.vez .relogio {
  background: var(--texto);
  color: var(--fundo);
}
.relogio.pouco {
  color: var(--erro);
}
.placa.vez .relogio.pouco {
  background: var(--erro);
  color: #fff;
}
.acoes,
.oferta,
.link-convite {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2);
}
.oferta {
  padding: var(--espaco-2) var(--espaco-3);
  border: 1px solid var(--aviso);
  border-radius: var(--raio-md);
}
.texto {
  flex: 1;
  min-width: 0;
  min-height: 44px;
  padding: 0 var(--espaco-3);
  border: 1px solid var(--borda-controle);
  border-radius: var(--raio-md);
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  font-size: 13px;
}
.fim {
  display: grid;
  gap: var(--espaco-1);
}
.resultado {
  font-size: 1.25rem;
}
.perigo {
  color: var(--erro);
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
/* Durante a partida, Empate e Abandonar dividem a linha no celular. */
@media (max-width: 799.98px) {
  .acoes.jogando > .botao {
    flex: 1 1 0;
  }
}
</style>
