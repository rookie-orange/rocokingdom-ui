import { Descriptions } from 'rocokingdom-ui'

const items = [
  { label: '名称', value: '迪莫' },
  { label: '等级', value: '42' },
  { label: '属性', value: '光' },
  { label: '性格', value: '勇敢' },
  { label: '发现地点', span: 2, value: '魔法学院 · 教学楼' },
]

export function DescriptionsExample() {
  return <Descriptions bordered column={3} items={items} title="宠物资料" />
}
