import { readFileSync } from 'node:fs'
import { expect, test } from 'vite-plus/test'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import packageJson from '../package.json' with { type: 'json' }
import {
  Button,
  ButtonNormal,
  Checkbox,
  Drawer,
  DrawerClose,
  Material,
  Panel,
  Select,
  SideNav,
  SideNavHeader,
  SideNavItem,
  SideNavList,
  Modal,
  ModalClose,
  RadioGroup,
  RadioItem,
  RocoTheme,
  RocoShape,
  RuneText,
  ToggleGroup,
  ToggleItem,
  buttonNormalPrefixCls,
  buttonPrefixCls,
  checkboxPrefixCls,
  drawerPrefixCls,
  materialPrefixCls,
  panelPrefixCls,
  selectItemPrefixCls,
  selectPrefixCls,
  sideNavHeaderPrefixCls,
  sideNavItemPrefixCls,
  sideNavListPrefixCls,
  sideNavPrefixCls,
  modalPrefixCls,
  radioGroupPrefixCls,
  radioItemPrefixCls,
  rocoThemePrefixCls,
  runeTextPrefixCls,
  rocoShapePrefixCls,
  toggleGroupPrefixCls,
  toggleItemPrefixCls,
  useRocoTheme,
} from '../src/index.ts'

const baseStyleCss = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')
const fontCss = readFileSync(new URL('../src/font.css', import.meta.url), 'utf8')
const buttonCss = readFileSync(new URL('../src/button/button.module.css', import.meta.url), 'utf8')
const buttonSource = readFileSync(new URL('../src/button/index.tsx', import.meta.url), 'utf8')
const buttonNormalCss = readFileSync(
  new URL('../src/button-normal/button-normal.module.css', import.meta.url),
  'utf8',
)
const buttonNormalSource = readFileSync(
  new URL('../src/button-normal/index.tsx', import.meta.url),
  'utf8',
)
const checkboxCss = readFileSync(
  new URL('../src/checkbox/checkbox.module.css', import.meta.url),
  'utf8',
)
const checkboxSource = readFileSync(new URL('../src/checkbox/index.tsx', import.meta.url), 'utf8')
const radioGroupCss = readFileSync(
  new URL('../src/radio-group/radio-group.module.css', import.meta.url),
  'utf8',
)
const radioGroupSource = readFileSync(
  new URL('../src/radio-group/index.tsx', import.meta.url),
  'utf8',
)
const toggleGroupCss = readFileSync(
  new URL('../src/toggle-group/toggle-group.module.css', import.meta.url),
  'utf8',
)
const toggleGroupSource = readFileSync(
  new URL('../src/toggle-group/index.tsx', import.meta.url),
  'utf8',
)
const modalSource = readFileSync(new URL('../src/modal/index.tsx', import.meta.url), 'utf8')
const modalCss = readFileSync(new URL('../src/modal/modal.module.css', import.meta.url), 'utf8')
const themeSource = readFileSync(new URL('../src/theme/index.tsx', import.meta.url), 'utf8')
const materialCss = readFileSync(
  new URL('../src/material/material.module.css', import.meta.url),
  'utf8',
)
const panelCss = readFileSync(new URL('../src/panel/panel.module.css', import.meta.url), 'utf8')
const drawerCss = readFileSync(new URL('../src/drawer/drawer.module.css', import.meta.url), 'utf8')
const drawerSource = readFileSync(new URL('../src/drawer/index.tsx', import.meta.url), 'utf8')
const radixDialogSource = readFileSync(new URL('../src/radix-dialog.ts', import.meta.url), 'utf8')
const sideNavCss = readFileSync(
  new URL('../src/side-nav/side-nav.module.css', import.meta.url),
  'utf8',
)
const selectCss = readFileSync(new URL('../src/select/select.module.css', import.meta.url), 'utf8')
const selectSource = readFileSync(new URL('../src/select/index.tsx', import.meta.url), 'utf8')
const rocoShapeCss = readFileSync(
  new URL('../src/roco-shape/roco-shape.module.css', import.meta.url),
  'utf8',
)
const rocoShapeSource = readFileSync(
  new URL('../src/roco-shape/index.tsx', import.meta.url),
  'utf8',
)
const runeTextCss = readFileSync(
  new URL('../src/rune-text/rune-text.module.css', import.meta.url),
  'utf8',
)

test('exports a single button prefix class', () => {
  expect(buttonPrefixCls).toBe('rk-button')
  expect(buttonNormalPrefixCls).toBe('rk-button-normal')
  expect(checkboxPrefixCls).toBe('rk-checkbox')
  expect(drawerPrefixCls).toBe('rk-drawer')
  expect(DrawerClose).toBeTruthy()
  expect(materialPrefixCls).toBe('rk-material')
  expect(panelPrefixCls).toBe('rk-panel')
  expect(selectPrefixCls).toBe('rk-select')
  expect(selectItemPrefixCls).toBe('rk-select-item')
  expect(sideNavPrefixCls).toBe('rk-side-nav')
  expect(sideNavHeaderPrefixCls).toBe('rk-side-nav-header')
  expect(sideNavListPrefixCls).toBe('rk-side-nav-list')
  expect(sideNavItemPrefixCls).toBe('rk-side-nav-item')
  expect(modalPrefixCls).toBe('rk-modal')
  expect(radioGroupPrefixCls).toBe('rk-radio-group')
  expect(radioItemPrefixCls).toBe('rk-radio-item')
  expect(toggleGroupPrefixCls).toBe('rk-toggle-group')
  expect(toggleItemPrefixCls).toBe('rk-toggle-item')
  expect(rocoThemePrefixCls).toBe('rk-theme')
  expect(rocoShapePrefixCls).toBe('rk-roco-shape')
  expect(runeTextPrefixCls).toBe('rk-rune-text')
})

