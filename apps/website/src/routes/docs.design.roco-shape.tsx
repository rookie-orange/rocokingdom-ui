import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/design/roco-shape')({
  component: DocsDesignRocoShapePage,
})

function DocsDesignRocoShapePage() {
  return <DocsComponentPage path="/docs/design/roco-shape" />
}
