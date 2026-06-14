import type { ButtonHTMLAttributes } from 'react'
import {
  buttonBase,
  buttonSizes,
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from './button.css.ts'

export const buttonPrefixCls = 'rk-button'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  prefixCls?: string
  rootClassName?: string
  size?: ButtonSize
  variant?: ButtonVariant
}

function composeClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

export function Button({
  className,
  prefixCls = buttonPrefixCls,
  rootClassName,
  size = 'middle',
  type = 'button',
  variant = 'solid',
  ...props
}: ButtonProps) {
  const resolvedClassName = composeClassName(
    prefixCls,
    buttonBase,
    buttonSizes[size],
    buttonVariants[variant],
    rootClassName,
    className,
  )

  return <button className={resolvedClassName} type={type} {...props} />
}
