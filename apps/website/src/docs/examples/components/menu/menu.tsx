import { Menu } from 'rocokingdom-ui'

const items = [
  { key: 'map', label: '世界地图' },
  { key: 'quest', label: '任务日志' },
  { key: 'bag', label: '背包' },
  { disabled: true, key: 'guild', label: '公会（未开放）' },
]

export function MenuExample() {
  return <Menu defaultSelectedKey="map" items={items} orientation="horizontal" />
}