test('renders a polymorphic material surface with background and color variables', () => {
  const html = renderToString(
    createElement(
      Material,
      {
        as: 'a',
        background: 'var(--rk-primary)',
        className: 'custom-material',
        color: 'var(--rk-on-primary)',
        href: '/kingdom',
        material: 'stone',
        rootClassName: 'app-material',
      },
      'Kingdom',
    ),
  )

  expect(html).toContain('<a')
  expect(html).toContain('href="/kingdom"')
  expect(html).toContain('rk-material')
  expect(html).toContain('app-material')
  expect(html).toContain('custom-material')
  expect(html).toContain('stone')
  expect(html).toContain('--rk-material-background:var(--rk-primary)')
  expect(html).toContain('--rk-material-color:var(--rk-on-primary)')
  expect(html).toContain('Kingdom')
})

test('maps material presets to base background and foreground variables', () => {
  expect(materialCss).toContain('--rk-material-background: var(--rk-paper);')
  expect(materialCss).toContain('--rk-material-color: var(--rk-on-paper);')
  expect(materialCss).toContain('background: var(--rk-material-background);')
  expect(materialCss).toContain('color: var(--rk-material-color);')
  expect(materialCss).toContain('--rk-material-background: var(--rk-primary);')
  expect(materialCss).toContain('--rk-material-color: var(--rk-on-primary);')
  expect(materialCss).toContain('--rk-material-background: var(--rk-stone);')
  expect(materialCss).toContain('--rk-material-color: var(--rk-on-stone);')
  expect(materialCss).toContain('--rk-material-background: var(--rk-primary-soft);')
  expect(materialCss).toContain('--rk-material-color: var(--rk-on-primary-soft);')
  expect(materialCss).toContain('--rk-material-background: var(--rk-primary-muted);')
  expect(materialCss).toContain('--rk-material-color: var(--rk-on-primary-muted);')
  expect(materialCss).toContain('--rk-material-background: var(--rk-primary-strong);')
  expect(materialCss).toContain('--rk-material-color: var(--rk-on-primary-strong);')
  expect(materialCss).toContain('--rk-material-background: var(--rk-success);')
  expect(materialCss).toContain('--rk-material-color: var(--rk-on-success);')
  expect(materialCss).toContain('--rk-material-background: var(--rk-danger);')
  expect(materialCss).toContain('--rk-material-color: var(--rk-on-danger);')
})

test('renders an svg-backed React button component with css module classes', () => {
  const html = renderToString(
    createElement(Button, {
      children: 'Start',
      className: 'custom-button',
      material: 'stone',
      rootClassName: 'app-button',
      size: 'large',
      variant: 'outline',
    }),
  )

  expect(html).toContain('<button')
  expect(html).toContain('<svg')
  expect(html).toContain('<path')
  expect(html).toContain('rk-button')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('app-button')
  expect(html).toContain('custom-button')
  expect(html).toContain('type="button"')
  expect(html).toContain('rk-rune-text')
})

