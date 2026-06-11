export { button } from './button.ts'
export { dialog } from './dialog.ts'
export { drawer } from './drawer.ts'

import { button } from './button.ts'
import { dialog } from './dialog.ts'
import { drawer } from './drawer.ts'

export const component = {
  button,
  dialog,
  drawer,
} as const

export type ComponentTokens = typeof component
