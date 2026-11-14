<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Avatar from '../components/Avatar.vue'
import EstadoVazio from '../components/EstadoVazio.vue'
import Icone from '../components/Icone.vue'
import SugestoesDasPartidas from '../components/SugestoesDasPartidas.vue'
import { buscarCapitulo, obterCapitulos } from '../lib/capitulos'
import { pgnDoCompartilhado, retirarCompartilhado } from '../lib/compartilhado'
import { fmtLance } from '../lib/formato'
import { importarPartidas, importarPgn, type ResultadoImportacao, type ResultadoPgn } from '../lib/importarPartidas'
import type { Cor } from '../lib/lances'
import type { PartidaAnalisada } from '../lib/partidas'
import { aproveitamento, resumoPorAbertura } from '../lib/partidasRepertorio'
import { jogosVisiveis, textoDoResultado, type JogoSalvo } from '../lib/jogosSalvos'
import { pgnDoJogo } from '../lib/jogo'
import { baixarTexto } from '../lib/download'
import { NIVEIS } from '../lib/adversario'
import { progresso } from '../lib/progresso'

const usuarios = progresso.partidas
const importando = ref(false)
const situacao = ref('')
const resultado = ref<ResultadoImportacao | null>(null)

async function importar() {
  importando.value = true
  resultado.value = null
  try {
    resultado.value = await importarPartidas(obterCapitulos(), (texto) => (situacao.value = texto))
  } finally {
    importando.value = false
    situacao.value = ''
  }
}

const textoPgn = ref('')
const corPgn = ref<Cor | 'auto'>('auto')
const resultadoPgn = ref<ResultadoPgn | null>(null)

function importarTextoPgn() {
  resultadoPgn.value = importarPgn(textoPgn.value, corPgn.value, obterCapitulos())
  // Some o texto só se tudo entrou; senão ele fica para trocar a cor e tentar de novo.
  if (!resultadoPgn.value.semCor && !resultadoPgn.value.erros.length) textoPgn.value = ''
}

// Veio do "Compartilhar" do Android: importa direto o PGN recebido.
const rota = useRoute()
const roteador = useRouter()
const recebendo = ref(false)
const erroCompartilhado = ref('')
onMounted(async () => {
  if (!rota.query.compartilhado) return
  void roteador.replace({ name: 'partidas' })
  const dados = await retirarCompartilhado()
  if (!dados) return
  recebendo.value = true
  try {
    const pgn = await pgnDoCompartilhado(dados)
    if (!pgn) {
      erroCompartilhado.value = 'O que foi compartilhado não tem os lances da partida. Compartilhe o PGN.'
      return
    }
    textoPgn.value = pgn
    importarTextoPgn()
  } catch (erro) {
    erroCompartilhado.value = erro instanceof Error ? erro.message : 'Não foi possível ler a partida compartilhada.'
  } finally {
    recebendo.value = false
  }
})

async function lerArquivos(evento: Event) {
  const entrada = evento.target as HTMLInputElement
  const textos = await Promise.all([...(entrada.files ?? [])].map((arquivo) => arquivo.text()))
  entrada.value = ''
  if (!textos.length) return
  textoPgn.value = textos.join('\n\n')
  importarTextoPgn()
}

/** "1.e4 e5 2.Nf3": a sequência com os números dos lances. */
function sequencia(sans: string[]): string {
  return sans.map((san, i) => (i % 2 === 0 ? fmtLance(i + 1, san) : fmtLance(i + 1, san).replace(/^\d+\.\.\./, ''))).join(' ')
}
const lanceNumerado = (ply: number, san: string) => fmtLance(ply + 1, san)
/** O lance que continua a sequência: "d5" depois de "4.d3", sem repetir o número. */
const continuacao = (caminho: string[], san: string) =>
  caminho.length % 2 === 1 ? fmtLance(caminho.length + 1, san).replace(/^\d+\.\.\./, '') : lanceNumerado(caminho.length, san)
const nomeDoCapitulo = (id: string) => buscarCapitulo(id)?.capitulo.nome ?? id

const todas = computed(() =>
  Object.values(progresso.partidas.analisadas).sort((a, b) => b.data.localeCompare(a.data)),
)
const noRepertorio = computed(() => todas.value.filter((p) => p.capitulo))
const porAbertura = computed(() => resumoPorAbertura(noRepertorio.value))

