import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/divider')({
  component: DocsComponentsDividerPage,
})

function DocsComponentsDividerPage() {
  return <DocsComponentPage path="/docs/components/divider" />
}
