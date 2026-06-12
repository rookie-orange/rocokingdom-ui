import { expect, test } from 'vite-plus/test'
import { colors, gold, ink, paper, stone, tokensCss } from '../src/index.ts'

test('exports four direct color values', () => {
  expect(paper).toBe('#f4f0e8')
  expect(stone).toBe('#242628')
  expect(ink).toBe('#222222')
  expect(gold).toBe('#e7bf67')
  expect(colors).toEqual({ paper, stone, ink, gold })
})

test('exports the root color css', () => {
  expect(tokensCss).toBe(`:root {
  --paper: #f4f0e8;
  --stone: #242628;
  --ink: #222222;
  --gold: #e7bf67;
}`)
})
