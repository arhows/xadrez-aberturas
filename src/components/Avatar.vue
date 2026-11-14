<script setup lang="ts">
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.cburnett.css'
import { computed } from 'vue'
import { buscarAvatar, perfilDe, tomDaInicial, type Perfil } from '../lib/perfil'

/**
 * Foto de uma conta: a foto enviada (ou a do Google), o avatar escolhido ou, sem nenhum dos
 * dois, a inicial do nome num círculo colorido. `perfil` mostra uma prévia sem gravar.
 */
const props = withDefaults(defineProps<{ uid?: string | null; nome: string; tamanho?: number; perfil?: Perfil | null }>(), {
  uid: null,
  tamanho: 32,
  perfil: undefined,
})

const atual = computed(() => (props.perfil !== undefined ? props.perfil : perfilDe(props.uid)))
const avatar = computed(() => buscarAvatar(atual.value?.avatar))
const inicial = computed(() => (props.nome.trim().charAt(0) || '?').toUpperCase())
const tom = computed(() => avatar.value?.tom ?? tomDaInicial(props.uid ?? props.nome))
</script>

<template>
  <span
    class="avatar"
    :class="`tom-${tom}`"
    :style="{ width: `${tamanho}px`, height: `${tamanho}px`, fontSize: `${Math.round(tamanho * 0.42)}px` }"
    aria-hidden="true"
  >
    <img v-if="atual?.foto" :src="atual.foto" alt="" referrerpolicy="no-referrer" loading="lazy" />
    <span v-else-if="avatar" class="cg-wrap peca"><piece :class="`${avatar.peca} white`"></piece></span>
    <template v-else>{{ inicial }}</template>
  </span>
</template>

<style scoped>
.avatar {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background: color-mix(in srgb, var(--tom) 18%, var(--superficie));
  color: var(--tom);
  font-family: var(--font-titulo);
  font-weight: 600;
  line-height: 1;
  vertical-align: middle;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.peca {
  position: relative;
  width: 74%;
  height: 74%;
}
.peca piece {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
