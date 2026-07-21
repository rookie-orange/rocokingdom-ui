import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
import * as RadixProgress from '@radix-ui/react-progress'
import { Check, CircleAlert, Info, X, XCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import styles from './feedback.module.css'

export const alertPrefixCls = 'rk-alert'
export const spinPrefixCls = 'rk-spin'
export const skeletonPrefixCls = 'rk-skeleton'
export const progressPrefixCls = 'rk-progress'
export const resultPrefixCls = 'rk-result'
export const emptyPrefixCls = 'rk-empty'

export type FeedbackStatus = 'danger' | 'info' | 'success' | 'warning'

const statusMaterial: Record<FeedbackStatus, MaterialPreset> = {
  danger: 'danger',
  info: 'stoneMuted',
  success: 'success',
  warning: 'primary',
}

const statusIcon = {
  danger: XCircle,
  info: Info,
  success: Check,
  warning: CircleAlert,
}

export interface AlertProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  action?: ReactNode
  closable?: boolean
  description?: ReactNode
  icon?: ReactNode
  material?: MaterialPreset
  onClose?: () => void
  prefixCls?: string
  rootClassName?: string
  shadow?: boolean
  status?: FeedbackStatus
  title: ReactNode
}

export function Alert({
  action,
  className,
  closable = false,
  description,
  icon,
  material,
  onClose,
  prefixCls = alertPrefixCls,
  rootClassName,
  shadow = false,
  status = 'info',
  title,
  ...props
}: AlertProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  const Icon = statusIcon[status]

  return (
    <Material asChild material={material ?? statusMaterial[status]}>
      <RocoShape
        {...props}
        as="section"
        className={clsx(prefixCls, styles.alert, styles[status], rootClassName, className)}
        contentClassName={styles.alertContent}
        role={status === 'danger' ? 'alert' : 'status'}
        shadow={shadow}
      >
        <span aria-hidden="true" className={styles.alertIcon}>
          {icon ?? <Icon />}
        </span>
        <span className={styles.alertCopy}>
          <strong className={styles.alertTitle}>{title}</strong>
          {description ? <span className={styles.alertDescription}>{description}</span> : null}
        </span>
        {action ? <span className={styles.alertAction}>{action}</span> : null}
        {closable ? (
          <button
            aria-label="Close alert"
            className={styles.close}
            onClick={() => {
              setVisible(false)
              onClose?.()
            }}
            type="button"
          >
            <X aria-hidden="true" />
          </button>
        ) : null}
      </RocoShape>
    </Material>
  )
}

export interface SpinProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  delay?: number
  label?: ReactNode
  material?: MaterialPreset
  prefixCls?: string
  rootClassName?: string
  size?: 'small' | 'middle' | 'large'
  spinning?: boolean
}

interface SpinStyle extends CSSProperties {
  '--rk-spin-delay'?: string
}

export function Spin({
  children,
  className,
  delay = 0,
  label = 'Loading',
  material = 'primary',
  prefixCls = spinPrefixCls,
  rootClassName,
  size = 'middle',
  spinning = true,
  style,
  ...props
}: SpinProps) {
  const spinStyle: SpinStyle = { '--rk-spin-delay': `${delay}ms`, ...style }
  const indicator = spinning ? (
    <Material
      className={clsx(styles.spinIndicator, styles[size])}
      material={material}
      role="status"
    >
      <span className={styles.spinShape}>
        <RocoShape aria-hidden="true" shape="circle" />
      </span>
      <span className={styles.srOnly}>{label}</span>
    </Material>
  ) : null

  if (!children) {
    return (
      <div
        {...props}
        className={clsx(prefixCls, styles.spinStandalone, rootClassName, className)}
        style={spinStyle}
      >
        {indicator}
      </div>
    )
  }

  return (
    <div
      {...props}
      aria-busy={spinning}
      className={clsx(prefixCls, styles.spinContainer, rootClassName, className)}
      style={spinStyle}
    >
      <div className={clsx(styles.spinContent, spinning && styles.spinContentBusy)}>{children}</div>
      {spinning ? <div className={styles.spinOverlay}>{indicator}</div> : null}
    </div>
  )
}

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  active?: boolean
  height?: number | string
  material?: MaterialPreset
  prefixCls?: string
  rootClassName?: string
  shape?: 'circle' | 'round' | 'square'
  width?: number | string
}

interface SkeletonStyle extends CSSProperties {
  '--rk-skeleton-height'?: string
  '--rk-skeleton-width'?: string
}

const toCssSize = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value

