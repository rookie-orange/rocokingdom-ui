import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Input, Panel, Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'
import { DocsPager } from '../docs/components'

const packageManagers = [
  {
    command: 'npm install rocokingdom-ui',
    label: 'npm',
    value: 'npm',
  },
  {
    command: 'pnpm add rocokingdom-ui',
    label: 'pnpm',
    value: 'pnpm',
  },
  {
    command: 'yarn add rocokingdom-ui',
    label: 'yarn',
    value: 'yarn',
  },
  {
    command: 'bun add rocokingdom-ui',
    label: 'bun',
    value: 'bun',
  },
]

const requirements = [
  {
    description: '用于本仓库开发与官网构建；在业务项目中建议使用当前 LTS 或更高版本。',
    label: 'Node.js',
    value: '>= 22.12.0',
  },
  {
    description: '组件库以 React 为运行时，当前工作区版本为 React 与 React DOM 19。',
    label: 'React',
    value: '^19.2.7',
  },
  {
    description: '包以 ESM 方式发布，适合 Vite、Next.js、Rspack 等现代前端构建工具。',
    label: '构建工具',
    value: 'ESM',
  },
]

const setupSnippets = [
  {
    code: `import 'rocokingdom-ui/style.css'
import 'rocokingdom-ui/font.css'`,
    description: '在应用入口引入基础样式；字体文件是可选项，需要洛克王国风格字体时再引入。',
    title: '引入样式',
  },
  {
    code: `import { Button, Input } from 'rocokingdom-ui'

export function App() {
  return (
    <div>
      <Input placeholder="搜索宠物或任务" />
      <Button shadow>开始冒险</Button>
    </div>
  )
}`,
    description: '样式准备好后即可按需导入组件，组件会继承默认主题变量。',
    title: '使用组件',
  },
]

function copyInputText(input: HTMLInputElement, text: string) {
  input.select()
  input.setSelectionRange(0, text.length)

  const isCopiedBySelection = document.execCommand('copy')
  const clipboardWrite = navigator.clipboard?.writeText?.(text)

  if (clipboardWrite) {
    return clipboardWrite.catch((error: unknown) => {
      if (isCopiedBySelection) {
        return
      }

      throw error
    })
  }

  if (isCopiedBySelection) {
    return Promise.resolve()
  }

  return Promise.reject(new Error('Copy command failed.'))
}

export const Route = createFileRoute('/docs/')({
  component: DocsOverviewPage,
})

