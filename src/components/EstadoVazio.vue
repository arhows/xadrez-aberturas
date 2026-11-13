<script setup lang="ts">
import Ilustracao from './Ilustracao.vue'

/** Tela (ou trecho) sem nada para mostrar: ilustração, título, uma frase e o que fazer. */
withDefaults(
  defineProps<{
    titulo: string
    peca?: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
    tom?: 'aprender' | 'praticar' | 'jogar' | 'eu'
  }>(),
  { peca: 'knight', tom: 'praticar' },
)
</script>

<template>
  <section class="estado-vazio">
    <Ilustracao :peca="peca" :tom="tom" />
    <h2 class="titulo-secao">{{ titulo }}</h2>
    <p class="corpo suave"><slot /></p>
    <div v-if="$slots.acoes" class="acoes"><slot name="acoes" /></div>
  </section>
</template>

<style scoped>
.estado-vazio {
  display: grid;
  justify-items: center;
  gap: var(--espaco-3);
  padding: var(--espaco-5) var(--espaco-4);
  text-align: center;
}
h2,
p {
  margin: 0;
}
p {
  max-width: 34rem;
  color: var(--texto-suave);
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--espaco-2);
  width: 100%;
}
@media (max-width: 799.98px) {
  .acoes > :deep(.botao) {
    width: 100%;
  }
}
</style>
