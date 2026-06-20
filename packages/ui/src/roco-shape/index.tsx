import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import styles from './roco-shape.module.css'

export const rocoShapePrefixCls = 'rk-roco-shape'

export type RocoShapeVariant = 'solid' | 'outline'

export interface RocoShapeProps extends HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string
  rootClassName?: string
  shadow?: boolean
  variant?: RocoShapeVariant
}

const rocoShapeEdgePath =
  'M0.0332642 244.999C15.0333 243.999 50.5333 241.499 66.5333 235.999C82.5333 230.499 148.533 220.499 156.033 141.999C163.533 63.4993 129.033 31.9993 88.0333 16.4993C47.0333 0.999313 9.53326 0.999313 0.0332642 0.499313'

const rocoShapeEdgeFillPath =
  'M0.0332642 0.499313C9.53326 0.999313 47.0333 0.999313 88.0333 16.4993C129.033 31.9993 163.533 63.4993 156.033 141.999C148.533 220.499 82.5333 230.499 66.5333 235.999C50.5333 241.499 15.0333 243.999 0.0332642 244.999Z'

type RocoShapeEdgeProps = {
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

type RocoShapeLayerProps = {
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
    <span className={clsx(styles.layer, className)}>
      <RocoShapeEdge part={part} side="left" />
      <RocoShapeCenter part={part} />
      <RocoShapeEdge part={part} side="right" />
    </span>
  )
}

export function RocoShape({
  'aria-hidden': ariaHidden = true,
  className,
  prefixCls = rocoShapePrefixCls,
  rootClassName,
  shadow = true,
  variant = 'solid',
  ...props
}: RocoShapeProps) {
  const hasFill = variant !== 'outline'
  const hasStroke = variant === 'outline'

  return (
    <span
      aria-hidden={ariaHidden}
      className={clsx(
        prefixCls,
        styles.shape,
        styles[variant],
        shadow && hasFill && styles.withShadow,
        rootClassName,
        className,
      )}
      {...props}
    >
      {hasFill ? <RocoShapeLayer className={styles.fill} part="fill" /> : null}
      {hasStroke ? <RocoShapeLayer className={styles.stroke} part="stroke" /> : null}
    </span>
  )
}
