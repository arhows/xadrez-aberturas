<script setup lang="ts">
import { computed, ref } from 'vue'
import Icone from './Icone.vue'
import { gravar, ler } from '../lib/armazenamento'
import { buscarCapitulo } from '../lib/capitulos'
import { buscarLinha, corDoCapitulo } from '../lib/escopo'
import { fmtLance } from '../lib/formato'
import { nuvem } from '../lib/nuvem'
import { progresso } from '../lib/progresso'
import { alternarRepertorio, estaNoRepertorio, repertorioEscolhido } from '../lib/repertorio'
import { sugestoesDasPartidas, type Sugestao, type SugestaoTreinar } from '../lib/sugestoes'

/**
 * Sugestões tiradas das suas partidas importadas: adicionar uma abertura ao repertório,
 * treinar a outra cor ou a posição em que você mais sai do livro. Cada uma pode ser dispensada.
 */
const props = withDefaults(defineProps<{ limite?: number; titulo?: string }>(), { limite: 6, titulo: 'Sugestões das suas partidas' })

const chaveDispensadas = computed(() => `aberturas.sugestoes.dispensadas.${nuvem.uid ?? ''}`)
const dispensadas = ref<string[]>(ler<string[]>(chaveDispensadas.value, []))
function dispensar(s: Sugestao) {
  dispensadas.value = [...dispensadas.value, s.chave]
  gravar(chaveDispensadas.value, dispensadas.value)
}

const todas = computed(() =>
  sugestoesDasPartidas(Object.values(progresso.partidas.analisadas), {
    repertorioEscolhido: repertorioEscolhido.value,
    noRepertorio: estaNoRepertorio,
    corTreinada: (id) => {
      const capitulo = buscarCapitulo(id)
      return capitulo ? corDoCapitulo(capitulo, progresso.corPorCapitulo) : 'ambas'
    },
  }).filter((s) => buscarCapitulo(s.capitulo) && !dispensadas.value.includes(s.chave)),
)
const visiveis = computed(() => todas.value.slice(0, props.limite))

const nome = (id: string) => buscarCapitulo(id)?.capitulo.nome ?? id
const nomeDaCor = (cor: string) => (cor === 'w' ? 'as brancas' : 'as pretas')
const plural = (n: number, palavra: string) => `${n} ${palavra}${n === 1 ? '' : 's'}`

/** "Depois de 3...Bc5, você jogou 4.d3" */
function textoDoDesvio(s: SugestaoTreinar): string {
  const ply = s.caminho.length
  const antes = ply ? `Depois de ${fmtLance(ply, s.caminho[ply - 1])}, v` : 'V'
  return `${antes}ocê jogou ${fmtLance(ply + 1, s.jogado)} em ${plural(s.vezes, 'partida')}; o livro joga ${fmtLance(ply + 1, s.livro)}.`
}

/** Uma coluna do livro que passa pelo lance certo (o Treino trabalha com colunas). */
function linhaParaTreinar(s: SugestaoTreinar): string | null {
  const capitulo = buscarCapitulo(s.capitulo)
  if (!capitulo) return null
  return s.linhas.find((id) => buscarLinha(capitulo, id)) ?? null
}

function adicionar(id: string, cor: 'w' | 'b' | 'ambas') {
  if (!estaNoRepertorio(id)) alternarRepertorio(id)
  progresso.corPorCapitulo = { ...progresso.corPorCapitulo, [id]: cor }
}
function treinarAsDuasCores(id: string) {
  progresso.corPorCapitulo = { ...progresso.corPorCapitulo, [id]: 'ambas' }
}
</script>

<template>
  <section v-if="visiveis.length" class="sugestoes">
    <h2 class="titulo-secao">{{ titulo }}</h2>
    <ul class="lista">
      <li v-for="s in visiveis" :key="s.chave" class="sugestao">
        <span v-if="s.tipo === 'treinar'" class="ladrilho tom-praticar"><Icone nome="mira" /></span>
        <span v-else-if="s.tipo === 'adicionar'" class="ladrilho tom-aprender"><Icone nome="livro" /></span>
        <span v-else class="ladrilho tom-eu"><Icone nome="repetir" /></span>

        <div class="textos">
          <template v-if="s.tipo === 'treinar'">
            <span class="rotulo">Você sai do livro aqui</span>
            <strong>{{ nome(s.capitulo) }}</strong>
            <span class="apoio suave">{{ textoDoDesvio(s) }}</span>
          </template>
          <template v-else-if="s.tipo === 'adicionar'">
            <span class="rotulo">{{ repertorioEscolhido ? 'Fora do seu repertório' : 'Para começar o seu repertório' }}</span>
            <strong>{{ nome(s.capitulo) }}</strong>
            <span class="apoio suave">
              Você jogou em {{ plural(s.partidas, 'partida') }}<template v-if="s.cor !== 'ambas'">, com {{ nomeDaCor(s.cor) }}</template>
              · {{ s.aproveitamento }}% dos pontos.
            </span>
          </template>
          <template v-else>
            <span class="rotulo">Treine também com {{ nomeDaCor(s.cor) }}</span>
            <strong>{{ nome(s.capitulo) }}</strong>
            <span class="apoio suave">Você jogou com {{ nomeDaCor(s.cor) }} em {{ plural(s.partidas, 'partida') }}, mas no repertório está só com a outra cor.</span>
          </template>

          <div class="acoes">
            <template v-if="s.tipo === 'treinar'">
              <RouterLink
                v-if="linhaParaTreinar(s)"
                class="botao primario"
                :to="{ name: 'treino', params: { cap: s.capitulo }, query: { escopo: `linha:${linhaParaTreinar(s)}`, comecar: '1' } }"
              >Treinar esta linha</RouterLink>
              <RouterLink class="botao" :to="{ name: 'explorar', params: { cap: s.capitulo }, query: { c: s.caminho.join(' ') } }">Ver no Explorar</RouterLink>
            </template>
            <template v-else-if="s.tipo === 'adicionar'">
              <button type="button" class="botao primario" @click="adicionar(s.capitulo, s.cor)">☆ Adicionar ao repertório</button>
              <RouterLink class="botao" :to="{ name: 'abertura', params: { cap: s.capitulo } }">Ver a abertura</RouterLink>
            </template>
            <button v-else type="button" class="botao primario" @click="treinarAsDuasCores(s.capitulo)">Treinar as duas cores</button>
          </div>
        </div>

        <button type="button" class="dispensar" :aria-label="`Dispensar sugestão`" title="Dispensar" @click="dispensar(s)">×</button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.sugestoes {
  display: grid;
  gap: var(--espaco-3);
}
h2 {
  margin: 0;
}
.sugestao {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--espaco-3);
  padding: var(--espaco-3) var(--espaco-5) var(--espaco-3) var(--espaco-4);
}
.sugestao + .sugestao {
  border-top: 1px solid var(--borda);
}
.textos {
  display: grid;
  gap: var(--espaco-1);
  min-width: 0;
}
.rotulo {
  color: var(--texto-suave);
  font: 600 11px/16px var(--font-texto);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.textos .apoio {
  margin: 0;
}
.suave {
  color: var(--texto-suave);
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
  margin-top: var(--espaco-1);
}
.dispensar {
  position: absolute;
  top: var(--espaco-1);
  right: var(--espaco-1);
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  background: none;
  color: var(--texto-suave);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}
.dispensar:hover {
  background: var(--superficie-2);
}
</style>
