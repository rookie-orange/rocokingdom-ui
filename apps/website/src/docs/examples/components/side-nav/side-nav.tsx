import { SideNav, SideNavHeader, SideNavItem, SideNavList } from 'rocokingdom-ui'

export function GameNav() {
  return (
    <SideNav>
      <SideNavHeader eyebrow="ROCO" title="王国菜单" />
      <SideNavList>
        <SideNavItem active icon="★">
          任务
        </SideNavItem>
      </SideNavList>
    </SideNav>
  )
}
