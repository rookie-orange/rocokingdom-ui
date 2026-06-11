import { gold, material, neutral } from '../primitive/index.ts'
import { border, state } from '../semantic/index.ts'

export const darkTheme = {
  surface: {
    canvas: neutral.surfaceDark3,
    panel: neutral.surfaceDark2,
    panelMuted: neutral.surfaceDark1,
    inverse: material.paper,
  },
  text: {
    primary: neutral.textOnDark,
    secondary: '#d8d2c7',
    disabled: '#878b91',
    onDark: neutral.textOnDark,
    inverse: neutral.textPrimary,
  },
  border: {
    ...border,
    light: neutral.borderDark,
    dark: '#5b5f64',
  },
  state,
  accent: {
    brand: gold[300],
    selected: gold[200],
    selectedMuted: 'rgb(241 193 91 / 18%)',
  },
  shadow: {
    raised: '0 2px 0 #1d1f22, 0 10px 24px rgb(0 0 0 / 26%)',
    floating: '0 18px 42px rgb(0 0 0 / 42%)',
    focus: `0 0 0 3px ${gold.glow}`,
  },
  disabled: {
    background: neutral.surfaceDark1,
    color: '#878b91',
    edge: neutral.surfaceDark3,
  },
} as const
