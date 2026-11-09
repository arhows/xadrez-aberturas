<script setup lang="ts">
import { computed, ref } from 'vue'
import { cadastrar, entrarComEmail, entrarComGoogle, esqueciASenha, nuvem } from '../lib/nuvem'
import { ehAndroid, ehCelular, ehIos, instalar, pwa } from '../lib/pwa'

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

// Instalar: só no celular e se ainda não estiver aberto como app.
const mostrarInstalar = computed(() => ehCelular() && !pwa.instalado)
const iphone = ehIos()
const android = ehAndroid()
const instrucoes = ref(false)

async function aoInstalar() {
  // Android com o convite do navegador: instala direto. Sem convite (ou iPhone): mostra o passo a passo.
  if (android && pwa.podeInstalar) await instalar()
  else instrucoes.value = !instrucoes.value
}

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
    <header class="lado-marca">
      <img :src="icone" alt="" width="72" height="72" />
      <h1>Treinador de Xadrez</h1>
      <p>Aberturas do MCO e exercícios de mate, com treino de repetição espaçada. Cada conta tem o próprio progresso.</p>
    </header>


    <section class="lado-form">
      <div class="miolo">
      <h2 class="titulo-pagina" :class="{ 'so-computador': modo === 'entrar' }">{{ titulo }}</h2>

      <template v-if="modo !== 'esqueci'">
        <button type="button" class="botao largo google" :disabled="enviando" @click="google">
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

        <button type="submit" class="botao primario largo grande-celular" :disabled="enviando">
          {{ enviando ? 'Aguarde…' : modo === 'cadastrar' ? 'Criar conta' : modo === 'entrar' ? 'Entrar' : 'Enviar link' }}
        </button>
      </form>

      <nav class="trocas">
        <template v-if="modo === 'entrar'">
          <button type="button" class="botao fantasma" @click="trocar('cadastrar')">Criar conta</button>
          <button type="button" class="botao fantasma" @click="trocar('esqueci')">Esqueci a senha</button>
        </template>
        <button v-else type="button" class="botao fantasma" @click="trocar('entrar')">Já tenho conta: entrar</button>
      </nav>
      </div>
    <section v-if="mostrarInstalar" class="instalar">
      <button type="button" class="botao largo" :aria-expanded="instrucoes" @click="aoInstalar">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
        </svg>
        Instalar o app
      </button>
      <div v-if="instrucoes" class="passos bloco-dica" role="region" aria-label="Como instalar">
        <template v-if="iphone">
          <p><strong>No iPhone/iPad, pelo Safari:</strong></p>
          <ol>
            <li>
              Toque em <strong>Compartilhar</strong>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-label="ícone de compartilhar" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 15V3m0 0-4 4m4-4 4 4M6 11H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1" />
              </svg>
              (na barra de baixo ou no topo).
            </li>
            <li>Role a lista e toque em <strong>Adicionar à Tela de Início</strong>.</li>
            <li>Toque em <strong>Adicionar</strong>. O ícone do cavalo aparece na tela inicial.</li>
          </ol>
          <p class="suave">Se não aparecer a opção, abra este site no Safari.</p>
        </template>
        <template v-else>
          <p><strong>No Android, pelo Chrome:</strong></p>
          <ol>
            <li>Toque no menu <strong>⋮</strong> (canto de cima, à direita).</li>
            <li>Toque em <strong>Instalar app</strong> (ou <strong>Adicionar à tela inicial</strong>).</li>
            <li>Confirme em <strong>Instalar</strong>.</li>
          </ol>
        </template>
      </div>
    </section>
    </section>
  </div>
</template>

<style scoped>
.entrar {
  display: grid;
  min-height: 100vh;
  min-height: 100dvh;
}
.lado-marca {
  display: grid;
  align-content: start;
  gap: var(--espaco-3);
  padding: var(--espaco-7) var(--espaco-5) var(--espaco-5);
}
.lado-marca img {
  border-radius: 18px;
}
.lado-marca h1 {
  margin: var(--espaco-1) 0 0;
  font: 600 34px/38px var(--font-titulo);
}
.lado-marca p {
  margin: 0;
  color: var(--texto-suave);
}
.lado-form {
  display: grid;
  align-content: start;
  gap: var(--espaco-5);
  padding: 0 var(--espaco-5) var(--espaco-6);
}
.miolo {
  display: grid;
  gap: var(--espaco-4);
  width: 100%;
  max-width: 380px;
}
.titulo-pagina {
  margin: 0;
}
.google {
  border-color: var(--borda-controle);
  background: var(--superficie);
}
.google:hover {
  background: var(--superficie-2);
}
.ou {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
  margin: 0;
  color: var(--texto-suave);
  font-size: 14px;
}
.ou::before,
.ou::after {
  content: '';
  flex: 1;
  border-top: 1px solid var(--borda);
}
.formulario {
  display: grid;
  gap: var(--espaco-4);
}
.erro,
.ok {
  margin: 0;
  padding: var(--espaco-3) var(--espaco-4);
  border-radius: var(--raio-md);
}
.erro {
  background: var(--erro-suave);
  color: var(--erro);
}
.ok {
  background: var(--ok-suave);
  color: var(--ok);
}
.trocas {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--espaco-2);
}
.trocas .botao {
  padding: 0 var(--espaco-1);
}
.instalar {
  display: grid;
  gap: var(--espaco-3);
  max-width: 380px;
}
.passos p {
  margin: 0;
}
.passos ol {
  display: grid;
  gap: 0.375rem;
  margin: 0.5rem 0;
  padding-left: 1.25rem;
}
.passos svg {
  vertical-align: -3px;
}
.suave {
  color: var(--texto-suave);
}
@media (max-width: 799.98px) {
  .so-computador {
    display: none;
  }
  .grande-celular {
    min-height: 52px;
    font-size: 17px;
  }
  .lado-form {
    grid-template-rows: auto 1fr;
  }
  .instalar {
    align-self: end;
  }
}
/* Computador: duas metades, a da marca em verde. */
@media (min-width: 800px) {
  .entrar {
    grid-template-columns: 1fr 1fr;
  }
  .lado-marca {
    align-content: end;
    gap: var(--espaco-4);
    padding: var(--espaco-7);
    background: var(--destaque);
    color: var(--sobre-destaque);
  }
  .lado-marca img {
    box-shadow: 0 0 0 2px var(--sobre-destaque);
  }
  .lado-marca h1 {
    max-width: 440px;
    font-size: 56px;
    line-height: 0.95;
  }
  .lado-marca p {
    max-width: 420px;
    color: inherit;
    opacity: 0.9;
  }
  .lado-form {
    align-content: center;
    justify-items: center;
    padding: var(--espaco-7) var(--espaco-5);
  }
}
</style>
