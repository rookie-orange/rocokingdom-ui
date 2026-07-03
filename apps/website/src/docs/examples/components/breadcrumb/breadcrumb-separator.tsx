import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'rocokingdom-ui'

export function BreadcrumbSeparatorDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">洛克王国 UI</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components/badge">Badge</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>徽标组件</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
