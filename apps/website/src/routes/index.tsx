import { useEffect, useRef, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  BadgeIndicator,
  Button,
  Checkbox,
  Drawer,
  Input,
  Modal,
  ModalClose,
  Panel,
  Select,
  Slider,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from 'rocokingdom-ui'
import birdFlightUrl from '../assets/roco-bird-flight.png'
import logoUrl from '../assets/roco-kingdom-logo.png'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const installCommand = 'npm install rocokingdom-ui'

const birdClassNames = [
  'home-bird home-bird--one',
  'home-bird home-bird--two',
  'home-bird home-bird--three',
] as const

const regionOptions = [
  { label: '王国城堡', value: 'castle' },
  { label: '宠物园', value: 'garden' },
  { label: '魔法学院', value: 'academy' },
  { label: '雷霆峡谷', value: 'thunder' },
] as const

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
    <main className="home-page">
      <BirdFlight />

      <section aria-label="Rocokingdom UI" className="home-shell">
        <div className="home-hero">
          <BadgeIndicator material="primarySoft" shadow>
            阅读 Rocokingdom UI
          </BadgeIndicator>
          <div className="home-logo-wrap">
            <img alt="洛克王国 UI" className="home-logo" src={logoUrl} />
          </div>
          <p className="home-hero__copy">
            一套带有洛克王国气质的 React 组件库。导入样式，组合组件，就能快速搭建有角色感的界面。
          </p>

          <div className="home-actions" aria-label="安装与文档">
            <Input
              aria-label={`${copiedInstallCommand ? '已复制' : '复制'} ${installCommand}`}
              inputClassName="home-install-input__control"
              material="stone"
              onClick={handleInstallCommandCopy}
              prefix="$"
              readOnly
              rootClassName="home-install-input"
              shadow
              size="large"
              title={copiedInstallCommand ? '已复制安装命令' : '点击复制安装命令'}
              value={installCommand}
            />
            <Button
              material="paper"
              onClick={() => navigate({ to: '/docs' })}
              rootClassName="home-doc-button font-roco text-lg"
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
    <div aria-hidden="true" className="home-bird-flight">
      {birdClassNames.map((className) => (
        <span className={className} key={className}>
          <img alt="" className="home-bird__sprite" draggable="false" src={birdFlightUrl} />
        </span>
      ))}
    </div>
  )
}

