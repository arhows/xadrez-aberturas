<script setup lang="ts">
import { computed, ref } from 'vue'
import { cadastrar, entrarComEmail, entrarComGoogle, esqueciASenha, nuvem } from '../lib/nuvem'

type Modo = 'entrar' | 'cadastrar' | 'esqueci'

const icone = `${import.meta.env.BASE_URL}icones/icone-192.png`

const modo = ref<Modo>('entrar')
const nome = ref('')
const email = ref('')
const senha = ref('')
const confirmacao = ref('')
const enviando = ref(false)
const erro = ref('')
const aviso = ref('')

const titulo = computed(
  () => ({ entrar: 'Entrar', cadastrar: 'Criar conta', esqueci: 'Redefinir a senha' })[modo.value],
)

function trocar(novo: Modo) {
  modo.value = novo
  erro.value = ''
  aviso.value = ''
}

async function executar(acao: () => Promise<string | null>) {
  enviando.value = true
  erro.value = ''
  aviso.value = ''
  try {
    erro.value = (await acao()) ?? ''
  } finally {
    enviando.value = false
  }
}

function google() {
  void executar(entrarComGoogle)
}

function enviar() {
  if (modo.value === 'cadastrar') {
    if (senha.value !== confirmacao.value) {
      erro.value = 'As duas senhas não são iguais.'
      return
    }
    void executar(() => cadastrar(nome.value, email.value, senha.value))
  } else if (modo.value === 'entrar') {
    void executar(() => entrarComEmail(email.value, senha.value))
  } else {
    void executar(async () => {
      const falha = await esqueciASenha(email.value)
      if (!falha) aviso.value = `Enviamos um link para ${email.value.trim()}. Confira também a caixa de spam.`
      return falha
    })
  }
}
</script>

<template>
  <div class="entrar">
    <header class="marca">
      <img :src="icone" alt="" width="64" height="64" />
      <h1>Treinador de Xadrez</h1>
      <p class="suave">Aberturas do MCO e exercícios de mate. Cada conta tem o próprio progresso.</p>
    </header>

    <section class="cartao">
      <h2>{{ titulo }}</h2>

      <template v-if="modo !== 'esqueci'">
        <button type="button" class="botao google" :disabled="enviando" @click="google">
          <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
          </svg>
          {{ modo === 'cadastrar' ? 'Criar conta com Google' : 'Entrar com Google' }}
        </button>
        <p class="ou"><span>ou com e-mail</span></p>
      </template>

      <form class="formulario" @submit.prevent="enviar">
        <label v-if="modo === 'cadastrar'" class="campo">
          <span>Nome</span>
          <input v-model="nome" type="text" autocomplete="name" placeholder="Como quer ser chamado" />
        </label>
        <label class="campo">
          <span>E-mail</span>
          <input v-model="email" type="email" autocomplete="email" required />
        </label>
        <label v-if="modo !== 'esqueci'" class="campo">
          <span>Senha</span>
          <input
            v-model="senha"
            type="password"
            :autocomplete="modo === 'cadastrar' ? 'new-password' : 'current-password'"
            :minlength="modo === 'cadastrar' ? 6 : undefined"
            required
          />
        </label>
        <label v-if="modo === 'cadastrar'" class="campo">
          <span>Repita a senha</span>
          <input v-model="confirmacao" type="password" autocomplete="new-password" minlength="6" required />
        </label>

        <p v-if="erro" class="erro" role="alert">{{ erro }}</p>
        <p v-if="aviso" class="ok" role="status">{{ aviso }}</p>
        <p v-if="nuvem.estado === 'erro' && nuvem.erro" class="erro" role="alert">{{ nuvem.erro }}</p>

        <button type="submit" class="botao primario" :disabled="enviando">
          {{ enviando ? 'Aguarde…' : modo === 'cadastrar' ? 'Criar conta' : modo === 'entrar' ? 'Entrar' : 'Enviar link' }}
        </button>
      </form>

      <nav class="trocas">
        <template v-if="modo === 'entrar'">
          <button type="button" class="link" @click="trocar('cadastrar')">Não tem conta? Criar conta</button>
          <button type="button" class="link" @click="trocar('esqueci')">Esqueci a senha</button>
        </template>
        <button v-else type="button" class="link" @click="trocar('entrar')">Já tenho conta: entrar</button>
      </nav>
    </section>
  </div>
</template>

<style scoped>
.entrar {
  display: grid;
  gap: 1.5rem;
  max-width: 24rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.marca {
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  text-align: center;
}
.marca img {
  border-radius: 14px;
}
h1 {
  margin: 0;
  font-size: 1.375rem;
}
h2 {
  margin: 0;
  font-size: 1.125rem;
}
.suave {
  margin: 0;
  color: var(--texto-suave);
}
.cartao {
  display: grid;
  gap: 1rem;
  padding: 1.25rem;
  border: 1px solid var(--borda);
  border-radius: 12px;
  background: var(--superficie);
}
.google {
  gap: 0.5rem;
  background: var(--fundo);
}
.ou {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  color: var(--texto-suave);
  font-size: 0.875rem;
}
.ou::before,
.ou::after {
  content: '';
  flex: 1;
  border-top: 1px solid var(--borda);
}
.formulario {
  display: grid;
  gap: 0.75rem;
}
.campo input {
  background: var(--fundo);
}
.erro,
.ok {
  margin: 0;
}
.erro {
  color: var(--erro);
}
.ok {
  color: var(--ok);
}
.trocas {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}
.link {
  min-height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--destaque);
  font: inherit;
  font-size: 0.875rem;
  text-decoration: underline;
  cursor: pointer;
}
</style>
