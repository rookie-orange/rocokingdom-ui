import { readFileSync } from 'node:fs'
import { expect, test } from 'vite-plus/test'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import packageJson from '../package.json' with { type: 'json' }
import {
  Button,
  ButtonNormal,
  Drawer,
  DrawerClose,
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
  RocoProvider,
  RocoShape,
  RuneText,
  buttonNormalPrefixCls,
  buttonPrefixCls,
  drawerPrefixCls,
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
  runeTextPrefixCls,
  rocoShapePrefixCls,
} from '../src/index.ts'

const baseStyleCss = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')
const fontCss = readFileSync(new URL('../src/font.css', import.meta.url), 'utf8')
const decorativeFontCss = readFileSync(
  new URL('../src/decorative-font.css', import.meta.url),
  'utf8',
)
const buttonCss = readFileSync(new URL('../src/button/button.module.css', import.meta.url), 'utf8')
const buttonNormalCss = readFileSync(
  new URL('../src/button-normal/button-normal.module.css', import.meta.url),
  'utf8',
)
const radioGroupCss = readFileSync(
  new URL('../src/radio-group/radio-group.module.css', import.meta.url),
  'utf8',
)
const radioGroupSource = readFileSync(
  new URL('../src/radio-group/index.tsx', import.meta.url),
  'utf8',
)
const modalSource = readFileSync(new URL('../src/modal/index.tsx', import.meta.url), 'utf8')
const modalCss = readFileSync(new URL('../src/modal/modal.module.css', import.meta.url), 'utf8')
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

test('exports a single button prefix class', () => {
  expect(buttonPrefixCls).toBe('rk-button')
  expect(buttonNormalPrefixCls).toBe('rk-button-normal')
  expect(drawerPrefixCls).toBe('rk-drawer')
  expect(DrawerClose).toBeTruthy()
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
  expect(rocoShapePrefixCls).toBe('rk-roco-shape')
  expect(runeTextPrefixCls).toBe('rk-rune-text')
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
  expect(html).toContain('app-button')
  expect(html).toContain('custom-button')
  expect(html).toContain('type="button"')
})

test('passes the optional shadow prop from button to its shape', () => {
  const defaultHtml = renderToString(createElement(Button, { children: 'Plain' }))
  const shadowHtml = renderToString(createElement(Button, { children: 'Raised', shadow: true }))

  expect(defaultHtml).not.toContain('withShadow')
  expect(shadowHtml).toContain('withShadow')
})

test('pins button sizes with explicit heights in flex rows', () => {
  expect(buttonCss).toContain('box-sizing: border-box;')
  expect(buttonCss).toContain('height: var(--rk-button-height);')
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
  expect(html).toContain('style="min-width:96px"')
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
})

test('uses radix dialog for drawer behavior and defaults right drawer to a left curve', () => {
  expect(radixDialogSource).toContain("import * as Dialog from '@radix-ui/react-dialog'")
  expect(drawerSource).toContain("return 'left'")
  expect(drawerSource).toContain('<Panel')
  expect(drawerSource).toContain('RadixDialogClose')
  expect(drawerSource).toContain('innerClassName')
  expect(drawerSource).toContain('styles.panelContent')
  expect(drawerCss).toContain('.panelContent')
  expect(drawerCss).toContain('.inner')
  expect(drawerCss).toContain('var(--rk-drawer-curve-inset, 96px)')
  expect(drawerCss).toContain(".content[data-state='open'].right")
  expect(drawerCss).toContain('transform: translateX(100%);')
  expect(drawerCss).toContain('@media (prefers-reduced-motion: reduce)')
})

test('renders a radix-backed select trigger on the server', () => {
  const html = renderToString(
    createElement(Select, {
      ariaLabel: '待机设置',
      defaultValue: '10',
      options: [
        { label: '10分钟', value: '10' },
        { label: '20分钟', value: '20' },
      ],
      placeholder: '选择时间',
    }),
  )

  expect(html).toContain('rk-select')
  expect(html).toContain('role="combobox"')
  expect(html).toContain('aria-label="待机设置"')
  expect(html).toContain('10分钟')
})

test('uses radix select and animates select content with scale', () => {
  expect(selectSource).toContain("import * as RadixSelect from '@radix-ui/react-select'")
  expect(selectSource).toContain("position={props.position ?? 'popper'}")
  expect(selectSource).toContain("align={props.align ?? 'start'}")
  expect(selectSource).toContain('sideOffset={props.sideOffset ?? 8}')
  expect(selectSource).toContain('contentShellClassName')
  expect(selectSource).not.toContain('scrollHeight')
  expect(selectSource).not.toContain('ResizeObserver')
  expect(selectCss).toContain('.contentShell')
  expect(selectCss).toContain(".content[data-state='open'] .contentShell")
  expect(selectCss).toContain('@keyframes rk-select-content-in')
  expect(selectCss).toContain('transform: scaleY(0);')
  expect(selectCss).toContain('transform: scaleY(1);')
  expect(selectCss).not.toContain('--rk-select-content-height')
  expect(selectCss).not.toContain('opacity: 0;')
  expect(selectCss).not.toContain('opacity: 1;')
  expect(selectCss).toContain('@media (prefers-reduced-motion: reduce)')
})

test('supports optional modal header rune text behind the title', () => {
  expect(modalSource).toContain("import { RuneText } from '../rune-text'")
  expect(modalSource).toContain('headerRuneText?: ReactNode')
  expect(modalSource).toContain('headerRuneTextClassName?: string')
  expect(modalSource).toContain('const hasHeaderRuneText = hasContent(headerRuneText)')
  expect(modalSource).toContain('hasCustomHeader || hasTitle || hasHeaderRuneText || closable')
  expect(modalSource).toContain('<RuneText')
  expect(modalSource).toContain('aria-hidden="true"')
  expect(modalSource).toContain('`${prefixCls}-header-rune-text`')
})

test('styles modal as an overlayed dialog with optional regions', () => {
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

test('renders a color variable provider without extra markup', () => {
  const html = renderToString(
    createElement(
      RocoProvider,
      {
        colors: {
          onPrimary: '#10201a',
          primary: '#6ee7b7',
        },
      },
      createElement(Button, {
        children: 'Scoped',
      }),
    ),
  )

  expect(html).not.toContain('<div')
  expect(html).not.toContain('--rk-primary:#6ee7b7')
  expect(html).not.toContain('--rk-on-primary:#10201a')
  expect(html).toContain('Scoped')
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

test('keeps font registration out of the base style entry', () => {
  expect(baseStyleCss).not.toContain('@font-face')
  expect(fontCss).toContain('@font-face')
  expect(fontCss).toContain('Roco Kingdom Sans')
  expect(decorativeFontCss).toContain('@font-face')
  expect(decorativeFontCss).toContain('Roco Kingdom Rune')
})

test('only exposes root components and manual style/font entries', () => {
  expect(packageJson.exports).toEqual({
    '.': {
      types: './dist/index.d.mts',
      import: './dist/index.mjs',
    },
    './decorative-font.css': './dist/decorative-font.css',
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
