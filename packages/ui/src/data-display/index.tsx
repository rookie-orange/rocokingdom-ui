import type {
  CSSProperties,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'
import { Children, useState } from 'react'
import * as RadixAvatar from '@radix-ui/react-avatar'
import { TrendingDown, TrendingUp, X } from 'lucide-react'
import { clsx } from 'clsx'
import { BadgeIndicator } from '../badge'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import { Spin } from '../feedback'
import styles from './data-display.module.css'

export const listPrefixCls = 'rk-list'
export const listItemPrefixCls = 'rk-list-item'
export const descriptionsPrefixCls = 'rk-descriptions'
export const avatarPrefixCls = 'rk-avatar'
export const avatarGroupPrefixCls = 'rk-avatar-group'
export const tagPrefixCls = 'rk-tag'
export const timelinePrefixCls = 'rk-timeline'
export const statisticPrefixCls = 'rk-statistic'

export interface ListProps<Item = unknown> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> {
  bordered?: boolean
  children?: ReactNode
  dataSource?: readonly Item[]
  empty?: ReactNode
  footer?: ReactNode
  header?: ReactNode
  loading?: boolean
  material?: MaterialPreset
  prefixCls?: string
  renderItem?: (item: Item, index: number) => ReactNode
  rootClassName?: string
  split?: boolean
}

export function List<Item = unknown>({
  bordered = false,
  children,
  className,
  dataSource,
  empty = 'No data',
  footer,
  header,
  loading = false,
  material = 'paper',
  prefixCls = listPrefixCls,
  renderItem,
  rootClassName,
  split = true,
  ...props
}: ListProps<Item>) {
  const renderedItems =
    children ?? dataSource?.map((item, index) => renderItem?.(item, index) ?? String(item))
  const isEmpty = Children.count(renderedItems) === 0
  return (
    <Material
      {...props}
      className={clsx(
        prefixCls,
        styles.list,
        bordered && styles.listBordered,
        split && styles.listSplit,
        rootClassName,
        className,
      )}
      material={material}
    >
      {header ? <div className={styles.listHeader}>{header}</div> : null}
      <Spin spinning={loading}>
        <div className={styles.listBody}>
          {isEmpty ? <div className={styles.listEmpty}>{empty}</div> : renderedItems}
        </div>
      </Spin>
      {footer ? <div className={styles.listFooter}>{footer}</div> : null}
    </Material>
  )
}

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  actions?: readonly ReactNode[]
  extra?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export function ListItem({
  actions,
  children,
  className,
  extra,
  prefixCls = listItemPrefixCls,
  rootClassName,
  ...props
}: ListItemProps) {
  return (
    <div {...props} className={clsx(prefixCls, styles.listItem, rootClassName, className)}>
      <div className={styles.listItemMain}>{children}</div>
      {actions?.length ? (
        <div className={styles.listActions}>
          {actions.map((action, index) => (
            <span key={index}>{action}</span>
          ))}
        </div>
      ) : null}
      {extra ? <div className={styles.listExtra}>{extra}</div> : null}
    </div>
  )
}

export interface ListItemMetaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  avatar?: ReactNode
  description?: ReactNode
  title?: ReactNode
}

export function ListItemMeta({
  avatar,
  className,
  description,
  title,
  ...props
}: ListItemMetaProps) {
  return (
    <div {...props} className={clsx(styles.listMeta, className)}>
      {avatar ? <div className={styles.listMetaAvatar}>{avatar}</div> : null}
      <div className={styles.listMetaCopy}>
        {title ? <strong className={styles.listMetaTitle}>{title}</strong> : null}
        {description ? <span className={styles.listMetaDescription}>{description}</span> : null}
      </div>
    </div>
  )
}

export interface DescriptionItem {
  key?: string
  label: ReactNode
  span?: number
  value: ReactNode
}

export interface DescriptionsProps extends Omit<HTMLAttributes<HTMLDListElement>, 'title'> {
  bordered?: boolean
  column?: number
  items: readonly DescriptionItem[]
  layout?: 'horizontal' | 'vertical'
  material?: MaterialPreset
  prefixCls?: string
  rootClassName?: string
  size?: 'small' | 'middle' | 'large'
  title?: ReactNode
}

