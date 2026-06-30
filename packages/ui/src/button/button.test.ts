import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Button, buttonPrefixCls } from './index'

const buttonCss = readFileSync(new URL('./button.module.css', import.meta.url), 'utf8')
const buttonSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(buttonPrefixCls).toBe('rk-button')
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
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('app-button')
  expect(html).toContain('custom-button')
  expect(html).toContain('type="button"')
  expect(html).toContain('rk-rune-text')
})

test('uses roco shape as the button root color primitive', () => {
  expect(buttonSource).toContain("import { Material, type MaterialPreset } from '../material'")
  expect(buttonSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(buttonSource).toContain("import { RuneText } from '../rune-text'")
  expect(buttonSource).toContain('<Material')
  expect(buttonSource).toContain('<RocoShape')
  expect(buttonSource).toContain('as="button"')
  expect(buttonSource).toContain('material={material}')
  expect(buttonSource).toContain('<Material asChild material={material}>')
  expect(buttonSource).toContain('variant={variant}')
  expect(buttonSource).toContain('<RuneText className={styles.content}>')
  expect(buttonSource).not.toContain('color={variant ===')
  expect(buttonSource).not.toContain('<button className={resolvedClassName}')
  expect(buttonCss).toContain('height: var(--rk-control-height-middle, 32px);')
  expect(buttonCss).toContain('padding: 2px var(--rk-control-padding-inline-middle, 18px);')
  expect(buttonCss).not.toContain('position: absolute;')
  expect(buttonCss).not.toContain('z-index:')
  expect(buttonCss).not.toContain('--rk-button-')
  expect(buttonCss).not.toContain('--rk-rune-text-')
})

test('passes the optional shadow prop from button to its shape', () => {
  const defaultHtml = renderToString(createElement(Button, { children: 'Plain' }))
  const shadowHtml = renderToString(createElement(Button, { children: 'Raised', shadow: true }))

  expect(defaultHtml).not.toContain('withShadow')
  expect(shadowHtml).toContain('withShadow')
})

test('pins button sizes with explicit heights in flex rows', () => {
  expect(buttonCss).toContain('box-sizing: border-box;')
  expect(buttonCss).toContain('height: var(--rk-control-height-middle, 32px);')
  expect(buttonCss).not.toContain('\n  height: var(--rk-button-height);')
  expect(buttonCss).not.toContain('min-height: var(--rk-button-height);')
})
