import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Input, inputPrefixCls } from './index'

const inputCss = readFileSync(new URL('./input.module.css', import.meta.url), 'utf8')
const inputSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(inputPrefixCls).toBe('rk-input')
})

test('renders a roco-shaped input with default stone material', () => {
  const html = renderToString(
    createElement(Input, {
      className: 'custom-input',
      inputClassName: 'field-input',
      placeholder: 'Search',
      prefix: 'ID',
      rootClassName: 'app-input',
      shadow: true,
      suffix: '#',
    }),
  )

  expect(html).toContain('<label')
  expect(html).toContain('<input')
  expect(html).toContain('<svg')
  expect(html).toContain('<path')
  expect(html).toContain('rk-input')
  expect(html).toContain('rk-input-control')
  expect(html).toContain('rk-material')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('app-input')
  expect(html).toContain('custom-input')
  expect(html).toContain('field-input')
  expect(html).toContain('placeholder="Search"')
  expect(html).toContain('type="text"')
  expect(html).toContain('withShadow')
  expect(html).toContain('--rk-material-background:var(--rk-stone)')
  expect(html).toContain('--rk-material-color:var(--rk-on-stone)')
  expect(html).toContain('ID')
  expect(html).toContain('#')
})

test('uses the shared button shape and stone material for input', () => {
  expect(inputSource).toContain("import { Material, type MaterialPreset } from '../material'")
  expect(inputSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(inputSource).toContain("material = 'stone'")
  expect(inputSource).toContain('<Material asChild material={material}>')
  expect(inputSource).toContain('as="label"')
  expect(inputSource).toContain('variant={variant}')
  expect(inputSource).toContain('ref?: Ref<HTMLInputElement>')
  expect(inputSource).toContain('ref={ref}')
  expect(inputSource).not.toContain('forwardRef')
  expect(inputCss).toContain('height: var(--rk-control-height-middle, 32px);')
  expect(inputCss).toContain('height: var(--rk-control-height-small, 24px);')
  expect(inputCss).toContain('height: var(--rk-control-height-large, 40px);')
  expect(inputCss).toContain('padding: 2px var(--rk-control-padding-inline-middle, 18px);')
  expect(inputCss).not.toContain(':focus-within')
  expect(inputCss).not.toContain('outline: 3px solid var(--rk-primary);')
  expect(inputCss).not.toContain('--rk-input-')
  expect(inputCss).not.toContain('--rk-roco-shape-')
})
