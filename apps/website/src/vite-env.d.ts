/// <reference types="vite-plus/client" />

declare module '*.css' {}

declare module '*.png' {
  const src: string
  export default src
}
