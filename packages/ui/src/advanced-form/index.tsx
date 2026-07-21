import type {
  ChangeEvent,
  DragEvent,
  FormEvent,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from 'react'
import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import { Command as CommandPrimitive } from 'cmdk'
import { Check, FileUp, Search, Trash2 } from 'lucide-react'
import { clsx } from 'clsx'
import { Button } from '../button'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import { RocoTheme } from '../theme'
import styles from './advanced-form.module.css'

export { DatePicker, datePickerPrefixCls, TimePicker, timePickerPrefixCls } from './pickers'
export type { DatePickerProps, TimePickerPreset, TimePickerProps } from './pickers'

export const uploadPrefixCls = 'rk-upload'
export const formPrefixCls = 'rk-form'
export const formItemPrefixCls = 'rk-form-item'
export const autocompletePrefixCls = 'rk-autocomplete'

export interface UploadProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  accept?: string
  beforeUpload?: (file: File) => boolean | Promise<boolean>
  children?: ReactNode
  defaultFileList?: readonly File[]
  directory?: boolean
  disabled?: boolean
  fileList?: readonly File[]
  maxCount?: number
  multiple?: boolean
  onChange?: (files: readonly File[]) => void
  onRemove?: (file: File) => boolean | void
  prefixCls?: string
  rootClassName?: string
  variant?: 'button' | 'drag'
}

