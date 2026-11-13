<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Icone from '../components/Icone.vue'
import { diasSeguidos, semanaDoDiario, TAMANHO_DA_SERIE } from '../lib/diario'
import { carregarConjuntos, type ConjuntoExercicios } from '../lib/exercicios'
import { progresso } from '../lib/progresso'
import { proximaFila, totalRevisoes } from '../lib/resumoAberturas'
import { revisoesPendentes } from '../lib/revisaoExercicios'
import { SECOES } from '../lib/secoes'
import { dataLocal } from '../lib/srs'

const hoje = dataLocal()
const feitosHoje = computed(() => Object.keys(progresso.diario[hoje] ?? {}).length)
const dias = computed(() => diasSeguidos(progresso.diario, hoje))
const semana = computed(() => semanaDoDiario(progresso.diario, hoje))
const ESTADO_DO_DIA = { completa: 'série completa', comecada: 'série começada', vazia: 'sem série', futuro: 'ainda não chegou' }

/** Anel de progresso dos exercícios do dia (raio 26). */
const CIRCUNFERENCIA = 2 * Math.PI * 26
const arcoFeito = computed(() => `${(Math.min(feitosHoje.value, TAMANHO_DA_SERIE) / TAMANHO_DA_SERIE) * CIRCUNFERENCIA} ${CIRCUNFERENCIA}`)

