import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/modal')({
  component: DocsComponentsModalPage,
})

function DocsComponentsModalPage() {
  return <DocsComponentPage path="/docs/components/modal" />
}
