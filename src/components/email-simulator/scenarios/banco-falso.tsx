import {
  EmailClientShell,
  EmailCtaButton,
} from "../email-client-shell";
import { FakeLink } from "../fake-link";

export function EmailBancoFalso() {
  return (
    <EmailClientShell
      browserUrl="https://webmail.empresa.local/inbox/msg/88421"
      tabTitle="Alerta de segurança — Banco Nacional"
      fromName="Banco Nacional - Segurança"
      fromEmail="seguranca@banco-naclonal.com.br"
      subject="URGENTE: Confirme seus dados em 24 horas"
      date="Hoje, 08:15"
    >
      <p className="text-[#202124]">Prezado cliente,</p>
      <p className="mt-3">
        Detectamos uma tentativa de acesso não autorizado à sua conta. Por
        segurança, sua conta será{" "}
        <strong className="text-red-700">BLOQUEADA em 24 horas</strong> se você
        não confirmar seus dados.
      </p>
      <p className="mt-3">
        Clique no botão abaixo ou acesse:{" "}
        <FakeLink
          displayHref="www.banconacional.com.br/seguranca"
          realHref="http://banco-seguro-login.xyz/verify?token=8f2a"
        >
          www.banconacional.com.br/seguranca
        </FakeLink>
      </p>
      <EmailCtaButton variant="danger">ATUALIZAR SENHA AGORA</EmailCtaButton>
      <p className="mt-6 text-xs text-[#80868b]">
        Este é um e-mail automático. Não responda. © Banco Nacional S.A.
      </p>
    </EmailClientShell>
  );
}
