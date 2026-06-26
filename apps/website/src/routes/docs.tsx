import type { CSSProperties } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Outlet, createFileRoute, useNavigate, useRouterState } from '@tanstack/react-router'
import { Button, Panel, ToggleGroup, ToggleItem } from 'rocokingdom-ui'
import {
  componentExamples,
  designExamples,
  iconExamples,
  overviewExamples,
} from '../examples/catalog'

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

const docsSearchLinks = sidebarSections.flatMap((section) =>
  section.links.map((link) => ({
    ...link,
    section: section.title,
  })),
)

interface DocsSidebarLink {
  label: string
  to: string
}

interface DocsSidebarSectionProps {
  links: DocsSidebarLink[]
  onNavigate: (path: string) => void
  pathname: string
  title: string
}

interface DocsSidebarPanelStyle extends CSSProperties {
  '--rk-panel-background'?: string
  '--rk-panel-color'?: string
}

const sidebarPanelStyle: DocsSidebarPanelStyle = {
  '--rk-panel-background': 'var(--rk-stone)',
  '--rk-panel-color': 'var(--rk-on-stone)',
}

const githubUrl = 'https://github.com/rookie-orange/rocokingdom-ui'

export const Route = createFileRoute('/docs')({
  component: DocsLayout,
})

function DocsSidebarSection({ links, onNavigate, pathname, title }: DocsSidebarSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    const activeItem = scrollerRef.current?.querySelector<HTMLElement>(
      '[data-docs-nav-active="true"]',
    )

    if (!scroller || !activeItem) {
      return
    }

    const activeRect = activeItem.getBoundingClientRect()
    const scrollerRect = scroller.getBoundingClientRect()

    scroller.scrollLeft +=
      activeRect.left - scrollerRect.left - (scrollerRect.width - activeRect.width) / 2
  }, [pathname])

  return (
    <div>
      <p className="px-3 font-roco text-2xl font-black leading-none text-primary-strong">{title}</p>
      <div className="mt-2" ref={scrollerRef}>
        <ToggleGroup
          aria-label={`${title} 文档导航`}
          onValueChange={onNavigate}
          orientation="vertical"
          rootClassName="w-full"
          unselectedMaterial="stone"
          selectedMaterial="paper"
          value={links.some((link) => link.to === pathname) ? pathname : ''}
        >
          {links.map((link) => (
            <ToggleItem
              data-docs-nav-active={link.to === pathname || undefined}
              key={link.to}
              value={link.to}
              size="large"
              className="w-full! flex justify-start!"
            >
              {link.label}
            </ToggleItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  )
}

function DocsLayout() {
  const navigate = useNavigate()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  const visibleSearchLinks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (normalizedQuery.length === 0) {
      return docsSearchLinks
    }

    return docsSearchLinks.filter((link) =>
      `${link.section} ${link.label} ${link.to}`.toLowerCase().includes(normalizedQuery),
    )
  }, [searchQuery])

  useEffect(() => {
    if (!isSearchOpen) {
      return
    }

    searchInputRef.current?.focus()

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isSearchOpen])

  function navigateTo(nextPath: string) {
    if (nextPath === pathname) {
      return
    }

    void navigate({ to: nextPath })
  }

  function openGitHub() {
    window.open(githubUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="min-h-svh bg-paper text-on-paper">
      <nav
        aria-label="快捷操作"
        className="fixed right-5 top-5 z-50 flex flex-wrap justify-end gap-2 max-sm:right-3 max-sm:top-3 max-sm:max-w-[calc(100vw-1.5rem)] max-sm:gap-1.5"
      >
        <Button
          aria-label="打开 GitHub"
          material="stone"
          onClick={openGitHub}
          shadow
          size="large"
          title="GitHub"
        >
          GitHub
        </Button>
        <Button
          aria-controls="docs-search-panel"
          aria-expanded={isSearchOpen}
          aria-label="搜索文档"
          material="stone"
          onClick={() => setIsSearchOpen((current) => !current)}
          shadow
          size="large"
          title="搜索"
        >
          Search
        </Button>
        <Button
          aria-label="返回首页"
          material="stone"
          onClick={() => navigateTo('/')}
          shadow
          size="large"
          title="Home"
        >
          Home
        </Button>
        <Button
          aria-label="文档总览"
          material="stone"
          onClick={() => navigateTo('/docs')}
          shadow
          size="large"
          title="Docs"
        >
          Docs
        </Button>
      </nav>

      {isSearchOpen ? (
        <section
          aria-label="搜索文档"
          className="fixed right-5 top-18 z-40 w-[min(calc(100vw-2rem),25rem)] rounded-lg border border-stone/15 bg-paper p-3 text-on-paper shadow-[0_14px_0_var(--shadow-soft-color)] max-sm:right-3 max-sm:top-16 max-sm:w-[calc(100vw-1.5rem)]"
          id="docs-search-panel"
        >
          <label className="sr-only" htmlFor="docs-search-input">
            搜索文档
          </label>
          <div className="flex items-center rounded-lg border border-stone/15 bg-white/55 px-3 py-2">
            <input
              className="min-w-0 flex-1 bg-transparent text-sm font-bold text-on-paper outline-none placeholder:text-stone/45"
              id="docs-search-input"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="搜索文档"
              ref={searchInputRef}
              type="search"
              value={searchQuery}
            />
          </div>
          <div className="mt-3 max-h-[min(28rem,calc(100svh-8rem))] overflow-y-auto pr-1">
            {visibleSearchLinks.length > 0 ? (
              <div className="grid gap-1">
                {visibleSearchLinks.map((link) => (
                  <Link
                    className={[
                      'rounded-lg px-3 py-2 text-sm font-black transition hover:bg-primary hover:text-on-primary',
                      link.to === pathname ? 'bg-stone text-on-stone' : 'text-on-paper',
                    ].join(' ')}
                    key={`${link.section}-${link.to}`}
                    onClick={() => setIsSearchOpen(false)}
                    to={link.to}
                  >
                    <span className="block text-xs leading-none text-primary-strong">
                      {link.section}
                    </span>
                    <span className="mt-1 block leading-5">{link.label}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="px-3 py-4 text-sm font-bold text-stone/60">没有找到相关文档</p>
            )}
          </div>
        </section>
      ) : null}

      <div className="grid grid-cols-[336px_minmax(0,1fr)] max-[980px]:block">
        <aside
          aria-label="文档导航"
          className="sticky top-0 box-border h-svh overflow-visible pr-4 max-[980px]:relative max-[980px]:h-auto max-[980px]:border-b max-[980px]:border-stone/15 max-[980px]:px-5 max-[980px]:pb-5 max-[980px]:pt-18"
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
                  <DocsSidebarSection
                    key={section.title}
                    links={section.links}
                    onNavigate={navigateTo}
                    pathname={pathname}
                    title={section.title}
                  />
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
