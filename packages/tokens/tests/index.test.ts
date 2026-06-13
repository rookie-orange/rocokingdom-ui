import { expect, test } from 'vite-plus/test'
import { colors, gold, ink, paper, stone } from '../src/index.ts'

test('exports four direct color values', () => {
  expect(paper).toBe('#f4f0e8')
  expect(stone).toBe('#242628')
  expect(ink).toBe('#222222')
  expect(gold).toBe('#FFC65F')
  expect(colors).toEqual({ paper, stone, ink, gold })
})
