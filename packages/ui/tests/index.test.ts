import { expect, test } from 'vite-plus/test'
import { readFile } from 'node:fs/promises'
import { colors } from '@rocokingdom-ui/tokens'
import { createTokenVarsCss } from '../build/token-vars-plugin.ts'
import { Button, buttonPrefixCls } from '../src/index.ts'

test('exports a single button prefix class', () => {
  expect(buttonPrefixCls).toBe('rk-button')
})

test('exports a React button component with modern class name slots', () => {
  expect(Button({ children: 'Start' })).toMatchObject({
    props: {
      children: 'Start',
      className: 'rk-button',
      type: 'button',
    },
    type: 'button',
  })

  expect(
    Button({ children: 'Start', className: 'custom-button', rootClassName: 'app-button' }),
  ).toMatchObject({
    props: {
      className: 'rk-button app-button custom-button',
    },
  })

  expect(Button({ children: 'Start', prefixCls: 'app-prefix' })).toMatchObject({
    props: {
      className: 'app-prefix',
    },
  })
})

test('keeps button CSS next to the button component', async () => {
  const buttonCss = await readFile(
    new URL('../src/button/style/index.css', import.meta.url),
    'utf8',
  )

  expect(buttonCss).toContain('.rk-button')
  expect(buttonCss).toContain('background-color: var(--gold, #ffc65f);')
  expect(buttonCss).toContain('color: var(--ink, #222222);')
  expect(buttonCss).toContain('border: 0;')
  expect(buttonCss).toContain('border-radius: 9999px;')
  expect(buttonCss).toContain('background-color 160ms ease')
  expect(buttonCss).toContain('filter: brightness(1.08);')
  expect(buttonCss).toContain('transform: scale(0.94);')
})

test('aggregates generated token variables and component styles in one style entry', async () => {
  const styleEntry = await readFile(new URL('../src/style.ts', import.meta.url), 'utf8')

  expect(styleEntry).toContain("import 'virtual:rocokingdom-ui-token-vars.css'")
  expect(styleEntry).toContain("import './button/style/index.css'")
})

test('generates CSS variables from the tokens package', () => {
  const tokenVarsCss = createTokenVarsCss()

  expect(tokenVarsCss).toContain(`--paper: ${colors.paper.toLowerCase()};`)
  expect(tokenVarsCss).toContain(`--stone: ${colors.stone.toLowerCase()};`)
  expect(tokenVarsCss).toContain(`--ink: ${colors.ink.toLowerCase()};`)
  expect(tokenVarsCss).toContain(`--gold: ${colors.gold.toLowerCase()};`)
})
