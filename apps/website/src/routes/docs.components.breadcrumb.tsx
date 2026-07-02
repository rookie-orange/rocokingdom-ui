import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from 'rocokingdom-ui'
import { ExampleSection, ExampleShell, PreviewSurface } from '../examples/example-shell'

export const Route = createFileRoute('/docs/components/breadcrumb')({
  component: BreadcrumbExamplePage,
})

const breadcrumbCode = `import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from 'rocokingdom-ui'

export function DocsBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}`

function BreadcrumbExamplePage() {
  return (
    <ExampleShell
      code={breadcrumbCode}
      description="Breadcrumb 使用 nav、ol、li 和 aria-current 呈现当前位置层级，并通过 Radix Slot 支持 asChild 链接。"
      highlights={[
        'BreadcrumbLink 默认渲染 a，也可 asChild 接入 TanStack Router Link。',
        'BreadcrumbPage 默认设置 aria-current="page"。',
        'BreadcrumbSeparator 与 BreadcrumbEllipsis 覆盖分隔符和折叠路径。',
      ]}
      title="Breadcrumb"
    >
      <ExampleSection
        description="基础结构由 Breadcrumb、BreadcrumbList、BreadcrumbItem、BreadcrumbLink 和 BreadcrumbPage 组合。"
        title="基础面包屑"
      >
        <PreviewSurface>
          <Breadcrumb aria-label="文档路径">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/docs">Docs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/docs/overview/components">Components</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="省略路径">
        <PreviewSurface>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis label="更多层级" />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Slider</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </PreviewSurface>
      </ExampleSection>

      <ExampleSection title="自定义分隔符">
        <PreviewSurface>
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
        </PreviewSurface>
      </ExampleSection>
    </ExampleShell>
  )
}
