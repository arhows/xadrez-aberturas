<script setup lang="ts">
import { computed, ref } from 'vue'
import Avatar from './Avatar.vue'
import { meuNome } from '../lib/apelido'
import { nuvem } from '../lib/nuvem'
import { AVATARES, perfilDe, reduzirFoto, salvarMeuPerfil, type Perfil } from '../lib/perfil'

/** Trocar a foto do perfil: enviar uma foto, usar a do Google, escolher um avatar ou só a inicial. */
const emit = defineEmits<{ fechar: [] }>()

const atual = computed(() => perfilDe(nuvem.uid))
const salvando = ref(false)
const erro = ref('')
const entrada = ref<HTMLInputElement>()

async function aplicar(perfil: Perfil) {
  salvando.value = true
  erro.value = ''
  const problema = await salvarMeuPerfil(perfil)
  salvando.value = false
  if (problema) erro.value = problema
  else emit('fechar')
}

async function aoEscolherArquivo(evento: Event) {
  const arquivo = (evento.target as HTMLInputElement).files?.[0]
  if (entrada.value) entrada.value.value = ''
  if (!arquivo) return
  if (!arquivo.type.startsWith('image/')) {
    erro.value = 'Escolha um arquivo de imagem (JPG, PNG…).'
    return
  }
  try {
    await aplicar({ foto: await reduzirFoto(arquivo), avatar: null })
  } catch {
    salvando.value = false
    erro.value = 'Não deu para abrir esta imagem. Tente outra.'
  }
}

const ehFotoDoGoogle = computed(() => !!nuvem.fotoGoogle && atual.value?.foto === nuvem.fotoGoogle)
</script>

<template>
  <section class="cartao editor-foto" aria-labelledby="titulo-editor-foto">
    <div class="cabeca">
      <h2 id="titulo-editor-foto" class="titulo-item">Foto do perfil</h2>
      <button type="button" class="botao fantasma" @click="emit('fechar')">Fechar</button>
    </div>

    <div class="acoes">
      <button type="button" class="botao primario" :disabled="salvando" @click="entrada?.click()">Enviar uma foto</button>
      <button
        v-if="nuvem.fotoGoogle && !ehFotoDoGoogle"
        type="button"
        class="botao"
        :disabled="salvando"
        @click="aplicar({ foto: nuvem.fotoGoogle, avatar: null })"
      >Usar a foto do Google</button>
      <input ref="entrada" class="escondido" type="file" accept="image/*" @change="aoEscolherArquivo" />
    </div>

    <h3 class="rotulo">Ou escolha um avatar</h3>
    <div class="grade-avatares" role="group" aria-label="Avatares">
      <button
        v-for="a in AVATARES"
        :key="a.id"
        type="button"
        class="opcao-avatar"
        :aria-pressed="!atual?.foto && atual?.avatar === a.id"
        :aria-label="a.nome"
        :title="a.nome"
        :disabled="salvando"
        @click="aplicar({ foto: null, avatar: a.id })"
      >
        <Avatar :nome="meuNome()" :perfil="{ foto: null, avatar: a.id }" :tamanho="48" />
      </button>
      <button
        type="button"
        class="opcao-avatar"
        :aria-pressed="!atual?.foto && !atual?.avatar"
        aria-label="Só a inicial do nome"
        title="Só a inicial do nome"
        :disabled="salvando"
        @click="aplicar({ foto: null, avatar: null })"
      >
        <Avatar :uid="nuvem.uid" :nome="meuNome()" :perfil="{ foto: null, avatar: null }" :tamanho="48" />
      </button>
    </div>

    <p v-if="salvando" class="apoio suave" role="status">Salvando…</p>
    <p v-if="erro" class="apoio erro" role="alert">{{ erro }}</p>
    <p class="apoio suave">
      A foto e o seu nome aparecem para quem joga com você on-line e no ranking. O e-mail nunca aparece.
    </p>
  </section>
</template>

<style scoped>
.editor-foto .cabeca {
  align-items: center;
}
.escondido {
  display: none;
}
.rotulo {
  margin: var(--espaco-2) 0 0;
  color: var(--texto-suave);
  font: 600 12px/16px var(--font-texto);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.grade-avatares {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  gap: var(--espaco-2);
}
.opcao-avatar {
  display: grid;
  place-items: center;
  padding: 4px;
  border: 2px solid transparent;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  aspect-ratio: 1;
}
.opcao-avatar:hover {
  border-color: var(--borda);
}
.opcao-avatar[aria-pressed='true'] {
  border-color: var(--destaque);
}
.erro {
  margin: 0;
  color: var(--erro);
}
.suave {
  margin: 0;
  color: var(--texto-suave);
}
</style>
