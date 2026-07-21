import { Table, Tag, type TableColumn } from 'rocokingdom-ui'

interface PetRecord {
  element: string
  level: number
  name: string
  status: '出战' | '休息'
}

const data: readonly PetRecord[] = [
  { element: '光', level: 42, name: '迪莫', status: '出战' },
  { element: '草', level: 28, name: '喵喵', status: '休息' },
  { element: '火', level: 35, name: '火花', status: '出战' },
  { element: '水', level: 31, name: '水蓝蓝', status: '休息' },
]

const columns: readonly TableColumn<PetRecord>[] = [
  { dataIndex: 'name', fixed: 'left', key: 'name', sorter: true, title: '宠物', width: 120 },
  {
    dataIndex: 'element',
    filters: [
      { text: '火', value: '火' },
      { text: '水', value: '水' },
    ],
    key: 'element',
    onFilter: (value, record) => record.element === value,
    title: '属性',
  },
  {
    align: 'right',
    dataIndex: 'level',
    key: 'level',
    sorter: (a, b) => a.level - b.level,
    title: '等级',
  },
  {
    dataIndex: 'status',
    key: 'status',
    render: (value) => (
      <Tag material={value === '出战' ? 'success' : 'paperStrong'}>{String(value)}</Tag>
    ),
    title: '状态',
  },
]

export function TableExample() {
  return <Table bordered columns={columns} dataSource={data} rowKey="name" striped />
}
