<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Avaliacao from '../components/Avaliacao.vue'
import MiniTabuleiro from '../components/MiniTabuleiro.vue'
import { caminhoDaArmadilha } from '../lib/arvore'
import { buscarCapitulo } from '../lib/capitulos'
import { baixarTexto } from '../lib/download'
import { corDoCapitulo, linhasDoGrupo, type EscolhaCor } from '../lib/escopo'
import { familiaDaAbertura } from '../lib/familias'
import { fmtLance, fmtTexto } from '../lib/formato'
import { aproveitamento, resumoPorAbertura } from '../lib/partidasRepertorio'
import { progresso } from '../lib/progresso'
import { alternarRepertorio, estaNoRepertorio, repertorioEscolhido } from '../lib/repertorio'
import { exportarPgn } from '../lib/pgn'
import { fenDaAbertura, orientacaoDaAbertura } from '../lib/posicaoDaAbertura'
import { filaDoCapitulo, percentual, percentualLinha, revisoesDaLinha } from '../lib/resumoAberturas'

const route = useRoute()
const capitulo = buscarCapitulo(route.params.cap as string)!
const id = capitulo.capitulo.id
const familia = familiaDaAbertura(capitulo.capitulo.base)

const noRepertorio = computed(() => estaNoRepertorio(id))
/** A mesma cor da tela de Treino: as revisões e linhas novas deste capítulo usam esta escolha. */
const cor = computed<EscolhaCor>({
  get: () => corDoCapitulo(capitulo, progresso.corPorCapitulo),
  set: (valor) => {
    progresso.corPorCapitulo[id] = valor
  },
})

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

const dominado = computed(() => percentual(capitulo))
const paraHoje = computed(() => filaDoCapitulo(id))
const OPCOES_DE_COR: { valor: EscolhaCor; nome: string }[] = [
  { valor: 'w', nome: 'Brancas' },
  { valor: 'b', nome: 'Pretas' },
  { valor: 'ambas', nome: 'Ambas' },
]

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

    <header class="cartao cabeca-abertura">
      <div class="topo-abertura">
        <div class="titulos">
          <h1>{{ capitulo.capitulo.nome }}</h1>
          <p class="apoio suave">{{ fmtTexto(capitulo.capitulo.base) }}</p>
        </div>
        <MiniTabuleiro class="miniatura" :fen="fenDaAbertura(capitulo)" :orientacao="orientacaoDaAbertura(capitulo)" :rotulo="`Posição da ${capitulo.capitulo.nome}`" />
      </div>
      <div class="progresso fino">
        <div class="rotulos">
          <span><strong>{{ dominado }}%</strong> dominado</span>
          <span v-if="paraHoje" class="selo">{{ paraHoje }} PARA HOJE</span>
          <span v-else-if="noRepertorio" class="selo ok">EM DIA</span>
        </div>
        <div class="trilho"><span :style="{ width: `${dominado}%` }"></span></div>
      </div>
      <div class="acoes">
        <RouterLink
          class="botao primario grande"
          :to="{ name: 'treino', params: { cap: id }, query: paraHoje ? { auto: '1' } : {} }"
        >{{ paraHoje ? `Revisar (${paraHoje})` : 'Treinar' }}</RouterLink>
        <RouterLink class="botao grande" :to="{ name: 'explorar', params: { cap: id } }">Explorar</RouterLink>
      </div>
    </header>

    <section class="cartao repertorio">
      <div class="cabeca">
        <span class="titulo-item">{{ noRepertorio ? 'No meu repertório' : 'Fora do repertório' }}</span>
        <button
          type="button"
          class="botao"
          :class="noRepertorio ? 'fantasma' : 'primario'"
          :aria-pressed="noRepertorio"
          @click="alternarRepertorio(id)"
        >{{ noRepertorio ? 'Tirar' : '☆ Adicionar' }}</button>
      </div>
      <div v-if="noRepertorio" class="campo" role="group" aria-labelledby="rotulo-cor-abertura">
        <span id="rotulo-cor-abertura" class="apoio suave">Jogo com</span>
        <div class="segmentado">
          <button
            v-for="opcao in OPCOES_DE_COR"
            :key="opcao.valor"
            type="button"
            :aria-pressed="cor === opcao.valor"
            @click="cor = opcao.valor"
          >{{ opcao.nome }}</button>
        </div>
      </div>
      <p v-else-if="repertorioEscolhido" class="apoio suave">
        Não entra nas revisões nem nas linhas novas do dia, mas dá para estudar e treinar à vontade.
      </p>
    </section>

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

      <RouterLink class="botao fantasma treinar-grupo" :to="{ name: 'treino', params: { cap: id }, query: { escopo: `grupo:${grupo.id}` } }">
        Treinar o grupo inteiro
      </RouterLink>

      <ul class="linhas">
        <li
          v-for="linha in linhasDoGrupo(capitulo, grupo.id)"
          :key="linha.id"
          :class="{ desativada: capitulo.desativadas.includes(linha.id) }"
        >
          <template v-if="!capitulo.desativadas.includes(linha.id)">
            <RouterLink class="info" :to="{ name: 'estudo', params: { cap: id, linha: linha.id } }" :title="`Estudar ${linha.nome}`">
              <span class="nome-linha">
                <strong>{{ linha.coluna === null ? 'Bônus' : `Coluna ${linha.coluna}` }}</strong>
                <Avaliacao :valor="linha.avaliacao" />
              </span>
              <span class="nome">{{ linha.nome }}</span>
              <span class="apoio suave">{{ percentualLinha(capitulo, linha) }}% · {{ revisoesDaLinha(capitulo, linha) }}</span>
            </RouterLink>
            <RouterLink
              class="botao fantasma treinar-linha"
              :to="{ name: 'treino', params: { cap: id }, query: { escopo: `linha:${linha.id}` } }"
              :aria-label="`Treinar ${linha.nome}`"
            >Treinar</RouterLink>
          </template>
          <div v-else class="info">
            <strong>{{ linha.coluna === null ? 'Bônus' : `Coluna ${linha.coluna}` }}</strong>
            <span class="nome">{{ linha.nome }}</span>
            <RouterLink to="/diagnostico">Desativada: ver Diagnóstico</RouterLink>
          </div>
        </li>
      </ul>
    </details>

    <footer class="rodape">
      <p v-if="capitulo.capitulo.fonte" class="suave">{{ capitulo.capitulo.fonte }}</p>
      <button type="button" class="botao fantasma" @click="baixarPgn">Exportar PGN</button>
    </footer>
  </div>
