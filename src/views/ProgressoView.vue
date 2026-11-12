<script setup lang="ts">
import { computed } from 'vue'
import { buscarCapitulo, obterCapitulos } from '../lib/capitulos'
import { descreverUnidade } from '../lib/escopo'
import { livroDoConjunto, obterConjuntos } from '../lib/exercicios'
import { FAMILIAS } from '../lib/familias'
import { fmtTexto } from '../lib/formato'
import {
  atividadePorDia,
  calendario,
  linhasDificeis,
  melhorSequencia,
  previsaoDeRevisoes,
  resumoDosCapitulos,
  sequenciaDeDias,
  somarEstagios,
  type Estagios,
} from '../lib/painel'
import { progresso } from '../lib/progresso'
import { dataLocal } from '../lib/srs'

const hoje = dataLocal()
const capitulos = obterCapitulos()

// ---------- Constância ----------
const dias = computed(() => atividadePorDia(progresso.atividade, progresso.cartoes, progresso.cartoesExercicios))
const sequencia = computed(() => sequenciaDeDias(dias.value, hoje))
const recorde = computed(() => melhorSequencia(dias.value))
const deHoje = computed(() => dias.value.get(hoje) ?? { linhas: 0, exercicios: 0 })
const SEMANAS = 18
const grade = computed(() => calendario(dias.value, SEMANAS, hoje))
const ativosNoPeriodo = computed(() => grade.value.flat().filter((dia) => dia.total > 0).length)

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
function dataCurta(data: string) {
  const [, mes, dia] = data.split('-').map(Number)
  return `${dia} ${MESES[mes - 1]}`
}
const plural = (n: number, um: string, varios: string) => `${n.toLocaleString('pt-BR')} ${n === 1 ? um : varios}`
function descreverDia(dia: { data: string; atividade: { linhas: number; exercicios: number } }) {
  const partes = [plural(dia.atividade.linhas, 'linha', 'linhas'), plural(dia.atividade.exercicios, 'exercício', 'exercícios')]
  return `${dataCurta(dia.data)}: ${partes.join(', ')}`
}

// ---------- Repertório ----------
const resumos = computed(() => resumoDosCapitulos(capitulos, progresso.cartoes, progresso.corPorCapitulo, hoje))
const geral = computed(() => somarEstagios(resumos.value))
const porFamilia = computed(() =>
  FAMILIAS.map((familia) => ({ familia, estagios: somarEstagios(resumos.value.filter((r) => r.familia.id === familia.id)) })).filter(
    (f) => f.estagios.novas + f.estagios.aprendendo + f.estagios.dominadas > 0,
  ),
)
const iniciados = computed(() =>
  resumos.value
    .filter((r) => r.estagios.aprendendo + r.estagios.dominadas > 0)
    .sort((a, b) => b.estagios.dominadas + b.estagios.aprendendo - (a.estagios.dominadas + a.estagios.aprendendo)),
)
const naoIniciados = computed(() => resumos.value.length - iniciados.value.length)

const totalDe = (e: Estagios) => e.novas + e.aprendendo + e.dominadas
const pct = (parte: number, todo: number) => (todo ? (parte / todo) * 100 : 0)
const pctTexto = (parte: number, todo: number) => `${Math.round(pct(parte, todo))}%`

// ---------- Próximas revisões ----------
const DIAS_PREVISAO = 14
const capituloExiste = (id: string) => buscarCapitulo(id.split('/')[0]) !== undefined
const previsao = computed(() => previsaoDeRevisoes(progresso.cartoes, DIAS_PREVISAO, hoje, capituloExiste))
const maiorPrevisao = computed(() => Math.max(1, ...previsao.value.map((dia) => dia.total)))
const totalPrevisao = computed(() => previsao.value.reduce((soma, dia) => soma + dia.total, 0))
const SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
function rotuloDia(data: string, i: number) {
  if (i === 0) return 'hoje'
  const [ano, mes, dia] = data.split('-').map(Number)
  return SEMANA[new Date(ano, mes - 1, dia).getDay()]
}

// ---------- Linhas difíceis ----------
const dificeis = computed(() =>
  linhasDificeis(progresso.cartoes, 8, (cap, linha) => {
    const capitulo = buscarCapitulo(cap)
    return !!capitulo && capitulo.capitulo.linhas.some((l) => l.id === linha)
  }).map((item) => {
    const capitulo = buscarCapitulo(item.capitulo)!
    return { ...item, nomeCapitulo: capitulo.capitulo.nome, descricao: descreverUnidade(capitulo, item.linha) }
  }),
)

