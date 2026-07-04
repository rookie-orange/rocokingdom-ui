import type { ComponentProps, ReactNode } from 'react'
import { Panel } from 'rocokingdom-ui'
import { cn } from './utils'

type HomeCardProps = ComponentProps<typeof Panel>

const cardRootClassName =
  'min-w-0 w-full shadow-[inset_0_1px_0_rgb(255_255_255_/_0.9),0_22px_48px_rgb(36_38_40_/_0.13)]'

const cardContentClassName =
  'p-[clamp(1rem,1.35vw,1.35rem)] [@media_(max-height:760px)_and_(min-width:1025px)]:p-[0.95rem] max-sm:p-[0.9rem]'

export const actionButtonClassName = '!w-full !min-w-0 justify-center'
export const modalCopyClassName = 'm-0'

export function HomeCard({
  className,
  contentClassName,
  material = 'paperSoft',
  ...props
}: HomeCardProps) {
  return (
    <Panel
      className={cn(cardRootClassName, className)}
      contentClassName={cn(cardContentClassName, contentClassName)}
      material={material}
      {...props}
    />
  )
}

interface CardHeadingProps {
  className?: string
  description?: ReactNode
  title: ReactNode
}

export function CardHeading({ className, description, title }: CardHeadingProps) {
  return (
    <div className={cn('grid gap-[0.35rem]', className)}>
      <CardTitle>{title}</CardTitle>
      {description ? <CardDescription>{description}</CardDescription> : null}
    </div>
  )
}

interface CardTextProps {
  children: ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTextProps) {
  return (
    <h2
      className={cn(
        'm-0 font-roco text-[clamp(1.35rem,1.7vw,1.85rem)] font-extrabold leading-none tracking-normal',
        className,
      )}
    >
      {children}
    </h2>
  )
}

export function CardDescription({ children, className }: CardTextProps) {
  return (
    <p className={cn('m-0 text-[0.9rem] leading-[1.45] text-stone/55', className)}>{children}</p>
  )
}

interface CardFieldProps {
  children: ReactNode
  className?: string
  label: ReactNode
}

export function CardField({ children, className, label }: CardFieldProps) {
  return (
    <div className={cn('grid min-w-0 gap-[0.45rem]', className)}>
      <span className="text-[0.95rem] font-extrabold leading-none text-on-paper">{label}</span>
      {children}
    </div>
  )
}

interface CardActionsProps {
  children: ReactNode
  className?: string
}

export function CardActions({ children, className }: CardActionsProps) {
  return (
    <div
      className={cn(
        'grid w-full grid-cols-2 items-center gap-3 [grid-template-columns:repeat(2,minmax(0,1fr))]',
        className,
      )}
    >
      {children}
    </div>
  )
}
