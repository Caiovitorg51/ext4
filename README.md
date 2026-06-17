# PhishGuard — Plataforma Web Anti-Phishing

Site educativo sobre phishing por e-mail com simulador interativo (5 cenários, tempo livre) e página da extensão Chrome parceira.

## Stack

- **Next.js** (App Router) — front e API
- **PostgreSQL** — persistência de sessões e pontuações
- **Prisma** — ORM
- **Docker Compose** — ambiente local

## Início rápido (Docker)

```bash
cp .env.example .env
docker compose up --build
```

Acesse [http://localhost:3000](http://localhost:3000).

O serviço `web` executa migrations, seed e `npm run dev` automaticamente.

## Desenvolvimento local (sem Docker)

1. Suba o PostgreSQL (ou use `docker compose up db -d`).
2. Configure o ambiente:

```bash
cp .env.example .env
```

3. Instale dependências e prepare o banco:

```bash
npm install
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL PostgreSQL |
| `NEXT_PUBLIC_CHROME_STORE_URL` | Link da extensão na Chrome Web Store |
| `SESSION_COOKIE_SECRET` | Reservado para evoluções de sessão |

## Editar cenários do jogo

1. UI do e-mail simulado em `src/components/email-simulator/scenarios/` (um arquivo por cenário)
2. Gabaritos e metadados em `prisma/seed.ts` (campo `slug` liga ao componente)
3. Lista de indicadores em `src/lib/indicators.ts`
4. Shell compartilhado (barra do navegador + webmail) em `src/components/email-simulator/`

Após alterar o seed:

```bash
npm run db:seed
```

## Rotas principais

| Rota | Descrição |
|------|-----------|
| `/` | Home |
| `/aprender` | Conteúdo educativo |
| `/jogo` | Cadastro do jogador |
| `/jogo/1` … `/jogo/5` | Simulador |
| `/jogo/resultado` | Pontuação final |
| `/extensao` | CTA Chrome Web Store |

## Pontuação

Por tela: `(indicadores corretos marcados) / (total de corretos da tela)`.

Global: média das 5 telas em percentual.

## Equipes

- **Web** — esta plataforma
- **Extensão** — Chrome extension (análise de e-mails + bases de segurança)
