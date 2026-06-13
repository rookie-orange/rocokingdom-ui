import type { ButtonHTMLAttributes } from 'react'

export const buttonPrefixCls = 'rk-button'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  prefixCls?: string
  rootClassName?: string
}

function composeClassName(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}

export function Button({
  className,
  prefixCls = buttonPrefixCls,
  rootClassName,
  type = 'button',
  ...props
}: ButtonProps) {
  const resolvedClassName = composeClassName(prefixCls, rootClassName, className)

  return <button className={resolvedClassName} type={type} {...props} />
}
