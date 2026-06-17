"use client";

import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import type { Indicator } from "@/lib/indicators";
import { EmailSimulator } from "@/components/email-simulator";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type GameScreenProps = {
  screenNumber: number;
  totalScreens: number;
  title: string;
  slug: string;
  playerName: string;
  indicators: Indicator[];
};

export function GameScreen({
  screenNumber,
  totalScreens,
  title,
  slug,
  playerName,
  indicators,
}: GameScreenProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [startTime] = useState(() => Date.now());

  const toggle = (id: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const submit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);

    try {
      const res = await fetch("/api/jogo/tela", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          screenNumber,
          selectedIndicators: Array.from(selected),
          timeSpentSeconds,
        }),
      });

      if (!res.ok) throw new Error("Falha ao enviar");

      if (screenNumber >= totalScreens) {
        router.push("/jogo/resultado");
      } else {
        router.push(`/jogo/${screenNumber + 1}`);
      }
    } catch {
      setSubmitting(false);
      alert("Erro ao salvar. Tente novamente.");
    }
  }, [submitting, startTime, screenNumber, selected, totalScreens, router]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6">
          <p className="text-sm text-muted">
            Jogador: <span className="text-accent">{playerName}</span>
          </p>
          <h1 className="mt-1 text-2xl font-bold">
            Tela {screenNumber} de {totalScreens}
          </h1>
          <p className="text-muted">{title}</p>
        </div>

        <Progress
          value={screenNumber}
          max={totalScreens}
          label="Progresso do desafio"
          className="mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-xl border border-border bg-[#0f1419] shadow-xl ring-1 ring-border/50">
            <div className="border-b border-border bg-surface-elevated px-4 py-2 text-xs text-muted">
              Simulação — webmail no navegador (examine remetente, links e anexos)
            </div>
            <EmailSimulator slug={slug} />
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-surface p-4">
              <h2 className="mb-1 font-semibold">Indicadores de phishing</h2>
              <p className="mb-4 text-sm text-muted">
                Marque todos os sinais que você identificar neste e-mail.
              </p>
              <div className="flex max-h-[min(60vh,480px)] flex-col gap-2 overflow-y-auto pr-1">
                {indicators.map((ind) => (
                  <Checkbox
                    key={ind.id}
                    id={`${screenNumber}-${ind.id}`}
                    label={ind.label}
                    description={ind.description}
                    checked={selected.has(ind.id)}
                    onChange={(c) => toggle(ind.id, c)}
                    disabled={submitting}
                  />
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => void submit()}
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : screenNumber >= totalScreens ? (
                "Ver resultado"
              ) : (
                <>
                  Próxima tela
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
