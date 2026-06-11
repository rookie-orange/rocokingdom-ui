import { expect, test } from 'vite-plus/test'
import {
  createThemeCss,
  createTokensCss,
  cssVar,
  material,
  rarity,
  semantic,
  tokens,
} from '../src/index.ts'

test('exposes material-first primitive tokens', () => {
  expect(material.paper).toBe('#f6f3ec')
  expect(material.stone).toBe('#2c2e31')
  expect(material.goldShadow).toBe('#ba9448')
  expect(rarity.legendary).toBe('#f7c24f')
})

test('builds semantic and component tokens from the game UI language', () => {
  expect(semantic.surface.dialogHeader).toBe('#252729')
  expect(tokens.component.button.variant.primary.background).toBe('#f6f3ec')
  expect(tokens.component.button.variant.secondary.color).toBe('#f7f5ef')
})

test('creates CSS variable references', () => {
  expect(cssVar('material.paper')).toBe('var(--rk-material-paper)')
  expect(cssVar('button.variant.primary.background', '#f6f3ec')).toBe(
    'var(--rk-button-variant-primary-background, #f6f3ec)',
  )
})

test('creates CSS for base tokens and themes', () => {
  const css = createTokensCss()

  expect(css).toContain('--rk-material-paper: #f6f3ec;')
  expect(css).toContain('--rk-rarity-legendary: #f7c24f;')
  expect(css).toContain(':root, [data-rk-theme="light"]')
  expect(css).toContain('[data-rk-theme="dark"]')
  expect(createThemeCss('dark', { selector: '.preview' })).toContain(
    '.preview {\n  --rk-surface-canvas: #1a1b1d;',
  )
})
