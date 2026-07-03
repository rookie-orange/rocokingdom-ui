import { createFileRoute } from '@tanstack/react-router'
import { DocsComponentPage } from '../docs/components'

export const Route = createFileRoute('/docs/components/rune-text')({
  component: DocsComponentsRuneTextPage,
})

function DocsComponentsRuneTextPage() {
  return <DocsComponentPage path="/docs/components/rune-text" />
}
