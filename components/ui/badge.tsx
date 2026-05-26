import * as React from "react"

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Badge({
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}