import { Textarea } from 'rocokingdom-ui'

export function QuestTextarea() {
  return <Textarea maxLength={120} name="questNote" placeholder="记录任务线索" showCount />
}
