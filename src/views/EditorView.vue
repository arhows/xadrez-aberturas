<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Tabuleiro from '../components/Tabuleiro.vue'
import {
  colocarPeca,
  fenColado,
  fenDaPosicao,
  FEN_INICIAL,
  FEN_VAZIO,
  lerPosicao,
  problemaDaPosicao,
  roquesPossiveis,
  type Roques,
  type Vez,
} from '../lib/editor'

/** Editor de posição: monte qualquer posição (de um livro, de uma partida) para analisar ou jogar. */

const route = useRoute()
const router = useRouter()

const inicial = typeof route.query.fen === 'string' ? fenColado(route.query.fen) : null
const pecas = shallowRef(lerPosicao(inicial ?? FEN_INICIAL).pecas)
const vez = ref<Vez>(lerPosicao(inicial ?? FEN_INICIAL).vez)
const roques = ref<Roques>(lerPosicao(inicial ?? FEN_INICIAL).roques)
/** FEN colado ou recebido, mantido enquanto nada muda (guarda en passant e número do lance). */
const fenRecebido = ref<string | null>(inicial)
const orientacao = ref<'white' | 'black'>(route.query.orientacao === 'black' ? 'black' : 'white')

type Ferramenta = 'mover' | 'apagar' | string
const ferramenta = ref<Ferramenta>('mover')

const fen = computed(() => fenRecebido.value ?? fenDaPosicao({ pecas: pecas.value, vez: vez.value, roques: roques.value }))
const problema = computed(() => problemaDaPosicao(fen.value))
const possiveis = computed(() => roquesPossiveis(pecas.value))

function mudou() {
  fenRecebido.value = null
}

function aoTocar(casa: string) {
  if (ferramenta.value === 'mover') return
  pecas.value = colocarPeca(pecas.value, casa, ferramenta.value === 'apagar' ? null : ferramenta.value)
  mudou()
}

/** Arrastou uma peça (modo mover): o tabuleiro manda a nova disposição. */
function aoArrastar(disposicao: string) {
  pecas.value = lerPosicao(`${disposicao} w - - 0 1`).pecas
  mudou()
}

function carregar(novo: string) {
  const p = lerPosicao(novo)
  pecas.value = p.pecas
  vez.value = p.vez
  roques.value = p.roques
  fenRecebido.value = novo
}

const textoFen = ref('')
const erroFen = ref('')
function colar() {
  const lido = fenColado(textoFen.value)
  if (!lido) {
    erroFen.value = 'Não reconheci esse FEN.'
    return
  }
  erroFen.value = ''
  textoFen.value = ''
  carregar(lido)
}

const copiado = ref(false)
async function copiarFen() {
  try {
    await navigator.clipboard.writeText(fen.value)
    copiado.value = true
    setTimeout(() => (copiado.value = false), 1500)
  } catch {
    textoFen.value = fen.value
  }
}

function analisar() {
  router.push({ name: 'analisar', query: { fen: fen.value, orientacao: orientacao.value } })
}
function jogar() {
  router.push({ name: 'jogar', query: { fen: fen.value } })
}

const TIPOS = [
  { letra: 'k', nome: 'rei', classe: 'king' },
  { letra: 'q', nome: 'dama', classe: 'queen' },
  { letra: 'r', nome: 'torre', classe: 'rook' },
  { letra: 'b', nome: 'bispo', classe: 'bishop' },
  { letra: 'n', nome: 'cavalo', classe: 'knight' },
  { letra: 'p', nome: 'peão', classe: 'pawn' },
]
const CORES = [
  { cor: 'white', nome: 'branco', letra: (l: string) => l.toUpperCase() },
  { cor: 'black', nome: 'preto', letra: (l: string) => l },
]
const ROQUES: { chave: keyof Roques; rotulo: string }[] = [
  { chave: 'K', rotulo: 'Brancas O-O' },
  { chave: 'Q', rotulo: 'Brancas O-O-O' },
  { chave: 'k', rotulo: 'Pretas O-O' },
  { chave: 'q', rotulo: 'Pretas O-O-O' },
]
</script>

