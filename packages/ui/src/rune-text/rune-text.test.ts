import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { RuneText, runeTextPrefixCls } from './index'

const runeTextCss = readFileSync(new URL('./rune-text.module.css', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(runeTextPrefixCls).toBe('rk-rune-text')
})

test('renders rune text without registering fonts from JavaScript', () => {
  const html = renderToString(
    createElement(RuneText, {
      as: 'strong',
      children: 'Rune',
      className: 'custom-text',
      rootClassName: 'app-text',
    }),
  )

  expect(html).toContain('<strong')
  expect(html).toContain('rk-rune-text')
  expect(html).toContain('app-text')
  expect(html).toContain('custom-text')
  expect(html).toContain('Rune')
})

test('uses roco base font by default and keeps rune text explicit', () => {
  const defaultHtml = renderToString(createElement(RuneText, null, 'Base'))
  const runeHtml = renderToString(createElement(RuneText, { font: 'rune' }, 'Rune'))

  expect(defaultHtml).toContain('Base')
  expect(runeHtml).toContain('Rune')
  expect(runeTextCss).toContain('.base')
  expect(runeTextCss).toContain('.rune')
  expect(runeTextCss).not.toContain('--rk-rune-text-')
  expect(runeTextCss).toContain('var(--rk-font-family-base, inherit)')
  expect(runeTextCss).toContain(
    'var(--rk-font-family-decorative, var(--rk-font-family-rune, inherit))',
  )
})
