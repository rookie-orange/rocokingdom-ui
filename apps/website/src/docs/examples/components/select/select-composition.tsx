import { Select, SelectGroup, SelectItem, SelectLabel, SelectSeparator } from 'rocokingdom-ui'

export function SelectCompositionDemo() {
  return (
    <Select
      ariaLabel="选择技能"
      defaultValue="fire"
      placeholder="选择技能"
      triggerClassName="min-w-[220px]"
    >
      <SelectGroup>
        <SelectLabel className="px-4 py-2 text-sm text-primary">元素技能</SelectLabel>
        <SelectItem value="fire">火焰喷发</SelectItem>
        <SelectItem value="water">水泡术</SelectItem>
        <SelectItem value="wind">风之打击</SelectItem>
      </SelectGroup>
      <SelectSeparator className="my-2 h-px bg-on-stone/20" />
      <SelectGroup>
        <SelectLabel className="px-4 py-2 text-sm text-primary">辅助技能</SelectLabel>
        <SelectItem value="shield">守护之力</SelectItem>
        <SelectItem disabled value="heal">
          治愈术冷却中
        </SelectItem>
      </SelectGroup>
    </Select>
  )
}
