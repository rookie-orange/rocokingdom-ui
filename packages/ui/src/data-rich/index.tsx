import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import * as RadixAccordion from '@radix-ui/react-accordion'
import useEmblaCarousel from 'embla-carousel-react'
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ImageOff,
  Minus,
  Plus,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import { clsx } from 'clsx'
import { Material, type MaterialPreset } from '../material'
import {
  RadixDialogClose,
  RadixDialogContent,
  RadixDialogOverlay,
  RadixDialogPortal,
  RadixDialogRoot,
  RadixDialogTitle,
  RadixDialogTrigger,
} from '../radix-dialog'
import { RocoShape } from '../roco-shape'
import { Skeleton } from '../feedback'
import { RocoTheme } from '../theme'
import styles from './data-rich.module.css'

export const tablePrefixCls = 'rk-table'
export const accordionPrefixCls = 'rk-accordion'
export const treePrefixCls = 'rk-tree'
export const carouselPrefixCls = 'rk-carousel'
export const imagePrefixCls = 'rk-image'

type SortOrder = 'ascend' | 'descend'

export interface TableFilter {
  text: ReactNode
  value: string
}

export interface TableColumn<RecordType> {
  align?: 'center' | 'left' | 'right'
  dataIndex?: keyof RecordType
  filters?: readonly TableFilter[]
  fixed?: 'left' | 'right'
  key: string
  onFilter?: (value: string, record: RecordType) => boolean
  render?: (value: unknown, record: RecordType, index: number) => ReactNode
  sorter?: boolean | ((left: RecordType, right: RecordType) => number)
  title: ReactNode
  width?: number | string
}

export interface TableProps<RecordType> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'onChange'
> {
  bordered?: boolean
  columns: readonly TableColumn<RecordType>[]
  dataSource: readonly RecordType[]
  empty?: ReactNode
  loading?: boolean
  material?: MaterialPreset
  onChange?: (state: {
    filters: Readonly<Record<string, string>>
    order?: SortOrder
    sorter?: string
  }) => void
  prefixCls?: string
  rowKey: keyof RecordType | ((record: RecordType, index: number) => string)
  rootClassName?: string
  size?: 'small' | 'middle' | 'large'
  striped?: boolean
}

interface TableCellStyle extends CSSProperties {
  '--rk-table-column-width'?: string
}

function getRecordValue<RecordType>(record: RecordType, dataIndex: keyof RecordType | undefined) {
  return dataIndex === undefined ? undefined : record[dataIndex]
}

