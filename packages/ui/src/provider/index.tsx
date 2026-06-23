import { useInsertionEffect, type ReactNode } from 'react'

export interface RocoProviderColors {
  danger?: string
  onDanger?: string
  onPaper?: string
  onPrimary?: string
  onPrimaryMuted?: string
  onPrimarySoft?: string
  onPrimaryStrong?: string
  onSuccess?: string
  onStone?: string
  paper?: string
  primary?: string
  primaryMuted?: string
  primarySoft?: string
  primaryStrong?: string
  shadowColor?: string
  shadowSoftColor?: string
  shadowStrongColor?: string
  stone?: string
  success?: string
}

type RocoThemeVariable = readonly [name: `--rk-${string}`, value: string | undefined]

export interface RocoProviderProps {
  children?: ReactNode
  colors?: RocoProviderColors
}

function toColorVariables(colors?: RocoProviderColors): RocoThemeVariable[] {
  return [
    ['--rk-paper', colors?.paper],
    ['--rk-stone', colors?.stone],
    ['--rk-primary', colors?.primary],
    ['--rk-primary-soft', colors?.primarySoft],
    ['--rk-primary-muted', colors?.primaryMuted],
    ['--rk-primary-strong', colors?.primaryStrong],
    ['--rk-success', colors?.success],
    ['--rk-danger', colors?.danger],
    ['--rk-on-paper', colors?.onPaper],
    ['--rk-on-stone', colors?.onStone],
    ['--rk-on-primary', colors?.onPrimary],
    ['--rk-on-primary-soft', colors?.onPrimarySoft],
    ['--rk-on-primary-muted', colors?.onPrimaryMuted],
    ['--rk-on-primary-strong', colors?.onPrimaryStrong],
    ['--rk-on-success', colors?.onSuccess],
    ['--rk-on-danger', colors?.onDanger],
    ['--rk-shadow-soft-color', colors?.shadowSoftColor],
    ['--rk-shadow-color', colors?.shadowColor],
    ['--rk-shadow-strong-color', colors?.shadowStrongColor],
  ]
}

export function RocoProvider({ children, colors }: RocoProviderProps) {
  useInsertionEffect(() => {
    if (typeof document === 'undefined') {
      return undefined
    }

    const rootStyle = document.documentElement.style
    const previousValues = new Map<string, string>()

    for (const [name, value] of toColorVariables(colors)) {
      if (!value) {
        continue
      }

      previousValues.set(name, rootStyle.getPropertyValue(name))
      rootStyle.setProperty(name, value)
    }

    return () => {
      for (const [name, previousValue] of previousValues) {
        if (previousValue) {
          rootStyle.setProperty(name, previousValue)
        } else {
          rootStyle.removeProperty(name)
        }
      }
    }
  }, [
    colors?.danger,
    colors?.onDanger,
    colors?.onPaper,
    colors?.onPrimary,
    colors?.onPrimaryMuted,
    colors?.onPrimarySoft,
    colors?.onPrimaryStrong,
    colors?.onSuccess,
    colors?.onStone,
    colors?.paper,
    colors?.primary,
    colors?.primaryMuted,
    colors?.primarySoft,
    colors?.primaryStrong,
    colors?.shadowColor,
    colors?.shadowSoftColor,
    colors?.shadowStrongColor,
    colors?.stone,
    colors?.success,
  ])

  return children
}
