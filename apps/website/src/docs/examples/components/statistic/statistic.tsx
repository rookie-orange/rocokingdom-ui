import { Material, Space, Statistic } from 'rocokingdom-ui'

export function StatisticExample() {
  return (
    <Material className="w-full rounded-lg p-6" material="paperStrong">
      <Space size="large" wrap>
        <Statistic suffix=" 洛克贝" title="账户余额" value={12840} />
        <Statistic suffix="%" title="探索进度" trend="up" value={72.5} />
        <Statistic prefix="-" title="本周排名" trend="down" value={3} />
      </Space>
    </Material>
  )
}