// ---------- Exercícios ----------
const livros = computed(() => {
  const grupos = new Map<string, { nome: string; total: number; primeira: number; ajuda: number }>()
  for (const conjunto of obterConjuntos()) {
    const nome = livroDoConjunto(conjunto)
    const grupo = grupos.get(nome) ?? { nome, total: 0, primeira: 0, ajuda: 0 }
    const estados = Object.values(progresso.exercicios[conjunto.id] ?? {})
    grupo.total += conjunto.problemas.length
    grupo.primeira += estados.filter((e) => e === 'primeira').length
    grupo.ajuda += estados.filter((e) => e === 'ajuda').length
    grupos.set(nome, grupo)
  }
  return [...grupos.values()]
})
</script>

<template>
  <div class="pagina progresso-pagina">
    <h1 class="titulo-pagina">Progresso</h1>

    <!-- Constância -->
    <section class="cartao">
      <h2 class="titulo-secao">Constância</h2>
      <dl class="numeros">
        <div>
          <dt>Dias seguidos</dt>
          <dd class="numero-grande">{{ sequencia }}</dd>
        </div>
        <div>
          <dt>Recorde</dt>
          <dd class="numero-grande">{{ recorde }}</dd>
        </div>
        <div>
          <dt>Hoje</dt>
          <dd class="hoje">
            {{ plural(deHoje.linhas, 'linha', 'linhas') }}<br />{{ plural(deHoje.exercicios, 'exercício', 'exercícios') }}
          </dd>
        </div>
      </dl>
      <p v-if="sequencia && !(deHoje.linhas + deHoje.exercicios)" class="apoio suave">Estude hoje para manter a sequência.</p>

      <div class="calendario-rolagem">
        <div class="calendario" role="img" :aria-label="`${ativosNoPeriodo} dias com estudo nas últimas ${SEMANAS} semanas`">
          <div v-for="(semana, s) in grade" :key="s" class="semana">
            <span
              v-for="dia in semana"
              :key="dia.data"
              class="dia"
              :class="[`nivel-${dia.nivel}`, { futuro: dia.futuro, hoje: dia.data === hoje }]"
              :title="dia.futuro ? undefined : descreverDia(dia)"
            ></span>
          </div>
        </div>
      </div>
      <div class="rodape-calendario suave">
        <span>{{ ativosNoPeriodo }} dias com estudo nas últimas {{ SEMANAS }} semanas</span>
        <span class="escala" aria-hidden="true">menos <i class="dia nivel-0"></i><i class="dia nivel-1"></i><i class="dia nivel-2"></i><i class="dia nivel-3"></i><i class="dia nivel-4"></i> mais</span>
      </div>
    </section>

    <!-- Repertório -->
    <section class="cartao">
      <h2 class="titulo-secao">Repertório</h2>
      <p class="apoio suave">Colunas de todas as aberturas, nas cores que você treina em cada uma.</p>
      <div class="barra-estagios grande" role="img" :aria-label="`${geral.dominadas} dominadas, ${geral.aprendendo} aprendendo, ${geral.novas} novas`">
        <span class="dominadas" :style="{ width: `${pct(geral.dominadas, totalDe(geral))}%` }"></span>
        <span class="aprendendo" :style="{ width: `${pct(geral.aprendendo, totalDe(geral))}%` }"></span>
      </div>
      <ul class="legenda">
        <li><i class="amostra dominadas"></i>Dominadas <strong>{{ geral.dominadas.toLocaleString('pt-BR') }}</strong></li>
        <li><i class="amostra aprendendo"></i>Aprendendo <strong>{{ geral.aprendendo.toLocaleString('pt-BR') }}</strong></li>
        <li><i class="amostra novas"></i>Novas <strong>{{ geral.novas.toLocaleString('pt-BR') }}</strong></li>
      </ul>

      <ul class="familias">
        <li v-for="f in porFamilia" :key="f.familia.id">
          <div class="rotulos">
            <span>{{ f.familia.nome }}</span>
            <span class="suave">{{ pctTexto(f.estagios.dominadas, totalDe(f.estagios)) }} dominado</span>
          </div>
          <div class="barra-estagios" role="img" :aria-label="`${f.familia.nome}: ${f.estagios.dominadas} dominadas, ${f.estagios.aprendendo} aprendendo, ${f.estagios.novas} novas`">
            <span class="dominadas" :style="{ width: `${pct(f.estagios.dominadas, totalDe(f.estagios))}%` }"></span>
            <span class="aprendendo" :style="{ width: `${pct(f.estagios.aprendendo, totalDe(f.estagios))}%` }"></span>
          </div>
        </li>
      </ul>
    </section>

    <!-- Próximas revisões -->
    <section class="cartao">
      <h2 class="titulo-secao">Próximas revisões</h2>
      <p class="apoio suave">
        {{ plural(totalPrevisao, 'revisão marcada', 'revisões marcadas') }} nos próximos {{ DIAS_PREVISAO }} dias (as atrasadas contam em hoje).
      </p>
      <div class="previsao">
        <div
          v-for="(dia, i) in previsao"
          :key="dia.data"
          class="coluna-previsao"
          tabindex="0"
          :aria-label="`${i === 0 ? 'Hoje' : dataCurta(dia.data)}: ${plural(dia.total, 'revisão', 'revisões')}`"
        >
          <span class="dica-barra">{{ i === 0 ? 'Hoje' : dataCurta(dia.data) }} · {{ dia.total }}</span>
          <span class="area-barra">
            <span v-if="dia.total" class="barra" :class="{ hoje: i === 0 }" :style="{ height: `${pct(dia.total, maiorPrevisao)}%` }"></span>
          </span>
          <span class="dia-semana" :class="{ forte: i === 0 }" aria-hidden="true">
            <span class="longo">{{ rotuloDia(dia.data, i) }}</span><span class="curto">{{ rotuloDia(dia.data, i).charAt(0).toUpperCase() }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Por abertura -->
    <section class="cartao">
      <h2 class="titulo-secao">Por abertura</h2>
      <p v-if="!iniciados.length" class="apoio suave">Nenhuma abertura começada ainda. Abra uma em Aberturas e toque em Treinar.</p>
      <ul v-else class="lista-capitulos">
        <li v-for="r in iniciados" :key="r.capitulo.capitulo.id">
          <RouterLink class="linha-capitulo" :to="{ name: 'abertura', params: { cap: r.capitulo.capitulo.id } }">
            <span class="rotulos">
              <span class="nome">{{ fmtTexto(r.capitulo.capitulo.nome) }}</span>
              <span class="suave numeros-capitulo">
                {{ r.estagios.dominadas + r.estagios.aprendendo }}/{{ r.total }}
                <span v-if="r.pendentes" class="selo">{{ r.pendentes }} hoje</span>
              </span>
            </span>
            <span class="barra-estagios" aria-hidden="true">
              <span class="dominadas" :style="{ width: `${pct(r.estagios.dominadas, r.total)}%` }"></span>
              <span class="aprendendo" :style="{ width: `${pct(r.estagios.aprendendo, r.total)}%` }"></span>
            </span>
          </RouterLink>
        </li>
      </ul>
      <p v-if="naoIniciados" class="apoio suave">
        <RouterLink to="/aberturas">{{ plural(naoIniciados, 'abertura ainda não começada', 'aberturas ainda não começadas') }}</RouterLink>
      </p>
    </section>

    <!-- Linhas difíceis -->
    <section v-if="dificeis.length" class="cartao">
      <h2 class="titulo-secao">Linhas que mais custam</h2>
      <p class="apoio suave">As que você mais errou ou fez com pista. Vale rever com as dicas.</p>
      <ul class="lista-dificeis">
        <li v-for="d in dificeis" :key="`${d.capitulo}/${d.linha}|${d.cor}`">
          <RouterLink :to="{ name: 'estudo', params: { cap: d.capitulo, linha: d.linha } }">
            <strong>{{ fmtTexto(d.nomeCapitulo) }}</strong> · {{ d.descricao.titulo }}
          </RouterLink>
          <span class="suave">{{ d.cor === 'w' ? 'brancas' : 'pretas' }}</span>
        </li>
      </ul>
    </section>

    <!-- Exercícios -->
    <section v-if="livros.length" class="cartao">
      <h2 class="titulo-secao">Exercícios</h2>
      <ul class="familias">
        <li v-for="livro in livros" :key="livro.nome">
          <div class="rotulos">
            <span>{{ livro.nome }}</span>
            <span class="suave">{{ (livro.primeira + livro.ajuda).toLocaleString('pt-BR') }} de {{ livro.total.toLocaleString('pt-BR') }}</span>
          </div>
          <div class="barra-estagios" role="img" :aria-label="`${livro.nome}: ${livro.primeira} de primeira, ${livro.ajuda} com ajuda, de ${livro.total}`">
            <span class="dominadas" :style="{ width: `${pct(livro.primeira, livro.total)}%` }"></span>
            <span class="aprendendo" :style="{ width: `${pct(livro.ajuda, livro.total)}%` }"></span>
          </div>
        </li>
      </ul>
      <ul class="legenda">
        <li><i class="amostra dominadas"></i>De primeira</li>
        <li><i class="amostra aprendendo"></i>Com ajuda</li>
        <li><i class="amostra novas"></i>Não resolvidos</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.progresso-pagina {
  display: grid;
  gap: var(--espaco-4);
  max-width: 48rem;
}
.titulo-pagina,
.titulo-secao {
  margin: 0;
}
.cartao {
  min-width: 0;
}
.suave {
  color: var(--texto-suave);
}
.apoio {
  margin: 0;
  font-size: 14px;
}

/* Constância */
.numeros {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--espaco-3);
  margin: 0;
}
.numeros dt {
  color: var(--texto-suave);
  font-size: 14px;
}
.numeros dd {
  margin: 0;
}
.numeros .hoje {
  font-size: 14px;
  line-height: 22px;
  padding-top: 2px;
}
.calendario-rolagem {
  overflow-x: auto;
}
/* As casas crescem com a largura do cartão até 16px; no celular estreito ficam com 10px. */
.calendario {
  display: grid;
  grid-template-columns: repeat(18, minmax(10px, 16px));
  gap: 3px;
}
.semana {
  display: grid;
  gap: 3px;
}
.semana .dia {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}
.dia {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: var(--superficie-2);
}
.dia.nivel-1 { background: color-mix(in srgb, var(--destaque) 30%, var(--superficie-2)); }
.dia.nivel-2 { background: color-mix(in srgb, var(--destaque) 55%, var(--superficie-2)); }
.dia.nivel-3 { background: color-mix(in srgb, var(--destaque) 78%, var(--superficie-2)); }
.dia.nivel-4 { background: var(--destaque); }
.dia.futuro { background: transparent; }
.dia.hoje { outline: 2px solid var(--texto); outline-offset: 1px; }
.rodape-calendario {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--espaco-2);
  font-size: 13px;
}
.escala {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

/* Barras de estágio (dominadas · aprendendo · resto = novas) */
.barra-estagios {
  display: flex;
  gap: 2px;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background: var(--superficie-2);
}
.barra-estagios.grande {
  height: 14px;
}
.barra-estagios > span {
  display: block;
  height: 100%;
}
.barra-estagios > span[style*='width: 0%'] {
  display: none;
}
.dominadas { background: var(--destaque); }
.aprendendo { background: color-mix(in srgb, var(--destaque) 40%, var(--superficie-2)); }
.novas { background: var(--superficie-2); }
.legenda {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-1) var(--espaco-4);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
}
.legenda li {
  display: inline-flex;
  align-items: center;
  gap: var(--espaco-1);
}
.amostra {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  border: 1px solid var(--borda);
}
.familias,
.lista-capitulos,
.lista-dificeis {
  display: grid;
  gap: var(--espaco-3);
  margin: 0;
  padding: 0;
  list-style: none;
}
.familias li {
  display: grid;
  gap: var(--espaco-1);
}
.rotulos {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--espaco-2);
  font-size: 14px;
}

