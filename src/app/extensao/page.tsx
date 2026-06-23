import { SectionReveal } from "@/components/section-reveal";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { extensionContent } from "@/content/extension";
import { ExternalLink, Globe, Shield } from "lucide-react";
import Link from "next/link";

const storeUrl =
  process.env.NEXT_PUBLIC_CHROME_STORE_URL ??
  "https://chromewebstore.google.com/detail/alertaweb-%E2%80%94-detector-de-g/dmdjmfnoofdeidcbiahlofffcnjabfkh?hl=pt-BR";

export default function ExtensaoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
      <SectionReveal>
        <div className="flex items-center gap-4">
          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4">
            <Globe className="h-12 w-12 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Extensão AlertaWeb
            </h1>
            <p className="mt-2 text-muted">
              Detector de golpes — proteção em tempo real no Chrome
            </p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <Card className="mt-10">
          <CardContent className="space-y-6 p-8">
            <p className="leading-relaxed text-muted">
              {extensionContent.description}
            </p>
            <ul className="space-y-4">
              {extensionContent.steps.map((step) => (
                <li key={step.title} className="flex gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted">{step.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <div className="mt-10 flex flex-col items-center gap-4 rounded-xl border border-border bg-surface p-8 text-center">
          <p className="text-muted">
            Instale gratuitamente na Chrome Web Store.
          </p>
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg" })}
          >
            <Globe className="h-5 w-5" />
            Instalar no Chrome
            <ExternalLink className="h-4 w-4 opacity-70" />
          </a>
          <Link
            href="/jogo"
            className="text-sm text-accent hover:underline"
          >
            Ou treine primeiro no simulador →
          </Link>
        </div>
      </SectionReveal>
    </div>
  );
}
