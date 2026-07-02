import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Badge, BadgeIndicator, badgeIndicatorPrefixCls, badgePrefixCls } from './index'

const badgeCss = readFileSync(new URL('./badge.module.css', import.meta.url), 'utf8')
const badgeSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports prefix classes and indicator primitive', () => {
  expect(badgePrefixCls).toBe('rk-badge')
  expect(badgeIndicatorPrefixCls).toBe('rk-badge-indicator')
  expect(BadgeIndicator).toBeTruthy()
})

test('renders a standalone count badge with overflow text', () => {
  const html = renderToString(
    createElement(Badge, {
      className: 'custom-badge',
      count: 128,
      material: 'primary',
      maxCount: 99,
      rootClassName: 'app-badge',
    }),
  )

  expect(html).toContain('rk-badge')
  expect(html).toContain('rk-badge-indicator')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('app-badge')
  expect(html).toContain('custom-badge')
  expect(html).toContain('99+')
  expect(html).toContain('var(--rk-primary)')
})

test('renders floating dot badges and hides zero by default', () => {
  const dotHtml = renderToString(
    createElement(Badge, { dot: true }, createElement('span', { className: 'target' }, 'Notice')),
  )
  const zeroHtml = renderToString(createElement(Badge, { count: 0 }, 'Notice'))
  const visibleZeroHtml = renderToString(createElement(Badge, { count: 0, showZero: true }))

  expect(dotHtml).toContain('target')
  expect(dotHtml).toContain('aria-hidden="true"')
  expect(dotHtml).toContain('rk-badge-indicator')
  expect(zeroHtml).not.toContain('rk-badge-indicator')
  expect(visibleZeroHtml).toContain('rk-badge-indicator')
  expect(visibleZeroHtml).toContain('0')
})

test('uses material and roco shape for the badge indicator', () => {
  expect(badgeSource).toContain("import { Material, type MaterialPreset } from '../material'")
  expect(badgeSource).toContain("import { RocoShape, type RocoShapeVariant } from '../roco-shape'")
  expect(badgeSource).toContain('<Material asChild material={material}>')
  expect(badgeSource).toContain('<RocoShape')
  expect(badgeSource).toContain("shape={isDot ? 'circle' : 'stretch'}")
  expect(badgeSource).toContain('variant={variant}')
  expect(badgeCss).toContain('--rk-badge-height: 20px;')
  expect(badgeCss).toContain('--rk-badge-dot-size: 8px;')
  expect(badgeCss).toContain('position: absolute;')
  expect(badgeCss).toContain('transform: translate(50%, -50%);')
})
