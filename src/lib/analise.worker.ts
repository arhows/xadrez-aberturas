import { responder } from './mate'

/** Análise pesada (defesa contra um lance com mate em 2 ainda por vir) fora da tela. */
self.onmessage = (evento: MessageEvent<{ fen: string; restantes: number }>) => {
  self.postMessage(responder(evento.data.fen, evento.data.restantes))
}
