import type { HTMLAttributes, ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'
import * as RadixToast from '@radix-ui/react-toast'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import { Check, CircleAlert, Info, X, XCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { floatingContentClassName } from '../floating-content'
import { Material, type MaterialPreset } from '../material'
import { RocoShape } from '../roco-shape'
import { RocoTheme } from '../theme'
import styles from './overlay.module.css'

export const tooltipPrefixCls = 'rk-tooltip'
export const popoverPrefixCls = 'rk-popover'
export const messagePrefixCls = 'rk-message'
export const notificationPrefixCls = 'rk-notification'

export type OverlayPlacement =
  | 'bottom'
  | 'bottom-end'
  | 'bottom-start'
  | 'left'
  | 'right'
  | 'top'
  | 'top-end'
  | 'top-start'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content'> {
  content: ReactNode
  defaultOpen?: boolean
  delay?: number
  material?: MaterialPreset
  onOpenChange?: (open: boolean) => void
  open?: boolean
  placement?: OverlayPlacement
  prefixCls?: string
  rootClassName?: string
}

function resolvePlacement(placement: OverlayPlacement) {
  const [side, align = 'center'] = placement.split('-') as [
    'bottom' | 'left' | 'right' | 'top',
    'center' | 'end' | 'start' | undefined,
  ]
  return { align: align ?? 'center', side }
}

export function Tooltip({
  children,
  className,
  content,
  defaultOpen = false,
  delay = 320,
  material = 'stone',
  onOpenChange,
  open,
  placement = 'top',
  prefixCls = tooltipPrefixCls,
  rootClassName,
  ...props
}: TooltipProps) {
  const position = resolvePlacement(placement)

  return (
    <span {...props} className={clsx(prefixCls, styles.overlayRoot, rootClassName, className)}>
      <RadixTooltip.Provider delayDuration={delay}>
        <RadixTooltip.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
          <RadixTooltip.Trigger asChild>
            <span className={styles.overlayTrigger}>{children}</span>
          </RadixTooltip.Trigger>
          <RadixTooltip.Portal>
            <RocoTheme asChild>
              <Material asChild material={material}>
                <RadixTooltip.Content
                  align={position.align}
                  className={clsx(floatingContentClassName, styles.tooltipContent)}
                  side={position.side}
                  sideOffset={8}
                >
                  <RocoShape className={styles.tooltipShape} shadow>
                    {content}
                  </RocoShape>
                  <RadixTooltip.Arrow className={styles.overlayArrow} />
                </RadixTooltip.Content>
              </Material>
            </RocoTheme>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    </span>
  )
}

export interface PopoverProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'content' | 'title'> {
  content: ReactNode
  defaultOpen?: boolean
  material?: MaterialPreset
  onOpenChange?: (open: boolean) => void
  open?: boolean
  placement?: OverlayPlacement
  prefixCls?: string
  rootClassName?: string
  title?: ReactNode
  trigger: ReactNode
}

export function Popover({
  className,
  content,
  defaultOpen = false,
  material = 'paper',
  onOpenChange,
  open,
  placement = 'bottom',
  prefixCls = popoverPrefixCls,
  rootClassName,
  title,
  trigger,
  ...props
}: PopoverProps) {
  const position = resolvePlacement(placement)

  return (
    <span {...props} className={clsx(prefixCls, styles.overlayRoot, rootClassName, className)}>
      <RadixPopover.Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
        <RadixPopover.Trigger asChild>
          <span className={styles.overlayTrigger}>{trigger}</span>
        </RadixPopover.Trigger>
        <RadixPopover.Portal>
          <RocoTheme asChild>
            <Material asChild material={material}>
              <RadixPopover.Content
                align={position.align}
                className={clsx(floatingContentClassName, styles.popoverContent)}
                side={position.side}
                sideOffset={8}
              >
                {title ? (
                  <header className={styles.popoverHeader}>
                    <strong>{title}</strong>
                    <RadixPopover.Close asChild>
                      <button aria-label="Close popover" type="button">
                        <X aria-hidden="true" />
                      </button>
                    </RadixPopover.Close>
                  </header>
                ) : null}
                <div className={styles.popoverBody}>{content}</div>
                <RadixPopover.Arrow className={styles.overlayArrow} />
              </RadixPopover.Content>
            </Material>
          </RocoTheme>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    </span>
  )
}

export type MessageStatus = 'danger' | 'info' | 'loading' | 'success' | 'warning'

const statusMaterial: Record<MessageStatus, MaterialPreset> = {
  danger: 'danger',
  info: 'stone',
  loading: 'stoneMuted',
  success: 'success',
  warning: 'primary',
}

const statusIcon = {
  danger: XCircle,
  info: Info,
  loading: CircleAlert,
  success: Check,
  warning: CircleAlert,
}

export interface MessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  closable?: boolean
  icon?: ReactNode
  material?: MaterialPreset
  onClose?: () => void
  prefixCls?: string
  rootClassName?: string
  status?: MessageStatus
  title: ReactNode
}

