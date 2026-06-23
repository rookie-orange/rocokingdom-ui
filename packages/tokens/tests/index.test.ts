import { expect, test } from 'vite-plus/test'
import {
  colors,
  cssVariables,
  danger,
  effectVariables,
  effects,
  onDanger,
  onPaper,
  onPrimary,
  onPrimaryMuted,
  onPrimarySoft,
  onPrimaryStrong,
  onSuccess,
  onStone,
  paper,
  primary,
  primaryMuted,
  primarySoft,
  primaryStrong,
  shadowColor,
  shadowSoftColor,
  shadowStrongColor,
  stone,
  success,
} from '../src/index.ts'

test('exports material and foreground color values', () => {
  expect(paper).toBe('#f4f0e8')
  expect(stone).toBe('#242628')
  expect(primary).toBe('#ffc65f')
  expect(primarySoft).toBe('#fff1cf')
  expect(primaryMuted).toBe('#f7d56f')
  expect(primaryStrong).toBe('#d89522')
  expect(success).toBe('#2f9e66')
  expect(danger).toBe('#d94b4b')
  expect(onPaper).toBe('#222222')
  expect(onStone).toBe('#f4f0e8')
  expect(onPrimary).toBe('#242628')
  expect(onPrimarySoft).toBe('#2b2414')
  expect(onPrimaryMuted).toBe('#2b2414')
  expect(onPrimaryStrong).toBe('#fff9ec')
  expect(onSuccess).toBe('#f3fff8')
  expect(onDanger).toBe('#fff6f4')
  expect(colors).toEqual({
    danger,
    onDanger,
    onPaper,
    onPrimary,
    onPrimaryMuted,
    onPrimarySoft,
    onPrimaryStrong,
    onSuccess,
    onStone,
    paper,
    primary,
    primaryMuted,
    primarySoft,
    primaryStrong,
    stone,
    success,
  })
})

test('exports effect values separately from material colors', () => {
  expect(shadowSoftColor).toBe('rgb(36 38 40 / 0.08)')
  expect(shadowColor).toBe('rgb(36 38 40 / 0.16)')
  expect(shadowStrongColor).toBe('rgb(36 38 40 / 0.32)')
  expect(effects).toEqual({
    shadowColor,
    shadowSoftColor,
    shadowStrongColor,
  })
  expect(colors).not.toHaveProperty('shadowColor')
  expect(effectVariables).toEqual({
    shadowColor: '--rk-shadow-color',
    shadowSoftColor: '--rk-shadow-soft-color',
    shadowStrongColor: '--rk-shadow-strong-color',
  })
})

test('exports css variable names for theme authors', () => {
  expect(cssVariables).toEqual({
    danger: '--rk-danger',
    onDanger: '--rk-on-danger',
    onPaper: '--rk-on-paper',
    onPrimary: '--rk-on-primary',
    onPrimaryMuted: '--rk-on-primary-muted',
    onPrimarySoft: '--rk-on-primary-soft',
    onPrimaryStrong: '--rk-on-primary-strong',
    onSuccess: '--rk-on-success',
    onStone: '--rk-on-stone',
    paper: '--rk-paper',
    primary: '--rk-primary',
    primaryMuted: '--rk-primary-muted',
    primarySoft: '--rk-primary-soft',
    primaryStrong: '--rk-primary-strong',
    stone: '--rk-stone',
    success: '--rk-success',
  })
})
