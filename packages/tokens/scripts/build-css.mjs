import { mkdir, writeFile } from 'node:fs/promises'

const distDir = new URL('../dist/', import.meta.url)
await mkdir(distDir, { recursive: true })

const { createThemeCss, createTokensCss, tokens } = await import('../dist/index.mjs')

await Promise.all([
  writeFile(new URL('../dist/tokens.css', import.meta.url), `${createTokensCss()}\n`),
  writeFile(
    new URL('../dist/light.css', import.meta.url),
    `${createThemeCss('light', { selector: ':root' })}\n`,
  ),
  writeFile(
    new URL('../dist/dark.css', import.meta.url),
    `${createThemeCss('dark', { selector: ':root' })}\n`,
  ),
  writeFile(
    new URL('../dist/tokens.json', import.meta.url),
    `${JSON.stringify(tokens, null, 2)}\n`,
  ),
])
