import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/radio-group')({
  component: DocsComponentsRadioGroupPage,
})

function DocsComponentsRadioGroupPage() {
  return <DocsComponentPage path="/docs/components/radio-group" />
}
