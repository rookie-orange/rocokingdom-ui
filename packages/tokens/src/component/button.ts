import { borderWidth, control, font, material, neutral, radius } from '../primitive/index.ts'

export const button = {
  base: {
    radius: radius.md,
    borderWidth: borderWidth.hairline,
    bottomEdge: borderWidth.heavy,
    fontFamily: font.family.display,
    fontWeight: font.weight.bold,
    letterSpacing: '0',
  },
  size: {
    sm: {
      height: control.height.sm,
      paddingX: control.paddingX.sm,
      gap: control.gap.sm,
      fontSize: font.size.sm,
    },
    md: {
      height: control.height.md,
      paddingX: control.paddingX.md,
      gap: control.gap.md,
      fontSize: font.size.md,
    },
    lg: {
      height: control.height.lg,
      paddingX: control.paddingX.lg,
      gap: control.gap.lg,
      fontSize: font.size.lg,
    },
  },
  variant: {
    primary: {
      background: material.paper,
      backgroundHover: material.paperRaised,
      backgroundActive: material.paperPressed,
      color: neutral.textPrimary,
      border: neutral.borderLight,
      edge: material.paperShadow,
    },
    secondary: {
      background: material.stone,
      backgroundHover: material.stoneRaised,
      backgroundActive: material.stonePressed,
      color: neutral.textOnDark,
      border: material.stoneEdge,
      edge: material.stoneShadow,
    },
    gold: {
      background: material.gold,
      backgroundHover: material.goldRaised,
      backgroundActive: material.goldPressed,
      color: neutral.textPrimary,
      border: material.goldEdge,
      edge: material.goldShadow,
    },
    ghost: {
      background: 'transparent',
      backgroundHover: neutral.surface2,
      backgroundActive: material.paperPressed,
      color: neutral.textPrimary,
      border: 'transparent',
      edge: 'transparent',
    },
  },
} as const
