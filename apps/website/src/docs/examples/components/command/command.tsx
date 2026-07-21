import { useState } from 'react'
import { Button, Command } from 'rocokingdom-ui'

const items = [
  { group: '导航', key: 'map', keywords: ['world'], label: '打开世界地图', shortcut: 'M' },
  { group: '导航', key: 'bag', keywords: ['item'], label: '打开背包', shortcut: 'B' },
  { group: '操作', key: 'save', label: '保存当前进度', shortcut: 'S' },
]

export function CommandExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} shadow>
        打开命令面板
      </Button>
      <Command items={items} onOpenChange={setOpen} open={open} />
    </>
  )
}
