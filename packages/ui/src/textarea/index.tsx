import type { ChangeEvent, CSSProperties, Ref, TextareaHTMLAttributes } from 'react'
import { useState } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import styles from './textarea.module.css'

export const textareaPrefixCls = 'rk-textarea'

export type TextareaMaterial = MaterialPreset
export type TextareaResize = 'both' | 'horizontal' | 'none' | 'vertical'
export type TextareaSize = 'small' | 'middle' | 'large'
export type TextareaVariant = 'solid' | 'outline'

interface TextareaStyle extends CSSProperties {
  '--rk-textarea-resize'?: TextareaResize
}

type TextareaValue = TextareaHTMLAttributes<HTMLTextAreaElement>['value']

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'children' | 'size'
> {
  countClassName?: string
  material?: TextareaMaterial
  prefixCls?: string
  ref?: Ref<HTMLTextAreaElement>
  resize?: TextareaResize
  rootClassName?: string
  shadow?: boolean
  showCount?: boolean
  size?: TextareaSize
  textareaClassName?: string
  variant?: TextareaVariant
}

type TextareaFrameCorner = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
type TextareaFramePart = 'fill' | 'stroke'

const textareaCornerStrokePathByCorner: Record<TextareaFrameCorner, string> = {
  'bottom-left': 'M0 0V47.8C0 75.6 22.4 96 53.6 96H96',
  'bottom-right': 'M0 96H51.8C78.4 96 96 73.5 96 44.2V0',
  'top-left': 'M0 96V54.2C0 24.5 22.6 0 55.8 0H96',
  'top-right': 'M0 0H51.2C79.2 0 96 22.2 96 52.8V96',
}

const textareaCornerFillPathByCorner: Record<TextareaFrameCorner, string> = {
  'bottom-left': `${textareaCornerStrokePathByCorner['bottom-left']}V0Z`,
  'bottom-right': `${textareaCornerStrokePathByCorner['bottom-right']}H0V96Z`,
  'top-left': `${textareaCornerStrokePathByCorner['top-left']}V96Z`,
  'top-right': `${textareaCornerStrokePathByCorner['top-right']}H0Z`,
}

const textareaCornerPathByPart: Record<TextareaFramePart, Record<TextareaFrameCorner, string>> = {
  fill: textareaCornerFillPathByCorner,
  stroke: textareaCornerStrokePathByCorner,
}

function getTextareaValueLength(value: TextareaValue | undefined) {
  if (value === undefined || value === null) {
    return 0
  }

  return String(value).length
}

interface TextareaFrameCornerProps {
  corner: TextareaFrameCorner
  part: TextareaFramePart
}

function TextareaFrameCorner({ corner, part }: TextareaFrameCornerProps) {
  return (
    <svg
      className={styles.cornerSvg}
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 96 96"
    >
      <path
        className={styles.cornerPath}
        d={textareaCornerPathByPart[part][corner]}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

interface TextareaFrameLayerProps {
  part: TextareaFramePart
}

function TextareaFrameLayer({ part }: TextareaFrameLayerProps) {
  return (
    <span aria-hidden="true" className={clsx(styles.frameLayer, styles[part])}>
      <span className={clsx(styles.framePart, styles.cornerTopLeft)}>
        <TextareaFrameCorner corner="top-left" part={part} />
      </span>
      <span className={clsx(styles.framePart, styles.edgeTop)} />
      <span className={clsx(styles.framePart, styles.cornerTopRight)}>
        <TextareaFrameCorner corner="top-right" part={part} />
      </span>
      <span className={clsx(styles.framePart, styles.edgeLeft)} />
      <span className={clsx(styles.framePart, styles.frameCenter)} />
      <span className={clsx(styles.framePart, styles.edgeRight)} />
      <span className={clsx(styles.framePart, styles.cornerBottomLeft)}>
        <TextareaFrameCorner corner="bottom-left" part={part} />
      </span>
      <span className={clsx(styles.framePart, styles.edgeBottom)} />
      <span className={clsx(styles.framePart, styles.cornerBottomRight)}>
        <TextareaFrameCorner corner="bottom-right" part={part} />
      </span>
    </span>
  )
}

interface TextareaFrameProps {
  shadow: boolean
  variant: TextareaVariant
}

function TextareaFrame({ shadow, variant }: TextareaFrameProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(styles.frame, shadow && variant === 'solid' && styles.withShadow)}
    >
      {variant === 'solid' ? <TextareaFrameLayer part="fill" /> : null}
      {variant === 'outline' ? <TextareaFrameLayer part="stroke" /> : null}
    </span>
  )
}

export function Textarea({
  className,
  countClassName,
  defaultValue,
  disabled = false,
  material = 'stone',
  maxLength,
  onChange,
  prefixCls = textareaPrefixCls,
  readOnly = false,
  ref,
  resize = 'vertical',
  rootClassName,
  shadow = false,
  showCount = false,
  size = 'middle',
  style,
  textareaClassName,
  value,
  variant = 'solid',
  ...props
}: TextareaProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : uncontrolledValue
  const characterCount = getTextareaValueLength(currentValue)
  const textareaStyle: TextareaStyle = { ...style, '--rk-textarea-resize': resize }
  const resolvedClassName = clsx(
    prefixCls,
    styles.textarea,
    styles[size],
    styles[variant],
    disabled && styles.disabled,
    readOnly && styles.readonly,
    rootClassName,
    className,
  )

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange?.(event)

    if (!isControlled && !event.defaultPrevented) {
      setUncontrolledValue(event.currentTarget.value)
    }
  }

  return (
    <Material asChild material={material}>
      <label
        aria-disabled={disabled || undefined}
        className={resolvedClassName}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        style={textareaStyle}
      >
        <TextareaFrame shadow={shadow} variant={variant} />
        <span className={styles.content}>
          <textarea
            {...props}
            className={clsx(`${prefixCls}-control`, styles.control, textareaClassName)}
            defaultValue={defaultValue}
            disabled={disabled}
            maxLength={maxLength}
            onChange={handleChange}
            readOnly={readOnly}
            ref={ref}
            value={value}
          />
          {showCount ? (
            <span className={clsx(`${prefixCls}-count`, styles.count, countClassName)}>
              {typeof maxLength === 'number' ? `${characterCount} / ${maxLength}` : characterCount}
            </span>
          ) : null}
        </span>
      </label>
    </Material>
  )
}
