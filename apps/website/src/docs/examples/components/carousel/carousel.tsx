import { Carousel, Material } from 'rocokingdom-ui'

const slides = [
  <Material
    className="flex aspect-[16/7] items-end bg-primary p-7 text-on-primary"
    key="festival"
    material="primary"
  >
    <div>
      <strong className="font-roco text-3xl">王国庆典</strong>
      <p className="mt-2 text-sm opacity-70">登录领取限定纪念礼物</p>
    </div>
  </Material>,
  <Material
    className="flex aspect-[16/7] items-end bg-stone p-7 text-on-stone"
    key="night"
    material="stone"
  >
    <div>
      <strong className="font-roco text-3xl">夜间探索</strong>
      <p className="mt-2 text-sm opacity-70">新的稀有宠物已经出现</p>
    </div>
  </Material>,
  <Material
    className="flex aspect-[16/7] items-end bg-success p-7 text-on-success"
    key="quest"
    material="success"
  >
    <div>
      <strong className="font-roco text-3xl">每日委托</strong>
      <p className="mt-2 text-sm opacity-70">完成任务积累王国声望</p>
    </div>
  </Material>,
]

export function CarouselExample() {
  return <Carousel autoplay={5000} items={slides} />
}
