import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from 'react'
import { createContext, use, useId, useState } from 'react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import { RuneText } from '../rune-text'
import styles from './tabs.module.css'

export const tabsPrefixCls = 'rk-tabs'
export const tabListPrefixCls = 'rk-tab-list'
export const tabPrefixCls = 'rk-tab'
export const tabPanelPrefixCls = 'rk-tab-panel'

export type TabsMaterial = MaterialPreset
export type TabsSize = 'small' | 'middle' | 'large'

interface TabsContextValue<Value extends string = string> {
  disabled: boolean
  getPanelId: (value: Value) => string
  getTabId: (value: Value) => string
  listMaterial: TabsMaterial
  onValueChange: (value: Value) => void
  selectedMaterial: TabsMaterial
  selectedValue: Value | undefined
  size: TabsSize
  unselectedMaterial: TabsMaterial | undefined
}

const TabsContext = createContext<TabsContextValue | null>(null)

export interface TabsProps<Value extends string = string> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  children?: ReactNode
  defaultValue?: Value
  disabled?: boolean
  listMaterial?: TabsMaterial
  name?: string
  onValueChange?: (value: Value) => void
  prefixCls?: string
  rootClassName?: string
  selectedMaterial?: TabsMaterial
  size?: TabsSize
  unselectedMaterial?: TabsMaterial
  value?: Value
}

export interface TabListProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-disabled' | 'role'
> {
  children?: ReactNode
  material?: TabsMaterial
  prefixCls?: string
  rootClassName?: string
}

export interface TabProps<Value extends string = string> extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'aria-controls' | 'aria-disabled' | 'aria-selected' | 'role' | 'tabIndex' | 'type' | 'value'
> {
  children?: ReactNode
  material?: TabsMaterial
  prefixCls?: string
  rootClassName?: string
  selectedClassName?: string
  selectedMaterial?: TabsMaterial
  size?: TabsSize
  unselectedClassName?: string
  unselectedMaterial?: TabsMaterial
  value: Value
}

export interface TabPanelProps<Value extends string = string> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'aria-labelledby' | 'hidden' | 'role'
> {
  children?: ReactNode
  forceMount?: boolean
  prefixCls?: string
  rootClassName?: string
  value: Value
}

function getTabs(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLButtonElement>('[data-rk-tab="true"]')).filter(
    (tab) => !tab.disabled && tab.getAttribute('aria-disabled') !== 'true',
  )
}

function getValueId(value: string) {
  return value.trim().replace(/\s+/g, '-')
}

export function Tabs<Value extends string = string>({
  children,
  className,
  defaultValue,
  disabled = false,
  id,
  listMaterial = 'stoneSoft',
  name,
  onValueChange,
  prefixCls = tabsPrefixCls,
  rootClassName,
  selectedMaterial = 'default',
  size = 'middle',
  unselectedMaterial,
  value,
  ...props
}: TabsProps<Value>) {
  const generatedId = useId()
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
  const selectedValue = value ?? uncontrolledValue
  const isControlled = value !== undefined
  const tabsId = id ?? generatedId

  function selectValue(nextValue: Value) {
    if (nextValue === selectedValue) {
      return
    }

    if (!isControlled) {
      setUncontrolledValue(nextValue)
    }

    onValueChange?.(nextValue)
  }

  function getTabId(valueId: string) {
    return `${tabsId}-tab-${getValueId(valueId)}`
  }

  function getPanelId(valueId: string) {
    return `${tabsId}-panel-${getValueId(valueId)}`
  }

  const resolvedClassName = clsx(prefixCls, styles.tabs, rootClassName, className)

  return (
    <TabsContext
      value={{
        disabled,
        getPanelId,
        getTabId,
        listMaterial,
        onValueChange: selectValue as TabsContextValue['onValueChange'],
        selectedMaterial,
        selectedValue,
        size,
        unselectedMaterial,
      }}
    >
      <div {...props} className={resolvedClassName} id={id}>
        {name && selectedValue !== undefined ? (
          <input disabled={disabled} name={name} type="hidden" value={selectedValue} />
        ) : null}
        {children}
      </div>
    </TabsContext>
  )
}

