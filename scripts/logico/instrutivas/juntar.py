"""Junta um lote de notas (JSON: {"n": {tema, introducao, conclusao, notas}}) em data/logico/instrutivas.json.

Uso, na raiz do repositório:  python -I scripts/logico/instrutivas/juntar.py lote.json
Os lances vêm do estudo público do lichess Eow8gE3L ("Chernev : 62 The Most Instructive Games");
os textos são do app. Para analisar: node scripts/logico/instrutivas/analisar.mjs data/logico/instrutivas.json 7,8,9
(precisa do Stockfish em %TEMP%/stockfish-armadilhas, o mesmo das armadilhas).
"""
import io, json, sys
CAMINHO = 'data/logico/instrutivas.json'
dados = json.load(io.open(CAMINHO, encoding='utf-8'))
lote = json.load(io.open(sys.argv[1], encoding='utf-8'))
por_n = {p['n']: p for p in dados['partidas']}
for n, conteudo in lote.items():
    por_n[int(n)].update(conteudo)
json.dump(dados, io.open(CAMINHO, 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=1)
print(sum(1 for p in dados['partidas'] if p.get('notas')), 'partidas com notas')
