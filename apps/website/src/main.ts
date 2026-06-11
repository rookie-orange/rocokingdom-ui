import './style.css'
import { createTokensCss } from '@rocokingdom-ui/tokens'
import {
  buttonClassName,
  buttonCss,
  buttonSizes,
  buttonVariants,
  createButton,
  type ButtonSize,
  type ButtonVariant,
} from 'rocokingdom-ui'

const variantCopy: Record<ButtonVariant, { readonly label: string; readonly title: string }> = {
  primary: {
    title: 'Paper',
    label: 'Start Quest',
  },
  secondary: {
    title: 'Stone',
    label: 'Open Drawer',
  },
  gold: {
    title: 'Gold',
    label: 'Claim Reward',
  },
  ghost: {
    title: 'Ghost',
    label: 'Cancel',
  },
}

const sizeCopy: Record<ButtonSize, string> = {
  sm: 'Small',
  md: 'Medium',
  lg: 'Large',
}

injectDesignSystemStyles()

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app root.')
}

app.innerHTML = `
  <main class="showcase">
    <section class="showcase__shell">
      <header class="showcase__header">
        <p class="showcase__eyebrow">Rocokingdom UI</p>
        <h1>Button System</h1>
      </header>

      <div class="showcase__body">
        <section class="showcase__section" aria-labelledby="variant-title">
          <div class="section-heading">
            <h2 id="variant-title">Variants</h2>
            <button class="${buttonClassName({ variant: 'secondary', size: 'sm' })}" type="button">Stone Action</button>
          </div>
          <div class="button-grid" id="variant-buttons"></div>
        </section>

        <section class="showcase__section" aria-labelledby="size-title">
          <div class="section-heading">
            <h2 id="size-title">Sizes</h2>
          </div>
          <div class="button-row" id="size-buttons"></div>
        </section>

        <section class="showcase__section showcase__section--stone" aria-labelledby="state-title">
          <div class="section-heading">
            <h2 id="state-title">States</h2>
          </div>
          <div class="button-row" id="state-buttons"></div>
        </section>
      </div>
    </section>
  </main>
`

const variantButtons = document.querySelector<HTMLDivElement>('#variant-buttons')
const sizeButtons = document.querySelector<HTMLDivElement>('#size-buttons')
const stateButtons = document.querySelector<HTMLDivElement>('#state-buttons')

if (!variantButtons || !sizeButtons || !stateButtons) {
  throw new Error('Missing button showcase containers.')
}

for (const variant of buttonVariants) {
  const card = document.createElement('article')
  card.className = 'button-card'
  card.innerHTML = `
    <p class="button-card__kicker">${variant}</p>
    <h3>${variantCopy[variant].title}</h3>
  `
  card.append(
    createButton({
      label: variantCopy[variant].label,
      variant,
      size: 'md',
    }),
  )
  variantButtons.append(card)
}

for (const size of buttonSizes) {
  sizeButtons.append(
    createButton({
      label: sizeCopy[size],
      variant: 'primary',
      size,
    }),
  )
}

stateButtons.append(
  createButton({
    label: 'Pressed',
    variant: 'gold',
    size: 'md',
    pressed: true,
  }),
  createButton({
    label: 'Disabled',
    variant: 'primary',
    size: 'md',
    disabled: true,
  }),
  createButton({
    label: 'Stone Disabled',
    variant: 'secondary',
    size: 'md',
    disabled: true,
  }),
)

function injectDesignSystemStyles() {
  const styleId = 'rk-design-system-styles'
  const style =
    document.querySelector<HTMLStyleElement>(`#${styleId}`) ?? document.createElement('style')

  style.id = styleId
  style.textContent = `${createTokensCss()}\n\n${buttonCss}`

  if (!style.parentElement) {
    document.head.append(style)
  }
}
