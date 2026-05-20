import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-muted",
        className
      )}
      {...props}
    />
  );
}
