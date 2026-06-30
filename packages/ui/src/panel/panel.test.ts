import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Panel, panelPrefixCls } from './index'

const panelCss = readFileSync(new URL('./panel.module.css', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(panelPrefixCls).toBe('rk-panel')
})

test('renders a reusable curved panel', () => {
  const html = renderToString(
    createElement(
      Panel,
      {
        className: 'custom-panel',
        contentClassName: 'panel-content',
        curve: 'left',
        curveInset: 112,
        material: 'stone',
        rootClassName: 'app-panel',
      },
      'Announcements',
    ),
  )

  expect(html).toContain('rk-panel')
  expect(html).toContain('app-panel')
  expect(html).toContain('custom-panel')
  expect(html).toContain('panel-content')
  expect(html).toContain('stone')
  expect(html).toContain('left')
  expect(html).toContain('<svg')
  expect(html).toContain('<path')
  expect(html).toContain('--rk-panel-curve-inset:112px')
  expect(html).toContain('Announcements')
})

test('styles panel curves with svg shape padding insets', () => {
  expect(panelCss).toContain('.curved')
  expect(panelCss).toContain('.shapePath')
  expect(panelCss).toContain('fill: currentColor;')
  expect(panelCss).toContain('.left .content')
  expect(panelCss).toContain('.right .content')
  expect(panelCss).toContain('.top .content')
  expect(panelCss).toContain('.bottom .content')
  expect(panelCss).toContain('var(--rk-panel-curve-inset)')
})
