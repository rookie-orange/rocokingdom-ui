import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/switch')({
  component: DocsComponentsSwitchPage,
})

function DocsComponentsSwitchPage() {
  return <DocsComponentPage path="/docs/components/switch" />
}
