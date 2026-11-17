<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVolta } from '../lib/volta'
import { estudosVisiveis, lerPgnDoEstudo, novoIdDeEstudo, revisoesDeEstudo, separar, type EstudoPartida, type LadoDoEstudo } from '../lib/estudoPartidas'
import { progresso } from '../lib/progresso'

/** Estudo de partidas: a lista, a revisão dos lances errados e as formas de pôr uma partida nova. */

const volta = useVolta('/praticar')
const router = useRouter()

const estudos = computed(() => estudosVisiveis(progresso.estudos))
const revisoes = computed(() => revisoesDeEstudo(progresso.cartoesEstudos, progresso.estudos))

const NOME_DO_LADO: Record<LadoDoEstudo, string> = { w: 'brancas', b: 'pretas', ambos: 'os dois lados' }
const lancesCheios = (e: EstudoPartida) => Math.ceil(separar(e.lances).length / 2)

// ---------- Colar PGN ----------
const colando = ref(false)
const textoPgn = ref('')
const nomePgn = ref('')
const ladoPgn = ref<LadoDoEstudo>('w')
const videoPgn = ref('')
const erroPgn = ref('')

/** Nome sugerido pelos cabeçalhos: "Brancas × Pretas, ano". */
function nomeDosCabecalhos(lido: NonNullable<ReturnType<typeof lerPgnDoEstudo>>): string {
  const ano = lido.data?.slice(0, 4)
  const jogadores = lido.brancas && lido.pretas ? `${lido.brancas} × ${lido.pretas}` : lido.evento
  return [jogadores, ano && /^\d{4}$/.test(ano) ? ano : ''].filter(Boolean).join(', ')
}

function salvarPgn() {
  erroPgn.value = ''
  const lido = lerPgnDoEstudo(textoPgn.value)
  if (!lido) {
    erroPgn.value = 'Não foi possível ler os lances. Confira se o texto é um PGN de uma partida só, sem variantes.'
    return
  }
  const nome = nomePgn.value.trim() || nomeDosCabecalhos(lido) || 'Partida sem nome'
  const agora = new Date().toISOString()
  const id = novoIdDeEstudo()
  progresso.estudos[id] = {
    id,
    nome,
    lances: lido.lances,
    ...(lido.fen ? { fen: lido.fen } : {}),
    lado: ladoPgn.value,
    ...(videoPgn.value.trim() ? { video: videoPgn.value.trim() } : {}),
    criado: agora,
    atualizado: agora,
  }
  void router.push({ name: 'estudo-partida', params: { id } })
}
</script>

<template>
  <div class="pagina">
    <RouterLink :to="volta.para" class="trilha">‹ {{ volta.nome }}</RouterLink>
    <h1>Estudo de partidas</h1>
    <p class="suave intro">
      Partidas que você reproduziu (de um vídeo, de um livro) para rever e adivinhar os lances. Os lances que você errar voltam
      na revisão, com o tempo.
    </p>

    <section class="revisao" :class="{ vazia: !revisoes.length }">
      <div>
        <strong>Revisão de hoje</strong>
        <span class="suave">
          {{ revisoes.length ? `${revisoes.length} ${revisoes.length === 1 ? 'lance que você errou' : 'lances que você errou'}` : 'Nada para revisar hoje. Os lances errados no Adivinhar voltam aqui.' }}
        </span>
      </div>
      <RouterLink v-if="revisoes.length" class="botao primario" :to="{ name: 'estudo-revisao' }">Revisar</RouterLink>
    </section>

    <section class="cartao nova">
      <strong>Partida nova</strong>
      <span class="suave">Reproduza os lances no tabuleiro de análise e toque em "Salvar para treinar", ou cole o PGN.</span>
      <div class="acoes">
        <RouterLink class="botao primario" :to="{ name: 'analisar' }">Reproduzir no tabuleiro</RouterLink>
        <RouterLink class="botao" :to="{ name: 'editor' }">Começar de uma posição</RouterLink>
        <button type="button" class="botao" :aria-expanded="colando" @click="colando = !colando">Colar PGN</button>
      </div>
      <form v-if="colando" class="formulario" @submit.prevent="salvarPgn">
        <label class="campo">
          <span>PGN da partida</span>
          <textarea id="estudo-pgn" v-model="textoPgn" rows="6" placeholder='[White "Capablanca"] [Black "Marshall"] 1. e4 e5 2. Nf3 ...' required></textarea>
        </label>
        <label class="campo">
          <span>Nome (opcional)</span>
          <input id="estudo-pgn-nome" v-model="nomePgn" type="text" maxlength="120" placeholder="Sem nome, vale o dos cabeçalhos do PGN" />
        </label>
        <label class="campo">
          <span>Lado para adivinhar</span>
          <select id="estudo-pgn-lado" v-model="ladoPgn">
            <option value="w">Brancas</option>
            <option value="b">Pretas</option>
            <option value="ambos">Os dois</option>
          </select>
        </label>
        <label class="campo">
          <span>Link do vídeo (opcional)</span>
          <input id="estudo-pgn-video" v-model="videoPgn" type="url" placeholder="https://www.youtube.com/..." />
        </label>
        <p v-if="erroPgn" class="erro" role="alert">{{ erroPgn }}</p>
        <div class="acoes">
          <button type="submit" class="botao primario">Salvar</button>
          <button type="button" class="botao fantasma" @click="colando = false">Cancelar</button>
        </div>
      </form>
    </section>

    <ul v-if="estudos.length" class="lista">
      <li v-for="e in estudos" :key="e.id">
        <div>
          <strong class="titulo-item">{{ e.nome }}</strong>
          <span class="suave">
            {{ lancesCheios(e) }} lances · adivinhar {{ NOME_DO_LADO[e.lado] }}
            <template v-if="e.melhor"> · melhor: {{ e.melhor.acertos }} de {{ e.melhor.total }}</template>
          </span>
        </div>
        <RouterLink class="botao" :to="{ name: 'estudo-partida', params: { id: e.id } }">Abrir</RouterLink>
      </li>
    </ul>
    <p v-else class="suave">Nenhuma partida ainda.</p>
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
h1 {
  margin: 0 0 0.5rem;
}
.intro {
  margin: 0 0 1.25rem;
}
.suave {
  color: var(--texto-suave);
  font-size: 0.875rem;
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
.revisao div,
.lista li div {
  display: grid;
  min-width: 0;
}
.nova,
.formulario {
  display: grid;
  gap: var(--espaco-2);
}
.nova {
  margin-bottom: 1.25rem;
}
.formulario {
  margin-top: var(--espaco-2);
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
.erro {
  margin: 0;
  color: var(--erro);
}
.lista {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--borda);
  border-radius: 12px;
  background: var(--superficie);
  overflow: hidden;
}
.lista li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
}
.lista li + li {
  border-top: 1px solid var(--borda);
}
</style>
