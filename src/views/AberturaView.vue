<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Avaliacao from '../components/Avaliacao.vue'
import { caminhoDaArmadilha } from '../lib/arvore'
import { buscarCapitulo } from '../lib/capitulos'
import { baixarTexto } from '../lib/download'
import { linhasDoGrupo } from '../lib/escopo'
import { familiaDaAbertura } from '../lib/familias'
import { fmtLance, fmtTexto } from '../lib/formato'
import { aproveitamento, resumoPorAbertura } from '../lib/partidasRepertorio'
import { progresso } from '../lib/progresso'
import { exportarPgn } from '../lib/pgn'
import { filaDoCapitulo, percentual, percentualLinha, revisoesDaLinha } from '../lib/resumoAberturas'

const route = useRoute()
const capitulo = buscarCapitulo(route.params.cap as string)!
const id = capitulo.capitulo.id
const familia = familiaDaAbertura(capitulo.capitulo.base)

// Suas partidas que seguiram esta abertura (importadas em Minhas partidas).
const partidas = computed(() =>
  resumoPorAbertura(Object.values(progresso.partidas.analisadas).filter((p) => p.capitulo === id))[0],
)
/** Onde você saiu do livro nesta abertura, do desvio mais repetido ao menos (até 3). */
const seusDesvios = computed(() => {
  const grupos = new Map<string, { caminho: string[]; jogado: string; livro: string; total: number }>()
  for (const p of partidas.value?.partidas ?? []) {
    if (p.desvio?.quem !== 'voce') continue
    const chave = `${p.desvio.caminho.join(' ')}|${p.desvio.jogado}`
    const grupo = grupos.get(chave) ?? { caminho: p.desvio.caminho, jogado: p.desvio.jogado, livro: p.desvio.livro[0], total: 0 }
    grupo.total++
    grupos.set(chave, grupo)
  }
  return [...grupos.values()].sort((a, b) => b.total - a.total).slice(0, 3)
})

function baixarPgn() {
  baixarTexto(`${id}.pgn`, exportarPgn(capitulo), 'application/x-chess-pgn')
}
</script>

