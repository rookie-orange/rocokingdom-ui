export const space = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
} as const

export const radius = {
  none: '0px',
  xs: '3px',
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '18px',
  full: '999px',
} as const

export const borderWidth = {
  hairline: '1px',
  sm: '2px',
  md: '3px',
  heavy: '4px',
} as const

export const font = {
  family: {
    sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  size: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },
  lineHeight: {
    compact: '1.2',
    normal: '1.45',
    relaxed: '1.6',
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const

export const control = {
  height: {
    sm: '34px',
    md: '42px',
    lg: '50px',
  },
  paddingX: {
    sm: '14px',
    md: '18px',
    lg: '24px',
  },
  gap: {
    sm: '6px',
    md: '8px',
    lg: '10px',
  },
  iconSize: {
    sm: '16px',
    md: '18px',
    lg: '20px',
  },
} as const

export const motion = {
  duration: {
    fast: '120ms',
    normal: '180ms',
    slow: '260ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    press: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const

export const opacity = {
  disabled: '0.48',
  muted: '0.72',
  overlay: '0.58',
} as const

export const zIndex = {
  base: '0',
  drawer: '900',
  overlay: '1000',
  dialog: '1100',
  toast: '1200',
  tooltip: '1300',
} as const
