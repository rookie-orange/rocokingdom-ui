import { component, cssVar } from '@rocokingdom-ui/tokens'

export const buttonTokens = component.button

export const buttonVariants = ['primary', 'secondary', 'gold', 'ghost'] as const
export const buttonSizes = ['sm', 'md', 'lg'] as const

export type ButtonVariant = (typeof buttonVariants)[number]
export type ButtonSize = (typeof buttonSizes)[number]

export type ButtonClassOptions = {
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly disabled?: boolean
  readonly pressed?: boolean
  readonly className?: string
}

export type ButtonAttributeValue = string | number | boolean | undefined

export type CreateButtonOptions = ButtonClassOptions & {
  readonly label?: string
  readonly type?: 'button' | 'submit' | 'reset'
  readonly leadingIcon?: Node | string
  readonly trailingIcon?: Node | string
  readonly attributes?: Record<string, ButtonAttributeValue>
  readonly onClick?: (event: MouseEvent) => void
}

const baseClassName = 'rk-button'

export function buttonClassName(options: ButtonClassOptions = {}) {
  const variant = options.variant ?? 'primary'
  const size = options.size ?? 'md'
  const classes = [baseClassName, `${baseClassName}--${variant}`, `${baseClassName}--${size}`]

  if (options.disabled) {
    classes.push(`${baseClassName}--disabled`)
  }

  if (options.pressed) {
    classes.push(`${baseClassName}--pressed`)
  }

  if (options.className) {
    classes.push(options.className)
  }

  return classes.join(' ')
}

export function createButton(options: CreateButtonOptions = {}) {
  const button = document.createElement('button')

  button.type = options.type ?? 'button'
  button.className = buttonClassName(options)

  if (options.disabled) {
    button.disabled = true
    button.setAttribute('aria-disabled', 'true')
  }

  if (options.pressed !== undefined) {
    button.setAttribute('aria-pressed', String(options.pressed))
    button.dataset.pressed = String(options.pressed)
  }

  if (options.attributes) {
    for (const [name, value] of Object.entries(options.attributes)) {
      if (value !== undefined) {
        button.setAttribute(name, String(value))
      }
    }
  }

  appendButtonSlot(button, options.leadingIcon, `${baseClassName}__icon`)
  appendButtonLabel(button, options.label)
  appendButtonSlot(button, options.trailingIcon, `${baseClassName}__icon`)

  if (options.onClick) {
    button.addEventListener('click', options.onClick)
  }

  return button
}

