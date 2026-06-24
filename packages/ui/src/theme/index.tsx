import {
  createContext,
  use,
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
  type Ref,
} from 'react'
import * as Slot from '@radix-ui/react-slot'
import { clsx } from 'clsx'

export const rocoThemePrefixCls = 'rk-theme'

export interface RocoThemeColors {
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

type RocoThemeStyle = CSSProperties & Partial<Record<RocoThemeVariableName, string>>
type RocoThemeColorName = keyof RocoThemeColors

const rocoThemeColorNames: RocoThemeColorName[] = [
  'paper',
  'stone',
  'primary',
  'primarySoft',
  'primaryMuted',
  'primaryStrong',
  'success',
  'danger',
  'onPaper',
  'onStone',
  'onPrimary',
  'onPrimarySoft',
  'onPrimaryMuted',
  'onPrimaryStrong',
  'onSuccess',
  'onDanger',
  'shadowSoftColor',
  'shadowColor',
  'shadowStrongColor',
]

const defaultRocoThemeContext: RocoThemeContextValue = {
  colors: {},
}

const RocoThemeContext = createContext<RocoThemeContextValue | undefined>(undefined)

export interface RocoThemeContextValue {
  colors: RocoThemeColors
}

export interface RocoThemeProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  colors?: RocoThemeColors
  prefixCls?: string
  ref?: Ref<HTMLDivElement>
  rootClassName?: string
}

function toColorVariables(colors?: RocoThemeColors): RocoThemeVariable[] {
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

function toThemeStyle(colors?: RocoThemeColors): RocoThemeStyle {
  const themeStyle: RocoThemeStyle = {}

  for (const [name, value] of toColorVariables(colors)) {
    if (value === undefined) {
      continue
    }

    themeStyle[name] = value
  }

  return themeStyle
}

function mergeColors(parentColors: RocoThemeColors, colors?: RocoThemeColors) {
  if (!colors) {
    return parentColors
  }

  let mergedColors: RocoThemeColors | undefined

  for (const colorName of rocoThemeColorNames) {
    const value = colors[colorName]

    if (value === undefined) {
      continue
    }

    mergedColors ??= { ...parentColors }
    mergedColors[colorName] = value
  }

  return mergedColors ?? parentColors
}

function useOptionalRocoTheme() {
  return use(RocoThemeContext) ?? defaultRocoThemeContext
}

export function useRocoTheme() {
  const theme = use(RocoThemeContext)

  if (theme === undefined) {
    throw new Error('`useRocoTheme` must be used within a `RocoTheme`')
  }

  return theme
}

export function useRocoThemeStyle(): CSSProperties {
  const theme = useRocoTheme()

  return useMemo(() => toThemeStyle(theme.colors), [theme.colors])
}

export function RocoTheme({
  asChild,
  children,
  className,
  colors,
  prefixCls = rocoThemePrefixCls,
  ref,
  rootClassName,
  style,
  ...props
}: RocoThemeProps) {
  const parentTheme = useOptionalRocoTheme()
  const Root = asChild ? Slot.Root : 'div'
  const themeColors = useMemo(
    () => mergeColors(parentTheme.colors, colors),
    [colors, parentTheme.colors],
  )
  const themeStyle = useMemo(() => toThemeStyle(themeColors), [themeColors])
  const theme = useMemo<RocoThemeContextValue>(
    () => ({
      colors: themeColors,
    }),
    [themeColors],
  )

  return (
    <RocoThemeContext value={theme}>
      <Root
        {...props}
        className={clsx(prefixCls, rootClassName, className)}
        ref={ref}
        style={{ ...themeStyle, ...style }}
      >
        {children}
      </Root>
    </RocoThemeContext>
  )
}