function ComponentShowcase() {
  const [notifyEnabled, setNotifyEnabled] = useState(true)
  const [dailyChecked, setDailyChecked] = useState(true)
  const [region, setRegion] = useState('academy')

  return (
    <aside aria-label="组件集合" className="home-showcase">
      <div className="home-showcase__column home-showcase__column--left">
        <Panel className="home-demo-panel home-demo-panel--team" material="paperSoft">
          <div className="home-panel-heading">
            <h2>王国队伍</h2>
            <p>邀请并管理你的冒险伙伴。</p>
          </div>
          <div className="home-team-invite">
            <Input material="paper" placeholder="输入伙伴邮箱" readOnly />
            <Button material="primary" shadow>
              邀请
            </Button>
          </div>
          <div className="home-team-list">
            {['迪莫', '喵喵', '水蓝蓝', '火花'].map((name, index) => (
              <div className="home-team-row" key={name}>
                <BadgeIndicator material={index % 2 === 0 ? 'primarySoft' : 'paperStrong'} shadow>
                  {name.slice(0, 1)}
                </BadgeIndicator>
                <strong>{name}</strong>
                <span>{name.toLowerCase()}@kingdom.ui</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="home-demo-panel home-demo-panel--notifications" material="paperSoft">
          <div className="home-panel-heading">
            <h2>消息提醒</h2>
            <p>管理任务、收藏和协作通知。</p>
          </div>
          <div className="home-notification-row">
            <div>
              <strong>评论提醒</strong>
              <p>有人提到你时及时收到提醒。</p>
            </div>
            <Switch checked={notifyEnabled} onCheckedChange={setNotifyEnabled}>
              推送
            </Switch>
          </div>
          <div className="home-notification-row">
            <div>
              <strong>收藏更新</strong>
              <p>追踪已收藏组件的状态变化。</p>
            </div>
            <Checkbox
              boxMaterial="stoneStrong"
              checked={dailyChecked}
              checkMaterial="primary"
              onChange={(event) => setDailyChecked(event.currentTarget.checked)}
              shadow
            >
              邮件
            </Checkbox>
          </div>
        </Panel>
      </div>

      <div className="home-showcase__column home-showcase__column--right">
        <Panel className="home-demo-panel home-demo-panel--signup" material="paperSoft">
          <div className="home-panel-heading">
            <h2>注册账号</h2>
          </div>
          <div className="home-form-field">
            <span>角色名称</span>
            <Input
              aria-label="角色名称"
              inputClassName="home-signup-input__control"
              readOnly
              rootClassName="home-signup-input"
              shadow
              value="洛克训练师"
            />
          </div>
          <div className="home-form-field">
            <span>初始区域</span>
            <Input
              aria-label="初始区域"
              inputClassName="home-signup-input__control"
              readOnly
              rootClassName="home-signup-input"
              shadow
              value="魔法学院"
            />
          </div>
          <div className="home-form-actions">
            <Modal
              description="确认后会创建一个可复用的组件配方。"
              footer={
                <>
                  <ModalClose asChild>
                    <Button material="paper" shadow>
                      取消
                    </Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button material="primary" shadow>
                      开始
                    </Button>
                  </ModalClose>
                </>
              }
              headerRuneText="弹窗"
              title="创建组件"
              trigger={
                <Button material="paper" rootClassName="home-action-button" shadow>
                  弹窗
                </Button>
              }
            >
              <p className="home-modal-copy">选择主题、组合组件，然后导出你的王国界面。</p>
            </Modal>
            <Button material="primary" rootClassName="home-action-button" shadow>
              登录
            </Button>
          </div>
        </Panel>

        <Panel className="home-demo-panel home-demo-panel--card" material="paperSoft">
          <div className="home-panel-heading">
            <h2>王国通行卡</h2>
            <p>查看并管理你的组件通行证。</p>
          </div>
          <div className="home-purple-card">
            <strong>洛克王国 UI</strong>
            <span>4929 3849 5027 1846</span>
            <small>01 / 27 · 999</small>
          </div>
          <div className="home-form-actions">
            <Modal
              description="弹窗组件适合确认危险操作、展示说明或承载短流程。"
              footer={
                <>
                  <ModalClose asChild>
                    <Button material="paper" shadow>
                      取消
                    </Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button material="primary" shadow>
                      确认
                    </Button>
                  </ModalClose>
                </>
              }
              headerRuneText="弹窗"
              title="弹窗预览"
              trigger={
                <Button material="paper" rootClassName="home-action-button" shadow>
                  弹窗
                </Button>
              }
            >
              <p className="home-modal-copy">这里展示的是来自 rocokingdom-ui 的弹窗组件。</p>
            </Modal>
            <Drawer
              description="抽屉适合承载区域设置、任务简报和侧边详情。"
              overlay
              side="right"
              size={420}
              title="抽屉预览"
              trigger={
                <Button material="primary" rootClassName="home-action-button" shadow>
                  抽屉
                </Button>
              }
            >
              <div className="home-drawer-content">
                <span>✓</span>
                <p>当前选择：{regionOptions.find((option) => option.value === region)?.label}。</p>
                <p>抽屉内容可以继续组合按钮、表单和状态提示。</p>
              </div>
            </Drawer>
          </div>
        </Panel>

        <Panel className="home-demo-panel home-demo-panel--paid" material="paperSoft">
          <BadgeIndicator material="success" shadow>
            ✓
          </BadgeIndicator>
          <h2>奖励已结算</h2>
          <p>你已完成今日任务奖励结算。</p>
        </Panel>
      </div>

      <div className="home-showcase__column home-showcase__column--edge">
        <Panel className="home-demo-panel home-demo-panel--finance" material="paperSoft">
          <div className="home-panel-heading">
            <h2>王国资产</h2>
            <p>查看今日组件收益。</p>
          </div>
          <strong className="home-price">$35.8K</strong>
          <BadgeIndicator material="success" shadow size="small">
            +3.4%
          </BadgeIndicator>
        </Panel>

        <Panel className="home-demo-panel home-demo-panel--select" material="paperSoft">
          <label className="home-field">
            <span>传送点</span>
            <Select
              ariaLabel="选择传送点"
              material="stone"
              onValueChange={setRegion}
              options={regionOptions}
              placeholder="选择传送点"
              value={region}
            />
          </label>
          <BadgeIndicator material="primaryStrong" shadow>
            已选择
          </BadgeIndicator>
        </Panel>

        <Panel className="home-demo-panel home-demo-panel--tabs" material="paperSoft">
          <Tabs
            defaultValue="team"
            listMaterial="stone"
            rootClassName="home-tabs-strip"
            selectedMaterial="primaryStrong"
            size="small"
          >
            <TabList>
              <Tab value="team">队伍</Tab>
              <Tab value="bag">背包</Tab>
              <Tab value="quest">任务</Tab>
            </TabList>
            <TabPanel value="team">三只宠物已就绪。</TabPanel>
            <TabPanel value="bag">补给与技能石充足。</TabPanel>
            <TabPanel value="quest">今日任务进度 82%。</TabPanel>
          </Tabs>
        </Panel>

        <Panel className="home-demo-panel home-demo-panel--slider" material="paperSoft">
          <div className="home-temperature">
            <span>20°C</span>
            <span>50°C</span>
            <span>80°C</span>
          </div>
          <Slider
            defaultValue={[35, 65]}
            max={100}
            min={0}
            rangeMaterial="primary"
            thumbAriaLabel={(index) => `温度值 ${index + 1}`}
            thumbMaterial="primary"
            trackMaterial="paperStrong"
          />
        </Panel>
      </div>
    </aside>
  )
}
