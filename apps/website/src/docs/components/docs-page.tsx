import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { Material, RuneText, Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'
import { DocsCodeBlock } from './docs-code-block'
import { DocsPager } from './docs-pager'
import { DocsPropTable } from './docs-prop-table'
import { getDocByPath, getDocByTitle } from '../registry'
import styles from './docs-page.module.css'

const highlightMarkers = [
  'bg-primary',
  'bg-primary-muted',
  'bg-primary-strong',
  'bg-success',
  'bg-danger',
]

export interface DocsPageProps {
  children: ReactNode
  code?: string
  description: string
  highlights?: readonly string[]
  title: string
}

interface DocsExampleProps {
  children: ReactNode
  code?: string
  description?: string
  title: string
}

export function PreviewSurface({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-56 rounded-lg border border-stone/15 bg-paper-soft p-6 shadow-[0_12px_0_var(--rk-shadow-soft-color)] max-sm:p-4">
      {children}
    </div>
  )
}

export function DocsExample({ children, code, description, title }: DocsExampleProps) {
  const sectionHeader = (
    <div>
      <p className="text-sm text-primary-strong">Example</p>
      <h2 className="mt-2 font-roco text-3xl leading-none text-on-paper max-sm:text-2xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-base leading-7 text-stone/70">{description}</p>
      ) : null}
    </div>
  )

  if (!code) {
    return (
      <section className="grid gap-5">
        {sectionHeader}
        {children}
      </section>
    )
  }

  return (
    <Tabs
      defaultValue="preview"
      listMaterial="stone"
      rootClassName={styles.exampleTabs}
      selectedMaterial="primary"
    >
      <section className={`grid gap-5 ${styles.exampleSection}`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          {sectionHeader}
          <TabList rootClassName={styles.exampleList}>
            <Tab value="preview">Preview</Tab>
            <Tab value="code">Code</Tab>
          </TabList>
        </div>

        <TabPanel className={`${styles.examplePanel} focus:outline-none`} value="preview">
          {children}
        </TabPanel>
        <TabPanel
          className={`${styles.examplePanel} focus:outline-none`}
          forceMount={false}
          value="code"
        >
          <DocsCodeBlock code={code} label={title} />
        </TabPanel>
      </section>
    </Tabs>
  )
}

export function DocsPage({ children, description, highlights = [], title }: DocsPageProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const doc = useMemo(() => getDocByPath(pathname) ?? getDocByTitle(title), [pathname, title])
  const props = doc?.props ?? []
  const titleHighlights = highlights.length > 0 ? highlights : (doc?.notes ?? [])

  return (
    <article className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-10 py-12 max-[980px]:px-5 max-[980px]:py-8">
        <section className="border-b border-stone/15 pb-10">
          <Material
            className="flex min-h-[248px] w-full flex-col overflow-hidden rounded-xl border border-stone bg-paper p-2 text-on-paper shadow-[0_14px_0_var(--rk-shadow-soft-color)]"
            material="paper"
          >
            <header className="relative flex items-center rounded-t-lg border-b-2 bg-stone p-4 text-on-stone after:absolute after:inset-x-0 after:-bottom-2 after:h-1 after:bg-stone after:content-[''] max-sm:p-2">
              <RuneText
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 block -translate-y-1/2 select-none overflow-hidden text-ellipsis whitespace-nowrap text-center text-6xl! leading-none text-on-stone/20! max-sm:text-4xl!"
                font="rune"
              >
                {title}
              </RuneText>
              <RuneText
                as="h1"
                className="relative z-1 m-0 w-full text-6xl! leading-none text-on-stone wrap-anywhere max-sm:text-4xl!"
              >
                {title}
              </RuneText>
            </header>

            <div className="flex flex-col gap-4 p-4">
              <p className="text-base leading-7 text-on-paper">{description}</p>
              {titleHighlights.length > 0 ? (
                <ul className="grid max-w-3xl gap-2 text-sm leading-6">
                  {titleHighlights.map((highlight, index) => (
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
          </Material>
        </section>

        <div className="grid gap-12">{children}</div>

        <section className="grid gap-5">
          <div>
            <p className="text-sm text-primary-strong">API Reference</p>
            <h2 className="mt-2 font-roco text-3xl leading-none text-on-paper">属性说明</h2>
            <p className="mt-2 max-w-3xl text-base leading-7 text-stone/70">
              下表只列出 Rocokingdom UI 增加或重写的主要属性；原生 HTML 与 Radix
              属性仍按类型声明透传。
            </p>
          </div>
          <DocsPropTable props={props} />
        </section>

        <DocsPager />
      </div>
    </article>
  )
}
