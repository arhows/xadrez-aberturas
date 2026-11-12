<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { percorrer } from '../lib/arvore'
import { buscarCapitulo, obterCapitulos } from '../lib/capitulos'
import { carregarConjuntos, livroDoConjunto, type ConjuntoExercicios } from '../lib/exercicios'
import { fmtLance } from '../lib/formato'
import { progresso } from '../lib/progresso'
import { capitulosDoRepertorio, repertorioEscolhido } from '../lib/repertorio'
import { filaDoCapitulo, percentual, proximaFila, totalRevisoes } from '../lib/resumoAberturas'
import { revisoesPendentes } from '../lib/revisaoExercicios'

// Com repertório escolhido, os totais e a lista mostram só as aberturas dele.
const capitulos = capitulosDoRepertorio(obterCapitulos())
const totalLinhas = capitulos.reduce(
  (soma, c) => soma + c.capitulo.linhas.filter((linha) => !c.desativadas.includes(linha.id)).length,
  0,
)

// Os exercícios carregam à parte (são grandes); o cartão mostra os totais quando chegarem.
const conjuntos = ref<ConjuntoExercicios[]>([])
onMounted(async () => {
  conjuntos.value = await carregarConjuntos()
})
const totalProblemas = computed(() => conjuntos.value.reduce((soma, c) => soma + c.problemas.length, 0))
const totalLivros = computed(() => new Set(conjuntos.value.map(livroDoConjunto)).size)
const resolvidos = computed(() =>
  Object.values(progresso.exercicios).reduce((soma, estados) => soma + Object.keys(estados).length, 0),
)
const ultimo = computed(() => conjuntos.value.find((c) => c.id === progresso.ultimoConjunto))
const revisoesExercicios = computed(() => revisoesPendentes(conjuntos.value))

/** Quanto do repertório está dominado, contando só as linhas ativas. */
const dominado = computed(() => {
  const ativas = capitulos.map((c) => ({ c, linhas: c.capitulo.linhas.filter((l) => !c.desativadas.includes(l.id)) }))
  const total = ativas.reduce((soma, a) => soma + a.linhas.length, 0)
  if (!total) return 0
  return Math.round(ativas.reduce((soma, a) => soma + percentual(a.c, a.linhas) * a.linhas.length, 0) / total)
})
const suasAberturas = computed(() =>
  capitulos.map((c) => {
    const linhas = c.capitulo.linhas.filter((l) => !c.desativadas.includes(l.id))
    return { id: c.capitulo.id, nome: c.capitulo.nome, linhas: linhas.length, dominado: percentual(c, linhas), hoje: filaDoCapitulo(c.capitulo.id) }
  }),
)
const resolvidoPct = computed(() =>
  totalProblemas.value ? (resolvidos.value / totalProblemas.value) * 100 : 0,
)
const fmtPct = (valor: number) =>
  `${valor > 0 && valor < 1 ? valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) : Math.round(valor)}%`

const maisErrados = computed(() =>
  Object.values(progresso.errosPorAresta)
    .filter((erro) => erro.erros > 0 && buscarCapitulo(erro.capitulo))
    .sort((a, b) => b.erros - a.erros)
    .slice(0, 5)
    .filter((erro) => percorrer(buscarCapitulo(erro.capitulo)!.arvore, erro.caminho))
    .map((erro) => ({ ...erro, rotulo: fmtLance(erro.caminho.length, erro.caminho.at(-1)!) })),
)
</script>

