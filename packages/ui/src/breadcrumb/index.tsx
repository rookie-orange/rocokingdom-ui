import * as Slot from '@radix-ui/react-slot'
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'
import styles from './breadcrumb.module.css'

export const breadcrumbPrefixCls = 'rk-breadcrumb'
export const breadcrumbListPrefixCls = 'rk-breadcrumb-list'
export const breadcrumbItemPrefixCls = 'rk-breadcrumb-item'
export const breadcrumbLinkPrefixCls = 'rk-breadcrumb-link'
export const breadcrumbPagePrefixCls = 'rk-breadcrumb-page'
export const breadcrumbSeparatorPrefixCls = 'rk-breadcrumb-separator'
export const breadcrumbEllipsisPrefixCls = 'rk-breadcrumb-ellipsis'

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {
  children?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  children?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export interface BreadcrumbEllipsisProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
  label?: string
  prefixCls?: string
  rootClassName?: string
}

export function Breadcrumb({
  'aria-label': ariaLabel = 'Breadcrumb',
  children,
  className,
  prefixCls = breadcrumbPrefixCls,
  rootClassName,
  ...props
}: BreadcrumbProps) {
  return (
    <nav
      {...props}
      aria-label={ariaLabel}
      className={clsx(prefixCls, styles.breadcrumb, rootClassName, className)}
    >
      {children}
    </nav>
  )
}

export function BreadcrumbList({
  children,
  className,
  prefixCls = breadcrumbListPrefixCls,
  rootClassName,
  ...props
}: BreadcrumbListProps) {
  return (
    <ol {...props} className={clsx(prefixCls, styles.list, rootClassName, className)}>
      {children}
    </ol>
  )
}

export function BreadcrumbItem({
  children,
  className,
  prefixCls = breadcrumbItemPrefixCls,
  rootClassName,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li {...props} className={clsx(prefixCls, styles.item, rootClassName, className)}>
      {children}
    </li>
  )
}

export function BreadcrumbLink({
  asChild = false,
  children,
  className,
  prefixCls = breadcrumbLinkPrefixCls,
  rootClassName,
  ...props
}: BreadcrumbLinkProps) {
  const Link = asChild ? Slot.Root : 'a'

  return (
    <Link {...props} className={clsx(prefixCls, styles.link, rootClassName, className)}>
      {children}
    </Link>
  )
}

export function BreadcrumbPage({
  'aria-current': ariaCurrent = 'page',
  children,
  className,
  prefixCls = breadcrumbPagePrefixCls,
  rootClassName,
  ...props
}: BreadcrumbPageProps) {
  return (
    <span
      {...props}
      aria-current={ariaCurrent}
      className={clsx(prefixCls, styles.page, rootClassName, className)}
    >
      {children}
    </span>
  )
}

export function BreadcrumbSeparator({
  'aria-hidden': ariaHidden = true,
  children = '/',
  className,
  prefixCls = breadcrumbSeparatorPrefixCls,
  rootClassName,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <span
      {...props}
      aria-hidden={ariaHidden}
      className={clsx(prefixCls, styles.separator, rootClassName, className)}
    >
      {children}
    </span>
  )
}

export function BreadcrumbEllipsis({
  children = '...',
  className,
  label = 'More',
  prefixCls = breadcrumbEllipsisPrefixCls,
  rootClassName,
  ...props
}: BreadcrumbEllipsisProps) {
  return (
    <span {...props} className={clsx(prefixCls, styles.ellipsis, rootClassName, className)}>
      <span aria-hidden="true">{children}</span>
      <span className={styles.visuallyHidden}>{label}</span>
    </span>
  )
}