</template>

<style scoped>
.pagina {
  display: grid;
  gap: var(--espaco-4);
}
.topo-abertura {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 96px;
  align-items: start;
  gap: var(--espaco-3);
}
.titulos {
  display: grid;
  gap: var(--espaco-1);
}
@media (min-width: 800px) {
  .topo-abertura {
    grid-template-columns: minmax(0, 1fr) 128px;
  }
}
.cabeca-abertura .acoes > .botao {
  flex: 1 1 8rem;
}
.repertorio .campo {
  gap: var(--espaco-2);
}
.cabeca-abertura .suave,
.repertorio .apoio {
  margin: 0;
}
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
  margin-bottom: calc(-1 * var(--espaco-3));
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
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.grupo {
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
  display: flex;
  align-items: center;
  gap: var(--espaco-2);
  padding: var(--espaco-1) var(--espaco-2) var(--espaco-1) 0;
  border-top: 1px solid var(--borda);
}
.linhas li > a:only-child {
  padding: var(--espaco-3) var(--espaco-4);
  min-height: var(--alvo-toque);
}
.info {
  display: grid;
  flex: 1;
  min-width: 0;
  padding: var(--espaco-2) var(--espaco-4);
  color: var(--texto);
  text-decoration: none;
}
a.info {
  border-radius: var(--raio-md);
}
a.info:hover {
  background: var(--superficie-2);
}
.nome-linha {
  display: flex;
  align-items: center;
  gap: var(--espaco-2);
}
.info .suave {
  margin: 0;
}
.treinar-linha {
  flex: none;
}
.desativada {
  opacity: 0.6;
}
.rodape {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-2);
}
</style>
