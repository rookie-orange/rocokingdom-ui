import type { ButtonHTMLAttributes, ElementType, HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'
import { Material } from '../material'
import { RocoShape } from '../roco-shape'
import styles from './side-nav.module.css'

export const sideNavPrefixCls = 'rk-side-nav'
export const sideNavHeaderPrefixCls = 'rk-side-nav-header'
export const sideNavListPrefixCls = 'rk-side-nav-list'
export const sideNavItemPrefixCls = 'rk-side-nav-item'

export type SideNavVariant = 'rail' | 'stack'

export interface SideNavProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  children?: ReactNode
  prefixCls?: string
  rootClassName?: string
  variant?: SideNavVariant
}

export interface SideNavHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  as?: ElementType
  children?: ReactNode
  eyebrow?: ReactNode
  icon?: ReactNode
  prefixCls?: string
  rootClassName?: string
  title?: ReactNode
}

export interface SideNavListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export interface SideNavItemProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-current' | 'type'
> {
  active?: boolean
  badge?: ReactNode
  icon?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export function SideNav({
  as,
  children,
  className,
  prefixCls = sideNavPrefixCls,
  rootClassName,
  variant = 'stack',
  ...props
}: SideNavProps) {
  const Component = as ?? 'nav'

  return (
    <Component
      {...props}
      className={clsx(prefixCls, styles.nav, styles[variant], rootClassName, className)}
      data-variant={variant}
    >
      {children}
    </Component>
  )
}

export function SideNavHeader({
  as,
  children,
  className,
  eyebrow,
  icon,
  prefixCls = sideNavHeaderPrefixCls,
  rootClassName,
  title,
  ...props
}: SideNavHeaderProps) {
  const Component = as ?? 'header'
  const hasStructuredContent = icon || eyebrow || title

  return (
    <Material asChild material="stone">
      <RocoShape
        {...props}
        as={Component}
        className={clsx(prefixCls, styles.header, rootClassName, className)}
        contentClassName={styles.headerContent}
      >
        {hasStructuredContent ? (
          <>
            {icon ? (
              <span aria-hidden="true" className={styles.headerIcon}>
                {icon}
              </span>
            ) : null}
            <span className={styles.headerText}>
              {eyebrow ? <span className={styles.headerEyebrow}>{eyebrow}</span> : null}
              {title ? <span className={styles.headerTitle}>{title}</span> : null}
            </span>
          </>
        ) : (
          children
        )}
      </RocoShape>
    </Material>
  )
}

export function SideNavList({
  children,
  className,
  prefixCls = sideNavListPrefixCls,
  rootClassName,
  ...props
}: SideNavListProps) {
  return (
    <div {...props} className={clsx(prefixCls, styles.list, rootClassName, className)}>
      {children}
    </div>
  )
}

export function SideNavItem({
  active = false,
  badge,
  children,
  className,
  disabled = false,
  icon,
  prefixCls = sideNavItemPrefixCls,
  rootClassName,
  ...props
}: SideNavItemProps) {
  const hasBadge = badge !== undefined && badge !== null && badge !== false

  return (
    <button
      {...props}
      aria-current={active ? 'page' : undefined}
      className={clsx(prefixCls, styles.item, active && styles.active, rootClassName, className)}
      data-state={active ? 'active' : 'inactive'}
      disabled={disabled}
      type="button"
    >
      {icon ? (
        <span aria-hidden="true" className={styles.itemIcon}>
          {icon}
        </span>
      ) : null}
      {children ? <span className={styles.itemLabel}>{children}</span> : null}
      {hasBadge ? (
        <span className={clsx(styles.itemBadge, badge === true && styles.itemBadgeDot)}>
          {badge === true ? null : badge}
        </span>
      ) : null}
    </button>
  )
}
