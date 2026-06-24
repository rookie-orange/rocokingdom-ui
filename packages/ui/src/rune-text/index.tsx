import { forwardRef } from 'react'
import type { ElementType, HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './rune-text.module.css'

export const runeTextPrefixCls = 'rk-rune-text'

export type RuneTextFont = 'rune' | 'base'

export interface RuneTextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  font?: RuneTextFont
  prefixCls?: string
  rootClassName?: string
}

export const RuneText = forwardRef<HTMLElement, RuneTextProps>(function RuneText(
  {
    as: Component = 'span',
    className,
    font = 'base',
    prefixCls = runeTextPrefixCls,
    rootClassName,
    ...props
  },
  ref,
) {
  return (
    <Component
      className={clsx(prefixCls, styles.text, styles[font], rootClassName, className)}
      ref={ref}
      {...props}
    />
  )
})
