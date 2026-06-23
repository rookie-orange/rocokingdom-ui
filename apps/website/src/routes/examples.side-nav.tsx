import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SideNav, SideNavHeader, SideNavItem, SideNavList } from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/examples/side-nav')({
  component: SideNavExamplePage,
})

const sideNavCode = `import { SideNav, SideNavHeader, SideNavItem, SideNavList } from 'rocokingdom-ui'

export function GameNav() {
  return (
    <SideNav>
      <SideNavHeader eyebrow="ROCO" title="王国菜单" />
      <SideNavList>
        <SideNavItem active icon="★">任务</SideNavItem>
      </SideNavList>
    </SideNav>
  )
}`

interface NavItem {
  badge?: number
  disabled?: boolean
  icon: string
  label: string
  value: string
}

const navItems: NavItem[] = [
  { icon: '★', label: '今日任务', value: 'quest' },
  { badge: 3, icon: '✦', label: '宠物背包', value: 'bag' },
  { icon: '◆', label: '活动中心', value: 'event' },
  { disabled: true, icon: '●', label: '竞技场', value: 'arena' },
] as const

function SideNavExamplePage() {
  const [active, setActive] = useState('quest')

  return (
    <ExampleShell
      code={sideNavCode}
      description="SideNav 提供游戏菜单样式，支持完整堆叠侧栏和窄轨图标栏。"
      highlights={[
        'variant 覆盖 stack、rail。',
        'Header 支持 icon、eyebrow、title 或自定义 children。',
        'Item 覆盖 active、badge、dot badge、disabled 和 icon。',
      ]}
      slug="side-nav"
      title="SideNav"
    >
      <ExampleSection title="堆叠导航">
        <PreviewSurface>
          <div className="rounded-lg bg-stone p-6">
            <SideNav aria-label="王国菜单">
              <SideNavHeader eyebrow="ROCO" icon="◆" title="王国菜单" />
              <SideNavList>
                {navItems.map((item) => (
                  <SideNavItem
                    active={active === item.value}
                    badge={item.badge}
                    disabled={item.disabled}
                    icon={item.icon}
                    key={item.value}
                    onClick={() => setActive(item.value)}
                  >
                    {item.label}
                  </SideNavItem>
                ))}
              </SideNavList>
            </SideNav>
          </div>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="窄轨导航">
        <PreviewSurface>
          <div className="rounded-lg bg-stone p-6">
            <SideNav aria-label="快捷入口" variant="rail">
              <SideNavHeader icon="◆" title="菜单" />
              <SideNavList>
                <SideNavItem active icon="★">
                  任务
                </SideNavItem>
                <SideNavItem badge icon="✦">
                  背包
                </SideNavItem>
                <SideNavItem icon="◆">活动</SideNavItem>
                <SideNavItem disabled icon="●">
                  竞技
                </SideNavItem>
              </SideNavList>
            </SideNav>
          </div>
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
