<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue'
import { obterCapitulos } from '../lib/capitulos'
import { buscarEstatisticas, ErroExplorador, FAIXAS_RATING, type Estatisticas } from '../lib/explorador'
import { fmtLance, fmtSan, fmtTexto } from '../lib/formato'
import { jogoDosLances } from '../lib/jogo'
import { conectarLichess, conexaoInvalida, conexaoLichess } from '../lib/lichessConta'
import { resumoDosCapitulos } from '../lib/painel'
import { maisJogados, montarLanceAdversario, planoDeEstudo, type LanceAdversario, type Lado } from '../lib/preparacao'
import { progresso } from '../lib/progresso'
import { alternarRepertorio, estaNoRepertorio } from '../lib/repertorio'

/** O que estudar: os lances mais jogados no lichess no seu nível e as defesas que o livro cobre. */

const config = progresso.config
const lado = ref<Lado>('b')
const primeiroLance = ref('e4')
const carregando = ref(false)
const etapa = ref('')
const erro = ref<string | null>(null)
const inicio = shallowRef<Estatisticas | null>(null)
const lances = shallowRef<LanceAdversario[]>([])

const capitulos = obterCapitulos()
const dominioPorCapitulo = computed(() => {
  const mapa = new Map<string, number>()
  for (const r of resumoDosCapitulos(capitulos, progresso.cartoes, progresso.corPorCapitulo)) {
    mapa.set(r.capitulo.capitulo.id, r.total ? Math.round((r.estagios.dominadas / r.total) * 100) : 0)
  }
  return mapa
})

/** Lances antes dos do adversário: de pretas, nenhum; de brancas, o seu primeiro lance. */
const prefixo = computed(() => (lado.value === 'b' ? [] : [primeiroLance.value]))

const fenDe = (sans: string[]) => jogoDosLances(sans).fen()

let pedido = 0
async function consultar() {
  const token = conexaoLichess.value?.token
  if (!token) return
  const meu = ++pedido
  carregando.value = true
  erro.value = null
  lances.value = []
  try {
    const consulta = (sans: string[]) => buscarEstatisticas(fenDe(sans), 'lichess', token, config.ratingExplorador)
    etapa.value = 'Primeiros lances…'
    inicio.value = await consulta([])
    const doAdversario = maisJogados(await consulta(prefixo.value))
    const montados: LanceAdversario[] = []
    for (const [i, l] of doAdversario.entries()) {
      if (meu !== pedido) return
      etapa.value = `Respostas a ${fmtSan(l.san)} (${i + 1} de ${doAdversario.length})…`
      const depois = await consulta([...prefixo.value, l.san])
      montados.push(
        montarLanceAdversario(
          l,
          depois,
          prefixo.value,
          lado.value,
          capitulos,
          (id) => dominioPorCapitulo.value.get(id) ?? 0,
          estaNoRepertorio,
        ),
      )
      lances.value = [...montados]
    }
  } catch (falha) {
    if (meu !== pedido) return
    erro.value = falha instanceof Error ? falha.message : 'Não foi possível consultar o lichess.'
    if (falha instanceof ErroExplorador && falha.tipo === 'sem-login') conexaoInvalida()
  } finally {
    if (meu === pedido) {
      carregando.value = false
      etapa.value = ''
    }
  }
}

watch(() => [lado.value, primeiroLance.value, config.ratingExplorador, conexaoLichess.value?.token], consultar, { immediate: true })

const plano = computed(() => planoDeEstudo(lances.value))
const primeiros = computed(() => (inicio.value ? maisJogados(inicio.value, 4) : []))
/** Opções de primeiro lance de brancas: os mais jogados no lichess (e4 e d4 sempre). */
const opcoesPrimeiro = computed(() => [...new Set(['e4', 'd4', ...primeiros.value.map((l) => l.san)])])

