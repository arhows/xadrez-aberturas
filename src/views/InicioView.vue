<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { diasSeguidos, TAMANHO_DA_SERIE } from '../lib/diario'
import { carregarConjuntos, type ConjuntoExercicios } from '../lib/exercicios'
import { progresso } from '../lib/progresso'
import { proximaFila, totalRevisoes } from '../lib/resumoAberturas'
import { revisoesPendentes } from '../lib/revisaoExercicios'
import { SECOES } from '../lib/secoes'
import { dataLocal } from '../lib/srs'

const hoje = dataLocal()
const feitosHoje = computed(() => Object.keys(progresso.diario[hoje] ?? {}).length)
const dias = computed(() => diasSeguidos(progresso.diario, hoje))

// Os exercícios carregam à parte (são grandes): as revisões deles entram quando chegarem.
const conjuntos = ref<ConjuntoExercicios[]>([])
onMounted(async () => {
  conjuntos.value = await carregarConjuntos()
})
const revisoesExercicios = computed(() => revisoesPendentes(conjuntos.value))
const ultimo = computed(() => conjuntos.value.find((c) => c.id === progresso.ultimoConjunto))

const totalHoje = computed(() => totalRevisoes.value + revisoesExercicios.value.length)
/** A revisão começa pelas aberturas; depois vêm os exercícios errados. */
const destinoDaRevisao = computed(() => {
  if (proximaFila.value) return { name: 'treino', params: { cap: proximaFila.value.id }, query: { auto: '1' } }
  const primeira = revisoesExercicios.value[0]
  if (primeira) return { name: 'exercicio', params: { conjunto: primeira.conjunto }, query: { n: String(primeira.n), revisao: '1' } }
  return null
})
const partesDaRevisao = computed(() => {
  const partes: string[] = []
  if (totalRevisoes.value) partes.push(`${totalRevisoes.value} ${totalRevisoes.value === 1 ? 'linha de abertura' : 'linhas de abertura'}`)
  if (revisoesExercicios.value.length) {
    const n = revisoesExercicios.value.length
    partes.push(`${n} ${n === 1 ? 'exercício' : 'exercícios'}`)
  }
  return partes.join(' · ') || 'Nada vencendo hoje'
})
</script>

