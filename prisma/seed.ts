import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const scenarios = [
  {
    id: 1,
    slug: "banco-falso",
    imagePath: "/simulado/banco-falso",
    title: "Alerta de segurança — Banco Nacional",
    correctIndicatorIds: [
      "sender-suspicious",
      "link-mismatch",
      "urgency-threat",
      "credentials-request",
    ],
    hint: "Bancos reais não pedem senha por link em e-mail. Confira o domínio do remetente com atenção.",
  },
  {
    id: 2,
    slug: "correios-entrega",
    imagePath: "/simulado/correios-entrega",
    title: "Taxa de importação — Correios Express",
    correctIndicatorIds: [
      "sender-suspicious",
      "urgency-threat",
      "unexpected-attachment",
      "impersonal-greeting",
    ],
    hint: "Serviços de entrega oficiais usam domínios governamentais ou corporativos verificáveis.",
  },
  {
    id: 3,
    slug: "rh-premiacao",
    imagePath: "/simulado/rh-premiacao",
    title: "RH — Confirme seus dados para premiação",
    correctIndicatorIds: [
      "spoofed-internal",
      "credentials-request",
      "impersonal-greeting",
      "link-mismatch",
    ],
    hint: "E-mails internos de RH vêm do domínio da empresa, não de Gmail ou Outlook genérico.",
  },
  {
    id: 4,
    slug: "oauth-falso",
    imagePath: "/simulado/oauth-falso",
    title: "Acesso compartilhado — Documento Google",
    correctIndicatorIds: [
      "fake-oauth",
      "sender-suspicious",
      "urgency-threat",
      "link-mismatch",
    ],
    hint: "Botões de login devem levar apenas a domínios oficiais (google.com, microsoft.com).",
  },
  {
    id: 5,
    slug: "nota-fiscal",
    imagePath: "/simulado/nota-fiscal",
    title: "NF-e disponível — Faturamento",
    correctIndicatorIds: [
      "invoice-scam",
      "unexpected-attachment",
      "sender-suspicious",
      "low-quality-branding",
    ],
    hint: "Notas fiscais legítimas costumam vir de sistemas conhecidos; desconfie de PDFs não solicitados.",
  },
];

async function main() {
  for (const scenario of scenarios) {
    await prisma.phishingScenario.upsert({
      where: { id: scenario.id },
      update: scenario,
      create: scenario,
    });
  }
  console.log(`Seed: ${scenarios.length} cenários de phishing criados.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
