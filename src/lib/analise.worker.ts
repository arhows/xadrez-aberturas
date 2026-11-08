import { chaveDoMate, responder } from './mate'

/** Buscas pesadas dos exercícios (defesa e pista com mate longo por vir), fora da tela. */
export type Pedido =
  | { id: number; tipo: 'responder'; fen: string; restantes: number }
  | { id: number; tipo: 'chave'; fen: string; lances: number }

self.onmessage = (evento: MessageEvent<Pedido>) => {
  const pedido = evento.data
  const resultado =
    pedido.tipo === 'responder' ? responder(pedido.fen, pedido.restantes) : chaveDoMate(pedido.fen, pedido.lances)
  self.postMessage({ id: pedido.id, resultado })
}
