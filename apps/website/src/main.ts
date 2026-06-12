import './style.css'
import { colors, tokensCss } from '@rocokingdom-ui/tokens'
import { buttonCss, createButton } from 'rocokingdom-ui'

injectDesignSystemStyles()

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app root.')
}

app.innerHTML = `
  <main class="showcase">
    <section class="showcase__shell">
      <header class="showcase__header">
        <p>Rocokingdom UI</p>
        <h1>Button</h1>
      </header>

      <section class="showcase__section" aria-labelledby="colors-title">
        <h2 id="colors-title">Colors</h2>
        <div class="palette-grid" aria-label="Colors">
          <article class="palette-swatch palette-swatch--paper">
            <span></span>
            <strong>paper</strong>
          </article>
          <article class="palette-swatch palette-swatch--stone">
            <span></span>
            <strong>stone</strong>
          </article>
          <article class="palette-swatch palette-swatch--ink">
            <span></span>
            <strong>ink</strong>
          </article>
          <article class="palette-swatch palette-swatch--gold">
            <span></span>
            <strong>gold</strong>
          </article>
        </div>
      </section>

      <section class="showcase__section" aria-labelledby="button-title">
        <h2 id="button-title">Button</h2>
        <div class="button-row" id="button-row"></div>
      </section>
    </section>
  </main>
`

const buttonRow = document.querySelector<HTMLDivElement>('#button-row')

if (!buttonRow) {
  throw new Error('Missing button container.')
}

for (const color of Object.keys(colors)) {
  const button = createButton(color)

  button.style.backgroundColor = `var(--${color})`
  button.style.color = color === 'stone' || color === 'ink' ? 'var(--paper)' : 'var(--ink)'
  buttonRow.append(button)
}

function injectDesignSystemStyles() {
  const styleId = 'rk-design-system-styles'
  const style =
    document.querySelector<HTMLStyleElement>(`#${styleId}`) ?? document.createElement('style')

  style.id = styleId
  style.textContent = `${tokensCss}\n\n${buttonCss}`

  if (!style.parentElement) {
    document.head.append(style)
  }
}
