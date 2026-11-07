<script setup lang="ts">
import { computed } from 'vue'
import Avaliacao from '../components/Avaliacao.vue'
import { caminhoDaArmadilha, percorrer } from '../lib/arvore'
import { buscarCapitulo, obterCapitulos, type CapituloCarregado } from '../lib/capitulos'
import { baixarTexto } from '../lib/download'
import { linhasDoGrupo, planoDeRevisao } from '../lib/escopo'
import { fmtLance } from '../lib/formato'
import { exportarPgn } from '../lib/pgn'
import { progresso } from '../lib/progresso'
import { dataLocal, estaDominado, estaPendente, idCartao } from '../lib/srs'
import type { Linha } from '../lib/tipos'

const hoje = dataLocal()
const capitulos = obterCapitulos()

function baixarPgn(capitulo: CapituloCarregado) {
  baixarTexto(`${capitulo.capitulo.id}.pgn`, exportarPgn(capitulo), 'application/x-chess-pgn')
}

const cartoesDe = (capitulo: CapituloCarregado, linha: string) =>
  (['w', 'b'] as const).map(
    (cor) => progresso.cartoes[idCartao({ capitulo: capitulo.capitulo.id, linha, cor })],
  )

/** Dominar a linha é dominar as duas cores; cada cor vale metade. */
function percentualLinha(capitulo: CapituloCarregado, linha: Linha): number {
  const dominadas = cartoesDe(capitulo, linha.id).filter(estaDominado).length
  return (dominadas / 2) * 100
}

function percentual(capitulo: CapituloCarregado, linhas: Linha[]): number {
  if (!linhas.length) return 0
  const soma = linhas.reduce((total, linha) => total + percentualLinha(capitulo, linha), 0)
  return Math.round(soma / linhas.length)
}

function revisoesDaLinha(capitulo: CapituloCarregado, linha: Linha): string {
  const cartoes = cartoesDe(capitulo, linha.id).filter((c) => c !== undefined)
  if (!cartoes.length) return 'Nova'
  if (cartoes.some((cartao) => estaPendente(cartao, hoje))) return 'Revisar hoje'
  const proxima = cartoes.map((cartao) => cartao.proxima).sort()[0]
  const [, mes, dia] = proxima.split('-')
  return `Revisão em ${dia}/${mes}`
}

const filas = computed(() =>
  planoDeRevisao(
    capitulos,
    {
      cartoes: progresso.cartoes,
      notasConferidas: progresso.notasConferidas,
      corPorCapitulo: progresso.corPorCapitulo,
      profundidade: progresso.config.profundidade,
      novasPorDia: progresso.config.novasPorDia,
    },
    hoje,
  ).map((plano) => ({ id: plano.capitulo.capitulo.id, total: plano.fila.length })),
)
const filaDoCapitulo = (id: string) => filas.value.find((fila) => fila.id === id)?.total ?? 0
const proximaFila = computed(() => filas.value.find((fila) => fila.total > 0))
const totalRevisoes = computed(() => filas.value.reduce((soma, fila) => soma + fila.total, 0))

const maisErrados = computed(() =>
  Object.values(progresso.errosPorAresta)
    .filter((erro) => buscarCapitulo(erro.capitulo))
    .sort((a, b) => b.erros - a.erros)
    .slice(0, 5)
    .map((erro) => ({
      ...erro,
      valido: !!percorrer(buscarCapitulo(erro.capitulo)!.arvore, erro.caminho),
      rotulo: fmtLance(erro.caminho.length, erro.caminho.at(-1)!),
    }))
    .filter((erro) => erro.valido),
)
</script>

