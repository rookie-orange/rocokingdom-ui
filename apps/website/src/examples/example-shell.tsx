import type { ReactNode } from 'react'
import { RuneText, Material } from 'rocokingdom-ui'

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
    <div className="min-h-56 rounded-lg border border-stone/15 bg-[linear-gradient(135deg,rgb(255_255_255_/_0.54),rgb(255_198_95_/_0.14))] p-6 shadow-[0_14px_0_var(--rk-shadow-soft-color)] max-sm:p-4">
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
    <article className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl px-10 py-14 max-[980px]:px-5 max-[980px]:py-10">
        <section className="border-b border-stone/15 pb-10">
          <Material
            material="paper"
            className="flex p-2 border-stone min-h-[248px] w-full flex-col overflow-hidden rounded-xl border bg-paper text-on-paper shadow-[0_14px_0_var(--rk-shadow-soft-color)]"
          >
            <header className="relative flex p-4 rounded-t-lg items-center border-b-2 bg-stone text-on-stone after:absolute after:inset-x-0 after:-bottom-2 after:h-1 after:bg-stone after:content-[''] max-sm:p-2">
              <RuneText
                aria-hidden="true"
                className="pointer-events-none absolute text-6xl! text-on-stone/20! top-1/2 block -translate-y-1/2 select-none overflow-hidden text-ellipsis whitespace-nowrap text-center leading-none max-sm:text-6"
                font="rune"
              >
                {title}
              </RuneText>
              <RuneText
                as="h1"
                className="relative z-1 m-0 w-full text-6xl! font-black leading-none text-on-stone wrap:anywhere max-sm:text-lg"
              >
                {title}
              </RuneText>
            </header>
            <div className="p-4 flex flex-col gap-4 font-black ">
              <p>{description}</p>
              <div className="flex flex-col gap-2">
                {highlights.length > 0 ? (
                  <ul className="grid max-w-3xl gap-2 text-sm leading-6">
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
                ) : null}
              </div>
            </div>
          </Material>
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
            <pre className="mt-5 overflow-x-auto rounded-lg bg-stone p-5 text-sm font-bold leading-6 text-on-stone shadow-[0_10px_0_var(--rk-shadow-color)]">
              <code>{code}</code>
            </pre>
          </section>
        ) : null}
      </div>
    </article>
  )
}
