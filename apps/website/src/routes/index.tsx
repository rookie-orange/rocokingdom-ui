import { useEffect, useRef, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { BadgeIndicator, Button, Input } from 'rocokingdom-ui'
import {
  FinanceCard,
  KingdomPassCard,
  NotificationsCard,
  RegionSelectCard,
  SettlementCard,
  SignupCard,
  TabsCard,
  TeamCard,
  TemperatureCard,
  type RegionOption,
} from '../cards'
import birdFlightUrl from '../assets/roco-bird-flight.png'
import logoUrl from '../assets/roco-kingdom-logo.png'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const installCommand = 'npm install rocokingdom-ui'

const birdFrameClassName =
  'absolute z-[1] h-[var(--bird-frame-height)] w-[var(--bird-frame-width)] origin-center overflow-hidden opacity-0 will-change-[transform,opacity] motion-reduce:hidden [animation:home-bird-fly_7.8s_linear_infinite]'

const birdSpriteClassName =
  'block h-[var(--bird-frame-height)] w-[calc(var(--bird-frame-width)*78)] max-w-none select-none will-change-transform [animation:home-bird-flap_4.588s_steps(77,end)_infinite]'

const birdFlights = [
  {
    frameClassName:
      '[--bird-start-x:5vw] [--bird-start-y:20vh] [--bird-end-x:82vw] [--bird-end-y:-8vh] [animation-delay:-1.5s] max-sm:[--bird-start-x:6vw] max-sm:[--bird-start-y:34vh] max-sm:[--bird-end-x:99vw] max-sm:[--bird-end-y:4vh]',
    spriteClassName: '',
  },
  {
    frameClassName:
      'z-20 [--bird-start-x:-18vw] [--bird-start-y:76vh] [--bird-end-x:94vw] [--bird-end-y:22vh] [animation-delay:-0.7s] max-sm:[--bird-start-x:-30vw] max-sm:[--bird-start-y:78vh] max-sm:[--bird-end-x:103vw] max-sm:[--bird-end-y:26vh]',
    spriteClassName: '[animation-delay:-1.18s]',
  },
  {
    frameClassName:
      '[--bird-start-x:-4vw] [--bird-start-y:59vh] [--bird-end-x:90vw] [--bird-end-y:15vh] [animation-delay:-1s] max-sm:[--bird-start-x:-8vw] max-sm:[--bird-start-y:66vh] max-sm:[--bird-end-x:95vw] max-sm:[--bird-end-y:38vh]',
    spriteClassName: '[animation-delay:-2.65s]',
  },
] as const

const regionOptions = [
  { label: '王国城堡', value: 'castle' },
  { label: '宠物园', value: 'garden' },
  { label: '魔法学院', value: 'academy' },
  { label: '雷霆峡谷', value: 'thunder' },
] as const satisfies readonly RegionOption[]

async function copyText(text: string) {
  try {
    await navigator.clipboard?.writeText(text)

    if (navigator.clipboard) {
      return
    }
  } catch {
    // Fall back for browsers that expose clipboard only behind stricter permissions.
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.left = '-9999px'
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  document.body.append(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

function HomePage() {
  const navigate = useNavigate()
  const [copiedInstallCommand, setCopiedInstallCommand] = useState(false)
  const copiedResetTimeoutRef = useRef<number | undefined>(undefined)

  function clearCopiedResetTimeout() {
    if (copiedResetTimeoutRef.current === undefined) {
      return
    }

    window.clearTimeout(copiedResetTimeoutRef.current)
    copiedResetTimeoutRef.current = undefined
  }

  useEffect(() => {
    return () => {
      clearCopiedResetTimeout()
    }
  }, [])

  function handleInstallCommandCopy() {
    void copyText(installCommand)
      .then(() => {
        clearCopiedResetTimeout()
        setCopiedInstallCommand(true)
        copiedResetTimeoutRef.current = window.setTimeout(() => {
          setCopiedInstallCommand(false)
          copiedResetTimeoutRef.current = undefined
        }, 2200)
      })
      .catch(() => {
        setCopiedInstallCommand(false)
      })
  }

  return (
    <main className="relative box-border h-svh max-h-svh min-h-0 w-full overflow-hidden bg-[#eaf2f6] py-[clamp(1rem,3vw,3rem)] pr-0 pl-[clamp(1rem,4.8vw,4.5rem)] text-on-paper max-lg:p-4 max-sm:p-[0.85rem]">
      <BirdFlight />

      <section
        aria-label="Rocokingdom UI"
        className="relative z-10 grid h-full w-full min-w-0 grid-cols-[minmax(22rem,31vw)_minmax(0,1fr)] items-center gap-[clamp(2rem,5.2vw,5.6rem)] max-lg:grid-cols-1 max-lg:content-center max-lg:justify-items-center max-sm:gap-0"
      >
        <div className="grid min-w-0 max-w-[34rem] justify-items-start gap-[clamp(1rem,2.4vh,1.8rem)] max-lg:max-w-[42rem] max-lg:justify-items-center max-lg:text-center max-sm:gap-[0.7rem]">
          <BadgeIndicator material="primarySoft" shadow>
            阅读 Rocokingdom UI
          </BadgeIndicator>
          <div className="ml-[clamp(-0.75rem,-1.2vw,0rem)] w-[min(100%,clamp(16rem,27vw,30rem))] [@media_(max-height:760px)_and_(min-width:1025px)]:w-[min(100%,24rem)] max-lg:ml-0 max-lg:w-[min(100%,24rem)] max-sm:w-[min(100%,19rem)]">
            <img
              alt="洛克王国 UI"
              className="block h-auto w-full object-contain [filter:drop-shadow(0_18px_18px_rgb(36_38_40_/_0.14))_saturate(1.16)_contrast(1.06)]"
              src={logoUrl}
            />
          </div>
          <p className="m-0 max-w-[32rem] text-[clamp(0.95rem,1.25vw,1.25rem)] leading-[1.55] text-stone/70 max-sm:max-w-[22rem] max-sm:text-[0.9rem] max-sm:leading-[1.45]">
            一套带有洛克王国气质的 React 组件库。导入样式，组合组件，就能快速搭建有角色感的界面。
          </p>

          <div
            aria-label="安装与文档"
            className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)_minmax(9rem,0.42fr)] items-stretch gap-[0.85rem] max-lg:max-w-[34rem] max-lg:grid-cols-[minmax(0,1fr)_minmax(8.5rem,0.4fr)] max-sm:grid-cols-[minmax(0,1fr)_minmax(7rem,0.46fr)]"
          >
            <Input
              aria-label={`${copiedInstallCommand ? '已复制' : '复制'} ${installCommand}`}
              inputClassName="min-w-0 cursor-pointer font-mono text-[0.92rem] max-sm:text-[0.78rem]"
              material="stone"
              onClick={handleInstallCommandCopy}
              prefix="$"
              readOnly
              rootClassName="!w-full !min-w-0 max-w-full"
              shadow
              size="large"
              title={copiedInstallCommand ? '已复制安装命令' : '点击复制安装命令'}
              value={installCommand}
            />
            <Button
              material="paper"
              onClick={() => navigate({ to: '/docs' })}
              rootClassName="!w-full !min-w-0 justify-center font-roco text-lg"
              shadow
              size="large"
            >
              前往文档
            </Button>
          </div>
        </div>

        <ComponentShowcase />
      </section>
    </main>
  )
}

function BirdFlight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[4] [--bird-frame-width:clamp(2.8rem,5.8vw,6.1rem)] [--bird-frame-height:calc(var(--bird-frame-width)*105/65)] max-sm:[--bird-frame-width:clamp(2.6rem,13vw,4rem)]"
    >
      {birdFlights.map(({ frameClassName, spriteClassName }) => (
        <span className={`${birdFrameClassName} ${frameClassName}`} key={frameClassName}>
          <img
            alt=""
            className={`${birdSpriteClassName} ${spriteClassName}`}
            draggable="false"
            src={birdFlightUrl}
          />
        </span>
      ))}
    </div>
  )
}

