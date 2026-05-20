"use client";

import { cn } from "@/lib/utils";

type CheckboxProps = {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function Checkbox({
  id,
  label,
  description,
  checked,
  onChange,
  disabled,
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer gap-3 rounded-lg border border-border p-3 transition-all duration-200",
        checked
          ? "border-accent/60 bg-accent/10"
          : "bg-surface hover:border-accent/30",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-accent"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {description && (
          <span className="text-xs text-muted">{description}</span>
        )}
      </span>
    </label>
  );
}
