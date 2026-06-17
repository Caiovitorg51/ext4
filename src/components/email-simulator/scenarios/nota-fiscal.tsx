import {
  EmailAttachment,
  EmailClientShell,
  EmailCtaButton,
} from "../email-client-shell";
import { FakeLink } from "../fake-link";

export function EmailNotaFiscal() {
  return (
    <EmailClientShell
      browserUrl="https://outlook.office.com/mail/inbox/id/AAMkAGI2"
      tabTitle="NF-e disponível"
      fromName="Faturamento Eletrônico"
      fromEmail="nfe@faturamento-servicos.biz"
      subject="Nota Fiscal de Serviços — vencimento imediato"
      date="Hoje, 06:55"
    >
      <div className="mb-4 flex items-center gap-3 border-b border-[#dadce0] pb-4">
        <div className="flex h-14 w-24 items-center justify-center rounded bg-[#94a3b8]/30 text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
          NF-e
        </div>
        <div>
          <p className="text-xs text-[#5f6368]">Nota Fiscal Eletrônica</p>
          <p className="font-semibold text-[#202124]">Nº 0002847193</p>
        </div>
      </div>
      <p>Prezado,</p>
      <p className="mt-3">
        Segue em anexo sua nota fiscal de serviços no valor de{" "}
        <strong>R$ 2.847,00</strong> com vencimento imediato.
      </p>
      <EmailAttachment
        name="NF-e_2847193.pdf.exe"
        size="1,2 MB"
        dangerous
      />
      <p className="mt-3">
        Visualize online:{" "}
        <FakeLink
          displayHref="nfe.fazenda.gov.br/consulta"
          realHref="https://faturamento-servicos.biz/download/nfe"
        >
          nfe.fazenda.gov.br/consulta
        </FakeLink>
      </p>
      <EmailCtaButton variant="primary">Baixar documento</EmailCtaButton>
    </EmailClientShell>
  );
}
