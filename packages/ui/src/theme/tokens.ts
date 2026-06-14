import { seedToken } from '@rocokingdom-ui/tokens'

export interface ComponentToken {
  buttonActiveScale: number
  buttonBg: string
  buttonBgActive: string
  buttonBgHover: string
  buttonBorderColor: string
  buttonBorderRadius: number
  buttonColor: string
  buttonFontSize: number
  buttonHeight: number
  buttonPaddingInline: number
  buttonTransitionDuration: string
}

export interface GlobalToken extends ComponentToken {
  colorBgContainer: string
  colorBorder: string
  colorPrimary: string
  colorText: string
  colorTextLightSolid: string
  borderRadius: number
  controlHeight: number
  fontSize: number
  lineHeight: number
  motionDurationFast: string
  motionDurationMid: string
}

export interface ComponentTokenMap {
  Button: Partial<ComponentToken>
}

export type ThemeToken = Omit<GlobalToken, keyof ComponentToken>
export type ThemeTokenInput = Partial<ThemeToken>
export type ComponentTokenInput = Partial<ComponentTokenMap>

export const defaultSeedToken: ThemeToken = seedToken

export function derivativeToken(token: ThemeToken): GlobalToken {
  return {
    ...token,
    buttonActiveScale: 0.96,
    buttonBg: token.colorPrimary,
    buttonBgActive: token.colorPrimary,
    buttonBgHover: token.colorPrimary,
    buttonBorderColor: token.colorPrimary,
    buttonBorderRadius: token.borderRadius,
    buttonColor: token.colorTextLightSolid,
    buttonFontSize: token.fontSize,
    buttonHeight: token.controlHeight,
    buttonPaddingInline: 18,
    buttonTransitionDuration: token.motionDurationMid,
  }
}

export function mergeToken(token?: ThemeTokenInput): ThemeToken {
  return {
    ...defaultSeedToken,
    ...token,
  }
}

export function mergeComponentToken(
  token: GlobalToken,
  components?: ComponentTokenInput,
): GlobalToken {
  return {
    ...token,
    ...components?.Button,
  }
}
