import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Select, selectItemPrefixCls, selectPrefixCls } from './index'

const selectCss = readFileSync(new URL('./select.module.css', import.meta.url), 'utf8')
const selectSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports prefix classes', () => {
  expect(selectPrefixCls).toBe('rk-select')
  expect(selectItemPrefixCls).toBe('rk-select-item')
})

test('renders a radix-backed select trigger on the server', () => {
  const html = renderToString(
    createElement(Select, {
      ariaLabel: '待机设置',
      defaultValue: '10',
      material: 'paper',
      options: [
        { label: '10分钟', value: '10' },
        { label: '20分钟', value: '20' },
      ],
      placeholder: '选择时间',
    }),
  )

  expect(html).toContain('rk-select')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('<svg')
  expect(html).toContain('role="combobox"')
  expect(html).toContain('aria-label="待机设置"')
  expect(html).toContain('paper')
})

test('uses radix select and animates select content with scale', () => {
  expect(selectSource).toContain("import * as RadixSelect from '@radix-ui/react-select'")
  expect(selectSource).toContain("import { Material, type MaterialPreset } from '../material'")
  expect(selectSource).toContain("import { RocoTheme } from '../theme'")
  expect(selectSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(selectSource).toContain('export type SelectMaterial = MaterialPreset')
  expect(selectSource).toContain("material = 'stone'")
  expect(selectSource).toContain(
    '<RadixSelect.Trigger {...triggerProps} aria-label={triggerAriaLabel} asChild>',
  )
  expect(selectSource).toContain('<Material asChild material={material}>')
  expect(selectSource).toContain('<RocoShape')
  expect(selectSource).toContain('as="button"')
  expect(selectSource).toContain('contentClassName={styles.triggerContent}')
  expect(selectSource).not.toContain('styles[material]')
  expect(selectSource).not.toContain('triggerShape')
  expect(selectSource).toContain('<RocoTheme asChild>')
  expect(selectSource).not.toContain('useRocoThemeStyle')
  expect(selectSource).not.toContain('themeStyle')
  expect(selectSource).not.toContain('RocoThemeScope')
  expect(selectSource).toContain("position={props.position ?? 'popper'}")
  expect(selectSource).toContain("align={props.align ?? 'start'}")
  expect(selectSource).toContain('sideOffset={props.sideOffset ?? 8}')
  expect(selectSource).toContain('contentShellClassName')
  expect(selectSource).not.toContain('scrollHeight')
  expect(selectSource).not.toContain('ResizeObserver')
  expect(selectCss).not.toContain('--rk-material-background')
  expect(selectCss).not.toContain('--rk-material-color')
  expect(selectCss).not.toContain('.paper')
  expect(selectCss).not.toContain('.primaryStrong')
  expect(selectCss).not.toContain('--rk-select-material')
  expect(selectCss).not.toContain('--rk-select-on-material')
  expect(selectCss).not.toContain('--rk-select-background')
  expect(selectCss).not.toContain('rgb(0 0 0 / 0.72)')
  expect(selectCss).not.toContain('rgb(20 20 20 / 0.96)')
  expect(selectCss).toContain('height: calc(var(--rk-control-height-middle, 32px) + 4px);')
  expect(selectCss).toContain('min-width: 176px;')
  expect(selectCss).not.toContain('.trigger .triggerShape')
  expect(selectCss).not.toContain('--rk-roco-shape-fill-overlap')
  expect(selectCss).not.toContain('--rk-roco-shape-')
  expect(selectCss).not.toContain('.trigger:active')
  expect(selectCss).not.toContain('transform: scale(0.96) translateY(4px);')
  expect(selectCss).toContain('.triggerContent')
  expect(selectCss).toContain('.contentShell')
  expect(selectCss).toContain('box-shadow: 0 4px 0 var(--rk-shadow-color);')
  expect(selectCss).toContain(".content[data-state='open'] .contentShell")
  expect(selectCss).toContain(".content[data-state='closed'] {")
  expect(selectCss).toContain('animation: rk-select-content-presence-out 100ms ease-in;')
  expect(selectCss).toContain(".content[data-state='closed'] .contentShell")
  expect(selectCss).toContain('animation: rk-select-content-out 100ms ease-in forwards;')
  expect(selectCss).toContain('@keyframes rk-select-content-in')
  expect(selectCss).toContain('@keyframes rk-select-content-presence-out')
  expect(selectCss).toContain('transform: scaleY(0);')
  expect(selectCss).toContain('transform: scaleY(1);')
  expect(selectCss).not.toContain('--rk-select-')
  expect(selectCss).not.toContain('opacity: 0;')
  expect(selectCss).not.toContain('opacity: 1;')
  expect(selectCss).toContain('@media (prefers-reduced-motion: reduce)')
})
