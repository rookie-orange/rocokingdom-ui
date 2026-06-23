import type { ReactNode } from 'react'
import { Panel, RuneText } from 'rocokingdom-ui'

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
  title,
}: ExampleShellProps) {
  return (
    <article className="mx-auto w-full max-w-6xl px-10 py-14 max-[980px]:px-5 max-[980px]:py-10">
      <section className="grid gap-7 border-b border-stone/15 pb-10">
        <div>
          <p className="text-base font-black text-primary-strong">Component</p>
          <h1 className="mt-3 font-roco text-6xl font-black leading-none text-on-paper max-sm:text-4xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-bold leading-8 text-stone/70">{description}</p>
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
  )
}
