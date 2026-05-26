import * as React from "react"

type BadgeProps = React.HTMLAttributes<HTMLDivElement>

export function Badge({
  className = "",
  ...props
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white ${className}`}
      {...props}
    />
  )
}