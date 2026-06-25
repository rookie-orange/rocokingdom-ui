import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import { RuneText } from '../rune-text'
import styles from './button.module.css'

export const buttonPrefixCls = 'rk-button'

export type ButtonMaterial = MaterialPreset
export type ButtonSize = 'small' | 'middle' | 'large'
export type ButtonVariant = 'solid' | 'outline' | 'text'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  material?: ButtonMaterial
  prefixCls?: string
  rootClassName?: string
  shadow?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

export function Button({
  children,
  className,
  material = 'default',
  prefixCls = buttonPrefixCls,
  rootClassName,
  shadow = false,
  size = 'middle',
  type = 'button',
  variant = 'solid',
  ...props
}: ButtonProps) {
  const resolvedClassName = clsx(
    prefixCls,
    styles.button,
    styles[size],
    styles[variant],
    rootClassName,
    className,
  )

  return (
    <Material
      as={RocoShape}
      className={resolvedClassName}
      color={variant === 'solid' ? undefined : 'var(--rk-material-background)'}
      material={material}
      shadow={variant === 'text' ? false : shadow}
      type={type}
      variant={variant}
      {...props}
    >
      <RuneText className={styles.content}>{children}</RuneText>
    </Material>
  )
}
