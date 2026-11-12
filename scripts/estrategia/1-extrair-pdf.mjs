// Extrai o texto do PDF com a informação de negrito e tamanho de cada trecho.
// Uso: node extrair.mjs <pdf> <saida.json>
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire('C:/Users/Rogerio/AppData/Local/Temp/claude/7a92c1ab74b691a3/0c54a218-64bb-49ce-aa5e-50c0cf1c2c9c/scratchpad/pdfjs/package.json')
const pdfjs = await import('file:///' + require.resolve('pdfjs-dist/legacy/build/pdf.mjs').replace(/\\/g, '/'))

const [arquivo, saida] = process.argv.slice(2)
const doc = await pdfjs.getDocument({ data: new Uint8Array(readFileSync(arquivo)), verbosity: 0 }).promise
const trechos = []
for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p)
  const conteudo = await page.getTextContent()
  await page.getOperatorList()
  for (const item of conteudo.items) {
    const nome = page.commonObjs.has(item.fontName) ? page.commonObjs.get(item.fontName).name : item.fontName
    trechos.push({ p, b: /Bold/i.test(nome) ? 1 : 0, h: Math.round(item.height * 10) / 10, t: item.str, eol: item.hasEOL ? 1 : 0 })
  }
}
writeFileSync(saida, JSON.stringify(trechos))
console.log(doc.numPages, 'páginas,', trechos.length, 'trechos')
