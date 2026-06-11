export { darkTheme } from './dark.ts'
export { lightTheme } from './light.ts'

import { darkTheme } from './dark.ts'
import { lightTheme } from './light.ts'

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const

export const themeNames = Object.freeze(Object.keys(themes)) as readonly ThemeName[]

export type ThemeName = keyof typeof themes
export type ThemeTokens = (typeof themes)[ThemeName]
