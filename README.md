# PhishGuard — Plataforma Web Anti-Phishing

Site educativo sobre phishing por e-mail com simulador interativo (5 cenários, 2 minutos por tela) e página da extensão Chrome parceira.

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

1. Imagens em `public/phishing/tela-1.svg` … `tela-5.svg`
2. Gabaritos e textos em `prisma/seed.ts`
3. Lista de indicadores em `src/lib/indicators.ts`

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
