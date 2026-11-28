// Gera data/taticas/<abertura>-<lado>-*.json: 900 problemas táticos de partidas de uma abertura no
// lichess, resolvidos pelo lado escolhido, em 3 fases (pelo número do lance) × 3 faixas de dificuldade.
// Siciliana: pretas = quem a joga, brancas = quem a enfrenta. Italiana: o contrário.
// Fonte: base de problemas do lichess (CC0), https://database.lichess.org/lichess_db_puzzle.csv.zst
// (o .zst vem no formato pzstd, com vários frames; descompacte com zstd -d ou pzstd -d)
// Uso: node scripts/taticas/gerar-abertura.mjs <caminho do .csv (descompactado)> <siciliana|italiana> <pretas|brancas>
//
// O lichess só marca a abertura (coluna OpeningTags) em problemas do começo da partida, por isso
// as fases vão do lance 2 até o meio-jogo. A escolha é aleatória com semente fixa.
import { createReadStream, mkdirSync, writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
import { Chess } from 'chess.js'

const ARQUIVO = process.argv[2]
if (!ARQUIVO) throw new Error('Informe o caminho do lichess_db_puzzle.csv')
const ABERTURA = process.argv[3]
const LADO = process.argv[4]
if (!['pretas', 'brancas'].includes(LADO)) throw new Error('Lado: pretas ou brancas')
const PRETAS = LADO === 'pretas'

const FASES = [
  { arquivo: `${ABERTURA}-${LADO}-1-abertura`, nome: 'Abertura (lances 2 a 10)', min: 2, max: 10 },
  { arquivo: `${ABERTURA}-${LADO}-2-transicao`, nome: 'Saída da abertura (lances 11 a 15)', min: 11, max: 15 },
  { arquivo: `${ABERTURA}-${LADO}-3-meio-jogo`, nome: 'Meio-jogo (lance 16 em diante)', min: 16, max: 999 },
]
const FAIXAS = [
  { nome: 'facil', min: 400, max: 1300 },
  { nome: 'medio', min: 1300, max: 1800 },
  { nome: 'dificil', min: 1800, max: 3000 },
]
const POR_FAIXA = 100
const RESERVATORIO = 1500

/** Nomes em português das variantes (a 2ª etiqueta do lichess); as outras ficam traduzidas por regra. */
const VARIANTES_DA_SICILIANA = {
  Sicilian_Defense: 'Siciliana',
  Sicilian_Defense_Alapin_Variation: 'Alapin (2.c3)',
  Sicilian_Defense_Delayed_Alapin_Variation: 'Alapin adiada',
  Sicilian_Defense_Closed: 'Siciliana Fechada',
  Sicilian_Defense_Old_Sicilian: 'Siciliana Antiga (2.Nf3 Nc6)',
  Sicilian_Defense_Bowdler_Attack: 'Ataque Bowdler (2.Bc4)',
  Sicilian_Defense_Najdorf_Variation: 'Najdorf',
  Sicilian_Defense_Modern_Variations: 'Variantes modernas (2.Nf3 d6)',
  'Sicilian_Defense_Smith-Morra_Gambit': 'Gambito Smith-Morra',
  'Sicilian_Defense_Smith-Morra_Gambit_Accepted': 'Gambito Smith-Morra aceito',
  'Sicilian_Defense_Smith-Morra_Gambit_Declined': 'Gambito Smith-Morra recusado',
  Sicilian_Defense_McDonnell_Attack: 'Ataque McDonnell (2.f4)',
  Sicilian_Defense_Taimanov_Variation: 'Taimanov',
  Sicilian_Defense_Other_variations: 'Siciliana (outras)',
  Sicilian_Defense_Open: 'Siciliana Aberta',
  Sicilian_Defense_French_Variation: 'Variante Francesa (2...e6)',
  Sicilian_Defense_Accelerated_Dragon: 'Dragão Acelerado',
  Sicilian_Defense_Hyperaccelerated_Dragon: 'Dragão Hiperacelerado',
  'Sicilian_Defense_Nyezhmetdinov-Rossolimo_Attack': 'Rossolimo (3.Bb5)',
  Sicilian_Defense_Dragon_Variation: 'Dragão',
  Sicilian_Defense_Kan_Variation: 'Kan (Paulsen)',
  Sicilian_Defense_Lowenthal_Variation: 'Löwenthal',
  'Sicilian_Defense_Lasker-Pelikan_Variation': 'Sveshnikov (Lasker-Pelikan)',
  Sicilian_Defense_Four_Knights_Variation: 'Quatro Cavalos',
  Sicilian_Defense_OKelly_Variation: "O'Kelly (2...a6)",
  Sicilian_Defense_Grand_Prix_Attack: 'Ataque Grand Prix',
  Sicilian_Defense_Wing_Gambit: 'Gambito da Ala',
  Sicilian_Defense_Scheveningen_Variation: 'Scheveningen',
  Sicilian_Defense_Richter_Rauzer_Variation: 'Richter-Rauzer',
  'Sicilian_Defense_Richter-Rauzer_Variation': 'Richter-Rauzer',
  Sicilian_Defense_Classical_Variation: 'Clássica',
  Sicilian_Defense_Kalashnikov_Variation: 'Kalashnikov',
  Sicilian_Defense_Nimzowitsch_Variation: 'Nimzowitsch (2...Nf6)',
  Sicilian_Defense_Hungarian_Variation: 'Húngara (2...g6)',
  Sicilian_Defense_Canal_Attack: 'Ataque Canal (3.Bb5+)',
  Sicilian_Defense_Moscow_Variation: 'Moscou (3.Bb5+)',
  Sicilian_Defense_Staunton_Cochrane_Variation: 'Staunton-Cochrane (2.c4)',
  'Sicilian_Defense_Staunton-Cochrane_Variation': 'Staunton-Cochrane (2.c4)',
  Sicilian_Defense_Snyder_Variation: 'Snyder (2.b3)',
  Sicilian_Defense_Katalimov_Variation: 'Katalimov (2.b3)',
  Sicilian_Defense_Smith_Morra_Gambit: 'Gambito Smith-Morra',
  Sicilian_Defense_Pin_Variation: 'Variante da Cravada',
  Sicilian_Defense_Prins_Variation: 'Prins',
  Sicilian_Defense_Velimirovic_Attack: 'Ataque Velimirović',
  Sicilian_Defense_Sozin_Attack: 'Ataque Sozin',
  Sicilian_Defense_Jalalabad_Variation: 'Jalalabad',
  Sicilian_Defense_Drazic_Variation: 'Dražić',
  Sicilian_Defense_Mongoose_Variation: 'Mangusto',
  Sicilian_Defense_Kramnik_Variation: 'Kramnik',
  Sicilian_Defense_Big_Clamp_Formation: 'Formação Big Clamp',
  Sicilian_Defense_Brussels_Gambit: 'Gambito de Bruxelas',
  Sicilian_Defense_Keres_Variation: 'Keres',
  Sicilian_Defense_Chekhover_Variation: 'Chekhover (4.Qxd4)',
  Sicilian_Defense_Boleslavsky_Variation: 'Boleslavsky',
  Sicilian_Defense_Paulsen_Variation: 'Paulsen',
  Sicilian_Defense_Portsmouth_Gambit: 'Gambito Portsmouth',
  Sicilian_Defense_Morphy_Gambit: 'Gambito Morphy',
  Sicilian_Defense_Gloria_Variation: 'Gloria',
  Sicilian_Defense_Marshall_Gambit: 'Gambito Marshall',
  Sicilian_Defense_Myers_Attack: 'Ataque Myers',
  Sicilian_Defense_Kopec_System: 'Sistema Kopec',
  Sicilian_Defense_Coles_Sicilian_Gambit: 'Gambito Coles',
  Sicilian_Defense_Euwe_Attack: 'Ataque Euwe',
  Sicilian_Defense_Frederico_Variation: 'Frederico',
  Sicilian_Defense_Smith_Morra_Gambit_Declined: 'Gambito Smith-Morra recusado',
  Sicilian_Defense_Kronberger_Variation: 'Kronberger',
  Sicilian_Defense_Mengarini_Variation: 'Mengarini (2.a3)',
  Sicilian_Defense_Lasker_Dunne_Attack: 'Ataque Lasker-Dunne',
  'Sicilian_Defense_Lasker-Dunne_Attack': 'Ataque Lasker-Dunne',
  Sicilian_Defense_Accelerated_Fianchetto: 'Fianchetto acelerado',
  Sicilian_Defense_Magnus_Smith_Trap: 'Armadilha Magnus Smith',
  Sicilian_Defense_Venice_Attack: 'Ataque Veneza',
  Sicilian_Defense_Bücker_Variation: 'Bücker',
  Sicilian_Defense_Smith_Morra_Gambit_Accepted: 'Gambito Smith-Morra aceito',
  Sicilian_Defense_Hyperaccelerated_Fianchetto: 'Fianchetto hiperacelerado',
  Sicilian_Defense_Delayed_Alapin: 'Alapin adiada',
  Sicilian_Defense_Marshall_Counterattack: 'Contra-ataque Marshall',
  'Sicilian_Defense_Franco-Sicilian_Variation': 'Franco-Siciliana',
  Sicilian_Defense_Hyperaccelerated_Pterodactyl: 'Pterodáctilo',
  'Sicilian_Defense_Paulsen-Basman_Defense': 'Paulsen-Basman',
  Sicilian_Defense_Sozin: 'Ataque Sozin',
  'Sicilian_Defense_Smith-Morra_Gambit_Deferred': 'Gambito Smith-Morra adiado',
  Sicilian_Defense_Wing_Gambit_Deferred: 'Gambito da Ala adiado',
  Sicilian_Defense_Bucker_Variation: 'Bücker',
}
const VARIANTES_DA_ITALIANA = {
  Italian_Game: 'Italiana',
  Italian_Game_Two_Knights_Defense: 'Dois Cavalos (3...Nf6)',
  Italian_Game_Classical_Variation: 'Clássica (3...Bc5)',
  Italian_Game_Giuoco_Pianissimo: 'Giuoco Pianissimo (d3)',
  Italian_Game_Giuoco_Piano: 'Giuoco Piano',
  'Italian_Game_Anti-Fried_Liver_Defense': 'Anti-Fried Liver (3...h6)',
  Italian_Game_Evans_Gambit: 'Gambito Evans',
  Italian_Game_Evans_Gambit_Accepted: 'Gambito Evans aceito',
  Italian_Game_Evans_Gambit_Declined: 'Gambito Evans recusado',
  Italian_Game_Scotch_Gambit: 'Gambito Escocês',
  Italian_Game_Scotch_Gambit_Declined: 'Gambito Escocês recusado',
  Italian_Game_Scotch_Invitation_Declined: 'Convite escocês recusado',
  Italian_Game_Rousseau_Gambit: 'Gambito Rousseau (3...f5)',
  Italian_Game_Other_variations: 'Italiana (outras)',
  'Italian_Game_Blackburne-Kostic_Gambit': 'Gambito Blackburne-Kostić (3...Nd4)',
  'Italian_Game_Schilling-Kostic_Gambit': 'Gambito Schilling-Kostić (3...Nd4)',
  Italian_Game_Hungarian_Defense: 'Defesa Húngara (3...Be7)',
  Italian_Game_Paris_Defense: 'Defesa Paris (3...d6)',
  Italian_Game_Deutz_Gambit: 'Gambito Deutz',
  Italian_Game_Rosentreter_Gambit: 'Gambito Rosentreter',
  Italian_Game_Birds_Attack: 'Ataque Bird',
  Italian_Game_Jerome_Gambit: 'Gambito Jerome',
}

const ABERTURAS = {
  siciliana: {
    etiqueta: 'Sicilian_Defense',
    nome: 'Siciliana',
    variantes: VARIANTES_DA_SICILIANA,
    tema: { pretas: 'siciliana', brancas: 'siciliana-brancas' },
    fonte: 'partidas da Defesa Siciliana',
    livro: { pretas: 'Siciliana, táticas pelas pretas', brancas: 'Contra a Siciliana, táticas pelas brancas' },
  },
  italiana: {
    etiqueta: 'Italian_Game',
    nome: 'Italiana',
    variantes: VARIANTES_DA_ITALIANA,
    tema: { brancas: 'italiana', pretas: 'italiana-pretas' },
    fonte: 'partidas do Jogo Italiano',
    livro: { brancas: 'Italiana, táticas pelas brancas', pretas: 'Contra a Italiana, táticas pelas pretas' },
  },
}
const CONFIG = ABERTURAS[ABERTURA]
if (!CONFIG) throw new Error(`Abertura: ${Object.keys(ABERTURAS).join(' ou ')}`)
const VARIANTES = CONFIG.variantes

/** Etiqueta sem tradução: tira o prefixo e os "_" ("Sicilian_Defense_Foo_Variation" → "Foo"). */
const nomeDaVariante = (etiqueta) =>
  VARIANTES[etiqueta] ??
  (etiqueta.replace(new RegExp(`^${CONFIG.etiqueta}_?`), '').replace(/_(Variation|Attack)$/, '').replaceAll('_', ' ').trim() ||
    CONFIG.nome)

// PRNG com semente (mulberry32), para a amostra ser reproduzível.
let semente = 20261119
const aleatorio = () => {
  semente |= 0
  semente = (semente + 0x6d2b79f5) | 0
  let t = Math.imul(semente ^ (semente >>> 15), 1 | semente)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const reservatorios = FASES.map(() => FAIXAS.map(() => ({ vistos: 0, lista: [] })))
const semNome = new Map()

const linhas = createInterface({ input: createReadStream(ARQUIVO), crlfDelay: Infinity })
let total = 0
let cabecalho = true
for await (const linha of linhas) {
  if (cabecalho) {
    cabecalho = false
    continue
  }
  total++
  const [id, fen, lances, rating, desvio, popularidade, jogadas, temas, url, aberturas] = linha.split(',')
  if (!aberturas?.startsWith(CONFIG.etiqueta)) continue
  // O FEN é a posição antes do lance do adversário: brancas na vez = as pretas resolvem.
  if (fen.split(' ')[1] !== (PRETAS ? 'w' : 'b')) continue
  if (Number(popularidade) < 85 || Number(jogadas) < 300 || Number(desvio) > 90) continue
  const r = Number(rating)
  const faixa = FAIXAS.findIndex((f) => r >= f.min && r < f.max)
  if (faixa < 0) continue
  // Número do lance que resolve: as pretas respondem no mesmo lance do FEN; as brancas, no seguinte.
  const lance = Number(fen.split(' ')[5]) + (PRETAS ? 0 : 1)
  const fase = FASES.findIndex((f) => lance >= f.min && lance <= f.max)
  if (fase < 0) continue
  const etiquetas = aberturas.split(' ')
  const variante = etiquetas[1] ?? etiquetas[0]
  if (!VARIANTES[variante]) semNome.set(variante, (semNome.get(variante) ?? 0) + 1)
  const res = reservatorios[fase][faixa]
  res.vistos++
  const item = { id, fen, lances, rating: r, lance, variante, temas: temas.split(' '), url }
  if (res.lista.length < RESERVATORIO) res.lista.push(item)
  else {
    const j = Math.floor(aleatorio() * res.vistos)
    if (j < RESERVATORIO) res.lista[j] = item
  }
  if (total % 1000000 === 0) console.log(`${total.toLocaleString('pt-BR')} problemas lidos…`)
}
console.log(`Total: ${total.toLocaleString('pt-BR')} problemas.`)
if (total < 100000) throw new Error('A base parece incompleta; nada foi gravado.')

function converter(item) {
  const jogo = new Chess(item.fen)
  const sans = item.lances.split(' ').map((uci) => jogo.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] }).san)
  return { fen: item.fen, previo: sans[0], linha: sans.slice(1) }
}

