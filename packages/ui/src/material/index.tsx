import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from 'react'
import * as Slot from '@radix-ui/react-slot'
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

export interface MaterialStyle extends CSSProperties {
  '--rk-material-background'?: string
  '--rk-material-color'?: string
}

export interface MaterialValue {
  background: string
  color: string
  style: MaterialStyle
}

export interface MaterialResolveOptions {
  background?: string
  color?: string
  material?: MaterialPreset
}

export type MaterialRender = (material: MaterialValue) => ReactNode

interface MaterialBaseProps {
  background?: string
  color?: string
  material?: MaterialPreset
}

interface MaterialOwnProps<As extends ElementType> extends MaterialBaseProps {
  as?: As
  asChild?: boolean
  className?: string
  children?: ReactNode
  prefixCls?: string
  render?: never
  rootClassName?: string
  style?: CSSProperties
}

export interface MaterialRenderProps extends MaterialBaseProps {
  render: MaterialRender
}

type MaterialElementProps<As extends ElementType = 'div'> = MaterialOwnProps<As> &
  Omit<ComponentPropsWithoutRef<As>, keyof MaterialOwnProps<As>>

export type MaterialProps<As extends ElementType = 'div'> =
  | MaterialElementProps<As>
  | MaterialRenderProps

const materialValueByPreset: Record<MaterialPreset, Omit<MaterialValue, 'style'>> = {
  danger: {
    background: 'var(--rk-danger)',
    color: 'var(--rk-on-danger)',
  },
  default: {
    background: 'var(--rk-primary)',
    color: 'var(--rk-on-primary)',
  },
  paper: {
    background: 'var(--rk-paper)',
    color: 'var(--rk-on-paper)',
  },
  paperMuted: {
    background: 'var(--rk-paper-muted)',
    color: 'var(--rk-on-paper-muted)',
  },
  paperSoft: {
    background: 'var(--rk-paper-soft)',
    color: 'var(--rk-on-paper-soft)',
  },
  paperStrong: {
    background: 'var(--rk-paper-strong)',
    color: 'var(--rk-on-paper-strong)',
  },
  primary: {
    background: 'var(--rk-primary)',
    color: 'var(--rk-on-primary)',
  },
  primaryMuted: {
    background: 'var(--rk-primary-muted)',
    color: 'var(--rk-on-primary-muted)',
  },
  primarySoft: {
    background: 'var(--rk-primary-soft)',
    color: 'var(--rk-on-primary-soft)',
  },
  primaryStrong: {
    background: 'var(--rk-primary-strong)',
    color: 'var(--rk-on-primary-strong)',
  },
  stone: {
    background: 'var(--rk-stone)',
    color: 'var(--rk-on-stone)',
  },
  stoneMuted: {
    background: 'var(--rk-stone-muted)',
    color: 'var(--rk-on-stone-muted)',
  },
  stoneSoft: {
    background: 'var(--rk-stone-soft)',
    color: 'var(--rk-on-stone-soft)',
  },
  stoneStrong: {
    background: 'var(--rk-stone-strong)',
    color: 'var(--rk-on-stone-strong)',
  },
  success: {
    background: 'var(--rk-success)',
    color: 'var(--rk-on-success)',
  },
}

export function resolveMaterial({
  background,
  color,
  material = 'paper',
}: MaterialResolveOptions = {}): MaterialValue {
  const presetValue = materialValueByPreset[material]
  const resolvedBackground = background ?? presetValue.background
  const resolvedColor = color ?? presetValue.color

  return {
    background: resolvedBackground,
    color: resolvedColor,
    style: {
      '--rk-material-background': resolvedBackground,
      '--rk-material-color': resolvedColor,
    },
  }
}

export function Material<As extends ElementType = 'div'>(props: MaterialProps<As>) {
  const materialValue = resolveMaterial({
    background: props.background,
    color: props.color,
    material: props.material,
  })

  if (typeof props.render === 'function') {
    return props.render(materialValue)
  }

  const {
    as,
    asChild,
    background,
    children,
    className,
    color,
    material,
    prefixCls = materialPrefixCls,
    rootClassName,
    style,
    ...elementProps
  } = props
  void material
  const Tag = asChild ? Slot.Root : (as ?? 'div')
  const materialStyle: MaterialStyle = { ...materialValue.style, ...style }

  if (background) {
    materialStyle['--rk-material-background'] = materialValue.background
  }

  if (color) {
    materialStyle['--rk-material-color'] = materialValue.color
  }

  return (
    <Tag
      {...elementProps}
      className={clsx(prefixCls, styles.material, rootClassName, className)}
      style={materialStyle}
    >
      {children}
    </Tag>
  )
}
