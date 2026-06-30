import { readFileSync } from 'node:fs'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { expect, test } from 'vite-plus/test'
import { Button } from '../button'
import { RocoTheme, rocoThemePrefixCls, useRocoTheme } from './index'

const themeSource = readFileSync(new URL('./index.tsx', import.meta.url), 'utf8')

test('exports a prefix class', () => {
  expect(rocoThemePrefixCls).toBe('rk-theme')
})

test('renders a scoped color variable theme', () => {
  expect(themeSource).toContain("import * as Slot from '@radix-ui/react-slot'")
  expect(themeSource).toContain('use,')
  expect(themeSource).toContain('const Root = asChild ? Slot.Root :')
  expect(themeSource).toContain(
    'const RocoThemeContext = createContext<RocoThemeContextValue | undefined>(undefined)',
  )
  expect(themeSource).toContain('export interface RocoThemeTokens')
  expect(themeSource).toContain("'--rk-font-size-base'")
  expect(themeSource).toContain("'--rk-radius'")
  expect(themeSource).toContain("'--rk-control-height-middle'")
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
        tokens: {
          controlHeightMiddle: '36px',
          fontSizeBase: '17px',
          radius: '10px',
        },
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
  expect(themeSource).toContain("'--rk-paper-soft'")
  expect(themeSource).toContain("'--rk-paper-muted'")
  expect(themeSource).toContain("'--rk-paper-strong'")
  expect(themeSource).toContain("'--rk-stone-soft'")
  expect(themeSource).toContain("'--rk-stone-muted'")
  expect(themeSource).toContain("'--rk-stone-strong'")
  expect(themeSource).toContain("'--rk-on-paper-soft'")
  expect(themeSource).toContain("'--rk-on-paper-muted'")
  expect(themeSource).toContain("'--rk-on-paper-strong'")
  expect(themeSource).toContain("'--rk-on-stone-soft'")
  expect(themeSource).toContain("'--rk-on-stone-muted'")
  expect(themeSource).toContain("'--rk-on-stone-strong'")
  expect(html).toContain('--rk-shadow-color:rgb(20 30 40 / 0.2)')
  expect(html).toContain('--rk-shadow-strong-color:rgb(20 30 40 / 0.4)')
  expect(html).toContain('--rk-font-size-base:17px')
  expect(html).toContain('--rk-radius:10px')
  expect(html).toContain('--rk-control-height-middle:36px')
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
