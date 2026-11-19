// Gera data/estudos/siciliana-pretas.json: partidas modelo (vitórias das pretas na Siciliana, jogo
// clássico, jogadores de elite) para o Estudo de partidas. Os PGN em scripts/estudos/pgn/ vêm da base de
// partidas de mestres do lichess (explorer.lichess.ovh/masters/pgn/<id>).
// Uso: node scripts/estudos/gerar-modelos.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { Chess } from 'chess.js'

/** Na ordem da tela; `variante` e `evento` em português. */
const PARTIDAS = [
  { id: 'YuQ8kZDT', variante: 'Najdorf, 6.Be2', evento: 'Linares 2000' },
  { id: 'bgEBwWXX', variante: 'Najdorf, Peão Envenenado (6.Bg5 e6 7.f4 Qb6)', evento: 'Linares 1990' },
  { id: 'u6d46Sdi', variante: 'Dragão, Ataque Iugoslavo (9...d5)', evento: 'Medias 2010' },
  { id: 'krvgf6Sq', variante: 'Sveshnikov', evento: 'Shamkir 2016' },
  { id: '8ENETNzW', variante: 'Taimanov (5.Nb5 d6 6.c4)', evento: 'Mundial de Moscou 1985, partida 16' },
  { id: '9oMy7FQV', variante: 'Scheveningen, Ataque Keres (6.g4)', evento: 'Copa do Mundo, Belfort 1988' },
  { id: 'UTjtjG4y', variante: 'Kan (5.c4, Maroczy)', evento: 'Bad Lauterberg 1977' },
  { id: 'sOJ580QG', variante: 'Dragão Acelerado', evento: 'Campeonato russo por equipes, Dagomys 2008' },
  { id: 'XErOLKA5', variante: 'Alapin (2.c3 d5)', evento: 'Olimpíada de Baku 2016' },
  { id: 'XAwc5zJ8', variante: 'Rossolimo (3.Bb5 g6 4.Bxc6)', evento: 'Tata Steel, Wijk aan Zee 2015' },
]

/** "Kasparov, Garry" → "Kasparov"; "Vachier Lagrave, Maxime" → "Vachier-Lagrave". */
const sobrenome = (nome) => {
  const s = nome.split(',')[0].trim()
  return s === 'Vachier Lagrave' ? 'Vachier-Lagrave' : s
}

const partidas = PARTIDAS.map((p) => {
  const pgn = readFileSync(`scripts/estudos/pgn/${p.id}.pgn`, 'utf8')
  const cab = (chave) => pgn.match(new RegExp(`\\[${chave} "([^"]*)"\\]`))?.[1] ?? ''
  if (cab('Result') !== '0-1') throw new Error(`${p.id}: não é vitória das pretas`)
  const jogo = new Chess()
  jogo.loadPgn(pgn)
  const lances = jogo.history()
  if (lances[0] !== 'e4' || lances[1] !== 'c5') throw new Error(`${p.id}: não é Siciliana`)
  return {
    id: p.id,
    brancas: sobrenome(cab('White')),
    pretas: sobrenome(cab('Black')),
    ano: Number(cab('Date').slice(0, 4)),
    evento: p.evento,
    variante: p.variante,
    lances: lances.join(' '),
  }
})

mkdirSync('data/estudos', { recursive: true })
writeFileSync('data/estudos/siciliana-pretas.json', JSON.stringify(partidas, null, 1) + '\n')
for (const p of partidas) console.log(`${p.brancas} × ${p.pretas}, ${p.ano} · ${p.variante} · ${Math.ceil(p.lances.split(' ').length / 2)} lances`)
