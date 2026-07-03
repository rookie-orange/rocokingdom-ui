import { Material } from 'rocokingdom-ui'

export function MaterialCustomDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Material
        as="button"
        background="#2f7dd1"
        className="rounded-lg p-5 text-left"
        color="#f7fbff"
        type="button"
      >
        <span className="block font-roco text-2xl leading-none">水系活动</span>
        <span className="mt-2 block text-sm opacity-80">as="button"</span>
      </Material>
      <Material as="article" background="#f7d56f" className="rounded-lg p-5" color="#2b2414">
        <span className="block font-roco text-2xl leading-none">宠物档案</span>
        <span className="mt-2 block text-sm opacity-75">自定义 foreground</span>
      </Material>
    </div>
  )
}
