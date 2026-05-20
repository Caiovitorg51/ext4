export type Indicator = {
  id: string;
  label: string;
  description: string;
};

export const INDICATORS: Indicator[] = [
  {
    id: "sender-suspicious",
    label: "Remetente ou domínio suspeito",
    description: "Endereço parecido com marca real, mas com typos ou domínio genérico.",
  },
  {
    id: "link-mismatch",
    label: "Link não corresponde ao texto",
    description: "O URL real difere do que o botão ou texto sugere.",
  },
  {
    id: "urgency-threat",
    label: "Urgência ou ameaça",
    description: "Pressão para agir rápido: bloqueio, multa, perda de conta.",
  },
  {
    id: "spelling-generic",
    label: "Erros de ortografia ou tom genérico",
    description: "Português incorreto, frases padronizadas ou impessoais.",
  },
  {
    id: "credentials-request",
    label: "Pedido de credenciais ou dados sensíveis",
    description: "Solicita senha, token, cartão ou documentos por e-mail.",
  },
  {
    id: "unexpected-attachment",
    label: "Anexo inesperado ou arriscado",
    description: "Arquivos .html, .zip, macro ou PDF não solicitado.",
  },
  {
    id: "low-quality-branding",
    label: "Logo ou branding de baixa qualidade",
    description: "Imagens pixeladas, cores erradas ou layout fora do padrão.",
  },
  {
    id: "impersonal-greeting",
    label: "Saudação impessoal",
    description: '"Prezado cliente", "Usuário" em vez do seu nome.',
  },
  {
    id: "spoofed-internal",
    label: "Falsificação de remetente interno",
    description: "Parece RH, TI ou gestor, mas o domínio não é corporativo.",
  },
  {
    id: "fake-oauth",
    label: "Login OAuth ou portal falso",
    description: "Botão “Entrar com Google/Microsoft” leva a site não oficial.",
  },
  {
    id: "invoice-scam",
    label: "Fatura ou nota fiscal suspeita",
    description: "Cobrança inesperada com link para “visualizar documento”.",
  },
  {
    id: "qr-shortlink",
    label: "QR code ou link encurtado",
    description: "Oculta destino real; comum em smishing e phishing moderno.",
  },
];

export function getIndicatorMap(): Map<string, Indicator> {
  return new Map(INDICATORS.map((i) => [i.id, i]));
}

export function getIndicatorLabels(ids: string[]): string[] {
  const map = getIndicatorMap();
  return ids.map((id) => map.get(id)?.label ?? id);
}
