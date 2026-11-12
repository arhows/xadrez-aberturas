import { deflateRawSync } from 'node:zlib'
import { describe, expect, it } from 'vitest'
import {
  chaveDoNome,
  corDoJogador,
  jogadorMaisFrequente,
  lancesDoTexto,
  lancesSeguintes,
  lerPartidasPgn,
  partidasDoJogador,
  partidasNoCaminho,
  type Colecao,
} from '../src/lib/jogador'
import { ehZip, lerZip, textoDoArquivo } from '../src/lib/zip'

const PGN = `[Event "Moscou"]
[White "Karpov, Anatoly"]
[Black "Kasparov, Gary"]
[Result "0-1"]
[Date "1985.10.15"]

1. d4 Nf6 2. c4 g6 {Índia do Rei} 3. Nc3 Bg7 (3... d5 4. cxd5) 4. e4 d6 $1 0-1

[Event "Linares"]
[White "Kasparov, G."]
[Black "Anand, V."]
[Result "1/2-1/2"]

1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 1/2-1/2

[Event "Tilburg"]
[White "Ljubojevic, L."]
[Black "Kasparov, Gary"]
[Result "1-0"]

1. d4 Nf6 2. c4 g6 3. g3 Bg7 1-0

[Event "Sem lances"]
[White "A"]
[Black "B"]
[Result "*"]

*
`

describe('leitura do PGN', () => {
  it('tira comentários, variantes, NAGs e números', () => {
    expect(lancesDoTexto('1. e4 {bom} e5 (1... c5 (1... e6) 2. Nf3) 2. Nf3!? $14 Nc6 3. 0-0 1-0')).toEqual(['e4', 'e5', 'Nf3', 'Nc6', 'O-O'])
  })
  it('lê as partidas e ignora as sem lances', () => {
    const partidas = lerPartidasPgn(PGN)
    expect(partidas).toHaveLength(3)
    expect(partidas[0]).toMatchObject({ brancas: 'Karpov, Anatoly', pretas: 'Kasparov, Gary', resultado: '0-1', lances: 'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6' })
  })
  it('acha o jogador da coleção pelo sobrenome', () => {
    const partidas = lerPartidasPgn(PGN)
    expect(chaveDoNome('Kasparov, Gary')).toBe('kasparov')
    expect(chaveDoNome('Garry Kasparov')).toBe('kasparov')
    expect(chaveDoNome(jogadorMaisFrequente(partidas))).toBe('kasparov')
    expect(corDoJogador(partidas[1], 'Kasparov, Gary')).toBe('w')
  })
})

describe('árvore do jogador', () => {
  const partidas = lerPartidasPgn(PGN)
  const colecao: Colecao = { id: 'c', nome: 'k.pgn', jogador: 'Kasparov, Gary', importada: '', partidas }
  it('filtra pela cor e pelo caminho, com os pontos do jogador', () => {
    const pretas = partidasDoJogador(colecao, 'b')
    expect(pretas).toHaveLength(2)
    const kid = partidasNoCaminho(pretas, ['d4', 'Nf6', 'c4', 'g6'])
    expect(kid).toHaveLength(2)
    expect(lancesSeguintes(kid, 4)).toEqual([
      { san: 'Nc3', partidas: 1, parte: 0.5, pontos: 100 },
      { san: 'g3', partidas: 1, parte: 0.5, pontos: 0 },
    ])
  })
})

/** Monta um .zip de um arquivo com deflate, como os do PGN Mentor. */
function zipDe(nome: string, conteudo: string): Uint8Array {
  const dados = new TextEncoder().encode(conteudo)
  const comprimido = deflateRawSync(dados)
  const nomeBytes = new TextEncoder().encode(nome)
  const local = new Uint8Array(30 + nomeBytes.length)
  const lv = new DataView(local.buffer)
  lv.setUint32(0, 0x04034b50, true)
  lv.setUint16(8, 8, true)
  lv.setUint32(18, comprimido.length, true)
  lv.setUint32(22, dados.length, true)
  lv.setUint16(26, nomeBytes.length, true)
  local.set(nomeBytes, 30)
  const central = new Uint8Array(46 + nomeBytes.length)
  const cv = new DataView(central.buffer)
  cv.setUint32(0, 0x02014b50, true)
  cv.setUint16(10, 8, true)
  cv.setUint32(20, comprimido.length, true)
  cv.setUint32(24, dados.length, true)
  cv.setUint16(28, nomeBytes.length, true)
  cv.setUint32(42, 0, true)
  central.set(nomeBytes, 46)
  const fim = new Uint8Array(22)
  const fv = new DataView(fim.buffer)
  fv.setUint32(0, 0x06054b50, true)
  fv.setUint16(8, 1, true)
  fv.setUint16(10, 1, true)
  fv.setUint32(12, central.length, true)
  fv.setUint32(16, local.length + comprimido.length, true)
  const tudo = new Uint8Array(local.length + comprimido.length + central.length + fim.length)
  tudo.set(local, 0)
  tudo.set(comprimido, local.length)
  tudo.set(central, local.length + comprimido.length)
  tudo.set(fim, local.length + comprimido.length + central.length)
  return tudo
}

describe('zip', () => {
  it('lê um .zip com deflate', async () => {
    const zip = zipDe('Kasparov.pgn', PGN)
    expect(ehZip(zip)).toBe(true)
    const arquivos = await lerZip(zip)
    expect(arquivos.map((a) => a.nome)).toEqual(['Kasparov.pgn'])
    expect(lerPartidasPgn(textoDoArquivo(arquivos[0].dados))).toHaveLength(3)
  })
  it('PGN em Latin-1 também é lido', () => {
    const latin = new Uint8Array([0x4a, 0xe9])
    expect(textoDoArquivo(latin)).toBe('Jé')
  })
})
