import { Tab, TabList, TabPanel, Tabs } from 'rocokingdom-ui'

export function TabsSizeDemo() {
  return (
    <Tabs defaultValue="map" listMaterial="stone" selectedMaterial="primaryStrong" size="large">
      <TabList>
        <Tab value="map">王国地图</Tab>
        <Tab value="friend">好友列表</Tab>
        <Tab value="shop">商店补给</Tab>
      </TabList>
      <TabPanel value="map">大尺寸标签会保留按钮同款拉伸底形。</TabPanel>
      <TabPanel value="friend">好友状态、邀请和组队入口可以放在同一组标签页内。</TabPanel>
      <TabPanel value="shop">大尺寸标签在操作型面板中更容易点击。</TabPanel>
    </Tabs>
  )
}
