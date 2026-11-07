# SPEC — Treinador de Aberturas (MCO)

## 1. Objetivo
Site estático para memorizar as linhas de abertura do livro *Modern Chess Openings*. O usuário (nível iniciante) estuda cada linha no tabuleiro, lê uma **dica explicando o motivo de cada lance** e depois treina jogando de memória, com repetição espaçada.

Primeiro capítulo: **Defesa dos Dois Cavalos**, colunas 1–24 + linha bônus (Fried Liver), em `data/openings/dois-cavalos.json` (anexo a esta spec).

## 2. Stack
- Vite + Vue 3 (Composition API, `<script setup>`) + TypeScript, sem backend (deploy em qualquer hospedagem estática).
- `chess.js` para regras, SAN e FEN.
- `chessground` (tabuleiro do Lichess) para arrastar/tocar peças e desenhar setas.
- Persistência em `localStorage` (com try/catch) e exportação/importação em JSON.
- Mobile-first; PWA opcional (funcionar offline).
- Testes com Vitest.

## 3. Dados
### 3.1 Formato do arquivo de abertura
```jsonc
{
  "id": "two-knights",
  "nome": "Defesa dos Dois Cavalos",
  "base": "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6",
  "corPadrao": "b",                            // opcional: "w", "b" ou "ambas" (padrão: "ambas")
  "grupos": [{ "id": "...", "nome": "...", "colunas": [1,2,3] }],
  "linhas": [{
    "id": "c01", "coluna": 1, "grupo": "ng5-na5", "bonus": false,
    "nome": "9.Nf3 e4 10.Ne5 Bd6 11.d4",
    "lances": "1. e4 e5 ... 16. h3 Ba6",      // PGN simples, SAN em inglês
    "avaliacao": "±",                          // pode ser null
    "resumo": "Ideia geral da linha",
    "dicas": { "11... exd3": "Captura en passant! ..." } // chave = "N. LANCE" (brancas) ou "N... LANCE" (pretas)
  }]
}
```
Novos capítulos = novos arquivos JSON no mesmo formato; o app lista todos de `data/openings/*.json` (via `import.meta.glob`).

### 3.2 Carga e validação (obrigatório)
Os lances foram transcritos de fotos do livro, então **pode haver erro de leitura**:
1. Para cada linha, jogar os lances com `chess.js` a partir da posição inicial.
2. Lance ilegal → registrar erro (`linha`, `lance`, `FEN`) no console e numa tela **"Diagnóstico"**, desativando só aquela linha.
3. Teste Vitest que falha se alguma linha tiver lance ilegal ou se alguma chave de `dicas` não corresponder a um lance da linha (número + cor + SAN).

### 3.3 Árvore
Mesclar todas as linhas numa árvore de posições:
- Nó = posição (FEN sem contadores de lance). Aresta = lance SAN.
- Linhas com o mesmo prefixo compartilham nós (ex.: colunas 1–4 até 9.Nf3 e4).
- **Dicas ficam na aresta** (posição + lance). Se duas linhas trazem dica para a mesma aresta, usar a primeira não vazia. Por isso as dicas dos lances em comum aparecem só na primeira linha do JSON e valem para todas.
- Cada aresta guarda a lista de linhas (`ids`) que passam por ela.

### 3.4 Notas de rodapé
O JSON tem também o array `notas` (156 sublinhas — todas as notas do capítulo). Cada nota é uma **linha completa desde o 1º lance**, então entra na mesma árvore da seção 3.3 sem lógica especial:
```jsonc
{
  "id": "c01-b-A", "nota": "b", "rotulo": "(b) A", "coluna": 1,
  "linhaBase": "c01",          // coluna ou outra nota (sub-notas entre parênteses)
  "desvioNoLance": 25,         // ply (1 = 1.e4) onde sai da linha base
  "lances": "1. e4 e5 ... 18. Nc3 Rad8",
  "avaliacao": "∓", "referencia": "Ljubojević–van der Sterren, Wijk aan Zee 1988",
  "comentario": "texto curto em português",
  "conferir": "trecho cortado na foto"   // opcional
}
```
- Na árvore, a aresta onde a nota desvia recebe um selo **"Nota (b) A"**. Ao entrar nela, mostrar `comentario`, `referencia` e `avaliacao`.
- Notas com `conferir` aparecem na tela Diagnóstico com aviso amarelo, e não entram no Treino até o usuário marcá-las como conferidas.
- Se o JSON tiver `notasPendentes` (string), exibir no Diagnóstico como parte ainda não transcrita.

## 4. Telas e modos
### 4.1 Início
Lista de capítulos → grupos → linhas, com: nome, coluna, avaliação final, progresso (% dominado) e próximas revisões pendentes. Botão "Revisar agora" (fila SRS do dia).

### 4.2 Explorar (árvore)
- Tabuleiro + lista de lances em formato de árvore (ramificações recolhíveis).
- Clicar em um lance leva à posição; setas mostram todos os lances do livro naquela posição (largura da seta proporcional ao número de linhas).
- Painel **Dica** mostra a explicação do último lance jogado e o `resumo` da linha quando houver uma única linha ativa.

