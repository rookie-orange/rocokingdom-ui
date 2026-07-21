import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu'
import { Check, ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import styles from './navigation.module.css'

export const menuPrefixCls = 'rk-menu'
export const menuItemPrefixCls = 'rk-menu-item'
export const menuGroupPrefixCls = 'rk-menu-group'
export const paginationPrefixCls = 'rk-pagination'
export const stepsPrefixCls = 'rk-steps'
export const anchorPrefixCls = 'rk-anchor'

export interface MenuItemData {
  disabled?: boolean
  href?: string
  icon?: ReactNode
  key: string
  label: ReactNode
}

export interface MenuProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'defaultValue' | 'dir' | 'onChange'
> {
  dir?: 'ltr' | 'rtl'
  defaultSelectedKey?: string
  items?: readonly MenuItemData[]
  material?: MaterialPreset
  onChange?: (key: string) => void
  orientation?: 'horizontal' | 'vertical'
  prefixCls?: string
  rootClassName?: string
  selectedKey?: string
}

export function Menu({
  children,
  className,
  defaultSelectedKey,
  items,
  material = 'stone',
  onChange,
  orientation = 'vertical',
  prefixCls = menuPrefixCls,
  rootClassName,
  selectedKey,
  ...props
}: MenuProps) {
  const [innerKey, setInnerKey] = useState(defaultSelectedKey)
  const resolvedKey = selectedKey ?? innerKey
  return (
    <Material asChild material={material}>
      <RadixNavigationMenu.Root
        {...props}
        className={clsx(prefixCls, styles.menu, styles[orientation], rootClassName, className)}
        orientation={orientation}
        value={resolvedKey}
      >
        <RadixNavigationMenu.List className={styles.menuList}>
          {items
            ? items.map((item) => (
                <RadixNavigationMenu.Item key={item.key} value={item.key}>
                  <MenuItem
                    active={resolvedKey === item.key}
                    disabled={item.disabled}
                    href={item.href}
                    icon={item.icon}
                    itemKey={item.key}
                    onSelect={(key) => {
                      if (selectedKey === undefined) setInnerKey(key)
                      onChange?.(key)
                    }}
                  >
                    {item.label}
                  </MenuItem>
                </RadixNavigationMenu.Item>
              ))
            : children}
        </RadixNavigationMenu.List>
      </RadixNavigationMenu.Root>
    </Material>
  )
}

export interface MenuItemProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  active?: boolean
  disabled?: boolean
  href?: string
  icon?: ReactNode
  itemKey: string
  onSelect?: (key: string) => void
  prefixCls?: string
  rootClassName?: string
}

export function MenuItem({
  active = false,
  children,
  className,
  disabled = false,
  href,
  icon,
  itemKey,
  onClick,
  onSelect,
  prefixCls = menuItemPrefixCls,
  rootClassName,
  ...props
}: MenuItemProps) {
  const content = (
    <>
      {active ? (
        <Material asChild material="primary">
          <RocoShape aria-hidden="true" className={styles.menuItemShape} shadow />
        </Material>
      ) : null}
      <span className={styles.menuItemContent}>
        {icon ? <span className={styles.menuIcon}>{icon}</span> : null}
        <span>{children}</span>
      </span>
    </>
  )
  const resolvedClassName = clsx(
    prefixCls,
    styles.menuItem,
    active && styles.menuItemActive,
    disabled && styles.menuItemDisabled,
    rootClassName,
    className,
  )

  if (href) {
    return (
      <RadixNavigationMenu.Link active={active} asChild>
        <a
          aria-current={active ? 'page' : undefined}
          aria-disabled={disabled || undefined}
          className={resolvedClassName}
          href={disabled ? undefined : href}
          onClick={(event) => {
            if (disabled) {
              event.preventDefault()
              return
            }
            onSelect?.(itemKey)
          }}
        >
          {content}
        </a>
      </RadixNavigationMenu.Link>
    )
  }

  return (
    <RadixNavigationMenu.Link active={active} asChild>
      <button
        {...props}
        aria-current={active ? 'page' : undefined}
        className={resolvedClassName}
        disabled={disabled}
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) onSelect?.(itemKey)
        }}
        type="button"
      >
        {content}
      </button>
    </RadixNavigationMenu.Link>
  )
}

