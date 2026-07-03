import { RuneText } from 'rocokingdom-ui'

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
}
