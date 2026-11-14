import { describe, expect, it } from 'vitest'
import { contarAvisos } from '../src/lib/avisosOnline'
import { novaPartida, type PartidaOnline } from '../src/lib/partidaOnline'

const base = (mudar: Partial<PartidaOnline>): PartidaOnline => ({ ...novaPartida('a', 'Ana', 'w', '5+3', true, null, 0), ...mudar })

describe('avisos das partidas on-line', () => {
  it('conta desafios para mim e partidas esperando o meu lance', () => {
    const partidas = [
      base({ convidado: 'eu' }), // desafio para mim
      base({ convidado: 'outro' }), // desafio para outra pessoa
      base({ estado: 'jogando', brancas: 'eu', pretas: 'a', lances: [] }), // minha vez (brancas)
      base({ estado: 'jogando', brancas: 'eu', pretas: 'a', lances: ['e4'] }), // vez do outro
      base({ estado: 'jogando', brancas: 'a', pretas: 'eu', lances: ['e4'] }), // minha vez (pretas)
      base({ estado: 'fim', brancas: 'eu', pretas: 'a', lances: [] }), // acabou
    ]
    expect(contarAvisos(partidas, 'eu')).toEqual({ desafios: 1, minhaVez: 2 })
  })
})