export interface MenuGroupProps extends HTMLAttributes<HTMLLIElement> {
  label?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export function MenuGroup({
  children,
  className,
  label,
  prefixCls = menuGroupPrefixCls,
  rootClassName,
  ...props
}: MenuGroupProps) {
  return (
    <RadixNavigationMenu.Item asChild>
      <li {...props} className={clsx(prefixCls, styles.menuGroup, rootClassName, className)}>
        {label ? <div className={styles.menuGroupLabel}>{label}</div> : null}
        <ul className={styles.menuList}>{children}</ul>
      </li>
    </RadixNavigationMenu.Item>
  )
}

type PageEntry = 'end-ellipsis' | 'start-ellipsis' | number

function getPageEntries(current: number, pageCount: number, siblingCount: number): PageEntry[] {
  if (pageCount <= siblingCount * 2 + 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }
  const left = Math.max(2, current - siblingCount)
  const right = Math.min(pageCount - 1, current + siblingCount)
  const entries: PageEntry[] = [1]
  if (left > 2) entries.push('start-ellipsis')
  for (let page = left; page <= right; page += 1) entries.push(page)
  if (right < pageCount - 1) entries.push('end-ellipsis')
  entries.push(pageCount)
  return entries
}

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  current?: number
  defaultCurrent?: number
  disabled?: boolean
  material?: MaterialPreset
  onChange?: (page: number, pageSize: number) => void
  pageSize?: number
  prefixCls?: string
  rootClassName?: string
  showQuickJumper?: boolean
  siblingCount?: number
  total: number
}

export function Pagination({
  className,
  current,
  defaultCurrent = 1,
  disabled = false,
  material = 'stone',
  onChange,
  pageSize = 10,
  prefixCls = paginationPrefixCls,
  rootClassName,
  showQuickJumper = false,
  siblingCount = 1,
  total,
  ...props
}: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const [innerCurrent, setInnerCurrent] = useState(defaultCurrent)
  const resolvedCurrent = Math.min(pageCount, Math.max(1, current ?? innerCurrent))
  const entries = getPageEntries(resolvedCurrent, pageCount, siblingCount)
  const changePage = (page: number) => {
    const nextPage = Math.min(pageCount, Math.max(1, page))
    if (current === undefined) setInnerCurrent(nextPage)
    onChange?.(nextPage, pageSize)
  }

  return (
    <nav
      {...props}
      aria-label="Pagination"
      className={clsx(prefixCls, styles.pagination, rootClassName, className)}
    >
      <PaginationButton
        aria-label="Previous page"
        disabled={disabled || resolvedCurrent === 1}
        material={material}
        onClick={() => changePage(resolvedCurrent - 1)}
      >
        <ChevronLeft aria-hidden="true" />
      </PaginationButton>
      {entries.map((entry) =>
        typeof entry === 'number' ? (
          <PaginationButton
            active={entry === resolvedCurrent}
            aria-current={entry === resolvedCurrent ? 'page' : undefined}
            aria-label={`Page ${entry}`}
            disabled={disabled}
            key={entry}
            material={entry === resolvedCurrent ? 'primary' : material}
            onClick={() => changePage(entry)}
          >
            {entry}
          </PaginationButton>
        ) : (
          <span aria-hidden="true" className={styles.paginationEllipsis} key={entry}>
            <Ellipsis />
          </span>
        ),
      )}
      <PaginationButton
        aria-label="Next page"
        disabled={disabled || resolvedCurrent === pageCount}
        material={material}
        onClick={() => changePage(resolvedCurrent + 1)}
      >
        <ChevronRight aria-hidden="true" />
      </PaginationButton>
      {showQuickJumper ? (
        <label className={styles.paginationJump}>
          <span>Go to</span>
          <input
            aria-label="Page number"
            disabled={disabled}
            max={pageCount}
            min={1}
            onKeyDown={(event) => {
              if (event.key === 'Enter') changePage(Number(event.currentTarget.value))
            }}
            type="number"
          />
        </label>
      ) : null}
    </nav>
  )
}

interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  material: MaterialPreset
}

function PaginationButton({
  active,
  children,
  className,
  material,
  ...props
}: PaginationButtonProps) {
  return (
    <Material asChild material={material}>
      <RocoShape
        {...props}
        as="button"
        className={clsx(
          styles.paginationButton,
          active && styles.paginationButtonActive,
          className,
        )}
        shape="square"
        shadow={active}
      >
        {children}
      </RocoShape>
    </Material>
  )
}

export type StepStatus = 'error' | 'finish' | 'process' | 'wait'

