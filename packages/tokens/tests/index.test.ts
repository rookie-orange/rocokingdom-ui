import { expect, test } from 'vite-plus/test'
import {
  colors,
  cssVariables,
  danger,
  effectVariables,
  effects,
  onDanger,
  onPaper,
  onPaperMuted,
  onPaperSoft,
  onPaperStrong,
  onPrimary,
  onPrimaryMuted,
  onPrimarySoft,
  onPrimaryStrong,
  onSuccess,
  onStone,
  onStoneMuted,
  onStoneSoft,
  onStoneStrong,
  paper,
  paperMuted,
  paperSoft,
  paperStrong,
  primary,
  primaryMuted,
  primarySoft,
  primaryStrong,
  shadowColor,
  shadowSoftColor,
  shadowStrongColor,
  stone,
  stoneMuted,
  stoneSoft,
  stoneStrong,
  success,
} from '../src/index.ts'

test('exports material and foreground color values', () => {
  expect(paper).toBe('#f4f0e8')
  expect(paperSoft).toBe('#fffaf2')
  expect(paperMuted).toBe('#e5dccd')
  expect(paperStrong).toBe('#cdbcaa')
  expect(stone).toBe('#242628')
  expect(stoneSoft).toBe('#393d40')
  expect(stoneMuted).toBe('#4d5358')
  expect(stoneStrong).toBe('#141719')
  expect(primary).toBe('#ffc65f')
  expect(primarySoft).toBe('#fff1cf')
  expect(primaryMuted).toBe('#f7d56f')
  expect(primaryStrong).toBe('#d89522')
  expect(success).toBe('#2f9e66')
  expect(danger).toBe('#d94b4b')
  expect(onPaper).toBe('#222222')
  expect(onPaperSoft).toBe('#222222')
  expect(onPaperMuted).toBe('#222222')
  expect(onPaperStrong).toBe('#222222')
  expect(onStone).toBe('#f4f0e8')
  expect(onStoneSoft).toBe('#f4f0e8')
  expect(onStoneMuted).toBe('#f4f0e8')
  expect(onStoneStrong).toBe('#f4f0e8')
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
    onPaperMuted,
    onPaperSoft,
    onPaperStrong,
    onPrimary,
    onPrimaryMuted,
    onPrimarySoft,
    onPrimaryStrong,
    onSuccess,
    onStone,
    onStoneMuted,
    onStoneSoft,
    onStoneStrong,
    paper,
    paperMuted,
    paperSoft,
    paperStrong,
    primary,
    primaryMuted,
    primarySoft,
    primaryStrong,
    stone,
    stoneMuted,
    stoneSoft,
    stoneStrong,
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
    onPaperMuted: '--rk-on-paper-muted',
    onPaperSoft: '--rk-on-paper-soft',
    onPaperStrong: '--rk-on-paper-strong',
    onPrimary: '--rk-on-primary',
    onPrimaryMuted: '--rk-on-primary-muted',
    onPrimarySoft: '--rk-on-primary-soft',
    onPrimaryStrong: '--rk-on-primary-strong',
    onSuccess: '--rk-on-success',
    onStone: '--rk-on-stone',
    onStoneMuted: '--rk-on-stone-muted',
    onStoneSoft: '--rk-on-stone-soft',
    onStoneStrong: '--rk-on-stone-strong',
    paper: '--rk-paper',
    paperMuted: '--rk-paper-muted',
    paperSoft: '--rk-paper-soft',
    paperStrong: '--rk-paper-strong',
    primary: '--rk-primary',
    primaryMuted: '--rk-primary-muted',
    primarySoft: '--rk-primary-soft',
    primaryStrong: '--rk-primary-strong',
    stone: '--rk-stone',
    stoneMuted: '--rk-stone-muted',
    stoneSoft: '--rk-stone-soft',
    stoneStrong: '--rk-stone-strong',
    success: '--rk-success',
  })
})
