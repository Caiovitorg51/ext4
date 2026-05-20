"use client";

import { PageTransition } from "@/components/page-transition";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type ScreenResult = {
  screenNumber: number;
  title: string;
  scorePercent: number;
  hint: string | null;
  hit: string[];
  missed: string[];
  falsePositives: string[];
};

type ResultData = {
  playerName: string;
  globalScore: number;
  screens: ScreenResult[];
};

export default function ResultadoPage() {
  const [data, setData] = useState<ResultData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/jogo/resultado")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Erro");
        setData(json);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-danger">{error || "Resultado indisponível"}</p>
        <Link href="/jogo" className={buttonVariants({ className: "mt-6" })}>
          Voltar ao início
        </Link>
      </div>
    );
  }

  const message =
    data.globalScore >= 80
      ? "Excelente! Você tem um olhar afiado para phishing."
      : data.globalScore >= 50
        ? "Bom progresso. Revise os indicadores que perdeu."
        : "Continue praticando — cada tela ensina padrões novos.";

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <Trophy className="mx-auto h-14 w-14 text-accent" />
          <h1 className="mt-4 text-3xl font-bold">Resultado final</h1>
          <p className="text-muted">
            Jogador: <span className="text-accent">{data.playerName}</span>
          </p>
          <p className="mt-6 text-6xl font-bold text-accent">
            {data.globalScore}%
          </p>
          <p className="mt-2 text-muted">{message}</p>
        </div>

        <div className="space-y-6">
          {data.screens.map((screen) => (
            <Card key={screen.screenNumber}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="font-semibold">
                    Tela {screen.screenNumber}: {screen.title}
                  </h2>
                  <span className="font-mono text-accent">
                    {screen.scorePercent}%
                  </span>
                </div>
                <Progress value={screen.scorePercent} className="mb-4" />
                {screen.hint && (
                  <p className="mb-4 rounded-lg bg-accent/10 p-3 text-sm text-muted">
                    {screen.hint}
                  </p>
                )}
                {screen.hit.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-medium text-success">Acertou:</p>
                    <ul className="mt-1 text-sm text-muted">
                      {screen.hit.map((h) => (
                        <li key={h}>✓ {h}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {screen.missed.length > 0 && (
                  <div className="mb-2">
                    <p className="text-xs font-medium text-warning">Perdeu:</p>
                    <ul className="mt-1 text-sm text-muted">
                      {screen.missed.map((m) => (
                        <li key={m}>○ {m}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {screen.falsePositives.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-danger">
                      Falso positivo:
                    </p>
                    <ul className="mt-1 text-sm text-muted">
                      {screen.falsePositives.map((f) => (
                        <li key={f}>△ {f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/jogo"
            className={buttonVariants({ variant: "secondary" })}
          >
            <RotateCcw className="h-4 w-4" />
            Tentar novamente
          </Link>
          <Link href="/aprender#como-evitar" className={buttonVariants()}>
            Como evitar
          </Link>
          <Link
            href="/extensao"
            className={buttonVariants({ variant: "outline" })}
          >
            Instalar extensão
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
