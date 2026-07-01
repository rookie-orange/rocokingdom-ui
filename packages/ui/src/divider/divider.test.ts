import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Divider, dividerPrefixCls } from './index'

const dividerCss = readFileSync(new URL('./divider.module.css', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(dividerPrefixCls).toBe('rk-divider')
})

test('renders a labeled horizontal divider', () => {
  const html = renderToString(
    createElement(
      Divider,
      {
        align: 'start',
        className: 'custom-divider',
        color: '#d89522',
        rootClassName: 'app-divider',
        thickness: 2,
        variant: 'dashed',
      },
      '任务奖励',
    ),
  )

  expect(html).toContain('role="separator"')
  expect(html).toContain('aria-orientation="horizontal"')
  expect(html).toContain('rk-divider')
  expect(html).toContain('app-divider')
  expect(html).toContain('custom-divider')
  expect(html).toContain('dashed')
  expect(html).toContain('start')
  expect(html).toContain('--rk-divider-color:#d89522')
  expect(html).toContain('--rk-divider-thickness:2px')
  expect(html).toContain('rk-divider-label')
  expect(html).toContain('任务奖励')
})

test('renders a vertical divider without label content', () => {
  const html = renderToString(
    createElement(
      Divider,
      {
        orientation: 'vertical',
        variant: 'dotted',
      },
      'ignored',
    ),
  )

  expect(html).toContain('aria-orientation="vertical"')
  expect(html).toContain('dotted')
  expect(html).not.toContain('ignored')
})

test('styles divider orientations and labeled rules', () => {
  expect(dividerCss).toContain('.horizontal')
  expect(dividerCss).toContain('.vertical')
  expect(dividerCss).toContain('--rk-divider-line-style: dashed;')
  expect(dividerCss).toContain('--rk-divider-line-style: dotted;')
  expect(dividerCss).toContain('.labeled::before')
  expect(dividerCss).toContain('.labeled::after')
  expect(dividerCss).toContain('var(--rk-divider-thickness)')
  expect(dividerCss).toContain('var(--rk-divider-color)')
})
