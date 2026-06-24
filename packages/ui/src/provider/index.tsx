import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
} from 'react'
import * as Slot from '@radix-ui/react-slot'
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
type RocoProviderColorName = keyof RocoProviderColors

const rocoProviderColorNames: RocoProviderColorName[] = [
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

const RocoThemeContext = createContext<RocoThemeContextValue>(defaultRocoThemeContext)

export interface RocoThemeContextValue {
  colors: RocoProviderColors
}

export interface RocoProviderProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
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

function toThemeStyle(colors?: RocoProviderColors): RocoProviderStyle {
  const themeStyle: RocoProviderStyle = {}

  for (const [name, value] of toColorVariables(colors)) {
    if (value === undefined) {
      continue
    }

    themeStyle[name] = value
  }

  return themeStyle
}

function mergeColors(parentColors: RocoProviderColors, colors?: RocoProviderColors) {
  if (!colors) {
    return parentColors
  }

  let mergedColors: RocoProviderColors | undefined

  for (const colorName of rocoProviderColorNames) {
    const value = colors[colorName]

    if (value === undefined) {
      continue
    }

    mergedColors ??= { ...parentColors }
    mergedColors[colorName] = value
  }

  return mergedColors ?? parentColors
}

export function useRocoTheme() {
  const theme = useContext(RocoThemeContext)

  if (theme === undefined) {
    throw new Error('`useRocoTheme` must be used within a `RocoProvider`')
  }

  return useContext(RocoThemeContext)
}

export function useRocoThemeStyle(): CSSProperties {
  const theme = useRocoTheme()

  return useMemo(() => toThemeStyle(theme.colors), [theme.colors])
}

export const RocoProvider = forwardRef<HTMLDivElement, RocoProviderProps>(function RocoProvider(
  {
    asChild,
    children,
    className,
    colors,
    prefixCls = rocoProviderPrefixCls,
    rootClassName,
    style,
    ...props
  },
  forwardedRef,
) {
  const parentTheme = useRocoTheme()
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
    <RocoThemeContext.Provider value={theme}>
      <Root
        {...props}
        className={clsx(prefixCls, rootClassName, className)}
        ref={forwardedRef}
        style={{ ...themeStyle, ...style }}
      >
        {children}
      </Root>
    </RocoThemeContext.Provider>
  )
})
