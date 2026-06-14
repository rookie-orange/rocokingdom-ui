import { useInsertionEffect, type ReactNode } from 'react'

export interface RocoProviderColors {
  onPaper?: string
  onPrimary?: string
  onStone?: string
  paper?: string
  primary?: string
  stone?: string
}

type RocoColorVariable = readonly [name: `--rk-${string}`, value: string | undefined]

export interface RocoProviderProps {
  children?: ReactNode
  colors?: RocoProviderColors
}

function toColorVariables(colors?: RocoProviderColors): RocoColorVariable[] {
  return [
    ['--rk-paper', colors?.paper],
    ['--rk-stone', colors?.stone],
    ['--rk-primary', colors?.primary],
    ['--rk-on-paper', colors?.onPaper],
    ['--rk-on-stone', colors?.onStone],
    ['--rk-on-primary', colors?.onPrimary],
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
    colors?.onPaper,
    colors?.onPrimary,
    colors?.onStone,
    colors?.paper,
    colors?.primary,
    colors?.stone,
  ])

  return children
}
