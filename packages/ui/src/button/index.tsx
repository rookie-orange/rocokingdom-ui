import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './button.module.css'

export const buttonPrefixCls = 'rk-button'
const buttonShapePath =
  'M82 3H282C323 3 353 21 353 49C353 76 323 96 296 97H82C38 97 10 78 10 50C10 22 38 3 82 3Z'

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
      <svg
        aria-hidden="true"
        className={styles.shape}
        focusable="false"
        preserveAspectRatio="none"
        viewBox="0 0 360 100"
      >
        <path className={styles.shapeSurface} d={buttonShapePath} />
      </svg>
      <span className={styles.content}>{children}</span>
    </button>
  )
}
