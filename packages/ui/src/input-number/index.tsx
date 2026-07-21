import type { ChangeEvent, FocusEvent, InputHTMLAttributes, Ref } from 'react'
import { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import styles from './input-number.module.css'

export const inputNumberPrefixCls = 'rk-input-number'

export interface InputNumberProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'max' | 'min' | 'onChange' | 'prefix' | 'size' | 'step' | 'type' | 'value'
> {
  defaultValue?: number
  formatter?: (value: number | undefined) => string
  inputClassName?: string
  material?: MaterialPreset
  max?: number
  min?: number
  onValueChange?: (value: number | undefined) => void
  parser?: (value: string) => number | undefined
  precision?: number
  prefixCls?: string
  ref?: Ref<HTMLInputElement>
  rootClassName?: string
  shadow?: boolean
  size?: 'small' | 'middle' | 'large'
  step?: number
  value?: number
  variant?: 'outline' | 'solid'
}

function clamp(value: number, min: number | undefined, max: number | undefined) {
  return Math.min(max ?? Number.POSITIVE_INFINITY, Math.max(min ?? Number.NEGATIVE_INFINITY, value))
}

function round(value: number, precision: number | undefined) {
  if (precision === undefined) return value
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

function defaultParser(value: string) {
  if (value.trim() === '') return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function InputNumber({
  className,
  defaultValue,
  disabled = false,
  formatter = (nextValue) => (nextValue === undefined ? '' : String(nextValue)),
  inputClassName,
  material = 'stone',
  max,
  min,
  onBlur,
  onValueChange,
  parser = defaultParser,
  precision,
  prefixCls = inputNumberPrefixCls,
  readOnly = false,
  ref,
  rootClassName,
  shadow = false,
  size = 'middle',
  step = 1,
  value,
  variant = 'solid',
  ...props
}: InputNumberProps) {
  const controlled = value !== undefined
  const [innerValue, setInnerValue] = useState<number | undefined>(defaultValue)
  const resolvedValue = controlled ? value : innerValue
  const [draft, setDraft] = useState(() => formatter(resolvedValue))

  useEffect(() => {
    setDraft(formatter(resolvedValue))
  }, [formatter, resolvedValue])

  const commit = (nextValue: number | undefined) => {
    const normalized =
      nextValue === undefined ? undefined : round(clamp(nextValue, min, max), precision)
    if (!controlled) setInnerValue(normalized)
    setDraft(formatter(normalized))
    onValueChange?.(normalized)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextDraft = event.target.value
    setDraft(nextDraft)
    const parsed = parser(nextDraft)
    if (parsed !== undefined && parsed >= (min ?? -Infinity) && parsed <= (max ?? Infinity)) {
      if (!controlled) setInnerValue(parsed)
      onValueChange?.(parsed)
    } else if (nextDraft === '') {
      if (!controlled) setInnerValue(undefined)
      onValueChange?.(undefined)
    }
  }

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    commit(parser(draft))
    onBlur?.(event)
  }

  const stepBy = (direction: -1 | 1) => {
    const fallback = direction > 0 ? (min ?? 0) : (max ?? 0)
    commit((resolvedValue ?? fallback) + direction * step)
  }

  return (
    <Material
      className={clsx(
        prefixCls,
        styles.root,
        styles[size],
        styles[variant],
        rootClassName,
        className,
      )}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      material={material}
    >
      <button
        aria-label="Decrease value"
        className={styles.stepper}
        disabled={
          disabled ||
          readOnly ||
          (resolvedValue !== undefined && resolvedValue <= (min ?? -Infinity))
        }
        onClick={() => stepBy(-1)}
        type="button"
      >
        <RocoShape aria-hidden="true" shadow={shadow} shape="square" variant={variant} />
        <Minus aria-hidden="true" className={styles.icon} />
      </button>
      <input
        {...props}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={resolvedValue}
        className={clsx(styles.control, inputClassName)}
        disabled={disabled}
        inputMode="decimal"
        onBlur={handleBlur}
        onChange={handleChange}
        readOnly={readOnly}
        ref={ref}
        role="spinbutton"
        value={draft}
      />
      <button
        aria-label="Increase value"
        className={styles.stepper}
        disabled={
          disabled ||
          readOnly ||
          (resolvedValue !== undefined && resolvedValue >= (max ?? Infinity))
        }
        onClick={() => stepBy(1)}
        type="button"
      >
        <RocoShape aria-hidden="true" shadow={shadow} shape="square" variant={variant} />
        <Plus aria-hidden="true" className={styles.icon} />
      </button>
    </Material>
  )
}
