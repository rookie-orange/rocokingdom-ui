import { Progress, Space, Stack } from 'rocokingdom-ui'

export function ProgressExample() {
  return (
    <Space align="center" rootClassName="w-full max-md:flex-col" size="large">
      <Stack rootClassName="w-full" size="middle">
        <Progress percent={36} status="active" />
        <Progress percent={100} status="success" />
        <Progress percent={68} status="danger" />
      </Stack>
      <Progress percent={72} type="circle" />
    </Space>
  )
}
