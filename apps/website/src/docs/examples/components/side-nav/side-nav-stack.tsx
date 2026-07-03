import { useState } from 'react'
import { SideNav, SideNavHeader, SideNavItem, SideNavList } from 'rocokingdom-ui'

const navItems: readonly {
  badge?: number
  disabled?: boolean
  icon: string
  label: string
  value: string
}[] = [
  { icon: '★', label: '今日任务', value: 'quest' },
  { badge: 3, icon: '✦', label: '宠物背包', value: 'bag' },
  { icon: '◆', label: '活动中心', value: 'event' },
  { disabled: true, icon: '●', label: '竞技场', value: 'arena' },
] as const

export function SideNavStackDemo() {
  const [active, setActive] = useState('quest')

  return (
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
  )
}
