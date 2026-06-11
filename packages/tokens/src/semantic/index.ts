export { border } from './border.ts'
export { state } from './state.ts'
export { surface } from './surface.ts'
export { text } from './text.ts'

import { border } from './border.ts'
import { state } from './state.ts'
import { surface } from './surface.ts'
import { text } from './text.ts'

export const semantic = {
  surface,
  text,
  border,
  state,
} as const

export type SemanticTokens = typeof semantic