<template>
  <div class="pagina">
    <nav class="trilha" aria-label="Caminho">
      <RouterLink to="/aberturas">Aberturas</RouterLink>
      <span aria-hidden="true">›</span>
      <span>{{ familia.nome }}</span>
    </nav>

    <header>
      <h1>{{ capitulo.capitulo.nome }}</h1>
      <p class="suave">{{ fmtTexto(capitulo.capitulo.base) }}</p>
      <p class="suave">
        {{ percentual(capitulo) }}% dominado · {{ filaDoCapitulo(id) }} para hoje
      </p>
      <div class="acoes">
        <RouterLink class="botao primario" :to="{ name: 'treino', params: { cap: id } }">Treinar</RouterLink>
        <RouterLink class="botao" :to="{ name: 'explorar', params: { cap: id } }">Explorar</RouterLink>
        <button type="button" class="botao" @click="baixarPgn">Exportar PGN</button>
      </div>
    </header>

    <details v-if="partidas" class="grupo">
      <summary>
        <span>Suas partidas</span>
        <span class="suave">{{ partidas.partidas.length }}</span>
      </summary>
      <div class="suas-partidas">
        <p>
          {{ partidas.placar.vitorias }} {{ partidas.placar.vitorias === 1 ? 'vitória' : 'vitórias' }},
          {{ partidas.placar.empates }} {{ partidas.placar.empates === 1 ? 'empate' : 'empates' }},
          {{ partidas.placar.derrotas }} {{ partidas.placar.derrotas === 1 ? 'derrota' : 'derrotas' }}
          · {{ aproveitamento(partidas.placar) }}% dos pontos
          · em média {{ Math.ceil(partidas.mediaNoLivro / 2) }} lances no livro
        </p>
        <template v-if="seusDesvios.length">
          <p class="suave">Onde você mais sai do livro:</p>
          <ul class="linhas">
            <li v-for="d in seusDesvios" :key="`${d.caminho.join(' ')}|${d.jogado}`">
              <div class="info">
                <span>
                  Você jogou <strong>{{ fmtLance(d.caminho.length + 1, d.jogado) }}</strong>; o livro indica
                  <strong>{{ fmtLance(d.caminho.length + 1, d.livro) }}</strong>
                </span>
                <span class="suave">{{ d.total }} {{ d.total === 1 ? 'partida' : 'partidas' }}</span>
              </div>
              <div class="acoes">
                <RouterLink class="botao" :to="{ name: 'explorar', params: { cap: id }, query: { c: d.caminho.join(' ') } }">Ver no Explorar</RouterLink>
              </div>
            </li>
          </ul>
        </template>
        <p v-else class="suave">Você não saiu do livro em nenhuma delas.</p>
        <RouterLink to="/partidas">Ver todas em Minhas partidas</RouterLink>
      </div>
    </details>

    <details v-if="capitulo.capitulo.armadilhas?.length" class="grupo">
      <summary>
        <span>Armadilhas</span>
        <span class="suave">{{ capitulo.capitulo.armadilhas.length }}</span>
      </summary>
      <ul class="linhas">
        <li v-for="armadilha in capitulo.capitulo.armadilhas" :key="armadilha.id">
          <RouterLink :to="{ name: 'explorar', params: { cap: id }, query: { c: caminhoDaArmadilha(armadilha).join(' ') } }">
            {{ armadilha.titulo }}
          </RouterLink>
        </li>
      </ul>
    </details>

    <details v-for="grupo in capitulo.capitulo.grupos" :key="grupo.id" class="grupo">
      <summary>
        <span>{{ grupo.nome }}</span>
        <span class="suave">{{ percentual(capitulo, linhasDoGrupo(capitulo, grupo.id)) }}%</span>
      </summary>

      <RouterLink class="botao treinar-grupo" :to="{ name: 'treino', params: { cap: id }, query: { escopo: `grupo:${grupo.id}` } }">
        Treinar grupo
      </RouterLink>

      <ul class="linhas">
        <li
          v-for="linha in linhasDoGrupo(capitulo, grupo.id)"
          :key="linha.id"
          :class="{ desativada: capitulo.desativadas.includes(linha.id) }"
        >
          <div class="info">
            <strong>{{ linha.coluna === null ? 'Bônus' : `Coluna ${linha.coluna}` }}</strong>
            <Avaliacao :valor="linha.avaliacao" />
            <span class="nome">{{ linha.nome }}</span>
            <span class="suave">{{ percentualLinha(capitulo, linha) }}% · {{ revisoesDaLinha(capitulo, linha) }}</span>
          </div>
          <div v-if="!capitulo.desativadas.includes(linha.id)" class="acoes">
            <RouterLink class="botao" :to="{ name: 'estudo', params: { cap: id, linha: linha.id } }">Estudar</RouterLink>
            <RouterLink class="botao" :to="{ name: 'treino', params: { cap: id }, query: { escopo: `linha:${linha.id}` } }">
              Treinar
            </RouterLink>
          </div>
          <RouterLink v-else to="/diagnostico">Desativada: ver Diagnóstico</RouterLink>
        </li>
      </ul>
    </details>

    <p v-if="capitulo.capitulo.fonte" class="suave fonte">{{ capitulo.capitulo.fonte }}</p>
  </div>
</template>

<style scoped>
.suas-partidas {
  display: grid;
  gap: 0.5rem;
  padding: 0 0 0.75rem;
}
.suas-partidas > p,
.suas-partidas > a {
  margin: 0;
  padding: 0 1rem;
}
.trilha {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
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
}
.suave {
  margin: 0.25rem 0 0;
  color: var(--texto-suave);
  font-size: 0.875rem;
}
header .acoes {
  margin-top: 0.75rem;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.grupo {
  margin-top: var(--espaco-3);
  border: 1px solid var(--borda);
  border-radius: var(--raio-lg);
  background: var(--superficie);
  overflow: hidden;
}
summary {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  font-weight: 600;
  cursor: pointer;
}
.treinar-grupo {
  margin: 0 1rem 0.5rem;
}
.linhas {
  margin: 0;
  padding: 0;
  list-style: none;
}
.linhas li {
  display: grid;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--borda);
}
.info {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5rem;
}
.nome,
.info .suave {
  width: 100%;
}
.desativada {
  opacity: 0.6;
}
.fonte {
  margin-top: 1.5rem;
}
</style>
