import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/slider')({
  component: DocsComponentsSliderPage,
})

function DocsComponentsSliderPage() {
  return <DocsComponentPage path="/docs/components/slider" />
}
