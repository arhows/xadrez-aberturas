# Lance a lance: Anand: Move by Move

Partidas na numeração do livro de Zenón Franco (32 partidas, 1991–2014). Só entra uma partida cujos
lances batem em duas fontes: a base pública PGN Mentor (pgnmentor.com/players/Anand.zip) e a linha
principal do PDF do usuário (só os lances; nada do texto do livro é usado).

1. Texto do PDF com PyMuPDF (o `pdftotext` não lê este arquivo): `page.get_text()` de cada página.
2. `node conferir.mjs livro.txt Anand.pgn conf.json` acha os cabeçalhos das 32 partidas, a partida
   no PGN Mentor e lista os lances não achados. O texto tem erros de leitura (cS = c5, BcS = Bc8,
   Rbl = Rb1, lances grudados como "Qxc318.Rbl"): conferir os que faltam à mão.
3. Análise, notas e verificação como no Capablanca (`../capablanca/analisar.mjs`, `verificar.mjs`).

Teste (2026-11-14): partidas 7 (Lautier), 10 (Piket) e 13 (Adams), conferidas lance a lance.
