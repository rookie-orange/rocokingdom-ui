import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/side-nav')({
  component: DocsComponentsSideNavPage,
})

function DocsComponentsSideNavPage() {
  return <DocsComponentPage path="/docs/components/side-nav" />
}
