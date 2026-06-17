import {
  EmailAttachment,
  EmailClientShell,
  EmailCtaButton,
} from "../email-client-shell";
import { FakeLink } from "../fake-link";

export function EmailCorreiosEntrega() {
  return (
    <EmailClientShell
      browserUrl="https://bit.ly/3xK9m2-correios"
      tabTitle="Taxa de importação pendente"
      fromName="Correios Express"
      fromEmail="rastreio@correios-express.net"
      subject="Sua encomenda está retida — pagamento em 48h"
      date="Ontem, 17:33"
    >
      <p>Prezado cliente,</p>
      <p className="mt-3">
        Identificamos uma encomenda internacional em seu CPF com taxa de
        importação pendente. O prazo para pagamento é de{" "}
        <strong>48 horas</strong>, caso contrário o pacote será devolvido ao
        remetente.
      </p>
      <p className="mt-3">
        Código de rastreio: BR184729305BR · Valor: R$ 47,90
      </p>
      <EmailAttachment
        name="Comprovante_taxa.zip"
        size="245 KB"
        dangerous
      />
      <p className="mt-3">
        Ou pague online:{" "}
        <FakeLink
          displayHref="correios.com.br/rastreamento"
          realHref="https://correios-pagamento.secure-pay.io/taxa"
        >
          correios.com.br/rastreamento
        </FakeLink>
      </p>
      <EmailCtaButton variant="primary">PAGAR TAXA AGORA</EmailCtaButton>
    </EmailClientShell>
  );
}
