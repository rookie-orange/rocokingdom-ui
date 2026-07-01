import { createFileRoute } from '@tanstack/react-router'
import { RuneText } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/rune-text')({
  component: RuneTextExamplePage,
})

const runeTextCode = `import { RuneText } from 'rocokingdom-ui'

export function Mark() {
  return <RuneText as="strong">ROCO KINGDOM</RuneText>
}`

const runeTextSizeCode = `import { RuneText } from 'rocokingdom-ui'

export function RuneTextSizeDemo() {
  return (
    <div className="grid gap-5">
      <RuneText as="h2" className="text-6xl leading-none text-stone">
        ROCO KINGDOM
      </RuneText>
      <RuneText className="text-4xl leading-none text-primary">MAGIC NOTICE</RuneText>
      <RuneText className="text-2xl leading-none text-[#2f7dd1]">ELEMENT BADGE</RuneText>
    </div>
  )
}`

const runeTextFontCode = `import { RuneText } from 'rocokingdom-ui'

export function RuneTextFontDemo() {
  return (
    <div className="grid gap-4">
      <RuneText className="text-4xl leading-none text-stone">洛克王国</RuneText>
      <RuneText font="rune" className="text-4xl leading-none text-primary">
        ROCO KINGDOM
      </RuneText>
    </div>
  )
}`

const runeTextBackgroundCode = `import { RuneText } from 'rocokingdom-ui'

export function RuneTextBackgroundDemo() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-stone p-8 text-on-stone">
      <RuneText
        aria-hidden="true"
        className="absolute inset-x-6 top-4 text-7xl leading-none text-on-stone/10"
        font="rune"
      >
        QUEST BOARD
      </RuneText>
      <div className="relative z-10">
        <p className="font-roco text-4xl leading-none">任务公告</p>
        <p className="mt-4 max-w-xl text-base leading-7 text-on-stone/75">
          背景符文文本保留装饰性，不参与主要信息层级。
        </p>
      </div>
    </div>
  )
}`

function RuneTextExamplePage() {
  return (
    <ExampleShell
      code={runeTextCode}
      description="RuneText 使用装饰字体渲染短英文标识，适合标题背景、水印和徽章。"
      highlights={[
        'as 可切换渲染元素。',
        '默认使用 roco base 字体，font="rune" 可切换为装饰字体。',
        '继承当前颜色、字号和行高，使用 className 控制局部排版。',
        '适合短文本，不建议承载正文。',
      ]}
      title="RuneText"
    >
      <ExampleSection code={runeTextSizeCode} title="字号和颜色">
        <PreviewSurface>
          <div className="grid gap-5">
            <RuneText as="h2" className="text-6xl leading-none text-stone max-sm:text-4xl">
              ROCO KINGDOM
            </RuneText>
            <RuneText className="text-4xl leading-none text-primary max-sm:text-3xl">
              MAGIC NOTICE
            </RuneText>
            <RuneText className="text-2xl leading-none text-[#2f7dd1]">ELEMENT BADGE</RuneText>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={runeTextFontCode} title="字体选择">
        <PreviewSurface>
          <div className="grid gap-4">
            <RuneText className="text-4xl leading-none text-stone max-sm:text-3xl">
              洛克王国
            </RuneText>
            <RuneText font="rune" className="text-4xl leading-none text-primary max-sm:text-3xl">
              ROCO KINGDOM
            </RuneText>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection code={runeTextBackgroundCode} title="作为背景层">
        <PreviewSurface>
          <div className="relative overflow-hidden rounded-lg bg-stone p-8 text-on-stone">
            <RuneText
              aria-hidden="true"
              className="absolute inset-x-6 top-4 text-7xl leading-none text-on-stone/10 max-sm:text-5xl"
              font="rune"
            >
              QUEST BOARD
            </RuneText>
            <div className="relative z-10">
              <p className="font-roco text-4xl leading-none">任务公告</p>
              <p className="mt-4 max-w-xl text-base leading-7 text-on-stone/75">
                背景符文文本保留装饰性，不参与主要信息层级。
              </p>
            </div>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
