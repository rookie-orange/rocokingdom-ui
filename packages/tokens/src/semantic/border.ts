import { gold, material, neutral } from '../primitive/index.ts'

export const border = {
  light: neutral.borderLight,
  dark: neutral.borderDark,
  paper: material.paperEdge,
  stone: material.stoneEdge,
  selected: gold[300],
  focus: gold[300],
} as const
