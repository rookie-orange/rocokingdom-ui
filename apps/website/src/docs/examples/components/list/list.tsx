import { Avatar, Button, List, ListItem, ListItemMeta } from 'rocokingdom-ui'

const quests = [
  { description: '前往商店街收集三份线索', owner: '罗宾', title: '失踪的货物' },
  { description: '在城堡露台寻找异常光点', owner: '兰斯洛', title: '夜空异象' },
  { description: '将药草送到宠物医院', owner: '萌萌', title: '紧急配送' },
]

export function ListExample() {
  return (
    <List
      bordered
      dataSource={quests}
      header="王国委托"
      renderItem={(quest) => (
        <ListItem
          actions={[
            <Button key="open" size="small" variant="outline">
              查看
            </Button>,
          ]}
        >
          <ListItemMeta
            avatar={<Avatar alt={quest.owner} material="primary" />}
            description={quest.description}
            title={quest.title}
          />
        </ListItem>
      )}
    />
  )
}