test('uses roco shape as the button root color primitive', () => {
  expect(buttonSource).toContain("import type { MaterialPreset } from '../material'")
  expect(buttonSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(buttonSource).toContain("import { RuneText } from '../rune-text'")
  expect(buttonSource).toContain('<RocoShape')
  expect(buttonSource).toContain('as="button"')
  expect(buttonSource).toContain('material={material}')
  expect(buttonSource).toContain('variant={variant}')
  expect(buttonSource).toContain('<RuneText className={styles.content}>')
  expect(buttonSource).not.toContain('<Material')
  expect(buttonSource).not.toContain('<button className={resolvedClassName}')
  expect(buttonCss).toContain('--rk-roco-shape-height: var(--rk-button-height);')
  expect(buttonCss).toContain('--rk-roco-shape-padding-inline: var(--rk-button-padding-inline);')
  expect(buttonCss).not.toContain('position: absolute;')
  expect(buttonCss).not.toContain('z-index:')
  expect(buttonCss).toContain('--rk-rune-text-base-font-family: var(--rk-button-font-family);')
  expect(buttonCss).toContain('--rk-rune-text-base-font-weight: var(--rk-button-font-weight);')
})

test('supports semantic materials for lightweight controls', () => {
  expect(buttonNormalSource).toContain("import type { MaterialPreset } from '../material'")
  expect(buttonNormalCss).toContain('--rk-button-material: var(--rk-primary-soft);')
  expect(buttonNormalCss).toContain('--rk-button-on-material: var(--rk-on-primary-soft);')
  expect(buttonNormalCss).toContain('--rk-button-material: var(--rk-primary-muted);')
  expect(buttonNormalCss).toContain('--rk-button-on-material: var(--rk-on-primary-muted);')
  expect(buttonNormalCss).toContain('--rk-button-material: var(--rk-primary-strong);')
  expect(buttonNormalCss).toContain('--rk-button-on-material: var(--rk-on-primary-strong);')
  expect(buttonNormalCss).toContain('--rk-button-material: var(--rk-success);')
  expect(buttonNormalCss).toContain('--rk-button-on-material: var(--rk-on-success);')
  expect(buttonNormalCss).toContain('--rk-button-material: var(--rk-danger);')
  expect(buttonNormalCss).toContain('--rk-button-on-material: var(--rk-on-danger);')
  expect(radioGroupSource).toContain("import type { MaterialPreset } from '../material'")
  expect(radioGroupCss).toContain('--rk-radio-item-material: var(--rk-primary-soft);')
  expect(radioGroupCss).toContain('--rk-radio-item-on-material: var(--rk-on-primary-soft);')
  expect(radioGroupCss).toContain('--rk-radio-item-material: var(--rk-primary-muted);')
  expect(radioGroupCss).toContain('--rk-radio-item-on-material: var(--rk-on-primary-muted);')
  expect(radioGroupCss).toContain('--rk-radio-item-material: var(--rk-primary-strong);')
  expect(radioGroupCss).toContain('--rk-radio-item-on-material: var(--rk-on-primary-strong);')
  expect(radioGroupCss).toContain('--rk-radio-item-material: var(--rk-success);')
  expect(radioGroupCss).toContain('--rk-radio-item-on-material: var(--rk-on-success);')
  expect(radioGroupCss).toContain('--rk-radio-item-material: var(--rk-danger);')
  expect(radioGroupCss).toContain('--rk-radio-item-on-material: var(--rk-on-danger);')
  expect(toggleGroupSource).toContain("import type { MaterialPreset } from '../material'")
  expect(toggleGroupCss).toContain('--rk-toggle-item-material: var(--rk-primary-soft);')
  expect(toggleGroupCss).toContain('--rk-toggle-item-on-material: var(--rk-on-primary-soft);')
  expect(toggleGroupCss).toContain('--rk-toggle-item-material: var(--rk-primary-muted);')
  expect(toggleGroupCss).toContain('--rk-toggle-item-on-material: var(--rk-on-primary-muted);')
  expect(toggleGroupCss).toContain('--rk-toggle-item-material: var(--rk-primary-strong);')
  expect(toggleGroupCss).toContain('--rk-toggle-item-on-material: var(--rk-on-primary-strong);')
  expect(toggleGroupCss).toContain('--rk-toggle-item-material: var(--rk-success);')
  expect(toggleGroupCss).toContain('--rk-toggle-item-on-material: var(--rk-on-success);')
  expect(toggleGroupCss).toContain('--rk-toggle-item-material: var(--rk-danger);')
  expect(toggleGroupCss).toContain('--rk-toggle-item-on-material: var(--rk-on-danger);')
  expect(checkboxSource).toContain("import type { MaterialPreset } from '../material'")
  expect(checkboxCss).toContain('--rk-checkbox-material: var(--rk-primary-soft);')
  expect(checkboxCss).toContain('--rk-checkbox-on-material: var(--rk-on-primary-soft);')
  expect(checkboxCss).toContain('--rk-checkbox-material: var(--rk-primary-muted);')
  expect(checkboxCss).toContain('--rk-checkbox-on-material: var(--rk-on-primary-muted);')
  expect(checkboxCss).toContain('--rk-checkbox-material: var(--rk-primary-strong);')
  expect(checkboxCss).toContain('--rk-checkbox-on-material: var(--rk-on-primary-strong);')
  expect(checkboxCss).toContain('--rk-checkbox-material: var(--rk-success);')
  expect(checkboxCss).toContain('--rk-checkbox-on-material: var(--rk-on-success);')
  expect(checkboxCss).toContain('--rk-checkbox-material: var(--rk-danger);')
  expect(checkboxCss).toContain('--rk-checkbox-on-material: var(--rk-on-danger);')
})

test('passes the optional shadow prop from button to its shape', () => {
  const defaultHtml = renderToString(createElement(Button, { children: 'Plain' }))
  const shadowHtml = renderToString(createElement(Button, { children: 'Raised', shadow: true }))

  expect(defaultHtml).not.toContain('withShadow')
  expect(shadowHtml).toContain('withShadow')
})

test('pins button sizes with explicit heights in flex rows', () => {
  expect(buttonCss).toContain('box-sizing: border-box;')
  expect(buttonCss).toContain('--rk-roco-shape-height: var(--rk-button-height);')
  expect(buttonCss).not.toContain('\n  height: var(--rk-button-height);')
  expect(buttonCss).not.toContain('min-height: var(--rk-button-height);')
  expect(buttonNormalCss).toContain('box-sizing: border-box;')
  expect(buttonNormalCss).toContain('height: 32px;')
  expect(buttonNormalCss).toContain('height: 40px;')
  expect(buttonNormalCss).toContain('height: 48px;')
  expect(buttonNormalCss).not.toContain('min-height:')
})

test('renders the reusable roco shape component', () => {
  const html = renderToString(
    createElement(RocoShape, {
      className: 'custom-shape',
      rootClassName: 'app-shape',
      variant: 'outline',
    }),
  )

  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('app-shape')
  expect(html).toContain('custom-shape')
  expect(html).toContain('<svg')
  expect(html).toContain('<path')
  expect(html.match(/<path/g)).toHaveLength(3)
  expect(rocoShapeSource).not.toContain('forwardRef')
  expect(rocoShapeSource).toContain('ComponentPropsWithRef')
  expect(rocoShapeSource).toContain('export function RocoShape')
})

test('renders solid roco shape without a stroke layer', () => {
  const html = renderToString(createElement(RocoShape))

  expect(html).toContain('rk-roco-shape')
  expect(html).not.toContain('withShadow')
  expect(html.match(/<path/g)).toHaveLength(2)
})

test('renders roco shape shadow only when enabled', () => {
  const html = renderToString(createElement(RocoShape, { shadow: true }))

  expect(html).toContain('withShadow')
  expect(html.match(/<path/g)).toHaveLength(2)
  expect(baseStyleCss).toContain('--rk-shadow-soft-color: rgb(36 38 40 / 0.08);')
  expect(baseStyleCss).toContain('--rk-shadow-color: rgb(36 38 40 / 0.16);')
  expect(baseStyleCss).toContain('--rk-shadow-strong-color: rgb(36 38 40 / 0.32);')
  expect(rocoShapeCss).toContain('var(--rk-roco-shape-shadow, var(--rk-shadow-strong-color))')
})

test('renders fixed roco shape paths for circle and square', () => {
  const circleHtml = renderToString(
    createElement(RocoShape, { shape: 'circle', variant: 'outline' }),
  )
  const squareHtml = renderToString(createElement(RocoShape, { shape: 'square' }))

  expect(circleHtml).toContain('M0.858625 19.4179')
  expect(circleHtml.match(/<path/g)).toHaveLength(1)
  expect(squareHtml).toContain('M3.51624 2.91328')
  expect(squareHtml.match(/<path/g)).toHaveLength(1)
  expect(rocoShapeCss).toContain('--rk-roco-shape-fixed-stroke-width')
})

test('renders roco shape as a content surface with material colors', () => {
  const html = renderToString(
    createElement(
      RocoShape,
      {
        background: 'var(--rk-stone)',
        color: 'var(--rk-on-stone)',
        contentClassName: 'shape-label',
        material: 'paper',
        style: { height: 44, width: 180 },
      },
      '今日活动',
    ),
  )

  expect(html.startsWith('<span class="rk-roco-shape')).toBe(true)
  expect(html).toContain('paper')
  expect(html).toContain('withContent')
  expect(html).toContain('shape-label')
  expect(html).toContain('--rk-material-background:var(--rk-stone)')
  expect(html).toContain('--rk-material-color:var(--rk-on-stone)')
  expect(html).not.toContain('aria-hidden="true" class="rk-roco-shape')
  expect(html).toContain('今日活动')
  expect(html.match(/aria-hidden="true"/g)).toHaveLength(1)
  expect(rocoShapeCss).toContain('.shape.shape')
  expect(rocoShapeCss).toContain('background: transparent;')
})

test('lets material render the roco shape root for combined surfaces', () => {
  const html = renderToString(
    createElement(
      Material,
      {
        as: RocoShape,
        material: 'paper',
        rootClassName: 'material-shape',
        shadow: true,
      },
      'Notice',
    ),
  )

  expect(html).toContain('rk-material')
  expect(html).toContain('rk-roco-shape')
  expect(html).toContain('material-shape')
  expect(html).toContain('paper')
  expect(html).toContain('withContent')
  expect(html).toContain('withShadow')
  expect(html).toContain('Notice')
})

test('renders the previous capsule button as button normal', () => {
  const html = renderToString(
    createElement(ButtonNormal, {
      children: 'Start',
      className: 'custom-button',
      material: 'stone',
      rootClassName: 'app-button',
      size: 'large',
      variant: 'outline',
    }),
  )

  expect(html).toContain('<button')
  expect(html).not.toContain('<svg')
  expect(html).toContain('rk-button-normal')
  expect(html).toContain('app-button')
  expect(html).toContain('custom-button')
  expect(html).toContain('type="button"')
})

test('renders a reusable curved panel', () => {
  const html = renderToString(
    createElement(
      Panel,
      {
        className: 'custom-panel',
        contentClassName: 'panel-content',
        curve: 'left',
        curveInset: 112,
        material: 'stone',
        rootClassName: 'app-panel',
      },
      'Announcements',
    ),
  )

  expect(html).toContain('rk-panel')
  expect(html).toContain('app-panel')
  expect(html).toContain('custom-panel')
  expect(html).toContain('panel-content')
  expect(html).toContain('stone')
  expect(html).toContain('left')
  expect(html).toContain('<svg')
  expect(html).toContain('<path')
  expect(html).toContain('--rk-panel-curve-inset:112px')
  expect(html).toContain('Announcements')
})

test('styles panel curves with svg shape padding insets', () => {
  expect(panelCss).toContain('.curved')
  expect(panelCss).toContain('.shapePath')
  expect(panelCss).toContain('fill: currentColor;')
  expect(panelCss).toContain('.left .content')
  expect(panelCss).toContain('.right .content')
  expect(panelCss).toContain('.top .content')
  expect(panelCss).toContain('.bottom .content')
  expect(panelCss).toContain('var(--rk-panel-curve-inset)')
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
  expect(sideNavCss).toContain('--rk-side-nav-header-material: var(--rk-stone);')
  expect(sideNavCss).not.toContain('.headerShape')
  expect(sideNavCss).toContain('.rail .item')
  expect(sideNavCss).toContain('.rail .itemLabel')
  expect(sideNavCss).toContain('.active')
  expect(sideNavCss).toContain('--rk-side-nav-item-height')
})

test('renders a compound radio group with default active and inactive materials', () => {
  const html = renderToString(
    createElement(
      RadioGroup,
      {
        className: 'custom-radio-group',
        name: 'pet',
        rootClassName: 'app-radio-group',
        value: 'paper',
      },
      createElement(
        RadioItem,
        {
          className: 'option-item',
          inactiveClassName: 'idle-item',
          value: 'stone',
        },
        'Stone',
      ),
      createElement(
        RadioItem,
        {
          activeClassName: 'selected-item',
          className: 'option-item',
          value: 'paper',
        },
        'Paper',
      ),
    ),
  )

  expect(html).toContain('role="radiogroup"')
  expect(html).toContain('rk-radio-group')
  expect(html).toContain('rk-radio-item')
  expect(html).toContain('app-radio-group')
  expect(html).toContain('custom-radio-group')
  expect(html).toContain('role="radio"')
  expect(html).toContain('aria-checked="true"')
  expect(html).toContain('aria-checked="false"')
  expect(html).toContain('selected-item')
  expect(html).toContain('idle-item')
  expect(html).toContain('option-item')
  expect(html).not.toContain('rk-button')
  expect(html).toContain('paper')
  expect(html).toContain('stone')
  expect(html).toContain('type="hidden"')
  expect(html).toContain('name="pet"')
  expect(html).toContain('value="paper"')
})

test('lets radio group item styles be customized', () => {
  const html = renderToString(
    createElement(
      RadioGroup,
      {
        activeMaterial: 'default',
        activeVariant: 'outline',
        inactiveMaterial: 'paper',
        inactiveVariant: 'text',
        value: 'fire',
      },
      createElement(RadioItem, { style: { minWidth: 96 }, value: 'fire' }, 'Fire'),
      createElement(
        RadioItem,
        {
          className: 'water-item',
          inactiveMaterial: 'stone',
          value: 'water',
        },
        'Water',
      ),
    ),
  )

  expect(html).toContain('default')
  expect(html).toContain('outline')
  expect(html).toContain('stone')
  expect(html).toContain('text')
  expect(html).toContain('water-item')
  expect(html).toContain('min-width:96px')
})

test('implements radio items without the shared button component', () => {
  expect(radioGroupSource).not.toContain("from '../button'")
  expect(radioGroupSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(radioGroupSource).toContain('export function RadioItem')
})

test('animates the selected radio item with the modal spring scale', () => {
  expect(radioGroupCss).toContain('--rk-radio-group-active-scale: 1.08;')
  expect(radioGroupCss).toContain('@keyframes rk-radio-item-spring-scale')
  expect(radioGroupCss).toContain('transform: scale(0.9);')
  expect(radioGroupCss).toContain('transform: scaleY(0.9) scaleX(1.2);')
  expect(radioGroupCss).toContain('transform: scaleY(1.1) scaleX(0.9);')
  expect(radioGroupCss).toContain('transform: scale(var(--rk-radio-item-active-scale));')
  expect(radioGroupCss).toContain('@media (prefers-reduced-motion: reduce)')
})

test('renders a compound toggle group with default selected and unselected materials', () => {
  const html = renderToString(
    createElement(
      ToggleGroup,
      {
        className: 'custom-toggle-group',
        name: 'section',
        rootClassName: 'app-toggle-group',
        value: 'paper',
      },
      createElement(
        ToggleItem,
        {
          className: 'toggle-option',
          unselectedClassName: 'idle-toggle',
          value: 'stone',
        },
        'Stone',
      ),
      createElement(
        ToggleItem,
        {
          className: 'toggle-option',
          selectedClassName: 'selected-toggle',
          value: 'paper',
        },
        'Paper',
      ),
    ),
  )

  expect(html).toContain('role="group"')
  expect(html).toContain('rk-toggle-group')
  expect(html).toContain('rk-toggle-item')
  expect(html).toContain('app-toggle-group')
  expect(html).toContain('custom-toggle-group')
  expect(html).toContain('aria-pressed="true"')
  expect(html).toContain('aria-pressed="false"')
  expect(html).toContain('selected-toggle')
  expect(html).toContain('idle-toggle')
  expect(html).toContain('toggle-option')
  expect(html).toContain('rk-rune-text')
  expect(html).toContain('paper')
  expect(html).toContain('stone')
  expect(html).toContain('type="hidden"')
  expect(html).toContain('name="section"')
  expect(html).toContain('value="paper"')
})

test('lets toggle group item styles be customized and expands selected items', () => {
  const html = renderToString(
    createElement(
      ToggleGroup,
      {
        selectedMaterial: 'primaryStrong',
        selectedVariant: 'outline',
        unselectedMaterial: 'paper',
        unselectedVariant: 'text',
        value: 'map',
      },
      createElement(ToggleItem, { style: { minWidth: 96 }, value: 'map' }, 'Map'),
      createElement(
        ToggleItem,
        {
          className: 'bag-toggle',
          unselectedMaterial: 'stone',
          value: 'bag',
        },
        'Bag',
      ),
    ),
  )

  expect(html).toContain('primaryStrong')
  expect(html).toContain('outline')
  expect(html).toContain('stone')
  expect(html).toContain('text')
  expect(html).toContain('bag-toggle')
  expect(html).toContain('min-width:96px')
  expect(toggleGroupSource).not.toContain("from '../button'")
  expect(toggleGroupSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(toggleGroupSource).toContain("import { RuneText } from '../rune-text'")
  expect(toggleGroupCss).toContain('--rk-toggle-item-selected-min-width')
  expect(toggleGroupCss).toContain('--rk-toggle-item-selected-padding-inline')
  expect(toggleGroupCss).toContain('min-width 220ms ease')
  expect(toggleGroupCss).toContain('padding-inline 220ms ease')
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
  expect(checkboxCss).toContain('.input:focus-visible + .control')
  expect(checkboxCss).toContain('@keyframes rk-checkbox-pop')
})

test('renders a radix-backed modal trigger on the server', () => {
  const html = renderToString(
    createElement(Modal, {
      footer: createElement(
        ModalClose,
        { asChild: true },
        createElement(Button, { children: '确定', material: 'paper' }),
      ),
      title: '提示',
      trigger: createElement(Button, { children: 'Open modal' }),
    }),
  )

  expect(html).toContain('Open modal')
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
  expect(html).toContain('rk-drawer-title')
  expect(html).toContain('公告')
})

test('uses radix dialog for drawer behavior and maps drawer side to the exposed curve', () => {
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
  expect(drawerSource).toContain('/>\n        </RocoTheme>\n        <RocoTheme asChild>')
  expect(drawerSource).toContain('<RadixDialogContent')
  expect(drawerSource).toContain('`${prefixCls}-header`')
  expect(drawerSource).toContain('`${prefixCls}-header-content`')
  expect(drawerSource).toContain('`${prefixCls}-title`')
  expect(drawerSource).toContain('`${prefixCls}-content`')
  expect(drawerSource).toContain('titleClassName')
  expect(drawerSource).toContain('styles.panelContent')
  expect(drawerCss).toContain('background: transparent;')
  expect(drawerCss).toContain('.overlayVisible')
  expect(drawerCss).toContain(".overlay[data-state='open']")
  expect(drawerCss).toContain(".overlay[data-state='closed']")
  expect(drawerCss).toContain('.panelContent')
  expect(drawerCss).toContain('.inner')
  expect(drawerCss).toContain('--rk-drawer-curve-extension')
  expect(drawerCss).toContain('--rk-drawer-outer-size')
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
  expect(drawerCss).toContain('--rk-drawer-close-size: 52px;')
  expect(drawerCss).toContain('--rk-drawer-title-font-size')
  // 12% tracks the arc's max extent; a fixed px overflowed wide drawers (size="full").
  expect(drawerCss).toContain('var(--rk-drawer-curve-inset, 12%)')
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

  const rightHtml = renderToString(
    createElement(Drawer, { size: 'full', children: 'Full width drawer' }),
  )
  expect(rightHtml).toContain('--rk-drawer-size:calc(100vw - var(--rk-drawer-curve-extension))')
  expect(rightHtml).toContain('--rk-drawer-curve-extension:12vw')
  expect(rightHtml).toContain('--rk-drawer-outer-size:100vw')

  const bottomHtml = renderToString(
    createElement(Drawer, { size: 'full', side: 'bottom', children: 'Full height drawer' }),
  )
  expect(bottomHtml).toContain('--rk-drawer-size:calc(100svh - var(--rk-drawer-curve-extension))')
  expect(bottomHtml).toContain('--rk-drawer-curve-extension:12svh')
  expect(bottomHtml).toContain('--rk-drawer-outer-size:100svh')

  const leftHtml = renderToString(
    createElement(Drawer, { size: 'full', side: 'left', children: 'Full width drawer' }),
  )
  expect(leftHtml).toContain('--rk-drawer-size:calc(100vw - var(--rk-drawer-curve-extension))')
  expect(leftHtml).toContain('--rk-drawer-curve-extension:12vw')
  expect(leftHtml).toContain('--rk-drawer-outer-size:100vw')

  const topHtml = renderToString(
    createElement(Drawer, { size: 'full', side: 'top', children: 'Full height drawer' }),
  )
  expect(topHtml).toContain('--rk-drawer-size:calc(100svh - var(--rk-drawer-curve-extension))')
  expect(topHtml).toContain('--rk-drawer-curve-extension:12svh')
  expect(topHtml).toContain('--rk-drawer-outer-size:100svh')
})

test('keeps explicit drawer sizes on the inner content box when size is not full', () => {
  const numericHtml = renderToString(createElement(Drawer, { size: 720, children: 'Sized drawer' }))
  expect(numericHtml).toContain('--rk-drawer-size:720px')
  expect(numericHtml).toContain('--rk-drawer-curve-extension:98.182px')

  const stringHtml = renderToString(
    createElement(Drawer, { size: '50vw', children: 'Sized drawer' }),
  )
  expect(stringHtml).toContain('--rk-drawer-size:50vw')

  const defaultHtml = renderToString(createElement(Drawer, { children: 'Default drawer' }))
  expect(defaultHtml).not.toContain('--rk-drawer-size')
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
  expect(selectSource).toContain("import type { MaterialPreset } from '../material'")
  expect(selectSource).toContain("import { RocoTheme } from '../theme'")
  expect(selectSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(selectSource).toContain('export type SelectMaterial = MaterialPreset')
  expect(selectSource).toContain("material = 'stone'")
  expect(selectSource).toContain('styles[material]')
  expect(selectSource).toContain(
    '<RadixSelect.Trigger {...triggerProps} aria-label={triggerAriaLabel} asChild>',
  )
  expect(selectSource).toContain('<RocoShape')
  expect(selectSource).toContain('as="button"')
  expect(selectSource).toContain('contentClassName={styles.triggerContent}')
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
  expect(selectCss).toContain('--rk-select-material: var(--rk-stone);')
  expect(selectCss).toContain('--rk-select-on-material: var(--rk-on-stone);')
  expect(selectCss).toContain('.paper')
  expect(selectCss).toContain('--rk-select-material: var(--rk-paper);')
  expect(selectCss).toContain('--rk-select-on-material: var(--rk-on-paper);')
  expect(selectCss).toContain('.primaryStrong')
  expect(selectCss).not.toContain('--rk-select-background')
  expect(selectCss).not.toContain('rgb(0 0 0 / 0.72)')
  expect(selectCss).toContain('--rk-select-content-background: var(--rk-stone);')
  expect(selectCss).not.toContain('rgb(20 20 20 / 0.96)')
  expect(selectCss).toContain('--rk-roco-shape-height: var(--rk-select-height);')
  expect(selectCss).toContain('--rk-roco-shape-min-width: var(--rk-select-min-width, 176px);')
  expect(selectCss).not.toContain('.trigger .triggerShape')
  expect(selectCss).not.toContain('--rk-roco-shape-fill-overlap')
  expect(selectCss).not.toContain('.trigger:active')
  expect(selectCss).not.toContain('transform: scale(0.96) translateY(4px);')
  expect(selectCss).toContain('.triggerContent')
  expect(selectCss).toContain('.contentShell')
  expect(selectCss).toContain(
    'box-shadow: 0 4px 0 var(--rk-select-shadow-color, var(--rk-shadow-color));',
  )
  expect(selectCss).toContain(".content[data-state='open'] .contentShell")
  expect(selectCss).toContain(".content[data-state='closed'] {")
  expect(selectCss).toContain(
    'animation: rk-select-content-presence-out var(--rk-select-exit-duration, 100ms) ease-in;',
  )
  expect(selectCss).toContain(".content[data-state='closed'] .contentShell")
  expect(selectCss).toContain(
    'animation: rk-select-content-out var(--rk-select-exit-duration, 100ms) ease-in forwards;',
  )
  expect(selectCss).toContain('@keyframes rk-select-content-in')
  expect(selectCss).toContain('@keyframes rk-select-content-presence-out')
  expect(selectCss).toContain('transform: scaleY(0);')
  expect(selectCss).toContain('transform: scaleY(1);')
  expect(selectCss).not.toContain('--rk-select-content-height')
  expect(selectCss).not.toContain('opacity: 0;')
  expect(selectCss).not.toContain('opacity: 1;')
  expect(selectCss).toContain('@media (prefers-reduced-motion: reduce)')
})

test('uses effect tokens for component shadows', () => {
  expect(drawerCss).toContain(
    'drop-shadow(0 3px 0 var(--rk-drawer-close-shadow-color, var(--rk-shadow-strong-color)))',
  )
})

test('supports optional modal header rune text behind the title', () => {
  expect(modalSource).toContain("import { RuneText } from '../rune-text'")
  expect(modalSource).toContain('headerRuneText?: ReactNode')
  expect(modalSource).toContain('headerRuneTextClassName?: string')
  expect(modalSource).toContain('const hasHeaderRuneText = hasContent(headerRuneText)')
  expect(modalSource).toContain('hasCustomHeader || hasTitle || hasHeaderRuneText || closable')
  expect(modalSource).toContain('<RuneText')
  expect(modalSource).toContain('aria-hidden="true"')
  expect(modalSource).toContain('font="rune"')
  expect(modalSource).toContain('`${prefixCls}-header-rune-text`')
  expect(modalSource).toContain('<RadixDialogTitle asChild>')
  expect(modalSource).toContain('as="h2"')
  expect(modalCss).toContain('--rk-rune-text-base-font-family')
  expect(modalCss).toContain('--rk-rune-text-base-font-weight')
})

test('styles modal as an overlayed dialog with optional regions', () => {
  expect(modalSource).toContain("import { RocoTheme } from '../theme'")
  expect(modalSource).toContain('<RocoTheme asChild>')
  expect(modalSource).toContain('style={contentStyle}')
  expect(modalSource).not.toContain('useRocoThemeStyle')
  expect(modalSource).not.toContain('themeStyle')
  expect(modalSource).not.toContain('RocoThemeScope')
  expect(modalCss).toContain('.overlay')
  expect(modalCss).not.toContain('backdrop-filter:')
  expect(modalCss).toContain('--rk-modal-width: 680px;')
  expect(modalCss).toContain(".overlay[data-state='open']")
  expect(modalCss).toContain(".content[data-state='closed'] .panel")
  expect(modalCss).toContain('@keyframes rk-modal-panel-in')
  expect(modalCss).toContain('transform: scale(0.9);')
  expect(modalCss).toContain('transform: scaleY(0.9) scaleX(1.2);')
  expect(modalCss).toContain('transform: scaleY(1.1) scaleX(0.9);')
  expect(modalCss).not.toContain('scale(1.014)')
  expect(modalCss).not.toContain('scale(1.003)')
  expect(modalCss).not.toContain('calc(-50% +')
  expect(modalCss).toContain('@media (prefers-reduced-motion: reduce)')
  expect(modalCss).toContain('.header')
  expect(modalCss).toContain('.headerRuneText')
  expect(modalCss).toContain('.footer')
  expect(modalCss).toContain('.visuallyHidden')
})

test('renders a scoped color variable theme', () => {
  expect(themeSource).toContain("import * as Slot from '@radix-ui/react-slot'")
  expect(themeSource).toContain('use,')
  expect(themeSource).toContain('const Root = asChild ? Slot.Root :')
  expect(themeSource).toContain(
    'const RocoThemeContext = createContext<RocoThemeContextValue | undefined>(undefined)',
  )
  expect(themeSource).toContain('const theme = use(RocoThemeContext)')
  expect(themeSource).toContain(
    "throw new Error('`useRocoTheme` must be used within a `RocoTheme`')",
  )
  expect(themeSource).toContain('<RocoThemeContext value={theme}>')
  expect(themeSource).not.toContain('useContext')
  expect(themeSource).not.toContain('forwardRef')
  expect(themeSource).not.toContain('.Provider')

  function ThemeProbe() {
    const theme = useRocoTheme()

    return createElement(
      'output',
      null,
      `${theme.colors.primary}/${theme.colors.onPrimary}/${theme.colors.shadowColor}`,
    )
  }

  const html = renderToString(
    createElement(
      RocoTheme,
      {
        className: 'custom-theme',
        colors: {
          onPrimary: '#10201a',
          onPrimaryStrong: '#fff8df',
          primary: '#6ee7b7',
          primaryStrong: '#276948',
          shadowColor: 'rgb(20 30 40 / 0.2)',
          shadowStrongColor: 'rgb(20 30 40 / 0.4)',
        },
        rootClassName: 'app-theme',
      },
      createElement(Button, {
        children: 'Scoped',
      }),
      createElement(
        RocoTheme,
        {
          colors: {
            onPrimary: '#133122',
            primary: '#34d399',
          },
        },
        createElement(Button, {
          children: 'Nested',
        }),
        createElement(ThemeProbe),
      ),
    ),
  )

  expect(html).toContain('<div')
  expect(html).toContain('rk-theme')
  expect(html).toContain('app-theme')
  expect(html).toContain('custom-theme')
  expect(html).toContain('--rk-primary:#6ee7b7')
  expect(html).toContain('--rk-on-primary:#10201a')
  expect(html).toContain('--rk-primary-strong:#276948')
  expect(html).toContain('--rk-on-primary-strong:#fff8df')
  expect(html).toContain('--rk-shadow-color:rgb(20 30 40 / 0.2)')
  expect(html).toContain('--rk-shadow-strong-color:rgb(20 30 40 / 0.4)')
  expect(html).toContain('--rk-primary:#34d399')
  expect(html).toContain('--rk-on-primary:#133122')
  expect(html).toContain('#34d399/#133122/rgb(20 30 40 / 0.2)')
  expect(html).toContain('Scoped')
  expect(html).toContain('Nested')

  const asChildHtml = renderToString(
    createElement(
      RocoTheme,
      {
        asChild: true,
        className: 'custom-theme',
        colors: {
          primary: '#abcdef',
        },
      },
      createElement('section', { className: 'theme-shell' }, 'Slot theme'),
    ),
  )

  expect(asChildHtml).toContain('<section')
  expect(asChildHtml).not.toContain('<div')
  expect(asChildHtml).toContain('rk-theme')
  expect(asChildHtml).toContain('custom-theme')
  expect(asChildHtml).toContain('theme-shell')
  expect(asChildHtml).toContain('--rk-primary:#abcdef')
  expect(asChildHtml).toContain('Slot theme')

  const inheritedAsChildHtml = renderToString(
    createElement(
      RocoTheme,
      {
        colors: {
          onPrimary: '#f8fafc',
          primary: '#2563eb',
        },
      },
      createElement(
        RocoTheme,
        { asChild: true },
        createElement('section', { className: 'portal-scope' }, 'Inherited slot theme'),
      ),
    ),
  )

  expect(inheritedAsChildHtml).toContain('portal-scope')
  expect(inheritedAsChildHtml).toContain('--rk-primary:#2563eb')
  expect(inheritedAsChildHtml).toContain('--rk-on-primary:#f8fafc')
  expect(inheritedAsChildHtml).toContain('Inherited slot theme')
})

test('renders rune text without registering fonts from JavaScript', () => {
  const html = renderToString(
    createElement(RuneText, {
      as: 'strong',
      children: 'Rune',
      className: 'custom-text',
      rootClassName: 'app-text',
    }),
  )

  expect(html).toContain('<strong')
  expect(html).toContain('rk-rune-text')
  expect(html).toContain('app-text')
  expect(html).toContain('custom-text')
  expect(html).toContain('Rune')
})

test('uses roco base font by default and keeps rune text explicit', () => {
  const defaultHtml = renderToString(createElement(RuneText, null, 'Base'))
  const runeHtml = renderToString(createElement(RuneText, { font: 'rune' }, 'Rune'))

  expect(defaultHtml).toContain('Base')
  expect(runeHtml).toContain('Rune')
  expect(runeTextCss).toContain('.base')
  expect(runeTextCss).toContain('.rune')
  expect(runeTextCss).toContain('--rk-rune-text-rune-font-family')
  expect(runeTextCss).toContain('--rk-rune-text-base-font-family')
  expect(runeTextCss).toContain('var(--rk-font-family-base, inherit)')
  expect(runeTextCss).toContain(
    'var(--rk-font-family-decorative, var(--rk-font-family-rune, inherit))',
  )
})

test('keeps font registration out of the base style entry', () => {
  expect(baseStyleCss).not.toContain('@font-face')
  expect(fontCss).toContain('@font-face')
  expect(fontCss).toContain('Roco Kingdom Sans')
  expect(fontCss).toContain('Roco Kingdom Rune')
  expect(fontCss).toContain('--rk-font-family-base')
  expect(fontCss).toContain('--rk-font-family-rune')
  expect(fontCss).toContain('--rk-font-family-decorative')
})

test('only exposes root components and manual style/font entries', () => {
  expect(packageJson.exports).toEqual({
    '.': {
      types: './dist/index.d.mts',
      import: './dist/index.mjs',
    },
    './font.css': './dist/font.css',
    './fonts/roco-kingdom-rune.ttf': './dist/fonts/roco-kingdom-rune.ttf',
    './fonts/roco-kingdom-sans.ttf': './dist/fonts/roco-kingdom-sans.ttf',
    './style.css': './dist/style.css',
    './package.json': './package.json',
  })
  expect(packageJson.exports).not.toHaveProperty('./button')
  expect(packageJson.sideEffects).toEqual(['**/*.css'])
})

test('uses radix dialog as the modal interaction primitive', () => {
  expect(packageJson.dependencies).toMatchObject({
    '@radix-ui/react-dialog': 'catalog:',
  })
})
