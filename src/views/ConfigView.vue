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
import { ehIos, instalar, pwa } from '../lib/pwa'
import { nuvem, sair, sincronizar } from '../lib/nuvem'

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
  // O arquivo importado passa a valer também na nuvem (senão a junção traria o antigo de volta).
  if (certo) void sincronizar(true)
}

function resetar() {
  resetarProgresso()
  void sincronizar(true)
  confirmandoReset.value = false
  mensagem.value = { tipo: 'ok', texto: 'Progresso apagado.' }
}
</script>

<template>
  <div class="pagina formulario">
    <h1>Configurações</h1>

    <section class="grupo">
      <h3>Tabuleiro</h3>
      <div class="cartao">
        <label class="campo">
          <span>Tema</span>
          <select v-model="config.tema">
            <option value="auto">Automático</option>
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
          </select>
        </label>
        <label class="campo">
          <span>Notação</span>
          <select v-model="config.notacao">
            <option value="en">Inglês (K Q R B N)</option>
            <option value="pt">Português (R D T B C)</option>
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
        <label class="marcar">
          <input v-model="config.orientacaoAutomatica" type="checkbox" />
          Virar o tabuleiro conforme a cor treinada
        </label>
        <label class="marcar">
          <input v-model="config.som" type="checkbox" />
          Som
        </label>
      </div>
    </section>

    <section class="grupo">
      <h3>Treino</h3>
      <div class="cartao">
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
          <span>Linhas novas por dia</span>
          <input v-model.number="config.novasPorDia" type="number" min="0" max="50" />
        </label>
      </div>
    </section>

    <section class="grupo">
      <h3>Ajudas no Estudo e no Explorar</h3>
      <div class="cartao">
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
      </div>
    </section>

    <section class="grupo">
      <h3>Conta</h3>
      <div class="cartao">
        <div class="linha">
          <p>
            Conectado como <strong>{{ nuvem.nome || nuvem.email }}</strong>
            <template v-if="nuvem.nome && nuvem.email"> ({{ nuvem.email }})</template>.
          </p>
          <p class="suave">
            Entre com a mesma conta no celular e no computador: o progresso sincroniza sozinho.
            As configurações ficam separadas em cada aparelho.
          </p>
          <p class="suave">
            <template v-if="nuvem.estado === 'sincronizando'">Sincronizando…</template>
            <template v-else-if="nuvem.ultima">Sincronizado às {{ nuvem.ultima }}.</template>
          </p>
          <p v-if="nuvem.erro" class="erro" role="status">{{ nuvem.erro }}</p>
        </div>
        <div class="linha acoes">
          <button type="button" class="botao" :disabled="nuvem.estado === 'sincronizando'" @click="sincronizar()">
            Sincronizar agora
          </button>
          <button type="button" class="botao fantasma" @click="sair">Sair da conta</button>
        </div>
      </div>
    </section>

    <section class="grupo">
      <h3>App no aparelho</h3>
      <div class="cartao">
        <div class="linha">
          <p v-if="pwa.instalado" class="suave">O app está instalado e funciona sem internet.</p>
          <template v-else>
            <p class="suave">
              Instalado, o app abre em tela cheia e funciona sem internet (só importar partidas precisa de conexão).
              O progresso fica guardado neste aparelho.
            </p>
            <p v-if="ehIos()" class="suave">No iPhone/iPad: toque em Compartilhar e depois em “Adicionar à Tela de Início”.</p>
            <p v-else-if="!pwa.podeInstalar" class="suave">No Chrome do celular: menu ⋮ → “Instalar app” (ou “Adicionar à tela inicial”).</p>
          </template>
        </div>
        <div v-if="!pwa.instalado && pwa.podeInstalar" class="linha acoes">
          <button type="button" class="botao" @click="instalar">Instalar o app</button>
        </div>
      </div>
    </section>

    <section class="grupo">
      <h3>Dados</h3>
      <div class="cartao">
        <div v-if="mensagem" class="linha">
          <p :class="mensagem.tipo" role="status">{{ mensagem.texto }}</p>
        </div>
        <div class="linha acoes">
          <button type="button" class="botao" @click="exportar">Exportar JSON</button>
          <label class="botao">
            Importar JSON
            <input class="oculto" type="file" accept="application/json,.json" @change="importar" />
          </label>
          <button v-if="!confirmandoReset" type="button" class="botao perigo" @click="confirmandoReset = true">Resetar</button>
          <template v-else>
            <button type="button" class="botao perigo" @click="resetar">Apagar todo o progresso desta conta</button>
            <button type="button" class="botao" @click="confirmandoReset = false">Cancelar</button>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.formulario {
  display: grid;
  gap: var(--espaco-5);
}
h1 {
  margin: 0;
}
.grupo .campo,
.grupo .marcar,
.grupo .linha {
  padding: var(--espaco-3) 0;
}
.linha {
  display: grid;
  gap: var(--espaco-1);
}
.linha p {
  margin: 0;
}
.acoes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--espaco-2);
}
.oculto {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}
.suave {
  color: var(--texto-suave);
  font-size: 15px;
}
.ok,
.erro {
  padding: var(--espaco-2) var(--espaco-3);
  border-radius: var(--raio-md);
}
.ok {
  background: var(--ok-suave);
  color: var(--ok);
}
.erro {
  background: var(--erro-suave);
  color: var(--erro);
}
</style>
