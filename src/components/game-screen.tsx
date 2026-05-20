"use client";

import { PageTransition } from "@/components/page-transition";
import { Timer } from "@/components/timer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import type { Indicator } from "@/lib/indicators";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type GameScreenProps = {
  screenNumber: number;
  totalScreens: number;
  title: string;
  imagePath: string;
  playerName: string;
  indicators: Indicator[];
};

export function GameScreen({
  screenNumber,
  totalScreens,
  title,
  imagePath,
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

  const handleExpire = useCallback(() => {
    void submit();
  }, [submit]);

  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted">
              Jogador: <span className="text-accent">{playerName}</span>
            </p>
            <h1 className="mt-1 text-2xl font-bold">
              Tela {screenNumber} de {totalScreens}
            </h1>
            <p className="text-muted">{title}</p>
          </div>
          <Timer
            key={screenNumber}
            seconds={120}
            onExpire={handleExpire}
            running={!submitting}
          />
        </div>

        <Progress
          value={screenNumber}
          max={totalScreens}
          label="Progresso do desafio"
          className="mb-8"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
            <div className="border-b border-border bg-surface-elevated px-4 py-2 text-xs text-muted">
              Simulação de cliente de e-mail
            </div>
            <div className="relative aspect-[4/3] w-full bg-[#1e293b] sm:aspect-[16/10]">
              <Image
                src={imagePath}
                alt={title}
                fill
                className="object-contain p-2"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
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
