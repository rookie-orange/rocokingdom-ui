import type { ComponentPropsWithoutRef, CSSProperties, ReactElement, ReactNode } from 'react'
import { clsx } from 'clsx'
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
import { RocoTheme } from '../theme'
import { RuneText } from '../rune-text'
import styles from './modal.module.css'

export const modalPrefixCls = 'rk-modal'
export const ModalClose = RadixDialogClose

type DialogRootProps = ComponentPropsWithoutRef<typeof RadixDialogRoot>
export type ModalCloseProps = ComponentPropsWithoutRef<typeof RadixDialogClose>
type DialogContentProps = Omit<
  ComponentPropsWithoutRef<typeof RadixDialogContent>,
  'children' | 'className'
>

interface ModalStyle extends CSSProperties {
  '--rk-modal-width'?: string
}

export interface ModalProps extends Omit<DialogRootProps, 'children'> {
  ariaLabel?: string
  bodyClassName?: string
  children?: ReactNode
  closable?: boolean
  closeClassName?: string
  closeLabel?: string
  contentClassName?: string
  contentProps?: DialogContentProps
  description?: ReactNode
  descriptionClassName?: string
  footer?: ReactNode
  footerClassName?: string
  header?: ReactNode | false
  headerClassName?: string
  headerRuneText?: ReactNode
  headerRuneTextClassName?: string
  overlayClassName?: string
  panelClassName?: string
  prefixCls?: string
  rootClassName?: string
  title?: ReactNode
  titleClassName?: string
  trigger?: ReactElement
  width?: number | string
}

function hasContent(value: ReactNode | false | undefined): value is ReactNode {
  return value !== undefined && value !== null && value !== false
}

function resolveWidth(width: number | string | undefined) {
  if (typeof width === 'number') {
    return `${width}px`
  }

  return width
}

export function Modal({
  ariaLabel,
  bodyClassName,
  children,
  closable = true,
  closeClassName,
  closeLabel = '关闭',
  contentClassName,
  contentProps,
  description,
  descriptionClassName,
  footer,
  footerClassName,
  header,
  headerClassName,
  headerRuneText,
  headerRuneTextClassName,
  overlayClassName,
  panelClassName,
  prefixCls = modalPrefixCls,
  rootClassName,
  title,
  titleClassName,
  trigger,
  width,
  ...rootProps
}: ModalProps) {
  const hasTitle = hasContent(title)
  const hasDescription = hasContent(description)
  const hasFooter = hasContent(footer)
  const hasCustomHeader = header !== undefined && header !== false
  const hasHeaderRuneText = hasContent(headerRuneText)
  const hasVisibleHeader =
    header !== false && (hasCustomHeader || hasTitle || hasHeaderRuneText || closable)
  const titleForAssistiveTech = hasTitle ? title : (ariaLabel ?? 'Modal')
  const contentStyle: ModalStyle = { ...contentProps?.style }
  const resolvedWidth = resolveWidth(width)

  if (resolvedWidth) {
    contentStyle['--rk-modal-width'] = resolvedWidth
  }

  const closeButton = closable ? (
    <RadixDialogClose
      aria-label={closeLabel}
      className={clsx(`${prefixCls}-close`, styles.close, closeClassName)}
      type="button"
    >
      <span aria-hidden="true" className={styles.closeIcon} />
    </RadixDialogClose>
  ) : null

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
            className={clsx(`${prefixCls}-overlay`, styles.overlay, overlayClassName)}
          >
            <RadixDialogContent
              {...contentProps}
              {...descriptionProps}
              className={clsx(prefixCls, styles.content, rootClassName, contentClassName)}
              style={contentStyle}
            >
              <section className={clsx(`${prefixCls}-panel`, styles.panel, panelClassName)}>
                {hasVisibleHeader ? (
                  <header className={clsx(`${prefixCls}-header`, styles.header, headerClassName)}>
                    {hasHeaderRuneText ? (
                      <RuneText
                        aria-hidden="true"
                        className={clsx(
                          `${prefixCls}-header-rune-text`,
                          styles.headerRuneText,
                          headerRuneTextClassName,
                        )}
                      >
                        {headerRuneText}
                      </RuneText>
                    ) : null}
                    {hasCustomHeader ? (
                      <>
                        <RadixDialogTitle className={styles.visuallyHidden}>
                          {titleForAssistiveTech}
                        </RadixDialogTitle>
                        <div className={clsx(`${prefixCls}-header-content`, styles.headerContent)}>
                          {header}
                        </div>
                      </>
                    ) : (
                      <RadixDialogTitle
                        className={clsx(`${prefixCls}-title`, styles.title, titleClassName)}
                      >
                        {titleForAssistiveTech}
                      </RadixDialogTitle>
                    )}
                    {closeButton}
                  </header>
                ) : (
                  <>
                    <RadixDialogTitle className={styles.visuallyHidden}>
                      {titleForAssistiveTech}
                    </RadixDialogTitle>
                    {closeButton ? (
                      <div className={clsx(`${prefixCls}-floating-close`, styles.floatingClose)}>
                        {closeButton}
                      </div>
                    ) : null}
                  </>
                )}

                <div className={clsx(`${prefixCls}-body`, styles.body, bodyClassName)}>
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
                  {children}
                </div>
              </section>

              {hasFooter ? (
                <footer className={clsx(`${prefixCls}-footer`, styles.footer, footerClassName)}>
                  {footer}
                </footer>
              ) : null}
            </RadixDialogContent>
          </RadixDialogOverlay>
        </RocoTheme>
      </RadixDialogPortal>
    </RadixDialogRoot>
  )
}
