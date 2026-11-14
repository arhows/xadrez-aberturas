import { describe, expect, it } from 'vitest'
import { AVATARES, buscarAvatar, tomDaInicial } from '../src/lib/perfil'

describe('perfil', () => {
  it('os avatares têm ids únicos e curtos (a regra aceita até 40 caracteres)', () => {
    const ids = AVATARES.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.every((id) => id.length <= 40)).toBe(true)
    expect(buscarAvatar('cavalo-verde')?.peca).toBe('knight')
    expect(buscarAvatar('nao-existe')).toBeUndefined()
  })

  it('a cor da inicial é sempre a mesma para a mesma conta', () => {
    expect(tomDaInicial('abc')).toBe(tomDaInicial('abc'))
    expect(['aprender', 'praticar', 'jogar', 'eu']).toContain(tomDaInicial('qualquer'))
  })
})
