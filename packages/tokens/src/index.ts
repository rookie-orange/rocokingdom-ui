export * from './component/index.ts'
export * from './css.ts'
export * from './primitive/index.ts'
export * from './semantic/index.ts'
export * from './theme/index.ts'

import { component } from './component/index.ts'
import { primitive } from './primitive/index.ts'
import { semantic } from './semantic/index.ts'
import { themes } from './theme/index.ts'

export const tokenPrefix = 'rk'

export const tokens = {
  primitive,
  semantic,
  component,
  themes,
} as const

export type Tokens = typeof tokens
