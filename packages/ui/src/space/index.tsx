import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import { Children } from 'react'
import { clsx } from 'clsx'
import styles from './space.module.css'

export const spacePrefixCls = 'rk-space'
export const stackPrefixCls = 'rk-stack'

export type SpaceAlign = 'baseline' | 'center' | 'end' | 'start' | 'stretch'
export type SpaceDirection = 'horizontal' | 'vertical'
export type SpaceJustify = 'around' | 'between' | 'center' | 'end' | 'evenly' | 'start'
export type SpaceSizePreset = 'compact' | 'large' | 'middle' | 'small'
export type SpaceSize = SpaceSizePreset | number | (string & {})
export type SpaceGap = SpaceSize | readonly [horizontal: SpaceSize, vertical: SpaceSize]

interface SpaceStyle extends CSSProperties {
  '--rk-space-align'?: string
  '--rk-space-column-gap'?: string
  '--rk-space-justify'?: string
  '--rk-space-row-gap'?: string
}

export interface SpaceProps extends HTMLAttributes<HTMLElement> {
  align?: SpaceAlign
  as?: ElementType
  block?: boolean
  children?: ReactNode
  direction?: SpaceDirection
  justify?: SpaceJustify
  prefixCls?: string
  rootClassName?: string
  size?: SpaceGap
  split?: ReactNode
  wrap?: boolean
}

export type StackProps = SpaceProps

const spaceSizeByName: Record<SpaceSizePreset, string> = {
  compact: '4px',
  large: '24px',
  middle: '16px',
  small: '8px',
}

const alignValueByName: Record<SpaceAlign, string> = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
}

const justifyValueByName: Record<SpaceJustify, string> = {
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  evenly: 'space-evenly',
  start: 'flex-start',
}

function resolveSpaceSize(size: SpaceSize) {
  if (typeof size === 'number') {
    return `${size}px`
  }

  return size in spaceSizeByName ? spaceSizeByName[size as SpaceSizePreset] : size
}

function resolveGap(size: SpaceGap) {
  if (Array.isArray(size)) {
    const [horizontal, vertical] = size as readonly [SpaceSize, SpaceSize]

    return {
      columnGap: resolveSpaceSize(horizontal),
      rowGap: resolveSpaceSize(vertical),
    }
  }

  const gap = resolveSpaceSize(size as SpaceSize)

  return {
    columnGap: gap,
    rowGap: gap,
  }
}

function renderSpaceItems(items: ReactNode[], split: ReactNode) {
  if (split === undefined || split === null || split === false || items.length <= 1) {
    return items
  }

  return items.flatMap((item, index) => {
    if (index === 0) {
      return [item]
    }

    return [
      <span aria-hidden="true" className={styles.split} key={`split-${index}`}>
        {split}
      </span>,
      item,
    ]
  })
}

export function Space({
  align,
  as,
  block = false,
  children,
  className,
  direction = 'horizontal',
  justify,
  prefixCls = spacePrefixCls,
  rootClassName,
  size = 'middle',
  split,
  style,
  wrap = false,
  ...props
}: SpaceProps) {
  const Component = as ?? 'div'
  const gap = resolveGap(size)
  const spaceStyle: SpaceStyle = {
    '--rk-space-column-gap': gap.columnGap,
    '--rk-space-row-gap': gap.rowGap,
    ...style,
  }
  const items = Children.toArray(children)

  if (align) {
    spaceStyle['--rk-space-align'] = alignValueByName[align]
  }

  if (justify) {
    spaceStyle['--rk-space-justify'] = justifyValueByName[justify]
  }

  return (
    <Component
      {...props}
      className={clsx(
        prefixCls,
        styles.space,
        styles[direction],
        block && styles.block,
        wrap && styles.wrap,
        rootClassName,
        className,
      )}
      data-direction={direction}
      style={spaceStyle}
    >
      {renderSpaceItems(items, split)}
    </Component>
  )
}

export function Stack({
  block = true,
  direction = 'vertical',
  prefixCls = stackPrefixCls,
  rootClassName,
  ...props
}: StackProps) {
  return (
    <Space
      {...props}
      block={block}
      direction={direction}
      prefixCls={prefixCls}
      rootClassName={clsx(styles.stack, rootClassName)}
    />
  )
}
