import { mkdir, writeFile } from 'node:fs/promises'

const distDir = new URL('../dist/', import.meta.url)
await mkdir(distDir, { recursive: true })

const { buttonCss } = await import('../dist/index.mjs')

await writeFile(new URL('../dist/button.css', import.meta.url), `${buttonCss}\n`)
