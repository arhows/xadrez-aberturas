<script setup lang="ts">
import { diasSeguidos, TAMANHO_DA_SERIE } from '../lib/diario'
import { dataLocal } from '../lib/srs'
import { livroDoConjunto, obterConjuntos, type ConjuntoExercicios } from '../lib/exercicios'
import { progresso } from '../lib/progresso'
import { revisoesPendentes } from '../lib/revisaoExercicios'

interface Livro {
  autor: string
  titulo: string
  conjuntos: ConjuntoExercicios[]
}

/** Conjuntos agrupados por livro ("Autor, Título"), na ordem em que foram carregados. */
const livros: Livro[] = []
for (const conjunto of obterConjuntos()) {
  const [autor, ...titulo] = livroDoConjunto(conjunto).split(', ')
  const livro = livros.find((l) => l.autor === autor)
  if (livro) livro.conjuntos.push(conjunto)
  else livros.push({ autor, titulo: titulo.join(', '), conjuntos: [conjunto] })
}

function contagem(conjuntos: ConjuntoExercicios[]) {
  const estados = conjuntos.flatMap((c) => Object.values(progresso.exercicios[c.id] ?? {}))
  const total = conjuntos.reduce((soma, c) => soma + c.problemas.length, 0)
  const primeira = estados.filter((e) => e === 'primeira').length
  const ajuda = estados.filter((e) => e === 'ajuda').length
  return { total, primeira, ajuda, percentual: total ? Math.round(((primeira + ajuda) / total) * 100) : 0 }
}


const numero = (n: number) => n.toLocaleString('pt-BR')

const hoje = dataLocal()
const feitosHoje = Object.keys(progresso.diario[hoje] ?? {}).length
const dias = diasSeguidos(progresso.diario, hoje)

const revisoes = revisoesPendentes(obterConjuntos())
const primeiraRevisao = revisoes[0]
</script>

<template>
  <div class="pagina">
    <h1>Táticas e mates</h1>
    <RouterLink to="/diario" class="fundamentos diario" :class="{ pendente: feitosHoje < TAMANHO_DA_SERIE }">
      <span class="icone" aria-hidden="true">★</span>
      <span class="textos">
        <strong>Exercícios do dia</strong>
        <span class="suave">
          Táticas e mates em 1 a 4 misturados, sem dizer o tema · {{ feitosHoje }} de {{ TAMANHO_DA_SERIE }} hoje
          <template v-if="dias"> · {{ dias }} {{ dias === 1 ? 'dia seguido' : 'dias seguidos' }}</template>
          · Sequência: recorde {{ progresso.sequencia }}
        </span>
      </span>
      <span class="botao" :class="{ primario: feitosHoje < TAMANHO_DA_SERIE }">{{ feitosHoje ? (feitosHoje < TAMANHO_DA_SERIE ? 'Continuar' : 'Ver') : 'Começar' }}</span>
    </RouterLink>
    <section class="revisao" :class="{ vazia: !primeiraRevisao }">
      <div>
        <strong>Revisão de hoje</strong>
        <span class="suave">
          {{ primeiraRevisao ? `${numero(revisoes.length)} problemas que você errou ou fez com pista` : 'Nada para revisar hoje. Os problemas errados voltam aqui com o tempo.' }}
        </span>
      </div>
      <RouterLink
        v-if="primeiraRevisao"
        class="botao primario"
        :to="{ name: 'exercicio', params: { conjunto: primeiraRevisao.conjunto }, query: { n: String(primeiraRevisao.n), revisao: '1' } }"
      >Revisar</RouterLink>
    </section>
    <section v-for="livro in livros" :key="livro.autor" class="livro">
      <header>
        <h2>{{ livro.autor }}</h2>
        <p class="titulo">{{ livro.titulo }}</p>
        <p class="suave">
          {{ numero(contagem(livro.conjuntos).total) }} problemas ·
          {{ contagem(livro.conjuntos).percentual }}% resolvidos
        </p>
        <div class="progresso fino" role="presentation">
          <span class="trilho"><span :style="{ width: `${contagem(livro.conjuntos).percentual}%` }"></span></span>
        </div>
      </header>
      <ul class="conjuntos">
        <li v-for="conjunto in livro.conjuntos" :key="conjunto.id">
          <div>
            <strong class="titulo-item">{{ conjunto.nome }}</strong>
            <span class="suave">
              {{ numero(conjunto.problemas.length) }} problemas ·
              ✓ {{ contagem([conjunto]).primeira }} de primeira · {{ contagem([conjunto]).ajuda }} com ajuda
            </span>
          </div>
          <RouterLink class="botao" :to="{ name: conjunto.tipo === 'tatica' ? 'tatica' : 'exercicio', params: { conjunto: conjunto.id } }">Resolver</RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 0 1rem;
}
.fundamentos {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 1rem;
  border: 1px solid var(--borda);
  border-radius: 12px;
  background: var(--superficie);
  color: var(--texto);
  text-decoration: none;
}
.fundamentos.diario.pendente {
  border-color: var(--destaque);
}
.fundamentos .icone {
  font-size: 2rem;
  line-height: 1;
}
.fundamentos .textos {
  display: grid;
  flex: 1;
  min-width: 0;
}
.revisao {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding: 1rem;
  border: 1px solid var(--aviso);
  border-radius: 12px;
}
.revisao.vazia {
  border-color: var(--borda);
}
.revisao div {
  display: grid;
}
.livro {
  border: 1px solid var(--borda);
  border-radius: 12px;
  background: var(--superficie);
  overflow: hidden;
}
.livro + .livro {
  margin-top: 1.25rem;
}
header {
  display: grid;
  gap: 0.25rem;
  padding: 1rem 1rem 0.75rem;
}
h2 {
  margin: 0;
}
p {
  margin: 0;
}
.titulo {
  font-style: italic;
}
.suave {
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.progresso {
  margin-top: var(--espaco-2);
}
.conjuntos {
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--fundo);
}
.conjuntos li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--borda);
}
.conjuntos li div {
  display: grid;
}
</style>