// ---------- Partidas jogadas no app (Jogar, modo Partida) ----------
const jogos = computed(() => jogosVisiveis(progresso.jogos))
const confirmandoApagar = ref<string | null>(null)
const nomeDoAdversario = (j: JogoSalvo) =>
  j.adversario === 'online'
    ? (j.oponente ?? 'amigo on-line')
    : j.maia
      ? `Maia ${j.maia}`
      : `Stockfish nível ${j.nivel} (${NIVEIS.find((n) => n.nivel === j.nivel)?.nome ?? ''})`
const dataCurta = (iso: string) => new Date(iso).toLocaleDateString('pt-BR')
const numeroDeLances = (j: JogoSalvo) => Math.ceil((j.lances.split(' ').length - j.inicio) / 2)
function exportarJogo(j: JogoSalvo) {
  const voce = 'Você'
  const outro = nomeDoAdversario(j)
  const brancas = j.cor === 'w' ? voce : outro
  const pretas = j.cor === 'b' ? voce : outro
  baixarTexto(`partida-${j.data.slice(0, 10)}.pgn`, pgnDoJogo(j.lances.split(' '), { brancas, pretas, resultado: j.resultado, data: j.data.slice(0, 10) }, j.fen), 'application/x-chess-pgn')
}
/** Apagar pede um segundo toque (sem janela de confirmação do navegador). */
function apagarJogo(id: string) {
  if (confirmandoApagar.value !== id) {
    confirmandoApagar.value = id
    return
  }
  progresso.jogos = { ...progresso.jogos, [id]: { ...progresso.jogos[id], apagada: true } }
  confirmandoApagar.value = null
}

interface Grupo {
  chave: string
  partidas: PartidaAnalisada[]
}
function agrupar(lista: PartidaAnalisada[], chave: (p: PartidaAnalisada) => string): Grupo[] {
  const grupos = new Map<string, PartidaAnalisada[]>()
  for (const p of lista) grupos.set(chave(p), [...(grupos.get(chave(p)) ?? []), p])
  return [...grupos].map(([c, partidas]) => ({ chave: c, partidas })).sort((a, b) => b.partidas.length - a.partidas.length)
}

/** Onde o usuário saiu do livro, do desvio mais repetido ao menos. */
const desviosSeus = computed(() =>
  agrupar(
    noRepertorio.value.filter((p) => p.desvio?.quem === 'voce'),
    (p) => `${p.capitulo}|${p.desvio!.caminho.join(' ')}|${p.desvio!.jogado}`,
  ),
)

/** Posições fora do repertório que mais aparecem, separadas pela cor do usuário. */
const foraDoRepertorio = computed(() =>
  agrupar(
    todas.value.filter((p) => !p.capitulo && p.fora),
    (p) => `${p.cor}|${p.fora!.caminho.join(' ')}|${p.fora!.jogado}`,
  ).slice(0, 10),
)

function textoResultado(p: PartidaAnalisada): string {
  if (p.resultado === '½-½') return 'Empate'
  const venceu = (p.resultado === '1-0') === (p.cor === 'w')
  return venceu ? 'Vitória' : 'Derrota'
}

function situacaoDaPartida(p: PartidaAnalisada): string {
  if (!p.desvio) return `Seguiu o livro até o fim da linha (${p.noLivro} meios-lances).`
  const lance = lanceNumerado(p.desvio.caminho.length, p.desvio.jogado)
  const livro = lanceNumerado(p.desvio.caminho.length, p.desvio.livro[0])
  return p.desvio.quem === 'voce'
    ? `Você saiu do livro em ${lance}; o livro indica ${livro}.`
    : `O adversário saiu do livro em ${lance}.`
}

const SITE = { lichess: 'lichess', chesscom: 'chess.com', pgn: 'PGN' } as const
</script>

