import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/button')({
  component: DocsComponentsButtonPage,
})

function DocsComponentsButtonPage() {
  return <DocsComponentPage path="/docs/components/button" />
}
