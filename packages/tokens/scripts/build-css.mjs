import { mkdir, writeFile } from 'node:fs/promises'

const distDir = new URL('../dist/', import.meta.url)
await mkdir(distDir, { recursive: true })

const { tokensCss } = await import('../dist/index.mjs')

await writeFile(new URL('../dist/tokens.css', import.meta.url), `${tokensCss}\n`)
