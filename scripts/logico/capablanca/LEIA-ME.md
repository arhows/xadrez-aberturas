# Lance a lance: Capablanca: Move by Move

Partidas na numeração do livro de Cyrus Lakdawala. Só entra uma partida cujos lances batem em
duas fontes: a base pública PGN Mentor (pgnmentor.com/players/Capablanca.zip) e a linha principal
impressa no PDF do usuário (só os lances; nada do texto do livro é usado).

1. `pdftotext -layout livro.pdf livro.txt`
2. `node conferir.mjs livro.txt Capablanca.pgn "1:Corzo:1901,3:Bernstein:1911" conf.json`
   (número do livro : parte do nome do adversário : ano). Só seguem as que dão N/N.
3. `node analisar.mjs data/logico/capablanca.json 1,3 16` — Stockfish em cada lance.
4. Notas próprias para todos os lances de Capablanca; depois
   `node verificar.mjs data/logico/capablanca.json lote.json` confere no tabuleiro cada
   "ataca o X de Y", "com xeque", "come o Z", "o peão de c4"...

Fora do teste por não baterem nas duas fontes: 2, 4, 6 (não estão no PGN Mentor) e 5 (ordem de lances diferente).
