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

test('supports independent semantic materials for check and box', () => {
  expect(checkboxSource).toContain(
    "import { Material, resolveMaterial, type MaterialPreset } from '../material'",
  )
  expect(checkboxSource).toContain('boxMaterial?: CheckboxMaterial')
  expect(checkboxSource).toContain('checkMaterial?: CheckboxMaterial')
  expect(checkboxSource).toContain("checkMaterial = 'success'")
  expect(checkboxSource).toContain("const resolvedBoxMaterial = boxMaterial ?? material ?? 'stone'")
  expect(checkboxSource).toContain('resolveMaterial({ material: checkMaterial })')
  expect(checkboxSource).toContain('<Material asChild material={resolvedBoxMaterial}>')
  expect(checkboxCss).not.toContain('--rk-material-background: var(--rk-paper-soft);')
  expect(checkboxCss).not.toContain('--rk-material-color: var(--rk-on-primary-strong);')
  expect(checkboxCss).not.toContain('.paperSoft')
  expect(checkboxCss).not.toContain('.primaryStrong')
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
  expect(checkedHtml).toContain('--rk-material-background:var(--rk-stone)')
  expect(checkedHtml).toContain('--rk-material-background:var(--rk-success)')
  expect(checkedHtml.match(/<svg/g)).toHaveLength(2)
  expect(uncheckedHtml).toContain('data-state="unchecked"')
  expect(uncheckedHtml.match(/<svg/g)).toHaveLength(1)
})

test('renders custom materials for box and check independently', () => {
  const html = renderToString(
    createElement(Checkbox, {
      boxMaterial: 'paperStrong',
      checked: true,
      checkMaterial: 'danger',
      onChange: () => {},
    }),
  )

  expect(html).toContain('--rk-material-background:var(--rk-paper-strong)')
  expect(html).toContain('--rk-material-color:var(--rk-on-paper-strong)')
  expect(html).toContain('--rk-material-background:var(--rk-danger)')
  expect(html).toContain('--rk-material-color:var(--rk-on-danger)')
})

test('uses square roco shape and the shared check icon for checkbox visuals', () => {
  expect(checkboxSource).toContain("import { Check } from '@rocokingdom-ui/icons'")
  expect(checkboxSource).toContain('<RocoShape')
  expect(checkboxSource).toContain('shape="square"')
  expect(checkboxSource).toContain('contentClassName={styles.icon}')
  expect(checkboxSource).toContain(
    '<span className={styles.check} style={checkMaterialValue.style}>',
  )
  expect(checkboxSource).toContain('{icon ?? <Check />}')
  expect(checkboxCss).toContain(
    '--rk-checkbox-control-size: calc(var(--rk-control-height-middle, 32px) - 4px);',
  )
  expect(checkboxCss).toContain(
    '--rk-checkbox-check-size: calc(var(--rk-checkbox-control-size) * 1.55);',
  )
  expect(checkboxCss).toContain(
    '--rk-checkbox-control-size: calc(var(--rk-control-height-small, 24px) - 2px);',
  )
  expect(checkboxCss).toContain(
    '--rk-checkbox-control-size: calc(var(--rk-control-height-large, 40px) - 4px);',
  )
  expect(checkboxCss).toContain('font-size: var(--rk-checkbox-check-size);')
  expect(checkboxCss).toContain('overflow: visible;')
  expect(checkboxCss).toContain('transform: translate(-5%, -4%) rotate(-2deg);')
  expect(checkboxCss).toContain('.checkbox .control.control')
  expect(checkboxCss).toContain('.small .control.control')
  expect(checkboxCss).toContain('.large .control.control')
  expect(checkboxCss).toContain('.small .control')
  expect(checkboxCss).toContain('animation: rk-checkbox-pop 220ms linear;')
  expect(checkboxCss).toContain('.input:focus-visible + .control')
  expect(checkboxCss).toContain('@keyframes rk-checkbox-pop')
  expect(checkboxCss).not.toContain('--rk-roco-shape-')
})
