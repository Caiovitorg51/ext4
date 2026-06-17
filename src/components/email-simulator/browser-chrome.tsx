"use client";

import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  MoreHorizontal,
  RefreshCw,
  Star,
} from "lucide-react";

type BrowserChromeProps = {
  url: string;
  tabTitle?: string;
  insecure?: boolean;
  className?: string;
};

export function BrowserChrome({
  url,
  tabTitle = "Caixa de entrada",
  insecure = true,
  className,
}: BrowserChromeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-t-lg border-b border-[#3d4f63] bg-[#202124] text-[#e8eaed]",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-[#3d4f63] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-md flex-1 items-center gap-2 rounded-md bg-[#35363a] px-3 py-1.5 text-xs">
          <Star className="h-3 w-3 shrink-0 text-[#9aa0a6]" />
          <span className="truncate">{tabTitle}</span>
        </div>
        <MoreHorizontal className="h-4 w-4 text-[#9aa0a6]" />
      </div>
      <div className="flex items-center gap-2 px-2 py-2">
        <ChevronLeft className="h-4 w-4 text-[#9aa0a6]" />
        <ChevronRight className="h-4 w-4 text-[#9aa0a6]" />
        <RefreshCw className="h-3.5 w-3.5 text-[#9aa0a6]" />
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2 rounded-full px-4 py-1.5 text-xs",
            insecure ? "bg-[#3c2a2a]" : "bg-[#35363a]"
          )}
        >
          {insecure ? (
            <Lock className="h-3.5 w-3.5 shrink-0 text-[#f28b82]" />
          ) : (
            <Lock className="h-3.5 w-3.5 shrink-0 text-[#81c995]" />
          )}
          <span className="truncate font-mono">{url}</span>
        </div>
      </div>
    </div>
  );
}