interface DescriptionItemStyle extends CSSProperties {
  '--rk-description-span': number
}

export function Descriptions({
  bordered = false,
  className,
  column = 3,
  items,
  layout = 'horizontal',
  material = 'paper',
  prefixCls = descriptionsPrefixCls,
  rootClassName,
  size = 'middle',
  title,
  ...props
}: DescriptionsProps) {
  return (
    <Material
      className={clsx(
        prefixCls,
        styles.descriptions,
        styles[size],
        styles[layout],
        bordered && styles.descriptionsBordered,
        rootClassName,
        className,
      )}
      material={material}
    >
      {title ? <strong className={styles.descriptionsTitle}>{title}</strong> : null}
      <dl
        {...props}
        className={styles.descriptionsGrid}
        style={{ '--rk-description-columns': column } as CSSProperties}
      >
        {items.map((item, index) => (
          <div
            className={styles.descriptionItem}
            key={item.key ?? index}
            style={{ '--rk-description-span': item.span ?? 1 } as DescriptionItemStyle}
          >
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </Material>
  )
}

export interface AvatarProps
  extends
    Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'onError'>,
    Pick<
      ImgHTMLAttributes<HTMLImageElement>,
      'crossOrigin' | 'decoding' | 'loading' | 'referrerPolicy' | 'srcSet'
    > {
  alt?: string
  fallback?: ReactNode
  fallbackDelay?: number
  icon?: ReactNode
  material?: MaterialPreset
  onError?: ImgHTMLAttributes<HTMLImageElement>['onError']
  prefixCls?: string
  rootClassName?: string
  shape?: 'circle' | 'square'
  size?: 'small' | 'middle' | 'large' | number
  src?: string
}

interface AvatarStyle extends CSSProperties {
  '--rk-avatar-size'?: string
}

export function Avatar({
  alt = '',
  className,
  crossOrigin,
  decoding,
  fallback,
  fallbackDelay = 0,
  icon,
  loading,
  material = 'stoneMuted',
  onError,
  prefixCls = avatarPrefixCls,
  referrerPolicy,
  rootClassName,
  shape = 'circle',
  size = 'middle',
  src,
  srcSet,
  style,
  ...props
}: AvatarProps) {
  const avatarStyle: AvatarStyle = {
    '--rk-avatar-size': typeof size === 'number' ? `${size}px` : undefined,
    ...style,
  }
  const fallbackText = fallback ?? (alt ? alt.trim().slice(0, 2).toUpperCase() : null)

  return (
    <Material asChild material={material}>
      <RadixAvatar.Root asChild>
        <RocoShape
          {...props}
          aria-label={alt || undefined}
          className={clsx(
            prefixCls,
            styles.avatar,
            typeof size === 'string' && styles[size],
            rootClassName,
            className,
          )}
          shape={shape}
          style={avatarStyle}
        >
          {src ? (
            <RadixAvatar.Image
              alt={alt}
              className={styles.avatarImage}
              crossOrigin={crossOrigin}
              decoding={decoding}
              loading={loading}
              onError={onError}
              referrerPolicy={referrerPolicy}
              src={src}
              srcSet={srcSet}
            />
          ) : null}
          <RadixAvatar.Fallback
            aria-hidden={Boolean(alt)}
            className={styles.avatarFallback}
            delayMs={fallbackDelay}
          >
            {icon ?? fallbackText}
          </RadixAvatar.Fallback>
        </RocoShape>
      </RadixAvatar.Root>
    </Material>
  )
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  max?: number
  prefixCls?: string
  rootClassName?: string
}

export function AvatarGroup({
  children,
  className,
  max,
  prefixCls = avatarGroupPrefixCls,
  rootClassName,
  ...props
}: AvatarGroupProps) {
  const avatars = Children.toArray(children)
  const visible = max ? avatars.slice(0, max) : avatars
  const overflow = max ? Math.max(0, avatars.length - max) : 0
  return (
    <div {...props} className={clsx(prefixCls, styles.avatarGroup, rootClassName, className)}>
      {visible}
      {overflow ? <BadgeIndicator material="paperStrong">+{overflow}</BadgeIndicator> : null}
    </div>
  )
}

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  closable?: boolean
  material?: MaterialPreset
  onClose?: () => void
  prefixCls?: string
  rootClassName?: string
  shadow?: boolean
  size?: 'small' | 'middle' | 'large'
  variant?: 'outline' | 'solid'
}

export function Tag({
  children,
  className,
  closable = false,
  material = 'primarySoft',
  onClose,
  prefixCls = tagPrefixCls,
  rootClassName,
  shadow = false,
  size = 'middle',
  variant = 'solid',
  ...props
}: TagProps) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <Material asChild material={material}>
      <RocoShape
        {...props}
        className={clsx(prefixCls, styles.tag, styles[size], rootClassName, className)}
        contentClassName={styles.tagContent}
        shadow={shadow}
        variant={variant}
      >
        <span>{children}</span>
        {closable ? (
          <button
            aria-label="Remove tag"
            className={styles.tagClose}
            onClick={(event) => {
              event.stopPropagation()
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

export interface TimelineItemData {
  children?: ReactNode
  color?: string
  dot?: ReactNode
  key?: string
  label?: ReactNode
  material?: MaterialPreset
  title?: ReactNode
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  items: readonly TimelineItemData[]
  mode?: 'alternate' | 'left' | 'right'
  pending?: ReactNode
  prefixCls?: string
  rootClassName?: string
}

export function Timeline({
  className,
  items,
  mode = 'left',
  pending,
  prefixCls = timelinePrefixCls,
  rootClassName,
  ...props
}: TimelineProps) {
  const resolvedItems = pending
    ? [...items, { children: pending, key: 'pending', material: 'primary' as const }]
    : items
  return (
    <ol
      {...props}
      className={clsx(prefixCls, styles.timeline, styles[mode], rootClassName, className)}
    >
      {resolvedItems.map((item, index) => (
        <li className={styles.timelineItem} key={item.key ?? index}>
          {item.label ? <span className={styles.timelineLabel}>{item.label}</span> : null}
          <span className={styles.timelineRail}>
            <Material
              className={styles.timelineDot}
              color={item.color}
              material={item.material ?? 'stoneMuted'}
            >
              <RocoShape shape="circle">{item.dot}</RocoShape>
            </Material>
          </span>
          <div className={styles.timelineContent}>
            {item.title ? <strong>{item.title}</strong> : null}
            {item.children ? <div>{item.children}</div> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix' | 'title'> {
  formatter?: (value: number | string) => ReactNode
  precision?: number
  prefix?: ReactNode
  prefixCls?: string
  rootClassName?: string
  suffix?: ReactNode
  title?: ReactNode
  trend?: 'down' | 'up'
  value: number | string
  valueStyle?: CSSProperties
}

export function Statistic({
  className,
  formatter,
  precision,
  prefix,
  prefixCls = statisticPrefixCls,
  rootClassName,
  suffix,
  title,
  trend,
  value,
  valueStyle,
  ...props
}: StatisticProps) {
  const displayValue = formatter
    ? formatter(value)
    : typeof value === 'number'
      ? value.toLocaleString(undefined, {
          maximumFractionDigits: precision,
          minimumFractionDigits: precision,
        })
      : value
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown
  return (
    <div {...props} className={clsx(prefixCls, styles.statistic, rootClassName, className)}>
      {title ? <span className={styles.statisticTitle}>{title}</span> : null}
      <span className={styles.statisticValue} style={valueStyle}>
        {trend ? (
          <TrendIcon aria-label={`${trend} trend`} className={styles.statisticTrend} />
        ) : null}
        {prefix}
        <strong>{displayValue}</strong>
        {suffix}
      </span>
    </div>
  )
}

export type DataDisplayElement = ReactElement<AvatarProps | ListItemProps | TagProps>
