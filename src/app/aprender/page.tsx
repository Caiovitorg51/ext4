import { SectionReveal } from "@/components/section-reveal";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { educationSections } from "@/content/education";
import { extensionContent } from "@/content/extension";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Globe,
  Mail,
  Search,
  Shield,
} from "lucide-react";
import Link from "next/link";

const iconMap = {
  "mail-warning": Mail,
  "shield-alert": AlertTriangle,
  "check-shield": CheckCircle2,
} as const;

export default function AprenderPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionReveal>
        <div className="mb-12 flex items-center gap-3">
          <BookOpen className="h-10 w-10 text-accent" />
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">Aprender</h1>
            <p className="mt-1 text-muted">
              Guia completo sobre phishing por e-mail e prevenção
            </p>
          </div>
        </div>
      </SectionReveal>

      <nav className="mb-12 flex flex-wrap gap-2">
        {educationSections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-accent"
          >
            {s.title}
          </a>
        ))}
        <a
          href="#extensao"
          className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          Extensão
        </a>
      </nav>

      {educationSections.map((section, i) => {
        const Icon = iconMap[section.icon as keyof typeof iconMap] ?? Shield;
        return (
          <SectionReveal key={section.id} delay={i * 0.05}>
            <section id={section.id} className="mb-16 scroll-mt-24">
              <Card>
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <Icon className="h-8 w-8 text-accent" />
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  {section.content.map((p) => (
                    <p key={p.slice(0, 40)} className="mb-4 text-muted leading-relaxed">
                      {p}
                    </p>
                  ))}
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-sm text-foreground before:text-accent before:content-['•']"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </SectionReveal>
        );
      })}

      <SectionReveal>
        <section id="extensao" className="mb-16 scroll-mt-24">
          <Card className="border-accent/30">
            <CardContent className="p-8">
              <div className="mb-6 flex items-center gap-3">
                <Globe className="h-8 w-8 text-accent" />
                <h2 className="text-2xl font-bold">{extensionContent.title}</h2>
              </div>
              <p className="mb-8 text-muted leading-relaxed">
                {extensionContent.description}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {extensionContent.steps.map((step, idx) => (
                  <div
                    key={step.title}
                    className="rounded-lg border border-border bg-surface-elevated p-4"
                  >
                    <span className="text-xs font-mono text-accent">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm text-muted">{step.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-2 rounded-lg border border-dashed border-border p-4 text-sm text-muted">
                <Search className="h-4 w-4 shrink-0 text-accent" />
                <span>
                  Fluxo: E-mail aberto → Análise local → Consulta bases → Alerta
                  → Ação segura
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </SectionReveal>

      <SectionReveal>
        <div className="flex flex-wrap gap-4">
          <Link href="/jogo" className={buttonVariants({ size: "lg" })}>
            Praticar no simulador
          </Link>
          <Link
            href="/extensao"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Instalar extensão
          </Link>
        </div>
      </SectionReveal>
    </div>
  );
}
