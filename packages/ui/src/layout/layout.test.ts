import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import {
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  LayoutSider,
  layoutContentPrefixCls,
  layoutFooterPrefixCls,
  layoutHeaderPrefixCls,
  layoutPrefixCls,
  layoutSiderPrefixCls,
} from './index'

const layoutCss = readFileSync(new URL('./layout.module.css', import.meta.url), 'utf8')

test('exports prefix classes', () => {
  expect(layoutPrefixCls).toBe('rk-layout')
  expect(layoutHeaderPrefixCls).toBe('rk-layout-header')
  expect(layoutSiderPrefixCls).toBe('rk-layout-sider')
  expect(layoutContentPrefixCls).toBe('rk-layout-content')
  expect(layoutFooterPrefixCls).toBe('rk-layout-footer')
})

test('renders a composed layout shell', () => {
  const html = renderToString(
    createElement(
      Layout,
      {
        className: 'custom-layout',
        direction: 'horizontal',
        fullHeight: true,
        rootClassName: 'app-layout',
      },
      createElement(
        LayoutSider,
        {
          className: 'custom-sider',
          collapsed: true,
          collapsedWidth: 64,
          width: 288,
        },
        '导航',
      ),
      createElement(
        Layout,
        null,
        createElement(LayoutHeader, { height: 56, material: 'primary' }, '页头'),
        createElement(LayoutContent, { padded: false }, '内容'),
        createElement(LayoutFooter, { height: '48px' }, '页脚'),
      ),
    ),
  )

  expect(html).toContain('rk-layout')
  expect(html).toContain('app-layout')
  expect(html).toContain('custom-layout')
  expect(html).toContain('data-direction="horizontal"')
  expect(html).toContain('rk-layout-sider')
  expect(html).toContain('custom-sider')
  expect(html).toContain('data-collapsed="true"')
  expect(html).toContain('--rk-layout-sider-width:288px')
  expect(html).toContain('--rk-layout-sider-collapsed-width:64px')
  expect(html).toContain('rk-layout-header')
  expect(html).toContain('--rk-layout-header-height:56px')
  expect(html).toContain('rk-layout-content')
  expect(html).toContain('data-padded="false"')
  expect(html).toContain('rk-layout-footer')
  expect(html).toContain('--rk-layout-footer-height:48px')
  expect(html).toContain('导航')
  expect(html).toContain('页头')
  expect(html).toContain('内容')
  expect(html).toContain('页脚')
})

test('styles layout sections and responsive horizontal shells', () => {
  expect(layoutCss).toContain('.layout')
  expect(layoutCss).toContain('.horizontal')
  expect(layoutCss).toContain('.vertical')
  expect(layoutCss).toContain('.fullHeight')
  expect(layoutCss).toContain('.siderCollapsed')
  expect(layoutCss).toContain('var(--rk-layout-sider-width)')
  expect(layoutCss).toContain('var(--rk-layout-header-height, 64px)')
  expect(layoutCss).toContain('@media (max-width: 720px)')
})
