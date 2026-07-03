import type { ComponentType } from 'react'

type ExampleModule = Record<string, unknown>

export interface DocsExampleEntry {
  Component: ComponentType
  source: string
}

const moduleFiles = import.meta.glob<ExampleModule>(['./**/*.tsx', '!./registry.tsx'], {
  eager: true,
})
const sourceFiles = import.meta.glob(['./**/*.tsx', '!./registry.tsx'], {
  eager: true,
  import: 'default',
  query: '?raw',
})

function normalizeExampleId(path: string) {
  return path.replace(/^\.\//, '').replace(/\.tsx$/, '')
}

function findExampleComponent(module: ExampleModule, id: string) {
  for (const exported of Object.values(module)) {
    if (typeof exported === 'function') {
      return exported as ComponentType
    }
  }

  throw new Error(`No React component export found for docs example "${id}".`)
}

const examples = new Map<string, DocsExampleEntry>()

for (const [path, module] of Object.entries(moduleFiles)) {
  const id = normalizeExampleId(path)
  const source = sourceFiles[path]

  if (typeof source !== 'string') {
    throw new Error(`No source file found for docs example "${id}".`)
  }

  examples.set(id, {
    Component: findExampleComponent(module, id),
    source,
  })
}

export function getDocsExample(id: string) {
  return examples.get(id)
}
