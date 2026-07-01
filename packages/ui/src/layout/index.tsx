import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import styles from './layout.module.css'

export const layoutPrefixCls = 'rk-layout'
export const layoutHeaderPrefixCls = 'rk-layout-header'
export const layoutSiderPrefixCls = 'rk-layout-sider'
export const layoutContentPrefixCls = 'rk-layout-content'
export const layoutFooterPrefixCls = 'rk-layout-footer'

export type LayoutDirection = 'horizontal' | 'vertical'
export type LayoutMaterial = MaterialPreset

interface LayoutSectionStyle extends CSSProperties {
  '--rk-layout-footer-height'?: string
  '--rk-layout-header-height'?: string
  '--rk-layout-sider-collapsed-width'?: string
  '--rk-layout-sider-width'?: string
}

interface LayoutBaseProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children?: ReactNode
  material?: LayoutMaterial
  prefixCls?: string
  rootClassName?: string
}

export interface LayoutProps extends LayoutBaseProps {
  direction?: LayoutDirection
  fullHeight?: boolean
}

export interface LayoutHeaderProps extends LayoutBaseProps {
  height?: number | string
}

export interface LayoutSiderProps extends LayoutBaseProps {
  collapsed?: boolean
  collapsedWidth?: number | string
  width?: number | string
}

export interface LayoutContentProps extends LayoutBaseProps {
  padded?: boolean
}

export interface LayoutFooterProps extends LayoutBaseProps {
  height?: number | string
}

function resolveSize(value: number | string | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

export function Layout({
  as,
  children,
  className,
  direction = 'vertical',
  fullHeight = false,
  material = 'paper',
  prefixCls = layoutPrefixCls,
  rootClassName,
  ...props
}: LayoutProps) {
  const Component = as ?? 'section'

  return (
    <Material asChild material={material}>
      <Component
        {...props}
        className={clsx(
          prefixCls,
          styles.layout,
          styles[direction],
          fullHeight && styles.fullHeight,
          rootClassName,
          className,
        )}
        data-direction={direction}
      >
        {children}
      </Component>
    </Material>
  )
}

export function LayoutHeader({
  as,
  children,
  className,
  height,
  material = 'stone',
  prefixCls = layoutHeaderPrefixCls,
  rootClassName,
  style,
  ...props
}: LayoutHeaderProps) {
  const Component = as ?? 'header'
  const headerStyle: LayoutSectionStyle = { ...style }
  const resolvedHeight = resolveSize(height)

  if (resolvedHeight) {
    headerStyle['--rk-layout-header-height'] = resolvedHeight
  }

  return (
    <Material asChild material={material}>
      <Component
        {...props}
        className={clsx(prefixCls, styles.header, rootClassName, className)}
        style={headerStyle}
      >
        {children}
      </Component>
    </Material>
  )
}

export function LayoutSider({
  as,
  children,
  className,
  collapsed = false,
  collapsedWidth,
  material = 'stoneSoft',
  prefixCls = layoutSiderPrefixCls,
  rootClassName,
  style,
  width,
  ...props
}: LayoutSiderProps) {
  const Component = as ?? 'aside'
  const siderStyle: LayoutSectionStyle = { ...style }
  const resolvedWidth = resolveSize(width)
  const resolvedCollapsedWidth = resolveSize(collapsedWidth)

  if (resolvedWidth) {
    siderStyle['--rk-layout-sider-width'] = resolvedWidth
  }

  if (resolvedCollapsedWidth) {
    siderStyle['--rk-layout-sider-collapsed-width'] = resolvedCollapsedWidth
  }

  return (
    <Material asChild material={material}>
      <Component
        {...props}
        className={clsx(
          prefixCls,
          styles.sider,
          collapsed && styles.siderCollapsed,
          rootClassName,
          className,
        )}
        data-collapsed={collapsed || undefined}
        style={siderStyle}
      >
        {children}
      </Component>
    </Material>
  )
}

export function LayoutContent({
  as,
  children,
  className,
  material = 'paperSoft',
  padded = true,
  prefixCls = layoutContentPrefixCls,
  rootClassName,
  ...props
}: LayoutContentProps) {
  const Component = as ?? 'main'

  return (
    <Material asChild material={material}>
      <Component
        {...props}
        className={clsx(
          prefixCls,
          styles.content,
          !padded && styles.unpadded,
          rootClassName,
          className,
        )}
        data-padded={padded}
      >
        {children}
      </Component>
    </Material>
  )
}

export function LayoutFooter({
  as,
  children,
  className,
  height,
  material = 'paper',
  prefixCls = layoutFooterPrefixCls,
  rootClassName,
  style,
  ...props
}: LayoutFooterProps) {
  const Component = as ?? 'footer'
  const footerStyle: LayoutSectionStyle = { ...style }
  const resolvedHeight = resolveSize(height)

  if (resolvedHeight) {
    footerStyle['--rk-layout-footer-height'] = resolvedHeight
  }

  return (
    <Material asChild material={material}>
      <Component
        {...props}
        className={clsx(prefixCls, styles.footer, rootClassName, className)}
        style={footerStyle}
      >
        {children}
      </Component>
    </Material>
  )
}
