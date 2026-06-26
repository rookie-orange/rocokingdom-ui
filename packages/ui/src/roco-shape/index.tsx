import type { ComponentPropsWithRef, CSSProperties, ElementType, ReactNode } from 'react'
import { clsx } from 'clsx'
import type { MaterialPreset } from '../material'
import materialStyles from '../material/material.module.css'
import styles from './roco-shape.module.css'

export const rocoShapePrefixCls = 'rk-roco-shape'

export type RocoShapeKind = 'stretch' | 'circle' | 'square'
export type RocoShapeMaterial = MaterialPreset
export type RocoShapeVariant = 'outline' | 'solid' | 'text'

interface RocoShapeStyle extends CSSProperties {
  '--rk-roco-shape-background'?: string
  '--rk-roco-shape-color'?: string
}

interface RocoShapeOwnProps<As extends ElementType> {
  as?: As
  background?: string
  children?: ReactNode
  className?: string
  color?: string
  contentClassName?: string
  material?: RocoShapeMaterial
  prefixCls?: string
  rootClassName?: string
  shadow?: boolean
  shape?: RocoShapeKind
  style?: CSSProperties
  variant?: RocoShapeVariant
}

export type RocoShapeProps<As extends ElementType = 'span'> = RocoShapeOwnProps<As> &
  Omit<ComponentPropsWithRef<As>, keyof RocoShapeOwnProps<As>>

type RocoShapeFixedKind = Exclude<RocoShapeKind, 'stretch'>

const rocoShapeEdgePath =
  'M0.0332642 244.999C15.0333 243.999 50.5333 241.499 66.5333 235.999C82.5333 230.499 148.533 220.499 156.033 141.999C163.533 63.4993 129.033 31.9993 88.0333 16.4993C47.0333 0.999313 9.53326 0.999313 0.0332642 0.499313'

const rocoShapeEdgeFillPath =
  'M0.0332642 0.499313C9.53326 0.999313 47.0333 0.999313 88.0333 16.4993C129.033 31.9993 163.533 63.4993 156.033 141.999C148.533 220.499 82.5333 230.499 66.5333 235.999C50.5333 241.499 15.0333 243.999 0.0332642 244.999Z'

const rocoShapeFixedPaths: Record<RocoShapeFixedKind, string> = {
  circle:
    'M0.858625 19.4179C2.67797 6.54462 15.0197 1.42301 22.3759 0.557875C34.7876 -0.134235 37.0705 5.57567 41.0941 7.30594C45.1176 9.03622 47.7417 15.7843 48.2665 18.7257C49.3161 29.9725 46.5171 33.9522 45.9923 35.8555C45.5808 37.348 41.7737 40.7359 39.9757 42.336L39.8695 42.4305C33.9217 46.4101 31.2976 48.2322 24.9999 48.4865C16.428 48.8325 8.55585 42.4305 8.20597 41.9114C7.8561 41.3923 -1.41555 35.5094 0.858625 19.4179Z',
  square:
    'M3.51624 2.91328C8.64261 -0.229054 37.6484 -0.353567 45.3019 2.83925C45.4231 2.88982 45.5194 2.93806 45.6124 3.03086C48.9809 6.39315 49.9675 44.1041 45.4742 46.1197C38.7272 49.5925 6.57349 48.9796 3.51625 46.1197C-0.305347 42.5447 -0.700629 6.28398 3.51624 2.91328Z',
}

interface RocoShapeEdgeProps {
  part: 'fill' | 'stroke'
  side: 'left' | 'right'
}

function RocoShapeEdge({ part, side }: RocoShapeEdgeProps) {
  return (
    <svg
      className={styles.edge}
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 158 246"
    >
      <g transform={side === 'left' ? 'translate(158 246) scale(-1 -1)' : undefined}>
        {part === 'fill' ? (
          <path className={styles.cap} d={rocoShapeEdgeFillPath} />
        ) : (
          <path className={styles.curve} d={rocoShapeEdgePath} vectorEffect="non-scaling-stroke" />
        )}
      </g>
    </svg>
  )
}

interface RocoShapeLayerProps {
  className: string
  part: 'fill' | 'stroke'
}

function RocoShapeCenter({ part }: Pick<RocoShapeLayerProps, 'part'>) {
  if (part === 'fill') {
    return <span className={styles.center} />
  }

  return (
    <svg
      className={styles.center}
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path
        className={styles.centerLine}
        d="M0 0.3H100M0 99.7H100"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function RocoShapeLayer({ className, part }: RocoShapeLayerProps) {
  return (
    <span aria-hidden="true" className={clsx(styles.layer, className)}>
      <RocoShapeEdge part={part} side="left" />
      <RocoShapeCenter part={part} />
      <RocoShapeEdge part={part} side="right" />
    </span>
  )
}

interface RocoShapeFixedProps {
  part: 'fill' | 'stroke'
  shape: RocoShapeFixedKind
}

function RocoShapeFixed({ part, shape }: RocoShapeFixedProps) {
  const path = rocoShapeFixedPaths[shape]

  return (
    <svg
      aria-hidden="true"
      className={clsx(styles.fixed, part === 'fill' ? styles.fill : styles.stroke)}
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 49 49"
    >
      <path
        className={part === 'fill' ? styles.fixedFill : styles.fixedStroke}
        d={path}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export function RocoShape<As extends ElementType = 'span'>({
  'aria-hidden': ariaHiddenProp,
  as,
  background,
  children,
  className,
  color,
  contentClassName,
  material,
  prefixCls = rocoShapePrefixCls,
  rootClassName,
  shadow = false,
  shape = 'stretch',
  style,
  variant = 'solid',
  ...props
}: RocoShapeProps<As>) {
  const Tag = as ?? 'span'
  const hasFill = variant === 'solid'
  const hasStroke = variant === 'outline'
  const hasContent = children !== undefined && children !== null
  const isStretch = shape === 'stretch'
  const shapeStyle: RocoShapeStyle = { ...style }
  const ariaHidden = ariaHiddenProp ?? (hasContent ? undefined : true)

  if (background) {
    shapeStyle['--rk-roco-shape-background'] = background
  }

  if (color) {
    shapeStyle['--rk-roco-shape-color'] = color
  }

  return (
    <Tag
      {...props}
      aria-hidden={ariaHidden}
      className={clsx(
        prefixCls,
        styles.shape,
        styles[shape],
        styles[variant],
        material && materialStyles[material],
        hasContent && styles.withContent,
        shadow && hasFill && styles.withShadow,
        rootClassName,
        className,
      )}
      style={shapeStyle}
    >
      {hasFill && isStretch ? <RocoShapeLayer className={styles.fill} part="fill" /> : null}
      {hasStroke && isStretch ? <RocoShapeLayer className={styles.stroke} part="stroke" /> : null}
      {hasFill && !isStretch ? <RocoShapeFixed part="fill" shape={shape} /> : null}
      {hasStroke && !isStretch ? <RocoShapeFixed part="stroke" shape={shape} /> : null}
      {hasContent ? (
        <span className={clsx(styles.content, contentClassName)}>{children}</span>
      ) : null}
    </Tag>
  )
}
