import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/space')({
  component: DocsComponentsSpacePage,
})

function DocsComponentsSpacePage() {
  return <DocsComponentPage path="/docs/components/space" />
}
