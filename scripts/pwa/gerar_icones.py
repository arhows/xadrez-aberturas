"""Gera os ícones do PWA em public/icones/ (cavalo ♞ sobre o verde do tema).

Uso: python scripts/pwa/gerar_icones.py  (precisa do Pillow e da fonte Segoe UI Symbol do Windows)
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

FONTE = 'C:/Windows/Fonts/seguisym.ttf'
VERDE = (47, 111, 79, 255)  # --destaque
CLARO = (250, 250, 247, 255)  # --fundo
SAIDA = Path(__file__).resolve().parents[2] / 'public' / 'icones'


def desenhar(tamanho: int, arredondado: bool, escala_peca: float) -> Image.Image:
    grande = tamanho * 4
    img = Image.new('RGBA', (grande, grande), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if arredondado:
        d.rounded_rectangle((0, 0, grande - 1, grande - 1), radius=grande // 5, fill=VERDE)
    else:
        d.rectangle((0, 0, grande, grande), fill=VERDE)
    fonte = ImageFont.truetype(FONTE, int(grande * escala_peca))
    x0, y0, x1, y1 = d.textbbox((0, 0), '\u265e', font=fonte)
    d.text(((grande - (x1 - x0)) / 2 - x0, (grande - (y1 - y0)) / 2 - y0), '\u265e', font=fonte, fill=CLARO)
    return img.resize((tamanho, tamanho), Image.LANCZOS)


SAIDA.mkdir(parents=True, exist_ok=True)
desenhar(192, True, 0.72).save(SAIDA / 'icone-192.png')
desenhar(512, True, 0.72).save(SAIDA / 'icone-512.png')
# "maskable": fundo cheio e peça dentro da zona segura (80% central).
desenhar(512, False, 0.52).save(SAIDA / 'icone-maskable-512.png')
desenhar(180, False, 0.66).convert('RGB').save(SAIDA / 'apple-touch-icon.png')
desenhar(64, True, 0.78).save(SAIDA / 'favicon-64.png')
print('ícones gerados em', SAIDA)
