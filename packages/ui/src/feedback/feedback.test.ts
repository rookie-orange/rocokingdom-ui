import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Alert, Empty, Progress, Result, Skeleton, Spin } from './index'

const feedbackSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('renders alert through material and roco shape primitives', () => {
  const html = renderToString(
    createElement(Alert, {
      closable: true,
      description: 'Check the route.',
      status: 'warning',
      title: 'Notice',
    }),
  )
  expect(html).toContain('rk-alert')
  expect(html).toContain('rk-material')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('Close alert')
})

test('renders loading, skeleton and both progress modes accessibly', () => {
  const spin = renderToString(createElement(Spin, { label: 'Loading map' }))
  const skeleton = renderToString(createElement(Skeleton, { active: true, width: 120 }))
  const line = renderToString(createElement(Progress, { percent: 42 }))
  const circle = renderToString(createElement(Progress, { percent: 64, type: 'circle' }))
  expect(spin).toContain('Loading map')
  expect(skeleton).toContain('rk-skeleton')
  expect(line).toContain('aria-valuenow="42"')
  expect(circle).toContain('<svg')
  expect(feedbackSource).toContain("import * as RadixProgress from '@radix-ui/react-progress'")
})

test('shares result presentation with empty states', () => {
  expect(renderToString(createElement(Result, { status: 'success', title: 'Done' }))).toContain(
    'Done',
  )
  expect(renderToString(createElement(Empty, null))).toContain('No data')
})
