<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import Avatar from '../components/Avatar.vue'
import { meuNome } from '../lib/apelido'
import { nuvem } from '../lib/nuvem'
import { criarPartida, garantirJogador, lerRanking, type JogadorComId } from '../lib/servidorOnline'

/** Ranking dos jogadores do app (Elo das partidas on-line valendo). */

const router = useRouter()
const uid = nuvem.uid!
const lista = shallowRef<JogadorComId[]>([])
const carregou = ref(false)
const erro = ref<string | null>(null)
const desafiando = ref<string | null>(null)

function mensagem(e: unknown): string {
  const texto = e instanceof Error ? e.message : String(e)
  return /permission|insufficient/i.test(texto)
    ? 'O Firestore recusou o acesso. As regras do banco precisam ser atualizadas para o ranking.'
    : texto
}

garantirJogador(uid, meuNome())
  .then(lerRanking)
  .then((jogadores) => (lista.value = jogadores))
  .catch((e) => (erro.value = mensagem(e)))
  .finally(() => (carregou.value = true))

async function desafiar(j: JogadorComId) {
  desafiando.value = j.uid
  try {
    const id = await criarPartida(uid, meuNome(), 'sorteio', '10+5', true, { uid: j.uid, nome: j.nome })
    router.push({ name: 'partida-online', params: { id } })
  } catch (e) {
    erro.value = mensagem(e)
  } finally {
    desafiando.value = null
  }
}
</script>

<template>
  <div class="pagina">
    <RouterLink to="/online" class="trilha">‹ Jogar on-line</RouterLink>
    <h1>Ranking</h1>
    <p class="intro">
      Rating Elo das partidas on-line valendo: todos começam com 1200; vencer quem tem rating maior rende mais pontos.
      Nas primeiras 20 partidas o rating muda mais rápido.
    </p>
    <p v-if="erro" class="erro" role="alert">{{ erro }}</p>
    <p v-if="!carregou" class="suave">Carregando…</p>

    <table v-if="lista.length" class="tabela">
      <thead>
        <tr>
          <th>#</th>
          <th>Jogador</th>
          <th>Rating</th>
          <th class="numeros">V / E / D</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(j, i) in lista" :key="j.uid" :class="{ eu: j.uid === uid }">
          <td>{{ i + 1 }}</td>
          <td>
            <span class="quem">
              <Avatar :uid="j.uid" :nome="j.nome" :tamanho="32" />
              <span>
                <strong>{{ j.nome }}</strong><span v-if="j.uid === uid" class="suave"> (você)</span>
                <span class="suave partidas">{{ j.partidas }} {{ j.partidas === 1 ? 'partida' : 'partidas' }}</span>
              </span>
            </span>
          </td>
          <td class="rating">{{ j.rating }}</td>
          <td class="numeros">{{ j.vitorias }} / {{ j.empates }} / {{ j.derrotas }}</td>
          <td>
            <button v-if="j.uid !== uid" type="button" class="botao" :disabled="desafiando === j.uid" @click="desafiar(j)">Desafiar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="carregou && lista.length <= 1 && !erro" class="suave">Ainda só você por aqui: convide amigos pela tela Jogar on-line.</p>
    <p class="suave nota">O desafio direto cria uma partida 10+5 valendo, com cores sorteadas; o amigo vê o desafio na tela Jogar on-line.</p>
  </div>
</template>

<style scoped>
.quem {
  display: flex;
  align-items: center;
  gap: var(--espaco-2);
}
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
  margin: 0 0 1rem;
  line-height: 1.5;
}
.suave {
  color: var(--texto-suave);
  font-size: 14px;
}
.erro {
  color: var(--erro);
  font-weight: 600;
}
.tabela {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}
.tabela th,
.tabela td {
  padding: 8px 6px;
  border-bottom: 1px solid var(--borda);
  text-align: left;
  vertical-align: middle;
}
.tabela th {
  color: var(--texto-suave);
  font-size: 13px;
}
.partidas {
  display: block;
  font-size: 13px;
}
.rating {
  font-weight: 700;
  font-size: 1.1rem;
}
.eu {
  background: var(--superficie-2);
}
.nota {
  margin-top: 1rem;
}
@media (max-width: 520px) {
  .numeros {
    display: none;
  }
}
</style>
