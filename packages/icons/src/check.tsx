import type { IconProps } from './types'

function Check({ title, ...props }: IconProps) {
  return (
    <svg
      aria-hidden={title === undefined ? true : undefined}
      fill="currentColor"
      focusable="false"
      height="1em"
      role={title === undefined ? undefined : 'img'}
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {title === undefined ? undefined : <title>{title}</title>}
      <path d="M5.12781 11.0825C6.06705 11.399 8.41279 13.5643 9.46825 14.6074C10.2367 12.6795 16.1212 7.37768 18.9674 4.96776C20.2482 4.24838 23.1299 6.65829 20.7463 8.34884C18.3839 9.81637 13.5952 15.4107 11.4962 18.0245C11.2471 18.2763 11.3959 18.564 11.1048 18.8877C10.3933 19.6791 8.93459 19.6791 8.22304 18.8877C7.51149 18.0964 5.27012 15.5786 4.70088 15.3268C3.56241 15.6865 1.8547 14.6074 2.17489 12.7011C2.49509 10.7947 3.95376 10.6868 5.12781 11.0825Z" />
    </svg>
  )
}

export { Check, Check as RocoCheck }
