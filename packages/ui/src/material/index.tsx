import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './material.module.css'

export const materialPrefixCls = 'rk-material'

export type MaterialPreset =
  | 'danger'
  | 'default'
  | 'paper'
  | 'paperMuted'
  | 'paperSoft'
  | 'paperStrong'
  | 'primary'
  | 'primaryMuted'
  | 'primarySoft'
  | 'primaryStrong'
  | 'stone'
  | 'stoneMuted'
  | 'stoneSoft'
  | 'stoneStrong'
  | 'success'

interface MaterialStyle extends CSSProperties {
  '--rk-material-background'?: string
  '--rk-material-color'?: string
}

interface MaterialOwnProps<As extends ElementType> {
  as?: As
  background?: string
  className?: string
  color?: string
  children?: ReactNode
  material?: MaterialPreset
  prefixCls?: string
  rootClassName?: string
  style?: CSSProperties
}

export type MaterialProps<As extends ElementType = 'div'> = MaterialOwnProps<As> &
  Omit<ComponentPropsWithoutRef<As>, keyof MaterialOwnProps<As>>

export function Material<As extends ElementType = 'div'>({
  as,
  background,
  children,
  className,
  color,
  material = 'paper',
  prefixCls = materialPrefixCls,
  rootClassName,
  style,
  ...props
}: MaterialProps<As>) {
  const Tag = as ?? 'div'
  const materialStyle: MaterialStyle = { ...style }

  if (background) {
    materialStyle['--rk-material-background'] = background
  }

  if (color) {
    materialStyle['--rk-material-color'] = color
  }

  return (
    <Tag
      {...props}
      className={clsx(prefixCls, styles.material, styles[material], rootClassName, className)}
      style={materialStyle}
    >
      {children}
    </Tag>
  )
}