<template>
  <div class="pagina inicio">
    <div class="topo-inicio">
      <h1 class="titulo-pagina">Hoje</h1>
      <span class="atalhos">
        <RouterLink class="botao fantasma" to="/relampago">Relâmpago</RouterLink>
        <RouterLink class="botao fantasma" to="/jogar">Jogar</RouterLink>
        <RouterLink class="botao fantasma" to="/editor">Editor de posição</RouterLink>
        <RouterLink class="botao fantasma" to="/progresso">Ver progresso</RouterLink>
      </span>
    </div>

    <div class="areas">
      <section class="cartao">
        <div class="cabeca">
          <h2 class="titulo-secao">Aberturas</h2>
          <span v-if="totalRevisoes" class="selo">PARA HOJE</span>
          <span v-else class="selo ok">EM DIA</span>
        </div>
        <div class="metrica" :class="totalRevisoes ? 'pendente' : 'em-dia'">
          <span class="numero-grande">{{ totalRevisoes }}</span>
          <span class="apoio suave">{{ totalRevisoes === 1 ? 'linha para revisar' : 'linhas para revisar' }}</span>
        </div>
        <div class="progresso fino">
          <div class="rotulos">
            <span>{{ capitulos.length }} {{ capitulos.length === 1 ? 'abertura' : 'aberturas' }} · {{ totalLinhas }} linhas</span>
            <span><strong>{{ dominado }}%</strong> dominado</span>
          </div>
          <div class="trilho"><span :style="{ width: `${dominado}%` }"></span></div>
        </div>
        <div class="acoes">
          <RouterLink
            v-if="proximaFila"
            class="botao primario largo-celular"
            :to="{ name: 'treino', params: { cap: proximaFila.id }, query: { auto: '1' } }"
          >Revisar agora</RouterLink>
          <RouterLink class="botao largo-celular" :class="{ primario: !proximaFila }" to="/aberturas">Ver aberturas</RouterLink>
        </div>
      </section>

      <section class="cartao">
        <div class="cabeca">
          <h2 class="titulo-secao">Exercícios</h2>
          <span v-if="revisoesExercicios.length" class="selo">PARA HOJE</span>
          <span v-else class="selo ok">EM DIA</span>
        </div>
        <div v-if="revisoesExercicios.length" class="metrica pendente">
          <span class="numero-grande">{{ revisoesExercicios.length }}</span>
          <span class="apoio suave">{{ revisoesExercicios.length === 1 ? 'mate para revisar' : 'mates para revisar' }}</span>
        </div>
        <div v-else class="metrica">
          <span class="numero-grande">{{ resolvidos.toLocaleString('pt-BR') }}</span>
          <span class="apoio suave">
            <template v-if="conjuntos.length">de {{ totalProblemas.toLocaleString('pt-BR') }} mates resolvidos</template>
            <template v-else>mates resolvidos</template>
          </span>
        </div>
        <div v-if="conjuntos.length" class="progresso fino">
          <div class="rotulos">
            <span>{{ totalLivros }} {{ totalLivros === 1 ? 'livro' : 'livros' }}</span>
            <span><strong>{{ fmtPct(resolvidoPct) }}</strong> resolvido</span>
          </div>
          <div class="trilho"><span :style="{ width: `${resolvidoPct}%` }"></span></div>
        </div>
        <div class="acoes">
          <RouterLink
            v-if="revisoesExercicios.length"
            class="botao primario largo-celular"
            :to="{ name: 'exercicio', params: { conjunto: revisoesExercicios[0].conjunto }, query: { n: String(revisoesExercicios[0].n), revisao: '1' } }"
          >Revisar exercícios</RouterLink>
          <RouterLink
            v-if="ultimo"
            class="botao largo-celular"
            :class="{ primario: !revisoesExercicios.length && !proximaFila }"
            :to="{ name: 'exercicio', params: { conjunto: ultimo.id } }"
          >Continuar: {{ ultimo.nome }}</RouterLink>
          <RouterLink class="botao largo-celular" :class="{ primario: !ultimo && !revisoesExercicios.length && !proximaFila }" to="/exercicios">
            Ver livros
          </RouterLink>
        </div>
        <p v-if="ultimo" class="apoio suave">{{ livroDoConjunto(ultimo) }}</p>
      </section>
    </div>

    <div class="areas">
      <section v-if="maisErrados.length" class="secao">
        <div class="cabeca-erros">
          <h2 class="titulo-secao">Lances em que você mais erra</h2>
          <RouterLink class="botao primario" to="/erros">Treinar meus erros</RouterLink>
        </div>
        <div class="lista">
          <RouterLink
            v-for="erro in maisErrados"
            :key="erro.caminho.join(' ')"
            class="linha-lista"
            :to="{ name: 'explorar', params: { cap: erro.capitulo }, query: { c: erro.caminho.join(' ') } }"
          >
            <span class="nome lance">{{ erro.rotulo }}</span>
            <span class="meta">{{ buscarCapitulo(erro.capitulo)!.capitulo.nome }}</span>
            <span class="lado"><span class="selo erro">{{ erro.erros }} {{ erro.erros === 1 ? 'ERRO' : 'ERROS' }}</span></span>
          </RouterLink>
        </div>
      </section>

      <section class="secao">
        <h2 class="titulo-secao">{{ repertorioEscolhido ? 'Seu repertório' : 'Suas aberturas' }}</h2>
        <div class="lista">
          <RouterLink
            v-for="a in suasAberturas"
            :key="a.id"
            class="linha-lista"
            :to="{ name: 'abertura', params: { cap: a.id } }"
          >
            <span class="nome">{{ a.nome }}</span>
            <span class="meta">{{ a.linhas }} linhas · {{ a.dominado }}% dominado</span>
            <span class="progresso fino"><span class="trilho"><span :style="{ width: `${a.dominado}%` }"></span></span></span>
            <span class="lado">
              <span v-if="a.hoje" class="selo">{{ a.hoje }} HOJE</span>
              <span v-else class="selo ok">EM DIA</span>
            </span>
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.cabeca-erros {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-2);
}
.atalhos {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--espaco-1);
}
.topo-inicio {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--espaco-2);
}
.inicio {
  display: grid;
  gap: var(--espaco-5);
  max-width: 1040px;
}
.titulo-pagina {
  margin: var(--espaco-1) 0 0;
}
.areas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  align-items: start;
  gap: var(--espaco-4);
}
.suave {
  color: var(--texto-suave);
}
p {
  margin: 0;
}
.secao {
  display: grid;
  gap: var(--espaco-2);
}
.secao .titulo-secao {
  margin: 0;
}
/* No celular os botões do cartão ocupam a largura toda (ao alcance do polegar). */
@media (max-width: 799.98px) {
  .largo-celular {
    width: 100%;
  }
}
</style>
