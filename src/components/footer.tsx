import { Shield } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Shield className="h-4 w-4 text-accent" aria-hidden />
          <span>Projeto acadêmico — Equipe Web + Equipe Extensão Chrome</span>
        </div>
        <div className="flex gap-6 text-sm">
          <Link href="/aprender" className="text-muted hover:text-accent">
            Aprender
          </Link>
          <Link href="/jogo" className="text-muted hover:text-accent">
            Simulador
          </Link>
          <Link href="/extensao" className="text-muted hover:text-accent">
            Extensão
          </Link>
        </div>
      </div>
    </footer>
  );
}
