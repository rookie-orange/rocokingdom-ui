import './style/index.css'
import 'rocokingdom-ui/style.css'
import { colors } from '@rocokingdom-ui/tokens'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from 'rocokingdom-ui'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app root.')
}

const colorNames = Object.keys(colors) as Array<keyof typeof colors>

function App() {
  return (
    <main className="showcase">
      <section className="showcase__shell">
        <header className="showcase__header">
          <p>Rocokingdom UI</p>
          <h1>Button</h1>
        </header>

        <section aria-labelledby="colors-title" className="showcase__section">
          <h2 id="colors-title">Colors</h2>
          <div aria-label="Colors" className="palette-grid">
            {colorNames.map((color) => (
              <article className={`palette-swatch palette-swatch--${color}`} key={color}>
                <span />
                <strong>{color}</strong>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="button-title" className="showcase__section">
          <h2 id="button-title">Button</h2>
          <div className="button-row">
            {colorNames.map((color) => (
              <Button
                key={color}
                style={{
                  backgroundColor: `var(--${color})`,
                  color: color === 'stone' || color === 'ink' ? 'var(--paper)' : 'var(--ink)',
                }}
              >
                {color}
              </Button>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

createRoot(app).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
