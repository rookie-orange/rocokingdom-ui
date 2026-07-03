import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/layout')({
  component: DocsComponentsLayoutPage,
})

function DocsComponentsLayoutPage() {
  return <DocsComponentPage path="/docs/components/layout" />
}
