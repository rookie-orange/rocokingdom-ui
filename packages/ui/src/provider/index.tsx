import type { CSSProperties, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export const rocoProviderPrefixCls = 'rk-theme'

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

type RocoThemeVariableName = `--rk-${string}`
type RocoThemeVariable = readonly [name: RocoThemeVariableName, value: string | undefined]

type RocoProviderStyle = CSSProperties & Partial<Record<RocoThemeVariableName, string>>

export interface RocoProviderProps extends HTMLAttributes<HTMLDivElement> {
  colors?: RocoProviderColors
  prefixCls?: string
  rootClassName?: string
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

export function RocoProvider({
  children,
  className,
  colors,
  prefixCls = rocoProviderPrefixCls,
  rootClassName,
  style,
  ...props
}: RocoProviderProps) {
  const themeStyle: RocoProviderStyle = {}

  for (const [name, value] of toColorVariables(colors)) {
    if (value === undefined) {
      continue
    }

    themeStyle[name] = value
  }

  return (
    <div
      {...props}
      className={clsx(prefixCls, rootClassName, className)}
      style={{ ...themeStyle, ...style }}
    >
      {children}
    </div>
  )
}
