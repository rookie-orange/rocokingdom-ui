import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './panel.module.css'

export const panelPrefixCls = 'rk-panel'

export type PanelCurve = 'none' | 'bottom' | 'left' | 'right' | 'top' | 'both'
export type PanelMaterial = 'paper' | 'stone'

interface PanelStyle extends CSSProperties {
  '--rk-panel-curve-inset'?: string
}

export interface PanelProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children?: ReactNode
  contentClassName?: string
  curve?: PanelCurve
  curveInset?: number | string
  material?: PanelMaterial
  prefixCls?: string
  rootClassName?: string
}

const curvePathBySide: Record<Exclude<PanelCurve, 'none'>, string> = {
  bottom: 'M0 0H1000V880C754 958 246 958 0 880Z',
  both: 'M120 0C42 246 42 754 120 1000H880C958 754 958 246 880 0Z',
  left: 'M120 0C42 246 42 754 120 1000H1000V0Z',
  right: 'M0 0H880C958 246 958 754 880 1000H0Z',
  top: 'M0 120C246 42 754 42 1000 120V1000H0Z',
}

function resolveSize(value: number | string | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

interface PanelShapeProps {
  curve: Exclude<PanelCurve, 'none'>
}

function PanelShape({ curve }: PanelShapeProps) {
  return (
    <svg
      aria-hidden="true"
      className={styles.shape}
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 1000 1000"
    >
      <path className={styles.shapePath} d={curvePathBySide[curve]} />
    </svg>
  )
}

export function Panel({
  as,
  children,
  className,
  contentClassName,
  curve = 'none',
  curveInset,
  material = 'paper',
  prefixCls = panelPrefixCls,
  rootClassName,
  style,
  ...props
}: PanelProps) {
  const Component = as ?? 'section'
  const isCurved = curve !== 'none'
  const panelStyle: PanelStyle = { ...style }
  const resolvedCurveInset = resolveSize(curveInset)

  if (resolvedCurveInset) {
    panelStyle['--rk-panel-curve-inset'] = resolvedCurveInset
  }

  return (
    <Component
      {...props}
      className={clsx(
        prefixCls,
        styles.panel,
        styles[material],
        styles[curve],
        isCurved && styles.curved,
        rootClassName,
        className,
      )}
      style={panelStyle}
    >
      {isCurved ? <PanelShape curve={curve} /> : null}
      <div className={clsx(`${prefixCls}-content`, styles.content, contentClassName)}>
        {children}
      </div>
    </Component>
  )
}
