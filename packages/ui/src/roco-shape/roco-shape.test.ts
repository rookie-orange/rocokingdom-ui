import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { RocoShape, rocoShapePrefixCls } from './index'

const baseStyleCss = readFileSync(new URL('../style.css', import.meta.url), 'utf8')
const rocoShapeCss = readFileSync(new URL('./roco-shape.module.css', import.meta.url), 'utf8')
const rocoShapeSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(rocoShapePrefixCls).toBe('rk-roco-shape')
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
  expect(rocoShapeSource).not.toContain('forwardRef')
  expect(rocoShapeSource).toContain('ComponentPropsWithRef')
  expect(rocoShapeSource).toContain('export function RocoShape')
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
  expect(baseStyleCss).toContain('--rk-shadow-soft-color: rgb(36 38 40 / 0.08);')
  expect(baseStyleCss).toContain('--rk-shadow-color: rgb(36 38 40 / 0.16);')
  expect(baseStyleCss).toContain('--rk-shadow-strong-color: rgb(36 38 40 / 0.32);')
  expect(rocoShapeCss).toContain('filter: drop-shadow(0 2px 0 var(--rk-shadow-strong-color));')
  expect(rocoShapeCss).not.toContain('--rk-roco-shape-shadow')
})

test('renders fixed roco shape paths for circle and square', () => {
  const circleHtml = renderToString(
    createElement(RocoShape, { shape: 'circle', variant: 'outline' }),
  )
  const squareHtml = renderToString(createElement(RocoShape, { shape: 'square' }))

  expect(circleHtml).toContain('M0.858625 19.4179')
  expect(circleHtml.match(/<path/g)).toHaveLength(1)
  expect(squareHtml).toContain('M3.51624 2.91328')
  expect(squareHtml.match(/<path/g)).toHaveLength(1)
  expect(rocoShapeCss).toContain('stroke-width: 1px;')
  expect(rocoShapeCss).not.toContain('--rk-roco-shape-fixed-stroke-width')
})

test('renders roco shape as a content surface with material colors', () => {
  const html = renderToString(
    createElement(
      RocoShape,
      {
        background: 'var(--rk-stone)',
        color: 'var(--rk-on-stone)',
        contentClassName: 'shape-label',
        style: { height: 44, width: 180 },
      },
      '今日活动',
    ),
  )

  expect(html.startsWith('<span class="rk-roco-shape')).toBe(true)
  expect(html).toContain('withContent')
  expect(html).toContain('shape-label')
  expect(html).toContain('--rk-roco-shape-background:var(--rk-stone)')
  expect(html).toContain('--rk-roco-shape-color:var(--rk-on-stone)')
  expect(rocoShapeSource).not.toContain("from '../material'")
  expect(rocoShapeSource).not.toContain('materialStyles')
  expect(rocoShapeSource).not.toContain('material?:')
  expect(rocoShapeSource).toContain("shapeStyle['--rk-roco-shape-background'] = background")
  expect(rocoShapeSource).toContain("shapeStyle['--rk-roco-shape-color'] = color")
  expect(rocoShapeSource).not.toContain("shapeStyle['--rk-material-background'] = background")
  expect(rocoShapeSource).not.toContain("shapeStyle['--rk-material-color'] = color")
  expect(html).not.toContain('aria-hidden="true" class="rk-roco-shape')
  expect(html).toContain('今日活动')
  expect(html.match(/aria-hidden="true"/g)).toHaveLength(1)
  expect(rocoShapeCss).toContain('.shape.shape')
  expect(rocoShapeCss).toContain('background: transparent;')
})
