import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/checkbox')({
  component: DocsComponentsCheckboxPage,
})

function DocsComponentsCheckboxPage() {
  return <DocsComponentPage path="/docs/components/checkbox" />
}
