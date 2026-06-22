import type { ComponentPropsWithoutRef, CSSProperties, ReactElement, ReactNode } from 'react'
import { clsx } from 'clsx'
import { Panel } from '../panel'
import type { PanelCurve, PanelMaterial, PanelProps } from '../panel'
import {
  RadixDialogClose,
  RadixDialogContent,
  RadixDialogDescription,
  RadixDialogOverlay,
  RadixDialogPortal,
  RadixDialogRoot,
  RadixDialogTitle,
  RadixDialogTrigger,
} from '../radix-dialog'
import styles from './drawer.module.css'

export const drawerPrefixCls = 'rk-drawer'
export const DrawerClose = RadixDialogClose

export type DrawerSide = 'bottom' | 'left' | 'right' | 'top'
export type DrawerCloseProps = ComponentPropsWithoutRef<typeof RadixDialogClose>

type DialogRootProps = ComponentPropsWithoutRef<typeof RadixDialogRoot>
type DialogContentProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDialogContent>,
  'children' | 'className'
>
type DrawerPanelProps = Omit<PanelProps, 'children'>

interface DrawerStyle extends CSSProperties {
  '--rk-drawer-size'?: string
}

export interface DrawerProps extends Omit<DialogRootProps, 'children'> {
  ariaLabel?: string
  bodyClassName?: string
  children?: ReactNode
  closable?: boolean
  closeClassName?: string
  closeLabel?: string
  contentClassName?: string
  contentProps?: DialogContentProps
  curve?: PanelCurve
  description?: ReactNode
  descriptionClassName?: string
  innerClassName?: string
  material?: PanelMaterial
  overlayClassName?: string
  panelClassName?: string
  panelProps?: DrawerPanelProps
  prefixCls?: string
  rootClassName?: string
  side?: DrawerSide
  size?: number | string
  title?: ReactNode
  trigger?: ReactElement
}

function hasContent(value: ReactNode | undefined): value is ReactNode {
  return value !== undefined && value !== null
}

function resolveSize(value: number | string | undefined) {
  if (typeof value === 'number') {
    return `${value}px`
  }

  return value
}

function getDefaultCurve(side: DrawerSide): PanelCurve {
  if (side === 'right') {
    return 'left'
  }

  if (side === 'left') {
    return 'right'
  }

  return 'none'
}

export function Drawer({
  ariaLabel,
  bodyClassName,
  children,
  closable = true,
  closeClassName,
  closeLabel = '关闭',
  contentClassName,
  contentProps,
  curve,
  description,
  descriptionClassName,
  innerClassName,
  material = 'stone',
  overlayClassName,
  panelClassName,
  panelProps,
  prefixCls = drawerPrefixCls,
  rootClassName,
  side = 'right',
  size,
  title,
  trigger,
  ...rootProps
}: DrawerProps) {
  const hasDescription = hasContent(description)
  const titleForAssistiveTech = hasContent(title) ? title : (ariaLabel ?? 'Drawer')
  const contentStyle: DrawerStyle = { ...contentProps?.style }
  const resolvedSize = resolveSize(size)
  const resolvedCurve = curve ?? panelProps?.curve ?? getDefaultCurve(side)

  if (resolvedSize) {
    contentStyle['--rk-drawer-size'] = resolvedSize
  }

  const descriptionProps =
    hasDescription || contentProps?.['aria-describedby'] !== undefined
      ? undefined
      : ({ 'aria-describedby': undefined } as const)

  return (
    <RadixDialogRoot {...rootProps}>
      {trigger ? <RadixDialogTrigger asChild>{trigger}</RadixDialogTrigger> : null}
      <RadixDialogPortal>
        <RadixDialogOverlay
          className={clsx(`${prefixCls}-overlay`, styles.overlay, overlayClassName)}
        />
        <RadixDialogContent
          {...contentProps}
          {...descriptionProps}
          className={clsx(prefixCls, styles.content, styles[side], rootClassName, contentClassName)}
          style={contentStyle}
        >
          <RadixDialogTitle className={styles.visuallyHidden}>
            {titleForAssistiveTech}
          </RadixDialogTitle>
          <Panel
            {...panelProps}
            as="section"
            className={clsx(
              `${prefixCls}-panel`,
              styles.panel,
              panelProps?.className,
              panelClassName,
            )}
            contentClassName={clsx(
              `${prefixCls}-panel-content`,
              styles.panelContent,
              panelProps?.contentClassName,
            )}
            curve={resolvedCurve}
            material={panelProps?.material ?? material}
          >
            <div className={clsx(`${prefixCls}-inner`, styles.inner, innerClassName)}>
              {hasDescription ? (
                <RadixDialogDescription
                  className={clsx(
                    `${prefixCls}-description`,
                    styles.description,
                    descriptionClassName,
                  )}
                >
                  {description}
                </RadixDialogDescription>
              ) : null}
              <div className={clsx(`${prefixCls}-body`, styles.body, bodyClassName)}>
                {children}
              </div>
            </div>
          </Panel>
          {closable ? (
            <RadixDialogClose
              aria-label={closeLabel}
              className={clsx(`${prefixCls}-close`, styles.close, closeClassName)}
              type="button"
            >
              <span aria-hidden="true" className={styles.closeIcon} />
            </RadixDialogClose>
          ) : null}
        </RadixDialogContent>
      </RadixDialogPortal>
    </RadixDialogRoot>
  )
}
