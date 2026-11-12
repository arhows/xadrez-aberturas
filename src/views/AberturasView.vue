<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { buscarAberturas } from '../lib/busca'
import { obterCapitulos, type CapituloCarregado } from '../lib/capitulos'
import { FAMILIAS, familiaDaAbertura } from '../lib/familias'
import { fmtLance, fmtSan, fmtTexto } from '../lib/formato'
import { filaDoCapitulo, percentual } from '../lib/resumoAberturas'
import type { Linha } from '../lib/tipos'

/** Famílias do MCO que têm alguma abertura no app, na ordem do livro. */
const familias = FAMILIAS.map((familia) => ({
  ...familia,
  capitulos: obterCapitulos().filter((c) => familiaDaAbertura(c.capitulo.base).id === familia.id),
})).filter((familia) => familia.capitulos.length)

const linhasAtivas = (capitulo: CapituloCarregado) =>
  capitulo.capitulo.linhas.filter((linha) => !capitulo.desativadas.includes(linha.id)).length

// O texto da busca fica na URL (?q=), então voltar do capítulo mostra a mesma busca.
const route = useRoute()
const router = useRouter()
const texto = ref(String(route.query.q ?? ''))
watch(texto, (novo) => {
  router.replace({ query: novo.trim() ? { q: novo } : {} })
})

const busca = computed(() => buscarAberturas(obterCapitulos(), texto.value))
const resultadosLances = computed(() =>
  busca.value?.tipo === 'lances' ? (busca.value.resultados.length ? busca.value.resultados : busca.value.parcial?.resultados ?? []) : [],
)

/** "1.e4 c5 2.Nf3", na notação escolhida. */
const sequencia = (sans: string[]) => sans.map((san, i) => (i % 2 === 0 ? fmtLance(i + 1, san) : fmtSan(san))).join(' ')

const MAX_LINHAS = 6
const rotuloColuna = (linha: Linha) => (linha.coluna === null ? 'Bônus' : `Col. ${linha.coluna}`)
const plural = (n: number, palavra: string) => `${n} ${palavra}${n === 1 ? '' : 's'}`
</script>

