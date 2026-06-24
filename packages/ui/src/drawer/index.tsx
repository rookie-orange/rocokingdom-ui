import type { ComponentPropsWithoutRef, CSSProperties, ReactElement, ReactNode } from 'react'
import { clsx } from 'clsx'
import { Panel } from '../panel'
import type { PanelCurve, PanelMaterial, PanelProps } from '../panel'
import { RocoTheme } from '../theme'
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
  '--rk-drawer-curve-extension'?: string
  '--rk-drawer-outer-size'?: string
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
  overlay?: boolean
  overlayClassName?: string
  panelClassName?: string
  panelProps?: DrawerPanelProps
  prefixCls?: string
  rootClassName?: string
  side?: DrawerSide
  // 'full' is listed explicitly for IDE completion even though it is a string subset.
  // oxlint-disable-next-line no-redundant-type-constituents
  size?: number | 'full' | string
  title?: ReactNode
  titleClassName?: string
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

function resolveCurveExtension(size: number, hasCurveExtension: boolean) {
  if (!hasCurveExtension) {
    return '0px'
  }

  return `${Number(((size * 120) / 880).toFixed(3))}px`
}

// oxlint-disable-next-line no-redundant-type-constituents
function resolveDrawerSize(
  size: number | string | undefined,
  side: DrawerSide,
  hasCurveExtension: boolean,
) {
  if (size === 'full') {
    const viewportSize = side === 'left' || side === 'right' ? '100vw' : '100svh'

    if (!hasCurveExtension) {
      return {
        outerSize: viewportSize,
        size: viewportSize,
      }
    }

    return {
      curveExtension: side === 'left' || side === 'right' ? '12vw' : '12svh',
      outerSize: viewportSize,
      size: `calc(${viewportSize} - var(--rk-drawer-curve-extension))`,
    }
  }

  if (typeof size === 'number') {
    return {
      curveExtension: resolveCurveExtension(size, hasCurveExtension),
      size: resolveSize(size),
    }
  }

  if (!hasCurveExtension) {
    return { curveExtension: '0px', size: resolveSize(size) }
  }

  return { size: resolveSize(size) }
}

function getDefaultCurve(side: DrawerSide): PanelCurve {
  if (side === 'right') {
    return 'left'
  }

  if (side === 'left') {
    return 'right'
  }

  if (side === 'top') {
    return 'bottom'
  }

  return 'top'
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
  overlay = false,
  overlayClassName,
  panelClassName,
  panelProps,
  prefixCls = drawerPrefixCls,
  rootClassName,
  side = 'right',
  size,
  title,
  titleClassName,
  trigger,
  ...rootProps
}: DrawerProps) {
  const hasDescription = hasContent(description)
  const hasTitle = hasContent(title)
  const titleForAssistiveTech = hasTitle ? title : (ariaLabel ?? 'Drawer')
  const contentStyle: DrawerStyle = { ...contentProps?.style }
  const resolvedCurve = curve ?? panelProps?.curve ?? getDefaultCurve(side)
  const resolvedSize = resolveDrawerSize(size, side, resolvedCurve !== 'none')

  if (resolvedSize.size) {
    contentStyle['--rk-drawer-size'] = resolvedSize.size
  }

  if (resolvedSize.curveExtension) {
    contentStyle['--rk-drawer-curve-extension'] = resolvedSize.curveExtension
  }

  if (resolvedSize.outerSize) {
    contentStyle['--rk-drawer-outer-size'] = resolvedSize.outerSize
  }

  const descriptionProps =
    hasDescription || contentProps?.['aria-describedby'] !== undefined
      ? undefined
      : ({ 'aria-describedby': undefined } as const)

  return (
    <RadixDialogRoot {...rootProps}>
      {trigger ? <RadixDialogTrigger asChild>{trigger}</RadixDialogTrigger> : null}
      <RadixDialogPortal>
        <RocoTheme asChild>
          <RadixDialogOverlay
            className={clsx(
              `${prefixCls}-overlay`,
              styles.overlay,
              overlay && styles.overlayVisible,
              overlayClassName,
            )}
          >
            <RadixDialogContent
              {...contentProps}
              {...descriptionProps}
              className={clsx(
                prefixCls,
                styles.content,
                styles[side],
                rootClassName,
                contentClassName,
              )}
              style={contentStyle}
            >
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
                  <header className={clsx(`${prefixCls}-header`, styles.header)}>
                    <div className={clsx(`${prefixCls}-header-content`, styles.headerContent)}>
                      {hasTitle ? (
                        <RadixDialogTitle
                          className={clsx(`${prefixCls}-title`, styles.title, titleClassName)}
                        >
                          {title}
                        </RadixDialogTitle>
                      ) : (
                        <RadixDialogTitle className={styles.visuallyHidden}>
                          {titleForAssistiveTech}
                        </RadixDialogTitle>
                      )}
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
                    </div>
                    {closable ? (
                      <RadixDialogClose
                        aria-label={closeLabel}
                        className={clsx(`${prefixCls}-close`, styles.close, closeClassName)}
                        type="button"
                      >
                        <span aria-hidden="true" className={styles.closeIcon} />
                      </RadixDialogClose>
                    ) : null}
                  </header>
                  <div
                    className={clsx(
                      `${prefixCls}-content`,
                      `${prefixCls}-body`,
                      styles.body,
                      bodyClassName,
                    )}
                  >
                    {children}
                  </div>
                </div>
              </Panel>
            </RadixDialogContent>
          </RadixDialogOverlay>
        </RocoTheme>
      </RadixDialogPortal>
    </RadixDialogRoot>
  )
}
