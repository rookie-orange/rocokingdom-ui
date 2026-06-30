import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  tabListPrefixCls,
  tabPanelPrefixCls,
  tabPrefixCls,
  tabsPrefixCls,
} from './index'

const tabsCss = readFileSync(new URL('./tabs.module.css', import.meta.url), 'utf8')
const tabsSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports prefix classes', () => {
  expect(tabsPrefixCls).toBe('rk-tabs')
  expect(tabListPrefixCls).toBe('rk-tab-list')
  expect(tabPrefixCls).toBe('rk-tab')
  expect(tabPanelPrefixCls).toBe('rk-tab-panel')
})

test('uses button-compatible roco shapes for the list and selected tab', () => {
  expect(tabsSource).toContain("import { Material, type MaterialPreset } from '../material'")
  expect(tabsSource).toContain("import { RocoShape } from '../roco-shape'")
  expect(tabsSource).toContain("import { RuneText } from '../rune-text'")
  expect(tabsSource).toContain('role="tablist"')
  expect(tabsSource).toContain('role="tab"')
  expect(tabsSource).toContain('role="tabpanel"')
  expect(tabsSource).toContain('variant="solid"')
  expect(tabsSource).toContain("variant={isSelected ? 'solid' : 'text'}")
  expect(tabsSource).toContain("color={isSelected ? undefined : 'var(--rk-material-color)'}")
  expect(tabsSource).not.toContain('TabsOrientation')
  expect(tabsSource).not.toContain('selectedShadow')
  expect(tabsSource).not.toContain('listShadow')
  expect(tabsSource).not.toContain('shadow=')
  expect(tabsSource).not.toContain("from '../button'")
  expect(tabsCss).toContain('min-height: calc(var(--rk-control-height-middle, 32px) + 6px);')
  expect(tabsCss).toContain('gap: 2px;')
  expect(tabsCss).toContain('height: var(--rk-control-height-middle, 32px);')
  expect(tabsCss).not.toContain('--rk-tabs-')
})

test('renders accessible compound tabs with active panel state', () => {
  const html = renderToString(
    createElement(
      Tabs,
      {
        className: 'custom-tabs',
        defaultValue: 'bag',
        id: 'pet-tabs',
        name: 'petSection',
        rootClassName: 'app-tabs',
      },
      createElement(
        TabList,
        {
          className: 'custom-list',
          rootClassName: 'app-list',
        },
        createElement(
          Tab,
          {
            className: 'custom-tab',
            unselectedClassName: 'idle-tab',
            value: 'team',
          },
          '队伍',
        ),
        createElement(
          Tab,
          {
            className: 'custom-tab',
            selectedClassName: 'active-tab',
            value: 'bag',
          },
          '背包',
        ),
      ),
      createElement(TabPanel, { value: 'team' }, '队伍内容'),
      createElement(TabPanel, { className: 'bag-panel', value: 'bag' }, '背包内容'),
    ),
  )

  expect(html).toContain('rk-tabs')
  expect(html).toContain('rk-tab-list')
  expect(html).toContain('rk-tab')
  expect(html).toContain('rk-tab-panel')
  expect(html).toContain('app-tabs')
  expect(html).toContain('custom-tabs')
  expect(html).toContain('app-list')
  expect(html).toContain('custom-list')
  expect(html).toContain('custom-tab')
  expect(html).toContain('active-tab')
  expect(html).toContain('idle-tab')
  expect(html).toContain('bag-panel')
  expect(html).toContain('role="tablist"')
  expect(html).toContain('role="tab"')
  expect(html).toContain('role="tabpanel"')
  expect(html).toContain('aria-selected="true"')
  expect(html).toContain('aria-selected="false"')
  expect(html).toContain('aria-controls="pet-tabs-panel-bag"')
  expect(html).toContain('aria-labelledby="pet-tabs-tab-bag"')
  expect(html).toContain('id="pet-tabs-tab-bag"')
  expect(html).toContain('id="pet-tabs-panel-bag"')
  expect(html).toContain('type="hidden"')
  expect(html).toContain('name="petSection"')
  expect(html).toContain('value="bag"')
  expect(html).toContain('队伍内容')
  expect(html).toContain('背包内容')
})

test('supports sizing and unmounting inactive panels without vertical tabs', () => {
  const html = renderToString(
    createElement(
      Tabs,
      {
        defaultValue: 'map',
        listMaterial: 'stone',
        selectedMaterial: 'primaryStrong',
        size: 'large',
      },
      createElement(
        TabList,
        null,
        createElement(Tab, { value: 'map' }, '地图'),
        createElement(Tab, { disabled: true, value: 'arena' }, '竞技'),
      ),
      createElement(TabPanel, { forceMount: false, value: 'arena' }, '竞技内容'),
      createElement(TabPanel, { forceMount: false, value: 'map' }, '地图内容'),
    ),
  )

  expect(html).toContain('primary-strong')
  expect(html).toContain('stone')
  expect(html).toContain('--rk-roco-shape-color:var(--rk-material-color)')
  expect(html).toContain('large')
  expect(html).toContain('aria-disabled="true"')
  expect(html).not.toContain('竞技内容')
  expect(html).toContain('地图内容')
  expect(tabsSource).not.toContain('orientation')
  expect(tabsCss).not.toContain('grid-template-columns')
  expect(tabsCss).not.toContain('flex-direction: column;')
  expect(tabsCss).toContain('@keyframes rk-tab-selected-pop')
})
