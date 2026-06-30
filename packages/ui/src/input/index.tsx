import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import styles from './input.module.css'

export const inputPrefixCls = 'rk-input'

export type InputMaterial = MaterialPreset
export type InputSize = 'small' | 'middle' | 'large'
export type InputVariant = 'solid' | 'outline'

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'children' | 'prefix' | 'size'
> {
  inputClassName?: string
  material?: InputMaterial
  prefix?: ReactNode
  prefixCls?: string
  ref?: Ref<HTMLInputElement>
  rootClassName?: string
  shadow?: boolean
  size?: InputSize
  suffix?: ReactNode
  variant?: InputVariant
}

export function Input({
  className,
  disabled = false,
  inputClassName,
  material = 'stone',
  prefix,
  prefixCls = inputPrefixCls,
  readOnly = false,
  ref,
  rootClassName,
  shadow = false,
  size = 'middle',
  suffix,
  type = 'text',
  variant = 'solid',
  ...props
}: InputProps) {
  const resolvedClassName = clsx(
    prefixCls,
    styles.input,
    styles[size],
    styles[variant],
    rootClassName,
    className,
  )

  return (
    <Material asChild material={material}>
      <RocoShape
        aria-disabled={disabled || undefined}
        as="label"
        className={resolvedClassName}
        contentClassName={styles.content}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        shadow={shadow}
        variant={variant}
      >
        {prefix ? <span className={styles.affix}>{prefix}</span> : null}
        <input
          {...props}
          className={clsx(`${prefixCls}-control`, styles.control, inputClassName)}
          disabled={disabled}
          readOnly={readOnly}
          ref={ref}
          type={type}
        />
        {suffix ? <span className={styles.affix}>{suffix}</span> : null}
      </RocoShape>
    </Material>
  )
}
