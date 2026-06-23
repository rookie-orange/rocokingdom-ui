export const paper = '#f4f0e8'
export const stone = '#242628'
export const primary = '#ffc65f'
export const primarySoft = '#fff1cf'
export const primaryMuted = '#f7d56f'
export const primaryStrong = '#d89522'
export const success = '#2f9e66'
export const danger = '#d94b4b'

export const onPaper = '#222222'
export const onStone = '#f4f0e8'
export const onPrimary = '#242628'
export const onPrimarySoft = '#2b2414'
export const onPrimaryMuted = '#2b2414'
export const onPrimaryStrong = '#fff9ec'
export const onSuccess = '#f3fff8'
export const onDanger = '#fff6f4'

export const shadowSoftColor = 'rgb(36 38 40 / 0.08)'
export const shadowColor = 'rgb(36 38 40 / 0.16)'
export const shadowStrongColor = 'rgb(36 38 40 / 0.32)'

export const colors = {
  danger,
  onDanger,
  onPaper,
  onPrimary,
  onPrimaryMuted,
  onPrimarySoft,
  onPrimaryStrong,
  onSuccess,
  onStone,
  paper,
  primary,
  primaryMuted,
  primarySoft,
  primaryStrong,
  stone,
  success,
} as const

export const cssVariables = {
  danger: '--rk-danger',
  onDanger: '--rk-on-danger',
  onPaper: '--rk-on-paper',
  onPrimary: '--rk-on-primary',
  onPrimaryMuted: '--rk-on-primary-muted',
  onPrimarySoft: '--rk-on-primary-soft',
  onPrimaryStrong: '--rk-on-primary-strong',
  onSuccess: '--rk-on-success',
  onStone: '--rk-on-stone',
  paper: '--rk-paper',
  primary: '--rk-primary',
  primaryMuted: '--rk-primary-muted',
  primarySoft: '--rk-primary-soft',
  primaryStrong: '--rk-primary-strong',
  stone: '--rk-stone',
  success: '--rk-success',
} as const

export const effects = {
  shadowColor,
  shadowSoftColor,
  shadowStrongColor,
} as const

export const effectVariables = {
  shadowColor: '--rk-shadow-color',
  shadowSoftColor: '--rk-shadow-soft-color',
  shadowStrongColor: '--rk-shadow-strong-color',
} as const

export type ColorName = keyof typeof colors
export type CssVariableName = keyof typeof cssVariables
export type EffectName = keyof typeof effects
export type EffectVariableName = keyof typeof effectVariables
