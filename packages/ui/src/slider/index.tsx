import * as RadixSlider from '@radix-ui/react-slider'
import {
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from 'react'
import { clsx } from 'clsx'
import { Material, resolveMaterial, type MaterialPreset } from '../material'
import styles from './slider.module.css'

export const sliderPrefixCls = 'rk-slider'

export const SliderRoot = RadixSlider.Root
export const SliderTrack = RadixSlider.Track
export const SliderRange = RadixSlider.Range
export const SliderThumb = RadixSlider.Thumb

export type SliderMaterial = MaterialPreset
export type SliderSize = 'small' | 'middle' | 'large'

type RadixSliderRootProps = ComponentPropsWithoutRef<typeof RadixSlider.Root>

export interface SliderProps extends Omit<
  RadixSliderRootProps,
  'asChild' | 'children' | 'className'
> {
  children?: ReactNode
  className?: string
  prefixCls?: string
  rangeClassName?: string
  rangeMaterial?: SliderMaterial
  ref?: Ref<HTMLSpanElement>
  rootClassName?: string
  size?: SliderSize
  thumbAriaLabel?: string | ((index: number) => string)
  thumbClassName?: string
  thumbMaterial?: SliderMaterial
  trackClassName?: string
  trackMaterial?: SliderMaterial
}

function getThumbCount(value: number[] | undefined, defaultValue: number[] | undefined) {
  return Math.max(1, value?.length ?? defaultValue?.length ?? 1)
}

function getThumbAriaLabel(label: SliderProps['thumbAriaLabel'], index: number) {
  if (typeof label === 'function') {
    return label(index)
  }

  return label ?? 'Slider value'
}

function getInitialSliderValues(defaultValue: number[] | undefined, min: number) {
  return defaultValue ?? [min]
}

function valueIncludesEdge(values: number[], edge: number) {
  return values.some((item) => item === edge)
}

export function Slider({
  children,
  className,
  defaultValue,
  disabled = false,
  orientation = 'horizontal',
  prefixCls = sliderPrefixCls,
  rangeClassName,
  rangeMaterial = 'primary',
  ref,
  rootClassName,
  size = 'middle',
  thumbAriaLabel,
  thumbClassName,
  thumbMaterial = 'paper',
  trackClassName,
  trackMaterial = 'stoneMuted',
  value,
  max = 100,
  min = 0,
  inverted = false,
  dir,
  onValueChange,
  style,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(() =>
    getInitialSliderValues(defaultValue, min),
  )
  const sliderValues = value ?? internalValue
  const rangeTouchesMin = sliderValues.length <= 1 || valueIncludesEdge(sliderValues, min)
  const rangeTouchesMax = valueIncludesEdge(sliderValues, max)
  const isHorizontal = orientation === 'horizontal'
  const isRtl = dir === 'rtl'
  const isSlidingFromLeft = isRtl ? inverted : !inverted
  const beforeCapUsesRange = isHorizontal
    ? isSlidingFromLeft
      ? rangeTouchesMin
      : rangeTouchesMax
    : inverted
      ? rangeTouchesMax
      : rangeTouchesMin
  const afterCapUsesRange = isHorizontal
    ? isSlidingFromLeft
      ? rangeTouchesMax
      : rangeTouchesMin
    : inverted
      ? rangeTouchesMin
      : rangeTouchesMax
  const rangeMaterialValue = resolveMaterial({ material: rangeMaterial })
  const sliderStyle = {
    '--rk-slider-range-background': rangeMaterialValue.background,
    ...style,
  } as CSSProperties
  const handleValueChange = (nextValue: number[]) => {
    if (value === undefined) {
      setInternalValue(nextValue)
    }

    onValueChange?.(nextValue)
  }
  const resolvedClassName = clsx(
    prefixCls,
    styles.slider,
    styles[size],
    disabled && styles.disabled,
    rootClassName,
    className,
  )
  const thumbCount = getThumbCount(value, defaultValue)

  return (
    <RadixSlider.Root
      {...props}
      className={resolvedClassName}
      defaultValue={defaultValue}
      disabled={disabled}
      dir={dir}
      inverted={inverted}
      max={max}
      min={min}
      orientation={orientation}
      onValueChange={handleValueChange}
      ref={ref}
      style={sliderStyle}
      value={value}
      data-after-cap={afterCapUsesRange ? 'range' : 'track'}
      data-before-cap={beforeCapUsesRange ? 'range' : 'track'}
    >
      {children ?? (
        <>
          <Material asChild material={trackMaterial}>
            <RadixSlider.Track className={clsx(`${prefixCls}-track`, styles.track, trackClassName)}>
              <Material asChild material={rangeMaterial}>
                <RadixSlider.Range
                  className={clsx(`${prefixCls}-range`, styles.range, rangeClassName)}
                />
              </Material>
            </RadixSlider.Track>
          </Material>
          {Array.from({ length: thumbCount }, (_, index) => (
            <Material asChild key={index} material={thumbMaterial}>
              <RadixSlider.Thumb
                aria-label={getThumbAriaLabel(thumbAriaLabel, index)}
                className={clsx(`${prefixCls}-thumb`, styles.thumb, thumbClassName)}
              />
            </Material>
          ))}
        </>
      )}
    </RadixSlider.Root>
  )
}
