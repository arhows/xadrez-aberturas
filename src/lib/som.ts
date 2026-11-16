import { progresso } from './progresso'
import type { SomDoLance } from './somDoLance'

let contexto: AudioContext | null = null
let ruido: AudioBuffer | null = null

function audio(): AudioContext {
  contexto ??= new AudioContext()
  // O navegador suspende o áudio até o primeiro toque na página.
  if (contexto.state === 'suspended') void contexto.resume()
  return contexto
}

/** Bipe curto de feedback; sem áudio disponível, o treino segue em silêncio. */
export function tocar(tipo: 'certo' | 'errado'): void {
  if (!progresso.config.som) return
  try {
    const ctx = audio()
    const oscilador = ctx.createOscillator()
    const volume = ctx.createGain()
    oscilador.frequency.value = tipo === 'certo' ? 660 : 180
    volume.gain.setValueAtTime(0.08, ctx.currentTime)
    volume.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)
    oscilador.connect(volume).connect(ctx.destination)
    oscilador.start()
    oscilador.stop(ctx.currentTime + 0.18)
  } catch {
    // Navegador sem Web Audio.
  }
}

/** Ruído branco de 80 ms, reaproveitado em todos os toques de madeira. */
function bufferDeRuido(ctx: AudioContext): AudioBuffer {
  if (ruido) return ruido
  ruido = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.08), ctx.sampleRate)
  const dados = ruido.getChannelData(0)
  for (let i = 0; i < dados.length; i++) dados[i] = Math.random() * 2 - 1
  return ruido
}

/** Peça batendo na madeira: estalo filtrado + baque grave curto. */
function batida(ctx: AudioContext, inicio: number, tom: number, forca: number): void {
  const estalo = ctx.createBufferSource()
  estalo.buffer = bufferDeRuido(ctx)
  const filtro = ctx.createBiquadFilter()
  filtro.type = 'bandpass'
  filtro.frequency.value = tom
  filtro.Q.value = 2.5
  const volEstalo = ctx.createGain()
  volEstalo.gain.setValueAtTime(0.9 * forca, inicio)
  volEstalo.gain.exponentialRampToValueAtTime(0.001, inicio + 0.05)
  estalo.connect(filtro).connect(volEstalo).connect(ctx.destination)
  estalo.start(inicio)
  estalo.stop(inicio + 0.08)

  const baque = ctx.createOscillator()
  baque.type = 'sine'
  baque.frequency.setValueAtTime(tom / 6, inicio)
  baque.frequency.exponentialRampToValueAtTime(tom / 12, inicio + 0.06)
  const volBaque = ctx.createGain()
  volBaque.gain.setValueAtTime(0.35 * forca, inicio)
  volBaque.gain.exponentialRampToValueAtTime(0.001, inicio + 0.08)
  baque.connect(volBaque).connect(ctx.destination)
  baque.start(inicio)
  baque.stop(inicio + 0.09)
}

/** Notas suaves (xeque, fim de partida). */
function notas(ctx: AudioContext, inicio: number, frequencias: number[], passo: number, duracao: number, forca = 0.12): void {
  frequencias.forEach((f, i) => {
    const t = inicio + i * passo
    const osc = ctx.createOscillator()
    osc.type = 'triangle'
    osc.frequency.value = f
    const vol = ctx.createGain()
    vol.gain.setValueAtTime(0.0001, t)
    vol.gain.exponentialRampToValueAtTime(forca, t + 0.015)
    vol.gain.exponentialRampToValueAtTime(0.0001, t + duracao)
    osc.connect(vol).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + duracao + 0.02)
  })
}

/** Som das peças, como no lichess: lance, captura, xeque, mate e empate. */
export function tocarLance(tipo: SomDoLance): void {
  if (!progresso.config.somPecas) return
  try {
    const ctx = audio()
    const agora = ctx.currentTime + 0.01
    switch (tipo) {
      case 'lance':
        batida(ctx, agora, 1400, 0.8)
        break
      case 'captura':
        batida(ctx, agora, 1000, 1)
        batida(ctx, agora + 0.045, 1700, 0.7)
        break
      case 'xeque':
        batida(ctx, agora, 1400, 0.8)
        notas(ctx, agora + 0.02, [988], 0, 0.25, 0.07)
        break
      case 'mate':
        batida(ctx, agora, 1000, 1)
        notas(ctx, agora + 0.12, [523.25, 659.25, 783.99, 1046.5], 0.11, 0.7)
        break
      case 'empate':
        batida(ctx, agora, 1400, 0.8)
        notas(ctx, agora + 0.12, [587.33, 587.33], 0.2, 0.35, 0.09)
        break
    }
  } catch {
    // Navegador sem Web Audio.
  }
}
