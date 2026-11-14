<script setup lang="ts">
import { ref } from 'vue'
import Avatar from '../components/Avatar.vue'
import EditorDeFoto from '../components/EditorDeFoto.vue'
import ListaDeAtalhos from '../components/ListaDeAtalhos.vue'
import { meuNome } from '../lib/apelido'
import { obterCapitulos } from '../lib/capitulos'
import { diasSeguidos } from '../lib/diario'
import { nuvem, obterFirebase, sair } from '../lib/nuvem'
import { progresso } from '../lib/progresso'
import { capitulosDoRepertorio } from '../lib/repertorio'
import { dominadoNasLinhasAtivas } from '../lib/resumoAberturas'
import { EU } from '../lib/secoes'
import { dataLocal } from '../lib/srs'

const trocandoFoto = ref(false)
const dias = diasSeguidos(progresso.diario, dataLocal())
const dominado = dominadoNasLinhasAtivas(capitulosDoRepertorio(obterCapitulos()))

/** Quantas contas o app tem; some se a contagem falhar (sem rede ou sem a regra no Firestore). */
const contas = ref<number | null>(null)
obterFirebase()
  .then((fb) => fb.contarContas())
  .then((n) => (contas.value = n))
  .catch(() => {})
</script>

<template>
  <div class="pagina secao-app">
    <header>
      <button type="button" class="foto" aria-label="Trocar a foto do perfil" @click="trocandoFoto = !trocandoFoto">
        <Avatar :uid="nuvem.uid" :nome="meuNome()" :tamanho="64" />
        <span class="lapis" aria-hidden="true">✎</span>
      </button>
      <span>
        <h1>{{ meuNome() }}</h1>
        <span class="apoio suave">{{ nuvem.email }}</span>
        <button type="button" class="botao-texto" @click="trocandoFoto = !trocandoFoto">{{ trocandoFoto ? 'Fechar' : 'Trocar foto' }}</button>
      </span>
    </header>

    <EditorDeFoto v-if="trocandoFoto" @fechar="trocandoFoto = false" />

    <div class="numeros">
      <div class="cartao"><span class="titulo-pagina">{{ dias }}</span><span class="apoio suave">{{ dias === 1 ? 'dia seguido' : 'dias seguidos' }}</span></div>
      <div class="cartao"><span class="titulo-pagina">{{ progresso.sequencia }}</span><span class="apoio suave">recorde da Sequência</span></div>
      <div class="cartao"><span class="titulo-pagina">{{ dominado }}%</span><span class="apoio suave">das aberturas dominado</span></div>
    </div>

    <p v-if="contas" class="contas suave">
      {{ contas === 1 ? '1 pessoa registrada' : `${contas.toLocaleString('pt-BR')} pessoas registradas` }} no app
    </p>

    <ListaDeAtalhos tom="eu" :grupos="EU.grupos" />

    <button type="button" class="botao perigo sair" @click="sair">Sair da conta</button>
  </div>
</template>

<style scoped>
.secao-app {
  display: grid;
  gap: var(--espaco-5);
}
header {
  display: flex;
  align-items: center;
  gap: var(--espaco-3);
}
header > span:last-child {
  display: grid;
  min-width: 0;
}
h1 {
  margin: 0;
}
.foto {
  position: relative;
  flex: none;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  cursor: pointer;
}
.lapis {
  position: absolute;
  right: -2px;
  bottom: -2px;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border: 2px solid var(--fundo);
  border-radius: 50%;
  background: var(--destaque);
  color: var(--sobre-destaque);
  font-size: 13px;
}
.botao-texto {
  justify-self: start;
  min-height: 32px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--destaque);
  font: 600 14px/20px var(--font-texto);
  cursor: pointer;
}
.numeros {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--espaco-2);
}
.contas {
  margin: 0;
  font-size: 0.875rem;
  text-align: center;
}
.numeros .cartao {
  gap: var(--espaco-1);
  padding: var(--espaco-3);
}
.suave {
  color: var(--texto-suave);
}
.sair {
  justify-self: start;
}
</style>
