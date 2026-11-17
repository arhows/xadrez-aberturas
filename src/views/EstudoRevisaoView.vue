<script setup lang="ts">
import { Chess } from 'chess.js'
import { computed, ref } from 'vue'
import CartaoDica from '../components/CartaoDica.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import {
  corDoLance,
  posicoesDoEstudo,
  registrarAcertoNoEstudo,
  registrarErroNoEstudo,
  revisoesDeEstudo,
  separar,
} from '../lib/estudoPartidas'
import { fmtLance, fmtSan } from '../lib/formato'
import { lancesAntesDoFen } from '../lib/jogo'
import { somarAtividade } from '../lib/painel'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'

/** Revisão dos lances errados no Estudo de partidas: cada posição pede o lance da partida. */

const fila = revisoesDeEstudo(progresso.cartoesEstudos, progresso.estudos)
const atual = ref(0)
const acertos = ref(0)
const respondido = ref<null | { certo: boolean; jogado: string }>(null)
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()

const item = computed(() => fila[atual.value])
const estudo = computed(() => (item.value ? progresso.estudos[item.value.id] : undefined))
const posicoes = computed(() => (estudo.value ? posicoesDoEstudo(estudo.value) : []))
const sans = computed(() => (estudo.value ? separar(estudo.value.lances) : []))
const cor = computed(() => (estudo.value && item.value ? corDoLance(estudo.value, item.value.i) : 'w'))
const rotulo = computed(() =>
  estudo.value && item.value ? fmtLance(lancesAntesDoFen(estudo.value.fen) + item.value.i + 1, sans.value[item.value.i]) : '',
)

/** Antes de responder: a posição do lance; depois, a posição com o lance da partida. */
const mostrado = computed(() => {
  if (!item.value || !posicoes.value.length) return null
  return posicoes.value[item.value.i + (respondido.value ? 1 : 0)]
})
const formas = computed<Forma[]>(() => {
  const ultimo = respondido.value && !respondido.value.certo ? mostrado.value?.ultimo : null
  return ultimo ? [{ de: ultimo[0], para: ultimo[1], cor: 'green' }] : []
})

function aoJogar(de: string, para: string) {
  if (!item.value || respondido.value) {
    tabuleiro.value?.sincronizar()
    return
  }
  const { id, i } = item.value
  let san: string
  try {
    san = new Chess(posicoes.value[i].fen).move({ from: de, to: para, promotion: 'q' }).san
  } catch {
    tabuleiro.value?.sincronizar()
    return
  }
  const certo = posicoes.value[i + 1].ultimo!
  const acertou = certo[0] === de && certo[1] === para
  if (acertou) {
    acertos.value++
    registrarAcertoNoEstudo(progresso.cartoesEstudos, id, i)
    tocar('certo')
  } else {
    registrarErroNoEstudo(progresso.cartoesEstudos, id, i)
    tocar('errado')
  }
  somarAtividade(progresso.atividade, 'exercicios')
  respondido.value = { certo: acertou, jogado: fmtSan(san) }
}

function proximo() {
  respondido.value = null
  atual.value++
}
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" :to="{ name: 'estudo-partidas' }" aria-label="Voltar: Estudo de partidas">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>Revisão</h1>
  </header>

  <div v-if="item && estudo && mostrado" class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="mostrado.fen"
        :orientacao="cor === 'w' ? 'white' : 'black'"
        :ultimo-lance="mostrado.ultimo"
        :formas="formas"
        :jogavel="!respondido"
        @lance="aoJogar"
      />
    </div>
    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink :to="{ name: 'estudo-partidas' }" class="trilha">‹ Estudo de partidas</RouterLink>
        <h1 class="titulo-pagina">Revisão</h1>
      </div>
      <p class="suave">{{ atual + 1 }} de {{ fila.length }} · {{ estudo.nome }}</p>
      <p v-if="!respondido" class="corpo-forte">Qual lance {{ cor === 'w' ? 'as brancas' : 'as pretas' }} jogaram aqui?</p>
      <CartaoDica
        v-else
        :tipo="respondido.certo ? 'certo' : 'errado'"
        :lance="respondido.certo ? rotulo : respondido.jogado"
        :texto="respondido.certo ? '' : `Na partida: ${rotulo}. Este lance volta amanhã.`"
      />
      <div class="acoes">
        <button v-if="respondido" type="button" class="botao primario" @click="proximo">
          {{ atual + 1 < fila.length ? 'Próximo' : 'Terminar' }}
        </button>
        <RouterLink class="botao fantasma" :to="{ name: 'estudo-partida', params: { id: item.id } }">Abrir a partida</RouterLink>
      </div>
    </div>
  </div>

  <div v-else class="pagina">
    <RouterLink :to="{ name: 'estudo-partidas' }" class="trilha">‹ Estudo de partidas</RouterLink>
    <h1>Revisão</h1>
    <p v-if="fila.length">Fim da revisão: {{ acertos }} de {{ fila.length }} certos.</p>
    <p v-else>Nada para revisar hoje.</p>
    <RouterLink class="botao primario" :to="{ name: 'estudo-partidas' }">Voltar ao Estudo de partidas</RouterLink>
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
.cabeca-painel .titulo-pagina {
  margin: 0;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-2);
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
</style>