mkdirSync('data/taticas', { recursive: true })
for (const [f, fase] of FASES.entries()) {
  const problemas = []
  for (const [i, faixa] of FAIXAS.entries()) {
    const candidatos = reservatorios[f][i].lista
    for (let k = candidatos.length - 1; k > 0; k--) {
      const j = Math.floor(aleatorio() * (k + 1))
      ;[candidatos[k], candidatos[j]] = [candidatos[j], candidatos[k]]
    }
    if (candidatos.length < POR_FAIXA) throw new Error(`${fase.arquivo}/${faixa.nome}: só ${candidatos.length} candidatos`)
    const escolhidos = candidatos.slice(0, POR_FAIXA).sort((a, b) => a.rating - b.rating)
    console.log(`${fase.arquivo} ${faixa.nome}: ${reservatorios[f][i].vistos} candidatos`)
    for (const p of escolhidos) {
      problemas.push({
        ...converter(p),
        partida: `${nomeDaVariante(p.variante)} · lance ${p.lance} das ${LADO}`,
        rating: p.rating,
        faixa: faixa.nome,
        lichess: p.id,
      })
    }
  }
  const conjunto = {
    id: fase.arquivo,
    tipo: 'tatica',
    tema: CONFIG.tema[LADO],
    nome: fase.nome,
    fonte: `Base de problemas do lichess (CC0), lichess.org: ${CONFIG.fonte}`,
    livro: CONFIG.livro[LADO],
    lances: 0,
    problemas: problemas.map((p, i) => ({ n: i + 1, ...p, solucoes: [p.linha[0]] })),
  }
  writeFileSync(`data/taticas/${fase.arquivo}.json`, JSON.stringify(conjunto))
  console.log(`${fase.arquivo}: ${conjunto.problemas.length} problemas`)
}
console.log('Variantes sem nome em português (mais comuns):', [...semNome].sort((a, b) => b[1] - a[1]).slice(0, 15))
