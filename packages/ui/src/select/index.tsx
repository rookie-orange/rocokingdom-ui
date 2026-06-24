import * as RadixSelect from '@radix-ui/react-select'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { RocoTheme } from '../theme'
import { RocoShape } from '../roco-shape'
import styles from './select.module.css'

export const selectPrefixCls = 'rk-select'
export const selectItemPrefixCls = 'rk-select-item'

export const SelectRoot = RadixSelect.Root
export const SelectGroup = RadixSelect.Group
export const SelectLabel = RadixSelect.Label
export const SelectSeparator = RadixSelect.Separator

export interface SelectOption {
  disabled?: boolean
  label: ReactNode
  textValue?: string
  value: string
}

type RadixSelectRootProps = ComponentPropsWithoutRef<typeof RadixSelect.Root>
type RadixSelectTriggerProps = Omit<
  ComponentPropsWithoutRef<typeof RadixSelect.Trigger>,
  'children' | 'className'
>
type RadixSelectContentProps = Omit<
  ComponentPropsWithoutRef<typeof RadixSelect.Content>,
  'children' | 'className'
>
type RadixSelectViewportProps = Omit<
  ComponentPropsWithoutRef<typeof RadixSelect.Viewport>,
  'children' | 'className'
>

export interface SelectProps extends Omit<RadixSelectRootProps, 'children'> {
  ariaLabel?: string
  children?: ReactNode
  contentClassName?: string
  contentProps?: RadixSelectContentProps
  icon?: ReactNode
  itemClassName?: string
  options?: readonly SelectOption[]
  placeholder?: ReactNode
  prefixCls?: string
  rootClassName?: string
  triggerClassName?: string
  triggerProps?: RadixSelectTriggerProps
  valueClassName?: string
  viewportClassName?: string
  viewportProps?: RadixSelectViewportProps
}

export interface SelectContentProps extends RadixSelectContentProps {
  children?: ReactNode
  contentClassName?: string
  contentShellClassName?: string
  prefixCls?: string
  rootClassName?: string
}

export interface SelectItemProps extends Omit<
  ComponentPropsWithoutRef<typeof RadixSelect.Item>,
  'className'
> {
  children?: ReactNode
  indicator?: ReactNode
  itemClassName?: string
  prefixCls?: string
  rootClassName?: string
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  {
    children,
    contentClassName,
    contentShellClassName,
    prefixCls = selectPrefixCls,
    rootClassName,
    ...props
  },
  forwardedRef,
) {
  return (
    <RocoTheme asChild>
      <RadixSelect.Content
        {...props}
        align={props.align ?? 'start'}
        className={clsx(`${prefixCls}-content`, styles.content, rootClassName, contentClassName)}
        position={props.position ?? 'popper'}
        ref={forwardedRef}
        side={props.side ?? 'bottom'}
        sideOffset={props.sideOffset ?? 8}
      >
        <div
          className={clsx(`${prefixCls}-content-shell`, styles.contentShell, contentShellClassName)}
        >
          {children}
        </div>
      </RadixSelect.Content>
    </RocoTheme>
  )
})

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { children, indicator, itemClassName, prefixCls = selectItemPrefixCls, rootClassName, ...props },
  forwardedRef,
) {
  return (
    <RadixSelect.Item
      {...props}
      className={clsx(prefixCls, styles.item, rootClassName, itemClassName)}
      ref={forwardedRef}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className={styles.itemIndicator}>
        {indicator ?? <span className={styles.itemCheck} />}
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
})

export function Select({
  ariaLabel,
  children,
  contentClassName,
  contentProps,
  icon,
  itemClassName,
  options,
  placeholder,
  prefixCls = selectPrefixCls,
  rootClassName,
  triggerClassName,
  triggerProps,
  valueClassName,
  viewportClassName,
  viewportProps,
  ...rootProps
}: SelectProps) {
  const triggerAriaLabel = ariaLabel ?? triggerProps?.['aria-label']
  const hasCustomChildren = children !== undefined && children !== null

  return (
    <RadixSelect.Root {...rootProps}>
      <RadixSelect.Trigger
        {...triggerProps}
        aria-label={triggerAriaLabel}
        className={clsx(prefixCls, styles.trigger, rootClassName, triggerClassName)}
      >
        <RocoShape className={styles.triggerShape} />
        <span className={styles.triggerContent}>
          <RadixSelect.Value
            className={clsx(`${prefixCls}-value`, styles.value, valueClassName)}
            placeholder={placeholder}
          />
          <RadixSelect.Icon asChild>
            {icon ?? <span aria-hidden="true" className={styles.triggerIcon} />}
          </RadixSelect.Icon>
        </span>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <SelectContent {...contentProps} contentClassName={contentClassName}>
          <RadixSelect.Viewport
            {...viewportProps}
            className={clsx(`${prefixCls}-viewport`, styles.viewport, viewportClassName)}
          >
            {hasCustomChildren
              ? children
              : options?.map((option) => (
                  <SelectItem
                    disabled={option.disabled}
                    itemClassName={itemClassName}
                    key={option.value}
                    textValue={option.textValue}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
          </RadixSelect.Viewport>
        </SelectContent>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
