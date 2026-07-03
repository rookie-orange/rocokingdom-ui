import { SideNav, SideNavHeader, SideNavItem, SideNavList } from 'rocokingdom-ui'

export function SideNavRailDemo() {
  return (
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
  )
}
