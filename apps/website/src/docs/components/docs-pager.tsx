import { useNavigate, useRouterState } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from 'rocokingdom-ui'
import { getDocsPager } from '../content/registry'

export function DocsPager() {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const { next, previous } = getDocsPager(pathname)

  if (!next && !previous) {
    return null
  }

  function navigateTo(path: string) {
    void navigate({ to: path })
  }

  return (
    <nav
      aria-label="文档翻页"
      className="grid grid-cols-2 gap-4 border-t border-stone/15 pt-8 max-sm:grid-cols-1"
    >
      {previous ? (
        <Button
          aria-label={`前往 ${previous.label}`}
          className="justify-self-start"
          material="stone"
          onClick={() => navigateTo(previous.to)}
          shadow
          size="large"
        >
          <span className="flex min-w-0 items-center gap-3">
            <ChevronLeft aria-hidden="true" strokeWidth={3} className="shrink-0" size={24} />
            <span className="min-w-0 truncate font-roco text-xl leading-none">
              {previous.label}
            </span>
          </span>
        </Button>
      ) : (
        <span aria-hidden="true" className="max-sm:hidden" />
      )}

      {next ? (
        <Button
          aria-label={`前往 ${next.label}`}
          className="justify-self-end"
          material="stone"
          onClick={() => navigateTo(next.to)}
          shadow
          size="large"
        >
          <span className="flex min-w-0 items-center justify-end gap-3">
            <span className="min-w-0 truncate font-roco text-xl leading-none">{next.label}</span>
            <ChevronRight aria-hidden="true" strokeWidth={3} className="shrink-0" size={24} />
          </span>
        </Button>
      ) : null}
    </nav>
  )
}