<template>
  <div class="pagina">
    <RouterLink to="/jogar" class="trilha">‹ Jogar</RouterLink>
    <h1>Minhas partidas</h1>
    <p class="suave">
      Importa suas partidas e mostra onde elas saíram do repertório. Cada vez que você sai do livro, aquele lance
      passa a ser cobrado com mais frequência no Treino.
    </p>

    <section v-if="jogos.length">
      <h2>Jogadas no app</h2>
      <ul class="lista">
        <li v-for="j in jogos" :key="j.id" class="jogo">
          <Avatar v-if="j.adversario === 'online'" class="quem-jogou" :uid="j.oponenteUid" :nome="j.oponente ?? 'Amigo'" :tamanho="40" />
          <span v-else class="ladrilho tom-jogar quem-jogou" title="Contra o computador"><Icone nome="chip" /></span>
          <div class="sobre-jogo">
            <strong>{{ textoDoResultado(j) }} contra {{ nomeDoAdversario(j) }}</strong>
            <span class="suave">
              {{ dataCurta(j.data) }}<template v-if="j.cor"> · {{ j.cor === 'w' ? 'brancas' : 'pretas' }}</template>
              · {{ j.tempo === 'livre' ? 'sem relógio' : j.tempo }} · {{ numeroDeLances(j) }} lances
            </span>
            <span class="suave">{{ j.motivo }}</span>
          </div>
          <div class="acoes-jogo">
            <RouterLink
              class="botao"
              :to="{ name: 'analise', query: { c: j.lances, fen: j.fen, cor: j.cor, titulo: `${textoDoResultado(j)} contra ${nomeDoAdversario(j)}`, volta: '/partidas' } }"
            >Analisar</RouterLink>
            <button type="button" class="botao fantasma" @click="exportarJogo(j)">PGN</button>
            <button type="button" class="botao fantasma" :class="{ perigo: confirmandoApagar === j.id }" @click="apagarJogo(j.id)">
              {{ confirmandoApagar === j.id ? 'Confirmar' : 'Apagar' }}
            </button>
          </div>
        </li>
      </ul>
      <p class="suave">As últimas {{ 100 }} partidas do modo Partida ficam guardadas e sincronizam entre os aparelhos.</p>
    </section>

    <EstadoVazio v-if="!todas.length && !jogos.length" titulo="Nenhuma partida ainda" peca="knight" tom="jogar">
      Jogue contra o computador ou importe as suas partidas do lichess e do chess.com para ver onde você saiu do livro.
      <template #acoes>
        <RouterLink class="botao primario" to="/partida">Jogar contra o computador</RouterLink>
      </template>
    </EstadoVazio>

    <!-- Importar fica recolhido depois que já há partidas: o resultado é o que importa. -->
    <details class="cartao recolhivel importar" :open="!todas.length && !jogos.length">
      <summary>Importar do chess.com, do lichess ou um PGN</summary>
      <form class="formulario-importar" @submit.prevent="importar">
        <label class="campo">
          <span>Usuário no chess.com</span>
          <input v-model.trim="usuarios.chesscom" autocomplete="off" placeholder="seu usuário" />
        </label>
        <label class="campo">
          <span>Usuário no lichess</span>
          <input v-model.trim="usuarios.lichess" autocomplete="off" placeholder="seu usuário" />
        </label>
        <button class="botao primario" :disabled="importando || (!usuarios.chesscom && !usuarios.lichess)">
          {{ importando ? 'Importando…' : 'Importar partidas' }}
        </button>
        <p v-if="situacao" class="suave">{{ situacao }}</p>
      </form>

      <form class="formulario-importar" @submit.prevent="importarTextoPgn">
        <h3>Colar ou abrir um PGN</h3>
        <p class="suave">
          Para partidas que não aparecem no site, como as jogadas offline contra o computador no app do lichess.
          No fim da partida, use “Compartilhar PGN” e cole aqui (pode colar várias de uma vez). No Android, com o app
          instalado, dá para escolher “Xadrez” direto na lista do Compartilhar.
        </p>
        <label class="campo">
          <span>PGN</span>
          <textarea v-model="textoPgn" rows="6" spellcheck="false" placeholder="[White &quot;Maia&quot;]&#10;[Black &quot;Anonymous&quot;]&#10;&#10;1. e4 e5 2. Nf3 …"></textarea>
        </label>
        <label class="campo">
          <span>Você jogou com</span>
          <select v-model="corPgn">
            <option value="auto">Descobrir pelos nomes (o computador é o outro lado)</option>
            <option value="w">Brancas</option>
            <option value="b">Pretas</option>
          </select>
        </label>
        <div class="acoes">
          <button class="botao primario" :disabled="!textoPgn.trim()">Importar PGN</button>
          <label class="botao">
            Abrir arquivo .pgn
            <input class="oculto" type="file" accept=".pgn,application/x-chess-pgn,text/plain" multiple @change="lerArquivos" />
          </label>
        </div>
      </form>
    </details>

    <p v-if="recebendo" class="suave">Lendo a partida compartilhada…</p>
    <div v-if="erroCompartilhado" class="aviso erro"><p>{{ erroCompartilhado }}</p></div>

    <div v-if="resultadoPgn" class="aviso" :class="{ erro: !resultadoPgn.novas && (resultadoPgn.erros.length || resultadoPgn.semCor) }">
      <p v-if="resultadoPgn.lidas">
        {{ resultadoPgn.lidas }} {{ resultadoPgn.lidas === 1 ? 'partida lida' : 'partidas lidas' }}, {{ resultadoPgn.novas }}
        {{ resultadoPgn.novas === 1 ? 'nova' : 'novas' }}.
        <template v-if="resultadoPgn.desviosNovos">
          {{ resultadoPgn.desviosNovos }} {{ resultadoPgn.desviosNovos === 1 ? 'desvio foi enviado' : 'desvios foram enviados' }} ao Treino.
        </template>
      </p>
      <p v-if="resultadoPgn.semCor">
        Não deu para saber com que cor você jogou em {{ resultadoPgn.semCor }}
        {{ resultadoPgn.semCor === 1 ? 'partida' : 'partidas' }}: escolha Brancas ou Pretas e importe de novo.
      </p>
      <p v-for="erro in resultadoPgn.erros" :key="erro">{{ erro }}</p>
    </div>

    <div v-if="resultado" class="aviso" :class="{ erro: resultado.erros.length && !resultado.baixadas }">
      <p v-if="resultado.baixadas">
        {{ resultado.baixadas }} partidas baixadas, {{ resultado.novas }} novas.
        <template v-if="resultado.desviosNovos">
          {{ resultado.desviosNovos }} {{ resultado.desviosNovos === 1 ? 'desvio foi enviado' : 'desvios foram enviados' }} ao Treino.
        </template>
      </p>
      <p v-for="erro in resultado.erros" :key="erro">{{ erro }}</p>
    </div>

    <template v-if="todas.length">
      <SugestoesDasPartidas titulo="O que estudar a partir delas" />

      <section>
        <h2>Resumo</h2>
        <p>
          {{ todas.length }} partidas · <strong>{{ noRepertorio.length }}</strong> no seu repertório
        </p>
        <div v-if="porAbertura.length" class="tabela-rolagem">
          <table class="tabela">
            <thead>
              <tr>
                <th scope="col">Abertura</th>
                <th scope="col" class="num">Partidas</th>
                <th scope="col" class="num">V · E · D</th>
                <th scope="col" class="num">Pontos</th>
                <th scope="col" class="num" title="Média de lances seguindo o livro">No livro</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in porAbertura" :key="r.capitulo">
                <th scope="row"><RouterLink :to="{ name: 'abertura', params: { cap: r.capitulo } }">{{ nomeDoCapitulo(r.capitulo) }}</RouterLink></th>
                <td class="num">{{ r.partidas.length }}</td>
                <td class="num">{{ r.placar.vitorias }} · {{ r.placar.empates }} · {{ r.placar.derrotas }}</td>
                <td class="num">{{ aproveitamento(r.placar) }}%</td>
                <td class="num">{{ Math.ceil(r.mediaNoLivro / 2) }} lances</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section v-if="desviosSeus.length">
        <h2>Onde você saiu do livro</h2>
        <ul class="lista">
          <li v-for="grupo in desviosSeus" :key="grupo.chave">
            <div>
              <strong>{{ nomeDoCapitulo(grupo.partidas[0].capitulo!) }}</strong>
              <span>
                {{ sequencia(grupo.partidas[0].desvio!.caminho) }}
                <em>{{ continuacao(grupo.partidas[0].desvio!.caminho, grupo.partidas[0].desvio!.jogado) }}?</em>
              </span>
              <span class="suave">
                Livro: {{ grupo.partidas[0].desvio!.livro.map((san) => lanceNumerado(grupo.partidas[0].desvio!.caminho.length, san)).join(', ') }}
                · {{ grupo.partidas.length }} {{ grupo.partidas.length === 1 ? 'partida' : 'partidas' }}
              </span>
            </div>
            <RouterLink
              class="botao"
              :to="{ name: 'explorar', params: { cap: grupo.partidas[0].capitulo! }, query: { c: [...grupo.partidas[0].desvio!.caminho, grupo.partidas[0].desvio!.jogado].join(' ') } }"
            >Ver no Explorar</RouterLink>
          </li>
        </ul>
      </section>

      <section v-if="foraDoRepertorio.length">
        <h2>Posições fora do repertório que você mais enfrenta</h2>
        <p class="suave">O lance que tirou a partida de todas as aberturas estudadas: bons candidatos para estudar.</p>
        <ul class="lista">
          <li v-for="grupo in foraDoRepertorio" :key="grupo.chave">
            <div>
              <strong>Com as {{ grupo.partidas[0].cor === 'w' ? 'brancas' : 'pretas' }}</strong>
              <span>
                {{ sequencia(grupo.partidas[0].fora!.caminho) }}
                <em>{{ continuacao(grupo.partidas[0].fora!.caminho, grupo.partidas[0].fora!.jogado) }}</em>
              </span>
              <span class="suave">
                {{ (grupo.partidas[0].fora!.caminho.length % 2 === 0) === (grupo.partidas[0].cor === 'w') ? 'Lance seu' : 'Lance do adversário' }}
                · {{ grupo.partidas.length }} {{ grupo.partidas.length === 1 ? 'partida' : 'partidas' }}
              </span>
            </div>
          </li>
        </ul>
      </section>

      <section v-if="noRepertorio.length">
        <h2>Partidas no repertório</h2>
        <ul class="lista">
          <li v-for="p in noRepertorio" :key="p.id">
            <div>
              <strong>{{ textoResultado(p) }} contra {{ p.adversario }}</strong>
              <span class="suave">
                {{ p.data.split('-').reverse().join('/') }} · {{ SITE[p.site] }} · {{ p.cor === 'w' ? 'brancas' : 'pretas' }}
                · {{ nomeDoCapitulo(p.capitulo!) }}
              </span>
              <span>{{ situacaoDaPartida(p) }}</span>
            </div>
            <RouterLink
              v-if="p.lances"
              class="botao"
              :to="{ name: 'analise', query: { c: p.lances, cor: p.cor, titulo: `${textoResultado(p)} contra ${p.adversario}`, volta: '/partidas', parcial: p.lances.split(' ').length >= 50 ? '1' : undefined } }"
            >Analisar</RouterLink>
            <a v-if="p.url" class="botao" :href="p.url" target="_blank" rel="noopener">Ver partida</a>
            <RouterLink
              v-else-if="p.desvio"
              class="botao"
              :to="{ name: 'explorar', params: { cap: p.capitulo! }, query: { c: [...p.desvio.caminho, p.desvio.jogado].join(' ') } }"
            >Ver no Explorar</RouterLink>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<style scoped>
