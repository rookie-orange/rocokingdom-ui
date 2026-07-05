import type { ComponentProps, ReactNode } from 'react'
import { Panel } from 'rocokingdom-ui'
import { cn } from './utils'

type HomeCardProps = ComponentProps<typeof Panel>

const cardRootClassName = 'min-w-0 w-full shadow-lg'

const cardContentClassName = 'p-3 sm:p-4'

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
    <div className={cn('grid gap-1', className)}>
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
    <h2 className={cn('m-0 font-roco text-xl font-extrabold leading-none sm:text-2xl', className)}>
      {children}
    </h2>
  )
}

export function CardDescription({ children, className }: CardTextProps) {
  return (
    <p className={cn('m-0 text-xs leading-5 text-stone/55 sm:text-sm', className)}>{children}</p>
  )
}

interface CardFieldProps {
  children: ReactNode
  className?: string
  label: ReactNode
}

export function CardField({ children, className, label }: CardFieldProps) {
  return (
    <div className={cn('grid min-w-0 gap-2', className)}>
      <span className="text-sm font-extrabold leading-none text-on-paper">{label}</span>
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
    <div className={cn('grid w-full grid-cols-2 items-center gap-3', className)}>{children}</div>
  )
}
