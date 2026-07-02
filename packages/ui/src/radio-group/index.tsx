import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import type { ComponentPropsWithoutRef, ReactNode, Ref } from 'react'
import { createContext, useContext, useState } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape, type RocoShapeVariant } from '../roco-shape'
import styles from './radio-group.module.css'

export const radioGroupPrefixCls = 'rk-radio-group'
export const radioItemPrefixCls = 'rk-radio-item'

export const RadioGroupRoot = RadixRadioGroup.Root
export const RadioIndicator = RadixRadioGroup.Indicator

export type RadioGroupMaterial = MaterialPreset
export type RadioGroupSize = 'small' | 'middle' | 'large'
export type RadioGroupVariant = RocoShapeVariant
export type RadioGroupOrientation = 'horizontal' | 'vertical'

interface RadioGroupContextValue<Value extends string = string> {
  activeMaterial: RadioGroupMaterial
  activeShadow: boolean
  activeVariant: RadioGroupVariant
  disabled: boolean
  inactiveMaterial: RadioGroupMaterial
  inactiveShadow: boolean
  inactiveVariant: RadioGroupVariant
  selectedValue: Value | undefined
  size: RadioGroupSize
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

type RadixRadioGroupRootProps = ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>
type RadixRadioGroupItemProps = ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>

export interface RadioGroupProps<Value extends string = string> extends Omit<
  RadixRadioGroupRootProps,
  'defaultValue' | 'onValueChange' | 'orientation' | 'value'
> {
  activeMaterial?: RadioGroupMaterial
  activeShadow?: boolean
  activeVariant?: RadioGroupVariant
  children?: ReactNode
  defaultValue?: Value
  inactiveMaterial?: RadioGroupMaterial
  inactiveShadow?: boolean
  inactiveVariant?: RadioGroupVariant
  onValueChange?: (value: Value) => void
  orientation?: RadioGroupOrientation
  prefixCls?: string
  ref?: Ref<HTMLDivElement>
  rootClassName?: string
  size?: RadioGroupSize
  value?: Value
}

export interface RadioItemProps<Value extends string = string> extends Omit<
  RadixRadioGroupItemProps,
  'asChild' | 'children' | 'className' | 'value'
> {
  activeClassName?: string
  activeMaterial?: RadioGroupMaterial
  activeShadow?: boolean
  activeVariant?: RadioGroupVariant
  children?: ReactNode
  className?: string
  inactiveClassName?: string
  inactiveMaterial?: RadioGroupMaterial
  inactiveShadow?: boolean
  inactiveVariant?: RadioGroupVariant
  material?: RadioGroupMaterial
  prefixCls?: string
  ref?: Ref<HTMLButtonElement>
  rootClassName?: string
  shadow?: boolean
  size?: RadioGroupSize
  value: Value
  variant?: RadioGroupVariant
}

export function RadioGroup<Value extends string = string>({
  activeMaterial = 'primary',
  activeShadow = false,
  activeVariant = 'outline',
  children,
  className,
  defaultValue,
  disabled = false,
  inactiveMaterial = 'stone',
  inactiveShadow = false,
  inactiveVariant = 'outline',
  onValueChange,
  orientation = 'horizontal',
  prefixCls = radioGroupPrefixCls,
  ref,
  rootClassName,
  size = 'middle',
  value,
  ...props
}: RadioGroupProps<Value>) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selectedValue = value ?? uncontrolledValue
  const isControlled = value !== undefined
  const resolvedClassName = clsx(
    prefixCls,
    styles.group,
    styles[orientation],
    rootClassName,
    className,
  )

  function handleValueChange(nextValue: string) {
    const typedValue = nextValue as Value

    if (!isControlled) {
      setUncontrolledValue(typedValue)
    }

    onValueChange?.(typedValue)
  }

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
        selectedValue,
        size,
      }}
    >
      <RadixRadioGroup.Root
        {...props}
        aria-disabled={disabled || undefined}
        className={resolvedClassName}
        defaultValue={defaultValue}
        disabled={disabled}
        onValueChange={handleValueChange}
        orientation={orientation}
        ref={ref}
        value={value}
      >
        {children}
      </RadixRadioGroup.Root>
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
  prefixCls = radioItemPrefixCls,
  ref,
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
    isSelected ? styles.active : styles.inactive,
    rootClassName,
    className,
    isSelected ? activeClassName : inactiveClassName,
  )

  return (
    <RadixRadioGroup.Item
      {...props}
      className={resolvedClassName}
      disabled={isDisabled}
      ref={ref}
      value={value}
    >
      <Material asChild material={resolvedMaterial}>
        <RocoShape
          aria-hidden="true"
          className={styles.control}
          shadow={resolvedVariant === 'text' ? false : resolvedShadow}
          shape="circle"
          variant={resolvedVariant}
        >
          <RadixRadioGroup.Indicator className={styles.indicator} forceMount>
            <span className={styles.indicatorDot} />
          </RadixRadioGroup.Indicator>
        </RocoShape>
      </Material>
      {children ? <span className={styles.label}>{children}</span> : null}
    </RadixRadioGroup.Item>
  )
}
