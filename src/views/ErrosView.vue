<script setup lang="ts">
import { computed, ref } from 'vue'
import CartaoDica from '../components/CartaoDica.vue'
import EstadoVazio from '../components/EstadoVazio.vue'
import Ilustracao from '../components/Ilustracao.vue'
import Tabuleiro, { type Forma } from '../components/Tabuleiro.vue'
import { buscarCapitulo } from '../lib/capitulos'
import { fmtLance, fmtSan, fmtTexto } from '../lib/formato'
import { corDaPosicao } from '../lib/lances'
import { progresso } from '../lib/progresso'
import { tocar } from '../lib/som'
import { perguntasDeErro, registrarAcerto, registrarFalha } from '../lib/treinoErros'

// A lista é montada uma vez por sessão: acertar não muda a ordem no meio do caminho.
const perguntas = perguntasDeErro(progresso.errosPorAresta, buscarCapitulo)

const indice = ref(0)
const fase = ref<'pergunta' | 'certo' | 'fim'>(perguntas.length ? 'pergunta' : 'fim')
const errouNesta = ref(false)
const aviso = ref<{ tipo: 'errado' | 'neutro'; texto: string } | null>(null)
const placar = ref({ deprimeira: 0, sairam: 0, puladas: 0 })
const tabuleiro = ref<InstanceType<typeof Tabuleiro>>()

const atual = computed(() => perguntas[indice.value])
const no = computed(() => atual.value && atual.value.capitulo.arvore.nos.get(atual.value.certo.de)!)
/** Depois do acerto, o tabuleiro mostra a posição já com o lance feito. */
const fen = computed(() => {
  if (!atual.value) return 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
  if (fase.value === 'certo') return atual.value.capitulo.arvore.nos.get(atual.value.certo.para)!.fen
  return no.value!.fen
})
// A cor de quem joga a pergunta (não muda depois do acerto).
const orientacao = computed<'white' | 'black'>(() => (no.value && corDaPosicao(no.value.fen) === 'b' ? 'black' : 'white'))
const ultimoLance = computed<[string, string] | null>(() => {
  const ultima = fase.value === 'certo' ? atual.value?.certo : atual.value?.antes.at(-1)
  return ultima ? [ultima.from, ultima.to] : null
})
const formas = computed<Forma[]>(() =>
  atual.value && errouNesta.value && fase.value === 'pergunta'
    ? [{ de: atual.value.certo.from, para: atual.value.certo.to, cor: 'green' }]
    : [],
)
/** "1.e4 e5 2.Nf3 Nc6 3.Bc4": os lances até a posição da pergunta. */
const sequencia = computed(() =>
  (atual.value?.antes ?? []).map((aresta, i) => (i % 2 === 0 ? fmtLance(i + 1, aresta.san) : fmtSan(aresta.san))).join(' '),
)
const lanceCerto = computed(() => atual.value && fmtLance(atual.value.antes.length + 1, atual.value.certo.san))

function aoJogar(de: string, para: string) {
  const pergunta = atual.value
  const erro = progresso.errosPorAresta[pergunta.chave]
  if (pergunta.certo.from === de && pergunta.certo.to === para) {
    tocar('certo')
    if (!errouNesta.value && erro) {
      placar.value.deprimeira++
      if (registrarAcerto(erro)) placar.value.sairam++
    }
    aviso.value = null
    fase.value = 'certo'
    return
  }
  const outroDoLivro = no.value?.saidas.some((aresta) => aresta.from === de && aresta.to === para)
  if (outroDoLivro) {
    // Não é erro: a posição tem mais de um lance do livro, e a pergunta é sobre a linha que foi errada.
    aviso.value = { tipo: 'neutro', texto: 'Esse também é lance do livro, mas a linha em que você errou segue com outro. Tente de novo.' }
  } else {
    tocar('errado')
    if (!errouNesta.value && erro) registrarFalha(erro)
    errouNesta.value = true
    aviso.value = { tipo: 'errado', texto: 'Não é esse. Jogue o lance da seta verde.' }
  }
  tabuleiro.value?.sincronizar()
}

function proxima(pulou = false) {
  if (pulou) placar.value.puladas++
  errouNesta.value = false
  aviso.value = null
  if (indice.value + 1 >= perguntas.length) {
    fase.value = 'fim'
    return
  }
  indice.value++
  fase.value = 'pergunta'
}

const restantes = computed(() => Object.values(progresso.errosPorAresta).filter((erro) => erro.erros > 0).length)
</script>