export function Table<RecordType>({
  bordered = false,
  className,
  columns,
  dataSource,
  empty = 'No data',
  loading = false,
  material = 'paper',
  onChange,
  prefixCls = tablePrefixCls,
  rowKey,
  rootClassName,
  size = 'middle',
  striped = false,
  ...props
}: TableProps<RecordType>) {
  const [sortState, setSortState] = useState<{ key: string; order: SortOrder } | undefined>()
  const [filters, setFilters] = useState<Readonly<Record<string, string>>>({})
  const rows = useMemo(() => {
    let nextRows = dataSource.filter((record) =>
      columns.every((column) => {
        const filterValue = filters[column.key]
        return !filterValue || !column.onFilter || column.onFilter(filterValue, record)
      }),
    )
    if (sortState) {
      const column = columns.find((candidate) => candidate.key === sortState.key)
      if (column) {
        const compare =
          typeof column.sorter === 'function'
            ? column.sorter
            : (left: RecordType, right: RecordType) =>
                String(getRecordValue(left, column.dataIndex) ?? '').localeCompare(
                  String(getRecordValue(right, column.dataIndex) ?? ''),
                  undefined,
                  { numeric: true },
                )
        nextRows = [...nextRows].sort((left, right) =>
          sortState.order === 'ascend' ? compare(left, right) : compare(right, left),
        )
      }
    }
    return nextRows
  }, [columns, dataSource, filters, sortState])

  const updateSort = (key: string) => {
    const nextState =
      sortState?.key !== key
        ? { key, order: 'ascend' as const }
        : sortState.order === 'ascend'
          ? { key, order: 'descend' as const }
          : undefined
    setSortState(nextState)
    onChange?.({ filters, order: nextState?.order, sorter: nextState?.key })
  }

  const updateFilter = (key: string, value: string) => {
    const nextFilters = { ...filters, [key]: value }
    setFilters(nextFilters)
    onChange?.({ filters: nextFilters, order: sortState?.order, sorter: sortState?.key })
  }

  return (
    <Material
      {...props}
      className={clsx(
        prefixCls,
        styles.tableRoot,
        styles[size],
        bordered && styles.tableBordered,
        striped && styles.tableStriped,
        rootClassName,
        className,
      )}
      material={material}
    >
      <div className={styles.tableScroller}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => {
                const SortIcon =
                  sortState?.key !== column.key
                    ? ArrowUpDown
                    : sortState.order === 'ascend'
                      ? ArrowUp
                      : ArrowDown
                const cellStyle: TableCellStyle = {
                  '--rk-table-column-width':
                    typeof column.width === 'number' ? `${column.width}px` : column.width,
                }
                return (
                  <th
                    className={clsx(
                      styles[column.align ?? 'left'],
                      column.fixed && styles[`fixed-${column.fixed}`],
                    )}
                    key={column.key}
                    style={cellStyle}
                  >
                    <div className={styles.tableHeaderCell}>
                      {column.sorter ? (
                        <button onClick={() => updateSort(column.key)} type="button">
                          <span>{column.title}</span>
                          <SortIcon aria-hidden="true" />
                        </button>
                      ) : (
                        <span>{column.title}</span>
                      )}
                      {column.filters?.length ? (
                        <select
                          aria-label={`Filter ${typeof column.title === 'string' ? column.title : column.key}`}
                          onChange={(event) => updateFilter(column.key, event.target.value)}
                          value={filters[column.key] ?? ''}
                        >
                          <option value="">All</option>
                          {column.filters.map((filter) => (
                            <option key={filter.value} value={filter.value}>
                              {filter.text}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }, (_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      <Skeleton active height={14} />
                    </td>
                  ))}
                </tr>
              ))
            ) : rows.length ? (
              rows.map((record, rowIndex) => {
                const key =
                  typeof rowKey === 'function' ? rowKey(record, rowIndex) : String(record[rowKey])
                return (
                  <tr key={key}>
                    {columns.map((column) => {
                      const value = getRecordValue(record, column.dataIndex)
                      return (
                        <td
                          className={clsx(
                            styles[column.align ?? 'left'],
                            column.fixed && styles[`fixed-${column.fixed}`],
                          )}
                          key={column.key}
                        >
                          {column.render
                            ? column.render(value, record, rowIndex)
                            : String(value ?? '')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td className={styles.tableEmpty} colSpan={columns.length}>
                  {empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Material>
  )
}

export interface AccordionItem {
  children: ReactNode
  disabled?: boolean
  extra?: ReactNode
  key: string
  title: ReactNode
}

export interface AccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'dir' | 'onChange'
> {
  collapsible?: boolean
  defaultValue?: string | readonly string[]
  dir?: 'ltr' | 'rtl'
  items: readonly AccordionItem[]
  material?: MaterialPreset
  multiple?: boolean
  onChange?: (value: string | readonly string[]) => void
  prefixCls?: string
  rootClassName?: string
  value?: string | readonly string[]
}

function normalizeAccordionValue(value: string | readonly string[] | undefined) {
  if (Array.isArray(value)) return [...value]
  return value ? [value as string] : []
}

export function Accordion({
  className,
  collapsible = true,
  defaultValue,
  items,
  material = 'paper',
  multiple = false,
  onChange,
  prefixCls = accordionPrefixCls,
  rootClassName,
  value,
  ...props
}: AccordionProps) {
  const content = items.map((item) => (
    <RadixAccordion.Item
      className={styles.accordionItem}
      disabled={item.disabled}
      key={item.key}
      value={item.key}
    >
      <RadixAccordion.Header className={styles.accordionHeader}>
        <RadixAccordion.Trigger className={styles.accordionTrigger}>
          <Material asChild material="primary">
            <RocoShape aria-hidden="true" className={styles.accordionShape} variant="outline" />
          </Material>
          <span className={styles.accordionTriggerContent}>
            <strong>{item.title}</strong>
            {item.extra ? <span>{item.extra}</span> : null}
            <ChevronDown aria-hidden="true" />
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content className={styles.accordionContent}>
        <div className={styles.accordionPanel}>{item.children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  ))
  const rootClass = clsx(prefixCls, styles.accordion, rootClassName, className)

  if (multiple) {
    return (
      <Material asChild material={material}>
        <RadixAccordion.Root
          {...props}
          className={rootClass}
          defaultValue={normalizeAccordionValue(defaultValue)}
          onValueChange={(nextValue) => onChange?.(nextValue)}
          type="multiple"
          value={value === undefined ? undefined : normalizeAccordionValue(value)}
        >
          {content}
        </RadixAccordion.Root>
      </Material>
    )
  }

  return (
    <Material asChild material={material}>
      <RadixAccordion.Root
        {...props}
        className={rootClass}
        collapsible={collapsible}
        defaultValue={normalizeAccordionValue(defaultValue)[0]}
        onValueChange={(nextValue) => onChange?.(nextValue)}
        type="single"
        value={value === undefined ? undefined : normalizeAccordionValue(value)[0]}
      >
        {content}
      </RadixAccordion.Root>
    </Material>
  )
}

export const Collapse = Accordion
export type CollapseProps = AccordionProps

export interface TreeNodeData {
  children?: readonly TreeNodeData[]
  disabled?: boolean
  icon?: ReactNode
  key: string
  title: ReactNode
}

export interface TreeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  checkable?: boolean
  checkedKeys?: readonly string[]
  defaultCheckedKeys?: readonly string[]
  defaultExpandedKeys?: readonly string[]
  defaultSelectedKey?: string
  expandedKeys?: readonly string[]
  onCheck?: (keys: readonly string[]) => void
  onExpand?: (keys: readonly string[]) => void
  onSelect?: (key: string, node: TreeNodeData) => void
  prefixCls?: string
  rootClassName?: string
  selectedKey?: string
  showLine?: boolean
  treeData: readonly TreeNodeData[]
}

export function Tree({
  checkable = false,
  checkedKeys,
  className,
  defaultCheckedKeys = [],
  defaultExpandedKeys = [],
  defaultSelectedKey,
  expandedKeys,
  onCheck,
  onExpand,
  onSelect,
  prefixCls = treePrefixCls,
  rootClassName,
  selectedKey,
  showLine = true,
  treeData,
  ...props
}: TreeProps) {
  const [innerExpanded, setInnerExpanded] = useState<readonly string[]>(defaultExpandedKeys)
  const [innerChecked, setInnerChecked] = useState<readonly string[]>(defaultCheckedKeys)
  const [innerSelected, setInnerSelected] = useState(defaultSelectedKey)
  const resolvedExpanded = expandedKeys ?? innerExpanded
  const resolvedChecked = checkedKeys ?? innerChecked
  const resolvedSelected = selectedKey ?? innerSelected

  const toggleExpanded = (key: string) => {
    const nextKeys = resolvedExpanded.includes(key)
      ? resolvedExpanded.filter((candidate) => candidate !== key)
      : [...resolvedExpanded, key]
    if (expandedKeys === undefined) setInnerExpanded(nextKeys)
    onExpand?.(nextKeys)
  }
  const toggleChecked = (key: string) => {
    const nextKeys = resolvedChecked.includes(key)
      ? resolvedChecked.filter((candidate) => candidate !== key)
      : [...resolvedChecked, key]
    if (checkedKeys === undefined) setInnerChecked(nextKeys)
    onCheck?.(nextKeys)
  }
  const select = (key: string, node: TreeNodeData) => {
    if (selectedKey === undefined) setInnerSelected(key)
    onSelect?.(key, node)
  }

  return (
    <div
      {...props}
      className={clsx(
        prefixCls,
        styles.tree,
        showLine && styles.treeLine,
        rootClassName,
        className,
      )}
      role="tree"
    >
      <TreeLevel
        checkable={checkable}
        checkedKeys={resolvedChecked}
        expandedKeys={resolvedExpanded}
        nodes={treeData}
        onCheck={toggleChecked}
        onExpand={toggleExpanded}
        onSelect={select}
        selectedKey={resolvedSelected}
      />
    </div>
  )
}

interface TreeLevelProps {
  checkable: boolean
  checkedKeys: readonly string[]
  expandedKeys: readonly string[]
  nodes: readonly TreeNodeData[]
  onCheck: (key: string) => void
  onExpand: (key: string) => void
  onSelect: (key: string, node: TreeNodeData) => void
  selectedKey?: string
}

function TreeLevel({
  checkable,
  checkedKeys,
  expandedKeys,
  nodes,
  onCheck,
  onExpand,
  onSelect,
  selectedKey,
}: TreeLevelProps) {
  return (
    <ul className={styles.treeLevel} role="group">
      {nodes.map((node) => {
        const expandable = Boolean(node.children?.length)
        const expanded = expandedKeys.includes(node.key)
        const selected = selectedKey === node.key
        const checked = checkedKeys.includes(node.key)
        return (
          <li
            aria-expanded={expandable ? expanded : undefined}
            aria-selected={selected}
            className={styles.treeNode}
            key={node.key}
            role="treeitem"
          >
            <div className={clsx(styles.treeNodeRow, selected && styles.treeNodeSelected)}>
              <button
                aria-label={expanded ? 'Collapse node' : 'Expand node'}
                className={clsx(styles.treeToggle, !expandable && styles.treeToggleEmpty)}
                disabled={!expandable || node.disabled}
                onClick={() => onExpand(node.key)}
                type="button"
              >
                <ChevronRight aria-hidden="true" />
              </button>
              {checkable ? (
                <button
                  aria-checked={checked}
                  aria-label={`Check ${typeof node.title === 'string' ? node.title : 'node'}`}
                  className={styles.treeCheck}
                  disabled={node.disabled}
                  onClick={() => onCheck(node.key)}
                  role="checkbox"
                  type="button"
                >
                  <Material
                    className={styles.treeCheckMaterial}
                    material={checked ? 'success' : 'paperMuted'}
                  >
                    <RocoShape shape="square">
                      {checked ? <Check aria-hidden="true" /> : null}
                    </RocoShape>
                  </Material>
                </button>
              ) : null}
              <button
                className={styles.treeLabel}
                disabled={node.disabled}
                onClick={() => onSelect(node.key, node)}
                type="button"
              >
                {node.icon ? <span>{node.icon}</span> : null}
                {node.title}
              </button>
            </div>
            {expandable && expanded ? (
              <TreeLevel
                checkable={checkable}
                checkedKeys={checkedKeys}
                expandedKeys={expandedKeys}
                nodes={node.children ?? []}
                onCheck={onCheck}
                onExpand={onExpand}
                onSelect={onSelect}
                selectedKey={selectedKey}
              />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

export interface CarouselProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  autoplay?: boolean | number
  defaultIndex?: number
  indicators?: boolean
  index?: number
  items: readonly ReactNode[]
  loop?: boolean
  navigation?: boolean
  onChange?: (index: number) => void
  prefixCls?: string
  rootClassName?: string
}

export function Carousel({
  autoplay = false,
  className,
  defaultIndex = 0,
  indicators = true,
  index,
  items,
  loop = true,
  navigation = true,
  onChange,
  prefixCls = carouselPrefixCls,
  rootClassName,
  ...props
}: CarouselProps) {
  const [paused, setPaused] = useState(false)
  const initialIndex = Math.min(Math.max(index ?? defaultIndex, 0), Math.max(0, items.length - 1))
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [canScrollPrevious, setCanScrollPrevious] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop,
    startIndex: initialIndex,
  })

  const syncCarouselState = useCallback(() => {
    if (!emblaApi) return
    setActiveIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrevious(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return undefined
    syncCarouselState()
    const handleSelect = () => {
      syncCarouselState()
      onChange?.(emblaApi.selectedScrollSnap())
    }
    emblaApi.on('select', handleSelect)
    emblaApi.on('reInit', syncCarouselState)
    return () => {
      emblaApi.off('select', handleSelect)
      emblaApi.off('reInit', syncCarouselState)
    }
  }, [emblaApi, onChange, syncCarouselState])

  useEffect(() => {
    if (!emblaApi || index === undefined) return
    const nextIndex = Math.min(Math.max(index, 0), Math.max(0, items.length - 1))
    if (emblaApi.selectedScrollSnap() !== nextIndex) emblaApi.scrollTo(nextIndex)
  }, [emblaApi, index, items.length])

  useEffect(() => {
    if (!autoplay || !emblaApi || paused || items.length < 2) return undefined
    const timer = setInterval(
      () => emblaApi.scrollNext(),
      typeof autoplay === 'number' ? autoplay : 4000,
    )
    return () => clearInterval(timer)
  }, [autoplay, emblaApi, items.length, paused])

  return (
    <div
      {...props}
      aria-roledescription="carousel"
      className={clsx(prefixCls, styles.carousel, rootClassName, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
    >
      <div className={styles.carouselViewport} ref={viewportRef}>
        <div className={styles.carouselTrack}>
          {items.map((item, itemIndex) => (
            <div
              aria-hidden={itemIndex !== activeIndex}
              aria-label={`${itemIndex + 1} of ${items.length}`}
              aria-roledescription="slide"
              className={styles.carouselSlide}
              key={itemIndex}
              role="group"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {navigation && items.length > 1 ? (
        <>
          <CarouselButton
            aria-label="Previous slide"
            className={styles.carouselPrevious}
            disabled={!canScrollPrevious}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft aria-hidden="true" />
          </CarouselButton>
          <CarouselButton
            aria-label="Next slide"
            className={styles.carouselNext}
            disabled={!canScrollNext}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight aria-hidden="true" />
          </CarouselButton>
        </>
      ) : null}
      {indicators && items.length > 1 ? (
        <div className={styles.carouselIndicators}>
          {items.map((_, itemIndex) => (
            <button
              aria-label={`Go to slide ${itemIndex + 1}`}
              aria-pressed={activeIndex === itemIndex}
              key={itemIndex}
              onClick={() => emblaApi?.scrollTo(itemIndex)}
              type="button"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function CarouselButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Material asChild material="paper">
      <RocoShape
        {...props}
        as="button"
        className={clsx(styles.carouselButton, className)}
        shape="circle"
        shadow
      >
        {children}
      </RocoShape>
    </Material>
  )
}

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  fallback?: ReactNode
  imageClassName?: string
  placeholder?: ReactNode
  prefixCls?: string
  preview?: boolean
  rootClassName?: string
}

export function Image({
  alt = '',
  className,
  fallback,
  imageClassName,
  onClick,
  onError,
  onLoad,
  placeholder,
  prefixCls = imagePrefixCls,
  preview = true,
  rootClassName,
  src,
  ...props
}: ImageProps) {
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)

  const closePreview = () => {
    setPreviewOpen(false)
    setScale(1)
    setRotation(0)
  }

  const handlePreviewOpenChange = (open: boolean) => {
    setPreviewOpen(open)
    if (!open) {
      setScale(1)
      setRotation(0)
    }
  }

  const image = (
    <img
      {...props}
      alt={alt}
      className={clsx(styles.image, imageClassName)}
      onClick={onClick}
      onError={(event) => {
        setLoading(false)
        setFailed(true)
        onError?.(event)
      }}
      onLoad={(event) => {
        setLoading(false)
        onLoad?.(event)
      }}
      src={src}
    />
  )

  return (
    <span className={clsx(prefixCls, styles.imageRoot, rootClassName, className)}>
      {loading && !failed ? (
        <span className={styles.imagePlaceholder}>
          {placeholder ?? <Skeleton active height="100%" />}
        </span>
      ) : null}
      {failed ? (
        <span className={styles.imageFallback}>
          {fallback ?? (
            <>
              <ImageOff aria-hidden="true" />
              <span>Image unavailable</span>
            </>
          )}
        </span>
      ) : preview ? (
        <RadixDialogRoot onOpenChange={handlePreviewOpenChange} open={previewOpen}>
          <RadixDialogTrigger asChild>
            <button
              aria-label={`Preview ${alt || 'image'}`}
              className={styles.imageTrigger}
              type="button"
            >
              {image}
            </button>
          </RadixDialogTrigger>
          <RadixDialogPortal>
            <RocoTheme asChild>
              <RadixDialogOverlay className={styles.imagePreviewOverlay}>
                <RadixDialogContent
                  aria-describedby={undefined}
                  className={styles.imagePreview}
                  onMouseDown={(event) => {
                    if (event.target === event.currentTarget) closePreview()
                  }}
                >
                  <RadixDialogTitle className={styles.visuallyHidden}>
                    Preview {alt || 'image'}
                  </RadixDialogTitle>
                  <img
                    alt={alt}
                    src={src}
                    style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
                  />
                  <div className={styles.imageToolbar}>
                    <ImageTool
                      aria-label="Zoom out"
                      onClick={() => setScale((value) => Math.max(0.5, value - 0.25))}
                    >
                      <ZoomOut aria-hidden="true" />
                    </ImageTool>
                    <ImageTool
                      aria-label="Zoom in"
                      onClick={() => setScale((value) => Math.min(3, value + 0.25))}
                    >
                      <ZoomIn aria-hidden="true" />
                    </ImageTool>
                    <ImageTool
                      aria-label="Rotate image"
                      onClick={() => setRotation((value) => value + 90)}
                    >
                      <RotateCw aria-hidden="true" />
                    </ImageTool>
                    <RadixDialogClose asChild>
                      <ImageTool aria-label="Close preview">
                        <X aria-hidden="true" />
                      </ImageTool>
                    </RadixDialogClose>
                  </div>
                </RadixDialogContent>
              </RadixDialogOverlay>
            </RocoTheme>
          </RadixDialogPortal>
        </RadixDialogRoot>
      ) : (
        image
      )}
    </span>
  )
}

function ImageTool({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Material asChild material="stone">
      <RocoShape {...props} as="button" className={styles.imageTool} shape="circle">
        {children}
      </RocoShape>
    </Material>
  )
}

export const TreeExpandIcon = Plus
export const TreeCollapseIcon = Minus
