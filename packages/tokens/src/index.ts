export const paper = '#f4f0e8'
export const paperSoft = '#fffaf2'
export const paperMuted = '#e5dccd'
export const paperStrong = '#cdbcaa'
export const stone = '#242628'
export const stoneSoft = '#393d40'
export const stoneMuted = '#4d5358'
export const stoneStrong = '#141719'
export const primary = '#ffc65f'
export const primarySoft = '#fff1cf'
export const primaryMuted = '#f7d56f'
export const primaryStrong = '#d89522'
export const success = '#2f9e66'
export const danger = '#d94b4b'

export const onPaper = '#222222'
export const onPaperSoft = '#222222'
export const onPaperMuted = '#222222'
export const onPaperStrong = '#222222'
export const onStone = '#f4f0e8'
export const onStoneSoft = '#f4f0e8'
export const onStoneMuted = '#f4f0e8'
export const onStoneStrong = '#f4f0e8'
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
  onPaperMuted,
  onPaperSoft,
  onPaperStrong,
  onPrimary,
  onPrimaryMuted,
  onPrimarySoft,
  onPrimaryStrong,
  onSuccess,
  onStone,
  onStoneMuted,
  onStoneSoft,
  onStoneStrong,
  paper,
  paperMuted,
  paperSoft,
  paperStrong,
  primary,
  primaryMuted,
  primarySoft,
  primaryStrong,
  stone,
  stoneMuted,
  stoneSoft,
  stoneStrong,
  success,
} as const

export const cssVariables = {
  danger: '--rk-danger',
  onDanger: '--rk-on-danger',
  onPaper: '--rk-on-paper',
  onPaperMuted: '--rk-on-paper-muted',
  onPaperSoft: '--rk-on-paper-soft',
  onPaperStrong: '--rk-on-paper-strong',
  onPrimary: '--rk-on-primary',
  onPrimaryMuted: '--rk-on-primary-muted',
  onPrimarySoft: '--rk-on-primary-soft',
  onPrimaryStrong: '--rk-on-primary-strong',
  onSuccess: '--rk-on-success',
  onStone: '--rk-on-stone',
  onStoneMuted: '--rk-on-stone-muted',
  onStoneSoft: '--rk-on-stone-soft',
  onStoneStrong: '--rk-on-stone-strong',
  paper: '--rk-paper',
  paperMuted: '--rk-paper-muted',
  paperSoft: '--rk-paper-soft',
  paperStrong: '--rk-paper-strong',
  primary: '--rk-primary',
  primaryMuted: '--rk-primary-muted',
  primarySoft: '--rk-primary-soft',
  primaryStrong: '--rk-primary-strong',
  stone: '--rk-stone',
  stoneMuted: '--rk-stone-muted',
  stoneSoft: '--rk-stone-soft',
  stoneStrong: '--rk-stone-strong',
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
