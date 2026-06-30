import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { ButtonNormal, buttonNormalPrefixCls } from './index'

const buttonNormalCss = readFileSync(new URL('./button-normal.module.css', import.meta.url), 'utf8')
const buttonNormalSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(buttonNormalPrefixCls).toBe('rk-button-normal')
})

test('supports semantic materials for lightweight controls', () => {
  expect(buttonNormalSource).toContain("import type { MaterialPreset } from '../material'")
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-paper-soft);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-paper-soft);')
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-paper-muted);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-paper-muted);')
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-paper-strong);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-paper-strong);')
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-stone-soft);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-stone-soft);')
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-stone-muted);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-stone-muted);')
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-stone-strong);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-stone-strong);')
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-primary-soft);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-primary-soft);')
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-primary-muted);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-primary-muted);')
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-primary-strong);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-primary-strong);')
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-success);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-success);')
  expect(buttonNormalCss).toContain('--rk-material-background: var(--rk-danger);')
  expect(buttonNormalCss).toContain('--rk-material-color: var(--rk-on-danger);')
  expect(buttonNormalCss).not.toContain('--rk-button-material')
  expect(buttonNormalCss).not.toContain('--rk-button-on-material')
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

test('pins button sizes with explicit heights in flex rows', () => {
  expect(buttonNormalCss).toContain('box-sizing: border-box;')
  expect(buttonNormalCss).toContain('height: var(--rk-control-height-small, 24px);')
  expect(buttonNormalCss).toContain('height: var(--rk-control-height-middle, 32px);')
  expect(buttonNormalCss).toContain('height: calc(var(--rk-control-height-large, 40px) + 8px);')
  expect(buttonNormalCss).not.toContain('min-height:')
})
