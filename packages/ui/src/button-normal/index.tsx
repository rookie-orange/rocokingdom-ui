import type { ButtonHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import type { MaterialPreset } from '../material'
import styles from './button-normal.module.css'

export const buttonNormalPrefixCls = 'rk-button-normal'

export type ButtonNormalMaterial = MaterialPreset
export type ButtonNormalSize = 'small' | 'middle' | 'large'
export type ButtonNormalVariant = 'solid' | 'outline' | 'text'

export interface ButtonNormalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  material?: ButtonNormalMaterial
  prefixCls?: string
  rootClassName?: string
  size?: ButtonNormalSize
  variant?: ButtonNormalVariant
}

export function ButtonNormal({
  className,
  material = 'default',
  prefixCls = buttonNormalPrefixCls,
  rootClassName,
  size = 'middle',
  type = 'button',
  variant = 'solid',
  ...props
}: ButtonNormalProps) {
  const resolvedClassName = clsx(
    prefixCls,
    styles.button,
    styles[material],
    styles[size],
    styles[variant],
    rootClassName,
    className,
  )

  return <button className={resolvedClassName} type={type} {...props} />
}