<template>
  <div class="pagina">
    <h1>Aberturas</h1>

    <label class="campo busca">
      <span class="visualmente-oculto">Buscar abertura</span>
      <input
        v-model="texto"
        type="search"
        placeholder="Buscar por nome ou lances: Najdorf, e4 c5 Cf3…"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        enterkeyhint="search"
      />
    </label>

    <template v-if="busca?.tipo === 'nome'">
      <p class="suave contagem">
        {{ busca.resultados.length ? plural(busca.resultados.length, 'abertura') : 'Nenhuma abertura com esse nome.' }}
      </p>
      <ul class="cartoes">
        <li v-for="r in busca.resultados" :key="r.capitulo.capitulo.id">
          <RouterLink class="cartao" :to="{ name: 'abertura', params: { cap: r.capitulo.capitulo.id } }">
            <strong class="titulo-item">{{ fmtTexto(r.capitulo.capitulo.nome) }}</strong>
            <span class="lance suave">{{ fmtTexto(r.capitulo.capitulo.base) }}</span>
            <span class="suave">{{ familiaDaAbertura(r.capitulo.capitulo.base).nome }} · {{ percentual(r.capitulo) }}% dominado</span>
            <span v-for="grupo in r.grupos" :key="grupo.id" class="grupo-achado">{{ fmtTexto(grupo.nome) }}</span>
          </RouterLink>
        </li>
      </ul>
    </template>

    <template v-else-if="busca?.tipo === 'lances'">
      <p class="suave contagem">
        Posição depois de <span class="lance">{{ sequencia(busca.sans) }}</span>
      </p>
      <p v-if="!busca.resultados.length && busca.parcial" class="aviso">
        Nenhuma abertura chega a essa posição. A sequência fica no livro até
        <span class="lance">{{ fmtLance(busca.parcial.lances, busca.sans[busca.parcial.lances - 1]) }}</span>; estas aberturas vão até lá:
      </p>
      <p v-else-if="!busca.resultados.length" class="aviso">Nenhuma abertura começa assim.</p>

      <ul class="cartoes">
        <li v-for="r in resultadosLances" :key="r.capitulo.capitulo.id" class="cartao">
          <RouterLink class="titulo-item" :to="{ name: 'abertura', params: { cap: r.capitulo.capitulo.id } }">
            {{ fmtTexto(r.capitulo.capitulo.nome) }}
          </RouterLink>
          <span class="suave">
            {{ plural(r.linhas.length, 'coluna') }}<template v-if="r.notas"> · {{ plural(r.notas, 'nota') }}</template>
          </span>
          <span v-if="r.transposicao" class="suave">
            Ordem do livro: <span class="lance">{{ sequencia(r.caminho) }}</span>
          </span>
          <span v-if="r.linhas.length" class="colunas">
            <RouterLink
              v-for="linha in r.linhas.slice(0, MAX_LINHAS)"
              :key="linha.id"
              class="selo"
              :to="{ name: 'estudo', params: { cap: r.capitulo.capitulo.id, linha: linha.id } }"
              :title="fmtTexto(linha.nome)"
            >{{ rotuloColuna(linha) }}</RouterLink>
            <span v-if="r.linhas.length > MAX_LINHAS" class="suave">+{{ r.linhas.length - MAX_LINHAS }}</span>
          </span>
          <span>
            <RouterLink class="botao" :to="{ name: 'explorar', params: { cap: r.capitulo.capitulo.id }, query: { c: r.caminho.join(' ') } }">
              Explorar posição
            </RouterLink>
          </span>
        </li>
      </ul>
    </template>

    <template v-else>
      <section v-for="familia in familias" :key="familia.id" class="familia">
        <h2>{{ familia.nome }} <span class="suave">{{ fmtTexto(familia.lances) }}</span></h2>
        <ul class="cartoes">
          <li v-for="capitulo in familia.capitulos" :key="capitulo.capitulo.id">
            <RouterLink class="cartao" :to="{ name: 'abertura', params: { cap: capitulo.capitulo.id } }">
              <strong class="titulo-item">{{ capitulo.capitulo.nome }}</strong>
              <span class="lance suave">{{ fmtTexto(capitulo.capitulo.base) }}</span>
              <span class="suave">
                {{ linhasAtivas(capitulo) }} linhas · {{ percentual(capitulo) }}% dominado
              </span>
              <span class="progresso fino"><span class="trilho"><span :style="{ width: `${percentual(capitulo)}%` }"></span></span></span>
              <span class="rodape">
                <span v-if="filaDoCapitulo(capitulo.capitulo.id)" class="selo">{{ filaDoCapitulo(capitulo.capitulo.id) }} PARA HOJE</span>
                <span v-else class="selo ok">EM DIA</span>
              </span>
            </RouterLink>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 1rem;
}
h2 {
  margin: 0 0 0.75rem;
}
h2 .suave {
  font-weight: 400;
}
.busca {
  margin-bottom: 1.5rem;
}
.visualmente-oculto {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.contagem {
  margin: -0.75rem 0 1rem;
}
.aviso {
  margin: 0 0 1rem;
}
.familia + .familia {
  margin-top: 2rem;
}
.suave {
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.cartoes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.cartao {
  gap: var(--espaco-2);
  height: 100%;
  color: var(--texto);
  text-decoration: none;
}
.cartao .lance {
  font-size: 14px;
}
a.titulo-item {
  color: var(--texto);
  text-decoration: none;
}
a.titulo-item:hover {
  color: var(--destaque);
}
.grupo-achado {
  font-size: 0.875rem;
  border-left: 2px solid var(--destaque);
  padding-left: var(--espaco-2);
}
.colunas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--espaco-1);
}
.colunas .selo {
  text-decoration: none;
}
.rodape {
  margin-top: var(--espaco-1);
}
a.cartao:hover,
a.cartao:focus-visible {
  border-color: var(--destaque);
}
</style>
