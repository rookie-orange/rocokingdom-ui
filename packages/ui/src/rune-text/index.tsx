import type { ElementType, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './rune-text.module.css'

export const runeTextPrefixCls = 'rk-rune-text'

export interface RuneTextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  prefixCls?: string
  rootClassName?: string
}

export function RuneText({
  as: Component = 'span',
  className,
  prefixCls = runeTextPrefixCls,
  rootClassName,
  ...props
}: RuneTextProps) {
  return <Component className={clsx(prefixCls, styles.text, rootClassName, className)} {...props} />
}
