import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/examples')({
  component: ExamplesLayout,
})

function ExamplesLayout() {
  return <Outlet />
}
