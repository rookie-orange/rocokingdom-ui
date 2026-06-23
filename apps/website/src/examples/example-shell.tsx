import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { Panel, RuneText } from 'rocokingdom-ui'
import { examples } from './catalog'

const highlightMarkers = [
  'bg-primary',
  'bg-primary-muted',
  'bg-primary-strong',
  'bg-success',
  'bg-danger',
]

export interface ExampleShellProps {
  children: ReactNode
  code?: string
  description: string
  highlights: readonly string[]
  slug: string
  title: string
}

interface ExampleSectionProps {
  children: ReactNode
  description?: string
  title: string
}

export function ExampleSection({ children, description, title }: ExampleSectionProps) {
  return (
    <section className="grid gap-5">
      <div>
        <p className="text-sm font-black text-primary-strong">Example</p>
        <h2 className="mt-2 font-roco text-3xl font-black leading-none text-on-paper max-sm:text-2xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 max-w-2xl text-base font-bold leading-7 text-stone/70">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function PreviewSurface({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-56 rounded-lg border border-stone/15 bg-[linear-gradient(135deg,rgb(255_255_255_/_0.54),rgb(255_198_95_/_0.14))] p-6 shadow-[0_14px_0_var(--shadow-soft-color)] max-sm:p-4">
      {children}
    </div>
  )
}

export function ExampleShell({
  children,
  code,
  description,
  highlights,
  slug,
  title,
}: ExampleShellProps) {
  return (
    <main className="min-h-svh bg-paper text-on-paper">
      <header className="sticky top-0 z-30 flex min-h-20 items-center justify-between gap-6 border-b border-stone/15 bg-stone px-8 text-on-stone max-[900px]:flex-wrap max-[900px]:px-5 max-[900px]:py-4">
        <Link className="font-roco text-2xl font-black leading-none" to="/docs">
          洛克王国:UI
        </Link>
        <nav
          aria-label="示例快速导航"
          className="flex items-center gap-2 overflow-x-auto max-[900px]:w-full"
        >
          <Link
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-black text-on-stone/75 transition hover:bg-paper hover:text-on-paper"
            to="/docs"
          >
            文档
          </Link>
          <Link
            className="shrink-0 rounded-lg bg-primary-strong px-3 py-2 text-sm font-black text-on-primary-strong transition hover:brightness-105"
            to="/examples"
          >
            示例总览
          </Link>
        </nav>
      </header>

      <div className="grid grid-cols-[280px_minmax(0,1fr)] max-[980px]:block">
        <aside
          aria-label="组件示例"
          className="sticky top-20 h-[calc(100svh-5rem)] border-r border-stone/15 px-6 py-8 max-[980px]:relative max-[980px]:top-0 max-[980px]:h-auto max-[980px]:border-r-0 max-[980px]:border-b max-[980px]:px-5 max-[980px]:py-5"
        >
          <p className="font-roco text-3xl font-black leading-none">Examples</p>
          <div className="mt-7 grid gap-2 max-[980px]:mt-4 max-[980px]:flex max-[980px]:overflow-x-auto max-[980px]:pb-1">
            {examples.map((example) => (
              <Link
                className={[
                  'rounded-lg px-3 py-2 text-base font-black transition max-[980px]:shrink-0',
                  example.slug === slug
                    ? 'bg-primary-strong text-on-primary-strong'
                    : 'text-stone/70 hover:bg-primary-muted hover:text-on-primary-muted',
                ].join(' ')}
                key={example.slug}
                to={example.path}
              >
                {example.name}
              </Link>
            ))}
          </div>
        </aside>

        <article className="mx-auto w-full max-w-6xl px-10 py-14 max-[980px]:px-5 max-[980px]:py-10">
          <section className="grid gap-7 border-b border-stone/15 pb-10">
            <div>
              <p className="text-base font-black text-primary-strong">Component Example</p>
              <h1 className="mt-3 font-roco text-6xl font-black leading-none text-on-paper max-sm:text-4xl">
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-stone/70">
                {description}
              </p>
            </div>
            <Panel material="stone" className="max-w-3xl" contentClassName="p-6 max-sm:p-5">
              <RuneText aria-hidden="true" className="block text-sm leading-none text-primary/80">
                COVERAGE
              </RuneText>
              <ul className="mt-4 grid gap-2 text-base font-black leading-7 text-on-stone/90">
                {highlights.map((highlight, index) => (
                  <li className="flex gap-3" key={highlight}>
                    <span
                      className={[
                        'mt-2 size-2 shrink-0 rounded-full',
                        highlightMarkers[index % highlightMarkers.length],
                      ].join(' ')}
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </section>

          <div className="grid gap-12 py-12">{children}</div>

          {code ? (
            <section className="border-t border-stone/15 pt-10">
              <div>
                <p className="text-sm font-black text-danger">Code</p>
                <h2 className="mt-2 font-roco text-3xl font-black leading-none text-on-paper">
                  最小用法
                </h2>
              </div>
              <pre className="mt-5 overflow-x-auto rounded-lg bg-stone p-5 text-sm font-bold leading-6 text-on-stone shadow-[0_10px_0_var(--shadow-color)]">
                <code>{code}</code>
              </pre>
            </section>
          ) : null}
        </article>
      </div>
    </main>
  )
}
