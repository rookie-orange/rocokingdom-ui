import { useState } from 'react'
import { Button, Form, FormItem, Input, Stack } from 'rocokingdom-ui'

export function FormExample() {
  const [submittedName, setSubmittedName] = useState('')

  return (
    <Stack size="large">
      <Form
        onFinish={(values) => setSubmittedName(typeof values.name === 'string' ? values.name : '')}
        rootClassName="w-full max-w-md"
      >
        <FormItem htmlFor="pet-name" label="宠物名称" required>
          <Input
            id="pet-name"
            name="name"
            placeholder="输入宠物名称"
            required
            rootClassName="w-full"
          />
        </FormItem>
        <FormItem help="等级范围 1 到 100" htmlFor="pet-level" label="等级">
          <Input id="pet-level" max={100} min={1} name="level" type="number" />
        </FormItem>
        <Button shadow type="submit">
          保存资料
        </Button>
      </Form>
      {submittedName ? <span className="text-sm text-success">已保存：{submittedName}</span> : null}
    </Stack>
  )
}
