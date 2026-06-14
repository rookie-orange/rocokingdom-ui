export const paper = '#f4f0e8'
export const stone = '#242628'
export const ink = '#222222'
export const gold = '#FFC65F'

export const colors = {
  paper,
  stone,
  ink,
  gold,
} as const

export const seedToken = {
  colorBgContainer: paper,
  colorBorder: stone,
  colorPrimary: gold,
  colorText: ink,
  colorTextLightSolid: paper,
  borderRadius: 9999,
  controlHeight: 40,
  fontSize: 14,
  lineHeight: 1.4,
  motionDurationFast: '120ms',
  motionDurationMid: '160ms',
} as const

export type SeedToken = typeof seedToken
