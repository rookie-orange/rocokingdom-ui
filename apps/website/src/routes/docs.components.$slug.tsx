import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/$slug')({
  component: DocsDynamicComponentPage,
})

function DocsDynamicComponentPage() {
  const { slug } = Route.useParams()
  return <DocsComponentPage path={`/docs/components/${slug}`} />
}
