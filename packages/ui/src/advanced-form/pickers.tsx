import type { ComponentPropsWithRef, InputHTMLAttributes, ReactNode } from 'react'
import { useMemo, useState } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import * as RadixSelect from '@radix-ui/react-select'
import { format, isValid, parseISO } from 'date-fns'
import { CalendarDays, Check, ChevronDown, Clock } from 'lucide-react'
import { DayPicker, type DateRange, type Matcher } from 'react-day-picker'
import { clsx } from 'clsx'
import { Button } from '../button'
import { floatingContentClassName } from '../floating-content'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import { RocoTheme } from '../theme'
import styles from './advanced-form.module.css'

export const datePickerPrefixCls = 'rk-date-picker'
export const timePickerPrefixCls = 'rk-time-picker'

type PickerMode = 'range' | 'single'
type PickerValue = string | readonly [string, string]

interface PickerBaseProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'onChange' | 'size' | 'type' | 'value'
> {
  defaultValue?: PickerValue
  endPlaceholder?: string
  material?: MaterialPreset
  mode?: PickerMode
  onChange?: (value: PickerValue) => void
  prefixCls?: string
  rootClassName?: string
  shadow?: boolean
  size?: 'small' | 'middle' | 'large'
  startPlaceholder?: string
  value?: PickerValue
  variant?: 'outline' | 'solid'
}

