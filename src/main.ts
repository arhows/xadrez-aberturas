import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { iniciarPwa } from './lib/pwa'
import { iniciarNuvem } from './lib/nuvem'
import './estilo.css'

createApp(App).use(router).mount('#app')
iniciarPwa()
iniciarNuvem()
