import { border, surface, text } from '../semantic/index.ts'

export const dialog = {
  header: {
    background: surface.dialogHeader,
    color: text.onDark,
    border: border.dark,
  },
  body: {
    background: surface.dialogBody,
    color: text.primary,
    border: border.light,
  },
  radius: '18px',
  shadow: '0 18px 0 rgb(35 35 35 / 12%), 0 24px 48px rgb(26 27 29 / 22%)',
} as const