function ComponentShowcase() {
  const [region, setRegion] = useState('academy')
  const regionLabel = regionOptions.find((option) => option.value === region)?.label

  return (
    <aside
      aria-label="组件集合"
      className="grid w-max min-w-max translate-y-[clamp(-0.75rem,-1vh,-0.25rem)] grid-cols-[clamp(25rem,29vw,36rem)_clamp(18rem,19.5vw,23rem)_clamp(16rem,18vw,20rem)] items-start gap-[clamp(1.15rem,1.55vw,1.55rem)] justify-self-start [@media_(max-height:760px)_and_(min-width:1025px)]:origin-left [@media_(max-height:760px)_and_(min-width:1025px)]:translate-y-[-0.35rem] [@media_(max-height:760px)_and_(min-width:1025px)]:scale-[0.92] [@media_(max-height:760px)_and_(min-width:1025px)]:gap-4 max-lg:absolute max-lg:bottom-3 max-lg:left-1/2 max-lg:translate-x-[-44%] max-lg:translate-y-[58%] max-lg:scale-[0.82] max-lg:grid-cols-[18rem_16rem_13rem] max-lg:opacity-[0.88] max-sm:bottom-0 max-sm:translate-x-[-45%] max-sm:translate-y-[71%] max-sm:scale-[0.72] max-sm:grid-cols-[15rem_13rem_11rem]"
    >
      <div className="grid min-w-0 gap-[clamp(1rem,1.45vw,1.35rem)]">
        <TeamCard className="max-lg:hidden" />
        <NotificationsCard className="max-lg:hidden" />
      </div>

      <div className="grid min-w-0 gap-[clamp(1rem,1.45vw,1.35rem)] pt-[clamp(0.2rem,4vh,2.2rem)]">
        <SignupCard />
        <KingdomPassCard className="max-sm:hidden" regionLabel={regionLabel} />
        <SettlementCard />
      </div>

      <div className="grid min-w-0 gap-[clamp(1rem,1.45vw,1.35rem)] pt-[clamp(0.1rem,1.5vh,1rem)]">
        <FinanceCard />
        <RegionSelectCard onRegionChange={setRegion} options={regionOptions} region={region} />
        <TabsCard />
        <TemperatureCard />
      </div>
    </aside>
  )
}
