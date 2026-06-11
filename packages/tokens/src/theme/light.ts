import { gold, material, neutral } from '../primitive/index.ts'
import { border, state, surface, text } from '../semantic/index.ts'

export const lightTheme = {
  surface: {
    canvas: surface.canvas,
    panel: surface.panel,
    panelMuted: surface.panelMuted,
    inverse: material.stone,
  },
  text,
  border,
  state,
  accent: {
    brand: gold[400],
    selected: gold[300],
    selectedMuted: gold[50],
  },
  shadow: {
    raised: '0 2px 0 #d5cfbf, 0 8px 20px rgb(35 35 35 / 10%)',
    floating: '0 14px 34px rgb(35 35 35 / 18%)',
    focus: `0 0 0 3px ${gold.glow}`,
  },
  disabled: {
    background: neutral.surface2,
    color: neutral.textDisabled,
    edge: '#cfc7b8',
  },
} as const
