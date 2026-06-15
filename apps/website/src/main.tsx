import './style/index.css'
import 'rocokingdom-ui/style.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Button, ButtonNormal } from 'rocokingdom-ui'

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
            <Button material="paper">确定</Button>
            <Button>Default</Button>
            <Button material="paper">Paper</Button>
            <Button material="stone">Stone</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="text">Text</Button>
            <Button rootClassName="showcase__danger-button">Danger</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section aria-labelledby="button-normal-title" className="showcase__section">
          <h2 id="button-normal-title">Button Normal</h2>
          <div className="button-row">
            <ButtonNormal>Default</ButtonNormal>
            <ButtonNormal material="paper">Paper</ButtonNormal>
            <ButtonNormal material="stone">Stone</ButtonNormal>
            <ButtonNormal variant="outline">Outline</ButtonNormal>
            <ButtonNormal variant="text">Text</ButtonNormal>
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