export interface DatePickerProps extends PickerBaseProps {
  disabledDates?: Matcher | Matcher[]
  max?: string
  min?: string
  numberOfMonths?: number
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export interface TimePickerPreset {
  label: ReactNode
  value: string
}

export interface TimePickerProps extends PickerBaseProps {
  max?: string
  min?: string
  minuteStep?: number
  presets?: readonly TimePickerPreset[]
  showSeconds?: boolean
}

function readPickerValue(value: PickerValue | undefined, mode: PickerMode): PickerValue {
  if (mode === 'range') {
    return typeof value !== 'string' && value ? [value[0], value[1]] : ['', '']
  }
  return typeof value === 'string' ? value : ''
}

function parseDate(value?: string) {
  if (!value) return undefined
  const date = parseISO(value)
  return isValid(date) ? date : undefined
}

function formatDate(date?: Date) {
  return date ? format(date, 'yyyy-MM-dd') : ''
}

function formatDateLabel(value: string) {
  const date = parseDate(value)
  return date ? format(date, 'MMM d, yyyy') : ''
}

type PickerTriggerProps = Omit<ComponentPropsWithRef<'button'>, 'children'> & {
  disabled?: boolean
  endPlaceholder: string
  icon: ReactNode
  mode: PickerMode
  shadow: boolean
  size: 'small' | 'middle' | 'large'
  startPlaceholder: string
  values: readonly string[]
  variant: 'outline' | 'solid'
}

function PickerTrigger({
  autoFocus,
  className,
  disabled,
  endPlaceholder,
  icon,
  id,
  mode,
  shadow,
  size,
  startPlaceholder,
  values,
  variant,
  ...buttonProps
}: PickerTriggerProps) {
  return (
    <RocoShape
      {...buttonProps}
      as="button"
      autoFocus={autoFocus}
      className={clsx(styles.pickerField, styles[size], className)}
      contentClassName={styles.pickerContent}
      disabled={disabled}
      id={id}
      shadow={shadow}
      type="button"
      variant={variant}
    >
      <span aria-hidden="true" className={styles.pickerIcon}>
        {icon}
      </span>
      <span className={clsx(styles.pickerValue, !values[0] && styles.pickerPlaceholder)}>
        {values[0] || startPlaceholder}
      </span>
      {mode === 'range' ? (
        <>
          <span aria-hidden="true" className={styles.pickerSeparator}>
            to
          </span>
          <span className={clsx(styles.pickerValue, !values[1] && styles.pickerPlaceholder)}>
            {values[1] || endPlaceholder}
          </span>
        </>
      ) : null}
      <ChevronDown aria-hidden="true" className={styles.pickerChevron} />
    </RocoShape>
  )
}

function CalendarNavigationButton({
  children,
  className,
  ...props
}: ComponentPropsWithRef<'button'>) {
  return (
    <Material asChild material="stoneSoft">
      <RocoShape
        {...props}
        as="button"
        className={clsx(styles.calendarNavButton, className)}
        contentClassName={styles.calendarNavButtonContent}
        shape="circle"
      >
        {children}
      </RocoShape>
    </Material>
  )
}

const calendarComponents = {
  NextMonthButton: CalendarNavigationButton,
  PreviousMonthButton: CalendarNavigationButton,
}

function PickerHiddenInputs({
  disabled,
  mode,
  name,
  required,
  values,
}: {
  disabled?: boolean
  mode: PickerMode
  name?: string
  required?: boolean
  values: readonly string[]
}) {
  if (!name) return null
  return mode === 'range' ? (
    <>
      <input
        disabled={disabled}
        name={`${name}-start`}
        required={required}
        type="hidden"
        value={values[0]}
      />
      <input
        disabled={disabled}
        name={`${name}-end`}
        required={required}
        type="hidden"
        value={values[1]}
      />
    </>
  ) : (
    <input disabled={disabled} name={name} required={required} type="hidden" value={values[0]} />
  )
}

export function DatePicker({
  'aria-label': ariaLabel,
  autoFocus,
  className,
  defaultValue,
  disabled = false,
  disabledDates,
  endPlaceholder = 'End date',
  id,
  material = 'stone',
  max,
  min,
  mode = 'single',
  name,
  numberOfMonths,
  onChange,
  prefixCls = datePickerPrefixCls,
  required,
  rootClassName,
  shadow = false,
  size = 'middle',
  startPlaceholder = 'Select date',
  value,
  variant = 'solid',
  weekStartsOn,
}: DatePickerProps) {
  const [innerValue, setInnerValue] = useState<PickerValue>(() =>
    readPickerValue(defaultValue, mode),
  )
  const [open, setOpen] = useState(false)
  const resolved = readPickerValue(value ?? innerValue, mode)
  const values = typeof resolved === 'string' ? [resolved] : resolved
  const minDate = parseDate(min)
  const maxDate = parseDate(max)
  const disabledMatchers = useMemo<Matcher[]>(() => {
    const matchers = disabledDates
      ? Array.isArray(disabledDates)
        ? [...disabledDates]
        : [disabledDates]
      : []
    if (minDate) matchers.push({ before: minDate })
    if (maxDate) matchers.push({ after: maxDate })
    return matchers
  }, [disabledDates, maxDate, minDate])

  const commit = (nextValue: PickerValue) => {
    if (value === undefined) setInnerValue(nextValue)
    onChange?.(nextValue)
  }
  const selectedSingle = parseDate(values[0])
  const selectedRange: DateRange = {
    from: parseDate(values[0]),
    to: parseDate(values[1]),
  }
  const triggerValues =
    mode === 'range'
      ? [formatDateLabel(values[0]), formatDateLabel(values[1])]
      : [formatDateLabel(values[0])]

  return (
    <div
      className={clsx(
        prefixCls,
        styles.picker,
        mode === 'range' && styles.pickerRange,
        rootClassName,
        className,
      )}
      data-disabled={disabled || undefined}
    >
      <RadixPopover.Root onOpenChange={setOpen} open={open}>
        <RadixPopover.Trigger
          aria-label={ariaLabel ?? (mode === 'range' ? 'Choose date range' : 'Choose date')}
          asChild
        >
          <Material asChild material={material}>
            <PickerTrigger
              autoFocus={autoFocus}
              disabled={disabled}
              endPlaceholder={endPlaceholder}
              icon={<CalendarDays />}
              id={id}
              mode={mode}
              shadow={shadow}
              size={size}
              startPlaceholder={startPlaceholder}
              values={triggerValues}
              variant={variant}
            />
          </Material>
        </RadixPopover.Trigger>
        <RadixPopover.Portal>
          <RocoTheme asChild>
            <RadixPopover.Content
              align="start"
              className={clsx(floatingContentClassName, styles.pickerPopup)}
              collisionPadding={12}
              sideOffset={8}
            >
              <Material
                className={clsx(
                  styles.pickerPopupSurface,
                  shadow && styles.pickerPopupSurfaceShadow,
                )}
                material="paper"
              >
                <div className={styles.pickerPopupContent}>
                  {mode === 'range' ? (
                    <DayPicker
                      classNames={calendarClassNames}
                      components={calendarComponents}
                      defaultMonth={selectedRange.from ?? minDate}
                      disabled={disabledMatchers}
                      fixedWeeks
                      mode="range"
                      navLayout="around"
                      numberOfMonths={numberOfMonths ?? 2}
                      onSelect={(nextRange) => {
                        const nextValue: readonly [string, string] = [
                          formatDate(nextRange?.from),
                          formatDate(nextRange?.to),
                        ]
                        commit(nextValue)
                        if (nextRange?.from && nextRange.to) setOpen(false)
                      }}
                      selected={selectedRange}
                      showOutsideDays
                      weekStartsOn={weekStartsOn}
                    />
                  ) : (
                    <DayPicker
                      classNames={calendarClassNames}
                      components={calendarComponents}
                      defaultMonth={selectedSingle ?? minDate}
                      disabled={disabledMatchers}
                      fixedWeeks
                      mode="single"
                      navLayout="around"
                      numberOfMonths={numberOfMonths ?? 1}
                      onSelect={(nextDate) => {
                        commit(formatDate(nextDate))
                        if (nextDate) setOpen(false)
                      }}
                      selected={selectedSingle}
                      showOutsideDays
                      weekStartsOn={weekStartsOn}
                    />
                  )}
                </div>
              </Material>
            </RadixPopover.Content>
          </RocoTheme>
        </RadixPopover.Portal>
      </RadixPopover.Root>
      <span className={styles.visuallyHidden} id={id}>
        <PickerHiddenInputs
          disabled={disabled}
          mode={mode}
          name={name}
          required={required}
          values={values}
        />
      </span>
      {autoFocus ? <span className={styles.autoFocusHint} /> : null}
    </div>
  )
}

const calendarClassNames = {
  button_next: styles.calendarNavButtonNext,
  button_previous: styles.calendarNavButtonPrevious,
  caption_label: styles.calendarCaption,
  chevron: styles.calendarChevron,
  day: styles.calendarDay,
  day_button: styles.calendarDayButton,
  disabled: styles.calendarDayDisabled,
  month: styles.calendarMonth,
  month_caption: styles.calendarMonthCaption,
  month_grid: styles.calendarGrid,
  months: styles.calendarMonths,
  nav: styles.calendarNav,
  outside: styles.calendarDayOutside,
  range_end: styles.calendarRangeEnd,
  range_middle: styles.calendarRangeMiddle,
  range_start: styles.calendarRangeStart,
  root: styles.calendar,
  selected: styles.calendarDaySelected,
  today: styles.calendarToday,
  week: styles.calendarWeek,
  weekday: styles.calendarWeekday,
  weekdays: styles.calendarWeekdays,
  weeks: styles.calendarWeeks,
}

interface TimeParts {
  hour: string
  minute: string
  second: string
}

function parseTime(value: string): TimeParts {
  const [hour = '00', minute = '00', second = '00'] = value.split(':')
  return {
    hour: hour.padStart(2, '0'),
    minute: minute.padStart(2, '0'),
    second: second.padStart(2, '0'),
  }
}

function formatTime(parts: TimeParts, showSeconds: boolean) {
  return showSeconds
    ? `${parts.hour}:${parts.minute}:${parts.second}`
    : `${parts.hour}:${parts.minute}`
}

function normalizeTime(value: string, min?: string, max?: string, showSeconds = false) {
  const lowerBound = min ? formatTime(parseTime(min), showSeconds) : undefined
  const upperBound = max ? formatTime(parseTime(max), showSeconds) : undefined
  if (lowerBound && value < lowerBound) return lowerBound
  if (upperBound && value > upperBound) return upperBound
  return value
}

function createTimeOptions(length: number, step = 1) {
  return Array.from({ length: Math.ceil(length / step) }, (_, index) =>
    String(index * step).padStart(2, '0'),
  )
}

function TimeUnitSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string
  onChange: (value: string) => void
  options: readonly string[]
  value: string
}) {
  return (
    <RadixSelect.Root onValueChange={onChange} value={value}>
      <Material asChild material="stoneSoft">
        <RadixSelect.Trigger aria-label={label} asChild>
          <RocoShape
            as="button"
            className={styles.timeUnitTrigger}
            contentClassName={styles.timeUnitTriggerContent}
          >
            <RadixSelect.Value />
            <RadixSelect.Icon>
              <ChevronDown aria-hidden="true" />
            </RadixSelect.Icon>
          </RocoShape>
        </RadixSelect.Trigger>
      </Material>
      <RadixSelect.Portal>
        <RocoTheme asChild>
          <Material asChild material="paper">
            <RadixSelect.Content
              className={clsx(floatingContentClassName, styles.timeUnitPopup)}
              position="popper"
              sideOffset={5}
            >
              <RadixSelect.Viewport className={styles.timeUnitViewport}>
                {options.map((option) => (
                  <RadixSelect.Item className={styles.timeUnitOption} key={option} value={option}>
                    <RadixSelect.ItemText>{option}</RadixSelect.ItemText>
                    <RadixSelect.ItemIndicator>
                      <Check aria-hidden="true" />
                    </RadixSelect.ItemIndicator>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </Material>
        </RocoTheme>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

function TimePickerField({
  disabled,
  material,
  max,
  min,
  minuteStep,
  onChange,
  placeholder,
  shadow,
  showSeconds,
  size,
  value,
  variant,
}: {
  disabled: boolean
  material: MaterialPreset
  max?: string
  min?: string
  minuteStep: number
  onChange: (value: string) => void
  placeholder: string
  shadow: boolean
  showSeconds: boolean
  size: 'small' | 'middle' | 'large'
  value: string
  variant: 'outline' | 'solid'
}) {
  const [open, setOpen] = useState(false)
  const parts = parseTime(value)
  const changePart = (part: keyof TimeParts, nextPart: string) => {
    const nextValue = formatTime({ ...parts, [part]: nextPart }, showSeconds)
    onChange(normalizeTime(nextValue, min, max, showSeconds))
  }

  return (
    <RadixPopover.Root onOpenChange={setOpen} open={open}>
      <RadixPopover.Trigger aria-label={placeholder} asChild>
        <Material asChild material={material}>
          <PickerTrigger
            disabled={disabled}
            endPlaceholder=""
            icon={<Clock />}
            mode="single"
            shadow={shadow}
            size={size}
            startPlaceholder={placeholder}
            values={[value]}
            variant={variant}
          />
        </Material>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RocoTheme asChild>
          <RadixPopover.Content
            align="start"
            className={clsx(floatingContentClassName, styles.pickerPopup)}
            collisionPadding={12}
            side="top"
            sideOffset={8}
          >
            <Material
              className={clsx(styles.timePanel, shadow && styles.pickerPopupSurfaceShadow)}
              material="paper"
            >
              <div className={styles.timePanelContent}>
                <div className={styles.timeUnits}>
                  <label>
                    <span>Hour</span>
                    <TimeUnitSelect
                      label="Hour"
                      onChange={(nextValue) => changePart('hour', nextValue)}
                      options={createTimeOptions(24)}
                      value={parts.hour}
                    />
                  </label>
                  <span aria-hidden="true">:</span>
                  <label>
                    <span>Minute</span>
                    <TimeUnitSelect
                      label="Minute"
                      onChange={(nextValue) => changePart('minute', nextValue)}
                      options={createTimeOptions(60, minuteStep)}
                      value={parts.minute}
                    />
                  </label>
                  {showSeconds ? (
                    <>
                      <span aria-hidden="true">:</span>
                      <label>
                        <span>Second</span>
                        <TimeUnitSelect
                          label="Second"
                          onChange={(nextValue) => changePart('second', nextValue)}
                          options={createTimeOptions(60)}
                          value={parts.second}
                        />
                      </label>
                    </>
                  ) : null}
                </div>
                <footer className={styles.timePanelFooter}>
                  <Button onClick={() => onChange('')} size="small" variant="text">
                    Clear
                  </Button>
                  <Button onClick={() => setOpen(false)} size="small">
                    Done
                  </Button>
                </footer>
              </div>
            </Material>
          </RadixPopover.Content>
        </RocoTheme>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}

export function TimePicker({
  className,
  defaultValue,
  disabled = false,
  endPlaceholder = 'End time',
  material = 'stone',
  max,
  min,
  minuteStep = 1,
  mode = 'single',
  name,
  onChange,
  prefixCls = timePickerPrefixCls,
  presets = [],
  required,
  rootClassName,
  shadow = false,
  showSeconds = false,
  size = 'middle',
  startPlaceholder = 'Select time',
  value,
  variant = 'solid',
}: TimePickerProps) {
  const [innerValue, setInnerValue] = useState<PickerValue>(() =>
    readPickerValue(defaultValue, mode),
  )
  const resolved = readPickerValue(value ?? innerValue, mode)
  const values = typeof resolved === 'string' ? [resolved] : resolved
  const commit = (nextValue: PickerValue) => {
    if (value === undefined) setInnerValue(nextValue)
    onChange?.(nextValue)
  }

  return (
    <div className={clsx(prefixCls, styles.pickerStack, rootClassName, className)}>
      <Material
        className={clsx(styles.picker, mode === 'range' && styles.pickerRange)}
        material={material}
      >
        <TimePickerField
          disabled={disabled}
          material={material}
          max={max}
          min={min}
          minuteStep={Math.min(30, Math.max(1, minuteStep))}
          onChange={(nextValue) =>
            commit(mode === 'range' ? [nextValue, values[1] ?? ''] : nextValue)
          }
          placeholder={startPlaceholder}
          shadow={shadow}
          showSeconds={showSeconds}
          size={size}
          value={values[0]}
          variant={variant}
        />
        {mode === 'range' ? (
          <>
            <span aria-hidden="true" className={styles.pickerSeparator}>
              to
            </span>
            <TimePickerField
              disabled={disabled}
              material={material}
              max={max}
              min={values[0] || min}
              minuteStep={Math.min(30, Math.max(1, minuteStep))}
              onChange={(nextValue) => commit([values[0], nextValue])}
              placeholder={endPlaceholder}
              shadow={shadow}
              showSeconds={showSeconds}
              size={size}
              value={values[1] ?? ''}
              variant={variant}
            />
          </>
        ) : null}
        <PickerHiddenInputs
          disabled={disabled}
          mode={mode}
          name={name}
          required={required}
          values={values}
        />
      </Material>
      {presets.length ? (
        <div className={styles.pickerPresets}>
          {presets.map((preset) => (
            <Button
              key={preset.value}
              onClick={() => commit(mode === 'range' ? [preset.value, preset.value] : preset.value)}
              size="small"
              variant="text"
            >
              {preset.label}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
