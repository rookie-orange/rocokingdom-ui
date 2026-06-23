import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
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
    styles[material],
    styles[size],
    styles[variant],
    rootClassName,
    className,
  )

  return (
    <Material as="button" className={resolvedClassName} material={material} type={type} {...props}>
      <RocoShape
        className={styles.shape}
        shadow={shadow}
        variant={variant === 'outline' ? 'outline' : 'solid'}
      />
      <span className={styles.content}>{children}</span>
    </Material>
  )
}
