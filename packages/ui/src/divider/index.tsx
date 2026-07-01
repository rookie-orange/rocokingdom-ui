import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './divider.module.css'

export const dividerPrefixCls = 'rk-divider'

export type DividerAlign = 'center' | 'end' | 'start'
export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerVariant = 'dashed' | 'dotted' | 'solid'

interface DividerStyle extends CSSProperties {
  '--rk-divider-color'?: string
  '--rk-divider-thickness'?: string
}

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  align?: DividerAlign
  as?: ElementType
  children?: ReactNode
  color?: string
  dashed?: boolean
  orientation?: DividerOrientation
  prefixCls?: string
  rootClassName?: string
  thickness?: number | string
  variant?: DividerVariant
}

function resolveSize(value: number | string | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

function hasDividerLabel(children: ReactNode) {
  return children !== undefined && children !== null && children !== false
}

export function Divider({
  align = 'center',
  as,
  children,
  className,
  color,
  dashed = false,
  orientation = 'horizontal',
  prefixCls = dividerPrefixCls,
  role = 'separator',
  rootClassName,
  style,
  thickness,
  variant = 'solid',
  ...props
}: DividerProps) {
  const Component = as ?? 'div'
  const isLabeled = orientation === 'horizontal' && hasDividerLabel(children)
  const resolvedVariant = dashed ? 'dashed' : variant
  const dividerStyle: DividerStyle = { ...style }
  const resolvedThickness = resolveSize(thickness)

  if (color) {
    dividerStyle['--rk-divider-color'] = color
  }

  if (resolvedThickness) {
    dividerStyle['--rk-divider-thickness'] = resolvedThickness
  }

  return (
    <Component
      {...props}
      aria-orientation={orientation}
      className={clsx(
        prefixCls,
        styles.divider,
        styles[orientation],
        styles[resolvedVariant],
        isLabeled && styles.labeled,
        isLabeled && styles[align],
        rootClassName,
        className,
      )}
      data-orientation={orientation}
      role={role}
      style={dividerStyle}
    >
      {isLabeled ? (
        <span className={clsx(`${prefixCls}-label`, styles.label)}>{children}</span>
      ) : null}
    </Component>
  )
}
