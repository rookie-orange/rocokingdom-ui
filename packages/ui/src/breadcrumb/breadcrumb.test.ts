import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  breadcrumbEllipsisPrefixCls,
  breadcrumbItemPrefixCls,
  breadcrumbLinkPrefixCls,
  breadcrumbListPrefixCls,
  breadcrumbPagePrefixCls,
  breadcrumbPrefixCls,
  breadcrumbSeparatorPrefixCls,
} from './index'

const breadcrumbCss = readFileSync(new URL('./breadcrumb.module.css', import.meta.url), 'utf8')
const breadcrumbSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports prefix classes and compound parts', () => {
  expect(breadcrumbPrefixCls).toBe('rk-breadcrumb')
  expect(breadcrumbListPrefixCls).toBe('rk-breadcrumb-list')
  expect(breadcrumbItemPrefixCls).toBe('rk-breadcrumb-item')
  expect(breadcrumbLinkPrefixCls).toBe('rk-breadcrumb-link')
  expect(breadcrumbPagePrefixCls).toBe('rk-breadcrumb-page')
  expect(breadcrumbSeparatorPrefixCls).toBe('rk-breadcrumb-separator')
  expect(breadcrumbEllipsisPrefixCls).toBe('rk-breadcrumb-ellipsis')
  expect(BreadcrumbSeparator).toBeTruthy()
  expect(BreadcrumbEllipsis).toBeTruthy()
})

test('renders semantic breadcrumb navigation', () => {
  const html = renderToString(
    createElement(
      Breadcrumb,
      { className: 'custom-breadcrumb', rootClassName: 'app-breadcrumb' },
      createElement(
        BreadcrumbList,
        null,
        createElement(
          BreadcrumbItem,
          null,
          createElement(BreadcrumbLink, { href: '/docs' }, 'Docs'),
        ),
        createElement(BreadcrumbSeparator),
        createElement(BreadcrumbItem, null, createElement(BreadcrumbEllipsis)),
        createElement(BreadcrumbSeparator),
        createElement(BreadcrumbItem, null, createElement(BreadcrumbPage, null, 'Slider')),
      ),
    ),
  )

  expect(html).toContain('<nav')
  expect(html).toContain('aria-label="Breadcrumb"')
  expect(html).toContain('<ol')
  expect(html).toContain('<li')
  expect(html).toContain('rk-breadcrumb')
  expect(html).toContain('rk-breadcrumb-list')
  expect(html).toContain('rk-breadcrumb-item')
  expect(html).toContain('rk-breadcrumb-link')
  expect(html).toContain('rk-breadcrumb-page')
  expect(html).toContain('rk-breadcrumb-separator')
  expect(html).toContain('rk-breadcrumb-ellipsis')
  expect(html).toContain('app-breadcrumb')
  expect(html).toContain('custom-breadcrumb')
  expect(html).toContain('href="/docs"')
  expect(html).toContain('aria-current="page"')
  expect(html).toContain('More')
})

test('supports radix slot asChild links', () => {
  const html = renderToString(
    createElement(
      BreadcrumbLink,
      { asChild: true },
      createElement('span', { 'data-link': 'docs' }, 'Docs'),
    ),
  )

  expect(html).toContain('<span')
  expect(html).toContain('data-link="docs"')
  expect(html).toContain('rk-breadcrumb-link')
  expect(html).not.toContain('<a')
})

test('uses radix slot and keeps breadcrumb styles lightweight', () => {
  expect(breadcrumbSource).toContain("import * as Slot from '@radix-ui/react-slot'")
  expect(breadcrumbSource).toContain("const Link = asChild ? Slot.Root : 'a'")
  expect(breadcrumbSource).toContain('<nav')
  expect(breadcrumbSource).toContain('<ol')
  expect(breadcrumbSource).toContain('<li')
  expect(breadcrumbCss).toContain('list-style: none;')
  expect(breadcrumbCss).toContain('.link:focus-visible')
  expect(breadcrumbCss).toContain('.visuallyHidden')
  expect(breadcrumbCss).not.toContain('--rk-breadcrumb-')
})
