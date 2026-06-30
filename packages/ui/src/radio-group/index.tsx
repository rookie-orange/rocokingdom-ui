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
import styles from './radio-group.module.css'

export const radioGroupPrefixCls = 'rk-radio-group'
export const radioItemPrefixCls = 'rk-radio-item'

export type RadioGroupMaterial = MaterialPreset
export type RadioGroupSize = 'small' | 'middle' | 'large'
export type RadioGroupVariant = 'solid' | 'outline' | 'text'
export type RadioGroupOrientation = 'horizontal' | 'vertical'

interface RadioGroupContextValue<Value extends string = string> {
  activeMaterial: RadioGroupMaterial
  activeShadow: boolean
  activeVariant: RadioGroupVariant
  disabled: boolean
  inactiveMaterial: RadioGroupMaterial
  inactiveShadow: boolean
  inactiveVariant: RadioGroupVariant
  onValueChange: (value: Value) => void
  selectedValue: Value | undefined
  size: RadioGroupSize
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export interface RadioGroupProps<Value extends string = string> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  activeMaterial?: RadioGroupMaterial
  activeShadow?: boolean
  activeVariant?: RadioGroupVariant
  children?: ReactNode
  defaultValue?: Value
  disabled?: boolean
  inactiveMaterial?: RadioGroupMaterial
  inactiveShadow?: boolean
  inactiveVariant?: RadioGroupVariant
  name?: string
  onValueChange?: (value: Value) => void
  orientation?: RadioGroupOrientation
  prefixCls?: string
  rootClassName?: string
  size?: RadioGroupSize
  value?: Value
}

export interface RadioItemProps<Value extends string = string> extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-checked' | 'aria-disabled' | 'role' | 'tabIndex' | 'type' | 'value'
> {
  activeClassName?: string
  activeMaterial?: RadioGroupMaterial
  activeShadow?: boolean
  activeVariant?: RadioGroupVariant
  children?: ReactNode
  inactiveClassName?: string
  inactiveMaterial?: RadioGroupMaterial
  inactiveShadow?: boolean
  inactiveVariant?: RadioGroupVariant
  material?: RadioGroupMaterial
  prefixCls?: string
  rootClassName?: string
  shadow?: boolean
  size?: RadioGroupSize
  value: Value
  variant?: RadioGroupVariant
}

function getRadioItems(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLButtonElement>('[data-rk-radio-item="true"]')).filter(
    (item) => !item.disabled && item.getAttribute('aria-disabled') !== 'true',
  )
}

export function RadioGroup<Value extends string = string>({
  activeMaterial = 'paper',
  activeShadow = false,
  activeVariant = 'solid',
  children,
  className,
  defaultValue,
  disabled = false,
  inactiveMaterial = 'stone',
  inactiveShadow = false,
  inactiveVariant = 'solid',
  name,
  onKeyDown,
  onValueChange,
  orientation = 'horizontal',
  prefixCls = radioGroupPrefixCls,
  rootClassName,
  size = 'middle',
  value,
  ...props
}: RadioGroupProps<Value>) {
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

    const enabledItems = getRadioItems(event.currentTarget)

    if (enabledItems.length === 0) {
      return
    }

    const selectedIndex = enabledItems.findIndex(
      (item) => item.getAttribute('aria-checked') === 'true',
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
    <RadioGroupContext.Provider
      value={{
        activeMaterial,
        activeShadow,
        activeVariant,
        disabled,
        inactiveMaterial,
        inactiveShadow,
        inactiveVariant,
        onValueChange: selectValue as RadioGroupContextValue['onValueChange'],
        selectedValue,
        size,
      }}
    >
      <div
        {...props}
        aria-disabled={disabled || undefined}
        aria-orientation={orientation}
        className={resolvedClassName}
        onKeyDown={handleKeyDown}
        role="radiogroup"
      >
        {name && selectedValue !== undefined ? (
          <input disabled={disabled} name={name} type="hidden" value={selectedValue} />
        ) : null}
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export function RadioItem<Value extends string = string>({
  activeClassName,
  activeMaterial,
  activeShadow,
  activeVariant,
  children,
  className,
  disabled = false,
  inactiveClassName,
  inactiveMaterial,
  inactiveShadow,
  inactiveVariant,
  material,
  onClick,
  prefixCls = radioItemPrefixCls,
  rootClassName,
  shadow,
  size,
  value,
  variant,
  ...props
}: RadioItemProps<Value>) {
  const context = useContext(RadioGroupContext)

  if (!context) {
    throw new Error('RadioItem must be rendered inside RadioGroup.')
  }

  const radioGroup = context
  const isDisabled = radioGroup.disabled || disabled
  const isSelected = radioGroup.selectedValue === value
  const isTabbable = !isDisabled && (isSelected || radioGroup.selectedValue === undefined)
  const resolvedMaterial =
    (isSelected ? activeMaterial : inactiveMaterial) ??
    material ??
    (isSelected ? radioGroup.activeMaterial : radioGroup.inactiveMaterial)
  const resolvedShadow =
    (isSelected ? activeShadow : inactiveShadow) ??
    shadow ??
    (isSelected ? radioGroup.activeShadow : radioGroup.inactiveShadow)
  const resolvedSize = size ?? radioGroup.size
  const resolvedVariant =
    (isSelected ? activeVariant : inactiveVariant) ??
    variant ??
    (isSelected ? radioGroup.activeVariant : radioGroup.inactiveVariant)
  const resolvedClassName = clsx(
    prefixCls,
    styles.item,
    styles[resolvedSize],
    styles[resolvedVariant],
    isSelected ? styles.active : styles.inactive,
    rootClassName,
    className,
    isSelected ? activeClassName : inactiveClassName,
  )

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event)

    if (event.defaultPrevented || isDisabled) {
      return
    }

    radioGroup.onValueChange(value)
  }

  return (
    <Material asChild material={resolvedMaterial}>
      <RocoShape
        {...props}
        aria-checked={isSelected}
        aria-disabled={isDisabled || undefined}
        as="button"
        className={resolvedClassName}
        data-rk-radio-item="true"
        data-state={isSelected ? 'checked' : 'unchecked'}
        disabled={isDisabled}
        onClick={handleClick}
        role="radio"
        shadow={resolvedVariant === 'text' ? false : resolvedShadow}
        tabIndex={isTabbable ? 0 : -1}
        type="button"
        value={value}
        variant={resolvedVariant}
        contentClassName={styles.itemContent}
      >
        {children}
      </RocoShape>
    </Material>
  )
}