/* Próximas revisões */
.previsao {
  display: grid;
  grid-template-columns: repeat(14, minmax(0, 1fr));
  gap: 4px;
  height: 140px;
}
.coluna-previsao {
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 4px;
  min-width: 0;
  border-radius: 4px;
  outline: none;
}
.coluna-previsao:focus-visible {
  outline: 2px solid var(--foco);
  outline-offset: 2px;
}
.area-barra {
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid var(--borda);
}
.barra {
  width: 100%;
  min-height: 3px;
  border-radius: 4px 4px 0 0;
  background: color-mix(in srgb, var(--destaque) 55%, var(--superficie-2));
}
.barra.hoje {
  background: var(--destaque);
}
.dia-semana {
  text-align: center;
  font-size: 11px;
  color: var(--texto-suave);
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
}
.dia-semana.forte {
  color: var(--texto);
  font-weight: 600;
}
.dia-semana .curto {
  display: none;
}
/* Em tela estreita, só a inicial do dia (H = hoje). */
@media (max-width: 30rem) {
  .dia-semana .longo { display: none; }
  .dia-semana .curto { display: inline; }
}
.dica-barra {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 50%;
  z-index: 2;
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--texto);
  color: var(--fundo);
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
}
.coluna-previsao:first-child .dica-barra { left: 0; transform: none; }
.coluna-previsao:last-child .dica-barra { left: auto; right: 0; transform: none; }
.coluna-previsao:hover .dica-barra,
.coluna-previsao:focus-visible .dica-barra {
  opacity: 1;
}
.coluna-previsao:hover .area-barra {
  background: var(--superficie-2);
}

/* Por abertura */
.linha-capitulo {
  display: grid;
  gap: var(--espaco-1);
  color: var(--texto);
  text-decoration: none;
}
.linha-capitulo:hover .nome {
  color: var(--destaque);
}
.numeros-capitulo {
  display: inline-flex;
  align-items: center;
  gap: var(--espaco-2);
  white-space: nowrap;
}
.lista-dificeis li {
  display: flex;
  justify-content: space-between;
  gap: var(--espaco-2);
  font-size: 14px;
}
.lista-dificeis a {
  color: var(--texto);
}
</style>
