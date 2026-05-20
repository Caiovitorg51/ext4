"use client";

import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TimerProps = {
  seconds: number;
  onExpire: () => void;
  running?: boolean;
};

export function Timer({ seconds, onExpire, running = true }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;
  const urgent = remaining <= 30;

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          queueMicrotask(() => onExpireRef.current());
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, seconds]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = `${mins}:${secs.toString().padStart(2, "0")}`;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-lg tabular-nums transition-colors",
        urgent
          ? "animate-pulse border-danger/60 bg-danger/10 text-danger"
          : "border-border bg-surface-elevated text-foreground"
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <Clock className="h-5 w-5 shrink-0" aria-hidden />
      <span>{display}</span>
    </div>
  );
}
