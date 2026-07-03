import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/design/material')({
  component: DocsDesignMaterialPage,
})

function DocsDesignMaterialPage() {
  return <DocsComponentPage path="/docs/design/material" />
}
