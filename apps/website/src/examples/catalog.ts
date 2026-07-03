import {
  componentDocs,
  designDocs,
  docsRecords,
  iconDocs,
  overviewDocs,
  type DocsCategory,
} from '../docs/content/registry'

export type ExampleCategory = DocsCategory

export interface ExampleMeta {
  category: ExampleCategory
  description: string
  name: string
  path: string
  slug: string
}

function toExampleMeta(record: (typeof docsRecords)[number]): ExampleMeta {
  return {
    category: record.category,
    description: record.description,
    name: record.title,
    path: record.path,
    slug: record.slug,
  }
}

export const examples: ExampleMeta[] = docsRecords.map(toExampleMeta)
export const componentExamples = componentDocs.map(toExampleMeta)
export const designExamples = designDocs.map(toExampleMeta)
export const iconExamples = iconDocs.map(toExampleMeta)
export const overviewExamples = overviewDocs
  .filter((example) => example.path !== '/docs')
  .map(toExampleMeta)

export function getExampleBySlug(slug: string) {
  return examples.find((example) => example.slug === slug)
}
