import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/badge')({
  component: DocsComponentsBadgePage,
})

function DocsComponentsBadgePage() {
  return <DocsComponentPage path="/docs/components/badge" />
}
