<script setup lang="ts">
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { meuNome, salvarApelido } from '../lib/apelido'
import { nuvem } from '../lib/nuvem'
import type { Cor } from '../lib/lances'
import { TEMPOS } from '../lib/relogio'
import {
  adversarioDe,
  cancelarPartida,
  criarPartida,
  entrarNaPartida,
  garantirJogador,
  observarMinhasPartidas,
  recusarDesafio,
  type PartidaComId,
} from '../lib/servidorOnline'

/** Sala on-line: criar convite, desafios recebidos e partidas em andamento. */

const router = useRouter()
const uid = nuvem.uid!
const nome = ref(meuNome())
const tempo = ref('5+3')
const cor = ref<Cor | 'sorteio'>('sorteio')
const valendo = ref(true)
const criando = ref(false)
const erro = ref<string | null>(null)
const lista = shallowRef<PartidaComId[]>([])
const carregou = ref(false)

garantirJogador(uid, nome.value).catch((e) => (erro.value = mensagem(e)))

const parar = observarMinhasPartidas(
  uid,
  (partidas) => {
    lista.value = partidas
    carregou.value = true
  },
  (e) => (erro.value = mensagem(e)),
)
onBeforeUnmount(parar)

function mensagem(e: unknown): string {
  const texto = e instanceof Error ? e.message : String(e)
  if (/permission|insufficient/i.test(texto)) {
    return 'O Firestore recusou o acesso. As regras do banco precisam ser atualizadas para o jogo on-line (veja as instruções que o Claude passou).'
  }
  return texto
}

async function salvarNome() {
  salvarApelido(nome.value)
  nome.value = meuNome()
  await garantirJogador(uid, nome.value).catch((e) => (erro.value = mensagem(e)))
}

async function criar() {
  criando.value = true
  erro.value = null
  try {
    const id = await criarPartida(uid, meuNome(), cor.value, tempo.value, valendo.value, null)
    router.push({ name: 'partida-online', params: { id } })
  } catch (e) {
    erro.value = mensagem(e)
  } finally {
    criando.value = false
  }
}

const desafios = computed(() => lista.value.filter((p) => p.estado === 'aguardando' && p.convidado === uid))
const aguardando = computed(() => lista.value.filter((p) => p.estado === 'aguardando' && p.criador === uid))
const emAndamento = computed(() => lista.value.filter((p) => p.estado === 'jogando'))
const terminadas = computed(() => lista.value.filter((p) => p.estado === 'fim').slice(0, 10))

const nomeDoOutro = (p: PartidaComId) => {
  const outro = adversarioDe(p, uid) ?? p.convidado ?? (p.criador !== uid ? p.criador : null)
  return outro ? (p.nomes[outro] ?? 'Amigo') : 'aguardando amigo'
}
const ritmo = (id: string) => TEMPOS.find((t) => t.id === id)?.ritmo ?? ''
const textoTempo = (id: string) => (id === 'livre' ? 'sem relógio' : `${id} (${ritmo(id)})`)

function resultadoParaMim(p: PartidaComId): string {
  if (p.resultado === '1/2-1/2') return 'Empate'
  const minha = p.brancas === uid ? 'w' : 'b'
  return (p.resultado === '1-0') === (minha === 'w') ? 'Vitória' : 'Derrota'
}

async function aceitar(p: PartidaComId) {
  try {
    await entrarNaPartida(p.id, uid, meuNome())
    router.push({ name: 'partida-online', params: { id: p.id } })
  } catch (e) {
    erro.value = mensagem(e)
  }
}

const codigo = ref('')
function abrirCodigo() {
  const texto = codigo.value.trim()
  const id = texto.match(/online\/([A-Za-z0-9]+)/)?.[1] ?? texto
  if (/^[A-Za-z0-9]{10,}$/.test(id)) router.push({ name: 'partida-online', params: { id } })
  else erro.value = 'Cole o link do convite que seu amigo mandou.'
}
</script>

