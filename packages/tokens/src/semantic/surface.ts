import { material, neutral } from '../primitive/index.ts'

export const surface = {
  canvas: neutral.surface1,
  panel: neutral.surface0,
  panelMuted: neutral.surface2,
  paper: material.paper,
  paperRaised: material.paperRaised,
  stone: material.stone,
  stoneRaised: material.stoneRaised,
  dialogHeader: material.stonePressed,
  dialogBody: material.paper,
  drawer: material.stonePressed,
  overlay: 'rgb(26 27 29 / 58%)',
} as const
