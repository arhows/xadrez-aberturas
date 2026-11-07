import { progresso } from './progresso'

let contexto: AudioContext | null = null

/** Bipe curto de feedback; sem áudio disponível, o treino segue em silêncio. */
export function tocar(tipo: 'certo' | 'errado'): void {
  if (!progresso.config.som) return
  try {
    contexto ??= new AudioContext()
    const oscilador = contexto.createOscillator()
    const volume = contexto.createGain()
    oscilador.frequency.value = tipo === 'certo' ? 660 : 180
    volume.gain.setValueAtTime(0.08, contexto.currentTime)
    volume.gain.exponentialRampToValueAtTime(0.001, contexto.currentTime + 0.18)
    oscilador.connect(volume).connect(contexto.destination)
    oscilador.start()
    oscilador.stop(contexto.currentTime + 0.18)
  } catch {
    // Navegador sem Web Audio.
  }
}
