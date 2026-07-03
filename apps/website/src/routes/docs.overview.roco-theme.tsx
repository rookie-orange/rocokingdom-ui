import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/overview/roco-theme')({
  component: DocsOverviewRocoThemePage,
})

function DocsOverviewRocoThemePage() {
  return <DocsComponentPage path="/docs/overview/roco-theme" />
}
