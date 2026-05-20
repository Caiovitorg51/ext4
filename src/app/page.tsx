import { SectionReveal } from "@/components/section-reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Globe,
  Gamepad2,
  MailWarning,
  Shield,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    href: "/aprender",
    icon: BookOpen,
    title: "Aprender",
    description:
      "Entenda como ataques de phishing por e-mail funcionam, técnicas comuns e como se proteger.",
  },
  {
    href: "/jogo",
    icon: Gamepad2,
    title: "Simulador",
    description:
      "Teste suas habilidades em 5 cenários realistas com cronômetro e pontuação.",
  },
  {
    href: "/extensao",
    icon: Globe,
    title: "Extensão",
    description:
      "Conheça a extensão Chrome que analisa e-mails com bases de dados de segurança.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionReveal>
          <Badge className="mb-6 border-accent/30 bg-accent/10 text-accent">
            Prevenção de phishing por e-mail
          </Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Aprenda a identificar{" "}
            <span className="bg-gradient-to-r from-accent to-accent-hover bg-clip-text text-transparent">
              e-mails maliciosos
            </span>{" "}
            antes de clicar
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            PhishGuard une educação interativa e tecnologia: treine seu olhar
            clínico no simulador e complemente com nossa extensão Chrome
            desenvolvida em parceria com especialistas em segurança.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/jogo" className={buttonVariants({ size: "lg" })}>
              Começar o desafio
            </Link>
            <Link
              href="/aprender"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Conteúdo educativo
            </Link>
          </div>
        </SectionReveal>
      </section>

      <section className="border-t border-border bg-surface/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionReveal>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">
              Sua jornada de aprendizado
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-muted">
              Três caminhos integrados para reduzir risco de phishing no dia a
              dia.
            </p>
          </SectionReveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <SectionReveal key={f.href} delay={i * 0.1}>
                <Link href={f.href} className="group block h-full">
                  <Card className="h-full transition-all duration-300 group-hover:border-accent/40 group-hover:glow-accent">
                    <CardContent className="flex h-full flex-col gap-4 pt-6">
                      <f.icon className="h-10 w-10 text-accent" />
                      <h3 className="text-xl font-semibold">{f.title}</h3>
                      <p className="flex-1 text-sm text-muted">{f.description}</p>
                      <span className="text-sm font-medium text-accent group-hover:underline">
                        Explorar →
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionReveal>
          <Card className="overflow-hidden border-accent/20">
            <CardContent className="flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center">
              <MailWarning className="h-16 w-16 shrink-0 text-warning" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold">Por que isso importa?</h2>
                <p className="mt-2 text-muted">
                  Mais de 90% dos ataques cibernéticos começam com um e-mail.
                  Reconhecer sinais de phishing protege você, sua família e sua
                  organização — sem depender só de sorte.
                </p>
              </div>
              <Link
                href="/extensao"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "inline-flex items-center gap-2"
                )}
              >
                <Shield className="h-4 w-4" />
                Ver extensão
              </Link>
            </CardContent>
          </Card>
        </SectionReveal>
      </section>
    </div>
  );
}
