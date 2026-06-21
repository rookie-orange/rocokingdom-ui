import * as Dialog from '@radix-ui/react-dialog'
import type { ComponentPropsWithoutRef, CSSProperties, ReactElement, ReactNode } from 'react'
import { clsx } from 'clsx'
import { RuneText } from '../rune-text'
import styles from './modal.module.css'

export const modalPrefixCls = 'rk-modal'
export const ModalClose = Dialog.Close

type DialogRootProps = ComponentPropsWithoutRef<typeof Dialog.Root>
export type ModalCloseProps = ComponentPropsWithoutRef<typeof Dialog.Close>
type DialogContentProps = Omit<
  ComponentPropsWithoutRef<typeof Dialog.Content>,
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
    <Dialog.Close
      aria-label={closeLabel}
      className={clsx(`${prefixCls}-close`, styles.close, closeClassName)}
      type="button"
    >
      <span aria-hidden="true" className={styles.closeIcon} />
    </Dialog.Close>
  ) : null

  const descriptionProps =
    hasDescription || contentProps?.['aria-describedby'] !== undefined
      ? undefined
      : ({ 'aria-describedby': undefined } as const)

  return (
    <Dialog.Root {...rootProps}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay
          className={clsx(`${prefixCls}-overlay`, styles.overlay, overlayClassName)}
        />
        <Dialog.Content
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
                    <Dialog.Title className={styles.visuallyHidden}>
                      {titleForAssistiveTech}
                    </Dialog.Title>
                    <div className={clsx(`${prefixCls}-header-content`, styles.headerContent)}>
                      {header}
                    </div>
                  </>
                ) : (
                  <Dialog.Title
                    className={clsx(`${prefixCls}-title`, styles.title, titleClassName)}
                  >
                    {titleForAssistiveTech}
                  </Dialog.Title>
                )}
                {closeButton}
              </header>
            ) : (
              <>
                <Dialog.Title className={styles.visuallyHidden}>
                  {titleForAssistiveTech}
                </Dialog.Title>
                {closeButton ? (
                  <div className={clsx(`${prefixCls}-floating-close`, styles.floatingClose)}>
                    {closeButton}
                  </div>
                ) : null}
              </>
            )}

            <div className={clsx(`${prefixCls}-body`, styles.body, bodyClassName)}>
              {hasDescription ? (
                <Dialog.Description
                  className={clsx(
                    `${prefixCls}-description`,
                    styles.description,
                    descriptionClassName,
                  )}
                >
                  {description}
                </Dialog.Description>
              ) : null}
              {children}
            </div>
          </section>

          {hasFooter ? (
            <footer className={clsx(`${prefixCls}-footer`, styles.footer, footerClassName)}>
              {footer}
            </footer>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
