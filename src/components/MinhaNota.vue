<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { gravarNota, lerNota } from '../lib/anotacoes'

/** Nota pessoal de um lance (Estudo e Explorar). Sem `chave`, não mostra nada. */
const props = defineProps<{ chave: string | null; lance?: string }>()

const editando = ref(false)
const rascunho = ref('')
const campo = ref<HTMLTextAreaElement>()
const texto = computed(() => lerNota(props.chave))

watch(
  () => props.chave,
  () => (editando.value = false),
)

async function editar() {
  rascunho.value = texto.value
  editando.value = true
  await nextTick()
  campo.value?.focus()
}

function salvar() {
  if (props.chave) gravarNota(props.chave, rascunho.value)
  editando.value = false
}
</script>

<template>
  <section v-if="chave" class="minha-nota">
    <template v-if="editando">
      <label class="campo">
        <span>Minha nota{{ lance ? ` sobre ${lance}` : '' }}</span>
        <textarea
          ref="campo"
          v-model="rascunho"
          rows="3"
          maxlength="600"
          placeholder="Ex.: aqui sempre esqueço que o bispo vai para e2."
          @keydown.ctrl.enter="salvar"
          @keydown.esc="editando = false"
        ></textarea>
      </label>
      <div class="acoes">
        <button type="button" class="botao primario" @click="salvar">Salvar</button>
        <button type="button" class="botao fantasma" @click="editando = false">Cancelar</button>
      </div>
    </template>
    <template v-else-if="texto">
      <p class="texto"><strong>Minha nota:</strong> {{ texto }}</p>
      <button type="button" class="botao fantasma pequeno" @click="editar">Editar nota</button>
    </template>
    <button v-else type="button" class="botao fantasma pequeno" @click="editar">+ Minha nota{{ lance ? ` sobre ${lance}` : '' }}</button>
  </section>
</template>

<style scoped>
.minha-nota {
  display: grid;
  gap: var(--espaco-2);
  justify-items: start;
}
.minha-nota .campo {
  width: 100%;
}
.texto {
  margin: 0;
  padding: var(--espaco-2) var(--espaco-3);
  border-left: 3px solid var(--aviso);
  border-radius: var(--raio-sm);
  background: var(--aviso-suave);
  white-space: pre-wrap;
  width: 100%;
  box-sizing: border-box;
}
.acoes {
  display: flex;
  gap: var(--espaco-2);
}
.pequeno {
  min-height: 36px;
  padding: 0 var(--espaco-2);
  font-size: 14px;
}
</style>
