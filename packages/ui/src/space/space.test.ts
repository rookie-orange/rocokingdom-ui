import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Space, Stack, spacePrefixCls, stackPrefixCls } from './index'

const spaceCss = readFileSync(new URL('./space.module.css', import.meta.url), 'utf8')

test('exports prefix classes', () => {
  expect(spacePrefixCls).toBe('rk-space')
  expect(stackPrefixCls).toBe('rk-stack')
})

test('renders a wrapping horizontal space with split content', () => {
  const html = renderToString(
    createElement(
      Space,
      {
        align: 'start',
        className: 'custom-space',
        justify: 'between',
        rootClassName: 'app-space',
        size: ['small', 20],
        split: '/',
        wrap: true,
      },
      createElement('span', null, '背包'),
      createElement('span', null, '宠物'),
      createElement('span', null, '任务'),
    ),
  )

  expect(html).toContain('rk-space')
  expect(html).toContain('app-space')
  expect(html).toContain('custom-space')
  expect(html).toContain('data-direction="horizontal"')
  expect(html).toContain('--rk-space-column-gap:8px')
  expect(html).toContain('--rk-space-row-gap:20px')
  expect(html).toContain('--rk-space-align:flex-start')
  expect(html).toContain('--rk-space-justify:space-between')
  expect(html).toContain('aria-hidden="true"')
  expect(html).toContain('背包')
  expect(html).toContain('宠物')
  expect(html).toContain('任务')
})

test('renders stack as a vertical block space by default', () => {
  const html = renderToString(
    createElement(
      Stack,
      {
        as: 'section',
        className: 'custom-stack',
        size: 'large',
      },
      createElement('div', null, '标题'),
      createElement('div', null, '内容'),
    ),
  )

  expect(html).toContain('<section')
  expect(html).toContain('rk-stack')
  expect(html).toContain('custom-stack')
  expect(html).toContain('data-direction="vertical"')
  expect(html).toContain('--rk-space-column-gap:24px')
  expect(html).toContain('--rk-space-row-gap:24px')
})

test('styles space directions, wrapping and stack defaults', () => {
  expect(spaceCss).toContain('.horizontal')
  expect(spaceCss).toContain('.vertical')
  expect(spaceCss).toContain('.wrap')
  expect(spaceCss).toContain('.stack')
  expect(spaceCss).toContain('--rk-space-align: stretch;')
  expect(spaceCss).toContain('gap: var(--rk-space-row-gap) var(--rk-space-column-gap);')
})
