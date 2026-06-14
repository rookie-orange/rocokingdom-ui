import { expect, test } from 'vite-plus/test'
import { colors, gold, ink, paper, seedToken, stone } from '../src/index.ts'

test('exports four direct color values', () => {
  expect(paper).toBe('#f4f0e8')
  expect(stone).toBe('#242628')
  expect(ink).toBe('#222222')
  expect(gold).toBe('#FFC65F')
  expect(colors).toEqual({ paper, stone, ink, gold })
})

test('exports seed tokens for component themes', () => {
  expect(seedToken).toMatchObject({
    colorBgContainer: paper,
    colorBorder: stone,
    colorPrimary: gold,
    colorText: ink,
    colorTextLightSolid: paper,
  })
})
