"use client";

import { PageTransition } from "@/components/page-transition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JogoCadastroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/jogo/iniciar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Erro ao iniciar");
        setLoading(false);
        return;
      }
      router.push("/jogo/1");
    } catch {
      setError("Falha de conexão. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-8 text-center">
          <Gamepad2 className="mx-auto h-12 w-12 text-accent" />
          <h1 className="mt-4 text-3xl font-bold">Simulador de phishing</h1>
          <p className="mt-2 text-muted">
            5 e-mails simulados · 2 minutos por tela · marque os indicadores
            suspeitos
          </p>
        </div>

        <Card className="glow-accent">
          <CardContent className="p-8">
            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="player-name"
                  className="mb-2 block text-sm font-medium"
                >
                  Nome do jogador
                </label>
                <input
                  id="player-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Ana_Segura"
                  maxLength={24}
                  required
                  minLength={2}
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-3 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  disabled={loading}
                />
                <p className="mt-1 text-xs text-muted">
                  2 a 24 caracteres. Sem e-mail ou senha.
                </p>
              </div>

              {error && (
                <p className="text-sm text-danger" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Iniciar desafio"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