<template>
  <div class="pagina">
    <RouterLink to="/jogar" class="trilha">‹ Jogar</RouterLink>
    <h1>Jogar on-line</h1>
    <p class="intro">Crie uma partida, mande o link para um amigo e joguem em tempo real. As partidas valendo contam para o ranking.</p>

    <p v-if="erro" class="erro" role="alert">{{ erro }}</p>

    <section v-if="desafios.length" class="cartao destaque">
      <h2>Desafios para você</h2>
      <ul class="lista">
        <li v-for="p in desafios" :key="p.id">
          <span><strong>{{ p.nomes[p.criador] }}</strong> <span class="suave">· {{ textoTempo(p.tempo) }}{{ p.valendo ? ' · valendo ranking' : '' }}</span></span>
          <span class="acoes">
            <button type="button" class="botao primario" @click="aceitar(p)">Aceitar</button>
            <button type="button" class="botao fantasma" @click="recusarDesafio(p.id, uid)">Recusar</button>
          </span>
        </li>
      </ul>
    </section>

    <section v-if="emAndamento.length" class="cartao">
      <h2>Partidas em andamento</h2>
      <ul class="lista">
        <li v-for="p in emAndamento" :key="p.id">
          <span>contra <strong>{{ nomeDoOutro(p) }}</strong> <span class="suave">· {{ textoTempo(p.tempo) }} · {{ p.lances.length }} meios-lances</span></span>
          <RouterLink class="botao primario" :to="{ name: 'partida-online', params: { id: p.id } }">Continuar</RouterLink>
        </li>
      </ul>
    </section>

    <section class="cartao">
      <h2>Nova partida</h2>
      <label class="campo">
        <span>Tempo</span>
        <select v-model="tempo">
          <option v-for="t in TEMPOS" :key="t.id" :value="t.id">{{ t.id === 'livre' ? 'Sem relógio' : `${t.id} · ${t.ritmo}` }}</option>
        </select>
      </label>
      <fieldset class="opcoes">
        <legend>Sua cor</legend>
        <label class="marcar"><input v-model="cor" type="radio" value="w" /> Brancas</label>
        <label class="marcar"><input v-model="cor" type="radio" value="b" /> Pretas</label>
        <label class="marcar"><input v-model="cor" type="radio" value="sorteio" /> Sortear</label>
      </fieldset>
      <label class="marcar"><input v-model="valendo" type="checkbox" /> Valendo ranking</label>
      <button type="button" class="botao primario grande" :disabled="criando" @click="criar">
        {{ criando ? 'Criando…' : 'Criar partida e convidar' }}
      </button>
      <p class="suave">Depois de criar, você recebe um link para mandar ao amigo (WhatsApp, por exemplo). Ele precisa entrar com uma conta no app.</p>
    </section>

    <section v-if="aguardando.length" class="cartao">
      <h2>Convites esperando o amigo</h2>
      <ul class="lista">
        <li v-for="p in aguardando" :key="p.id">
          <span>{{ p.convidado ? `Desafio para ${p.nomes[p.convidado]}` : 'Convite por link' }} <span class="suave">· {{ textoTempo(p.tempo) }}</span></span>
          <span class="acoes">
            <RouterLink class="botao" :to="{ name: 'partida-online', params: { id: p.id } }">Abrir</RouterLink>
            <button type="button" class="botao fantasma" @click="cancelarPartida(p.id)">Cancelar</button>
          </span>
        </li>
      </ul>
    </section>

    <section class="cartao">
      <h2>Recebeu um link?</h2>
      <div class="linha">
        <input v-model="codigo" class="texto" placeholder="Cole aqui o link do convite" @keydown.enter="abrirCodigo" />
        <button type="button" class="botao" :disabled="!codigo.trim()" @click="abrirCodigo">Abrir</button>
      </div>
    </section>

    <section class="cartao">
      <h2>Ranking</h2>
      <p class="suave">Cada partida valendo muda o rating dos dois jogadores (Elo, começando em 1200).</p>
      <div class="linha">
        <RouterLink class="botao" to="/ranking">Ver o ranking</RouterLink>
      </div>
      <label class="campo">
        <span>Seu nome no ranking</span>
        <span class="linha">
          <input v-model="nome" class="texto" maxlength="30" />
          <button type="button" class="botao" @click="salvarNome">Salvar</button>
        </span>
      </label>
    </section>

    <section v-if="terminadas.length" class="cartao">
      <h2>Últimas partidas on-line</h2>
      <ul class="lista">
        <li v-for="p in terminadas" :key="p.id">
          <span><strong>{{ resultadoParaMim(p) }}</strong> contra {{ nomeDoOutro(p) }} <span class="suave">· {{ p.motivo }}</span></span>
          <RouterLink class="botao" :to="{ name: 'partida-online', params: { id: p.id } }">Ver</RouterLink>
        </li>
      </ul>
    </section>
    <p v-if="!carregou && !erro" class="suave">Carregando suas partidas…</p>
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
h1 {
  margin: 0 0 0.5rem;
}
h2 {
  margin: 0;
  font-size: 1.1rem;
}
.intro {
  margin: 0 0 1rem;
  line-height: 1.5;
}
.cartao {
  display: grid;
  gap: var(--espaco-3);
  margin-bottom: 1rem;
}
.destaque {
  border-color: var(--ok);
  border-width: 2px;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.erro {
  color: var(--erro);
  font-weight: 600;
}
.lista {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
.lista li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-2);
}
.acoes,
.linha {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
.campo {
  display: grid;
  gap: var(--espaco-1);
  font-weight: 600;
}
.campo select,
.texto {
  min-height: 44px;
  padding: 0 var(--espaco-3);
  border: 1px solid var(--borda-controle);
  border-radius: var(--raio-md);
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  font-weight: 400;
}
.texto {
  flex: 1;
  min-width: 0;
}
.opcoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-1) var(--espaco-4);
  margin: 0;
  padding: 0;
  border: 0;
}
.opcoes legend {
  margin-bottom: var(--espaco-1);
  font-weight: 600;
}
</style>
