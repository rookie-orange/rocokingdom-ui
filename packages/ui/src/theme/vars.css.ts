import { createGlobalThemeContract, globalStyle } from '@vanilla-extract/css'
import { defaultSeedToken, derivativeToken } from './tokens.ts'

function rkVar(name: string | null) {
  return `rk-${name ?? 'token'}`
}

export const vars = createGlobalThemeContract(
  {
    colorBgContainer: 'color-bg-container',
    colorBorder: 'color-border',
    colorPrimary: 'color-primary',
    colorText: 'color-text',
    colorTextLightSolid: 'color-text-light-solid',
    borderRadius: 'border-radius',
    controlHeight: 'control-height',
    fontSize: 'font-size',
    lineHeight: 'line-height',
    motionDurationFast: 'motion-duration-fast',
    motionDurationMid: 'motion-duration-mid',
    buttonActiveScale: 'button-active-scale',
    buttonBg: 'button-bg',
    buttonBgActive: 'button-bg-active',
    buttonBgHover: 'button-bg-hover',
    buttonBorderColor: 'button-border-color',
    buttonBorderRadius: 'button-border-radius',
    buttonColor: 'button-color',
    buttonFontSize: 'button-font-size',
    buttonHeight: 'button-height',
    buttonPaddingInline: 'button-padding-inline',
    buttonTransitionDuration: 'button-transition-duration',
  },
  rkVar,
)

const defaultToken = derivativeToken(defaultSeedToken)

globalStyle(':root, .rocokingdom-ui', {
  vars: {
    [vars.colorBgContainer]: defaultToken.colorBgContainer,
    [vars.colorBorder]: defaultToken.colorBorder,
    [vars.colorPrimary]: defaultToken.colorPrimary,
    [vars.colorText]: defaultToken.colorText,
    [vars.colorTextLightSolid]: defaultToken.colorTextLightSolid,
    [vars.borderRadius]: `${defaultToken.borderRadius}px`,
    [vars.controlHeight]: `${defaultToken.controlHeight}px`,
    [vars.fontSize]: `${defaultToken.fontSize}px`,
    [vars.lineHeight]: String(defaultToken.lineHeight),
    [vars.motionDurationFast]: defaultToken.motionDurationFast,
    [vars.motionDurationMid]: defaultToken.motionDurationMid,
    [vars.buttonActiveScale]: String(defaultToken.buttonActiveScale),
    [vars.buttonBg]: defaultToken.buttonBg,
    [vars.buttonBgActive]: defaultToken.buttonBgActive,
    [vars.buttonBgHover]: defaultToken.buttonBgHover,
    [vars.buttonBorderColor]: defaultToken.buttonBorderColor,
    [vars.buttonBorderRadius]: `${defaultToken.buttonBorderRadius}px`,
    [vars.buttonColor]: defaultToken.buttonColor,
    [vars.buttonFontSize]: `${defaultToken.buttonFontSize}px`,
    [vars.buttonHeight]: `${defaultToken.buttonHeight}px`,
    [vars.buttonPaddingInline]: `${defaultToken.buttonPaddingInline}px`,
    [vars.buttonTransitionDuration]: defaultToken.buttonTransitionDuration,
  },
})
