import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/button-normal')({
  component: DocsComponentsButtonNormalPage,
})

function DocsComponentsButtonNormalPage() {
  return <DocsComponentPage path="/docs/components/button-normal" />
}
