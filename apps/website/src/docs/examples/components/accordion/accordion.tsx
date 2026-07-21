import { Accordion } from 'rocokingdom-ui'

const items = [
  {
    children: '完成彼得大道的引导任务后即可开启世界地图传送。',
    key: 'travel',
    title: '如何解锁传送？',
  },
  {
    children: '每日委托在服务器时间 06:00 刷新，未领取奖励会保留一天。',
    key: 'quest',
    title: '委托何时刷新？',
  },
  {
    children: '战斗中使用恢复道具，或前往宠物医院进行免费治疗。',
    key: 'heal',
    title: '如何恢复宠物状态？',
  },
]

export function AccordionExample() {
  return <Accordion defaultValue="travel" items={items} />
}
