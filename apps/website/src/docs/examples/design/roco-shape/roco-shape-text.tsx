import { Material, RocoShape } from 'rocokingdom-ui'

export function RocoShapeTextDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Material asChild material="stone">
        <RocoShape className="!h-[72px] !px-[42px] font-roco text-3xl" shadow>
          今日活动
        </RocoShape>
      </Material>
      <Material asChild material="paper">
        <RocoShape className="!h-14 !px-[34px] font-roco text-2xl" shadow>
          宠物档案
        </RocoShape>
      </Material>
    </div>
  )
}
