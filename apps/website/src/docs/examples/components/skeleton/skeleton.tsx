import { Skeleton, Space, Stack } from 'rocokingdom-ui'

export function SkeletonExample() {
  return (
    <Space align="start" size="middle">
      <Skeleton active height={52} shape="circle" width={52} />
      <Stack rootClassName="w-64 max-w-full" size="small">
        <Skeleton active height={18} width="60%" />
        <Skeleton active height={14} />
        <Skeleton active height={14} width="82%" />
      </Stack>
    </Space>
  )
}
