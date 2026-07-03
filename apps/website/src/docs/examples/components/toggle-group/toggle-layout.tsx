import { ToggleGroup, ToggleItem } from 'rocokingdom-ui'

export function ToggleLayoutDemo() {
  return (
    <div className="flex flex-wrap items-start gap-10">
      <ToggleGroup defaultValue="home" orientation="vertical" size="small">
        <ToggleItem value="home">家园</ToggleItem>
        <ToggleItem value="friend">好友</ToggleItem>
        <ToggleItem value="shop">商店</ToggleItem>
      </ToggleGroup>
      <ToggleGroup
        defaultValue="guild"
        selectedMaterial="stone"
        selectedShadow
        unselectedMaterial="paper"
        size="large"
      >
        <ToggleItem value="solo">单人</ToggleItem>
        <ToggleItem value="team">组队</ToggleItem>
        <ToggleItem value="guild">公会</ToggleItem>
      </ToggleGroup>
    </div>
  )
}