<template>
  <header class="cabecalho-movel so-celular">
    <RouterLink class="voltar" to="/" aria-label="Voltar">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
    </RouterLink>
    <h1>Editor de posição</h1>
  </header>

  <div class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        :fen="fen"
        :orientacao="orientacao"
        :editavel="ferramenta === 'mover'"
        :capturadas="false"
        @casa="aoTocar"
        @mudou="aoArrastar"
      />
    </div>

    <div class="painel">
      <div class="cabeca-painel so-computador">
        <RouterLink to="/" class="trilha">‹ Início</RouterLink>
        <h1 class="titulo-pagina">Editor de posição</h1>
      </div>
      <p class="suave">
        Escolha uma peça e toque nas casas para colocá-la (tocar de novo tira). Em <strong>Mover</strong>, arraste as peças; solte fora do
        tabuleiro para tirar.
      </p>

      <div class="paleta" role="radiogroup" aria-label="Peça para colocar">
        <button
          type="button"
          class="ferramenta texto"
          :class="{ ativa: ferramenta === 'mover' }"
          role="radio"
          :aria-checked="ferramenta === 'mover'"
          @click="ferramenta = 'mover'"
        >✋ Mover</button>
        <button
          type="button"
          class="ferramenta texto"
          :class="{ ativa: ferramenta === 'apagar' }"
          role="radio"
          :aria-checked="ferramenta === 'apagar'"
          @click="ferramenta = 'apagar'"
        >⌫ Apagar</button>
        <div v-for="c in CORES" :key="c.cor" class="linha-pecas">
          <button
            v-for="t in TIPOS"
            :key="t.letra"
            type="button"
            class="ferramenta cg-wrap"
            :class="{ ativa: ferramenta === c.letra(t.letra) }"
            role="radio"
            :aria-checked="ferramenta === c.letra(t.letra)"
            :aria-label="`${t.nome} ${c.nome}`"
            :title="`${t.nome} ${c.nome}`"
            @click="ferramenta = c.letra(t.letra)"
          >
            <piece :class="[c.cor, t.classe]"></piece>
          </button>
        </div>
      </div>

      <div class="acoes">
        <button type="button" class="botao" @click="carregar(FEN_INICIAL)">Posição inicial</button>
        <button type="button" class="botao" @click="carregar(FEN_VAZIO)">Limpar</button>
        <button type="button" class="botao" @click="orientacao = orientacao === 'white' ? 'black' : 'white'">Girar</button>
      </div>

      <fieldset class="opcoes">
        <legend>Vez de jogar</legend>
        <label class="marcar"><input v-model="vez" type="radio" value="w" @change="mudou" /> Brancas</label>
        <label class="marcar"><input v-model="vez" type="radio" value="b" @change="mudou" /> Pretas</label>
      </fieldset>

      <fieldset class="opcoes">
        <legend>Roques permitidos</legend>
        <label v-for="r in ROQUES" :key="r.chave" class="marcar" :class="{ apagado: !possiveis[r.chave] }">
          <input v-model="roques[r.chave]" type="checkbox" :disabled="!possiveis[r.chave]" @change="mudou" />
          {{ r.rotulo }}
        </label>
      </fieldset>

      <p v-if="problema" class="problema" role="status">⚠ {{ problema }}</p>
      <div class="acoes">
        <button type="button" class="botao primario" :disabled="!!problema" @click="analisar">Analisar</button>
        <button type="button" class="botao primario" :disabled="!!problema" @click="jogar">Jogar daqui</button>
      </div>

      <section class="fen">
        <label for="fen-atual" class="rotulo">FEN</label>
        <div class="linha-fen">
          <input id="fen-atual" class="campo" :value="fen" readonly @focus="($event.target as HTMLInputElement).select()" />
          <button type="button" class="botao" @click="copiarFen">{{ copiado ? 'Copiado!' : 'Copiar' }}</button>
        </div>
        <label for="fen-colar" class="rotulo">Colar um FEN</label>
        <div class="linha-fen">
          <input id="fen-colar" v-model="textoFen" class="campo" placeholder="Ex.: r1bqkbnr/pppp1ppp/2n5/…" @keydown.enter="colar" />
          <button type="button" class="botao" :disabled="!textoFen.trim()" @click="colar">Carregar</button>
        </div>
        <p v-if="erroFen" class="problema">{{ erroFen }}</p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.cabeca-painel {
  display: grid;
  gap: var(--espaco-1);
}
.cabeca-painel .titulo-pagina {
  margin: 0;
}
.trilha {
  display: inline-flex;
  align-items: center;
  min-height: var(--alvo-toque);
  color: var(--destaque);
  font-size: 14px;
  text-decoration: none;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
  line-height: 1.5;
}
.paleta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
.linha-pecas {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
  width: 100%;
}
.ferramenta {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 1px solid var(--borda-controle);
  border-radius: var(--raio-md);
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  cursor: pointer;
}
.ferramenta.texto {
  width: auto;
  padding: 0 var(--espaco-3);
  font-size: 14px;
}
.ferramenta.ativa {
  border-color: var(--destaque);
  outline: 2px solid var(--destaque);
  background: var(--superficie-2);
}
.ferramenta piece {
  position: static;
  display: block;
  width: 40px;
  height: 40px;
  background-size: cover;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
.opcoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-1) var(--espaco-4);
  margin: 0;
  padding: 0;
  border: 0;
}
.opcoes legend {
  margin-bottom: var(--espaco-1);
  font-weight: 600;
}
.apagado {
  opacity: 0.5;
}
.problema {
  margin: 0;
  color: var(--erro);
  font-weight: 600;
}
.fen {
  display: grid;
  gap: var(--espaco-1);
}
.rotulo {
  font-weight: 600;
  font-size: 14px;
}
.linha-fen {
  display: flex;
  gap: var(--espaco-2);
}
.campo {
  flex: 1;
  min-width: 0;
  min-height: 44px;
  padding: 0 var(--espaco-3);
  border: 1px solid var(--borda-controle);
  border-radius: var(--raio-md);
  background: var(--superficie);
  color: var(--texto);
  font: inherit;
  font-family: ui-monospace, monospace;
  font-size: 13px;
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
