"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type FakeLinkProps = {
  children: React.ReactNode;
  displayHref: string;
  realHref: string;
  className?: string;
};

/** Link falso: texto amigável vs URL real (visível ao passar o mouse). */
export function FakeLink({
  children,
  displayHref,
  realHref,
  className,
}: FakeLinkProps) {
  const [hover, setHover] = useState(false);

  return (
    <span className="relative inline">
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          "font-medium text-[#1a73e8] underline decoration-[#1a73e8]/40 hover:decoration-[#1a73e8]",
          className
        )}
      >
        {children}
      </a>
      {hover && (
        <span
          className="absolute left-0 top-full z-10 mt-1 max-w-xs rounded border border-amber-500/40 bg-amber-950 px-2 py-1 font-mono text-[10px] text-amber-200 shadow-lg"
          role="tooltip"
        >
          <span className="block text-amber-400/80">Exibido: {displayHref}</span>
          <span className="block text-red-300">Real: {realHref}</span>
        </span>
      )}
    </span>
  );
}
