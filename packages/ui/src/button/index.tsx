import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './button.module.css'

export const buttonPrefixCls = 'rk-button'
const buttonShapePath =
  'M84 6H276C319 6 346 23 346 50C346 77 319 94 276 94H84C41 94 14 77 14 50C14 23 41 6 84 6Z'

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
        <path className={styles.shapeShadow} d={buttonShapePath} />
        <path className={styles.shapeSurface} d={buttonShapePath} />
      </svg>
      <span className={styles.content}>{children}</span>
    </button>
  )
}
