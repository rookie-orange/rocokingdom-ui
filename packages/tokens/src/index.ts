export const paper = '#f4f0e8'
export const stone = '#242628'
export const ink = '#222222'
export const gold = '#e7bf67'

export const colors = {
  paper,
  stone,
  ink,
  gold,
} as const

export const tokensCss = `:root {
  --paper: ${paper};
  --stone: ${stone};
  --ink: ${ink};
  --gold: ${gold};
}`
