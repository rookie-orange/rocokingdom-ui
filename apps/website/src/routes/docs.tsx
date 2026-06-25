import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import logoUrl from '../assets/roco-kingdom-logo.png'
import { examples } from '../examples/catalog'

const themeLinks = [
  {
    label: 'Overview',
    to: '/docs',
  },
  {
    label: 'Components',
    to: '/docs/components',
  },
]

export const Route = createFileRoute('/docs')({
  component: DocsLayout,
})

function DocsLayout() {
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
              activeOptions={{ exact: link.to === '/docs' }}
              activeProps={{
                className: 'bg-paper text-on-paper',
              }}
              className="shrink-0 rounded-lg px-3 py-2 text-sm font-black text-on-stone/75 transition hover:bg-paper hover:text-on-paper"
              key={link.to}
              to={link.to}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="grid grid-cols-[280px_minmax(0,1fr)] max-[980px]:block">
        <aside
          aria-label="文档导航"
          className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto border-r border-stone/15 bg-[linear-gradient(180deg,rgb(255_255_255_/_0.5),rgb(47_125_209_/_0.08))] px-6 py-8 max-[980px]:relative max-[980px]:top-0 max-[980px]:h-auto max-[980px]:border-r-0 max-[980px]:border-b max-[980px]:px-5 max-[980px]:py-5"
        >
          <nav className="grid gap-7 max-[980px]:gap-5">
            <div>
              <p className="px-3 font-roco text-2xl font-black leading-none text-primary-strong">
                Overview
              </p>
              <Link
                activeOptions={{ exact: true }}
                activeProps={{
                  className: 'bg-primary-strong text-on-primary-strong',
                }}
                className="mt-2 block rounded-lg px-3 py-2 text-base font-black text-stone/70 transition hover:bg-primary-muted hover:text-on-primary-muted"
                to="/docs"
              >
                快速开始
              </Link>
            </div>

            <div>
              <p className="px-3 font-roco text-2xl font-black leading-none text-primary-strong">
                Components
              </p>
              <div className="mt-2 grid gap-2 max-[980px]:flex max-[980px]:overflow-x-auto max-[980px]:pb-1">
                <Link
                  activeOptions={{ exact: true }}
                  activeProps={{
                    className: 'bg-primary-strong text-on-primary-strong',
                  }}
                  className="rounded-lg px-3 py-2 text-base font-black text-stone/70 transition hover:bg-primary-muted hover:text-on-primary-muted max-[980px]:shrink-0"
                  to="/docs/components"
                >
                  组件总览
                </Link>
                <Link
                  activeOptions={{ exact: true }}
                  activeProps={{
                    className: 'bg-primary-strong text-on-primary-strong',
                  }}
                  className="rounded-lg px-3 py-2 text-base font-black text-stone/70 transition hover:bg-primary-muted hover:text-on-primary-muted max-[980px]:shrink-0"
                  to="/docs/components/todo"
                >
                  组件待办
                </Link>
                {examples.map((component) => (
                  <Link
                    activeOptions={{ exact: true }}
                    activeProps={{
                      className: 'bg-primary-strong text-on-primary-strong',
                    }}
                    className="rounded-lg px-3 py-2 text-base font-black text-stone/70 transition hover:bg-primary-muted hover:text-on-primary-muted max-[980px]:shrink-0"
                    key={component.slug}
                    to={component.path}
                  >
                    {component.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </aside>

        <Outlet />
      </div>
    </main>
  )
}
