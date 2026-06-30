import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Button } from '../button'
import { Drawer, DrawerClose, drawerPrefixCls } from './index'

const drawerCss = readFileSync(new URL('./drawer.module.css', import.meta.url), 'utf8')
const drawerSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')
const radixDialogSource = readFileSync(new URL('../radix-dialog.ts', import.meta.url), 'utf8')

test('exports a prefix class and close primitive', () => {
  expect(drawerPrefixCls).toBe('rk-drawer')
  expect(DrawerClose).toBeTruthy()
})

test('renders a radix-backed drawer trigger on the server', () => {
  const html = renderToString(
    createElement(Drawer, {
      children: 'Drawer body',
      title: '公告',
      trigger: createElement(Button, { children: 'Open drawer' }),
    }),
  )

  expect(html).toContain('Open drawer')
  expect(drawerSource).toContain('`${prefixCls}-title`')
  expect(drawerSource).toContain('{title}')
})

test('uses radix dialog for drawer behavior and maps drawer side to the exposed curve', () => {
  expect(drawerSource).toContain("import { Cross } from '@rocokingdom-ui/icons'")
  expect(radixDialogSource).toContain("import * as Dialog from '@radix-ui/react-dialog'")
  expect(drawerSource).toContain("import { RocoTheme } from '../theme'")
  expect(drawerSource).toContain('<RocoTheme asChild>')
  expect(drawerSource).toContain('style={contentStyle}')
  expect(drawerSource).not.toContain('useRocoThemeStyle')
  expect(drawerSource).not.toContain('themeStyle')
  expect(drawerSource).not.toContain('RocoThemeScope')
  expect(drawerSource).toContain("return 'left'")
  expect(drawerSource).toContain("return 'right'")
  expect(drawerSource).toContain("return 'bottom'")
  expect(drawerSource).toContain("return 'top'")
  expect(drawerSource).toContain('<Panel')
  expect(drawerSource).toContain('RadixDialogClose')
  expect(drawerSource).toContain('innerClassName')
  expect(drawerSource).toContain('overlay = false')
  expect(drawerSource).toContain('overlay && styles.overlayVisible')
  expect(drawerSource).toContain('<RadixDialogContent')
  expect(drawerSource).toContain('`${prefixCls}-header`')
  expect(drawerSource).toContain('`${prefixCls}-header-content`')
  expect(drawerSource).toContain('`${prefixCls}-title`')
  expect(drawerSource).toContain('`${prefixCls}-content`')
  expect(drawerSource).toContain('titleClassName')
  expect(drawerSource).toContain('styles.panelContent')
  expect(drawerSource).toContain('<Cross />')
  expect(drawerCss).toContain('background: transparent;')
  expect(drawerCss).toContain('.overlayVisible')
  expect(drawerCss).toContain(".overlay[data-state='open']")
  expect(drawerCss).toContain(".overlay[data-state='closed']")
  expect(drawerCss).toContain('.panelContent')
  expect(drawerCss).toContain('.inner')
  expect(drawerCss).toContain('--rk-drawer-curve-extension')
  expect(drawerCss).toContain('--rk-drawer-outer-size')
  expect(drawerCss).toContain('--rk-drawer-size: 760px;')
  expect(drawerCss).toContain('width: min(100vw, var(--rk-drawer-outer-size));')
  expect(drawerCss).toContain(
    'width: min(var(--rk-drawer-size), calc(100% - var(--rk-drawer-curve-extension)));',
  )
  expect(drawerCss).toContain('.header')
  expect(drawerCss).toContain('.headerContent')
  expect(drawerCss).toContain('.title')
  expect(drawerCss).toContain('.left .header')
  expect(drawerCss).toContain('flex-direction: row-reverse;')
  expect(drawerCss).toContain('position: relative;')
  expect(drawerCss).toContain('height: 52px;')
  expect(drawerCss).toContain('width: 52px;')
  expect(drawerCss).toContain('font-size: 40px;')
  expect(drawerCss).toContain(".content[data-state='open'] .closeIcon")
  expect(drawerCss).toContain(".content[data-state='closed'] .closeIcon")
  expect(drawerCss).toContain('@keyframes rk-drawer-close-icon-in')
  expect(drawerCss).toContain('@keyframes rk-drawer-close-icon-out')
  expect(drawerCss).toContain('transform: rotate(-180deg) scale(0.65);')
  expect(drawerCss).toContain('transform: rotate(10deg) scale(1.08);')
  expect(drawerCss).toContain('transform: rotate(180deg) scale(0.65);')
  expect(drawerCss).toContain('--rk-panel-curve-inset: 12%;')
  expect(drawerCss).not.toContain('--rk-drawer-close-size')
  expect(drawerCss).not.toContain('--rk-drawer-title-font-size')
  expect(drawerCss).not.toContain('--rk-drawer-curve-inset')
  expect(drawerCss).toContain('.top .inner')
  expect(drawerCss).toContain('.bottom .inner')
  expect(drawerCss).toContain(".content[data-state='open'].right")
  expect(drawerCss).toContain(".content[data-state='open'].top .panel")
  expect(drawerCss).toContain('animation-name: rk-drawer-panel-y-in;')
  expect(drawerCss).toContain(".content[data-state='open'] .panel")
  expect(drawerCss).toContain('@keyframes rk-drawer-panel-in')
  expect(drawerCss).toContain('@keyframes rk-drawer-panel-y-in')
  expect(drawerCss).toContain('@keyframes rk-drawer-panel-out')
  expect(drawerCss).toContain('transform: translateX(50%);')
  expect(drawerCss).toContain('opacity: 0;')
  expect(drawerCss).toContain('transform-origin: right center;')
  expect(drawerCss).toContain('transform: scaleX(0);')
  expect(drawerCss).toContain('transform: scaleX(1.02);')
  expect(drawerCss).toContain('transform: scaleY(0);')
  expect(drawerCss).toContain('transform: scaleY(1.02);')
  expect(drawerCss).toContain('@media (prefers-reduced-motion: reduce)')
})