// Os exercícios carregam à parte (são grandes): as revisões deles entram quando chegarem.
const conjuntos = ref<ConjuntoExercicios[]>([])
const carregado = ref(false)
onMounted(async () => {
  conjuntos.value = await carregarConjuntos()
  carregado.value = true
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
    <h1 class="titulo-pagina">Hoje</h1>

    <section class="cartao serie-dias" aria-label="Série de dias">
      <span class="chama" :class="{ acesa: dias }"><Icone nome="chama" /></span>
      <span class="textos">
        <span class="titulo-item">{{ dias ? `${dias} ${dias === 1 ? 'dia seguido' : 'dias seguidos'}` : 'Acenda a sua série' }}</span>
        <span class="apoio suave">{{ dias ? 'Faça os exercícios do dia para manter a chama acesa' : 'Complete os exercícios do dia para começar' }}</span>
      </span>
      <ol class="semana">
        <li v-for="d in semana" :key="d.data" :class="[d.estado, { hoje: d.hoje }]" :title="`${d.data}: ${ESTADO_DO_DIA[d.estado]}`">
          <span class="bolinha"><Icone v-if="d.estado === 'completa'" nome="certo" /></span>
          <span class="letra">{{ d.letra }}</span>
        </li>
      </ol>
    </section>

    <div class="hoje">
      <section class="cartao">
        <div class="cabeca">
          <span class="titulo-com-icone">
            <span class="ladrilho tom-praticar"><Icone nome="mira" /></span>
            <h2 class="titulo-item">Exercícios do dia</h2>
          </span>
          <span v-if="feitosHoje < TAMANHO_DA_SERIE" class="selo">PARA HOJE</span>
          <span v-else class="selo ok">FEITO</span>
        </div>
        <div class="com-anel">
          <span class="anel">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <circle class="trilha-anel" cx="32" cy="32" r="26" />
              <circle v-if="feitosHoje" class="arco-anel" cx="32" cy="32" r="26" :stroke-dasharray="arcoFeito" />
            </svg>
            <span class="numero-anel">{{ feitosHoje }}<small>/{{ TAMANHO_DA_SERIE }}</small></span>
          </span>
          <p class="apoio suave">Táticas e mates misturados, sem dizer o tema</p>
        </div>
        <div class="acoes">
          <RouterLink class="botao largo-celular" :class="{ primario: feitosHoje < TAMANHO_DA_SERIE }" to="/diario">
            {{ feitosHoje ? (feitosHoje < TAMANHO_DA_SERIE ? 'Continuar' : 'Ver a série') : 'Começar' }}
          </RouterLink>
        </div>
      </section>

      <section class="cartao">
        <div class="cabeca">
          <span class="titulo-com-icone">
            <span class="ladrilho tom-aprender"><Icone nome="repetir" /></span>
            <h2 class="titulo-item">Revisão</h2>
          </span>
          <span v-if="totalHoje" class="selo">PARA HOJE</span>
          <span v-else-if="carregado" class="selo ok">EM DIA</span>
        </div>
        <div class="metrica" :class="totalHoje ? 'pendente' : carregado ? 'em-dia' : ''">
          <template v-if="!totalHoje && carregado">
            <span class="tudo-em-dia"><Icone nome="certo" /></span>
            <span class="titulo-secao em-dia-texto">Tudo em dia</span>
          </template>
          <template v-else>
            <span class="numero-grande">{{ totalHoje || '…' }}</span>
            <span v-if="totalHoje" class="titulo-secao suave">para revisar</span>
          </template>
        </div>
        <p class="apoio suave">{{ totalHoje || carregado ? partesDaRevisao : 'Contando as revisões…' }}</p>
        <div class="acoes">
          <RouterLink v-if="destinoDaRevisao" class="botao primario largo-celular" :to="destinoDaRevisao">Revisar agora</RouterLink>
          <RouterLink v-else class="botao largo-celular" to="/praticar">Praticar algo novo</RouterLink>
        </div>
      </section>
    </div>

    <RouterLink v-if="ultimo" class="continuar" :to="{ name: 'exercicio', params: { conjunto: ultimo.id } }">
      <span class="ladrilho tom-praticar"><Icone nome="seguir" /></span>
      <span class="textos">
        <span class="rotulo suave">CONTINUAR DE ONDE PAROU</span>
        <span class="corpo-forte">{{ ultimo.nome }}</span>
      </span>
    </RouterLink>

    <section class="partes">
      <h2 class="titulo-secao">O que você quer fazer?</h2>
      <div class="pilares">
        <div v-for="parte in SECOES" :key="parte.secao" class="pilar">
          <RouterLink class="cabeca-pilar" :to="parte.para">
            <span class="ladrilho grande" :class="`tom-${parte.secao}`"><Icone :nome="parte.secao" /></span>
            <span class="textos">
              <span class="titulo-item">{{ parte.nome }}</span>
              <span class="apoio suave">{{ parte.grupos.flatMap((g) => g.atalhos).slice(0, 4).map((a) => a.nome).join(', ') }}</span>
            </span>
            <svg class="seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
          </RouterLink>
          <!-- No computador cabe tudo: cada parte mostra os próprios atalhos. -->
          <ul class="atalhos-pilar">
            <li v-for="atalho in parte.grupos.flatMap((g) => g.atalhos)" :key="atalho.id">
              <RouterLink :to="atalho.para"><Icone :nome="atalho.icone" class="mini" :class="`tom-${parte.secao}`" />{{ atalho.nome }}</RouterLink>
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
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
  padding: var(--espaco-3) var(--espaco-4);
  border-radius: var(--raio-md);
  background: var(--superficie-2);
  color: var(--destaque);
  text-decoration: none;
}
.continuar .textos {
  display: grid;
  gap: 2px;
}
.titulo-com-icone {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
}
.titulo-com-icone {
  min-width: 0;
}
.titulo-com-icone h2 {
  margin: 0;
  font-size: 18px;
  line-height: 24px;
}
.cartao .cabeca {
  align-items: center;
}

/* Série de dias: a chama e as bolinhas dos últimos 7 dias. */
.serie-dias {
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  column-gap: var(--espaco-3);
}
.serie-dias .textos {
  display: grid;
}
.chama {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--raio-pill);
  background: var(--superficie-2);
  color: var(--texto-suave);
}
.chama svg {
  width: 28px;
  height: 28px;
}
.chama.acesa {
  background: color-mix(in srgb, var(--cor-jogar) 16%, transparent);
  color: var(--cor-jogar);
}
.chama.acesa svg {
  fill: color-mix(in srgb, var(--cor-jogar) 35%, transparent);
}
.semana {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: var(--espaco-1);
  margin: 0;
  padding: 0;
  list-style: none;
}
.semana li {
  display: grid;
  justify-items: center;
  gap: var(--espaco-1);
}
.semana .bolinha {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 2px solid var(--borda);
  border-radius: var(--raio-pill);
  color: var(--superficie);
}
.semana .bolinha svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.75;
}
.semana .comecada .bolinha {
  border-style: dashed;
  border-color: var(--cor-jogar);
}
.semana .completa .bolinha {
  border-color: var(--cor-jogar);
  background: var(--cor-jogar);
}
.semana .futuro .bolinha {
  border-color: var(--superficie-2);
  background: var(--superficie-2);
}
.semana .futuro .letra {
  opacity: 0.55;
}
.semana .letra {
  color: var(--texto-suave);
  font: 600 12px/16px var(--font-texto);
}
.semana .hoje .letra {
  color: var(--texto);
  text-decoration: underline 2px;
  text-underline-offset: 3px;
}
@media (min-width: 800px) {
  .serie-dias {
    grid-template-columns: auto minmax(0, 1fr) minmax(0, 300px);
  }
  .semana {
    grid-column: 3;
  }
}

/* Anel dos exercícios do dia. */
.com-anel {
  display: flex;
  align-items: center;
  gap: var(--espaco-4);
}
.anel {
  position: relative;
  flex: none;
  width: 76px;
  height: 76px;
}
.anel svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.trilha-anel,
.arco-anel {
  fill: none;
  stroke-width: 7;
}
.trilha-anel {
  stroke: var(--superficie-2);
}
.arco-anel {
  stroke: var(--cor-praticar);
  stroke-linecap: round;
  transition: stroke-dasharray 0.4s ease;
}
.numero-anel {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 600 26px/1 var(--font-titulo);
}
.numero-anel small {
  color: var(--texto-suave);
  font: 500 13px/1 var(--font-texto);
}
.tudo-em-dia {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  width: 44px;
  height: 44px;
  border-radius: var(--raio-pill);
  background: var(--ok-suave);
  color: var(--ok);
}
.tudo-em-dia svg {
  width: 26px;
  height: 26px;
  stroke-width: 2.5;
}
.em-dia-texto {
  align-self: center;
  color: var(--ok);
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
.atalhos-pilar .mini {
  flex: none;
  width: 18px;
  height: 18px;
  margin-right: var(--espaco-3);
  color: var(--tom);
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
