import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const alertStyles = {
  note: {
    border: "border-blue-600 dark:border-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    ),
  },
  tip: {
    border: "border-green-600 dark:border-green-500",
    bg: "bg-green-50 dark:bg-green-950/40",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
      </svg>
    ),
  },
  warning: {
    border: "border-amber-600 dark:border-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
  error: {
    border: "border-red-600 dark:border-red-500",
    bg: "bg-red-50 dark:bg-red-950/40",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6" />
        <path d="M9 9l6 6" />
      </svg>
    ),
  },
} as const

type AlertType = keyof typeof alertStyles

interface AlertProps {
  type?: string
  children?: ReactNode
}

export function Alert({ type = "note", children }: AlertProps) {
  const style = alertStyles[type as AlertType] ?? alertStyles.note

  return (
    <div className={cn("not-prose my-4 flex gap-3 rounded-lg border-l-4 p-4", style.border, style.bg)}>
      {style.icon}
      <div className="text-sm leading-relaxed text-foreground [&>p:first-child]:mt-0 [&>p]:mt-2">
        {children}
      </div>
    </div>
  )
}
