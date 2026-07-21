import type { HTMLAttributes, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { Command as CommandIcon, Search, X } from 'lucide-react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import {
  RadixDialogClose,
  RadixDialogContent,
  RadixDialogOverlay,
  RadixDialogPortal,
  RadixDialogRoot,
  RadixDialogTitle,
} from '../radix-dialog'
import { RocoShape } from '../roco-shape'
import { RocoTheme } from '../theme'
import styles from './command.module.css'

export const commandPrefixCls = 'rk-command'

export interface CommandItem {
  disabled?: boolean
  group?: string
  icon?: ReactNode
  key: string
  keywords?: readonly string[]
  label: ReactNode
  shortcut?: ReactNode
}

export interface CommandProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'title'> {
  defaultOpen?: boolean
  empty?: ReactNode
  items: readonly CommandItem[]
  material?: MaterialPreset
  onOpenChange?: (open: boolean) => void
  onSelect?: (item: CommandItem) => void
  open?: boolean
  placeholder?: string
  prefixCls?: string
  rootClassName?: string
  shortcut?: boolean
  title?: ReactNode
}

function groupItems(items: readonly CommandItem[]) {
  const groups = new Map<string, CommandItem[]>()
  for (const item of items) {
    const group = item.group ?? ''
    const groupItems = groups.get(group)
    if (groupItems) groupItems.push(item)
    else groups.set(group, [item])
  }
  return [...groups]
}

export function Command({
  className,
  defaultOpen = false,
  empty = 'No commands found',
  items,
  material = 'paper',
  onOpenChange,
  onSelect,
  open,
  placeholder = 'Type a command',
  prefixCls = commandPrefixCls,
  rootClassName,
  shortcut = true,
  title = 'Command palette',
  ...props
}: CommandProps) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const [query, setQuery] = useState('')
  const isOpen = open ?? innerOpen
  const groupedItems = useMemo(() => groupItems(items), [items])
  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (open === undefined) setInnerOpen(nextOpen)
      onOpenChange?.(nextOpen)
      if (!nextOpen) setQuery('')
    },
    [onOpenChange, open],
  )

  useEffect(() => {
    if (!shortcut) return undefined
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(!isOpen)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, setOpen, shortcut])

  const selectItem = (item: CommandItem) => {
    if (item.disabled) return
    onSelect?.(item)
    setOpen(false)
  }

  return (
    <RadixDialogRoot onOpenChange={setOpen} open={isOpen}>
      <RadixDialogPortal>
        <RocoTheme asChild>
          <RadixDialogOverlay className={styles.commandOverlay} />
        </RocoTheme>
        <RocoTheme asChild>
          <Material asChild material={material}>
            <RadixDialogContent
              {...props}
              aria-describedby={undefined}
              className={clsx(prefixCls, styles.commandPanel, rootClassName, className)}
            >
              <CommandPrimitive
                className={styles.commandRoot}
                label={typeof title === 'string' ? title : 'Command palette'}
                loop
              >
                <header className={styles.commandHeader}>
                  <CommandIcon aria-hidden="true" />
                  <RadixDialogTitle asChild>
                    <strong>{title}</strong>
                  </RadixDialogTitle>
                  <RadixDialogClose aria-label="Close command palette">
                    <X aria-hidden="true" />
                  </RadixDialogClose>
                </header>
                <div className={styles.commandSearch}>
                  <Search aria-hidden="true" />
                  <CommandPrimitive.Input
                    autoFocus
                    className={styles.commandInput}
                    onValueChange={setQuery}
                    placeholder={placeholder}
                    value={query}
                  />
                </div>
                <CommandPrimitive.List className={styles.commandList} label="Commands">
                  <CommandPrimitive.Empty className={styles.commandEmpty}>
                    {empty}
                  </CommandPrimitive.Empty>
                  {groupedItems.map(([group, groupItems]) => (
                    <CommandPrimitive.Group
                      className={styles.commandGroupSection}
                      heading={group || undefined}
                      key={group || 'default'}
                      value={group || 'default'}
                    >
                      {groupItems.map((item) => (
                        <CommandPrimitive.Item
                          className={styles.commandItem}
                          disabled={item.disabled}
                          key={item.key}
                          keywords={[
                            ...(item.keywords ?? []),
                            typeof item.label === 'string' ? item.label : '',
                          ]}
                          onSelect={() => selectItem(item)}
                          value={item.key}
                        >
                          <Material asChild material="primary">
                            <RocoShape
                              aria-hidden="true"
                              className={styles.commandItemShape}
                              shadow
                            />
                          </Material>
                          <span className={styles.commandItemContent}>
                            {item.icon ? (
                              <span className={styles.commandItemIcon}>{item.icon}</span>
                            ) : null}
                            <span>{item.label}</span>
                            {item.shortcut ? <kbd>{item.shortcut}</kbd> : null}
                          </span>
                        </CommandPrimitive.Item>
                      ))}
                    </CommandPrimitive.Group>
                  ))}
                </CommandPrimitive.List>
              </CommandPrimitive>
            </RadixDialogContent>
          </Material>
        </RocoTheme>
      </RadixDialogPortal>
    </RadixDialogRoot>
  )
}
