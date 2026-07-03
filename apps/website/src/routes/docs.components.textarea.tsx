import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/textarea')({
  component: DocsComponentsTextareaPage,
})

function DocsComponentsTextareaPage() {
  return <DocsComponentPage path="/docs/components/textarea" />
}
