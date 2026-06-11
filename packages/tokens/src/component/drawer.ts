import { border, surface, text } from '../semantic/index.ts'

export const drawer = {
  background: surface.drawer,
  color: text.onDark,
  border: border.dark,
  shadow: '0 18px 48px rgb(0 0 0 / 34%)',
} as const
