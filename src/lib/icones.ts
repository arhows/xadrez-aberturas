/**
 * Desenhos dos ícones (miolo de um <svg> 24×24 de traço). Ficam no código, sem arquivos nem
 * biblioteca, no mesmo traço dos ícones da barra de navegação.
 */
export const DESENHOS = {
  peao: '<circle cx="12" cy="6.5" r="2.5"/><path d="M10 10.5h4M10.5 10.5 9 17h6l-1.5-6.5M7.5 17h9v3.5h-9z"/>',
  livro: '<path d="M12 6.5C10.5 5 8 4.5 4 4.5v13c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-13c-4 0-6.5.5-8 2z"/><path d="M12 6.5v13"/>',
  alerta: '<path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17.2v.3"/>',
  mapa: '<path d="m9 4.5-5.5 2v13l5.5-2 6 2 5.5-2v-13l-5.5 2z"/><path d="M9 4.5v13M15 6.5v13"/>',
  mira: '<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22"/>',
  escada: '<path d="M3.5 20h4.5v-5h4.5v-5h4.5V5h3.5"/>',
  raio: '<path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z"/>',
  repetir:
    '<path d="M4.5 11a7.5 7.5 0 0 1 13-4.6l2 2.1"/><path d="M19.5 4v4.5H15"/><path d="M19.5 13a7.5 7.5 0 0 1-13 4.6l-2-2.1"/><path d="M4.5 20v-4.5H9"/>',
  lampada: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  erro: '<circle cx="12" cy="12" r="8.5"/><path d="m9 9 6 6M15 9l-6 6"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
  pessoas:
    '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 20c.6-3.5 3.2-5.5 6.5-5.5s5.9 2 6.5 5.5"/><path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c2 .7 3.2 2.5 3.5 5.2"/>',
  lista: '<rect x="4" y="3.5" width="16" height="17" rx="2"/><path d="M8 8.5h8M8 12h8M8 15.5h5"/>',
  lapis: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  prancheta: '<rect x="5" y="4.5" width="14" height="16.5" rx="2"/><path d="M9 4.5V3h6v1.5"/><path d="m9 13 2 2 4-4.5"/>',
  lupa: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/><circle cx="10.5" cy="9" r="2"/><path d="M7.3 14.2c.7-1.5 1.8-2.2 3.2-2.2s2.5.7 3.2 2.2"/>',
  trofeu:
    '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4.5v1.5A3.5 3.5 0 0 0 8 11M16 6h3.5v1.5A3.5 3.5 0 0 1 16 11"/><path d="M12 13v4M8.5 20.5h7"/>',
  grafico: '<path d="M4 20h16"/><path d="M7 20v-6M12 20V8M17 20v-9"/>',
  pulso: '<path d="M3 12h4l2.5-6 5 12 2.5-6h4"/>',
  ajustes: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  aprender: '<path d="M5 18V6a2.5 2.5 0 0 1 2.5-2.5H19v13H7.5A2.5 2.5 0 0 0 5 19a2 2 0 0 0 2 2h12v-4.5"/>',
  praticar: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/>',
  jogar: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 12h17M12 3.5v17"/>',
} as const

export type NomeDoIcone = keyof typeof DESENHOS
