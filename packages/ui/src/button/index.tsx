import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import { RocoShape } from '../roco-shape'
import styles from './button.module.css'

export const buttonPrefixCls = 'rk-button'

export type ButtonMaterial = 'default' | 'paper' | 'stone'
export type ButtonSize = 'small' | 'middle' | 'large'
export type ButtonVariant = 'solid' | 'outline' | 'text'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  material?: ButtonMaterial
  prefixCls?: string
  rootClassName?: string
  size?: ButtonSize
  variant?: ButtonVariant
}

export function Button({
  children,
  className,
  material = 'default',
  prefixCls = buttonPrefixCls,
  rootClassName,
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
    <button className={resolvedClassName} type={type} {...props}>
      <RocoShape className={styles.shape} variant={variant === 'outline' ? 'outline' : 'solid'} />
      <span className={styles.content}>{children}</span>
    </button>
  )
}
