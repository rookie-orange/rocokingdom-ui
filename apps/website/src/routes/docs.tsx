import type { CSSProperties } from 'react'
import { Link, Outlet, createFileRoute, useRouterState } from '@tanstack/react-router'
import { Panel } from 'rocokingdom-ui'
import logoUrl from '../assets/roco-kingdom-logo.png'
import {
  componentExamples,
  designExamples,
  iconExamples,
  overviewExamples,
} from '../examples/catalog'

const themeLinks = [
  {
    isActive: (pathname: string) => pathname === '/docs' || pathname.startsWith('/docs/overview'),
    label: 'Overview',
    to: '/docs',
  },
  {
    isActive: (pathname: string) => pathname.startsWith('/docs/design'),
    label: 'Design',
    to: '/docs/design/roco-shape',
  },
  {
    isActive: (pathname: string) => pathname.startsWith('/docs/components'),
    label: 'Components',
    to: '/docs/components/button',
  },
  {
    isActive: (pathname: string) => pathname.startsWith('/docs/icon'),
    label: 'Icon',
    to: '/docs/icon',
  },
]

const overviewLinks = [
  {
    label: '快速开始',
    to: '/docs',
  },
  {
    label: '组件总览',
    to: '/docs/overview/components',
  },
  ...overviewExamples.map((example) => ({
    label: example.name,
    to: example.path,
  })),
]

const sidebarSections = [
  {
    links: overviewLinks,
    title: 'Overview',
  },
  {
    links: designExamples.map((example) => ({
      label: example.name,
      to: example.path,
    })),
    title: 'Design',
  },
  {
    links: componentExamples.map((example) => ({
      label: example.name,
      to: example.path,
    })),
    title: 'Components',
  },
  {
    links: iconExamples.map((example) => ({
      label: example.name,
      to: example.path,
    })),
    title: 'Icon',
  },
]

interface DocsSidebarPanelStyle extends CSSProperties {
  '--rk-panel-background'?: string
  '--rk-panel-color'?: string
}

const sidebarPanelStyle: DocsSidebarPanelStyle = {
  '--rk-panel-background': '#fff9ec',
  '--rk-panel-color': 'var(--on-paper)',
}

export const Route = createFileRoute('/docs')({
  component: DocsLayout,
})

function DocsLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  return (
    <main className="min-h-svh bg-paper text-on-paper">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-6 border-b border-stone/15 bg-stone px-8 text-on-stone max-[860px]:gap-4 max-[860px]:px-5">
        <Link aria-label="返回首页" className="inline-flex shrink-0 items-center" to="/">
          <img
            alt=""
            className="h-9 w-auto object-contain max-[480px]:h-8"
            height={295}
            src={logoUrl}
            width={851}
          />
        </Link>
        <nav
          aria-label="文档主题"
          className="flex min-w-0 items-center gap-2 overflow-x-auto max-[860px]:justify-end"
        >
          {themeLinks.map((link) => (
            <Link
              className={[
                'shrink-0 rounded-lg px-3 py-2 text-sm font-black transition hover:bg-paper hover:text-on-paper',
                link.isActive(pathname) ? 'bg-paper text-on-paper' : 'text-on-stone/75',
              ].join(' ')}
              key={link.to}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="grid grid-cols-[336px_minmax(0,1fr)] max-[980px]:block">
        <aside
          aria-label="文档导航"
          className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-visible pr-4 max-[980px]:relative max-[980px]:top-0 max-[980px]:h-auto max-[980px]:border-b max-[980px]:border-stone/15 max-[980px]:px-5 max-[980px]:py-5"
        >
          <Panel
            className="h-full min-h-0 [--docs-sidebar-curve-inset:34px] max-[980px]:h-auto max-[980px]:[--docs-sidebar-curve-inset:24px]"
            contentClassName="flex h-full min-h-0 !p-0 max-[980px]:h-auto"
            curve="right"
            curveInset="var(--docs-sidebar-curve-inset)"
            style={sidebarPanelStyle}
          >
            <div className="box-border scrollbar-none h-full w-[calc(100%-var(--docs-sidebar-curve-inset))] min-w-0 overflow-y-auto px-6 py-8 max-[980px]:h-auto max-[980px]:px-5 max-[980px]:py-5">
              <nav className="grid gap-7 max-[980px]:gap-5">
                {sidebarSections.map((section) => (
                  <div key={section.title}>
                    <p className="px-3 font-roco text-2xl font-black leading-none text-primary-strong">
                      {section.title}
                    </p>
                    <div className="mt-2 grid gap-2 max-[980px]:flex max-[980px]:overflow-x-auto max-[980px]:pb-1">
                      {section.links.map((link) => (
                        <Link
                          activeOptions={{ exact: true }}
                          activeProps={{
                            className: 'bg-primary-strong text-on-primary-strong',
                          }}
                          className="rounded-lg px-3 py-2 text-base font-black text-stone/70 transition hover:bg-primary-muted hover:text-on-primary-muted max-[980px]:shrink-0"
                          key={link.to}
                          to={link.to}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </Panel>
        </aside>

        <Outlet />
      </div>
    </main>
  )
}
