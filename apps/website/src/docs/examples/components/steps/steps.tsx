import { useState } from 'react'
import { Button, Space, Stack, Steps } from 'rocokingdom-ui'

const items = [
  { description: '选择目的地', title: '地图' },
  { description: '整理携带物品', title: '背包' },
  { description: '确认队伍状态', title: '出发' },
]

export function StepsExample() {
  const [current, setCurrent] = useState(1)

  return (
    <Stack rootClassName="w-full" size="large">
      <Steps current={current} items={items} onChange={setCurrent} />
      <Space>
        <Button
          disabled={current === 0}
          onClick={() => setCurrent((value) => value - 1)}
          variant="outline"
        >
          上一步
        </Button>
        <Button
          disabled={current === items.length - 1}
          onClick={() => setCurrent((value) => value + 1)}
          shadow
        >
          下一步
        </Button>
      </Space>
    </Stack>
  )
}
