<script setup lang="ts">
import { ref } from 'vue'
import { baixarTexto } from '../lib/download'
import {
  exportarProgresso,
  importarProgresso,
  progresso,
  resetarProgresso,
} from '../lib/progresso'
import { dataLocal } from '../lib/srs'

const config = progresso.config
const mensagem = ref<{ tipo: 'ok' | 'erro'; texto: string } | null>(null)
const confirmandoReset = ref(false)

function exportar() {
  baixarTexto(`aberturas-progresso-${dataLocal()}.json`, exportarProgresso(), 'application/json')
}

async function importar(evento: Event) {
  const entrada = evento.target as HTMLInputElement
  const arquivo = entrada.files?.[0]
  if (!arquivo) return
  const certo = importarProgresso(await arquivo.text())
  mensagem.value = certo
    ? { tipo: 'ok', texto: 'Progresso importado.' }
    : { tipo: 'erro', texto: 'Este arquivo não é um progresso válido. Nada foi alterado.' }
  entrada.value = ''
}

function resetar() {
  resetarProgresso()
  confirmandoReset.value = false
  mensagem.value = { tipo: 'ok', texto: 'Progresso apagado.' }
}
</script>

<template>
  <div class="pagina formulario">
    <h1>Configurações</h1>

    <label class="campo">
      <span>Notação</span>
      <select v-model="config.notacao">
        <option value="en">Inglês (K Q R B N)</option>
        <option value="pt">Português (R D T B C)</option>
      </select>
    </label>

    <label class="campo">
      <span>Mostrar dicas no treino</span>
      <select v-model="config.dicasNoTreino">
        <option value="sempre">Sempre</option>
        <option value="erro">Só ao errar</option>
        <option value="nunca">Nunca</option>
      </select>
    </label>

    <label class="campo">
      <span>Tempo para ler a dica no Treino</span>
      <select v-model="config.tempoDica">
        <option value="normal">Normal (2 segundos)</option>
        <option value="longo">Mais tempo (5 segundos)</option>
        <option value="toque">Até eu tocar para continuar</option>
      </select>
    </label>

    <label class="campo">
      <span>Velocidade da animação</span>
      <select v-model.number="config.animacaoMs">
        <option :value="0">Sem animação</option>
        <option :value="100">Rápida</option>
        <option :value="200">Normal</option>
        <option :value="400">Lenta</option>
      </select>
    </label>

    <label class="campo">
      <span>Linhas novas por dia</span>
      <input v-model.number="config.novasPorDia" type="number" min="0" max="50" />
    </label>

    <label class="campo">
      <span>Tema</span>
      <select v-model="config.tema">
        <option value="auto">Automático</option>
        <option value="claro">Claro</option>
        <option value="escuro">Escuro</option>
      </select>
    </label>

    <label class="marcar">
      <input v-model="config.mostrarMotor" type="checkbox" />
      Mostrar a sugestão do Stockfish no Estudo e no Explorar
    </label>

    <label class="marcar">
      <input v-model="config.mostrarTaticas" type="checkbox" />
      Mostrar as táticas do tabuleiro no Estudo e no Explorar
    </label>

    <label class="marcar">
      <input v-model="config.taticasAutomaticas" type="checkbox" :disabled="!config.mostrarTaticas" />
      Mostrar as setas das táticas automaticamente, sem tocar nos itens
    </label>

    <label class="marcar">
      <input v-model="config.som" type="checkbox" />
      Som
    </label>

    <label class="marcar">
      <input v-model="config.orientacaoAutomatica" type="checkbox" />
      Virar o tabuleiro conforme a cor treinada
    </label>

    <h2>Progresso</h2>
    <p v-if="mensagem" :class="mensagem.tipo" role="status">{{ mensagem.texto }}</p>

    <div class="acoes">
      <button type="button" class="botao" @click="exportar">Exportar JSON</button>
      <label class="botao">
        Importar JSON
        <input class="oculto" type="file" accept="application/json,.json" @change="importar" />
      </label>
      <button v-if="!confirmandoReset" type="button" class="botao" @click="confirmandoReset = true">Resetar</button>
      <template v-else>
        <button type="button" class="botao perigo" @click="resetar">Apagar todo o progresso</button>
        <button type="button" class="botao" @click="confirmandoReset = false">Cancelar</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.formulario {
  display: grid;
  gap: 1rem;
}
h1,
h2 {
  margin: 0;
}
h1 {
  font-size: 1.25rem;
}
h2 {
  margin-top: 0.5rem;
  font-size: 1.125rem;
}
.marcar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.oculto {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.ok {
  margin: 0;
  color: var(--ok);
}
.erro {
  margin: 0;
  color: var(--erro);
}
</style>
