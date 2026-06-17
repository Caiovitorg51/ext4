import { EmailClientShell, EmailCtaButton } from "../email-client-shell";
import { FakeLink } from "../fake-link";

export function EmailRhPremiacao() {
  return (
    <EmailClientShell
      browserUrl="https://mail.google.com/mail/u/0/#inbox/FMfcgzQbdr"
      tabTitle="Premiação anual — RH"
      fromName="Recursos Humanos"
      fromEmail="rh.premiacao@gmail.com"
      subject="Confirme seus dados para receber a premiação"
      date="Hoje, 07:02"
    >
      <p>Prezado colaborador,</p>
      <p className="mt-3">
        Parabéns! Você foi selecionado para receber o bônus de desempenho anual.
        Para liberar o pagamento, confirme seu CPF e dados bancários no portal
        interno até sexta-feira.
      </p>
      <p className="mt-3">
        Acesse:{" "}
        <FakeLink
          displayHref="intranet.suaempresa.com.br/rh/premiacao"
          realHref="https://portal-rh-empresa.info/confirmar-dados"
        >
          intranet.suaempresa.com.br/rh/premiacao
        </FakeLink>
      </p>
      <EmailCtaButton variant="primary">Confirmar dados no portal</EmailCtaButton>
    </EmailClientShell>
  );
}
