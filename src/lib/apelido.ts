import { ref } from 'vue'
import { gravar, ler } from './armazenamento'
import { nuvem } from './nuvem'

/** Nome mostrado aos amigos nas partidas on-line e no ranking (nunca o e-mail). */
const CHAVE = 'aberturas.apelido'
export const apelidoSalvo = ref<string>(ler<string>(CHAVE, ''))

export function meuNome(): string {
  return apelidoSalvo.value.trim() || nuvem.nome.trim() || 'Jogador'
}

export function salvarApelido(nome: string): void {
  apelidoSalvo.value = nome.trim().slice(0, 30)
  gravar(CHAVE, apelidoSalvo.value)
}