export function Skeleton({
  active = false,
  className,
  height,
  material = 'paperMuted',
  prefixCls = skeletonPrefixCls,
  rootClassName,
  shape = 'round',
  style,
  width,
  ...props
}: SkeletonProps) {
  const skeletonStyle: SkeletonStyle = {
    '--rk-skeleton-height': toCssSize(height),
    '--rk-skeleton-width': toCssSize(width),
    ...style,
  }

  return (
    <Material
      {...props}
      aria-hidden="true"
      className={clsx(
        prefixCls,
        styles.skeleton,
        styles[shape],
        active && styles.skeletonActive,
        rootClassName,
        className,
      )}
      material={material}
      style={skeletonStyle}
    />
  )
}

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  format?: (percent: number) => ReactNode
  material?: MaterialPreset
  percent?: number
  prefixCls?: string
  rootClassName?: string
  showInfo?: boolean
  size?: 'small' | 'middle' | 'large'
  status?: 'active' | 'danger' | 'normal' | 'success'
  strokeMaterial?: MaterialPreset
  type?: 'circle' | 'line'
}

interface ProgressStyle extends CSSProperties {
  '--rk-progress-percent': string
}

export function Progress({
  className,
  format = (value) => `${Math.round(value)}%`,
  material = 'paperMuted',
  percent = 0,
  prefixCls = progressPrefixCls,
  rootClassName,
  showInfo = true,
  size = 'middle',
  status = 'normal',
  strokeMaterial,
  type = 'line',
  ...props
}: ProgressProps) {
  const normalized = Math.min(100, Math.max(0, percent))
  const formattedValue = format(normalized)
  const resolvedStroke =
    strokeMaterial ??
    (status === 'danger' ? 'danger' : status === 'success' ? 'success' : 'primary')
  const progressStyle: ProgressStyle = { '--rk-progress-percent': `${normalized}%` }

  if (type === 'circle') {
    const radius = 42
    const circumference = 2 * Math.PI * radius
    return (
      <RadixProgress.Root
        {...props}
        aria-label={typeof formattedValue === 'string' ? formattedValue : undefined}
        className={clsx(prefixCls, styles.progressCircle, styles[size], rootClassName, className)}
        max={100}
        value={normalized}
      >
        <Material className={styles.progressCircleMaterial} material={resolvedStroke}>
          <RadixProgress.Indicator asChild>
            <svg aria-hidden="true" viewBox="0 0 100 100">
              <circle className={styles.progressCircleTrail} cx="50" cy="50" r={radius} />
              <circle
                className={styles.progressCircleStroke}
                cx="50"
                cy="50"
                r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - normalized / 100)}
              />
            </svg>
          </RadixProgress.Indicator>
        </Material>
        {showInfo ? <span className={styles.progressCircleInfo}>{formattedValue}</span> : null}
      </RadixProgress.Root>
    )
  }

  return (
    <RadixProgress.Root
      {...props}
      className={clsx(prefixCls, styles.progressLine, styles[size], rootClassName, className)}
      max={100}
      value={normalized}
    >
      <Material className={styles.progressTrack} material={material}>
        <RadixProgress.Indicator asChild>
          <Material
            className={styles.progressStroke}
            material={resolvedStroke}
            style={progressStyle}
          >
            <RocoShape aria-hidden="true" shadow={status === 'active'} />
          </Material>
        </RadixProgress.Indicator>
      </Material>
      {showInfo ? <span className={styles.progressInfo}>{formattedValue}</span> : null}
    </RadixProgress.Root>
  )
}

export interface ResultProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  description?: ReactNode
  extra?: ReactNode
  icon?: ReactNode
  material?: MaterialPreset
  prefixCls?: string
  rootClassName?: string
  status?: FeedbackStatus
  title: ReactNode
}

export function Result({
  className,
  description,
  extra,
  icon,
  material = 'paper',
  prefixCls = resultPrefixCls,
  rootClassName,
  status = 'info',
  title,
  ...props
}: ResultProps) {
  const Icon = statusIcon[status]
  return (
    <Material
      {...props}
      className={clsx(prefixCls, styles.result, rootClassName, className)}
      material={material}
    >
      <Material className={styles.resultIcon} material={statusMaterial[status]}>
        <RocoShape shape="circle" shadow>
          {icon ?? <Icon aria-hidden="true" />}
        </RocoShape>
      </Material>
      <strong className={styles.resultTitle}>{title}</strong>
      {description ? <p className={styles.resultDescription}>{description}</p> : null}
      {extra ? <div className={styles.resultExtra}>{extra}</div> : null}
    </Material>
  )
}

export interface EmptyProps extends Omit<ResultProps, 'status' | 'title'> {
  title?: ReactNode
}

export function Empty({
  className,
  description = 'No data',
  icon,
  prefixCls = emptyPrefixCls,
  rootClassName,
  title = 'Empty',
  ...props
}: EmptyProps) {
  return (
    <Result
      {...props}
      className={className}
      description={description}
      icon={icon ?? <span className={styles.emptyMark}>?</span>}
      prefixCls={prefixCls}
      rootClassName={rootClassName}
      status="info"
      title={title}
    />
  )
}
