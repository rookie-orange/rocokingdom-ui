import { RuneText } from 'rocokingdom-ui'

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
}
