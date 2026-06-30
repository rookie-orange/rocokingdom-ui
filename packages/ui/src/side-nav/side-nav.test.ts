import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import {
  SideNav,
  SideNavHeader,
  SideNavItem,
  SideNavList,
  sideNavHeaderPrefixCls,
  sideNavItemPrefixCls,
  sideNavListPrefixCls,
  sideNavPrefixCls,
} from './index'

const sideNavCss = readFileSync(new URL('./side-nav.module.css', import.meta.url), 'utf8')

test('exports prefix classes', () => {
  expect(sideNavPrefixCls).toBe('rk-side-nav')
  expect(sideNavHeaderPrefixCls).toBe('rk-side-nav-header')
  expect(sideNavListPrefixCls).toBe('rk-side-nav-list')
  expect(sideNavItemPrefixCls).toBe('rk-side-nav-item')
})

test('renders side nav rail and stack primitives', () => {
  const html = renderToString(
    createElement(
      SideNav,
      {
        'aria-label': 'Activity',
        className: 'custom-nav',
        rootClassName: 'app-nav',
        variant: 'rail',
      },
      createElement(SideNavHeader, {
        eyebrow: '活动',
        icon: '*',
        title: '推荐',
      }),
      createElement(
        SideNavList,
        {
          className: 'custom-list',
          rootClassName: 'app-list',
        },
        createElement(
          SideNavItem,
          {
            active: true,
            badge: true,
            icon: '!',
            rootClassName: 'app-item',
          },
          '绩点大赛',
        ),
      ),
    ),
  )

  expect(html).toContain('rk-side-nav')
  expect(html).toContain('rk-side-nav-header')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('rk-side-nav-list')
  expect(html).toContain('rk-side-nav-item')
  expect(html).toContain('data-variant="rail"')
  expect(html).toContain('aria-current="page"')
  expect(html).toContain('data-state="active"')
  expect(html).toContain('app-nav')
  expect(html).toContain('custom-nav')
  expect(html).toContain('app-list')
  expect(html).toContain('custom-list')
  expect(html).toContain('app-item')
  expect(html).toContain('活动')
  expect(html).toContain('推荐')
  expect(html).toContain('绩点大赛')
})

test('styles side nav as icon rail and text stack variants', () => {
  expect(sideNavCss).toContain('.rail')
  expect(sideNavCss).toContain('.stack')
  expect(sideNavCss).toContain('.headerContent')
  expect(sideNavCss).not.toContain('--rk-material-background')
  expect(sideNavCss).not.toContain('--rk-material-color')
  expect(sideNavCss).toContain('width: 320px;')
  expect(sideNavCss).toContain('width: 96px;')
  expect(sideNavCss).not.toContain('.headerShape')
  expect(sideNavCss).toContain('.rail .item')
  expect(sideNavCss).toContain('.rail .itemLabel')
  expect(sideNavCss).toContain('.active')
  expect(sideNavCss).toContain('height: 64px;')
  expect(sideNavCss).toContain('font-size: 38px;')
  expect(sideNavCss).not.toContain('--rk-side-nav-')
})
