import { Tree } from 'rocokingdom-ui'

const treeData = [
  {
    children: [
      { key: 'academy', title: '魔法学院' },
      {
        children: [
          { key: 'shop', title: '商店街' },
          { key: 'hospital', title: '宠物医院' },
        ],
        key: 'avenue',
        title: '彼得大道',
      },
    ],
    key: 'kingdom',
    title: '洛克王国',
  },
]

export function TreeExample() {
  return (
    <Tree
      checkable
      defaultCheckedKeys={['academy']}
      defaultExpandedKeys={['kingdom', 'avenue']}
      treeData={treeData}
    />
  )
}
