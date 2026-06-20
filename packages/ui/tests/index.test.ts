import { readFileSync } from 'node:fs'
import { expect, test } from 'vite-plus/test'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import packageJson from '../package.json' with { type: 'json' }
import {
  Button,
  ButtonNormal,
  RocoProvider,
  RocoShape,
  RuneText,
  buttonNormalPrefixCls,
  buttonPrefixCls,
  runeTextPrefixCls,
  rocoShapePrefixCls,
} from '../src/index.ts'

const baseStyleCss = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')
const fontCss = readFileSync(new URL('../src/font.css', import.meta.url), 'utf8')
const decorativeFontCss = readFileSync(
  new URL('../src/decorative-font.css', import.meta.url),
  'utf8',
)

test('exports a single button prefix class', () => {
  expect(buttonPrefixCls).toBe('rk-button')
  expect(buttonNormalPrefixCls).toBe('rk-button-normal')
  expect(rocoShapePrefixCls).toBe('rk-roco-shape')
  expect(runeTextPrefixCls).toBe('rk-rune-text')
})

test('renders an svg-backed React button component with css module classes', () => {
  const html = renderToString(
    createElement(Button, {
      children: 'Start',
      className: 'custom-button',
      material: 'stone',
      rootClassName: 'app-button',
      size: 'large',
      variant: 'outline',
    }),
  )

  expect(html).toContain('<button')
  expect(html).toContain('<svg')
  expect(html).toContain('<path')
  expect(html).toContain('rk-button')
  expect(html).toContain('app-button')
  expect(html).toContain('custom-button')
  expect(html).toContain('type="button"')
})

test('passes the optional shadow prop from button to its shape', () => {
  const defaultHtml = renderToString(createElement(Button, { children: 'Plain' }))
  const shadowHtml = renderToString(createElement(Button, { children: 'Raised', shadow: true }))

  expect(defaultHtml).not.toContain('withShadow')
  expect(shadowHtml).toContain('withShadow')
})

test('renders the reusable roco shape component', () => {
  const html = renderToString(
    createElement(RocoShape, {
      className: 'custom-shape',
      rootClassName: 'app-shape',
      variant: 'outline',
    }),
  )

  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('app-shape')
  expect(html).toContain('custom-shape')
  expect(html).toContain('<svg')
  expect(html).toContain('<path')
  expect(html.match(/<path/g)).toHaveLength(3)
})

test('renders solid roco shape without a stroke layer', () => {
  const html = renderToString(createElement(RocoShape))

  expect(html).toContain('rk-roco-shape')
  expect(html).not.toContain('withShadow')
  expect(html.match(/<path/g)).toHaveLength(2)
})

test('renders roco shape shadow only when enabled', () => {
  const html = renderToString(createElement(RocoShape, { shadow: true }))

  expect(html).toContain('withShadow')
  expect(html.match(/<path/g)).toHaveLength(2)
})

test('renders the previous capsule button as button normal', () => {
  const html = renderToString(
    createElement(ButtonNormal, {
      children: 'Start',
      className: 'custom-button',
      material: 'stone',
      rootClassName: 'app-button',
      size: 'large',
      variant: 'outline',
    }),
  )

  expect(html).toContain('<button')
  expect(html).not.toContain('<svg')
  expect(html).toContain('rk-button-normal')
  expect(html).toContain('app-button')
  expect(html).toContain('custom-button')
  expect(html).toContain('type="button"')
})

test('renders a color variable provider without extra markup', () => {
  const html = renderToString(
    createElement(
      RocoProvider,
      {
        colors: {
          onPrimary: '#10201a',
          primary: '#6ee7b7',
        },
      },
      createElement(Button, {
        children: 'Scoped',
      }),
    ),
  )

  expect(html).not.toContain('<div')
  expect(html).not.toContain('--rk-primary:#6ee7b7')
  expect(html).not.toContain('--rk-on-primary:#10201a')
  expect(html).toContain('Scoped')
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

test('keeps font registration out of the base style entry', () => {
  expect(baseStyleCss).not.toContain('@font-face')
  expect(fontCss).toContain('@font-face')
  expect(fontCss).toContain('Roco Kingdom Sans')
  expect(decorativeFontCss).toContain('@font-face')
  expect(decorativeFontCss).toContain('Roco Kingdom Rune')
})

test('only exposes root components and manual style/font entries', () => {
  expect(packageJson.exports).toEqual({
    '.': {
      types: './dist/index.d.mts',
      import: './dist/index.mjs',
    },
    './decorative-font.css': './dist/decorative-font.css',
    './font.css': './dist/font.css',
    './fonts/roco-kingdom-rune.ttf': './dist/fonts/roco-kingdom-rune.ttf',
    './fonts/roco-kingdom-sans.ttf': './dist/fonts/roco-kingdom-sans.ttf',
    './style.css': './dist/style.css',
    './package.json': './package.json',
  })
  expect(packageJson.exports).not.toHaveProperty('./button')
  expect(packageJson.sideEffects).toEqual(['**/*.css'])
})
