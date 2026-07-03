import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/panel')({
  component: DocsComponentsPanelPage,
})

function DocsComponentsPanelPage() {
  return <DocsComponentPage path="/docs/components/panel" />
}
