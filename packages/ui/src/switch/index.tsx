import type { ChangeEvent, InputHTMLAttributes, ReactNode, Ref } from 'react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import styles from './switch.module.css'

export const switchPrefixCls = 'rk-switch'

export type SwitchMaterial = MaterialPreset
export type SwitchSize = 'small' | 'middle' | 'large'

export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'size' | 'type'
> {
  checkedMaterial?: SwitchMaterial
  checkedShadow?: boolean
  children?: ReactNode
  inputClassName?: string
  onCheckedChange?: (checked: boolean) => void
  prefixCls?: string
  ref?: Ref<HTMLInputElement>
  rootClassName?: string
  size?: SwitchSize
  thumbMaterial?: SwitchMaterial
  uncheckedMaterial?: SwitchMaterial
}

export function Switch({
  checked,
  checkedMaterial = 'success',
  checkedShadow = true,
  children,
  className,
  defaultChecked = false,
  disabled = false,
  inputClassName,
  onChange,
  onCheckedChange,
  prefixCls = switchPrefixCls,
  readOnly = false,
  ref,
  rootClassName,
  size = 'middle',
  thumbMaterial = 'paper',
  uncheckedMaterial = 'stone',
  ...props
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(Boolean(defaultChecked))
  const isControlled = checked !== undefined
  const isChecked = checked ?? uncontrolledChecked
  const resolvedTrackMaterial = isChecked ? checkedMaterial : uncheckedMaterial
  const resolvedClassName = clsx(
    prefixCls,
    styles.switch,
    styles[size],
    isChecked ? styles.checked : styles.unchecked,
    disabled && styles.disabled,
    readOnly && styles.readonly,
    rootClassName,
    className,
  )

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event)

    if (event.defaultPrevented || readOnly) {
      return
    }

    const nextChecked = event.currentTarget.checked

    if (!isControlled) {
      setUncontrolledChecked(nextChecked)
    }

    onCheckedChange?.(nextChecked)
  }

  return (
    <label
      aria-disabled={disabled || undefined}
      className={resolvedClassName}
      data-readonly={readOnly || undefined}
      data-state={isChecked ? 'checked' : 'unchecked'}
    >
      <input
        {...props}
        aria-checked={isChecked}
        checked={isChecked}
        className={clsx(`${prefixCls}-control`, styles.input, inputClassName)}
        disabled={disabled}
        onChange={handleChange}
        readOnly={readOnly}
        ref={ref}
        role="switch"
        type="checkbox"
      />
      <Material asChild material={resolvedTrackMaterial}>
        <RocoShape
          aria-hidden="true"
          className={styles.track}
          contentClassName={styles.trackContent}
          shadow={isChecked && checkedShadow}
          variant="solid"
        >
          <Material asChild material={thumbMaterial}>
            <RocoShape className={styles.thumb} shape="circle" variant="solid" />
          </Material>
        </RocoShape>
      </Material>
      {children ? <span className={styles.label}>{children}</span> : null}
    </label>
  )
}
