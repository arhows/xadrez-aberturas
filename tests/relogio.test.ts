import { describe, expect, it } from 'vitest'
import { aposLance, formatarRelogio, relogioInicial, semMaterialParaMate, tempoPorId } from '../src/lib/relogio'

describe('relógio do Jogar', () => {
  it('começa com os minutos do tempo escolhido; sem relógio é livre', () => {
    expect(relogioInicial(tempoPorId('3+2'))).toEqual({ w: 180_000, b: 180_000 })
    expect(tempoPorId('xyz').id).toBe('livre')
  })

  it('desconta o gasto e soma o acréscimo de quem jogou', () => {
    const r = aposLance({ w: 180_000, b: 180_000 }, 'w', 7_500, tempoPorId('3+2'))
    expect(r).toEqual({ w: 174_500, b: 180_000 })
    expect(aposLance({ w: 1_000, b: 0 }, 'w', 5_000, tempoPorId('5+3')).w).toBe(3_000)
  })

  it('formata como nos apps, com décimos no fim', () => {
    expect(formatarRelogio(180_000)).toBe('3:00')
    expect(formatarRelogio(65_200)).toBe('1:06')
    expect(formatarRelogio(9_450)).toBe('9.4')
    expect(formatarRelogio(-5)).toBe('0.0')
  })

  it('sem material para dar mate: só rei, ou rei e uma peça menor', () => {
    expect(semMaterialParaMate('4k3/8/8/8/8/8/8/4K3 w - - 0 1', 'w')).toBe(true)
    expect(semMaterialParaMate('4k3/8/8/8/8/8/8/2N1K3 w - - 0 1', 'w')).toBe(true)
    expect(semMaterialParaMate('4k3/8/8/8/8/8/P7/4K3 w - - 0 1', 'w')).toBe(false)
    expect(semMaterialParaMate('4k3/8/8/8/8/8/8/1NN1K3 w - - 0 1', 'w')).toBe(false)
  })
})
