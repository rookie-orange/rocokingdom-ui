import { expect, test } from 'vite-plus/test'
import { Check, Cross, RocoCheck, RocoCross } from './index.ts'

test('exports icon components and Roco aliases', () => {
  expect(typeof Check).toBe('function')
  expect(typeof Cross).toBe('function')
  expect(RocoCheck).toBe(Check)
  expect(RocoCross).toBe(Cross)
})
