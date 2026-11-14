<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Ilustracao from '../components/Ilustracao.vue'
import Icone from '../components/Icone.vue'
import { obterCapitulos } from '../lib/capitulos'
import { planoDeRevisao } from '../lib/escopo'
import { obterConjuntos } from '../lib/exercicios'
import { progresso } from '../lib/progresso'
import { comecarRevisaoRapida, DURACAO_MS, montarFila, revisaoRapida } from '../lib/revisaoRapida'
import { revisoesPendentes } from '../lib/revisaoExercicios'
import { dataLocal } from '../lib/srs'

/** Revisão rápida: o convite (com o que há para revisar) e, ao terminar, o resumo. */
const router = useRouter()
const hoje = dataLocal()

/** A fila de hoje de cada abertura do repertório (revisões vencidas e linhas novas do dia), como no Início. */
const aberturas = computed(() =>
  planoDeRevisao(
    obterCapitulos(),
    {
      cartoes: progresso.cartoes,
      notasConferidas: progresso.notasConferidas,
      corPorCapitulo: progresso.corPorCapitulo,
      profundidade: progresso.config.profundidade,
      novasPorDia: progresso.config.novasPorDia,
      repertorio: progresso.repertorio.capitulos,
    },
    hoje,
  )
    .map((plano) => ({
      capitulo: plano.capitulo.capitulo.id,
      pendentes: plano.fila.length,
    }))
    .filter((a) => a.pendentes > 0),
)
const exercicios = computed(() => revisoesPendentes(obterConjuntos(), hoje))
const fila = computed(() => montarFila(aberturas.value, exercicios.value))
const totalLinhas = computed(() => aberturas.value.reduce((soma, a) => soma + a.pendentes, 0))

const terminou = computed(() => !revisaoRapida.ativa && revisaoRapida.fim > 0)
const feitos = computed(() => revisaoRapida.feitos.aberturas + revisaoRapida.feitos.exercicios)
const duracao = computed(() => {
  const s = Math.round(Math.min(revisaoRapida.fim - revisaoRapida.inicio, DURACAO_MS + 60_000) / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
})
const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`

function comecar() {
  comecarRevisaoRapida(router, fila.value)
}
</script>

<template>
  <div class="pagina rapida">
    <RouterLink to="/" class="trilha">‹ Início</RouterLink>

    <template v-if="terminou">
      <div class="conquista">
        <Ilustracao peca="king" tom="praticar" :festa="feitos > 0" />
        <h1 class="titulo-pagina">{{ feitos ? 'Revisão rápida feita!' : 'Revisão rápida encerrada' }}</h1>
      </div>
      <dl class="placar-final">
        <div><dt>Linhas de abertura</dt><dd>{{ revisaoRapida.feitos.aberturas }}</dd></div>
        <div><dt>Exercícios</dt><dd>{{ revisaoRapida.feitos.exercicios }}</dd></div>
        <div><dt>Tempo</dt><dd>{{ duracao }}</dd></div>
      </dl>
      <p v-if="fila.length" class="suave">Ainda há {{ plural(totalLinhas + exercicios.length, 'item', 'itens') }} para hoje.</p>
      <p v-else class="suave">Tudo em dia por hoje.</p>
      <div class="acoes">
        <button v-if="fila.length" type="button" class="botao primario grande largo-celular" @click="comecar">Mais 5 minutos</button>
        <RouterLink class="botao grande largo-celular" :class="{ primario: !fila.length }" to="/">Voltar ao Início</RouterLink>
      </div>
    </template>

    <template v-else>
      <div class="cabeca">
        <span class="ladrilho grande tom-praticar"><Icone nome="raio" /></span>
        <h1 class="titulo-pagina">Revisão rápida</h1>
      </div>
      <p>
        Cinco minutos alternando as linhas de abertura de hoje e os exercícios para revisar. Quando o tempo acaba,
        você termina o que estiver fazendo e vê o resumo.
      </p>
      <ul v-if="fila.length" class="lista">
        <li class="linha-lista">
          <span class="nome">{{ plural(totalLinhas, 'linha de abertura', 'linhas de abertura') }}</span>
          <span class="meta">para hoje, de {{ plural(aberturas.length, 'abertura', 'aberturas') }}</span>
        </li>
        <li class="linha-lista">
          <span class="nome">{{ plural(exercicios.length, 'exercício', 'exercícios') }}</span>
          <span class="meta">que você errou ou fez com pista</span>
        </li>
      </ul>
      <p v-else class="suave">Nada para revisar agora: tudo em dia.</p>
      <div class="acoes">
        <button v-if="fila.length" type="button" class="botao primario grande largo-celular" @click="comecar">
          Começar ({{ plural(fila.length, 'item', 'itens') }})
        </button>
        <RouterLink v-else class="botao primario grande largo-celular" to="/praticar">Praticar algo novo</RouterLink>
      </div>
    </template>
  </div>
</template>

<style scoped>
.rapida {
  display: grid;
  gap: var(--espaco-4);
  max-width: 640px;
}
.cabeca {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
}
h1,
p {
  margin: 0;
}
.suave {
  color: var(--texto-suave);
}
.conquista {
  display: grid;
  justify-items: center;
  gap: var(--espaco-3);
  text-align: center;
}
.lista {
  margin: 0;
  padding: 0;
  list-style: none;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
.placar-final {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--espaco-2);
  margin: 0;
  text-align: center;
}
.placar-final div {
  padding: var(--espaco-3) var(--espaco-2);
  border: 1px solid var(--borda);
  border-radius: var(--raio-md);
  background: var(--superficie);
}
.placar-final dt {
  color: var(--texto-suave);
  font-size: 13px;
}
.placar-final dd {
  margin: 0;
  font: 600 24px/32px var(--font-titulo);
}
</style>
