export const paper = '#f4f0e8'
export const stone = '#242628'
export const primary = '#ffc65f'

export const onPaper = '#222222'
export const onStone = '#f4f0e8'
export const onPrimary = '#242628'

export const colors = {
  onPaper,
  onPrimary,
  onStone,
  paper,
  primary,
  stone,
} as const

export const cssVariables = {
  onPaper: '--rk-on-paper',
  onPrimary: '--rk-on-primary',
  onStone: '--rk-on-stone',
  paper: '--rk-paper',
  primary: '--rk-primary',
  stone: '--rk-stone',
} as const

export type ColorName = keyof typeof colors
export type CssVariableName = keyof typeof cssVariables