test('fills the viewport along the drawer side when size is full', () => {
  expect(drawerSource).toContain("size?: number | 'full' | string")
  expect(drawerSource).toContain('function resolveDrawerSize')
  expect(drawerSource).toContain('resolveCurveExtension')
  expect(drawerSource).toContain("'100vw'")
  expect(drawerSource).toContain("'100svh'")
  expect(drawerSource).toContain('size: `calc(${viewportSize} - var(--rk-drawer-curve-extension))`')
  expect(drawerSource).toContain("'12vw'")
  expect(drawerSource).toContain("'12svh'")
  expect(drawerSource).toContain("contentStyle['--rk-drawer-size'] = resolvedSize.size")
  expect(drawerSource).toContain(
    "contentStyle['--rk-drawer-curve-extension'] = resolvedSize.curveExtension",
  )
  expect(drawerSource).toContain("contentStyle['--rk-drawer-outer-size'] = resolvedSize.outerSize")
})

test('keeps explicit drawer sizes on the inner content box when size is not full', () => {
  expect(drawerSource).toContain("if (typeof size === 'number')")
  expect(drawerSource).toContain('curveExtension: resolveCurveExtension(size, hasCurveExtension)')
  expect(drawerSource).toContain('size: resolveSize(size)')
  expect(drawerSource).toContain('return { size: resolveSize(size) }')
  expect(drawerSource).toContain("return { curveExtension: '0px', size: resolveSize(size) }")
})

test('uses effect tokens for component shadows', () => {
  expect(drawerCss).toContain('drop-shadow(0 3px 0 var(--rk-shadow-strong-color))')
  expect(drawerCss).not.toContain('--rk-drawer-close-shadow-color')
})
