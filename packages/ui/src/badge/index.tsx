import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape, type RocoShapeVariant } from '../roco-shape'
import styles from './badge.module.css'

export const badgePrefixCls = 'rk-badge'
export const badgeIndicatorPrefixCls = 'rk-badge-indicator'

export type BadgeMaterial = MaterialPreset
export type BadgeSize = 'small' | 'middle' | 'large'
export type BadgeVariant = Exclude<RocoShapeVariant, 'text'>

interface BadgeOffsetStyle extends CSSProperties {
  '--rk-badge-offset-x'?: string
  '--rk-badge-offset-y'?: string
}

export interface BadgeIndicatorProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children?: ReactNode
  dot?: boolean
  material?: BadgeMaterial
  prefixCls?: string
  rootClassName?: string
  shadow?: boolean
  size?: BadgeSize
  variant?: BadgeVariant
}

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  children?: ReactNode
  count?: ReactNode
  dot?: boolean
  indicatorClassName?: string
  indicatorStyle?: CSSProperties
  material?: BadgeMaterial
  maxCount?: number
  offset?: readonly [number, number]
  prefixCls?: string
  rootClassName?: string
  shadow?: boolean
  showZero?: boolean
  size?: BadgeSize
  variant?: BadgeVariant
}

function getDisplayCount(count: ReactNode, maxCount: number | undefined) {
  if (typeof count === 'number' && typeof maxCount === 'number' && count > maxCount) {
    return `${maxCount}+`
  }

  return count
}

function isZeroCount(count: ReactNode) {
  return count === 0 || count === '0'
}

function hasBadgeCount(count: ReactNode, showZero: boolean) {
  if (count === null || count === undefined || count === false) {
    return false
  }

  return showZero || !isZeroCount(count)
}

function getOffsetStyle(offset: BadgeProps['offset'], style: CSSProperties | undefined) {
  if (!offset) {
    return style
  }

  const [x, y] = offset
  const offsetStyle: BadgeOffsetStyle = {
    '--rk-badge-offset-x': `${x}px`,
    '--rk-badge-offset-y': `${y}px`,
    ...style,
  }

  return offsetStyle
}

export function BadgeIndicator({
  children,
  className,
  dot = false,
  material = 'danger',
  prefixCls = badgeIndicatorPrefixCls,
  rootClassName,
  shadow = false,
  size = 'middle',
  variant = 'solid',
  ...props
}: BadgeIndicatorProps) {
  const isDot = dot || children === undefined || children === null
  const resolvedClassName = clsx(
    prefixCls,
    styles.indicator,
    styles[size],
    isDot ? styles.dot : styles.count,
    rootClassName,
    className,
  )

  return (
    <Material asChild material={material}>
      <RocoShape
        {...props}
        aria-hidden={isDot ? true : props['aria-hidden']}
        className={resolvedClassName}
        contentClassName={styles.content}
        shadow={shadow}
        shape={isDot ? 'circle' : 'stretch'}
        variant={variant}
      >
        {isDot ? null : children}
      </RocoShape>
    </Material>
  )
}

export function Badge({
  children,
  className,
  count,
  dot = false,
  indicatorClassName,
  indicatorStyle,
  material = 'danger',
  maxCount,
  offset,
  prefixCls = badgePrefixCls,
  rootClassName,
  shadow = false,
  showZero = false,
  size = 'middle',
  style,
  variant = 'solid',
  ...props
}: BadgeProps) {
  const hasChildren = children !== undefined && children !== null
  const displayCount = getDisplayCount(count, maxCount)
  const shouldShowIndicator = dot || hasBadgeCount(displayCount, showZero)
  const resolvedClassName = clsx(
    prefixCls,
    styles.badge,
    hasChildren ? styles.withChildren : styles.standalone,
    rootClassName,
    className,
  )
  const resolvedIndicatorStyle = getOffsetStyle(offset, indicatorStyle)

  return (
    <span {...props} className={resolvedClassName} style={style}>
      {children}
      {shouldShowIndicator ? (
        <BadgeIndicator
          className={clsx(hasChildren && styles.floating, indicatorClassName)}
          dot={dot}
          material={material}
          shadow={shadow}
          size={size}
          style={resolvedIndicatorStyle}
          variant={variant}
        >
          {dot ? null : displayCount}
        </BadgeIndicator>
      ) : null}
    </span>
  )
}