<template>
  <div v-if="fase !== 'fim' && atual" class="tela">
    <div class="area-tabuleiro">
      <Tabuleiro
        ref="tabuleiro"
        :fen="fen"
        :orientacao="orientacao"
        :ultimo-lance="ultimoLance"
        :formas="formas"
        :jogavel="fase === 'pergunta'"
        @lance="aoJogar"
      />
    </div>

    <div class="painel">
      <div class="cabeca-painel">
        <RouterLink to="/praticar" class="trilha">‹ Praticar</RouterLink>
        <h1 class="titulo-pagina">Treinar meus erros</h1>
        <p class="suave">{{ indice + 1 }} de {{ perguntas.length }} · {{ fmtTexto(atual.capitulo.capitulo.nome) }}</p>
      </div>

      <CartaoDica tipo="nota">
        <p class="instrucao">
          <template v-if="sequencia">Depois de <span class="lance">{{ sequencia }}</span>, qual</template>
          <template v-else>Qual</template>
          é o lance do livro para as {{ orientacao === 'white' ? 'brancas' : 'pretas' }}?
        </p>
        <p class="suave">Você já errou aqui {{ atual.erros }} {{ atual.erros === 1 ? 'vez' : 'vezes' }}.</p>
      </CartaoDica>

      <CartaoDica v-if="fase === 'certo'" tipo="certo" :lance="lanceCerto" :texto="atual.certo.dica">
        <p v-if="!errouNesta && (progresso.errosPorAresta[atual.chave]?.erros ?? 0) === 0" class="instrucao">
          Dois acertos seguidos: este lance saiu da sua lista de erros.
        </p>
      </CartaoDica>
      <CartaoDica v-else-if="aviso" :tipo="aviso.tipo" :texto="aviso.texto" />

      <div class="acoes">
        <button v-if="fase === 'certo'" type="button" class="botao primario grande largo-celular" @click="proxima()">
          {{ indice + 1 < perguntas.length ? 'Próxima' : 'Terminar' }}
        </button>
        <button v-else type="button" class="botao fantasma largo-celular" @click="proxima(true)">Pular</button>
        <RouterLink
          class="botao fantasma largo-celular"
          :to="{ name: 'explorar', params: { cap: atual.capitulo.capitulo.id }, query: { c: atual.antes.map((a) => a.san).join(' ') } }"
        >Abrir no Explorar</RouterLink>
      </div>
    </div>
  </div>

  <div v-else class="pagina formulario">
    <RouterLink to="/praticar" class="trilha">‹ Praticar</RouterLink>
    <h1 class="titulo-pagina">Treinar meus erros</h1>
    <template v-if="perguntas.length">
      <Ilustracao v-if="!restantes" peca="rook" tom="praticar" festa pequena />
      <dl class="placar-final">
        <div><dt>De primeira</dt><dd class="ok">{{ placar.deprimeira }}</dd></div>
        <div><dt>Saíram da lista</dt><dd>{{ placar.sairam }}</dd></div>
        <div><dt>Puladas</dt><dd>{{ placar.puladas }}</dd></div>
      </dl>
      <p>
        <template v-if="restantes">Ainda há {{ restantes }} {{ restantes === 1 ? 'lance' : 'lances' }} na sua lista de erros.</template>
        <template v-else>Sua lista de erros está vazia.</template>
        Cada lance sai da lista depois de dois acertos seguidos.
      </p>
    </template>
    <EstadoVazio v-else titulo="Nenhum erro para treinar" peca="rook">
      Os lances que você errar no Treino, ou em que sair do livro nas suas partidas, aparecem aqui.
      <template #acoes>
        <RouterLink class="botao primario" to="/aberturas">Treinar uma abertura</RouterLink>
        <RouterLink class="botao" to="/">Voltar ao início</RouterLink>
      </template>
    </EstadoVazio>
    <div v-if="perguntas.length" class="acoes">
      <RouterLink class="botao primario" to="/">Voltar ao início</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.formulario {
  display: grid;
  gap: var(--espaco-4);
  align-content: start;
}
.titulo-pagina {
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
.cabeca-painel p {
  margin: 0;
}
.suave {
  color: var(--texto-suave);
  font-size: 14px;
}
.instrucao {
  margin: 0;
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
}
.placar-final div {
  padding: var(--espaco-3);
  border-radius: var(--raio-md);
  background: var(--superficie-2);
  text-align: center;
}
.placar-final dt {
  color: var(--texto-suave);
  font-size: 13px;
}
.placar-final dd {
  margin: 0;
  font: 600 28px/36px var(--font-titulo);
}
.placar-final .ok {
  color: var(--ok);
}
</style>
