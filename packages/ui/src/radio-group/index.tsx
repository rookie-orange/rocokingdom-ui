import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { Button, type ButtonProps } from '../button'
import styles from './radio-group.module.css'

export const radioGroupPrefixCls = 'rk-radio-group'

export type RadioGroupMaterial = NonNullable<ButtonProps['material']>
export type RadioGroupSize = NonNullable<ButtonProps['size']>
export type RadioGroupVariant = NonNullable<ButtonProps['variant']>
export type RadioGroupOrientation = 'horizontal' | 'vertical'

export type RadioGroupButtonProps = Omit<
  ButtonProps,
  | 'aria-checked'
  | 'aria-disabled'
  | 'children'
  | 'disabled'
  | 'onClick'
  | 'role'
  | 'tabIndex'
  | 'type'
  | 'value'
>

export interface RadioGroupOption<Value extends string = string> {
  buttonProps?: RadioGroupButtonProps
  disabled?: boolean
  label: ReactNode
  value: Value
}

export interface RadioGroupProps<Value extends string = string> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  activeButtonClassName?: string
  activeMaterial?: RadioGroupMaterial
  activeShadow?: boolean
  activeVariant?: RadioGroupVariant
  buttonClassName?: string
  buttonProps?: RadioGroupButtonProps
  defaultValue?: Value
  disabled?: boolean
  inactiveButtonClassName?: string
  inactiveMaterial?: RadioGroupMaterial
  inactiveShadow?: boolean
  inactiveVariant?: RadioGroupVariant
  name?: string
  onValueChange?: (value: Value) => void
  options: readonly RadioGroupOption<Value>[]
  orientation?: RadioGroupOrientation
  prefixCls?: string
  rootClassName?: string
  size?: RadioGroupSize
  value?: Value
}

export function RadioGroup<Value extends string = string>({
  activeButtonClassName,
  activeMaterial = 'default',
  activeShadow = false,
  activeVariant = 'solid',
  buttonClassName,
  buttonProps,
  className,
  defaultValue,
  disabled = false,
  inactiveButtonClassName,
  inactiveMaterial = 'stone',
  inactiveShadow = false,
  inactiveVariant = 'solid',
  name,
  onKeyDown,
  onValueChange,
  options,
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

  function getEnabledOptions() {
    return options
      .map((option, index) => ({ index, option }))
      .filter(({ option }) => !disabled && !option.disabled)
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

    const enabledOptions = getEnabledOptions()

    if (enabledOptions.length === 0) {
      return
    }

    const focusedValue = event.target instanceof HTMLButtonElement ? event.target.value : undefined
    const selectedIndex = enabledOptions.findIndex(({ option }) => option.value === selectedValue)
    const focusedIndex = enabledOptions.findIndex(({ option }) => option.value === focusedValue)
    const currentIndex = selectedIndex >= 0 ? selectedIndex : focusedIndex

    let nextIndex = 0

    if (event.key === 'End') {
      nextIndex = enabledOptions.length - 1
    } else if (isPreviousKey) {
      nextIndex = currentIndex <= 0 ? enabledOptions.length - 1 : currentIndex - 1
    } else if (isNextKey) {
      nextIndex = currentIndex >= enabledOptions.length - 1 ? 0 : currentIndex + 1
    }

    event.preventDefault()

    const nextOption = enabledOptions[nextIndex]
    selectValue(nextOption.option.value)
    event.currentTarget
      .querySelector<HTMLButtonElement>(`[data-rk-radio-option-index="${nextOption.index}"]`)
      ?.focus()
  }

  const enabledOptions = getEnabledOptions()
  const firstEnabledValue = enabledOptions[0]?.option.value
  const hasSelectedEnabledOption = enabledOptions.some(
    ({ option }) => option.value === selectedValue,
  )
  const resolvedClassName = clsx(
    prefixCls,
    styles.group,
    styles[orientation],
    rootClassName,
    className,
  )

  return (
    <div
      aria-disabled={disabled || undefined}
      aria-orientation={orientation}
      className={resolvedClassName}
      onKeyDown={handleKeyDown}
      role="radiogroup"
      {...props}
    >
      {name && selectedValue !== undefined ? (
        <input disabled={disabled} name={name} type="hidden" value={selectedValue} />
      ) : null}
      {options.map((option, index) => {
        const isOptionDisabled = disabled || option.disabled === true
        const isSelected = option.value === selectedValue
        const isTabbable =
          !isOptionDisabled &&
          ((hasSelectedEnabledOption && isSelected) ||
            (!hasSelectedEnabledOption && option.value === firstEnabledValue))
        const optionButtonProps = option.buttonProps

        return (
          <Button
            {...buttonProps}
            {...optionButtonProps}
            aria-checked={isSelected}
            aria-disabled={isOptionDisabled || undefined}
            className={clsx(
              styles.option,
              isSelected ? styles.active : styles.inactive,
              buttonClassName,
              isSelected ? activeButtonClassName : inactiveButtonClassName,
              buttonProps?.className,
              optionButtonProps?.className,
            )}
            data-rk-radio-option-index={index}
            disabled={isOptionDisabled}
            key={option.value}
            material={
              optionButtonProps?.material ??
              buttonProps?.material ??
              (isSelected ? activeMaterial : inactiveMaterial)
            }
            onClick={() => selectValue(option.value)}
            role="radio"
            shadow={
              optionButtonProps?.shadow ??
              buttonProps?.shadow ??
              (isSelected ? activeShadow : inactiveShadow)
            }
            size={optionButtonProps?.size ?? buttonProps?.size ?? size}
            tabIndex={isTabbable ? 0 : -1}
            type="button"
            value={option.value}
            variant={
              optionButtonProps?.variant ??
              buttonProps?.variant ??
              (isSelected ? activeVariant : inactiveVariant)
            }
          >
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}
