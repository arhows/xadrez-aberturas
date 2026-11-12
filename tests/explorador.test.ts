import { afterEach, describe, expect, it, vi } from 'vitest'
import { buscarEstatisticas, converter, ErroExplorador, faixasPerto } from '../src/lib/explorador'

const FEN = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1'
const resposta = {
  white: 50,
  draws: 20,
  black: 30,
  moves: [
    { san: 'c5', white: 30, draws: 10, black: 20, averageRating: 1500 },
    { san: 'e5', white: 20, draws: 10, black: 10, averageRating: 1450 },
  ],
}

afterEach(() => vi.unstubAllGlobals())

describe('explorador do lichess', () => {
  it('converte a resposta em totais por lance', () => {
    const r = converter(resposta)
    expect(r.total).toBe(100)
    expect(r.lances[0]).toEqual({ san: 'c5', brancas: 30, empates: 10, pretas: 20, total: 60, mediaRating: 1500 })
  })

  it('usa a faixa escolhida e as vizinhas', () => {
    expect(faixasPerto(1400)).toEqual([1200, 1400, 1600])
    expect(faixasPerto(0)).toEqual([0, 1000])
    expect(faixasPerto(2500)).toEqual([2200, 2500])
  })

  it('manda o token, só a posição, e guarda em cache', async () => {
    const fetch = vi.fn(async () => new Response(JSON.stringify(resposta), { status: 200 }))
    vi.stubGlobal('fetch', fetch)
    await buscarEstatisticas(FEN, 'lichess', 'tok', 1400)
    await buscarEstatisticas(FEN, 'lichess', 'tok', 1400)
    expect(fetch).toHaveBeenCalledTimes(1)
    const [url, opcoes] = fetch.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toContain('explorer.lichess.ovh/lichess?')
    expect(url).toContain('ratings=1200%2C1400%2C1600')
    expect((opcoes.headers as Record<string, string>).Authorization).toBe('Bearer tok')
  })

  it('401 pede para conectar de novo; 429 faz esperar sem consultar', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('', { status: 401 })))
    await expect(buscarEstatisticas(FEN, 'masters', 'x', 0)).rejects.toMatchObject({ tipo: 'sem-login' })

    const fetch429 = vi.fn(async () => new Response('', { status: 429 }))
    vi.stubGlobal('fetch', fetch429)
    const outra = FEN.replace(' b ', ' w ')
    await expect(buscarEstatisticas(outra, 'masters', 'x', 0)).rejects.toBeInstanceOf(ErroExplorador)
    await expect(buscarEstatisticas(outra + ' ', 'masters', 'x', 0)).rejects.toMatchObject({ tipo: 'limite' })
    expect(fetch429).toHaveBeenCalledTimes(1)
  })
})
