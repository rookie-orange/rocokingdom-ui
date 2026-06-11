import { component } from './component/index.ts'
import { primitive } from './primitive/index.ts'
import { semantic } from './semantic/index.ts'
import { type ThemeName, themeNames, themes } from './theme/index.ts'

export type TokenValue = string

export type TokenTree = {
  readonly [key: string]: TokenValue | TokenTree
}

export type TokenPath = string | readonly string[]

export type CssVarOptions = {
  readonly prefix?: string
}

export type CssBlockOptions = CssVarOptions & {
  readonly selector?: string
}

export type ThemeCssOptions = CssBlockOptions & {
  readonly themeAttribute?: string
}

export type TokensCssOptions = CssVarOptions & {
  readonly baseSelector?: string
  readonly themeAttribute?: string
  readonly includeBase?: boolean
  readonly includeThemes?: boolean
}

type CssDeclaration = {
  readonly name: string
  readonly value: string
}

const defaultPrefix = 'rk'

const baseGroups = [
  ['neutral', primitive.neutral],
  ['gold', primitive.gold],
  ['magic', primitive.magic],
  ['rarity', primitive.rarity],
  ['material', primitive.material],
  ['space', primitive.space],
  ['radius', primitive.radius],
  ['border-width', primitive.borderWidth],
  ['font', primitive.font],
  ['control', primitive.control],
  ['motion', primitive.motion],
  ['opacity', primitive.opacity],
  ['z-index', primitive.zIndex],
  ['surface', semantic.surface],
  ['text', semantic.text],
  ['border', semantic.border],
  ['state', semantic.state],
  ['button', component.button],
  ['dialog', component.dialog],
  ['drawer', component.drawer],
] as const

export function cssVar(path: TokenPath, fallback?: string, options: CssVarOptions = {}) {
  const name = toCssVariableName(options.prefix ?? defaultPrefix, parseTokenPath(path))

  return fallback ? `var(${name}, ${fallback})` : `var(${name})`
}

export function createBaseCss(options: CssBlockOptions = {}) {
  const prefix = options.prefix ?? defaultPrefix
  const declarations = baseGroups.flatMap(([path, value]) =>
    flattenToCssDeclarations(value, prefix, [path]),
  )

  return createCssBlock(options.selector ?? ':root', declarations)
}

export function createThemeCss(themeName: ThemeName, options: ThemeCssOptions = {}) {
  const selector =
    options.selector ?? createThemeSelector(themeName, options.themeAttribute ?? 'data-rk-theme')

  return createCssBlock(
    selector,
    flattenToCssDeclarations(themes[themeName], options.prefix ?? defaultPrefix),
  )
}

export function createTokensCss(options: TokensCssOptions = {}) {
  const includeBase = options.includeBase ?? true
  const includeThemes = options.includeThemes ?? true
  const blocks: string[] = []

  if (includeBase) {
    blocks.push(
      createBaseCss({
        prefix: options.prefix,
        selector: options.baseSelector ?? ':root',
      }),
    )
  }

  if (includeThemes) {
    for (const themeName of themeNames) {
      blocks.push(
        createThemeCss(themeName, {
          prefix: options.prefix,
          themeAttribute: options.themeAttribute,
        }),
      )
    }
  }

  return blocks.join('\n\n')
}

function createThemeSelector(themeName: ThemeName, themeAttribute: string) {
  const themeSelector = `[${themeAttribute}="${themeName}"]`

  return themeName === 'light' ? `:root, ${themeSelector}` : themeSelector
}

function createCssBlock(selector: string, declarations: readonly CssDeclaration[]) {
  const body = declarations.map(({ name, value }) => `  ${name}: ${value};`).join('\n')

  return `${selector} {\n${body}\n}`
}

function flattenToCssDeclarations(
  tree: unknown,
  prefix: string,
  path: readonly string[] = [],
): CssDeclaration[] {
  if (!isRecord(tree)) {
    return []
  }

  return Object.entries(tree).flatMap(([key, value]) => {
    const nextPath = [...path, key]

    if (typeof value === 'string' || typeof value === 'number') {
      return [
        {
          name: toCssVariableName(prefix, nextPath),
          value: String(value),
        },
      ]
    }

    return flattenToCssDeclarations(value, prefix, nextPath)
  })
}

function parseTokenPath(path: TokenPath) {
  return typeof path === 'string' ? path.split('.') : [...path]
}

function toCssVariableName(prefix: string, path: readonly string[]) {
  return `--${kebabCase([prefix, ...path].join('-'))}`
}

function kebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/[._\s]+/g, '-')
    .toLowerCase()
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
