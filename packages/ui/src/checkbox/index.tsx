import { Check } from '@rocokingdom-ui/icons'
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import styles from './checkbox.module.css'

export const checkboxPrefixCls = 'rk-checkbox'

export type CheckboxMaterial = MaterialPreset
export type CheckboxSize = 'small' | 'middle' | 'large'
export type CheckboxVariant = 'solid' | 'outline'

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'size' | 'type'
> {
  checkedClassName?: string
  children?: ReactNode
  icon?: ReactNode
  material?: CheckboxMaterial
  prefixCls?: string
  rootClassName?: string
  shadow?: boolean
  size?: CheckboxSize
  uncheckedClassName?: string
  uncheckedVariant?: CheckboxVariant
  variant?: CheckboxVariant
}

export function Checkbox({
  checked,
  checkedClassName,
  children,
  className,
  defaultChecked = false,
  disabled = false,
  icon,
  material = 'primary',
  onChange,
  prefixCls = checkboxPrefixCls,
  rootClassName,
  shadow = false,
  size = 'middle',
  uncheckedClassName,
  uncheckedVariant = 'outline',
  variant = 'solid',
  ...props
}: CheckboxProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(Boolean(defaultChecked))
  const isControlled = checked !== undefined
  const isChecked = checked ?? uncontrolledChecked
  const shapeVariant = isChecked ? variant : uncheckedVariant
  const resolvedClassName = clsx(
    prefixCls,
    styles.checkbox,
    styles[size],
    styles[shapeVariant],
    isChecked ? styles.checked : styles.unchecked,
    disabled && styles.disabled,
    rootClassName,
    className,
    isChecked ? checkedClassName : uncheckedClassName,
  )

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event)

    if (!isControlled && !event.defaultPrevented) {
      setUncontrolledChecked(event.currentTarget.checked)
    }
  }

  return (
    <label
      aria-disabled={disabled || undefined}
      className={resolvedClassName}
      data-state={isChecked ? 'checked' : 'unchecked'}
    >
      <input
        {...props}
        checked={isChecked}
        className={styles.input}
        disabled={disabled}
        onChange={handleChange}
        type="checkbox"
      />
      <Material asChild material={material}>
        <RocoShape
          aria-hidden="true"
          className={styles.control}
          contentClassName={styles.icon}
          shadow={isChecked && shadow}
          shape="square"
          variant={shapeVariant}
        >
          {isChecked ? (icon ?? <Check />) : null}
        </RocoShape>
      </Material>
      {children ? <span className={styles.label}>{children}</span> : null}
    </label>
  )
}
