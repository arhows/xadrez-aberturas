"""Reconhece os diagramas do livro 1001 Checkmate Exercises (Sam Cicero).

Uso: python -I scripts/exercicios/reconhecer-cicero.py [caminho-do-pdf] [saida.json]

O PDF (fora do git, em fotos/exercicios/) traz cada diagrama como um JPEG de 291x262:
tabuleiro de 262 px com as casas escuras hachuradas e o círculo da vez à direita. Este
script, só com Pillow e pdftotext (Git para Windows), faz:

1. extrai os JPEGs e o texto de cada página, ligando cada exercício ao seu diagrama;
2. marca as casas vazias pela textura: casa clara vazia não tem tinta, e a hachura de uma
   casa escura vazia tem linhas finas e regulares, sem áreas inteiras brancas ou pretas;
3. apaga o fundo de cada casa ocupada (a mediana das casas vazias daquela posição) e
   compara a peça com os modelos rotulados de cicero-modelos.json.

O resultado (posições, enunciados e soluções do livro) vai para um JSON intermediário,
fora do git; gerar-cicero.mjs confere cada posição com o motor e grava os exercícios.
"""
import base64
import json
import os
import re
import statistics
import subprocess
import sys
from collections import defaultdict
from io import BytesIO

from PIL import Image

RAIZ = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
PDF = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    RAIZ, 'fotos', 'exercicios', 'pdfcoffee.com_1001-checkmate-exercises-mastering-essential-skill-pdf-free.pdf')
SAIDA = sys.argv[2] if len(sys.argv) > 2 else os.path.join(RAIZ, 'fotos', 'exercicios', 'cicero-posicoes.json')

LADO = 262 / 8
BORDA = [round(i * LADO) for i in range(9)]
TAMANHO = 24

# ---------- PDF: imagens, páginas e texto ----------

dados = open(PDF, 'rb').read()
objetos = {int(m.group(1)): m.start() for m in re.finditer(rb'(\d+) 0 obj\s*<<', dados)}


def objeto(n):
    inicio = objetos[n]
    return dados[inicio:dados.find(b'endobj', inicio)]


def jpeg(n):
    corpo = objeto(n)
    tamanho = int(re.search(rb'/Length (\d+)', corpo).group(1))
    i = corpo.find(b'stream') + len(b'stream')
    i += 2 if corpo[i:i + 2] == b'\r\n' else 1
    return Image.open(BytesIO(corpo[i:i + tamanho])).convert('L')


def paginas_em_ordem():
    raiz = int(re.findall(rb'/Root (\d+) 0 R', dados)[-1])
    ordem = []

    def descer(n):
        corpo = objeto(n)
        filhos = re.search(rb'/Kids\s*\[([^\]]*)\]', corpo)
        if filhos and b'/Type /Pages' in corpo[:300]:
            for filho in re.findall(rb'(\d+) 0 R', filhos.group(1)):
                descer(int(filho))
        else:
            ordem.append(n)

    descer(int(re.search(rb'/Pages (\d+) 0 R', objeto(raiz)).group(1)))
    return [[int(x) for x in re.findall(rb'/Image\d+ (\d+) 0 R', objeto(n))] for n in ordem]


imagens_da_pagina = paginas_em_ordem()
textos = subprocess.run(['pdftotext', '-enc', 'UTF-8', PDF, '-'], capture_output=True, check=True).stdout.decode('utf8')
textos = [t.replace('\r', '') for t in textos.split('\f')]

ENUNCIADO = re.compile(
    r'\s*(?:Chapter[^\n]*\n(?:[^\n]*\n)*?)?\s*(\d{1,4}) (.*?)\n?'
    r'(?:(White|Black) now played (?:…)?(\S+?)[?!]*\. )?Find the mate for (White|Black)\.', re.S)

exercicios = {}
for i, (imagens, texto) in enumerate(zip(imagens_da_pagina, textos)):
    m = ENUNCIADO.match(texto)
    if not (m and imagens):
        continue
    n = int(m.group(1))
    exercicios[n] = {
        'imagem': imagens[0],
        'partida': re.sub(r'\s*\n\s*', ', ', m.group(2).strip()),
        'vez': 'w' if m.group(5) == 'White' else 'b',
        'previo': m.group(4),
        'solucao': textos[i + 1].strip() if i + 1 < len(textos) else '',
    }

# ---------- Reconhecimento ----------


def recorte(im, f, c):
    return list(im.crop((BORDA[c], BORDA[f], BORDA[c + 1], BORDA[f + 1])).resize((TAMANHO, TAMANHO), Image.BOX).getdata())


def vazia(im, f, c, janela=6):
    """Casa vazia pela textura (frações de pixels escuros em janelas 6x6)."""
    px = im.load()
    x0, x1, y0, y1 = BORDA[c] + 2, BORDA[c + 1] - 2, BORDA[f] + 2, BORDA[f + 1] - 2
    escuro = [[1 if px[x, y] < 128 else 0 for x in range(x0, x1)] for y in range(y0, y1)]
    h, w = len(escuro), len(escuro[0])
    soma = [[0] * (w + 1) for _ in range(h + 1)]
    for y in range(h):
        for x in range(w):
            soma[y + 1][x + 1] = escuro[y][x] + soma[y][x + 1] + soma[y + 1][x] - soma[y][x]
    j = janela
    fracoes = [(soma[y + j][x + j] - soma[y][x + j] - soma[y + j][x] + soma[y][x]) / (j * j)
               for y in range(h - j + 1) for x in range(w - j + 1)]
    if (f + c) % 2 == 0:
        return max(fracoes) < 0.1
    return min(fracoes) >= 0.06 and max(fracoes) <= 0.4


modelos = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cicero-modelos.json')))
referencias = [(m['peca'], list(base64.b64decode(m['pixels']))) for m in modelos['modelos']]

diagramas = {n: jpeg(e['imagem']) for n, e in exercicios.items()}
ocupadas = {}
amostras = defaultdict(list)
for n, im in diagramas.items():
    for f in range(8):
        for c in range(8):
            livre = vazia(im, f, c)
            ocupadas[(n, f, c)] = not livre
            if livre and len(amostras[(f, c)]) < 150:
                amostras[(f, c)].append(recorte(im, f, c))
fundo = {casa: [statistics.median(col) for col in zip(*lista)] for casa, lista in amostras.items()}


def peca(im, f, c):
    pixels = [255 if abs(p - q) < 70 else p for p, q in zip(recorte(im, f, c), fundo[(f, c)])]
    return min(referencias, key=lambda ref: sum(abs(a - b) for a, b in zip(pixels, ref[1])))[0]


for n, e in exercicios.items():
    fileiras = []
    for f in range(8):
        texto, vazias = '', 0
        for c in range(8):
            if not ocupadas[(n, f, c)]:
                vazias += 1
                continue
            if vazias:
                texto += str(vazias)
                vazias = 0
            texto += peca(diagramas[n], f, c)
        fileiras.append(texto + (str(vazias) if vazias else ''))
    e['tabuleiro'] = '/'.join(fileiras)
    del e['imagem']

json.dump(dict(sorted(exercicios.items())), open(SAIDA, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print(f'{len(exercicios)} diagramas reconhecidos em {os.path.relpath(SAIDA, RAIZ)}')