<template>
  <div class="pagina inicio">
    <div class="topo-inicio">
      <h1 class="titulo-pagina">Hoje</h1>
      <span v-if="dias" class="apoio suave">{{ dias }} {{ dias === 1 ? 'dia seguido' : 'dias seguidos' }}</span>
    </div>

    <div class="hoje">
      <section class="cartao">
        <div class="cabeca">
          <h2 class="titulo-item">Exercícios do dia</h2>
          <span v-if="feitosHoje < TAMANHO_DA_SERIE" class="selo">PARA HOJE</span>
          <span v-else class="selo ok">FEITO</span>
        </div>
        <div class="metrica">
          <span class="numero-grande">{{ feitosHoje }}</span>
          <span class="titulo-secao suave">de {{ TAMANHO_DA_SERIE }}</span>
        </div>
        <p class="apoio suave">Táticas e mates misturados, sem dizer o tema</p>
        <div class="acoes">
          <RouterLink class="botao largo-celular" :class="{ primario: feitosHoje < TAMANHO_DA_SERIE }" to="/diario">
            {{ feitosHoje ? (feitosHoje < TAMANHO_DA_SERIE ? 'Continuar' : 'Ver a série') : 'Começar' }}
          </RouterLink>
        </div>
      </section>

      <section class="cartao">
        <div class="cabeca">
          <h2 class="titulo-item">Revisão</h2>
          <span v-if="totalHoje" class="selo">PARA HOJE</span>
          <span v-else class="selo ok">EM DIA</span>
        </div>
        <div class="metrica" :class="totalHoje ? 'pendente' : 'em-dia'">
          <span class="numero-grande">{{ totalHoje }}</span>
        </div>
        <p class="apoio suave">{{ partesDaRevisao }}</p>
        <div class="acoes">
          <RouterLink v-if="destinoDaRevisao" class="botao primario largo-celular" :to="destinoDaRevisao">Revisar agora</RouterLink>
          <RouterLink v-else class="botao largo-celular" to="/praticar">Praticar algo novo</RouterLink>
        </div>
      </section>
    </div>

    <RouterLink v-if="ultimo" class="continuar" :to="{ name: 'exercicio', params: { conjunto: ultimo.id } }">
      <span class="rotulo suave">CONTINUAR DE ONDE PAROU</span>
      <span class="corpo-forte">{{ ultimo.nome }}</span>
    </RouterLink>

    <section class="partes">
      <h2 class="titulo-secao">O que você quer fazer?</h2>
      <div class="pilares">
        <div v-for="parte in SECOES" :key="parte.secao" class="pilar">
          <RouterLink class="cabeca-pilar" :to="parte.para">
            <span class="icone" aria-hidden="true">
              <svg v-if="parte.secao === 'aprender'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18V6a2.5 2.5 0 0 1 2.5-2.5H19v13H7.5A2.5 2.5 0 0 0 5 19a2 2 0 0 0 2 2h12v-4.5" /></svg>
              <svg v-else-if="parte.secao === 'praticar'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="2" /><path d="M3.5 12h17M12 3.5v17" /></svg>
            </span>
            <span class="textos">
              <span class="titulo-item">{{ parte.nome }}</span>
              <span class="apoio suave">{{ parte.grupos.flatMap((g) => g.atalhos).slice(0, 4).map((a) => a.nome).join(', ') }}</span>
            </span>
            <svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </RouterLink>
          <!-- No computador cabe tudo: cada parte mostra os próprios atalhos. -->
          <ul class="atalhos-pilar">
            <li v-for="atalho in parte.grupos.flatMap((g) => g.atalhos)" :key="atalho.id">
              <RouterLink :to="atalho.para">{{ atalho.nome }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.inicio {
  display: grid;
  gap: var(--espaco-5);
  max-width: 1040px;
}
.topo-inicio {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--espaco-2);
}
.titulo-pagina,
.titulo-secao,
p {
  margin: 0;
}
.suave {
  color: var(--texto-suave);
}
.hoje {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--espaco-4);
}
.continuar {
  display: grid;
  gap: var(--espaco-1);
  padding: var(--espaco-3) var(--espaco-4);
  border-radius: var(--raio-md);
  background: var(--superficie-2);
  color: var(--destaque);
  text-decoration: none;
}
.partes {
  display: grid;
  gap: var(--espaco-3);
}
.pilares {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--espaco-3);
}
.pilar {
  display: grid;
  align-content: start;
  border: 1px solid var(--borda);
  border-radius: var(--raio-lg);
  background: var(--superficie);
  overflow: hidden;
}
.cabeca-pilar {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
  padding: var(--espaco-3) var(--espaco-4);
  color: var(--texto);
  text-decoration: none;
}
.cabeca-pilar:hover {
  background: var(--superficie-2);
}
.cabeca-pilar .icone {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--raio-md);
  background: var(--destaque-suave);
  color: var(--destaque);
}
.cabeca-pilar .icone svg {
  width: 24px;
  height: 24px;
}
.cabeca-pilar .textos {
  display: grid;
  flex: 1;
  min-width: 0;
}
.seta {
  flex: none;
  width: 20px;
  height: 20px;
  color: var(--texto-suave);
}
.atalhos-pilar {
  display: none;
  margin: 0;
  padding: 0 var(--espaco-4) var(--espaco-2);
  list-style: none;
}
.atalhos-pilar li + li {
  border-top: 1px solid var(--borda);
}
.atalhos-pilar a {
  display: flex;
  align-items: center;
  min-height: var(--alvo-toque);
  color: var(--texto);
  text-decoration: none;
}
.atalhos-pilar a:hover {
  color: var(--destaque);
}
@media (min-width: 800px) {
  .atalhos-pilar {
    display: block;
  }
  .cabeca-pilar .textos .apoio,
  .cabeca-pilar .seta {
    display: none;
  }
}
/* No celular os botões do cartão ocupam a largura toda (ao alcance do polegar). */
@media (max-width: 799.98px) {
  .largo-celular {
    width: 100%;
  }
}
</style>
