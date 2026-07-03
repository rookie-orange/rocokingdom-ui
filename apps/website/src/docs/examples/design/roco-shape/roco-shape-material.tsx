import { Material, RocoShape } from 'rocokingdom-ui'

export function RocoShapeMaterialDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Material asChild material="paper">
        <RocoShape className="!h-14 !px-[34px] font-roco text-2xl" shadow>
          纸张表面
        </RocoShape>
      </Material>
      <RocoShape
        background="#2f7dd1"
        className="!h-14 !px-[34px] font-roco text-2xl"
        color="#f7fbff"
        shadow
      >
        水系活动
      </RocoShape>
    </div>
  )
}
