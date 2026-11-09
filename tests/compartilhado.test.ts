import { describe, expect, it } from 'vitest'
import { partidaOnlineDoLichess, pgnDoCompartilhado, temLances } from '../src/lib/compartilhado'

describe('PGN compartilhado', () => {
  it('reconhece lances e ignora só título ou link', () => {
    expect(temLances('[White "Maia"]\n\n1. g3 g6 2. Bg2')).toBe(true)
    expect(temLances('1.e4 e5')).toBe(true)
    expect(temLances('Partida contra Maia https://lichess.org/game/ocg_d8ac1f97')).toBe(false)
  })

  it('acha a partida on-line do lichess, mas não a offline', () => {
    expect(partidaOnlineDoLichess('https://lichess.org/AbCd1234')).toBe('AbCd1234')
    expect(partidaOnlineDoLichess('https://lichess.org/AbCd1234WxYz')).toBe('AbCd1234')
    expect(partidaOnlineDoLichess('https://lichess.org/game/ocg_d8ac1f97')).toBeNull()
  })

  it('junta texto e arquivos que tenham lances', async () => {
    const pgn = await pgnDoCompartilhado({
      titulo: 'Maia vs Anonymous',
      texto: '1. e4 e5',
      endereco: '',
      arquivos: ['1. d4 d5'],
    })
    expect(pgn).toBe('1. d4 d5\n\n1. e4 e5')
  })
})
