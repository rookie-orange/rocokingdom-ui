import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Switch, switchPrefixCls } from './index'

const switchCss = readFileSync(new URL('./switch.module.css', import.meta.url), 'utf8')
const switchSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(switchPrefixCls).toBe('rk-switch')
})

test('renders an accessible switch backed by a checkbox input', () => {
  const checkedHtml = renderToString(
    createElement(
      Switch,
      {
        checked: true,
        className: 'custom-switch',
        inputClassName: 'native-switch',
        name: 'notice',
        onChange: () => {},
        rootClassName: 'app-switch',
        value: 'daily',
      },
      '每日提醒',
    ),
  )
  const uncheckedHtml = renderToString(createElement(Switch, null, '每日提醒'))

  expect(checkedHtml).toContain('rk-switch')
  expect(checkedHtml).toContain('rk-switch-control')
  expect(checkedHtml).toContain('app-switch')
  expect(checkedHtml).toContain('custom-switch')
  expect(checkedHtml).toContain('native-switch')
  expect(checkedHtml).toContain('data-state="checked"')
  expect(checkedHtml).toContain('role="switch"')
  expect(checkedHtml).toContain('type="checkbox"')
  expect(checkedHtml).toContain('name="notice"')
  expect(checkedHtml).toContain('value="daily"')
  expect(checkedHtml).toContain('每日提醒')
  expect(checkedHtml).toContain('rk-material')
  expect(checkedHtml).toContain('rk-roco-shape')
  expect(checkedHtml).toContain('--rk-material-background:var(--rk-success)')
  expect(checkedHtml).toContain('--rk-material-background:var(--rk-paper)')
  expect(uncheckedHtml).toContain('data-state="unchecked"')
  expect(uncheckedHtml).toContain('--rk-material-background:var(--rk-stone)')
})

test('supports semantic materials for the track and thumb', () => {
  const html = renderToString(
    createElement(Switch, {
      checked: true,
      checkedMaterial: 'primaryStrong',
      checkedShadow: false,
      thumbMaterial: 'danger',
      uncheckedMaterial: 'paperStrong',
    }),
  )

  expect(html).toContain('--rk-material-background:var(--rk-primary-strong)')
  expect(html).toContain('--rk-material-color:var(--rk-on-primary-strong)')
  expect(html).toContain('--rk-material-background:var(--rk-danger)')
  expect(html).toContain('--rk-material-color:var(--rk-on-danger)')
  expect(html).not.toContain('withShadow')
})

test('uses stable switch dimensions and focus styles', () => {
  expect(switchSource).toContain("import { Material, type MaterialPreset } from '../material'")
  expect(switchSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(switchSource).toContain('onCheckedChange?: (checked: boolean) => void')
  expect(switchSource).toContain('role="switch"')
  expect(switchSource).toContain('variant="solid"')
  expect(switchSource).not.toContain('SwitchVariant')
  expect(switchSource).not.toContain('variant?:')
  expect(switchSource).not.toContain('uncheckedVariant')
  expect(switchSource).toContain('ref?: Ref<HTMLInputElement>')
  expect(switchSource).toContain('ref={ref}')
  expect(switchSource).not.toContain('forwardRef')
  expect(switchCss).toContain('--rk-switch-track-width: 58px;')
  expect(switchCss).toContain('--rk-switch-track-height: var(--rk-control-height-middle, 32px);')
  expect(switchCss).toContain('--rk-switch-track-padding: 3px;')
  expect(switchCss).toContain('--rk-switch-thumb-size: 26px;')
  expect(switchCss).toContain('--rk-switch-thumb-offset: 26px;')
  expect(switchCss).toContain('--rk-switch-track-width: 46px;')
  expect(switchCss).toContain('--rk-switch-thumb-size: 18px;')
  expect(switchCss).toContain('--rk-switch-track-width: 72px;')
  expect(switchCss).toContain('--rk-switch-track-padding: 4px;')
  expect(switchCss).toContain('--rk-switch-thumb-size: 32px;')
  expect(switchCss).toContain('color 180ms ease')
  expect(switchCss).toContain('.track *')
  expect(switchCss).toContain('transform: translateX(var(--rk-switch-thumb-offset));')
  expect(switchCss).toContain('.input:focus-visible + .track')
  expect(switchCss).toContain('@keyframes rk-switch-pop')
  expect(switchCss).not.toContain(':focus-within')
})