export function Upload({
  accept,
  beforeUpload,
  children,
  className,
  defaultFileList = [],
  directory = false,
  disabled = false,
  fileList,
  maxCount,
  multiple = false,
  onChange,
  onRemove,
  prefixCls = uploadPrefixCls,
  rootClassName,
  variant = 'button',
  ...props
}: UploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [innerFiles, setInnerFiles] = useState<readonly File[]>(defaultFileList)
  const [dragging, setDragging] = useState(false)
  const files = fileList ?? innerFiles

  const commit = (nextFiles: readonly File[]) => {
    const limited = maxCount ? nextFiles.slice(-maxCount) : nextFiles
    if (fileList === undefined) setInnerFiles(limited)
    onChange?.(limited)
  }

  const addFiles = async (incoming: readonly File[]) => {
    const accepted: File[] = []
    for (const file of incoming) {
      if (!beforeUpload || (await beforeUpload(file))) accepted.push(file)
    }
    commit(multiple ? [...files, ...accepted] : accepted.slice(0, 1))
  }

  const removeFile = (file: File) => {
    if (onRemove?.(file) === false) return
    commit(files.filter((candidate) => candidate !== file))
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    if (!disabled) void addFiles(Array.from(event.dataTransfer.files))
  }

  return (
    <div
      {...props}
      className={clsx(prefixCls, styles.upload, styles[variant], rootClassName, className)}
    >
      <input
        accept={accept}
        className={styles.uploadInput}
        disabled={disabled}
        multiple={multiple}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files) void addFiles(Array.from(event.target.files))
          event.target.value = ''
        }}
        ref={inputRef}
        type="file"
        {...(directory ? { webkitdirectory: '' } : {})}
      />
      {variant === 'drag' ? (
        <Material
          aria-disabled={disabled || undefined}
          className={clsx(styles.uploadDrop, dragging && styles.uploadDropActive)}
          material={dragging ? 'primarySoft' : 'paper'}
          onClick={() => inputRef.current?.click()}
          onDragEnter={(event) => {
            event.preventDefault()
            if (!disabled) setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click()
          }}
          role="button"
          tabIndex={disabled ? -1 : 0}
        >
          <FileUp aria-hidden="true" />
          <strong>{children ?? 'Choose or drop files'}</strong>
          {accept ? <span>{accept}</span> : null}
        </Material>
      ) : (
        <Button disabled={disabled} onClick={() => inputRef.current?.click()}>
          <FileUp aria-hidden="true" />
          {children ?? 'Choose file'}
        </Button>
      )}
      {files.length ? (
        <ul className={styles.uploadList}>
          {files.map((file, index) => (
            <li key={`${file.name}-${file.lastModified}-${index}`}>
              <Check aria-hidden="true" />
              <span>{file.name}</span>
              <button
                aria-label={`Remove ${file.name}`}
                onClick={() => removeFile(file)}
                type="button"
              >
                <Trash2 aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export type FormValues = Record<string, FormDataEntryValue | readonly FormDataEntryValue[]>

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  disabled?: boolean
  layout?: 'horizontal' | 'inline' | 'vertical'
  onFinish?: (values: FormValues, event: FormEvent<HTMLFormElement>) => void
  onSubmit?: FormHTMLAttributes<HTMLFormElement>['onSubmit']
  prefixCls?: string
  rootClassName?: string
  submitting?: boolean
}

function formDataToObject(formData: FormData): FormValues {
  const values: FormValues = {}
  for (const key of new Set(formData.keys())) {
    const entries = formData.getAll(key)
    values[key] = entries.length > 1 ? entries : entries[0]
  }
  return values
}

export function Form({
  children,
  className,
  disabled = false,
  layout = 'vertical',
  onFinish,
  onSubmit,
  prefixCls = formPrefixCls,
  rootClassName,
  submitting = false,
  ...props
}: FormProps) {
  return (
    <form
      {...props}
      aria-busy={submitting}
      className={clsx(prefixCls, styles.form, styles[layout], rootClassName, className)}
      onSubmit={(event) => {
        onSubmit?.(event)
        if (!event.defaultPrevented) {
          event.preventDefault()
          if (event.currentTarget.checkValidity()) {
            onFinish?.(formDataToObject(new FormData(event.currentTarget)), event)
          } else {
            event.currentTarget.reportValidity()
          }
        }
      }}
    >
      <fieldset disabled={disabled || submitting}>{children}</fieldset>
    </form>
  )
}

export interface FormItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  error?: ReactNode
  extra?: ReactNode
  help?: ReactNode
  htmlFor?: string
  label?: ReactNode
  prefixCls?: string
  required?: boolean
  rootClassName?: string
  status?: 'error' | 'success' | 'warning'
}

export function FormItem({
  children,
  className,
  error,
  extra,
  help,
  htmlFor,
  label,
  prefixCls = formItemPrefixCls,
  required = false,
  rootClassName,
  status,
  ...props
}: FormItemProps) {
  const resolvedStatus = error ? 'error' : status
  return (
    <div
      {...props}
      className={clsx(
        prefixCls,
        styles.formItem,
        resolvedStatus && styles[resolvedStatus],
        rootClassName,
        className,
      )}
    >
      {label ? (
        <label className={styles.formLabel} htmlFor={htmlFor}>
          {required ? <span aria-hidden="true">*</span> : null}
          {label}
        </label>
      ) : null}
      <div className={styles.formControl}>{children}</div>
      {(error ?? help) ? (
        <div className={styles.formHelp} role={error ? 'alert' : undefined}>
          {error ?? help}
        </div>
      ) : null}
      {extra ? <div className={styles.formExtra}>{extra}</div> : null}
    </div>
  )
}

export interface AutocompleteOption {
  disabled?: boolean
  label: ReactNode
  value: string
}

export interface AutocompleteProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue' | 'onChange' | 'onSelect' | 'prefix' | 'size' | 'value'
> {
  defaultValue?: string
  empty?: ReactNode
  filterOption?: boolean | ((option: AutocompleteOption, query: string) => boolean)
  inputRef?: Ref<HTMLInputElement>
  material?: MaterialPreset
  onChange?: (value: string) => void
  onSelect?: (value: string, option: AutocompleteOption) => void
  options: readonly (AutocompleteOption | string)[]
  prefixCls?: string
  rootClassName?: string
  size?: 'small' | 'middle' | 'large'
  value?: string
}

function normalizeAutocompleteOption(option: AutocompleteOption | string): AutocompleteOption {
  return typeof option === 'string' ? { label: option, value: option } : option
}

export function Autocomplete({
  className,
  defaultValue = '',
  disabled = false,
  empty = 'No matches',
  filterOption = true,
  inputRef,
  material = 'stone',
  onChange,
  onSelect,
  options,
  prefixCls = autocompletePrefixCls,
  rootClassName,
  size = 'middle',
  value,
  ...props
}: AutocompleteProps) {
  const [innerValue, setInnerValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const cmdkInputRef = useRef<HTMLInputElement>(null)
  const resolvedValue = value ?? innerValue
  const deferredValue = useDeferredValue(resolvedValue)
  const normalizedOptions = useMemo(() => options.map(normalizeAutocompleteOption), [options])
  const filteredOptions = useMemo(() => {
    if (filterOption === false) return normalizedOptions
    if (typeof filterOption === 'function') {
      return normalizedOptions.filter((option) => filterOption(option, deferredValue))
    }
    const query = deferredValue.trim().toLocaleLowerCase()
    return normalizedOptions.filter((option) => {
      const label = typeof option.label === 'string' ? option.label : option.value
      return !query || label.toLocaleLowerCase().includes(query)
    })
  }, [deferredValue, filterOption, normalizedOptions])

  const commit = (nextValue: string) => {
    if (value === undefined) setInnerValue(nextValue)
    onChange?.(nextValue)
  }

  const selectOption = (option: AutocompleteOption) => {
    commit(option.value)
    onSelect?.(option.value, option)
    setOpen(false)
  }

  useEffect(() => {
    cmdkInputRef.current?.setAttribute('aria-expanded', String(open))
  }, [open, resolvedValue])

  return (
    <CommandPrimitive
      className={clsx(prefixCls, styles.autocomplete, rootClassName, className)}
      label={props['aria-label'] ?? props.placeholder ?? 'Suggestions'}
      shouldFilter={false}
    >
      <RadixPopover.Root onOpenChange={setOpen} open={open}>
        <RadixPopover.Anchor asChild>
          <Material asChild material={material}>
            <RocoShape
              className={clsx(styles.autocompleteControl, styles[size])}
              contentClassName={styles.autocompleteControlContent}
            >
              <Search aria-hidden="true" />
              <CommandPrimitive.Input
                {...props}
                aria-autocomplete="list"
                aria-expanded={open}
                className={styles.autocompleteInput}
                disabled={disabled}
                onFocus={() => setOpen(true)}
                onValueChange={(nextValue) => {
                  commit(nextValue)
                  setOpen(true)
                }}
                ref={(node) => {
                  cmdkInputRef.current = node
                  if (typeof inputRef === 'function') inputRef(node)
                  else if (inputRef) inputRef.current = node
                }}
                value={resolvedValue}
              />
            </RocoShape>
          </Material>
        </RadixPopover.Anchor>
        <RadixPopover.Portal>
          <RocoTheme asChild>
            <Material asChild material="paper">
              <RadixPopover.Content
                align="start"
                className={styles.autocompletePopup}
                collisionPadding={12}
                onOpenAutoFocus={(event: Event) => event.preventDefault()}
                sideOffset={6}
              >
                <CommandPrimitive.List className={styles.autocompleteList} label="Suggestions">
                  {filteredOptions.map((option) => (
                    <CommandPrimitive.Item
                      className={styles.autocompleteOption}
                      disabled={option.disabled}
                      key={option.value}
                      onSelect={() => selectOption(option)}
                      value={option.value}
                    >
                      <span>{option.label}</span>
                      {option.value === resolvedValue ? <Check aria-hidden="true" /> : null}
                    </CommandPrimitive.Item>
                  ))}
                  {!filteredOptions.length ? (
                    <CommandPrimitive.Empty className={styles.autocompleteEmpty}>
                      {empty}
                    </CommandPrimitive.Empty>
                  ) : null}
                </CommandPrimitive.List>
              </RadixPopover.Content>
            </Material>
          </RocoTheme>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    </CommandPrimitive>
  )
}
