import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react'
import { createContext, useContext, useState } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import { RuneText } from '../rune-text'
import styles from './toggle-group.module.css'

export const toggleGroupPrefixCls = 'rk-toggle-group'
export const toggleItemPrefixCls = 'rk-toggle-item'

export type ToggleGroupMaterial = MaterialPreset
export type ToggleGroupOrientation = 'horizontal' | 'vertical'
export type ToggleGroupSize = 'small' | 'middle' | 'large'

interface ToggleGroupContextValue<Value extends string = string> {
  disabled: boolean
  onValueChange: (value: Value) => void
  selectedMaterial: ToggleGroupMaterial
  selectedShadow: boolean
  selectedValue: Value | undefined
  size: ToggleGroupSize
  unselectedMaterial: ToggleGroupMaterial
  unselectedShadow: boolean
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null)

export interface ToggleGroupProps<Value extends string = string> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  children?: ReactNode
  defaultValue?: Value
  disabled?: boolean
  name?: string
  onValueChange?: (value: Value) => void
  orientation?: ToggleGroupOrientation
  prefixCls?: string
  rootClassName?: string
  selectedMaterial?: ToggleGroupMaterial
  selectedShadow?: boolean
  size?: ToggleGroupSize
  unselectedMaterial?: ToggleGroupMaterial
  unselectedShadow?: boolean
  value?: Value
}

export interface ToggleItemProps<Value extends string = string> extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-disabled' | 'aria-pressed' | 'role' | 'tabIndex' | 'type' | 'value'
> {
  children?: ReactNode
  material?: ToggleGroupMaterial
  prefixCls?: string
  rootClassName?: string
  selectedClassName?: string
  selectedMaterial?: ToggleGroupMaterial
  selectedShadow?: boolean
  shadow?: boolean
  size?: ToggleGroupSize
  unselectedClassName?: string
  unselectedMaterial?: ToggleGroupMaterial
  unselectedShadow?: boolean
  value: Value
}

function getToggleItems(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-rk-toggle-item="true"]'),
  ).filter((item) => !item.disabled && item.getAttribute('aria-disabled') !== 'true')
}

export function ToggleGroup<Value extends string = string>({
  children,
  className,
  defaultValue,
  disabled = false,
  name,
  onKeyDown,
  onValueChange,
  orientation = 'horizontal',
  prefixCls = toggleGroupPrefixCls,
  rootClassName,
  selectedMaterial = 'paper',
  selectedShadow = false,
  size = 'middle',
  unselectedMaterial = 'stone',
  unselectedShadow = false,
  value,
  ...props
}: ToggleGroupProps<Value>) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selectedValue = value ?? uncontrolledValue
  const isControlled = value !== undefined

  function selectValue(nextValue: Value) {
    if (nextValue === selectedValue) {
      return
    }

    if (!isControlled) {
      setUncontrolledValue(nextValue)
    }

    onValueChange?.(nextValue)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event)

    if (event.defaultPrevented) {
      return
    }

    const isPreviousKey = event.key === 'ArrowLeft' || event.key === 'ArrowUp'
    const isNextKey = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    const isBoundaryKey = event.key === 'Home' || event.key === 'End'

    if (!isPreviousKey && !isNextKey && !isBoundaryKey) {
      return
    }

    const enabledItems = getToggleItems(event.currentTarget)

    if (enabledItems.length === 0) {
      return
    }

    const selectedIndex = enabledItems.findIndex(
      (item) => item.getAttribute('aria-pressed') === 'true',
    )
    const focusedIndex =
      event.target instanceof HTMLButtonElement ? enabledItems.indexOf(event.target) : -1
    const currentIndex = selectedIndex >= 0 ? selectedIndex : focusedIndex

    let nextIndex = 0

    if (event.key === 'End') {
      nextIndex = enabledItems.length - 1
    } else if (isPreviousKey) {
      nextIndex = currentIndex <= 0 ? enabledItems.length - 1 : currentIndex - 1
    } else if (isNextKey) {
      nextIndex = currentIndex >= enabledItems.length - 1 ? 0 : currentIndex + 1
    }

    event.preventDefault()

    const nextItem = enabledItems[nextIndex]
    selectValue(nextItem.value as Value)
    nextItem.focus()
  }

  const resolvedClassName = clsx(
    prefixCls,
    styles.group,
    styles[orientation],
    rootClassName,
    className,
  )

  return (
    <ToggleGroupContext.Provider
      value={{
        disabled,
        onValueChange: selectValue as ToggleGroupContextValue['onValueChange'],
        selectedMaterial,
        selectedShadow,
        selectedValue,
        size,
        unselectedMaterial,
        unselectedShadow,
      }}
    >
      <div
        {...props}
        aria-disabled={disabled || undefined}
        aria-orientation={orientation}
        className={resolvedClassName}
        onKeyDown={handleKeyDown}
        role="group"
      >
        {name && selectedValue !== undefined ? (
          <input disabled={disabled} name={name} type="hidden" value={selectedValue} />
        ) : null}
        {children}
      </div>
    </ToggleGroupContext.Provider>
  )
}

export function ToggleItem<Value extends string = string>({
  children,
  className,
  disabled = false,
  material,
  onClick,
  prefixCls = toggleItemPrefixCls,
  rootClassName,
  selectedClassName,
  selectedMaterial,
  selectedShadow,
  shadow,
  size,
  unselectedClassName,
  unselectedMaterial,
  unselectedShadow,
  value,
  ...props
}: ToggleItemProps<Value>) {
  const context = useContext(ToggleGroupContext)

  if (!context) {
    throw new Error('ToggleItem must be rendered inside ToggleGroup.')
  }

  const toggleGroup = context
  const isDisabled = toggleGroup.disabled || disabled
  const isSelected = toggleGroup.selectedValue === value
  const isTabbable = !isDisabled && (isSelected || toggleGroup.selectedValue === undefined)
  const resolvedMaterial =
    (isSelected ? selectedMaterial : unselectedMaterial) ??
    material ??
    (isSelected ? toggleGroup.selectedMaterial : toggleGroup.unselectedMaterial)
  const resolvedShadow =
    (isSelected ? selectedShadow : unselectedShadow) ??
    shadow ??
    (isSelected ? toggleGroup.selectedShadow : toggleGroup.unselectedShadow)
  const resolvedSize = size ?? toggleGroup.size
  const resolvedClassName = clsx(
    prefixCls,
    styles.item,
    styles[resolvedSize],
    isSelected ? styles.selected : styles.unselected,
    rootClassName,
    className,
    isSelected ? selectedClassName : unselectedClassName,
  )

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event)

    if (event.defaultPrevented || isDisabled) {
      return
    }

    toggleGroup.onValueChange(value)
  }

  return (
    <Material asChild material={resolvedMaterial}>
      <RocoShape
        {...props}
        aria-disabled={isDisabled || undefined}
        aria-pressed={isSelected}
        as="button"
        className={resolvedClassName}
        contentClassName={styles.itemContent}
        data-rk-toggle-item="true"
        data-state={isSelected ? 'selected' : 'unselected'}
        disabled={isDisabled}
        onClick={handleClick}
        shadow={resolvedShadow}
        tabIndex={isTabbable ? 0 : -1}
        type="button"
        value={value}
      >
        <RuneText className={styles.itemText}>{children}</RuneText>
      </RocoShape>
    </Material>
  )
}
