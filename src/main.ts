import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { iniciarPwa } from './lib/pwa'
import { iniciarNuvem } from './lib/nuvem'
import { concluirConexaoLichess, erroConexaoLichess, voltaDoLichess } from './lib/lichessConta'
import '@fontsource-variable/source-serif-4'
import './estilo.css'

// Voltou da autorização do lichess? A parte síncrona limpa o endereço antes de o router ler a rota.
void concluirConexaoLichess().then((erro) => (erroConexaoLichess.value = erro))
createApp(App).use(router).mount('#app')
if (voltaDoLichess) void router.replace(voltaDoLichess)
iniciarPwa()
iniciarNuvem()
