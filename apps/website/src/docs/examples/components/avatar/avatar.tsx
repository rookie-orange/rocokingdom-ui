import { Avatar, AvatarGroup, Space, Stack } from 'rocokingdom-ui'

export function AvatarExample() {
  return (
    <Stack size="large">
      <Space align="center" size="middle">
        <Avatar alt="迪莫" material="primary" size="large" />
        <Avatar alt="喵喵" material="success" shape="square" />
        <Avatar alt="火花" material="danger" size={56} />
      </Space>
      <AvatarGroup max={3}>
        <Avatar alt="迪莫" material="primary" />
        <Avatar alt="喵喵" material="success" />
        <Avatar alt="火花" material="danger" />
        <Avatar alt="水蓝蓝" material="stoneMuted" />
        <Avatar alt="阿布" material="primaryStrong" />
      </AvatarGroup>
    </Stack>
  )
}
