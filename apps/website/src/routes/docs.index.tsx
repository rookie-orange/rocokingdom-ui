import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Input, Panel, RuneText, Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'
import { componentExamples } from '../examples/catalog'

const overviewStats = [
  {
    label: '主题',
    value: '2',
  },
  {
    label: '组件',
    value: String(componentExamples.length),
  },
  {
    label: '材质',
    value: '9',
  },
]

const introductionCards = [
  {
    description:
      'Rocokingdom UI 是一个面向 React 应用的游戏化组件库，目标是复刻游戏《洛克王国：世界》的 UI 观感与交互质感。',
    title: '项目定位',
  },
  {
    description:
      '组件将纸面、石质、金色强调、符文文字和可拉伸造型沉淀为设计 token 与基础组件，方便在业务界面中稳定复用。',
    title: '视觉语言',
  },
  {
    description:
      '当前文档覆盖主题、材质、造型、图标和常用交互组件，后续会继续补齐表单、导航、反馈和数据展示能力。',
    title: '文档范围',
  },
]

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
        <section className="grid gap-7 border-b border-stone/15 pb-10">
          <div>
            <RuneText className="block text-base leading-none text-primary-strong">
              OVERVIEW
            </RuneText>
            <h1 className="mt-4 font-roco text-6xl leading-none text-on-paper max-sm:text-4xl">
              文档总览
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone/70">
              Rocokingdom UI 将洛克王国风格的材质、造型、图标和交互组件整理成
              Overview、Design、Components、Icon 四类文档入口。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
            {overviewStats.map((stat) => (
              <Panel
                className="min-h-32"
                contentClassName="grid content-between gap-4 p-5"
                key={stat.label}
                material="paper"
              >
                <p className="text-sm text-primary-strong">{stat.label}</p>
                <p className="font-roco text-5xl leading-none text-on-paper">{stat.value}</p>
              </Panel>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-12">
          <div>
            <p className="text-sm text-primary-strong">About</p>
            <h2 className="mt-2 font-roco text-3xl leading-none text-on-paper">介绍</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-stone/70">
              当前项目围绕《洛克王国：世界》的界面气质搭建 React
              组件库，把游戏里的材质层次、按钮形态、面板结构和装饰文字整理成可复用的前端基础设施。
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
            {introductionCards.map((card) => (
              <Panel
                contentClassName="grid min-h-48 content-between gap-5 p-6"
                key={card.title}
                material="paper"
              >
                <h3 className="font-roco text-3xl leading-none text-on-paper">{card.title}</h3>
                <p className="text-base leading-7 text-stone/70">{card.description}</p>
              </Panel>
            ))}
          </div>
        </section>

        <section className="grid gap-8 border-t border-stone/15 py-12">
          <div>
            <p className="text-sm text-primary-strong">Quick Start</p>
            <h2 className="mt-2 font-roco text-3xl leading-none text-on-paper">快速开始</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-stone/70">
              按常规 React 组件库方式安装包、引入样式，再从{' '}
              <code className="rounded bg-stone/10 px-1.5 py-0.5 text-sm text-on-paper">
                rocokingdom-ui
              </code>{' '}
              按需导入组件。下面的安装命令可以切换不同包管理器。
            </p>
          </div>

          <div className="grid grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] gap-6 max-lg:grid-cols-1">
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

            <Panel contentClassName="grid gap-5 p-6" material="stoneSoft">
              <div>
                <h3 className="font-roco text-3xl leading-none text-on-stone">环境与依赖</h3>
                <p className="mt-3 text-base leading-7 text-on-stone/70">
                  安装前确认项目满足运行环境和 peer dependency 要求。
                </p>
              </div>

              <div className="grid gap-4">
                {requirements.map((requirement) => (
                  <div className="border-t border-on-stone/15 pt-4" key={requirement.label}>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <p className="font-roco text-2xl leading-none text-on-stone">
                        {requirement.label}
                      </p>
                      <code className="rounded bg-on-stone/10 px-2 py-1 text-sm text-on-stone">
                        {requirement.value}
                      </code>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-on-stone/65">
                      {requirement.description}
                    </p>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
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
      </div>
    </article>
  )
}