export interface StepItem {
  description?: ReactNode
  disabled?: boolean
  icon?: ReactNode
  key?: string
  status?: StepStatus
  title: ReactNode
}

export interface StepsProps extends Omit<HTMLAttributes<HTMLOListElement>, 'onChange'> {
  current?: number
  direction?: 'horizontal' | 'vertical'
  items: readonly StepItem[]
  onChange?: (current: number) => void
  prefixCls?: string
  rootClassName?: string
  size?: 'small' | 'middle'
}

function resolveStepStatus(index: number, current: number, explicit: StepStatus | undefined) {
  if (explicit) return explicit
  if (index < current) return 'finish'
  if (index === current) return 'process'
  return 'wait'
}

export function Steps({
  className,
  current = 0,
  direction = 'horizontal',
  items,
  onChange,
  prefixCls = stepsPrefixCls,
  rootClassName,
  size = 'middle',
  ...props
}: StepsProps) {
  return (
    <ol
      {...props}
      aria-label="Progress steps"
      className={clsx(
        prefixCls,
        styles.steps,
        styles[direction],
        styles[size],
        rootClassName,
        className,
      )}
    >
      {items.map((item, index) => {
        const status = resolveStepStatus(index, current, item.status)
        const material =
          status === 'error'
            ? 'danger'
            : status === 'finish'
              ? 'success'
              : status === 'process'
                ? 'primary'
                : 'paperMuted'
        return (
          <li
            aria-current={status === 'process' ? 'step' : undefined}
            className={clsx(styles.step, styles[status])}
            key={item.key ?? index}
          >
            <button
              aria-label={`Step ${index + 1}: ${typeof item.title === 'string' ? item.title : ''}`}
              className={styles.stepButton}
              disabled={!onChange || item.disabled}
              onClick={() => onChange?.(index)}
              type="button"
            >
              <Material className={styles.stepMarker} material={material}>
                <RocoShape shape="circle" shadow={status === 'process'}>
                  {item.icon ?? (status === 'finish' ? <Check aria-hidden="true" /> : index + 1)}
                </RocoShape>
              </Material>
              <span className={styles.stepCopy}>
                <strong>{item.title}</strong>
                {item.description ? <span>{item.description}</span> : null}
              </span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

export interface AnchorItem {
  children?: readonly AnchorItem[]
  href: string
  key?: string
  title: ReactNode
}

export interface AnchorProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  activeKey?: string
  defaultActiveKey?: string
  items: readonly AnchorItem[]
  offset?: number
  onChange?: (key: string, href: string) => void
  prefixCls?: string
  rootClassName?: string
}

export function Anchor({
  activeKey,
  className,
  defaultActiveKey,
  items,
  offset = 0,
  onChange,
  prefixCls = anchorPrefixCls,
  rootClassName,
  ...props
}: AnchorProps) {
  const [innerKey, setInnerKey] = useState(defaultActiveKey)
  const resolvedKey = activeKey ?? innerKey
  return (
    <nav
      {...props}
      aria-label="On this page"
      className={clsx(prefixCls, styles.anchor, rootClassName, className)}
    >
      <AnchorList
        activeKey={resolvedKey}
        items={items}
        offset={offset}
        onSelect={(key, href) => {
          if (activeKey === undefined) setInnerKey(key)
          onChange?.(key, href)
        }}
      />
    </nav>
  )
}

interface AnchorListProps {
  activeKey?: string
  items: readonly AnchorItem[]
  offset: number
  onSelect: (key: string, href: string) => void
}

function AnchorList({ activeKey, items, offset, onSelect }: AnchorListProps) {
  return (
    <ul className={styles.anchorList}>
      {items.map((item) => {
        const key = item.key ?? item.href
        return (
          <li key={key}>
            <a
              aria-current={activeKey === key ? 'location' : undefined}
              className={clsx(styles.anchorLink, activeKey === key && styles.anchorLinkActive)}
              href={item.href}
              onClick={(event) => {
                onSelect(key, item.href)
                const target = document.querySelector(item.href)
                if (target) {
                  event.preventDefault()
                  const top = target.getBoundingClientRect().top + window.scrollY - offset
                  window.scrollTo({ behavior: 'smooth', top })
                }
              }}
            >
              {item.title}
            </a>
            {item.children?.length ? (
              <AnchorList
                activeKey={activeKey}
                items={item.children}
                offset={offset}
                onSelect={onSelect}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

export type AnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>
