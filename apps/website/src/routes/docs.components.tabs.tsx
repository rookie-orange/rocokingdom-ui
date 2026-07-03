import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/tabs')({
  component: DocsComponentsTabsPage,
})

function DocsComponentsTabsPage() {
  return <DocsComponentPage path="/docs/components/tabs" />
}
