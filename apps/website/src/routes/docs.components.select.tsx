import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/select')({
  component: DocsComponentsSelectPage,
})

function DocsComponentsSelectPage() {
  return <DocsComponentPage path="/docs/components/select" />
}
