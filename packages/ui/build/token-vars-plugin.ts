import { colors } from '../../tokens/src/index.ts'

export const tokenVarsId = 'virtual:rocokingdom-ui-token-vars.css'

export function createTokenVarsCss() {
  return `:root {
  --paper: ${colors.paper.toLowerCase()};
  --stone: ${colors.stone.toLowerCase()};
  --ink: ${colors.ink.toLowerCase()};
  --gold: ${colors.gold.toLowerCase()};
}
`
}

export function tokenVarsPlugin() {
  return {
    name: 'rocokingdom-ui-token-vars',
    resolveId(source: string) {
      return source === tokenVarsId ? tokenVarsId : null
    },
    load(id: string) {
      return id === tokenVarsId ? createTokenVarsCss() : null
    },
  }
}
