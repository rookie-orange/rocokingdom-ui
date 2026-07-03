import { RuneText } from 'rocokingdom-ui'

export function RuneTextFontDemo() {
  return (
    <div className="grid gap-4">
      <RuneText className="text-4xl leading-none text-stone">洛克王国</RuneText>
      <RuneText font="rune" className="text-4xl leading-none text-primary">
        ROCO KINGDOM
      </RuneText>
    </div>
  )
}
