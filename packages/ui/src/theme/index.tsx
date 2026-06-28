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

export interface RocoThemeTokens {
  controlHeightLarge?: string
  controlHeightMiddle?: string
  controlHeightSmall?: string
  controlPaddingInlineLarge?: string
  controlPaddingInlineMiddle?: string
  controlPaddingInlineSmall?: string
  fontSizeBase?: string
  radius?: string
}

type RocoThemeVariableName = `--rk-${string}`
type RocoThemeVariable = readonly [name: RocoThemeVariableName, value: string | undefined]

type RocoThemeStyle = CSSProperties & Partial<Record<RocoThemeVariableName, string>>
type RocoThemeColorName = keyof RocoThemeColors
type RocoThemeTokenName = keyof RocoThemeTokens

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

const rocoThemeTokenNames: RocoThemeTokenName[] = [
  'fontSizeBase',
  'radius',
  'controlHeightSmall',
  'controlHeightMiddle',
  'controlHeightLarge',
  'controlPaddingInlineSmall',
  'controlPaddingInlineMiddle',
  'controlPaddingInlineLarge',
]

const defaultRocoThemeContext: RocoThemeContextValue = {
  colors: {},
  tokens: {},
}

const RocoThemeContext = createContext<RocoThemeContextValue | undefined>(undefined)

export interface RocoThemeContextValue {
  colors: RocoThemeColors
  tokens: RocoThemeTokens
}

export interface RocoThemeProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  colors?: RocoThemeColors
  prefixCls?: string
  ref?: Ref<HTMLDivElement>
  rootClassName?: string
  tokens?: RocoThemeTokens
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

function toTokenVariables(tokens?: RocoThemeTokens): RocoThemeVariable[] {
  return [
    ['--rk-font-size-base', tokens?.fontSizeBase],
    ['--rk-radius', tokens?.radius],
    ['--rk-control-height-small', tokens?.controlHeightSmall],
    ['--rk-control-height-middle', tokens?.controlHeightMiddle],
    ['--rk-control-height-large', tokens?.controlHeightLarge],
    ['--rk-control-padding-inline-small', tokens?.controlPaddingInlineSmall],
    ['--rk-control-padding-inline-middle', tokens?.controlPaddingInlineMiddle],
    ['--rk-control-padding-inline-large', tokens?.controlPaddingInlineLarge],
  ]
}

function toThemeStyle(colors?: RocoThemeColors, tokens?: RocoThemeTokens): RocoThemeStyle {
  const themeStyle: RocoThemeStyle = {}

  for (const [name, value] of [...toColorVariables(colors), ...toTokenVariables(tokens)]) {
    if (value === undefined) {
      continue
    }

    themeStyle[name] = value
  }

  return themeStyle
}

function mergeThemeRecord<RecordType extends object>(
  keys: (keyof RecordType)[],
  parentRecord: RecordType,
  record?: RecordType,
) {
  if (!record) {
    return parentRecord
  }

  let mergedRecord: RecordType | undefined

  for (const key of keys) {
    const value = record[key]

    if (value === undefined) {
      continue
    }

    mergedRecord ??= { ...parentRecord }
    mergedRecord[key] = value
  }

  return mergedRecord ?? parentRecord
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

  return useMemo(() => toThemeStyle(theme.colors, theme.tokens), [theme.colors, theme.tokens])
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
  tokens,
  ...props
}: RocoThemeProps) {
  const parentTheme = useOptionalRocoTheme()
  const Root = asChild ? Slot.Root : 'div'
  const themeColors = useMemo(
    () => mergeThemeRecord(rocoThemeColorNames, parentTheme.colors, colors),
    [colors, parentTheme.colors],
  )
  const themeTokens = useMemo(
    () => mergeThemeRecord(rocoThemeTokenNames, parentTheme.tokens, tokens),
    [tokens, parentTheme.tokens],
  )
  const themeStyle = useMemo(
    () => toThemeStyle(themeColors, themeTokens),
    [themeColors, themeTokens],
  )
  const theme = useMemo<RocoThemeContextValue>(
    () => ({
      colors: themeColors,
      tokens: themeTokens,
    }),
    [themeColors, themeTokens],
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
