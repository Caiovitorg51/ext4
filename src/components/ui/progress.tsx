import { cn } from "@/lib/utils";

type ProgressProps = {
  value: number;
  max?: number;
  className?: string;
  label?: string;
};

export function Progress({ value, max = 100, className, label }: ProgressProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-muted">{label}</span>
          <span className="font-medium text-accent">{Math.round(percent)}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-surface-elevated">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