export const buttonCss = `
.rk-button {
  --rk-button-height: ${cssVar('button.size.md.height', buttonTokens.size.md.height)};
  --rk-button-padding-x: ${cssVar('button.size.md.paddingX', buttonTokens.size.md.paddingX)};
  --rk-button-gap: ${cssVar('button.size.md.gap', buttonTokens.size.md.gap)};
  --rk-button-font-size: ${cssVar('button.size.md.fontSize', buttonTokens.size.md.fontSize)};
  --rk-button-background: ${cssVar('button.variant.primary.background', buttonTokens.variant.primary.background)};
  --rk-button-background-hover: ${cssVar('button.variant.primary.backgroundHover', buttonTokens.variant.primary.backgroundHover)};
  --rk-button-background-active: ${cssVar('button.variant.primary.backgroundActive', buttonTokens.variant.primary.backgroundActive)};
  --rk-button-color: ${cssVar('button.variant.primary.color', buttonTokens.variant.primary.color)};
  --rk-button-border: ${cssVar('button.variant.primary.border', buttonTokens.variant.primary.border)};
  --rk-button-edge: ${cssVar('button.variant.primary.edge', buttonTokens.variant.primary.edge)};
  align-items: center;
  appearance: none;
  background: var(--rk-button-background);
  border: ${cssVar('button.base.borderWidth', buttonTokens.base.borderWidth)} solid var(--rk-button-border);
  border-bottom-width: ${cssVar('button.base.bottomEdge', buttonTokens.base.bottomEdge)};
  border-radius: ${cssVar('button.base.radius', buttonTokens.base.radius)};
  box-shadow: 0 ${cssVar('button.base.bottomEdge', buttonTokens.base.bottomEdge)} 0 var(--rk-button-edge);
  color: var(--rk-button-color);
  cursor: pointer;
  display: inline-flex;
  font-family: ${cssVar('button.base.fontFamily', buttonTokens.base.fontFamily)};
  font-size: var(--rk-button-font-size);
  font-weight: ${cssVar('button.base.fontWeight', buttonTokens.base.fontWeight)};
  gap: var(--rk-button-gap);
  justify-content: center;
  letter-spacing: ${cssVar('button.base.letterSpacing', buttonTokens.base.letterSpacing)};
  line-height: 1;
  min-height: var(--rk-button-height);
  padding: 0 var(--rk-button-padding-x);
  position: relative;
  text-decoration: none;
  transform: translateY(0);
  transition:
    background-color ${cssVar('motion.duration.fast', '120ms')} ${cssVar('motion.easing.standard', 'cubic-bezier(0.2, 0, 0, 1)')},
    box-shadow ${cssVar('motion.duration.fast', '120ms')} ${cssVar('motion.easing.standard', 'cubic-bezier(0.2, 0, 0, 1)')},
    transform ${cssVar('motion.duration.fast', '120ms')} ${cssVar('motion.easing.press', 'cubic-bezier(0.34, 1.56, 0.64, 1)')};
  user-select: none;
  white-space: nowrap;
}

.rk-button:hover:not(:disabled, [aria-disabled="true"]) {
  background: var(--rk-button-background-hover);
}

.rk-button:active:not(:disabled, [aria-disabled="true"]),
.rk-button--pressed,
.rk-button[data-pressed="true"] {
  background: var(--rk-button-background-active);
  box-shadow: 0 0 0 var(--rk-button-edge);
  transform: translateY(${cssVar('button.base.bottomEdge', buttonTokens.base.bottomEdge)});
}

.rk-button:focus-visible {
  outline: 0;
  box-shadow:
    0 ${cssVar('button.base.bottomEdge', buttonTokens.base.bottomEdge)} 0 var(--rk-button-edge),
    ${cssVar('shadow.focus', '0 0 0 3px rgb(246 207 109 / 36%)')};
}

.rk-button:disabled,
.rk-button[aria-disabled="true"],
.rk-button--disabled {
  background: ${cssVar('disabled.background', '#ebe6dc')};
  border-color: ${cssVar('border.light', '#d9d2c5')};
  box-shadow: 0 ${cssVar('button.base.bottomEdge', buttonTokens.base.bottomEdge)} 0 ${cssVar('disabled.edge', '#cfc7b8')};
  color: ${cssVar('disabled.color', '#9a9a9a')};
  cursor: not-allowed;
  opacity: ${cssVar('opacity.disabled', '0.48')};
  transform: none;
}

.rk-button--sm {
  --rk-button-height: ${cssVar('button.size.sm.height', buttonTokens.size.sm.height)};
  --rk-button-padding-x: ${cssVar('button.size.sm.paddingX', buttonTokens.size.sm.paddingX)};
  --rk-button-gap: ${cssVar('button.size.sm.gap', buttonTokens.size.sm.gap)};
  --rk-button-font-size: ${cssVar('button.size.sm.fontSize', buttonTokens.size.sm.fontSize)};
}

.rk-button--md {
  --rk-button-height: ${cssVar('button.size.md.height', buttonTokens.size.md.height)};
  --rk-button-padding-x: ${cssVar('button.size.md.paddingX', buttonTokens.size.md.paddingX)};
  --rk-button-gap: ${cssVar('button.size.md.gap', buttonTokens.size.md.gap)};
  --rk-button-font-size: ${cssVar('button.size.md.fontSize', buttonTokens.size.md.fontSize)};
}

.rk-button--lg {
  --rk-button-height: ${cssVar('button.size.lg.height', buttonTokens.size.lg.height)};
  --rk-button-padding-x: ${cssVar('button.size.lg.paddingX', buttonTokens.size.lg.paddingX)};
  --rk-button-gap: ${cssVar('button.size.lg.gap', buttonTokens.size.lg.gap)};
  --rk-button-font-size: ${cssVar('button.size.lg.fontSize', buttonTokens.size.lg.fontSize)};
}

.rk-button--primary {
  --rk-button-background: ${cssVar('button.variant.primary.background', buttonTokens.variant.primary.background)};
  --rk-button-background-hover: ${cssVar('button.variant.primary.backgroundHover', buttonTokens.variant.primary.backgroundHover)};
  --rk-button-background-active: ${cssVar('button.variant.primary.backgroundActive', buttonTokens.variant.primary.backgroundActive)};
  --rk-button-color: ${cssVar('button.variant.primary.color', buttonTokens.variant.primary.color)};
  --rk-button-border: ${cssVar('button.variant.primary.border', buttonTokens.variant.primary.border)};
  --rk-button-edge: ${cssVar('button.variant.primary.edge', buttonTokens.variant.primary.edge)};
}

.rk-button--secondary {
  --rk-button-background: ${cssVar('button.variant.secondary.background', buttonTokens.variant.secondary.background)};
  --rk-button-background-hover: ${cssVar('button.variant.secondary.backgroundHover', buttonTokens.variant.secondary.backgroundHover)};
  --rk-button-background-active: ${cssVar('button.variant.secondary.backgroundActive', buttonTokens.variant.secondary.backgroundActive)};
  --rk-button-color: ${cssVar('button.variant.secondary.color', buttonTokens.variant.secondary.color)};
  --rk-button-border: ${cssVar('button.variant.secondary.border', buttonTokens.variant.secondary.border)};
  --rk-button-edge: ${cssVar('button.variant.secondary.edge', buttonTokens.variant.secondary.edge)};
}

.rk-button--gold {
  --rk-button-background: ${cssVar('button.variant.gold.background', buttonTokens.variant.gold.background)};
  --rk-button-background-hover: ${cssVar('button.variant.gold.backgroundHover', buttonTokens.variant.gold.backgroundHover)};
  --rk-button-background-active: ${cssVar('button.variant.gold.backgroundActive', buttonTokens.variant.gold.backgroundActive)};
  --rk-button-color: ${cssVar('button.variant.gold.color', buttonTokens.variant.gold.color)};
  --rk-button-border: ${cssVar('button.variant.gold.border', buttonTokens.variant.gold.border)};
  --rk-button-edge: ${cssVar('button.variant.gold.edge', buttonTokens.variant.gold.edge)};
}

.rk-button--ghost {
  --rk-button-background: ${cssVar('button.variant.ghost.background', buttonTokens.variant.ghost.background)};
  --rk-button-background-hover: ${cssVar('button.variant.ghost.backgroundHover', buttonTokens.variant.ghost.backgroundHover)};
  --rk-button-background-active: ${cssVar('button.variant.ghost.backgroundActive', buttonTokens.variant.ghost.backgroundActive)};
  --rk-button-color: ${cssVar('button.variant.ghost.color', buttonTokens.variant.ghost.color)};
  --rk-button-border: ${cssVar('button.variant.ghost.border', buttonTokens.variant.ghost.border)};
  --rk-button-edge: ${cssVar('button.variant.ghost.edge', buttonTokens.variant.ghost.edge)};
}

.rk-button__icon {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
  height: 1.1em;
  justify-content: center;
  width: 1.1em;
}

.rk-button__label {
  overflow: hidden;
  text-overflow: ellipsis;
}
`.trim()

function appendButtonLabel(button: HTMLButtonElement, label: string | undefined) {
  if (!label) {
    return
  }

  const labelElement = document.createElement('span')
  labelElement.className = `${baseClassName}__label`
  labelElement.textContent = label
  button.append(labelElement)
}

function appendButtonSlot(
  button: HTMLButtonElement,
  slot: Node | string | undefined,
  className: string,
) {
  if (!slot) {
    return
  }

  const slotElement = document.createElement('span')
  slotElement.className = className

  if (typeof slot === 'string') {
    slotElement.textContent = slot
  } else {
    slotElement.append(slot)
  }

  button.append(slotElement)
}
