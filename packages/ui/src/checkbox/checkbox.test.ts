import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Checkbox, checkboxPrefixCls } from './index'

const checkboxCss = readFileSync(new URL('./checkbox.module.css', import.meta.url), 'utf8')
const checkboxSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(checkboxPrefixCls).toBe('rk-checkbox')
})

test('supports semantic materials for lightweight controls', () => {
  expect(checkboxSource).toContain("import { Material, type MaterialPreset } from '../material'")
  expect(checkboxSource).toContain('<Material asChild material={material}>')
  expect(checkboxCss).not.toContain('--rk-material-background: var(--rk-paper-soft);')
  expect(checkboxCss).not.toContain('--rk-material-color: var(--rk-on-primary-strong);')
  expect(checkboxCss).not.toContain('.paperSoft')
  expect(checkboxCss).not.toContain('.primaryStrong')
  expect(checkboxCss).not.toContain('--rk-checkbox-')
})

test('renders a square-shape backed checkbox with check icon only when checked', () => {
  const checkedHtml = renderToString(
    createElement(
      Checkbox,
      {
        checked: true,
        className: 'custom-checkbox',
        name: 'quest',
        onChange: () => {},
        rootClassName: 'app-checkbox',
        value: 'loot',
      },
      '领取奖励',
    ),
  )
  const uncheckedHtml = renderToString(createElement(Checkbox, null, '领取奖励'))

  expect(checkedHtml).toContain('rk-checkbox')
  expect(checkedHtml).toContain('app-checkbox')
  expect(checkedHtml).toContain('custom-checkbox')
  expect(checkedHtml).toContain('data-state="checked"')
  expect(checkedHtml).toContain('type="checkbox"')
  expect(checkedHtml).toContain('name="quest"')
  expect(checkedHtml).toContain('value="loot"')
  expect(checkedHtml).toContain('领取奖励')
  expect(checkedHtml).toContain('rk-roco-shape')
  expect(checkedHtml).toContain('square')
  expect(checkedHtml.match(/<svg/g)).toHaveLength(2)
  expect(uncheckedHtml).toContain('data-state="unchecked"')
  expect(uncheckedHtml.match(/<svg/g)).toHaveLength(1)
})

test('uses square roco shape and the shared check icon for checkbox visuals', () => {
  expect(checkboxSource).toContain("import { Check } from '@rocokingdom-ui/icons'")
  expect(checkboxSource).toContain('<RocoShape')
  expect(checkboxSource).toContain('shape="square"')
  expect(checkboxSource).toContain('contentClassName={styles.icon}')
  expect(checkboxSource).toContain('{isChecked ? (icon ?? <Check />) : null}')
  expect(checkboxCss).toContain('height: calc(var(--rk-control-height-middle, 32px) - 4px);')
  expect(checkboxCss).toContain('min-width: calc(var(--rk-control-height-middle, 32px) - 4px);')
  expect(checkboxCss).toContain('height: calc(var(--rk-control-height-small, 24px) - 2px);')
  expect(checkboxCss).toContain('height: calc(var(--rk-control-height-large, 40px) - 4px);')
  expect(checkboxCss).toContain('font-size: calc(var(--rk-control-height-middle, 32px) * 1.25);')
  expect(checkboxCss).toContain('.checkbox .control.control')
  expect(checkboxCss).toContain('.small .control.control')
  expect(checkboxCss).toContain('.large .control.control')
  expect(checkboxCss).toContain('.small .control')
  expect(checkboxCss).toContain('animation: rk-checkbox-pop 220ms linear;')
  expect(checkboxCss).toContain('.input:focus-visible + .control')
  expect(checkboxCss).toContain('@keyframes rk-checkbox-pop')
  expect(checkboxCss).not.toContain('--rk-checkbox-')
  expect(checkboxCss).not.toContain('--rk-roco-shape-')
})