### 4.3 Estudo guiado
- Escolhe uma linha; botões ◀ ▶ (e setas do teclado / swipe no celular).
- A cada lance: anima a peça, destaca origem/destino, mostra a dica do lance (se houver) num card abaixo do tabuleiro.
- Ao final: mostra `resumo` e `avaliacao` com legenda dos símbolos (± ⩲ = ∓ ∞).

### 4.4 Treino (jogar de memória)
- Usuário escolhe a cor (brancas, pretas ou ambas) e o escopo (linha, grupo ou capítulo inteiro).
- Opção **Profundidade**: "só colunas" (padrão para iniciantes) ou "colunas + notas". Com notas, cada nota vira uma unidade de revisão própria; o adversário pode desviar para uma nota e o usuário precisa saber responder.
- O app joga os lances do adversário automaticamente (com pequeno atraso). Quando há mais de uma continuação do adversário no escopo, sorteia priorizando as linhas com revisão pendente.
- Na vez do usuário:
  - **Acertou** → feedback verde, e a dica do lance aparece por ~2s (ou até tocar), reforçando o *porquê*.
  - **Lance legal mas fora do livro** → feedback vermelho, mostra seta do lance certo + a dica dele, desfaz e pede para jogar o certo.
  - **Botão "Pista"** (custa pontuação): 1º toque destaca a peça que deve mover; 2º toque mostra a dica do lance sem revelar a casa; 3º mostra a seta.
  - Se a posição tem mais de um lance do livro para o usuário, qualquer um deles é aceito e conta para a linha correspondente.
- Fim da linha: placar (acertos, erros, pistas), resumo da linha e botão "Próxima".

### 4.5 Quiz "Por quê?" (opcional, fase 2)
Mostra a posição e o lance jogado; o usuário escolhe entre 3 dicas qual explica o lance (2 distratoras sorteadas de outras dicas do capítulo).

### 4.6 Diagnóstico
Lista de erros de validação (seção 3.2) e estatísticas do arquivo (linhas, lances, dicas).

## 5. Repetição espaçada
- Unidade de revisão = **linha + cor treinada**.
- Algoritmo SM-2 simplificado: nota 5 sem erros/pistas, 3 com pistas, 1 com erro. Intervalos 1d → 3d → 7d → … (fator de facilidade padrão 2.5, mínimo 1.3).
- Registrar também erros por aresta, para mostrar "lances em que você mais erra" na tela inicial e priorizar essas linhas.
- Linhas novas entram no máximo 5 por dia (configurável), somando todos os capítulos. No "Revisar agora", as vagas são repartidas em rodízio, começando pelos capítulos menos iniciados; treinar um capítulo diretamente pode usar todas as vagas restantes.
- A cor treinada é guardada por capítulo; sem escolha do usuário, vale `corPadrao`.

## 6. Configurações
- Notação: SAN em inglês (padrão) ou em português (R, D, T, B, C).
- Mostrar dicas no treino: sempre / só ao errar / nunca.
- Velocidade da animação, som on/off, orientação do tabuleiro automática pela cor treinada.
- Exportar/importar progresso (JSON) e resetar.

## 7. UI
- Mobile-first: tabuleiro ocupa a largura da tela; dica em card logo abaixo; navegação por swipe.
- Tema claro/escuro.
- Dicas curtas e legíveis (fonte ≥ 16px), com o lance em destaque no início do card (ex.: **11...exd3**).

## 8. Critérios de aceite
0. As 25 linhas e as 156 notas carregam na mesma árvore; nota (b) A da coluna 1 aparece como ramo em 13.g3.
1. Todas as 25 linhas do JSON carregam sem lance ilegal, ou aparecem no Diagnóstico com o lance exato que falhou.
2. Na árvore, as colunas 1–6 compartilham o tronco até 8...h6 e se dividem em 9.Nf3 / 9.Nh3.
3. No modo Estudo, a dica de "11...exd3" (en passant) aparece ao chegar nesse lance, e a dica de "4. Ng5" aparece em qualquer linha das colunas 1–12.
4. No Treino com as pretas na coluna 5, o app joga 9.Nh3 e aceita só 9...Bc5; um lance errado mostra a seta e a dica correta.
5. Progresso sobrevive a recarregar a página e pode ser exportado/importado.
6. `npm test` valida dados e a mesclagem da árvore.

## 9. Importar/exportar PGN
- Exportar qualquer capítulo como PGN com variantes e comentários (dicas + notas), no mesmo formato de `dois-cavalos.pgn`, que importa num Estudo do Lichess.
- Fase 2: importar PGN com variantes para criar novos capítulos.

## 10. Fora do escopo (por enquanto)
Engine/análise, login/sincronização, importação automática de fotos. Novos capítulos serão adicionados manualmente como JSON.
