import { Timeline } from 'rocokingdom-ui'

const items = [
  {
    children: '接受王国委托并获得线索地图。',
    label: '09:20',
    material: 'primary' as const,
    title: '任务开始',
  },
  {
    children: '在彼得大道找到遗失的货箱。',
    label: '09:45',
    material: 'success' as const,
    title: '发现目标',
  },
  {
    children: '返回王国城堡向发布人报告。',
    label: '10:10',
    material: 'stoneMuted' as const,
    title: '提交任务',
  },
]

export function TimelineExample() {
  return <Timeline items={items} pending="等待领取奖励" />
}
