<script setup lang="ts">
import { computed } from 'vue'
import { chaveDoLogico, corDoVencedorLogico, obterLogico, partidaPronta, type PartidaLogica } from '../lib/logico'
import { progresso } from '../lib/progresso'

/** Lista das 33 partidas de "Logical Chess: Move by Move", nas três partes do livro. */
const PARTES = [
  { titulo: 'O ataque na ala do rei', de: 1, ate: 16 },
  { titulo: 'A abertura do peão da dama', de: 17, ate: 23 },
  { titulo: 'O mestre explica as suas ideias', de: 24, ate: 33 },
]
const partidas = obterLogico()
const partes = computed(() => PARTES.map((parte) => ({ ...parte, partidas: partidas.filter((p) => p.n >= parte.de && p.n <= parte.ate) })))
const prontas = partidas.filter(partidaPronta).length

const resultado = (p: PartidaLogica) => progresso.estrategia[chaveDoLogico(p.n)]
const ladoDoVencedor = (p: PartidaLogica) => (corDoVencedorLogico(p) === 'w' ? 'brancas' : 'pretas')
</script>

<template>
  <div class="pagina lance-a-lance">
    <RouterLink to="/aprender" class="trilha">‹ Aprender</RouterLink>
    <h1 class="titulo-pagina">Lance a lance</h1>
    <p class="intro">
      As 33 partidas de <em>Logical Chess: Move by Move</em>, de Irving Chernev. Em cada uma você joga com o lado vencedor e
      tenta achar todos os lances; depois de cada um, lê por que ele foi jogado. Quando o seu lance é diferente, o Stockfish
      diz se ele também era bom. As explicações são do app, para acompanhar a leitura do livro.
    </p>
    <p class="suave">{{ prontas }} de {{ partidas.length }} partidas prontas; as outras chegam aos poucos.</p>

    <section v-for="parte in partes" :key="parte.titulo" class="parte">
      <h2 class="titulo-secao">{{ parte.titulo }}</h2>
      <ul class="lista">
        <li v-for="p in parte.partidas" :key="p.n">
          <RouterLink v-if="partidaPronta(p)" class="linha-lista" :to="{ name: 'lance-a-lance-partida', params: { n: p.n } }">
            <span class="numero">{{ p.n }}</span>
            <span class="textos">
              <span class="nome">{{ p.brancas }} – {{ p.pretas }}</span>
              <span class="meta">{{ p.abertura }} · {{ p.local }} {{ p.ano }} · você joga com as {{ ladoDoVencedor(p) }}</span>
            </span>
            <span v-if="resultado(p)" class="selo ok">✓ {{ resultado(p).acertos }}/{{ resultado(p).total }}</span>
          </RouterLink>
          <div v-else class="linha-lista em-breve" aria-disabled="true">
            <span class="numero">{{ p.n }}</span>
            <span class="textos">
              <span class="nome">{{ p.brancas }} – {{ p.pretas }}</span>
              <span class="meta">{{ p.abertura }} · {{ p.local }} {{ p.ano }}</span>
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
