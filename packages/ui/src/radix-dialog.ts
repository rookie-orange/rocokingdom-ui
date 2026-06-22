import * as Dialog from '@radix-ui/react-dialog'
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ComponentType,
  HTMLAttributes,
  ReactNode,
} from 'react'

export const RadixDialogRoot = Dialog.Root
export const RadixDialogPortal = Dialog.Portal

export type RadixDialogRootProps = ComponentPropsWithoutRef<typeof Dialog.Root>

export interface RadixDialogButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  children?: ReactNode
}

export type RadixDialogCloseProps = RadixDialogButtonProps
export type RadixDialogTriggerProps = RadixDialogButtonProps

export interface RadixDialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
  forceMount?: true
}

export interface RadixDialogContentProps extends HTMLAttributes<HTMLDivElement> {
  forceMount?: true
  onCloseAutoFocus?: (event: Event) => void
  onEscapeKeyDown?: (event: Event) => void
  onInteractOutside?: (event: Event) => void
  onOpenAutoFocus?: (event: Event) => void
  onPointerDownOutside?: (event: Event) => void
}

export interface RadixDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean
  children?: ReactNode
}

export interface RadixDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean
  children?: ReactNode
}

export const RadixDialogClose = Dialog.Close as ComponentType<RadixDialogCloseProps>
export const RadixDialogContent = Dialog.Content as ComponentType<RadixDialogContentProps>
export const RadixDialogDescription =
  Dialog.Description as ComponentType<RadixDialogDescriptionProps>
export const RadixDialogOverlay = Dialog.Overlay as ComponentType<RadixDialogOverlayProps>
export const RadixDialogTitle = Dialog.Title as ComponentType<RadixDialogTitleProps>
export const RadixDialogTrigger = Dialog.Trigger as ComponentType<RadixDialogTriggerProps>
