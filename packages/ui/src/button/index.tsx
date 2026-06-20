import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './button.module.css'

export const buttonPrefixCls = 'rk-button'
const buttonShapePath =
  'M70.518 6H289.482C292.901 6.18 306.398 6.18 321.154 11.759C335.911 17.337 348.328 28.675 345.629 56.928C342.929 85.182 319.175 88.781 313.416 90.761C307.658 92.74 294.88 93.64 289.482 94H70.518C67.099 93.82 53.602 93.82 38.846 88.241C24.089 82.663 11.672 71.325 14.371 43.072C17.071 14.818 40.825 11.219 46.584 9.239C52.342 7.26 65.12 6.36 70.518 6Z'

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
