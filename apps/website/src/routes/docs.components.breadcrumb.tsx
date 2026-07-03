import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/breadcrumb')({
  component: DocsComponentsBreadcrumbPage,
})

function DocsComponentsBreadcrumbPage() {
  return <DocsComponentPage path="/docs/components/breadcrumb" />
}
