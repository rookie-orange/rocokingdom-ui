import { createFileRoute, redirect } from '@tanstack/react-router'
import { getExampleBySlug } from '../examples/catalog'

export const Route = createFileRoute('/examples/$slug')({
  beforeLoad: ({ params }) => {
    const example = getExampleBySlug(params.slug)

    throw redirect({ to: example?.path ?? '/docs/components' })
  },
})