export function Message({
  className,
  closable = false,
  icon,
  material,
  onClose,
  prefixCls = messagePrefixCls,
  rootClassName,
  status = 'info',
  title,
  ...props
}: MessageProps) {
  const Icon = statusIcon[status]
  return (
    <Material asChild material={material ?? statusMaterial[status]}>
      <RocoShape
        {...props}
        className={clsx(prefixCls, styles.message, styles[status], rootClassName, className)}
        contentClassName={styles.messageContent}
        role={status === 'danger' ? 'alert' : 'status'}
        shadow
      >
        <span
          aria-hidden="true"
          className={clsx(styles.messageIcon, status === 'loading' && styles.loadingIcon)}
        >
          {icon ?? <Icon />}
        </span>
        <span className={styles.messageTitle}>{title}</span>
        {closable ? (
          <button
            aria-label="Close message"
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" />
          </button>
        ) : null}
      </RocoShape>
    </Material>
  )
}

export const Toast = Message
export type ToastProps = MessageProps

export interface MessageOptions extends Omit<
  MessageProps,
  'onClose' | 'prefixCls' | 'rootClassName'
> {
  duration?: number
  key?: string
  onClose?: () => void
}

export interface MessageApi {
  close: (key: string) => void
  danger: (title: ReactNode, options?: Omit<MessageOptions, 'status' | 'title'>) => string
  info: (title: ReactNode, options?: Omit<MessageOptions, 'status' | 'title'>) => string
  loading: (title: ReactNode, options?: Omit<MessageOptions, 'status' | 'title'>) => string
  open: (options: MessageOptions) => string
  success: (title: ReactNode, options?: Omit<MessageOptions, 'status' | 'title'>) => string
  warning: (title: ReactNode, options?: Omit<MessageOptions, 'status' | 'title'>) => string
}

interface MessageEntry extends MessageOptions {
  key: string
}

const MessageContext = createContext<MessageApi | null>(null)

export interface MessageProviderProps {
  children?: ReactNode
  maxCount?: number
}

export function MessageProvider({ children, maxCount = 5 }: MessageProviderProps) {
  const nextId = useRef(0)
  const [messages, setMessages] = useState<readonly MessageEntry[]>([])
  const close = useCallback((key: string) => {
    setMessages((current) => current.filter((message) => message.key !== key))
  }, [])
  const open = useCallback(
    (options: MessageOptions) => {
      const key = options.key ?? `message-${nextId.current++}`
      setMessages((current) =>
        [...current.filter((message) => message.key !== key), { ...options, key }].slice(-maxCount),
      )
      return key
    },
    [maxCount],
  )
  const api = useMemo<MessageApi>(
    () => ({
      close,
      danger: (title, options) => open({ ...options, status: 'danger', title }),
      info: (title, options) => open({ ...options, status: 'info', title }),
      loading: (title, options) => open({ ...options, duration: 0, status: 'loading', title }),
      open,
      success: (title, options) => open({ ...options, status: 'success', title }),
      warning: (title, options) => open({ ...options, status: 'warning', title }),
    }),
    [close, open],
  )
  return (
    <RadixToast.Provider swipeDirection="up">
      <MessageContext value={api}>
        {children}
        {messages.map((message) => (
          <MessageEntryView entry={message} key={message.key} onClose={() => close(message.key)} />
        ))}
        <RadixToast.Viewport className={styles.messageHolder} />
      </MessageContext>
    </RadixToast.Provider>
  )
}

