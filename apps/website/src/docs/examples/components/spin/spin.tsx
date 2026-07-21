import { Material, Spin } from 'rocokingdom-ui'

export function SpinExample() {
  return (
    <Spin label="正在加载地图" size="large">
      <Material className="min-h-40 w-full rounded-lg p-6" material="paperStrong">
        <strong>世界地图</strong>
        <p className="mt-2 text-sm opacity-65">正在同步区域与传送点信息。</p>
      </Material>
    </Spin>
  )
}
