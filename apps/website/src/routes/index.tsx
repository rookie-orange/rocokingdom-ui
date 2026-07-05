import { useEffect, useRef, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { BadgeIndicator, Button, Input } from 'rocokingdom-ui'
import {
  NotificationsCard,
  RegionSelectCard,
  SignupCard,
  TemperatureCard,
  type RegionOption,
} from '../cards'
import logoUrl from '../assets/roco-kingdom-logo.png'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const installCommand = 'npm install rocokingdom-ui'

const regionOptions = [
  { label: '魔法学院', value: 'academy' },
  { label: '王国城堡', value: 'castle' },
  { label: '清风山', value: 'breeze' },
  { label: '彼得大道', value: 'peter' },
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
  textarea.className = 'fixed left-0 top-0 h-px w-px opacity-0'
  textarea.value = text
  textarea.setAttribute('readonly', '')
  document.body.append(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
}

function HomePage() {
  const navigate = useNavigate()
  const [copiedInstallCommand, setCopiedInstallCommand] = useState(false)
  const [region, setRegion] = useState('academy')
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
    <main className="relative box-border h-svh max-h-svh min-h-0 w-full overflow-hidden bg-primary p-4 text-on-paper sm:p-6 lg:p-12">
      <section
        aria-label="Rocokingdom UI"
        className="relative z-10 mx-auto grid h-full w-full max-w-7xl min-w-0 items-center gap-8 lg:grid-cols-2"
      >
        <div className="grid max-w-xl min-w-0 justify-items-start gap-5 max-lg:justify-items-center max-lg:text-center">
          <BadgeIndicator material="primarySoft" shadow>
            阅读 Rocokingdom UI
          </BadgeIndicator>
          <div className="w-72 max-w-full sm:w-96 lg:w-full">
            <img
              alt="洛克王国 UI"
              className="block h-auto w-full object-contain drop-shadow-lg"
              src={logoUrl}
            />
          </div>
          <p className="m-0 max-w-lg text-base leading-7 text-stone/70 sm:text-lg">
            一套带有洛克王国气质的 React 组件库。导入样式，组合组件，就能快速搭建有角色感的界面。
          </p>

          <div
            aria-label="安装与文档"
            className="grid w-full max-w-xl min-w-0 gap-3 sm:grid-cols-3"
          >
            <Input
              aria-label={`${copiedInstallCommand ? '已复制' : '复制'} ${installCommand}`}
              inputClassName="min-w-0 cursor-pointer font-mono text-sm"
              material="stone"
              onClick={handleInstallCommandCopy}
              prefix="$"
              readOnly
              rootClassName="!w-full !min-w-0 max-w-full sm:col-span-2"
              shadow
              size="large"
              title={copiedInstallCommand ? '已复制安装命令' : '点击复制安装命令'}
              value={installCommand}
            />
            <Button
              material="paper"
              onClick={() => navigate({ to: '/docs' })}
              rootClassName="!w-full !min-w-0 justify-center font-roco text-lg sm:col-span-1"
              shadow
              size="large"
            >
              前往文档
            </Button>
          </div>
        </div>

        <ComponentShowcase onRegionChange={setRegion} region={region} />
      </section>
    </main>
  )
}

interface ComponentShowcaseProps {
  onRegionChange: (region: string) => void
  region: string
}

function ComponentShowcase({ onRegionChange, region }: ComponentShowcaseProps) {
  return (
    <aside
      aria-label="组件集合"
      className="grid h-full min-h-0 w-full grid-cols-2 grid-rows-5 gap-3 lg:gap-4"
    >
      <SignupCard className="col-start-1 row-span-3 row-start-1 h-full min-h-0" />
      <RegionSelectCard
        className="col-start-1 row-span-2 row-start-4 h-full min-h-0"
        onRegionChange={onRegionChange}
        options={regionOptions}
        region={region}
      />
      <TemperatureCard className="col-start-2 row-span-2 row-start-1 h-full min-h-0" />
      <NotificationsCard className="col-start-2 row-span-3 row-start-3 h-full min-h-0" />
    </aside>
  )
}
