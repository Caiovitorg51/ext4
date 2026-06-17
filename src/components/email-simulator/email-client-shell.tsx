"use client";

import { cn } from "@/lib/utils";
import {
  Archive,
  Inbox,
  Mail,
  MoreVertical,
  Paperclip,
  Reply,
  Star,
  Trash2,
} from "lucide-react";
import { BrowserChrome } from "./browser-chrome";

type EmailClientShellProps = {
  browserUrl: string;
  tabTitle?: string;
  fromName: string;
  fromEmail: string;
  toLabel?: string;
  subject: string;
  date?: string;
  children: React.ReactNode;
  className?: string;
};

export function EmailClientShell({
  browserUrl,
  tabTitle,
  fromName,
  fromEmail,
  toLabel = "para mim",
  subject,
  date = "Hoje, 09:42",
  children,
  className,
}: EmailClientShellProps) {
  return (
    <div
      className={cn(
        "flex max-h-[min(70vh,640px)] min-h-[420px] flex-col overflow-hidden rounded-b-lg shadow-inner",
        className
      )}
    >
      <BrowserChrome url={browserUrl} tabTitle={tabTitle ?? subject} insecure />

      <div className="flex min-h-0 flex-1 bg-[#f6f8fc] text-[#202124]">
        <aside className="hidden w-14 shrink-0 flex-col items-center gap-4 border-r border-[#dadce0] bg-white py-4 sm:flex">
          <Inbox className="h-5 w-5 text-[#1a73e8]" />
          <Star className="h-5 w-5 text-[#5f6368]" />
          <Mail className="h-5 w-5 text-[#5f6368]" />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-2 border-b border-[#dadce0] bg-white px-3 py-2">
            <div className="flex gap-1 text-[#5f6368]">
              <Archive className="h-4 w-4" />
              <Trash2 className="h-4 w-4" />
              <Reply className="h-4 w-4" />
            </div>
            <MoreVertical className="ml-auto h-4 w-4 text-[#5f6368]" />
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto bg-white">
            <div className="border-b border-[#dadce0] px-4 py-4 sm:px-6">
              <h2 className="text-xl font-normal text-[#202124]">{subject}</h2>
              <div className="mt-4 flex flex-wrap items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ea4335] text-sm font-bold text-white">
                  {fromName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="font-medium text-[#202124]">{fromName}</span>
                    <span className="font-mono text-xs text-[#5f6368]">
                      &lt;{fromEmail}&gt;
                    </span>
                  </div>
                  <p className="text-xs text-[#5f6368]">
                    {toLabel} · {date}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-4 py-5 text-sm leading-relaxed text-[#3c4043] sm:px-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmailAttachment({
  name,
  size,
  dangerous,
}: {
  name: string;
  size: string;
  dangerous?: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-4 inline-flex items-center gap-2 rounded-lg border px-3 py-2",
        dangerous
          ? "border-red-300 bg-red-50"
          : "border-[#dadce0] bg-[#f8f9fa]"
      )}
    >
      <Paperclip className={cn("h-4 w-4", dangerous ? "text-red-600" : "text-[#5f6368]")} />
      <div>
        <p className={cn("font-medium", dangerous && "text-red-800")}>{name}</p>
        <p className="text-xs text-[#5f6368]">{size}</p>
      </div>
    </div>
  );
}

export function EmailCtaButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "google" | "danger";
}) {
  const styles = {
    primary: "bg-[#1a73e8] hover:bg-[#1765cc] text-white",
    google: "bg-white border border-[#dadce0] text-[#3c4043] shadow-sm",
    danger: "bg-[#dc2626] hover:bg-[#b91c1c] text-white",
  };
  return (
    <button
      type="button"
      onClick={(e) => e.preventDefault()}
      className={cn(
        "mt-4 inline-flex items-center gap-2 rounded px-5 py-2.5 text-sm font-medium transition-colors",
        styles[variant]
      )}
    >
      {children}
    </button>
  );
}
