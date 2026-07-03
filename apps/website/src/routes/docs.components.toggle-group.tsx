import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/toggle-group')({
  component: DocsComponentsToggleGroupPage,
})

function DocsComponentsToggleGroupPage() {
  return <DocsComponentPage path="/docs/components/toggle-group" />
}