<template>
  <div class="pagina">
    <RouterLink
      v-if="proximaFila"
      class="botao primario revisar"
      :to="{ name: 'treino', params: { cap: proximaFila.id }, query: { auto: '1' } }"
    >Revisar agora ({{ totalRevisoes }})</RouterLink>
    <p v-else class="em-dia">Tudo em dia: nenhuma revisão pendente hoje.</p>

    <section v-if="maisErrados.length" class="erros">
      <h2>Lances em que você mais erra</h2>
      <ul>
        <li v-for="erro in maisErrados" :key="erro.caminho.join(' ')">
          <RouterLink :to="{ name: 'explorar', params: { cap: erro.capitulo }, query: { c: erro.caminho.join(' ') } }">
            {{ erro.rotulo }}
          </RouterLink>
          <span class="suave">{{ erro.erros }} {{ erro.erros === 1 ? 'erro' : 'erros' }}</span>
        </li>
      </ul>
    </section>

    <section v-for="capitulo in capitulos" :key="capitulo.capitulo.id" class="capitulo">
      <header>
        <h2>{{ capitulo.capitulo.nome }}</h2>
        <p class="suave">
          {{ percentual(capitulo, capitulo.capitulo.linhas) }}% dominado
          · {{ filaDoCapitulo(capitulo.capitulo.id) }} para hoje
        </p>
        <div class="acoes">
          <RouterLink class="botao" :to="{ name: 'explorar', params: { cap: capitulo.capitulo.id } }">Explorar</RouterLink>
          <RouterLink class="botao" :to="{ name: 'treino', params: { cap: capitulo.capitulo.id } }">Treinar</RouterLink>
          <button type="button" class="botao" @click="baixarPgn(capitulo)">Exportar PGN</button>
        </div>
      </header>

      <details v-if="capitulo.capitulo.armadilhas?.length" class="grupo">
        <summary>
          <span>Armadilhas</span>
          <span class="suave">{{ capitulo.capitulo.armadilhas.length }}</span>
        </summary>
        <ul class="linhas">
          <li v-for="armadilha in capitulo.capitulo.armadilhas" :key="armadilha.id">
            <RouterLink
              :to="{ name: 'explorar', params: { cap: capitulo.capitulo.id }, query: { c: caminhoDaArmadilha(armadilha).join(' ') } }"
            >{{ armadilha.titulo }}</RouterLink>
          </li>
        </ul>
      </details>

      <details v-for="grupo in capitulo.capitulo.grupos" :key="grupo.id" class="grupo">
        <summary>
          <span>{{ grupo.nome }}</span>
          <span class="suave">{{ percentual(capitulo, linhasDoGrupo(capitulo, grupo.id)) }}%</span>
        </summary>

        <RouterLink
          class="botao treinar-grupo"
          :to="{ name: 'treino', params: { cap: capitulo.capitulo.id }, query: { escopo: `grupo:${grupo.id}` } }"
        >Treinar grupo</RouterLink>

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
              <span class="suave">
                {{ percentualLinha(capitulo, linha) }}% · {{ revisoesDaLinha(capitulo, linha) }}
              </span>
            </div>
            <div v-if="!capitulo.desativadas.includes(linha.id)" class="acoes">
              <RouterLink class="botao" :to="{ name: 'estudo', params: { cap: capitulo.capitulo.id, linha: linha.id } }">Estudar</RouterLink>
              <RouterLink class="botao" :to="{ name: 'treino', params: { cap: capitulo.capitulo.id }, query: { escopo: `linha:${linha.id}` } }">Treinar</RouterLink>
            </div>
            <RouterLink v-else to="/diagnostico">Desativada: ver Diagnóstico</RouterLink>
          </li>
        </ul>
      </details>
    </section>
  </div>
</template>

<style scoped>
.revisar {
  display: flex;
  width: 100%;
  margin-bottom: 1.5rem;
}
.em-dia {
  margin: 0 0 1.5rem;
  color: var(--ok);
}
h2 {
  margin: 0;
  font-size: 1.125rem;
}
.suave {
  color: var(--texto-suave);
  font-size: 0.875rem;
}
header .suave {
  margin: 0.25rem 0 0.5rem;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.erros {
  margin-bottom: 1.5rem;
}
.erros ul {
  margin: 0.5rem 0 0;
  padding: 0;
  list-style: none;
}
.erros li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 44px;
  border-bottom: 1px solid var(--borda);
}
.capitulo + .capitulo {
  margin-top: 2rem;
}
.grupo {
  margin-top: 0.75rem;
  border: 1px solid var(--borda);
  border-radius: 8px;
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
</style>
