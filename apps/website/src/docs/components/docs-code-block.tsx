import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface DocsCodeBlockProps {
  code: string
  label?: string
}

export function DocsCodeBlock({ code, label = '代码示例' }: DocsCodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)
  const resetTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== undefined) {
        window.clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  function copyCode() {
    void navigator.clipboard
      ?.writeText(code)
      .then(() => {
        setIsCopied(true)

        if (resetTimeoutRef.current !== undefined) {
          window.clearTimeout(resetTimeoutRef.current)
        }

        resetTimeoutRef.current = window.setTimeout(() => {
          setIsCopied(false)
          resetTimeoutRef.current = undefined
        }, 1800)
      })
      .catch(() => {
        setIsCopied(false)
      })
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone/15 bg-stone text-on-stone shadow-[0_12px_0_var(--rk-shadow-soft-color)]">
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-white/10 px-4 py-2">
        <span className="min-w-0 truncate text-sm text-on-stone/70">{label}</span>
        <button
          aria-label={isCopied ? '代码已复制' : '复制代码'}
          className="grid size-9 shrink-0 place-items-center rounded-lg text-on-stone/70 transition hover:bg-white/10 hover:text-on-stone focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={copyCode}
          title={isCopied ? '已复制' : '复制代码'}
          type="button"
        >
          {isCopied ? (
            <Check aria-hidden="true" size={17} />
          ) : (
            <Copy aria-hidden="true" size={17} />
          )}
        </button>
      </div>
      <pre className="max-h-[34rem] overflow-auto p-5 text-sm leading-6 max-sm:p-4">
        <code>{code}</code>
      </pre>
    </div>
  )
}