function MessageEntryView({ entry, onClose }: { entry: MessageEntry; onClose: () => void }) {
  const { key: messageKey, ...messageProps } = entry

  return (
    <RadixToast.Root
      asChild
      data-message-key={messageKey}
      defaultOpen
      duration={messageProps.duration === 0 ? 2_147_483_647 : (messageProps.duration ?? 3000)}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
          messageProps.onClose?.()
        }
      }}
    >
      <Message {...messageProps} onClose={onClose} />
    </RadixToast.Root>
  )
}

export function useMessage() {
  const api = useContext(MessageContext)
  if (!api) throw new Error('useMessage must be used inside MessageProvider')
  return api
}

export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  action?: ReactNode
  closable?: boolean
  description?: ReactNode
  icon?: ReactNode
  material?: MaterialPreset
  onClose?: () => void
  prefixCls?: string
  rootClassName?: string
  status?: MessageStatus
  title: ReactNode
}

export function Notification({
  action,
  className,
  closable = true,
  description,
  icon,
  material = 'paper',
  onClose,
  prefixCls = notificationPrefixCls,
  rootClassName,
  status = 'info',
  title,
  ...props
}: NotificationProps) {
  const Icon = statusIcon[status]
  return (
    <Material
      {...props}
      className={clsx(prefixCls, styles.notification, rootClassName, className)}
      material={material}
      role={status === 'danger' ? 'alert' : 'status'}
    >
      <Material className={styles.notificationIcon} material={statusMaterial[status]}>
        <RocoShape shape="circle">{icon ?? <Icon aria-hidden="true" />}</RocoShape>
      </Material>
      <div className={styles.notificationCopy}>
        <strong>{title}</strong>
        {description ? <div>{description}</div> : null}
        {action ? <div className={styles.notificationAction}>{action}</div> : null}
      </div>
      {closable ? (
        <button
          aria-label="Close notification"
          className={styles.closeButton}
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" />
        </button>
      ) : null}
    </Material>
  )
}

export interface NotificationOptions extends Omit<
  NotificationProps,
  'onClose' | 'prefixCls' | 'rootClassName'
> {
  duration?: number
  key?: string
  onClose?: () => void
}

export interface NotificationApi {
  close: (key: string) => void
  open: (options: NotificationOptions) => string
}

interface NotificationEntry extends NotificationOptions {
  key: string
}

const NotificationContext = createContext<NotificationApi | null>(null)

export function NotificationProvider({ children, maxCount = 4 }: MessageProviderProps) {
  const nextId = useRef(0)
  const [notifications, setNotifications] = useState<readonly NotificationEntry[]>([])
  const close = useCallback((key: string) => {
    setNotifications((current) => current.filter((notification) => notification.key !== key))
  }, [])
  const open = useCallback(
    (options: NotificationOptions) => {
      const key = options.key ?? `notification-${nextId.current++}`
      setNotifications((current) =>
        [...current.filter((notification) => notification.key !== key), { ...options, key }].slice(
          -maxCount,
        ),
      )
      return key
    },
    [maxCount],
  )
  const api = useMemo(() => ({ close, open }), [close, open])
  return (
    <RadixToast.Provider swipeDirection="right">
      <NotificationContext value={api}>
        {children}
        {notifications.map((notification) => (
          <NotificationEntryView
            entry={notification}
            key={notification.key}
            onClose={() => close(notification.key)}
          />
        ))}
        <RadixToast.Viewport className={styles.notificationHolder} />
      </NotificationContext>
    </RadixToast.Provider>
  )
}

function NotificationEntryView({
  entry,
  onClose,
}: {
  entry: NotificationEntry
  onClose: () => void
}) {
  const { key: notificationKey, ...notificationProps } = entry

  return (
    <RadixToast.Root
      asChild
      data-notification-key={notificationKey}
      defaultOpen
      duration={
        notificationProps.duration === 0 ? 2_147_483_647 : (notificationProps.duration ?? 5000)
      }
      onOpenChange={(open) => {
        if (!open) {
          onClose()
          notificationProps.onClose?.()
        }
      }}
    >
      <Notification {...notificationProps} onClose={onClose} />
    </RadixToast.Root>
  )
}

export function useNotification() {
  const api = useContext(NotificationContext)
  if (!api) throw new Error('useNotification must be used inside NotificationProvider')
  return api
}