function DocsOverviewPage() {
  const [packageManager, setPackageManager] = useState('npm')
  const [copiedPackageManager, setCopiedPackageManager] = useState<string | null>(null)
  const copiedResetTimeoutRef = useRef<number | undefined>(undefined)

  function clearCopiedResetTimeout() {
    if (copiedResetTimeoutRef.current === undefined) {
      return
    }

    window.clearTimeout(copiedResetTimeoutRef.current)
    copiedResetTimeoutRef.current = undefined
  }

  useEffect(() => {
    return clearCopiedResetTimeout
  }, [])

  function handlePackageManagerChange(nextPackageManager: string) {
    setPackageManager(nextPackageManager)
    setCopiedPackageManager(null)
    clearCopiedResetTimeout()
  }

  function copyInstallCommand(
    input: HTMLInputElement,
    command: string,
    nextCopiedPackageManager: string,
  ) {
    void copyInputText(input, command)
      .then(() => {
        clearCopiedResetTimeout()
        setCopiedPackageManager(nextCopiedPackageManager)
        copiedResetTimeoutRef.current = window.setTimeout(() => {
          setCopiedPackageManager((currentCopiedPackageManager) =>
            currentCopiedPackageManager === nextCopiedPackageManager
              ? null
              : currentCopiedPackageManager,
          )
          copiedResetTimeoutRef.current = undefined
        }, 3000)
      })
      .catch(() => {
        setCopiedPackageManager(null)
      })
  }

  return (
    <article className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl px-10 py-14 max-[980px]:px-5 max-[980px]:py-10">
        <section className="grid gap-8">
          <div>
            <p className="text-sm text-primary-strong">Quick Start</p>
            <h1 className="mt-4 font-roco text-6xl leading-none text-on-paper max-sm:text-4xl">
              快速开始
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-stone/70">
              按常规 React 组件库方式安装包、引入样式，再从{' '}
              <code className="rounded bg-stone/10 px-1.5 py-0.5 text-sm text-on-paper">
                rocokingdom-ui
              </code>{' '}
              按需导入组件。下面的安装命令可以切换不同包管理器。
            </p>
          </div>

          <div className="grid gap-6">
            <Panel contentClassName="grid gap-6 p-6" material="paper">
              <div>
                <h3 className="font-roco text-3xl leading-none text-on-paper">安装</h3>
                <p className="mt-3 text-base leading-7 text-stone/70">
                  选择你项目正在使用的包管理器，然后复制对应安装命令。
                </p>
              </div>

              <Tabs
                listMaterial="stone"
                onValueChange={handlePackageManagerChange}
                rootClassName="w-full"
                value={packageManager}
              >
                <TabList rootClassName="max-w-full">
                  {packageManagers.map((manager) => (
                    <Tab key={manager.value} value={manager.value}>
                      {manager.label}
                    </Tab>
                  ))}
                </TabList>

                {packageManagers.map((manager) => (
                  <TabPanel
                    className="w-full"
                    forceMount={false}
                    key={manager.value}
                    value={manager.value}
                  >
                    <div className="w-full [&_.rk-input]:w-full [&_.rk-input]:min-w-0">
                      <Input
                        aria-label={`${manager.label} 安装命令`}
                        className="w-full!"
                        inputClassName="font-mono text-sm"
                        material="stone"
                        onClick={(event) => {
                          copyInstallCommand(event.currentTarget, manager.command, manager.value)
                        }}
                        prefix="$"
                        readOnly
                        shadow
                        size="large"
                        suffix={copiedPackageManager === manager.value ? '已复制' : '点击复制'}
                        title="点击复制安装命令"
                        value={manager.command}
                      />
                    </div>
                  </TabPanel>
                ))}
              </Tabs>
            </Panel>

            <Panel contentClassName="grid gap-6 p-6" material="paper">
              <div>
                <h3 className="font-roco text-3xl leading-none text-on-paper">环境与依赖</h3>
                <p className="mt-3 text-base leading-7 text-stone/70">
                  安装前确认项目满足运行环境和 peer dependency 要求。
                </p>
              </div>

              <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
                {requirements.map((requirement) => (
                  <div className="grid min-h-40 content-between gap-5" key={requirement.label}>
                    <div className="grid gap-3">
                      <p className="font-roco text-2xl leading-none text-on-paper">
                        {requirement.label}
                      </p>
                      <code className="rounded bg-stone/10 px-2 py-1 text-sm text-on-paper">
                        {requirement.value}
                      </code>
                    </div>
                    <p className="text-sm leading-6 text-stone/65">{requirement.description}</p>
                  </div>
                ))}
              </div>
            </Panel>

            {setupSnippets.map((snippet) => (
              <Panel contentClassName="grid gap-4 p-6" key={snippet.title} material="paper">
                <div>
                  <h3 className="font-roco text-3xl leading-none text-on-paper">{snippet.title}</h3>
                  <p className="mt-3 text-base leading-7 text-stone/70">{snippet.description}</p>
                </div>
                <pre className="overflow-x-auto rounded-lg bg-stone p-5 text-sm leading-6 text-on-stone shadow-[0_10px_0_var(--rk-shadow-color)]">
                  <code>{snippet.code}</code>
                </pre>
              </Panel>
            ))}
          </div>
        </section>
        <DocsPager />
      </div>
    </article>
  )
}
