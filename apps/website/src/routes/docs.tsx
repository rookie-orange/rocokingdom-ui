import { Link, createFileRoute } from '@tanstack/react-router'
import { examples } from '../examples/catalog'

const toneClasses = [
  'border-primary/35 bg-primary/15 text-on-paper',
  'border-primary-muted/45 bg-primary-soft text-on-primary-soft',
  'border-primary-strong/35 bg-primary-muted/20 text-primary-strong',
  'border-success/35 bg-success/15 text-success',
  'border-danger/35 bg-danger/15 text-danger',
]

const markerClasses = [
  'bg-primary',
  'bg-primary-muted',
  'bg-primary-strong',
  'bg-success',
  'bg-danger',
]

export const Route = createFileRoute('/docs')({
  component: DocsPage,
})

function DocsPage() {
  return (
    <main className="min-h-svh bg-paper text-on-paper">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-6 border-b border-stone/15 bg-stone px-8 text-on-stone max-[860px]:gap-4 max-[860px]:px-5">
        <Link
          aria-label="返回首页"
          className="inline-flex items-center gap-3 font-roco text-2xl font-black"
          to="/"
        >
          <span>洛克王国:UI</span>
        </Link>
        <label className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-primary/30 bg-paper px-4 py-3 max-[860px]:max-w-none">
          <span className="whitespace-nowrap text-sm font-black text-primary-strong">搜索组件</span>
          <input
            aria-label="搜索组件"
            className="min-w-0 flex-1 border-0 bg-transparent text-base font-bold text-on-paper outline-none placeholder:text-stone/45"
            placeholder="搜索组件..."
            type="search"
          />
        </label>
      </header>

      <div className="flex max-[860px]:block">
        <aside
          aria-label="组件列表"
          className="sticky top-14 h-[calc(100svh-3.5rem)] w-72 shrink-0 border-r border-stone/15 bg-[linear-gradient(180deg,rgb(255_255_255_/_0.44),rgb(47_125_209_/_0.08))] px-8 py-8 max-[860px]:relative max-[860px]:top-0 max-[860px]:h-auto max-[860px]:w-full max-[860px]:border-r-0 max-[860px]:border-b max-[860px]:px-5 max-[860px]:py-5"
        >
          <a className="font-roco text-3xl font-black leading-none text-on-paper" href="#overview">
            组件
          </a>
          <nav className="mt-8 grid gap-2 max-[860px]:mt-5 max-[860px]:flex max-[860px]:overflow-x-auto max-[860px]:pb-1">
            {examples.map((component) => (
              <Link
                className="rounded-lg px-3 py-2 text-base font-black text-stone/70 transition hover:bg-primary-muted hover:text-on-primary-muted max-[860px]:shrink-0"
                key={component.slug}
                to={component.path}
              >
                {component.name}
              </Link>
            ))}
          </nav>
        </aside>

        <article className="mx-auto w-full max-w-5xl px-10 py-20 max-[860px]:px-5 max-[860px]:py-12">
          <section className="border-b border-stone/15 pb-12" id="overview">
            <p className="text-base font-black text-primary-strong">文档</p>
            <h1 className="mt-3 font-roco text-7xl font-black leading-none text-on-paper max-sm:text-5xl">
              组件说明
            </h1>
            <span className="mt-6 block max-w-2xl text-lg font-bold leading-8 text-stone/70">
              这里集中展示组件入口。每个组件都有独立示例路由，覆盖主要材质、状态、交互和组合用法。
            </span>
            <div className="mt-8">
              <Link
                className="inline-flex rounded-lg bg-primary-strong px-4 py-3 text-base font-black text-on-primary-strong transition hover:brightness-105"
                to="/examples"
              >
                查看全部示例
              </Link>
            </div>
          </section>

          <div className="mt-4 grid gap-0">
            {examples.map((component, index) => (
              <section className="border-b border-stone/15 py-10" key={component.slug}>
                <p
                  className={[
                    'inline-flex rounded-md border px-2 py-1 text-sm font-black',
                    toneClasses[index % toneClasses.length],
                  ].join(' ')}
                >
                  Component
                </p>
                <h2 className="mt-3 font-roco text-4xl font-black leading-tight text-on-paper">
                  <span
                    aria-hidden="true"
                    className={[
                      'mr-3 inline-block size-3 rounded-full align-middle',
                      markerClasses[index % markerClasses.length],
                    ].join(' ')}
                  />
                  <span>{component.name}</span>
                </h2>
                <span className="mt-4 block text-lg font-bold leading-8 text-stone/70">
                  {component.description}
                </span>
                <Link
                  className="mt-5 inline-flex rounded-lg bg-stone px-4 py-3 text-base font-black text-on-stone transition hover:bg-primary-strong hover:text-on-primary-strong"
                  key={component.name}
                  to={component.path}
                >
                  打开示例
                </Link>
              </section>
            ))}
          </div>
        </article>
      </div>
    </main>
  )
}
