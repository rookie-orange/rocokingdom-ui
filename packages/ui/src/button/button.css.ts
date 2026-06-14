import { style } from '@vanilla-extract/css'
import { vars } from '../theme/vars.css.ts'

export const buttonBase = style({
  alignItems: 'center',
  appearance: 'none',
  backgroundColor: vars.buttonBg,
  border: `1px solid ${vars.buttonBorderColor}`,
  borderRadius: vars.buttonBorderRadius,
  color: vars.buttonColor,
  cursor: 'pointer',
  display: 'inline-flex',
  fontFamily: 'inherit',
  fontSize: vars.buttonFontSize,
  fontWeight: 700,
  gap: 8,
  justifyContent: 'center',
  lineHeight: vars.lineHeight,
  minHeight: vars.buttonHeight,
  padding: `0 ${vars.buttonPaddingInline}`,
  textDecoration: 'none',
  transition: [
    `background-color ${vars.buttonTransitionDuration} ease`,
    `border-color ${vars.buttonTransitionDuration} ease`,
    `color ${vars.buttonTransitionDuration} ease`,
    `filter ${vars.buttonTransitionDuration} ease`,
    `transform ${vars.motionDurationFast} ease`,
  ].join(', '),
  userSelect: 'none',

  ':hover': {
    backgroundColor: vars.buttonBgHover,
    filter: 'brightness(1.08)',
  },

  ':active': {
    backgroundColor: vars.buttonBgActive,
    filter: 'brightness(0.9)',
    transform: `scale(${vars.buttonActiveScale})`,
  },

  ':disabled': {
    cursor: 'not-allowed',
    filter: 'grayscale(0.2)',
    opacity: 0.48,
    transform: 'none',
  },
})

export const buttonSizes = {
  large: style({
    minHeight: `calc(${vars.buttonHeight} + 8px)`,
    paddingLeft: `calc(${vars.buttonPaddingInline} + 4px)`,
    paddingRight: `calc(${vars.buttonPaddingInline} + 4px)`,
  }),
  middle: style({}),
  small: style({
    minHeight: `calc(${vars.buttonHeight} - 8px)`,
    paddingLeft: `calc(${vars.buttonPaddingInline} - 4px)`,
    paddingRight: `calc(${vars.buttonPaddingInline} - 4px)`,
  }),
} as const

export const buttonVariants = {
  outline: style({
    backgroundColor: 'transparent',
    color: vars.buttonBg,

    ':hover': {
      backgroundColor: 'transparent',
      borderColor: vars.buttonBgHover,
      color: vars.buttonBgHover,
    },
  }),
  solid: style({}),
  text: style({
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: vars.buttonBg,
    paddingLeft: 8,
    paddingRight: 8,

    ':hover': {
      backgroundColor: 'transparent',
      color: vars.buttonBgHover,
    },
  }),
} as const

export type ButtonSize = keyof typeof buttonSizes
export type ButtonVariant = keyof typeof buttonVariants
