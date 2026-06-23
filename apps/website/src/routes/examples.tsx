import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/examples')({
  beforeLoad: () => {
    throw redirect({ to: '/docs/components' })
  },
})
