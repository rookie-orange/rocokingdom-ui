import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/input')({
  component: DocsComponentsInputPage,
})

function DocsComponentsInputPage() {
  return <DocsComponentPage path="/docs/components/input" />
}
