import { magic } from '../primitive/index.ts'

export const state = {
  success: magic.nature,
  warning: magic.warning,
  danger: magic.danger,
  info: magic.info,
  magic: magic.arcane,
} as const
