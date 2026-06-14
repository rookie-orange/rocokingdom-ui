import type { CSSProperties, ReactNode } from 'react'
import { createContext, useContext, useMemo } from 'react'
import {
  defaultSeedToken,
  derivativeToken,
  mergeComponentToken,
  mergeToken,
  type ComponentTokenInput,
  type GlobalToken,
  type ThemeTokenInput,
} from './tokens.ts'

export interface ThemeConfig {
  components?: ComponentTokenInput
  token?: ThemeTokenInput
}

export interface ConfigProviderProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
  theme?: ThemeConfig
}

interface ThemeContextValue {
  token: GlobalToken
}

const defaultGlobalToken = derivativeToken(defaultSeedToken)

const defaultThemeContext: ThemeContextValue = {
  token: defaultGlobalToken,
}

const ThemeContext = createContext(defaultThemeContext)

function toThemeStyle(token: GlobalToken) {
  return {
    '--rk-color-bg-container': token.colorBgContainer,
    '--rk-color-border': token.colorBorder,
    '--rk-color-primary': token.colorPrimary,
    '--rk-color-text': token.colorText,
    '--rk-color-text-light-solid': token.colorTextLightSolid,
    '--rk-border-radius': `${token.borderRadius}px`,
    '--rk-control-height': `${token.controlHeight}px`,
    '--rk-font-size': `${token.fontSize}px`,
    '--rk-line-height': String(token.lineHeight),
    '--rk-motion-duration-fast': token.motionDurationFast,
    '--rk-motion-duration-mid': token.motionDurationMid,
    '--rk-button-active-scale': String(token.buttonActiveScale),
    '--rk-button-bg': token.buttonBg,
    '--rk-button-bg-active': token.buttonBgActive,
    '--rk-button-bg-hover': token.buttonBgHover,
    '--rk-button-border-color': token.buttonBorderColor,
    '--rk-button-border-radius': `${token.buttonBorderRadius}px`,
    '--rk-button-color': token.buttonColor,
    '--rk-button-font-size': `${token.buttonFontSize}px`,
    '--rk-button-height': `${token.buttonHeight}px`,
    '--rk-button-padding-inline': `${token.buttonPaddingInline}px`,
    '--rk-button-transition-duration': token.buttonTransitionDuration,
  } as CSSProperties
}

function composeClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

export function ConfigProvider({ children, className, style, theme }: ConfigProviderProps) {
  const token = useMemo(() => {
    const seed = mergeToken(theme?.token)
    return mergeComponentToken(derivativeToken(seed), theme?.components)
  }, [theme?.components, theme?.token])

  const value = useMemo<ThemeContextValue>(() => ({ token }), [token])
  const themeStyle = useMemo(() => toThemeStyle(token), [token])

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={composeClassName('rocokingdom-ui', className)}
        style={{ ...themeStyle, ...style }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useToken() {
  return useContext(ThemeContext).token
}

export type { ComponentTokenInput, GlobalToken, ThemeTokenInput }
