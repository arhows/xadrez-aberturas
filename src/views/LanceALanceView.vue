<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  chaveDoLogico,
  corDoVencedorLogico,
  ehLivro,
  LIVROS,
  obterLogico,
  partidaPronta,
  type IdDoLivro,
  type PartidaLogica,
} from '../lib/logico'
import { progresso } from '../lib/progresso'
import { useVolta } from '../lib/volta'

const volta = useVolta('/aprender')
const route = useRoute()
const router = useRouter()

/** Os dois livros do Chernev; a aba fica na URL (?livro=instrutivas). */
const livro = computed<IdDoLivro>(() => (ehLivro(route.query.livro) ? route.query.livro : 'logico'))
const dados = computed(() => LIVROS[livro.value])
function escolher(id: IdDoLivro) {
  router.replace({ query: id === 'logico' ? {} : { livro: id } })
}
const partidas = computed(() => obterLogico(livro.value))
const partes = computed(() =>
  dados.value.partes.map((parte) => ({ ...parte, partidas: partidas.value.filter((p) => p.n >= parte.de && p.n <= parte.ate) })),
)
const prontas = computed(() => partidas.value.filter(partidaPronta).length)

const resultado = (p: PartidaLogica) => progresso.estrategia[chaveDoLogico(p.n, livro.value)]
const ladoDoVencedor = (p: PartidaLogica) => (corDoVencedorLogico(p) === 'w' ? 'brancas' : 'pretas')
const destino = (p: PartidaLogica) =>
  livro.value === 'logico'
    ? { name: 'lance-a-lance-partida', params: { n: p.n } }
    : { name: 'lance-a-lance-livro', params: { livro: livro.value, n: p.n } }
const lugar = (p: PartidaLogica) => [p.local, p.ano].filter(Boolean).join(' ')
</script>

<template>
  <div class="pagina lance-a-lance">
    <RouterLink :to="volta.para" class="trilha">‹ {{ volta.nome }}</RouterLink>
    <h1 class="titulo-pagina">Lance a lance</h1>
    <div class="segmentado livros" role="tablist" aria-label="Livro">
      <button type="button" role="tab" :aria-selected="livro === 'logico'" :aria-pressed="livro === 'logico'" @click="escolher('logico')">
        Logical Chess
      </button>
      <button
        type="button"
        role="tab"
        :aria-selected="livro === 'instrutivas'"
        :aria-pressed="livro === 'instrutivas'"
        @click="escolher('instrutivas')"
      >Most Instructive Games</button>
    </div>
    <p class="intro">
      <em>{{ dados.titulo }}</em>, de Irving Chernev. {{ dados.descricao }} Quando o seu lance é diferente, o Stockfish diz se
      ele também era bom. As explicações são do app, para acompanhar a leitura do livro.
    </p>
    <p class="suave">
      {{ prontas }} de {{ partidas.length }} partidas prontas<template v-if="prontas < partidas.length">; as outras chegam aos poucos</template>.
    </p>

    <section v-for="parte in partes" :key="parte.titulo" class="parte">
      <h2 class="titulo-secao">{{ parte.titulo }}</h2>
      <ul class="lista">
        <li v-for="p in parte.partidas" :key="p.n">
          <RouterLink v-if="partidaPronta(p)" class="linha-lista" :to="destino(p)">
            <span class="numero">{{ p.n }}</span>
            <span class="textos">
              <span class="nome">{{ p.brancas }} – {{ p.pretas }}</span>
              <span class="meta">{{ p.abertura }} · {{ lugar(p) }} · você joga com as {{ ladoDoVencedor(p) }}</span>
            </span>
            <span v-if="resultado(p)" class="selo ok">✓ {{ resultado(p).acertos }}/{{ resultado(p).total }}</span>
          </RouterLink>
          <div v-else class="linha-lista em-breve" aria-disabled="true">
            <span class="numero">{{ p.n }}</span>
            <span class="textos">
              <span class="nome">{{ p.brancas }} – {{ p.pretas }}</span>
              <span class="meta">{{ p.abertura }} · {{ lugar(p) }}</span>
            </span>
            <span class="selo">EM BREVE</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.lance-a-lance {
  display: grid;
  gap: var(--espaco-4);
  max-width: 720px;
}
h1,
h2,
.intro,
.suave {
  margin: 0;
}
.intro {
  line-height: 1.5;
}
.livros button {
  flex: 1;
}
.suave {
  color: var(--texto-suave);
  font-size: 14px;
}
.parte {
  display: grid;
  gap: var(--espaco-2);
}
.lista {
  margin: 0;
  padding: 0;
  list-style: none;
}
.linha-lista {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
}
.numero {
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--superficie-2);
  color: var(--texto-suave);
  font: 600 14px/32px var(--font-texto);
  text-align: center;
}
.textos {
  display: grid;
  flex: 1;
  min-width: 0;
}
.em-breve {
  opacity: 0.6;
}
.selo.ok {
  color: var(--ok);
}
</style>
