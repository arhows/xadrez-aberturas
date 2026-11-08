<script setup lang="ts">
import { computed, ref } from 'vue'
import { buscarCapitulo, obterCapitulos } from '../lib/capitulos'
import { fmtLance } from '../lib/formato'
import { importarPartidas, type ResultadoImportacao } from '../lib/importarPartidas'
import type { PartidaAnalisada } from '../lib/partidas'
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
const porCapitulo = computed(() => {
  const contagem = new Map<string, number>()
  for (const p of noRepertorio.value) contagem.set(p.capitulo!, (contagem.get(p.capitulo!) ?? 0) + 1)
  return [...contagem].map(([id, total]) => ({ nome: nomeDoCapitulo(id), total }))
})

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

const SITE = { lichess: 'lichess', chesscom: 'chess.com' } as const
</script>

<template>
  <div class="pagina">
    <nav class="trilha" aria-label="Caminho">
      <RouterLink to="/aberturas">Aberturas</RouterLink>
      <span aria-hidden="true">›</span>
      <span>Minhas partidas</span>
    </nav>
    <h1>Minhas partidas</h1>
    <p class="suave">
      Importa suas partidas e mostra onde elas saíram do repertório. Cada vez que você sai do livro, aquele lance
      passa a ser cobrado com mais frequência no Treino.
    </p>

    <form class="importar" @submit.prevent="importar">
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
      <section>
        <h2>Resumo</h2>
        <p>
          {{ todas.length }} partidas · <strong>{{ noRepertorio.length }}</strong> no seu repertório
          <template v-if="porCapitulo.length">
            ({{ porCapitulo.map((c) => `${c.nome}: ${c.total}`).join(', ') }})
          </template>
        </p>
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
              :to="{ name: 'explorar', params: { cap: grupo.partidas[0].capitulo! }, query: { c: grupo.partidas[0].desvio!.caminho.join(' ') } }"
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
            <a class="botao" :href="p.url" target="_blank" rel="noopener">Ver partida</a>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<style scoped>
.trilha {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.trilha a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
}
h1 {
  margin: 0;
  font-size: 1.25rem;
}
h2 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
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
.importar {
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--borda);
  border-radius: 12px;
  background: var(--superficie);
}
.campo {
  display: grid;
  gap: 0.25rem;
}
.campo input {
  min-height: 44px;
  padding: 0 0.75rem;
  border: 1px solid var(--borda);
  border-radius: 8px;
  background: var(--fundo);
  color: var(--texto);
  font: inherit;
}
.aviso {
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  border-left: 4px solid var(--ok);
  border-radius: 8px;
  background: var(--superficie);
}
.aviso.erro {
  border-color: var(--erro);
}
.lista {
  margin: 0;
  padding: 0;
  list-style: none;
}
.lista li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-top: 1px solid var(--borda);
}
.lista li div {
  display: grid;
  gap: 0.125rem;
  min-width: 0;
}
em {
  font-style: normal;
  font-weight: 600;
}
</style>
