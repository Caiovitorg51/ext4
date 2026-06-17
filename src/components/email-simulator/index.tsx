"use client";

import type { ReactNode } from "react";
import { EmailBancoFalso } from "./scenarios/banco-falso";
import { EmailCorreiosEntrega } from "./scenarios/correios-entrega";
import { EmailNotaFiscal } from "./scenarios/nota-fiscal";
import { EmailOauthFalso } from "./scenarios/oauth-falso";
import { EmailRhPremiacao } from "./scenarios/rh-premiacao";

const SCENARIOS: Record<string, () => ReactNode> = {
  "banco-falso": () => <EmailBancoFalso />,
  "correios-entrega": () => <EmailCorreiosEntrega />,
  "rh-premiacao": () => <EmailRhPremiacao />,
  "oauth-falso": () => <EmailOauthFalso />,
  "nota-fiscal": () => <EmailNotaFiscal />,
};

type EmailSimulatorProps = {
  slug: string;
};

export function EmailSimulator({ slug }: EmailSimulatorProps) {
  const render = SCENARIOS[slug];
  if (!render) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-lg bg-surface-elevated text-muted">
        Cenário não encontrado: {slug}
      </div>
    );
  }
  return <div className="w-full">{render()}</div>;
}
