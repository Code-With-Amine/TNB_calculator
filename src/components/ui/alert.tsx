import * as React from "react"
import { cn } from "@/lib/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Alert({ className, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg border border-border bg-background p-4 text-sm text-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5 className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  )
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div className={cn("text-muted-foreground", className)} {...props} />
  )
}
