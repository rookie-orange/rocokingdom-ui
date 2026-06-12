import { gold, ink } from '@rocokingdom-ui/tokens'

export const buttonClassName = 'rk-button'

export function createButton(label = 'Button') {
  const button = document.createElement('button')

  button.type = 'button'
  button.className = buttonClassName
  button.textContent = label

  return button
}

export const buttonCss = `
.rk-button {
  appearance: none;
  background-color: var(--gold, ${gold});
  border: 0;
  border-radius: 9999px;
  color: var(--ink, ${ink});
  cursor: pointer;
  padding: 10px 18px;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    filter 160ms ease,
    transform 120ms ease;
}

.rk-button:hover {
  filter: brightness(1.08);
}

.rk-button:active {
  filter: brightness(0.9);
  transform: scale(0.94);
}
`.trim()