export function TabList({
  children,
  className,
  material,
  onKeyDown,
  prefixCls = tabListPrefixCls,
  rootClassName,
  ...props
}: TabListProps) {
  const context = use(TabsContext)

  if (!context) {
    throw new Error('TabList must be rendered inside Tabs.')
  }

  const tabs = context
  const resolvedClassName = clsx(prefixCls, styles.list, rootClassName, className)

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event)

    if (event.defaultPrevented) {
      return
    }

    const isPreviousKey = event.key === 'ArrowLeft'
    const isNextKey = event.key === 'ArrowRight'
    const isBoundaryKey = event.key === 'Home' || event.key === 'End'

    if (!isPreviousKey && !isNextKey && !isBoundaryKey) {
      return
    }

    const enabledTabs = getTabs(event.currentTarget)

    if (enabledTabs.length === 0) {
      return
    }

    const selectedIndex = enabledTabs.findIndex(
      (tab) => tab.getAttribute('aria-selected') === 'true',
    )
    const focusedIndex =
      event.target instanceof HTMLButtonElement ? enabledTabs.indexOf(event.target) : -1
    const currentIndex = selectedIndex >= 0 ? selectedIndex : focusedIndex

    let nextIndex = 0

    if (event.key === 'End') {
      nextIndex = enabledTabs.length - 1
    } else if (isPreviousKey) {
      nextIndex = currentIndex <= 0 ? enabledTabs.length - 1 : currentIndex - 1
    } else if (isNextKey) {
      nextIndex = currentIndex >= enabledTabs.length - 1 ? 0 : currentIndex + 1
    }

    event.preventDefault()

    const nextTab = enabledTabs[nextIndex]
    tabs.onValueChange(nextTab.value)
    nextTab.focus()
  }

  return (
    <Material asChild material={material ?? tabs.listMaterial}>
      <RocoShape
        {...props}
        aria-disabled={tabs.disabled || undefined}
        as="div"
        className={resolvedClassName}
        contentClassName={styles.listContent}
        onKeyDown={handleKeyDown}
        role="tablist"
        variant="solid"
      >
        {children}
      </RocoShape>
    </Material>
  )
}

export function Tab<Value extends string = string>({
  children,
  className,
  disabled = false,
  material,
  onClick,
  prefixCls = tabPrefixCls,
  rootClassName,
  selectedClassName,
  selectedMaterial,
  size,
  unselectedClassName,
  unselectedMaterial,
  value,
  ...props
}: TabProps<Value>) {
  const context = use(TabsContext)

  if (!context) {
    throw new Error('Tab must be rendered inside Tabs.')
  }

  const tabs = context
  const isDisabled = tabs.disabled || disabled
  const isSelected = tabs.selectedValue === value
  const isTabbable = !isDisabled && (isSelected || tabs.selectedValue === undefined)
  const resolvedMaterial =
    (isSelected ? selectedMaterial : unselectedMaterial) ??
    material ??
    (isSelected ? tabs.selectedMaterial : (tabs.unselectedMaterial ?? tabs.listMaterial))
  const resolvedSize = size ?? tabs.size
  const resolvedClassName = clsx(
    prefixCls,
    styles.tab,
    styles[resolvedSize],
    isSelected ? styles.selected : styles.unselected,
    rootClassName,
    className,
    isSelected ? selectedClassName : unselectedClassName,
  )

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event)

    if (event.defaultPrevented || isDisabled) {
      return
    }

    tabs.onValueChange(value)
  }

  return (
    <Material asChild material={resolvedMaterial}>
      <RocoShape
        {...props}
        aria-controls={tabs.getPanelId(value)}
        aria-disabled={isDisabled || undefined}
        aria-selected={isSelected}
        as="button"
        className={resolvedClassName}
        contentClassName={styles.tabContent}
        data-rk-tab="true"
        data-state={isSelected ? 'active' : 'inactive'}
        disabled={isDisabled}
        id={tabs.getTabId(value)}
        onClick={handleClick}
        role="tab"
        tabIndex={isTabbable ? 0 : -1}
        type="button"
        value={value}
        variant={isSelected ? 'solid' : 'text'}
        color={isSelected ? undefined : 'var(--rk-material-color)'}
      >
        <RuneText className={styles.tabText}>{children}</RuneText>
      </RocoShape>
    </Material>
  )
}

export function TabPanel<Value extends string = string>({
  children,
  className,
  forceMount = true,
  prefixCls = tabPanelPrefixCls,
  rootClassName,
  value,
  ...props
}: TabPanelProps<Value>) {
  const context = use(TabsContext)

  if (!context) {
    throw new Error('TabPanel must be rendered inside Tabs.')
  }

  const tabs = context
  const isSelected = tabs.selectedValue === value

  if (!forceMount && !isSelected) {
    return null
  }

  return (
    <div
      {...props}
      aria-labelledby={tabs.getTabId(value)}
      className={clsx(
        prefixCls,
        styles.panel,
        isSelected ? styles.panelActive : styles.panelInactive,
        rootClassName,
        className,
      )}
      data-state={isSelected ? 'active' : 'inactive'}
      hidden={!isSelected}
      id={tabs.getPanelId(value)}
      role="tabpanel"
      tabIndex={0}
    >
      {children}
    </div>
  )
}
