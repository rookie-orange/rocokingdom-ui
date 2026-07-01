import { createFileRoute } from '@tanstack/react-router'
import { Panel, RuneText } from 'rocokingdom-ui'
import { DocsPager } from '../docs/components'

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

export const Route = createFileRoute('/docs/overview/introduction')({
  component: DocsIntroductionPage,
})

function DocsIntroductionPage() {
  return (
    <article className="h-full min-h-0 overflow-y-auto">
      <div className="mx-auto w-full max-w-6xl px-10 py-14 max-[980px]:px-5 max-[980px]:py-10">
        <section className="grid gap-8">
          <div>
            <RuneText className="block text-base leading-none text-primary-strong">
              INTRODUCTION
            </RuneText>
            <h1 className="mt-4 font-roco text-6xl leading-none text-on-paper max-sm:text-4xl">
              介绍
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone/70">
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
                <h2 className="font-roco text-3xl leading-none text-on-paper">{card.title}</h2>
                <p className="text-base leading-7 text-stone/70">{card.description}</p>
              </Panel>
            ))}
          </div>
        </section>
        <DocsPager />
      </div>
    </article>
  )
}
