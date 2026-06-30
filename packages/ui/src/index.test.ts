import { readFileSync } from 'node:fs'
import { expect, test } from 'vite-plus/test'
import packageJson from '../package.json' with { type: 'json' }

const baseStyleCss = readFileSync(new URL('./style.css', import.meta.url), 'utf8')
const fontCss = readFileSync(new URL('./font.css', import.meta.url), 'utf8')

test('keeps font registration out of the base style entry', () => {
  expect(baseStyleCss).not.toContain('@font-face')
  expect(fontCss).toContain('@font-face')
  expect(fontCss).toContain('Roco Kingdom Sans')
  expect(fontCss).toContain('Roco Kingdom Rune')
  expect(fontCss).toContain('--rk-font-family-base')
  expect(fontCss).toContain('--rk-font-family-rune')
  expect(fontCss).toContain('--rk-font-family-decorative')
})

test('only exposes root components and manual style/font entries', () => {
  expect(packageJson.exports).toEqual({
    '.': {
      types: './dist/index.d.mts',
      import: './dist/index.mjs',
    },
    './font.css': './dist/font.css',
    './fonts/roco-kingdom-rune.ttf': './dist/fonts/roco-kingdom-rune.ttf',
    './fonts/roco-kingdom-sans.ttf': './dist/fonts/roco-kingdom-sans.ttf',
    './style.css': './dist/style.css',
    './package.json': './package.json',
  })
  expect(packageJson.exports).not.toHaveProperty('./button')
  expect(packageJson.sideEffects).toEqual(['**/*.css'])
})

test('uses radix dialog as the modal interaction primitive', () => {
  expect(packageJson.dependencies).toMatchObject({
    '@radix-ui/react-dialog': 'catalog:',
  })
})
