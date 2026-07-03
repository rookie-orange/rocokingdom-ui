import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/drawer')({
  component: DocsComponentsDrawerPage,
})

function DocsComponentsDrawerPage() {
  return <DocsComponentPage path="/docs/components/drawer" />
}
