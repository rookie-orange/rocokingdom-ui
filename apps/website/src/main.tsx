import './style/index.css'
import 'rocokingdom-ui/style.css'
import 'rocokingdom-ui/font.css'
import 'rocokingdom-ui/decorative-font.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('Missing #app root.')
}

createRoot(app).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
