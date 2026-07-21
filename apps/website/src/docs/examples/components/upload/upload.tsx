import { Upload } from 'rocokingdom-ui'

export function UploadExample() {
  return (
    <Upload accept="image/png,image/jpeg" maxCount={3} multiple variant="drag">
      上传宠物截图
    </Upload>
  )
}