.tabela-rolagem {
  overflow-x: auto;
}
.tabela {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.tabela th,
.tabela td {
  padding: var(--espaco-2);
  border-bottom: 1px solid var(--borda);
  text-align: left;
  white-space: nowrap;
}
.tabela thead th {
  color: var(--texto-suave);
  font-weight: 600;
}
.tabela tbody th {
  font-weight: 400;
  white-space: normal;
}
.tabela .num {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
h1 {
  margin: 0;
}
h2 {
  margin: 0 0 0.5rem;
}
section {
  margin-top: 1.75rem;
}
p {
  margin: 0.25rem 0;
}
.suave {
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.trilha {
  display: inline-flex;
  align-items: center;
  min-height: var(--alvo-toque);
  color: var(--destaque);
  font-size: 14px;
  text-decoration: none;
}
.importar {
  display: block;
  margin-top: var(--espaco-4);
}
.formulario-importar {
  display: grid;
  gap: var(--espaco-3);
}
.formulario-importar + .formulario-importar {
  margin-top: var(--espaco-5);
  padding-top: var(--espaco-4);
  border-top: 1px solid var(--borda);
}
.formulario-importar h3 {
  margin: 0;
  font: 600 17px/24px var(--font-texto);
}
.campo textarea {
  font-family: var(--font-mono);
  font-size: 13px;
  resize: vertical;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.oculto {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.aviso {
  margin-top: var(--espaco-4);
  padding: var(--espaco-3) var(--espaco-4);
  border-radius: var(--raio-md);
  background: var(--ok-suave);
}
.aviso.erro {
  background: var(--erro-suave);
}
.lista li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--espaco-3);
  min-height: 64px;
  padding: var(--espaco-3) var(--espaco-4);
}
.lista li + li {
  border-top: 1px solid var(--borda);
}
.acoes-jogo {
  display: flex !important;
  flex-wrap: wrap;
  gap: var(--espaco-2) !important;
  justify-content: flex-end;
}
/* Partida jogada no app: foto | texto | botões; no celular os botões descem para uma linha própria. */
.lista li.jogo {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) auto;
  align-items: center;
}
@media (max-width: 639.98px) {
  .lista li.jogo {
    grid-template-columns: 40px minmax(0, 1fr);
  }
  .lista li.jogo .acoes-jogo {
    grid-column: 1 / -1;
    justify-content: flex-start;
  }
}
/* Nas outras listas, os botões passam para baixo do texto quando não cabem ao lado. */
.lista li:not(.jogo) {
  flex-wrap: wrap;
}
.lista li:not(.jogo) > div:first-child {
  flex: 1 1 14rem;
}
.lista li div {
  display: grid;
  gap: 0.125rem;
  min-width: 0;
}
.quem-jogou {
  align-self: flex-start;
}
.sobre-jogo {
  flex: 1;
}
em {
  font-style: normal;
  font-weight: 600;
}
</style>