const pct = (fracao: number) => `${Math.round(fracao * 100)}%`
const numero = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mi` : n >= 10_000 ? `${Math.round(n / 1000)} mil` : n.toLocaleString('pt-BR'))
/** "1.e4", "1...c5", "2.Nf3" conforme a posição na sequência. */
const lanceNumerado = (indice: number, san: string) => fmtLance(indice + 1, san)

async function conectar() {
  erro.value = null
  try {
    await conectarLichess()
  } catch (falha) {
    erro.value = falha instanceof Error ? falha.message : 'Não foi possível conectar.'
  }
}
</script>

<template>
  <div class="pagina">
    <RouterLink to="/" class="trilha">‹ Início</RouterLink>
    <h1>O que estudar</h1>
    <p class="intro">
      Os lances mais jogados no lichess por jogadores do seu nível (partidas blitz, rápidas e clássicas) e, contra cada um,
      as respostas mais usadas e os capítulos do livro que as cobrem.
    </p>

    <section class="cartao escolhas">
      <fieldset class="opcoes">
        <legend>Eu jogo com</legend>
        <label class="marcar"><input v-model="lado" type="radio" value="b" /> Pretas (como me defender)</label>
        <label class="marcar"><input v-model="lado" type="radio" value="w" /> Brancas</label>
      </fieldset>
      <label v-if="lado === 'w'" class="campo">
        <span>Meu primeiro lance</span>
        <select v-model="primeiroLance">
          <option v-for="san in opcoesPrimeiro" :key="san" :value="san">1.{{ fmtSan(san) }}</option>
        </select>
      </label>
      <label class="campo">
        <span>Nível dos jogadores (rating do lichess)</span>
        <select v-model.number="config.ratingExplorador">
          <option v-for="faixa in FAIXAS_RATING" :key="faixa" :value="faixa">{{ faixa === 0 ? 'Até 1000' : `Por volta de ${faixa}` }}</option>
        </select>
      </label>
    </section>

    <section v-if="!conexaoLichess" class="cartao">
      <p>
        O explorador do lichess exige uma conta. Conecte a sua: o app não pede nenhuma permissão, e a conexão fica só
        neste aparelho.
      </p>
      <button type="button" class="botao primario" @click="conectar">Conectar com o lichess</button>
    </section>

    <p v-if="erro" class="erro" role="alert">{{ erro }}</p>
    <p v-if="carregando" class="suave" role="status">Consultando o lichess: {{ etapa }}</p>

    <section v-if="lado === 'b' && primeiros.length" class="cartao">
      <h2>Primeiros lances das brancas</h2>
      <ul class="barras">
        <li v-for="l in primeiros" :key="l.san">
          <span class="lance">1.{{ fmtSan(l.san) }}</span>
          <span class="trilho"><span :style="{ width: pct(l.parte) }"></span></span>
          <span class="valor">{{ pct(l.parte) }}</span>
        </li>
      </ul>
    </section>

    <section v-if="plano.length" class="cartao plano">
      <h2>Plano de estudo</h2>
      <p class="suave">Do mais urgente (jogado com frequência e pouco estudado) ao menos urgente.</p>
      <ol>
        <li v-for="item in plano" :key="item.contra">
          <strong>
            Contra <span class="lance">{{ lanceNumerado(prefixo.length, item.contra) }}</span> ({{ pct(item.parte) }} das partidas):
            <span class="lance">{{ lanceNumerado(prefixo.length + 1, item.resposta.san) }}</span>
          </strong>
          <span v-if="item.resposta.capitulos.length" class="suave">
            — {{ item.resposta.capitulos.length === 1 ? fmtTexto(item.resposta.capitulos[0].nome) : `${item.resposta.capitulos.length} capítulos no livro` }}
            · você domina {{ Math.round(item.dominio) }}%
          </span>
          <span v-else class="suave"> — o livro ainda não tem capítulo para esta resposta.</span>
        </li>
      </ol>
    </section>

    <section v-for="l in lances" :key="l.san" class="cartao adversario">
      <header>
        <h2>
          <span class="lance">{{ prefixo.length ? `1.${fmtSan(prefixo[0])} ${fmtSan(l.san)}` : lanceNumerado(0, l.san) }}</span>
        </h2>
        <span class="suave">{{ pct(l.parte) }} das partidas · {{ numero(l.total) }} jogos</span>
      </header>
      <p class="suave">O que se responde contra isso no seu nível:</p>
      <p v-if="!l.respostas.length" class="suave">O lichess não tem partidas suficientes depois deste lance.</p>
      <ul class="respostas">
        <li v-for="r in l.respostas" :key="r.san" :class="{ sugerida: l.sugestao?.san === r.san }">
          <div class="linha-resposta">
            <span class="lance grande">{{ lanceNumerado(prefixo.length + 1, r.san) }}</span>
            <span class="suave">{{ pct(r.parte) }} · {{ Math.round(r.pontos) }}% de pontos para você</span>
            <span v-if="l.sugestao?.san === r.san" class="selo">SUGESTÃO</span>
          </div>
          <ul v-if="r.capitulos.length" class="capitulos">
            <li v-for="c in r.capitulos.slice(0, 4)" :key="c.id">
              <button
                type="button"
                class="estrela"
                :class="{ ativa: estaNoRepertorio(c.id) }"
                :aria-pressed="estaNoRepertorio(c.id)"
                :title="estaNoRepertorio(c.id) ? 'Tirar do meu repertório' : 'Pôr no meu repertório'"
                @click="alternarRepertorio(c.id)"
              >{{ estaNoRepertorio(c.id) ? '★' : '☆' }}</button>
              <RouterLink :to="{ name: 'abertura', params: { cap: c.id } }">{{ fmtTexto(c.nome) }}</RouterLink>
              <span class="suave">domínio {{ c.dominio }}%</span>
            </li>
            <li v-if="r.capitulos.length > 4">
              <RouterLink :to="{ name: 'aberturas', query: { q: [...prefixo, l.san, r.san].join(' ') } }">
                Ver todos os {{ r.capitulos.length }} capítulos
              </RouterLink>
            </li>
          </ul>
          <p v-else class="suave">Ainda sem capítulo no livro.</p>
          <p v-if="r.parcial" class="suave">O livro cobre esta sequência só em parte (transposição ou ordem diferente).</p>
        </li>
      </ul>
    </section>
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
  font-size: 1.125rem;
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
.campo {
  display: grid;
  gap: var(--espaco-1);
  font-weight: 600;
}
.campo select {
  min-height: 44px;
  padding: 0 var(--espaco-3);
  border: 1px solid var(--borda-controle);
  border-radius: var(--raio-md);
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  font-weight: 400;
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
.barras {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
.barras li {
  display: grid;
  grid-template-columns: 4rem 1fr 3rem;
  align-items: center;
  gap: var(--espaco-2);
}
.trilho {
  display: block;
  height: 10px;
  border-radius: 5px;
  background: var(--superficie-2);
  overflow: hidden;
}
.trilho span {
  display: block;
  height: 100%;
  border-radius: 5px;
  background: var(--destaque);
}
.valor {
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.plano ol {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.5;
}
.adversario header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--espaco-2);
}
.respostas {
  display: grid;
  gap: var(--espaco-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
.respostas > li {
  display: grid;
  gap: var(--espaco-1);
  padding: var(--espaco-2) var(--espaco-3);
  border: 1px solid var(--borda);
  border-radius: var(--raio-md);
}
.respostas > li.sugerida {
  border-color: var(--ok);
  border-width: 2px;
}
.linha-resposta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--espaco-2);
}
.lance.grande {
  font-weight: 700;
  font-size: 1.05rem;
}
.selo {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--ok);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}
.capitulos {
  display: grid;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.capitulos li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2);
}
.capitulos a {
  color: var(--destaque);
}
.estrela {
  min-width: 36px;
  min-height: 36px;
  border: 0;
  background: none;
  color: var(--texto-suave);
  font-size: 1.2rem;
  cursor: pointer;
}
.estrela.ativa {
  color: #c9a227;
}
</style>
