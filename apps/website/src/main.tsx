import './style/index.css'
import 'rocokingdom-ui/style.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Button } from 'rocokingdom-ui'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app root.')
}

function App() {
  return (
    <main className="showcase">
      <section className="showcase__shell">
        <header className="showcase__header">
          <p>Rocokingdom UI</p>
          <h1>Button</h1>
        </header>

        <section aria-labelledby="button-title" className="showcase__section">
          <h2 id="button-title">Button</h2>
          <div className="button-row">
            <Button>Default</Button>
            <Button material="paper">Paper</Button>
            <Button material="stone">Stone</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
            <Button rootClassName="showcase__danger-button">Danger</Button>
            <Button disabled>Disabled</Button>
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
