import { useState } from 'react'
import { Pagination, Stack } from 'rocokingdom-ui'

export function PaginationExample() {
  const [page, setPage] = useState(6)

  return (
    <Stack size="middle">
      <Pagination current={page} onChange={setPage} showQuickJumper total={240} />
      <span className="text-sm text-stone/65">第 {page} 页</span>
    </Stack>
  )
}
