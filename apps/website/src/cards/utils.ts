export function cn(...classNames: Array<false | null | string | undefined>) {
  return classNames.filter(Boolean).join(' ')
}
