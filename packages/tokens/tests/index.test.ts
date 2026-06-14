import { expect, test } from 'vite-plus/test'
import {
  colors,
  cssVariables,
  onPaper,
  onPrimary,
  onStone,
  paper,
  primary,
  stone,
} from '../src/index.ts'

test('exports material and foreground color values', () => {
  expect(paper).toBe('#f4f0e8')
  expect(stone).toBe('#242628')
  expect(primary).toBe('#ffc65f')
  expect(onPaper).toBe('#222222')
  expect(onStone).toBe('#f4f0e8')
  expect(onPrimary).toBe('#242628')
  expect(colors).toEqual({ onPaper, onPrimary, onStone, paper, primary, stone })
})

test('exports css variable names for theme authors', () => {
  expect(cssVariables).toEqual({
    onPaper: '--rk-on-paper',
    onPrimary: '--rk-on-primary',
    onStone: '--rk-on-stone',
    paper: '--rk-paper',
    primary: '--rk-primary',
    stone: '--rk-stone',
  })
})
