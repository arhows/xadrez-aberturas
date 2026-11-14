import json, sys, io
base = json.load(io.open(sys.argv[1], encoding='utf-8'))
# n: (brancas, pretas, local, abertura)
META = {
 1: ('Capablanca', 'Tartakower', 'Nova York', 'Defesa Holandesa'),
 2: ('Tal', 'Lisitsin', '', 'Defesa Siciliana (Dragão)'),
 3: ('Boleslavsky', 'Lisitsin', '', 'Defesa Siciliana (Dragão)'),
 4: ('Tarrasch', 'Thorold', 'Manchester', 'Defesa Francesa'),
 5: ('Rubinstein', 'Duras', '', 'Peão da Dama'),
 6: ('Mattison', 'Nimzowitsch', 'Karlsbad', 'Defesa Nimzoíndia'),
 7: ('Domenech', 'Flohr', '', 'Defesa Siciliana'),
 8: ('Petrosian', 'Kozali', '', 'Gambito da Dama recusado'),
 9: ('Fischer', 'Berliner', 'Nova York', 'Defesa Alekhine'),
 10: ('Smyslov', 'Reshevsky', '', 'Ruy Lopez'),
 11: ('Tartakower', 'Frentz', 'Paris', 'Abertura Inglesa'),
 12: ('Reshevsky', 'Najdorf', 'Dallas', 'Defesa Nimzoíndia'),
 13: ('Porges', 'Em. Lasker', 'Nuremberg', 'Ruy Lopez'),
 14: ('Petrosian', 'Korchnoi', '', 'Defesa Holandesa (Stonewall)'),
 15: ('Tarrasch', 'von Scheve', 'Leipzig', 'Gambito da Dama recusado'),
 16: ('Smyslov', 'Rudakovsky', 'Moscou', 'Defesa Siciliana (Scheveningen)'),
 17: ('Menchik', 'Capablanca', 'Hastings', 'Peão da Dama'),
 18: ('Em. Lasker', 'Tarrasch', 'São Petersburgo', 'Gambito da Dama recusado'),
 19: ('Kupferstich', 'Andreasen', '', 'Partida Vienense'),
 20: ('Rosenthal', 'Steinitz', 'Viena', 'Abertura dos Três Cavalos'),
 21: ('Tartakower', 'Domenech', '', 'Peão da Dama'),
 22: ('Tarrasch', 'Showalter', 'Viena', 'Abertura Italiana'),
 23: ('Barden', 'Rossolimo', '', 'Defesa Siciliana (Scheveningen)'),
 24: ('Alekhine', 'Yates', 'Londres', 'Gambito da Dama recusado'),
 25: ('Aganalian', 'Petrosian', '', 'Defesa Índia Antiga'),
 26: ('Bondarevsky', 'Smyslov', '', 'Ruy Lopez'),
 27: ('Tarrasch', 'Mieses', '', 'Defesa Eslava'),
 28: ('Foltys', 'Golombek', '', 'Defesa Siciliana (Dragão)'),
 29: ('Kashdan', 'Steiner', 'Pasadena', 'Sistema Colle'),
 30: ('Keres', 'Tarnowski', 'Helsinque', 'Ruy Lopez'),
 31: ('Botvinnik', 'Boleslavsky', '', 'Defesa Francesa'),
 32: ('Blackburne', 'Weiss', '', 'Ruy Lopez'),
 33: ('Weiss', 'Blackburne', '', 'Defesa Escandinava'),
 34: ('Panov', 'Taimanov', 'Moscou', 'Defesa Siciliana (fechada)'),
 35: ('Petrosian', 'Smyslov', 'Moscou', 'Defesa Índia da Dama'),
 36: ('Schlage', 'Réti', '', 'Defesa Siciliana'),
 37: ('Capablanca', 'Germann, Miller e Skillicorn (consulta)', 'Londres', 'Gambito da Dama recusado'),
 38: ('O. Bernstein', 'Mieses', 'Coburg', 'Defesa Siciliana'),
 39: ('Steinitz', 'Sellman', 'Baltimore', 'Defesa Francesa'),
 40: ('Burn', 'Znosko-Borovsky', 'Ostende', 'Defesa Tarrasch'),
 41: ('Marshall', 'Em. Lasker', '', 'Ruy Lopez'),
 42: ('Eliskases', 'Grünfeld', 'Mährisch-Ostrau', 'Abertura Italiana'),
 43: ('Schlechter', 'Mason', 'Monte Carlo', 'Defesa Philidor'),
 44: ('Chekhover', 'Rudakovsky', 'Moscou', 'Gambito da Dama recusado'),
 45: ('Tarrasch', 'Vogel', 'Nuremberg', 'Ruy Lopez'),
 46: ('Pillsbury', 'Showalter', '', 'Gambito da Dama recusado'),
 47: ('Schlechter', 'John', 'Barmen', 'Gambito da Dama recusado'),
 48: ('Mieses', 'Reshevsky', 'Margate', 'Defesa Caro-Kann'),
 49: ('Janowsky', 'Capablanca', 'Nova York', 'Defesa Eslava'),
 50: ('Pillsbury', 'Gunsberg', 'Hastings', 'Defesa Eslava'),
 51: ('Marshall', 'Capablanca', '', 'Defesa Tarrasch'),
 52: ('Botvinnik', 'Kan', '', 'Defesa Holandesa'),
 53: ('Zagoryansky', 'Romanovsky', '', 'Defesa Nimzoíndia'),
 54: ('Botvinnik', 'Vidmar', 'Groningen', 'Peão da Dama'),
 55: ('Bogoljubow', 'Réti', 'Mährisch-Ostrau', 'Defesa Francesa'),
 56: ('Rubinstein', 'Schlechter', 'San Sebastián', 'Gambito da Dama recusado'),
 57: ('Botvinnik', 'Kan', '', 'Defesa Siciliana (Scheveningen)'),
 58: ('Petrosian', 'Pachman', 'Bled', 'Abertura Réti'),
 59: ('Andric', 'Daja', '', 'Defesa Índia da Dama'),
 60: ('Marshall', 'Capablanca', 'Nova York', 'Gambito da Dama recusado'),
 61: ('Olafsson', 'Fischer', 'Portorož', 'Gambito da Dama recusado'),
 62: ('Evans', 'Opsahl', '', 'Gambito da Dama recusado'),
}
CONTEUDO = json.load(io.open(sys.argv[2], encoding='utf-8')) if len(sys.argv) > 3 else {}
saida = sys.argv[-1]
partidas = []
for b in base:
    n = b['n']; br, pr, local, ab = META[n]
    p = {'n': n, 'brancas': br, 'pretas': pr, 'local': local, 'ano': b['ano'], 'abertura': ab, 'resultado': b['resultado'], 'lances': b['lances']}
    p.update(CONTEUDO.get(str(n), {}))
    partidas.append(p)
json.dump({'partidas': partidas}, io.open(saida, 'w', encoding='utf-8', newline='\n'), ensure_ascii=False, indent=1)
print(len(partidas), 'partidas;', sum(1 for p in partidas if 'notas' in p), 'com notas')
