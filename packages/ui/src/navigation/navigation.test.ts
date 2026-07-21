import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Anchor, Menu, Pagination, Steps } from './index'

const navigationSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('renders menu items with active shape material', () => {
  const html = renderToString(
    createElement(Menu, {
      defaultSelectedKey: 'map',
      items: [
        { key: 'map', label: 'Map' },
        { disabled: true, key: 'bag', label: 'Bag' },
      ],
    }),
  )
  expect(html).toContain('aria-current="page"')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('--rk-material-background:var(--rk-primary)')
  expect(html).toContain('disabled')
  expect(navigationSource).toContain(
    "import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu'",
  )
})

test('renders bounded pagination with page semantics', () => {
  const html = renderToString(createElement(Pagination, { defaultCurrent: 6, total: 120 }))
  expect(html).toContain('aria-label="Pagination"')
  expect(html).toContain('aria-current="page"')
  expect(html).toContain('Previous page')
  expect(html).toContain('Next page')
})

test('renders steps and nested anchors', () => {
  const steps = renderToString(
    createElement(Steps, { current: 1, items: [{ title: 'Start' }, { title: 'Finish' }] }),
  )
  const anchor = renderToString(
    createElement(Anchor, {
      items: [{ children: [{ href: '#child', title: 'Child' }], href: '#root', title: 'Root' }],
    }),
  )
  expect(steps).toContain('aria-current="step"')
  expect(steps).toContain('var(--rk-success)')
  expect(anchor).toContain('href="#child"')
})
