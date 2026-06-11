export { gold } from './gold.ts'
export { borderWidth, control, font, motion, opacity, radius, space, zIndex } from './layout.ts'
export { magic } from './magic.ts'
export { material } from './material.ts'
export { neutral } from './neutral.ts'
export { rarity } from './rarity.ts'

import { gold } from './gold.ts'
import { borderWidth, control, font, motion, opacity, radius, space, zIndex } from './layout.ts'
import { magic } from './magic.ts'
import { material } from './material.ts'
import { neutral } from './neutral.ts'
import { rarity } from './rarity.ts'

export const primitive = {
  neutral,
  gold,
  magic,
  rarity,
  material,
  space,
  radius,
  borderWidth,
  font,
  control,
  motion,
  opacity,
  zIndex,
} as const

export type PrimitiveTokens = typeof primitive
